import { Picture } from './ui/Picture'
import { SlideArrow } from './ui/SlideArrow'
import { CarouselTrack } from './CarouselTrack'
import { techStack } from '@/content/capability-page'
import { techLogos } from '@/content/tech-logos'

/**
 * "Tech we use on repeat" — the photograph band after Discover More Services,
 * from the Capability frames.
 *
 *              1920                            768
 *   band       full bleed, 802 tall, 177.25    610 tall, 68.25 under them
 *              under the services' last rule
 *   photo      capability-a, greyscale, cover  the same photo 1460 wide from
 *              across the width, 3.3% down     x-491, 1.797x cover
 *   overlay    #0F0F0F, 0 -> 100% top to bottom, over the band
 *   heading    48, top 88 down (box)           42, top 83 down
 *   intro      16 / 1.5, 477, 8 under the box  24 at -3%, 1.25 as drawn — the
 *                                              one 768 paragraph not at 1.5
 *   groups     3 columns, 458 + 110 gutters,   a carousel, one group a slide,
 *              rows 46 apart                   arrows flush to the column
 *   group      32, chips 51 under its top      the same
 *   chip       #EAEAEA r8, 36 tall: 16 | mark  the 1920 chip x1.136 (25/22),
 *              | 5 | Open Sans 600 15 | 16;    rows 54.55 apart
 *              15 across, 12 down
 *   foot       102 under the last chips        122
 *
 * Headings sit on the drawn baselines rather than the drawn boxes: Figma's auto
 * line box for Inter is 1.21, .t-section's is 1.05, a 32px group heading here
 * is set solid. The intro's drawn box at 1920 has a blank third line (the
 * string ends in a newline), so the gap below it is taken from the text.
 *
 * The chip is set in em: its font size is the only thing that changes between
 * the frames (15 at 1920, 17.05 at 768), and every length in it — height,
 * padding, radius, the mark, the gaps — scales with it, as the 768 frame
 * scales the whole chip. On a phone it takes the 1920 chip back.
 *
 * Below lg the groups are Home's industries carousel exactly: a scroll-snap
 * track, a swipe with no JavaScript, and arrows that are anchors to the
 * neighbouring slides, wrapping at both ends, so both are live as drawn.
 * At 768 the slide's content is 448 wide between the arrows (x160..608),
 * which keeps three chips to a row as the frame draws Front End; the arrows'
 * centre is 112.5 under the group's heading. On a phone the arrows come in to
 * 6 off the chips: at 390 that is a 256 column, two chips to a row, where 244
 * left "JavaScript" and "Next.js" alone on theirs.
 *
 * From lg it is a grid: two columns, then the drawn three from xl, where
 * "Product Management" fits a column on one line.
 *
 * The marks are one cached sprite (public/icons/tech.svg), not inline: 37 of
 * them inline would put ~60KB in every capability page's HTML.
 */
export function CapabilityTech() {
  const { groups } = techStack
  return (
    <section
      aria-labelledby="tech"
      className="relative isolate mt-[68.25px] overflow-hidden text-cloud lg:mt-[177.25px]"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {/* Greyscale is the file's: its copy of this photograph is stored
            desaturated (R = G = B) and is otherwise the frame we ship,
            greyscale RMSE 1.95 between the two — the same CSS treatment as
            Process's photograph, so one asset serves both looks.

            At 768 it is not cover either: the file draws it 1460 wide from
            x-491 on the 768x610 band, 1.797x cover, with the cup in view.
            Scaling cover by that about the point the file keeps still (70.95%
            across, 3.3% down) is that drawing exactly at 768, and it holds
            the cup in frame as the band narrows and grows taller — a box 190%
            wide drifted to the tablet by 390. */}
        <Picture
          name="capability-a"
          alt=""
          fill
          sizes="(min-width: 1024px) 100vw, 190vw"
          imgClassName="grayscale object-[70.95%_3.3%] origin-[70.95%_3.3%] scale-[1.7974] lg:object-[0%_3.3%] lg:origin-center lg:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/0 to-ink" />
      </div>

      <div className="container-content pb-[122px] pt-[86.45px] lg:pb-[102px] lg:pt-[91.8px]">
        <h2 id="tech" className="t-section font-heading font-semibold">
          {techStack.heading}
        </h2>
        <p className="t-body mt-[12.45px] leading-[1.25] lg:mt-[11.8px] lg:max-w-[477px] lg:leading-[1.5]">
          {techStack.intro}
        </p>

        <CarouselTrack className="mt-[57.5px] flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mt-[52.5px] lg:grid lg:snap-none lg:grid-cols-2 lg:gap-x-[6.9%] lg:gap-y-[49.5px] lg:overflow-visible xl:grid-cols-3">
          {groups.map((group, i) => {
            const prev = groups[(i + groups.length - 1) % groups.length]
            const next = groups[(i + 1) % groups.length]
            return (
              <li
                key={group.name}
                id={`tech-${i}`}
                className="flex w-full shrink-0 snap-center items-start justify-between gap-1.5 md:gap-3 lg:block lg:w-auto"
              >
                <a
                  href={`#tech-${(i + groups.length - 1) % groups.length}`}
                  aria-label={`Previous group: ${prev.name}`}
                  className="mt-[97.5px] shrink-0 text-cloud outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent lg:hidden"
                >
                  <SlideArrow direction="prev" />
                </a>

                <div className="w-[448px] min-w-0 lg:w-auto">
                  {/* The drawn 32 at 768 and 1920; on a phone it eases to 24
                      by 360, so "Mobile Development" keeps to one line
                      between the arrows. */}
                  <h3 className="leading-none [font-size:clamp(1.5rem,1.0588rem_+_1.9608vw,2rem)]">
                    {group.name}
                  </h3>
                  <ul className="mt-[15.5px] flex flex-wrap gap-x-[1em] gap-y-[0.8em] text-[15px] md:text-[17.045px] lg:text-[15px]">
                    {group.tools.map((tool) => {
                      const [w, h] = techLogos[tool.logo]
                      return (
                        <li
                          key={tool.name}
                          className="flex h-[2.4em] items-center rounded-[0.5333em] bg-silver px-[1.0667em] font-semibold leading-none text-ink"
                        >
                          <svg
                            aria-hidden="true"
                            viewBox={`0 0 ${w} ${h}`}
                            className="shrink-0 overflow-visible"
                            style={{ width: `${w / 15}em`, height: `${h / 15}em` }}
                          >
                            <use href={`/icons/tech.svg#${tool.logo}`} />
                          </svg>
                          <span className="ml-[0.3333em]">{tool.name}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>

                <a
                  href={`#tech-${(i + 1) % groups.length}`}
                  aria-label={`Next group: ${next.name}`}
                  className="mt-[97.5px] shrink-0 text-cloud outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent lg:hidden"
                >
                  <SlideArrow direction="next" />
                </a>
              </li>
            )
          })}
        </CarouselTrack>
      </div>
    </section>
  )
}
