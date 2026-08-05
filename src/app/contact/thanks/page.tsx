import type { Metadata } from 'next'
import { ErrorPage } from '@/components/ErrorState'
import { buildMetadata } from '@/lib/metadata'
import { site } from '@/lib/site'

export const metadata: Metadata = buildMetadata({
  title: 'Message sent',
  path: '/contact/thanks',
  // An outcome page, not a destination. Keeping it out of the index also keeps
  // it out of Search Console as a thin page nobody searched for.
  noIndex: true,
})

/**
 * Where /api/contact sends a successful submission.
 *
 * A real page rather than an inline state: it costs no client JavaScript, works
 * with scripting off, survives a refresh without resubmitting, and gives a
 * concrete URL to hang a conversion goal on.
 *
 * Nothing is drawn for this in any of the 31 frames, so on the owner's
 * instruction it borrows the error states' layout — same artwork, same type
 * scale, same single text link home — and supplies its own words. That also
 * means the two outcome pages and the two error routes are one component, and a
 * change to the layout reaches all four.
 *
 * The copy is still placeholder until the owner writes it.
 */
export default function Thanks() {
  return (
    // Literal — and + rsquo, not &mdash;/&rsquo;. These are props, not JSX text,
    // so an entity would render as the characters "&mdash;".
    <ErrorPage
      heading="Thanks — we’ve got it."
      description={`We’ll come back to you within two working days. If it’s urgent, ${site.supportEmail} reaches us directly.`}
    />
  )
}
