"use client"

import { ClerkLoaded, ClerkLoading, SignOutButton, SignedOut, SignedIn, SignInButton } from "@clerk/nextjs"
import { User, UserCog, MapPinned, Heart, LogOut, Loader2 } from "lucide-react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

import { getUser } from "@/services/user.services"

export const Account = () => {

    const { data: user } = useQuery({
        queryKey: ["get-user-profile"],
        queryFn: async () => {
            const user = await getUser()
            return user
        }
    })

    return (
        <div>
            {/* <SignedOut>
                <ClerkLoading>
                    <Loader2 className="w-5 h-5 animate-spin" />
                </ClerkLoading>
                <SignInButton mode="modal" forceRedirectUrl="/">
                    <Button variant="outline" size="icon">
                        <ClerkLoaded>
                            <div className="w-5 h-5 dark:text-white">
                                <User />
                            </div>
                        </ClerkLoaded>
                    </Button>
                </SignInButton>
            </SignedOut>

            <SignedIn >
                <ClerkLoading>
                    <Loader2 className="w-5 h-5 animate-spin" />
                </ClerkLoading>
                <ClerkLoaded>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar>
                                <AvatarImage src={user?.user.imageUrl || ""} />
                                <AvatarFallback>{user?.user.name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link
                                    href="/account"
                                    className="flex items-center gap-x-2"
                                >
                                    <UserCog className="w-5 h-5" /> My Account
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link href="/account/orders" className="flex items-center gap-x-2">
                                    <MapPinned className="w-5 h-5" /> Orders
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link href="/wishlist" className="flex items-center gap-x-2">
                                    <Heart className="w-5 h-5" /> My Wishlist
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="p-0">
                                <ClerkLoading>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                </ClerkLoading>
                                <ClerkLoaded>
                                    <Button variant="ghost" className="py-0 flex items-center gap-x-2 " asChild>
                                        <SignOutButton redirectUrl="/">
                                            <span className="flex items-center gap-x-2">
                                                <LogOut className="w-5 h-5" /> Logout
                                            </span>
                                        </SignOutButton>
                                    </Button>
                                </ClerkLoaded>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </ClerkLoaded>
            </SignedIn> */}
        </div>
    )
}