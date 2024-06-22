"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useRegistration } from "@/hooks/use-seller"
import { SignOutButton } from "@clerk/nextjs"

export const RegisterSuccessModal = () => {
    const {onClose, open} = useRegistration()
    return (
        <Dialog open={open}>
            <DialogContent className="space-y-4">
                <DialogHeader>
                    <DialogTitle>Registration SuccessFull</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <p className="text-center text-md text-primary">Re login to switch role.</p>

                    <SignOutButton redirectUrl="/seller">
                        <Button variant="ghost" className="py-0 flex items-center gap-x-2 bg-primary text-white mx-auto hover:bg-primary/80" onClick={onClose}>
                            Login
                        </Button>
                    </SignOutButton>
                </div>
            </DialogContent>
        </Dialog> 
    )
}