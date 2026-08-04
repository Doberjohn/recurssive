import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Faq } from '@/components/Faq'
import { ServiceIndex, type Service } from '@/components/ServiceIndex'
import { ContactForm } from '@/components/ContactForm'
import { Picture } from '@/components/ui/Picture'
import { Button } from '@/components/ui/Button'
import { ProcessFlow, IndustryMark, type Step } from '@/components/ProcessFlow'
import { BinaryDiamond } from '@/components/BinaryDiamond'
import { buildMetadata } from '@/lib/metadata'
import { site } from '@/lib/site'

export const metadata: Metadata = buildMetadata({
  title: `${site.name} — ${site.descriptor}`,
  path: '/',
})

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

/** Six rows on a 100px pitch, in the order drawn (y1428 to 1928). */
const services: Service[] = [
  { index: '01', name: 'Desktop Apps', image: 'home-desk', description: LOREM, href: '/capabilities/product-development' },
  { index: '02', name: 'Mobile Apps', image: 'home-collab', description: LOREM, href: '/capabilities/react-native-performance' },
  { index: '03', name: 'Web Design', image: 'home-texture', description: LOREM, href: '/capabilities/product-development' },
  { index: '04', name: 'UI/UX Design', image: 'home-portrait', description: LOREM, href: '/capabilities/product-development' },
  { index: '05', name: 'AI Workflows', image: 'team-meeting', description: LOREM, href: '/capabilities/on-device-ai' },
  { index: '06', name: 'Product Strategy', image: 'ai', description: LOREM, href: '/capabilities/product-development' },
]

/** Nine questions, as drawn. The first ships expanded in the file. */
const faqs = [
  { question: 'What is app development?', answer: LOREM },
  { question: 'What is enterprise app development?', answer: LOREM },
  { question: 'What types of apps does Recurssive build?', answer: LOREM },
  { question: 'Should I build a web app or mobile app?', answer: LOREM },
  { question: 'How long does it take to build an app?', answer: LOREM },
  { question: 'How much does app development cost?', answer: LOREM },
  { question: 'Do you build iOS and Android apps?', answer: LOREM },
  { question: 'What is MVP app development?', answer: LOREM },
  { question: 'Do you offer app redesign and rescue services?', answer: LOREM },
]

/** Four steps, each on its flowchart shape — the logo's own construction. */
const process: Step[] = [
  { index: '01', name: 'Ask', label: 'Start the process', body: LOREM, shape: 'terminator' },
  { index: '02', name: 'Listen', label: 'Collect the data', body: LOREM, shape: 'io' },
  { index: '03', name: 'Think', label: 'Decide what to do', body: LOREM, shape: 'decision' },
  { index: '04', name: 'Create', label: 'Work on it', body: LOREM, shape: 'process' },
]

/** Marks are three overlapping copies of one shape — nesting depth encodes
 *  organisational scale (deck p195). */
const industries = [
  { name: 'Startups', shape: 'ellipse' as const },
  { name: 'SMBs', shape: 'rect' as const },
  { name: 'Enterprise', shape: 'triangle' as const },
]

export default function Home() {
  return (
    <>
      <Nav tone="light" />

      <main className="flex flex-1 flex-col">
        {/* ── Hero ─────────────────────────────────────────────────────────
            Image 1920x1280 at y-77; a single 72px line at x163, y966 — roughly
            three-quarters down. There is no wordmark here: the 255px
            RECURSSIVE text node in this frame sits at x8887, off-canvas. */}
        <section className="relative isolate flex min-h-[80vh] items-end overflow-hidden pb-28 pt-40 lg:min-h-[1203px]">
          <Picture
            name="home-texture"
            alt=""
            sizes="100vw"
            priority
            fill
            className="-z-20"
          />
          {/* The designs put white type straight onto the photograph, which
              measures around 2:1. This scrim is an addition. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-t from-phantom via-phantom/60 to-phantom/25"
          />
          <div className="container-content">
            <p className="t-hero max-w-[970px] font-heading font-semibold text-white">
              Crafting custom web &amp; app experiences that help people.
            </p>
          </div>
        </section>

        {/* ── What we do best ─────────────────────────────────────────── */}
        <section className="pb-8 pt-20" aria-labelledby="what-we-do">
          <div className="container-content">
            <h2 id="what-we-do" className="t-section text-ink">
              What we do best
            </h2>
          </div>
          <div className="mt-[100px]">
            <ServiceIndex services={services} />
          </div>
        </section>

        {/* ── Industries ──────────────────────────────────────────────────
            Full-bleed photograph (1922x935 at y2116) under a dark scrim, with
            the heading left and a 32px lead paragraph right. */}
        <section className="relative isolate mt-24 overflow-hidden py-28" aria-labelledby="industries">
          <Picture
            name="home-collab"
            alt=""
            sizes="100vw"
            grain
            fill
            className="-z-20"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-phantom/70 via-phantom/55 to-phantom/75" />

          <div className="container-content">
            <div className="grid gap-10 lg:grid-cols-2">
              <h2 id="industries" className="t-section text-cloud">
                Industries we serve
              </h2>
              <p className="t-item font-semibold text-cloud">{LOREM}</p>
            </div>

            <div className="mt-32 grid gap-12 lg:grid-cols-3">
              {industries.map(({ name, shape }) => (
                <div key={name}>
                  <IndustryMark shape={shape} />
                  <h3 className="t-item text-cloud">{name}</h3>
                  <p className="t-body mt-6 text-cloud/85">{LOREM}</p>
                </div>
              ))}
            </div>

            <div className="mt-24 flex justify-center">
              <Button href="/contact" arrow>
                Start a project
              </Button>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────
            Centred column: heading at x662, rows spanning x634 to x1283. */}
        <section className="py-32" aria-labelledby="faq">
          <div className="container-content">
            <div className="mx-auto max-w-[650px]">
              <h2 id="faq" className="t-section text-center text-ink">
                Frequently Asked Questions
              </h2>
              <p className="t-body mt-6 text-center text-ink-muted">{LOREM}</p>
              <div className="mt-12">
                <Faq items={faqs} defaultOpen={1} />
              </div>
            </div>
          </div>
        </section>

        {/* ── Our Process ─────────────────────────────────────────────────
            Full-bleed photograph (1920x1200 at y4146). Four steps stacked
            vertically ~209px apart, each a row of index + name, a short label,
            and a body column — not a four-across grid. */}
        <section className="relative isolate overflow-hidden py-28" aria-labelledby="process">
          <Picture
            name="process"
            alt=""
            sizes="100vw"
            grain
            fill
            className="-z-20"
          />
          {/* In the file this scrim is offset 461px right, leaving the light
              type on bare photograph. Full-width here. */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-phantom/75 via-phantom/60 to-phantom/75" />

          <div className="container-content">
            <h2 id="process" className="t-section text-silver">
              Our Process
            </h2>
            <p className="t-body mt-4 max-w-xl text-silver">{LOREM}</p>

            <ProcessFlow steps={process} />
          </div>
        </section>

        {/* ── Ready for success? ──────────────────────────────────────────
            Copy left, form right (x975). A photograph bleeds off the left edge
            (1165x728 at x-208). */}
        <section className="relative overflow-hidden py-32" aria-labelledby="contact">
          <div className="container-content">
            <div className="grid gap-16 lg:grid-cols-2">
              <div>
                <h2 id="contact" className="t-section text-ink">
                  Ready for success?
                </h2>
                <p className="t-body mt-6 max-w-md text-ink-muted">{LOREM}</p>

                {/* Drawn as a 411x707 masked field of ones and zeroes — the
                    "0's & 1's" principle, not a photograph. */}
                <div className="mt-16 hidden h-[707px] w-[411px] max-w-full [container-type:inline-size] lg:block">
                  <BinaryDiamond className="h-full w-full" />
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
