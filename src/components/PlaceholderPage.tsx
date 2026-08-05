import { Nav } from './Nav'
import { Footer } from './Footer'
import { BuildVision } from './BuildVision'

/**
 * The shell the four unbuilt index routes share: /about, /blog, /cases and
 * /capabilities.
 *
 * These exist to stop the nav pointing at 404s. Every link in `navLinks` except
 * Home resolved to the 404 page, and the sitemap has been submitting all four
 * since day one — the same inconsistency the legal routes had before they landed.
 *
 * Deliberately just the chrome: nav, a title, the Build Vision band, footer.
 * Real content replaces the empty <main> without touching anything else.
 *
 * `tone="dark"` because these open on the pale ground rather than a photograph,
 * matching the legal pages. The top ramp is LegalPage's, for the same reason it
 * exists there: the drawn 193 is a 768-and-up value and applying it flat leaves a
 * phone with ~180px of dead space above the title.
 *
 * The h1 is not decoration. A route with no heading and no content reads to a
 * crawler as a soft 404, which is worse than the hard 404 it replaced — hence
 * `noIndex` on each of these pages and their removal from `routes` until there
 * is something on them. See src/lib/site.ts.
 */
export function PlaceholderPage({ title }: { title: string }) {
  return (
    <>
      <Nav tone="dark" />

      <main className="flex flex-1 flex-col">
        <section className="pb-24 pt-[clamp(88px,22.9vw,176px)] lg:pb-32 lg:pt-[193px]">
          <div className="container-content">
            <h1 className="font-heading font-semibold leading-none tracking-[-0.05em] text-ink [font-size:clamp(28px,5.469vw,42px)] lg:[font-size:48px]">
              {title}
            </h1>
          </div>
        </section>
      </main>

      <BuildVision />

      <Footer />
    </>
  )
}
