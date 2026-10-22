import { Picture } from './ui/Picture'
import { Button } from './ui/Button'
import type { ImageName } from '@/lib/images.generated'

/**
 * The capability page's hero, from the Capability frames.
 *
 *              1920                          768
 *   band       0..868, mesh 6                0..1038, mesh 6
 *   title      72 Inter Semi Bold, lh 1,     48, lh 1, 314 wide (two lines)
 *              ls -5%, x199 (36 into the
 *              column), 540 wide
 *   intro      16 Open Sans, 477 wide, 20    24 at -3%, the column, 15 under
 *              under the title               the title
 *   button     113x39 r6 #FAFAFA, 16 under   154x49, 21 under
 *   photo      860x574 r15, the column's     610x407 r10.6, 43 under the
 *              right edge, y190; the text    button; the band ends 80 under it
 *              block centred on it; the
 *              band ends 104 under it
 *
 * THE MESH is one 1920x1200 layer at both widths, bottom-anchored 10.4 below
 * the band's foot (y-321.6 in the 868 band, y-151.6 in the 1038 one) and
 * panning left: x0 at 1920, x-351 at 768. So it lives in a fixed box that
 * slides, left = 30.469% - 585px, the same construction as the About hero's
 * stage; it widens with the band past 1920 so it still covers.
 *
 * THE GRID ("Gutenberg Grid Horizontal") is five 0.5px #FAFAFA strokes — an
 * outer golden rectangle, two diagonals, an inner rectangle and a corner — set
 * BEHIND the photo and running off the band's right edge. It is drawn relative
 * to the photo at both widths, but not as one proportion (x+168 y+92 at 99.25%
 * of the photo's width at 1920; x+100 y+52.4 at 100.7% at 768), so it carries
 * two sets of percentages of the photo's box. non-scaling-stroke keeps the
 * hairline at every size.
 *
 * Between lg and 1920 the two columns are shares of the container (2.26% inset,
 * 33.88% text, 53.95% photo) and the title a share of the viewport, landing on
 * the drawn values at 1920: a flat 72px title cannot sit beside a photo at 1024.
 */
export function CapabilityHero({
  title,
  intro,
  photo,
}: {
  title: string
  intro: string
  photo: ImageName
}) {
  return (
    <section
      aria-labelledby="capability-title"
      className="relative isolate overflow-hidden pb-[80px] pt-[clamp(135px,23.83vw,183px)] lg:pb-[104px] lg:pt-[190px]"
    >
      <div
        aria-hidden="true"
        className="mesh absolute -bottom-[10.4px] left-[min(0px,calc(30.469%_-_585px))] -z-10 aspect-[1920/1200] w-[max(1920px,100%)] [--mesh-size:100%_100%] [--mesh:var(--mesh-6)]"
      />

      <div className="container-content lg:flex lg:items-center lg:justify-between">
        <div className="lg:ml-[2.26%] lg:w-[33.88%]">
          <h1
            id="capability-title"
            className="t-hero max-w-[314px] font-heading font-semibold leading-none text-cloud lg:max-w-none lg:[font-size:min(4.5rem,3.75vw)]"
          >
            {title}
          </h1>
          <p className="t-body mt-[15px] text-cloud lg:mt-[20px] lg:max-w-[477px]">{intro}</p>
          <div className="mt-[21px] lg:mt-[16px]">
            <Button href="/contact" variant="band-light">
              Book a call
            </Button>
          </div>
        </div>

        <div className="relative mt-[43px] lg:mt-0 lg:w-[53.95%]">
          <svg
            aria-hidden="true"
            viewBox="0 0 853.56 603.53"
            fill="none"
            className="absolute left-[16.39%] top-[12.87%] w-[100.7%] overflow-visible lg:left-[19.535%] lg:top-[16.028%] lg:w-[99.251%]"
          >
            <g stroke="#FAFAFA" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
              <path vectorEffect="non-scaling-stroke" d="M0 603.53V0H853.56V603.53H0Z" />
              <path vectorEffect="non-scaling-stroke" d="M853.56 603.519L0 0" />
              <path vectorEffect="non-scaling-stroke" d="M426.78 603.517L853.56 0" />
              <path vectorEffect="non-scaling-stroke" d="M235.69 166.643H735.71V520.185H235.69V166.643Z" />
              <path vectorEffect="non-scaling-stroke" d="M569.04 402.355H853.56L652.38 603.525" />
            </g>
          </svg>
          <div className="relative aspect-[860/574] overflow-hidden rounded-[10.64px] lg:rounded-[15px]">
            {/* Cover and top-aligned, as both frames crop it. */}
            <Picture
              name={photo}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 54vw, 100vw"
              className="h-full w-full"
              imgClassName="object-top"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
