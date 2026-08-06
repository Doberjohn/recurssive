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
 *
 * /cases goes further: it is also UNLINKED. Not being in this list only keeps a
 * page out of the sitemap — it says nothing about the nav, the footer, or a
 * cross-link from another page, and those are how a crawler actually finds
 * things. Five things had to move together, and all five move back together
 * when there is real work to show:
 *
 *   1. `navLinks` in components/Nav.tsx        (desktop nav + mobile drawer)
 *   2. `contents` in components/Footer.tsx     (Contents column)
 *   3. "Related work" in capabilities/[slug]   (the reverse-reference section)
 *   4. `'cases'` in app/sitemap.ts             (the detail routes)
 *   5. `noIndex` on BOTH cases/page.tsx and cases/[slug]/page.tsx
 *
 * (3) and (5) are the ones that are easy to miss. The capability detail pages
 * are themselves indexed, so their "Related work" list was a live crawl path
 * into /cases; and /cases/[slug] was indexable AND sitemapped while the index
 * above it was already noIndex, which made the section's one placeholder study
 * its most discoverable page. robots.ts explains why none of this is a
 * `Disallow`.
 *
 * The routes still return 200 on a direct URL. That is intentional — the pages
 * are live design work and scripts/check-overflow.mjs still measures them.
 */
export const routes = [
  '/',
  // '/about',
  // '/cases',      // unlinked too — see the 5-point checklist in the note above
  // '/capabilities',
  // '/blog',
  '/contact',
  '/privacy-policy',
  '/terms-of-service',
] as const
