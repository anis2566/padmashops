"use server"

import { db } from "@/lib/db"
import { getUser } from "@/services/user.services";

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