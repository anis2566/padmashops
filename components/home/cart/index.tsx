"use client"

import Image from "next/image"
import Link from "next/link";
import CountUp from 'react-countup';
import { TbCurrencyTaka } from "react-icons/tb";

import { Badge } from "@/components/ui/badge";

import { useCart } from "@/store/use-cart";

export const Cart = () => {
    const { cart } = useCart()

    const total = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)

    return (
        <Link href="/cart" className="hidden md:flex fixed right-0 top-[45vh] border border-primary p-2 bg-white w-[90px] flex-col items-center rounded-tl-md rounded-bl-md">
            <Image
                src="/cart.webp"
                alt="Description of the image"
                width={40}
                height={40}
            />
            <div className="flex items-center text-primary font-bold">
                <TbCurrencyTaka className="h-5 w-5" />
                <CountUp
                    start={0}
                    end={total}
                    duration={2.75}
                    className="-ml-1"
                />
            </div>

            <Badge className="bg-indigo-500">{cart.length} Items</Badge>
        </Link>
    )
}