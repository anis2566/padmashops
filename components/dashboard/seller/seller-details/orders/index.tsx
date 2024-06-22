import { SellerOrder, SellerOrderProduct } from "@prisma/client"
import { format } from "date-fns"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

import { cn } from "@/lib/utils"

interface OrderWithProduct extends SellerOrderProduct {
    product: {
        featureImageUrl: string;
    }
}

interface SellerOrderWithProduct extends SellerOrder {
    products: OrderWithProduct[]
}

interface Props {
    orders: SellerOrderWithProduct[];
}

export const SellerOrders = async ({orders}:Props) => {

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="">Customer</TableHead>
                    <TableHead className="">Product</TableHead>
                    <TableHead className="">Price</TableHead>
                    <TableHead className="">Date</TableHead>
                    <TableHead className="">Status</TableHead>
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
                    </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}

export default SellerOrders