import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { BuildVision } from '@/components/BuildVision'
import { Picture } from '@/components/ui/Picture'
import { purposeRows, values, processSteps } from '@/content/about'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description: 'Recurssive is a web and app studio in Thessaloniki, Greece.',
  path: '/about',
  // Body copy is still lorem from the frame. See src/lib/site.ts.
  noIndex: true,
})

/**
 * Frame: 1920x6122 / 768x5858.
 *
 * The file also holds two 1920 hero ALTERNATES. They are not scroll states or
 * extra sections — they are the same hero with the photograph swapped to
 * `evgeni-tcherkasski` (in the pipeline as `about-square`), which is one of the
 * cleared Unsplash images. That swap exists because the drawn hero photo is a
 * "Tony Noel" image with no licence and an identifiable subject, still an open
 * blocker. `about-hero` is used here as the authoritative frame draws it; the
 * alternate is a one-word change if the licence does not clear.
 *
 * Section sizes below are the drawn pairs. Where 1920 and 768 differ the pair is
 * written as base/lg — several things on this page genuinely do NOT ramp
 * ("Our Values", every value name, the recursion heading), which is unusual for
 * this site and is left flat on purpose.
 */
export default function About() {
  return (
    <>
      <Nav tone="light" />

      <main className="flex flex-1 flex-col">
        {/* ── Hero ─────────────────────────────────────────────────────────
            The photo, its scrim and the diagonal grid are all drawn at the SAME
            pixel size at both breakpoints — only their x-offset pans. So this
            band is one of the few places where a flat value is correct. */}
        <section className="relative isolate flex min-h-[min(1201px,100svh)] flex-col justify-end overflow-hidden pb-14 lg:pb-28">
          <div className="absolute inset-0 -z-10">
            <Picture name="about-hero" alt="" fill sizes="100vw" priority className="h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />
          </div>

          {/* Feel Form Function. The frame draws 140/130/130 at 1920, but both
              hero alternates draw all three at a uniform 147.7 — and three
              near-identical sizes read as a slip, not a rhythm. Uniform here. */}
          <div className="container-content">
            {/* Drawn 140 at 1920 and 52 at 768 — which sound far apart but are
                nearly the same proportion of the viewport (7.29vw against
                6.77vw), so this is one ramp per breakpoint rather than a step.
                A single 13.5vw rule gave 101px at 768, twice the drawn size.

                The word gap is drawn 225 at 1920 and 77 at 768, i.e. ~11vw at
                both. NOT cqi — there is no container-type on any ancestor here,
                so container units would silently resolve against the viewport. */}
            <p className="flex flex-wrap gap-x-[11vw] font-heading font-semibold leading-none tracking-[-0.05em] text-cloud [font-size:clamp(30px,6.77vw,52px)] lg:[font-size:min(140px,7.29vw)]">
              <span>Feel</span>
              <span>Form</span>
              <span>Function.</span>
            </p>

            <p className="mt-[52px] text-xl font-semibold text-accent lg:mt-[97px] lg:text-sm">
              (Our Story)
            </p>
            <p className="t-body mt-[14px] max-w-[846px] text-cloud lg:ml-[82px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
        </section>

        {/* ── Purpose / Vision / Mission ───────────────────────────────────
            Eyebrow + heading left, paragraph right at 1920 (para at x1138, 620
            wide); stacked at 768. Heading is 48/40 = .t-step exactly. */}
        <section className="container-content mt-[105px] flex flex-col gap-[57px] lg:mt-[108px] lg:gap-[70px]">
          {purposeRows.map((row) => (
            <div key={row.label} className="lg:flex lg:items-start lg:justify-between lg:gap-16">
              <div className="lg:flex lg:w-[911px] lg:gap-[64px]">
                <p className="text-xl text-ink-muted lg:pt-[22px] lg:text-sm">{row.label}</p>
                <h2 className="t-step mt-[17px] font-heading font-semibold text-ink lg:mt-0">
                  {row.heading}
                </h2>
              </div>
              <p className="t-body mt-[23px] text-ink-muted lg:mt-[39px] lg:max-w-[620px]">
                {row.body}
              </p>
            </div>
          ))}
        </section>

        {/* ── Story image + Our Values ─────────────────────────────────────
            Image left, values right at 1920 (values column at x1418). The
            heading and every value name are drawn at ONE size for both
            breakpoints — 32 and 48 — so neither ramps. */}
        <section className="container-content mt-[55px] lg:mt-[176px]" aria-labelledby="values">
          {/* Proportions, not pixels. A fixed 1130 image is wider than the whole
              content column below ~1300, which pushed the values list 635px off
              the right edge at 1024. The drawn split holds at every width.

              The frame actually bleeds this image 203px past the container's
              left edge (x-40 against a container starting at 163). Kept inside
              the column here; the bleed is a refinement, not the layout. */}
          <div className="lg:flex lg:items-start lg:gap-[5%]">
            <div className="relative aspect-[610/608] w-full shrink-0 overflow-hidden rounded-[20px] lg:aspect-[1300/1300] lg:w-[60%]">
              <Picture
                name="about-desk"
                alt=""
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/70" />
            </div>

            <div className="mt-[64px] lg:mt-[64px] lg:min-w-0 lg:flex-1">
              <h2 id="values" className="font-heading text-4xl font-semibold text-ink-muted">
                Our Values
              </h2>

              <ol className="mt-[67px] flex flex-col gap-[41px] lg:mt-[98px] lg:gap-[59px]">
                {values.map((v, i) => (
                  <li key={v.name}>
                    <div className="flex items-start gap-[clamp(16px,6vw,46px)] lg:gap-[28px]">
                      <span className="text-xl text-ink-muted lg:pt-[2px] lg:text-sm">
                        ({String(i + 1).padStart(2, '0')})
                      </span>
                      <div className="min-w-0">
                        {/* Drawn a flat 48 at BOTH 1920 and 768, and left flat
                            was wrong: "Performance" is one unbreakable word ~275px
                            wide at 48px, against a 272px content column at 320.
                            That put the document 63px past the viewport at 320,
                            23 at 360, 8 at 375 — the same 383px every time,
                            which is the tell for a rigid element rather than a
                            layout that scales badly.

                            48 still holds from 768 up, where it is drawn. Below
                            that it ramps, because 320 is not a drawn width and
                            something has to give. */}
                        <h3 className="text-brand-gradient font-heading font-semibold [font-size:clamp(30px,6.25vw,48px)]">
                          {v.name}
                        </h3>
                        <p className="mt-[10px] text-2xl text-ink lg:text-sm">{v.body}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ── We live & breathe recursion ──────────────────────────────────
            48px at BOTH breakpoints — no ramp, as drawn. */}
        <section className="container-content mt-[39px] lg:mt-[39px]">
          <h2 className="font-heading text-7xl font-semibold leading-none text-ink">
            We live &amp; breathe recursion
          </h2>
          <p className="t-body mt-[58px] max-w-[1128px] text-ink-muted lg:mt-[73px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
            sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
            est laborum.
          </p>
        </section>

        {/* ── Process strip ───────────────────────────────────────────────
            Five steps across at 1920. The 768 frame draws only the first two,
            which is an unfinished mock rather than a mobile design, so all five
            render and simply stack. */}
        <section className="mt-[356px] lg:mt-[356px]" aria-label="How we work">
          <hr className="border-0 border-t-[1.5px] border-surface" />
          <div className="container-content mt-[-15px]">
            <ol className="grid grid-cols-1 gap-x-[86px] gap-y-[48px] sm:grid-cols-2 lg:grid-cols-5">
              {processSteps.map((step, i) => (
                <li key={i}>
                  <h3 className="font-heading text-4xl font-semibold leading-[0.76] text-ink">
                    {step.name}
                  </h3>
                  <p className="t-body mt-[37px] max-w-[231px] text-ink-muted">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <div className="mt-[124px] lg:mt-[124px]" />
      </main>

      <BuildVision />
      <Footer />
    </>
  )
}
