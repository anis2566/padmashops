import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const Newsletter = () => {
    return (
        <div className="bg-white p-4 bg-gradient-to-r from-indigo-400 space-y-3 py-6">
            <h1 className="text-center text-2xl md:text-3xl font-bold">Get latest updates of our offer on your inbox.</h1>
            <div className="flex items-center justify-center gap-x-2">
                <Input placeholder="Enter your email" className="max-w-[300px] bg-background/20" />
                <Button>Subscribe</Button>
            </div>
        </div>
    )
}