"use client"

import { ProductWithFeature } from "@/@types"
import { ProductCard } from "../card/product-card"
import { usePopularProduct } from "@/hooks/use-popular-product"

interface PopularProductListProps {
    products: ProductWithFeature[]
}

export const PopularProductList = ({ products }: PopularProductListProps) => {
    const { onOpen } = usePopularProduct()
    
    return (
        <div className="grid md:grid-cols-4 gap-4 gap-y-4">
            {
                products.map(product => (
                    <ProductCard key={product.id} product={product} onClick={() => onOpen(product.id)} />
                ))
            }
        </div>
    )
}