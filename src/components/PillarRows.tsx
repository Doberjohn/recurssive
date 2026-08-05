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
 *   rule             1.5px #6B6B6B, and BOTH rules of the hovered row go #A59BFF
 *
 * Not ServiceIndex, despite the family resemblance. That component is full-bleed
 * (its rules are drawn to x1920, deliberately outside the content column), holds
 * a flat 100px row at every width, and carries a description, an arrow and a
 * slide-in photograph per row. These rows are inset to 746, ramp 56->70, and
 * carry an index and a name and nothing else. Sharing the two would mean giving
 * ServiceIndex a width mode, a height mode and three optional slots, which is a
 * different component wearing the old one's name.
 *
 * What IS borrowed is the one genuinely clever bit: `:has(+ li:hover)` colours a
 * row's UPPER rule from the row above it, so a hovered row lights both of its
 * boundaries. Hover is free — INP measures click, tap and keypress, never hover
 * — so all nineteen rows cost nothing.
 *
 * The frame draws row 3 of some pillars in the active state and not others, and
 * at 768 it colours the row but leaves its rules grey. That is a half-applied
 * frozen hover in the mock, not a rule to encode. Every row gets the full
 * treatment on hover instead.
 */
export function PillarRows({ rows }: { rows: string[] }) {
  return (
    <ul className="w-full lg:w-[746px]">
      {rows.map((name, i) => (
        <li
          key={name}
          className="group relative border-b-[1.5px] border-ink-muted transition-colors first:border-t-[1.5px] hover:border-accent focus-within:border-accent has-[+li:hover]:border-b-accent has-[+li:focus-within]:border-b-accent"
        >
          <a
            href="/contact"
            className="bg-brand-gradient relative flex h-[70px] items-center bg-[length:0_100%] bg-no-repeat transition-[background-size] duration-200 hover:bg-[length:100%_100%] focus-visible:bg-[length:100%_100%] focus-visible:outline-none lg:h-[56px]"
          >
            {/* Right-aligned to a fixed edge (x209 at 1920, x133 at 768), so the
                index column is a fixed width rather than a gap. */}
            <span className="w-[54px] shrink-0 text-right font-heading text-lg text-ink-muted transition-colors group-hover:text-accent group-focus-within:text-accent lg:w-[41px] lg:text-xs">
              ({String(i + 1).padStart(2, '0')})
            </span>
            <span className="ml-[3px] font-heading text-[28px] font-medium tracking-[-0.05em] text-ink transition-colors group-hover:text-cloud group-focus-within:text-cloud lg:text-lg">
              {name}
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
