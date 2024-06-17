"use client"

import { Button } from "@/components/ui/button"
import { useAssignPopularProduct } from "@/hooks/use-popular-product"
import { CirclePlus } from "lucide-react"

export const AssignButton = () => {
    const { onOpen } = useAssignPopularProduct()

    return (
        <Button size="sm" className="flex items-center gap-x-2" onClick={onOpen}>
            <CirclePlus className="w-5 h-5" />
            Assign
        </Button>
    )
}