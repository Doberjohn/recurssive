import type { Metadata } from 'next'
import { PlaceholderPage } from '@/components/PlaceholderPage'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description: 'Recurssive is a web and app studio in Thessaloniki, Greece.',
  path: '/about',
  // Nothing on the page yet. See PlaceholderPage for why this is noindex.
  noIndex: true,
})

export default function About() {
  return <PlaceholderPage title="About" />
}
