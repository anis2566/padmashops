"use client"

import Image from "next/image"
import { TbCurrencyTaka } from "react-icons/tb";
import { useEffect, useState } from "react";
import { Product } from "@prisma/client";

import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

interface Props {
    product: Product
}


export const ProductCard = ({ product }: Props) => {
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
        <div className="p-2 flex flex-col justify-between min-h-[270px] md:min-h-[310px] space-y-1 border-2 border-gray-200 hover:border-primary relative">
            <>
                <div className="aspect-square">
                    <Image
                        src={product.featureImageUrl}
                        alt={product.name}
                        width="200"
                        height="200"
                        className="mx-auto"
                    />
                </div>
                <p className="text-md">
                    {product.name.length > 40 ? isDesktop ? `${product.name.substring(0, 25)}...` : `${product.name.substring(0, 40)}...` : product.name}
                </p>
                <div className="flex items-center gap-x-1 md:gap-x-3">
                    <div className="flex items-center text-primary font-bold">
                        <TbCurrencyTaka className="h-5 w-5" />
                        <p className="-ml-1">
                            {product.sellerPrice}
                        </p>
                    </div>
                    <div className="flex items-center text-rose-500 line-through">
                        <TbCurrencyTaka className="h-5 w-5" />
                        <p className="-ml-1">
                            {product.price}
                        </p>
                    </div>
                </div>
            </>
            <div className="flex items-center gap-x-1 md:gap-x-2">
                <Badge
                    className={cn(
                        "text-white bg-green-500",
                        product.totalStock === 0 ? "bg-rose-500" : ""
                    )}
                >
                    {product?.totalStock ?? 0 > 0 ? "In Stock" : "Stock out"}
                </Badge>
                <p>{product?.totalStock} Items</p>
            </div>
        </div>
    )
}
