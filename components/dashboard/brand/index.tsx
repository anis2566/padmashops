"use client"

import { EllipsisVertical, Eye, Pen, Trash2 } from "lucide-react"
import Link from "next/link"
import { Brand } from "@prisma/client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface BrandListProps {
    brands: Brand[]
}

export const BrandList = ({brands}:BrandListProps) => {


    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    brands.map(brand => (
                        <TableRow key={brand.id}>
                            <TableCell className="py-2">
                                <Avatar className="w-9 h-9">
                                    <AvatarImage src={brand.imageUrl} />
                                    <AvatarFallback>{brand.name}</AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell className="py-2">{brand.name}</TableCell>
                            <TableCell className="py-2">10</TableCell>
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
                                            <Link href={`/dashboard/brand/products/${brand.id}`} className="flex items-center gap-x-3">
                                                <Eye className="w-4 h-4" />
                                                View Product
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href={`/dashboard/brand/edit/${brand.id}`} className="flex items-center gap-x-3">
                                                <Pen className="w-4 h-4" />
                                                Edit
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="w-flex items-center gap-x-3">
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


export const BrandListSkeleton = () => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {[...Array(5)].map((_, index) => (
                    <TableRow key={index}>
                        <TableCell className="py-2">
                            <Skeleton className="w-9 h-9 rounded-full" />
                        </TableCell>
                        <TableCell className="py-2">
                            <Skeleton className="h-4 w-3/4" />
                        </TableCell>
                        <TableCell className="py-2">
                            <Skeleton className="h-4 w-1/4" />
                        </TableCell>
                        <TableCell className="py-2">
                            <Skeleton className="h-8 w-8 rounded-full" />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}