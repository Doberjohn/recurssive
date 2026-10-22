import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { BuildVision } from '@/components/BuildVision'
import { Logo } from '@/components/ui/Logo'
import { Picture } from '@/components/ui/Picture'
import { purposeRows, values, processSteps } from '@/content/about'
import { buildMetadata } from '@/lib/metadata'

/**
 * The binary column over the desk photo. In the file it is not text but 621
 * outlined glyphs (figspec "Group" @163,2089), #FAFAFA at fill-opacity 0.2:
 * 33 rows, strictly alternating, each starting on the digit the row above did
 * not. So it is drawn from those outlines rather than set in Inter. As live
 * text at 20% the strokes rendered heavier and softer than the file's, which
 * the owner saw as blur (2026-10-21).
 *
 * Coordinates are Group 2378.svg's, and every glyph is one of two outlines
 * moved into place: rows 2-30 all repeat row 2's or row 3's x positions, so a
 * row is one of two patterns moved down. The file snaps its outlines to a
 * ~0.43 grid, so a copy sits within 0.34px of the glyph it stands in for, at
 * 1920 and less below it.
 *
 * Rows 0, 31 and 32 lie wholly off the photo and are not drawn. The file has
 * row 1 5.4px right of the column; it stays in the column here, as it did when
 * this was text.
 */
const VALUES_BINARY = {
  /** The 0 and the 1 that open row 3, at their own coordinates. */
  glyphs: [
    'M172.495 159.717C172.495 159.717 169.042 159.285 167.316 157.99C165.589 156.695 164.726 155.4 164.295 153.242C163.863 151.084 163 148.925 163 145.904C163 142.882 163 140.724 164.295 138.565C165.158 136.407 166.021 135.112 167.316 133.817C168.611 132.954 170.337 132.09 172.495 132.09C174.653 132.09 175.947 132.522 177.674 133.817C179.4 135.112 180.263 136.407 180.695 138.565C181.558 140.724 181.99 142.882 181.99 145.904C181.99 148.925 181.99 151.084 180.695 153.242C179.832 155.4 178.969 156.695 177.674 157.99C176.379 159.285 174.653 159.717 172.495 159.717ZM172.495 156.695C172.495 156.695 175.948 155.832 177.242 154.105C178.105 152.379 178.969 149.357 178.969 145.904C178.969 143.745 178.969 141.587 178.105 139.86C177.674 138.134 176.811 136.839 175.947 135.975C175.084 135.112 173.79 134.68 172.495 134.68C170.768 134.68 169.042 135.544 168.179 137.702C167.316 139.86 166.453 142.45 166.453 145.904C166.453 148.062 166.453 150.22 167.316 151.947C167.747 153.674 168.611 154.969 169.474 155.832C170.337 156.695 171.632 157.127 172.926 157.127L172.495 156.695Z',
    'M196.228 132.521V159.284H193.206V135.974L186.733 140.29V136.837L193.638 132.521H196.659H196.228Z',
  ],
  /** Each glyph's x shift from its outline, in a row led by 0 (row 3) and in one led by 1 (row 2). */
  rowX: [
    [0, 0, 40.14, 39.71, 79.84, 79.85, 119.98, 119.99, 159.69, 159.69, 199.82, 199.83, 239.96, 239.53, 279.67, 279.68, 319.8, 319.37, 359.51],
    [-22.87, 17.27, 16.84, 56.97, 56.97, 97.11, 96.68, 136.81, 136.82, 176.95, 176.95, 216.65, 216.66, 256.8, 256.8, 296.93, 296.51, 336.63, 336.64],
  ],
  /** Rows 1-30, each one's y shift from the outlines. Row 1 is led by 0 and the leads alternate. */
  rowY: [
    -88.06, -44.03, 0, 44.12, 88.37, 132.41, 176.43, 220.47, 264.49, 308.53, 352.67, 396.7, 440.73, 484.76, 528.79,
    572.82, 616.85, 660.88, 704.91, 748.94, 792.97, 837, 881.03, 925.16, 969.2, 1013.45, 1057.46, 1101.51, 1145.52, 1189.57,
  ],
} as const

/**
 * The process strip's flowchart shapes, verbatim from Group 2374.svg: #0F0F0F,
 * all 84 tall. Each viewBox is the shape's own box in the export's coordinates,
 * so the paths need no translation. The diamond's rounded points sit exactly on
 * y0 and y84; its side tips are at 811.0 and 863.0, inside the box.
 */
const STRIP_SHAPES = {
  terminator: {
    w: 41,
    viewBox: '163 0 41 84',
    d: 'M183.5 84C194.822 84 204 65.196 204 42C204 18.804 194.822 0 183.5 0C172.178 0 163 18.804 163 42C163 65.196 172.178 84 183.5 84Z',
  },
  process: {
    w: 28,
    viewBox: '493 0 28 84',
    d: 'M496.203 84H517.797C519.566 84 521 82.5075 521 80.6665V3.33353C521 1.49247 519.566 0 517.797 0H496.203C494.434 0 493 1.49247 493 3.33353V80.6665C493 82.5075 494.434 84 496.203 84Z',
  },
  decision: {
    w: 52.286,
    viewBox: '810.857 0 52.286 84',
    d: 'M834.842 82.6982L811.429 43.5656C810.857 42.6142 810.857 41.3686 811.429 40.3998L834.842 1.28452C835.865 -0.428174 838.135 -0.428174 839.158 1.28452L862.571 40.4171C863.143 41.3686 863.143 42.6142 862.571 43.583L839.158 82.7155C838.135 84.4282 835.865 84.4282 834.842 82.7155V82.6982Z',
  },
} as const

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
            band is one of the few places where a flat value is correct.

            From md the band fills the screen, up to the drawn 1201, with the
            text at its foot. Below md it is only as tall as its content, and
            the lockup sits 180 under the logo: pt 252 is the nav's logo, which
            ends at 72 at every phone width, plus 180. Filling the screen there
            put 513px of bare photo between logo and words on a 440x956 phone,
            and 355 on a 390x844 — a gap that grew with the screen and carried
            nothing. 180 is the owner's pick from rendered options, 2026-10-22. */}
        <section className="relative isolate flex flex-col justify-end overflow-hidden pb-[70px] pt-[252px] md:min-h-[min(1201px,100svh)] md:pt-0 lg:pb-[132px]">
          {/* FOUR LAYERS, in the export's own paint order. Reading Hero.svg
              top to bottom: photo, mesh, scrim, grid — then the text. An
              earlier build had only the photo and a scrim, and compensated for
              the two missing layers by making the scrim 40/50/80% black.

              THE STAGE. All four are drawn at their 1920 pixel sizes at BOTH
              breakpoints, and only their x pans: the photo sits at x -21 in
              the 1920 frame and -463 in the 768 one, the mesh at -74 and -516,
              the grid at -18.4 and -460.4. That is one shared shift, -442 over
              1152px of frame width (0.38368 per px), so the layers live in one
              1920x1201 box that slides: left = 38.368% - 736.67px, which is 0
              at 1920 and -442 at 768. Inside it every layer keeps its 1920
              geometry, and nothing scales with the viewport.

              It used to be the hero box itself, which is right at 1920 only.
              At 768 the mesh (107.75% of the WIDTH) came out 827x517 and
              stopped in a hard line halfway down the band, the grid's 1920
              viewBox was squeezed into 768 under preserveAspectRatio none,
              which steepened every diagonal, and the photo was a centred cover
              crop whose centre sat 137px left of the drawn one and 48 lower.

              Above 1920 the stage widens with the band instead (max(1920px,
              100%), held at 1920:1201) so it still covers, and left clamps
              at 0. */}
          <div className="absolute left-[min(0px,calc(38.368%_-_736.67px))] top-0 -z-10 aspect-[1920/1201] w-[max(1920px,100%)]">
            {/* `grain` matches Home's Industries and Our Process bands. AVIF strips
                film grain at any web size — structure survives, fine texture
                does not — and Grain is a stated brand principle (deck
                pp210-221). The overlay is calibrated in generated/mesh.css:
                the source's own grain measures sigma 1.76 at 1920 display
                width, and the tile at 10% measures 2.02, the closest match.
                It sits UNDER the mesh, scrim and grid, which are siblings
                painted after it — the same order Home uses.

                Drawn 1969x1298 at -21,-97 in the 1920 frame, as percentages of
                the stage so it widens with it past 1920. The box is the
                source's own 1820:1200 shape, so the cover fit crops nothing. */}
            <div className="absolute left-[-1.0938%] top-[-8.0766%] h-[108.077%] w-[102.552%]">
              <Picture
                name="about-hero"
                alt=""
                fill
                sizes="1969px"
                priority
                grain
                className="h-full w-full"
              />
            </div>

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
          <div className="@container container-content">
            {/* Drawn 140 at 1920 and 52 at 768 — which sound far apart but are
                nearly the same proportion of the viewport (7.29vw against
                6.77vw), so this is one ramp per breakpoint rather than a step.
                A single 13.5vw rule gave 101px at 768, twice the drawn size.

                The word gap is drawn 225 at 1920 and 77 at 768. Only the 768
                one governs — lg spreads the words with justify-between — and
                below lg both the gap and the size are a share of the COLUMN,
                not the viewport: 77/610 = 12.62cqi and 52/610 = 8.525cqi, via
                the @container on this div. They were 10vw and 6.77vw, and vw
                counts a classic scrollbar, so in a 768 desktop window the 595
                column could not hold the three words and "Function." wrapped. */}
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
                marks. The 768 frame pins them the same way ("Function."'s
                stop ends on the column's right edge at 689), so this starts at
                md. Below md the words wrap and the 12.62cqi gap governs. */}
            <p className="flex flex-wrap gap-x-[12.62cqi] font-heading font-semibold leading-none tracking-[-0.05em] text-cloud [font-size:clamp(30px,8.525cqi,52px)] md:justify-between lg:gap-x-8 lg:[font-size:min(140px,7.29vw)]">
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

            {/* Inter, as both frames set every parenthesised label; it was
                rendering in Open Sans. 22px on a 22px line below lg, the
                frame's own box, so the story can hang from its baseline. */}
            <p className="mt-[57px] font-heading text-xl font-semibold leading-none text-accent lg:mt-[84px] lg:text-sm lg:leading-[1.5]">
              (Our Story)
            </p>
            {/* 846px @16px, drawn 3 lines. MEASURED ceiling 323 — 360 breaks
                to four. The founder's story, as the (Our Story) label says:
                it names the owner and keeps the studio's "we", which is the
                owner's call, and nothing here claims a team. An earlier draft
                glossed Feel / Form / Function instead; the lockup now stands
                on its own as the tagline. Owner-approved, see content/about.ts.

                From md the label HANGS: the 768 frame sets the story in a
                column from x205 to 690 (20.66% in from the 610 column), its
                first line starting where the label's ink ends, at 24px / 36.
                Below md it stacks under the label, as the purpose rows do. */}
            <p className="t-body mt-[20px] max-w-[846px] text-cloud md:ml-[20.66%] md:-mt-[9px] lg:ml-[82px] lg:-mt-1">
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
            had that inverted, pushing the label down 22px instead.

            From md the 768 frame HANGS the heading instead: it starts 94px in
            (15.41% of the 610 column) with its first line's caps on the
            label's baseline, 44px leading, and breaks "We create to inspire /
            others to create." — text-wrap: balance gives those breaks for all
            three. The label is Inter, as both frames set it. The body runs the
            full column at 24px.

            Below md (phones) they stack again. The 22px label is ~93px wide
            and the indent shrinks with the column (53px at 390), so a hanging
            heading's first line ran into the label's descenders. */}
        <section className="container-content mt-[105px] flex flex-col gap-[47px] lg:mt-[108px] lg:gap-[70px]">
          {purposeRows.map((row) => (
            <div key={row.label} className="lg:flex lg:items-start lg:justify-between lg:gap-16">
              <div className="lg:flex lg:w-[686px] lg:gap-0">
                <p className="font-heading text-xl font-semibold leading-none text-ink-muted lg:w-[66px] lg:shrink-0 lg:text-sm lg:leading-[1.5]">{row.label}</p>
                <h2 className="t-step mt-[21px] text-balance font-heading font-semibold leading-[1.1] text-ink md:ml-[15.41%] md:-mt-[6px] lg:ml-0 lg:mt-[24px] lg:text-wrap lg:leading-[1.05]">
                  {row.heading}
                </h2>
              </div>
              <p className="t-body mt-[17px] text-ink-muted lg:mt-[39px] lg:max-w-[620px]">
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
            {/* lg is 1300x910 (10:7), not the drawn square: at 1300 tall the
                photo outgrew a desktop viewport, and the owner asked for it
                shorter (2026-10-21). Width and bleed are untouched; only the
                crop tightens — see the object-position note below. */}
            <div className="relative aspect-[610/608] w-full shrink-0 overflow-hidden rounded-[20px] lg:-ml-[12.7353%] lg:aspect-[1300/910] lg:w-[81.5558%]">
              {/* 65.9%, not centre. Group 2378.svg draws the 3277x4096 source
                  at the card's width and 16.47% of the card above its top,
                  which is 65.9% of the overflow; centred, the crop sat 52px
                  higher in the photo at 1920.

                  grayscale: the export embeds the photo with R = G = B on every
                  pixel. Same CSS treatment as Home's desaturated photographs.

                  lg centres it instead. The 10:7 frame shows 56% of the
                  photo's height, and centred that is 22-78%: the monitor (its
                  top bezel just trimmed) down to the lower hand, which is the
                  whole subject; above it is bare wall, below it desk edge.

                  Below lg the 768 export draws it 2.26% PAST cover, its left
                  edge 4px out and its top 109.7 above the card. Scaling the
                  65.9% crop by 1.0226 about 29% / 40.9% of the card lands on
                  both exactly.

                  HALF the site's photo grain. --grain-photo-opacity was
                  calibrated against a different photograph, and at full
                  strength this one came out nearly twice as grainy as the
                  frame, which fuzzed the binary digits on top of it (eased at
                  the owner's call, 2026-10-21). Measured on one patch of bare
                  wall left of the digits, the same source pixels in each, as
                  the residual after a sigma-2 blur (scripts/probe-mesh.mjs):

                           frame        full grain   half
                    1920   1.16-1.33    2.24         1.22
                    768    0.97         1.41         1.00

                  The frame's 1920 range is Group 2378.svg rendered by Chrome
                  and its photo resized by lanczos; 768 has only the latter. A
                  fraction of the variable, not a flat value, so it still drops
                  under the <=768 rule in generated/mesh.css, as
                  .hero-stop::after does. */}
              <Picture
                name="about-desk"
                alt=""
                fill
                sizes="(min-width: 1024px) 68vw, 100vw"
                grain
                className="h-full w-full after:opacity-[calc(var(--grain-photo-opacity)*0.5)]"
                imgClassName="grayscale object-[50%_65.9%] origin-[29%_40.9%] scale-[1.0226] lg:object-center lg:scale-100"
              />
              {/* NO SCRIM. Values.svg and the .fig layer order put a #0F0F0F
                  0 / 25% / 50% ramp over this photo, but Group 2378.svg, the
                  newer export, paints that rect UNDER the photo, and the photo
                  is fully opaque (alpha 255 throughout), so it never shows.
                  Removed to match, at the owner's call (2026-10-21). */}

              {/* The binary column (VALUES_BINARY), painted over the photo as
                  the export paints it. The viewBox is the photo's own rect in
                  Group 2378.svg, -40,49 and 1300 square, so the field scales
                  with the photo: the 768 frame draws the same group at 179
                  wide and 95 in on a 610 photo, the same 29.3% and 15.6%. The
                  square runs past the 10:7 crop at lg and the photo clips it.

                  fill-opacity, as the file has it, not opacity: each glyph is
                  painted at 20% where it lands, with no layer composited over
                  the photo. */}
              <svg
                aria-hidden="true"
                viewBox="-40 49 1300 1300"
                fill="#FAFAFA"
                fillOpacity="0.2"
                className="pointer-events-none absolute left-0 top-0 h-auto w-full"
              >
                <defs>
                  {VALUES_BINARY.glyphs.map((d, digit) => (
                    <path key={digit} id={`values-binary-${digit}`} d={d} />
                  ))}
                  {VALUES_BINARY.rowX.map((xs, lead) => (
                    <g key={lead} id={`values-binary-row-${lead}`}>
                      {xs.map((x, i) => (
                        <use key={i} href={`#values-binary-${(i + lead) % 2}`} x={x} />
                      ))}
                    </g>
                  ))}
                </defs>
                {VALUES_BINARY.rowY.map((y, i) => (
                  <use key={i} href={`#values-binary-row-${i % 2}`} y={y} />
                ))}
              </svg>
            </div>

            {/* VERTICAL RHYTHM, solved against the export rather than eyeballed
                (Values.svg, then Group 2378.svg, which agree on this geometry).
                The file hangs the whole column off the image: "Our Values" ink
                sits 19.4 below the image top and the last body ink ends 7.9
                PAST its bottom, so the column spans 1288.5 against a 1300 image
                and reads as one block beside it.

                The names are 48px/100% in the frame, so their line box is 48.
                It was inheriting 72 (1.5), which put every body 16px too far
                under its name (70.5 against ~54.5) and ran the last one 18.4
                past the image. Re-solved with the 48 box, measured at 1920:

                  column mt   "Our Values" ink 19.4 under the image   = 12.7
                  ol mt       first name ink 124.4 under it            = 68.8
                  body mt     name ink to body ink, drawn ~54.5        =  6.4

                THEN THE OWNER MOVED THE HEADING OUT (2026-10-21). With the
                image cut to 910 the values had too little room, so "Our
                Values" now sits ABOVE the image's top line — its baseline 40
                over it — and the five values alone span the image height: the
                first index's ink starts on the top line, the last body's ink
                ends on the bottom one. Measured offsets: the heading's baseline
                is 30.7 into its 38.39 box, the first index's ink 11.59 above the
                list's top, its name's 16.09 below that index, and 111.89 from
                the last name's ink to the last body's. Hence:

                  column mt   -(40 + 30.7)                             = -70.7
                  ol mt       11.59 - (-70.7 + 38.39)                   = 43.9
                  ol gap      (910 - 16.09 - 111.89) / 4 - (48 + 6.4 + 63) = 78.1 */}
              <div className="mt-[76.7px] lg:-mt-[70.7px] lg:min-w-0 lg:flex-1">
              {/* tracking-normal: both frames set "Our Values" at Inter 32
                  with no tracking (169 wide), where text-4xl brings -5%. */}
              <h2 id="values" className="text-center font-heading text-4xl font-semibold tracking-normal text-ink-muted lg:text-left">
                Our Values
              </h2>

              <ol className="mt-[37.8px] flex flex-col gap-[20.25px] lg:mt-[43.9px] lg:gap-[78.1px]">
                {values.map((v, i) => (
                  <li key={v.name}>
                    {/* The index HANGS in a gutter; it does not flow. Values.svg
                        puts (01) at x1419.5 and both the name and its body at
                        1446, so the gutter is 26.5px and the two right-hand
                        elements share one left edge. Flowing it with a 28px gap
                        pushed the whole column to 1471.8. Same construction as
                        the (Purpose) labels above.

                        Inter, as the frame sets it; it was rendering in Open
                        Sans. Semibold is the owner's call (the frame draws
                        Regular). Vertically it sits above the name's ink, by
                        8.9 / 16.1 / 15.0 / 14.4 / 10.9 in Group 2378.svg —
                        placed by hand — and all five take 16.1, the top of that
                        range: the semibold digits are ~3px wider, and at the
                        mean, 13.1, they met the names corner to corner, 0.5px
                        apart on "(05)".

                        Below lg the gutter starts 10px OUTSIDE the column, so
                        the index sits 10px left of the drawn x and the names
                        keep theirs. Those wider digits left 0.4-1.6px between
                        "(02)"-"(05)" and their names, which read as touching on
                        a phone; the owner had them pulled left (2026-10-22). */}
                    <div className="flex items-start">
                      <span className="-ml-[10px] -mt-[9.4px] w-[56px] shrink-0 font-heading text-xl font-semibold text-ink-muted lg:ml-0 lg:-mt-[15.6px] lg:w-[26.5px] lg:text-sm">
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
                        {/* Padding cancelled by margin: layout is untouched,
                            but the box the gradient (background-clip: text) and
                            the grain filter paint into now reaches the ink.
                            With the 48px line box, y, p and g ran 3.5-4.5px
                            below it and were cut off; and the -0.05em tracking
                            follows the last letter too, so every word's final
                            glyph ran 1-2.4px past the box's right edge. */}
                        <h3 className="text-brand-gradient -mb-[0.2em] -mr-[0.1em] w-fit pb-[0.2em] pr-[0.1em] font-heading font-semibold [filter:url(#value-grain)] [font-size:clamp(30px,6.25vw,48px)] leading-none lg:[font-size:min(48px,16.5cqi)]">
                          {v.name}
                        </h3>
                        <p className="t-body mt-[16px] text-ink lg:mt-[6.4px] lg:text-sm">{v.body}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ── We live & breathe recursion ──────────────────────────────────
            48px at BOTH breakpoints — no ramp, as drawn.

            Placed from Group 2377.svg against the frame (its card sits at
            y3798, so the heading ink is at 3621.4). The last value body's ink
            ends at 3445.9, a 175.5 gap; this was 39 and the heading sat 131px
            high. 170 = 175.5 less the 1px the values section runs past that
            ink and the 4.5 the heading's ink sits inside its box.

            Below lg the 768 export (About.svg) puts the heading ink 97.7 under
            the last value body's ink; this was 39, half that. */}
        <section className="container-content mt-[85.7px] lg:mt-[170px]">
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
          {/* lg 20.5: Group 2377.svg puts the paragraph ink 69.4 under the
              heading ink. 73 put it at 121.5. Below lg the 768 export puts it
              20.3 under, at 24px / 36; 58 put it 72 under. */}
          <p className="t-body mt-[5px] max-w-[1128px] text-ink-muted lg:mt-[20.5px]">
            Recursion is what happens when a process becomes the input to
            itself, and it’s how we work. An early version goes out to the
            people it’s for, and how they use it tells us what to change in
            the next one. Then the next one goes out, and the same thing
            happens again. You get something working early, and every version
            after that is shaped by the people using it.
          </p>

          {/* The card, from Group 2377.svg: 1594x900 r20, the full content
              width, its top 43.2 under the paragraph's ink (41 from its box).
              The 768 frame draws it 610x347, so each breakpoint keeps its own
              aspect.

              The fill is the "gradient-2" image — the same file the hero's
              stops use, which is --mesh-1 (globals.css, .hero-stop). The export
              draws it at 140.73% x 155.79% of the card, offset -355 / -30.7,
              i.e. 54.67% / 6.11% of the overflow, and rotates the card 180deg.
              Only the mesh layer turns, so the mark stays upright.

              The mark is 428.3 wide, 26.87% of the card at both breakpoints
              (164 on the 768 card's 610). LOGO_PATHS rather than the export's
              own copy: the two are 1.8% apart in aspect, and this is the mark.

              lg:w-[70%]: the drawn full width read too big, and the owner asked
              for it 30% smaller and centred in the column (2026-10-21) —
              1116x630 at 1920. The mark and the mesh crop are both
              proportional, so they shrink with it. */}
          <div className="relative mt-[31px] aspect-[610/347] overflow-hidden rounded-[20px] lg:mx-auto lg:mt-[41px] lg:aspect-[1594/900] lg:w-[70%]">
            <div
              aria-hidden="true"
              className="mesh absolute inset-0 rotate-180 [--mesh-pos:54.67%_6.11%] [--mesh-size:140.73%_155.79%] [--mesh:var(--mesh-1)]"
            />
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 w-[26.87%] -translate-x-1/2 -translate-y-1/2 text-cloud"
            >
              <Logo className="h-auto w-full" />
            </div>
          </div>
        </section>

        {/* ── Process strip ───────────────────────────────────────────────
            Five steps across at 1920. Below lg the 768 export runs them as ONE
            SIDEWAYS STRIP: "Start" at x79, "Process" at x502 with its text
            running off the frame's edge, so the rest are a swipe away. Built
            that way at the owner's call (2026-10-21); they used to stack, which
            took ~1100px where the strip takes 230. Each step keeps the 337
            text (14.04em of its 24px body, so it narrows on a phone), 29px
            apart, snapping step by step, the scroller bled to both screen
            edges so the steps run off them as drawn.

            From Group 2374.svg. Each step is its shape (STRIP_SHAPES), 16px,
            then a 231 text column, and the five spread edge to edge: the drawn
            shapes sit at 0 / 330 / 647.9 / 989 / 1307 across the 1594 column,
            which is exactly what justify-between makes of those widths.

            The 1.5px rule runs through the shapes' middle: their top is 43.25
            above its centre, hence -44 after the rule's own 1.5. Below the
            shape top the export puts the name's ink at 29.4 and the body's at
            71.8; this had the bodies 24px low. The rule runs through the names
            too, as drawn — lifting them clear of it was tried and rejected by
            the owner (2026-10-21).

            The section starts 136 under the card at 1920 and 104 at 768, both
            measured to the rule's centre. */}
        <section className="mt-[103px] lg:mt-[135px]" aria-label="How we work">
          <hr className="border-0 border-t-[1.5px] border-surface" />
          <div className="container-content mt-[-44px]">
            {/* Five across from xl, not lg. At 1024 the five text columns get
                90-102px, the bodies run to ten lines and "Process" (115px)
                overruns its column into the next shape — so lg..xl takes two
                columns, the 768 frame's 337 text capped by the half width.

                The strip is focusable because it scrolls: keyboard users reach
                the steps past the edge with the arrow keys. Its scrollbar is
                hidden, as drawn; the second step running off the edge is what
                says there is more. */}
            <ol
              tabIndex={0}
              aria-label="Process steps"
              className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-x-[29px] overflow-x-auto px-6 [scrollbar-width:none] md:-mx-[79px] md:scroll-px-[79px] md:px-[79px] lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-[48px] lg:overflow-visible lg:px-0 xl:flex xl:justify-between xl:gap-x-6 [&::-webkit-scrollbar]:hidden"
            >
              {processSteps.map((step, i) => {
                const s = STRIP_SHAPES[step.shape]
                return (
                  <li key={i} className="flex shrink-0 snap-start items-start gap-4 lg:shrink xl:min-w-0">
                    <svg
                      aria-hidden="true"
                      viewBox={s.viewBox}
                      width={s.w}
                      height={84}
                      className="shrink-0 overflow-visible fill-ink"
                    >
                      <path d={s.d} />
                    </svg>
                    <div className="shrink-0 pt-[30px] lg:min-w-0 lg:max-w-[337px] lg:flex-1 xl:max-w-none xl:flex-none xl:shrink xl:basis-[231px]">
                      <h3 className="font-heading text-4xl font-semibold leading-[0.76] text-ink">
                        {step.name}
                      </h3>
                      <p className="t-body mt-[12.4px] w-[14.04em] text-ink-muted lg:mt-[13px] lg:w-auto">{step.body}</p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </section>

        {/* lg 159.5: the frame has the strip's body ink ending at 4950.5 and
            the build-vision band starting at 5111, 160.5 apart. The 768
            export has them 54.2 apart, measured from the strip's tallest
            (four-line) body. */}
        <div className="mt-[45.3px] lg:mt-[159.5px]" />
      </main>

      <BuildVision />
      <Footer />
    </>
  )
}
