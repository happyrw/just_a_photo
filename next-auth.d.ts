import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    id: string;
    isOAuth: boolean;
    // role: UserRole
};

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}