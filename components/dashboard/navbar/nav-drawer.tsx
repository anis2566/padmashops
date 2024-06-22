"use client"

import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import { CLIENT_SIDEBAR, DASHBOARD_SELLER_SIDEBAR, DASHBOARD_SIDEBAR } from "@/constant";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

export const NavbarDrawer = () => {

    const pathname = usePathname()

    return (
        <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col w-[250px] overflow-y-auto">
              <nav className="grid gap-3">
                <Logo callbackUrl="/dashboard" />
                    <div className="space-y-3">
                        <div className="flex-1 mt-3">
                            <p className="text-sm italic text-muted-foreground px-2 lg:px-7">Main</p>
                                {
                                    DASHBOARD_SIDEBAR.map(({label, icon:Icon, href}, i) => {
                                        const active = pathname === href;
                                        return (
                                        <SheetClose asChild key={i}>
                                            <Link
                                            href={href}
                                            className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", active && "bg-muted text-primary hover:text-primary")}
                                            >
                                            <Icon className="h-5 w-5" />
                                            {label}
                                            </Link>
                                        </SheetClose>
                                        )
                                    })
                                }
                        </div>
                        <div className="flex-1 mt-3">
                            <p className="text-sm italic text-muted-foreground px-2 lg:px-7">Seller</p>
                                {
                                    DASHBOARD_SELLER_SIDEBAR.map(({label, icon:Icon, href}, i) => {
                                        const active = pathname === href;
                                        return (
                                        <SheetClose asChild key={i}>
                                            <Link
                                            href={href}
                                            className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", active && "bg-muted text-primary hover:text-primary")}
                                            >
                                            <Icon className="h-5 w-5" />
                                            {label}
                                            </Link>
                                        </SheetClose>
                                        )
                                    })
                                }
                        </div>
                        <div className="flex-1 mt-3">
                            <p className="text-sm italic text-muted-foreground px-2 lg:px-7">Client</p>
                                {
                                    CLIENT_SIDEBAR.map(({label, icon:Icon, href}, i) => {
                                        const active = pathname === href;
                                        return (
                                        <SheetClose asChild key={i}>
                                            <Link
                                            href={href}
                                            className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", active && "bg-muted text-primary hover:text-primary")}
                                            >
                                            <Icon className="h-5 w-5" />
                                            {label}
                                            </Link>
                                        </SheetClose>
                                        )
                                    })
                                }
                        </div>
                    </div>
              </nav>
            </SheetContent>
        </Sheet>
    )
}