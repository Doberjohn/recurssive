import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Faq } from '@/components/Faq'
import { ServiceIndex, type Service } from '@/components/ServiceIndex'
import { Picture } from '@/components/ui/Picture'
import { Button } from '@/components/ui/Button'
import { buildMetadata } from '@/lib/metadata'
import { site } from '@/lib/site'

export const metadata: Metadata = buildMetadata({
  title: `${site.name} — ${site.descriptor}`,
  path: '/',
})

/** Six rows on a 100px pitch, in the order drawn. */
const services: Service[] = [
  { index: '01', name: 'Desktop Apps', href: '/capabilities/product-development', image: 'home-desk' },
  { index: '02', name: 'Mobile Apps', href: '/capabilities/react-native-performance', image: 'home-collab' },
  { index: '03', name: 'UI/UX Design', href: '/capabilities/product-development', image: 'home-portrait' },
  { index: '04', name: 'Product Strategy', href: '/capabilities/product-development', image: 'team-meeting' },
  { index: '05', name: 'Web Design', href: '/capabilities/product-development', image: 'home-texture' },
  { index: '06', name: 'AI Workflows', href: '/capabilities/on-device-ai', image: 'ai' },
]

const industries = [
  { name: 'Startups', body: 'Getting to a first version that proves the idea, without building the wrong thing twice.' },
  { name: 'SMBs', body: 'Replacing the spreadsheet-and-goodwill process with software that scales past the founder.' },
  { name: 'Enterprise', body: 'Migrating existing native apps to a shared core without stopping feature delivery.' },
]

/** Answers are placeholder — the questions are the designer's. */
const faqs = [
  { question: 'What is app development?', answer: 'Placeholder answer. Replace with real copy before launch.' },
  { question: 'What is enterprise app development?', answer: 'Placeholder answer. Replace with real copy before launch.' },
  { question: 'What types of apps does Recurssive build?', answer: 'Placeholder answer. Replace with real copy before launch.' },
  { question: 'Should I build a web app or mobile app?', answer: 'Placeholder answer. Replace with real copy before launch.' },
  { question: 'How long does it take to build an app?', answer: 'Placeholder answer. Replace with real copy before launch.' },
  { question: 'How much does app development cost?', answer: 'Placeholder answer. Replace with real copy before launch.' },
  { question: 'Do you build iOS and Android apps?', answer: 'Placeholder answer. Replace with real copy before launch.' },
  { question: 'What is MVP app development?', answer: 'Placeholder answer. Replace with real copy before launch.' },
]

const process = ['Ask', 'Listen', 'Think', 'Create']

export default function Home() {
  return (
    <>
      <Nav tone="light" />

      <main className="flex flex-1 flex-col">
        {/* ── Hero ──────────────────────────────────────────────────────────
            The LCP element is the photograph, so it is the only image on the
            page marked priority. A scrim sits between photo and type: the
            designs omit it here, which leaves white text on a raw image at
            roughly 2:1 contrast. */}
        <section className="relative isolate flex min-h-[85vh] items-end overflow-hidden pb-20 pt-40">
          <Picture
            name="home-texture"
            alt=""
            sizes="100vw"
            priority
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-t from-phantom via-phantom/70 to-phantom/30"
          />

          <div className="container-content">
            <h1 className="font-heading font-bold leading-none tracking-[-0.05em] text-cloud"
                style={{ fontSize: 'clamp(3.5rem, 13vw, 16rem)' }}>
              RECURSSIVE
            </h1>
            <p className="mt-8 max-w-4xl font-heading tracking-[-0.05em] text-cloud"
               style={{ fontSize: 'clamp(1.75rem, 3.8vw, 4.5rem)' }}>
              {site.description.replace('Recurssive is a visionary web and app studio ', '')
                .replace(/^c/, 'C')}
            </p>
          </div>
        </section>

        {/* ── Service index ─────────────────────────────────────────────── */}
        <section className="py-24" aria-labelledby="what-we-do">
          <div className="container-content">
            <h2 id="what-we-do" className="text-5xl text-ink">
              What we do best
            </h2>
          </div>
          <div className="mt-12">
            <ServiceIndex services={services} />
          </div>
        </section>

        {/* ── Industries ────────────────────────────────────────────────── */}
        <section className="py-24" aria-labelledby="industries">
          <div className="container-content">
            <h2 id="industries" className="text-5xl text-ink">
              Industries we serve
            </h2>
            <div className="mt-16 grid gap-12 md:grid-cols-3">
              {industries.map((i) => (
                <div key={i.name}>
                  <h3 className="text-2xl text-ink">{i.name}</h3>
                  <p className="mt-4 text-base text-ink-muted">{i.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process ───────────────────────────────────────────────────── */}
        <section className="relative isolate overflow-hidden py-32">
          <Picture
            name="process"
            alt=""
            sizes="100vw"
            grain
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          {/* Full-width scrim. In the designs this rectangle is offset 461px to
              the right, leaving the light text on bare photograph — a
              regression recorded in the knowledge base, corrected here. */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-phantom/75" />

          <div className="container-content">
            <h2 className="text-5xl text-cloud">Our Process</h2>
            <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {process.map((step, n) => (
                <li key={step}>
                  <span className="text-base text-accent">(0{n + 1})</span>
                  <h3 className="mt-3 text-4xl text-silver">{step}</h3>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <section className="py-24" aria-labelledby="faq">
          <div className="container-content">
            <h2 id="faq" className="text-5xl text-ink">
              Frequently Asked Questions
            </h2>
            <div className="mt-12 max-w-3xl">
              <Faq items={faqs} />
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <section className="pb-32 pt-12">
          <div className="container-content">
            <h2 className="max-w-3xl text-6xl text-ink">
              Let&rsquo;s build your vision
            </h2>
            <p className="mt-6 max-w-xl text-lg text-ink-muted">
              Got an idea that keeps coming back?
            </p>
            <Button href="/contact" arrow className="mt-10">
              Start a project
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
