import type { Metadata } from 'next'
import { PlaceholderPage } from '@/components/PlaceholderPage'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Blog',
  description: 'Notes on React Native, on-device AI and building for the web.',
  path: '/blog',
  // Nothing on the page yet. See PlaceholderPage for why this is noindex.
  noIndex: true,
})

export default function Blog() {
  return <PlaceholderPage title="Blog" />
}
