/**
 * FAQ accordion — Frame 4 / Frame 49: 686x48, r14, #EAEAEA, question in
 * Open Sans SemiBold 18px, and a "+" that becomes "−" when open (#360D9D).
 *
 * Native <details>/<summary>. No JavaScript, and — more importantly — the
 * answers stay in the served HTML whether open or closed. A JS accordion that
 * mounts answers on click hides them from crawlers entirely, and Google is
 * explicit that its crawlers do not click things.
 *
 * Deliberately no FAQPage structured data: Google removed FAQ rich results
 * from Search on 7 May 2026, so the markup would earn nothing.
 */
export function Faq({
  items,
  defaultOpen,
}: {
  items: { question: string; answer: string }[]
  /** Index to ship expanded. The designs draw the first row open. */
  defaultOpen?: number
}) {
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <details
          key={item.question}
          open={i === defaultOpen}
          className="group rounded-3xl bg-surface px-6 open:pb-5"
        >
          <summary
            className="t-question flex cursor-pointer list-none items-center justify-between gap-6 py-3 text-ink [&::-webkit-details-marker]:hidden"
            // 48px drawn height; py-3 on an 18px line gives ~44px, and the
            // whole row is the target rather than just the glyph.
          >
            <span className="font-semibold">{item.question}</span>
            <span
              aria-hidden="true"
              className="relative h-4 w-4 shrink-0 text-primary-deep"
            >
              {/* Horizontal bar stays; vertical bar collapses when open. */}
              <span className="absolute left-0 top-1/2 h-[2px] w-4 -translate-y-1/2 bg-current" />
              <span className="absolute left-1/2 top-0 h-4 w-[2px] -translate-x-1/2 bg-current transition-transform duration-200 group-open:scale-y-0" />
            </span>
          </summary>
          <p className="t-body pr-10 text-ink-muted-on-surface">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
