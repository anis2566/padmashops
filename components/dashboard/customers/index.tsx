"use client"

import { User } from "@prisma/client"

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
import { Empty } from "@/components/empty"
import { EllipsisVertical, Eye, Trash2 } from "lucide-react"
import Link from "next/link"
import { useCustomer } from "@/hooks/use-customer"

interface UserWithOrders extends User {
    orders: {id: string}[]
}

interface CustomerListProps {
    users: UserWithOrders[]
}

export const CustomerList = ({ users }: CustomerListProps) => {
    
    const {onOpen} = useCustomer()

    return (
        <>
            {
                users.length < 1 ? (
                    <Empty title="No User Found" />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="px-1">Image</TableHead>
                            <TableHead className="px-1">Name</TableHead>
                            <TableHead className="px-1">Orders</TableHead>
                            <TableHead className="px-1">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                users.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell className="px-1 py-2">
                                        <Avatar className="w-9 h-9">
                                            <AvatarImage src={user.imageUrl || ""} />
                                            <AvatarFallback>{user.name}</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className="px-1 py-2">{user.name}</TableCell>
                                    <TableCell className="px-1 py-2">{user.orders.length}</TableCell>
                                    <TableCell className="px-1 py-2">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <EllipsisVertical className="h-4 w-4" />
                                            </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/dashboard/customers/${user.id}`} className="flex items-center gap-x-3">
                                                        <Eye className="w-4 h-4" />
                                                        View Orders
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="w-flex items-center gap-x-3" onClick={() => onOpen(user.id)}>
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
                    </Table>
                )
            }
        </>
    )
}