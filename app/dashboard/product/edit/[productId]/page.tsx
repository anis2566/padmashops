import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {db} from "@/lib/db"
import { redirect } from "next/navigation"
import { EditProductForm } from "@/components/dashboard/product/edit-product-form"


const EditProdut = async ({params}:{params:{productId:string}}) => {
    const product = await db.product.findFirst({
        where: {
            id:params.productId
        },
        include: {
            stocks: true,
        }
    })

    if (!product) redirect("/")
    
    return (
        <div className="w-full space-y-8">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard/product">Products</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbPage>Edit</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <EditProductForm product={product} />
        </div>
    )
}

export default EditProdut