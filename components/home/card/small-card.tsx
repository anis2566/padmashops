import { Product } from "@prisma/client"
import { StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

import { Skeleton } from "@/components/ui/skeleton"

interface Props {
    product: Product
}

export const SmallCard = ({ product }: Props) => {
    return (
        <Link href={`/shop/${product.id}`} className="w-full flex items-center gap-x-3 border border-gray-200 hover:border-gray-500 p-2 rounded-md">
            <div className="aspect-square w-full max-w-[100px] border-r border-gray-200 rounded-md p-2">
                <Image
                    alt="Thumbnail"
                    className="aspect-object object-cover rounded-lg"
                    height="100"
                    src={product.featureImageUrl}
                    width="100" 
                />
            </div>
            <div className="flex flex-col justify-between min-h-[100px]">
                <div>
                    <p className="text-md font-semibold">{product.name.slice(0, 40)}...</p>
                    <div className="flex items-center gap-x-4">
                        <Rating value={product.averageRating} readOnly style={{ maxWidth: 100 }} />
                        <p className="text-sm text-muted-foreground">({product.averageRating})</p>
                    </div>
                </div>
                <p className="text-slate-700 text-md">&#2547;{product.discountPrice ? product.discountPrice : product.price}</p>
            </div>
        </Link>
    )
}



export const SmallCardSkeleton = () => {
    return (
        <div className="w-full flex items-center gap-x-3 border border-gray-200 p-2 rounded-md">
            <div className="aspect-square w-full max-w-[100px] border-r border-gray-200 rounded-md p-2">
                <Skeleton className="aspect-object object-cover rounded-lg w-full h-full" />
            </div>
            <div className="flex flex-col justify-between min-h-[100px] w-full">
                <div>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="w-2/4 h-4" />
                </div>
                <Skeleton className="h-6 w-1/2" />
            </div>
        </div>
    )
}