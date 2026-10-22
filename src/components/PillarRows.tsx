/**
 * The capability list under each pillar heading.
 *
 * Measured:
 *
 *                    1920                    768
 *   row height       56                      70
 *   column width     746 (inset)             610 (= full container)
 *   index            Inter Regular 12px      Inter Regular 20px
 *   name             Inter Medium 20px       Inter Medium 28px, both ls-5%
 *   arrow            24px shaft, x869        28px shaft, x640, the same shape
 *                    scaled; its tip ~19.5 in from the row's right edge, #0F0F0F
 *   rule             1.5px #6B6B6B, and BOTH rules of the hovered row go #A59BFF
 *
 * The arrow was missing until 2026-10-22: the first pass read the frames
 * through a manifest that dropped vectors, and every row in both frames carries
 * one (Arrow 1..N in the .fig). It goes #A59BFF on the hovered row, as drawn.
 *
 * Not ServiceIndex, despite the family resemblance. That component is full-bleed
 * (its rules are drawn to x1920, deliberately outside the content column), holds
 * a flat 100px row at every width, and carries a description and a slide-in
 * photograph per row. These rows are inset to 746, ramp 56->70, and carry an
 * index, a name and an arrow. Sharing the two would mean giving ServiceIndex a
 * width mode, a height mode and two optional slots, which is a different
 * component wearing the old one's name.
 *
 * What IS borrowed is the one genuinely clever bit: `:has(+ li:hover)` colours a
 * row's UPPER rule from the row above it, so a hovered row lights both of its
 * boundaries. Hover is free — INP measures click, tap and keypress, never hover
 * — so all nineteen rows cost nothing.
 *
 * The frame draws row 3 of some pillars in the active state and not others.
 * That is a frozen hover in the mock, not a rule to encode. Every row gets the
 * full treatment on hover instead.
 */

/** The frames' row arrow, outlined from the export (x869 y566.5 at 1920). */
function RowArrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 25.5 17"
      className="relative -top-px ml-auto mr-[19.5px] h-auto w-[29.75px] shrink-0 text-ink transition-colors group-hover:text-accent group-focus-within:text-accent lg:w-[25.5px]"
    >
      <path
        fill="currentColor"
        d="M0 8.5L0 9.595L24 9.595L24 8.5L24 7.405L0 7.405L0 8.5ZM24.775 9.275C25.202 8.847 25.202 8.153 24.775 7.725L17.803 0.754C17.375 0.326 16.682 0.326 16.254 0.754C15.826 1.182 15.826 1.875 16.254 2.303L22.451 8.5L16.254 14.697C15.826 15.125 15.826 15.818 16.254 16.246C16.682 16.674 17.375 16.674 17.803 16.246L24.775 9.275Z"
      />
    </svg>
  )
}
/** Full width of its container: the Capabilities index sets its own 746.
 *  `columns={2}` stands the list in two columns from lg, numbered down the
 *  first and on down the second, as the capability page's (01)-(04) /
 *  (05)-(08) is drawn. Below lg it stays one list, so where the columns would
 *  meet there is one rule, lit for the rows on both sides of it.
 *
 *  `links` sends a row to its capability's page (lib/content capabilityLinks);
 *  a row it does not name goes to /contact. */
export function PillarRows({
  rows,
  columns = 1,
  links = {},
}: {
  rows: string[]
  columns?: 1 | 2
  links?: Record<string, string>
}) {
  const split = columns === 2 ? Math.ceil(rows.length / 2) : rows.length
  return (
    <ul
      className={`w-full ${columns === 2 ? 'lg:grid lg:grid-flow-col lg:grid-cols-2 lg:gap-x-[6.4%]' : ''}`}
      // Read only once lg makes the list a grid.
      style={columns === 2 ? { gridTemplateRows: `repeat(${split}, auto)` } : undefined}
    >
      {rows.map((name, i) => {
        // The ROW holds the pitch, its rules inside it (border-box): the
        // frames' 70 / 56 rule to rule, plus 1.5 on a row that also draws the
        // rule above it. A pitch built from the link's height plus the rule ran
        // short wherever the browser thins the rule, as Chrome does to 1px at
        // 1x: 0.5 a row, 4.5 down a list of eight.
        //
        // A FLOOR below lg, not a height: on a phone a name can still wrap,
        // and a fixed row let it spill over the next one (it did at 390,
        // three lines of "React Native Performance Optimization" across two
        // rows). The link's padding keeps a grown row off its rules.
        const pitch =
          i === 0
            ? 'min-h-[71.5px] border-t-[1.5px] lg:min-h-[57.5px]'
            : i === split
              ? 'min-h-[70px] lg:min-h-[57.5px] lg:border-t-[1.5px]'
              : 'min-h-[70px] lg:min-h-[56px]'
        // A hovered row lights the rule above it through the row before it,
        // except, from lg, across the top of the second column.
        const above =
          columns === 2 && i === split - 1
            ? 'max-lg:has-[+li:hover]:border-b-accent max-lg:has-[+li:focus-within]:border-b-accent'
            : 'has-[+li:hover]:border-b-accent has-[+li:focus-within]:border-b-accent'
        return (
          <li
            key={name}
            className={`group relative flex flex-col border-b-[1.5px] border-ink-muted transition-colors hover:border-accent focus-within:border-accent ${pitch} ${above}`}
          >
            <a
              href={links[name] ?? '/contact'}
              className="bg-brand-gradient relative flex flex-1 items-center bg-[length:0_100%] bg-no-repeat py-[7px] transition-[background-size] duration-200 hover:bg-[length:100%_100%] focus-visible:bg-[length:100%_100%] focus-visible:outline-none lg:py-0"
            >
              {/* Right-aligned to a fixed edge (x209 at 1920, x133 at 768), so the
                  index column is a fixed width rather than a gap. */}
              <span className="w-[54px] shrink-0 text-right font-heading text-lg text-ink-muted transition-colors group-hover:text-accent group-focus-within:text-accent lg:w-[41px] lg:text-xs">
                ({String(i + 1).padStart(2, '0')})
              </span>
              {/* Leading 1.2 as both frames set it; it inherited 1.5. Below 768
                  the name ramps like the type scale (globals.css): the drawn 28
                  at 768 to 0.727 of it, 20.4, at 360. */}
              <span className="ml-[3px] font-heading font-medium leading-[1.2] tracking-[-0.05em] text-ink transition-colors [font-size:clamp(1.2725rem,0.851rem_+_1.8725vw,1.75rem)] group-hover:text-cloud group-focus-within:text-cloud lg:text-lg">
                {name}
              </span>
              <RowArrow />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
