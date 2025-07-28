import { betterFetch } from '@better-fetch/fetch';
import type { OnboardingStep } from '@coordinize/database/db';
import { type NextRequest, NextResponse } from 'next/server';
import type { auth } from '../auth';
import { apiAuthPrefix, authRoutes, publicRoutes } from './routes';

type Session = typeof auth.$Infer.Session;

export async function authMiddleware(request: NextRequest) {
  const { nextUrl } = request;

  const pathname = nextUrl.pathname;
  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);
  const isOnboardingRoute = pathname.startsWith('/getting-started');

  const { data: session } = await betterFetch<Session>(
    '/api/auth/get-session',
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    }
  );

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (!session) {
    return handleUnauthenticatedUser(isAuthRoute, isPublicRoute, nextUrl);
  }

  return handleAuthenticatedUser(
    session,
    pathname,
    isAuthRoute,
    isOnboardingRoute,
    nextUrl
  );
}

function handleUnauthenticatedUser(
  isAuthRoute: boolean,
  isPublicRoute: boolean,
  nextUrl: URL
) {
  if (!(isAuthRoute || isPublicRoute)) {
    const loginUrl = new URL('/login', nextUrl);
    loginUrl.searchParams.set('callbackUrl', nextUrl.pathname + nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

function handleAuthenticatedUser(
  session: Session,
  pathname: string,
  isAuthRoute: boolean,
  isOnboardingRoute: boolean,
  nextUrl: URL
) {
  const { onboarded, onboardingStep, defaultWorkspace } = session.user;

  if (!onboarded) {
    return handleOnboardingFlow(pathname, onboardingStep, nextUrl);
  }

  if (isAuthRoute || pathname === '/' || isOnboardingRoute) {
    return NextResponse.redirect(
      new URL(`/${defaultWorkspace || 'login'}`, nextUrl)
    );
  }

  return NextResponse.next();
}

function handleOnboardingFlow(
  pathname: string,
  onboardingStep: string,
  nextUrl: URL
) {
  if (pathname.startsWith('/invite')) {
    return NextResponse.next();
  }

  const onboardingRouteMap: Record<OnboardingStep, string> = {
    WELCOME: 'welcome',
    WORKSPACE_SETUP: 'workspace-setup',
    PREFERENCES: 'preferences',
  };

  const currentStepPath = `/getting-started/${onboardingRouteMap[onboardingStep as OnboardingStep]}`;

  if (!pathname.startsWith(currentStepPath)) {
    return NextResponse.redirect(new URL(currentStepPath, nextUrl));
  }

  return NextResponse.next();
}
