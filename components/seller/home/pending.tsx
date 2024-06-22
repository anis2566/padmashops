import { ClockIcon } from "lucide-react"
import Link from "next/link"

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function Pending() {
  return (
    <div className="flex items-center justify-center h-[70vh]">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-lg">
        <CardHeader className="text-center">
          <ClockIcon className="h-12 w-12 text-yellow-500 mb-4 mx-auto" />
          <CardTitle className="text-2xl font-bold">Pending Account</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400 mt-2">
            Your account is currently pending approval. Please contact our support team to resolve this issue.
          </CardDescription>
        </CardHeader>
        {/* <CardContent>
            <Button className="w-full" asChild>
                <Link href="/support">
                    Contact
                </Link>
            </Button>
        </CardContent> */}
      </Card>
    </div>
  )
}