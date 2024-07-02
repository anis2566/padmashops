"use client"

import { Truck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { calculateDiscountPercentage, cn } from "@/lib/utils"
import { ProductWithFeature } from "@/@types"
import { useQuickOrder } from "@/hooks/use-quick-order"

interface Props {
    product: ProductWithFeature
}

export const OrderForm = ({ product }: Props) => {
    const { onOpen } = useQuickOrder()

    return (
        <div className="space-y-3 px-2">
            <h1 className="text-xl md:text-2xl font-bold text-slate-700">{product.name}</h1>
            <div className="flex items-center gap-x-4">
                <p className="text-3xl font-bold text-slate-600">&#2547;{product.discountPrice ? product.discountPrice : product.price}</p>
                {product.discountPrice && (
                    <div>
                        <p className="text-muted-foreground text-xs">{calculateDiscountPercentage(product.price, product.discountPrice)}% off</p>
                        <p className="text-rose-500 line-through text-md">&#2547;{product.price}</p>
                    </div>
                )}
            </div>
            <div className="flex items-center gap-x-4">
                <Badge variant="outline" className={cn("bg-green-500 text-white", product.totalStock === 0 ? "bg-rose-500" : "")}>{product.totalStock === 0 ? "Stock out" : "In stock"}</Badge>
                <p className="text-muted-foreground">({product.totalStock} remaining)</p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" disabled={product.totalStock === 0} onClick={() => onOpen(product.id, product)}>Order Now</Button>
            </div>
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

        </div>
    )
}