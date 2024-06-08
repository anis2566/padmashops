"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { UploadDropzone } from "@/lib/uploadthing"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { Trash } from "lucide-react"


import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Textarea } from "@/components/ui/textarea"

import { CategorySchema } from "@/schema/category.schema"
import { CREATE_CATEGORY } from "@/actions/category.action"


const CreateCategory = () => {

    const router = useRouter()

    const form = useForm<z.infer<typeof CategorySchema>>({
            resolver: zodResolver(CategorySchema),
            defaultValues: {
            name: "",
            description: "",
            imageUrl: "",
            tags: []
        },
    })

    const {mutate: createCategory, isPending} = useMutation({
        mutationFn: CREATE_CATEGORY,
        onSuccess: (data) => {
            router.push("/dashboard/category")
            form.reset()
            toast.success(data.success, {
                id: "create-category"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "create-category"
            });
        }
    })

    const onSubmit = async (values: z.infer<typeof CategorySchema>) => {
        toast.loading("Category creating...", {
            id: "create-category"
        })
        createCategory(values)
    }

    return (
        <div className="w-full space-y-8">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard/category">Category</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbPage>Create</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
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
                                                            <Button className="absolute top-0 right-0" variant="ghost" size="icon" onClick={() => form.setValue("imageUrl", "")} disabled={isPending}>
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

export default CreateCategory