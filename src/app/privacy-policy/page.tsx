import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'
import { privacySections } from '@/content/legal'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description:
    'How Recurssive collects, uses and retains personal data, and what rights you have over it.',
  path: '/privacy-policy',
})

/**
 * One of the two routes the sitemap has been submitting since day one while
 * returning a 404, and the one the contact form's consent checkbox links to.
 *
 * Copy is generated from the frame rather than retyped. See src/content/legal.ts.
 */
export default function PrivacyPolicy() {
  return <LegalPage title="Privacy Policy" sections={privacySections} updated="2026-10-23" />
}
