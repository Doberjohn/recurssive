import Link from 'next/link'
import { Nav } from './Nav'
import { Footer } from './Footer'
import { BinaryMark } from './ui/BinaryMark'

/**
 * A whole page that says one thing and offers one way out.
 *
 * Named for what it is rather than what it was: this began as the error states,
 * but it now also carries `/contact/thanks`, which is a success. "Notice" covers
 * a 404, a failure, a confirmation and an empty list without lying about any of
 * them — and avoids "message", which already means something specific here (Send
 * Message, Message sent, the enquiry email).
 *
 * The design draws three frames — 404, 500 and "No Content" — that are the same
 * layout with different copy, so this is one component. Measured from the six
 * exports and the decoded frames (`404`/`500`/`No Content` at 1920, and the
 * frames Figma still labels `501`/`502` at 768, whose contents are 404 and 500):
 *
 *              1920x1533                 768x1376
 *   artwork    764x497  @578,209         534x348  @117,276
 *   headline   72px     @381             52px     @356
 *   body       20px     @478             24px     @430
 *   link       18px     @519             24px     @513
 *   footer     685 tall @848             560 tall @816
 *
 * Both artworks are 1.537 aspect — the same mark as Contact's at 0.794 scale —
 * so BinaryMark is shared rather than re-cut. Ground is Cloud White, headline
 * Phantom Black, body the #6B6B6B muted token (5.11:1, AA).
 *
 * Two deliberate departures:
 *
 * 1. The text stack is CENTRED on the artwork rather than pinned to the drawn
 *    offsets. The frames place it at 34.6% down the artwork at 1920 but 23.0% at
 *    768, because the body wraps to two lines there; centring reproduces both to
 *    within 15px and survives copy the owner has not written yet.
 * 2. Tracking is -0.05em, not -5px. Figma reports `letterSpacing {value: -5,
 *    units: PERCENT}` — checked in the source rather than inferred, because at
 *    72px the two readings differ by 1.4px per pair.
 *
 * The link is drawn as plain centred text with no rule, box or arrow, unlike
 * every other CTA on the site. Kept as drawn on the owner's instruction; hover
 * and focus affordances are added because a static export cannot draw them and
 * this is the only control on the page.
 */

/** 534 at 768 and 764 at 1920, ramped; never wider than its container. */
const ARTWORK = 'min(764px, calc(380.7px + 19.97vw), 100%)'

export function NoticeBlock({
  heading,
  description,
  actionLabel = 'Go back to home',
  actionHref = '/',
  /** `h1` on a route of its own; `p` when this sits inside a page that has one. */
  as: Heading = 'h1',
}: {
  heading: string
  /**
   * ReactNode, not string: /contact/problem has to offer a mailto that does not
   * depend on the form working, and a plain-text address on a failure page is a
   * worse page. Every other caller passes a string, which is a ReactNode.
   */
  description: React.ReactNode
  actionLabel?: string
  actionHref?: string
  as?: 'h1' | 'h2' | 'p'
}) {
  return (
    // A grid stack rather than absolute positioning: the text keeps its own
    // height, so longer copy pushes the block taller instead of escaping the
    // artwork's box.
    <div className="mx-auto grid place-items-center" style={{ width: ARTWORK }}>
      <div className="col-start-1 row-start-1 w-full [container-type:inline-size]">
        <BinaryMark className="error-binary" />
      </div>

      {/* `relative z-10` is load-bearing, not decoration. The binary field is
          `position: absolute` inside its cell, and positioned elements paint
          above in-flow static ones whatever the DOM order — so without this the
          glyphs sit ON TOP of the headline. Being later in the source is not
          enough; the text has to be positioned too before z-index applies. */}
      <div className="relative z-10 col-start-1 row-start-1 flex w-full flex-col items-center text-center">
        <Heading
          className="font-heading font-semibold leading-none tracking-[-0.05em] text-ink"
          style={{ fontSize: 'clamp(36px, 38.67px + 1.736vw, 72px)' }}
        >
          {heading}
        </Heading>

        {/* 441 of 764 at 1920 and 303 of 534 at 768 — 57.7% and 56.7%, so a
            percentage of the artwork reproduces both, including the wrap to two
            lines at 768 that a `ch` cap cannot (one value cannot be 40ch at 20px
            and 23ch at 24px). The 22ch floor stops it collapsing to a column on
            phones, where the artwork is capped by the container instead.
            59, not 58: this line measures 441.45px against a drawn box of 441,
            so the frame fits it by half a pixel and any rounding — a scrollbar
            taking 15px off the viewport, say — tips it onto a second line. The
            extra ~1% is invisible on centred text and buys the slack. */}
        <p
          className="mt-2.5 max-w-[max(59%,22ch)] leading-normal text-ink-muted"
          style={{ fontSize: 'clamp(20px, 26.67px - 0.347vw, 24px)' }}
        >
          {description}
        </p>

        <Link
          href={actionHref}
          className="mt-3 rounded-sm text-ink underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          style={{ fontSize: 'clamp(18px, 28px - 0.521vw, 24px)' }}
        >
          {actionLabel}
        </Link>
      </div>
    </div>
  )
}

/**
 * The full-page form of the above, for not-found.tsx and error.tsx.
 *
 * Padding reproduces the drawn positions: the artwork's top edge lands at 209 at
 * 1920 and 276 at 768, and the footer follows 142 / 192 below it. Both ramp
 * linearly rather than stepping at a breakpoint, so the block never lands on a
 * value neither frame specifies.
 *
 * padding-top is measured from the top of the DOCUMENT, not from the bottom of
 * the nav. Nav is `position: absolute`, so it is out of flow and main begins at
 * y=0; sizing this as a gap below the nav put the whole page 77px high.
 *
 * No `justify-center`: main is `flex-1` and grows on a tall viewport, which
 * would re-centre the block and discard the measured positions above. Content
 * stays at the top and the growth goes below it, which is also what keeps the
 * footer off the fold on a short page.
 */
export function NoticePage(props: Parameters<typeof NoticeBlock>[0]) {
  return (
    <>
      {/* Dark links: like Contact, this page opens on the pale ground rather
          than a photograph. */}
      <Nav tone="dark" />

      <main
        className="flex flex-1 flex-col"
        style={{
          paddingTop: 'clamp(209px, 320.67px - 5.816vw, 340px)',
          paddingBottom: 'clamp(142px, 225.3px - 4.34vw, 200px)',
        }}
      >
        <div className="container-content">
          <NoticeBlock {...props} />
        </div>
      </main>

      <Footer />
    </>
  )
}
