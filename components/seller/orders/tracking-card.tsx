"use client"

import { SellerOrder } from "@prisma/client"
import { Copy } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { cn } from "@/lib/utils"

interface Props {
    order: SellerOrder
}

export const TrackingCard = ({ order }: Props) => {
    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            console.log('Text copied to clipboard');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Tracking</CardTitle>
            </CardHeader>
            <CardContent>
                <Badge
                    className={cn(
                        "capitalize",
                        order.status === "pending" && "bg-amber-500",
                        order.status === "delivered" && "bg-green-500",
                        order.status === "returned" && "bg-rose-500",
                    )}
                >{order.status}</Badge>
                <div
                    className={cn(
                        "items-center gap-x-2 hidden",
                        order.trackingId && "flex"
                    )}
                >
                    {order.trackingId}
                    <TooltipProvider>
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(order.trackingId || "")}>
                                    <Copy className="w-5 h-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                            <p>Copy tracking Id</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </CardContent>
        </Card>
    )
}