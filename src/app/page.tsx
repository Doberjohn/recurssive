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
import { BrandGrid } from '@/components/BrandGrid'
import { buildMetadata } from '@/lib/metadata'
import { site } from '@/lib/site'

export const metadata: Metadata = buildMetadata({
  title: `${site.name} | ${site.descriptor}`,
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

/**
 * The nine questions are the drawn ones, in the drawn order, not invented.
 *
 * Answers are sized to the frame: the column is 686px at 16px, which is 86
 * characters a line, and the drawn answer box is 91 tall — three to four lines,
 * so ~250-340 characters. Much longer and the open row pushes the rows below it
 * off the composition.
 *
 * Three of these encode business commitments rather than facts about software,
 * and were settled by the owner rather than guessed: cost describes what drives
 * it and quotes no numbers, timeline describes the phases rather than weeks, and
 * rescue work is something we actively want. Do not add figures to the first two
 * without asking — they become a public promise.
 */
const faqs = [
  {
    question: 'What is app development?',
    answer:
      'Designing and building software people actually use, on a phone, in a browser, or both. It covers the thinking as much as the code: what the thing is for, how it should feel, and what happens to it after launch.',
  },
  {
    question: 'What is enterprise app development?',
    answer:
      'The same craft with more constraints: existing systems to integrate with, security and compliance to satisfy, and more people who have to agree. Less of the work is writing code and more of it is making the thing fit what is already there.',
  },
  {
    question: 'What types of apps does Recurssive build?',
    answer:
      'Mobile apps in React Native and Expo, web apps, and increasingly work that runs AI on the device rather than in someone else’s cloud. If it has to work on a phone and in a browser without being built twice, that is the shape we like.',
  },
  {
    question: 'Should I build a web app or mobile app?',
    answer:
      'Usually the honest answer is start with one. Web reaches everyone immediately and is cheaper to change; mobile earns its keep when you need the camera, offline use, or a place on the home screen. We will tell you which yours actually needs.',
  },
  {
    question: 'How long does it take to build an app?',
    answer:
      'Discovery first, then a working slice you can put in front of real people, then iteration on what they tell you. You see something running early rather than waiting months for a launch date. That is also how the estimate stays honest.',
  },
  {
    question: 'How much does app development cost?',
    answer:
      'Cost tracks scope more than hours: how many platforms, how much of it is genuinely new, and what it has to integrate with. Tell us what you are building and we will come back with a figure tied to that, rather than a range that fits anyone.',
  },
  {
    question: 'Do you build iOS and Android apps?',
    answer:
      'Both, from one codebase. React Native and Expo mean iOS and Android share the same app instead of being built and maintained twice, which is usually the difference between shipping to both and quietly dropping one.',
  },
  {
    question: 'What is MVP app development?',
    answer:
      'Building the smallest version that still answers the real question: will people use this? It is not a cheap version of the product. It is the fastest way to find out whether the expensive version is worth building at all.',
  },
  {
    question: 'Do you offer app redesign and rescue services?',
    answer:
      'Often. Inheriting someone else’s codebase is normal work here. We start with an audit of what is there, then fix what is costing you most, whether that is performance, the design, or the parts nobody dares change.',
  },
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
        {/* min(1203px, 100svh), not a flat 1203. The drawn hero is 1203 tall,
            which is taller than a 1080p viewport: the headline sits 107 above
            its bottom, so at 1920x1080 it landed 11px under the fold with NO
            browser chrome, and roughly 140 under with a real browser's UI. The
            first thing on the site was invisible without scrolling.

            svh rather than vh so mobile browser UI is accounted for rather than
            guessed at. On a tall display the cap never bites and the drawn 1203
            still applies.

            pb 56 at 768 and 112 at 1920 are the drawn gaps below the headline. */}
        <section className="relative isolate flex min-h-[min(1203px,100svh)] items-end overflow-hidden pb-14 pt-40 lg:pb-28">
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
            {/* The drawn 48px is a 768 value. Applied flat it wrapped to SIX
                lines in a 375 column and ate 40% of the hero, which is what
                pushed it to 43% down where the frame has it at 88%. Ramps to the
                drawn 48 at 768 and 72 at 1920; the 26 floor is legibility. */}
            {/* An h1, not a p. Home had no h1 at all, which is both an SEO gap
                and a screen-reader one — this IS the page's heading. The base
                h1 rule in globals.css already sets font-heading, 600 and
                -0.05em, so the classes below are belt-and-braces rather than
                overrides. */}
            <h1 className="max-w-[970px] font-heading font-semibold leading-[0.9] tracking-[-0.05em] text-white [font-size:clamp(25px,6.25vw,48px)] lg:[font-size:72px]">
              Crafting custom web &amp; app experiences that help people.
            </h1>
          </div>
        </section>

        {/* ── What we do best ─────────────────────────────────────────── */}
        <section className="pb-8 pt-20" aria-labelledby="what-we-do">
          <div className="container-content">
            <h2 id="what-we-do" className="t-section text-ink">
              What we do best
            </h2>
          </div>
          {/* 100 flat was wrong at both breakpoints and badly wrong on mobile:
              the frames put the first rule 61 below the heading at 1920 and just
              26 at 768, so this was nearly four times the drawn gap on the narrow
              layout. Ramps below 768 rather than holding 26, which is already
              tight at a phone's heading size. */}
          <div className="mt-[clamp(16px,3.385vw,26px)] lg:mt-[61px]">
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
              {/* No arrow: the drawn accent CTA is 140x39 and 15 + 110 + 15
                  accounts for all of it. Arrows belong to the nav CTA. */}
              <Button href="/contact">Start a project</Button>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────
            Centred 686px column — the panels are 686.1 wide; the old 650 was
            the text bbox, because the manifest that produced it skipped the
            vectors the panels are drawn as.

            The construction grid behind it is not scoped to the FAQ: it is a
            full-bleed layer painted under the entire page, and this is just
            the only stretch of bare ground it crosses. See BrandGrid. */}
        <section
          className="relative isolate overflow-hidden py-32"
          aria-labelledby="faq"
        >
          <BrandGrid className="absolute left-0 top-1/2 -z-10 w-full -translate-y-1/2" />
          <div className="container-content">
            <div className="mx-auto max-w-[686px]">
              <h2 id="faq" className="t-section text-center text-ink">
                Frequently Asked Questions
              </h2>
              {/* Drawn 338.7 wide, so it breaks to two lines — roughly 41
                  characters a line, which is why this is short rather than a
                  paragraph. */}
              <p className="t-body mx-auto mt-6 max-w-[340px] text-center text-ink-muted">
                Short answers to what people ask us most. If yours is not here,
                just ask.
              </p>
              <div className="mt-6">
                <Faq items={faqs} />
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
              <div className="relative">
                {/* Drawn as a 411x707 masked field of ones and zeroes — the
                    "0's & 1's" principle, not a photograph.

                    It sits BEHIND the copy and starts above it: the frame puts
                    the field at y5447 against a heading at y5522, so 75px of it
                    shows before the text begins and the rest reads through it.
                    It was in flow below the paragraph, which put the whole thing
                    under the text instead of behind it.

                    z-10 on the copy is load-bearing, not decoration — the field
                    is absolutely positioned, and positioned elements paint above
                    in-flow static ones whatever the source order. Without it the
                    glyphs sit on top of the heading. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-[-75px] hidden h-[707px] w-[411px] max-w-full [container-type:inline-size] lg:block"
                >
                  <BinaryDiamond className="h-full w-full" />
                </div>

                <h2 id="contact" className="t-section relative z-10 text-ink">
                  Ready for success?
                </h2>
                {/* Real copy, not lorem. The two-working-days promise is also
                    made on /contact/thanks — if one changes, change both, or the
                    site promises one thing before the form and another after. */}
                {/* 600 is a real instance, not a synthesised bold: fonts.ts
                    loads Open Sans as a variable font across 400-700. */}
                <p className="t-body relative z-10 mt-6 max-w-md font-semibold text-ink-muted">
                  Tell us what you&rsquo;re building, even if it&rsquo;s still
                  rough. We read all messages and come back within two
                  working days.
                </p>
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
