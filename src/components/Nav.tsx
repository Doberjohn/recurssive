import Link from 'next/link'
import { Logo } from './ui/Logo'
import { Wordmark } from './ui/Wordmark'
import { Button } from './ui/Button'
import { site } from '@/lib/site'

/**
 * Site navigation.
 *
 * Desktop: Group 2305 — 1595x39 at x163, six links in Inter Medium 16px, plus
 * the "Start a project" pill (Frame 58, 165x39, r8, #FAFAFA).
 *
 * Mobile: the designs put a hamburger on Home only, at x630 — which collides
 * with "Start a project" (x491-689) on every other page, so it cannot simply be
 * copied across. Resolved by dropping the CTA text to an icon under 768px,
 * which frees the slot on every page rather than one.
 *
 * The drawer is a checkbox + :checked sibling selector: no JavaScript, no
 * hydration, and it works before any script loads. The label doubles as the
 * scrim, so tapping outside closes it.
 */

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/capabilities', label: 'Capabilities' },
  { href: '/about', label: 'About' },
  // No Contact link: "Start a project" already points at /contact, and the two
  // sat next to each other going to the same place. The footer keeps its own
  // Contact link, which is a separate list.
  //
  // No Cases link either: /cases still renders, but there is not enough real
  // work to show yet, so the route is unlinked and unindexed until there is.
  // Restore this entry, the Footer's, and the "Related work" section in
  // capabilities/[slug] in the same commit that unhides it — see src/lib/site.ts.
  //
  // No Blog link: the owner is not launching it yet (2026-10-21). Held back
  // like Cases, and restored the same way — see src/lib/site.ts.
] as const

export function Nav({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  // `light` = light text, for dark or photographic grounds (most pages open on
  // a full-bleed image). `dark` = dark text on the pale ground.
  const text = tone === 'light' ? 'text-cloud' : 'text-ink'

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        // justify-between so the trailing group sits on the right edge. The
        // `ml-auto` that used to do that lives on the desktop link list, which
        // is `hidden` below lg — so on mobile the hamburger had nothing pushing
        // it and sat one gap away from the logo.
        className="container-content flex items-center justify-between gap-8 pt-8 md:pt-10"
        aria-label="Main"
      >
        {/* The drawn lockup: mark 60.6x37.4 at x163, a 7.2px gap, then the
            wordmark 146.2x17.9. Same outlines as the footer — set as text it
            was in Inter, and the brand face is At Hauss. */}
        <Link
          href="/"
          className={`${text} flex shrink-0 items-center gap-[7px]`}
          aria-label="Recurssive, home"
        >
          <Logo className="h-9 w-auto md:h-[37px]" />
          <Wordmark className="h-auto w-[118px] md:w-[146px]" />
        </Link>

        {/* Desktop links.
            The drawn 50px gap is a 1920 measurement and does not survive the
            narrow end of lg. At a 1029 viewport the content column is 871, while
            the lockup (214) + six links (~310) + CTA (115) + the nav's own two
            32px gaps + five 50px link gaps come to ~953. The nav then pushed the
            document 10px wider than the viewport, which gave the whole page a
            horizontal scrollbar — and once scrolled, every full-bleed band slid
            off and exposed a strip of bare canvas down the edge. It looked like
            a rogue border, and it only appeared between lg and the width where
            the nav finally fits, which is what made it so odd to pin down.
            Ramps 24px at 1024 to the drawn 50px at 1920. */}
        <ul
          className={`ml-auto hidden items-center lg:flex ${text}`}
          style={{ gap: 'clamp(1.5rem, -0.357rem + 2.902vw, 3.125rem)' }}
        >
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="font-heading font-medium text-base opacity-90 transition-opacity hover:opacity-100"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <span className="hidden lg:block">
            <Button
              href="/contact"
              variant={tone === 'light' ? 'light' : 'dark'}
              arrow
            >
              Start a project
            </Button>
          </span>

          {/* Mobile trigger. A real checkbox so the drawer needs no JS. */}
          <input type="checkbox" id="nav-toggle" className="peer sr-only" />
          <label
            htmlFor="nav-toggle"
            className={`flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[7px] lg:hidden ${text}`}
            aria-label="Open menu"
          >
            <span className="block h-[3px] w-[26px] bg-current" />
            <span className="block h-[3px] w-[26px] bg-current" />
          </label>

          <MobileMenu />
        </div>
      </nav>
    </header>
  )
}

/** The row arrow, taken verbatim from the export — hence the offset viewBox. */
const ROW_ARROW =
  'M687.414 345.414C688.195 344.633 688.195 343.367 687.414 342.586L674.686 329.858C673.905 329.077 672.639 329.077 671.858 329.858C671.077 330.639 671.077 331.905 671.858 332.686L683.172 344L671.858 355.314C671.077 356.095 671.077 357.361 671.858 358.142C672.639 358.923 673.905 358.923 674.686 358.142L687.414 345.414ZM646 344L646 346L686 346L686 344L686 342L646 342L646 344Z'

/**
 * Drawer. Rendered inside the nav so the `peer` relationship holds; positioned
 * fixed so it escapes the header's stacking context.
 *
 * The Menu frame is a full-bleed #FAFAFA sheet, not the dark partial panel this
 * used to be: 100px rows on 1.5px rules, 42px Inter Medium at ls -5%, a right
 * arrow at the far edge of each row, then the phone and email against a dark
 * "Start a project" pill. Rules, gradient and sizing live in .menu-* in
 * globals.css — see the note there on why the border sits on the row's top.
 *
 * No scrim: the sheet covers the viewport, so there is nothing to see behind it.
 * Closing is the X, which is where the hamburger was.
 *
 * `overflow-y-auto` because the frame is 1203 tall against a phone viewport of
 * roughly 812 — the rows ramp down, but the sheet still has to be able to
 * scroll rather than clip its own CTA.
 */
function MobileMenu() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 flex flex-col overflow-y-auto bg-bg opacity-0 transition-opacity duration-200 peer-checked:pointer-events-auto peer-checked:opacity-100 lg:hidden"
      id="mobile-menu"
    >
      {/* Deliberately the SAME container and padding as the nav above —
          `container-content` plus `pt-8 md:pt-10`, and the same Logo/Wordmark
          sizes. The menu used a 10.3vw gutter, which agrees with the container
          at 768 but is 38.6 against 24 at 375, so the lockup and the icon both
          jumped as the sheet opened. Nothing here may drift from the nav. */}
      <div className="container-content flex shrink-0 items-center justify-between gap-8 pt-8 md:pt-10">
        <span className="flex shrink-0 items-center gap-[7px] text-ink">
          <Logo className="h-9 w-auto md:h-[37px]" />
          <Wordmark className="h-auto w-[118px] md:w-[146px]" />
        </span>
        <label
          htmlFor="nav-toggle"
          className="flex h-11 w-11 cursor-pointer items-center justify-center text-ink"
          aria-label="Close menu"
        >
          <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
            <path
              d="M3 3l20 20M23 3L3 23"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="square"
            />
          </svg>
        </label>
      </div>

      <ul className="menu-list mt-[7.5vw]">
        {navLinks.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              // Same gutter as container-content (24 below 768, the drawn 79
              // above), so the label column lines up with the lockup. Padding
              // rather than the container class itself: the row's rule and
              // gradient are full-bleed, and the tap target should be too.
              className="menu-link flex h-full items-center justify-between px-6 font-heading font-medium tracking-[-0.05em] text-ink transition-colors md:px-[79px]"
            >
              {l.label}
              {/* viewBox matches the exported coordinates so the path needs no
                  translation; currentColor lets it flip with the row. */}
              <svg
                viewBox="646 329 42 30"
                aria-hidden="true"
                className="h-[min(30px,3.9vw)] w-auto shrink-0"
              >
                <path d={ROW_ARROW} fill="currentColor" />
              </svg>
            </Link>
          </li>
        ))}
      </ul>

      {/* Drawn as one band: phone and email at x79, the pill ending at x688. */}
      <div className="mt-[8vw] flex flex-wrap items-center justify-between gap-6 px-6 pb-[10vw] md:px-[79px]">
        <div className="menu-meta space-y-1 text-ink">
          <a className="block hover:underline" href={`tel:${site.phone.replace(/\s/g, '')}`}>
            {site.phone}
          </a>
          <a className="block hover:underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>

        <Button href="/contact" variant="dark" arrow className="menu-cta">
          Start a project
        </Button>
      </div>
    </div>
  )
}
