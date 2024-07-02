"use server"

import { db } from "@/lib/db"
import { QuickOrderSchema, QuickOrderSchemaType } from "@/schema/quick-order.schema"
import { sendNotification } from "@/services/notification.services";
import { getAdmin } from "@/services/user.services";
import { revalidatePath } from "next/cache"

export const CREATE_QUICK_ORDER = async (values: QuickOrderSchemaType) => {
    const {data, success} = QuickOrderSchema.safeParse(values)
    if(!success) {
        throw new Error("Invalid input value")
    }

    const product = await db.product.findUnique({
        where: {
            id: data.productId
        }
    })

    if (!product) {
        throw new Error("product not found")
    }

    const total = product.discountPrice ? product.discountPrice * data.quantity : product.price * data.quantity

    const order = await db.quickOrder.create({
        data: {
            ...data,
            total
        }
    })

    if(data.size) {
        const stock = await db.stock.findFirst({
            where: {
                productId: data.productId,
                size: data.size
            }
        })

        if(!stock) {
            throw new Error("Stock not found")
        }
        await db.stock.update({
            where: {
                id: stock.id
            }, 
            data: {
                stock: {decrement: data.quantity}
            }
        })
    }

    await db.product.update({
        where: {
            id: data.productId 
        },
        data: {
            totalStock: {
                decrement: data.quantity
            }
        }
    })

    const { adminClerkId } = await getAdmin();
    await sendNotification({
        trigger: "quick-order",
        recipients: [adminClerkId],
        actor: {
        id: adminClerkId,
        },
        data: {
            redirectUrl: `/dashboard/quick-order`,
            name: data.name
        },
    });

    return {
        success: "Order placed",
        id: order.id
    }

}


type UpdateOrder = {
    id: string;
    status: string;
  };
  
  export const UPDATE_ORDER = async ({
    id,
    status,
  }: UpdateOrder) => {
    const order = await db.quickOrder.findUnique({
      where: {
        id
      },
      include: {
        product: true
      }
    });
  
    if (!order) {
      throw new Error("Order not found");
    }
  
    if (status === "RETURNED") {
        if (order.size) {
          const stock = await db.stock.findFirst({
            where: {
              productId: order.product?.id,
              size: order.size,
            },
          });
  
          await db.stock.update({
            where: {
              id: stock?.id,
            },
            data: {
              stock: { increment: order.quantity },
            },
          });
        }
        await db.product.update({
          where: {
            id: order.product?.id,
          },
          data: {
            totalStock: { increment: order.quantity },
          },
        });
    }
  
    if (status === "DELIVERED") {
        await db.product.update({
          where: {
            id: order.product?.id
          },
          data: {
            totalSell: {increment: order.quantity}
          }
        })
    }
  
    await db.quickOrder.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  
    revalidatePath(`/dashboard/quick-order/${id}`);
  
    return {
      success: "Status updated",
    };
  };
  