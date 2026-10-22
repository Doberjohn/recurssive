import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { BuildVision } from '@/components/BuildVision'
import { PageHeader } from '@/components/PageHeader'
import { PillarRows } from '@/components/PillarRows'
import { CodeCard } from '@/components/CodeCard'
import { pillars } from '@/content/capabilities-index'
import { capabilityLinks } from '@/lib/content'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Capabilities',
  description:
    'Recurssive reviews and fixes existing apps, builds new products from an idea, adds AI features, and moves large apps to React Native screen by screen.',
  path: '/capabilities',
  // The placeholder reason for this flag is gone: every string on this page is
  // now real (intro, four pillar descriptions, nineteen drawn rows, four drawn
  // code samples), and a row links to its capability's page only once that
  // page is the drawn template (see capabilityLinks), the rest to /contact, so
  // nothing thin is reachable from here. Kept only pending the owner's call on
  // indexing. Drop it and uncomment
  // '/capabilities' in src/lib/site.ts routes in the SAME commit — see the note
  // there: a sitemapped route that serves noindex is the contradiction.
  noIndex: true,
})

/**
 * Frame: 1920x4298 / 768x6174.
 *
 * Four pillars, each a heading + description + row list, with a code-editor mock
 * beside the rows at 1920 and centred below them at 768. Then the shared
 * BuildVision band and the footer.
 *
 * The header rule here is full-width (1593 @x165 at 1920, 610 @x79 at 768),
 * unlike Blog and Cases where the rule only fills the space left over by the
 * filter chips. So this page does not use FilterTabs — it has no filter row.
 *
 * VERTICAL RHYTHM, re-measured against both frames on 2026-10-22. Two gaps had
 * the frames' TOP-TO-TOP distances applied as margins after a box: heading to
 * description (61 at 768, 70 at 1920) and description to rows (74 at 1920),
 * which opened each pillar ~100px wider than drawn. Headings and descriptions
 * are now placed by baseline, because Figma sets the headings in taller auto
 * line boxes (51 and 58) than .t-section (44 and 50.4):
 *
 *                              768      1920
 *   rule after the intro       23       26    (its top edge on the drawn line's)
 *   rule to first heading      47.7     134
 *   heading to description     13.5     15.8  (drawn 61 / 70 top to top)
 *   description to rows        22       25    (drawn 20-28 at 768, by hand)
 *   rows to card               64       —     (beside the rows, 6 down, at 1470+)
 *   between pillars            87       218
 *   last pillar to the band    127      231
 *
 * The 768 frame places several of these by hand and not consistently (rows to
 * card is 54/67/62/71 down the page), so each takes the frame's median, which
 * keeps every pillar within a few px of drawn instead of drifting ~40 by the
 * band. Our 1920 rule sits 24 higher than the frame's only because the real
 * intro is two lines where the frame's Lorem is three.
 */
export default function Capabilities() {
  const links = capabilityLinks()
  return (
    <>
      <Nav tone="dark" />

      <main className="flex flex-1 flex-col">
        <PageHeader
          title="Capabilities"
          intro="Work with us usually starts small and grows from there. Each of the four groups below can be the starting point."
        >
          <hr className="mt-[23px] border-0 border-t-[1.5px] border-ink-muted lg:mt-[26px]" />
        </PageHeader>

        <div className="container-content mt-[47.7px] flex flex-col gap-[87px] lg:mt-[134px] lg:gap-[218px]">
          {pillars.map((pillar) => (
            <section key={pillar.name} aria-labelledby={`pillar-${pillar.name}`}>
              {/* Not `lg:` — the two columns are a fixed 746 and a fixed 502
                  with a gap, which needs 1312px of content column, i.e. a
                  ~1470px viewport. Splitting at 1024 put 367px of card outside
                  the viewport. Below that it stacks, which is the 768 design
                  anyway, so nothing is lost. */}
              <div className="min-[1470px]:flex min-[1470px]:items-start min-[1470px]:justify-between min-[1470px]:gap-16">
                <div className="min-[1470px]:w-[746px]">
                  <h2
                    id={`pillar-${pillar.name}`}
                    className="t-section font-heading font-semibold text-ink"
                  >
                    {pillar.name}
                  </h2>
                  <p className="t-body mt-[13.5px] max-w-[754px] text-ink-muted lg:mt-[15.8px]">
                    {pillar.description}
                  </p>
                  <div className="mt-[22px] lg:mt-[25px] lg:w-[746px]">
                    <PillarRows rows={pillar.rows} links={links} />
                  </div>
                </div>

                {/* Below the rows at 768, beside them at 1920. The card is a
                    fixed 502 at both widths, so it is centred rather than
                    stretched on the narrow layout. */}
                <CodeCard
                  title={pillar.card.title}
                  code={pillar.card.code}
                  minHeight={pillar.card.minHeight}
                  className="mx-auto mt-[64px] min-[1470px]:mx-0 min-[1470px]:mt-[6px]"
                />
              </div>
            </section>
          ))}
        </div>

        <div className="mt-[127px] lg:mt-[231px]" />
      </main>

      <BuildVision />
      <Footer />
    </>
  )
}
