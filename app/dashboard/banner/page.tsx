"use client"

import { CirclePlus } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import {
    Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { Header } from "@/components/dashboard/banner/header";
import { GET_BANNERS } from "@/actions/banner.action";
import { CustomPagination } from "@/components/custom-pagination";
import { BannerList, SkeletonBanner } from "@/components/dashboard/banner";

const Banner = () => {

    const perPage = useSearchParams().get("perPage")
    const status = useSearchParams().get("status")
    const page = useSearchParams().get("page")

    const {data, isLoading} = useQuery({
        queryKey: ["get-banners", perPage, status, page],
        queryFn: async () => {
            const res = await GET_BANNERS({perPage: perPage || "4", status: status || "all", page: page || "1"})
            return res
        },
        staleTime: 60 * 60 * 1000,
        refetchOnWindowFocus: false
    })

    return (
        <div className="w-full space-y-4">
            <div className="flex items-center gap-4">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                        <BreadcrumbPage>Banner</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Link href="/dashboard/banner/create">
                    <Button size="sm" className="flex items-center gap-x-2">
                        <CirclePlus className="w-5 h-5" />
                        Create
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Banner List</CardTitle>
                    <CardDescription>Manage your banner collection.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    {
                        isLoading ? (
                            <SkeletonBanner />
                        ) : (
                            <BannerList banners={data?.banners || []} />
                        )
                    }
                    <CustomPagination totalPage={Math.round((data?.totalBanner ?? 0) / 4)} />
                </CardContent>
            </Card>

        </div>
    )
}

export default Banner;