"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import { UPDATE_TRACKING_ID } from "@/actions/seller-order.action"
import { useTracking } from "@/hooks/use-tracking"

export const TrackingModal = () => {
    const [trackingId, setTrackingId] = useState<string>("")

    const {open, orderId, onClose} = useTracking()

    const {mutate: addTracking, isPending} = useMutation({
        mutationFn: UPDATE_TRACKING_ID,
        onSuccess: (data) => {
            onClose()
            toast.success(data?.success, {
                id: "add-tracking"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "add-tracking"
            });
        }
    })

    const handleAddTracking = () => {
        toast.loading("Tracking Id adding...", {
            id: "add-tracking"
        })
        addTracking({
            orderId,
            trackingId
        })
    }

    return (
       <Dialog open={open && !!orderId}>
            <DialogContent className="space-y-4">
                <DialogHeader>
                    <DialogTitle>Add Tracking Id</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Input placeholder="Enter tracking Id" disabled={isPending} onChange={(e) => setTrackingId(e.target.value)} autoFocus />
                    <Button disabled={!trackingId || isPending} onClick={handleAddTracking}>Submit</Button>
                </div>
            </DialogContent>
        </Dialog> 
    )
}