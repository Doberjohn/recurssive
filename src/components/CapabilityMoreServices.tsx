import { PillarRows } from './PillarRows'
import { moreServices } from '@/content/capability-page'

/**
 * "Discover More Services" — the Capabilities index's rows, eight of them,
 * from the Capability frames.
 *
 *              1920                            768
 *   heading    48, baseline 173.5 under the    42, baseline 99.8 under it
 *              idea card's foot
 *   intro      16, 477, 14.8 under the         24 at -3%, the column, 13.45
 *              heading's box                   under the heading's box
 *   rows       two columns of four, 746 each   one list of eight; the first
 *              at x163 / x1012, (05)-(08) on   rule 27.25 under the intro
 *              the right; the first rule 37.25
 *              under the intro
 *
 * The rows are PillarRows exactly — same 56 / 70 pitch, arrow and hover; the
 * frames draw the hover on row 03 here too. One list in two columns, not two
 * lists: below lg the eight stack with a single rule between (04) and (05).
 * From lg each column takes 46.8% (746 / 1594, a 103 gutter), which is the
 * drawn split at 1920 and still fits at 1024.
 */
export function CapabilityMoreServices({
  current,
  links,
}: {
  /** The page's own title: its row is swapped for the stand-in, in place. */
  current: string
  links: Record<string, string>
}) {
  const rows = moreServices.rows.map((row) => (row === current ? moreServices.standIn : row))
  return (
    <section aria-labelledby="more-services" className="container-content mt-[62.45px] lg:mt-[130.8px]">
      <h2 id="more-services" className="t-section font-heading font-semibold text-ink">
        {moreServices.heading}
      </h2>
      <p className="t-body mt-[13.45px] text-ink-muted lg:mt-[14.8px] lg:max-w-[477px]">{moreServices.intro}</p>

      <div className="mt-[27.25px] lg:mt-[37.25px]">
        <PillarRows rows={rows} columns={2} links={links} />
      </div>
    </section>
  )
}
