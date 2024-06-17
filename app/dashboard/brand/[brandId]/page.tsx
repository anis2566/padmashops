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
import { ProductHeader } from "@/components/dashboard/brand/product-header";
import { ProductList } from "@/components/dashboard/brand/product-list";

interface BrandProductsProps {
    params: {
        brandId: string;
    },
    searchParams: {
        page: string;
        perPage: string;
        search: string;
    }
}

const BrandProducts = async ({ params: { brandId }, searchParams }: BrandProductsProps) => {
    const {search} = searchParams
    const itemsPerPage = parseInt(searchParams.perPage) || 8;  
    const currentPage = parseInt(searchParams.page) || 1;

    const products = await db.product.findMany({
        where: {
            brandId,
            ...(search && {name: {contains: search, mode: "insensitive"}})
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalProduct = await db.product.count({
        where: {
            brandId,
            ...(search && {name: {contains: search, mode: "insensitive"}})
        }
    })

    const totalPage = Math.round(totalProduct / itemsPerPage)

    return (
        <div className="w-full space-y-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard/brand">Brands</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Products</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card>
                <CardHeader>
                    <CardTitle>Brand Products</CardTitle>
                    <CardDescription>A collection of this brand product.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <ProductHeader />
                    <ProductList products={products} />
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>
        </div>
    )
}

export default BrandProducts