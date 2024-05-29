import { viewIncrement } from '@/actions/post';
import Image from 'next/image'
import Link from 'next/link'
import { FaPlay } from "react-icons/fa";

interface PostCardProps {
    id: string;
    type: string;
    image: string;
    video: string;
    title: string;
    category: string;
}

const PostCard = ({
    id,
    type,
    image,
    video,
    title,
    category
}: PostCardProps) => {
    const handleClick = async () => {
        await viewIncrement(id);
    };
    return (
        <Link
            href={`/post/${id}`}
            onClick={handleClick}
        >
            <div>
                {type === 'IMAGE' ? (
                    <div
                        className='w-fit p-3'
                    >
                        <Image
                            alt="Upload"
                            width={900}
                            height={900}
                            className="object-cover rounded-md shadow-lg border-white border-[1px]"
                            src={image}
                        />
                    </div>
                ) : (
                    <div className="relative w-fit p-3">
                        <div className='absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center'>
                            <div className='rounded-full overflow-hidden flex items-center hover:bg-red-800'>
                                <FaPlay className='w-[70px] h-[70px] text-sky-500 bg-white p-3' />
                            </div>
                        </div>
                        <video className="object-cover rounded-md shadow-lg border-white border-[1px]">
                            <source src={video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                )}
            </div>
        </Link>
    )
}

export default PostCard

//npm i react-masonry-css