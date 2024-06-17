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
import { Header } from "@/components/dashboard/customers/order-header"
import { OrderList } from "@/components/dashboard/customers/order-list"

interface Props {
    params: {
        customerId: string;
    },
    searchParams: {
        perPage: string;
        page: string;
        status: string;
    }
}

const CustomerOrders = async ({ params, searchParams }: Props) => {
    
    const { perPage, page, status } = searchParams;
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(perPage) || 5;

    const orders = await db.order.findMany({
        where: {
            userId: params.customerId,
            ...(status !== "all" && { status }),
        },
        include: {
            shippingInfo: {
                select: {
                    name: true
                }
            },
            products: {
                include: {
                    product: {
                        select: {
                            featureImageUrl: true
                        }
                    }
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (pageNumber - 1) * pageSize || 0,
        take: pageSize || 5
    })

    const totalOrder = await db.order.count({
        where: {
            userId: params.customerId,
            ...(status !== "all" && { status }),
        }
    })

    const totalPage = Math.round(totalOrder / pageSize)

    return (
        <div className="w-full space-y-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard/customers">Customers</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbPage>Orders</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card>
                <CardHeader>
                    <CardTitle>Customer Orders</CardTitle>
                    <CardDescription>A collection of customer orders.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <OrderList orders={orders} />
                </CardContent>
            </Card>
        </div>
    )
}

export default CustomerOrders