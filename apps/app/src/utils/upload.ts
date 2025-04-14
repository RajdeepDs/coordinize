import { auth } from "@coordinize/auth/auth";
import { type FileRouter, UploadError, storage } from "@coordinize/storage";
import { headers } from "next/headers";

export const router: FileRouter = {
  imageUploader: storage({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      if (!session) {
        throw new UploadError("Unauthorized");
      }

      return { userId: session.user.id };
    })
    .onUploadComplete(({ metadata, file }) => ({
      uploadedBy: metadata.userId,
      fileUrl: file.ufsUrl,
    })),
};
