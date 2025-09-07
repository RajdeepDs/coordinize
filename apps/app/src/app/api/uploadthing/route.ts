import { createRouteHandler } from "@coordinize/storage";
import { router } from "@/utils/upload";

export const { GET, POST } = createRouteHandler({ router });
