"use client"

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Rating } from '@smastrom/react-rating'
import { Product } from "@prisma/client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import '@smastrom/react-rating/style.css'

import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button";

import { GET_REVIEWS } from "@/actions/review.action";

interface ReviewListProps {
    product: Product;
    productId: string;
}

export const ReviewList = ({ product, productId }: ReviewListProps) => {
    const [page, setPage] = useState<number>(1)

    const { data, isLoading} = useQuery({
        queryKey: ["get-reviews", productId, page],
        queryFn: async () => {
            const res = await GET_REVIEWS({ productId, page})
            return res
        },
    })
    console.log(data)

    const handlePrev = () => {
        setPage((prevPage) => prevPage - 1);
    };

    const handleNext = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handleClick = (pageNumber:number) => {
        setPage(Number(pageNumber));
    };

    return (
        <div className="w-full">
            <div className="grid gap-2 mb-4">
                <h1 className="text-xl font-bold">Total Reviews ({product.ratingCount})</h1>
                <h1 className="text-xl font-bold">Rating ({product.averageRating})</h1>
            </div>
            <div className="grid gap-6">
                {
                    isLoading ? (
                        <ReviewListSkeleton />
                    ) : 
                    data?.reviews?.map(review => (
                        <div className="grid gap-4" key={review.id}>
                            <div className="flex gap-4 items-start">
                                <Avatar className="w-10 h-10 border">
                                    <AvatarImage alt="@shadcn" src={review.user.imageUrl || ""} />
                                    <AvatarFallback>RV</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-4">
                                    <div className="flex gap-4 items-start">
                                        <div className="grid gap-0.5 text-sm">
                                            <h3 className="font-semibold">{review?.user?.name}</h3>
                                            <p className="text-sm text-muted-foreground">{format(review?.createdAt, "dd MMMM yyyy")}</p>
                                        </div>
                                        <Rating value={review.rating} readOnly style={{ maxWidth: 100 }} />
                                    </div>
                                    <div className="text-sm">
                                        <p>
                                            {review.comment}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <Separator />
                        </div>
                    ))
                }
            </div>

            <Pagination className="pt-5">
                <PaginationContent>
                    <Button variant="ghost" className="flex items-center gap-x-2" onClick={handlePrev} disabled={page <= 1}>
                        <ChevronLeft className="w-5 h-5" />
                        Previous
                    </Button>
                    <div className="hidden md:flex">
                        {
                            Array.from({ length: Math.ceil(product.ratingCount / 3) }, (_, i) => (
                                <PaginationItem key={i}>
                                    <Button variant="ghost" size="icon" onClick={() => handleClick((i+1))} disabled={page === i + 1}>
                                        {i + 1}
                                    </Button>
                                </PaginationItem>
                            ))
                        }
                    </div>
                    <Button variant="ghost" className="flex items-center gap-x-2" onClick={handleNext} disabled={page >= Math.ceil(product.ratingCount / 3)}>
                        Next
                        <ChevronRight className="w-5 h-5" />
                    </Button>
                </PaginationContent>
            </Pagination>
        </div>
    )
}


export const ReviewListSkeleton = () => {
    return (
        <div className="w-full">
            <div className="grid gap-6">
                {[...Array(3)].map((_, index) => (
                    <div className="grid gap-4" key={index}>
                        <div className="flex gap-4 items-start">
                            <Skeleton className="w-10 h-10 rounded-full" />
                            <div className="grid gap-4">
                                <div className="space-y-1">
                                    <Skeleton className="h-4 w-[130px]" />
                                    <Skeleton className="h-4 w-[100px]" />
                                    </div>
                                <div className="text-sm">
                                    <Skeleton className="h-4 w-3/4" />
                                </div>
                            </div>
                        </div>
                        <Separator />
                    </div>
                ))}
            </div>
        </div>
    );
};