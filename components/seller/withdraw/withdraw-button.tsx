"use client"

import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useWithdraw } from "@/hooks/use-withdraw"

export const WithdrawButton = () => {
    const { onOpen } = useWithdraw()
    
    return (
        <Button size="sm" className="flex items-center gap-x-2" onClick={onOpen}>
            <Send className="w-5 h-5" />
            Request
        </Button>
    )
}