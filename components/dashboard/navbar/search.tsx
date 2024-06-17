"use client"

import { SearchIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import queryString from "query-string"
import { useEffect, useState } from "react"

import { Input } from "@/components/ui/input"

import { useDebounce } from "@/hooks/use-debounce"

export const SearchInput = () => {
    const [search, setSearch] = useState<string>("")

    const searchValue = useDebounce(search, 500)
    const router = useRouter()
    const pathname = usePathname()


    useEffect(() => {
        const url = queryString.stringifyUrl({
            url: `/dashboard/product`,
            query: {
                search: searchValue
            }
        }, { skipEmptyString: true, skipNull: true });

        router.push(url);
    }, [searchValue, router])

    return (
        <div className="relative w-full">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search product..."
                className="w-full appearance-none bg-background pl-8 shadow-none"
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    )
}