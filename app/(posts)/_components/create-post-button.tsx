"use client"

import { PlusCircle } from 'lucide-react'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { titleSchema } from '@/scheemas/schemas'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { RxCross2 } from "react-icons/rx";
import { useState, useTransition } from 'react'
import FormError from '@/app/(auth)/_components/form-error'
import FormSuccess from '@/app/(auth)/_components/form-success'
import { titleCreation } from '@/actions/post'
import { useRouter } from 'next/navigation'

const CreatePostButton = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');

    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleEdit = () => setIsEditing((currentEdit) => !currentEdit);

    const form = useForm<z.infer<typeof titleSchema>>({
        resolver: zodResolver(titleSchema),
        defaultValues: {
            title: '',
        }
    });

    const { isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof titleSchema>) => {
        setError('');
        setSuccess('');
        try {
            startTransition(async () => {
                const response = await titleCreation(values);
                if (response.error) setError(response.error);
                if (response.success) setSuccess(response.success);
                router.push(`/post/posts/create/${response?.post?.id}`);
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className='flex items-center md:px-10'>
                <button
                    onClick={handleEdit}
                    className='flex items-center bg-black text-white px-4 py-2 rounded-md ml-auto cursor-pointer hover:bg-sky-200 hover:text-black'
                >
                    <PlusCircle className='h-4 w-4 mr-2' />
                    Create post
                </button>
            </div>
            {isEditing && (
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-slate-600 flex items-center justify-center z-20">
                    <div className='bg-white w-full sm:w-[400px] md:w-[600px] p-5 md:p-10 rounded-md space-y-8 relative'>
                        <p
                            onClick={handleEdit}
                            className='absolute right-[5px] top-[5px] bg-black text-white p-2 rounded-full font-bold hover:bg-slate-700 cursor-pointer'
                        >
                            <RxCross2 />
                        </p>
                        <p className='text-xl'>Create your posts&apos; title</p>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                            >
                                <FormField
                                    control={form.control}
                                    name='title'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Post title here
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='text'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <p className='text-sm text-muted-foreground'>You can change it later</p>
                                <FormError message={error} />
                                <FormSuccess message={success} />
                                <Button disabled={!isValid || isPending} className='w-full bg-sky-600 hover:bg-sky-700 mt-10'>create</Button>
                            </form>
                        </Form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CreatePostButton;