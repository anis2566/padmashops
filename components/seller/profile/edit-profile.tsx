"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { Seller } from "@prisma/client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { SellerSchema } from "@/schema/seller.schema";
import { UPDATE_SELLER } from "@/actions/seller.action";

interface Props {
    seller: Seller
}

export const EditProfileForm = ({ seller }: Props) => {

    const form = useForm<z.infer<typeof SellerSchema>>({
        resolver: zodResolver(SellerSchema),
        defaultValues: {
            name: seller.name || "",
            email: seller.email || "",
            imageUrl: seller.imageUrl || "",
            phone: seller.phone || "",
            address: seller.address || "",
        },
    })

    const {mutate: updateSellerInfo, isPending} = useMutation({
        mutationFn: UPDATE_SELLER,
        onSuccess: (data) => {
            toast.success(data.success, {
                id: "update-info"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "update-info"
            });
        }
    })

    function onSubmit(values: z.infer<typeof SellerSchema>) {
        toast.loading("Information updating...", {
            id: "update-info"
        })
        updateSellerInfo({values, id: seller.id})
    }

    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>Customize your profile information</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your name" {...field} type="text" disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your email" {...field} type="text" disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your phone" {...field} type="text" disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter full address"
                                            className="resize-none"
                                            {...field}
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isPending}>Update</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}