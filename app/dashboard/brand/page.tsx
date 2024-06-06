import { CirclePlus } from "lucide-react"
import Link from "next/link"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/dashboard/brand/header"
import { db } from "@/lib/db"
import { BrandList } from "@/components/dashboard/brand"


const Brand = async () => {

    const brands = await db.brand.findMany({})

    // const totalBrand = 
    
    return (
        <div className="w-full space-y-4">
            <div className="flex items-center gap-4">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Brand</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Link href="/dashboard/brand/create">
                    <Button size="sm" className="flex items-center gap-x-2">
                        <CirclePlus className="w-5 h-5" />
                        Create
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Brand List</CardTitle>
                    <CardDescription>A collection of your brand list.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <BrandList brands={brands} />
                </CardContent>
            </Card>
        </div>
    )
}

export default Brand