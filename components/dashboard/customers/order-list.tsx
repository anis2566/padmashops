import {Eye} from "lucide-react"
import Link from "next/link"
import { Order, OrderProduct } from "@prisma/client"
import { format } from "date-fns"

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
import { Empty } from "@/components/empty"

interface OrderWithProduct extends OrderProduct {
  product: {
    featureImageUrl: string;
  }
}

interface OrderWithExtend extends Order {
    shippingInfo: {
        name: string;
    };
    products:OrderWithProduct[];
}

interface Props {
  orders: OrderWithExtend[]
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
                <TableHead>Product</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>D. Fee</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                orders.map(order => (
                  <TableRow key={order.id}>
                    <TableCell className="py-3 px-1 flex items-center gap-x-1">
                      {
                        order.products.map((item, i) => (
                          <Avatar className="w-7 h-7" key={i}>
                            <AvatarImage src={item.product.featureImageUrl} />
                            <AvatarFallback>PS</AvatarFallback>
                          </Avatar>
                        ))
                      }
                    </TableCell>
                    <TableCell className="py-3 px-1">{order.shippingInfo.name}</TableCell>
                    <TableCell className="py-3 px-1">{formatPriceBDT(order.total)}</TableCell>
                    <TableCell className="py-3 px-1">{formatPriceBDT(order.deliveryFee)}</TableCell>
                    <TableCell className="py-3 px-1 uppercase">
                      {
                        order.products.map((item, i) => (
                          <span key={i} className="text-center block">{item.size || "-"}</span>
                        ))
                      }
                    </TableCell>
                    <TableCell className="py-3 px-1 capitalize ">
                      {
                        order.products.map((item, i) => (
                          <span key={i} className="text-center block">{item.color || "-"}</span>
                        ))
                      }
                    </TableCell>
                    <TableCell className="py-3 px-1">{format(order.createdAt, "dd MMMM yyyy")}</TableCell>
                    <TableCell className="py-3 px-1">
                      <Badge
                        className={cn(
                          "capitalize text-white",
                          order.status === "pending" && "bg-amber-500",
                          order.status === "shipping" && "bg-indigo-500",
                          order.status === "delivered" && "bg-green-500",
                          order.status === "returned" && "bg-rose-500",
                        )}
                      >{order.status}</Badge>
                    </TableCell>
                    <TableCell className="py-3 px-1">
                      <Link href={`/dashboard/orders/${order.id}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="w-5 h-5 text-primary" />
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