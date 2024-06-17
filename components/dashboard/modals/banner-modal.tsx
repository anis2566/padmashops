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

import { DELETE_BANNER } from "@/actions/banner.action"
import { useBanner } from "@/hooks/use-banner"


export const DeleteBannerModal = () => {

    const queryClient = useQueryClient()

    const { open, bannerId, onClose } = useBanner()

    const { mutate: deleteBrand, isPending } = useMutation({
        mutationFn: DELETE_BANNER,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["get-banners"]
            })
            queryClient.refetchQueries({
                queryKey: ["get-banners"]
            })
            onClose()
            toast.success(data?.success, {
                id: "delete-banner"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "delete-banner"
            });
        }
    })

    const handleDelete = () => {
        toast.loading("Banner deleting...", {
            id: "delete-banner"
        })
        deleteBrand(bannerId)
    }
    
    return (
        <AlertDialog open={open && !!bannerId}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your banner
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