import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const publicRoutes = ["/", "/auth/sign-in", "/auth/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const isPublicRoute =
    publicRoutes.includes(pathname) || pathname.startsWith("/auth");

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!isPublicRoute && !session) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  if (session && isPublicRoute) {
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
