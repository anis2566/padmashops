"use client"

import { CirclePlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useAssignFeatureProduct } from "@/hooks/use-feature-product"

export const AssignButton = () => {
    const { onOpen } = useAssignFeatureProduct()

    return (
        <Button size="sm" className="flex items-center gap-x-2" onClick={onOpen}>
            <CirclePlus className="w-5 h-5" />
            Assign
        </Button>
    )
}