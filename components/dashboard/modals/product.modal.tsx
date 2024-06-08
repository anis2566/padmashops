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
                id: "delete-brand"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "delete-brand"
            });
        }
    })

    const handleDelete = () => {
        toast.loading("Brand deleting...", {
            id: "delete-brand"
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