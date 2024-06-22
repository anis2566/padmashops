import { format } from "date-fns"
import { Withdraw } from "@prisma/client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

import { cn } from "@/lib/utils"

interface Props {
    withdraws: Withdraw[];
}

export const WithdrawList = ({withdraws}:Props) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="">Date</TableHead>
                <TableHead className="">Amount</TableHead>
                <TableHead className="">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    withdraws.map(withdraw => (
                    <TableRow key={withdraw.id}>
                        <TableCell className="py-2">{format(withdraw.createdAt, "dd MMMM yyyy")}</TableCell>
                        <TableCell className="py-2">&#2547;{withdraw.amount}</TableCell>
                            <TableCell className="py-2">
                                <Badge
                                    className={cn("capitalize text-white",
                                        withdraw.status === "pending" && "bg-amber-500",
                                        withdraw.status === "approved" && "bg-green-500",
                                        withdraw.status === "rejected" && "bg-rose-500",
                                    )}
                                >
                                    {withdraw.status}
                                </Badge>
                        </TableCell>
                    </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}