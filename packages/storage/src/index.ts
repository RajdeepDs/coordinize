import { createUploadthing } from "uploadthing/next";

export { type FileRouter, createRouteHandler } from "uploadthing/next";
export {
  UploadThingError as UploadError,
  extractRouterConfig,
} from "uploadthing/server";

export const storage = createUploadthing();
