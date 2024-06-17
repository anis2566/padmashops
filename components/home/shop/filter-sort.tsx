"use client"

import qs from "query-string"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



export const FilterSort = () => {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleChange = (value: string) => {
        const params = Object.fromEntries(searchParams.entries());
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                ...params,
                sort: value,
            }
        }, { skipEmptyString: true, skipNull: true });
        router.push(url);
    }



    return (
        <Select defaultValue="" onValueChange={(value) => handleChange(value)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="desc">Newest</SelectItem>
                <SelectItem value="asc">Oldest</SelectItem>
                <SelectItem value="high-to-low">Price: High to Low</SelectItem>
                <SelectItem value="low-to-high">Price: Low to High</SelectItem>
            </SelectContent>
        </Select>
    )
}