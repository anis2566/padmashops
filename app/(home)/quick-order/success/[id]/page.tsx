import { redirect } from "next/navigation"
import { format } from "date-fns"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { db } from "@/lib/db"
import { Logo } from "@/components/logo"
import { InvoicePDF } from "@/components/home/invoice/invoice-quick-order";

interface Props {
    params: {
        id: string
    }
}

const Success = async ({ params: { id } }: Props) => {
    const order = await db.quickOrder.findUnique({
        where: {
            id
        },
        include: {
            product: true
        }
    })

    if (!order) redirect("/")

    return (
        <div className="w-full max-w-screen-xl mx-auto bg-white p-3 my-5 space-y-6">
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg overflow-hidden mb-10">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                    <Logo callbackUrl="/" />
                    <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div>{format(order.createdAt, "dd MMMM yyyy")}</div>
                    </div>
                </div>
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="font-semibold text-lg">{order.name}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {order.address}
                            </p>
                        </div>
                        <div className="text-right">
                            <h2 className="font-semibold text-lg">Order Summary</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Order placed on {format(order.createdAt, "dd MMMM yyyy")}</p>
                        </div>
                    </div>
                </div>
                <div className="px-6 py-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Item</TableHead>
                                <TableHead>Qty</TableHead>
                                <TableHead>Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">{order?.product?.name.slice(0, 30)}</TableCell>
                                <TableCell>{order.quantity}</TableCell>
                                <TableCell>&#2547;{order.total}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                    <div className="hidden sm:flex text-sm text-gray-500 dark:text-gray-400">Thank you for your business!</div>
                    <div className="flex items-center gap-4">
                        <div className="font-semibold text-lg">Total: &#2547;{order.total + order.deliveryFee}</div>
                        <InvoicePDF order={order} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Success 