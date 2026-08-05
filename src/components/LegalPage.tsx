import { Nav } from './Nav'
import { Footer } from './Footer'

/**
 * The layout both legal documents share.
 *
 * Measured from the Privacy Policy and Terms of Service frames, which are the
 * same composition with different words:
 *
 *              1920                       768
 *   title      48px SemiBold @165,193     42px Bold @79,174
 *   heading    32px SemiBold ls-5%        36px SemiBold ls-5%
 *   body       18px Open Sans Regular     24px Open Sans SemiBold ls-3%
 *   column     861                        610
 *   head->body 49                         44
 *
 * The body is heavier AND larger on the narrow layout, which is the same
 * inversion the rest of the site uses: the 768 frame is not a scaled 1920, it is
 * a re-set of the same content.
 *
 * Below 768 both ramp down and floor, because a 24px semibold legal document on
 * a phone is a wall. The floors are legibility values, not drawn ones.
 *
 * `nav tone="dark"`: these open on the pale ground, not a photograph.
 */

export type LegalSection = {
  heading: string
  body: string[]
}

/**
 * Formatted in UTC deliberately. `new Date('2026-08-05')` parses as UTC
 * midnight, and formatting that in a timezone behind UTC renders the day before.
 */
function formatUpdated(iso: string) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso))
}

export function LegalPage({
  title,
  sections,
  updated,
}: {
  title: string
  sections: LegalSection[]
  /**
   * ISO date the WORDING last changed, not the build date. A "last updated" that
   * moves every deploy tells a reader nothing and is worse than none, since it
   * implies review that did not happen.
   */
  updated: string
}) {
  return (
    <>
      <Nav tone="dark" />

      <main className="flex flex-1 flex-col">
        {/* Same top ramp as /contact: the drawn 174/193 is a 768-and-up value,
            and applying it flat gives a phone ~180px of dead space. */}
        <section className="pb-24 pt-[clamp(88px,22.9vw,176px)] lg:pb-32 lg:pt-[193px]">
          <div className="container-content">
            <h1 className="font-heading font-semibold leading-none tracking-[-0.05em] text-ink [font-size:clamp(28px,5.469vw,42px)] lg:[font-size:48px]">
              {title}
            </h1>

            {/* Not drawn in either frame. Added because a legal document without
                a date cannot be argued about: nobody can say which version they
                agreed to. <time> so the machine-readable date is the same one
                the sentence shows. */}
            <p className="mt-4 text-ink-muted [font-size:clamp(14px,2.6vw,20px)] lg:[font-size:16px]">
              Last updated{' '}
              <time dateTime={updated}>{formatUpdated(updated)}</time>
            </p>

            {/* 861 at 1920; at 768 the content column is already 610, so this
                only bites on the wide layout. A measure, not a container. */}
            <div className="mt-12 max-w-[861px] space-y-10 lg:mt-16">
              {sections.map((s) => (
                <section key={s.heading}>
                  <h2 className="font-heading font-semibold leading-tight tracking-[-0.05em] text-ink [font-size:clamp(24px,4.6875vw,36px)] lg:[font-size:32px]">
                    {s.heading}
                  </h2>
                  <div className="mt-11 space-y-4 text-ink lg:mt-12">
                    {s.body.map((p) => (
                      <p
                        key={p.slice(0, 40)}
                        // break-words is load-bearing: the copy quotes
                        // third-party privacy URLs up to 45 characters with no
                        // break opportunity, which pushed the document 57px past
                        // a 375 viewport. Legal text is where long URLs live, so
                        // this belongs on the component, not on one paragraph.
                        className="break-words font-semibold leading-relaxed tracking-[-0.03em] [font-size:clamp(16px,3.125vw,24px)] lg:font-normal lg:tracking-normal lg:[font-size:18px]"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
