import 'server-only'
import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'
import { schemas, type Collection } from './schema'

/**
 * File-system content loader.
 *
 * Everything here runs at build time only — every route that consumes it is
 * statically prerendered, so none of this reaches the client or a request path.
 * `server-only` makes an accidental client import a build error rather than a
 * silent bundle-size regression.
 *
 * Content lives in /content, outside src/app, so files are not routes. Routes
 * are generated from them via generateStaticParams.
 */

const CONTENT_DIR = join(process.cwd(), 'content')

export type Entry<T> = {
  slug: string
  meta: T
  /** Raw MDX body, frontmatter stripped. Compiled by the route that renders it. */
  body: string
  /** Minutes, derived from word count at 200 wpm. Never hand-authored. */
  readingTime: number
}

function readCollection<C extends Collection>(
  collection: C
): Entry<ReturnType<(typeof schemas)[C]['parse']>>[] {
  const dir = join(CONTENT_DIR, collection)
  if (!existsSync(dir)) return []

  const entries = readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const raw = readFileSync(join(dir, file), 'utf8')
      const { data, content } = matter(raw)

      const parsed = schemas[collection].safeParse(data)
      if (!parsed.success) {
        // Fail the build loudly. A malformed date or missing description should
        // never reach production silently.
        const issues = parsed.error.issues
          .map((i) => `      ${i.path.join('.') || '(root)'}: ${i.message}`)
          .join('\n')
        throw new Error(
          `Invalid frontmatter in content/${collection}/${file}:\n${issues}`
        )
      }

      const words = content.trim().split(/\s+/).length
      return {
        slug,
        meta: parsed.data as never,
        body: content,
        readingTime: Math.max(1, Math.round(words / 200)),
      }
    })
    // Drafts never ship — not to routes, index pages or the sitemap.
    .filter((e) => !(e.meta as { draft?: boolean }).draft)

  return entries.sort(
    (a, b) =>
      Date.parse((b.meta as { publishedAt: string }).publishedAt) -
      Date.parse((a.meta as { publishedAt: string }).publishedAt)
  )
}

// Read once per build rather than per route — generateStaticParams plus every
// page of a 50-route collection would otherwise re-read and re-validate the
// whole directory on each call.
const cache: Partial<Record<Collection, unknown[]>> = {}

export function getAll<C extends Collection>(collection: C) {
  if (!cache[collection]) cache[collection] = readCollection(collection)
  return cache[collection] as ReturnType<typeof readCollection<C>>
}

export function getBySlug<C extends Collection>(collection: C, slug: string) {
  return getAll(collection).find((e) => e.slug === slug)
}

export function getSlugs(collection: Collection): string[] {
  return getAll(collection).map((e) => e.slug)
}

/**
 * Cross-collection integrity check.
 *
 * Case studies reference capabilities by slug. A typo there would render an
 * empty link rather than an error, so it is checked once at build time.
 * Called from the root layout so it runs on every build regardless of which
 * routes are being generated.
 */
export function validateReferences(): void {
  const capabilitySlugs = new Set(getSlugs('capabilities'))
  const broken: string[] = []

  for (const entry of getAll('cases')) {
    for (const ref of entry.meta.capabilities) {
      if (!capabilitySlugs.has(ref)) {
        broken.push(`content/cases/${entry.slug}.mdx -> "${ref}"`)
      }
    }
  }

  if (broken.length > 0) {
    throw new Error(
      `Case studies reference capabilities that do not exist:\n` +
        broken.map((b) => `      ${b}`).join('\n') +
        `\n    Known capabilities: ${[...capabilitySlugs].join(', ') || '(none)'}`
    )
  }
}
