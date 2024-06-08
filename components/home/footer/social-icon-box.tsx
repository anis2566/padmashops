import {IconType} from "react-icons"
import Link from "next/link"

import { cn } from "@/lib/utils";

interface Props {
    icon: IconType;
    bgcolor: string;
    href: string;
}

export const SocialIconBox = ({icon:Icon, bgcolor, href}:Props) => {
    return (
        <Link href={href} target="_blank" className={cn("w-10 h-10 bg-black rounded-full text-white flex items-center justify-center transition-all duration-200 hover:translate-y-1", bgcolor && `${bgcolor}`)}>
            <Icon className="w-5 h-5" />
        </Link>
    )
}