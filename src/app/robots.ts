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
