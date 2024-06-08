"use client"

import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export function Banner() {

    return (
        <Carousel
            className="flex-1 relative"
            plugins={[
                Autoplay({
                    delay: 5000,
                }),
            ]}
        >
            <CarouselContent>
                <CarouselItem>
                    <Image
                        src="/banner.jpg"
                        alt="Banner"
                        width={1000}
                        height={1000}
                        className="w-full h-full max-h-[380px]"
                    />
                </CarouselItem>

            </CarouselContent>
            <CarouselPrevious className="absolute left-3" />
            <CarouselNext className="absolute right-3" />
        </Carousel>
    )
}