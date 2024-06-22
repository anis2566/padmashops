"use client"

import { CalendarClock } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import queryString from "query-string"
import { format } from "date-fns"
import { useState } from "react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { cn } from "@/lib/utils"

export const Header = () => {
    const [date, setDate] = useState<Date | undefined>()

    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleDateChange = (date: Date) => {
        const params = Object.fromEntries(searchParams.entries());
        const url = queryString.stringifyUrl({
            url: pathname,
            query: {
                ...params,
                date: date.toISOString()
            }
        }, { skipEmptyString: true, skipNull: true });

        router.push(url);
        setDate(date);
    }

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
        <div className="space-y-2">
            <div className="flex items-center justify-between gap-x-3">
                <div className="flex items-center gap-x-3">
                    <Select onValueChange={(value) => handlePerPageChange(value)}>
                        <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Limit" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                ["5", "10", "20", "50"].map((v, i) => (
                                    <SelectItem value={v} key={i}>{v}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "hidden sm:flex gap-x-2 w-auto pl-3 text-left font-normal",
                                date && "text-muted-foreground"
                            )}
                            >
                            {date ? (
                                format(date, "PPP")
                            ) : (
                                <span>Pick a date</span>
                            )}
                            <CalendarClock className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            onSelect={(date) => date && handleDateChange(date)}
                        />
                        </PopoverContent>
                    </Popover>
                </div>
                <Select onValueChange={(value) => handleStatusChange(value)}>
                    <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            ["all", "pending", "shipping", "delivered", "returned"].map((v, i) => (
                                <SelectItem value={v} key={i} className="capitalize">{v}</SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            </div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                    variant={"outline"}
                    className={cn(
                        "sm:hidden gap-x-2 w-full pl-3 text-left font-normal",
                        date && "text-muted-foreground"
                    )}
                    >
                    {date ? (
                        format(date, "PPP")
                    ) : (
                        <span>Pick a date</span>
                    )}
                    <CalendarClock className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    onSelect={(date) => date && handleDateChange(date)}
                />
                </PopoverContent>
            </Popover>
        </div>
    )
}