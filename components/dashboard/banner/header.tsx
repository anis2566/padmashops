"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import queryString from "query-string"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const Header = () => {

    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const handlePerPageChange = (perPage: string) => {
        const params = Object.fromEntries(searchParams.entries());
        const url = queryString.stringifyUrl({
            url: pathname, 
            query: {
                ...params,
                perPage,
            }
        }, {skipNull: true, skipEmptyString: true})

        router.push(url)
    }

    const handleStatusChange = (status: string) => {
        const params = Object.fromEntries(searchParams.entries());
        const url = queryString.stringifyUrl({
            url: pathname, 
            query: {
                ...params,
                status
            }
        }, {skipNull: true, skipEmptyString: true})

        router.push(url)
    }

    return (
        <div className="flex items-center justify-between gap-x-3">
                <Select onValueChange={(value) => handlePerPageChange(value)}>
                    <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Limit" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            ["4", "8", "16", "20"].map((v, i) => (
                                <SelectItem value={v} key={i}>{v}</SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            <Select onValueChange={(value) => handleStatusChange(value)}>
                <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}