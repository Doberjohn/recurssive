import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { inter, openSans } from './fonts'
import { site, siteUrl } from '@/lib/site'
import './globals.css'

/**
 * Root metadata. `metadataBase` makes relative URLs below resolve to absolute
 * ones, and `title.template` gives child routes a consistent suffix.
 *
 * Child routes must build their metadata with buildMetadata() — Next merges
 * metadata shallowly, so a partial `openGraph` in a child silently discards
 * everything declared here. See src/lib/metadata.ts.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | ${site.descriptor}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_US',
    url: siteUrl,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  // No `keywords` — Google has ignored it since 2009.
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={site.locale}
      className={`${inter.variable} ${openSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        {/* Vercel Web Analytics. Cookieless and with no cross-site identifier,
            which is the whole reason this site needs no consent banner —
            ePrivacy Art. 5(3) is not engaged when nothing is stored on the
            device. Swapping it for anything that sets a cookie reopens that
            question, so it is not a like-for-like choice.
            The `/next` entry, not `/react`: it reads route changes from the App
            Router rather than guessing from history. It self-disables outside
            production, so local runs send nothing. */}
        <Analytics />
      </body>
    </html>
  )
}
