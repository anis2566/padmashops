import { Product } from "@prisma/client"

import { ProductCard } from "../card/product-card"
import { Header } from "./header"
import { CustomPagination } from "@/components/custom-pagination";

interface StoreProductsProps {
    products: Product[];
    totalPage: number;
}

export const StoreProducts = ({products, totalPage}:StoreProductsProps) => {
    return (
        <div className="space-y-4">
            <Header />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 gap-y-4">
                {
                    products.map(product => (
                        <ProductCard product={product} key={product.id} />
                    ))
                }
            </div>
            <CustomPagination totalPage={totalPage} />
        </div>
    )
}