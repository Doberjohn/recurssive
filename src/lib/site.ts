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
  phone: '+30 698 950 2436',
  locale: 'en',
} as const

/** Every indexable route. Drives sitemap.ts; extend as pages land. */
export const routes = [
  '/',
  '/about',
  '/cases',
  '/capabilities',
  '/blog',
  '/contact',
  '/privacy-policy',
  '/terms-of-service',
] as const
