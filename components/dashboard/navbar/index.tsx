import { Loader2, Search, } from "lucide-react"

import { Input } from "@/components/ui/input"

import { ModeToggle } from "@/components/mode-toggle"

export const Navbar = () => {
    return (
        <header className="md:ml-[220px] flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 sticky top-0 left-0 z-10">
            {/* <NavbarDrawer /> */}
            <div className="w-full flex-1">
                <form className="hidden sm:flex">
                    <div className="relative w-full">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search product..."
                            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                        />
                    </div>
                </form>
            </div>
            <div className="flex items-center gap-x-2">
                <ModeToggle />
                {/* <Notification /> */}
                {/* <ClerkLoading>
                <Loader2 className="w-5 h-5 animate-spin" />
              </ClerkLoading>
              <ClerkLoaded>
                <UserButton afterSignOutUrl="/" />
              </ClerkLoaded> */}
            </div>
        </header>
    )
}