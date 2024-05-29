import NextAuth from "next-auth"
import authConfig from "./auth.config"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import { getUserById } from "./datas/user"
import { getAccountByUserId } from "./datas/account"

export const { auth, handlers, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/sign-in",
        error: "/error",
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            })
        }
    },
    callbacks: {
        async signIn({ account, user }) {
            if (account?.provider !== "credentials") return true;
            const existingUser = await getUserById(user?.id!);

            if (!existingUser?.emailVerified) return false;
            return true;
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (session.user) {
                session.user.name = token.name,
                    session.user.email = token.email as string,
                    session.user.isOAuth = token.isOAuth as boolean,
                    session.user.image = token.image as string
            }
            return session
        },
        async jwt({ token }) {
            if (!token.sub) return token;
            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;
            const existingAccount = await getAccountByUserId(existingUser.id);

            token.isOAuth = !!existingAccount;
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.image = existingUser.image;
            return token
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})