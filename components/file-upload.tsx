"use client";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadButton } from "@/lib/uploadthing";

interface UploadButtonProps {
    endPoint: keyof typeof ourFileRouter;
    onChange: (url?: string) => void;
}

const FileUpload = ({ endPoint, onChange }: UploadButtonProps) => {
    return (
        <UploadButton
            endpoint={endPoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url)
            }}
            onUploadError={(error: Error) => {
                return { error: error.message }
            }}
        />
    );
}

export default FileUpload;