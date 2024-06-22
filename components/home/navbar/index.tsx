import { Loader2, Menu } from "lucide-react"
import { ClerkLoading, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"

import { Logo } from "@/components/logo"
import { Search } from "./search"
import { NavDrawer } from "./nav-drawer"
import { Account } from "./account"
import { Wishlist } from "./wishlist"
import { Cart } from "./cart"
import { Notification } from "@/components/notification"

export const Navbar = () => {
    return (
        <div className="w-full bg-white border-b-1 border-gray-200 py-3 sticky inset-0 z-50">
            <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between gap-x-3 px-4">
                <NavDrawer>
                    <Button variant="ghost" size="icon" className="sm:hidden">
                        <Menu className="w-5 h-5" />
                    </Button>
                </NavDrawer>
                <Logo callbackUrl="/" />
                <Search />
                <SignedIn>
                    <div className="flex items-center">
                        <Notification />
                        <Wishlist />
                        <Cart />
                        <Account />
                    </div>
                </SignedIn>
                <SignedOut>
                    <ClerkLoading>
                        <Loader2 className="w-5 h-5 animate-spin" />
                    </ClerkLoading>
                    <Button asChild size="sm" className="p-2">
                        <SignInButton forceRedirectUrl="/" mode="modal">Login</SignInButton>
                    </Button>
                </SignedOut>
            </div>
        </div>
    )
}