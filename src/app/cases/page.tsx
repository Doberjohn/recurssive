import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { BuildVision } from '@/components/BuildVision'
import { PageHeader } from '@/components/PageHeader'
import { FilterTabs } from '@/components/FilterTabs'
import { CaseCard, type CaseItem } from '@/components/CaseCard'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Cases',
  description: 'Selected work: what the problem was, what we built, what it did.',
  path: '/cases',
  // Body copy is still lorem from the frame. See src/lib/site.ts.
  noIndex: true,
})

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.'

/**
 * Hardcoded, matching the four cards the frame draws. There is exactly ONE case
 * in the MDX collection today, so wiring this to getAll('cases') would render a
 * single row against a design that draws four.
 *
 * The metric VALUES are the one thing in here that is not lorem — the frame
 * gives each card its own set, so they are transcribed rather than repeated.
 *
 * Images: the frame's own photographs (kreit, brooke-cagle, microsoft-copilot,
 * boitumelo) are not in the image pipeline — none of them appear in
 * images.generated.ts. These are four cleared images that are, so the layout is
 * real rather than four grey boxes. Swap when the real ones are processed.
 */
const cases: CaseItem[] = [
  {
    title: 'Brand Project Case',
    tags: ['Desktop App Development', 'UI/UX Design'],
    description: LOREM,
    metrics: [
      { value: '30x', label: 'Lorem ipsum' },
      { value: '+54%', label: 'Lorem ipsum' },
      { value: '10K$', label: 'Lorem ipsum' },
    ],
    image: 'case-hero',
    href: '/cases/placeholder-fintech-app',
  },
  {
    title: 'Brand Project Case',
    tags: ['Desktop App Development', 'UI/UX Design'],
    description: LOREM,
    metrics: [
      { value: '15x', label: 'Lorem ipsum' },
      { value: '+89%', label: 'Lorem ipsum' },
      { value: '16K$', label: 'Lorem ipsum' },
    ],
    image: 'home-collab',
    href: '/cases/placeholder-fintech-app',
  },
  {
    title: 'Brand Project Case',
    tags: ['Desktop App Development', 'UI/UX Design'],
    description: LOREM,
    metrics: [
      { value: '19x', label: 'Lorem ipsum' },
      { value: '+33%', label: 'Lorem ipsum' },
      { value: '51K$', label: 'Lorem ipsum' },
    ],
    image: 'team-meeting',
    href: '/cases/placeholder-fintech-app',
  },
  {
    title: 'Brand Project Case',
    tags: ['Desktop App Development', 'UI/UX Design'],
    description: LOREM,
    metrics: [
      { value: '23x', label: 'Lorem ipsum' },
      { value: '+11%', label: 'Lorem ipsum' },
      { value: '70K$', label: 'Lorem ipsum' },
    ],
    image: 'editorial',
    href: '/cases/placeholder-fintech-app',
  },
]

/**
 * Frame: 1920x3498 / 768x4990.
 *
 * The chips map 1:1 onto caseSchema's `segment` enum (startups | smbs |
 * enterprise) with "All" as the unfiltered default, so this row is the design
 * for a filter that the content model already anticipates. Nothing is wired yet.
 */
export default function Cases() {
  return (
    <>
      <Nav tone="dark" />

      <main className="flex flex-1 flex-col">
        <PageHeader
          title="Cases"
          intro="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        >
          <FilterTabs options={['All', 'Startups', 'SMB’s', 'Enterprise']} />
        </PageHeader>

        {/* Row gap: 100 at 1920, 53 at 768. */}
        <div className="container-content mt-[54px] flex flex-col gap-[53px] lg:mt-[81px] lg:gap-[100px]">
          {cases.map((item, i) => (
            <CaseCard key={i} item={item} />
          ))}
        </div>

        <div className="mt-[85px] lg:mt-[175px]" />
      </main>

      <BuildVision />
      <Footer />
    </>
  )
}
