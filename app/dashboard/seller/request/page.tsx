import {
    Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { Header } from "@/components/dashboard/seller/request/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/lib/db"
import { CustomPagination } from "@/components/custom-pagination"
import { SellerRequestList } from "@/components/dashboard/seller/request"

interface Props {
  searchParams: {
      sort: string;
      page: string;
      perPage: string;
      search: string;
  }
};

const SellerRequest = async ({ searchParams }: Props) => {
    const {search, sort} = searchParams
    const itemsPerPage = parseInt(searchParams.perPage) || 5;  
    const currentPage = parseInt(searchParams.page) || 1;

    const sellers = await db.seller.findMany({
        where: {
            status: "pending",
            ...(search && {name: {contains: search, mode: "insensitive"}})
        },
        orderBy: {
            createdAt: sort === "asc" ? "asc" : "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalSeller = await db.seller.count({
        where: {
            status: "pending",
            ...(search && {name: {contains: search, mode: "insensitive"}})
        }
    })

    const totalPage = Math.round(totalSeller / itemsPerPage)

    return (
        <div className="w-full space-y-8">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard/seller">Sellers</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbPage>Request</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="w-[350px] sm:w-full mx-auto">
                <CardHeader>
                    <CardTitle>Request List</CardTitle>
                    <CardDescription>A collection of seller request.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <SellerRequestList sellers={sellers} />
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>
        </div>
    )
}

export default SellerRequest