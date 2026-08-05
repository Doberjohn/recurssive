import type { Metadata } from 'next'
import { NoticePage } from '@/components/NoticePage'
import { buildMetadata } from '@/lib/metadata'
import { site } from '@/lib/site'

export const metadata: Metadata = buildMetadata({
  title: 'Message not sent',
  path: '/contact/problem',
  noIndex: true,
})

/**
 * Where /api/contact sends a submission it could NOT deliver — the mail provider
 * refused it, the API key is missing, or the payload failed server-side
 * validation.
 *
 * It exists because the alternative is worse: redirecting a failed send to the
 * thanks page would tell someone their message arrived when it did not. This
 * page says so plainly and hands over an address that does not depend on this
 * form working.
 *
 * A separate page rather than a banner on /contact because reading a query
 * string would make /contact dynamic, and every route on this site is
 * prerendered — a constraint CI enforces.
 *
 * Shares NoticePage with /contact/thanks and the two error routes. The action
 * goes back to the form rather than home: whoever lands here was mid-task, and
 * their words are gone, so the useful next step is the form — with the address
 * in the body as the escape hatch if the form is what is broken.
 *
 * Copy is still placeholder until the owner writes it.
 */
export default function Problem() {
  return (
    <NoticePage
      heading="That didn’t send."
      description={
        <>
          Your message didn’t reach us, so please don’t assume we’ve seen it.
          Email{' '}
          <a href={`mailto:${site.supportEmail}`} className="text-ink underline underline-offset-2">
            {site.supportEmail}
          </a>{' '}
          directly, or try again.
        </>
      }
      actionLabel="Back to the form"
      actionHref="/contact"
    />
  )
}
