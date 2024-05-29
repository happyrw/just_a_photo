"use client"

import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

const GoogleButton = () => {
    const onClick = (provider: "google") => {
        signIn(provider, {
            callbackUrl: "/"
        });
    }
    return (
        <div className='my-[20px] w-full'>
            <button
                className='flex items-center justify-center gap-[10px] capitalize w-full border-2 border-slate-500/10 cursor-pointer hover:bg-sky-500/5 rounded-md py-2'
                onClick={() => onClick("google")}
            >
                <FcGoogle className='h-6 w-6 mr-2' />
                continue with google
            </button>
            {/* <div className="flex items-center justify-center gap-[20px] mt-7">
                <div className='w-full h-[2px] bg-slate-500/10'></div>
                <p className='-mt-2 text-slate-500'>or</p>
                <div className='w-full h-[2px] bg-slate-500/10'></div>
            </div> */}
        </div>
    )
}

export default GoogleButton