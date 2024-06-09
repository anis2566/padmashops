"use client"

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Heart, LogOut, ShoppingCart, UserCog } from "lucide-react";
import { SignInButton, SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Account = () => {
    const { user } = useUser();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <>
            <SignedIn>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar>
                            <AvatarImage src={user?.imageUrl} />
                            <AvatarFallback>{user?.firstName?.charAt(0)}</AvatarFallback>
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
                                <ShoppingCart className="w-5 h-5" /> Orders
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