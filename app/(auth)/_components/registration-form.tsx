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
// // import { UserRegistration } from "@/actions/user"
// import { useState } from "react"
// import { registrationSchema } from "@/scheemas/schemas"
// import Link from "next/link"
// import { UserRegistration } from "@/actions/user"

// const RegistrationForm = () => {
//   const [error, setError] = useState<string | undefined>('');
//   const [success, setSuccess] = useState<string | undefined>('');
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

//   const form = useForm<z.infer<typeof registrationSchema>>({
//     resolver: zodResolver(registrationSchema),
//     defaultValues: {
//       username: "",
//       email: "",
//       password: "",
//     },
//   })

//   const { isValid, isLoading } = form.formState;

//   const onSubmit = async (values: z.infer<typeof registrationSchema>) => {
//     setError('');
//     setSuccess('');
//     try {
//       setIsSubmitting(true);
//       const data = await UserRegistration(values);
//       setError(data?.error);
//       setSuccess(data?.success);
//       setIsSubmitting(false);
//     } catch (error) {
//       console.log(error);
//       setIsSubmitting(false);
//     }
//   }

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="space-y-4 mt-[30px]"
//       >
//         <FormField
//           control={form.control}
//           name="username"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>
//                 Username
//               </FormLabel>
//               <FormControl>
//                 <Input
//                   type="text"
//                   placeholder="Enter your username"
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
//                 Password
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
//         Already have an account?
//         <Link href="/sign-in" className="text-sky-700 hover:underline ml-2">Sign in</Link>
//       </div>
//     </Form>
//   )
// }

// export default RegistrationForm;