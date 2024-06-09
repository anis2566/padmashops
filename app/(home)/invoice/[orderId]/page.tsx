import { format } from "date-fns";
import { redirect } from "next/navigation";
import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { Logo } from "@/components/logo";
import { db } from "@/lib/db";
import { InvoicePDF } from "@/components/home/invoice";

interface Props {
    params: {
        orderId: string
    }
}

const Invoice = async ({ params }: Props) => {
    const order = await db.order.findUnique({
        where: {
            id: params.orderId
        },
        include: {
            user: true,
            shippingInfo: true,
            products: {
                include: {
                    product: true
                }
            }
        }
    })

    if (!order) redirect("/")

    return (
        <div className="w-full max-w-screen-xl mx-auto bg-white p-4 my-6 space-y-6">
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg overflow-hidden mb-10">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                    <Logo callbackUrl="/" />
                    <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div>Invoice {order.invoiceId}</div>
                        <div>{format(order.createdAt, "dd MMMM yyyy")}</div>
                    </div>
                </div>
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="font-semibold text-lg">{order.address?.recepient}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {order.address?.address}
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
                                <TableHead>Price</TableHead>
                                <TableHead>Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                order.products.map(item => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.product.name.slice(0, 30)}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{item.price * item.quantity}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                    <div className="hidden sm:flex text-sm text-gray-500 dark:text-gray-400">Thank you for your business!</div>
                    <div className="flex items-center gap-4">
                        <div className="font-semibold text-lg">Total: BDT {order.total + order.deliveryFee}</div>
                        <InvoicePDF order={order} />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center gap-x-4">
                <Button asChild variant="outline">
                    <Link href="/">Go Home</Link>
                </Button>
                <Button asChild>
                    <Link href="/account/orders">See Orders</Link>
                </Button>
            </div>
        </div>
    )
}

export default Invoice;