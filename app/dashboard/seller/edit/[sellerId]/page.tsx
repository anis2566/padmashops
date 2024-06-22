import { redirect } from "next/navigation";

import {
    Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { db } from "@/lib/db";
import { EditSellerForm } from "@/components/dashboard/seller/edit/edit-seller";

interface Props {
    params: {
        sellerId: string;
    }
}

const EditSeller = async ({ params: { sellerId } }: Props) => {
    
    const seller = await db.seller.findUnique({
        where: {
            id: sellerId
        }
    })

    if(!seller) redirect("/dashboard")

    return (
        <div className="w-full space-y-4 px-2">
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
                    <BreadcrumbPage>Edit</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <EditSellerForm seller={seller} />
        </div>
    )
}

export default EditSeller;