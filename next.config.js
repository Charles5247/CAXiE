/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Image optimisation — works correctly on Render's Node runtime.
  // Add remote hostname patterns as the site grows.
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'caxietechnologies.com' },
      { protocol: 'https', hostname: 'caxie-technologies.netlify.app' },
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
    // Keep unoptimized: false — next/image optimisation works fine on Render
    unoptimized: false,
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
