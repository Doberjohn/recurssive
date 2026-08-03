import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAll, getBySlug } from '@/lib/content'
import { Mdx } from '@/lib/content/mdx'
import { buildMetadata } from '@/lib/metadata'

/** Every post is prerendered at build time. No ISR, no runtime data. */
export function generateStaticParams() {
  return getAll('blog').map((p) => ({ slug: p.slug }))
}

/** Any path not produced above is a real 404, not a runtime render. */
export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBySlug('blog', slug)
  if (!post) return {}

  return buildMetadata({
    title: post.meta.title,
    description: post.meta.description,
    path: `/blog/${slug}`,
    type: 'article',
    publishedTime: post.meta.publishedAt,
    modifiedTime: post.meta.updatedAt ?? post.meta.publishedAt,
  })
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBySlug('blog', slug)

  // Called before any await or Suspense boundary. If notFound() fires
  // mid-stream Next cannot retroactively set a 404 status and injects
  // <meta name="robots" content="noindex"> instead — which looks fine in a
  // browser and is wrong for every crawler.
  if (!post) notFound()

  const published = new Date(post.meta.publishedAt)

  return (
    <article className="container-content py-24">
      <header className="max-w-3xl">
        <div className="flex items-center gap-3 text-xs text-ink-muted">
          <time dateTime={post.meta.publishedAt}>
            {published.toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} min read</span>
        </div>

        <h1 className="mt-4 text-6xl text-ink">{post.meta.title}</h1>
        <p className="mt-6 text-lg text-ink-muted">{post.meta.description}</p>
      </header>

      <div className="mt-16 max-w-3xl">
        <Mdx source={post.body} />
      </div>
    </article>
  )
}
