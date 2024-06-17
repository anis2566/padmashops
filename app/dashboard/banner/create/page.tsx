"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Trash } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { UploadDropzone } from "@/lib/uploadthing"
import { BannerSchema } from "@/schema/banner.schema"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CREATE_BANNER } from "@/actions/banner.action"

export default function CreteBanner() {
    const router = useRouter()
    const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof BannerSchema>>({
      resolver: zodResolver(BannerSchema),
      defaultValues: {
          imageUrl: "",
          status: "draft"
      }
  })

  const {mutate: createBanner, isPending} = useMutation({
    mutationFn: CREATE_BANNER,
      onSuccess: (data) => {
        queryClient.invalidateQueries({
            queryKey: ["get-banners"]
        })
        queryClient.refetchQueries({
            queryKey: ["get-banners"]
        })
        router.push("/dashboard/banner")
            toast.success(data.success, {
            id: "create-banner"
        })
    },
    onError: (error) => {
      toast.error(error.message, {
        id: "create-banner"
      })
    }
  })

  function onSubmit(data: z.infer<typeof BannerSchema>) {
    toast.loading("Banner creating...", {
      id: "create-banner"
    });
    createBanner(data)
  }
    
    return (
        <div className="space-y-6">
            <Breadcrumb>
              <BreadcrumbList>
                  <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard/banner">Banner</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                  <BreadcrumbPage>Create</BreadcrumbPage>
                  </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
                    <Card>
                        <CardHeader>
                            <CardTitle>Media</CardTitle>
                            <CardDescription>Provide banner image</CardDescription>
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
                                                    <div className="relative aspect-video max-h-[300px] mt-2">
                                                        <Image
                                                            alt="Upload"
                                                            fill
                                                            className="object-cover rounded-md"
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
                    <Card>
                        <CardHeader>
                            <CardTitle>Status</CardTitle>
                            <CardDescription>Manage banner visibility.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="active">active</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                <Button type="submit" disabled={isPending}>Submit</Button>
            </form>
            </Form>
        </div>
  )
}