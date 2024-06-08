import { Copyright, Headset, Mail, MapPin, } from "lucide-react"
import Link from "next/link"
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { Separator } from "@/components/ui/separator"
import { Logo } from "@/components/logo"
import { SocialIconBox } from "./social-icon-box"

export const Footer = () => {
    return (
        <div className="px-4 space-y-6 w-full max-w-screen-xl mx-auto bg-white py-4 mt-4">
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-7">
                <div className="space-y-3 col-end">
                    <div>
                        <Logo callbackUrl="/" />
                        <p className="text-muted-foreground">An assistant on your shopping</p>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <MapPin className="w-5 h-5 text-sky-500" />
                        <p><span className="font-bold">Address:</span> Chakbazar, Dhaka</p>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <Headset className="w-5 h-5 text-sky-500" />
                        <p><span className="font-bold">Call:</span> 01969-764382</p>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <Mail className="w-5 h-5 text-sky-500" />
                        <p><span className="font-bold">Email:</span> padmacart23@gmail.com</p>
                    </div>
                </div>
                <div className="flex flex-col space-y-2">
                    <p className="text-2xl font-bold">Company</p>
                    <Link href="/about" className="hover:ml-2 hover:underline transition-all duration-200">
                        About Us
                    </Link>
                    <Link href="/delivery-info" className="hover:ml-2 hover:underline transition-all duration-200">
                        Delivery Info
                    </Link>
                    <Link href="/contact" className="hover:ml-2 hover:underline transition-all duration-200">
                        Contact Us
                    </Link>
                    <Link href="/support" className="hover:ml-2 hover:underline transition-all duration-200">
                        Support
                    </Link>
                </div>
                <div className="flex flex-col space-y-2">
                    <p className="text-2xl font-bold">Account</p>
                    <Link href="/cart" className="hover:ml-2 hover:underline transition-all duration-200">
                        View Cart
                    </Link>
                    <Link href="/wishlist" className="hover:ml-2 hover:underline transition-all duration-200">
                        My Wishlist
                    </Link>
                    <Link href="/track-order" className="hover:ml-2 hover:underline transition-all duration-200">
                        Track My Order
                    </Link>
                    <Link href="/support" className="hover:ml-2 hover:underline transition-all duration-200">
                        Support
                    </Link>
                </div>
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-7 min-h-[100px]">
                <div className="space-y-1">
                    <p className="flex items-center gap-x-2"><Copyright className="w-5 h-5" />{new Date().getFullYear()}, E-Shop</p>
                    <p className="text-sm text-muted-foreground">All right reserved</p>
                </div>
                <div className="space-y-2">
                    <p>Follow Us</p>
                    <div className="flex items-center gap-x-2">
                        <SocialIconBox icon={FaFacebook} bgcolor="bg-[#1877F2]" href="https://facebook.com" />
                        <SocialIconBox icon={FaXTwitter} bgcolor="bg-[#1DA1F2]" href="https://twitter.com" />
                        <SocialIconBox icon={FaYoutube} bgcolor="bg-[#FF0000]" href="https://youtube.com" />
                    </div>
                </div>
                <div className="space-y-2">
                    <p>Developed By</p>
                    <p className="font-semibold">Animegh IT Care</p>
                </div>
            </div>
        </div>
    )
}