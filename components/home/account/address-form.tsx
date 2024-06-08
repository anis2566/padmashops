"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import { AddressSchema, AddressSchemaType } from "@/schema/address.schema"
import { CREATE_ADDRESS } from "@/actions/address.action"

type Division = {
    name: string;
    id: string;
}

export const AddressForm = () => {
    const [divisions, setDivisions] = useState<Division[]>([])

    const queryClient = useQueryClient()

    useEffect(() => {
        const fetchDivision = async () => {
            const res = await fetch("https://bdapi.vercel.app/api/v.1/division")
            if (!res.ok) {
                throw new Error('Network response was not ok')
            }
            const data = await res.json()
            setDivisions(data?.data)
        }
        fetchDivision()
    }, [])

    const { mutate: createAddress, isPending } = useMutation({
        mutationFn: CREATE_ADDRESS,
        onError: (error) => {
            toast.error(error.message, {
                id: "create-address"
            })
        },
        onSuccess: (data) => {
            form.reset()
            queryClient.invalidateQueries({
                queryKey: ["user-address"]
            })
            queryClient.refetchQueries({
                queryKey: ["user-address"]
            })
            toast.success(data.success, {
                id: "create-address"
            })
        }
    })

    const form = useForm<AddressSchemaType>({
        resolver: zodResolver(AddressSchema),
        defaultValues: {
            title: "",
            name: "",
            address: "",
            division: "",
            phone: "",
        },
    })

    function onSubmit(values: AddressSchemaType) {
        toast.loading("Address saving...", {
            id: "create-address"
        })
        createAddress(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>New Address</CardTitle>
                        <CardDescription>Save new address for quick order.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter address title" {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Recipient Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter recipient name" {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="division"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Division</FormLabel>
                                    <Select value={field.value} onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a division" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {divisions?.map((division, i) => (
                                                <SelectItem value={division.name} key={i}>{division.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
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
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="space-y-0">
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter phone number" {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" disabled={isPending}>Save</Button>
                    </CardContent>
                </Card>
            </form>
        </Form>
    )
}