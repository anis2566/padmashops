"use server"

import { SellerOrderProduct } from "@prisma/client"
import { revalidatePath } from "next/cache"

import { db } from "@/lib/db"
import { SellerOrderSchema, SellerOrderSchemaType } from "@/schema/seller-order.schema"
import { generateInvoiceId } from "@/lib/utils"
import { getAdmin, getUser } from "@/services/user.services"
import { sendNotification } from "@/services/notification.services"

export const CREATE_SELLER_ORDER = async (values: SellerOrderSchemaType) => {
    const parseBody = SellerOrderSchema.safeParse(values)

    if (!parseBody.success) {
        throw new Error("Invalid input field")
    }

  const { userId, clerkId } = await getUser()
    
    const seller = await db.seller.findUnique({
        where: {
            userId
        }
    })

    if (!seller) {
        throw new Error("Seller not found")
    }

    const { products, customerName, address, mobile, deliveryFee } = parseBody.data

    const productDetails = await Promise.all(products.map(async product => {
        const productData = await db.product.findUnique({
            where: { id: product.productId }
        });
        if (!productData) {
            throw new Error(`Product with ID ${product.productId} not found`);
        }
        if (!productData.sellerPrice || product.price < productData.sellerPrice) {
            throw new Error(`Invalid product price`);
        }
        return {
            ...product,
            originalPrice: productData.sellerPrice
        };
    }));    

    const total = products.reduce((acc, curr) => acc + (curr.price * curr.quantity),0)

    const order = await db.sellerOrder.create({
        data: {
            sellerId: seller.id,
            invoiceId: generateInvoiceId(),
            customerName,
            address,
            mobile,
            total,
            deliveryFee,
            products: {
                createMany: {
                    data: productDetails.map(product => (
                        {
                            productId: product.productId,
                            price: product.originalPrice,
                            quantity: product.quantity,
                            size: product.size,
                            color: product.color,
                            sellPrice: product.price
                        }
                    ))
                }
            }
        }
    })

    revalidatePath("/seller/order/list");

    for (const product of productDetails) {
      if (!product.size) {
        await db.product.update({
          where: { id: product.productId },
          data: { totalStock: { decrement: product.quantity } },
        });

        await db.bank.update({
          where: {
            sellerId: seller.id
          },
          data: {
            pending: {increment: (product.price - product.originalPrice)}
          }
        })

      } else {
        const stock = await db.stock.findFirst({
          where: {
            productId: product.productId,
            size: product.size
          }
        })

        if (!stock) {
          throw new Error("Stock not found")
        }

        await db.stock.update({
          where: {
            id: stock.id,
            size: product.size
          },
          data: {
            stock: {decrement: product.quantity}
          }
        })
        await db.product.update({
          where: {
            id: product.productId
          },
          data: {
              totalStock: {
                decrement: product.quantity
            }
          }
        })
      }
  }
  
  const {adminClerkId} = await getAdmin()

  await sendNotification({
    trigger: "seller-order",
    recipients: [adminClerkId],
    actor: {
      id: clerkId || "",
      name: seller.name
    },
    data: {
      name: seller.name,
      redirectUrl: `/dashboard/sellers/orders/${order.id}`,
      invoice: order.invoiceId
    }
  })

  return {
    success: "Order placed",
  };
}

type UpdateStatus = {
  orderId: string;
  products: SellerOrderProduct[];
  status: string;
  sellerId: string;
}

export const UPDATE_SELLER_ORDER_STATUS = async ({orderId, products, status, sellerId}:UpdateStatus) => {
  const order = await db.sellerOrder.findUnique({
    where: {
      id: orderId
    }
  })

  if (!order) {
    throw new Error("Order not found")
  }

  if (status === "returned") {
    for (const product of products) {
      if (!product.size) {
        await db.product.update({
          where: { id: product.productId },
          data: { totalStock: { increment: product.quantity } },
        });

        await db.bank.update({
          where: {
            sellerId
          },
          data: {
            pending: { decrement: (product.sellPrice - product.price) },
          }
        })
      }
      else {
        const stock = await db.stock.findFirst({
          where: {
            productId: product.productId
          }
        })

        if (!stock) {
          throw new Error("Stock not found")
        }

        await db.stock.update({
          where: {
            id: stock.id,
            size: product.size
          },
          data: {
            stock: { increment: product.quantity }
          }
        })
        await db.product.update({
          where: {
            id: product.productId
          },
          data: {
            totalStock: { increment: product.quantity }
          }
        })

        await db.bank.update({
          where: {
            sellerId
          },
          data: {
            pending: { decrement: (product.sellPrice - product.price) },
          }
        })
      }
    }
  }

  if (status === "delivered") {
    for (const product of products) {
      await db.bank.update({
        where: {
          sellerId
        },
        data: {
          current: { increment: (product.sellPrice - product.price) },
          total: { increment: (product.sellPrice - product.price) },
          pending: {decrement: (product.sellPrice - product.price)}
        }
      });

      await db.product.update({
        where: {
          id: product.productId
        },
        data: {
          totalSell: {increment: product.quantity}
        }
      })
    }
  }

    await db.sellerOrder.update({
      where: {
        id: orderId
      },
      data: {
        status
      }
    })

    const seller = await db.seller.findUnique({
      where: {
        id: order.sellerId
      },
      include: {
        user: {
          select: {
            clerkId: true
          }
        }
      }
    })

    const { clerkId } = await getUser()
  
    await sendNotification({
      trigger: "seller-order-response",
      recipients: [seller?.user?.clerkId || ""],
      actor: {
        id: clerkId,
      },
      data: {
        redirectUrl: `/seller/order/list/${order.id}`,
        invoice: order.invoiceId,
        status
      }
    })
              
    return {
      success: "Status updated",
      status
    };
}

type UpdateTracking = {
  orderId: string;
  trackingId: string;
}

export const UPDATE_TRACKING_ID = async ({orderId, trackingId}:UpdateTracking) => {
  const order = await db.sellerOrder.findUnique({
    where: {
      id: orderId
    }
  })

  if (!order) {
    throw new Error("Order not found")
  } 

  await db.sellerOrder.update({
    where: {
      id: orderId
    },
    data: {
      trackingId
    }
  })

  return {
    success: "Tracking Id added"
  }

}