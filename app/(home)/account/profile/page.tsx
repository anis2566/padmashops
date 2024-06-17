"use client"

import { useQuery } from "@tanstack/react-query";
import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";

import { getUser } from "@/services/user.services";
import { UpdateProfileform } from "@/components/home/account/update-profile-form";

const Profile = () => {
    const { data: user, isLoading } = useQuery({
        queryKey: ["get-user-profile"],
        queryFn: async () => {
            const res = await getUser();
            return res.user;
        },
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false
    });

    return (
        <div className="space-y-4 px-2">
            {
                isLoading ? (
                    <ProfileSkeleton />
                ) : (
                    <Card className="w-full">
                        <CardContent className="flex flex-col md:flex-row items-center gap-4 p-4 md:p-6">
                            <Image
                                alt="Avatar"
                                className="rounded-full"
                                height="60"
                                src={user?.imageUrl || ""}
                                style={{
                                    aspectRatio: "100/100",
                                    objectFit: "cover",
                                }}
                                width="60"
                            />
                            <div className="grid gap-1 text-sm md:gap-2">
                                <div className="font-semibold text-xl">{`${user?.name}`}</div>
                                <div>{user?.email}</div>
                            </div>
                        </CardContent>
                    </Card>
                )
            }

            {
                user && (
                    <UpdateProfileform user={user} />
                )
            }
        </div>
    )
}

export default Profile


const ProfileSkeleton = () => (
    <Card className="w-full">
        <CardContent className="flex flex-col md:flex-row items-center gap-4 p-4 md:p-6">
            <Skeleton className="rounded-full w-14 h-14" />
            <div className="grid gap-1 text-sm md:gap-2">
                <Skeleton className="h-6 w-[150px]" />
                <Skeleton className="h-6 w-[200px]" />
            </div>
        </CardContent>
    </Card>
);