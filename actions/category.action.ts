"use server";

import { db } from "@/lib/db";
import {
  CategorySchema,
  CategorySchemaType,
} from "@/schema/category.schema";
import { revalidatePath } from "next/cache";

export const CREATE_CATEGORY = async (values: CategorySchemaType) => {
  const {data, success} = CategorySchema.safeParse(values);

  if (!success) {
    throw new Error("Invalid input value");
  }

  const category = await db.category.findFirst({
    where: {
      name: values.name,
    },
  });

  if (category) {
    throw new Error("Category exists");
  }

  await db.category.create({
    data: {
      ...data,
    },
  });

  revalidatePath("/dashboard/category");

  return {
    success: "Category created",
  };
};

type EditCategory = {
  values: CategorySchemaType;
  categoryId: string;
}

export const EDIT_CATEGORY = async ({values, categoryId}: EditCategory) => {
  const {data, success} = CategorySchema.safeParse(values);

  if (!success) {
    throw new Error("Invalid input value");
  }

  const category = await db.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  await db.category.update({
    where: {
      id: categoryId,
    },
    data: {
      ...data
    },
  });

  revalidatePath(`/dashboard/category/edit/${categoryId}`);

  return {
    success: "Category updated",
  };
};

export const DELETE_CATEGORY = async (categoryId: string) => {
  const category = await db.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  await db.category.delete({
    where: {
      id: categoryId,
    },
  });

  revalidatePath("/dashboard/category");

  return {
    success: "Category deleted",
  };
};

export const GET_CATEGORIES = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    categories,
  };
};
