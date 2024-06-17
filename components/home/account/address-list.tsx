"use client"

import { useQuery } from "@tanstack/react-query"
import { MapPin, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import { GET_USER_ADDRESS } from "@/actions/address.action"
import { useAddress } from "@/hooks/use-address"

export const AddressList = () => {
    const { onOpen } = useAddress()

    const { data: addresses, isFetching } = useQuery({
        queryKey: ["user-address"],
        queryFn: async () => {
            const res = await GET_USER_ADDRESS()
            return res.addresses
        },
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Saved Address</CardTitle>
                <CardDescription>A collection of your saved address.</CardDescription>
            </CardHeader>
            <CardContent>
                {
                    addresses?.length === 0 && (
                        <span className="italic text-muted-foreground">No saved address</span>
                    )
                }
                <div className="flex items-center gap-x-3 flex-wrap gap-y-3">
                    {
                        isFetching ?
                            Array.from({ length: 3 }, (_, index) => (
                                <Skeleton className="h-10 w-[120px]" key={index} />
                            )) :
                            addresses?.map(address => (
                                <div key={address.id} className="flex items-center gap-x-1 border border-primary p-1 rounded-md text-primary">
                                    <MapPin className="h-5 w-5" />
                                    {address.title}
                                    <Button variant="ghost" size="icon" onClick={() => onOpen(address.id)}>
                                        <Trash2 className="w-5 h-5 text-rose-500" />
                                    </Button>
                                </div>
                            ))
                    }
                </div>
            </CardContent>
        </Card>
    )
}
