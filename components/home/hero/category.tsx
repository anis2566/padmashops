"use client"

import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

import { Skeleton } from "@/components/ui/skeleton"

import { GET_CATEGORIES } from "@/actions/category.action"

export const HeroCategory = () => {

  const { data: categories, isFetching } = useQuery({
    queryKey: ["home-category"],
    queryFn: async () => {
      const res = await GET_CATEGORIES()
      return res.categories
    },
    staleTime: 60 * 60 * 1000
  })

  if (isFetching) {
    return <CategorySkeleton />
  }

  return (
    <div className="hidden sm:block w-[250px] bg-white max-h-[400px] overflow-y-auto">
      {
        categories?.map(category => (
          <Link href={`/shop?category=${category.name}`} key={category.id} className="w-full py-2 px-4 flex items-center gap-x-2 hover:bg-primary hover:text-white">
            <img
              alt={category.name}
              className="rounded-full w-10 h-6 object-contain"
              height="30"
              src={category.imageUrl}
              width="30"
            />
            {category.name}
          </Link>
        ))
      }
    </div>
  )
}


const CategorySkeleton = () => {
  return (
    <div className="hidden sm:block w-[250px] bg-white max-h-[400px] overflow-y-auto space-y-2">
      {
        Array.from({ length: 5 }, (_, index) => (
          <Skeleton className="w-full h-10" key={index} />
        ))
      }
    </div>
  )
}