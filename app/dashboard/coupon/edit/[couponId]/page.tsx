import { redirect } from "next/navigation"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {db} from "@/lib/db"
import { EditCouponForm } from "@/components/dashboard/coupon/edit-coupon";

interface Props {
    params: {
        couponId: string;
    }
}

const EditCoupon = async ({params}: Props) => {

    const coupon = await db.coupon.findFirst({
        where: {
            id:params.couponId
        }
    })

    if(!coupon) redirect("/") 

    return (
        <div className="w-full space-y-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard/coupon">Coupon</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbPage>Edit</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <EditCouponForm coupon={coupon} />
        </div>
    )
}

export default EditCoupon