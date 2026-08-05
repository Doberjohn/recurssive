import { Picture } from './ui/Picture'
import { Button } from './ui/Button'
import type { ImageName } from '@/lib/images.generated'

export type CaseItem = {
  title: string
  tags: string[]
  description: string
  metrics: { value: string; label: string }[]
  image: ImageName
  href: string
}

/**
 * One row of the Cases index.
 *
 * Not a card in the usual sense: there is no panel. The frame draws no frame,
 * fill, border or shadow around image + text — they sit directly on the page
 * ground and are related only by position. Adding a bordered container would be
 * inventing design, so this is a plain grid.
 *
 *                    1920                        768
 *   image            879x407, r20, beside text   610x283, r20, above text
 *   content column   607 wide @x1150             610 wide @x79
 *   chips            195/105 x32, r4, 14px       139/142 x40, r4, 20px, gap 15 both
 *   title            48px Semi Bold              42px Semi Bold  (= .t-section)
 *   description      16px                        24px
 *   metric value     36px gradient               36px gradient   (IDENTICAL)
 *   metric label     12px                        20px
 *   CTA              103x39                      139x49
 *
 * The metric value not scaling is the interesting one — every other heading on
 * the site ramps, and this one is drawn 36px at both widths. Left flat
 * deliberately.
 *
 * The gradient is `.text-brand-gradient`, which already exists and whose stops
 * (#4813D0 -> #4212BF -> #A59BFF) match the drawn fill exactly.
 */
export function CaseCard({ item }: { item: CaseItem }) {
  return (
    <article className="lg:flex lg:items-start lg:gap-[6.8%]">
      <div className="relative aspect-[610/283] w-full shrink-0 overflow-hidden rounded-[20px] lg:aspect-[879/407] lg:w-[55.1%]">
        <Picture
          name={item.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 879px, 100vw"
          className="h-full w-full"
        />
      </div>

      <div className="mt-[36px] lg:mt-[21px] lg:min-w-0 lg:flex-1">
        <ul className="flex flex-wrap gap-[15px]">
          {item.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-sm bg-surface px-[9px] py-[6px] text-xl text-ink lg:text-sm"
            >
              {tag}
            </li>
          ))}
        </ul>

        <h2 className="t-section mt-[13px] font-heading font-semibold text-ink lg:mt-[11px]">
          {item.title}
        </h2>

        <p className="t-body mt-[11px] text-ink-muted">{item.description}</p>

        {/* Three columns at both breakpoints. The drawn 1920 grid drifts 12px on
            the third column between cards; that is placement jitter in the file,
            not a rule, so this is an even three-up. */}
        <dl className="mt-[51px] grid grid-cols-3 gap-x-4 lg:mt-[10px]">
          {item.metrics.map((m) => (
            <div key={m.label + m.value}>
              <dd className="text-brand-gradient font-heading text-5xl font-semibold">{m.value}</dd>
              <dt className="mt-0 text-lg text-ink lg:text-xs">{m.label}</dt>
            </div>
          ))}
        </dl>

        <Button href={item.href} variant="accent" className="mt-[24px]">
          See more
        </Button>
      </div>
    </article>
  )
}
