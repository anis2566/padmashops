"use client"

import { useQuery } from "@tanstack/react-query"

import { Separator } from "@/components/ui/separator"

import { Logo } from "@/components/logo"
import { CLIENT_SIDEBAR, DASHBOARD_SELLER_SIDEBAR, DASHBOARD_SIDEBAR } from "@/constant"
import { SidebarItem } from "@/components/dashboard/sidebar/sidebar-item"
import { GET_PENDING_ORDER } from "@/actions/order.action"
import { Headset } from "lucide-react"

export const Sidebar = () => {

    const {data} = useQuery({
        queryKey: ["pending-order-count"],
        queryFn: async () => {
            const res = await GET_PENDING_ORDER()
            return res
        },
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false
    })

    return (
        <div className="hidden border-r bg-muted/40 md:block fixed left-0 top-0 min-h-screen w-[220px]">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-16 items-center border-b px-4 lg:h-[68px] lg:px-6">
                    <Logo callbackUrl="/dashboard" />
                </div>
                <div className="space-y-1 overflow-y-auto">
                    <div className="flex h-full max-h-screen flex-col gap-2">
                        <div className="flex-1 mt-3 space-y-1">
                            <p className="text-sm italic text-muted-foreground px-2 lg:px-7">Main</p>
                            <Separator />
                            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 pt-2">
                                {
                                    DASHBOARD_SIDEBAR.map((item) => (
                                        <SidebarItem key={item.href} {...item} pendingOrders={data?.pendingOrders ?? 0} />
                                    ))
                                }
                            </nav>
                        </div>
                    </div>
                    <div className="flex h-full max-h-screen flex-col gap-2">
                        <div className="flex-1 mt-3 space-y-1">
                            <p className="text-sm italic text-muted-foreground px-2 lg:px-7">Seller</p>
                            <Separator />
                            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 pt-2">
                                {
                                    DASHBOARD_SELLER_SIDEBAR.map((item) => (
                                        <SidebarItem key={item.href} {...item} pendingOrdersSeller={data?.pendingSellerOrders ?? 0} />
                                    ))
                                }
                            </nav>
                        </div>
                    </div>
                    <div className="flex h-full max-h-screen flex-col gap-2">
                        <div className="flex-1 mt-3 space-y-1">
                            <p className="text-sm italic text-muted-foreground px-2 lg:px-7">Client</p>
                            <Separator />
                            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 pt-2">
                                {
                                    CLIENT_SIDEBAR.map((item) => (
                                        <SidebarItem key={item.href} {...item} />
                                    ))
                                }
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}