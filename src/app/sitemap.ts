import type { MetadataRoute } from 'next'
import { routes, siteUrl } from '@/lib/site'

/**
 * Hand-rolled rather than pulling in next-sitemap: this site will sit well under
 * 200 URLs against Google's 50,000 limit, so the dependency earns nothing.
 *
 * `priority` and `changeFrequency` are deliberately omitted — Google has stated
 * it ignores both. An accurate `lastModified` is the only field that carries
 * signal, and once MDX lands it should come from frontmatter, not build time.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: path === '/' ? siteUrl : `${siteUrl}${path}`,
    lastModified: new Date(),
  }))
}
