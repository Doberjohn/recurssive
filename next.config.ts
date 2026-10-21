import type { NextConfig } from 'next'

/**
 * Static security headers.
 *
 * Deliberately no Content-Security-Policy here. The only clean strict-CSP path
 * for a fully prerendered Next site is a build step emitting per-route script
 * hashes — a nonce-based middleware would force every route dynamic, which
 * defeats the entire rendering strategy. Tracked as an open decision.
 */
const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // The "N" badge `next dev` draws bottom-left. Dev-only either way — it never
  // ships — but it sat over the page during review. Compile and runtime errors
  // still surface without it.
  devIndicators: false,

  // Every route in this site is prerenderable, so Cache Components stays off.
  // It inverts the default to dynamic and would force opting everything back
  // in via `use cache` for no gain here. Revisit at Next 17.
  // cacheComponents: false  (the default)

  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default nextConfig
