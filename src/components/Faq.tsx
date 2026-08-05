/**
 * FAQ accordion.
 *
 * Measured off `Home.svg` rather than the node tree, which had the rows wrong
 * because their panels are vectors and the manifest excluded vectors:
 *
 *   panel      686.1 x 47.6, r11.3, #EAEAEA   (x616.9..1303.1)
 *   question   17.1px in, 18px, #0F0F0F
 *   icon       8.75px cross, 1.93px bars, #360D9D, centre 33px from the right
 *   row pitch  64.3px — a 16.7px gap
 *
 * The one that changes the markup: **the answer is not inside the panel.** The
 * open row's #EAEAEA panel stays 47.6px like every other; the answer sits below
 * it on the page ground in #6B6B6B. So the panel belongs to <summary>, not to
 * <details>. That also retires a workaround — #6B6B6B measures 4.43:1 on
 * #EAEAEA (which is why an on-surface override existed) but 5.10:1 on #FAFAFA,
 * so putting the answer where it is drawn passes AA on its own.
 *
 * No row ships expanded, on the owner's instruction: the frame draws row 2
 * open, but that is the file showing what an open row looks like rather than a
 * state the page should load in.
 *
 * Native <details>/<summary>. No JavaScript, and — more importantly — the
 * answers stay in the served HTML whether open or closed. A JS accordion that
 * mounts answers on click hides them from crawlers entirely, and Google is
 * explicit that its crawlers do not click things.
 *
 * Deliberately no FAQPage structured data: Google removed FAQ rich results
 * from Search on 7 May 2026, so the markup would earn nothing.
 */
export function Faq({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <details key={item.question} className="group">
          {/* min-h, not h: 48px is the drawn height at 1920, but the 768 frame
              sets questions at 26px, where they wrap and the panel must grow. */}
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 rounded-[11px] bg-surface px-[17px] py-2 text-ink [&::-webkit-details-marker]:hidden">
            <span className="t-question font-semibold">{item.question}</span>
            {/* 8.75px glyph centred in a 32px box: that puts its centre 33px
                from the panel edge, as drawn, while keeping a real target. */}
            <span
              aria-hidden="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center text-primary-deep"
            >
              <span className="relative block h-[9px] w-[9px]">
                {/* Horizontal bar stays; vertical bar collapses when open. */}
                <span className="absolute left-0 top-1/2 h-[2px] w-[9px] -translate-y-1/2 bg-current" />
                <span className="absolute left-1/2 top-0 h-[9px] w-[2px] -translate-x-1/2 bg-current transition-transform duration-200 group-open:scale-y-0" />
              </span>
            </span>
          </summary>
          {/* Outside the panel, aligned to the question, 23px below it. */}
          <p className="t-body px-[17px] pt-[23px] text-ink-muted">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  )
}
