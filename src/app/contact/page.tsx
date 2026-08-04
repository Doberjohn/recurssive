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
        <section className="pt-[176px] lg:pt-[170px]">
          <div className="container-content">
            <h1 className="t-section text-ink">Let&rsquo;s Talk</h1>

            {/* 33/34, not the 26 the frames read off ink. The h1's ink is
                taller than its line box (58 against 50.4 at 1920), and margin
                applies to the box — so 26 lands the card 8px high. */}
            <div className="mt-[33px] grid gap-y-20 lg:mt-[34px] lg:grid-cols-[minmax(0,650fr)_minmax(0,753fr)] lg:gap-x-[12.04%] lg:gap-y-0">
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
