import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/Button'
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
 */
export default function Problem() {
  return (
    <>
      <Nav tone="dark" />

      <main className="flex flex-1 flex-col">
        <section className="pt-[176px] lg:pt-[170px]">
          <div className="container-content">
            <h1 className="t-section max-w-[18ch] text-ink">
              That didn&rsquo;t send.
            </h1>

            <p className="t-body mt-6 max-w-[52ch] text-ink-muted">
              Something went wrong on our side and your message didn&rsquo;t reach
              us &mdash; so please don&rsquo;t assume we&rsquo;ve seen it. Email{' '}
              <a
                href={`mailto:${site.email}`}
                className="text-ink underline underline-offset-2"
              >
                {site.email}
              </a>{' '}
              directly, or try the form again.
            </p>

            <div className="mt-12 flex flex-wrap gap-4">
              <Button href="/contact" variant="dark" arrow>
                Back to the form
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
