"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { UploadDropzone } from "@/lib/uploadthing"
import Image from "next/image"
import {CalendarDays, Trash} from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import {Coupon} from "@prisma/client"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger,SelectValue } from "@/components/ui/select"

import { cn } from "@/lib/utils"
import { CouponSchema } from "@/schema/coupon.schema"
import { Edit_COUPON } from "@/actions/coupon.action"

interface EditCouponProps {
    coupon: Coupon
}

export const EditCouponForm = ({coupon}:EditCouponProps) => {

    const form = useForm<z.infer<typeof CouponSchema>>({
      resolver: zodResolver(CouponSchema),
      defaultValues: {
        name: coupon.name || "",
        code: coupon.code || "",
        imageUrl: coupon.imageUrl || "",
        value: coupon.value || undefined,
        startDate: coupon.startDate || new Date(),
        expiryDate: coupon.expiryDate || new Date(),
        status: coupon.status || "INACTIVE"
      },
    })

    const {mutate: updateCoupon, isPending} = useMutation({
        mutationFn: Edit_COUPON,
        onSuccess: (data) => {
            toast.success(data.success, {
                id: "update-coupon"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "update-coupon"
            });
        }
    })

    const onSubmit = (values: z.infer<typeof CouponSchema>) => {
        toast.loading("Coupon updating...", {
            id: "update-coupon"
        })
        updateCoupon({values, couponId: coupon.id})
    }

    return (
        <div className="w-full space-y-8">
            <Form {...form}>
              <form className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                        <CardTitle>Identity</CardTitle>
                        <CardDescription>Give the coupon name and code</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter coupon name" {...field} disabled={isPending} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Code</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Enter coupon code" {...field} disabled={isPending} />
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
                                                    src={form.getValues("imageUrl") || ""}
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

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Discount</CardTitle>
                            <CardDescription>Provide coupon value</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="value"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Value</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter value" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} type="number" disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Time</CardTitle>
                            <CardDescription>Provide coupon start and end date</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                    <FormLabel>Start date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                            >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarDays className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date() || date < new Date("1900-01-01") || isPending
                                            }
                                            initialFocus
                                        />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="expiryDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                    <FormLabel>Expire date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                            >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarDays className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < form.getValues("startDate") || isPending
                                            }
                                            initialFocus
                                        />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Status</CardTitle>
                            <CardDescription>Provide coupon status</CardDescription>
                            <CardContent className="p-0">
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
                                                    {
                                                        ["INACTIVE", "ACTIVE"].map((item, index) => (
                                                            <SelectItem value={item} key={index}>{item}</SelectItem>
                                                        ))
                                                    }
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </CardHeader>
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