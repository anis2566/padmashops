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

import { useCategory } from "@/hooks/use-category"
import { DELETE_CATEGORY } from "@/actions/category.action"


export const DeleteCategoryModal = () => {
    const { open, categoryId, onClose } = useCategory()

    const { mutate: deleteCategory, isPending } = useMutation({
        mutationFn: DELETE_CATEGORY,
        onSuccess: (data) => {
            onClose()
            toast.success(data?.success, {
                id: "delete-category"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "delete-category"
            });
        }
    })

    const handleDelete = () => {
        toast.loading("Category deleting...", {
            id: "delete-category"
        })
        deleteCategory(categoryId)
    }
    
    return (
        <AlertDialog open={open && !!categoryId}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your category
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