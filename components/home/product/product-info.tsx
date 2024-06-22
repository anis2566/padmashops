"use client"

import { useState } from "react"
import { StarIcon } from "lucide-react"
import { MinusIcon, PlusIcon, HeartIcon } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

import { Label } from "@/components/ui/label"
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

import { calculateDiscountPercentage, cn } from "@/lib/utils"
import { ProductWithFeature } from "@/@types"
import { useCart } from "@/store/use-cart"
import { useWishlist } from "@/store/use-wishlist"

interface Props {
    product: ProductWithFeature
}

export const ProductInfo = ({ product }: Props) => {
    const [quantity, setQuantity] = useState<number>(1)
    const [color, setColor] = useState<string>("")
    const [size, setSize] = useState<string>("")

    const { addToCart } = useCart()
    const {addToWishlist} = useWishlist()


    const increamentQuantity = () => {
        if (product.totalStock && quantity < product.totalStock) {
            setQuantity(prev => prev + 1)
        }
    }

    const decreamentQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1)
        }
    }

    const handleAddToCart = () => {
        addToCart({ product, price: product.discountPrice || product.price, quantity, color, size })
        toast.success("Added to cart")
    }

    const handleAddToWishlist = () => {
        addToWishlist(product)
        toast.success("Added to wishlist")
    }

    return (
        <div className="space-y-3 px-2">
            {
                product.brand && (
                    <div className="flex items-center gap-x-2">
                        <Image
                            alt="Brand"
                            className="w-6 h-6 rounded-full object-cover"
                            height="100"
                            src={product.brand.imageUrl}
                            width="100"
                        />
                        <Badge variant="outline">{product.brand.name}</Badge>
                    </div>
                )
            }
            <div className="space-y-1">
                <h1 className="text-xl md:text-2xl font-bold text-slate-700">{product.name}</h1>
                <div className="flex items-center gap-x-4">
                    <Rating value={product.averageRating} readOnly style={{ maxWidth: 100 }} />
                    <p className="text-sm text-muted-foreground">({product.ratingCount} Reviews)</p>
                </div>
                <Badge variant="outline">{product?.category?.name}</Badge>

            </div>
            <div className="flex items-center gap-x-4">
                <p className="text-3xl font-bold text-slate-600">{product.discountPrice ? product.discountPrice : product.price}</p>
                {product.discountPrice && (
                    <div>
                        <p className="text-muted-foreground text-xs">{calculateDiscountPercentage(product.price, product.discountPrice)}% off</p>
                        <p className="text-slate-700 line-through text-md">{product.price}</p>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-x-4">
                <Badge variant="outline" className={cn("bg-green-500 text-white", product.totalStock === 0 ? "bg-rose-500" : "")}>{product.totalStock === 0 ? "Stock out" : "In stock"}</Badge>
                <p className="text-muted-foreground">({product.totalStock} remaining)</p>
            </div>

            {product.colors?.length > 0 && (
                <div className="grid">
                    <Label className="text-lg font-medium">Color</Label>
                    <div className="flex items-center gap-2">
                        <RadioGroup className="flex items-center gap-2" onValueChange={(color: string) => setColor(color)} defaultValue={color || product.colors[0] || ""} id="size">
                            {product.colors.map((color, i) => (
                                <Label
                                    className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                                    htmlFor={color}
                                    key={i}
                                >
                                    <RadioGroupItem id={color} value={color} />
                                    {color}
                                </Label>
                            ))}
                        </RadioGroup>
                    </div>
                </div>
            )}

            {product.stocks && product.stocks?.length > 0 && (
                <div className="grid">
                    <Label className="text-lg font-medium">Size</Label>
                    <div className="flex items-center gap-2">
                        <RadioGroup className="flex items-center gap-2" onValueChange={(size: string) => setSize(size)} defaultValue={color || product.stocks[0].size || ""} id="size">
                            {product.stocks.map((stock, i) => (
                                <Label
                                    className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800 uppercase"
                                    htmlFor={stock.id}
                                    key={i}
                                >
                                    <RadioGroupItem id={stock.id} value={stock.size || ""} />
                                    {stock.size}
                                </Label>
                            ))}
                        </RadioGroup>
                    </div>
                </div>
            )}

            <div className="grid">
                <Label className="text-lg font-medium">Quantity</Label>
                <div className="flex items-center gap-2">
                    <Button size="icon" variant="outline" onClick={decreamentQuantity}>
                        <MinusIcon className="h-3 w-3" />
                        <span className="sr-only">Decrease</span>
                    </Button>
                    <div className="border w-8 h-8 flex items-center justify-center dark:border-gray-800">{quantity}</div>
                    <Button size="icon" variant="outline" onClick={increamentQuantity}>
                        <PlusIcon className="h-3 w-3" />
                        <span className="sr-only">Increase</span>
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" onClick={handleAddToCart} disabled={product.totalStock === 0}>Add to cart</Button>
                <Button size="lg" variant="outline" onClick={handleAddToWishlist} disabled={product.totalStock === 0}>
                    <HeartIcon className="w-4 h-4 mr-2" />
                    Add to wishlist
                </Button>
            </div>
        </div>
    )
}


export const ProductInfoSkeleton = () => {
    return (
        <div className="space-y-3 px-2">
            <div className="flex items-center gap-x-2">
                <Skeleton className="w-20 h-6" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="w-24 h-6" />
            </div>
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-16" />
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
            </div>
        </div>
    )
}