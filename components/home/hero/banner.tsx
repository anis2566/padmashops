"use client"

import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"

import { GET_BANNERS_CLIENT } from "@/actions/banner.action"

export function Banner() {

    const {data:banners, isLoading} = useQuery({
        queryKey: ["get-banners-client"],
        queryFn: async () => {
            const res = await GET_BANNERS_CLIENT()
            return res.banners
        },
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false
    })

    return (
        <>
            {
                isLoading ? (
                    <div className="w-full">
                        <Skeleton className="w-full h-[80px] md:h-[280px]" />
                    </div>
                ) : (
                    <Carousel
                        className="flex-1 relative"
                        plugins={[
                            Autoplay({
                                delay: 5000,
                            }),
                        ]}
                    >
                        <CarouselContent>
                            {
                                banners?.map(banner => (
                                    <CarouselItem key={banner.id}>
                                        <Image
                                            src={banner.imageUrl}
                                            alt="Banner"
                                            width={1000}
                                            height={1000}
                                            className="w-full h-full max-h-[280px]"
                                        />
                                    </CarouselItem>
                                ))
                            }

                        </CarouselContent>
                        <CarouselPrevious className="absolute left-3" />
                        <CarouselNext className="absolute right-3" />
                    </Carousel>
                )
            }
        </>
    )
}
