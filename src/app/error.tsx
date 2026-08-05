'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import { NoticePage } from '@/components/NoticePage'

/**
 * The generic error state, for anything that throws while rendering a route.
 *
 * `'use client'` is a framework requirement, not a consequence of what is in
 * here. `error.js` *is* a React error boundary, and boundaries are built on
 * `getDerivedStateFromError` / `componentDidCatch` — lifecycle that runs in the
 * browser when a render throws. A Server Component never executes there, so it
 * cannot catch one. See node_modules/next/dist/docs/01-app/03-api-reference/
 * 03-file-conventions/error.md:21.
 *
 * The file therefore contains nothing but static JSX and one effect. The design
 * draws this as "500 Server error" with a "Refresh page" action; on the owner's
 * instruction it is generic and shares the 404's "Go back to home", since this
 * boundary catches client render errors too, where "500" would be a lie.
 *
 * The heading is placeholder copy pending the owner's wording. The body is the
 * frame's own line, verbatim.
 *
 * Deliberately no `unstable_retry()` button: retrying is what the browser's
 * reload already does, and the design gives this page one control, not two.
 * (`reset()` would have been the wrong one anyway — it re-renders without
 * re-fetching, so it cannot recover a Server Component error. error.md:157.)
 *
 * No `global-error.tsx` ships alongside this. That file only fires when the root
 * layout itself throws — which, for a layout that is static markup with no data
 * access, effectively cannot happen — and it replaces the document, so it gets
 * none of these styles or fonts. A second, unstyled copy of this page for an
 * unreachable case is worse than not having one.
 */
export default function Error({
  error,
}: {
  error: Error & { digest?: string }
}) {
  useEffect(() => {
    // The digest is the only thread back to the server-side log; in production
    // the message itself is deliberately generic so nothing sensitive leaks.
    console.error(error)
  }, [error])

  return (
    <NoticePage
      heading="Something went wrong"
      description="Try to refresh the page. If it doesn’t work, circle back later."
    />
  )
}
