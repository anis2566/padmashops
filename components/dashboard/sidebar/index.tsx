"use client"

import { Logo } from "@/components/logo"
import { DASHBOARD_SIDEBAR } from "@/constant"
import { SidebarItem } from "@/components/dashboard/sidebar/sidebar-item"

export const Sidebar = () => {
    return (
        <div className="hidden border-r bg-muted/40 md:block fixed left-0 top-0 min-h-screen w-[220px]">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Logo callbackUrl="/" />
                </div>
                <div className="flex h-full overflow-auto max-h-screen flex-col gap-2">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {
                            DASHBOARD_SIDEBAR.map((item) => (
                                <SidebarItem key={item.href} {...item} />
                            ))
                        }
                    </nav>
                </div>
            </div>
        </div>
    )
}