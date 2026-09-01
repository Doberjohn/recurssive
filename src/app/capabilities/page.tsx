import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { BuildVision } from '@/components/BuildVision'
import { PageHeader } from '@/components/PageHeader'
import { PillarRows } from '@/components/PillarRows'
import { CodeCard } from '@/components/CodeCard'
import { pillars } from '@/content/capabilities-index'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Capabilities',
  description:
    'What Recurssive takes on, in four groups: an outside read on code you already have, new product work, on-device AI, and enterprise migration.',
  path: '/capabilities',
  // The placeholder reason for this flag is gone: every string on this page is
  // now real (intro, four pillar descriptions, nineteen drawn rows, four drawn
  // code samples), and the rows link to /contact rather than to the still
  // unstyled /capabilities/[slug] template, so nothing thin is reachable from
  // here. Kept only pending the owner's call on indexing. Drop it and uncomment
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
 */
export default function Capabilities() {
  return (
    <>
      <Nav tone="dark" />

      <main className="flex flex-1 flex-col">
        <PageHeader
          title="Capabilities"
          intro="Four groups, nineteen kinds of work. They run from a second opinion to the system your company depends on."
        >
          <hr className="mt-[33px] border-0 border-t-[1.5px] border-ink-muted lg:mt-[26px]" />
        </PageHeader>

        <div className="container-content mt-[45px] flex flex-col gap-[86px] lg:mt-[131px] lg:gap-[214px]">
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
                  <p className="t-body mt-[61px] max-w-[754px] text-ink-muted lg:mt-[66px]">
                    {pillar.description}
                  </p>
                  <div className="mt-[84px] lg:mt-[73px]">
                    <PillarRows rows={pillar.rows} />
                  </div>
                </div>

                {/* Below the rows at 768, beside them at 1920. The card is a
                    fixed 502 at both widths, so it is centred rather than
                    stretched on the narrow layout. */}
                <CodeCard
                  title={pillar.card.title}
                  code={pillar.card.code}
                  muted={pillar.card.muted}
                  className="mx-auto mt-[54px] min-[1470px]:mx-0 min-[1470px]:mt-0"
                />
              </div>
            </section>
          ))}
        </div>

        <div className="mt-[233px] lg:mt-[233px]" />
      </main>

      <BuildVision />
      <Footer />
    </>
  )
}
