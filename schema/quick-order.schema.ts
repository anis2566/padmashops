import { z } from "zod"

export const QuickOrderSchema = z.object({
  name: z.string().min(1, {
    message: "required",
  }),
  address: z.string().min(1, {
    message: "required",
  }),
  phone: z.string().min(11, {
    message: "invalid phone number",
  }),
  quantity: z.number().min(1, {
    message: "required",
  }),
  deliveryFee: z.number().min(1, {
    message: "required",
  }),
  productId: z.string().optional(),
  color: z.string().optional(),
  size: z.string().optional(),
})

export type QuickOrderSchemaType = z.infer<typeof QuickOrderSchema>