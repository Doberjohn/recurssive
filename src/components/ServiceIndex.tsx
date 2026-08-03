import Link from 'next/link'
import { Picture } from './ui/Picture'
import type { ImageName } from '@/lib/images.generated'

/**
 * The service index — six full-bleed rows on an exact 100px pitch. Hovering a
 * row swaps in the four-stop noise gradient, turns its bracketing hairlines
 * from #6B6B6B to #A59BFF, inverts the label to #FAFAFA, and slides in a
 * 257x344 r10 image card vertically centred on that row.
 *
 * Entirely CSS. This matters more than it looks: INP measures click, tap and
 * keypress — hover and scroll are explicitly excluded — so a CSS hover costs
 * exactly nothing on the metric. Routing these six rows through React state
 * would mean a reconciliation pass on every pointer move, for a visual result
 * the browser can do for free.
 *
 * `:focus-within` mirrors every hover state so keyboard users get the same
 * affordance.
 */

export type Service = {
  index: string
  name: string
  href: string
  image: ImageName
}

export function ServiceIndex({ services }: { services: Service[] }) {
  return (
    <ul className="border-t border-[#6B6B6B]">
      {services.map((s) => (
        <li
          key={s.name}
          className="group relative border-b border-[#6B6B6B] transition-colors duration-200 hover:border-accent focus-within:border-accent"
        >
          {/* Gradient layer, cross-faded on opacity only — no paint of a new
              background-image, which would force a repaint each frame. */}
          <span
            aria-hidden="true"
            className="bg-brand-gradient pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
          />

          <Link
            href={s.href}
            className="container-content relative flex h-[100px] items-center gap-8 outline-none"
          >
            <span className="text-base text-ink-muted transition-colors duration-200 group-hover:text-cloud group-focus-within:text-cloud">
              ({s.index})
            </span>
            <span className="font-heading text-4xl font-bold text-ink transition-colors duration-200 group-hover:text-cloud group-focus-within:text-cloud">
              {s.name}
            </span>

            {/* Image card. Slides on transform only — compositor-friendly. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-1/2 hidden h-[344px] w-[257px] -translate-y-1/2 translate-x-6 overflow-hidden rounded-xl opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100 lg:block"
            >
              <Picture
                name={s.image}
                alt=""
                sizes="257px"
                className="h-full w-full object-cover"
              />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
