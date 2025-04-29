import { betterFetch } from "@better-fetch/fetch";
import { type NextRequest, NextResponse } from "next/server";
import type { auth } from "../auth";
import { apiAuthPrefix, authRoutes, publicRoutes } from "./routes";

type Session = typeof auth.$Infer.Session;

/**
 * Middleware function to handle authentication and routing logic
 * @param request - The incoming Next.js request object
 * @returns NextResponse object with appropriate routing/redirect
 */
export async function authMiddleware(request: NextRequest) {
  const { nextUrl } = request;

  // Determine route types based on pathname
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  // Allow API authentication routes to proceed without interference
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // Handle authentication routes (private-beta, sign-up, etc.)
  if (isAuthRoute) {
    // If user is already authenticated, redirect to their default workspace
    if (session) {
      // Redirect to welcome page if user is not onboarded
      if (!session.user.onboarded) {
        return NextResponse.redirect(
          new URL("/getting-started/welcome", nextUrl),
        );
      }
      const defaultWorkspace = session?.user.defaultWorkspace ?? "private-beta";
      return NextResponse.redirect(new URL(`/${defaultWorkspace}`, nextUrl));
    }

    // Allow unauthenticated users to access auth routes
    return NextResponse.next();
  }

  // Redirect unauthenticated users to private-beta page for protected routes
  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL("/private-beta", nextUrl));
  }

  // Allow request to proceed for authenticated users or public routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except static assets, public routes, and specific paths
    "/((?!_next|static|public|private-beta|auth/get-session|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Match API and tRPC routes except auth/get-session
    "/(api|trpc)(?!/auth/get-session)(.*)",
  ],
};
