import { Nav } from './Nav'
import { Footer } from './Footer'
import { BuildVision } from './BuildVision'
import { CapabilityHero } from './CapabilityHero'
import { CapabilityBenefits } from './CapabilityBenefits'
import { ProcessSection } from './ProcessSection'
import { CapabilityWhyUs } from './CapabilityWhyUs'
import { CapabilityIdeaCard } from './CapabilityIdeaCard'
import { CapabilityMoreServices } from './CapabilityMoreServices'
import { CapabilityTech } from './CapabilityTech'
import { CapabilityPlatforms } from './CapabilityPlatforms'
import type { CapabilityMeta } from '@/lib/content/schema'

/**
 * The capability page, as the Capability frames draw it (1920x7414 and
 * 768x10833): hero, "Why build a …?", Our Process, Why us, the idea card,
 * Discover More Services, Tech we use on repeat, We develop for, then the
 * shared build-vision band and footer.
 *
 * Per service: the hero and the six benefits (the entry's `page` block). The
 * rest is shared — see src/content/capability-page.ts.
 */
export function CapabilityTemplate({
  meta,
  links,
}: {
  meta: CapabilityMeta & { page: NonNullable<CapabilityMeta['page']> }
  /** Discover More Services' rows to their pages: lib/content capabilityLinks. */
  links: Record<string, string>
}) {
  return (
    <>
      <Nav tone="light" />

      <main className="flex flex-1 flex-col">
        <CapabilityHero title={meta.title} intro={meta.page.intro} photo={meta.page.photo} />
        <CapabilityBenefits heading={meta.page.whyHeading} benefits={meta.page.benefits} />

        {/* Home's band, shared: 79 under the Enquire button at 768, 89 at 1920. */}
        <div className="mt-[79px] lg:mt-[89px]">
          <ProcessSection />
        </div>
        <CapabilityWhyUs />
        <CapabilityIdeaCard />
        <CapabilityMoreServices current={meta.title} links={links} />
        <CapabilityTech />
        <CapabilityPlatforms />
      </main>

      <BuildVision />
      <Footer />
    </>
  )
}
