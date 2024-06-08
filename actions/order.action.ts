"use server";

import { Order } from "@prisma/client";

import { db } from "@/lib/db";
import {
  OrderProductSchemaType,
  OrderSchema,
  OrderSchemaType,
} from "@/schema/order.schema";
// import { sendNotification } from "@/service/notification.service";
import { revalidatePath } from "next/cache";
import { generateInvoiceId } from "@/lib/utils";
import { getUser } from "@/services/user.services";

type CreateOrder = {
  order: OrderSchemaType;
  products: OrderProductSchemaType[];
};

export const CREATE_ORDER = async ({ order, products }: CreateOrder) => {

    console.log(products)
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
  
    const { userId } = await getUser();
  
    const total = products.reduce((acc, curr) => acc + curr.price, 0);
  
    let shippingId = shippingInfoId;
  
    if (!shippingId) {
      const newAddress = await db.shippingInfo.create({
        data: {
          userId,
          name,
          division,
          address,
          phone,
        },
      });
      shippingId = newAddress.id;
    }
  
    const newOrder = await db.order.create({
      data: {
        userId,
        invoiceId: generateInvoiceId(),
        total,
        deliveryFee,
        paymentMethod,
        products: {
          createMany: {
            data: products.map(product => ({ productId: product.productId, quantity: product.quantity, price: product.price })),
          },
        },
        shippingInfoId: shippingId,
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