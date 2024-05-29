"use client";

import LogoutButton from "@/app/(auth)/_components/logout-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";


const UserButton = () => {

    const user = useCurrentUser();

    return (
        <> <div className="flex sm:hidden">
            {user ? (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar className="w-[25px] h-[25px]">
                            <AvatarImage src={user?.image || ""} />
                            <AvatarFallback className="bg-sky-500">
                                <FaUser className="text-white" />
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <div className="flex flex-col sm:text-">
                            {user && (
                                <Link href='/setting/profile'>
                                    <DropdownMenuItem className="hover:bg-slate-300 cursor-pointer">Profile</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                </Link>
                            )}
                        </div>
                        {user && (
                            <LogoutButton>
                                <DropdownMenuItem className="cursor-pointer">
                                    <IoExitOutline className="h-4 w-4 mr-2" />
                                    Logout
                                </DropdownMenuItem>
                            </LogoutButton>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Link href="/sign-in">
                    <Avatar>
                        <AvatarFallback className="bg-sky-500">
                            <FaUser className="text-white" />
                        </AvatarFallback>
                    </Avatar>
                </Link>
            )}
        </div>
            <div className="hidden sm:flex">
                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src={user?.image || ""} />
                                <AvatarFallback className="bg-sky-500">
                                    <FaUser className="text-white" />
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <div className="flex flex-col sm:text-">
                                {user && (
                                    <Link href='/setting/profile'>
                                        <DropdownMenuItem className="hover:bg-slate-300 cursor-pointer">Profile</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                    </Link>
                                )}
                            </div>
                            {user && (
                                <LogoutButton>
                                    <DropdownMenuItem className="cursor-pointer">
                                        <IoExitOutline className="h-4 w-4 mr-2" />
                                        Logout
                                    </DropdownMenuItem>
                                </LogoutButton>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Link href="/sign-in">
                        <Avatar>
                            <AvatarFallback className="bg-sky-500">
                                <FaUser className="text-white" />
                            </AvatarFallback>
                        </Avatar>
                    </Link>
                )}
            </div></>
    )
}

export default UserButton;