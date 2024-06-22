"use client"

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { SellerOrderProduct } from "@prisma/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { UPDATE_SELLER_ORDER_STATUS } from "@/actions/seller-order.action";
import { useTracking } from "@/hooks/use-tracking";

interface Props {
    orderId: string;
    products: SellerOrderProduct[];
    sellerId: string;
    status: string;
}

export const StatusCard = ({orderId, products, sellerId, status:orderStatus}:Props) => {
    const [status, setStatus] = useState<string>("")

    const { onOpen } = useTracking()
    
    const {mutate: updateOrder, isPending} = useMutation({
        mutationFn: UPDATE_SELLER_ORDER_STATUS,
        onSuccess: (data) => {
            if (data?.status === "shipping") {
                onOpen(orderId)
            }
            toast.success(data?.success, {
                id: "update-status"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "update-status"
            });
        }
    })

    

    const handleUpdate = () => {
        toast.loading("Status updating...", {
            id: "update-status"
        })
        updateOrder({
            orderId,
            products,
            status,
            sellerId
        })
    }

    return (
        <div>
            <Card className="flex flex-col">
                <CardHeader className="pb-4">
                    <CardTitle>Status</CardTitle>
                    <CardDescription>Update order status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Select onValueChange={value => setStatus(value)} disabled={isPending}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                ["shipping", "delivered", "returned"].map((value, i) => (
                                    <SelectItem value={value} key={i} className="capitalize" disabled={value === orderStatus}>{value}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                    <Button className="w-full" onClick={handleUpdate} disabled={isPending}>Update</Button>
                </CardContent>
            </Card>
        </div>
    )
}