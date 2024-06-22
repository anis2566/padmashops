import Image from "next/image";
import { redirect } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { TrackingCard } from "@/components/seller/orders/tracking-card";
// import { TrackingCard } from "@/components/seller/orders/tracking-card";


const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
    const order = await db.sellerOrder.findUnique({
        where: {
            id: params.orderId
        },
        include: {
            products: {
                include: {
                    product: {
                        select: {
                            name: true,
                            featureImageUrl: true
                        }
                    }
                }
            }
        }
    })

    if (!order) redirect("/dashboard")
    
    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            console.log('Text copied to clipboard');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    }


    return (
        <div className="w-full space-y-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/seller/order/list">Orders</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbPage>Details</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8 ">
                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle>Products</CardTitle>
                            <CardDescription>
                                {order.products.length} products
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="border divide-y">
                                {
                                    order.products.map((product, index) => (
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
                                                    <div className="font-normal">{product.quantity} * {product.price}</div>
                                                </div>
                                                <div className="flex items-center gap-2 md:justify-end">
                                                    <div className="font-semibold">&#2547;{product.price * product.quantity}</div>
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
                            <p>{order.customerName}</p>
                            <p>{order.address}</p>
                            <p>{order.mobile}</p>
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
                                    <div>Items {order.products.length}</div>
                                    <div className="font-semibold">&#2547;{order.total}</div>
                                </div>
                                <div className="flex items-center justify-between gap-2 border-t">
                                    <div>Delivery Fee</div>
                                    <div className="font-semibold">&#2547;{order.deliveryFee}</div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                            <div className="flex flex-col gap-1 text-sm">
                                <div className="flex items-center gap-2">
                                    Total
                                    <span className="text-base font-semibold">&#2547;{order.total + order.deliveryFee}</span>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>

                    <TrackingCard order={order} />
                </div>
            </div>
        </div>
    )
}

export default OrderDetails;