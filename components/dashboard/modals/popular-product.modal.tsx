"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import {
AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { REMOVE_POPULAR_PRODUCT } from "@/actions/product.action"
import { usePopularProduct } from "@/hooks/use-popular-product"


export const RemovePopularProductModal = () => {

    const { open, productId, onClose } = usePopularProduct()

    const { mutate: deleteBrand, isPending } = useMutation({
        mutationFn: REMOVE_POPULAR_PRODUCT,
        onSuccess: (data) => {
            onClose()
            toast.success(data?.success, {
                id: "remove-product"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "remove-product"
            });
        }
    })

    const handleDelete = () => {
        toast.loading("Product removing...", {
            id: "remove-product"
        })
        deleteBrand(productId)
    }
    
    return (
        <AlertDialog open={open && !!productId}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently remove the product from popular list.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose} disabled={isPending}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={isPending}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}