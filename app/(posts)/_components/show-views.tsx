"use client"

import { formatViewCount } from '@/components/providers/formating-views';
import React, { useState } from 'react'
import { FaRegEye } from 'react-icons/fa';

const Views = ({ views }: { views: number }) => {
    const [view, setView] = useState(false);

    const formatViews = formatViewCount(views);
    const handleView = () => {
        setView(true);
        setTimeout(() => {
            setView(false);
        }, 2000);
    }
    return (
        <div>
            <p className='flex text-sm gap-2 items-center'>{formatViews} <FaRegEye onClick={handleView} /></p>
            {view && <p>{views} {views < 2 ? "view" : "views"}</p>}
        </div>
    )
}

export default Views