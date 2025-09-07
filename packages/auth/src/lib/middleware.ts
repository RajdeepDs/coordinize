import { betterFetch } from "@better-fetch/fetch";
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
  const isOnboardingRoute = pathname.startsWith("/onboarding");
  const isWorkspaceSetupRoute = pathname === "/workspace-setup";

  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (!session) {
    return handleUnauthenticatedUser(isAuthRoute, isPublicRoute, nextUrl);
  }

  return handleAuthenticatedUser({
    session,
    pathname,
    isAuthRoute,
    isOnboardingRoute,
    isWorkspaceSetupRoute,
    nextUrl,
  });
}

function handleUnauthenticatedUser(
  isAuthRoute: boolean,
  isPublicRoute: boolean,
  nextUrl: URL
) {
  if (!(isAuthRoute || isPublicRoute)) {
    const loginUrl = new URL("/login", nextUrl);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname + nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

type AuthenticatedUserParams = {
  session: Session;
  pathname: string;
  isAuthRoute: boolean;
  isOnboardingRoute: boolean;
  isWorkspaceSetupRoute: boolean;
  nextUrl: URL;
};

function handleAuthenticatedUser({
  session,
  pathname,
  isAuthRoute,
  isOnboardingRoute,
  isWorkspaceSetupRoute,
  nextUrl,
}: AuthenticatedUserParams) {
  const { onboarded, defaultWorkspace } = session.user;

  // Handle workspace setup flow - if user doesn't have a workspace
  if (!defaultWorkspace) {
    if (isWorkspaceSetupRoute || pathname.startsWith("/invite")) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/workspace-setup", nextUrl));
  }

  // Handle onboarding flow - user has workspace but not onboarded
  if (!onboarded) {
    return handleOnboardingFlow(pathname, nextUrl);
  }

  // User is fully set up - redirect auth routes and home to their workspace
  if (
    isAuthRoute ||
    pathname === "/" ||
    isOnboardingRoute ||
    isWorkspaceSetupRoute
  ) {
    return NextResponse.redirect(new URL(`/${defaultWorkspace}`, nextUrl));
  }

  return NextResponse.next();
}

function handleOnboardingFlow(pathname: string, nextUrl: URL) {
  if (pathname.startsWith("/invite")) {
    return NextResponse.next();
  }

  if (!pathname.startsWith("/onboarding")) {
    return NextResponse.redirect(new URL("/onboarding/welcome", nextUrl));
  }

  return NextResponse.next();
}
