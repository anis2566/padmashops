import { z } from "zod"

export const SubscribeSchema = z.object({
    email: z.string().email().min(1, {message: "required"})
})

export type SubscribeSchemaType = z.infer<typeof SubscribeSchema>
