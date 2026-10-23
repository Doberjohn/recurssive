import type { MetadataRoute } from 'next'
import { routes, siteUrl } from '@/lib/site'
import { designedPage, getAll, validateReferences } from '@/lib/content'

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

  return [
    // Static routes. Until each page exists its lastModified is the build time.
    ...routes.map((path) => ({
      url: path === '/' ? siteUrl : `${siteUrl}${path}`,
      lastModified: new Date(),
    })),

    // Capability pages, back since the launch of 2026-10-23: every entry that
    // renders the page drawn in the Capability frames. One still on the interim
    // scaffold serves noindex and stays out, as the whole collection did before.
    // Dated from frontmatter rather than build time, which is a real signal and
    // stable across rebuilds that did not change the content.
    ...getAll('capabilities')
      .filter((entry) => designedPage(entry.meta))
      .map((entry) => ({
        url: `${siteUrl}/capabilities/${entry.slug}`,
        lastModified: new Date(entry.meta.updatedAt ?? entry.meta.publishedAt),
      })),

    // `cases` is omitted. The index at /cases has always been noIndex, but the
    // detail pages were listed here and carried no robots directive, so the one
    // placeholder study was the single most crawlable thing about a section
    // that is not ready — asked for by the sitemap, reachable, and lorem. It
    // goes back in the same commit as the /cases nav link. See src/lib/site.ts.
    //
    // `blog` is omitted for the same reason: the owner is not launching it yet
    // (2026-10-21), and while the index at /blog was noIndex, the post was
    // listed here and indexable. It goes back with the /blog nav link, dated
    // from frontmatter the same way as the capabilities above.
  ]
}
