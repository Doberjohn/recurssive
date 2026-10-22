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

type Variant = 'light' | 'dark' | 'accent' | 'band' | 'band-light'

// Size lives on the variants, not here: the drawn buttons are not one size, and
// putting `text-base`/`h-10` in the shared string would make every override a
// Tailwind specificity coin-toss (two plain utilities of the same kind resolve
// by stylesheet order, not by class-attribute order).
const base =
  'inline-flex items-center justify-center gap-2 font-heading font-medium ' +
  'transition-colors duration-150 ' +
  // The <a> branch gets `pointer` free from the UA stylesheet; a <button> does
  // not — its browser default is `default`, which Tailwind v4's Preflight makes
  // explicit. Without this the same component gives two different affordances
  // depending on whether it was passed an href.
  'cursor-pointer disabled:opacity-70 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

// The nav CTA: 198x47 with 22px Semi Bold at ls -3% at 768, 165x39 with 16px
// Medium at 1920. It KEEPS its arrow, unlike accent — 15 + 110 + 15 = 140
// against a 165 box leaves exactly the 25 an arrow plus its gap needs.
// gap-2.5, not the base gap-2: the drawn lockup is 15 + label + 10 + arrow + 15,
// and with an 8px gap and a 14px arrow the box came out 160 against a drawn 165.
const nav =
  'gap-2.5 h-[47px] px-[15px] text-[22px] font-semibold tracking-[-0.03em] ' +
  'lg:h-[39px] lg:text-base lg:font-medium lg:tracking-normal'

const variants: Record<Variant, string> = {
  light: `${nav} rounded-lg bg-cloud text-ink hover:bg-silver`,
  dark: `${nav} rounded-lg bg-ink text-cloud hover:bg-[#232323]`,
  // 202x53 with 24px type at 768, 143x39 with 16px at 1920 — both measured off
  // the Contact frames, where 16 + 170 + 16 = 202 exactly. That the padding
  // accounts for the full width is also how we know the drawn accent button has
  // no arrow: there is no room for one.
  // A step, not a ramp: the drawn button gets SMALLER as the viewport grows
  // (53 at 768, 39 at 1920), so one linear interpolation extended below 768
  // would make it larger on a phone, not smaller. h-11 keeps the 44px touch
  // target. Deliberately not container-query based — accent is also the Home
  // CTA, which has no container to measure against.
  accent:
    'h-11 px-4 text-base md:h-[53px] md:text-2xl lg:h-[39px] lg:px-[15px] lg:text-base ' +
    'rounded-md bg-primary text-cloud hover:bg-primary-deep',
  // The build-vision band's CTA: accent, but every band frame draws it 200x49
  // at 768 (15 + 170 + 15, "Frame 124" / "Frame 130" at x284) where the
  // Contact and Home forms draw theirs 202x53. Same 143x39 at 1920.
  band:
    'h-11 px-4 text-base md:h-[49px] md:px-[15px] md:text-2xl lg:h-[39px] lg:text-base ' +
    'rounded-md bg-primary text-cloud hover:bg-primary-deep',
  // The same box in #FAFAFA with an ink label: the capability page's "Book a
  // call" on its purple hero ("Frame 1", 113x39 at 1920, 154x49 at 768, r6)
  // and "Inquire" on its photo card.
  'band-light':
    'h-11 px-4 text-base md:h-[49px] md:px-[15px] md:text-2xl lg:h-[39px] lg:text-base ' +
    'rounded-md bg-cloud text-ink hover:bg-silver',
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
          width="15"
          height="15"
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
