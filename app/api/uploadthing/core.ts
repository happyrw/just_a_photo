import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
    uploadImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .onUploadComplete(() => { }),
    uploadVideo: f({ video: { maxFileSize: "512GB", maxFileCount: 1 } })
        .onUploadComplete(() => { }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

// courseAttachment: f(["pdf"]) //["text", "image", "audio", "video", "pdf"]
//     .onUploadComplete(() => {}),