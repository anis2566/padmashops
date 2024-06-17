"use client"

import { Heart, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"
import { useWishlist } from "@/store/use-wishlist"

export const Wishlist = () => {
    const {wishlist, removeFromWishlist} = useWishlist()

    return (
       <HoverCard>
            <HoverCardTrigger asChild>
                <div className="relative hidden md:flex">
                    <Link href="/wishlist">
                        <Button variant="outline" size="icon">
                            <Heart className="h-[1.2rem] w-[1.2rem] dark:text-white" />
                            <span className="sr-only">Open Notification</span>
                        </Button>
                    </Link>
                    <div className={cn("hidden items-center justify-center w-6 h-6 rounded-full absolute -right-1 -top-1 bg-amber-500 text-white", wishlist.length > 0 && "flex")}>
                        {wishlist.length}
                    </div>
                </div>
            </HoverCardTrigger>
            <HoverCardContent align="end" className="p-2 w-[270px] space-y-4">
                <div className="space-y-2 w-full">
                    {
                        wishlist.map((product, index) => (
                            <div className="flex items-center justify-between hover:bg-muted/60" key={index}>
                                <Image
                                    src={product.featureImageUrl}
                                    alt={product.name}
                                    className="aspect-object object-cover rounded-lg"
                                    height="50"
                                    width="50"
                                />
                                <div className="">
                                    <p className="truncate text-sm text-slate-800">{product.name.slice(0,20)}...</p>
                                    <p className="text-sm text-muted-foreground">{product.discountPrice}</p>
                                </div>
                                <Button size="icon" variant="ghost" onClick={() => removeFromWishlist(product.id)}>
                                    <Trash2 className="w-5 h-5 text-rose-500" />
                                </Button>
                            </div>
                        ))
                    }
                    {
                        wishlist.length === 0 && (
                            <div className="space-y-3 mt-3">
                                <p className="text-center text-muted-foreground">Your wishlist is empty</p>
                                <Link href="/" className="flex justify-center">
                                    <Button size="sm" variant="outline" className="border-primary">
                                        Continue shopping
                                    </Button>
                                </Link>
                            </div>
                        )
                    }
                </div>

                <Separator />

                <div className="w-full flex items-center justify-end">
                    <Link href="/wishlist">
                        <Button>View Wishlist</Button>
                    </Link>
                </div>

            </HoverCardContent>
        </HoverCard>
    )
}