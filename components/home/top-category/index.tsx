"use client"

import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

import { Skeleton } from "@/components/ui/skeleton"

import { GET_CATEGORIES } from "@/actions/category.action"

export const TopCategory = () => {
    const { data: categories, isFetching } = useQuery({
        queryKey: ["top-category"],
        queryFn: async () => {
            const res = await GET_CATEGORIES()
            return res.categories
        },
        staleTime: 60 * 60 * 1000
    })

    if (isFetching) {
        return <TopCategorySkeleton />
    }

    return (
        <div className="w-full max-w-screen-xl mx-auto bg-white space-y-3 px-2 py-3 overflow-x-auto">
            <h1 className="px-2 text-xl font-semibold text-slate-700">Top Category</h1>
            <div className="flex">
                {
                    categories?.map(category => (
                        <Link href={`/shop?category=${category.name}`} key={category.id} className="border border-gray-200 p-2 aspect-square w-[130px] h-[130px] flex flex-col items-center gap-1 group">
                            <img
                                alt={category.name}
                                className="transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                                height="60"
                                src={category.imageUrl}
                                style={{
                                    aspectRatio: "100/100",
                                    objectFit: "contain",
                                }}
                                width="60"
                            />
                            <p className="text-md font-semibold text-slate-700">
                                {category.name}
                            </p>
                            <p className="text-muted-foreground text-xs">10 Items</p>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}


const TopCategorySkeleton = () => {
    return (
        <div className="w-full max-w-screen-xl mx-auto bg-white space-y-3 px-2 py-3 overflow-x-auto">
            <h1 className="px-2 text-xl font-semibold text-slate-700">Top Category</h1>
            <div className="flex flex-nowrap md:flex-wrap gap-x-2">
                {
                    Array.from({ length: 5 }, (_, index) => (
                        <div className="border border-gray-200 p-2 aspect-square w-[130px] h-[130px] flex flex-col items-center gap-1" key={index}>
                            <Skeleton className="w-[60px] h-[60px] rounded-md" />
                            <Skeleton className="w-[80%] h-5" />
                            <Skeleton className="w-[60%] h-5" />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}