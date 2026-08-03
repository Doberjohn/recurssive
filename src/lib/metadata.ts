import type { Metadata } from 'next'
import { site, siteUrl } from './site'

/**
 * The single metadata builder every route must use.
 *
 * Next merges metadata objects from nested segments **shallowly** — a child
 * `openGraph` replaces the parent's entirely, including fields the child never
 * mentioned. That fails silently in the browser and only shows up when someone
 * shares a link. Building the whole object in one place removes the failure mode.
 *
 * Verified against node_modules/next/dist/docs/.../generate-metadata.md:
 * "Metadata objects exported from multiple segments in the same route are
 *  shallowly merged together... Duplicate keys are replaced based on ordering."
 */
export function buildMetadata({
  title,
  description = site.description,
  path = '/',
  images,
  type = 'website',
  publishedTime,
  modifiedTime,
  noIndex = false,
}: {
  title: string
  description?: string
  /** Route path, leading slash, no trailing slash. */
  path?: string
  images?: { url: string; width: number; height: number; alt: string }[]
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  noIndex?: boolean
}): Metadata {
  const url = path === '/' ? siteUrl : `${siteUrl}${path}`
  // No default OG image yet — opengraph-image.tsx lands in Phase 5. Emitting a
  // URL for a route that does not exist is worse than emitting nothing, so
  // images stay undefined until a real generator exists.
  const ogImages = images

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: site.name,
      locale: 'en_US',
      ...(ogImages ? { images: ogImages } : {}),
      ...(type === 'article' ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(ogImages ? { images: ogImages.map((i) => i.url) } : {}),
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  }
}
