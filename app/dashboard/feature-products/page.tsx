import {
    Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { CustomPagination } from "@/components/custom-pagination";
import { Header } from "@/components/dashboard/best-deal/header";
import { FeatureProductList } from "@/components/dashboard/feature-products";
import { AssignButton } from "@/components/dashboard/feature-products/assign-button";
import { db } from "@/lib/db";

interface Props {
  searchParams: {
      sort: string;
      page: string;
      perPage: string;
      search: string;
  }
};

const FeatureProducts = async ({ searchParams }: Props) => {
    const { sort = "desc", page = "1", perPage = "4", search = "" } = searchParams;
    const itemsPerPage = parseInt(perPage) || 8;  
    const currentPage = parseInt(page) || 1;

    const products = await db.product.findMany({
        where: {
        genre: {
            has: "feature",
        },
        ...(search && {name: {contains: search, mode: "insensitive"}})
        },
        include: {
        brand: true,
        category: true,
        stocks: true
        },
        orderBy: {
        ...(sort === 'asc' && { createdAt: 'asc' }),
        ...(sort === 'desc' && { createdAt: 'desc' }),
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    });

    const totalProduct = await db.product.count({
        where: {
            genre: {
            has: "feature",
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
                        <BreadcrumbPage>Feature Products</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <AssignButton />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Feature Products</CardTitle>
                    <CardDescription>Manage your feature products collection.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <FeatureProductList products={products} />
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>
        </div>
    )
}

export default FeatureProducts