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

import { useBrand } from "@/hooks/use-brand"
import { DELETE_BRAND } from "@/actions/brand.action"


export const DeleteBrandModal = () => {
    const { open, brandId, onClose } = useBrand()

    const { mutate: deleteBrand, isPending } = useMutation({
        mutationFn: DELETE_BRAND,
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
        deleteBrand(brandId)
    }
    
    return (
        <AlertDialog open={open && !!brandId}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your brand
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