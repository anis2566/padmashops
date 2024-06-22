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

import { useSeller } from "@/hooks/use-seller"
import { DELETE_SELLER } from "@/actions/seller.action"


export const DeleteSellerModal = () => {
    const { open, sellerId, onClose } = useSeller()

    const { mutate: deleteBrand, isPending } = useMutation({
        mutationFn: DELETE_SELLER,
        onSuccess: (data) => {
            onClose()
            toast.success(data?.success, {
                id: "delete-seller"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "delete-seller"
            });
        }
    })

    const handleDelete = () => {
        toast.loading("Seller deleting...", {
            id: "delete-seller"
        })
        deleteBrand(sellerId)
    }
    
    return (
        <AlertDialog open={open && !!sellerId}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your seller
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