import Image from "next/image";
import { redirect } from "next/navigation";

import { Badge } from "@/components/ui/badge";
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
import { StatusCard } from "@/components/dashboard/quick-order/status-card";


const OrderDetails = async ({ params }: { params: { id: string } }) => {
    const order = await db.quickOrder.findUnique({
        where: {
            id:params.id
        },
        include: {
            product: true
        }
    })

    if(!order) redirect("/dashboard")

    return (
        <div className="w-full space-y-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard/quick-order">Quick Orders</BreadcrumbLink>
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
                                {order.quantity} products
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="border divide-y">
                                <div className="flex flex-col sm:flex-row justify-between p-4">
                                    <div className="flex flex-col md:flex-row gap-x-2">
                                        <div className="aspect-square w-full max-w-[100px]">
                                        <Image
                                            alt="Thumbnail"
                                            className="aspect-object object-cover rounded-lg"
                                            height="100"
                                            src={order.product?.featureImageUrl || ""}
                                            width="100"
                                        />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="font-semibold text-base">{order.product?.name}</h3>
                                            <div className={cn("hidden items-center gap-2 text-sm", order.color && "flex")}>
                                                <div className="font-medium capitalize">Color: {order.color}</div>
                                            </div>
                                            <div className={cn("hidden items-center gap-2 text-sm", order.size && "flex")}>
                                                <div className="font-medium">Size: <span className="font-medium uppercase">{order.size}</span></div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className="font-medium">Quantity: <span className="font-medium uppercase">{order.quantity}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 md:justify-end">
                                            <div className="font-semibold">&#2547;{order.total}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle>Shipping Address</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p>{order.name}</p>
                            <p>{order.address}</p>
                            <p>{order.phone}</p>
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
                                    <div>Items {order.quantity}</div>
                                    <div className="font-semibold">&#2547;{order.total}</div>
                                </div>
                                <div className="flex items-center justify-between gap-2 border-t">
                                    <div>Delivery Fee</div>
                                    <div className="font-semibold">&#2547;{order.deliveryFee}</div>
                                </div>

                                <Badge
                                    className={cn(
                                        "capitalize text-white",
                                        order.status === "PENDING" && "bg-amber-500",
                                        order.status === "SHIPPING" && "bg-indigo-500",
                                        order.status === "DELIVERED" && "bg-green-500",
                                        order.status === "RETURNED" && "bg-rose-500",
                                    )}
                                >
                                    {order.status}
                                </Badge>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between p-4">
                            <div className="flex flex-col gap-1 text-sm">
                                <div className="flex items-center gap-2">
                                    Total
                                    <span className="text-base font-semibold">&#2547;{order.total + order.deliveryFee}</span>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                    <StatusCard id={params.id} />
                </div>
            </div>
        </div>
    )
}

export default OrderDetails;