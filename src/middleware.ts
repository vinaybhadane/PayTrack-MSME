import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const sessionCookie = request.cookies.get("paytrack_session")?.value;

  // Validate session structure
  let isAuthenticated = false;
  if (sessionCookie) {
    try {
      const decoded = JSON.parse(Buffer.from(sessionCookie, "base64").toString("utf-8"));
      if (decoded && decoded.uid && (!decoded.expiresAt || decoded.expiresAt > Date.now())) {
        isAuthenticated = true;
      }
    } catch {
      isAuthenticated = false;
    }
  }

  // 1. If accessing protected routes without session, redirect to /login
  if (pathname.startsWith("/dashboard")) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      const redirectPath = pathname + search;
      if (redirectPath !== "/dashboard") {
        loginUrl.searchParams.set("redirect", redirectPath);
      }
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. If already logged in and visiting login or signup, redirect to /dashboard
  if ((pathname === "/login" || pathname === "/signup") && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
