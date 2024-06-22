"use client"

import { Withdraw } from "@prisma/client"
import { Edit } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { cn } from "@/lib/utils"
import { useWithdrawStatus } from "@/hooks/use-withdraw"
import { Empty } from "@/components/empty"

interface WithdrawWithSeller extends Withdraw {
    seller: {
        name: string;
        imageUrl: string;
    }
}

interface Props {
    withdraws: WithdrawWithSeller[];
}

export const WithdrawList = ({ withdraws }: Props) => {

    const {onOpen} = useWithdrawStatus()
    
    return (
        <>
            {
                withdraws.length < 1 ? (
                    <Empty title="No Withdraw Found" />
                ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Image</TableHead>
                            <TableHead className="">Name</TableHead>
                            <TableHead className="">Amount</TableHead>
                            <TableHead className="">Method</TableHead>
                            <TableHead className="">Number</TableHead>
                            <TableHead className="">Status</TableHead>
                            <TableHead className="">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            withdraws.map(withdraw => (
                                <TableRow key={withdraw.id}>
                                    <TableCell className="py-2">
                                        <Avatar className="w-9 h-9">
                                            <AvatarImage src={withdraw.seller.imageUrl} />
                                            <AvatarFallback>{withdraw.seller.name}</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className="py-2">{withdraw.seller.name}</TableCell>
                                    <TableCell className="py-2">&#2547;{withdraw.amount}</TableCell>
                                    <TableCell className="py-2 capitalize">{withdraw.method}</TableCell>
                                    <TableCell className="py-2">{withdraw.number}</TableCell>
                                    <TableCell className="py-2">
                                        <Badge
                                            className={cn("text-white capitalize",
                                                withdraw.status === "pending" && "bg-amber-500",
                                                withdraw.status === "approved" && "bg-green-500",
                                                withdraw.status === "rejected" && "bg-rose-500",
                                            )}
                                        >{withdraw.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="py-2">
                                        <TooltipProvider delayDuration={0}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="ghost" size="icon" onClick={() => onOpen(withdraw.id)}>
                                                        <Edit className="h-5 w-5" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Change Status</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>)
            }
        </>
    )
}