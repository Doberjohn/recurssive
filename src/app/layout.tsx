import type { Metadata } from 'next'
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
    default: `${site.name} — ${site.descriptor}`,
    template: `%s — ${site.name}`,
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
