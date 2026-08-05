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
    <div
      className={`mesh contact-card relative h-[683px] overflow-hidden rounded-[46px] bg-ink ${className}`}
    >
      {/* pt 71, not 65: the heading is drawn at y324 against a card top of 253. */}
      <div className="relative z-10 flex h-full flex-col px-[66px] pb-[92px] pt-[71px] [container-type:inline-size] lg:px-[85px] lg:pb-[98px] lg:pt-[70px]">
        <h2 className="t-item font-heading font-bold tracking-normal text-cloud">
          We want to hear from you
        </h2>

        <p className="t-form mt-3 text-cloud">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna.
        </p>

        {/* mt-auto rather than a fixed gap: the block is pinned to the bottom of
            a fixed-height card, which is what reproduces both row pitches (109
            at 1920, 92 at 768) without a gap value that suits neither. */}
        <ul className="mt-auto space-y-[36px] lg:space-y-[60px]">
          {rows.map((r) => (
            <li key={r.label}>
              <span className="t-index block text-accent">{r.label}</span>
              <span className="block font-heading font-bold leading-none text-cloud [font-size:min(2rem,6.694cqi)]">
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
