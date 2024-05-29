import React from 'react'
import UserInfoForm from '../../_components/user-info';
import { currentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import UserInfoFormation from '../../_components/user-information';

const ProfilePage = async () => {
    const user = await currentUser();
    if (!user) {
        return redirect("/");
    }

    return (
        <div className='h-full flex justify-center mt-[30px]'>
            <UserInfoForm user={user} />
            {/* <UserInfoFormation /> */}
        </div>
    )
}

export default ProfilePage;

//6:47:42