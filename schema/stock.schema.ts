import { z } from "zod";

export const StockSchema = z.object({
  size: z.string().min(1, {
    message: "required",
  }),
  stock: z.number().min(1, {
    message: "required",
  }),
  color: z.string().optional().nullable(),
});

export const StockVariantSchema = z.object({
  productId: z.string().min(1, {
    message: "required",
  }),
  stocks: z.array(StockSchema),
});

export type StockVariantSchemaType = z.infer<typeof StockVariantSchema>;
