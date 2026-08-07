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
import { CarouselTrack } from '@/components/CarouselTrack'
import { buildMetadata } from '@/lib/metadata'
import { site } from '@/lib/site'

export const metadata: Metadata = buildMetadata({
  title: `${site.name} | ${site.descriptor}`,
  path: '/',
})

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

/** The designs use two placeholder lengths, and the difference is load-bearing
 *  rather than incidental: the industry columns are drawn as FIVE lines of 18px
 *  in a 441 column, which is this string and not the one above. With the short
 *  one they came to three lines and the whole band was 57px under its drawn
 *  height. Measured: 1967.9px of text over 441 = 4.46, so five lines. */
const LOREM_LONG = `${LOREM} Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`

/** Six rows on a 100px pitch, rules drawn y1398 to 1998.
 *
 *  The designs draw the preview card once, on the active row — Web Design — and
 *  the photograph in it is `kreit-xRuG2k1sjaw-unsplash`, which the pipeline
 *  calls `case-hero`. The other five are ours: a hover state drawn once says
 *  nothing about what the other rows show. */
const services: Service[] = [
  { index: '01', name: 'Desktop Apps', image: 'home-desk', description: LOREM, href: '/capabilities/product-development' },
  { index: '02', name: 'Mobile Apps', image: 'home-collab', description: LOREM, href: '/capabilities/react-native-performance' },
  { index: '03', name: 'Web Design', image: 'case-hero', description: LOREM, href: '/capabilities/product-development' },
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
  { name: 'SMBs', shape: 'trapezoid' as const },
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
            <h1 className="max-w-[970px] font-heading font-semibold leading-[0.9] tracking-[-0.05em] hero-headline text-white">
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
            Rebuilt from `Industries we serve.svg`, a standalone 1920x935 export
            of this band. Section-local geometry, all read off that file:

              heading   box 255x96 @163,118      lead para  @1147,109, 3 lines
              rule 1    y302.5                   marks      y385..460
              names     y475..514                bodies     y533..668, 18px
              rule 2    y733.5                   CTA        140x39 @890.5,798

            The 118 above the band is the drawn gap from the last service rule
            (y1998) to the top of this photograph (y2116).

            `Industries we serve mobile.svg` (768x835) is a different section,
            not a reflow: there is NO lead paragraph, and only ONE industry is
            on screen with a left and right arrow in the gutters. It is a
            carousel. Section-local at 768:

              heading  @81,69, 2 lines 42px    rule 1  y179.5
              mark     @158,225 (101x75)       name    @158,315, 36px
              body     @158,373, 461 wide      arrows  y447..477, x79 and x652
              rule 2   y632.5                  CTA     198x53 @285,698 */}
        <section
          className="relative isolate mt-[95px] overflow-hidden pt-[69px] pb-[84px] lg:mt-[118px] lg:pt-28 lg:pb-[98px]"
          aria-labelledby="industries"
        >
          {/* Three things about this photograph, none of them defaults:
              - the file stores it GREYSCALE (all three channel means and
                stddevs are 116.85 / 74.80), the same way the Process band
                stores its own copy. Done in CSS so one asset serves both.
              - it is drawn at 120.15% of cover, not cover.
              - and anchored to the RIGHT edge, at 53.7% vertically.
              The pattern transform is unambiguous about all three: a 4096x2731
              image drawn 2309x1539.5 at (-387, -324.4) on a 1922x935 rect, so
              the right edges coincide exactly and 387px runs off to the left.
              Scaling about that same anchor point is what reproduces it —
              `object-position` sets where cover sits, and the scale then grows
              the content away from the anchor rather than from the centre.

              The 768 export crops it somewhere else again — 2061.5x1373.4 at
              (-854.5, -288.5) on a 768x835 rect, which is 164.6% of cover at
              66.06% / 53.58%. Note cover flips axis between the two: the wide
              band is width-driven and the narrow one height-driven, so the two
              zoom factors are not comparable and neither interpolates into the
              other. Two crops, one per frame. */}
          <Picture
            name="home-collab"
            alt=""
            sizes="100vw"
            grain
            fill
            className="-z-20"
            imgClassName="grayscale object-[66.06%_53.58%] origin-[66.06%_53.58%] scale-[1.6462] lg:object-[100%_53.7%] lg:origin-[100%_53.7%] lg:scale-[1.2015]"
          />

          {/* The drawn scrim: #0F0F0F at 0 / 0.5 / 1.0 over 0 / 30% / 100%, the
              whole fill at 75% opacity. It is CLEAR at the top, where the build
              previously had it at 70% — the darkest point in the design is the
              bottom, behind nothing, and the lightest is behind the heading. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-b from-phantom/0 via-phantom/[0.375] via-30% to-phantom/75"
          />

          {/* A DEPARTURE, and a small one. Measured on the export with the type
              stripped out (see STATE.md — sampling with the glyphs in the box
              reads the glyphs, not the ground), the drawn scrim gives:
                heading 2.63 : needs 3.0 : FAIL      lead 5.91 : PASS
                names 5.75   : PASS                 bodies 6.74 / 10.35 / 13.17
              So one element fails, by 0.37, and only that one. This layer is
              the smallest fix that clears it: 25% at the top fading out at the
              same 30% the drawn gradient uses. Re-measured on the BUILD's own
              composite (same rendition, same crop, same layers) the drawn scrim
              alone gives 2.61 and this takes it to 3.15, with the lead going
              5.92 -> 6.87 and nothing else moving. Still far lighter at the top
              than the 70% this replaced. Delete it if the owner would rather
              have the drawn scrim exactly — it is one line and nothing else
              depends on it. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-b from-phantom/25 to-transparent to-30%"
          />

          {/* The top row is placed, not halved. The heading's drawn box is 255
              wide — which is what breaks it to "Industries / we serve" — and the
              lead paragraph starts at x1147, so the split is 984 | 610 across
              the 1594 column, with no gap between them. `lg:grid-cols-2` gave
              777 | 777, a one-line heading and a lead starting 167px early.

              The 768 frame drops the lead paragraph entirely — it is not a
              wrapped or shortened version, it is absent — and keeps the same
              two-line heading at 42px in a 196 box. */}
          <div className="container-content">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,984fr)_minmax(0,610fr)] lg:gap-0">
              {/* Explicit leading, because this is the only section heading on
                  the page that WRAPS, and `.t-section`'s 1.05 is a single-line
                  measurement. The file sets it near 1.0 — measured baseline to
                  baseline, 38 at 42px and 48.5 at 48px — so at 1.05 the block
                  came out 12px too tall at 768 and pushed the first rule with
                  it. */}
              {/* 5em, not the drawn 196/255px. The measure only has to land
                  between "Industries" (4.43em) and "Industries we" (5.73em) to
                  break where the file breaks it — and stating it in em means it
                  keeps doing that as `.t-section` ramps. At a px value tuned for
                  42px type the heading re-wrapped to "Industries we / serve"
                  the moment the ramp took it to 30. */}
              <h2
                id="industries"
                className="t-section max-w-[5em] leading-[38px] text-cloud lg:leading-[48.5px]"
              >
                Industries we serve
              </h2>
              <p className="t-item hidden font-semibold text-cloud lg:block">{LOREM}</p>
            </div>
          </div>

          {/* Both rules are full-bleed 1px #A59BFF and were missing entirely.
              They are in the 1920 frame (Line 120/121), the 768 frame (Line
              121/122) and both exports, so they are content, not a guide. Full
              width means they sit outside .container-content, like the service
              index's own rules. */}
          <div aria-hidden="true" className="mt-[34px] h-px bg-accent lg:mt-[85px]" />

          {/* Three columns at 1920, a CAROUSEL below lg.

              Columns are placed, not distributed: left edges 163 / 751 / 1326
              across the 1594 column, which is 588 | 575 | 431 and not a ratio
              any gap rule reproduces — the same situation the footer documents.
              `gap-12` with three equal columns gave 499 and put columns 2 and 3
              forty-one and sixty-eight px left of where they are drawn.

              At 768 the export shows ONE industry with an arrow either side, so
              the three become a scroll-snap track. It is a real scroller, which
              means a swipe works natively and it costs no JavaScript; the arrows
              are anchors to the neighbouring slides, wrapping at both ends so
              both are always live, as drawn. Keyboard and screen readers get a
              plain list of three items in a focusable scroll region.

              The arrows sit in the gutters (x79 and x652 against a card at
              158..616), and 45 below the row's centre — half the mark block —
              which is what puts them level with the name-and-body rather than
              with the whole card. Drawn centre 462, this gives 450. */}
          <div className="container-content mt-[45px] lg:mt-[82px]">
            <CarouselTrack className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:snap-none lg:grid-cols-[minmax(0,588fr)_minmax(0,575fr)_minmax(0,431fr)] lg:overflow-visible">
              {industries.map(({ name, shape }, i) => (
                <li
                  key={name}
                  id={`industry-${i}`}
                  className="relative flex w-full shrink-0 snap-center items-center gap-3 md:gap-9 lg:block lg:w-auto lg:gap-0"
                >
                  <a
                    href={`#industry-${(i + industries.length - 1) % industries.length}`}
                    aria-label={`Previous industry: ${industries[(i + industries.length - 1) % industries.length].name}`}
                    className="mt-[110px] shrink-0 text-cloud outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent lg:hidden"
                  >
                    <svg aria-hidden="true" viewBox="1723 1632.08 37.2 29.84" className="h-[30px] w-[37px] -scale-x-100 fill-current">
                      <path d="M1759.41 1648.41C1760.2 1647.63 1760.2 1646.37 1759.41 1645.59L1746.69 1632.86C1745.91 1632.08 1744.64 1632.08 1743.86 1632.86C1743.08 1633.64 1743.08 1634.91 1743.86 1635.69L1755.17 1647L1743.86 1658.31C1743.08 1659.09 1743.08 1660.36 1743.86 1661.14C1744.64 1661.92 1745.91 1661.92 1746.69 1661.14L1759.41 1648.41ZM1723 1647L1723 1649L1758 1649L1758 1647L1758 1645L1723 1645L1723 1647Z" />
                    </svg>
                  </a>

                  <div className="mx-auto w-[458px] max-w-full lg:mx-0 lg:w-auto">
                    <IndustryMark shape={shape} />
                    <h3 className="t-item text-cloud">{name}</h3>
                    {/* 18px at 1920, not `.t-body`'s 16 — the one place on the
                        page the designs set body copy a step UP. */}
                    <p className="t-body mt-[19px] text-cloud lg:max-w-[441px] lg:text-[18px] lg:leading-[27px]">
                      {LOREM_LONG}
                    </p>
                  </div>

                  <a
                    href={`#industry-${(i + 1) % industries.length}`}
                    aria-label={`Next industry: ${industries[(i + 1) % industries.length].name}`}
                    className="mt-[110px] shrink-0 text-cloud outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent lg:hidden"
                  >
                    <svg aria-hidden="true" viewBox="1723 1632.08 37.2 29.84" className="h-[30px] w-[37px] fill-current">
                      <path d="M1759.41 1648.41C1760.2 1647.63 1760.2 1646.37 1759.41 1645.59L1746.69 1632.86C1745.91 1632.08 1744.64 1632.08 1743.86 1632.86C1743.08 1633.64 1743.08 1634.91 1743.86 1635.69L1755.17 1647L1743.86 1658.31C1743.08 1659.09 1743.08 1660.36 1743.86 1661.14C1744.64 1661.92 1745.91 1661.92 1746.69 1661.14L1759.41 1648.41ZM1723 1647L1723 1649L1758 1649L1758 1647L1758 1645L1723 1645L1723 1647Z" />
                    </svg>
                  </a>
                </li>
              ))}
            </CarouselTrack>
          </div>

          <div aria-hidden="true" className="mt-[60px] h-px bg-accent lg:mt-[65px]" />

          <div className="mt-[65px] flex justify-center lg:mt-16">
            {/* No arrow: the drawn accent CTA is 140x39 and 15 + 110 + 15
                accounts for all of it. Arrows belong to the nav CTA. */}
            <Button href="/contact">Start a project</Button>
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
              <p className="t-body mx-auto mt-6 max-w-[380px] text-center text-ink-muted">
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
        {/* Padding is the drawn band, not a round number. The 1920x1201 export
            puts the first shape's top edge at y298.25 and the last shape's
            bottom at y1054.25; py-28 landed the flow 24px low and closed the
            bottom by 34. `our process mobile.svg` is 768x1320 and settles the
            other end: heading box at +86, last shape bottom at 1189, so 86
            and 131. */}
        <section
          className="relative isolate overflow-hidden pt-[86px] pb-[131px] lg:pt-[88px] lg:pb-[145px]"
          aria-labelledby="process"
        >
          {/* The band is three layers in the file, not a photograph behind a
              neutral scrim. The scrim IS the brand gradient, which is why the
              section reads purple rather than grey.

              Greyscale is the file's, not a stylistic addition: its copy of
              this photograph is stored desaturated (all three channel means are
              exactly 98.0), and it is otherwise the same frame we ship —
              greyscale RMSE 2.83 between the two. Done in CSS rather than in
              the pipeline so one asset still serves both, the way the file
              reuses one image.

              `object-position` is not a default either: the file draws the
              2806x4096 photograph at 1920 wide (so 2802.7 tall) offset -1560.7,
              i.e. the window sits 97.4% of the way down the overflow. Centred,
              the frame filled with the window above the desk, not the desk.

              The 768 export keeps that 97.33% vertical anchor exactly — but it
              is NOT cover there. It draws the image 2059x3005.3 on a 768x1320
              band, which is 227.7% of cover, because cover goes height-driven
              at that aspect and would show only a 904px-wide slice. Same
              window, 2.28x closer. */}
          <Picture
            name="process"
            alt=""
            sizes="100vw"
            grain
            fill
            className="-z-30"
            imgClassName="grayscale object-[48.95%_97.33%] origin-[48.95%_97.33%] scale-[2.2772] lg:object-[center_97.4%] lg:origin-center lg:scale-100"
          />

          {/* --mesh-2 over the photograph at 75%, rotated 180deg. The rotation
              is the file's: the rect is drawn at (1920,1200) and turned about
              that corner, which lands the gradient's bright core bottom-right.
              CSS cannot flip a background, so the layer itself is rotated —
              free, since it is absolutely positioned and paints nothing else.

              The size is anchored to HEIGHT, and that is the whole trick — the
              same one .footer-mesh documents. The file draws the image 2024x1265
              on a 1920x1200 band, which is 105.42% either way at that one size,
              and `105.42% auto` reads more naturally. But this band is not a
              fixed 1200: it is content-driven, and every width below 1920 makes
              it TALLER while making a width-anchored image shorter. At 768 the
              band is 2345 tall against an 810x506 image — it covered the bottom
              fifth and left the rest bare photograph.

              So state the requirement rather than hoping one number satisfies
              it: tall enough to cover the band (105.42%) OR tall enough that
              its 1.6 aspect spans the viewport (62.5vw), whichever is larger.
              The first term wins at every real width; the second is the guard
              for a band wider than 1.6x its height. At 1920 it resolves to
              1265x2024 — the drawn crop exactly.

              The 768 export gives the narrow crop, and it is a different window
              of the same gradient rather than the same one at another size:
              2170.33x1356.5 on a 768x1320 band, which after the 180 rotation
              reads as 102.77% of the band's height positioned 49.51% / 17.95%.
              Holding `left top` there showed 0..34.5% of the image where the
              file shows 32.6..68 — the wrong part of the gradient, not merely
              the wrong scale.

              Grain is left at the default: this draws the 4000px source at
              1.98x against the 2.08x --grain-opacity is calibrated for, so the
              correction the shapes need does not apply here. */}
          {/* Both crops are CLASSES, not the inline style the single-crop
              version used: an inline declaration outranks every class, so an
              `lg:` override of it silently does nothing. */}
          <div
            aria-hidden="true"
            className="mesh absolute inset-0 -z-20 rotate-180 opacity-75 [--mesh:var(--mesh-2)] [--mesh-pos:49.51%_17.95%] [--mesh-size:auto_max(102.77%,62.5vw)] lg:[--mesh-pos:left_top] lg:[--mesh-size:auto_max(105.42%,62.5vw)]"
          />

          {/* Transparent to #0F0F0F top-to-bottom at 25%. Weighted to the
              bottom, where the last step and the body column sit — the scrim
              this replaces was flat 60-75% across the whole band, which cost
              the photograph most of its contrast at the top. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-phantom opacity-25"
          />

          {/* The narrow-only scrim that used to sit here is GONE, which is what
              STATE.md said should happen the moment the two-column layout
              landed. It existed because the band was 2345 tall against a drawn
              1320, so the same crop stretched over 1.8x the height and lifted
              the gradient's bright core up behind the heading. The band is now
              the drawn height and takes the drawn crop, so there is nothing
              left for it to correct. Do not reinstate it without re-measuring. */}

          <div className="container-content">
            <h2 id="process" className="t-section text-silver">
              Our Process
            </h2>
            {/* 610 at 768, where the drawn intro is two lines; max-w-xl (576)
                broke it to three. */}
            <p className="t-body mt-4 max-w-[610px] text-cloud lg:max-w-xl lg:text-silver">{LOREM}</p>

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
