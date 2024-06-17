"use client"

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";
import { GET_ORDER } from "@/actions/user.action";

const OrderDetails = ({ params }: { params: { orderId: string } }) => {

    const { data: order, isFetching } = useQuery({
        queryKey: ["order-details", params.orderId],
        queryFn: async () => {
            const res = await GET_ORDER(params.orderId)
            return res.order
        },
        enabled: !!params.orderId,
        refetchOnWindowFocus: false
    })

    if (isFetching) {
        return <OrderSkeleton />
    }

    return (
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8 px-2">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8 ">
                <Card>
                    <CardHeader className="pb-4">
                        <CardTitle>Products</CardTitle>
                        <CardDescription>
                            {order?.products.length} products
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="border divide-y">
                            {
                                order?.products.map((product, index) => (
                                    <div className="flex flex-col sm:flex-row justify-between p-4" key={index}>
                                        <div className="flex flex-col md:flex-row gap-x-2">
                                            <div className="aspect-square w-full max-w-[100px]">
                                                <Image
                                                    alt="Thumbnail"
                                                    className="aspect-object object-cover rounded-lg"
                                                    height="100"
                                                    src={product.product.featureImageUrl}
                                                    width="100"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <h3 className="font-semibold text-base">{product.product.name}</h3>
                                                <div className={cn("hidden items-center gap-2 text-sm", product.color && "flex")}>
                                                    <div className="font-medium capitalize">Color: {product.color}</div>
                                                </div>
                                                <div className={cn("hidden items-center gap-2 text-sm", product.size && "flex")}>
                                                    <div className="font-medium">Size: <span className="font-medium uppercase">{product.size}</span></div>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <div className="font-medium">Quantity: <span className="font-medium uppercase">{product.quantity}</span></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 md:justify-end">
                                                <div className="font-semibold">&#2547;{product.price}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-4">
                        <CardTitle>Shipping Address</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <p>{order?.shippingInfo?.name}</p>
                        <p>{order?.shippingInfo?.address}</p>
                        <p>{order?.shippingInfo?.phone}</p>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-6">
                <Card className="flex flex-col">
                    <CardHeader className="pb-4">
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between gap-2 border-t">
                                <div>Items {order?.products.length}</div>
                                <div className="font-semibold">&#2547;{order?.products.reduce((acc, curr) => acc + curr.price, 0)}</div>
                            </div>
                            <div className="flex items-center justify-between gap-2 border-t">
                                <div>Delivery Fee</div>
                                <div className="font-semibold">&#2547;{order?.deliveryFee}</div>
                            </div>

                            <Badge
                                className={cn("capitalize text-white",
                                    order?.status === "pending" && "bg-amber-500",
                                    order?.status === "shipping" && "bg-indigo-500",
                                    order?.status === "delivered" && "bg-green-500",
                                    order?.status === "returned" && "bg-rose-500",
                                )}
                            >
                                {order?.status}
                            </Badge>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between p-4">
                        <div className="flex flex-col gap-1 text-sm">
                            <div className="flex items-center gap-2">
                                Total
                                <span className="text-base font-semibold">&#2547;{(order?.total || 0) + (order?.deliveryFee || 0)}</span>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Payment</CardTitle>
                        <CardDescription>Order payment information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex justify-between items-center gap-x-2">
                            <h3>Payment Method</h3>
                            <Badge className="uppercase">{order?.paymentMethod}</Badge>
                        </div>
                        <div className="flex justify-between items-center gap-x-2">
                            <h3>Payment Status</h3>
                            <Badge
                                className={cn(
                                    "capitalize text-white",
                                    order?.paymentStatus === "unpaid" && "bg-rose-500",
                                    order?.paymentStatus === "paid" && "bg-green-500",
                                )}
                            >
                                {order?.paymentStatus}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default OrderDetails;


const OrderSkeleton = () => {
    return (
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8 px-2">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card>
                    <CardHeader className="pb-4">
                        <CardTitle>Products</CardTitle>
                        <CardDescription>
                            <Skeleton className="h-6 w-[150px]" />
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="border divide-y">
                            {[...Array(2)].map((_, index) => (
                                <div className="flex flex-col sm:flex-row justify-between p-4" key={index}>
                                    <div className="flex flex-col md:flex-row gap-x-2">
                                        <div className="aspect-square w-full max-w-[100px]">
                                            <Skeleton className="aspect-object object-cover rounded-lg min-w-[100px] h-full" />
                                        </div>
                                        <div className="space-y-1">
                                            <Skeleton className="h-6 w-[100px]" />
                                            <Skeleton className="h-6 w-[100px]" />
                                            <Skeleton className="h-6 w-[100px]" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 md:justify-end">
                                            <Skeleton className="h-6 w-[100px]" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-4">
                        <CardTitle>Shipping Address</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Skeleton className="h-6 w-1/4" />
                        <Skeleton className="h-6 w-2/4" />
                        <Skeleton className="h-6 w-1/4" />
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-6">
                <Card className="flex flex-col">
                    <CardHeader className="pb-4">
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="">
                        <div className="space-y-4">
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-1/4" />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between p-4">
                        <Skeleton className="h-6 w-full" />
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};
