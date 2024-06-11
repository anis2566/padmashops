"use server";

import { db } from "@/lib/db";
import {
  ProductSchema,
  ProductSchemaType,
  VariantProductSchema,
  VariantProductSchemaType,
} from "@/schema/product.schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const CREATE_PRODUCT = async (values: ProductSchemaType) => {
  const {success, data} = ProductSchema.safeParse(values);

  if (!success) {
    throw new Error("Invalid input value");
  }

  await db.product.create({
    data: {
      ...values,
    },
  });

  revalidatePath("/dashboard/products");

  return {
    success: "Product created",
  };
};

export const CREATE_VARIANT_PRODUCT = async (
  values: VariantProductSchemaType
) => {
  const {success, data} = VariantProductSchema.safeParse(values);

  if (!success) {
    throw new Error("Invalid input value");
  }

  const product = await db.product.create({
    data: {
      ...data,
    },
  });

  revalidatePath("/dashboard/products");

  return {
    success: "Product created",
    productId: product.id,
  };
};

type EditProduct = {
  values: ProductSchemaType;
  productId: string;
}

export const EDIT_PRODUCT = async ({values, productId}: EditProduct) => {
  const {data, success} = ProductSchema.safeParse(values);

  if (!success) {
    throw new Error("Invalid input value");
  }

  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  await db.product.update({
    where: {
      id: product.id,
    },
    data: {
      ...data,
    },
  });

  revalidatePath(`/dashboard/product/${productId}`)

  return {
    success: "Product updated",
  };
};

export const DELETE_PRODUCT = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  await db.product.delete({
    where: {
      id: productId,
    },
  });

  revalidatePath("/dashboard/products");

  return {
    success: "Product deleted",
  };
};


export const GET_PRODUCT = async (id: string) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      brand: true,
      stocks: true,
      category: true,
    },
  });

  if (!product) redirect("/");

  return {
    product,
  };
};


export const GET_POPULAR_PRODUCTS = async () => {
  const products = await db.product.findMany({
    include: {
      brand: true,
      category: true,
      stocks: true
    }
  })
  return {
    products
  }
}


export const GET_BEST_DEAL_PRODUCTS = async () => {
  const products = await db.product.findMany({
    include: {
      brand: true,
      category: true,
      stocks: true
    }
  })
  return {
    products
  }
}

export const GET_FEATURE_PRODUCTS = async () => {
  const products = await db.product.findMany({
    include: {
      brand: true,
      category: true,
      stocks: true
    }
  })
  return {
    products
  }
}

export const GET_RECENTLY_ADDED_PRODUCTS = async () => {
  const products = await db.product.findMany({
    include: {
      brand: true,
      category: true,
      stocks: true
    }
  })
  return {
    products
  }
}

export const GET_TOP_RATED_PRODUCS = async () => {
  const products = await db.product.findMany({
    include: {
      brand: true,
      category: true,
      stocks: true
    }
  })
  return {
    products
  }
}

export const GET_TOP_SELLING_PRODUCS = async () => {
  const products = await db.product.findMany({
    include: {
      brand: true,
      category: true,
      stocks: true
    }
  })
  return {
    products
  }
}