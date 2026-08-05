import Link from 'next/link'
import { Picture } from './ui/Picture'
import type { ImageName } from '@/lib/images.generated'

export type PostItem = {
  title: string
  description: string
  tags: string[]
  date: string
  image: ImageName
  href: string
}

/**
 * One card on the Blog index.
 *
 * Like the Cases rows, there is no panel — no fill, border or shadow node wraps
 * image and text. The image has a radius; nothing else does.
 *
 *                 1920                   768
 *   image         514x342, r20           610x406, r20
 *   text inset    ~10px from image left  0 — flush
 *   chips         63/83 x29, r4, 12px    92/126 x40, r4, 20px
 *   chip gap      10                     15
 *   title         32px Semi Bold         42px Semi Bold, both ls-5%
 *   description   16px                   24px
 *   date          12px                   20px
 *
 * The 10px text inset at 1920 collapsing to flush at 768 is drawn consistently
 * across all nine cards, so it is intent rather than jitter.
 *
 * The title pair (32 at 1920, 42 at 768) does not land on any existing token —
 * `.t-item` is 36/32, right at 1920 and 6px out at 768 — so it is spelled out.
 */
export function PostCard({ post }: { post: PostItem }) {
  return (
    <article>
      <Link href={post.href} className="group block">
        <div className="relative aspect-[610/406] w-full overflow-hidden rounded-[20px] lg:aspect-[514/342]">
          <Picture
            name={post.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 514px, 100vw"
            className="h-full w-full"
          />
        </div>

        <div className="lg:pl-[10px]">
          <ul className="mt-[30px] flex flex-wrap gap-[15px] lg:mt-[18px] lg:gap-[10px]">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-sm bg-surface px-[9px] py-[6px] text-lg text-ink lg:text-xs"
              >
                {tag}
              </li>
            ))}
          </ul>

          <h2 className="mt-[11px] font-heading text-[42px] font-semibold leading-[1.05] tracking-[-0.05em] text-ink transition-colors group-hover:text-primary lg:mt-[10px] lg:text-[32px]">
            {post.title}
          </h2>

          <p className="t-body mt-[9px] text-ink-muted">{post.description}</p>

          <p className="mt-[20px] text-lg text-ink lg:mt-[14px] lg:text-xs">{post.date}</p>
        </div>
      </Link>
    </article>
  )
}
