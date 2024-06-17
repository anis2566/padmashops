"use client"

import { EllipsisVertical, Eye } from "lucide-react"
import { Message } from "@prisma/client"
import {
    Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useMessage } from "@/hooks/use-message"
import { Empty } from "@/components/empty"
import { CopyButton } from "./copy-button"

interface MessageListProps {
    messages: Message[]
}

export const MessageList = ({ messages }: MessageListProps) => {
    
    const {onOpen} = useMessage()

    return (
        <>
            {
                messages.length < 1 ? (
                    <Empty title="No Message Found" />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="px-1">Name</TableHead>
                            <TableHead className="px-1">Email</TableHead>
                            <TableHead className="px-1">Message</TableHead>
                            <TableHead className="px-1">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                messages.map(message => (
                                <TableRow key={message.id}>
                                    <TableCell className="px-1 py-2">{message.name}</TableCell>
                                    <TableCell className="px-1 py-2">{message.email}</TableCell>
                                    <TableCell className="px-1 py-2">{message.message.slice(0, 30)}...</TableCell>
                                    <TableCell className="px-1 py-2">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <EllipsisVertical className="h-4 w-4" />
                                            </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem className="flex items-center gap-x-2" onClick={() => onOpen(message)}>
                                                        <Eye className="w-4 h-4" />
                                                        View
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <CopyButton text={message.email} />
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                )
            }
        </>
    )
}