"use client"

import { Brand } from "@prisma/client"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import qs from "query-string"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface Props {
    brands: Brand[]
}

export const FilterBrand = ({ brands }: Props) => {
    const [brand, setBrand] = useState<string>("")

    const handleChange = (value: string) => {
        const params = Object.fromEntries(searchParams.entries());
        const newBrand = brand === value ? "" : value;
        setBrand(newBrand)
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                ...params,
                brand: newBrand,
            }
        }, { skipEmptyString: true, skipNull: true });
        router.push(url);
    }

    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()


    return (
        <div className="grid gap-2">
            <div className="grid gap-2">
                {
                    brands.map((brand) => (
                        <div key={brand.id}>
                            <Label className="flex items-center gap-2 font-normal">
                            <Checkbox id="brand-nike" checked={searchParams.get("brand") === brand.name} onCheckedChange={() => handleChange(brand.name)} />
                                {brand.name}
                            </Label>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}