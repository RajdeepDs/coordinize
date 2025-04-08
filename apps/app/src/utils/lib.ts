import { env } from "@/env";
import { generateReactHelpers } from "@coordinize/storage/client";
import type { router } from "./upload";

export const WEB_URL: string = env.NEXT_PUBLIC_WEB_URL;

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<typeof router>();
