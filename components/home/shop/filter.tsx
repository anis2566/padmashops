"use client"

import { useQuery } from "@tanstack/react-query"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

import { GET_CATEGORIES } from "@/actions/category.action"
import { FilterCategory } from "./filter-category"
import { FilterPrice } from "./filter-price"
import { GET_BRANDS } from "@/actions/brand.action"
import { FilterBrand } from "./filter-brand"


export const Filter = () => {
    const { data: categories } = useQuery({
        queryKey: ["get-categories"],
        queryFn: async () => {
            const data = await GET_CATEGORIES()
            return data.categories
        },
        staleTime: 60 * 60 * 1000
    })

    const { data: brands } = useQuery({
        queryKey: ["get-brands"],
        queryFn: async () => {
            const data = await GET_BRANDS()
            return data.brands
        },
        staleTime: 60 * 60 * 1000
    })

    return (
        <div className="hidden md:flex flex-col gap-1 border-r border-gray-200 pr-2 w-[200px] flex-shrink-0">
            <h1 className="text-xl font-semibold text-primary">Filter</h1>
            <Accordion type="single" collapsible>
                <AccordionItem value="category">
                    <AccordionTrigger className="text-base font-medium hover:no-underline">Category</AccordionTrigger>
                    <AccordionContent>
                        <FilterCategory categories={categories || []} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="price">
                    <AccordionTrigger className="text-base font-medium hover:no-underline">Price Range</AccordionTrigger>
                    <AccordionContent>
                        <FilterPrice />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="brand">
                    <AccordionTrigger className="text-base font-medium hover:no-underline">Brand</AccordionTrigger>
                    <AccordionContent>
                        <FilterBrand brands={brands || []} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}