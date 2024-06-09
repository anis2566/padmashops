"use server";

import { db } from "@/lib/db";
import {
  OrderProductSchemaType,
  OrderSchema,
  OrderSchemaType,
} from "@/schema/order.schema";
import { generateInvoiceId } from "@/lib/utils";
import { getAdmin, getUser } from "@/services/user.services";
import { sendNotification } from "@/services/notification.services";

type CreateOrder = {
  order: OrderSchemaType;
  products: OrderProductSchemaType[];
};

export const CREATE_ORDER = async ({ order, products }: CreateOrder) => {
  const { data, success } = OrderSchema.safeParse(order);

  if (!success) {
    throw new Error("Invalid input value");
  }

  const {
    shippingInfoId,
    deliveryFee,
    paymentMethod,
    name,
    division,
    address,
    phone,
  } = data;

  const { userId, clerkId, user } = await getUser();

  const total = products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0); // Consider quantity in total calculation

  const shippingId = shippingInfoId || (await db.shippingInfo.create({
    data: {
      userId,
      name,
      division,
      address,
      phone,
    },
  })).id;

  const newOrder = await db.order.create({
    data: {
      userId,
      invoiceId: generateInvoiceId(),
      total,
      deliveryFee,
      paymentMethod,
      products: {
        createMany: {
          data: products.map(product => ({
            productId: product.productId,
            quantity: product.quantity,
            price: product.price
          })),
        },
      },
      shippingInfoId: shippingId,
    },
  });

  const stockUpdates = products.map(product => {
    if (product.size) {
      return db.stock.updateMany({
        where: {
          productId: product.productId,
          size: product.size
        },
        data: {
          stock: {
            decrement: product.quantity
          }
        }
      });
    }
    return db.product.update({
      where: {
        id: product.productId
      },
      data: {
        totalStock: {
          decrement: product.quantity
        }
      }
    });
  });

  await Promise.all(stockUpdates);

  const { adminClerkId } = await getAdmin();

  await sendNotification({
    trigger: "new-order",
    recipients: [adminClerkId],
    actor: {
      id: clerkId,
      name: user.name,
    },
    data: {
      redirectUrl: `/dashboard/orders/${newOrder.id}`,
      invoice: newOrder.invoiceId,
    },
  });

  return {
    success: "Order placed",
    order: newOrder
  };
};

  

type UpdateOrder = {
  orderId: string;
  products: OrderProductSchemaType[];
  status: string;
};

// export const UPDATE_ORDER = async ({
//   orderId,
//   products,
//   status,
// }: UpdateOrder) => {
//   const order = await db.order.findUnique({
//     where: {
//       id: orderId,
//     },
//   });

//   if (!order) {
//     throw new Error("Order not found");
//   }

//   if (status === "returned") {
//     for (const product of products) {
//       if (!product.size) {
//         await db.product.update({
//           where: {
//             id: product.productId,
//           },
//           data: {
//             totalStock: { increment: product.quantity },
//           },
//         });
//       } else {
//         const stock = await db.stock.findFirst({
//           where: {
//             productId: product.productId,
//             size: product.size,
//           },
//         });

//         await db.stock.update({
//           where: {
//             id: stock?.id,
//           },
//           data: {
//             stock: { increment: product.quantity },
//           },
//         });

//         await db.product.update({
//           where: {
//             id: product.productId,
//           },
//           data: {
//             totalStock: { increment: product.quantity },
//           },
//         });
//       }
//     }
//   }

//   await db.order.update({
//     where: {
//       id: orderId,
//     },
//     data: {
//       status,
//     },
//   });

//   const user = await db.user.findUnique({
//     where: {
//       id: order.userId,
//     },
//   });
//   const { adminClerId } = await getAdmin();

//   await sendNotification({
//     trigger: "customer-order-admin",
//     actor: {
//       id: adminClerId,
//     },
//     recipients: [user?.clerkId || ""],
//     data: {
//       status,
//       redirectUrl: `/account/orders/${order.id}`,
//       invoice: order.invoiceId,
//     },
//   });

//   revalidatePath(`/dashboard/orders/${orderId}`);

//   return {
//     success: "Status updated",
//   };
// };


type UserOrders = {
  page: string | null
  perPage: string | null
  status: string;
}

// export const GET_USER_ORDER = async (values: UserOrders) => {
//   const {status} = values
//   const itemsPerPage = parseInt(values.perPage || "5");  
//   const currentPage = parseInt(values.page || "1");

//   const {userId} = await getUser()

//   const orders = await db.order.findMany({
//         where: {
//             userId,
//             ...(status !== "all" && {status})
//         },
//         include: {
//             products: {
//                 include: {
//                     product: {
//                         select: {
//                             featureImageUrl: true
//                         }
//                     }
//                 }
//             }
//         },
//         orderBy: {
//             createdAt: "desc"
//         },
//         skip: (currentPage - 1) * itemsPerPage,
//         take: itemsPerPage,
//     })

//     console.log(orders)

//   return {
//     orders
//   }
// }