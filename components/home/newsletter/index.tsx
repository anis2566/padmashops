import Link from "next/link"

import { Button } from "@/components/ui/button"

export const NewsLetter = () => {
    return (
        <div className="w-full max-w-screen-xl mx-auto px-4 py-8 bg-gradient-to-r from-indigo-200 via-green-100 to-indigo-400 flex flex-col items-center space-y-5">
            <h1 className="text-xl font-bold text-primary text-center">Unlock Your Earning Potential: Join as a Seller Now!</h1>
            <Button asChild>
                <Link href="/seller">Join Now</Link>
            </Button>
        </div>
    )
}