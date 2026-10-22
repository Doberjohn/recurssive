import { Nav } from './Nav'
import { Footer } from './Footer'
import { BuildVision } from './BuildVision'

/**
 * The layout both legal documents share.
 *
 * Measured from the Privacy Policy and Terms of Service frames, which are the
 * same composition with different words:
 *
 *              1920                       768
 *   title      48px SemiBold @165,193     42px Bold @79,174
 *   heading    32px SemiBold ls-5%        36px SemiBold ls-5%
 *   body       18px Regular, lh 1.5       24px Regular, lh 1.25, ls-3%
 *   column     861                        610
 *   head->body 49                         44
 *
 * The body is larger AND more tightly leaded on the narrow layout, which is the
 * same inversion the rest of the site uses: the 768 frame is not a scaled 1920,
 * it is a re-set of the same content.
 *
 * Regular at both, on the owner's call of 2026-10-22. It was SemiBold below lg
 * and leading-relaxed (1.625) everywhere: the Privacy frame does draw 4 of its
 * 13 paragraphs SemiBold at 768, but Terms draws all 12 Regular and both 1920
 * frames are Regular throughout.
 *
 * Below 768 the size ramps down and floors, because a 24px legal document on a
 * phone is a wall. The floor is a legibility value, not a drawn one; the
 * leading keeps the 768 frame's 1.25.
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

            {/* Line 58: 1593x0 @165,298 at 1920, 610x0 @79,331 at 768. It spans
                the CONTAINER, not the text column, which is why it sits out here
                rather than inside the measure below. */}
            <hr className="mt-8 border-0 border-t-[1.5px] border-ink-muted lg:mt-10" />

            {/* CENTRED, not left-aligned. The frame puts this column at x530
                with a width of 861, inside a container spanning 163..1757 —
                367 left and 366 right, so it is centred rather than hung off the
                title. At 768 the column is 610, which is the container itself,
                so mx-auto does nothing there and the two layouts agree.
                Gap after the rule is the drawn 68 at 768 and 96 at 1920. */}
            <div className="mx-auto mt-[68px] max-w-[861px] space-y-10 lg:mt-24">
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
                        className="break-words leading-[1.25] tracking-[-0.03em] [font-size:clamp(16px,3.125vw,24px)] lg:leading-[1.5] lg:tracking-normal lg:[font-size:18px]"
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

      {/* Sits between the document and the footer, as both frames draw it. */}
      <BuildVision />

      <Footer />
    </>
  )
}
