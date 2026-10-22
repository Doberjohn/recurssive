import { Picture } from './ui/Picture'
import { Button } from './ui/Button'
import { ideaCard } from '@/content/capability-page'

/**
 * "Got an idea that keeps coming back?" — the photograph card between Why us
 * and Discover More Services, from the Capability frames.
 *
 *              1920                            768
 *   card       the column x 493, r15, 137      the column x 673, 50 under the
 *              under Why us                    last item
 *   photo      capability-b, cover, 43.33%     cover, top left
 *              down
 *   overlay    #000, 0 -> 75% top to bottom    the same
 *   text       132 in, heading top 153 down    66 in, 196 down
 *   heading    48, lh 1, two lines in 455      42, two lines in 387
 *   body       16, 477, 17 under the heading   24 at -3%, 485, 16 under
 *   button     band-light 83x39, 13 under      109x49, 25 under; 195 above
 *              the body; 127 above the foot    the foot
 *
 * The drawn heights are padding plus content (153 + 213 + 127 = 493,
 * 196 + 282 + 195 = 673), so the card is content-driven rather than fixed and
 * longer copy grows it. Below lg the padding is a share of the card's width
 * (66 / 196 / 195 of 610), which is how a phone keeps the 768 proportions.
 * The photo and overlay sit in their own clipped layer, so the card itself
 * never clips its text.
 */
export function CapabilityIdeaCard() {
  return (
    <section
      aria-labelledby="idea-card"
      className="container-content mt-[50px] lg:mt-[137px]"
    >
      <div className="relative isolate px-[10.82%] pb-[31.97%] pt-[32.13%] text-cloud lg:px-[132px] lg:pb-[127px] lg:pt-[153px]">
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden rounded-[15px]">
          <Picture
            name="capability-b"
            alt=""
            fill
            sizes="(min-width: 1024px) 1594px, 100vw"
            className="h-full w-full"
            imgClassName="object-[0%_0%] lg:object-[0%_43.33%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/75" />
        </div>

        <h2
          id="idea-card"
          className="t-section max-w-[387px] font-heading font-semibold leading-none lg:max-w-[455px]"
        >
          {ideaCard.heading}
        </h2>
        <p className="t-body mt-[16px] max-w-[485px] lg:mt-[17px] lg:max-w-[477px]">{ideaCard.body}</p>
        <div className="mt-[25px] lg:mt-[13px]">
          <Button href="/contact" variant="band-light">
            {ideaCard.action}
          </Button>
        </div>
      </div>
    </section>
  )
}
