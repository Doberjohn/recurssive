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
  { href: '/cases', label: 'Cases' },
  { href: '/capabilities', label: 'Capabilities' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
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
          aria-label="Recurssive — home"
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

/**
 * Drawer. Rendered inside the nav so the `peer` relationship holds; positioned
 * fixed so it escapes the header's stacking context.
 */
function MobileMenu() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-0 transition-opacity duration-200 peer-checked:pointer-events-auto peer-checked:opacity-100 lg:hidden"
      id="mobile-menu"
    >
      {/* Scrim doubles as the close affordance. */}
      <label
        htmlFor="nav-toggle"
        className="absolute inset-0 bg-phantom/70"
        aria-label="Close menu"
      />

      <div className="mesh absolute inset-x-0 top-0 px-[79px] pb-16 pt-8">
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <Logo className="h-[43px] w-auto text-cloud" />
            <label
              htmlFor="nav-toggle"
              className="flex h-11 w-11 cursor-pointer items-center justify-center text-cloud"
              aria-label="Close menu"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
                <path
                  d="M2 2l18 18M20 2L2 20"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </label>
          </div>

          <ul className="mt-12 space-y-5">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-4xl text-cloud">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-12 space-y-2 text-base text-cloud/80">
            <a href={`mailto:${site.email}`} className="block">
              {site.email}
            </a>
            <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="block">
              {site.phone}
            </a>
          </div>

          <Button href="/contact" variant="light" arrow className="mt-10 w-full">
            Start a project
          </Button>
        </div>
      </div>
    </div>
  )
}
