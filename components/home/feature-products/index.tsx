"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { TbCurrencyTaka } from "react-icons/tb"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

import { GET_FEATURE_PRODUCTS } from "@/actions/product.action"
import { cn } from "@/lib/utils"


export function FeatureProducts() {
    const { data: products, isFetching } = useQuery({
        queryKey: ["feature-products"],
        queryFn: async () => {
            const res = await GET_FEATURE_PRODUCTS()
            return res.products
        },
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false
    })

    return (
        <div className="w-full max-w-screen-xl mx-auto bg-white p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-x-6 gap-y-4">
            {
                isFetching ? (
                    <>
                        <ProductSkeleton />
                        <ProductSkeleton />
                        <ProductSkeleton />
                    </>
                ) : (
                    products?.slice(0,3)?.map((product) => (
                        <div className="rounded-2xl relative border flex flex-col justify-center pl-4 md:pl-10 shadow-md shadow-primary/40 aspect-video group"
                            style={{ backgroundImage: `url("${product.featureImageUrl}")`, backgroundSize: '30%', backgroundPosition: 'right bottom', backgroundRepeat: "no-repeat" }}
                            key={product.id}
                        >
                            <div className="space-y-3 flex flex-col justify-between h-full py-2 md:py-8">
                                <p className="text-md md:text-xl font-bold text-slate-700 max-w-[200px] group-hover:-translate-y-3 transition-all duration-300 ease-in-out">
                                    {product.featureTitle}
                                </p>
                                <div className="flex items-center gap-x-1 md:gap-x-3">
                                    <div className="flex items-center text-primary font-bold">
                                        <TbCurrencyTaka className="h-5 w-5" />
                                        <p className="-ml-1">
                                            {product.discountPrice || product.price}
                                        </p>
                                    </div>
                                    <div
                                        className={cn(
                                            "flex items-center text-rose-500 line-through",
                                            !product.discountPrice && "hidden"
                                        )}
                                    >
                                        <TbCurrencyTaka className="h-5 w-5" />
                                        <p className="-ml-1">
                                            {product.price}
                                        </p>
                                    </div>
                                </div>
                                <Link href={`/shop/${product.id}`}>
                                    <Button className="group-hover:translate-x-2 transition-all duration-300 ease-in-out max-w-[100px]">
                                        Shop Now
                                        <ArrowRight />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    )
}


const ProductSkeleton = () => {
    return (
        <div className="rounded-2xl relative border flex flex-col justify-center pl-10 aspect-video shadow-md shadow-primary/40">
            <div className="space-y-3 flex flex-col justify-between h-full py-8">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-2/4 mt-2" />
                <div className="flex justify-between items-center">
                    <Skeleton className="h-10 w-1/2" />
                    <Skeleton className="w-20 h-20 rounded-full" />
                </div>
            </div>
        </div>
    )
}