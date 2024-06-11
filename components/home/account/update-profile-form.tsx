"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserSchema } from "@/schema/user.schema"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Trash2 } from "lucide-react"
import { UploadDropzone } from "@/lib/uploadthing"
import { toast } from "sonner"
import { User } from "@prisma/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { UPDATE_USER } from "@/actions/user.action"

interface Props {
    user: User
}

export const UpdateProfileform = ({user}:Props) => {

    const queryClient = useQueryClient()

    const form = useForm<z.infer<typeof UserSchema>>({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            name: user.name || "",
            email: user.email || "",
            imageUrl: user.imageUrl || ""
        },
    })

    const {mutate: updateUser, isPending} = useMutation({
        mutationFn: UPDATE_USER,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["get-user-profile"]
            })
            queryClient.refetchQueries({
                queryKey: ["get-user-profile"]
            })
            toast.success(data.success, {
                id: "update-user"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "update-user"
            });
        }
    })

    function onSubmit(values: z.infer<typeof UserSchema>) {
        toast.loading("Profile updating...", {
            id: "update-user"
        })
        updateUser(values)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Update Profile</CardTitle>
                <CardDescription>Customize your profile information</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending} />
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
                                        <Input {...field} disabled={isPending} />
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
                                    <FormControl>
                                        {
                                            form.getValues("imageUrl") ? (
                                                <div className="relative mt-2">
                                                    <Image
                                                        alt="Upload"
                                                        width={120}
                                                        height={120}
                                                        className="object-contain rounded-md"
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
                        <Button type="submit" disabled={isPending}>Update</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}