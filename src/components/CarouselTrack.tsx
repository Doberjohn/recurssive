'use client'

/**
 * The Industries carousel's scroll track.
 *
 * The track itself is plain CSS — a scroll-snap row — so a swipe works with no
 * JavaScript at all, which is the interaction that matters on the frame this is
 * drawn for. The arrows are real anchors to the neighbouring slides, so they
 * work with scripting off too.
 *
 * This component exists for one reason: fragment navigation aligns the target's
 * TOP to the viewport, and a slide is taller than a phone viewport, so every
 * press dragged the page down as well as moving the track. Measured at 375x667:
 * 103px of vertical jump per press.
 *
 * `scrollIntoView({block: 'nearest'})` does NOT fix that, which is worth knowing
 * before someone simplifies this back to it — "nearest" only means "do nothing"
 * when the element is already FULLY visible, and a 700px slide in a 667px
 * viewport never is, so it still aligns an edge and still moves the page.
 * Scrolling the track itself is the only version that cannot touch the page.
 *
 * One delegated listener, no state, no effect. It also keeps `#industry-N` out
 * of the address bar, which fragment navigation would otherwise push onto the
 * history stack once per press.
 *
 * Progressive enhancement on purpose: if this never hydrates, the anchors still
 * navigate — with the jump, but not broken.
 */
export function CarouselTrack({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <ul
      className={className}
      onClick={(e) => {
        const a = (e.target as HTMLElement).closest?.('a[href^="#industry-"]')
        if (!a) return
        const el = document.getElementById(a.getAttribute('href')!.slice(1))
        const track = e.currentTarget
        const first = track.firstElementChild
        if (!(el instanceof HTMLElement) || !(first instanceof HTMLElement)) return
        e.preventDefault()
        // offsetLeft is measured from the section, not the track, so the first
        // slide's own offset is the zero point.
        track.scrollTo({ left: el.offsetLeft - first.offsetLeft, behavior: 'smooth' })
      }}
    >
      {children}
    </ul>
  )
}
