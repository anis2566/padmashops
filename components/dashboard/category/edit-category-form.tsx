"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Trash2 } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import {Category} from "@prisma/client"
import { UploadDropzone } from "@/lib/uploadthing"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { CategorySchema } from "@/schema/category.schema"
import { EDIT_CATEGORY } from "@/actions/category.action"

interface EditCategoryProps {
    category: Category
}

export const EditCategoryForm = ({category}:EditCategoryProps) => {

    const form = useForm<z.infer<typeof CategorySchema>>({
            resolver: zodResolver(CategorySchema),
            defaultValues: {
            name: category.name || "",
            description: category.description || "",
            imageUrl: category.imageUrl || "",
            tags: category.tags || []
        },
    })

    const {mutate: updateCategory, isPending} = useMutation({
        mutationFn: EDIT_CATEGORY,
        onSuccess: (data) => {
            toast.success(data.success, {
                id: "update-category"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "update-category"
            });
        }
    }) 

    const onSubmit = async (values: z.infer<typeof CategorySchema>) => {
        toast.loading("Category updating...", {
            id: "update-category"
        })
        updateCategory({categoryId: category.id, values})
    }

    return (
        <div className="w-full space-y-8">
            <Form {...form}>
                <form className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Identity</CardTitle>
                                <CardDescription>Give the category name and description</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter category name" {...field} disabled={isPending} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Tell us a about category"
                                                    className="resize-none"
                                                    {...field}
                                                    disabled={isPending}
                                                />
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
                                <CardDescription>Provide category image</CardDescription>
                            </CardHeader>
                            <CardContent>
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
                                                                    <Trash2 className="text-rose-500" />
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
                    </div>
                    <div className="space-y-5">
                        <Card>
                            <CardHeader>
                                <CardTitle>Tags</CardTitle>
                                <CardDescription>Provide some tags</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <FormField
                                    control={form.control}
                                    name="tags"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tags</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter tags" {...field}
                                                    onChange={(e) => {
                                                    const tagsArray = e.target.value.split(",").map(tag => tag.trim());
                                                    field.onChange(tagsArray);
                                                    }}
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Use comma after each tag
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                        <Button type="submit" disabled={isPending}>
                            Submit
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}