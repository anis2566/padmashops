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
import { MessageList } from "@/components/dashboard/message"
import { Header } from "@/components/dashboard/message/header"
import { db } from "@/lib/db"

interface Props {
    searchParams: {
        sort: string;
        page: string;
        perPage: string;
    }
}

const Message = async ({ searchParams }: Props) => {
    const {sort} = searchParams
    const itemsPerPage = parseInt(searchParams.perPage) || 5;  
    const currentPage = parseInt(searchParams.page) || 1;

    const messages = await db.message.findMany({
        orderBy: {
            createdAt: sort === "asc" ? "asc" : "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalMessage = await db.message.count()
    
    const totalPage = Math.round(totalMessage / itemsPerPage)

    return (
        <div className="w-full space-y-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbPage>Message</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card>
                <CardHeader>
                    <CardTitle>Messages</CardTitle>
                    <CardDescription>A collection of customer support message.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <MessageList messages={messages} />
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>
        </div>
    )
}

export default Message