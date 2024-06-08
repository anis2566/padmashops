import { z } from "zod"

export const CouponSchema = z.object({
    name: z.string().min(1, {
        message: "required"
    }),
    code: z.string().min(1, {
        message: "required"
    }),
    imageUrl: z.string().optional(),
    value: z.number().min(1, {
        message: "required"
    }),
    startDate: z.date({
        required_error: "required",
    }),
    expiryDate: z.date({
        required_error: "required",
    }),
    status: z.string().min(1, {
        message: "required"
    })
})

export type CouponSchemaType = z.infer<typeof CouponSchema>
