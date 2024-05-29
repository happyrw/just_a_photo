"use client"

import Masonry from 'react-masonry-css';

import { Post, Image as ImageType, Video as VideoType, Category } from '@prisma/client';
import PostCard from './post-card';

interface PostsListProps {
    items: (Post & {
        images: ImageType[];
        videos: VideoType[];
        category: Category | null
    })[];
}

const breakpointObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
}

const PostsList = ({ items }: PostsListProps) => {
    return (
        <div>
            <Masonry
                className='flex animate-slide-fwd'
                breakpointCols={breakpointObj}
            >
                {items.map((item) => (
                    <PostCard
                        key={item.id}
                        id={item.id}
                        type={item.contentType!}
                        image={item.images[0]?.url}
                        video={item.videos[0]?.url}
                        title={item.title}
                        category={item.category?.name!}
                    />
                ))}
            </Masonry>
            {items.length === 0 && (
                <div className='text-center text-sm text-white mt-10'>
                    No posts found
                </div>
            )}
        </div>
    )
}

export default PostsList;