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
import { Header } from "@/components/dashboard/quick-order/header";
import { QuickOrderList } from "@/components/dashboard/quick-order";
import { db } from "@/lib/db";

interface Props {
    searchParams: {
        search: string;
        perPage: string;
        page: string;
        status: string;
        date: Date;
    }
}

const QuickOrders = async ({ searchParams }: Props) => {
    const { search, perPage, page, status, date: dateString } = searchParams;
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(perPage) || 5;

    const date = dateString ? new Date(dateString) : null;

    const orders = await db.quickOrder.findMany({
        where: {
            ...(status !== "ALL" && { status }),
            ...(search && { name: { contains: search, mode: "insensitive" } }),
            ...(date && {
                createdAt: {
                    gte: new Date(date.setHours(0, 0, 0, 0)),
                    lt: new Date(date.setHours(23, 59, 59, 999))
                }
            }),
        },
        include: {
            product: true
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (pageNumber - 1) * pageSize || 0,
        take: pageSize || 5
    })

    const totalOrder = await db.quickOrder.count({
        where: {
            ...(status !== "ALL" && { status }),
            ...(search && { name: { contains: search, mode: "insensitive" } }),
            ...(date && {
                createdAt: {
                    gte: new Date(date.setHours(0, 0, 0, 0)),
                    lt: new Date(date.setHours(23, 59, 59, 999))
                }
            }),
        },
    })

    const totalPage = Math.ceil(totalOrder / pageSize)

    return (
        <div className="w-full space-y-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard">Dashobard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Quick Orders</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="w-[350px] sm:w-full mx-auto">
                <CardHeader>
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>A collection of your quick orders.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 px-1 md:px-5">
                    <Header />
                    <QuickOrderList orders={orders} />
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>
        </div>
    )
}

export default QuickOrders