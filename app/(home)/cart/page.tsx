"use client"

import {useEffect, useState} from "react"
import { MinusIcon, PlusIcon, TrashIcon, Truck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useCart } from "@/store/use-cart"

const Cart = () => {
    const [isClient, setIsClient] = useState(false);
    const {cart, removeFromCart, incrementQuantity, decrementQuantity, updateColor, updateSize} = useCart()


    const handleRemove = (id: string) => {
        removeFromCart(id)
        toast.success("Product removed")
    }

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    const totalItems = cart.reduce((acc, curr) => {
        return acc + curr.quantity
    }, 0)
    
    const total = cart.reduce((acc, curr) => {
        return acc + (curr.price * curr.quantity)
    },0)

    return (
        <div className="w-full max-w-screen-xl mx-auto bg-white space-y-6 p-3 mt-6">
            <div className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle>Shopping Cart</CardTitle>
                            <CardDescription>
                                You have {cart.length} product in your cart
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="border divide-y">
                                {
                                    cart.map((item, index) => (
                                        <div className="flex flex-col sm:flex-row justify-between p-4" key={index}>
                                            <div className="flex flex-col md:flex-row gap-x-2">
                                                <div className="aspect-square w-full max-w-[100px]">
                                                <Image
                                                    alt="Thumbnail"
                                                    className="aspect-object object-cover rounded-lg"
                                                    height="100"
                                                    src={item.product.featureImageUrl}
                                                    width="100"
                                                />
                                                </div>
                                                <div className="space-y-2">
                                                    <h3 className="font-semibold text-base">{item.product.name}</h3>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <div className="font-medium capitalize">Size: {item.size || item.product.stocks?.[0]?.size}</div>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <div className="font-medium">Color: <span className="font-medium uppercase">{item.color || item.product.colors[0]}</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 md:justify-end">
                                                    <div className="font-semibold">&#2547;{item.price * item.quantity}</div>
                                                </div>
                                                <div className="flex items-center gap-2 md:justify-end">
                                                    <div className="flex items-center gap-2">
                                                        <Button size="icon" variant="outline" onClick={() => decrementQuantity(item.product.id)}>
                                                            <MinusIcon className="h-3 w-3" />
                                                            <span className="sr-only">Decrease</span>
                                                        </Button>
                                                        <div className="border w-8 h-8 flex items-center justify-center dark:border-gray-800">{item.quantity}</div>
                                                            <Button size="icon" variant="outline" onClick={() => incrementQuantity(item.product.id)}>
                                                            <PlusIcon className="h-3 w-3" />
                                                            <span className="sr-only">Increase</span>
                                                        </Button>
                                                    </div>
                                                    <Button size="icon" variant="outline" onClick={() => handleRemove(item.product.id)}>
                                                        <TrashIcon className="h-4 w-4 text-rose-500" />
                                                        <span className="sr-only">Remove</span>
                                                    </Button>
                                                </div>
                                                <div className="flex items-center gap-x-2 md:justify-end">
                                                    {item.product.stocks && (
                                                        <Select onValueChange={(size) => updateSize(item.product.id, size)} defaultValue={item.product.stocks[0]?.size}>
                                                            <SelectTrigger className="w-[100px]">
                                                                <SelectValue placeholder="Size" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {item.product.stocks.map((stock, i) => (
                                                                    <SelectItem value={stock.size || ""} key={i} className="uppercase">{stock.size}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                    <Select onValueChange={(color) => updateColor(item.product.id, color)} defaultValue={item.product.colors[0]}>
                                                        <SelectTrigger className="w-[100px]">
                                                            <SelectValue placeholder="Color" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {item.product.colors.map((color, i) => (
                                                                <SelectItem value={color} key={i}>{color}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                                {cart.length < 1 && (
                                    <div className="min-h-[20vh] flex flex-col items-center justify-center">
                                        <div className="space-y-3 mt-3">
                                            <p className="text-center text-muted-foreground">Your cart is empty</p>
                                            <Link href="/" className="flex justify-center">
                                                <Button>
                                                    Continue shopping
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-6">
                    <Card className="bg-gray-100">
                        <CardHeader>
                            <CardTitle>Delivery Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex items-center gap-x-3">
                                <Truck className="w-5 h-5" />
                                <p> 
                                    <span className="font-semibold">
                                        Inside Dhaka: {" "}
                                    </span> 
                                    60 TK (1-2 days)
                                </p>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <Truck className="w-5 h-5" />
                                <p> 
                                    <span className="font-semibold">
                                        Outside Dhaka: {" "}
                                    </span> 
                                    120 TK (3-5 days)
                                </p>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <Truck className="w-5 h-5" />
                                <p> 
                                    <span className="font-semibold">
                                        Dhaka Sub Area: {" "}
                                    </span> 
                                    100 TK (2-3 days)
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="flex flex-col">
                        <CardHeader className="pb-4">
                            <CardTitle>Cart Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between gap-2 border-t">
                                    <div>Items {totalItems}</div>
                                    <div className="font-semibold">&#2547;{total}</div>
                                </div>
                                 <div className="flex items-center justify-between gap-2 border-t">
                                    <div>Vat & Taxes</div>
                                    <div className="font-semibold">&#2547;0</div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between p-4">
                            <div className="flex flex-col gap-1 text-sm">
                                <div className="flex items-center gap-2">
                                    Total
                                    <span className="text-base font-semibold">&#2547;{total}</span>
                                </div>
                            </div>
                            <Link href="/checkout">
                                <Button className="w-full md:w-auto" size="lg" disabled={cart.length < 1}>
                                    Proceed to Checkout
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Cart