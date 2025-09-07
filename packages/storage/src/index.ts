import { createUploadthing } from "uploadthing/next";

export { createRouteHandler, type FileRouter } from "uploadthing/next";
export {
  extractRouterConfig,
  UploadThingError as UploadError,
} from "uploadthing/server";

export const storage = createUploadthing();
