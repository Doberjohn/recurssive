import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/Button'
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
 * concrete URL to hang a conversion goal on. Nothing is drawn for this in any of
 * the 31 frames — the layout follows the site's existing scale, and the copy is
 * placeholder until the owner writes it.
 */
export default function Thanks() {
  return (
    <>
      <Nav tone="dark" />

      <main className="flex flex-1 flex-col">
        <section className="pt-[176px] lg:pt-[170px]">
          <div className="container-content">
            <h1 className="t-section max-w-[16ch] text-ink">
              Thanks &mdash; we&rsquo;ve got it.
            </h1>

            <p className="t-body mt-6 max-w-[52ch] text-ink-muted">
              Your message is with us and we&rsquo;ll come back to you within two
              working days. If it&rsquo;s urgent, {site.email} reaches us directly.
            </p>

            <div className="mt-12 flex flex-wrap gap-4">
              <Button href="/" variant="dark" arrow>
                Back to home
              </Button>
              <Button href="/cases" variant="light" arrow>
                See our work
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
