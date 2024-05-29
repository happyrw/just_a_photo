// "use client"

// import { Button } from '@/components/ui/button';
// import { FaArrowLeft } from "react-icons/fa";
// import { useRouter, useSearchParams } from 'next/navigation';
// import { Key } from 'lucide-react';
// import { BeatLoader } from "react-spinners";
// import { useCallback, useEffect, useState } from 'react';
// // import { newVerification } from '@/actions/user';
// import FormError from './form-error';
// import FormSuccess from './form-success';


// const NewVerificationForm = () => {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const token = searchParams.get("token");
//     const [error, setError] = useState<string | undefined>('');
//     const [success, setSuccess] = useState<string | undefined>('');

//     const onSubmit = useCallback(() => {
//         console.log({ token: token });
//         if (!token) {
//             setError("Missing token");
//             return;
//         };
//         newVerification(token)
//             .then((data) => {
//                 setSuccess(data.success);
//                 setError(data.error);
//             }).catch(() => {
//                 setError("Something went wrong");
//             })
//     }, [token]);

//     useEffect(() => {
//         onSubmit();
//     }, [onSubmit]);

//     return (
//         <div className='w-full md:w-[400px] bg-white p-5 rounded-md h-fit space-y-8'>
//             <h1 className='flex items-center justify-center text-[20px] font-bold'>
//                 <Key className='h-7 w-7 mr-2' />
//                 New Email Verification
//             </h1>
//             {!success && !error && (<>
//                 <BeatLoader className='text-center' />
//                 <p className='text-center'>We are verifying your email, hold on</p>
//             </>)}
//             <FormError message={error} />
//             <FormSuccess message={success} />
//             <Button
//                 className='w-full'
//                 onClick={() => router.push("/sign-in")}
//             ><FaArrowLeft className='h-4 w-4 mr-2' />Back to sign in page</Button>
//         </div>
//     )
// }

// export default NewVerificationForm;