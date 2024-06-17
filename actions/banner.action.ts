"use server"

import { db } from "@/lib/db"
import { BannerSchema, BannerSchemaType } from "@/schema/banner.schema"

export const CREATE_BANNER = async (values: BannerSchemaType) => {
    const { data, success } = BannerSchema.safeParse(values)
    
    if (!success) {
        throw new Error("Invalid input value")
    }

    await db.banner.create({
        data: {
            ...data
        }
    })

    return {
        success: "Banner created"
    }
}


type GetBanners = {
    perPage: string;
    status: string;
    page: string;
}
export const GET_BANNERS = async ({ perPage, page, status }: GetBanners) => {
    const itemsPerPage = parseInt(perPage) || 4;  
    const currentPage = parseInt(page) || 1;

    const banners = await db.banner.findMany({
      where: {
        ...(status !== "all" && { status }),
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage,
    });

    const totalBanner = await db.banner.count({
      where: {
        ...(status !== "all" && { status }),
      },
    });

    return {
        banners,
        totalBanner
    }
}


export const GET_BANNERS_CLIENT = async () => {
    const banners = await db.banner.findMany({
      where: {
        status: "active"
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
        banners,
    }
}


export const DELETE_BANNER = async (bannerId: string) => {
  const banner = await db.banner.findUnique({
    where: {
      id: bannerId
    }
  })

  if (!banner) {
    throw new Error("Banner not found")
  }

  await db.banner.delete({
    where: {
      id: bannerId
    }
  })

  return {
    success: "Banner deleted"
  }
}

