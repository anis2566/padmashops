"use client"

import { Product } from "@prisma/client"
import { Trash2 } from "lucide-react"
import Image from "next/image"
import { TbCurrencyTaka } from "react-icons/tb"

import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { useFeatureProduct } from "@/hooks/use-feature-product"

interface FeatureProductListProps {
    products: Product[]
}

export const FeatureProductList = ({ products }: FeatureProductListProps) => {
    const { onOpen } = useFeatureProduct()
    
    return (
        <div className="grid md:grid-cols-2 gap-6">
            {
                products.map(product => (
                    <div key={product.id} className="shadow-md shadow-primary/60 p-3 rounded-md space-y-3">
                        <div className="flex flex-col md:flex-row gap-x-2">
                            <Image
                                src={product.featureImageUrl}
                                alt="Product"
                                width={100}
                                height={100}
                                className="aspect-square object-contain"
                            />
                            <div className="flex-1">
                                <p className="text-md">
                                    {product.name}
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
                                <p>{product.totalStock} in stock</p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-x-2">
                            <p className="flex-1">{product.featureTitle}</p>
                            <TooltipProvider>
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" onClick={() => onOpen(product.id)}>
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
                ))
            }
        </div>
    )
}