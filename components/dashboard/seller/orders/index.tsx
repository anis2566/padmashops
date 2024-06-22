import { format } from "date-fns";
import Link from "next/link";
import { Eye } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { Empty } from "@/components/empty";

interface OrdersWithProduct extends SellerOrderProduct {
    product: {
        featureImageUrl: string;
    },
}

interface OrderWithSeller extends SellerOrder {
    products: OrdersWithProduct[],
    seller: {
        name: string;
    }
}

interface Props {
    orders: OrderWithSeller[];
}

export const SellerOrders = ({orders}:Props) => {
    return ( 
        <>
            {
                orders.length < 1 ? (
                    <Empty title="No Order Found" />
                ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Seller</TableHead>
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
                                    <TableCell className="py-2">{order.seller.name}</TableCell>
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
                                            className={cn("capitalize text-white",
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
                                            <Link href={`/dashboard/seller/orders/${order.id}`}>
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