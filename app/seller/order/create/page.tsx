"use client"

import { Product as PrismaProduct, Stock } from "@prisma/client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"
import { PlusCircle, Trash2 } from "lucide-react"
import { useMutation, useQuery } from "@tanstack/react-query"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Collapsible,
    CollapsibleContent,
} from "@/components/ui/collapsible"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { cn } from "@/lib/utils"
import { SellerOrderSchema } from "@/schema/seller-order.schema"
import { GET_PRODUCTS_FOR_SELLER } from "@/actions/product.action"
import { useDebounce } from "@/hooks/use-debounce"
import { CREATE_SELLER_ORDER } from "@/actions/seller-order.action"

interface Product extends PrismaProduct {
    stocks?: Stock[]
}


const CreateOrder = () => {
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    // const [products, setProducts] = useState<Product[]>([])
    const [search, setSearch] = useState<string>("")
    const [open, setOpen] = useState<boolean>(false)

    const router = useRouter()
    const debounceValue = useDebounce(search, 2000)

    const { data: products } = useQuery({
        queryKey: ["get-products-for-seller", debounceValue],
        queryFn: async () => {
            const data = await GET_PRODUCTS_FOR_SELLER(debounceValue)
            return data.products
        },
        enabled: open
    })

    // useEffect(() => {
    //   const fetchProduct = async () => {
    //       const res = await GET_PRODUCTS_FOR_SELLER(debounceValue)
    //       setProducts(res.products)
    //   }
    //   fetchProduct()
    // }, [debounceValue])

    const form = useForm<z.infer<typeof SellerOrderSchema>>({
        resolver: zodResolver(SellerOrderSchema),
        defaultValues: {
            products: [{
                productId: "",
                quantity: 1,
                price: undefined,
                color: '',
                size: ""
            }],
            customerName: "",
            address: "",
            mobile: "",
            deliveryFee: 120
        },
    })
    const { watch } = form
    watch("deliveryFee")
    watch("products")

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "products"
    });

    const { mutate: createOrder, isPending } = useMutation({
        mutationFn: CREATE_SELLER_ORDER,
        onSuccess: (data) => {
            router.push("/seller/order/list")
            toast.success(data?.success, {
                id: "create-order",
                duration: 2000
            })
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "create-order",
                duration: 2000
            })
        },
    })

    const onSubmit = (values: z.infer<typeof SellerOrderSchema>) => {
        toast.loading("Order placing...", { id: "create-order" });
        createOrder(values);
    };

    return (
        <div className="w-full space-y-8">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/order/list">Orders</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Create</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8 ">
                        {fields.map((field, index) => (
                            <Card key={field.id}>
                                <CardHeader>
                                    <CardTitle>Product</CardTitle>
                                    <CardDescription>Fill product details</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name={`products.${index}.productId`}
                                        render={({ field, fieldState }) => (
                                            <FormItem className="space-y-0">
                                                <FormLabel>Product</FormLabel>
                                                <Select
                                                    value={field.value}
                                                    onValueChange={(value) => {
                                                        const newProduct = products && products.find(p => p.id === value);
                                                        if (newProduct) {
                                                            const updatedSelectedProducts = [...selectedProducts];
                                                            updatedSelectedProducts[index] = newProduct;
                                                            setSelectedProducts(updatedSelectedProducts);
                                                            field.onChange(value);
                                                        }
                                                    }}
                                                    defaultValue={field.value}
                                                    disabled={isPending}
                                                    onOpenChange={(open) => setOpen(open)}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a product" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="space-y-2">
                                                        <Input
                                                            placeholder="Search product"
                                                            type="search"
                                                            onChange={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                setSearch(e.target.value);
                                                            }}
                                                            className="mb-2"
                                                        />
                                                        {products && products.map((product) => (
                                                            <SelectItem value={product.id} key={product.id}>
                                                                <div className="flex items-center gap-x-2">
                                                                    <Avatar>
                                                                        <AvatarImage src={product.featureImageUrl} className="w-9 h-9" />
                                                                        <AvatarFallback>{product.name}</AvatarFallback>
                                                                    </Avatar>
                                                                    {product.name}
                                                                </div>
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {fieldState.error && (
                                                    <FormMessage>{fieldState.error.message}</FormMessage>
                                                )}
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name={`products.${index}.quantity`}
                                        render={({ field, fieldState }) => (
                                            <FormItem className="space-y-0">
                                                <FormLabel>Quantity</FormLabel>
                                                <Input {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} type="number" disabled={isPending} />
                                                {fieldState.error && (
                                                    <FormMessage>{fieldState.error.message}</FormMessage>
                                                )}
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`products.${index}.price`}
                                        render={({ field, fieldState }) => (
                                            <FormItem className="space-y-0">
                                                <FormLabel>Price</FormLabel>
                                                <Input {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} type="number" disabled={isPending} />
                                                <FormDescription>price upto &#2547;{selectedProducts[index]?.sellerPrice}</FormDescription>
                                                {fieldState.error && (
                                                    <FormMessage>{fieldState.error.message}</FormMessage>
                                                )}
                                            </FormItem>
                                        )}
                                    />
                                    <Collapsible open={!!selectedProducts[index]?.stocks?.length}>
                                        <CollapsibleContent>
                                            <FormField
                                                control={form.control}
                                                name={`products.${index}.size`}
                                                render={({ field }) => (
                                                    <FormItem className="space-y-0">
                                                        <FormLabel>Size</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select a size" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {
                                                                    selectedProducts[index]?.stocks?.map((stock) => (
                                                                        <SelectItem className="uppercase" value={stock.size || ""} key={stock.id}>{stock.size}</SelectItem>
                                                                    ))
                                                                }
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </CollapsibleContent>
                                    </Collapsible>
                                    <Collapsible open={selectedProducts[index]?.colors?.some(color => color.trim() !== '')}>
                                        <CollapsibleContent>
                                            <FormField
                                                control={form.control}
                                                name={`products.${index}.color`}
                                                render={({ field }) => (
                                                    <FormItem className="space-y-0">
                                                        <FormLabel>Color</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select a color" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {
                                                                    selectedProducts[index]?.colors?.filter(color => color).map((color, i) => (
                                                                        <SelectItem className="capitalize" value={color} key={i}>{color}</SelectItem>
                                                                    ))
                                                                }
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </CollapsibleContent>
                                    </Collapsible>
                                    <div className={cn("flex justify-end", index === 0 && "hidden")}>
                                        <Button type="button" onClick={() => remove(index)} size="icon" variant="ghost" disabled={isPending}>
                                            <Trash2 className="text-rose-500" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        <div className="flex justify-end">
                            <Button
                                type="button"
                                className="flex items-center gap-x-1"
                                onClick={() => append({
                                    productId: "",
                                    quantity: 1,
                                    price: 0,
                                })}
                                disabled={isPending}
                            >
                                <PlusCircle className="w-5 h-5" /> Add more
                            </Button>
                        </div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Shipping</CardTitle>
                                <CardDescription>Fill shipping address</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="customerName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Customer Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter customer name..." {...field} type="text" disabled={isPending} />
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
                                    name="mobile"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mobile No</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter mobile no..." {...field} type="text" disabled={isPending} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>
                    <div className="space-y-6">
                        <Card className="flex flex-col">
                            <CardHeader className="pb-4">
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between gap-2 border-t">
                                        <div>Items {form.getValues("products").reduce((acc, cur) => acc + cur.quantity, 0)}</div>
                                        <div className="font-semibold">&#2547;{form.getValues("products").reduce((acc, curr) => acc + (curr.quantity * curr.price), 0) || "-"}</div>
                                    </div>
                                    <div className="border-t pt-1">
                                        <div className="flex items-center space-x-2 my-2">
                                            <FormField
                                                control={form.control}
                                                name="deliveryFee"
                                                render={({ field }) => (
                                                    <FormItem className="w-full">
                                                        <Select value={field.value.toString()} onValueChange={(value) => field.onChange(parseInt(value))} disabled={isPending}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select delivery zone" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent className="w-full">
                                                                {
                                                                    [{ label: "Inside Dhaka", value: 60 }, { label: "Outside Dhaka", value: 120 }, { label: "Dhaka Sub Area", value: 100 }].map((value, i) => (
                                                                        <SelectItem value={value.value.toString()} key={i}>{value.label}</SelectItem>
                                                                    ))
                                                                }
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between gap-2">
                                            <div>Delivery Charge</div>
                                            <div className="font-semibold">&#2547;{form.getValues("deliveryFee")}</div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between p-4">
                                <div className="flex flex-col gap-1 text-sm">
                                    <div className="flex items-center gap-2">
                                        Total
                                        <span className="text-base font-semibold">&#2547;{form.getValues("products").reduce((acc, curr) => acc + (curr.quantity * curr.price), 0) + form.getValues("deliveryFee") || "-"}</span>
                                    </div>
                                </div>
                                <Button type="submit" className="w-full max-w-[200px]" disabled={isPending}>
                                    Submit
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default CreateOrder