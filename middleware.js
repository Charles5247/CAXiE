import { NextResponse } from "next/server";

/**
 * CAXiE Technologies Ltd — Route isolation middleware
 *
 * Two Render services share this same codebase, differentiated by APP_MODE:
 *   APP_MODE=public  → serves caxietechnologies.com  (blocks /admin)
 *   APP_MODE=admin   → serves admin.caxietechnologies.com (only /admin)
 *
 * The Host-header check is a belt-and-braces guard for the deployed services.
 * In local dev (no APP_MODE set) both public and admin routes are accessible,
 * which is the correct dev-time behaviour.
 *
 * IMPORTANT: A 404 (not a 302) is returned when a route is blocked, because a
 * redirect confirms the route exists. A 404 does not.
 */

const PUBLIC_HOSTS = ["caxietechnologies.com", "www.caxietechnologies.com"];

const ADMIN_HOSTS = ["admin.caxietechnologies.com"];

// Render auto-generates a hostname like <service-name>.onrender.com
// We detect the Render public service by APP_MODE rather than hostname so
// the .onrender.com preview URL also enforces the correct policy.
const APP_MODE = process.env.APP_MODE; // 'public' | 'admin' | undefined

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") || "";
  const bareHost = host.split(":")[0].toLowerCase();

  const isAdminPath = pathname.startsWith("/admin");

  // ── Mode-based enforcement (Render deployed services) ──────────────────
  if (APP_MODE === "public") {
    // Public service must never serve /admin routes
    if (isAdminPath) {
      return new NextResponse(null, { status: 404 });
    }
    return NextResponse.next();
  }

  if (APP_MODE === "admin") {
    // Admin service only serves /admin and /api/admin routes
    if (!isAdminPath && !pathname.startsWith("/api/admin")) {
      return new NextResponse(null, { status: 404 });
    }
    return NextResponse.next();
  }

  // ── Host-based enforcement (custom domain fallback) ─────────────────────
  // This catches cases where APP_MODE is not set but custom domains are live.

  if (PUBLIC_HOSTS.includes(bareHost)) {
    if (isAdminPath) {
      return new NextResponse(null, { status: 404 });
    }
  }

  if (ADMIN_HOSTS.includes(bareHost)) {
    if (!isAdminPath && !pathname.startsWith("/api/admin")) {
      return new NextResponse(null, { status: 404 });
    }
  }

  return NextResponse.next();
}

export const config = {
  // Run on all routes except Next.js internals and static files
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
