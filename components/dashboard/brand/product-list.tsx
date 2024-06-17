import { Product } from "@prisma/client"

import { SmallProductCard } from "../card/small-product-card"

interface ProductListProps {
    products: Product[]
}

export const ProductList = ({products}:ProductListProps) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {
                products.map(product => (
                    <SmallProductCard key={product.id} product={product} />
                ))
            }
        </div>
    )
}