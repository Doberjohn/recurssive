import { z } from 'zod'
import { images, type ImageName } from '@/lib/images.generated'

/** Keys of the generated image manifest, so a typo fails the build. */
const imageName = z.enum(Object.keys(images) as [ImageName, ...ImageName[]])

/**
 * Frontmatter schemas.
 *
 * These are validated at build time and a failure aborts the build. That is
 * deliberate: a typo in a date or a missing description should stop a deploy,
 * not ship a page with `undefined` in its <title>.
 */

/**
 * A YYYY-MM-DD date.
 *
 * YAML parses an unquoted `2026-08-01` into a JS Date, and a quoted one into a
 * string — so frontmatter yields different types depending on whether the
 * author remembered quotes. Accept both and normalise, rather than making
 * every content file carry a formatting rule nobody will remember.
 */
const isoDate = z
  .union([z.string(), z.date()])
  .transform((v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v.trim()))
  .pipe(
    z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'expected YYYY-MM-DD')
      .refine((s) => !Number.isNaN(Date.parse(s)), 'not a real date')
  )

/** Fields every content type shares. */
const base = {
  title: z.string().min(1).max(70, 'over 70 chars will be truncated in search results'),
  /** Used verbatim as the meta description, so the length limit is not arbitrary. */
  description: z.string().min(50, 'too short to be useful in search results').max(160),
  publishedAt: isoDate,
  updatedAt: isoDate.optional(),
  /** Draft content is excluded from builds, sitemaps and index pages. */
  draft: z.boolean().default(false),
  /** Key into the generated image manifest. */
  image: z.string().optional(),
}

export const postSchema = z.object({
  ...base,
  tags: z.array(z.string()).default([]),
  /** Reading time is derived from the body, never hand-written. */
})

export const caseSchema = z.object({
  ...base,
  client: z.string().optional(),
  /** Slugs of capabilities this case demonstrates. Validated against the
   *  capabilities collection after loading — see content/index.ts. */
  capabilities: z.array(z.string()).default([]),
  /** Shown as the headline numbers on the case card and detail header. */
  metrics: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .max(3, 'the design shows at most 3')
    .default([]),
  stack: z.array(z.string()).default([]),
  /** Which audience segment — drives the Cases index filter chips. */
  segment: z.enum(['startups', 'smbs', 'enterprise']).optional(),
})

export const capabilitySchema = z.object({
  ...base,
  /** One of the four pillars from deck p29. */
  pillar: z.enum(['consulting', 'product-dev', 'enterprise', 'ai-engineering']),
  /** Controls order on the Capabilities index; lower sorts first. */
  order: z.number().int().default(100),
  /** Named services rolled up under this capability. */
  services: z.array(z.string()).default([]),
  /**
   * The page drawn in the Capability frames, per service. Optional while each
   * page's copy is written: an entry without it renders the interim scaffold.
   * Everything the frames repeat on every service (process, why us, tech,
   * platforms, the idea card) is shared, in src/content/capability-page.ts.
   */
  page: z
    .object({
      /** The paragraph under the title in the hero. */
      intro: z.string().min(1),
      /** "Why build a Mobile App?" */
      whyHeading: z.string().min(1),
      /** The six benefits under it, three across at 1920. */
      benefits: z
        .array(z.object({ title: z.string().min(1), body: z.string().min(1) }))
        .length(6, 'the design draws six'),
      /** Image manifest key for the hero photograph; the frames draw this one. */
      photo: imageName.default('capability-b'),
    })
    .optional(),
})

export type PostMeta = z.infer<typeof postSchema>
export type CaseMeta = z.infer<typeof caseSchema>
export type CapabilityMeta = z.infer<typeof capabilitySchema>

export const schemas = {
  blog: postSchema,
  cases: caseSchema,
  capabilities: capabilitySchema,
} as const

export type Collection = keyof typeof schemas
