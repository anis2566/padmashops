"use server"

import { db } from "@/lib/db"
import { CouponSchema, CouponSchemaType } from "@/schema/coupon.schema"
import { revalidatePath } from "next/cache"

export const CREATE_COUPON = async (values: CouponSchemaType) => {
    const {data, success} = CouponSchema.safeParse(values)

    if (!success) {
        throw new Error("Invalid input field")
    }

    const coupon = await db.coupon.findFirst({
        where: {
            OR: [
                {name: data.name},
                {code: data.code}
            ]
        }
    })

    if (coupon) {
        throw new Error("Coupon exists")
    }

    await db.coupon.create({
        data: {
            ...data
        }
    })

    revalidatePath("/dashboard/coupon")

    return {
        success: "Coupon created"
    }
}


type EditCoupon = {
    couponId: string;
    values: CouponSchemaType;
}
export const Edit_COUPON = async ({values, couponId}: EditCoupon) => {
    const {data, success} = CouponSchema.safeParse(values)

    if (!success) {
        throw new Error("Invalid input field")
    }

    const coupon = await db.coupon.findUnique({
        where: { id: couponId }
    })

    if (!coupon) {
       throw new Error("Coupon not found")
    }

    await db.coupon.update({
        where: {
            id: couponId
        },
        data: {
            ...data
        }
    })

    revalidatePath(`/dashboard/coupon/${couponId}`)

    return {
        success: "Coupon updated"
    }
}


export const DELETE_COUPON = async (couponId: string) => {
    const coupon = await db.coupon.findUnique({
        where: { id: couponId }
    })

    if (!coupon) {
        throw new Error("Coupon not found")
    }

    await db.coupon.delete({
        where: { id: couponId }
    })

    revalidatePath("/dashboard/coupon")

    return {
        success: "Coupon deleted"
    }
}