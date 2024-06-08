"use client"

import { USER_NAVBAR } from "@/constant"
import { SidebarItem } from "./sidebar-item"

export const Sidebar = () => {
    return (
        <div className="hidden border-r md:block min-h-screen w-[220px] flex-srink-0">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                {
                    USER_NAVBAR.map((item) => (
                        <SidebarItem key={item.href} {...item} />
                    ))
                }
            </nav>
        </div>
    )
}