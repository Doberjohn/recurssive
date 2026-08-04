import type { Metadata } from 'next'
import { ErrorPage } from '@/components/ErrorState'

/**
 * 404 — both the root handler for any unmatched URL and the target of every
 * `notFound()` call.
 *
 * All three content routes set `dynamicParams = false`, so an unknown slug never
 * renders at runtime; it lands here with a real 404 status rather than a 200
 * carrying an apology, which is what Google counts as a soft 404.
 *
 * A Server Component, so this page costs no client JavaScript. `error.tsx` is
 * the same layout but cannot be — see the note there.
 *
 * No canonical: pointing one at a page that does not exist is worse than
 * omitting it.
 *
 * `robots` is set even though Next already injects `noindex` for 404 responses.
 * Without it the root layout's `index, follow` is still inherited and the page
 * ships two contradictory directives. Google resolves a conflict by taking the
 * most restrictive, so this was not costing us indexation — but a 404 that also
 * says "index" is the kind of thing that surfaces in an audit as a real problem.
 * Metadata merges shallowly, so declaring `robots` here replaces the parent's
 * outright.
 */
export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <ErrorPage
      heading="404 Not found"
      description="We looked again and again but found nothing..."
    />
  )
}
