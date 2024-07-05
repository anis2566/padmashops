"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Trash } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SellerSchema } from "@/schema/seller.schema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { UploadButton } from "@/lib/uploadthing"
import { CREATE_SELLER } from "@/actions/seller.action"
import { useRegistration } from "@/hooks/use-seller"
import { useConfettiStore } from "@/hooks/use-confetti"

export const SellerRegisterForm = () => {
    const router = useRouter()
    const { onOpen } = useRegistration()
    const {onOpen: onOpenConfetti} = useConfettiStore()

    const form = useForm<z.infer<typeof SellerSchema>>({
        resolver: zodResolver(SellerSchema),
        defaultValues: {
            name: "",
            email: "",
            imageUrl: "",
            phone: "",
            address: "",
        },
    })

    const { mutate: createSeller, isPending } = useMutation({
        mutationFn: CREATE_SELLER,
        onSuccess: (data) => {
            onOpenConfetti()
            router.push("/")
            form.reset()
            toast.success(data.success, {
                id: "create-seller"
            });
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.message, {
                id: "create-seller"
            });
        }
    })

    function onSubmit(values: z.infer<typeof SellerSchema>) {
        toast.loading("Registering...", {
            id: "create-seller"
        })
        createSeller(values)
    }

    return (
        <Card className="w-full max-w-6xl mx-auto">
            <CardHeader>
                <CardTitle>Registration Form</CardTitle>
                <CardDescription>Fill up the form to get register.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                        {
                                            form.getValues("imageUrl") ? (
                                                <div className="relative mt-2">
                                                    <Image
                                                    alt="Upload"
                                                    width={120}
                                                    height={120}
                                                    className="object-contain rounded-md mx-auto"
                                                    src={form.getValues("imageUrl")}
                                                    />
                                                    <Button type="button" className="absolute top-0 right-0" variant="ghost" size="icon" onClick={() => form.setValue("imageUrl", "")} disabled={isPending}>
                                                        <Trash className="text-rose-500" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <UploadButton
                                                    endpoint="imageUploader"
                                                    onClientUploadComplete={(res) => {
                                                        field.onChange(res[0].url)
                                                        toast.success("Image uploaded")
                                                    }}
                                                    onUploadError={(error: Error) => {
                                                        toast.error("Image upload failed")
                                                    }}
                                                />                                           
                                            )
                                        }
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />                                 
                        <Button type="submit" disabled={isPending} className="w-full max-w-[130px]">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
