import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { site } from '@/lib/site'

export const metadata: Metadata = buildMetadata({
  title: `${site.name} — ${site.descriptor}`,
  path: '/',
})

/**
 * Placeholder. Exists to prove the token layer, font wiring and static
 * prerendering work end to end, and to give the JS-budget gate a real route to
 * measure. Replaced by the designed Home page in Phase 4.
 *
 * Ships zero client JavaScript by design — no "use client", no next/image.
 */
export default function Home() {
  return (
    <main className="container-content flex flex-1 flex-col justify-center py-24">
      <p className="text-sm text-ink-muted">{site.descriptor}</p>

      <h1 className="mt-4 text-7xl text-ink">{site.tagline}</h1>

      <p className="mt-6 max-w-xl text-base text-ink-muted">
        {site.description}
      </p>

      {/* Token smoke test — if these render correctly, theme.css is wired. */}
      <div className="mt-16 flex flex-wrap gap-3" aria-hidden="true">
        {[
          ['bg-cloud border border-border', 'Cloud'],
          ['bg-silver', 'Silver'],
          ['bg-muted text-cloud', 'Muted'],
          ['bg-phantom text-cloud', 'Phantom'],
          ['bg-accent', 'Flow'],
          ['bg-primary text-cloud', 'Inception'],
          ['bg-primary-deep text-cloud', 'Gravity'],
        ].map(([cls, label]) => (
          <span
            key={label}
            className={`rounded-lg px-4 py-2 text-xs ${cls}`}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="bg-brand-gradient mt-6 h-12 rounded-xl" aria-hidden="true" />

      {/* Mesh surfaces — 128x80 AVIF upscaled, grain re-added via ::after.
          Each is ~800 bytes inline. See scripts/build-mesh.mjs. */}
      <div className="mt-10 grid grid-cols-2 gap-4" aria-hidden="true">
        {[1, 6, 10, 12].map((n) => (
          <div
            key={n}
            className="mesh flex h-48 items-end rounded-2xl p-5"
            style={{ ['--mesh' as string]: `var(--mesh-${n})` }}
          >
            <span className="relative z-10 text-xs text-cloud">mesh-{n}</span>
          </div>
        ))}
      </div>
    </main>
  )
}
