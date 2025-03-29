import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "../auth";

const authPages: string[] = ["/sign-in", "/sign-up"] as const;

export async function authMiddleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // If on auth pages, always proceed
  if (authPages.some((page) => request.nextUrl.pathname.includes(page))) {
    return NextResponse.next();
  }

  // If no session, redirect to sign-in
  if (!session) {
    const signInUrl = new URL("/sign-in", request.url);
    return NextResponse.redirect(signInUrl);
  }

  // User is authenticated, proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|static|public|sign-in|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
