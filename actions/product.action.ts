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


export const GET_POPULAR_PRODUCTS_CLIENT = async () => {
  const products = await db.product.findMany({
    where: {
      genre: {
        has: "popular"
      }
    },
    include: {
      brand: true,
      category: true,
      stocks: true
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 10
  });

  return { products };
}

export const SET_POPULAR_PRODUCT = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.genre.includes("popular")) {
    throw new Error("Already assigned in popular product");
  }

  await db.product.update({
    where: {
      id: productId,
    },
    data: {
      genre: [...(product.genre || []), "popular"],
    },
  });

  revalidatePath("/dashboard/popular-products");

  return {
    success: "Product assigned",
  };
};

export const REMOVE_POPULAR_PRODUCT = async (productId: string) => {
  const product = await db.product.findFirst({
    where: {
      id: productId,
      genre: {
        has: "popular"
      }
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  await db.product.update({
    where: {
      id: productId,
    },
    data: {
      genre: (product.genre || []).filter((g) => g !== "popular"),
    },
  });

  revalidatePath("/dashboard/popular-products")

  return {
    success: "Product removed from popular",
  };
};

export const GET_BEST_DEAL_PRODUCTS = async () => {
  const products = await db.product.findMany({
    where: {
      genre: {
        has: "best-deal"
      }
    },
    include: {
      brand: true,
      category: true,
      stocks: true
    },
    orderBy: {
      createdAt: "desc"
    },
    take: 6
  })
  return {
    products
  }
}

export const SET_BEST_DEAL_PRODUCT = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.genre.includes("best-deal")) {
    throw new Error("Already assigned in best deal product");
  }

  await db.product.update({
    where: {
      id: productId,
    },
    data: {
      genre: [...(product.genre || []), "best-deal"],
    },
  });

  revalidatePath("/dashboard/best-deal");

  return {
    success: "Product assigned",
  };
};

export const REMOVE_BEST_DEAL_PRODUCT = async (productId: string) => {
  const product = await db.product.findFirst({
    where: {
      id: productId,
      genre: {
        has: "best-deal",
      },
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  await db.product.update({
    where: {
      id: productId,
    },
    data: {
      genre: (product.genre || []).filter((g) => g !== "best-deal"),
    },
  });

  revalidatePath("/dashboard/best-deal");

  return {
    success: "Product removed from best deal",
  };
};

export const GET_FEATURE_PRODUCTS = async () => {
  const products = await db.product.findMany({
    where: {
      genre: {
        has: "feature"
      }
    },
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

type SetFeatureProduct = {
  productId: string;
  title: string;
}
export const SET_FEATURE_PRODUCT = async ({productId, title}: SetFeatureProduct) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.genre.includes("feature")) {
    throw new Error("Already assigned in feature product");
  }

  await db.product.update({
    where: {
      id: productId,
    },
    data: {
      genre: [...(product.genre || []), "feature"],
      featureTitle: title
    },
  });

  revalidatePath("/dashboard/feature-products");

  return {
    success: "Product assigned",
  };
};

export const REMOVE_FEATURE_PRODUCT = async (productId: string) => {
  const product = await db.product.findFirst({
    where: {
      id: productId,
      genre: {
        has: "feature"
      }
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  await db.product.update({
    where: {
      id: productId,
    },
    data: {
      genre: (product.genre || []).filter((g) => g !== "feature"),
      featureTitle: ""
    },
  });

  revalidatePath("/dashboard/feature-products")

  return {
    success: "Product removed from popular",
  };
};

export const GET_RECENTLY_ADDED_PRODUCTS = async () => {
  const products = await db.product.findMany({
    include: {
      brand: true,
      category: true,
      stocks: true
    },
    orderBy: {
      createdAt: "desc"
    },
    take: 3
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
    },
    orderBy: {
      averageRating: "desc"
    },
    take: 3
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
    },
    orderBy: {
      totalSell: "desc"
    },
    take: 3
  })
  return {
    products
  }
}

type RelatedProducts = {
  category: string;
  productId: string;
}
export const GET_RELATED_PRODUCS = async ({ category, productId }: RelatedProducts) => {
  const products = await db.product.findMany({
    where: {
      category: {
        name: category
      },
      NOT: {
        id: productId
      }
    },
    include: {
      brand: true,
      category: true,
      stocks: true
    },
    orderBy: [
      {
        totalSell: "desc"
      },
      {
        averageRating: "desc"
      }
    ],
    take: 6
  })

  return {
    products
  }
}

type GetProducts = {
  search: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  brand: string;
  sort: string;
  page: string;
  tag: string;
};

export const GET_PRODUCTS = async ({
  search = "",
  category,
  minPrice,
  maxPrice,
  brand,
  sort,
  page,
  tag
}: GetProducts) => {
  const itemsPerPage = 20;
  const currentPage = parseInt(page) || 1;
  const searchWords = search.split(" ");

  const products = await db.product.findMany({
    where: {
      AND: [
        {
          OR: searchWords.map((word) => ({
            OR: [
              { name: { contains: word, mode: "insensitive" } },
              { category: { name: { contains: word, mode: "insensitive" } } },
            ],
          })),
        },
        { category: { name: category } },
        { brand: { name: brand } },
        ...(minPrice ? [{ price: { gte: parseInt(minPrice) } }] : []),
        ...(maxPrice ? [{ price: { lte: parseInt(maxPrice) } }] : []),
        ...(tag ? [{ genre: { has: tag } }] : []),
      ],
    },
    include: {
      category: true,
      stocks: true,
      brand: true,
    },
    orderBy: {
      ...(sort === "asc" && { createdAt: "asc" }),
      ...(sort === "desc" && { createdAt: "desc" }),
      ...(sort === "high-to-low" && { price: "desc" }),
      ...(sort === "low-to-high" && { price: "asc" }),
    },
    skip: (currentPage - 1) * itemsPerPage,
    take: itemsPerPage,
  });

  const totalProduct = await db.product.count({
    where: {
      AND: [
        {
          OR: searchWords.map((word) => ({
            OR: [
              { name: { contains: word, mode: "insensitive" } },
              { category: { name: { contains: word, mode: "insensitive" } } },
            ],
          })),
        },
        { category: { name: category } },
        { brand: { name: brand } },
        ...(minPrice ? [{ price: { gte: parseInt(minPrice) } }] : []),
        ...(maxPrice ? [{ price: { lte: parseInt(maxPrice) } }] : []),
      ],
    }
  })

  return {
    products,
    totalProduct
  };
};


export const GET_PRODUCTS_CLIENT = async (search: string) => {
  const products = await db.product.findMany({
    where: {
      ...(search && {name: {contains: search, mode: "insensitive"}})
    },
    orderBy: {
      createdAt: "desc"
    },
    take: 3
  })

  return {
    products
  }
}


