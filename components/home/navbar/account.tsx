"use client"

import { Heart, LayoutDashboard, LogOut, ShoppingCart, UserCog } from "lucide-react";
import { SignInButton, SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/user.services";

export const Account = () => {
    const { data: user } = useQuery({
        queryKey: ["get-user-profile"],
        queryFn: async () => {
            const res = await getUser();
            return res.user;
        },
        staleTime: 60 * 60 * 1000
    });

    return (
        <>
            <SignedIn>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar>
                            <AvatarImage src={user?.imageUrl || ""} />
                            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
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
            </SignedIn>
            <SignedOut>
                <Button asChild>
                    <SignInButton mode="modal" forceRedirectUrl="/">
                        Login
                    </SignInButton>
                </Button>
            </SignedOut>
        </>
    );
}