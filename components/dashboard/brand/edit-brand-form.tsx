"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { UploadDropzone } from "@/lib/uploadthing"
import Image from "next/image"
import {Trash} from "lucide-react"
import { Brand } from "@prisma/client"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { BrandSchema } from "@/schema/brand.schema"
import { EDIT_BRAND } from "@/actions/brand.action"

interface EditBrandProps {
    brand: Brand
}

export const EditBrandForm = ({ brand }: EditBrandProps) => {

    const form = useForm<z.infer<typeof BrandSchema>>({
      resolver: zodResolver(BrandSchema),
      defaultValues: {
        name: brand.name || "",
        imageUrl: brand.imageUrl || "",
      },
    })

    const {mutate: updateBrand, isPending} = useMutation({
        mutationFn: EDIT_BRAND,
        onSuccess: (data) => {
            toast.success(data.success, {
                id: "update-brand"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "update-brand"
            });
        }
    })

    const onSubmit = (values: z.infer<typeof BrandSchema>) => {
        toast.loading("Brand updating...", {
            id: "update-brand"
        })
        updateBrand({brandId: brand.id, values})
    }

    return (
        <Form {...form}>
            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Identity</CardTitle>
                        <CardDescription>Give the brand name</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter brand name" {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Media </CardTitle>
                        <CardDescription>Provide coupon image</CardDescription>
                    </CardHeader>
                    <CardContent className="px-0">
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
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
                                                <UploadDropzone
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
                    </CardContent>
                </Card>

                <Button type="submit" disabled={isPending}>
                    Submit
                </Button>
            </form>
        </Form>
    )
}