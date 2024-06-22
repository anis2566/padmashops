"use client"

import Link from "next/link"
import {TrashIcon, StarIcon } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { useWishlist } from "@/store/use-wishlist"
import { useCart } from "@/store/use-cart"

import {ProductWithFeature} from "@/@types"
import { toast } from "sonner"

const Wishlist = () => {
    const {wishlist, removeFromWishlist} = useWishlist()
    const {addToCart} = useCart()


    const handleRemoveFromWishlist = (id: string) => {
        removeFromWishlist(id)
        toast.success("Removed from wishlist")
    } 

    const handleAddToCart = (product: ProductWithFeature) => {
        addToCart({ product, price: product.discountPrice || product.price, quantity: 1 })
        removeFromWishlist(product.id)
        toast.success("Added to cart")
    }

    return (
        <Card className="w-full max-w-6xl mx-auto mt-6">
            <CardHeader className="flex flex-col items-start">
                <CardTitle className="text-lg font-bold">My Wishlist</CardTitle>
                <CardDescription className="text-sm leading-none mt-1">{wishlist.length} Items in your wishlist</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                {wishlist.map((product, i) => (
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border-t border-gray-200 first:rounded-t-lg dark:border-gray-800" key={i}>
                        <div className="flex items-center gap-x-2">
                            <Link className="rounded-lg overflow-hidden w-16 h-16 flex items-center justify-center" href="#">
                                <Image alt="Thumbnail" className="aspect-square object-cover" height={75} src={product.featureImageUrl} width={75} />
                            </Link>
                            <div className="flex-1 grid gap-2">
                                <h3 className="font-bold text-base leading-none">{product.name}</h3>
                                <div className="flex items-center gap-0.5">
                                    <StarIcon className="w-4 h-4 fill-amber-500 text-amber-500" />
                                    <StarIcon className="w-4 h-4 fill-amber-500 text-amber-500" />
                                    <StarIcon className="w-4 h-4 fill-amber-500 text-amber-500" />
                                    <StarIcon className="w-4 h-4 fill-amber-500 text-amber-500" />
                                    <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
                                </div>
                                <div className="text-sm">{product.discountPrice ? product.discountPrice : product.price}</div>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Button size="icon" variant="ghost" onClick={() => handleRemoveFromWishlist(product.id)}>
                                <TrashIcon className="w-6 h-6 text-rose-500" />
                            </Button>
                            <Button size="sm" onClick={() => handleAddToCart(product)} disabled={product.totalStock === 0}>Add to cart</Button>
                        </div>
                    </div>
                ))}
                {wishlist.length < 1 && (
                    <div className="min-h-[20vh] flex flex-col items-center justify-center">
                        <div className="space-y-3 mt-3">
                            <p className="text-center text-muted-foreground">Your wishlist is empty</p>
                            <Link href="/" className="flex justify-center">
                                <Button className="bg-amber-500 hover:bg-amber-600">
                                    Continue shopping
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default Wishlist;