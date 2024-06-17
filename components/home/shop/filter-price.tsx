"use client"

import Slider from 'rc-slider';
import qs from "query-string"
import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import 'rc-slider/assets/index.css';
import { Button } from '@/components/ui/button';


export const FilterPrice = () => {
    const [priceRange, setPriceRange] = useState([50, 5000]);

    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const onSliderChange = (value: number | number[]) => {
        const params = Object.fromEntries(searchParams.entries());
        if (Array.isArray(value)) {
            setPriceRange(value);
            const url = qs.stringifyUrl({
                url: pathname,
                query: {
                    ...params,
                    minPrice: value[0],
                    maxPrice: value[1],
                }
            }, { skipEmptyString: true, skipNull: true });
            router.push(url);
        }
    };

    const hanldeReset = () => {
        const params = Object.fromEntries(searchParams.entries());
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                ...params,
                minPrice: "",
                maxPrice: ""
            }
        }, { skipEmptyString: true, skipNull: true });
        router.push(url);
        setPriceRange([50, 5000])
    }

    return (
        <div className="grid px-2">
            <div className="grid">
                <Slider
                    range
                    min={50}
                    max={5000}
                    value={priceRange}
                    onChange={onSliderChange}
                />
                <div className='flex items-center justify-between gap-x-3'>
                    <p>
                        {priceRange[0]} - {priceRange[1]}
                    </p>
                    <Button variant="ghost" className='text-rose-500' onClick={hanldeReset}>Reset</Button>
                </div>
            </div>
        </div>
    )
}