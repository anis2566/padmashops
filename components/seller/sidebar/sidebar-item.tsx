"use client"

import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils";

interface SidebarItemProps {
    label: string,
    href: string,
    icon: LucideIcon;
}

export const SidebarItem = ({ label, href, icon: Icon }: SidebarItemProps) => {



    const pathname = usePathname()

    // List of routes that require an exact match
    const exactMatchRoutes = ["/seller"]

    // Check if the current pathname matches exactly or starts with the href
    const active = exactMatchRoutes.includes(href)
        ? pathname === href
        : pathname === href || pathname.startsWith(href)

    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                active && "bg-muted text-primary hover:text-primary"
            )}
        >
            <Icon className="h-4 w-4" />
            {label}
        </Link>
    )
}
