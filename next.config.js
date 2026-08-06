/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Image optimisation — works correctly on Render's Node runtime.
  // .jfif carousel images are served with unoptimized={true} per-image in
  // HeroCarousel.jsx which bypasses the optimizer for those files. The
  // remotePatterns below cover external Supabase and CDN images.
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'caxietechnologies.com' },
      { protocol: 'https', hostname: 'caxie-technologies.netlify.app' },
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
    // Keep unoptimized: false — next/image optimisation works fine on Render.
    // Carousel jfif images use the per-image unoptimized prop instead.
    unoptimized: false,
    // Declare allowed dangerouslyAllowSVG and supported image formats
    dangerouslyAllowSVG: false,
    // Allow serving static .jfif files directly (they bypass the optimizer via
    // the unoptimized prop on each <Image> but this makes the intent explicit)
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Security headers — applied to every route including admin
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
      // Extra noindex on all admin routes at the HTTP header level (belt + braces)
      {
        source: '/admin/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow, nosnippet, noarchive' },
        ],
      },
      // Same for API routes — no public discovery
      {
        source: '/api/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
    ];
  },

  // Redirect legacy .html URLs from the old CRA site
  async redirects() {
    return [
      { source: '/privacy.html', destination: '/privacy', permanent: true },
      { source: '/terms.html', destination: '/terms', permanent: true },
      { source: '/cookies.html', destination: '/cookies', permanent: true },
      { source: '/do-not-sell.html', destination: '/do-not-sell', permanent: true },
    ];
  },
};

module.exports = nextConfig;
