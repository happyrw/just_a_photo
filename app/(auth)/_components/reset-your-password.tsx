// "use client"

// import { Button } from '@/components/ui/button';
// import React, { useCallback, useState } from 'react'
// import { BsExclamation } from 'react-icons/bs';
// import { MdNoEncryptionGmailerrorred } from "react-icons/md";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import { useRouter, useSearchParams } from 'next/navigation';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { resetYouPasswordSchema } from '@/scheemas/schemas';

// import * as z from "zod";
// import { Input } from '@/components/ui/input';
// import { resetYourPassword, verifyUserEmailToResetPassword } from '@/actions/user';
// import FormError from './form-error';
// import FormSuccess from './form-success';


// const ResetYouPasswordForm = () => {
//     const router = useRouter();
//     const [error, setError] = useState<string | undefined>("");
//     const [success, setSuccess] = useState<string | undefined>("");
//     const [submitting, setSubmitting] = useState(false);

//     const searchParams = useSearchParams();
//     const token = searchParams.get("token");

//     const form = useForm<z.infer<typeof resetYouPasswordSchema>>({
//         resolver: zodResolver(resetYouPasswordSchema),
//         defaultValues: {
//             password: '',
//         }
//     });

//     const { isValid, isLoading } = form.formState;

//     const onSubmit = (values: z.infer<typeof resetYouPasswordSchema>) => {
//         if (!token) {
//             setError("Missing token");
//             return;
//         };
//         resetYourPassword(values, token)
//             .then((data) => {
//                 setSuccess(data.success);
//                 setError(data.error);
//             }).catch(() => {
//                 setError("Something went wrong");
//             })
//     };

//     return (
//         <div className='w-full md:w-[400px] bg-white p-5 rounded-md h-fit space-y-8'>
//             <h1 className='flex items-center justify-center text-[20px] font-bold'>
//                 <MdNoEncryptionGmailerrorred className='h-7 w-7 mr-2' />
//                 Change your password
//             </h1>
//             <Form {...form}>
//                 <form
//                     onSubmit={form.handleSubmit(onSubmit)}
//                     className='space-y-4'
//                 >
//                     <FormField
//                         control={form.control}
//                         name="password"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel className='ml-2'>
//                                     Enter your new password
//                                 </FormLabel>
//                                 <FormControl>
//                                     <Input
//                                         type="password"
//                                         className='w-full outline-none'
//                                         {...field}
//                                     />
//                                 </FormControl>
//                                 <FormMessage />
//                                 <FormError message={error} />
//                                 <FormSuccess message={success} />
//                             </FormItem>
//                         )}
//                     />
//                     <Button
//                         type='submit'
//                         className='w-full'
//                         disabled={!isValid || isLoading || submitting}
//                     >Change password<FaArrowRight className='h-4 w-4 ml-2' /></Button>
//                 </form>
//             </Form>
//             <Button
//                 className='w-full'
//                 onClick={() => router.push("/sign-in")}
//                 variant='outline'
//             ><FaArrowLeft className='h-4 w-4 mr-2' />Back to sign in page</Button>
//         </div>
//     )
// }

// export default ResetYouPasswordForm;