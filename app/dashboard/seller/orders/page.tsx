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
import { SellerOrders } from "@/components/dashboard/seller/orders";
import { Header } from "@/components/dashboard/seller/orders/header";
import { db } from "@/lib/db"

interface SearchPageProps {
  searchParams: {
      status: string;
      page: string;
      perPage: string;
      search: string;
      date: Date;
  }
};

const Orders = async ({ searchParams }: SearchPageProps) => {
    const {search, status, date:dateString} = searchParams
    const itemsPerPage = parseInt(searchParams.perPage) || 5;  
    const currentPage = parseInt(searchParams.page) || 1;

    const date = dateString ? new Date(dateString) : null;

    const orders = await db.sellerOrder.findMany({
        where: {
            ...(search && {
                customerName: {
                    contains: search, mode: "insensitive"
                }
            }),
            ...(date && {
                createdAt: {
                    gte: new Date(date.setHours(0, 0, 0, 0)), 
                    lt: new Date(date.setHours(23, 59, 59, 999)) 
                }
            }),
            ...(status !== "all" && { status })
        },
        include: {
            products: {
                include: {
                    product: {
                        select: {
                            featureImageUrl: true
                        }
                    }
                }
            },
            seller: {
                select: {
                    name: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    });

    const totalOrders = await db.sellerOrder.count({
        where: {
            ...(search && {
                customerName: {
                    contains: search, mode: "insensitive"
                }
            }),
            ...(date && {
                createdAt: {
                    gte: new Date(date.setHours(0, 0, 0, 0)), 
                    lt: new Date(date.setHours(23, 59, 59, 999)) 
                }
            }),
            ...(status !== "all" && { status })
        }
    })

    const totalPage = Math.round(totalOrders / itemsPerPage)

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
                    <BreadcrumbPage>Orders</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="w-[350px] sm:w-full mx-auto">
                <CardHeader>
                    <CardTitle>Seller Orders</CardTitle>
                    <CardDescription>A collection of seller order.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <SellerOrders orders={orders} />
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>
        </div>
    )
}

export default Orders