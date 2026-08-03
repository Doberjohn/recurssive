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

  // Cases that name this capability — the reverse of the reference validated
  // at build time in lib/content/validateReferences.
  const related = getAll('cases').filter((c) =>
    c.meta.capabilities.includes(slug)
  )

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

      {related.length > 0 && (
        <section className="mt-24 max-w-3xl border-t border-border pt-10">
          <h2 className="text-2xl text-ink">Related work</h2>
          <ul className="mt-6 space-y-4">
            {related.map((c) => (
              <li key={c.slug}>
                <a
                  href={`/cases/${c.slug}`}
                  className="text-base text-primary underline underline-offset-4"
                >
                  {c.meta.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}
