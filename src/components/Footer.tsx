import Link from 'next/link'
import { Logo } from './ui/Logo'
import { site } from '@/lib/site'

/**
 * Site footer — Group 2253: a 1920x685 mesh-gradient band with the 1594px
 * content column inset at y70, mark centred at the top, three columns, then a
 * legal row.
 *
 * Two corrections to the drawn version, both recorded in the knowledge base:
 *
 *  - The "Contents" column lists Home / Services / About / Contact. "Services"
 *    is not a page; Cases, Capabilities and Blog are missing. Corrected to the
 *    real navigation.
 *  - The clock reads a hardcoded 22:52:19 (Utc+3) on all 31 frames. Rendering a
 *    frozen timestamp reads as broken, and a live one would force the page
 *    dynamic. Shown as the timezone only.
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
    <footer className="mesh relative mt-auto" style={{ ['--mesh' as string]: 'var(--mesh-12)' }}>
      <div className="container-content relative z-10 pb-10 pt-[70px]">
        <Link href="/" aria-label="Recurssive — home" className="mx-auto block w-fit">
          <Logo className="h-[106px] w-auto text-cloud" />
        </Link>

        <div className="mt-20 flex flex-col gap-12 sm:flex-row sm:justify-between">
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
            <li>UTC+3</li>
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

        <div className="mt-20 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 text-base text-cloud">
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
          <span className="opacity-70">Designed by Omnics</span>
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
      <h2 className="font-heading text-base text-cloud">{title}</h2>
      <ul className="mt-4 space-y-1 text-base text-cloud/90">{children}</ul>
    </div>
  )
}
