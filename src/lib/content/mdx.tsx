import 'server-only'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeShiki from '@shikijs/rehype'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import type { MDXComponents } from 'mdx/types'

/**
 * MDX rendering.
 *
 * Everything runs on the server at build time. Shiki highlights during the
 * build and emits plain styled spans, so code blocks cost **zero** client
 * JavaScript — unlike Prism or highlight.js, which ship a tokeniser.
 *
 * All components below are Server Components. Adding a `"use client"`
 * component to this map is the single easiest way to blow the JS budget, so
 * don't, without checking `npm run check:budget` afterwards.
 */

const components: MDXComponents = {
  h2: (p) => (
    <h2
      className="mt-16 scroll-mt-24 text-4xl text-ink first:mt-0"
      {...p}
    />
  ),
  h3: (p) => <h3 className="mt-10 scroll-mt-24 text-2xl text-ink" {...p} />,
  h4: (p) => <h4 className="mt-8 scroll-mt-24 text-xl text-ink" {...p} />,

  p: (p) => <p className="mt-5 text-base text-ink-muted" {...p} />,

  a: ({ href = '', ...p }) => {
    const external = /^https?:\/\//.test(href)
    return (
      <a
        href={href}
        className="text-primary underline underline-offset-4 decoration-1 hover:decoration-2"
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...p}
      />
    )
  },

  ul: (p) => <ul className="mt-5 list-disc space-y-2 pl-6 text-ink-muted" {...p} />,
  ol: (p) => <ol className="mt-5 list-decimal space-y-2 pl-6 text-ink-muted" {...p} />,
  li: (p) => <li className="text-base" {...p} />,

  blockquote: (p) => (
    <blockquote
      className="mt-8 border-l-2 border-accent pl-6 text-lg text-ink italic"
      {...p}
    />
  ),

  hr: () => <hr className="my-12 border-border" />,

  // Inline code only.
  //
  // Fenced blocks never reach this map: rehype-shiki replaces the whole <pre>
  // subtree with its own raw HTML during compilation, so neither `pre` nor the
  // `code` inside it can be overridden here. Those are styled by the
  // `pre.shiki` rules in globals.css.
  code: (p) => (
    <code
      className="rounded-sm bg-surface px-1.5 py-0.5 text-sm text-ink"
      {...p}
    />
  ),

  table: (p) => (
    // Wide tables scroll inside their own container; the page never scrolls
    // horizontally.
    <div className="mt-8 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm" {...p} />
    </div>
  ),
  th: (p) => (
    <th className="border-b border-border pb-2 pr-6 font-semibold text-ink" {...p} />
  ),
  td: (p) => <td className="border-b border-border py-2 pr-6 text-ink-muted" {...p} />,
}

export function Mdx({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [
              rehypeShiki,
              {
                // Dark only: code blocks in the designs sit on #0F0F0F cards
                // regardless of page theme.
                theme: 'github-dark-default',
                // Keeps the background from Shiki off the element so our own
                // token-based background wins.
                defaultColor: false,
              },
            ],
          ],
        },
      }}
    />
  )
}
