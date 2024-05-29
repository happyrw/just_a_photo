import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
    return (
        <Link href="/">
            <Image
                width={130}
                height={130}
                alt="logo"
                src="/just a photo.png"
                className='w-[100px] -ml-2 md:w-[120px]'
            />
        </Link>
    )
}

export default Logo;