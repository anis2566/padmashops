"use client"

import { EllipsisVertical, Eye, Pen, Trash2 } from "lucide-react"
import Link from "next/link"
import { Category } from "@prisma/client"

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
import { useCategory } from "@/hooks/use-category"

interface Props {
    categories: Category[];
}

export const CategoryList = ({ categories }: Props) => {
    const { onOpen } = useCategory()
    
    return (
        <>
            {
                categories.length < 1 ? (
                    <Empty title="No Categroy Found" />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="">Image</TableHead>
                            <TableHead className="">Name</TableHead>
                            <TableHead className="">Products</TableHead>
                            <TableHead className="">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                categories.map(category => (
                                <TableRow key={category.id}>
                                    <TableCell className="py-2">
                                        <Avatar className="w-9 h-9">
                                            <AvatarImage src={category.imageUrl} />
                                            <AvatarFallback>{category.name}</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className="py-2">{category.name}</TableCell>
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
                                                    <Link href={`/dashboard/brand/products/${category.id}`} className="flex items-center gap-x-3">
                                                        <Eye className="w-4 h-4" />
                                                        View Product
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/dashboard/category/edit/${category.id}`} className="flex items-center gap-x-3">
                                                        <Pen className="w-4 h-4" />
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="w-flex items-center gap-x-3" onClick={() => onOpen(category.id)}>
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