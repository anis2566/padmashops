import { z } from "zod";

export const OrderSchema = z
  .object({
    shippingInfoId: z.string().optional(),
    name: z.string(),
    division: z.string(),
    address: z.string(),
    phone: z.string(),
    paymentMethod: z.string().min(1, {
      message: "required",
    }),
    deliveryFee: z.number().min(1, {
      message: "required",
    }),
  })
  .superRefine((data, ctx) => {
    if (!data.shippingInfoId) {
      if (data.name.length < 1) {
        ctx.addIssue({
          path: ["name"],
          message: "required",
          code: z.ZodIssueCode.too_small,
          minimum: 4,
          inclusive: true,
          type: "string",
        });
      }
      if (data.division.length < 1) {
        ctx.addIssue({
          path: ["division"],
          message: "required",
          code: z.ZodIssueCode.too_small,
          minimum: 1,
          inclusive: true,
          type: "string",
        });
      }
      if (data.address.length < 10) {
        ctx.addIssue({
          path: ["address"],
          message: "required",
          code: z.ZodIssueCode.too_small,
          minimum: 10,
          inclusive: true,
          type: "string",
        });
      }
      if (data.phone.length < 10) {
        ctx.addIssue({
          path: ["phone"],
          message: "required",
          code: z.ZodIssueCode.too_small,
          minimum: 10,
          inclusive: true,
          type: "string",
        });
      }
    }
  });

export type OrderSchemaType = z.infer<typeof OrderSchema>;

export const OrderProductSchema = z.object({
  productId: z.string().min(1, {
    message: "required",
  }),
  price: z.number().min(1, {
    message: "required",
  }),
  quantity: z.number().min(1, {
    message: "required",
  }),
  size: z.string().optional().nullable(),
  color: z.string().optional().nullable(),
});

export type OrderProductSchemaType = z.infer<typeof OrderProductSchema>;