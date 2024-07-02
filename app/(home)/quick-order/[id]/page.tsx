import { redirect } from "next/navigation";

import { ProductImages } from "@/components/home/product/product-image";
import { OrderForm } from "@/components/home/quick-order";
import { Notice } from "@/components/home/quick-order/marquer";
import { db } from "@/lib/db";
import { RelatedProducts } from "@/components/home/product/related-products";

interface Props {
    params: {
        id: string;
    }
}

const QuickOrderProduct = async ({ params:{id} }: Props) => {
    const product = await db.product.findUnique({
        where: {
            id
        },
        include: {
            stocks: true,
            category: true,
            brand: true,
            reviews: true
        }
    })
    
    if (!product) redirect("/")
    
    return (
        <div className="w-full max-w-screen-xl mx-auto px-3 my-7 py-3 space-y-6 bg-white">
            <Notice />
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProductImages featureImage={product.featureImageUrl} images={product.images} />
                <OrderForm product={product} />
            </div>

            <div className="mt-10">
                <RelatedProducts category={product?.category?.name ?? ""} productId={id} />
            </div>
        </div>
    )
}

export default QuickOrderProduct