import { z } from "zod"

export const MessageSchema = z.object({
    name: z.string().min(1, {
        message: "required",
    }),
    email: z.string().min(1, {
        message: "required",
    }),
    message: z.string().min(1, {
        message: "required",
    }),
})

export type MessageSchemaType = z.infer<typeof MessageSchema>
