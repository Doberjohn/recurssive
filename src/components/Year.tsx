'use client'

import { useSyncExternalStore } from 'react'

/**
 * The copyright year.
 *
 * `new Date().getFullYear()` in a server component is evaluated once, at build,
 * and then frozen into the prerendered HTML — so a site that does not ship
 * between December and January serves last year's copyright. Same failure mode
 * as the hardcoded clock, just slower to show up.
 *
 * `useSyncExternalStore` rather than an effect: this is the case it exists for,
 * a value that legitimately differs between server and client. It takes a
 * separate server snapshot, so the prerender and the hydration render agree and
 * React swaps in the client value itself — no mismatch, and no setState in an
 * effect body (which the React compiler rightly flags as a cascading render).
 *
 * The build year still renders on the server, which keeps it correct for
 * crawlers and with JS off, and wrong only between New Year and the next deploy.
 *
 * The year cannot change while the page is open in any way worth handling, so
 * `subscribe` is a no-op. It is defined at module scope because
 * `useSyncExternalStore` requires a stable reference; an inline arrow would
 * resubscribe on every render.
 */

const subscribe = () => () => {}

/** Stable across a session, so React's Object.is check on the snapshot holds. */
const currentYear = () => new Date().getFullYear()

export function Year({ fallback }: { fallback: number }) {
  const year = useSyncExternalStore(subscribe, currentYear, () => fallback)
  return <>{year}</>
}
