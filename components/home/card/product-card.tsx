"use client"

import Image from "next/image"
import Link from "next/link";
import { TbCurrencyTaka } from "react-icons/tb";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";
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
import { useCart } from "@/store/use-cart";
import { cn } from "@/lib/utils";

interface Props {
    product: ProductWithFeature
}


export const ProductCard = ({ product }: Props) => {
    const { addToCart } = useCart()
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth <= 1024);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call on mount to check initial size

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleAddToCart = () => {
        const price = product.discountPrice || product.price
        addToCart({product, price, quantity:1})
        toast.success("Added to cart")
    }

    return (
        <div className="p-2 flex flex-col justify-between space-y-1 border-2 border-gray-200 hover:border-primary relative">
            <Link href={`/shop/${product.id}`}>
                <div className="aspect-square">
                    <Image
                        src={product.featureImageUrl}
                        alt={product.name}
                        width="200"
                        height="200"
                    />
                </div>
                <p className="text-md">
                    {product.name.length > 40 ? isDesktop ? `${product.name.substring(0,25)}...` : `${product.name.substring(0, 40)}...` : product.name}
                </p>
                <div className="flex items-center gap-x-3">
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
                <p 
                    className={cn(
                        "hidden", 
                        product.name.length <= 24 && "block opacity-0",

                    )}
                >
                    fafa
                </p>
            </Link>
            <div className="flex items-center gap-x-2">
                <Button className="flex-1">Order Now</Button>
                <TooltipProvider>
                    <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={handleAddToCart}>
                                <ShoppingCart />    
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                        <p>Add to Cart</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )
}


export const ProductCartSkeleton = () => {
    return (
        <div className="p-2 flex flex-col space-y-2">
            <Skeleton className="aspect-square" />
            <Skeleton className="w-[90%] h-10" />
            <Skeleton className="w-[70%] h-5" />
            <Skeleton className="w-full h-8" />
        </div>
    )
}