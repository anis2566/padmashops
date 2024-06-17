import { Order, OrderProduct, Product, User } from "@prisma/client"
import Link from "next/link"
import { Eye } from "lucide-react"
import { format } from "date-fns"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

import { cn } from "@/lib/utils"

interface OrderWithProducts extends OrderProduct {
    product: Product
}

interface OrderWithUser extends Order {
    products: OrderWithProducts[];
    user: User
}

interface OrderListProps {
    orders: OrderWithUser[]
}

export const OrderList = ({ orders }: OrderListProps) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="px-1">Products</TableHead>
                    <TableHead className="px-1">Total</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="px-1">Status</TableHead>
                    <TableHead className="px-1">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    orders.map(order => (
                        <TableRow key={order.id}>
                            <TableCell className="p-1 flex items-center">
                                {
                                    order.products.map((item, i) => (
                                        <Avatar key={i}>
                                            <AvatarImage src={item.product.featureImageUrl} />
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                    ))
                                }
                            </TableCell>
                            <TableCell className="p-1">
                            &#2547;{order.total}
                            </TableCell>
                            <TableCell className="hidden md:table-cell p-1">
                                {format(order.createdAt, "dd MMMM yyyy")}
                            </TableCell>
                            <TableCell className="p-1">
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
                            <TableCell className="p-1">
                                <Link href={`/account/orders/${order.id}`}>
                                    <Button variant="ghost" size="icon">
                                        <Eye className="w-5 h-5 text-primary" />
                                    </Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}

export const OrderListSkeleton = () => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Products</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    Array.from({ length: 5 }, (_, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Skeleton className="h-6 w-full" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-6 w-full" />
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                <Skeleton className="h-6 w-full" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-6 w-full" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-6 w-full" />
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}