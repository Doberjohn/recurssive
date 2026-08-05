import { Picture } from './ui/Picture'
import { Button } from './ui/Button'

/**
 * "Stay in the loop" — the newsletter band above the footer.
 *
 * Drawn on both the Blog index and the Post template at the same offset from the
 * footer, so it is a shared band like BuildVision rather than a Blog one-off.
 *
 *                    1920                    768
 *   band             1922x255                866x438
 *   heading          48px Semi Bold ls-5%    48px  (IDENTICAL — no ramp)
 *   description      16px, #6B6B6B           24px, #FAFAFA
 *   fields           200x42, r6              200x53, r6
 *   Join             96x41, r6, #4813D0      135x53
 *   consent box      14x14, r2               22x22, r3
 *
 * Two things the frames disagree on, resolved rather than reproduced:
 *
 * 1. The 768 frame has a black scrim over the photo; the 1920 frame has none,
 *    yet still sets its description in #6B6B6B. Muted grey on a bare photograph
 *    is not a contrast ratio anyone can defend, and the 1920 frame is missing
 *    the overlay its own text colour assumes. Both get the scrim, and the
 *    description is #FAFAFA at both widths.
 * 2. The heading not ramping is unusual but drawn that way at both widths, so
 *    it is left flat.
 *
 * The form does not submit anywhere yet — there is no list to subscribe to. It
 * is deliberately NOT wired to the contact route, which sends enquiries to a
 * human inbox; silently routing newsletter signups there would be worse than an
 * inert form.
 */
export function Newsletter() {
  return (
    <section
      className="relative isolate flex min-h-[438px] flex-col justify-center overflow-hidden lg:min-h-[255px]"
      aria-labelledby="newsletter"
    >
      <div className="absolute inset-0 -z-10">
        <Picture name="editorial" alt="" fill sizes="100vw" className="h-full w-full" />
        {/* Present at 768 in the frame, absent at 1920. Applied at both — see above. */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/75" />
      </div>

      <div className="container-content">
        <div className="lg:flex lg:items-center lg:justify-between lg:gap-16">
          <div>
            <h2
              id="newsletter"
              className="text-center font-heading text-7xl font-semibold text-cloud lg:text-left"
            >
              Stay in the loop
            </h2>
            <p className="t-body mt-[18px] max-w-[610px] text-center text-cloud lg:mt-[8px] lg:max-w-[374px] lg:text-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
            </p>
          </div>

          <form className="mt-[80px] lg:mt-0">
            <div className="flex flex-wrap items-center gap-[15px]">
              <label className="sr-only" htmlFor="nl-name">
                Name
              </label>
              <input
                id="nl-name"
                name="name"
                autoComplete="name"
                placeholder="Name"
                className="h-[53px] w-[200px] rounded-md bg-cloud px-[15px] text-2xl text-ink placeholder:text-ink lg:h-[42px] lg:text-base"
              />

              <label className="sr-only" htmlFor="nl-email">
                E-mail
              </label>
              <input
                id="nl-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="E-mail"
                className="h-[53px] w-[200px] rounded-md bg-cloud px-[15px] text-2xl text-ink placeholder:text-ink lg:h-[42px] lg:text-base"
              />

              <Button type="submit" variant="accent">
                Join
              </Button>
            </div>

            <label className="mt-[24px] flex items-start gap-[10px] lg:mt-[18px]">
              <input type="checkbox" name="terms" className="consent-box mt-[3px]" />
              <span className="text-xl text-cloud lg:text-sm">
                I’ve read and accepted the terms and conditions
              </span>
            </label>
          </form>
        </div>
      </div>
    </section>
  )
}
