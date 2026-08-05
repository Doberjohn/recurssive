/**
 * Single source of truth for site-wide constants.
 *
 * The canonical URL shape is decided here once and enforced everywhere:
 * https, non-www, no trailing slash. Changing it later means redirects, so it
 * is deliberately not configurable per-page.
 */

const PRODUCTION_URL = 'https://recurssive.com'

/**
 * Absolute origin for this deployment.
 * Preview builds resolve to their own Vercel URL so OG images and canonicals
 * point at the deployment being reviewed rather than production.
 */
export const siteUrl: string = (() => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  if (process.env.VERCEL_ENV === 'production') return PRODUCTION_URL
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'http://localhost:3000'
})()

export const site = {
  name: 'Recurssive',
  /** Locked on deck p27. Not "Omnics Digital Agency" — that is the designer's credit. */
  descriptor: 'Visionary Web & App Studio',
  /** Deck p13, verbatim. */
  description:
    'Recurssive is a visionary web and app studio crafting custom web & app experiences that help people.',
  tagline: 'Feel. Form. Function.',
  email: 'info@recurssive.com',
  supportEmail: 'support@recurssive.com',
  phone: '+30 698 950 2436',
  locale: 'en',
} as const

/**
 * Every indexable route. Drives sitemap.ts; extend as pages land.
 *
 * /about, /cases, /capabilities and /blog are NOT here yet. They now exist and
 * return 200 instead of 404, but they are empty, and an empty page in a sitemap
 * is a soft 404 — a worse signal than the hard 404 it replaced, because it asks
 * to be indexed and then offers nothing. They carry `noIndex: true` to match.
 *
 * Uncomment each line as that page gets real content, and drop `noIndex` from
 * the matching page.tsx in the same commit. The two must move together: a route
 * in the sitemap that serves `noindex` is the contradiction the 404 page shipped
 * before, and it is invisible until someone reads the headers.
 */
export const routes = [
  '/',
  // '/about',
  // '/cases',
  // '/capabilities',
  // '/blog',
  '/contact',
  '/privacy-policy',
  '/terms-of-service',
] as const
