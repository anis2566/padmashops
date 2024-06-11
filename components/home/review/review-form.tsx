"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ReviewSchema } from "@/schema/review.schema"
import { Rating } from '@smastrom/react-rating'
import { Button } from "@/components/ui/button"
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs"
import '@smastrom/react-rating/style.css'
import { Textarea } from "@/components/ui/textarea"
import { useMutation } from "@tanstack/react-query"
import { CREATE_REVIEW } from "@/actions/review.action"
import { toast } from "sonner"

interface ReviewProps {
    productId: string;
}

export const ReviewForm = ({productId}:ReviewProps) => {
    const form = useForm<z.infer<typeof ReviewSchema>>({
        resolver: zodResolver(ReviewSchema),
        defaultValues: {
            productId: productId || "",
            rating: 0,
            comment: ""
        },
    })

    const {mutate: createReview, isPending} = useMutation({
        mutationFn: CREATE_REVIEW,
        onSuccess: (data) => {
            form.reset()
            toast.success(data.success, {
                id: "create-review"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "create-review"
            });
        }
    })

    function onSubmit(values: z.infer<typeof ReviewSchema>) {
        toast.loading("Review submitting...", {
            id: "create-review"
        })
        createReview(values)
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rating</FormLabel>
                            <FormControl>
                                <Rating isDisabled={isPending} style={{ maxWidth: 140 }} value={field.value} onChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Review</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Leave your thought...."
                                    className="resize-none"
                                    {...field}
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <SignedIn>
                    <Button disabled={isPending} type="submit">Submit</Button>
                </SignedIn>
                <SignedOut>
                    <SignInButton mode="modal" forceRedirectUrl={`/shop/${productId}`}>
                        <Button type="button">Login to Submit</Button>
                    </SignInButton>
                </SignedOut>
            </form>
        </Form>
    )
}