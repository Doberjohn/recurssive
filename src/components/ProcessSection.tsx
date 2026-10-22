import { Picture } from './ui/Picture'
import { ProcessFlow, type Step } from './ProcessFlow'

/**
 * "Our Process": the photograph band with the four-step flowchart. Drawn
 * identically on Home and on the capability page (the Capability frames put
 * the same band, the same steps and shapes, at 1920 and 768), so it is one
 * component, moved here from app/page.tsx as it was.
 */

/** Four steps, each on its flowchart shape — the logo's own construction.
 *  Ask / Listen / Think is deck p88 verbatim: "The most powerful tools we have".
 *
 *  THE TWO FRAMES CONFLICT ON LENGTH AND CANNOT BOTH BE SATISFIED. 1920 draws
 *  a 696x75 box at 18px — three 27px lines, holding the 231-character lorem, so
 *  it wants 161-241. 768 draws 321x119 at 24px holding its OWN 89-character
 *  string. There is no overlap.
 *
 *  Written to 768, because that is the constraint that breaks VISIBLY and the
 *  failure is already on record: ProcessFlow.tsx:158-163 documents 123
 *  characters producing five lines where three are drawn, which put step 2's
 *  index 22px inside step 1's last line.
 *
 *  BUDGET 78-89, MEASURED on the built page, not derived. At 768 the box is
 *  329px at 21.78px: 89 characters holds three lines and 91 breaks to four, so
 *  89 is the hard stop. It is word-boundary sensitive — do not round up.
 *
 *  Write to the TOP of that window, not the middle. At 1920 the box is 721px at
 *  18px and one line holds about 85 characters, so a string in the low 80s
 *  renders ONE line against a drawn three while 85-89 renders two. Two is as
 *  close to the drawn block as this slot can get without a per-breakpoint
 *  string, and it only shortens the band — GAPS is a min-height, nothing
 *  collides. If the drawn 1920 block is ever wanted in full, the fix is a
 *  second string per breakpoint, not a longer sentence.
 *
 *  Step 04 is the flowchart's return leg, so it says what RETURNS rather than
 *  what ships. That is also what keeps "in front of real people" off this page
 *  a third time; the FAQ answer at L84 already owns the phrase. Step 01 must
 *  not open on "first" either — Web Design and Product Strategy already carry
 *  it, and a third instance is a three-row repeat. */
const process: Step[] = [
  {
    index: '01',
    name: 'Ask',
    label: 'Start the process',
    body: 'The opening questions are about your business and your customers, not about software.',
    shape: 'terminator',
  },
  {
    index: '02',
    name: 'Listen',
    label: 'Collect the data',
    body: 'Much of the answer already exists inside your company, and finding it is most of the job.',
    shape: 'io',
  },
  {
    index: '03',
    name: 'Think',
    label: 'Decide what to do',
    body: 'Options are weighed against cost and time, and you see the reasoning, not just a verdict.',
    shape: 'decision',
  },
  {
    index: '04',
    name: 'Create',
    label: 'Work on it',
    body: 'Then it gets built, and what you learn from real use decides where the next round goes.',
    shape: 'process',
  },
]

export function ProcessSection() {
  return (
    <>
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
          {/* Recurssive Language Pt.4, deck p226, placed verbatim as its
              opening sentence — this is the one band on the site where "we
              create in circles" is literally true of the diagram beneath it.
              The four verbs are deck p88.

              60-109 characters, 2 lines. The design's own string is 110 and
              sits exactly on two lines at 1920, so 109 is the hard ceiling.
              Verified 2 lines at all four measures (drawn 421@16 and 610@24,
              built 576@16 and 610@22). */}
          <p className="t-body mt-4 max-w-[610px] text-cloud lg:max-w-xl lg:text-silver">
            We create in circles. Ask, listen, think, create, then ask again
            with better questions than the first time.
          </p>

          <ProcessFlow steps={process} />
        </div>
      </section>
    </>
  )
}
