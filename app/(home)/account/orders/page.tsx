"use client"

import { useQuery } from "@tanstack/react-query";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { GET_ORDERS } from "@/actions/user.action";
import { CustomPagination } from "@/components/custom-pagination";
import { OrderList, OrderListSkeleton } from "@/components/home/account/orders";
import { Header } from "@/components/home/account/orders/header";

interface Props {
    searchParams: {
        page: string;
        perPage: string;
        status: string;
    }
  };

const Orders = ({ searchParams }: Props) => {
    
    const { page, perPage, status } = searchParams
    
    const { data, isFetching } = useQuery({
        queryKey: ["get-user-orders", page, perPage, status],
        queryFn: async () => {
            const res = await GET_ORDERS({ page, perPage, status })
            return res
        },
        refetchOnWindowFocus: false
    })

    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle>Your Orders</CardTitle>
                <CardDescription>Explore your order list</CardDescription>
            </CardHeader>
            <CardContent className="px-2 md:px-5 space-y-4">
                <Header />
                {
                    isFetching ? (
                        <OrderListSkeleton />
                    ) : (
                        <OrderList orders={data?.orders ?? []} />
                    )
                }
                <CustomPagination totalPage={Math.round((data?.totalOrder ?? 0) / 5)} />
            </CardContent>
        </Card>
    )
}

export default Orders