import {
    Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { CustomPagination } from "@/components/custom-pagination"
import { CustomerList } from "@/components/dashboard/customers"
import { Header } from "@/components/dashboard/customers/haeder"
import { db } from "@/lib/db"

interface Props {
  searchParams: {
      page: string;
      perPage: string;
      search: string;
  }
};

const Customers = async ({ searchParams }: Props) => {
    
    const {search} = searchParams
    const itemsPerPage = parseInt(searchParams.perPage) || 5;  
    const currentPage = parseInt(searchParams.page) || 1;

    const users = await db.user.findMany({
        where: {
            ...(search && {name: {contains: search, mode: "insensitive"}})
        },
        include: {
            orders: {
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

    const totalUser = await db.user.count({
        where: {
            ...(search && {name: {contains: search, mode: "insensitive"}})
        }
    })

    const totalPage = Math.round(totalUser / itemsPerPage)

    return (
        <div className="w-full space-y-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbPage>Customers</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card>
                <CardHeader>
                    <CardTitle>Customer List</CardTitle>
                    <CardDescription>A collection of your customers.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <CustomerList users={users} />
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>
        </div>
    )
}

export default Customers