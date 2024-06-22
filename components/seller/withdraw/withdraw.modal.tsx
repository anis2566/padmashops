"use client"

import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { useWithdraw } from "@/hooks/use-withdraw"
import { WithdrawSchema } from "@/schema/withdraw.schema"
import { CREATE_WITHDRAW } from "@/actions/withdraw.action"

export const WithdrawModal = () => {

    const {open, onClose} = useWithdraw()

    const form = useForm<z.infer<typeof WithdrawSchema>>({
        resolver: zodResolver(WithdrawSchema),
        defaultValues: {
            amount: undefined,
            method: "",
            number: ""
        },
    })

    const {mutate: createWithdraw, isPending} = useMutation({
        mutationFn: CREATE_WITHDRAW,
        onSuccess: (data) => {
            onClose()
            toast.success(data?.success, {
                id: "create-withdraw"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "create-withdraw"
            });
        }
    })

    function onSubmit(values: z.infer<typeof WithdrawSchema>) {
        toast.loading("Withdraw requesting...", {
            id: "create-withdraw"
        })
        createWithdraw(values)
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Withdraw Request</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Number</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Enter number" {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="method"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Method</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select method" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                ["bkash", "nogad", "rocket"].map((v, i) => (
                                                    <SelectItem value={v} key={i} className="capitalize">{v}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Enter amount" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isPending}>Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}