"use server"

import { db } from "@/lib/db"
import { UserSchema, UserSchemaType } from "@/schema/user.schema";
import { getUser } from "@/services/user.services";
import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export const UPDATE_USER = async (values: UserSchemaType) => {
    const {data, success} = UserSchema.safeParse(values)

    if(!success) {
        throw new Error("Invalid input value")
    }

    const {userId} = await getUser()

    await db.user.update({
        where: {
            id: userId
        },
        data: {
            ...data
        }
    })

    return {
        success: "Profile updated"
    }
}


export const GET_UNREVIEWED_PRODUCT = async () => {
    const {userId} = await getUser()

    const orders = await db.order.findMany({
        where: {
            userId,
            status: "delivered"
        },
        include: {
            products: true
        }
    });

    // Extract productIds from orders
    const productIds = orders.flatMap(order => 
        order.products.map(product => product.productId)
    );

    const products = await db.product.findMany({
        where: {
            id: {
                in: productIds
            }
        }
    })

    return {products}
}

export const GET_DASHBOARD_DATA = async () => {
    const { userId } = await getUser();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [todayOrders, pendingOrders, totalOrder, orders] = await Promise.all([
        db.order.count({
            where: {
                userId,
                createdAt: {
                    gte: today,
                    lt: tomorrow // changed to lt to avoid including the next day's start time
                }
            }
        }),
        db.order.count({
            where: {
                userId,
                status: "pending"
            }
        }),
        db.order.count({
            where: {
                userId
            }
        }),
        db.order.findMany({
            where: {
                userId
            },
            include: {
                products: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            },
            take: 3
        })
    ]);

    return {
        todayOrders,
        pendingOrders,
        totalOrder,
        orders
    };
};


type GetOrders = {
    page: string;
    perPage: string;
    status: string;
}
export const GET_ORDERS = async ({ page, perPage, status }: GetOrders) => {
    const itemsPerPage = parseInt(perPage) || 5;  
    const currentPage = parseInt(page) || 1;

    const { userId } = await getUser()
    
    const orders = await db.order.findMany({
        where: {
            userId,
            ...(status !== "all" && {status})
        },
        include: {
            products: {
                include: {
                    product:true
                }
            },
            user: true
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalOrder = await db.order.count({
        where: {
            userId,
            ...(status !== "all" && {status})
        }
    })

    return {
        orders,
        totalOrder
    }

}


export const GET_ORDER = async (orderId: string) => {
    const order = await db.order.findUnique({
        where: {
            id: orderId
        },
        include: {
            products: {
                include: {
                    product: {
                        select: {
                            name: true,
                            featureImageUrl: true
                        }
                    }
                }
            },
            shippingInfo: true,
            user: true
        }
    })

    if (!order) redirect("/")
    
    return {
        order
    }
}


export const DELETE_USER = async (userId: string) => {
    const user = await db.user.findUnique({
        where: {
            id: userId
        }
    })

    if (!user) {
        throw new Error("User not found")
    }

    await clerkClient.users.deleteUser(user.clerkId)

    await db.user.delete({
        where: {
            id: userId
        }
    })

    revalidatePath("/dashboard/customers")

    return {
        success: "Customer deleted"
    }
}