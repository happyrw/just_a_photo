import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { NextResponse, type NextRequest } from "next/server";

const authRoutes = [
    "/sign-in", "/sign-up",
]

const protectedRoutes = [
    '/setting/profile',
    '/post/posts',
    '/post/posts/create',
]

const { auth } = NextAuth(authConfig)

export default auth((request: NextRequest) => {
    const isLoggedIn = !!(request as any).auth;
    console.log("isLoggedIn", isLoggedIn);

    const isAuthRoutes = authRoutes.includes(request.nextUrl.pathname);
    const isProtectedRoutes = protectedRoutes.includes(request.nextUrl.pathname);

    if (isAuthRoutes) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL("/", request.url));
        }
        return NextResponse.next();
    }

    if (isProtectedRoutes) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/", request.url));
        }
        return NextResponse.next();
    }
    return NextResponse.next();
})

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
}