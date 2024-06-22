import { Loader2Icon } from "lucide-react"
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs"

import { ModeToggle } from "@/components/mode-toggle"
import { Logo } from "@/components/logo"
import { NavbarDrawer } from "./nav-drawer"
import { Notification } from "@/components/notification"

export const Navbar = () => {
    return (
        <header className="md:ml-[220px] flex justify-between h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 sticky top-0 left-0 z-10">
            <div className="flex items-center gap-x-2 md:hidden">
                <NavbarDrawer />
                <Logo callbackUrl="/dashboard" />
            </div>
            <div className="hidden md:flex text-xl font-semibold">
                Dashboard
            </div>
            <div className="flex items-center gap-x-2">
                <ModeToggle />
                <Notification />
                <ClerkLoading>
                    <Loader2Icon className="w-5 h-5 animate-spin" />
                </ClerkLoading>
                <ClerkLoaded>
                    <UserButton afterSignOutUrl="/" />
                </ClerkLoaded>
            </div>
        </header>
    )
}