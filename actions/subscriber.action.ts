"use server"

import { db } from "@/lib/db"
import { SubscribeSchema } from "@/schema/subscribe.schema"

export const CREATE_SUBSCRIBER = async (email: string) => {
    const { data, success } = SubscribeSchema.safeParse({email})
    
    if (!success) {
        throw new Error("Invalid email")
    }

    const subscriber = await db.subscriber.findFirst({
        where: {
            email
        }
    })

    if (subscriber) {
        throw new Error("You have already subscribed")
    }

    await db.subscriber.create({
        data: {
            ...data
        }
    })

    return {
        success: "Subscription successful"
    }
}