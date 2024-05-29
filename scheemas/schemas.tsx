import * as z from 'zod';

export const registrationSchema = z.object({
  username: z.string().min(2, { message: "Username is required.", }),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(2, { message: "Password is required.", }),
})

export const loginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(2, { message: "Password is required.", }),
})

export const passwordSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
})

export const resetYouPasswordSchema = z.object({
  password: z.string().min(2, { message: "Password is required" }),
})

export const changeUserInfoSchema = z.object({
  name: z.string().min(2, { message: "Username is required.", }),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(2)),
  newPassword: z.optional(z.string().min(2)),
  image: z.optional(z.string().min(1)),
})
  .refine((data) => {
    if (data.password && !data.newPassword) {
      return false;
    }
    return true;
  }, { message: "New password is required", path: ["newPassword"] })
  .refine((data) => {
    if (!data.password && data.newPassword) {
      return false;
    }
    return true;
  }, { message: "Password is required", path: ["password"] })


export const postSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(2),
  image: z.string().min(2).optional(),
  categoryId: z.string().min(1),
  postId: z.string().min(1)
});

export const titleSchema = z.object({
  title: z.string().min(5),
});