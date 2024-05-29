"use server"

import { db } from "@/lib/db";
import { changeUserInfoSchema, loginSchema, passwordSchema, registrationSchema, resetYouPasswordSchema } from "@/scheemas/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail, getUserById } from "@/datas/user";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { generatePasswordResetToken, generateVerificationToken } from "@/lib/generateToken";
import { sendVerificationEmail, sendPasswordResetEmail } from "@/lib/mail";
import { getPasswordResetTokenByToken, getVerificationTokenByToken } from "@/datas/tokens";
import { currentUser } from "@/lib/auth";

// export const UserRegistration = async (values: z.infer<typeof registrationSchema>) => {
//     const validatedFields = registrationSchema.safeParse(values);
//     if (!validatedFields.success) {
//         return { error: "Invalid registration" }
//     }
//     const { username, email, password } = validatedFields.data;

//     const existingUser = await getUserByEmail(email);

//     if (existingUser) {
//         return { error: "Email already exists" }
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await db.user.create({
//         data: {
//             name: username,
//             email,
//             password: hashedPassword,
//         }
//     })
//     const verificationToken = await generateVerificationToken(email);
//     await sendVerificationEmail(
//         verificationToken.email,
//         verificationToken.token,
//     )
//     return { success: "Confirmation email sent successfully" }
// }

// export const loginUser = async (values: z.infer<typeof loginSchema>) => {
//     const validatedFields = loginSchema.safeParse(values);
//     if (!validatedFields.success) {
//         return { error: "Invalid login credentials" }
//     }

//     const { email, password } = validatedFields.data;

//     const existingUser = await getUserByEmail(email);

//     if (!existingUser || !existingUser.email || !existingUser.password) {
//         return { error: "User doesn't exist" }
//     }

//     if (!existingUser?.emailVerified) {
//         const verificationToken = await generateVerificationToken(existingUser.email);
//         await sendVerificationEmail(
//             verificationToken.email,
//             verificationToken.token,
//         )
//         return { success: "Confirmation email verification sent" }
//     }

//     try {
//         await signIn("credentials", {
//             email,
//             password,
//             redirectTo: '/'
//         });
//         return { success: "Login successful" };
//     } catch (error) {
//         if (error instanceof AuthError) {
//             switch (error.type) {
//                 case "CredentialsSignin":
//                     return { error: "Invalid login credentials" }
//                 default:
//                     return { error: "Something went wrong" }
//             }
//         }
//         throw error;
//     }
// }

export const logOut = async () => {
    await signOut();
}

// export const newVerification = async (token: string) => {
//     const existingToken = await getVerificationTokenByToken(token);
//     if (!existingToken) {
//         return { error: "Token not found" };
//     }

//     const hasExpired = new Date(existingToken.expires) < new Date();
//     if (hasExpired) {
//         return { error: "Token expired" };
//     }

//     const existingUser = await getUserByEmail(existingToken.email);
//     if (!existingUser) {
//         return { error: "User not found" };
//     }

//     await db.user.update({
//         where: { id: existingUser.id },
//         data: {
//             emailVerified: new Date(),
//             email: existingToken.email,
//         },
//     });

//     await db.verificationToken.delete({
//         where: { id: existingToken.id },
//     });

//     return { success: "Email verified" };
// }

// export const verifyUserEmailToResetPassword = async (values: z.infer<typeof passwordSchema>) => {
//     try {
//         const validatedFields = passwordSchema.safeParse(values);
//         if (validatedFields.success) {
//             const { email } = validatedFields.data;
//             const existingUser = await getUserByEmail(email);
//             if (!existingUser) {
//                 return { error: "User not found" }
//             }
//             const passwordResetToken = await generatePasswordResetToken(email);
//             await sendPasswordResetEmail(
//                 passwordResetToken.email,
//                 passwordResetToken.token,
//             );
//             return { success: "Email sent successfully" }
//         }
//         return { error: "Invalid email" };
//     } catch (error) {
//         return { error: "Something went wrong" };
//     }
// }

// export const resetYourPassword = async (values: z.infer<typeof resetYouPasswordSchema>, token: string) => {
//     const validatedFields = resetYouPasswordSchema.safeParse(values);
//     if (!validatedFields.success) {
//         return { error: "Invalid fields" };
//     }
//     const { password } = validatedFields.data;

//     const existingToken = await getPasswordResetTokenByToken(token);
//     if (!existingToken) {
//         return { error: "Token not found" };
//     }

//     const hasExpired = new Date(existingToken.expires) < new Date();
//     if (hasExpired) {
//         return { error: "Token expired" };
//     }

//     const existingUser = await getUserByEmail(existingToken.email);
//     if (!existingUser) {
//         return { error: "User not found" };
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await db.user.update({
//         where: { id: existingUser.id },
//         data: {
//             password: hashedPassword,
//         },
//     });

//     await db.passwordResetToken.delete({
//         where: { id: existingToken.id },
//     });

//     return { success: "Password updated" };
// }

export const setting = async (values: z.infer<typeof changeUserInfoSchema>) => {
    const validatedFields = changeUserInfoSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields" }
    }
    const user = await currentUser();
    if (!user) {
        return { error: "Unauthorized" }
    }

    const dbUser = await getUserById(user.id);
    if (!dbUser) {
        return { error: "Unauthorized" }
    }

    if (user.isOAuth) {
        values.email = undefined;
    }

    if (values.email && values.email !== user.email) {
        if (!values.email) return undefined;

        const existingUser = await getUserByEmail(values.email);
        if (existingUser && existingUser.id !== user.id) {
            return { error: "Email already in use" };
        }

        const verificationToken = await generateVerificationToken(values.email);
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token,
        );
        return { success: "Verification email sent successfully" }
    }

    if (values.password && values.newPassword && dbUser.password) {

        const comparePassword = await bcrypt.compare(values.password, dbUser.password);
        if (!comparePassword) {
            return { error: "Incorrect password" }
        }

        const hashedPassword = await bcrypt.hash(values.newPassword, 10);
        values.password = hashedPassword;
        values.newPassword = undefined;
    }

    console.log(values);

    await db.user.update({
        where: {
            id: dbUser.id,
        },
        data: {
            ...values,
        }
    })
    return { success: "User updated" }
} 