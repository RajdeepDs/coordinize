import { betterFetch } from "@better-fetch/fetch";
import { type NextRequest, NextResponse } from "next/server";
import type { auth } from "../auth";

type Session = typeof auth.$Infer.Session;

const authPages: string[] = [
  "/private-beta",
  "/sign-up",
  "/join-waitlist",
] as const;

export async function authMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow access to authentication-related pages
  if (authPages.some((page) => pathname.includes(page))) {
    return NextResponse.next();
  }

  // Exclude auth API routes (especially /api/auth/get-session) from the middleware logic
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Fetch session only if it's NOT an excluded route
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  // If no session, redirect to private-beta
  if (!session) {
    return NextResponse.redirect(new URL("/private-beta", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|static|public|private-beta|auth/get-session|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(?!/auth/get-session)(.*)",
  ],
};
