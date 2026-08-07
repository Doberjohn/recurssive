import Link from 'next/link'
import { Picture } from './ui/Picture'
import type { ImageName } from '@/lib/images.generated'

/**
 * The service index — six rows on an exact 100px pitch (rules y1398 to 1998).
 *
 * Re-measured against `What we do best.svg`, a standalone 1920x719 export of
 * this section. Per row, x against a content column of 163..1757:
 *   (0N)         x163, 14px Open Sans, #6B6B6B, box top row+28
 *   name         x191, 32px Inter Bold, #0F0F0F, box top row+30
 *   description  x522 (878 wide), 16px Open Sans, #0F0F0F, box top row+28
 *   arrow        x1723, vertically centred
 *
 * Three things that export settled, all of which were wrong here before:
 *
 *  1. The rules are 1.5px, not 1px — and the 100px pitch is measured line to
 *     line, so the row's own box is 98.5 with the border making up the rest.
 *  2. The names carry NO letter-spacing. `.t-item` sets -0.05em, which is right
 *     for every other user of that class but not for these: the drawn text
 *     boxes are 221/196/188/208/209/267 and the same strings measure
 *     219.6/195.8/187.3/208.4/209.5/264.6 at tracking 0, against 200.4..239.0
 *     with -0.05em. The 768 frame agrees (Inter Bold 36/100%, no tracking).
 *  3. The index is NOT vertically centred. Its box sits at row+28, level with
 *     the description's first line, which reads as a superscript against the
 *     32px name beside it. Centring put it 11.6px lower.
 *
 * `What we do best mobile.svg` (768x1357) then settled the narrow layout, which
 * had been a guess. It does NOT stack into four lines — it is two:
 *
 *   row      213.67 (1282/6), rules at 76.25 .. 1356.25
 *   (0N)     x79, box row+25, 20px          name  x120, box row+32, 36px Bold
 *   desc     x79, box row+78, 516 wide      arrow x630, row+89.87, 42.78x37.75
 *
 * So the description runs at the GUTTER rather than indented to the name, the
 * index and name share a line, and the arrow — which used to be hidden below
 * lg because no mobile drawing was available — is present, at its own size.
 *
 * One row ships in its active state in the designs — row 3, Web Design — as a
 * 1920x100 four-stop gradient band with NOISE, its index in #A59BFF and its
 * text inverted to #FAFAFA. That is a hover state drawn in place, so it is
 * reproduced here as :hover / :focus-within rather than a permanent style.
 *
 * Three things the active row shows that a per-row reading misses:
 *   - BOTH its rules go #A59BFF, not just the one below it. A row's top rule is
 *     the previous row's bottom border, so the row above has to react too —
 *     hence the :has(+ li:hover) pair.
 *   - The trailing arrow goes #A59BFF, not #FAFAFA like the text beside it.
 *   - The preview card is painted LAST, over every rule it crosses and over the
 *     gradient band itself. Each row is `relative`, so without a z-index the
 *     two rows below the hovered one draw their rules straight across the card.
 *
 * Entirely CSS. INP measures click, tap and keypress and explicitly excludes
 * hover, so these six rows cost nothing on the metric. React state here would
 * mean a reconciliation pass per pointer move for what the compositor does free.
 */

export type Service = {
  index: string
  name: string
  description: string
  href: string
  /** Preview card that slides in on hover — drawn 257x344, radius 10. */
  image: ImageName
}

export function ServiceIndex({ services }: { services: Service[] }) {
  return (
    // Rules are full-bleed in the file (x2="1920"), not inset to the content
    // column, so they stay outside .container-content.
    <ul className="border-t-[1.5px] border-[#6B6B6B] transition-colors duration-200 [&:has(>li:first-child:focus-within)]:border-accent [&:has(>li:first-child:hover)]:border-accent">
      {services.map((s) => (
        <li
          key={s.name}
          /* z-10 while active is load-bearing, not polish: the preview card is
             344 tall on a 100px row, so it reaches into the two rows below,
             and those rows are `relative` with z-index auto — they paint after
             this one and drew their rules across the card. */
          className="group relative border-b-[1.5px] border-[#6B6B6B] transition-colors duration-200 focus-within:z-10 focus-within:border-accent hover:z-10 hover:border-accent [&:has(+li:focus-within)]:border-accent [&:has(+li:hover)]:border-accent"
        >
          {/* Cross-faded on opacity only — no repaint of a new background.
              `.grained` because the drawn band is not a clean gradient: it
              carries Figma's Noise effect, which the export spells out as
              black at 25% over ~51% of pixels (feTurbulence, luminanceToAlpha,
              a discrete alpha ramp of 51 ones then 49 zeros). That is a
              per-pixel sigma of 0.25*sqrt(.51*.49) = 12.5% of the value;
              the grain tile is sigma 26/255 through `overlay`, which perturbs
              by 2*0.102*opacity, so 12.5% wants opacity 0.61 — i.e. the same
              0.60 the mesh surfaces already use, and for the same reason: a
              synthesised surface has no grain of its own to keep.
              --grain-photo-opacity is the variable `.grained` reads; the name
              is about which class, not about photographs. */}
          <span
            aria-hidden="true"
            className="bg-brand-gradient grained pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100"
            style={{ ['--grain-photo-opacity' as string]: 0.6 }}
          />

          {/* 98.5, not 100: the drawn 100 is line-to-line and the 1.5px rule on
              the row above accounts for the rest. Chrome snaps border widths to
              whole DEVICE pixels, so on a 1x display the rule is used at 1px and
              the pitch measures 99.5; at 2x it is 1.5 and the pitch is exactly
              100. Do not "fix" the 98.5 against a 1x measurement — that trades a
              half-pixel on one class of display for a whole one on the other. */}
          {/* The 768 row is 213.67 (1282/6) and holds TWO lines, not four: the
              index and the name share the first, the description takes the
              second at the gutter rather than indented, and the arrow sits at
              the right of the description's first line. The `lg:contents`
              wrappers exist only to give the narrow layout those two lines —
              at lg they generate no box and the five drawn columns are the
              Link's own flex children again.

              py rather than min-h, and 25/37 rather than a symmetric 31: the
              drawn row puts its content at +25 and leaves 28 under it, and it
              is the TOP that has to be right because the index, name and arrow
              are all placed from there. Padding also lets the row grow honestly
              when the description wraps to a fourth line on a phone, which a
              min-height plus centring would not. */}
          <Link
            href={s.href}
            className="container-content relative flex flex-col justify-center pt-[25px] pb-[37px] outline-none lg:min-h-[98.5px] lg:flex-row lg:items-center lg:py-0"
          >
            <span className="flex lg:contents">
              {/* Drawn at row+28 and 28 wide at 1920 (index x163, name x191);
                  row+25 and 41 wide at 768 (x79, x120). 27 rather than 28
                  because the drawn offset is measured from the rule's own y and
                  its 1.5px stroke straddles that, so the CSS content box starts
                  0.75px lower than the line the designer placed. */}
              <span className="t-index w-[41px] shrink-0 text-ink-muted lg:mt-[27px] lg:w-7 lg:self-start transition-colors duration-200 group-focus-within:text-accent group-hover:text-accent">
                ({s.index})
              </span>

              {/* 7px: at 768 the index box is drawn at row+25 and the name at
                  row+32, so the name is NOT top-aligned with it. */}
              <span className="t-item mt-[7px] font-heading font-bold tracking-normal text-ink transition-colors duration-200 group-focus-within:text-cloud group-hover:text-cloud lg:mt-0 lg:w-[331px] lg:shrink-0">
                {s.name}
              </span>
            </span>

            <span className="mt-[6px] flex items-start lg:contents">
              <span className="t-body max-w-[516px] text-ink transition-colors duration-200 group-focus-within:text-cloud group-hover:text-cloud lg:max-w-[878px]">
                {s.description}
              </span>

              {/* The 768 arrow is not the 1920 one scaled: Figma expanded a
                  5.06px stroke there against 4px here, and the head's arms grow
                  more than the shaft, so the box goes 37.2x29.85 -> 42.78x37.75
                  — a different aspect, not a bigger copy. Both are the file's
                  own outlines. It is drawn at x630 (the description stops at
                  595) and 12 below the description's box top. */}
              <svg
                aria-hidden="true"
                viewBox="630 166.123 42.78 37.754"
                className="ml-auto mr-4 mt-3 h-[38px] w-[43px] shrink-0 fill-ink transition-colors duration-200 group-focus-within:fill-accent group-hover:fill-accent lg:hidden"
              >
                <path d="M671.789 186.789C672.777 185.801 672.777 184.199 671.789 183.211L655.689 167.111C654.701 166.123 653.099 166.123 652.111 167.111C651.123 168.099 651.123 169.701 652.111 170.689L666.422 185L652.111 199.311C651.124 200.299 651.124 201.901 652.111 202.889C653.099 203.876 654.701 203.876 655.689 202.889L671.789 186.789ZM630 185L630 187.53L670 187.53L670 185L670 182.47L630 182.47L630 185Z" />
              </svg>

              {/* Trailing arrow at 1920 — x1723..1759, vertically centred
                  (y1633..1661 against a row of y1597..1697), so it sits flush
                  with the content column's right edge. Path taken verbatim from
                  Home.svg: Figma expanded the 4px round-capped stroke into an
                  outline, so it fills rather than strokes. */}
              <svg
                aria-hidden="true"
                viewBox="1723 1632.08 37.2 29.84"
                className="ml-auto hidden h-[30px] w-[37px] shrink-0 fill-ink transition-colors duration-200 group-focus-within:fill-accent group-hover:fill-accent lg:block"
              >
                <path d="M1759.41 1648.41C1760.2 1647.63 1760.2 1646.37 1759.41 1645.59L1746.69 1632.86C1745.91 1632.08 1744.64 1632.08 1743.86 1632.86C1743.08 1633.64 1743.08 1634.91 1743.86 1635.69L1755.17 1647L1743.86 1658.31C1743.08 1659.09 1743.08 1660.36 1743.86 1661.14C1744.64 1661.92 1745.91 1661.92 1746.69 1661.14L1759.41 1648.41ZM1723 1647L1723 1649L1758 1649L1758 1647L1758 1645L1723 1645L1723 1647Z" />
              </svg>
            </span>

            {/* Preview card, drawn 257x344 r10 vertically centred on the active
                row. Its right edge is x1690 — inset 67px from the content
                column so it stops short of the arrow rather than running under
                it. Slides on transform + opacity only, both compositor
                properties, so the hover costs no layout or paint. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-[67px] top-1/2 hidden h-[344px] w-[257px] -translate-y-1/2 translate-x-8 overflow-hidden rounded-xl opacity-0 transition-[opacity,transform] duration-300 group-focus-within:translate-x-0 group-focus-within:opacity-100 group-hover:translate-x-0 group-hover:opacity-100 xl:block"
            >
              <Picture name={s.image} alt="" sizes="257px" className="h-full w-full" imgClassName="h-full w-full object-cover" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
