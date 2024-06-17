"use client"

import { useMutation } from "@tanstack/react-query"
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

import { REMOVE_FEATURE_PRODUCT, REMOVE_POPULAR_PRODUCT } from "@/actions/product.action"
import { useFeatureProduct } from "@/hooks/use-feature-product"


export const RemoveFeatureProductModal = () => {

    const { open, productId, onClose } = useFeatureProduct()

    const { mutate: removeFeatureProduct, isPending } = useMutation({
        mutationFn: REMOVE_FEATURE_PRODUCT,
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
        removeFeatureProduct(productId)
    }
    
    return (
        <AlertDialog open={open && !!productId}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently remove the product from feature list.
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