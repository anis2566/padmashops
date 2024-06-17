"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Banner } from "@prisma/client"
import { Trash2 } from "lucide-react"
import Image from "next/image"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Skeleton } from "@/components/ui/skeleton"
import { useBanner } from "@/hooks/use-banner"

interface BannerListProps {
    banners: Banner[]
}

export const BannerList = ({ banners }: BannerListProps) => {
    const { onOpen } = useBanner()
    
    return (
        <div className="grid md:grid-cols-2 gap-6">
            {
                banners.map(banner => (
                    <div key={banner.id} className="space-y-3 shadow-md shadow-primary p-2 rounded-md">
                        <div className="relative aspect-video max-h-[300px] mt-2">
                            <Image
                                alt="Banner"
                                fill
                                className="object-cover rounded-md"
                                src={banner.imageUrl}
                            />
                        </div>
                        <div className="flex justify-between items-center gap-x-3">
                            <Badge
                                className={cn(
                                    "text-white bg-amber-500 capitalize",
                                    banner.status === "active" && "bg-green-500"
                                )}
                            >
                                {banner.status}
                            </Badge>
                            <TooltipProvider>
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild>
                                        <Button className="" variant="ghost" size="icon" onClick={() => onOpen(banner.id)}>
                                            <Trash2 className="text-rose-500" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                    <p>Delete banner</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}


export function SkeletonBanner() {
    return (
        <div className="grid md:grid-cols-2 gap-6">
            {
                Array.from({length: 4}, (_, index) => (
                    <div className="space-y-3 shadow-md shadow-primary p-2 rounded-md" key={index}>
                        <div className="relative aspect-video max-h-[300px] mt-2">
                            <Skeleton className="object-contain w-full h-full" />
                        </div>
                        <div className="flex justify-between items-center gap-x-3">
                            <Skeleton className="w-[80px] h-10" />
                            <Skeleton className="w-[60px] h-10" />
                        </div>
                    </div>
                ))
            }
        </div>
    );
}