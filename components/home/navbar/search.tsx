"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import queryString from "query-string"
import { useRouter, useSearchParams } from "next/navigation"
import { SearchIcon, X } from "lucide-react"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
  searchValue: z.string().optional()
})

export const Search = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchValue: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const url = queryString.stringifyUrl({
            url: `/shop`,
            query: {
            search: values.searchValue,
            }
        }, { skipEmptyString: true, skipNull: true });
        router.push(url)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="hidden md:flex w-full max-w-[500px] border border-primary p-1 relative rounded-md relative">
                <FormField
                    control={form.control}
                    name="searchValue"
                    render={({ field }) => (
                        <FormItem className="w-full">
                        <FormControl>
                            <Input className="focus-visible:ring-0 focus-visible:ring-offset-0 border-none w-full" placeholder="Search for anything" {...field} />
                        </FormControl>
                        </FormItem>
                    )}
                />
                <Button
                    variant="ghost"
                    type="button"
                    size="icon"
                    className={cn("hidden absolute top-1 right-7", form.getValues("searchValue") && "flex")}
                    onClick={() => {
                        form.reset()
                        router.push("/shop")
                    }}
                >
                    <X className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="absolute right-0 top-1" type="submit">
                    <SearchIcon className="h-5 w-5" />
                </Button>
            </form>
        </Form>
    )
}