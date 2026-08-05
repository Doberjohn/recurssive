import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { PageHeader } from '@/components/PageHeader'
import { FilterTabs } from '@/components/FilterTabs'
import { PostCard, type PostItem } from '@/components/PostCard'
import { Newsletter } from '@/components/Newsletter'
import { buildMetadata } from '@/lib/metadata'
import type { ImageName } from '@/lib/images.generated'

export const metadata: Metadata = buildMetadata({
  title: 'Blog',
  description: 'Notes on React Native, on-device AI and building for the web.',
  path: '/blog',
  // Body copy is still lorem from the frame. See src/lib/site.ts.
  noIndex: true,
})

/**
 * Nine cards, as the 1920 frame draws. The 768 frame draws three — the same
 * three photographs as row one — which reads as an abbreviated mock rather than
 * a smaller mobile page, so both widths render all nine.
 *
 * Images: none of the frame's own photographs are in the pipeline, so these
 * cycle the cleared images that are. Swap when the real ones are processed.
 */
const IMAGES: ImageName[] = [
  'editorial',
  'team-meeting',
  'home-collab',
  'ai',
  'home-desk',
  'capability-a',
  'home-portrait',
  'capability-b',
  'process',
]

const posts: PostItem[] = IMAGES.map((image) => ({
  title: 'Lorem ipsum dolor sit amet',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  tags: ['Insights', 'Technology'],
  date: 'June 25, 2026',
  image,
  href: '/blog/why-recursion',
}))

/**
 * Frame: 1920x3248 / 768x3765.
 *
 * Three columns at 1920 (514 wide, ~25px gutters, 578px row pitch), one at 768.
 *
 * The date is drawn "June 25, 2026", while /blog/[slug] already formats
 * publishedAt as en-GB ("25 June 2026"). Left as drawn here, but the two need to
 * agree before this is wired to real content — flagged rather than quietly
 * changed, since the slug page's format was a deliberate choice.
 */
export default function Blog() {
  return (
    <>
      <Nav tone="dark" />

      <main className="flex flex-1 flex-col">
        <PageHeader
          title="Blog"
          intro="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        >
          <FilterTabs options={['All', 'Insights', 'Technology', 'Tools']} />
        </PageHeader>

        <div className="container-content mt-[54px] lg:mt-[83px]">
          {/* Drawn row pitch is 578 (image tops at 389, 967, 1545). The card is
              ~523 tall, so the gap that lands on it is 55, not the 64 that
              looked right by eye. */}
          <div className="grid grid-cols-1 gap-y-[80px] lg:grid-cols-3 lg:gap-x-[26px] lg:gap-y-[55px]">
            {posts.map((post, i) => (
              <PostCard key={i} post={post} />
            ))}
          </div>

          {/* 226x44, pixel-identical at both breakpoints — only its position
              changes. Centred on the page, not on the container. */}
          <div className="mt-[72px] flex justify-center lg:mt-[66px]">
            <button
              type="button"
              className="group inline-flex cursor-pointer items-center gap-[21px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <span className="font-heading text-4xl font-semibold tracking-[-0.05em] text-ink">
                Show more
              </span>
              <span className="flex size-[44px] items-center justify-center rounded-full bg-ink transition-colors group-hover:bg-primary">
                <svg width="14" height="9" viewBox="0 0 14 9" fill="none" aria-hidden="true">
                  <path
                    d="M1 1l6 6 6-6"
                    stroke="#FAFAFA"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>

        <div className="mt-[134px] lg:mt-[134px]" />
      </main>

      <Newsletter />
      <Footer />
    </>
  )
}
