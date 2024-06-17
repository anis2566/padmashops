import { RelatedProductSlider } from "./related-product-slider"

interface RelatedProductsProps {
    category: string;
    productId: string;
}

export const RelatedProducts = ({category, productId}:RelatedProductsProps) => {
    return (
        <div className="px-4 pb-4 space-y-2">
            <h1 className="text-2xl font-semibold">Related Products</h1>
            <RelatedProductSlider category={category} productId={productId} />
        </div>
    )
}