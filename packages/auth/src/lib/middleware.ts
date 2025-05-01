import { betterFetch } from "@better-fetch/fetch";
import type { OnboardingStep } from "@coordinize/database/db"; // Make sure this import works
import { type NextRequest, NextResponse } from "next/server";
import type { auth } from "../auth";
import { apiAuthPrefix, authRoutes, publicRoutes } from "./routes";

type Session = typeof auth.$Infer.Session;

export async function authMiddleware(request: NextRequest) {
  const { nextUrl } = request;

  const pathname = nextUrl.pathname;
  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);
  const isOnboardingRoute = pathname.startsWith("/getting-started");

  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  // Skip all logic for auth APIs
  if (isApiAuthRoute) return NextResponse.next();

  // ---------- USER IS LOGGED IN ----------
  if (session) {
    const { onboarded, onboardingStep, defaultWorkspace } = session.user;

    if (!onboarded) {
      const onboardingRouteMap: Record<OnboardingStep, string> = {
        WELCOME: "welcome",
        WORKSPACE_SETUP: "workspace-setup",
        PREFERENCES: "preferences",
      };

      const currentStepPath = `/getting-started/${onboardingRouteMap[onboardingStep as OnboardingStep]}`;

      if (!pathname.startsWith(currentStepPath)) {
        return NextResponse.redirect(new URL(currentStepPath, nextUrl));
      }

      return NextResponse.next();
    }

    // ✅ If user is onboarded and on an auth route → redirect to their default workspace
    if (isAuthRoute || pathname === "/" || isOnboardingRoute) {
      return NextResponse.redirect(
        new URL(`/${defaultWorkspace || "private-beta"}`, nextUrl),
      );
    }

    // Proceed normally otherwise
    return NextResponse.next();
  }

  // ---------- 🕵️ USER NOT LOGGED IN ----------
  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL("/private-beta", nextUrl));
  }

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
