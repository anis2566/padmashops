"use server"

import { revalidatePath } from "next/cache"

import { db } from "@/lib/db"
import { WithdrawSchema, WithdrawSchemaType } from "@/schema/withdraw.schema"
import { getAdmin, getSeller, getUser } from "@/services/user.services"
import { sendNotification } from "@/services/notification.services"

export const CREATE_WITHDRAW = async (values: WithdrawSchemaType) => {
    const parseBody = WithdrawSchema.safeParse(values)
    if (!parseBody.success) {
        throw new Error("Invalid input Value")
    }

    const { sellerId, seller } = await getSeller()
    
    const bank = await db.bank.findUnique({
        where: {
            sellerId
        }
    })

    if (!bank) {
        throw new Error("Bank not found")
    }

    const { amount, method, number } = parseBody.data
    
    if (amount > bank.current) {
        throw new Error("Insufficient balance")
    }

    if(amount < 50) {
        throw new Error("Minimun withdraw limit is BDT 50")
    }

    await db.withdraw.create({
        data: {
            sellerId,
            amount,
            method,
            number
        }
    })

    await db.bank.update({
        where: {
            sellerId
        },
        data: {
            current: { decrement: amount },
            withdraw: {increment: amount}
        }
    })

    revalidatePath("/seller/withdraw")

    const { adminClerkId } = await getAdmin()
    const {clerkId} = await getUser()

    await sendNotification({
        trigger: "withdraw-request",
        recipients: [adminClerkId],
        actor: {
            id: clerkId,
            name: seller.name
        }, 
        data: {
            redirectUrl: `/dashboard/seller/withdraw`,
            withdraw: amount 
        }
    })

    return {
        success: "Request successful"
    }
}

type UpdateWithdraw = {
    withdrawId: string;
    status: string;
}

export const UPDATE_WITHDRAW = async ({withdrawId, status}:UpdateWithdraw) => {
    const withdraw = await db.withdraw.findUnique({
        where: {
            id: withdrawId
        }
    })

    if (!withdraw) {
        throw new Error("Withdraw not found")
    }

    if (status === "rejected") {
        await db.bank.update({
            where: {
                sellerId: withdraw.sellerId
            },
            data: {
                current: { increment: withdraw.amount },
                withdraw: {decrement: withdraw.amount}
            }
        })
    }

    await db.withdraw.update({
        where: {
            id: withdraw.id
        },
        data: {
            status
        }
    })

    revalidatePath("/dashboard/sellers/withdraw")

    const seller = await db.seller.findUnique({
        where: {
            id: withdraw.sellerId
        },
        include: {
            user: {
                select: {
                    clerkId: true
                }
            }
        }
    })

    const {adminClerkId} = await getAdmin()

    sendNotification({
        trigger: "withdraw-response",
        recipients: [seller?.user.clerkId || ""],
        actor: {
            id: adminClerkId
        },
        data: {
            status
        }
    })

    return {
        success: "Status updated"
    }
}