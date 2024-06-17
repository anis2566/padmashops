"use client"

import { CirclePercent } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

import { Button } from "@/components/ui/button"

import { BestDealCard, ProductCartSkeleton } from "../card/best-deal-card"
import { GET_BEST_DEAL_PRODUCTS } from "@/actions/product.action"

export const DailyBestDeal = () => {
    const { data: products, isFetching } = useQuery({
        queryKey: ["get-best-deal-products"],
        queryFn: async () => {
            const { products } = await GET_BEST_DEAL_PRODUCTS();
            return products;
        },
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false
    })

    return (
        <div className="w-full max-w-screen-xl mx-auto bg-white p-4 space-y-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                    <CirclePercent className="w-7 h-7 text-primary" />
                    <h1 className="text-xl font-semibold text-slate-700">Daily Best Deal</h1>
                </div>
                <Button className="rounded-full" asChild>
                    <Link href={`/shop?tag=best-deal`}>
                        See All
                    </Link>
                </Button>
            </div>

            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-y-4 gap-x-4">
                {
                    isFetching ?
                        Array.from({ length: 6 }, (_, index) => (
                            <ProductCartSkeleton key={index} />
                        ))
                        :
                        products?.map(product => (
                            <BestDealCard product={product} key={product.id} />
                        ))
                }
            </div>
        </div>
    )
} 