/**
 * The header every index page opens with: a title, and an intro paragraph that
 * sits BESIDE it on the wide layout and BELOW it on the narrow one.
 *
 * Measured on all four index frames, which agree:
 *
 *              1920                              768
 *   title      48px @x163..168, y172             42px @x79, y174
 *   intro      16px, 467 wide, @x1291, y179..186 24px, 606 wide, @x79..83, y235
 *
 * The intro's right edge is 1291 + 467 = 1758, against a container edge of
 * 163 + 1594 = 1757. So it is right-flush to the container, not sitting at some
 * fixed gap from the title — which is why this is a two-column grid with the
 * second column shrink-wrapped, rather than a flex row with a gap.
 *
 * Cases draws its title at 52px where the other three draw 48. The four are one
 * pattern, the drawn 52 is a four-pixel outlier on one frame, and `.t-section`
 * is the 42/48 pair the rest of the site already uses — so all four get 48.
 *
 * The intro is `.t-body`, 24 at 768 as every one of these frames draws it. It
 * was 22 until the owner moved `.t-body` to the frames' 24 at -3% site-wide
 * (2026-10-22); one shared token still beats four pages forked a couple of
 * pixels apart, it just carries the drawn value now.
 *
 * Below lg the intro sits 13.5 under the title's box. The frames' y174 -> y235
 * is 61 TOP TO TOP, and it was applied as the gap after the title's box, which
 * put the intro 46px low. 13.5 lands its first baseline 47.5 under the title's,
 * as drawn (Figma sets the title in a taller auto line box, 51 against .t-section's 44).
 */
export function PageHeader({
  title,
  intro,
  children,
}: {
  title: string
  intro: string
  /** The filter row, for the pages that have one. Sits under the header. */
  children?: React.ReactNode
}) {
  return (
    <header className="pt-[clamp(88px,22.9vw,176px)] lg:pt-[172px]">
      <div className="container-content">
        <div className="lg:flex lg:items-start lg:justify-between lg:gap-16">
          <h1 className="t-section font-heading font-semibold text-ink">{title}</h1>
          <p className="t-body mt-[13.5px] text-ink-muted lg:mt-[7px] lg:max-w-[467px]">{intro}</p>
        </div>
        {children}
      </div>
    </header>
  )
}
