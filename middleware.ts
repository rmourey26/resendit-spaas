import type { NextRequest } from "next/server"
import { updateSession } from "./utils/supabase/middleware"

export async function middleware(request: NextRequest) {
  // Check if the route should be publicly accessible
  const isPublicRoute =
    request.nextUrl.pathname.startsWith("/p/") ||
    request.nextUrl.pathname.startsWith("/api/check-profile") ||
    request.nextUrl.pathname.startsWith("/api/debug-profile") ||
    request.nextUrl.pathname.startsWith("/api/fix-profiles") ||
    request.nextUrl.pathname.startsWith("/api/fix-specific-profile") ||
    request.nextUrl.pathname === "/test-public-card" ||
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname === "/signup" ||
    request.nextUrl.pathname === "/forgot-password" ||
    request.nextUrl.pathname === "/reset-password" ||
    request.nextUrl.pathname === "/about" ||
    request.nextUrl.pathname === "/api-docs" ||
    request.nextUrl.pathname === "/demo" ||
    request.nextUrl.pathname.startsWith("/track/") ||
    request.nextUrl.pathname.startsWith("/auth/") ||
    request.nextUrl.pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js)$/)

  // If it's a public route, allow access without authentication
  if (isPublicRoute) {
    return await updateSession(request)
  }

  // For protected routes, updateSession will handle authentication and redirects
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
