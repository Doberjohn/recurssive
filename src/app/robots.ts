import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site'

/**
 * Allow-by-default, including every AI crawler.
 *
 * Training bots and retrieval bots are separate user agents at every vendor now.
 * Blocking GPTBot (training) buys no protection worth having, while blocking
 * OAI-SearchBot costs every ChatGPT citation. Blocking Google-Extended does not
 * remove the site from AI Overviews — only blocking Googlebot does.
 *
 * For a consultancy whose asset is a signed engagement rather than ad
 * impressions, one citation producing one qualified lead outweighs any
 * plausible crawl cost on a site this size.
 *
 * Deliberately no llms.txt: of 137,210 domains studied, 28% served one and 97%
 * of those received zero requests. Nothing probes for it.
 *
 * Deliberately no `Disallow: /cases` either, even though that section is being
 * held back. Disallow blocks the FETCH, so a crawler never reads the `noindex`
 * on the page — a URL it learns about some other way (an external link, a stray
 * reference, an already-crawled copy) can still be indexed as a bare URL, and
 * then cannot be removed because the directive that would remove it is
 * unreachable. `noindex` is the stronger tool here and /cases and /cases/[slug]
 * both carry it. If those URLs are ever confirmed absent from the index and
 * crawl budget becomes a reason, a Disallow can be added on top — in that
 * order, never before.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
