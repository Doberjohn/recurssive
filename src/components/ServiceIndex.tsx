import Link from 'next/link'

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
 * Entirely CSS. INP measures click, tap and keypress and explicitly excludes
 * hover, so these six rows cost nothing on the metric. React state here would
 * mean a reconciliation pass per pointer move for what the compositor does free.
 */

export type Service = {
  index: string
  name: string
  description: string
  href: string
}

export function ServiceIndex({ services }: { services: Service[] }) {
  return (
    <ul className="border-t border-[#6B6B6B]">
      {services.map((s) => (
        <li
          key={s.name}
          className="group relative border-b border-[#6B6B6B] transition-colors duration-200 focus-within:border-accent hover:border-accent"
        >
          {/* Cross-faded on opacity only — no repaint of a new background. */}
          <span
            aria-hidden="true"
            className="bg-brand-gradient pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100"
          />

          <Link
            href={s.href}
            className="container-content relative flex min-h-[100px] items-center gap-6 py-5 outline-none md:gap-0"
          >
            <span className="w-8 shrink-0 text-sm text-ink-muted transition-colors duration-200 group-focus-within:text-accent group-hover:text-accent">
              ({s.index})
            </span>

            <span className="font-heading text-4xl font-bold text-ink transition-colors duration-200 group-focus-within:text-cloud group-hover:text-cloud md:w-[331px] md:shrink-0">
              {s.name}
            </span>

            <span className="hidden max-w-[878px] text-base text-ink transition-colors duration-200 group-focus-within:text-cloud group-hover:text-cloud md:block">
              {s.description}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
