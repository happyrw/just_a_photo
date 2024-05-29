// "use client"

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import * as z from "zod"

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import FormError from "./form-error"
// import FormSuccess from "./form-success"
// import { useState } from "react"
// import { loginSchema } from "@/scheemas/schemas"
// import Link from "next/link"
// // import { loginUser } from "@/actions/user"
// import { useRouter } from "next/navigation"

// const LoginForm = () => {
//   const [error, setError] = useState<string | undefined>('');
//   const [success, setSuccess] = useState<string | undefined>('');
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

//   const router = useRouter();

//   const form = useForm<z.infer<typeof loginSchema>>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   })

//   const { isValid, isLoading } = form.formState;

//   const onSubmit = async (values: z.infer<typeof loginSchema>) => {
//     setError('');
//     setSuccess('');
//     try {
//       setIsSubmitting(true);
//       const data = await loginUser(values);
//       if (data?.error) {
//         setError(data.error);
//       } else if (data?.success) {
//         setSuccess(data.success);
//       }
//       window.location.reload();
//       router.push("/");
//     } catch (error) {
//       console.log(error);
//       setIsSubmitting(false);
//     }
//   }

//   const navigate = () => {
//     router.push("/password-reset")
//   }

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="space-y-4 mt-[30px]"
//       >
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>
//                 Email
//               </FormLabel>
//               <FormControl>
//                 <Input
//                   type="text"
//                   placeholder="Enter your email address"
//                   {...field}
//                   disabled={isLoading || isSubmitting}
//                   className="w-full border-2 border-slate-400 focus:outline-sky-400"
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>
//                 <div className="flex w-full justify-between items-center">
//                   Password
//                   <Button
//                     variant="ghost"
//                     className="hover:text-sky-500 text-sky-600 text-xs hover:bg-transparent"
//                     onClick={navigate}
//                     type="button"
//                   >
//                     forget password
//                   </Button>
//                 </div>
//               </FormLabel>
//               <FormControl>
//                 <Input
//                   type="password"
//                   placeholder="Enter your password"
//                   {...field}
//                   disabled={isLoading || isSubmitting}
//                   className="w-full border-2 border-slate-400 focus:outline-sky-400"
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormError message={error} />
//         <FormSuccess message={success} />
//         <Button
//           type="submit"
//           className="w-full bg-sky-600 hover:bg-sky-700 Button"
//           disabled={!isValid || isLoading || isSubmitting}
//         >
//           Submit
//         </Button>
//       </form>
//       <div className="text-xs mt-[20px]">
//         Don&apos;t have an account?
//         <Link href="/sign-up" className="text-sky-700 hover:underline ml-2">Sign up</Link>
//       </div>
//     </Form>
//   )
// }

// export default LoginForm;