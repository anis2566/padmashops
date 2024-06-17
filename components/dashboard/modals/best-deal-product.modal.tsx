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

import { REMOVE_BEST_DEAL_PRODUCT } from "@/actions/product.action"
import { useBestDealProduct } from "@/hooks/use-best-deal-product"


export const RemoveBestDealProductModal = () => {

    const { open, productId, onClose } = useBestDealProduct()

    const { mutate: deleteBrand, isPending } = useMutation({
        mutationFn: REMOVE_BEST_DEAL_PRODUCT,
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
                        This action cannot be undone. This will permanently remove the product from best deal list.
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