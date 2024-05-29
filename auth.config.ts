// import CredentialProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"
// import { loginSchema } from "./scheemas/schemas";
// import bcrypt from 'bcryptjs';
// import { getUserByEmail } from "./datas/user";


export default {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        // CredentialProvider({
        //     async authorize(credentials) {

        //         const validatedFields = loginSchema.safeParse(credentials);
        //         if (validatedFields.success) {
        //             const { email, password } = validatedFields.data;

        //             const user = await getUserByEmail(email);
        //             if (!user || !user?.password) return null;

        //             const passwordMatch = await bcrypt.compare(password, user?.password);
        //             if (passwordMatch) {
        //                 return user;
        //             }
        //         }
        //         return null;
        //     }
        // })
    ],
    secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;