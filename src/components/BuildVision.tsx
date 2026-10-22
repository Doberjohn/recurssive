import { Picture } from './ui/Picture'
import { Button } from './ui/Button'
import { VisionBackdrop } from './VisionBackdrop'
import { site } from '@/lib/site'

/**
 * "Let's build your vision" — the band above the footer on the legal pages.
 *
 * Measured from `Build Vision.svg` (1920x330) and `Build Vision Mobile.svg`
 * (768x389), which are frames 216_336 and 216_550:
 *
 *              1920                  768
 *   band       1920x330              768x389
 *   heading    48px @y61, centred    (t-section's 42px)
 *   body       16px @y161, 477 wide  (t-body's 24px)
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
 *
 * THE 768 BAND, re-measured against the page frames (About.svg; About,
 * Capabilities, Case, Cases, Privacy and Terms all draw it identically): 388
 * tall, heading Inter Semi Bold 48 at -5% (not .t-section's 42), body Open
 * Sans 24 at -3% (.t-body), CTA 200x49. Ink from the band's top:
 * heading 77.4-123.8, body 147.8-243.8, CTA 271-320, so 68 under the CTA.
 * 1920 is unchanged.
 */
export function BuildVision() {
  return (
    <section
      // flex-col, not `flex items-center`. Row direction makes the content a
      // flex item whose width collapses toward its content, which wrapped the
      // heading onto four lines and the paragraph onto twenty, and took the band
      // from a drawn 330 to 891. Column direction lets the child keep the
      // container's width and justify-center does the vertical centring.
      className="relative isolate flex flex-col justify-center overflow-hidden lg:min-h-[330px]"
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

      {/* Group 2248: six 0.5px rectangles, #FAFAFA at 50%, full band height,
          each about 1/1.618 the width of the last — 830, 513, 317, 196, 122,
          75 (from the .fig; the export draws the visible ones). The same 2052
          group sits at x-703 in the 768 frame and x-132 in the 1920 one, so it
          slides as the band widens: left = 49.566% - 1083.7px. Its shared edges
          are the visible lines, at x127 and 640 on a 768 band and x698, 1211,
          1528, 1724 and 1845 on a 1920 one. Static, not on the parallax layer:
          the photo moves under it, the drawn grid does not. Height stretches
          with the band; non-scaling-stroke keeps the hairline. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 2052 100"
        preserveAspectRatio="none"
        fill="none"
        className="absolute left-[calc(49.566%_-_1083.7px)] top-0 -z-10 h-full w-[2052px]"
      >
        <g stroke="#FAFAFA" strokeOpacity="0.5" strokeWidth="0.5" vectorEffect="non-scaling-stroke">
          {[
            [0, 830],
            [830, 513],
            [1343, 317],
            [1660, 196],
            [1856, 122],
            [1977, 75],
          ].map(([x, w]) => (
            <rect key={x} x={x} y={0} width={w} height={100} vectorEffect="non-scaling-stroke" />
          ))}
        </g>
      </svg>

      {/* Padding, not min-height and centring, below lg: the 768 frame fixes
          the heading's ink 77.4 under the band's top and the CTA 68 above its
          bottom, and the band takes whatever height its content needs between
          them (388 as drawn).

          The heading ramps 30px at 360 to the drawn 48 at 768, not the type
          scale's 0.727 (35 at 360): at that size it broke onto two lines on a
          390 phone, where .t-section's 31 held one. */}
      <div className="container-content pb-[68px] pt-[71.2px] text-center lg:py-14">
        <h2
          id="build-vision"
          className="t-section mx-auto max-w-[16ch] text-cloud [font-size:clamp(1.875rem,0.8824rem_+_4.412vw,3rem)]"
        >
          Let&rsquo;s build your vision
        </h2>

        {/* Was "We read every message ourselves" — the one placement of this
            sentence that made NO time commitment, so the site promised two
            working days before the form and nothing here. Both halves now come
            from site.ts. */}
        <p className="t-body mx-auto mt-[17.1px] max-w-[477px] text-cloud lg:mt-4">
          {site.contactInvite} {site.replyPromise}
        </p>

        <div className="mt-[24.3px] flex justify-center lg:mt-8">
          <Button href="/contact" variant="band">Send Message</Button>
        </div>
      </div>
    </section>
  )
}
