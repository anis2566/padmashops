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

import { useAddress } from "@/hooks/use-address"
import { DELETE_USER_ADDRESS } from "@/actions/address.action"


export const DeleteAddressModal = () => {
    const { open, addressId, onClose } = useAddress()

    const queryClient = useQueryClient()

    const { mutate: deleteBrand, isPending } = useMutation({
        mutationFn: DELETE_USER_ADDRESS,
        onSuccess: (data) => {
            onClose()
            queryClient.invalidateQueries({
                queryKey: ["user-address"]
            })
            queryClient.refetchQueries({
                queryKey: ["user-address"]
            })
            toast.success(data?.success, {
                id: "delete-address"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "delete-address"
            });
        }
    })

    const handleDelete = () => {
        toast.loading("Address deleting...", {
            id: "delete-address"
        })
        deleteBrand(addressId)
    }
    
    return (
        <AlertDialog open={open && !!addressId}>
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