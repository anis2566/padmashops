import { z } from "zod"

export const ProductSchema = z.object({
    name: z.string().min(1, {
        message: "required"
    }),
    description: z.string().min(1, {
        message: "required"
    }),
    brandId: z.string().min(1, {
        message: "required"
    }),
    categoryId: z.string().min(1, {
        message: "required"
    }),
    price: z.number().min(1, {
        message: "required"
    }),
    discountPrice: z.number().optional(),
    totalStock: z.number().min(1, {
        message: "required"
    }),
    featureImageUrl: z.string().min(1, {
        message: "required"
    }),
    images: z.array(z.string()).optional(),
    colors: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    status: z.string().optional()
})

export type ProductSchemaType = z.infer<typeof ProductSchema>


export const VariantProductSchema = z.object({
    name: z.string().min(1, {
        message: "required"
    }),
    description: z.string().min(1, {
        message: "required"
    }),
    brandId: z.string().min(1, {
        message: "required"
    }),
    categoryId: z.string().min(1, {
        message: "required"
    }),
    price: z.number().min(1, {
        message: "required"
    }),
    discountPrice: z.number().optional(),
    featureImageUrl: z.string().min(1, {
        message: "required"
    }),
    images: z.array(z.string()).optional(),
    colors: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    status: z.string().optional()
})

export type VariantProductSchemaType = z.infer<typeof VariantProductSchema>
