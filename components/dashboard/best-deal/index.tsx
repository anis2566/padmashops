"use client"

import { ProductWithFeature } from "@/@types"
import { ProductCard } from "../card/product-card"
import { useBestDealProduct } from "@/hooks/use-best-deal-product"

interface PopularProductListProps {
    products: ProductWithFeature[]
}

export const PopularProductList = ({ products }: PopularProductListProps) => {
    const { onOpen } = useBestDealProduct()
    
    return (
        <div className="grid md:grid-cols-4 gap-4">
            {
                products.map(product => (
                    <ProductCard key={product.id} product={product} onClick={() => onOpen(product.id)} />
                ))
            }
        </div>
    )
}