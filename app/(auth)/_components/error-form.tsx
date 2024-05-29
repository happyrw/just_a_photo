"use client"

import { Button } from '@/components/ui/button';
import React from 'react'
import { BsExclamation } from 'react-icons/bs';
import { MdNoEncryptionGmailerrorred } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from 'next/navigation';


const ErrorForm = () => {
    const router = useRouter();
    return (
        <div className='w-full md:w-[400px] bg-white p-5 rounded-md h-fit space-y-8'>
            <h1 className='flex items-center justify-center text-[20px] font-bold'>
                <MdNoEncryptionGmailerrorred className='h-7 w-7 mr-2' />
                Auth Error
            </h1>
            <p className='bg-destructive/15 p-2 flex items-center gap-[20px] font-bold rounded-lg'>
                <BsExclamation className='h-7 w-7 bg-destructive rounded-full' />
                oops! Something went wrong
            </p>
            <Button
                className='w-full'
                onClick={() => router.push("/sign-in")}
            ><FaArrowLeft className='h-4 w-4 mr-2' />Back to sign in page</Button>
        </div>
    )
}

export default ErrorForm