"use client"

import { useQuery } from "@tanstack/react-query"
import queryString from "query-string"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet"

import { Logo } from "@/components/logo"
import { GET_CATEGORIES } from "@/actions/category.action"
import { cn } from "@/lib/utils"

type Props = {
    children: React.ReactNode
}

export function NavDrawer({ children }: Props) {

    const { data: categories } = useQuery({
        queryKey: ["get-categories"],
        queryFn: async () => {
            const data = await GET_CATEGORIES()
            return data.categories
        },
        staleTime: 60 * 60 * 1000
    })

    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const handleClick = (category: string) => {
        const url = queryString.stringifyUrl({
            url: pathname,
            query: {
                category,
                search: searchParams.get("search"),
                brand: searchParams.get("brand"),
                sort: searchParams.get("sort"),
                minPrice: searchParams.get("minPrice"),
                maxPrice: searchParams.get("maxPrice"),
            }
        }, { skipEmptyString: true, skipNull: true });
        
        router.push(url)
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] space-y-3">
                <SheetHeader>
                    <Logo callbackUrl="/" />
                </SheetHeader>
                <nav className="space-y-4">
                    <h1 className="text-xl font-bold">Category</h1>
                    {
                        categories?.map(category => (
                            <SheetClose asChild key={category.id}>
                                <div className={cn("font-normal hover:underline cursor-pointer", searchParams.get("category") === category.name && "text-primary hover:no-underline")} onClick={() => handleClick(category.name)} key={category.id}>
                                    {category.name}
                                </div>
                            </SheetClose>
                        ))
                    }
                </nav>
            </SheetContent>
        </Sheet>
    )
}