import { Button } from './ui/Button'

/**
 * "Why build a Mobile App?" — six benefits and an Inquire button, from the
 * Capability frames.
 *
 *              1920                            768
 *   heading    48 (t-section), baseline        42, baseline 122.8 under the
 *              182.5 under the hero's foot     hero's foot
 *   grid       3x2, columns 427 at x163 /      one column, the full 610
 *              747 / 1331, rows 38 apart
 *   title      32 Inter Semi Bold, lh 1, -5%   the same 32
 *   body       16 Open Sans at -2% (not        24 at -3% (t-body), 15 under
 *              t-body's 0), 13 under the title the title
 *   dividers   vertical, #EAEAEA 1.5, at the   horizontal, 410 centred, 38.25
 *              page centre +/-310, from 6      under each body and 41.25 above
 *              under the title to 6 above      the next title
 *              the body's foot
 *   button     83x39 accent, centred, 69       109x49, 39 under the last body
 *              under the last row
 *
 * The 1920 grid is three columns of 26.79% (427/1594) pushed to the container's
 * edges, so the middle one centres and the dividers keep their place in the
 * gutters at any lg width: they hang off the middle column, at -22.72% and
 * 122.48% of its width (-97 and +523 at 1920). Below lg the title ramps like
 * the type scale (32 at 768 to 0.727 of it, 23.3, at 360); the frames draw 32
 * at both widths.
 */
export function CapabilityBenefits({
  heading,
  benefits,
}: {
  heading: string
  benefits: { title: string; body: string }[]
}) {
  return (
    <section aria-labelledby="why-build" className="container-content mt-[85.45px] lg:mt-[139.8px]">
      <h2 id="why-build" className="t-section font-heading font-semibold text-ink">
        {heading}
      </h2>

      <ul className="mt-[45.45px] lg:mt-[77.8px] lg:grid lg:grid-cols-[repeat(3,26.79%)] lg:justify-between lg:gap-y-[38px]">
        {benefits.map((b, i) => (
          <li
            key={b.title}
            className={`relative ${i > 0 ? 'mt-[81px] lg:mt-0' : ''} ${
              i % 3 === 1
                ? "lg:before:absolute lg:before:bottom-[6px] lg:before:left-[-22.72%] lg:before:top-[6px] lg:before:w-[1.5px] lg:before:bg-silver lg:before:content-[''] lg:after:absolute lg:after:bottom-[6px] lg:after:left-[122.48%] lg:after:top-[6px] lg:after:w-[1.5px] lg:after:bg-silver lg:after:content-['']"
                : ''
            }`}
          >
            {i > 0 && (
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-[-42.75px] h-[1.5px] w-[67.2%] -translate-x-1/2 bg-silver lg:hidden"
              />
            )}
            <h3 className="font-heading font-semibold leading-none tracking-[-0.05em] text-ink [font-size:clamp(1.454rem,0.973rem_+_2.14vw,2rem)]">
              {b.title}
            </h3>
            <p className="t-body mt-[15px] text-ink-muted lg:mt-[13px] lg:tracking-[-0.02em]">{b.body}</p>
          </li>
        ))}
      </ul>

      <div className="mt-[39px] flex justify-center lg:mt-[69px]">
        <Button href="/contact" variant="band">
          Inquire
        </Button>
      </div>
    </section>
  )
}
