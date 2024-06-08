import { Pen } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { db } from "@/lib/db"
import { ProductList } from "@/components/dashboard/product"
import { Header } from "@/components/dashboard/product/header"
import { CustomPagination } from "@/components/custom-pagination"

interface Props {
  searchParams: {
      sort: string;
      page: string;
      perPage: string;
      search: string;
  }
};

const Products = async ({ searchParams }: Props) => { 
    const {search, sort} = searchParams
    const itemsPerPage = parseInt(searchParams.perPage) || 5;  
    const currentPage = parseInt(searchParams.page) || 1;

    const products = await db.product.findMany({
        where: {
            ...(search && {
                name: {
                    contains: search, mode: "insensitive"
                }
            })
        },
        include: {
            stocks: true
        },
        orderBy: {
            ...(sort === 'asc' && { name: 'asc' }),
            ...(sort === 'desc' && { name: 'desc' }),
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalProduct = await db.category.count({
        where: {
            ...(search && {
                name: {
                    contains: search, mode: "insensitive"
                }
            })
        }
    }) 

    const totalPage = Math.ceil(totalProduct / itemsPerPage)

    
    return (
        <div className="w-full space-y-4">
            <div className="flex items-center gap-4">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                        <BreadcrumbPage>Products</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Link href="/dashboard/product/create">
                    <Button size="sm" className="flex items-center gap-x-2">
                        <Pen className="w-5 h-5" />
                        Create
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Product List</CardTitle>
                    <CardDescription>A collection of your product.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <ProductList products={products} />
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>
        </div>
    )
}

export default Products