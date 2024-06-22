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
import { SellerList } from "@/components/dashboard/seller";
import { Header } from "@/components/dashboard/seller/header";
import { db } from "@/lib/db"

interface Props {
  searchParams: {
      status: string;
      page: string;
      perPage: string;
      search: string;
  }
};

const Sellers = async ({ searchParams }: Props) => {
    const {search, status} = searchParams
    const itemsPerPage = parseInt(searchParams.perPage) || 5;  
    const currentPage = parseInt(searchParams.page) || 1;

    
    const sellers = await db.seller.findMany({
        where: {
            status: {
                ...(status !== "all" ? {equals: status, not: "pending"} : {not: "pending"})
            },
            ...(search && {name: {contains: search, mode: "insensitive"}})
        },
        include: {
            orders: {
                where: {
                    status: "delivered"
                },
                select: {
                    id: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalSeller = await db.seller.count({
        where: {
            ...(status !== "all" ? {status} : {status: {not: "pending"}}),
            ...(search && {name: {contains: search, mode: "insensitive"}})
        },
    }) 

    const totalPage = Math.ceil(totalSeller / itemsPerPage)

    return (
        <div className="w-full space-y-8">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbPage>Sellers</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="w-[350px] sm:w-full mx-auto">
                <CardHeader>
                    <CardTitle>Seller List</CardTitle>
                    <CardDescription>A collection of seller.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <SellerList sellers={sellers} />
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>
        </div>
    )
}

export default Sellers