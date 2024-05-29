// "use client"

// import { Button } from '@/components/ui/button';
// import React, { useState } from 'react'
// import { BsExclamation } from 'react-icons/bs';
// import { MdNoEncryptionGmailerrorred } from "react-icons/md";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import { useRouter } from 'next/navigation';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { passwordSchema } from '@/scheemas/schemas';

// import * as z from "zod";
// import { Input } from '@/components/ui/input';
// import { verifyUserEmailToResetPassword } from '@/actions/user';
// import FormError from './form-error';
// import FormSuccess from './form-success';


// const PasswordResetForm = () => {
//     const router = useRouter();
//     const [error, setError] = useState<string | undefined>("");
//     const [success, setSuccess] = useState<string | undefined>("");
//     const [submitting, setSubmitting] = useState(false);

//     const form = useForm<z.infer<typeof passwordSchema>>({
//         resolver: zodResolver(passwordSchema),
//         defaultValues: {
//             email: '',
//         }
//     });

//     const { isValid, isLoading } = form.formState;

//     const onSubmit = async (values: z.infer<typeof passwordSchema>) => {
//         try {
//             setError('');
//             setSuccess('');
//             setSubmitting(true);
//             await verifyUserEmailToResetPassword(values)
//                 .then((data) => {
//                     setError(data?.error)
//                     setSuccess(data?.success)
//                     setSubmitting(false);
//                 })
//         } catch (error) {
//             setSubmitting(false);
//         }
//     }

//     return (
//         <div className='w-full md:w-[400px] bg-white p-5 rounded-md h-fit space-y-8'>
//             <h1 className='flex items-center justify-center text-[20px] font-bold'>
//                 <MdNoEncryptionGmailerrorred className='h-7 w-7 mr-2' />
//                 Reset your password
//             </h1>
//             <Form {...form}>
//                 <form
//                     onSubmit={form.handleSubmit(onSubmit)}
//                     className='space-y-4'
//                 >
//                     <FormField
//                         control={form.control}
//                         name="email"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel className='ml-2'>
//                                     Enter your email for verification
//                                 </FormLabel>
//                                 <FormControl>
//                                     <Input
//                                         type="text"
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
//                     >Verify your email<FaArrowRight className='h-4 w-4 ml-2' /></Button>
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

// export default PasswordResetForm;