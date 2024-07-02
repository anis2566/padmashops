"use client"

import {useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { UPDATE_ORDER } from "@/actions/quick-order.action";

interface Props {
    id: string;
}

export const StatusCard = ({id}:Props) => {
    const [status, setStatus] = useState<string>("")

    const queryClient = useQueryClient()

    const { mutate:updateStatus, isPending} = useMutation({
        mutationFn: UPDATE_ORDER,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["pending-order-count"]
            })
            queryClient.refetchQueries({
                queryKey: ["pending-order-count"]
            })
            toast.success(data?.success, {
                id: "update-status",
                duration: 2000
            })
        }, 
        onError: (error) => {
            toast.error(error.message, {
                id: "update-status",
                duration: 2000
            })
        },
    })

    const handleUpdate = () => { 
        toast.loading("Status updating...", { id: "update-status" });
        updateStatus({id, status})
    }

    return (
        <Card className="flex flex-col">
            <CardHeader className="pb-4">
                <CardTitle>Status</CardTitle>
                <CardDescription>Update order status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Select defaultValue={status} onValueChange={value => setStatus(value)} disabled={isPending}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            ["SHIPPING", "DELIVERED", "RETURNED"].map((value, i) => (
                                <SelectItem value={value} key={i} className="capitalize">{value}</SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
                <Button className="w-full" onClick={handleUpdate} disabled={!status || isPending}>Update</Button>
            </CardContent>
        </Card>
    )
}