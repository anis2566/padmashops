"use client"

import { useQuery } from "@tanstack/react-query"
import { Check, Eye, RefreshCcw, ShoppingCart } from "lucide-react"
import { TbCoinTaka } from "react-icons/tb"
import { MdOutlineKeyboardReturn } from "react-icons/md";
import { useState } from "react"
import Link from "next/link";
import { format } from "date-fns";

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { cn, formatPriceBDT } from "@/lib/utils"
import { GET_ADMIN_DASHBOARD_DATA, GET_RECENT_ORDERS } from "@/actions/dashboard.action"
import { MostSaleProducts } from "@/components/dashboard/charts/most-sale"
import { WeeklySellerOrder } from "@/components/dashboard/charts/weekly-sales"
import { WeeklyOrders } from "@/components/dashboard/charts/weekly-orders"

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState<string>("seller")

    const { data, isLoading } = useQuery({
        queryKey: ["ge-dashboard-data"],
        queryFn: async () => {
            const res = await GET_ADMIN_DASHBOARD_DATA()
            return res
        },
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false
    })

    const { data: orders, isLoading: isLoadingOrder } = useQuery({
        queryKey: ["dashboard-recent-order"],
        queryFn: async () => {
            const res = await GET_RECENT_ORDERS()
                return res.orders
        },
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false
    })

    return (
        <main className="flex flex-1 flex-col gap-4 md:gap-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Today Orders
                        </CardTitle>
                        <TbCoinTaka className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {
                            isLoading ? (
                                <Skeleton className="h-[28px] w-2/3" />
                            ): (
                                <div className="text-xl font-bold">{formatPriceBDT(data?.todayOrderTotal ?? 0)}</div>
                            )
                        }
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Yesterday Orders
                        </CardTitle>
                        <TbCoinTaka className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {
                            isLoading ? (
                                <Skeleton className="h-[28px] w-2/3" />
                            ): (
                                <div className="text-xl font-bold">{formatPriceBDT(data?.yesterdayOrderTotal ?? 0)}</div>
                            )
                        }
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            This Week
                        </CardTitle>
                        <TbCoinTaka className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {
                            isLoading ? (
                                <Skeleton className="h-[28px] w-2/3" />
                            ): (
                                <div className="text-xl font-bold">{formatPriceBDT(data?.thisWeekOrderTotal ?? 0)}</div>
                            )
                        }
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            This Month
                        </CardTitle>
                        <TbCoinTaka className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {
                            isLoading ? (
                                <Skeleton className="h-[28px] w-2/3" />
                            ): (
                                <div className="text-xl font-bold">{formatPriceBDT(data?.thisMonthOrderTotal ?? 0)}</div>
                            )
                        }
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card>
                    <CardContent>
                        <div className="flex items-center gap-x-3 pt-3">
                            <div className="w-12 h-12 rounded-full bg-primary dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                                <ShoppingCart className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-muted-foreground text-normal truncate">Total Orders</p>
                                {
                                    isLoading ? (
                                        <Skeleton className="h-[28px] w-2/3" />
                                    ) : (
                                        <p className="text-xl font-bold text-primary">{data?.todayOrderCount ?? 0}</p>
                                    )
                                }
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <div className="flex items-center gap-x-3 pt-3">
                            <div className="w-12 h-12 rounded-full bg-primary dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                                <RefreshCcw className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-muted-foreground text-normal truncate">Pending Orders</p>
                                {
                                    isLoading ? (
                                        <Skeleton className="h-[28px] w-2/3" />
                                    ) : (
                                        <p className="text-xl font-bold text-primary">{data?.pendingOrderCount ?? 0}</p>
                                    )
                                }
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <div className="flex items-center gap-x-3 pt-3">
                            <div className="w-12 h-12 rounded-full bg-primary dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                                <Check className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-muted-foreground text-normal truncate">Delivered Orders</p>
                                {
                                    isLoading ? (
                                        <Skeleton className="h-[28px] w-2/3" />
                                    ) : (
                                        <p className="text-xl font-bold text-primary">{data?.deliveredOrderCount ?? 0}</p>
                                    )
                                }
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <div className="flex items-center gap-x-3 pt-3">
                            <div className="w-12 h-12 rounded-full bg-primary dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                                <MdOutlineKeyboardReturn className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-muted-foreground text-normal truncate">Returned Orders</p>
                                {
                                    isLoading ? (
                                        <Skeleton className="h-[28px] w-2/3" />
                                    ) : (
                                        <p className="text-xl font-bold text-primary">{data?.returnedOrderCount ?? 0}</p>
                                    )
                                }
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 md:gap-8">
                <div className="flex flex-col space-y-4 w-full min-h-[300px] rounded-lg border bg-card text-card-foreground shadow-sm p-3">
                    <p className="text-xl font-bold">Weekly Stat</p>
                    <div className="flex items-center justify-center rounded-md bg-muted p-1">
                        <div className={cn("rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all flex-1 cursor-pointer",activeTab === "seller" && "bg-background")} onClick={() => setActiveTab("seller")}>
                            Seller
                        </div>
                        <div className={cn("rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all flex-1 cursor-pointer",activeTab === "customer" && "bg-background")} onClick={() => setActiveTab("customer")}>
                            Customer
                        </div>
                    </div>
                    {
                        isLoading ? (
                            <Skeleton className="w-full h-full" />
                        ) : (
                                <>
                                    {
                                        activeTab === "seller" && (
                                            <WeeklySellerOrder weeklyOrders={data?.weeklySellerOrderStat ?? []} />
                                        )
                                    }
                                    {
                                        activeTab === "customer" && (
                                            <WeeklyOrders weeklyOrders={data?.weeklyOrderStat ?? []} />
                                        )
                                    }
                                </>
                        )
                        
                    }
                </div>
                {
                    isLoading ? (
                        <div className="flex flex-col space-y-4 w-full min-h-[300px] rounded-lg border bg-card text-card-foreground shadow-sm p-3">
                            <p className="text-xl font-bold">Most sale products</p>
                            <Skeleton className="w-[180px] h-[180px] rounded-full mx-auto" />
                        </div>
                    ) : (
                        <MostSaleProducts products={data?.mostSaleProducts ?? []} />
                    )
                }
            </div>

            <Card className="w-[350px] sm:w-full mx-auto">
                <CardHeader>
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>A collection of your orders.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>D. Fee</TableHead>
                            <TableHead>Size</TableHead>
                            <TableHead>Color</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                        </TableHeader>
                        {
                            isLoadingOrder ? (
                                <OrderSkeleton />
                            ) : (
                                <TableBody>
                                {
                                    orders?.map(order => (
                                    <TableRow key={order.id}>
                                        <TableCell className="py-3 px-1 flex items-center gap-x-1">
                                        {
                                            order.products.map((item, i) => (
                                            <Avatar className="w-7 h-7" key={i}>
                                                <AvatarImage src={item.product.featureImageUrl} />
                                                <AvatarFallback>PS</AvatarFallback>
                                            </Avatar>
                                            ))
                                        }
                                        </TableCell>
                                        <TableCell className="py-3 px-1">{order.shippingInfo.name}</TableCell>
                                        <TableCell className="py-3 px-1">{formatPriceBDT(order.total)}</TableCell>
                                        <TableCell className="py-3 px-1">{formatPriceBDT(order.deliveryFee)}</TableCell>
                                        <TableCell className="py-3 px-1 uppercase">
                                        {
                                            order.products.map((item, i) => (
                                            <span key={i} className="text-center block">{item.size || "-"}</span>
                                            ))
                                        }
                                        </TableCell>
                                        <TableCell className="py-3 px-1 capitalize ">
                                        {
                                            order.products.map((item, i) => (
                                            <span key={i} className="text-center block">{item.color || "-"}</span>
                                            ))
                                        }
                                        </TableCell>
                                        <TableCell className="py-3 px-1">{format(order.createdAt, "dd MMMM yyyy")}</TableCell>
                                        <TableCell className="py-3 px-1">
                                        <Badge
                                            className={cn(
                                            "capitalize text-white",
                                            order.status === "pending" && "bg-amber-500",
                                            order.status === "shipping" && "bg-indigo-500",
                                            order.status === "delivered" && "bg-green-500",
                                            order.status === "returned" && "bg-rose-500",
                                            )}
                                        >{order.status}</Badge>
                                        </TableCell>
                                        <TableCell className="py-3 px-1">
                                        <Link href={`/dashboard/orders/${order.id}`}>
                                            <Button variant="ghost" size="icon">
                                            <Eye className="w-5 h-5 text-primary" />
                                            </Button>
                                        </Link>
                                        </TableCell>
                                    </TableRow>
                                    ))
                                }
                                </TableBody>
                            )
                        }
                    </Table>
                </CardContent>
            </Card>
        </main>
    )
}

export default Dashboard


const OrderSkeleton = () => {
    return (
        <TableBody>
            {
                Array.from({ length: 5 }, (_, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <Skeleton className="h-8 w-8 rounded-full" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-6 w-full" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-6 w-full" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-6 w-full" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-6 w-full" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-6 w-full" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-6 w-full" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-6 w-full" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-6 w-full" />
                        </TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
    )
}