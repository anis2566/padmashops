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


export const getProfile = async () => {
    const { userId } = auth();

    if (!userId) return null

    const user = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) return null

    return { user, userId: user.id, clerkId: userId };
}


export const getAdmin = async () => {
    const admin = await db.user.findFirst({
        where: {
            role: "admin"
        }
    })

    if (!admin) {
        throw new Error("Admin not found")
    }

    return {
        admin,
        adminId: admin.id,
        adminClerkId: admin.clerkId
    }
}