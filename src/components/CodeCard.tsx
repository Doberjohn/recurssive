/**
 * The code-editor mock beside each Capabilities pillar.
 *
 * Measured, and unusually for this codebase the numbers are IDENTICAL at both
 * breakpoints — only the card's position on the page changes (beside the rows at
 * 1920, centred below them at 768):
 *
 *   card        502 x 484   #0F0F0F   r25   (Consulting is 520, one more line)
 *   title bar   divider 1.5px #6B6B6B at y49
 *   dots        11x11 at x20 / x36 / x51, y19
 *   gutter      53 wide, #232323, bottom-left radius only
 *   body region 471 tall holding a 384-tall 16-line block — i.e. 24px leading
 *               with ~43px padding top and bottom, and 49 + 471 = 520
 *   line nums   14px #6B6B6B
 *   code        14px, #6B6B6B on Consulting, #FDFDFD on the other three
 *
 * So this deliberately does NOT scale. Resist adding a breakpoint here: the
 * common bug in this repo is a flat value that should ramp, but the inverse
 * mistake is just as wrong, and the frames are unambiguous.
 *
 * `#FDFDFD` is 1-2 off the cloud token. It only ever appears inside this one
 * mock, so it stays local rather than becoming a ninth colour token. Same for
 * the `#232323` gutter, which the theme already carries as --color-code-gutter.
 *
 * Rendered as a <pre>, not a syntax highlighter. The frame draws flat one-colour
 * code, so tokenising it would be inventing design. Shiki is already in the
 * stack for real code blocks if this ever needs to become one.
 */
export function CodeCard({
  title,
  code,
  muted,
  className = '',
}: {
  title: string
  code: string
  muted: boolean
  className?: string
}) {
  const lines = code.split('\n')

  return (
    <div
      aria-hidden="true"
      className={`w-[502px] max-w-full shrink-0 overflow-hidden rounded-[25px] bg-code-bg ${className}`}
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

      <div className="flex">
        {/* Gutter. Line numbers are generated from the sample rather than
            written out, so the two can never drift apart. */}
        <ol
          className="w-[53px] shrink-0 bg-code-gutter py-[43px] text-center font-sans text-sm text-ink-muted"
          style={{ lineHeight: '24px' }}
        >
          {lines.map((_, i) => (
            <li key={i}>{i + 1}</li>
          ))}
        </ol>

        <pre
          className={`overflow-x-auto py-[43px] pl-[13px] font-sans text-sm ${
            muted ? 'text-ink-muted' : 'text-[#FDFDFD]'
          }`}
          style={{ lineHeight: '24px' }}
        >
          {code}
        </pre>
      </div>
    </div>
  )
}
