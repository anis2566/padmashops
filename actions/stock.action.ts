"use server"

import { db } from "@/lib/db"
import { StockVariantSchema, StockVariantSchemaType } from "@/schema/stock.schema"
import { revalidatePath } from "next/cache"

export const CREATE_STOCK = async (values: StockVariantSchemaType) => {
    const { success, data } = StockVariantSchema.safeParse(values)

    if (!success) {
        throw new Error("Invalid input value")
    }

    const { stocks, productId } = data

    // Start a transaction
    const transaction = await db.$transaction(async (prisma) => {
        // Create stock entries
        await Promise.all(stocks.map(stock => 
            prisma.stock.create({
                data: {
                    productId: productId,
                    size: stock.size,
                    stock: stock.stock
                }
            })
        ))

        // Fetch updated stocks for the product
        const updatedStocks = await prisma.stock.findMany({
            where: {
                productId: productId
            }
        })

        // Calculate total stock
        const totalStock = updatedStocks.reduce((acc, curr) => acc + curr.stock, 0)

        // Update product with total stock
        await prisma.product.update({
            where: {
                id: productId
            },
            data: {
                totalStock
            }
        })
    })

    // Revalidate path
    revalidatePath("/dashboard/product")

    return {
        success: "Stock created"
    }
}


export const EDIT_STOCK = async (values: StockVariantSchemaType) => {
    const { success, data } = StockVariantSchema.safeParse(values)

    if (!success) {
        throw new Error("Invalid input value")
    }

    const { stocks, productId } = data

    await db.$transaction(async (prisma) => {
        // Delete existing stocks for the product
        await prisma.stock.deleteMany({
            where: {
                productId: productId
            }
        })

        // Create new stock entries
        await prisma.stock.createMany({
            data: stocks.map(stock => ({
                productId: productId,
                size: stock.size,
                stock: stock.stock
            }))
        })

        // Calculate total stock
        const totalStock = stocks.reduce((acc, curr) => acc + curr.stock, 0)

        // Update product with total stock
        await prisma.product.update({
            where: {
                id: productId
            },
            data: {
                totalStock
            }
        })
    })

    return {
        success: "Stock updated"
    }
}
