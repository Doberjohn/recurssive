import { whyUs } from '@/content/capability-page'

/**
 * "Why us" — six items, each an outline icon, a two-line label and a body,
 * from the Capability frames.
 *
 *              1920                            768
 *   heading    48, baseline 135.5 under the    42, baseline 128.8 under it
 *              process band's foot
 *   intro      16, 477 wide, 17.8 under the    24 at -3%, the column, 13.45
 *              heading's box                   under the heading's box
 *   items      3x2 grid of 431 (x163 / 745 /   rows: icon + label in 157, the
 *              1327), rows 55 apart; icon +    body (453) beside it; 77 apart
 *              label in 132, body 299 beside
 *   icon       ~50px, its top 6 under the      x1.475, 8 under the body's
 *              body's top                      top
 *   label      24 Inter Semi Bold, lh 1, -5%,  30, two lines in 119, 11 under
 *              two lines in 105, 18 under the  the icon
 *              icon
 *   body       16 at -2%                       24 at -3% (t-body)
 *
 * THE ICONS are outlines filled with mesh 5: each is a mask (two shapes, a
 * 1.29 inside stroke, exported as a 2.58 stroke clipped to its own shape)
 * over the whole gradient drawn to cover an 88x55 rect around it. So each is a
 * span carrying `.mesh` (grain included), masked by its outline SVG in
 * public/icons/why-us, the rect placed exactly where the frame puts it
 * relative to the icon's slot. --s scales the lot: 1 at lg, 1.475 below.
 *
 * Three columns need 3 x 431 + two gutters, which is the whole 1594 container,
 * so the drawn grid starts at 1470 (as the Capabilities index's side-by-side
 * does) in fluid shares of it; below that the items run as the 768 rows.
 * Phones stack each item: icon, label on one line, body.
 *
 * 1470 is written min-[91.875rem], NOT min-[1470px]: Tailwind v4 sorts a
 * px-valued arbitrary breakpoint AHEAD of the rem-based md/lg in the
 * stylesheet, so a min-[1470px] value can never override an lg one (the
 * second and third items sat 55px low at 1920 that way).
 */

const ICONS: Record<string, { x: number; y: number; w: number; h: number }> = {
  'human-touch': { x: -25, y: -3, w: 84, h: 53 },
  'solution-oriented': { x: -4, y: -3, w: 88, h: 55 },
  'future-ready': { x: -4, y: -3, w: 88, h: 55 },
  'latest-tech': { x: -19, y: -2, w: 88, h: 55 },
  'efficient-systems': { x: -1, y: -10, w: 88, h: 55 },
  'reliable-partner': { x: -9, y: -4, w: 88, h: 55 },
}

function Icon({ name }: { name: string }) {
  const g = ICONS[name]
  const s = (v: number) => `calc(${v}px * var(--s))`
  const mask = `url(/icons/why-us/${name}.svg)`
  return (
    <span aria-hidden="true" className="relative block h-[calc(47px*var(--s))] w-[calc(63px*var(--s))] [--s:1.475] lg:[--s:1]">
      <span
        className="mesh absolute [--mesh-size:100%_100%] [--mesh:var(--mesh-5)]"
        style={{
          left: s(g.x),
          top: s(g.y),
          width: s(g.w),
          height: s(g.h),
          maskImage: mask,
          WebkitMaskImage: mask,
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
        }}
      />
    </span>
  )
}

export function CapabilityWhyUs() {
  return (
    <section aria-labelledby="why-us" className="container-content mt-[91.45px] lg:mt-[92.8px]">
      <h2 id="why-us" className="t-section font-heading font-semibold text-ink">
        {whyUs.heading}
      </h2>
      <p className="t-body mt-[13.45px] text-ink-muted lg:mt-[17.8px] lg:max-w-[477px]">{whyUs.intro}</p>

      <ul className="mt-[50px] lg:mt-[64px] min-[91.875rem]:grid min-[91.875rem]:grid-cols-[repeat(3,27.04%)] min-[91.875rem]:justify-between min-[91.875rem]:gap-y-[55px]">
        {whyUs.items.map((item, i) => (
          <li key={item.name} className={`md:flex md:items-start ${i > 0 ? 'mt-[77px] lg:mt-[55px] min-[91.875rem]:mt-0' : ''}`}>
            <div className="md:w-[157px] md:shrink-0 md:pt-[8px] lg:w-[132px] lg:pt-[6px] min-[91.875rem]:w-[30.63%]">
              <Icon name={item.icon} />
              <h3 className="mt-[11px] font-heading font-semibold leading-none tracking-[-0.05em] text-ink [font-size:clamp(1.3636rem,0.9125rem_+_2.005vw,1.875rem)] md:max-w-[119px] lg:mt-[18px] lg:max-w-[105px] lg:text-2xl">
                {item.name}
              </h3>
            </div>
            <p className="t-body mt-[16px] text-ink-muted md:mt-0 md:min-w-0 md:flex-1 lg:tracking-[-0.02em]">{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
