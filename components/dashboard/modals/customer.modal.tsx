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

import { useCustomer } from "@/hooks/use-customer"
import { DELETE_USER } from "@/actions/user.action"

export const DeleteCustomerModal = () => {
    const { open, customerId, onClose } = useCustomer()

    const { mutate: deleteCustomer, isPending } = useMutation({
        mutationFn: DELETE_USER,
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
        deleteCustomer(customerId)
    }
    
    return (
        <AlertDialog open={open && !!customerId}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your customer
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