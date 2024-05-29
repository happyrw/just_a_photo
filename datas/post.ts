"use server"

import { db } from "@/lib/db";

export const getRelatedPosts = async ({ categoryId, postId }: { categoryId: string, postId?: string }) => {
    const items = await db.post.findMany({
        where: {
            categoryId: categoryId,
            NOT: postId ? { id: postId } : undefined,
        },
        include: {
            images: true,
            videos: true,
        },
        take: 6 // Limit the number of related items to 6, adjust as needed
    });

    return items;
}

export const getSinglePost = async (postId: string) => {
    const post = await db.post.findFirst({
        where: {
            id: postId,
        },
        include: {
            images: true,
            videos: true,
            category: true,
        },
    });

    return post;
}

export const getAllPosts = async ({ title, categoryId }: { title?: string; categoryId?: string }) => {
    const posts = await db.post.findMany({
        where: {
            published: true,
            title: {
                contains: title,
            },
            categoryId,
        },
        include: {
            images: true,
            videos: true,
            category: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return posts;
}

export const getAllImagePosts = async ({ title, categoryId }: { title?: string; categoryId?: string }) => {
    const posts = await db.post.findMany({
        where: {
            published: true,
            title: {
                contains: title,
            },
            categoryId,
            contentType: 'IMAGE',
        },
        include: {
            images: true,
            videos: true,
            category: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return posts;
}

export const getAllVideoPosts = async ({ title, categoryId }: { title?: string; categoryId?: string }) => {
    const posts = await db.post.findMany({
        where: {
            published: true,
            title: {
                contains: title,
            },
            categoryId,
            contentType: 'VIDEO',
        },
        include: {
            images: true,
            videos: true,
            category: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return posts;
}

export const getPostToCreateById = async (id: string, userId: string) => {
    try {
        const post = await db.post.findFirst({
            where: {
                id,
                userId,
            },
            include: {
                images: true,
                videos: true,
                user: true
            }
        })

        return post;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getPostToUpdateById = async (id: string, userId: string) => {
    try {
        const post = await db.post.findFirst({
            where: {
                id,
                userId,
            },
            include: {
                images: true,
                videos: true,
                user: true
            }
        })

        return post;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getCategories = async () => {
    try {
        const categories = await db.category.findMany({
            orderBy: {
                name: "asc"
            }
        });
        return categories;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getUserPosts = async (userId: string) => {
    try {
        const posts = await db.post.findMany({
            where: { userId: userId },
        });
        return posts;
    } catch (error) {
        console.log(error);
    }
}