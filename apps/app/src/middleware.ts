import type { NextRequest } from "next/server";

import { authMiddleware } from "@coordinize/auth/middleware";

export async function middleware(request: NextRequest) {
  const authResponse = await authMiddleware(request);
  return authResponse;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
