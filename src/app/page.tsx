import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Faq } from '@/components/Faq'
import { ServiceIndex, type Service } from '@/components/ServiceIndex'
import { ContactForm } from '@/components/ContactForm'
import { Picture } from '@/components/ui/Picture'
import { Button } from '@/components/ui/Button'
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
  { index: '01', name: 'Desktop Apps', description: LOREM, href: '/capabilities/product-development' },
  { index: '02', name: 'Mobile Apps', description: LOREM, href: '/capabilities/react-native-performance' },
  { index: '03', name: 'Web Design', description: LOREM, href: '/capabilities/product-development' },
  { index: '04', name: 'UI/UX Design', description: LOREM, href: '/capabilities/product-development' },
  { index: '05', name: 'AI Workflows', description: LOREM, href: '/capabilities/on-device-ai' },
  { index: '06', name: 'Product Strategy', description: LOREM, href: '/capabilities/product-development' },
]

const industries = ['Startups', 'SMBs', 'Enterprise']

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

/** Four steps, ~209px apart (y4434 / 4662 / 4871 / 5080). */
const process = [
  { index: '01', name: 'Ask', label: 'Start the process' },
  { index: '02', name: 'Listen', label: 'Collect the data' },
  { index: '03', name: 'Think', label: 'Decide what to do' },
  { index: '04', name: 'Create', label: 'Work on it' },
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
            <p
              className="max-w-[970px] font-heading font-semibold leading-[0.9] tracking-[-0.05em] text-white"
              style={{ fontSize: 'clamp(2rem, 3.75vw, 4.5rem)' }}
            >
              Crafting custom web &amp; app experiences that help people.
            </p>
          </div>
        </section>

        {/* ── What we do best ─────────────────────────────────────────── */}
        <section className="pb-8 pt-20" aria-labelledby="what-we-do">
          <div className="container-content">
            <h2 id="what-we-do" className="text-7xl text-ink">
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
              <h2 id="industries" className="text-7xl text-cloud">
                Industries we serve
              </h2>
              <p className="text-4xl font-semibold leading-snug text-cloud">{LOREM}</p>
            </div>

            <div className="mt-32 grid gap-12 lg:grid-cols-3">
              {industries.map((name) => (
                <div key={name}>
                  <h3 className="text-4xl text-cloud">{name}</h3>
                  <p className="mt-6 text-md text-cloud/85">{LOREM}</p>
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
              <h2 id="faq" className="text-center text-7xl text-ink">
                Frequently Asked Questions
              </h2>
              <p className="mt-6 text-center text-md text-ink-muted">{LOREM}</p>
              <div className="mt-12">
                <Faq items={faqs} defaultOpen={0} />
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
            <h2 id="process" className="text-7xl text-silver">
              Our Process
            </h2>
            <p className="mt-4 max-w-xl text-base text-silver">{LOREM}</p>

            <ol className="mt-24 space-y-20">
              {process.map((step) => (
                <li
                  key={step.name}
                  className="grid items-baseline gap-x-8 gap-y-3 lg:grid-cols-[42px_minmax(0,26fr)_minmax(0,26fr)_minmax(0,44fr)]"
                >
                  <span className="text-lg text-accent">({step.index})</span>
                  <h3 className="text-7xl text-silver">{step.name}</h3>
                  <p className="text-md font-semibold text-cloud">{step.label}</p>
                  <p className="text-md text-cloud/85">{LOREM}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Ready for success? ──────────────────────────────────────────
            Copy left, form right (x975). A photograph bleeds off the left edge
            (1165x728 at x-208). */}
        <section className="relative overflow-hidden py-32" aria-labelledby="contact">
          <div className="container-content">
            <div className="grid gap-16 lg:grid-cols-2">
              <div>
                <h2 id="contact" className="text-7xl text-ink">
                  Ready for success?
                </h2>
                <p className="mt-6 max-w-md text-base text-ink-muted">{LOREM}</p>

                <div className="mt-16 hidden lg:block">
                  <Picture
                    name="home-portrait"
                    alt=""
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    grain
                    className="aspect-[1165/728] w-full overflow-hidden rounded-xl"
                    imgClassName="h-full w-full object-cover"
                  />
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
