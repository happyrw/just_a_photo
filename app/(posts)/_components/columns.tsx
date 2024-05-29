"use client";

import { deletePost } from "@/actions/post";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ConfirmModal } from "@/models/confirm-models";
import { Post } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2, MoreHorizontal, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EditCellProps {
    id: string;
    published: boolean;
}

const EditCell: React.FC<EditCellProps> = ({ id, published }) => {
    const href = published ? `/post/posts/edit/${id}` : `/post/posts/create/${id}`;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <Link href={href}>
                    <DropdownMenuItem>
                        Edit
                    </DropdownMenuItem>
                </Link>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

interface DeleteCellProps {
    id: string;
}

const DeleteCell: React.FC<DeleteCellProps> = ({ id }) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        try {
            setIsLoading(true);
            await deletePost(id);
            router.refresh();
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    return (
        <ConfirmModal onConfirm={handleDelete}>
            <Button variant="destructive">
                {isLoading ? (
                    <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
                ) : (
                    <>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                    </>
                )}
            </Button>
        </ConfirmModal>
    );
};

export const columns: ColumnDef<Post>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "published",
        header: "Published",
    },
    {
        accessorKey: "contentType",
        header: "Content Type",
    },
    {
        id: "editActions",
        cell: ({ row }) => <EditCell id={row.original.id} published={row.original.published} />,
    },
    {
        id: "deleteActions",
        cell: ({ row }) => <DeleteCell id={row.original.id} />,
    },
];
