"use client"

import { useQuery } from "@tanstack/react-query";
import Autoplay from "embla-carousel-autoplay"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import { ProductCard, ProductCartSkeleton } from "../card/product-card";
import { GET_POPULAR_PRODUCTS } from "@/actions/product.action";

export const Slider = () => {
    const { data: products, isFetching } = useQuery({
        queryKey: ["get-popular"],
        queryFn: async () => {
            const { products } = await GET_POPULAR_PRODUCTS();
            return products;
        },
        staleTime: 60 * 60 * 1000
    })


    return (
        <Carousel
            opts={{
                align: "center",
            }}
            plugins={[
                Autoplay({
                    delay: 5000,
                }),
            ]}
            className="w-full max-w-[1400px] bg-white"
        >
            <CarouselContent className="-ml-2 md:-ml-4 bg-white">
                {
                    isFetching ?
                        Array.from({ length: 6 }, (_, index) => (
                            <CarouselItem className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6" key={index}>
                                <ProductCartSkeleton />
                            </CarouselItem>
                        ))
                        :
                        products?.map((product) => (
                            <CarouselItem key={product.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
                                <ProductCard product={product} />
                            </CarouselItem>
                        ))
                }
            </CarouselContent>
            <CarouselPrevious className="-left-3 top-[50%]" />
            <CarouselNext className="-right-3 top-[50%]" />
        </Carousel>
    )
}