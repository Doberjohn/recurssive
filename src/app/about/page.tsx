import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { BuildVision } from '@/components/BuildVision'
import { Picture } from '@/components/ui/Picture'
import { purposeRows, values, processSteps } from '@/content/about'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'About',
  // Picked by the owner (2026-09-30) from four options built only from the
  // approved copy below. Also the link-preview text on social shares.
  description:
    'Recurssive is John Fanidis’s web and app studio in Thessaloniki, Greece. On mobile we specialise in making slow apps fast and putting AI inside them.',
  path: '/about',
})

/**
 * Frame: 1920x6122 / 768x5858.
 *
 * The file also holds two 1920 hero ALTERNATES. They are not scroll states or
 * extra sections — they are the same hero with the photograph swapped to
 * `evgeni-tcherkasski` (in the pipeline as `about-square`), which is one of the
 * cleared Unsplash images. That swap exists because the drawn hero photo is a
 * "Tony Noel" image with no licence and an identifiable subject, still an open
 * blocker. `about-hero` is used here as the authoritative frame draws it; the
 * alternate is a one-word change if the licence does not clear.
 *
 * Section sizes below are the drawn pairs. Where 1920 and 768 differ the pair is
 * written as base/lg — several things on this page genuinely do NOT ramp
 * ("Our Values", every value name, the recursion heading), which is unusual for
 * this site and is left flat on purpose.
 */
export default function About() {
  return (
    <>
      <Nav tone="light" />

      <main className="flex flex-1 flex-col">
        {/* ── Hero ─────────────────────────────────────────────────────────
            The photo, its scrim and the diagonal grid are all drawn at the SAME
            pixel size at both breakpoints — only their x-offset pans. So this
            band is one of the few places where a flat value is correct. */}
        <section className="relative isolate flex min-h-[min(1201px,100svh)] flex-col justify-end overflow-hidden pb-14 lg:pb-[132px]">
          {/* FOUR LAYERS, in the export's own paint order. Reading Hero.svg
              top to bottom: photo, mesh, scrim, grid — then the text. An
              earlier build had only the photo and a scrim, and compensated for
              the two missing layers by making the scrim 40/50/80% black. */}
          <div className="absolute inset-0 -z-10">
            {/* `grain` matches Home's Industries and Our Process bands. AVIF strips
                film grain at any web size — structure survives, fine texture
                does not — and Grain is a stated brand principle (deck
                pp210-221). The overlay is calibrated in generated/mesh.css:
                the source's own grain measures sigma 1.76 at 1920 display
                width, and the tile at 10% measures 2.02, the closest match.
                It sits UNDER the mesh, scrim and grid, which are siblings
                painted after it — the same order Home uses. */}
            <Picture
              name="about-hero"
              alt=""
              fill
              sizes="100vw"
              priority
              grain
              className="h-full w-full"
            />

            {/* Mesh over the photo — and THE BAND IS 1201, NOT 1231.
                Drawn as a 2068.8x1293 rect at 1994.8,1201 under rotate(-180),
                which maps it to -74..1994.8 x -92..1201. The photo (-97+1298)
                and the scrim (-92+1293) both end at 1201 too; only the grid and
                the export canvas run past it. Solving the background-position
                for each candidate height is what settles it — a 1201 band puts
                the mesh at y 100.00% exactly, a 1231 band at 148.39%. It is
                bottom-anchored to a 1201 band.

                `cover` is NOT this crop: on 1920x1201 it resolves height-driven
                to 1969.6 wide, where the file draws 2068.8 (107.75%).

                Uses `.mesh` rather than a hand-rolled background, which is the
                whole point — .mesh::after carries the grain. Written as a bare
                background first, and since the meshes are inlined at 128x80
                with their grain destroyed, the layer came out perfectly smooth.
                Home's identical layer (page.tsx:769, also --mesh-2 rotated 180
                at 75%) uses .mesh for exactly this reason. */}
            <div
              aria-hidden="true"
              className="mesh absolute inset-0 rotate-180 opacity-75 [--mesh:var(--mesh-2)] [--mesh-size:107.75%_auto] [--mesh-pos:49.73%_100%]"
            />

            {/* The scrim is FAR lighter than it looks like it should be. The
                file draws #0F0F0F at stop-opacity 0 -> 1 on a rect whose own
                fill-opacity is 0.25, so it is transparent at the top and 25%
                black at the bottom — never darker. It reads as enough contrast
                only because the mesh above is doing most of the work, which is
                why these two changed together. Same construction as
                app/page.tsx:778. */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-phantom opacity-25" />

            {/* The diagonal armature, painted OVER the scrim and under the
                text, as in the file. Four strokes verbatim from Hero.svg:
                the frame rect plus three diagonals, #FAFAFA at stroke-opacity
                0.5 and stroke-width 0.499318.

                The geometry deliberately overruns the viewBox (y -152..1230 on
                a 0..1201 band) and is clipped by it — that is how the export is
                drawn, so the numbers are carried across unchanged rather than
                normalised. non-scaling-stroke holds the hairline as the box
                scales, matching BrandGrid. */}
            <svg
              aria-hidden="true"
              viewBox="0 0 1920 1201"
              fill="none"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
            >
              <g stroke="#FAFAFA" strokeOpacity="0.5" strokeWidth="0.499318" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke">
                <path d="M-18.4067 -152L-18.4067 1230.03L1938.4 1230.03V-152L-18.4067 -152Z" />
                <path d="M-16.9875 1229.06L1938.41 -151.977" />
                <path d="M1938.41 1230.04L1191.72 -151.995" />
                <path d="M728.277 1230.04L-18.4065 -151.996" />
              </g>
            </svg>
          </div>

          {/* Feel Form Function. The frame draws 140/130/130 at 1920, but both
              hero alternates draw all three at a uniform 147.7 — and three
              near-identical sizes read as a slip, not a rhythm. Uniform here. */}
          <div className="container-content">
            {/* Drawn 140 at 1920 and 52 at 768 — which sound far apart but are
                nearly the same proportion of the viewport (7.29vw against
                6.77vw), so this is one ramp per breakpoint rather than a step.
                A single 13.5vw rule gave 101px at 768, twice the drawn size.

                The word gap is drawn 225 at 1920 and 77 at 768, i.e. ~11vw at
                both. NOT cqi — there is no container-type on any ancestor here,
                so container units would silently resolve against the viewport. */}
            {/* THREE STOPS, NOT ONE, AND NONE OF THEM IS A FULL STOP.
                Hero.svg draws a 26x26 mesh-filled square after every word —
                at x411, x970 and x1732.8, all with their bottom on the y877.4
                baseline. The build previously typed a single "." on the third
                word in flat #FAFAFA, which lost two of the three and turned
                the third into type. `.hero-stop` in globals.css carries the
                geometry and --mesh-1.

                The stops are inside each word's span so they travel with it
                when the band wraps at narrow widths. `aria-hidden` because a
                screen reader should hear "Feel Form Function", and the
                sentence-final period is supplied to it by the last span's
                visually hidden text rather than by the artwork. */}
            {/* justify-between at lg, NOT the fixed 11vw gap, and the reason is
                worth keeping. The export's two gaps are 243.1 and 244.8 — equal
                — and the third stop's right edge lands on 1757.9 against a
                content column that ends at 1757. So the lockup is three words
                on equal gaps pinned to both edges of the column, which is what
                justify-between IS.

                A fixed gap cannot reproduce it here, because our advance boxes
                are wider than the export's outlined ink (Feel measures 250
                against a drawn 238.6). At the drawn gap the band overruns the
                column by ~45px and wraps once the three stops are added, which
                is exactly what happened on the first pass. justify-between
                absorbs the metric difference and keeps both ends on the drawn
                marks. Below lg the words stack, so the 11vw gap still governs. */}
            <p className="flex flex-wrap gap-x-[11vw] font-heading font-semibold leading-none tracking-[-0.05em] text-cloud [font-size:clamp(30px,6.77vw,52px)] lg:justify-between lg:gap-x-8 lg:[font-size:min(140px,7.29vw)]">
              <span>
                Feel<span aria-hidden="true" className="hero-stop" />
              </span>
              <span>
                Form<span aria-hidden="true" className="hero-stop" />
              </span>
              <span>
                Function<span aria-hidden="true" className="hero-stop" />
                <span className="sr-only">.</span>
              </span>
            </p>

            <p className="mt-[52px] text-xl font-semibold text-accent lg:mt-[84px] lg:text-sm">
              (Our Story)
            </p>
            {/* 846px @16px, drawn 3 lines. MEASURED ceiling 323 — 360 breaks
                to four. The founder's story, as the (Our Story) label says:
                it names the owner and keeps the studio's "we", which is the
                owner's call, and nothing here claims a team. An earlier draft
                glossed Feel / Form / Function instead; the lockup now stands
                on its own as the tagline. Owner-approved, see content/about.ts. */}
            <p className="t-body mt-[14px] max-w-[846px] text-cloud lg:ml-[82px] lg:-mt-1">
              John Fanidis started Recurssive after more than ten years of
              building software, in-house and for clients, to be the one
              choosing the work. We design and build websites and apps, and on
              mobile we specialise in making slow apps fast and putting AI
              inside them.
            </p>
          </div>
        </section>

        {/* ── Purpose / Vision / Mission ───────────────────────────────────
            Measured against Qualities.svg (1595x623, the content column
            exactly). It resolves to TWO EQUAL 620 COLUMNS with the label in a
            66px gutter to their left:

              label    ink x1.4    (so the column edge, 163 absolute)
              heading  ink x66     -> box x66 w620, ending 686; row 3's ink
                                      reaches 683.2, just inside it
              body     ink x976.2  -> box x975 w620, ending on the 1595 edge

            The heading column is FIXED, not flowed. An earlier build put the
            heading in a flex row after the label with a 64px gap, so its x
            moved with the label's width — 289.5 / 274.4 / 285.3 against a
            drawn 229 every time. The 620 cap also matters on its own: without
            it "We create to inspire others to create." fits on one line at
            764, where the file draws all three headings over two.

            Vertically the LABEL sits highest and the heading drops below it —
            drawn ink deltas 26.8 / 18.8 / 24.8, mean 23.5. The earlier build
            had that inverted, pushing the label down 22px instead. */}
        <section className="container-content mt-[105px] flex flex-col gap-[57px] lg:mt-[108px] lg:gap-[70px]">
          {purposeRows.map((row) => (
            <div key={row.label} className="lg:flex lg:items-start lg:justify-between lg:gap-16">
              <div className="lg:flex lg:w-[686px] lg:gap-0">
                <p className="text-xl text-ink-muted lg:w-[66px] lg:shrink-0 lg:text-sm">{row.label}</p>
                <h2 className="t-step mt-[17px] font-heading font-semibold text-ink lg:mt-[24px]">
                  {row.heading}
                </h2>
              </div>
              <p className="t-body mt-[23px] text-ink-muted lg:mt-[39px] lg:max-w-[620px]">
                {row.body}
              </p>
            </div>
          ))}
        </section>

        {/* ── Story image + Our Values ─────────────────────────────────────
            Image left, values right at 1920 (values column at x1418). The
            heading and every value name are drawn at ONE size for both
            breakpoints — 32 and 48 — so neither ramps. */}
        <section className="container-content mt-[55px] lg:mt-[176px]" aria-labelledby="values">
          {/* Grain on the five value names, lifted verbatim from Values.svg.
              The file gives each name its own filter — fractalNoise at
              baseFrequency 2 2, three octaves, seed 2805, thresholded by a
              discrete alpha ramp of 51 ones then 49 zeros, clipped to the
              glyph and flooded with black at 25%.

              An SVG filter rather than the --grain tile because the tile
              cannot be clipped to letterforms: .mesh::after and .grained::after
              are both separate boxes, and there is no box here, only glyphs.
              This is the file's own mechanism, not an approximation of it.

              baseFrequency is in user units, so the noise stays a fixed size in
              screen space as the heading ramps — the same behaviour the 128px
              tile has everywhere else. */}
          <svg aria-hidden="true" width="0" height="0" className="absolute">
            <defs>
              <filter
                id="value-grain"
                x="-5%"
                y="-5%"
                width="110%"
                height="110%"
                filterUnits="objectBoundingBox"
                primitiveUnits="userSpaceOnUse"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="2 2"
                  stitchTiles="stitch"
                  numOctaves="3"
                  seed="2805"
                  result="noise"
                />
                <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
                <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                  <feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0" />
                </feComponentTransfer>
                <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped" />
                <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
                <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
                <feMerge result="effect1_noise">
                  <feMergeNode in="shape" />
                  <feMergeNode in="color1" />
                </feMerge>
              </filter>
            </defs>
          </svg>
          {/* Proportions, not pixels. A fixed 1130 image is wider than the whole
              content column below ~1300, which pushed the values list 635px off
              the right edge at 1024. The drawn split holds at every width.

              THE BLEED IS NOW IN. Values.svg draws the card at x -40 with
              w1300 h1300 rx20, against a container running 163..1757 — so it
              starts 203px LEFT of the container and 40px off the viewport,
              and ends 1097px into the column. Everything is expressed as a
              percentage of the container so the split survives every width;
              at 1920 they resolve to the drawn pixels exactly:

                w  1300/1594 = 81.5558%      ml -203/1594 = -12.7353%
                the item then consumes 81.5558 - 12.7353 = 68.8206% of the line

              The gap follows from that, not from taste: the values column
              starts at 1419.5 (= 78.83% of the container), so the gap has to
              be 78.83 - 68.82 = 10.01%. It was 5%, which is why the values
              column sat ~220px left of the drawn position.

              A negative margin here bleeds LEFT, which in LTR does not extend
              the scrollable area — confirmed by scripts/check-overflow.mjs
              across 13 widths rather than assumed. */}
          <div className="lg:flex lg:items-start lg:gap-[10.01%]">
            <div className="relative aspect-[610/608] w-full shrink-0 overflow-hidden rounded-[20px] lg:-ml-[12.7353%] lg:aspect-[1300/1300] lg:w-[81.5558%]">
              <Picture
                name="about-desk"
                alt=""
                fill
                sizes="(min-width: 1024px) 68vw, 100vw"
                grain
                className="h-full w-full"
              />
              {/* Drawn as #0F0F0F with stops 0 at 0, 0.5 at 30% and 1 at the
                  bottom, on a rect whose own fill-opacity is 0.5 — so the real
                  ramp is 0 / 25% / 50%, never darker. It was 10% -> 70% here,
                  which is darker at the top than the design ever gets at the
                  bottom. Same opacity-halving construction as the hero scrim. */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-phantom/50 via-30% to-phantom opacity-50" />
            </div>

            {/* VERTICAL RHYTHM, solved against Values.svg rather than eyeballed.
                The file hangs the whole column off the image: "Our Values" ink
                sits 19.4 below the image top and the last body ink ends 7.9
                PAST its bottom, so the column spans 1288.5 against a 1300 image
                and reads as one block beside it.

                Ink offsets were measured, not assumed — canvas TextMetrics on
                the real fonts gives 10.2 for the 32px heading, 22.0 for the
                48px name and -1.5 at the foot of a 14px body. Solving the three
                unknowns against the drawn ink positions:

                  column mt   19.4 - 10.2            =  9.2   (was 64)
                  ol mt       (124.4 - 22) - 9.2 - 38.4 = 54.8 (was 98)
                  ol gap      268.25 - (72 + 10 + 63)  = 123.2 (was 59)

                268.25 is the mean of the drawn name-to-name pitches (266.9 /
                264.6 / 273.0 / 268.5). The old 59 gap gave 204, which is why
                the column finished ~230px short of the image and the spacing
                above and below did not match. */}
              <div className="mt-[64px] lg:mt-[9px] lg:min-w-0 lg:flex-1">
              <h2 id="values" className="font-heading text-4xl font-semibold text-ink-muted">
                Our Values
              </h2>

              <ol className="mt-[67px] flex flex-col gap-[41px] lg:mt-[55px] lg:gap-[123px]">
                {values.map((v, i) => (
                  <li key={v.name}>
                    {/* The index HANGS in a gutter; it does not flow. Values.svg
                        puts (01) at x1419.5 and both the name and its body at
                        1446, so the gutter is 26.5px and the two right-hand
                        elements share one left edge. Flowing it with a 28px gap
                        pushed the whole column to 1471.8. Same construction as
                        the (Purpose) labels above. */}
                    <div className="flex items-start gap-[clamp(16px,6vw,46px)] lg:gap-0">
                      <span className="text-xl text-ink-muted lg:w-[26.5px] lg:shrink-0 lg:pt-[2px] lg:text-sm">
                        ({String(i + 1).padStart(2, '0')})
                      </span>
                      <div className="min-w-0 lg:flex-1 lg:[container-type:inline-size]">
                        {/* Drawn a flat 48 at BOTH 1920 and 768, and left flat
                            was wrong: "Performance" is one unbreakable word ~275px
                            wide at 48px, against a 272px content column at 320.
                            That put the document 63px past the viewport at 320,
                            23 at 360, 8 at 375 — the same 383px every time,
                            which is the tell for a rigid element rather than a
                            layout that scales badly. Below 768 it ramps, because
                            320 is not a drawn width and something has to give.

                            THE SAME WORD BROKE AGAIN AT THE OTHER END. "48 holds
                            from 768 up" was only true while this section stacks.
                            At lg it goes side by side and this column drops to
                            21% of the container: 157px at 1024, 211 at 1280, and
                            311 only at 1920. The 275px word overran it at every
                            width up to roughly 1700, and below ~1250 the spill
                            reached past the viewport (CI measured the document
                            28px too wide at 1024, 23 at 1044, 12 at 1100).

                            So at lg the name is capped by its OWN column, the one
                            measure that is right at every width: min(48px,
                            16.5cqi). "Performance" is 5.74x its font size, so
                            16.5% of the column leaves ~5% spare by construction,
                            whatever width the column is. Both drawn frames keep
                            a full 48 (at 1920, 16.5cqi is 51px), and between them
                            the names scale: ~26px at 1024, 35 at 1280, 40 at 1440.

                            The container must be THIS div, and lg:flex-1 is
                            load-bearing. Inline-size containment sizes an element
                            as if it were empty, and this div has no flex-grow of
                            its own, so without flex-1 it collapses to zero width
                            and takes the body text with it. */}
                        {/* w-fit is load-bearing. Values.svg paints a separate
                            gradient per name, spanning exactly that word:
                            x1=1446 with x2 at the word's own right edge, so the
                            drawn spans are 200/188/275/197/205 against our ink
                            widths of 199/187/275/196/202. As a block the h3 was
                            505.6 wide, which stretched one gradient across the
                            column and meant no word ever reached #A59BFF —
                            every name rendered as flat dark purple. */}
                        <h3 className="text-brand-gradient w-fit font-heading font-semibold [filter:url(#value-grain)] [font-size:clamp(30px,6.25vw,48px)] lg:[font-size:min(48px,16.5cqi)]">
                          {v.name}
                        </h3>
                        <p className="mt-[10px] text-2xl text-ink lg:text-sm">{v.body}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ── We live & breathe recursion ──────────────────────────────────
            48px at BOTH breakpoints — no ramp, as drawn. */}
        <section className="container-content mt-[39px] lg:mt-[39px]">
          <h2 className="font-heading text-7xl font-semibold leading-none text-ink">
            We live &amp; breathe recursion
          </h2>
          {/* 1128px @16px, drawn 3 lines. The loosest slot on the site —
              measured ceiling is around 437, so length is not the constraint
              here and the paragraph can afford a real argument.

              THE ONE PLACE THE RECURSION METAPHOR IS THE SUBJECT. Deck p90
              gives the definition verbatim ("when a process becomes the input
              to itself"). The deck's river image (p112) was dropped at the
              owner's request: after the definition, the paragraph says plainly
              how the work runs. The copy deck's own critic counted NINE loop
              tokens on a draft About page and called it a tic, so the metaphor
              is allowed twice on this page: here, where it is what the heading
              is about, and nowhere else. The five process steps below
              deliberately do not reach for it. */}
          <p className="t-body mt-[58px] max-w-[1128px] text-ink-muted lg:mt-[73px]">
            Recursion is what happens when a process becomes the input to
            itself, and it’s how we work. An early version goes out to the
            people it’s for, and how they use it tells us what to change in
            the next one. Then the next one goes out, and the same thing
            happens again. You get something working early, and every version
            after that is shaped by the people using it.
          </p>
        </section>

        {/* ── Process strip ───────────────────────────────────────────────
            Five steps across at 1920. The 768 frame draws only the first two,
            which is an unfinished mock rather than a mobile design, so all five
            render and simply stack. */}
        <section className="mt-[356px] lg:mt-[356px]" aria-label="How we work">
          <hr className="border-0 border-t-[1.5px] border-surface" />
          <div className="container-content mt-[-15px]">
            <ol className="grid grid-cols-1 gap-x-[86px] gap-y-[48px] sm:grid-cols-2 lg:grid-cols-5">
              {processSteps.map((step, i) => (
                <li key={i}>
                  <h3 className="font-heading text-4xl font-semibold leading-[0.76] text-ink">
                    {step.name}
                  </h3>
                  <p className="t-body mt-[37px] max-w-[231px] text-ink-muted">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <div className="mt-[124px] lg:mt-[124px]" />
      </main>

      <BuildVision />
      <Footer />
    </>
  )
}
