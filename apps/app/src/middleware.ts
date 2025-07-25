import { authMiddleware } from '@coordinize/auth/middleware';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const authResponse = await authMiddleware(
    request as unknown as Parameters<typeof authMiddleware>[0]
  );
  return authResponse;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
