"use server"

import { db } from "@/lib/db"
import { MessageSchema, MessageSchemaType } from "@/schema/message.schema"

export const CREATE_MESSAGE = async (values: MessageSchemaType) => {
    const { data, success } = MessageSchema.safeParse(values)
    
    if (!success) {
        throw new Error("Invalid input value")
    }

    await db.message.create({
        data: {
            ...data
        }
    })

    return {
        success: "Message sent"
    }
}