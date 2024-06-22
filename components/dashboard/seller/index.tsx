"use client"

import { Seller } from "@prisma/client"
import { CircleUser, EllipsisVertical, Pen, Trash2, UserCog } from "lucide-react"
import Link from "next/link"

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

import { cn } from "@/lib/utils"
import { Empty } from "@/components/empty"
import { useSeller, useSellerStatus } from "@/hooks/use-seller"

interface SellerWithOrders extends Seller {
    orders: { id: string}[]
}

interface SellerRequestListProps {
    sellers: SellerWithOrders[]
}

export const SellerList = ({ sellers }: SellerRequestListProps) => {
    
    const { onOpen } = useSellerStatus()
    const {onOpen:onOpenDelete} = useSeller()

    return (
        <>
            {
                sellers.length < 1 ? (
                    <Empty title="No Seller Found" />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Total Sell</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                sellers.map(seller => (
                                    <TableRow key={seller.id}>
                                        <TableCell className="py-2">
                                            <Avatar className="w-9 h-9">
                                                <AvatarImage src={seller.imageUrl} />
                                                <AvatarFallback>{seller.name}</AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell className="py-2">{seller.name}</TableCell>
                                        <TableCell className="py-2">{seller.phone}</TableCell>
                                        <TableCell className="py-2">{seller.orders.length}</TableCell>
                                        <TableCell className="py-2">
                                            <Badge
                                                className={cn(
                                                    "capitalize text-white",
                                                    seller.status === "pending" && "bg-amber-500",
                                                    seller.status === "active" && "bg-green-500",
                                                    seller.status === "inactive" && "bg-rose-500",
                                                )}
                                            >
                                                {seller.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-2">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <EllipsisVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/dashboard/seller/${seller.id}`} className="flex items-center gap-x-3">
                                                            <CircleUser className="w-4 h-4" />
                                                            View Profile
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="w-flex items-center gap-x-3" onClick={() => onOpen(seller.id)}>
                                                        <UserCog className="w-4 h-4" />
                                                        Change Status
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/dashboard/seller/edit/${seller.id}`} className="flex items-center gap-x-3">
                                                            <Pen className="w-4 h-4" />
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="w-flex items-center gap-x-3" onClick={() => onOpenDelete(seller.id)}>
                                                        <Trash2 className="text-rose-500 w-4 h-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
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