import Link from 'next/link'
import { Logo } from './ui/Logo'
import { Wordmark } from './ui/Wordmark'
import { Clock } from './Clock'
import { Year } from './Year'
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
      className="mesh relative mt-auto [--mesh-pos:center_top] [--mesh-size:auto_152%] md:[--mesh-pos:center_-2.0725vw] md:[--mesh-size:198.125%] lg:[--mesh-pos:center_bottom_-20.95vw] lg:[--mesh-size:cover]"
      style={{ ['--mesh' as string]: 'var(--mesh-12)' }}
    >
      <div className="container-content relative z-10 pt-[46px] lg:pt-[70px]">
        <Link href="/" aria-label="Recurssive — home" className="mx-auto block w-fit">
          <Logo className="h-auto w-[120px] text-cloud lg:w-[160px]" />
        </Link>

        {/* Three across at every width. The 768 frame is the mobile design and
            it is three columns, so phones scale it down rather than stacking —
            an earlier build stacked below 768 and that was wrong.

            Left edges across each frame's own content column:

              768   0 / 242 / 506  of 610
              1920  0 / 767 / 1519 of 1594

            Neither is a distribution rule — justify-between computes 749.5 for
            the middle one at 1920 even with the drawn content — so both ratios
            are encoded directly.

            The third track is max-content rather than a fraction: at the drawn
            width it lands on the right edge either way, but 75fr is 75px at
            1920 against "Instagram" at 72.6, so it would overflow the moment
            the column narrowed. Sizing it to content and splitting the
            remainder holds the drawn positions and keeps the narrow end safe. */}
        <div className="mt-[65px] grid grid-cols-[minmax(0,242fr)_minmax(0,264fr)_max-content] lg:mt-[72px] lg:grid-cols-[minmax(0,767fr)_minmax(0,752fr)_max-content]">
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

        {/* Drawn as one justify-between row on both frames: at 768 the four
            items land on x78/296/411/519 across 79..689, which is exactly what
            justify-between computes. The minimum gap has to be small enough
            that five items (the frames omit Cookies; it is a real page, so it
            stays) still fit on one line at 610. */}
        {/* The legal row does not use body metrics: both frames set it on a
            20px line-height (22/20 at 768, 16/20 at 1920), and 768 adds -0.04em
            tracking. Without those it runs ~8% wide, which is the difference
            between one line and two at 610.

            justify-between only once it fits on one line. Below 768 five items
            wrap, and justify-between then stretches whatever landed on the last
            row across the full width — two items with a chasm between them. */}
        <div className="footer-col mt-[86px] flex flex-wrap items-center gap-x-3 gap-y-1 leading-5 tracking-[-0.04em] text-cloud md:justify-between md:gap-x-2 lg:mt-[73px] lg:gap-x-8 lg:tracking-normal">
          {/* Build-year on the server, corrected on mount — see Year.tsx. */}
          <span>
            ©<Year fallback={new Date().getFullYear()} /> {site.name}
          </span>
          <Link href="/privacy-policy" className="hover:underline">
            Privacy
          </Link>
          <Link href="/terms-of-service" className="hover:underline">
            Terms
          </Link>
          {/* Dropped below lg to match the frames, which draw four items in this
              row at 768 and five at 1920. Not a style choice: at 440 the five
              measure 398px of text against a 392px column, so they cannot share
              a line at any gap. Four fit at 384px. */}
          <Link href="/cookies" className="hidden hover:underline lg:inline">
            Cookies
          </Link>
          {/* Only the studio name is the link, not the whole credit. No dimming:
              all five items in this row are solid #FAFAFA in the file, with no
              opacity, group opacity or fill-opacity on any of them. */}
          <span>
            Designed by{' '}
            <a
              href="https://omnics.co/"
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
        <div aria-hidden="true" className="mt-[21px] select-none lg:mt-[22px]">
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
    // Type is fluid below 768 rather than the flat 22px the frame specifies,
    // because three columns of 22px do not fit a phone: "Capabilities" and
    // "Thessaloniki" alone are ~145px each at that size, against ~392px of
    // content column at 440. The ramp hits the drawn 22px exactly at 768 and
    // eases to 14px by 360, which keeps all three columns intact down to 320.
    // lg returns to the flat 16px the 1920 frame draws.
    //
    // No space-y: both frames draw each column's items as ONE text node, so the
    // rhythm is pure line-height — 4 lines in 132px at 768 (22/33), in 96px at
    // 1920 (16/24). Adding 4px per row compounded to 20px on a six-item column.
    <div>
      <h2 className="footer-col font-heading font-medium text-cloud">{title}</h2>
      <ul className="footer-col mt-[3px] text-cloud/90 lg:mt-[6px]">{children}</ul>
    </div>
  )
}
