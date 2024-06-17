"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useMessage } from "@/hooks/use-message"


export const MessageModal = () => {
    const {message, open, onClose} = useMessage()
    return (
        <Dialog open={open && message !== null} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Message</DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                    <div>
                        <h5 className="font-semibold">Name</h5>
                        <p className="text-muted-foreground">{message?.name}</p>
                    </div>
                    <div>
                        <h5 className="font-semibold">Email</h5>
                        <p className="text-muted-foreground">{message?.email}</p>
                    </div>
                    <div>
                        <h5 className="font-semibold">Message</h5>
                        <p className="text-muted-foreground">{message?.message}</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}