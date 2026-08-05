import Link from 'next/link'

/**
 * Button / link.
 *
 * Three variants, taken from the designs rather than invented:
 *   light   Frame 58  — 165x39, r8, #FAFAFA ground, #0F0F0F label. Nav CTA,
 *                       always sits on dark or photographic surfaces.
 *   dark    same geometry inverted, for light surfaces.
 *   accent  Frame 124 — 143x39, r6, #4813D0 ground, #FAFAFA label. Primary
 *                       action, e.g. "Send Message".
 *
 * Renders an <a> via Link when given href, otherwise a real <button>. Never a
 * div — keyboard and screen-reader behaviour comes free from the right element.
 */

type Variant = 'light' | 'dark' | 'accent'

const base =
  'inline-flex items-center justify-center gap-2 font-heading text-base ' +
  'transition-colors duration-150 ' +
  // 39px is the drawn height; min-h-11 lifts the touch target to 44px without
  // changing the visual box, via padding on the label row.
  'h-10 px-5 ' +
  // The <a> branch gets `pointer` free from the UA stylesheet; a <button> does
  // not — its browser default is `default`, which Tailwind v4's Preflight makes
  // explicit. Without this the same component gives two different affordances
  // depending on whether it was passed an href.
  'cursor-pointer disabled:opacity-70 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

const variants: Record<Variant, string> = {
  light: 'rounded-lg bg-cloud text-ink hover:bg-silver',
  dark: 'rounded-lg bg-ink text-cloud hover:bg-[#232323]',
  accent: 'rounded-md bg-primary text-cloud hover:bg-primary-deep',
}

type Props = {
  children: React.ReactNode
  variant?: Variant
  href?: string
  className?: string
  /** Trailing arrow, as drawn on the nav CTA. */
  arrow?: boolean
  // ComponentPropsWithRef, not ButtonHTMLAttributes: the latter has no `ref`,
  // and SubmitButton needs one to reach `.form`. React 19 passes ref to function
  // components as an ordinary prop, so no forwardRef is required.
} & React.ComponentPropsWithRef<'button'>

export function Button({
  children,
  variant = 'accent',
  href,
  className = '',
  arrow = false,
  ...rest
}: Props) {
  const cls = `${base} ${variants[variant]} ${className}`
  const content = (
    <>
      {children}
      {arrow && (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
          className="shrink-0"
        >
          <path
            d="M3 11L11 3M11 3H5M11 3v6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </>
  )

  if (href) {
    return (
      <Link href={href} className={cls}>
        {content}
      </Link>
    )
  }
  return (
    <button className={cls} {...rest}>
      {content}
    </button>
  )
}
