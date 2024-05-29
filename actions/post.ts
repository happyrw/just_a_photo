"use server"

import * as z from "zod"
import { postSchema, titleSchema } from "@/scheemas/schemas"
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export const viewIncrement = async (postId: string) => {
    const post = await db.post.findFirst({
        where: {
            id: postId,
        },
        include: {
            images: true,
            videos: true,
        }
    });
    if (!post) {
        return { error: "Post not found" }
    };

    const increaseView = await db.post.update({
        where: {
            id: postId,
        },
        data: {
            viewCount: {
                increment: 1,
            }
        }
    });
    return increaseView;
}

export const titleCreation = async (values: z.infer<typeof titleSchema>) => {
    const validatedFields = titleSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields" }
    }

    const user = await currentUser();
    if (!user) {
        return { error: "Unauthorized" }
    }

    const post = await db.post.create({
        data: {
            title: values.title,
            userId: user.id,
        }
    })

    return { success: "Title created", post }
}

export const createPost = async (values: z.infer<typeof postSchema>) => {
    const validatedFields = postSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    }

    const { postId, title, description, image, categoryId } = values;
    if (!postId || !title || !description || !image || !categoryId) return { error: "Missing title or description" };

    try {
        const existingPost = await db.post.findFirst({
            where: { id: postId },
            include: { images: true }
        });

        if (!existingPost) {
            return { error: "Post not found" };
        }

        // Update or create image
        if (existingPost.images.length > 0) {
            await db.image.update({
                where: { id: existingPost.images[0].id },
                data: { url: image }
            });
        } else {
            await db.image.create({
                data: {
                    url: image,
                    postId: postId
                }
            });
        }

        const updatedPost = await db.post.update({
            where: {
                id: postId
            },
            data: {
                contentType: 'IMAGE',
                title,
                description,
                categoryId,
                published: true,
            },
            include: {
                images: true
            }
        });

        return { success: "Post updated", post: updatedPost };
    } catch (error) {
        console.error(error);
        return { error: "Failed to update post" };
    }
}

export const createPostWithVideo = async (values: z.infer<typeof postSchema>) => {
    const validatedFields = postSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    }

    const { postId, title, description, image, categoryId } = values;
    if (!postId || !title || !description || !image || !categoryId) return { error: "Missing title or description" };

    try {
        const existingPost = await db.post.findUnique({
            where: { id: postId },
            include: { videos: true }
        });

        if (!existingPost) {
            return { error: "Post not found" };
        }

        // Update or create video
        if (existingPost.videos.length > 0) {
            await db.video.update({
                where: { id: existingPost.videos[0].id },
                data: { url: image }
            });
        } else {
            await db.video.create({
                data: {
                    url: image,
                    postId: postId
                }
            });
        }

        const updatedPost = await db.post.update({
            where: {
                id: postId
            },
            data: {
                contentType: 'VIDEO',
                title,
                description,
                categoryId,
                published: true,
            },
            include: {
                videos: true
            }
        });

        console.log(updatedPost);

        return { success: "Post updated", post: updatedPost };
    } catch (error) {
        console.error(error);
        return { error: "Failed to update post" };
    }
}

export const deletePost = async (id: string) => {
    const user = await currentUser();
    if (!user) return { error: "Unauthorized", status: 401 };

    const postOwner = await db.post.findFirst({
        where: {
            id,
            userId: user.id,
        }
    });
    if (!postOwner) return { error: "Unauthorized", status: 401 };

    await db.post.delete({
        where: {
            id,
        }
    });

    return { success: true, status: 200 };
}

