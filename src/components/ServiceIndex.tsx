import Link from 'next/link'
import { Picture } from './ui/Picture'
import type { ImageName } from '@/lib/images.generated'

/**
 * The service index — six rows on an exact 100px pitch (y1426 to 1926).
 *
 * Per row, measured from the file:
 *   (0N)         x163, 14px Open Sans, #6B6B6B
 *   name         x191, 32px Inter Bold, #0F0F0F
 *   description  x522, 16px Open Sans, #0F0F0F
 *
 * One row ships in its active state in the designs — row 3, Web Design — as a
 * 1920x100 four-stop gradient band with NOISE, its index in #A59BFF and its
 * text inverted to #FAFAFA. That is a hover state drawn in place, so it is
 * reproduced here as :hover / :focus-within rather than a permanent style.
 *
 * Two things the active row shows that a per-row reading misses:
 *   - BOTH its rules go #A59BFF, not just the one below it. A row's top rule is
 *     the previous row's bottom border, so the row above has to react too —
 *     hence the :has(+ li:hover) pair.
 *   - The trailing arrow goes #A59BFF, not #FAFAFA like the text beside it.
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
    <ul className="border-t border-[#6B6B6B] transition-colors duration-200 [&:has(>li:first-child:focus-within)]:border-accent [&:has(>li:first-child:hover)]:border-accent">
      {services.map((s) => (
        <li
          key={s.name}
          className="group relative border-b border-[#6B6B6B] transition-colors duration-200 focus-within:border-accent hover:border-accent [&:has(+li:focus-within)]:border-accent [&:has(+li:hover)]:border-accent"
        >
          {/* Cross-faded on opacity only — no repaint of a new background. */}
          <span
            aria-hidden="true"
            className="bg-brand-gradient pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100"
          />

          <Link
            href={s.href}
            className="container-content relative flex min-h-[100px] flex-col justify-center gap-2 py-6 outline-none lg:flex-row lg:items-center lg:gap-0 lg:py-0"
          >
            <span className="t-index w-10 shrink-0 text-ink-muted lg:w-8 transition-colors duration-200 group-focus-within:text-accent group-hover:text-accent">
              ({s.index})
            </span>

            <span className="t-item font-heading font-bold text-ink transition-colors duration-200 group-focus-within:text-cloud group-hover:text-cloud lg:w-[331px] lg:shrink-0">
              {s.name}
            </span>

            <span className="t-body max-w-[878px] text-ink transition-colors duration-200 group-focus-within:text-cloud group-hover:text-cloud lg:max-w-[878px]">
              {s.description}
            </span>

            {/* Trailing arrow, on every row — x1723..1759, vertically centred
                (y1633..1661 against a row of y1597..1697), so it sits flush
                with the content column's right edge. Path taken verbatim from
                Home.svg: Figma expanded the 4px round-capped stroke into an
                outline, so it fills rather than strokes. Hidden below lg, where
                the row stacks and the drawn mobile frame is not available. */}
            <svg
              aria-hidden="true"
              viewBox="1723 1632.08 37.2 29.84"
              className="ml-auto hidden h-[30px] w-[37px] shrink-0 fill-ink transition-colors duration-200 group-focus-within:fill-accent group-hover:fill-accent lg:block"
            >
              <path d="M1759.41 1648.41C1760.2 1647.63 1760.2 1646.37 1759.41 1645.59L1746.69 1632.86C1745.91 1632.08 1744.64 1632.08 1743.86 1632.86C1743.08 1633.64 1743.08 1634.91 1743.86 1635.69L1755.17 1647L1743.86 1658.31C1743.08 1659.09 1743.08 1660.36 1743.86 1661.14C1744.64 1661.92 1745.91 1661.92 1746.69 1661.14L1759.41 1648.41ZM1723 1647L1723 1649L1758 1649L1758 1647L1758 1645L1723 1645L1723 1647Z" />
            </svg>

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
