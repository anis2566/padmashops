"use client"

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { useSellerStatus } from "@/hooks/use-seller"
import { DialogTitle } from "@radix-ui/react-dialog"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { UPDATE_SELLER_STATUS } from "@/actions/seller.action"
import { toast } from "sonner"


export const SellerStatusModal = () => {
    const [status, setStatus] = useState<string>("")

    const { open, sellerId, onClose } = useSellerStatus()
    
    const {mutate: updateSellerStatus, isPending} = useMutation({
        mutationFn: UPDATE_SELLER_STATUS,
        onSuccess: (data) => {
            onClose()
            toast.success(data?.success, {
                id: "update-status"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "update-status"
            });
        }
    })

    const handleUpdate = () => {
        toast.loading("Status updating...", {
            id: "update-status"
        })
        updateSellerStatus({sellerId, status})
    }

    return (
        <Dialog open={open && !!sellerId} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change Status</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                    <Select onValueChange={(value) => setStatus(value)} disabled={isPending}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button disabled={!status || isPending} onClick={handleUpdate}>Update</Button>

                </div>
            </DialogContent>
        </Dialog>
    )
}