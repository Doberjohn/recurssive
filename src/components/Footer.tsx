import Link from 'next/link'
import { Logo } from './ui/Logo'
import { Wordmark } from './ui/Wordmark'
import { Clock } from './Clock'
import { site } from '@/lib/site'

/**
 * Site footer — Group 2253: a 1920x685 mesh-gradient band with the 1594px
 * content column inset at y70, mark centred at the top, three columns, then a
 * legal row.
 *
 * The band's gradient (mesh-12, confirmed identical to the file's image7 —
 * RMSE 0.8 against the next-best 55.5) is cropped deliberately. In the file the
 * image is drawn 1920x1200 at y-112.84, so the band shows 9.4%..66.5% of it:
 * the dark upper region, with the bright core just below the bottom edge.
 * `background-position: center` showed 17.9%..82.1% instead — the core landed
 * mid-band and the whole footer read pale. Mean RGB 99,65,207 against 68,32,191.
 *
 * Anchored from the bottom rather than by percentage, because a percentage
 * resolves against (image height - band height) and this band is 764px, not the
 * drawn 685 — see the note on the Contents column below. Bottom-anchoring puts
 * the core in the same place regardless of band height: the file's image sits
 * 402.16px below the band bottom at 1920 wide, i.e. 20.95% of the band width,
 * hence -20.95vw. Applied at lg only; the mobile frame is not available and
 * below 1.6 aspect `cover` becomes height-driven, where this value is meaningless.
 *
 * Two corrections to the drawn version, both recorded in the knowledge base:
 *
 *  - The "Contents" column lists Home / Services / About / Contact. "Services"
 *    is not a page; Cases, Capabilities and Blog are missing. Corrected to the
 *    real navigation. This is why the band is 764px rather than the drawn 685:
 *    six links occupy ~60px more than the four drawn. The extra height is
 *    absorbed at the top of the gradient, where it is darkest and least visible.
 *  - The clock reads a hardcoded 22:52:19 on all 31 frames. Shipping a frozen
 *    timestamp reads as broken, so it runs live — see Clock.tsx. The offset is
 *    derived from Europe/Athens rather than pinned to the drawn "+3", which is
 *    only correct for about seven months of the year.
 */

const contents = [
  { href: '/', label: 'Home' },
  { href: '/cases', label: 'Cases' },
  { href: '/capabilities', label: 'Capabilities' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

const socials = [
  { href: 'https://www.facebook.com/recurssive', label: 'Facebook' },
  { href: 'https://www.instagram.com/recurssive', label: 'Instagram' },
  { href: 'https://www.linkedin.com/company/recurssive', label: 'LinkedIn' },
  { href: `mailto:${site.email}`, label: 'E-mail' },
]

export function Footer() {
  return (
    <footer
      className="mesh relative mt-auto lg:[--mesh-pos:center_bottom_-20.95vw]"
      style={{ ['--mesh' as string]: 'var(--mesh-12)' }}
    >
      <div className="container-content relative z-10 pt-[70px]">
        <Link href="/" aria-label="Recurssive — home" className="mx-auto block w-fit">
          <Logo className="h-auto w-[160px] text-cloud" />
        </Link>

        {/* Column left edges are drawn at x163 / x930 / x1682, i.e. 0 / 767 /
            1519 across the 1594 column. That is not a distribution rule —
            justify-between computes 749.5 for the middle one even with the
            drawn content — so the ratio is encoded directly.

            The third track is max-content rather than 75fr: at the drawn width
            it lands on 1519 either way, but a fixed fraction would be 75px and
            "Instagram" is 72.6, so it would overflow the moment the column
            narrowed. Sizing it to content and splitting the remainder 767:752
            holds the drawn positions at 1920 and degrades sanely below it. */}
        <div className="mt-20 flex flex-col gap-12 lg:grid lg:grid-cols-[minmax(0,767fr)_minmax(0,752fr)_max-content] lg:gap-0">
          <FooterColumn title="Contents">
            {contents.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Where">
            <li>Thessaloniki</li>
            <li>Greece</li>
            <Clock />
          </FooterColumn>

          <FooterColumn title="Socials">
            {socials.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="hover:underline"
                  {...(l.href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </FooterColumn>
        </div>

        <div className="t-body mt-20 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 text-cloud">
          <span>©{new Date().getFullYear()} {site.name}</span>
          <Link href="/privacy-policy" className="hover:underline">
            Privacy
          </Link>
          <Link href="/terms-of-service" className="hover:underline">
            Terms
          </Link>
          <Link href="/cookies" className="hover:underline">
            Cookies
          </Link>
          {/* Only the studio name is the link, not the whole credit. */}
          <span className="opacity-70">
            Designed by{' '}
            <a
              href="https://omnics.co/el/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Omnics
            </a>
          </span>
        </div>

        {/* The wordmark: a 1594x196 vector on the content column, flush to the
            band's bottom edge. It sits 22px under the legal row.

            As an <svg> its ink spans the column exactly, which is the whole
            point — the three columns above are positioned to line up with the
            letterforms (first column at x163 = the R's left edge, the right
            column's widest line ending at x1755 against the final E at x1757).
            Set as text it could never align: the glyphs carry side bearings, so
            the ink stopped 56.3px short while the box measured 1594. */}
        <div aria-hidden="true" className="mt-[22px] select-none">
          <Wordmark className="block h-auto w-full text-cloud" />
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h2 className="t-body font-heading font-medium text-cloud">{title}</h2>
      <ul className="t-body mt-2 space-y-1 text-cloud/90">{children}</ul>
    </div>
  )
}
