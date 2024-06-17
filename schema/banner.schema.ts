import { z } from "zod"

export const BannerSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "required",
    }),
    status: z.string().min(1, {
        message: "required",
    }),
})

export type BannerSchemaType = z.infer<typeof BannerSchema>
