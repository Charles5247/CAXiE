import { NextResponse } from "next/server";

/**
 * CAXiE Technologies Ltd — Route isolation proxy
 *
 * Two Render services share this same codebase, differentiated by APP_MODE:
 *   APP_MODE=public  → serves caxietechnologies.com  (blocks /admin)
 *   APP_MODE=admin   → serves https://admin-caxie.onrender.com
 *                      (redirects / → /admin; only serves /admin,
 *                       /api/admin, and static assets)
 *
 * The Host-header check is a belt-and-braces guard for the deployed services.
 * In local dev (no APP_MODE set) both public and admin routes are accessible,
 * which is the correct dev-time behaviour.
 *
 * IMPORTANT: A 404 (not a 302) is returned when a route is blocked, because a
 * redirect confirms the route exists. A 404 does not.
 *
 * This proxy also stamps the current pathname onto an `x-pathname`
 * request header on every allowed request. RootLayout (a Server Component)
 * has no built-in way to read the current URL path, so it reads this header
 * instead to detect /admin routes and suppress the public Navbar/Footer —
 * this matters in local dev, where APP_MODE/host-based detection doesn't
 * apply (both are always localhost:3000) but the double-sidebar problem
 * still needs fixing.
 *
 * NOTE: This file replaces the deprecated `middleware.js` convention
 * (Next.js 16.3.0+). The exported function is named `proxy`.
 */

const PUBLIC_HOSTS = ["caxietechnologies.com", "www.caxietechnologies.com"];

const ADMIN_HOSTS = [
  "admin-caxie.onrender.com",
  "admin.caxietechnologies.com",
];

// Render auto-generates a hostname like <service-name>.onrender.com
// We detect the Render public service by APP_MODE rather than hostname so
// the .onrender.com preview URL also enforces the correct policy.
const APP_MODE = process.env.APP_MODE; // 'public' | 'admin' | undefined

// Static assets that must be served on BOTH services. The admin UI references
// /caxie_tech_bw.png (login logo), /preview.png (dashboard logo), /logo.png,
// /logo192.png, /favicon.ico, fonts, PDFs, etc. Without this allowlist the
// admin service (APP_MODE=admin) would 404 these files and break the UI.
const STATIC_FILE_PATTERN =
  /\.(?:png|jpe?g|gif|svg|webp|ico|jfif|avif|woff2?|ttf|otf|eot|pdf|txt|xml|css|js|json|map)$/i;

/** Builds a NextResponse.next() that carries the current pathname forward
 * on a custom request header, so downstream Server Components can read it. */
function nextWithPathname(request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") || "";
  const bareHost = host.split(":")[0].toLowerCase();

  const isAdminPath = pathname.startsWith("/admin");
  const isStaticFile = STATIC_FILE_PATTERN.test(pathname);

  // ── Mode-based enforcement (Render deployed services) ──────────────────
  if (APP_MODE === "public") {
    // Public service must never serve /admin routes
    if (isAdminPath) {
      return new NextResponse(null, { status: 404 });
    }
    return nextWithPathname(request);
  }

  if (APP_MODE === "admin") {
    // Visiting the bare admin domain (https://admin-caxie.onrender.com)
    // redirects to /admin so the root URL shows the admin console.
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    // Admin service only serves /admin, /api/admin, and static assets
    if (!isAdminPath && !pathname.startsWith("/api/admin") && !isStaticFile) {
      return new NextResponse(null, { status: 404 });
    }
    return nextWithPathname(request);
  }

  // ── Host-based enforcement (custom domain fallback) ─────────────────────
  // This catches cases where APP_MODE is not set but custom domains are live.

  if (PUBLIC_HOSTS.includes(bareHost)) {
    if (isAdminPath) {
      return new NextResponse(null, { status: 404 });
    }
  }

  if (ADMIN_HOSTS.includes(bareHost)) {
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    if (!isAdminPath && !pathname.startsWith("/api/admin") && !isStaticFile) {
      return new NextResponse(null, { status: 404 });
    }
  }

  return nextWithPathname(request);
}

export const config = {
  // Run on all routes except Next.js internals and static files
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};