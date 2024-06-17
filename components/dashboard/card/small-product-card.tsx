"use client"

import Image from "next/image"
import { TbCurrencyTaka } from "react-icons/tb";
import { useEffect, useState } from "react";
import { Product } from "@prisma/client";

interface Props {
    product: Product;
}


export const SmallProductCard = ({ product }: Props) => {
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
        </div>
    )
}
