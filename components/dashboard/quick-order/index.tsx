import { Empty } from "@/components/empty"
import { Product, QuickOrder } from "@prisma/client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn, formatPriceBDT } from "@/lib/utils"
import { format } from "date-fns"
import Link from "next/link"
import { EyeIcon } from "lucide-react"

interface OrderWithProduct extends QuickOrder {
    product: Product | null;
}

interface Props {
    orders: OrderWithProduct[]
}

export const QuickOrderList = ({ orders }: Props) => {
    return (
        <>
            {
                orders.length < 1 ? (
                    <Empty title="No Order Found" />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="px-1">Product</TableHead>
                                <TableHead className="px-1">Name</TableHead>
                                <TableHead className="px-1">Price</TableHead>
                                <TableHead className="px-1">D. Fee</TableHead>
                                <TableHead className="px-1">Size</TableHead>
                                <TableHead className="px-1">Color</TableHead>
                                <TableHead className="px-1">Date</TableHead>
                                <TableHead className="px-1">Status</TableHead>
                                <TableHead className="px-1">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                orders.map(order => (
                                    <TableRow key={order.id}>
                                        <TableCell className="px-1 py-3 px-1 flex items-center gap-x-1">
                                            <Avatar className="w-7 h-7">
                                                <AvatarImage src={order.product?.featureImageUrl} />
                                                <AvatarFallback>PS</AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell className="px-1 py-3 px-1">{order.name}</TableCell>
                                        <TableCell className="px-1 py-3 px-1">{formatPriceBDT(order.total)}</TableCell>
                                        <TableCell className="px-1 py-3 px-1">{formatPriceBDT(order.deliveryFee)}</TableCell>
                                        <TableCell className="px-1 py-3 px-1 uppercase">
                                            {order.size || "-"}
                                        </TableCell>
                                        <TableCell className="px-1 py-3 px-1 capitalize ">
                                            {order.color || "-"}
                                        </TableCell>
                                        <TableCell className="px-1 py-3 px-1">{format(order.createdAt, "dd MMMM yyyy")}</TableCell>
                                        <TableCell className="px-1 py-3 px-1">
                                            <Badge
                                                className={cn(
                                                    "capitalize text-white",
                                                    order.status === "PENDING" && "bg-amber-500",
                                                    order.status === "SHIPPING" && "bg-indigo-500",
                                                    order.status === "DELIVERED" && "bg-green-500",
                                                    order.status === "RETURNED" && "bg-rose-500",
                                                )}
                                            >{order.status}</Badge>
                                        </TableCell>
                                        <TableCell className="px-1 py-3 px-1">
                                            <Link href={`/dashboard/quick-order/${order.id}`}>
                                                <Button variant="ghost" size="icon">
                                                    <EyeIcon className="w-5 h-5 text-primary" />
                                                </Button>
                                            </Link>
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