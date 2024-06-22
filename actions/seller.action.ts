"use server"

import { db } from "@/lib/db"
import { SellerSchema, SellerSchemaType } from "@/schema/seller.schema"
import { sendNotification } from "@/services/notification.services"
import { getAdmin, getUser } from "@/services/user.services"
import { clerkClient } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export const CREATE_SELLER = async (values: SellerSchemaType) => {
    const { data, success } = SellerSchema.safeParse(values)
    if (!success) {
        throw new Error("Invalid input value")
    }

    const { userId, clerkId } = await getUser()

    const seller = await db.seller.findUnique({
        where: {
            userId
        }
    })

    if (seller) {
        throw new Error("Seller already exists")
    }
    
    const newSeller = await db.seller.create({
        data: {
            userId,
            ...data,
            bank: {
                create: {
                    current: 0,
                    pending: 0,
                    withdraw: 0,
                    total: 0
                }
            }
        }
    })

    await clerkClient.users.updateUserMetadata(clerkId, {
        publicMetadata: {
            role: "seller",
            status: newSeller.status
        },
    });

    await db.user.update({
        where: {
            clerkId
        },
        data: {
            role: "seller",
        }
    })

    const {adminClerkId} = await getAdmin()

    await sendNotification({
        trigger: "seller-request",
        recipients: [adminClerkId],
        actor: {
            id: clerkId,
            name: newSeller.name
        },
        data: {
            redirectUrl: `/dashboard/seller/${newSeller.id}`,
        }
    })

    return {
        success: "Registration successful"
    }
}


type SellerStatus = {
    sellerId: string;
    status: string;
}
export const UPDATE_SELLER_STATUS = async ({ sellerId, status }: SellerStatus) => {
    const seller = await db.seller.findUnique({
        where: {
            id: sellerId
        },
        include: {
            user: true
        }
    })

    if (!seller) {
        throw new Error("Seller not found")
    }

    await clerkClient.users.updateUser(seller.user.clerkId, {
        publicMetadata: {
            role: "seller",
            status
        }
    })

    await db.seller.update({
        where: {
            id: sellerId
        },
        data: {
            status
        }
    })

    revalidatePath("/dashboard/seller/request")

    const {adminClerkId} = await getAdmin()

    await sendNotification({
        trigger: "seller-response",
        recipients: [seller?.user?.clerkId || ""],
        actor: {
            id: adminClerkId,
        },
        data: {
            status
        }
    })

    return {
        success: "Status updated"
    }

}


type UpdateSeller = {
    id: string;
    values: SellerSchemaType
}
export const UPDATE_SELLER = async ({ id, values }: UpdateSeller) => {
    const { data, success } = SellerSchema.safeParse(values)
    if (!success) {
        throw new Error("Invalid input value")
    }

    const seller = await db.seller.findUnique({
        where: {
            id
        }
    })

    if (!seller) {
        throw new Error("Seller not found")
    }

    await db.seller.update({
        where: {
            id
        },
        data: {
            ...data
        }
    })

    revalidatePath("/seller/profile")

    return {
        success: "Seller updated"
    }
}


export const DELETE_SELLER = async (sellerId: string) => {
    const seller = await db.seller.findUnique({
        where: {
            id: sellerId
        }
    })

    if (!seller) {
        throw new Error("Seller not found")
    }

    await db.seller.delete({
        where: {
            id: sellerId
        }
    })

    revalidatePath("/dashboard/seller")

    return {
        success: "Seller deleted"
    }
}