import type { Metadata } from 'next'
import { PlaceholderPage } from '@/components/PlaceholderPage'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Capabilities',
  description: 'What Recurssive builds, and how each capability is delivered.',
  path: '/capabilities',
  // Nothing on the page yet. See PlaceholderPage for why this is noindex.
  noIndex: true,
})

export default function Capabilities() {
  return <PlaceholderPage title="Capabilities" />
}
