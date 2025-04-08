import { router } from "@/utils/upload";
import { createRouteHandler } from "@coordinize/storage";

export const { GET, POST } = createRouteHandler({ router });
