"use client"

import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { ShippingInfo, Order, OrderProduct, Product, User } from '@prisma/client';
import { Page, Text, View, Document, PDFDownloadLink } from '@react-pdf/renderer';

import { Button } from '@/components/ui/button';

interface OrderWithProducts extends OrderProduct {
    product: Product
}

interface OrderWithAddressAndUser extends Order {
    user: User;
    shippingInfo: ShippingInfo | null;
    products: OrderWithProducts[]
}

interface Props {
    order: OrderWithAddressAndUser
}

// Create the PDF document component
export const InvoicePDF = ({ order }: Props) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);


    if (!isClient) {
        return null;
    }

    const Pdf = () => (
        <Document>
            <Page size="A4" style={{ padding: "50px" }}>
                <View
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <View
                        style={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "row",
                            fontSize: "16px",
                            fontWeight: "bold"
                        }}
                    >
                        <Text>E-</Text>
                        <Text style={{ color: "green" }}>Shop</Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                        <Text style={{ fontSize: "12px", color: "#6b7280" }}>Invoice #{order.invoiceId}</Text>
                        <Text style={{ fontSize: "12px", color: "#6b7280" }}>{format(order.createdAt, "dd MMMM yyyy")}</Text>
                    </View>
                </View>

                <View style={{ width: "97%", height: "1px", backgroundColor: "#e5e7eb", display: "flex", margin: "20px auto", }} />

                <View
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <View style={{ display: "flex", flexDirection: "column" }}>
                        <Text style={{ fontWeight: "bold", fontSize: "16px" }}>{order.shippingInfo?.name}</Text>
                        <Text style={{ fontSize: "12px", color: "#6b7280" }}>{order.shippingInfo?.address}</Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                        <Text style={{ fontWeight: "bold", fontSize: "16px" }}>Order Summary</Text>
                        <Text style={{ fontSize: "12px", color: "#6b7280" }}>Order placed on {format(order.createdAt, "dd MMMM yyyy")}</Text>
                    </View>
                </View>

                <View style={{ width: "97%", height: "1px", backgroundColor: "#e5e7eb", display: "flex", margin: "20px auto", }} />

                <View>
                    <View
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            alignItems: 'center',
                            padding: "10px 0",
                            borderBottom: "1px solid #e5e7eb"
                        }}
                    >
                        <Text style={{ fontWeight: "semibold", fontSize: "12px", width: "40%" }}>Item</Text>
                        <Text style={{ fontWeight: "semibold", fontSize: "12px", width: "20%" }}>Qty</Text>
                        <Text style={{ fontWeight: "semibold", fontSize: "12px", width: "20%" }}>Price</Text>
                        <Text style={{ fontWeight: "semibold", fontSize: "12px", width: "20%" }}>Total</Text>
                    </View>
                </View>

                {
                    order.products.map((item) => (
                        <View key={item.id}>
                            <View
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    alignItems: 'center',
                                    padding: "10px 0",
                                    borderBottom: "1px solid #e5e7eb"
                                }}
                            >
                                <Text style={{ fontWeight: "semibold", fontSize: "12px", width: "40%" }}>{item.product.name.slice(0, 30)}</Text>
                                <Text style={{ fontWeight: "semibold", fontSize: "12px", width: "20%" }}>{item.quantity}</Text>
                                <Text style={{ fontWeight: "semibold", fontSize: "12px", width: "20%" }}>{item.price}</Text>
                                <Text style={{ fontWeight: "semibold", fontSize: "12px", width: "20%" }}>{item.quantity * item.price}</Text>
                            </View>
                        </View>
                    ))
                }

                <View
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0 20px",
                        marginTop: "40px"
                    }}
                >
                    <Text style={{ color: "#6b7280", fontSize: "12px" }}>Thanks for your purchased</Text>
                    <View style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                        <Text style={{ fontSize: "14px", fontWeight: "bold" }}>Total:</Text>
                        <Text style={{ fontSize: "14px", fontWeight: "bold" }}>BDT {order.total + order.deliveryFee}</Text>
                    </View>
                </View>

            </Page>
        </Document>
    )

    return (
        <Button variant="outline" size="sm" asChild>
            <PDFDownloadLink document={<Pdf />}>
                Download Invoice
            </PDFDownloadLink>
        </Button>
    )

}