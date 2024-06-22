import Link from "next/link"
import { Eye } from "lucide-react"
import { SellerOrder, SellerOrderProduct } from "@prisma/client"
import { format } from "date-fns"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { cn } from "@/lib/utils"

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

export const RecentOrders = ({orders}:Props) => {
    return (
        <Card className="w-[350px] sm:w-full mx-auto lg:col-span-2">
            <CardHeader className="px-7">
                <CardTitle>Orders</CardTitle>
                <CardDescription>
                    Recent orders from your store.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            orders.map(order => (
                                <TableRow key={order.id}>
                                    <TableCell className="py-1">{order.customerName}</TableCell>
                                    <TableCell className="py-1 flex items-center gap-x-1">
                                        {
                                            order.products.map(item => (
                                                <Avatar key={item.id}>
                                                    <AvatarImage src={item.product.featureImageUrl} />
                                                    <AvatarFallback>{order.customerName}</AvatarFallback>
                                                </Avatar>
                                            ))
                                        }
                                    </TableCell>
                                    <TableCell className="py-1">&#2547;{order.total + order.deliveryFee}</TableCell>
                                    <TableCell className="py-1">
                                        {format(order.createdAt, "dd MMMM yyyy")}
                                    </TableCell>
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
                                    <TableCell className="py-1">
                                        <Button asChild variant="ghost" size="icon">
                                            <Link href={`/seller/order/list/${order.id}`}>
                                                <Eye className="w-5 h-5 text-primary" />
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}