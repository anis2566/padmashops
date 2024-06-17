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
import { CustomPagination } from "@/components/custom-pagination"
import { SubscriberList } from "@/components/dashboard/subscribers"
import { Header } from "@/components/dashboard/subscribers/header"

interface Props {
  searchParams: {
      page: string;
      perPage: string;
      search: string;
  }
};

const Subscribers = async ({searchParams}:Props) => {
    const {search} = searchParams
    const itemsPerPage = parseInt(searchParams.perPage) || 5;  
    const currentPage = parseInt(searchParams.page) || 1;

    const subscribers = await db.subscriber.findMany({
        where: {
            ...(search && {email: {contains: search, mode: "insensitive"}})
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalSubscriber = await db.subscriber.count({
        where: {
            ...(search && {email: {contains: search, mode: "insensitive"}})
        }
    })

    const totalPage = Math.round(totalSubscriber / itemsPerPage)

    return (
        <div className="w-full space-y-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbPage>Subscribers</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="w-[350px] sm:w-full mx-auto">
                <CardHeader>
                    <CardTitle>Subscriber List</CardTitle>
                    <CardDescription>A collection of your subscriber.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <SubscriberList subscribers={subscribers} />
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>
        </div>
    )
}

export default Subscribers