"use client"

import { Copy } from "lucide-react"
import { toast } from "sonner";

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface Props {
    text: string;
}

export const CopyButton = ({text}: Props) => {

    const handleCopy = () => {
        navigator.clipboard.writeText(text)
        toast.success("Email copied")
    }

    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => handleCopy()} className="flex items-center gap-x-2 w-full">
                        <Copy className="w-5 h-5" />
                        Copy Email
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Copy Email</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}