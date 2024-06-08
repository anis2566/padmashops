"use server"

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export const getUser = async () => {
    const {userId} = auth()

    if (!userId) {
        redirect("/sign-in")
    }

    const user = await db.user.findUnique({
        where: {
            clerkId: userId
        }
    })

    if (!user) {
        redirect("/sign-in")
    }

    return {user, userId: user.id, clerkId: userId}
}