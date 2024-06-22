import { redirect } from "next/navigation"

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
import { WithdrawButton } from "@/components/seller/withdraw/withdraw-button"
import { getSeller } from "@/services/user.services"
import { Header } from "@/components/seller/withdraw/header"
import { WithdrawList } from "@/components/seller/withdraw/withdraw-list"
import { formatPriceBDT } from "@/lib/utils"
import { CustomPagination } from "@/components/custom-pagination"

interface Props {
    searchParams: {
        page: string;
        status: string;
        perPage: string;
    }
}

const Withdraw = async ({ searchParams }: Props) => {
    const { status } = searchParams;
    const itemsPerPage = parseInt(searchParams.perPage) || 5;  
    const currentPage = parseInt(searchParams.page) || 1;

    const { sellerId } = await getSeller()
    const bank = await db.bank.findUnique({
        where: {
            sellerId
        }
    })

    if (!bank) redirect("/")
    
    const withdraws = await db.withdraw.findMany({
        where: {
            sellerId,
            ...(status !== "all" && {status})
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalWithdraw = await db.withdraw.count({
        where: {
            sellerId,
            ...(status !== "all" && {status})
        },
    })

    const totalPage = Math.round(totalWithdraw / itemsPerPage)

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                        <BreadcrumbPage>Withdraw</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <WithdrawButton />
            </div>

            <div>
                <p className="text-xl font-bold text-muted-foreground">Available Balance</p>
                <p className="text-md">{formatPriceBDT(bank.current)}</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Withdraw History</CardTitle>
                    <CardDescription>A collection of you withdraw.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Header />
                    <WithdrawList withdraws={withdraws} />
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>
        </div>
    )
}

export default Withdraw