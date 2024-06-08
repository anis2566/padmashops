import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"

import { Logo } from "@/components/logo"
import { Search } from "./search"
import { NavMenu } from "./nav-menu"
// import { NavDrawer } from "./drawer"

export const Navbar = () => {
    return (
        <div className="w-full bg-white border-b-1 border-gray-200 py-3 sticky inset-0 z-50">
            <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between gap-x-3 px-4">
                {/* <NavDrawer>
                    <Button variant="ghost" size="icon" className="sm:hidden">
                        <Menu className="w-5 h-5" />
                    </Button>
                </NavDrawer> */}
                <Logo callbackUrl="/" />
                <Search />
                <NavMenu />
            </div>
        </div>
    )
}