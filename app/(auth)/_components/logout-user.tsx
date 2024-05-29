"use client";

import { logOut } from "@/actions/user";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
    children: React.ReactNode;
}

export default function LogoutButton({ children }: LogoutButtonProps) {
    const router = useRouter();
    const onClick = async () => {
        await logOut();
        window.location.reload();
        router.push("/");
    };

    return (
        <div onClick={onClick} className="cursor-pointer">
            {children}
        </div>
    );
};
