import { CustomPagination } from "@/components/custom-pagination";
import { OrderList } from "@/components/home/account/orders";
import { Header } from "@/components/home/account/orders/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/lib/db"
import { getUser } from "@/services/user.services";

interface Props {
    searchParams: {
        page: string;
        perPage: string;
        status: string;
    }
  };

const Orders = async ({searchParams}:Props) => {
    const {status} = searchParams
    const itemsPerPage = parseInt(searchParams.perPage) || 5;  
    const currentPage = parseInt(searchParams.page) || 1;

    const {userId} = await getUser()

    const orders = await db.order.findMany({
        where: {
            userId,
            ...(status !== "all" && {status})
        },
        include: {
            products: {
                include: {
                    product:true
                }
            },
            user: true
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalOrder = await db.order.count({
        where: {
            userId,
            ...(status !== "all" && {status})
        }
    })

    const totalPage = totalOrder / itemsPerPage

    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle>Your Orders</CardTitle>
                <CardDescription>Explore your order list</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Header />
                <OrderList orders={orders} />
                <CustomPagination totalPage={totalPage} />
            </CardContent>
        </Card>
    )
}

export default Orders