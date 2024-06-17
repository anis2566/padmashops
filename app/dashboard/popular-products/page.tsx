import {
    Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { db } from "@/lib/db";
import { CustomPagination } from "@/components/custom-pagination";
import { PopularProductList } from "@/components/dashboard/popular-products";
import { AssignButton } from "@/components/dashboard/popular-products/assign-button";
import { Header } from "@/components/dashboard/popular-products/header";

interface Props {
  searchParams: {
      sort: string;
      page: string;
      perPage: string;
      search: string;
  }
};

const PopularProducts = async ({ searchParams }: Props) => {
    const { sort = "desc", page = "1", perPage = "8", search = "" } = searchParams;
    const itemsPerPage = parseInt(perPage) || 8;  
    const currentPage = parseInt(page) || 1;

    const products = await db.product.findMany({
        where: {
        genre: {
            has: "popular",
        },
        ...(search && {name: {contains: search, mode: "insensitive"}})
        },
        include: {
        brand: true,
        category: true,
        stocks: true
        },
        orderBy: {
            createdAt: sort === "asc" ? "asc" : "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    });

    const totalProduct = await db.product.count({
        where: {
            genre: {
            has: "popular",
        },
        ...(search && {name: {contains: search, mode: "insensitive"}})
        }
    })

    const totalPage = Math.round(totalProduct / itemsPerPage)

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
                        <BreadcrumbPage>Popular Products</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <AssignButton />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Popular Products</CardTitle>
                    <CardDescription>Manage your popular products collection.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <PopularProductList products={products} />
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>
        </div>
    )
}

export default PopularProducts