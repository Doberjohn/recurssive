import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAll, getBySlug } from '@/lib/content'
import { Mdx } from '@/lib/content/mdx'
import { buildMetadata } from '@/lib/metadata'

export function generateStaticParams() {
  return getAll('cases').map((c) => ({ slug: c.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const study = getBySlug('cases', slug)
  if (!study) return {}

  return buildMetadata({
    title: study.meta.title,
    description: study.meta.description,
    path: `/cases/${slug}`,
    type: 'article',
    publishedTime: study.meta.publishedAt,
  })
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = getBySlug('cases', slug)
  if (!study) notFound()

  const capabilities = getAll('capabilities').filter((c) =>
    study.meta.capabilities.includes(c.slug)
  )

  return (
    <article className="container-content py-24">
      <header className="max-w-3xl">
        {study.meta.client && (
          <p className="text-sm uppercase tracking-wide text-ink-muted">
            {study.meta.client}
          </p>
        )}
        <h1 className="mt-4 text-6xl text-ink">{study.meta.title}</h1>
        <p className="mt-6 text-lg text-ink-muted">{study.meta.description}</p>
      </header>

      {study.meta.metrics.length > 0 && (
        <dl className="mt-16 grid gap-8 sm:grid-cols-3">
          {study.meta.metrics.map((m) => (
            <div key={m.label}>
              <dt className="text-sm text-ink-muted">{m.label}</dt>
              <dd className="text-brand-gradient mt-2 text-5xl">{m.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-20 max-w-3xl">
        <Mdx source={study.body} />
      </div>

      <footer className="mt-24 max-w-3xl border-t border-border pt-10">
        {study.meta.stack.length > 0 && (
          <>
            <h2 className="text-sm uppercase tracking-wide text-ink-muted">
              Stack
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {study.meta.stack.map((s) => (
                <li
                  key={s}
                  className="rounded-3xl bg-surface px-4 py-2 text-sm text-ink"
                >
                  {s}
                </li>
              ))}
            </ul>
          </>
        )}

        {capabilities.length > 0 && (
          <>
            <h2 className="mt-10 text-sm uppercase tracking-wide text-ink-muted">
              Capabilities
            </h2>
            <ul className="mt-4 space-y-2">
              {capabilities.map((c) => (
                <li key={c.slug}>
                  <a
                    href={`/capabilities/${c.slug}`}
                    className="text-base text-primary underline underline-offset-4"
                  >
                    {c.meta.title}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </footer>
    </article>
  )
}
