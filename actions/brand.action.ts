"use server";

import { db } from "@/lib/db";
import { BrandSchema, BrandSchemaType } from "@/schema/brand.schema";
import { revalidatePath } from "next/cache";

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
    const brands = await db.brand.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });

    return {
        brands
    }
}

type EditBrand = {
  values: BrandSchemaType;
  brandId: string;
}

export const EDIT_BRAND = async ({values, brandId}:EditBrand) => {
    const {data, success} = BrandSchema.safeParse(values)

    if (!success) {
        throw new Error("Invalid input value")
    }

    const brand = await db.brand.findUnique({
        where: {
            id: brandId
        }
    })

    if (!brand) {
        throw new Error("Brand not found")
    }

    await db.brand.update({
        where: {
            id: brandId
        },
        data: {
            ...data
        }
    })

    revalidatePath(`/dashboard/brand/${brandId}`)

    return {
        success: "Brand updated"
    }
}


export const DELETE_BRAND = async (brandId: string) => {
  const brand = await db.brand.findUnique({
    where: {
      id: brandId
    }
  })

  if (!brand) {
    throw new Error("Brand not found")
  }

  await db.brand.delete({
    where: {
      id: brandId
    }
  })

  revalidatePath("/dashboard/brand")

  return {
    success: "Brand deleted"
  }
}