import { redirect } from "next/navigation"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { db } from "@/lib/db"
import { EditBrandForm } from "@/components/dashboard/brand/edit-brand-form"

const EditBrand = async ({params}:{params:{brandId:string}}) => {

    const brand = await db.brand.findUnique({
        where: {
            id:params.brandId
        }
    })

    if(!brand) redirect("/")

    return (
        <div className="w-full space-y-4 px-2">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard/brand">Brand</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbPage>Edit</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <EditBrandForm brand={brand} />
        </div>
    )
}

export default EditBrand