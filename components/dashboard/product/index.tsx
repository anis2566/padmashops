"use client"

import { EllipsisVertical, Pen, Trash2 } from "lucide-react"
import Link from "next/link"
import { Product, Stock } from "@prisma/client"

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
import { useProduct } from "@/hooks/use-product"
import { Empty } from "@/components/empty"

interface ProductWithStock extends Product {
    stocks?: Stock[]
}

interface Props {
    products: ProductWithStock[];
}

export const ProductList = ({ products}: Props) => {
    const { onOpen } = useProduct()
    
    return (
        <>
            {
                products.length < 1 ? (
                    <Empty title="No Product Found" />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="px-1">Image</TableHead>
                            <TableHead className="px-1">Name</TableHead>
                            <TableHead className="px-1">Price</TableHead>
                            <TableHead className="px-1">D. Price</TableHead>
                            <TableHead className="px-1">S. Price</TableHead>
                            <TableHead className="px-1">Stock</TableHead>
                            <TableHead className="px-1">Status</TableHead>
                            <TableHead className="px-1">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                products.map(product => (
                                <TableRow key={product.id}>
                                    <TableCell className="px-1 py-2">
                                        <Avatar className="w-9 h-9">
                                            <AvatarImage src={product.featureImageUrl} />
                                            <AvatarFallback>{product.name.slice(0, 30)}</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className="px-1 py-2">{product.name.slice(0,30)}</TableCell>
                                    <TableCell className="px-1 py-2">{product.price}</TableCell>
                                    <TableCell className="px-1 py-2">{product.discountPrice || "-"}</TableCell>
                                    <TableCell className="px-1 py-2">{product.sellerPrice || "-"}</TableCell>
                                    <TableCell className="px-1 py-2">{product.totalStock}</TableCell>
                                    <TableCell className="px-1 py-2">
                                        <Badge
                                            className={cn(
                                                "text-white bg-green-500",
                                                product.status === "DRAFT" && "bg-amber-500"
                                            )}
                                        >
                                            {product.status}
                                        </Badge>    
                                    </TableCell>
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
                                                    <Link href={`/dashboard/product/edit/${product.id}`} className="flex items-center gap-x-3">
                                                        <Pen className="w-4 h-4" />
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="w-flex items-center gap-x-3" onClick={() => onOpen(product.id)}>
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