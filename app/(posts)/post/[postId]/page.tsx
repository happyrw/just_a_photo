import { FormatRelativeTime } from '@/components/providers/format-created-at';
import { getRelatedPosts, getSinglePost } from '@/datas/post';
import Image from 'next/image';
import React, { useState } from 'react'
import { FaPlay, FaRegEye } from 'react-icons/fa';
import ItemCard from '../../_components/item-card';
import { formatViewCount } from '@/components/providers/formating-views';
import Views from '../../_components/show-views';

const PostPage = async (
    { params }: { params: { postId: string } },
) => {


    const post = await getSinglePost(params.postId);
    if (!post) return;

    if (!post.categoryId) return;
    const items = await getRelatedPosts({ categoryId: post.categoryId, postId: post.id });
    console.log("related", items);



    return (
        <div className='mt-0 sm:mt-20'>
            {post?.contentType === 'IMAGE' ? (
                <div className='w-full flex flex-col md:flex-row items-start'>
                    <div className='bg-black m-0 sm:m-3 rounded-md p-2 w-fit' >
                        <a href={post.images[0].url} target="_blank" rel="noopener noreferrer">
                            <Image
                                alt="Upload"
                                width={900}
                                height={900}
                                className="object-cover w-full md:w-[600px] rounded-md"
                                src={post?.images[0].url}
                            />
                        </a>
                    </div>
                    <div className="text-white mt-5 md:mt-20 space-y-3 md:space-y-6 pl-5 md:pl-20">
                        <Views views={post.viewCount} />
                        <p className='text-3xl font-bold'>{post.title}</p>
                        <p className='text-xl'>{post.description}</p>
                        <p className='text-sm'>{post.category?.name}</p>
                        <p><FormatRelativeTime createdAt={post.createdAt} /></p>
                    </div>
                </div>
            ) : (
                <div>
                    <div className='w-full md:w-[800px] h-[300px] md:h-[500px] bg-black m-0 sm:m-3 rounded-md'>
                        <div className="h-full w-full">
                            <video autoPlay muted controls className="object-contain h-full w-full">
                                <source src={post?.videos[0].url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                    <div className='flex items-center justify-between sm:m-3 w-full md:w-[800px] text-white'>
                        <p className='text-3xl font-bold'>{post.title}</p>
                        <div className='flex items-center gap-10'>
                            <Views views={post.viewCount} />
                            <p><FormatRelativeTime createdAt={post.createdAt} /></p>
                        </div>
                    </div>
                </div>
            )}
            {
                items.length ? (
                    <div className="pb-5">
                        <p className="text-xl ml-10 mb-2">Related posts</p>
                        <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-5 p-2">
                            {items.map((item) => (
                                <ItemCard
                                    key={item.id}
                                    id={item.id}
                                    type={item.contentType!}
                                    image={item.images[0]?.url}
                                    video={item.videos[0]?.url}
                                />
                            ))}
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}

export default PostPage;