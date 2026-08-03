import type { MetadataRoute } from 'next'
import { routes, siteUrl } from '@/lib/site'
import { getAll, validateReferences } from '@/lib/content'

/**
 * Hand-rolled rather than pulling in next-sitemap: this site will sit well under
 * 200 URLs against Google's 50,000 limit, so the dependency earns nothing.
 *
 * `priority` and `changeFrequency` are deliberately omitted — Google has stated
 * it ignores both. An accurate `lastModified` is the only field carrying signal.
 *
 * This also runs the cross-collection integrity check. sitemap.ts is generated
 * on every build regardless of which routes are being rendered, which makes it
 * the one reliable place to fail a build on a broken content reference.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  validateReferences()

  const stamp = (d: string) => new Date(d)

  return [
    // Static routes. Until each page exists its lastModified is the build time.
    ...routes.map((path) => ({
      url: path === '/' ? siteUrl : `${siteUrl}${path}`,
      lastModified: new Date(),
    })),

    // Content routes, dated from frontmatter rather than build time — a real
    // signal, and stable across rebuilds that did not change the content.
    ...(['blog', 'cases', 'capabilities'] as const).flatMap((collection) =>
      getAll(collection).map((entry) => ({
        url: `${siteUrl}/${collection}/${entry.slug}`,
        lastModified: stamp(entry.meta.updatedAt ?? entry.meta.publishedAt),
      }))
    ),
  ]
}
