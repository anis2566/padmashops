"use client"

import Image from "next/image"
import { TbCurrencyTaka } from "react-icons/tb";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { ProductWithFeature } from "@/@types";

interface Props {
    product: ProductWithFeature;
    onClick: () => void;
}


export const ProductCard = ({ product, onClick }: Props) => {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth <= 1024);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call on mount to check initial size

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="p-2 flex flex-col justify-between min-h-[270px] md:min-h-[310px] space-y-1 shadow-md shadow-primary/60 relative">
            <div className="aspect-square mx-auto">
                <Image
                    src={product.featureImageUrl}
                    alt={product.name}
                    width="200"
                    height="200"
                />
            </div>
            <p className="text-md">
                {product.name.length > 40 ? isDesktop ? `${product.name.substring(0, 25)}...` : `${product.name.substring(0, 40)}...` : product.name}
            </p>
            <div className="flex items-center gap-x-1 md:gap-x-3">
                <div className="flex items-center text-primary font-bold">
                    <TbCurrencyTaka className="h-5 w-5" />
                    <p className="-ml-1">
                        {product.discountPrice || product.price}
                    </p>
                </div>
                <div className="flex items-center text-rose-500 line-through">
                    <TbCurrencyTaka className="h-5 w-5" />
                    <p className="-ml-1">
                        {product.price}
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <p>{product.totalStock} in stock</p>
                <TooltipProvider>
                    <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={onClick}>
                                <Trash2 className="w-5 h-5 text-rose-500" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Remove product</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )
}


export const ProductCardSkeleton = () => {
    return (
        <div className="grid md:grid-cols-4 gap-4">
            {
                Array.from({length: 4}, (_, index) => (
                    <div className="p-2 flex flex-col space-y-2 shadow-md shadow-primary/60" key={index}>
                        <Skeleton className="aspect-square" />
                        <Skeleton className="w-[90%] h-10" />
                        <Skeleton className="w-[70%] h-5" />
                        <Skeleton className="w-full h-8" />
                    </div>
                ))
            }
        </div>
    )
}