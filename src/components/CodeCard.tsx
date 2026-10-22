/**
 * The code-editor mock beside each Capabilities pillar.
 *
 * Measured, and unusually for this codebase the numbers are IDENTICAL at both
 * breakpoints — only the card's position on the page changes (beside the rows at
 * 1920, centred below them at 768):
 *
 *   card        502 x 484   #0F0F0F   r25
 *   title bar   divider 1.5px #6B6B6B at y49
 *   dots        11x11 at x20 / x36 / x51, y19
 *   gutter      53 wide, #232323, to the card's foot, bottom-left radius only
 *   code        first line 26 under the divider (75 from the top) in all four
 *               cards, 24px leading, the rest of the 484 below it
 *   line nums   14px #6B6B6B
 *   code        14px #FDFDFD, with runs coloured #EF4444 / #8B5CF6 /
 *               #22C55E / #E85341, and two braces #6B6B6B on Consulting
 *
 * So this deliberately does NOT scale. Resist adding a breakpoint here: the
 * common bug in this repo is a flat value that should ramp, but the inverse
 * mistake is just as wrong, and the frames are unambiguous.
 *
 * The code is TOP-aligned, not centred. This was read as a 16-line block
 * centred in Consulting's body, 43 above and below, which put every sample
 * 17px under the drawn line. The frames start all four at 75 from the top and
 * set the card's foot by hand: 484 for 15 lines and for AI's 16, and 520 for
 * Consulting's 16, whose foot meets its seventh row's rule at 1920. So 484 is
 * the floor and the content passes Consulting's 520.
 *
 * `#FDFDFD` is 1-2 off the cloud token. It only ever appears inside this one
 * mock, so it stays local rather than becoming a ninth colour token. Same for
 * the `#232323` gutter, which the theme already carries as --color-code-gutter.
 *
 * Still a <pre>, not a syntax highlighter. The frame DOES colour the code — an
 * earlier pass read only each text node's base fill and missed the
 * per-character overrides — but by hand, and not consistently: "return" is red
 * in two samples and plain in Enterprise, "const" orange there and red
 * elsewhere, "=" red only sometimes. A tokeniser would redraw it. So the runs
 * are transcribed from the .fig's characterStyleIDs and styleOverrideTable as
 * [[r:…]] marks in content/capabilities-index.ts, and rendered here as drawn.
 * Consulting's base fill is #6B6B6B, but every character except two braces
 * overrides it, so it reads like the other three. Shiki is already in the
 * stack for real code blocks if this ever needs to become one.
 */

/** The marks' colours, as the frame draws them. Local to this mock. */
const RUN: Record<string, string> = {
  r: 'text-[#EF4444]',
  p: 'text-[#8B5CF6]',
  g: 'text-[#22C55E]',
  o: 'text-[#E85341]',
  m: 'text-ink-muted',
}

/** "[[r:const]] [[p:x]] = 1" -> the plain text, with each marked run coloured. */
function runs(line: string) {
  return line.split(/(\[\[[a-z]:.*?\]\])/).map((part, i) => {
    const m = /^\[\[([a-z]):(.*)\]\]$/.exec(part)
    return m ? (
      <span key={i} className={RUN[m[1]]}>
        {m[2]}
      </span>
    ) : (
      part
    )
  })
}

export function CodeCard({
  title,
  code,
  minHeight = 484,
  className = '',
}: {
  title: string
  /** The sample with its coloured runs marked; see `runs`. */
  code: string
  /** The drawn height when it exceeds the 484 floor (Consulting's 520). */
  minHeight?: number
  className?: string
}) {
  const lines = code.split('\n')

  return (
    <div
      aria-hidden="true"
      className={`flex w-[502px] max-w-full shrink-0 flex-col overflow-hidden rounded-[25px] bg-code-bg ${className}`}
      style={{ minHeight }}
    >
      {/* Title bar. The dots are decorative chrome, not controls. */}
      <div className="relative flex h-[49px] items-center border-b-[1.5px] border-ink-muted">
        <span className="absolute left-5 flex gap-[5px]">
          <span className="block size-[11px] rounded-full bg-dot-red" />
          <span className="block size-[11px] rounded-full bg-dot-amber" />
          <span className="block size-[11px] rounded-full bg-dot-green" />
        </span>
        <span className="w-full text-center font-sans text-base text-ink-muted">{title}</span>
      </div>

      {/* flex-1 so the gutter runs to the card's foot when the sample is
          shorter than the 484 leaves room for. */}
      <div className="flex flex-1">
        {/* Gutter. Line numbers are generated from the sample rather than
            written out, so the two can never drift apart. */}
        <ol
          className="w-[53px] shrink-0 bg-code-gutter pb-[25px] pt-[26px] text-center font-sans text-sm text-ink-muted"
          style={{ lineHeight: '24px' }}
        >
          {lines.map((_, i) => (
            <li key={i}>{i + 1}</li>
          ))}
        </ol>

        <pre
          className="overflow-x-auto pb-[25px] pl-[13px] pt-[26px] font-sans text-sm text-[#FDFDFD]"
          style={{ lineHeight: '24px' }}
        >
          {lines.map((line, i) => (
            <span key={i}>
              {runs(line)}
              {i < lines.length - 1 && '\n'}
            </span>
          ))}
        </pre>
      </div>
    </div>
  )
}
