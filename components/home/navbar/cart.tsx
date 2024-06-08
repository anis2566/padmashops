"use client"

import { ShoppingBasket, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from "../../ui/button"
import { Separator } from "@/components/ui/separator"

import { useCart } from "@/store/use-cart"
import { cn } from "@/lib/utils"


export const Cart = () => {
    const [isClient, setIsClient] = useState(false);
    const {cart, removeFromCart} = useCart()

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
       <HoverCard>
            <HoverCardTrigger asChild>
                <div className="relative">
                    <Link href="/cart">
                        <Button variant="outline" size="icon">
                            <ShoppingBasket className="h-[1.2rem] w-[1.2rem] dark:text-white" />
                            <span className="sr-only">Open Notification</span>
                        </Button>
                    </Link>
                    <div className={cn("flex items-center justify-center w-6 h-6 rounded-full absolute -right-1 -top-1 bg-primary text-white", cart.length === 0 && "hidden")}>
                        {cart.length}
                    </div>
                </div>
            </HoverCardTrigger>
            <HoverCardContent align="end" className="p-2 w-[270px] space-y-4 z-50">
                <div className="space-y-2 w-full">
                    {
                        cart.map((product, index) => (
                            <div className="flex items-center gap-x-2 justify-between hover:bg-muted/60" key={index}>
                                <Image
                                    src={product.featureImageUrl}
                                    alt={product.name}
                                    className="aspect-object object-cover rounded-lg"
                                    height="50"
                                    width="50"
                                />
                                <div className="">
                                    <p className="truncate text-sm text-slate-800">{product.name.slice(0,17)}...</p>
                                    <p className="text-sm text-muted-foreground">{product.quantity} x &#2547;{product.price}</p>
                                </div>
                                <Button size="icon" variant="ghost" onClick={() => removeFromCart(product.id)}>
                                    <Trash2 className="w-5 h-5 text-rose-500" />
                                </Button>
                            </div>
                        ))
                    }
                    {
                        cart.length === 0 && (
                            <div className="space-y-3 mt-3">
                                <p className="text-center text-muted-foreground">Your cart is empty</p>
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

                <div className="w-full flex items-center justify-between">
                    <Link href="/cart">
                        <Button>View Cart</Button>
                    </Link>
                    <Link href="/checkout">
                        <Button variant="outline">Checkout</Button>
                    </Link>
                </div>

            </HoverCardContent>
        </HoverCard>
    )
}