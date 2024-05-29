"use client"

import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ExtendedUser } from '@/next-auth';
import { changeUserInfoSchema } from '@/scheemas/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar } from '@radix-ui/react-avatar';
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form';
import { FaUser } from 'react-icons/fa';

import * as z from "zod";

import { IoMdCloudUpload } from "react-icons/io";
import { Input } from '@/components/ui/input';
import { ImageIcon, Video } from 'lucide-react';
import Image from 'next/image';
import FileUpload from '@/components/file-upload';
import { setting } from '@/actions/user';
import FormError from '@/app/(auth)/_components/form-error';
import FormSuccess from '@/app/(auth)/_components/form-success';

interface UserInfoFormProps {
    user: ExtendedUser;
}

const UserInfoForm = ({ user }: UserInfoFormProps) => {
    console.log(user.image);

    const [isEditing, setIsEditing] = useState(false);
    const [userImage, setUserImage] = useState("");
    const [userVideo, setUserVideo] = useState('');
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleEdit = () => setIsEditing((currentEdit) => !currentEdit);

    const form = useForm<z.infer<typeof changeUserInfoSchema>>({
        resolver: zodResolver(changeUserInfoSchema),
        defaultValues: {
            name: user.name || undefined,
            email: user.email || undefined,
            image: user.image || undefined,
            password: undefined,
            newPassword: undefined,
        }
    });

    const { isLoading, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof changeUserInfoSchema>) => {

        setError('');
        setSuccess('');

        if (userImage) {
            values.image = userImage;
        } else {
            values.image = undefined;
        }
        console.log(values);
        try {
            setIsSubmitting(true);
            const data = await setting(values);
            if (data?.error) {
                setError(data.error);
            } else if (data?.success) {
                setSuccess(data.success);
            }
            setIsEditing(false);
        } catch (error) {
            setIsSubmitting(false);
        }
    }

    return (
        <div className='w-full bg-white sm:w-[400px] md:w-[600px] rounded-md shadow-lg p-2 mb-5'>
            <h2 className='text-2xl mx-20 my-10'>Your profile page</h2>
            <Form {...form}>
                <form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>

                    <div className='flex items-center justify-center gap-5'>
                        <Avatar className='h-[80px] w-[80px] sm:w-[120px] sm:h-[120px]'>
                            {userImage ? (<AvatarImage src={userImage || ""} className='object-cover w-full h-full rounded-full' />) : (<AvatarImage src={user?.image || ""} className='object-cover w-full h-full rounded-full' />)}
                            <AvatarFallback className='bg-sky-500'>
                                <FaUser className='text-white h-[50px] w-[50px]  sm:h-20 sm:w-20' />
                            </AvatarFallback>
                        </Avatar>
                        {isEditing && (
                            <div>
                                <FileUpload
                                    endPoint='uploadImage'
                                    onChange={(url) => {
                                        if (url) {
                                            setUserImage(url);
                                        }
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    {!isEditing ? (
                        <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                            <p className='text-sm font-medium'>Username</p>
                            <p className='truncate text-sm font-medium max-w-[180px] p-1 bg-slate-100 rounded-md'>{user.name}</p>
                        </div>
                    ) : (
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Username
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            type='text'
                                            {...field}
                                            className="w-full border-2 border-slate-100 focus:outline-sky-400"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                    {user.isOAuth === false && (
                        <>
                            {!isEditing ? (
                                <div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
                                    <p className='text-sm font-medium'>Email</p>
                                    <p className='truncate text-sm font-medium max-w-[180px] p-1 bg-slate-100 rounded-md'>{user.email}</p>
                                </div>
                            ) : (
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Email
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isLoading}
                                                    type='email'
                                                    {...field}
                                                    className="w-full border-2 border-slate-100 focus:outline-sky-400"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

                            {isEditing && (
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Current password
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isLoading}
                                                    type='password'
                                                    {...field}
                                                    className="w-full border-2 border-slate-100 focus:outline-sky-400"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

                            {isEditing && (
                                <FormField
                                    control={form.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                New password
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isLoading}
                                                    type='password'
                                                    {...field}
                                                    className="w-full border-2 border-slate-100 focus:outline-sky-400"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </>
                    )}
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    {isEditing ? (
                        <div className='w-full flex items-center justify-between gap-5 px-5'>
                            <Button disabled={isLoading || isSubmitting} className='w-full' type='button' onClick={handleEdit}>Cancel</Button>
                            <Button disabled={isLoading || !isValid || isSubmitting} className='w-full' type='submit'>Save</Button>
                        </div>
                    ) : (
                        <Button disabled={isLoading || isSubmitting} type='button' onClick={handleEdit} className='w-full bg-sky-500 text-white hover:bg-sky-700'>Update you profile</Button>
                    )}
                </form>
            </Form>
        </div>
    )
}

export default UserInfoForm;


{/* {!isEditing && (
    !userVideo ? (
        <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
        </div>
    ) : (
        <div className="relative aspect-video mt-2">
            <video controls className="w-full h-full rounded-md">
                <source src={userVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    )
)}
{isEditing && (
    <div>
        <FileUpload
            endPoint='uploadVideo'
            onChange={(url) => {
                if (url) {
                    setUserVideo(url);
                }
            }}
        />
        <div className="text-xs text-muted-foreground mt-4">
            Upload this chapter&apos;s video
        </div>
    </div>
)} */}