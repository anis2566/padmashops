"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreditCard, HandCoins, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CardTitle, CardHeader, CardContent, Card, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import { GET_USER_ADDRESS } from "@/actions/address.action";
import { calculateDeliveryFee, cn } from "@/lib/utils";
import { useCart } from "@/store/use-cart";
import { OrderSchema } from "@/schema/order.schema";
import { CREATE_ORDER } from "@/actions/order.action";
import { useConfettiStore } from "@/hooks/use-confetti";

type Division = {
  id: string;
  name: string;
};

const Checkout = () => {
  const [divisions, setDivisions] = useState<Division[]>([]);

  const { cart, resetCart } = useCart()
  const { onOpen } = useConfettiStore()
  const router = useRouter()

  const total = cart.reduce((acc, curr) => {
    return acc + (curr.price * curr.quantity)
  }, 0)

  useEffect(() => {
    const fetchDivisions = async () => {
      const res = await fetch("https://bdapi.vercel.app/api/v.1/division");
      if (res.ok) {
        const data = await res.json();
        setDivisions(data?.data || []);
      } else {
        console.error("Failed to fetch divisions:", res.status);
      }
    };
    fetchDivisions();
  }, []);

  const { data: address, isFetching } = useQuery({
    queryKey: ["saved-address"],
    queryFn: async () => {
      const res = await GET_USER_ADDRESS();
      return res.addresses;
    },
    staleTime: 60 * 60 * 1000,
  });

  const form = useForm<z.infer<typeof OrderSchema>>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      name: "",
      division: "",
      address: "",
      phone: "",
      shippingInfoId: "",
      paymentMethod: "cod",
      deliveryFee: 120,
    },
  });

  const { mutate: createOrder, isPending } = useMutation({
    mutationFn: CREATE_ORDER,
    onSuccess: (data) => {
      router.push(`/invoice/${data.order.id}`)
      onOpen()
      form.reset()
      toast.success(data.success, {
        id: "create-order"
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        id: "create-order"
      });
    }
  })

  function onSubmit(values: z.infer<typeof OrderSchema>) {
    toast.loading("Order placing...", {
      id: "create-order"
    })
    const orderProduct = cart.map(item => ({
      productId: item.product.id,
      price: item.product.discountPrice || item.product.price,
      quantity: item.quantity,
      size: item.size,
      color: item.color
    }))
    createOrder({ order: values, products: orderProduct })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-screen-xl mx-auto p-4 my-6 bg-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <div className="md:col-span-2 space-y-5">
            <Card>
              <CardHeader>
                <CardTitle>Saved Address</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="shippingInfoId"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          defaultValue={field.value}
                          className="flex items-center flex-wrap md:flex-nowrap gap-x-2"
                          onValueChange={(value) => {
                            field.onChange(value)
                            const div = address?.find(item => item.id === value)?.division
                            form.setValue("deliveryFee", calculateDeliveryFee(div || "Rangpur"))
                          }}
                          disabled={isPending}
                        >
                          {isFetching
                            ? Array.from({ length: 3 }, (_, i) => (
                              <Skeleton key={i} className="w-[150px] h-10" />
                            ))
                            : address?.map((address) => (
                              <FormItem
                                className={cn(
                                  "flex border w-full max-w-[130px] px-2 py-3 rounded-md border-gray-300 items-center space-x-3 space-y-0",
                                  field.value === address.id &&
                                  "border-primary"
                                )}
                                key={address.id}
                              >
                                <FormControl>
                                  <RadioGroupItem
                                    value={address.id}
                                    checked={field.value === address.id}
                                  />
                                </FormControl>
                                <FormLabel
                                  className={cn(
                                    "",
                                    field.value === address.id &&
                                    "text-primary"
                                  )}
                                >
                                  {address.title}
                                </FormLabel>
                              </FormItem>
                            ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.watch("shippingInfoId") !== "" && (
                  <div className="flex justify-end">
                    <Button
                      className="flex items-center gap-x-2"
                      onClick={() => form.resetField("shippingInfoId")}
                      disabled={isPending}
                    >
                      <PlusCircle className="w-5 h-5" />
                      New
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Collapsible open={form.watch("shippingInfoId") === ""}>
              <CollapsibleContent>
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Information</CardTitle>
                    <CardDescription>Fill up the shipping address carefully</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter name" {...field} disabled={isPending} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="division"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Division</FormLabel>
                          <Select
                            value={field.value}
                            defaultValue={field.value}
                            onValueChange={(value) => {
                              field.onChange(value)
                              form.setValue("deliveryFee", calculateDeliveryFee(value))
                            }}
                            disabled={isPending}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a division" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {divisions.map((division, i) => (
                                <SelectItem value={division.name} key={i}>
                                  {division.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
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
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter phone number"
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
              </CollapsibleContent>
            </Collapsible>
          </div>
          <div className="space-y-5">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <span>Total</span>
                    <span>&#2547;{total}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Shipping</span>
                    <span>&#2547;{form.watch("deliveryFee")}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Taxes</span>
                    <span>&#2547;0</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between font-medium">
                    <span>Subtotal</span>
                    <span>
                      &#2547;{total + form.watch("deliveryFee")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-x-3">
                <Card
                  className={cn(
                    "w-full max-w-[170px] cursor-pointer hover:border-primary/50",
                    form.watch("paymentMethod") === "cod" && "border-primary text-primary",
                    isPending && "pointer-events-none"
                  )}
                  onClick={() => form.setValue("paymentMethod", "cod" as string)}
                >
                  <CardContent className="p-2 flex flex-col items-center space-y-2">
                    <div className={cn("shadow-lg w-16 h-16 rounded-full flex items-center justify-center", form.watch("paymentMethod") === "cod" && "shadow-primary")}>

                      <HandCoins className="w-8 h-8" />
                    </div>
                    <p className="font-semibold text-center">
                      Cash on Delivery
                    </p>
                  </CardContent>
                </Card>
                <Card
                  className={cn(
                    "w-full max-w-[170px] cursor-pointer hover:border-primary/50",
                    form.watch("paymentMethod") === "mob" && "border-primary text-primary",
                    isPending && "pointer-events-none"
                  )}
                  onClick={() => form.setValue("paymentMethod", "mob" as string)}
                >
                  <CardContent className="p-2 flex flex-col items-center space-y-2">
                    <div className={cn("shadow-lg w-16 h-16 rounded-full flex items-center justify-center", form.watch("paymentMethod") === "mob" && "shadow-primary")}>

                      <CreditCard className="w-8 h-8" />
                    </div>
                    <p className="font-semibold text-center">
                      Mobile Banking
                    </p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            <Button type="submit" disabled={isPending}>
              Place Order
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default Checkout;