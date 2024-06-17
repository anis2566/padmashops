"use client"

import { Category } from "@prisma/client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import qs from "query-string"

import { cn } from "@/lib/utils"

interface Props {
    categories: Category[]
}

export const FilterCategory = ({ categories }: Props) => {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleClick = (category: string) => {
        const params = Object.fromEntries(searchParams.entries());
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                ...params,
                category,
            }
        }, { skipEmptyString: true, skipNull: true });

        router.push(url)
    }

    return (
        <div className="grid gap-2">
            <div className="grid gap-1">
                <div className="font-normal hover:underline cursor-pointer text-md" onClick={() => handleClick("")}>
                    All Products
                </div>
                {
                    categories.map(category => (
                        <div className={cn("font-normal hover:underline cursor-pointer text-mdr", searchParams.get("category") === category.name && "text-primary hover:no-underline")} onClick={() => handleClick(category.name)} key={category.id}>
                            {category.name}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}