import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Routes that are always public (no auth required)
const publicRoutes = ["/", "/auth/sign-in", "/auth/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for API routes and static files
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if route is public
  const isPublicRoute =
    publicRoutes.includes(pathname) || pathname.startsWith("/auth");

  // Get session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // If NOT a public route and no session, redirect to sign-in
  if (!isPublicRoute && !session) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  // If logged in and trying to access auth pages or homepage, redirect to feed
  if (session && (pathname.startsWith("/auth") || pathname === "/")) {
    return NextResponse.redirect(new URL("/feed", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
