import { z } from "zod"

export const AddressSchema = z.object({
    title: z.string().min(1, {
        message: "required",
    }),
    name: z.string().min(1, {
        message: "required",
    }),
    division: z.string().min(1, {
        message: "required",
    }),
    address: z.string().min(4, {
        message: "required",
    }),
    phone: z.string().min(11, {
        message: "required",
    }),
})

export type AddressSchemaType = z.infer<typeof AddressSchema>
