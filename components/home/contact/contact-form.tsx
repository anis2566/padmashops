"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSchema } from "@/schema/message.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { CREATE_MESSAGE } from "@/actions/message.action"

export const ContactForm = () => {
    const form = useForm<z.infer<typeof MessageSchema>>({
        resolver: zodResolver(MessageSchema),
        defaultValues: {
            name: "",
            email: "",
            message: ""
        },
    })

    const { mutate: sendMessage, isPending } = useMutation({
        mutationFn: CREATE_MESSAGE,
        onSuccess: (data) => {
            form.reset()
            toast.success(data?.success, {
                id: "create-message"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "create-message"
            });
        }
    })
 
    function onSubmit(values: z.infer<typeof MessageSchema>) {
        toast.loading("Message sending...", {
            id: "create-message"
        })
        sendMessage(values)
    }
    
    return (
        <Card className="w-full h-auto">
            <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>Express your opinion or complain.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Your Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your name" {...field} disabled={isPending} />
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
                                <FormLabel>Your Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your email" {...field} disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Your Message</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Tell your message"
                                        className="resize-none"
                                        {...field} 
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isPending}>Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}