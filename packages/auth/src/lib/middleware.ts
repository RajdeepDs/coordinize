import { betterFetch } from "@better-fetch/fetch";
import type { OnboardingStep } from "@coordinize/database/db";
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
        cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
      },
    },
  );

  // Skip all logic for auth APIs
  if (isApiAuthRoute) return NextResponse.next();

  // -------------- User Not Authenticated ----------------
  if (!session && !isAuthRoute && !isPublicRoute) {
    return NextResponse.redirect(new URL("/private-beta", nextUrl));
  }

  // -------------- User Authenticated ----------------
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

  return NextResponse.next();
}
