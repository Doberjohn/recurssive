import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'
import { termsSections } from '@/content/legal'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service',
  description:
    'The terms under which Recurssive provides this website and its services.',
  path: '/terms-of-service',
})

/**
 * The page the contact form's consent tick has been pointing at. Until this
 * existed, someone was being asked to accept terms they could not read.
 *
 * Copy is generated from the frame rather than retyped. See src/content/legal.ts.
 */
export default function TermsOfService() {
  return <LegalPage title="Terms of Service" sections={termsSections} updated="2026-08-05" />
}
