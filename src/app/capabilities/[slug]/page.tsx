import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAll, getBySlug } from '@/lib/content'
import { Mdx } from '@/lib/content/mdx'
import { buildMetadata } from '@/lib/metadata'

export function generateStaticParams() {
  return getAll('capabilities').map((c) => ({ slug: c.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const capability = getBySlug('capabilities', slug)
  if (!capability) return {}

  return buildMetadata({
    title: capability.meta.title,
    description: capability.meta.description,
    path: `/capabilities/${slug}`,
  })
}

export default async function CapabilityPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const capability = getBySlug('capabilities', slug)
  if (!capability) notFound()

  // A "Related work" section used to live here: the cases naming this
  // capability, the reverse of the reference validated at build time in
  // lib/content/validateReferences. It was the last in-app path to /cases, and
  // this route IS indexed, so it was also a crawl path — removed with the nav
  // and footer links. Restore it in the commit that unhides /cases; the
  // reverse-reference lookup is `getAll('cases').filter((c) =>
  // c.meta.capabilities.includes(slug))`, and validateReferences still keeps
  // both sides honest in the meantime.

  return (
    <article className="container-content py-24">
      <header className="max-w-3xl">
        <p className="text-sm uppercase tracking-wide text-ink-muted">
          {capability.meta.pillar.replace('-', ' ')}
        </p>
        <h1 className="mt-4 text-6xl text-ink">{capability.meta.title}</h1>
        <p className="mt-6 text-lg text-ink-muted">
          {capability.meta.description}
        </p>
      </header>

      {capability.meta.services.length > 0 && (
        <ul className="mt-12 flex flex-wrap gap-2">
          {capability.meta.services.map((s) => (
            <li
              key={s}
              className="rounded-3xl bg-surface px-4 py-2 text-sm text-ink"
            >
              {s}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-16 max-w-3xl">
        <Mdx source={capability.body} />
      </div>
    </article>
  )
}
