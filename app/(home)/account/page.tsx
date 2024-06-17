"use client"

import { useQuery } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";

import { OrderList, OrderListSkeleton } from "@/components/home/account/order-list";
import { Reviews } from "@/components/home/account/reviews";
import { Wishlist } from "@/components/home/account/wishlist";
import { GET_DASHBOARD_DATA } from "@/actions/user.action";

const Account = () => {
    
    const { data, isFetching } = useQuery({
        queryKey: ["user-dashboard-data"],
        queryFn: async () => {
            const res = await GET_DASHBOARD_DATA()
            return res
        },
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false
    })

    return (
        <main className="flex flex-1 flex-col gap-4 md:gap-8 px-2">
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Today Orders
                        </CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {
                            isFetching ? (
                                <Skeleton className="h-6 w-full max-w-[40px]" />
                            ) : (
                                <div className="text-xl font-bold">{data?.todayOrders}</div>
                            )
                        }
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Pending Orders
                        </CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {
                            isFetching ? (
                                <Skeleton className="h-6 w-full max-w-[40px]" />
                            ) : (
                                <div className="text-xl font-bold">{data?.pendingOrders}</div>
                            )
                        }
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Orders
                        </CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {
                            isFetching ? (
                                <Skeleton className="h-6 w-full max-w-[40px]" />
                            ) : (
                                <div className="text-xl font-bold">{data?.totalOrder}</div>
                            )
                        }
                    </CardContent>
                </Card>
            </div>

            {
                isFetching ? (
                    <OrderListSkeleton />
                ) : (
                    <OrderList orders={data?.orders ?? []} />
                )
            }

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Wishlist />
                <Reviews />
            </div>
        </main>
    )
}

export default Account; 