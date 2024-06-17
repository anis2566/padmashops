import { Subscriber } from "@prisma/client"

import {
    Table,
    TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { CopyButton } from "./copy-button"
import { Empty } from "@/components/empty"


interface SubscriberListProps {
    subscribers: Subscriber[]
}

export const SubscriberList = ({ subscribers }: SubscriberListProps) => {
    
    return (
        <>
            {
                subscribers.length < 1 ? (
                    <Empty title="No Subscriber Found" />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="px-2">#SL</TableHead>
                            <TableHead className="px-2">Email</TableHead>
                            <TableHead className="px-2">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                subscribers.map((subscriber, i) => (
                                <TableRow key={subscriber.id}>
                                    <TableCell className="px-1 py-2">{i+1}</TableCell>
                                    <TableCell className="px-1 py-2">{subscriber.email}</TableCell>
                                    <TableCell className="px-1 py-2">
                                        <CopyButton text={subscriber.email} />
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