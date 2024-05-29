"use client";

import FileUpload from '@/components/file-upload';
import Image from 'next/image';
import React, { useEffect, useState, useTransition } from 'react';
import { RxCross2 } from "react-icons/rx";
import { useForm } from 'react-hook-form';

import * as z from "zod";
import { postSchema } from '@/scheemas/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { createPost, createPostWithVideo } from '@/actions/post';
import FormError from '@/app/(auth)/_components/form-error';
import FormSuccess from '@/app/(auth)/_components/form-success';
import { Combobox } from '@/components/ui/combobox';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import { Post, Image as ImageType, Video as VideoType } from '@prisma/client';

interface PostUploadProps {
    post: Post & {
        images: ImageType[];
        videos: VideoType[];
    };
    options: {
        label: string;
        value: string;
    }[];
    postId: string;
}

const PostEdit = (
    { post, options, postId }: PostUploadProps
) => {
    const [imageUrl, setImageUrl] = useState<string>('');
    const [isEditing, setIsEditing] = useState(false);
    const [isImage, setIsImage] = useState(false);
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');

    const handleEdit = () => setIsEditing((currentEdit) => !currentEdit);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (post.contentType === 'IMAGE') {
            setIsImage(true);
            setImageUrl(post.images[0]?.url || '');
        }
        if (post.contentType === 'VIDEO') {
            setIsImage(false);
            setImageUrl(post.videos[0]?.url || '');
        }
    }, [post]);

    console.log("post.images", post.images);

    const form = useForm<z.infer<typeof postSchema>>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            image: post.images[0]?.url || imageUrl || undefined,
            categoryId: post.categoryId || "",
            title: post.title || "",
            description: post.description || "",
            postId: postId || undefined,
        }
    });

    const { isValid } = form.formState;
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof postSchema>) => {
        values.image = imageUrl;

        try {
            startTransition(async () => {
                if (isImage) {
                    values.image = imageUrl;
                    console.log(values.image);
                    const data = await createPost({ ...values, postId });
                    if (data.error) setError(data.error);
                    if (data.success) {
                        setSuccess(data.success);
                        router.push("/post/posts");
                    }
                    console.log("createPost", values);
                } else {
                    values.image = imageUrl;
                    console.log(values.image);
                    const data = await createPostWithVideo({ ...values, postId });
                    if (data.error) setError(data.error);
                    if (data.success) {
                        setSuccess(data.success);
                        router.push("/post/posts");
                    }
                    console.log("createPostWithVideo", values);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleRedirect = () => {
        router.push("/post/posts");
    }

    return (
        <>
            <Button
                variant='outline'
                onClick={handleRedirect}
                className='flex items-center cursor-pointer hover:bg-slate-200'
            >
                <FaArrowLeft className='h-4 w-4 mr-2' />
                Back to the posts
            </Button>
            <div className='bg-sky-500 text-white font-bold w-full p-2 flex items-center justify-center gap-5 top-0'>
                <p>{isImage ? 'You are updating an image' : 'You are updating a video'}</p>
            </div>
            <Form {...form}>
                <form

                    className='grid grid-cols-1 md:grid-cols-2 h-fit md:h-[500px] w-full bg-white'
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className='h-full flex items-center justify-center p-2'>
                        <div
                            className='flex flex-col items-center justify-center h-[400px] w-[500px] border-2 border-dotted border-black text-slate-700 font-bold rounded-md overflow-hidden'
                        >
                            {isEditing ? (
                                isImage ? (
                                    <FileUpload
                                        endPoint='uploadImage'
                                        onChange={(url) => {
                                            if (url) {
                                                setImageUrl(url);
                                                setIsEditing(false);
                                            }
                                        }}
                                    />
                                ) : (
                                    <FileUpload
                                        endPoint='uploadVideo'
                                        onChange={(url) => {
                                            if (url) {
                                                setImageUrl(url);
                                                setIsEditing(false);
                                            }
                                        }}
                                    />
                                )
                            ) : (imageUrl && (
                                isImage ? (
                                    <div className="relative aspect-video h-full w-full">
                                        <Image
                                            alt="Upload"
                                            fill
                                            className="object-cover rounded-md"
                                            src={imageUrl}
                                        />
                                        <p
                                            onClick={handleEdit}
                                            className='absolute right-[5px] top-[5px] bg-black text-white p-2 rounded-full font-bold hover:bg-slate-700 cursor-pointer'
                                        >
                                            <RxCross2 />
                                        </p>
                                    </div>

                                ) : (
                                    <div className="relative aspect-video h-full w-full">
                                        <video className="w-full h-full rounded-md">
                                            <source src={imageUrl} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                        <p
                                            onClick={handleEdit}
                                            className='absolute right-[5px] top-[5px] bg-black text-white p-2 rounded-full font-bold hover:bg-slate-700 cursor-pointer'
                                        >
                                            <RxCross2 />
                                        </p>
                                    </div>
                                )))}
                        </div>
                    </div>


                    <div className='flex flex-col space-y-4 py-10 px-4'>
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='text'
                                            {...field}
                                            placeholder="Add post's title"
                                            className='border-0 outline-0 text-2xl px-4 h-[70px]'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Add post's description"
                                            className='border-0 outline-0 text-xl px-4 h-[70px]'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='categoryId'
                            render={({ field }) => (
                                <FormItem className='flex flex-col gap-3'>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Combobox
                                            options={options}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button disabled={!isValid || !imageUrl || isPending} type='submit' className='w-full bg-sky-600 hover:bg-sky-700 text-white'>Create</Button>
                    </div>
                </form>
            </Form>
        </>
    );
}

export default PostEdit;
