import NavigationBar from '@/components/navigation-bar';
import { currentUser } from '@/lib/auth';
import React from 'react'
import CreatePostButton from '../../_components/create-post-button';
import { columns } from '../../_components/columns';
import { DataTable } from '../../_components/data-table';
import { getUserPosts } from '@/datas/post';
import { redirect } from 'next/navigation';

const PostsListPage = async () => {
    const user = await currentUser();
    if (!user) redirect("/");

    const posts = await getUserPosts(user?.id);
    return (
        <div>
            <div className="mb-[100px]">
                <NavigationBar user={user!} />
            </div>
            <CreatePostButton />
            <div className="min-w-[600px] mx-auto py-10 bg-white mt-3 overflow-x-auto">
                <DataTable columns={columns} data={posts!} />
            </div>
        </div>
    )
}

export default PostsListPage;
