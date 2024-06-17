import '@smastrom/react-rating/style.css'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ReviewForm } from "./review-form"
import { ReviewList } from "./review-list"
import { Product } from '@prisma/client';

interface ReviewProps {
    product: Product;
    productId: string;
}

export const Reviews = ({product, productId}:ReviewProps) => {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Leave a Review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
                <ReviewForm productId={productId} />
                <ReviewList product={product} productId={productId} />
            </CardContent>
        </Card>
    )
}