"use server";

import { db } from "@/lib/db";
import { BrandSchema, BrandSchemaType } from "@/schema/brand.schema";

export const CREATE_BRAND = async (values: BrandSchemaType) => {
  const { success, data } = BrandSchema.safeParse(values);

  if (!success) {
    throw new Error("Invalid input value");
  }

  const brand = await db.brand.findFirst({
    where: {
      name: data.name,
    },
  });

  if (brand) {
    throw new Error("Brand exists");
  }

  await db.brand.create({
    data: {
      ...data,
    },
  });

  return {
    success: "Brand created",
  };
};

export const GET_BRANDS = async () => {
    console.log("this block has been called")
    return {brands: "anis"}
}
