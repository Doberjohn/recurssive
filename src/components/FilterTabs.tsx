/**
 * The filter row on the Blog and Cases indexes: one filled pill for the active
 * option, the rest as plain text, then a rule filling whatever width is left.
 *
 * Both frames draw the same thing, so this is one component:
 *
 *                    1920                        768
 *   active pill      49x42, r8, #4813D0          58x53, r8, #4813D0
 *   pill padding     15 / 10                     15 / 10   (identical)
 *   label            16px                        24px
 *   gap              ~40 (37..42 across frames)  20 (exact)
 *   rule             1.5px #6B6B6B, to edge      same
 *
 * The rule is the part worth reading carefully. It is NOT a section divider
 * under the header: it sits vertically centred INSIDE the chip row (y282 within
 * a 261..303 row at 1920; y361 within 331..384 at 768) and starts a little to
 * the right of the last chip, running to the container's right edge. So it is a
 * flex sibling with `flex-1`, not a border on anything.
 *
 * Dropping it was a real bug on the legal pages once — a rule that reads as
 * incidental is exactly the thing that gets left out. It is load-bearing here:
 * without it the chips float in whitespace.
 *
 * Static for now. Nothing is wired up, because there is nothing to filter yet —
 * the pill is the drawn active state, and making these interactive needs a
 * decision about client-side filtering vs `/blog/tag/[tag]` routes.
 */
export function FilterTabs({ options }: { options: readonly string[] }) {
  const [active, ...rest] = options

  return (
    <div className="mt-[30px] flex flex-wrap items-center gap-x-5 gap-y-3 lg:mt-[27px] lg:gap-x-10">
      <span className="t-form rounded-lg bg-primary px-[15px] py-[10px] text-cloud">
        {active}
      </span>

      {rest.map((label) => (
        <span key={label} className="t-form text-ink">
          {label}
        </span>
      ))}

      <hr className="ml-[16px] h-0 min-w-[40px] flex-1 border-0 border-t-[1.5px] border-ink-muted lg:ml-[36px]" />
    </div>
  )
}
