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

import { useProduct } from "@/hooks/use-product"
import { DELETE_PRODUCT } from "@/actions/product.action"

export const DeleteProductModal = () => {
    const { open, productId, onClose } = useProduct()

    const { mutate: deleteBrand, isPending } = useMutation({
        mutationFn: DELETE_PRODUCT,
        onSuccess: (data) => {
            onClose()
            toast.success(data?.success, {
                id: "delete-product"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "delete-product"
            });
        }
    })

    const handleDelete = () => {
        toast.loading("Product deleting...", {
            id: "delete-product"
        })
        deleteBrand(productId)
    }
    
    return (
        <AlertDialog open={open && !!productId}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your product
                        and remove the data from your servers.
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