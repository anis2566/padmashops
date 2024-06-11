"use server"

import { db } from "@/lib/db"
import { UserSchema, UserSchemaType } from "@/schema/user.schema";
import { getUser } from "@/services/user.services";


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