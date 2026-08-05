import { Picture } from './ui/Picture'
import { Button } from './ui/Button'
import { VisionBackdrop } from './VisionBackdrop'

/**
 * "Let's build your vision" — the band above the footer on the legal pages.
 *
 * Measured from `Build Vision.svg` (1920x330) and `Build Vision Mobile.svg`
 * (768x389), which are frames 216_336 and 216_550:
 *
 *              1920                  768
 *   band       1920x330              768x389
 *   heading    48px @y61, centred    (t-section's 42px)
 *   body       16px @y161, 477 wide  (t-body's 22px)
 *   CTA        143x39 @y231          200x49 @y271
 *
 * The scrim is a VERTICAL gradient, transparent at the top to solid #0F0F0F at
 * the bottom, not the flat wash the FeelFormFunction band uses. Both exports
 * agree: stop 0 is #0F0F0F at zero opacity, stop 1 is #0F0F0F.
 *
 * The photograph is `shared`, already in the image pipeline. Identified by
 * perceptual comparison rather than by eye: the raster embedded in the export
 * matches sergey-zolkin at 0.72 mean absolute difference against a next-best of
 * 44.42, and the Privacy frame names that file directly.
 *
 * Both frames draw the image WIDER than the band (1920 in a 768 frame, 2052 in a
 * 1920 one). That bleed is what the pointer parallax moves within — see
 * VisionBackdrop for why it needs JavaScript at all, and .vision-parallax in
 * globals.css for what the two numbers it writes actually do.
 */
export function BuildVision() {
  return (
    <section
      // flex-col, not `flex items-center`. Row direction makes the content a
      // flex item whose width collapses toward its content, which wrapped the
      // heading onto four lines and the paragraph onto twenty, and took the band
      // from a drawn 330 to 891. Column direction lets the child keep the
      // container's width and justify-center does the vertical centring.
      className="relative isolate flex min-h-[389px] flex-col justify-center overflow-hidden lg:min-h-[330px]"
      aria-labelledby="build-vision"
    >
      {/* Children stay server-rendered: the <picture> markup is passed in, so
          the image manifest never reaches the client bundle. */}
      <VisionBackdrop>
        <Picture name="shared" alt="" sizes="100vw" fill className="h-full w-full" />
      </VisionBackdrop>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-phantom"
      />

      <div className="container-content py-16 text-center lg:py-14">
        <h2
          id="build-vision"
          className="t-section mx-auto max-w-[16ch] text-cloud"
        >
          Let&rsquo;s build your vision
        </h2>

        <p className="t-body mx-auto mt-4 max-w-[477px] text-cloud">
          Tell us what you&rsquo;re building, even if it&rsquo;s still rough. We
          read every message ourselves.
        </p>

        <div className="mt-8 flex justify-center">
          <Button href="/contact">Send Message</Button>
        </div>
      </div>
    </section>
  )
}
