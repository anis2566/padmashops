"use client"

import { Eye } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { SellerOrder, SellerOrderProduct } from "@prisma/client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { cn } from "@/lib/utils"
import { Empty } from "@/components/empty"

interface OrderProductWithProduct extends SellerOrderProduct {
    product: {
        featureImageUrl: string;
    }
}

interface SellerOrderWithProduct extends SellerOrder {
    products: OrderProductWithProduct[]
}

interface Props {
    orders: SellerOrderWithProduct[];
}

export const OrderList = ({orders}:Props) => {

    return (
        <>
            {
                orders.length < 1 ? (
                    <Empty title="No Order Found" />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="">Customer</TableHead>
                                <TableHead className="">Product</TableHead>
                                <TableHead className="">Total</TableHead>
                                <TableHead className="">Date</TableHead>
                                <TableHead className="">Tracking Id</TableHead>
                                <TableHead className="">Status</TableHead>
                                <TableHead className="">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                orders.map(order => (
                                    <TableRow key={order.id}>
                                        <TableCell className="py-2">{order.customerName}</TableCell>
                                        <TableCell className="py-2 flex items-center gap-x-1">
                                            {
                                                order.products.map((item) => (
                                                    <Avatar className="w-9 h-9" key={item.id}>
                                                        <AvatarImage src={item.product.featureImageUrl} />
                                                        <AvatarFallback>{order.customerName}</AvatarFallback>
                                                    </Avatar>
                                                ))
                                            }
                                        </TableCell>
                                        <TableCell className="py-2">&#2547;{order.total + order.deliveryFee}</TableCell>
                                        <TableCell className="py-2">{format(order.createdAt, "dd MMMM yyyy")}</TableCell>
                                        <TableCell className="py-2">{order.trackingId || "-"}</TableCell>
                                        <TableCell className="py-2">
                                            <Badge
                                                className={cn("capitalize",
                                                    order.status === "pending" && "bg-amber-500",
                                                    order.status === "shipping" && "bg-indigo-500",
                                                    order.status === "delivered" && "bg-green-500",
                                                    order.status === "returned" && "bg-rose-500",
                                                )}
                                            >
                                                {order.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-2">
                                            <Button asChild variant="ghost" size="icon">
                                                <Link href={`/seller/order/list/${order.id}`}>
                                                    <Eye className="text-primary w-5 h-5" />
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>)
            }
        </>
    )
}