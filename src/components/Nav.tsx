import Link from 'next/link'
import { Logo } from './ui/Logo'
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
        className="container-content flex items-center gap-8 pt-8 md:pt-10"
        aria-label="Main"
      >
        <Link href="/" className={`${text} shrink-0`} aria-label="Recurssive — home">
          <Logo className="h-9 w-auto md:h-[37px]" />
        </Link>

        {/* Desktop links */}
        <ul className={`ml-auto hidden items-center gap-[50px] lg:flex ${text}`}>
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
          <Button
            href="/contact"
            variant={tone === 'light' ? 'light' : 'dark'}
            arrow
            className="hidden lg:inline-flex"
          >
            Start a project
          </Button>

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
