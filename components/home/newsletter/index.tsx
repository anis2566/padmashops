"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { SubscribeSchema } from "@/schema/subscribe.schema"
import { useMutation } from "@tanstack/react-query"
import { CREATE_SUBSCRIBER } from "@/actions/subscriber.action"
import { toast } from "sonner"

export const Newsletter = () => {
    const form = useForm<z.infer<typeof SubscribeSchema>>({
        resolver: zodResolver(SubscribeSchema),
            defaultValues: {
                email: "",
        },
    })

    const {mutate: createSubscribe, isPending} = useMutation({
        mutationFn: CREATE_SUBSCRIBER,
        onSuccess: (data) => {
            form.reset()
            toast.success(data.success, {
                id: "create-subscriber"
            })
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "create-subscriber"
            })
        }
    })
 
    function onSubmit(values: z.infer<typeof SubscribeSchema>) {
        toast.loading("Subscribing...", {
            id: "create-subscriber"
        });
        createSubscribe(values.email)
    }
    return (
        <div className="bg-white p-4 bg-gradient-to-r from-indigo-400 space-y-3 py-6">
            <h1 className="text-center text-xl md:text-3xl font-bold">Get latest updates of our offer on your inbox.</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-x-2 justify-center w-full">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <Input placeholder="Enter your email" className="w-full max-w-[400px] bg-white" {...field} disabled={isPending} />
                            </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isPending}>Subscribe</Button>
                </form>
            </Form>
        </div>
    )
}