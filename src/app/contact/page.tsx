import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { ContactForm } from '@/components/ContactForm'
import { ContactDetails } from '@/components/ContactDetails'
import { FeelFormFunction } from '@/components/FeelFormFunction'
import { buildMetadata } from '@/lib/metadata'
import { site } from '@/lib/site'

export const metadata: Metadata = buildMetadata({
  // Just the page name: layout.tsx sets `title.template` to "%s — Recurssive",
  // so passing the site name here renders it twice.
  title: 'Contact',
  description: `Talk to ${site.name} about a web or app project. Based in Thessaloniki, working globally.`,
  path: '/contact',
})

/**
 * Contact — 1920x2634 in the file, assembling as:
 *
 *   h1                @170 (1920) / @176 (768)
 *   details + form    @254 / @253, a 650 / 192 / 753 split at 1920, stacked at 768
 *   feel/form/function
 *   footer            flush, no gap at either width
 *
 * `tone="dark"` on the nav: unlike every other page so far this one opens on the
 * pale ground rather than a photograph, and the file draws the nav links #0F0F0F.
 *
 * The two columns are 650 and 753 with a 192 gutter — deliberately NOT Home's
 * even split. Home puts a 783 form beside a 411 diamond; here the card is wider
 * and the gutter much larger, so `lg:grid-cols-2` would be wrong on both counts.
 * Expressed as fractions plus a percentage gutter so the ratio survives the
 * narrow end of lg, where a fixed 192px gutter would crush the columns.
 *
 * "Let's Talk" is this site's first real <h1>. Home's headline is a <p>, which
 * is worth fixing separately.
 */
export default function Contact() {
  return (
    <>
      <Nav tone="dark" />

      <main className="flex flex-1 flex-col">
        {/* 176 is the drawn 768 value and ramps down from there. The floor was
            88, which on a phone left the h1 22px under the nav's logo and 38
            above the card, so it read as part of the nav rather than as the
            card's heading. 135 follows the owner's mobile reference: logo to
            cap top is 2.98 cap heights there, 68.5px at 390 (and baseline to
            card 1.22, the mt below). Only below ~590 does the floor apply. */}
        <section className="pt-[clamp(135px,22.9vw,176px)] lg:pt-[170px]">
          <div className="container-content">
            <h1 className="t-section text-ink">Let&rsquo;s Talk</h1>

            {/* 33/34, not the 26 the frames read off ink. The h1's ink is
                taller than its line box (58 against 50.4 at 1920), and margin
                applies to the box — so 26 lands the card 8px high.

                23 below md, from the same mobile reference as the padding
                above: the card sits 1.22 cap heights under the baseline, 28px
                at 390, where 33 left it 38. */}
            <div className="mt-[23px] grid gap-y-20 md:mt-[33px] lg:mt-[34px] lg:grid-cols-[minmax(0,650fr)_minmax(0,753fr)] lg:gap-x-[12.04%] lg:gap-y-0">
              <ContactDetails />
              <ContactForm />
            </div>
          </div>
        </section>

        <div className="mt-[94px] lg:mt-[129px]">
          <FeelFormFunction />
        </div>
      </main>

      <Footer />
    </>
  )
}
