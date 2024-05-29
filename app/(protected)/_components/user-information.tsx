"use client"

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { changeUserInfoSchema } from '@/scheemas/schemas';

import { useForm } from 'react-hook-form';
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';

const UserInfoFormation = () => {

    const form = useForm<z.infer<typeof changeUserInfoSchema>>({
        resolver: zodResolver(changeUserInfoSchema),
        defaultValues: {
            // username: '',
            email: '',
            // imageUrl: '',
            password: '',
            // newPassword: '',
        }
    });

    const onSubmit = (values: z.infer<typeof changeUserInfoSchema>) => {
        console.log("values");
    }

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 mt-[30px]"
                >
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
                                        type="text"
                                        placeholder="Enter your email address"
                                        {...field}
                                        className="w-full border-2 border-slate-400 focus:outline-sky-400"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Password
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Enter your password"
                                        {...field}
                                        className="w-full border-2 border-slate-400 focus:outline-sky-400"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="w-full bg-sky-600 hover:bg-sky-700 Button"
                    >
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default UserInfoFormation;