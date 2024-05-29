"use client"

import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import qs from 'query-string';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/use-debounce';

const SearchInput = () => {
    const [value, setValue] = useState("");
    const debouncedValue = useDebounce(value);

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentCategoryId = searchParams.get("categoryId");

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                categoryId: currentCategoryId,
                title: debouncedValue,
            }
        }, { skipEmptyString: true, skipNull: true });

        router.push(url);
    }, [debouncedValue, currentCategoryId, router, pathname]);

    return (
        <div className='relative w-full'>
            <Search className='h-4 w-4 absolute top-3 left-3 text-slate-600' />
            <Input
                onChange={(e) => setValue(e.target.value)}
                value={value}
                className='w-full md:w-[300px] pl-9 rounded-full bg-slate-100 outline-sky-500'
                placeholder='Search for a post'
            />
        </div>
    )
}

export default SearchInput