"use client"

import { Button } from "@/components/ui/button"
import { useAssignBestDealProduct } from "@/hooks/use-best-deal-product"
import { CirclePlus } from "lucide-react"

export const AssignButton = () => {
    const { onOpen } = useAssignBestDealProduct()

    return (
        <Button size="sm" className="flex items-center gap-x-2" onClick={onOpen}>
            <CirclePlus className="w-5 h-5" />
            Assign
        </Button>
    )
}