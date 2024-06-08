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
import { useCoupon } from "@/hooks/use-coupon"
import { DELETE_COUPON } from "@/actions/coupon.action"


export const DeleteCouponModal = () => {
    const { open, couponId, onClose } = useCoupon()

    const { mutate: deleteBrand, isPending } = useMutation({
        mutationFn: DELETE_COUPON,
        onSuccess: (data) => {
            onClose()
            toast.success(data?.success, {
                id: "delete-coupon"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "delete-coupon"
            });
        }
    })

    const handleDelete = () => {
        toast.loading("Coupon deleting...", {
            id: "delete-coupon"
        })
        deleteBrand(couponId)
    }
    
    return (
        <AlertDialog open={open && !!couponId}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your coupon
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