import type { Metadata } from 'next'
import { PlaceholderPage } from '@/components/PlaceholderPage'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Cases',
  description: 'Selected work: what the problem was, what we built, what it did.',
  path: '/cases',
  // Nothing on the page yet. See PlaceholderPage for why this is noindex.
  noIndex: true,
})

export default function Cases() {
  return <PlaceholderPage title="Cases" />
}
