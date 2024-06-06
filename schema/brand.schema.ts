import { z } from "zod"

export const BrandSchema = z.object({
    name: z.string().min(1, {
        message: "required",
    }),
    imageUrl: z.string().min(1, {
    message: "required",
    }),
})

export type BrandSchemaType = z.infer<typeof BrandSchema>
