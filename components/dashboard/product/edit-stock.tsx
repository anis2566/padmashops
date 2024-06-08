"use client"

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { PlusCircle, Trash2 } from "lucide-react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { StockVariantSchema } from "@/schema/stock.schema";
import { EDIT_STOCK } from "@/actions/stock.action";
import { Stock } from "@prisma/client";

interface Props {
    productId: string;
    stocks: Stock[]
}

export const EditStockForm = ({ productId, stocks }: Props) => {Form
    
    const router = useRouter()

    const form = useForm<z.infer<typeof StockVariantSchema>>({
        resolver: zodResolver(StockVariantSchema),
        defaultValues: {
            productId: productId || "",
            stocks: stocks || [
                {
                    size: "",
                    stock: undefined,
            }
        ]
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "stocks"
    });

    const handleAddVariant = () => {
        append({
            size: "",
            stock: 0
        })
    }

    const {mutate: updateStock, isPending} = useMutation({
        mutationFn: EDIT_STOCK,
        onSuccess: (data) => {
            router.push(`/dashboard/product/edit/${productId}`)
            toast.success(data.success, {
                id: "update-stock"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "update-stock"
            });
        }
    })

    function onSubmit(values: z.infer<typeof StockVariantSchema>) {
        toast.loading("Stock updating...", {
                id: "update-stock"
        })
        updateStock(values)
    }
    
    return (
        <Card className="w-full max-w-3xl">
            <CardHeader>
                <CardTitle>Edit Stock Form</CardTitle>
                <CardDescription>Update stock for the product</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between px-2 gap-x-2">
                                <div>Size</div>
                                <div>Stock</div>
                                <div>Action</div>
                            </div>
                            <Separator />
                            <div className="space-y-2">
                                {
                                    fields.map((field, index) => (
                                        <div key={index} className="flex justify-between gap-x-2">
                                            <FormField
                                                control={form.control}
                                                name={`stocks.${index}.size`}
                                                render={({ field, fieldState }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input type="text" {...field} disabled={isPending} />
                                                        </FormControl>
                                                        {
                                                            fieldState.error && (
                                                                <FormMessage>{fieldState.error.message}</FormMessage>
                                                            )
                                                        }
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={`stocks.${index}.stock`}
                                                render={({ field, fieldState }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} disabled={isPending} />
                                                        </FormControl>
                                                        {
                                                            fieldState.error && (
                                                                <FormMessage>{fieldState.error.message}</FormMessage>
                                                            )
                                                        }
                                                    </FormItem>
                                                )}
                                            />
                                            <Button type="button" variant="ghost" size="icon" className="flex-shrink-0" onClick={() => remove(index)} disabled={fields.length === 1 || isPending}>
                                                <Trash2 className="w-5 h-5 text-rose-500" />
                                            </Button>
                                        </div>
                                    ))
                                }
                        </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <Button variant="outline" type='button' className="gap-x-2" onClick={handleAddVariant} disabled={isPending}>
                                <PlusCircle className="w-5 h-5" />
                                Add More
                            </Button>
                            <Button type='submit' disabled={isPending}>Submit</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
