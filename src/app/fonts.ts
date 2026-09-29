// Recurssive — font setup.
//
// Inter (headings) and Open Sans (body) are both SIL Open Font License; the
// licences ship in `Recurssive Folder/Fonts/*/OFL.txt`. next/font self-hosts at
// build time, so the browser sends no request to Google.
//
// At Haüss is NOT loaded. The wordmark is outlined vector (6,586 paths, zero
// <text> elements), so the logo needs no webfont.
//
// IMPORTANT — do not add a `weight` array.
// Both families are variable fonts. Passing `weight` makes next/font emit one
// static instance per weight per subset: an earlier version of this file asked
// for 4+3 weights across latin+greek and produced 17 woff2 files totalling
// 463.8 KB against a 70 KB budget. Omitting `weight` yields one variable file
// per family covering the whole 400–700 range.

import { Inter, Open_Sans } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: false,
  // adjustFontFallback defaults to true — this is the metric-matched
  // size-adjust fallback that stops `swap` causing layout shift. Leave it on.
})

export const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
  preload: false,
})

export const fontVariables = `${inter.variable} ${openSans.variable}`
