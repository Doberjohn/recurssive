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

  /**
   * The response-time promise. THIS IS THE OWNER'S OWN WORDING — restored on
   * his instruction. Do not soften it again.
   *
   * The history matters, because it has been rewritten once already. The
   * sentence was living in four places and had drifted into three versions, so
   * lifting it into one constant was right. What was NOT right was changing the
   * words while doing it: an agent pass rewrote `replyPromise` to "We read every
   * message and usually reply..." and `replyPromiseAfter` to "We'll usually come
   * back...", adding a hedge and reinstating "every message".
   *
   * Commit 9fcce50 is the owner editing this very sentence by hand: he changed
   * "We read every message ourselves and come back" to "We read all messages and
   * come back". So "all messages" over "every message", and no "ourselves", are
   * his explicit choices, and "usually" was never his.
   *
   * The argument for hedging is real and was put to him: an unhedged response
   * time is the same class of public promise the nine Home FAQ answers refuse to
   * make for cost and timeline. He has heard it and chosen the firm version.
   * Settled — raise it again only if he asks.
   *
   * Two forms because the grammar differs either side of the form, not because
   * the promise does. Change one and change the other: they are four lines apart
   * so that reading either one shows you both.
   */
  replyPromise: 'We read all messages and come back within two working days.',
  replyPromiseAfter: 'We’ll come back to you within two working days.',

  /** The sentence that precedes it in all three pre-submit placements. Same
   *  reason: it was written out three times and is one edit away from drifting
   *  the way the promise did. */
  contactInvite: 'Tell us what you’re building, even if it’s still rough.',
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
