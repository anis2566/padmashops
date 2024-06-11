"use client"

import Image from "next/image"
import {useState, useEffect} from "react"
import {Loader} from "lucide-react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import {cn} from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface ProductImagesProps {
    featureImage: string,
    images: string[]
}

export const ProductImages = ({images, featureImage}:ProductImagesProps) => {
    const [activeImage, setActiveImage] = useState("")

    useEffect(() => {
        setActiveImage(featureImage)
    },[featureImage])

    return (
        <div className="w-full">
            <div className="border border-gray-400 w-full max-w-[350px] mx-auto rounded-md flex items-center justify-center p-2">
                {activeImage === "" ? (
                    <Loader className="h-8 w-8 animate-spin" />
                ) : (
                    <Image
                        alt="Product"
                        className="h-[300px] object-cover rounded-lg"
                        height="300"
                        src={activeImage}
                        width="300"
                    />
                )}
            </div>
            <div className="w-full px-2 mt-3">
                <Carousel className="w-full max-w-sm mx-auto">
                    <CarouselContent className="">
                        {[featureImage, ...images].map((image, index) => {
                            const active = image === activeImage
                            return (
                                <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/4">
                                    <div className="p-1">
                                        <div className={cn("border border-gray-300 rounded-md aspect-square flex items-center justify-center", active && "border-gray-400 opacity-70")} onClick={() => setActiveImage(image)}>
                                            <Image
                                                alt="Product"
                                                className="rounded-lg w-[50px] h-[50px]"
                                                height="70"
                                                src={image}
                                                width="70"
                                            />
                                        </div>
                                    </div>
                                </CarouselItem>
                            )}
                        )}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    )
}


export const ProductImagesSkeleton = () => {
    return (
        <div className="w-full">
            <div className="border border-gray-400 w-full max-w-[350px] mx-auto rounded-md flex items-center justify-center p-2">
                <Skeleton className="h-[300px] w-[300px] rounded-lg" />
            </div>
            <div className="w-full px-2 mt-3">
                <div className="w-full max-w-sm mx-auto">
                    <div className="flex space-x-2">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="p-1 basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/4">
                                <Skeleton className="w-[70px] h-[70px] rounded-lg" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}