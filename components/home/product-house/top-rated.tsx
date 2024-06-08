"use client"

import { Progress } from "@/components/ui/progress"
import { useQuery } from "@tanstack/react-query"
import { SmallCard, SmallCardSkeleton } from "@/components/home/card/small-card"
import { GET_TOP_RATED_PRODUCS } from "@/actions/product.action"

export const TopRated = () => {
    const { data: products, isFetching } = useQuery({
        queryKey: ["get-top-selling"],
        queryFn: async () => {
            const res = await GET_TOP_RATED_PRODUCS()
            return res.products
        },
        staleTime: 60 * 60 * 1000
    })

    return (
        <div className="space-y-3 mt-10 md:mt-0">
            <p className="text-2xl font-semibold text-slate-700">Top Rated</p>
            <Progress value={0} className="w-[100px] h-1 bg-muted-foreground" />
            <div className="space-y-4">
                {
                    isFetching ?
                        Array.from({ length: 3 }, (_, index) => (
                            <SmallCardSkeleton key={index} />
                        ))
                        :
                        products && products.slice(0,3).map(product => (
                            <SmallCard product={product} key={product.id} />
                        ))
                }
            </div>
        </div>
    )
}