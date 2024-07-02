"use client"

import { MinusIcon, PlusIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group"

import { useQuickOrder } from "@/hooks/use-quick-order"
import { QuickOrderSchema } from "@/schema/quick-order.schema"
import { CREATE_QUICK_ORDER } from "@/actions/quick-order.action"
import { useConfettiStore } from "@/hooks/use-confetti"

export const QuickOrderModal = () => {
    const [color, setColor] = useState<string>("")
    const [size, setSize] = useState<string>("")

    const { open, productId, onClose, product } = useQuickOrder()
    const router = useRouter()
    const {onOpen:onOpenConfetti} = useConfettiStore()


    const form = useForm<z.infer<typeof QuickOrderSchema>>({
        resolver: zodResolver(QuickOrderSchema),
        defaultValues: {
            name: "",
            phone: "",
            address: "", 
            quantity: 1,
            color: "",
            size: "",
            deliveryFee: undefined,
            productId: ""
        },
    })

    useEffect(() => {
        if (productId) {
            form.setValue("productId", productId)
        }
    }, [product, form])

    form.watch("quantity")
    form.watch("color")
    form.watch("size")

    const {mutate: createOrder, isPending} = useMutation({
        mutationFn: CREATE_QUICK_ORDER,
        onSuccess: (data) => {
            onOpenConfetti()
            onClose()
            router.push(`/quick-order/success/${data?.id}`)
            form.reset()
            toast.success(data?.success, {
                id: "create-quick-order"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "create-quick-order"
            });
        }
    })


    function onSubmit(values: z.infer<typeof QuickOrderSchema>) {
        toast.loading("Order placing...", {
            id: "create-quick-order"
        })
        createOrder(values)
    }

    return (
        <Dialog open={open && !!productId && product !== null} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Order Form</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your name" {...field} disabled={isPending} />
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
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your phone number" {...field} disabled={isPending} />
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
                                    <FormLabel>Full Address</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter your address"
                                            className="resize-none"
                                            {...field} 
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid">
                            <Label>Quantity</Label>
                            <div className="flex items-center gap-2">
                                <Button size="icon" variant="outline" onClick={() => {
                                    if (form.getValues("quantity") > 1) {
                                        form.setValue("quantity", form.getValues("quantity") - 1)
                                    }
                                }} type="button" disabled={isPending}>
                                    <MinusIcon className="h-3 w-3" />
                                    <span className="sr-only">Decrease</span>
                                </Button>
                                <div className="border w-8 h-8 flex items-center justify-center dark:border-gray-800">{form.getValues("quantity")}</div>
                                <Button size="icon" variant="outline" onClick={() => {
                                    form.setValue("quantity", form.getValues("quantity") + 1)
                                }} type="button" disabled={isPending}>
                                    <PlusIcon className="h-3 w-3" />
                                    <span className="sr-only">Increase</span>
                                </Button>
                            </div>
                        </div>

                        {product && product.colors?.length > 0 ? (
                            <div className="grid">
                                <Label>Color</Label>
                                <div className="flex items-center gap-2">
                                    <RadioGroup className="flex items-center gap-2" onValueChange={(color: string) => {
                                        setColor(color)
                                        form.setValue("color", color)
                                    }} defaultValue={color || product.colors[0] || ""} id="size" disabled={isPending}>
                                        {product.colors.map((color, i) => (
                                            <Label
                                                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                                                htmlFor={color}
                                                key={i}
                                            >
                                                <RadioGroupItem id={color} value={color} />
                                                {color}
                                            </Label>
                                        ))}
                                    </RadioGroup>
                                </div>
                            </div>
                        ) : null}

                        {product && product?.stocks && product.stocks?.length > 0 ? (
                            <div className="grid">
                                <Label>Size</Label>
                                <div className="flex items-center gap-2">
                                    <RadioGroup className="flex items-center gap-2" onValueChange={(size: string) => {
                                        setSize(size)
                                        form.setValue("size", size)
                                    }} defaultValue={color || product.stocks[0].size || ""} id="size" disabled={isPending}>
                                        {product.stocks.map((stock, i) => (
                                            <Label
                                                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800 uppercase"
                                                htmlFor={stock.id}
                                                key={i}
                                            >
                                                <RadioGroupItem id={stock.id} value={stock.size || ""} />
                                                {stock.size}
                                            </Label>
                                        ))}
                                    </RadioGroup>
                                </div>
                            </div>
                        ) : null}

                        <FormField
                            control={form.control}
                            name="deliveryFee"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Delivery Fee</FormLabel>
                                    <Select onValueChange={(value) => field.onChange(parseInt(value))} disabled={isPending}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select delivery zone" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="w-full">
                                            {
                                                [{ label: "Inside Dhaka", value: 60 }, { label: "Outside Dhaka", value: 120 }, { label: "Dhaka Sub Area", value: 100 }].map((value, i) => (
                                                    <SelectItem value={value.value.toString()} key={i}>{value.label}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>&#2547;{form.getValues("deliveryFee")}</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isPending} className="w-full">Order</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}