import { site } from '@/lib/site'

/**
 * The dark card beside the contact form.
 *
 * Measured from `Contact details.svg` and both Contact frames:
 *
 *              1920            768
 *   card       648x683 r46     610x683 r46
 *   padding    85              66          -> content 478 at BOTH, the invariant
 *   heading    32px            36px        Inter Bold, #FAFAFA
 *   body       16px            24px        Open Sans, 2 lines / 3 lines
 *   label      14px            20px        Open Sans, above its value
 *   value      32px            32px        Inter Bold, #FAFAFA
 *   row pitch  109             92
 *
 * The 38px width difference is not an error: the padding absorbs it and the
 * content column is 478 either way, which is why the type pairs map cleanly onto
 * the existing `.t-item` / `.t-form` / `.t-index` scales.
 *
 * Labels sit ABOVE their values, not below.
 *
 * Two things taken from the 768 frame rather than 1920, both for contrast:
 * 1920 draws the labels #6B6B6B, which measures 1.05:1 to 2.14:1 against this
 * card's actual backdrop — it fails AA everywhere on it. 768 draws them #A59BFF.
 * The body keeps #FAFAFA (1920) as the primary reading colour.
 *
 * The values are the one string long enough to overflow: the drawn
 * `john@recurssive.com` measured 344px of ink in a 478 column, and the addresses
 * actually shipped are longer still. They fit at the drawn widths but not once
 * the card narrows between breakpoints, so they are sized in cqi against the
 * content box and capped at the drawn 32px — they shrink rather than escape.
 */

const rows = [
  { label: '(general)', value: site.email, href: `mailto:${site.email}` },
  { label: '(support)', value: site.supportEmail, href: `mailto:${site.supportEmail}` },
  { label: '(social)', value: '@recurssive', href: null },
  { label: '(phone)', value: site.phone, href: `tel:${site.phone.replace(/\s/g, '')}` },
]

export function ContactDetails({ className = '' }: { className?: string }) {
  return (
    // overflow-hidden is load-bearing: .mesh::after carries no border-radius, so
    // without it the grain paints square over the 46px corners. No other .mesh
    // consumer is rounded, so this had never been exercised.
    // Height is fixed only from 768 up, where the drawn 683 applies. Below it the
    // card must be content-driven: overflow-hidden turns any shortfall into
    // silently deleted contact details, which is exactly what happened at 375.
    <div
      className={`mesh contact-card relative overflow-hidden rounded-[46px] bg-ink md:h-[683px] ${className}`}
    >
      {/* Padding is a percentage of the card below 768, so it shrinks with it —
          66/610 = 10.8%, 71/610 = 11.6%, 92/610 = 15.1%. Percentage padding
          resolves against the inline size on all four sides, so the vertical
          ones track too. At 768 these land on the drawn pixels exactly, and
          md:/lg: pin them from there.
          pt 71, not 65: the heading is drawn at y324 against a card top of 253. */}
      <div className="relative z-10 flex h-full flex-col px-[10.8%] pb-[15.1%] pt-[11.6%] [container-type:inline-size] md:px-[66px] md:pb-[92px] md:pt-[71px] lg:px-[85px] lg:pb-[98px] lg:pt-[70px]">
        <h2 className="cc-heading font-heading font-bold tracking-normal text-cloud">
          We want to hear from you
        </h2>

        <p className="cc-body mt-3 text-cloud">
          Tell us what you’re building, even if it’s still rough. We read all messages and come back within two working days.
        </p>

        {/* mt-auto rather than a fixed gap: the block is pinned to the bottom of
            a fixed-height card, which is what reproduces both row pitches (109
            at 1920, 92 at 768) without a gap value that suits neither. */}
        {/* mt-auto only once the card has a fixed height to distribute. Below
            768 there is no free space to push against, so it needs a real gap. */}
        <ul className="mt-10 space-y-[36px] md:mt-auto lg:space-y-[60px]">
          {rows.map((r) => (
            <li key={r.label}>
              <span className="cc-label block text-accent">{r.label}</span>
              <span className="cc-value block font-heading font-bold leading-none text-cloud">
                {r.href ? (
                  <a href={r.href} className="hover:underline">
                    {r.value}
                  </a>
                ) : (
                  r.value
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
