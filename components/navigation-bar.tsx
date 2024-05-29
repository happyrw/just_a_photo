"use client"

import UserButton from '@/app/(protected)/_components/user-button'
import { usePathname, useRouter } from 'next/navigation'
import Logo from './logo'
import Link from 'next/link'
import { ExtendedUser } from '@/next-auth'
import SearchInput from './search-input'

interface NavigationBarProps {
    user: ExtendedUser;
}

const NavigationBar = ({ user }: NavigationBarProps) => {

    const pathname = usePathname();
    // const router = useRouter();

    return (
        <div className='fixed top-0 left-0 right-0 w-full md:px-4 py-4 z-30'>
            <div className='w-full flex items-center justify-between bg-white md:rounded-lg p-2'>
                <Logo />
                {pathname === ("/") || pathname === ("/videos") || pathname === "/photos" ? (
                    <div className='hidden md:flex'>
                        <SearchInput />
                    </div>
                ) : (null)}
                <div className="flex items-center space-x-2 md:space-x-6 text-[7px] sm:text-[17px]">
                    {pathname.includes("/create") || pathname.includes("/edit") ? (
                        <Link href="/" className='cursor-pointer hover:underline hover:text-sky-300'>
                            Cancel
                        </Link>
                    ) : (
                        <>
                            <Link href='/' className={`${pathname === '/' ? 'underline text-orange-500' : ''} cursor-pointer hover:underline hover:text-sky-300`}>
                                Home
                            </Link>
                            <Link href='/photos' className={`${pathname === '/photos' ? 'underline text-orange-500' : ''} cursor-pointer hover:underline hover:text-sky-300`}>
                                Photos
                            </Link>
                            <Link href='/videos' className={`${pathname === '/videos' ? 'underline text-orange-500' : ''} cursor-pointer hover:underline hover:text-sky-300`}>
                                Videos
                            </Link>
                            {user && (
                                <Link href='/post/posts' className={`${pathname.startsWith('/post/posts') ? 'underline text-orange-500' : ''} cursor-pointer hover:underline hover:text-sky-300`}>
                                    Upload
                                </Link>
                            )}
                        </>
                    )}
                    {!user && (
                        <Link href='/sign-in' className="hidden sm:flex cursor-pointer hover:underline hover:text-sky-300">
                            Sign in
                        </Link>
                    )}
                    <UserButton />
                </div>
            </div>
        </div>
    )
}

export default NavigationBar;