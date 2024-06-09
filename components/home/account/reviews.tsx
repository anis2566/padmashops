"use client"

import Image from "next/image"
import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { GET_UNREVIEWED_PRODUCT } from "@/actions/user.action"
import { Skeleton } from "@/components/ui/skeleton"

export const Reviews = () => {

    const { data: products, isFetching } = useQuery({
        queryKey: ["unreviewd-products"],
        queryFn: async () => {
            const res = await GET_UNREVIEWED_PRODUCT()
            return res.products
        },
        staleTime: 60 * 60 * 1000
    })

    return (
        <Card>
            <CardHeader className="pb-4">
                <CardTitle>Pending Reviews</CardTitle>
                <CardDescription>Submit reviews for the products you've purchased.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    {
                        isFetching ?
                            Array.from({ length: 2 }, (_, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex items-center gap-4">
                                        <Skeleton className="rounded-md h-[64px] w-[64px]" />
                                        <div>
                                            <Skeleton className="h-4 rounded w-32" />
                                            <Skeleton className="h-3 rounded w-24 mt-2" />
                                        </div>
                                        <div className="ml-auto hidden md:flex">
                                            <Button size="sm" variant="outline" disabled>
                                                Write Review
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )) :
                            products && products.map(product => (
                                <div key={product.id} className="space-y-2">
                                    <div className="flex items-center gap-4">
                                        <Image
                                            alt={product.name}
                                            className="rounded-md"
                                            height={64}
                                            src={product.featureImageUrl}
                                            style={{
                                                aspectRatio: "64/64",
                                                objectFit: "cover",
                                            }}
                                            width={64}
                                        />
                                        <div>
                                            <h4 className="font-semibold">{product.name}</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Purchased on March 15, 2023</p>
                                        </div>
                                        <div className="ml-auto hidden md:flex">
                                            <Button size="sm" variant="outline">
                                                Write Review
                                            </Button>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="outline" className="md:hidden">
                                        Write Review
                                    </Button>
                                </div>
                            ))
                    }

                    {
                        products?.length === 0 && (
                            <div className="flex flex-col items-center space-y-2">
                                <p className="text-indigo-500 text-center italic">No Pending Review</p>
                            </div>
                        )
                    }
                </div>
            </CardContent>
        </Card>
    )
}