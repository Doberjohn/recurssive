import type { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Faq } from '@/components/Faq'
import { ServiceIndex, type Service } from '@/components/ServiceIndex'
import { ContactForm } from '@/components/ContactForm'
import { Picture } from '@/components/ui/Picture'
import { Button } from '@/components/ui/Button'
import { SlideArrow } from '@/components/ui/SlideArrow'
import { IndustryMark } from '@/components/ProcessFlow'
import { ProcessSection } from '@/components/ProcessSection'
import { BinaryDiamond } from '@/components/BinaryDiamond'
import { BrandGrid } from '@/components/BrandGrid'
import { CarouselTrack } from '@/components/CarouselTrack'
import { buildMetadata } from '@/lib/metadata'
import { site } from '@/lib/site'

export const metadata: Metadata = buildMetadata({
  title: `${site.name} | ${site.descriptor}`,
  path: '/',
})

/** The two placeholder lengths this page used to carry are gone, but the
 *  measurement they encoded still governs every string below and is the reason
 *  each block states a character budget.
 *
 *  The short lorem was 123 characters and the long one 231. The difference was
 *  load-bearing rather than incidental: the industry columns are drawn as FIVE
 *  lines of 18px in a 441px column, which is the LONG string. With the short
 *  one they came to three lines and the whole band sat 57px under its drawn
 *  height. Measured: 1967.9px of text over 441 = 4.46, so five lines.
 *
 *  Write to the budget on each block. A string that busts it changes the
 *  band's height, and the geometry around it was measured, not guessed. */

/** Six rows on a 100px pitch, rules drawn y1398 to 1998.
 *
 *  The designs draw the preview card once, on the active row — Web Design — and
 *  the photograph in it is `kreit-xRuG2k1sjaw-unsplash`, which the pipeline
 *  calls `case-hero`. The other five are ours: a hover state drawn once says
 *  nothing about what the other rows show. */
/** ORDER AND MEMBERSHIP ARE THE OWNER'S, not the frames'. The frames draw
 *  Desktop / Mobile / Web / UI-UX / AI / Strategy. This runs
 *  Web / Mobile / UI-UX / Performance / Replatforming / Strategy.
 *
 *  Two rows were REMOVED on the owner's decision, and both removals close a
 *  known defect rather than merely swapping a name:
 *
 *    - **Desktop Apps** is gone. It was offered here and silently dropped by
 *      the Product Dev pillar one click away, because Expo does not target
 *      Windows or macOS. The two pages took opposite public positions.
 *    - **AI Workflows** is gone from Home. On-device AI still lives on
 *      /capabilities. This was a deliberate owner call, not an oversight.
 *
 *  Their replacements put Consulting and Enterprise on Home for the first
 *  time, so the band now spans all four pillars instead of four-fifths of
 *  Product Dev, and it finally serves the visitor who ALREADY HAS a product.
 *  Both land on capability pages that exist.
 *
 *  Every row lands on its own capability page (2026-10-23). Four of them had
 *  shared the interim /capabilities/product-development, which now redirects
 *  to Mobile App Development; Web Design takes Web App Development, the web
 *  member of that old Product Development family (the owner's pick).
 *
 *  Image note: the design draws the preview card exactly once, on **Web
 *  Design**, using `case-hero`. A hover state drawn once says nothing about
 *  what the other five show, but the pairing is the designer's, so it follows
 *  Web Design to row 01. `home-desk` and `team-meeting` were freed by the two
 *  removals and moved to the new rows; nothing new needed preparing.
 *
 *  Descriptions are budgeted at 120-143 characters: TWO lines at 1920 (878px
 *  box at 16px, ~119 ch/line) and THREE at 768 (516px at 22px, ~51 ch/line).
 *  768 is the binding breakpoint and the ceiling is MEASURED, not derived:
 *  143 holds three lines, 145 breaks to four. It is word-boundary sensitive,
 *  so treat 143 as the hard stop rather than rounding up.
 *
 *  ── THE VOICE. Four rules, every one of them from a rejection. ──
 *  Full derivation in docs/verbal-identity.md. Read this before editing a row.
 *
 *  0. ROW 01 IS THE OWNER'S OWN SENTENCE. It is the calibration sample for the
 *     whole band. Do not edit it without asking. On 2026-09-29 he asked for a
 *     grammar-only fix, and got exactly three changes: a comma before "and",
 *     `matters the world` -> `means the world`, and `both to you and us` ->
 *     `to both you and us`. Every other word is his. Rows 05 and 06 are his
 *     sentences too.
 *
 *  1. NAME THE PRODUCT, NEVER THE TOOLING. No frameworks, no operating
 *     systems, no languages, and none of `codebase` / `stack` / `native` /
 *     `cross-platform`. p42 says this reader is **Non-tech, Busy, Time
 *     constrained** — they may not know what those words are, and being made
 *     to feel behind is the opposite of the Confidence and Calm p42 asks for.
 *     Naming is allowed by DEPTH: never here, in the FAQ only where the drawn
 *     question already uses the term, and freely on a capability page.
 *
 *     Both previous sessions failed on this in OPPOSITE directions. One banned
 *     all naming and shipped six abstractions with nothing concrete in them.
 *     The next read the FAQ's ten technology mentions as house style and put
 *     "built in Next.js" under a heading the designer had deliberately called
 *     "Web Design". Four things in the source pull this way and should be
 *     discounted: deck p29 expresses the offer as a stack list (8 of its 19
 *     service names contain a framework), Recurssive Language Pt.3 is "Tech we
 *     use on repeat", the FAQ names technology ten times in 374 words, and the
 *     studio's own shorthand is "a React Native / Expo / on-device AI studio".
 *
 *  2. WARM, SINCERE, INVESTED. Not wry, not clever, not understated. p40 puts
 *     Matter-of-fact ↔ Enthusiastic at DEAD CENTRE (measured: marker at 49.9%
 *     of the track) — half enthusiastic. p42 wants Inspiration, Pride, Touched,
 *     Moved. The deck's own selling voice is p81 "Tech for people by people"
 *     and p82 "the goal is to feel again". Value vocabulary over mechanism;
 *     unhedged; and the studio appears late, as someone who CARES rather than
 *     someone who does. That last move is the Empathy value and it is why
 *     `we` earns its place at the end of a row rather than the start.
 *
 *     A rejected draft read p40's Serious slider as a licence for dry
 *     understatement and produced copy that would pass a compliance review and
 *     inspire nobody. Another read "add a spark" as licence for contrarian
 *     aphorism and negging the reader. Both were rejected outright.
 *
 *  3. NO TEMPLATE ACROSS THE BAND. This is the failure that has recurred in
 *     four different disguises, so check for it mechanically rather than by
 *     ear. In order: comma triplets ("load fast, read clearly and hold up on a
 *     phone" — five of six rows, owner rejected the band as reading
 *     machine-written); the aphorism-plus-twist ("Good design is mostly
 *     invisible. Nobody admires the signage in an airport..."); every row
 *     opening "Your"; every row ABOUT "your customers"; and `most _ thing`
 *     lifted out of row 01's superlative into three rows at once.
 *
 *     The cause is structural and will happen again: a 120-142 window is
 *     easiest to hit by tuning a list, so the budget itself selects for one
 *     rhythm. Hit the budget by rewriting the sentence, not by lengthening a
 *     list. Give each row a different SUBJECT, not just a different first
 *     word — current subjects are first impression / the phone as a personal
 *     object / the craft / respect for time / the investment already made /
 *     the decision. Then verify no content word appears in more than two of
 *     the six rows, and vary sentence count (now 1/2/1/1/2/1).
 *
 *  The nine FAQ answers further down THIS page are a hazard as well as a
 *  reference. Row 01 must not say the browser "reaches everyone" or is
 *  "cheapest to change" (L79 makes that pair). No row may open "React Native
 *  and Expo mean" (L94 does, five words in). And do NOT write "the thing" —
 *  it appears three times in those answers, reads as dodging a noun, and was
 *  inherited from there once already and rejected. */
const services: Service[] = [
  {
    index: '01',
    name: 'Web Design',
    image: 'case-hero',
    // The owner's own sentence, with his approved grammar fix. See rule 0.
    description:
      'Your web presence is your most valuable asset, and the first impression you give to your customers means the world to both you and us.',
    href: '/capabilities/web-app-development',
  },
  {
    index: '02',
    name: 'Mobile Apps',
    image: 'home-collab',
    description:
      'A mobile app is a channel you own rather than rent. Getting people to keep it installed takes more craft than most companies expect.',
    href: '/capabilities/mobile-app-development',
  },
  {
    index: '03',
    name: 'UI/UX Design',
    image: 'home-portrait',
    description:
      'When a product is designed well, you never have to stop and work out where to go next, and that quiet confidence is what we’re after.',
    href: '/capabilities/ui-ux-design',
  },
  {
    index: '04',
    name: 'App Performance',
    image: 'home-desk',
    description:
      'Making a product feel fast is how you show people you value their time. It’s usually where we start when we look at yours.',
    href: '/capabilities/react-native-performance',
  },
  {
    index: '05',
    name: 'Replatforming',
    image: 'team-meeting',
    // The owner's sentence. `as it happens` rather than `while it happens` is
    // the only edit: at 146 it renders FOUR lines at 768 against a drawn three.
    // Measured cliff — 143 holds, 145 breaks. Do not grow it.
    description:
      'Modernising a system your company leans on is delicate, and protecting what your team depends on as it happens requires patience and expertise.',
    href: '/capabilities/enterprise-migration',
  },
  {
    index: '06',
    name: 'Product Strategy',
    image: 'ai',
    // The owner's sentence.
    description:
      'What you choose to build first quietly shapes everything after it, and that is the conversation we always want to have with you.',
    href: '/capabilities/product-strategy',
  },
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
      'Designing and building software that people actually use, on a phone or in a browser. Less of it is code than you’d expect. Most of the effort goes into deciding what the software is for and what happens to it after launch.',
  },
  {
    question: 'What is enterprise app development?',
    answer:
      'For a company large enough that new software has to fit the systems already there. Integration and sign-off usually end up being as much of the job as the product itself, and both are worth planning early.',
  },
  {
    question: 'What types of apps does Recurssive build?',
    answer:
      'Mobile apps and web apps, from big multi-user consumer products to small internal tools only a few hundred people will use. What they have in common is that somebody relies on them every day, and that’s the work we take on.',
  },
  {
    question: 'Should I build a web app or mobile app?',
    answer:
      'Usually it’s best to start with one. The web is quicker to change and asks nothing of the person visiting, while an app suits an audience that comes back often enough to justify installing it. We’ll tell you which yours needs.',
  },
  {
    question: 'How long does it take to build an app?',
    answer:
      'It depends on scope, but the shape is the same every time. You see something working months before there’s a launch date, and what comes back from that sets the pace for the rest. That’s also what keeps the estimate honest.',
  },
  {
    // The only answer carrying markup: "Send us what you have" links to /contact.
    // Faq's `answer` is a ReactNode for this one case. Character budget is
    // unaffected — the link wraps existing words rather than adding any.
    question: 'How much does app development cost?',
    answer: (
      <>
        Cost is driven by what’s in scope, not by the hours it takes, so the
        price depends on how much has to be built from scratch and what it has to
        connect to.{' '}
        <Link href="/contact" className="underline underline-offset-4 hover:text-ink">
          Send us what you have
        </Link>{' '}
        and we’ll come back with a price tied to it.
      </>
    ),
  },
  {
    question: 'Do you build iOS and Android apps?',
    answer:
      'Both, and by either route. Some products are best served by one shared build covering both platforms, others by building separately for each. Which suits you depends on the product and what you need from it.',
  },
  {
    question: 'What is MVP app development?',
    answer:
      'The smallest version of your product that can tell you whether people want it. An MVP isn’t a half-baked version of the finished app. It’s the fastest way to find out whether your idea is worth investing in.',
  },
  {
    question: 'Do you offer app redesign and rescue services?',
    answer:
      'Often, and it’s some of the work we’re best at. We start by reading what’s already there and working out what each problem is costing you, then deal with the expensive ones before anything else.',
  },
]

/** Marks are three overlapping copies of one shape — nesting depth encodes
 *  organisational scale (deck p195).
 *
 *  `body` is per-item and that is the point: the frame draws ONE placeholder
 *  paragraph three times, which is a drawing convention, not a design decision.
 *  Three columns headed Startups / SMBs / Enterprise that say the same thing
 *  are three columns that say nothing.
 *
 *  BUDGET 226-249, MEASURED on the built page. Drawn as FIVE lines at 1920 and
 *  SIX at 768.
 *
 *  768 is the binding breakpoint and it is the ONLY one: the card is 449px at
 *  21.78px, where 249 characters holds six lines and 257 breaks to seven. At
 *  1920 even 257 still renders five, so desktop never constrains this slot.
 *  Word-boundary sensitive — 249 is a hard stop, do not round up.
 *
 *  Note the columns are NOT equal at 1920: Startups and SMBs get 441px but
 *  Enterprise gets 431. Measure the third column, not the first.
 *
 *  The floor is real too — page.tsx already records a 57px height regression
 *  caused by a short string, so do not drop below ~226.
 *
 *  THIS IS THE LONGEST SLOT ON THE PAGE AND THE MOST DANGEROUS. At 226-249 a
 *  comma list is by far the easiest way to hit the number, which is exactly the
 *  reflex the owner rejected the first band for. All three rejected drafts were
 *  built on it ("One thing is slow, one thing is still manual, and nobody is
 *  sure..."). Current commas per column: 2 / 2 / 1, and no column contains a
 *  three-item list.
 *
 *  Checked mechanically against the other thirteen strings on this page: no
 *  content word appears in more than two of the fourteen. Five words had to be
 *  moved to get there (time, rather, people, customers, already, everything),
 *  and "the thing" was caught colliding with the FAQ, which owns it. */
const industries = [
  {
    name: 'Startups',
    shape: 'ellipse' as const,
    body:
      'Early on, most of what you spend is buying an answer to one question: does anyone actually want this? The quickest way to get that answer is a small working version someone will find value in, and what happens next decides the rest.',
  },
  {
    name: 'SMBs',
    shape: 'trapezoid' as const,
    body:
      'An established business is a harder brief than a blank page, because everything you change still has to keep running while you change it. The difficult part is knowing which change will pay for itself, and that’s where we’re most useful.',
  },
  {
    name: 'Enterprise',
    shape: 'triangle' as const,
    body:
      'At this size the constraint is rarely the engineering. What sets the pace is the agreement that has to happen before anything ships, and a plan that ignores that will slip. We’d rather put it in the schedule than find it late.',
  },
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
              {/* 105-130 characters, 3 lines, 1920 only — the 768 frame drops
                  this paragraph entirely and the build hides it below lg.
                  The drawn box is 651px running to x1798, which is 41px PAST
                  the content column's right edge, so the build gives it 610
                  (see the grid above). At 610 the design's own placeholder
                  breaks to four lines; 126 holds three at both widths, but the
                  margin is one word. Re-measure at 610, not 651. */}
              <p className="t-item hidden font-semibold text-cloud lg:block">
                The work is the same at every size. What changes is how much
                already exists and how long it takes to get a decision made.
              </p>
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
              {industries.map(({ name, shape, body }, i) => (
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
                    <SlideArrow direction="prev" />
                  </a>

                  <div className="mx-auto w-[458px] max-w-full lg:mx-0 lg:w-auto">
                    <IndustryMark shape={shape} />
                    <h3 className="t-item text-cloud">{name}</h3>
                    {/* 18px at 1920, not `.t-body`'s 16 — the one place on the
                        page the designs set body copy a step UP. */}
                    <p className="t-body mt-[19px] text-cloud lg:max-w-[441px] lg:text-[18px] lg:leading-[27px]">
                      {body}
                    </p>
                  </div>

                  <a
                    href={`#industry-${(i + 1) % industries.length}`}
                    aria-label={`Next industry: ${industries[(i + 1) % industries.length].name}`}
                    className="mt-[110px] shrink-0 text-cloud outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent lg:hidden"
                  >
                    <SlideArrow direction="next" />
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
                  paragraph. The 768 frame draws it 462 wide (x153, centred),
                  so md takes that; below md the 380 cap only binds above
                  ~430, and phones get the full column either way. */}
              <p className="t-body mx-auto mt-6 max-w-[380px] text-center text-ink-muted md:max-w-[462px] lg:max-w-[380px]">
                Short answers to what people ask us most. If yours isn’t here,
                just ask.
              </p>
              <div className="mt-6">
                <Faq items={faqs} />
              </div>
            </div>
          </div>
        </section>

        <ProcessSection />

        {/* ── Ready for success? ──────────────────────────────────────────
            Copy left, form right (x975). A photograph bleeds off the left edge
            (1165x728 at x-208).

            overflow-clip, NOT overflow-hidden. Hidden makes the section a
            scroll container, and the diamond's view timeline (.binary-diamond
            in globals.css) would track its place inside the section, which
            never changes, rather than in the viewport, so it would never move.
            Clip trims the same edges without that. */}
        <section className="relative overflow-clip py-32" aria-labelledby="contact">
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
                {/* Both sentences come from site.ts. They were written out
                    here, in ContactDetails and in BuildVision, and had already
                    drifted into three different promises — see the note beside
                    `replyPromise`. One source, so they cannot drift again. */}
                {/* 600 is a real instance, not a synthesised bold: fonts.ts
                    loads Open Sans as a variable font across 400-700. */}
                <p className="t-body relative z-10 mt-6 max-w-md font-semibold text-ink-muted">
                  {site.contactInvite} {site.replyPromise}
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
