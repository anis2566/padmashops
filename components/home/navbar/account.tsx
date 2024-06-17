import {SignOutButton } from "@clerk/nextjs"
import { Heart, LayoutDashboard, LogOut, ShoppingCart, UserCog } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export const Account = async () => {
    const user = await currentUser()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="ml-1">
                    <AvatarImage src={user?.imageUrl || ""} />
                    <AvatarFallback>{user?.firstName?.charAt(0)}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px]">
                <DropdownMenuItem asChild>
                    <Link
                        href="/account"
                        className="flex items-center gap-x-2"
                    >
                        <LayoutDashboard className="w-5 h-5" /> Dashboard
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href="/account/orders" className="flex items-center gap-x-2">
                        <ShoppingCart className="w-5 h-5" /> Orders
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href="/wishlist" className="flex items-center gap-x-2">
                        <Heart className="w-5 h-5" /> Wishlist
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href="/account/profile" className="flex items-center gap-x-2">
                        <UserCog className="w-5 h-5" /> Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-0">
                    <SignOutButton redirectUrl="/">
                        <Button variant="ghost" className="py-0 flex items-center gap-x-2 ">
                            <LogOut className="w-5 h-5" /> Logout
                        </Button>
                    </SignOutButton>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}