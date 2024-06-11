"use server"

import { db } from "@/lib/db"
import { ReviewSchema, ReviewSchemaType } from "@/schema/review.schema"
import { getUser } from "@/services/user.services"

export const CREATE_REVIEW = async (values: ReviewSchemaType) => {
    const { success, data } = ReviewSchema.safeParse(values)

    if (!success) {
        throw new Error("Invalid input value")
    }

    const {userId} = await getUser()
    const { productId, rating } = data

    const purchase = await db.orderProduct.findFirst({
        where: {
            productId: productId,
            order: {
                userId: userId,
                status: 'delivered'
            }
        },
        select: {
            id: true
        }
    })

    if (!purchase) {
        throw new Error("You did not purchased this product")
    }

    const existingReview = await db.review.findFirst({
        where: {
            userId: userId,
            productId: productId
        },
        select: {
            id: true
        }
    })

    if (existingReview) {
        throw new Error("You have already reviewed this product")
    }

    await db.review.create({
        data: {
            ...data,
            userId
        }
    })

    const product = await db.product.findUnique({
        where: { id: productId },
        select: { ratingCount: true, averageRating: true }
    })

    if (product) {
        const newRatingCount = product.ratingCount + 1
        const newAverageRating = ((product.averageRating * product.ratingCount) + rating) / newRatingCount

        await db.product.update({
            where: { id: productId },
            data: {
                ratingCount: newRatingCount,
                averageRating: newAverageRating
            }
        })
    }

    return {success: "Review submitted"}
}

type GetReviews = {
    productId: string;
    page: string;
}

export const GET_REVIEWS = async ({productId, page}: GetReviews) => {
    const itemsPerPage = 2;  
    const currentPage = parseInt(page) || 1;

    const reviews = await db.review.findMany({
        where: {
            productId
        },
        include: {
            user: {
                select: {
                    imageUrl: true,
                    name: true
                }
            }
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalReview = await db.review.count({
        where: {
            productId
        }
    })

    return {reviews, totalReview}
}