"use client"

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton";

import { CustomPagination } from "@/components/custom-pagination";
import { GET_REVIEWS } from "@/actions/review.action";
import { useSearchParams } from "next/navigation";

interface ReviewListProps {
    productId: string;
}

export const ReviewList = ({ productId }: ReviewListProps) => {

    const page = useSearchParams().get("page")

    const { data, isLoading} = useQuery({
        queryKey: ["get-reviews", productId, page],
        queryFn: async () => {
            const res = await GET_REVIEWS({ productId, page: page || "1"})
            return res
        },
    })
    console.log(data)
    return (
        <div className="w-full">
            <div className="grid gap-2 mb-4">
                <h1 className="text-xl font-bold">Total Reviews ({data?.totalReview})</h1>
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
            <CustomPagination totalPage={(data?.totalReview ?? 0) / 3} />
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