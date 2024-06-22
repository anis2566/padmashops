import { z } from "zod"

export const WithdrawSchema = z.object({
    amount: z.number().min(2, {
        message: "invalid amount",
    }),
    method: z.string().min(1, {
        message: "required",
    }),
    number: z.string().min(11, {
        message: "invalid number",
    }),
})

export type WithdrawSchemaType = z.infer<typeof WithdrawSchema>