'use client'

import { useEffect, useRef } from 'react'

/**
 * The parallax wrapper for the "Let's build your vision" backdrop.
 *
 * Why this is JavaScript at all: pointer position is not exposed to CSS. There
 * is no selector or media feature for "where is the cursor", so a mouse-follow
 * effect cannot be done in a stylesheet. This is the smallest thing that does
 * it.
 *
 * What keeps it cheap:
 *
 * - It writes two CSS custom properties and nothing else. The transform lives in
 *   CSS, so the browser composites it: no layout, no paint, no style recalc of
 *   anything but this one element.
 * - The rect is cached on enter and on resize, never read in the move handler.
 *   Calling getBoundingClientRect() per pointermove forces synchronous layout
 *   and is the usual reason effects like this jank.
 * - Moves are coalesced into one rAF. pointermove can fire faster than the
 *   display refreshes, and doing the work per event is throwing frames away.
 * - It does not touch INP. INP measures click, tap and keypress; hover and
 *   pointer movement are excluded by definition.
 *
 * What it refuses to run for:
 *
 * - Coarse pointers. `(hover: hover) and (pointer: fine)` means a phone or a
 *   tablet attaches no listener at all, rather than attaching one that a touch
 *   device can never trigger.
 * - `prefers-reduced-motion: reduce`. Parallax tied to pointer movement is
 *   exactly the vestibular trigger that setting exists for, so this is a
 *   correctness requirement rather than a nicety.
 *
 * The children stay SERVER-rendered: they are passed in rather than imported, so
 * the photograph and its <picture> markup never enter the client bundle.
 */
export function VisionBackdrop({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    /**
     * Listen on the SECTION, not on this layer.
     *
     * The layer sits at -z-10, underneath the scrim and the copy, so it is never
     * the topmost element under the cursor and a real pointer event can never
     * reach it. Hit testing does not care that it fills the band.
     *
     * The custom properties are set on the host for the same reason: they
     * inherit, so `.vision-parallax > *` reads them from up the tree without the
     * layer needing to be the thing that receives events.
     */
    const host = el.parentElement ?? el

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)')

    let rect = host.getBoundingClientRect()
    let raf = 0
    let x = 0
    let y = 0

    const apply = () => {
      raf = 0
      host.style.setProperty('--px', x.toFixed(4))
      host.style.setProperty('--py', y.toFixed(4))
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply)
    }

    const onEnter = () => {
      rect = host.getBoundingClientRect()
    }
    const onMove = (e: PointerEvent) => {
      // -0.5 .. 0.5 from the centre, so the CSS decides the amplitude.
      x = (e.clientX - rect.left) / rect.width - 0.5
      y = (e.clientY - rect.top) / rect.height - 0.5
      schedule()
    }
    const onLeave = () => {
      x = 0
      y = 0
      schedule()
    }
    const onResize = () => {
      rect = host.getBoundingClientRect()
    }

    const attach = () => {
      host.addEventListener('pointerenter', onEnter)
      host.addEventListener('pointermove', onMove)
      host.addEventListener('pointerleave', onLeave)
      window.addEventListener('resize', onResize, { passive: true })
      return () => {
        host.removeEventListener('pointerenter', onEnter)
        host.removeEventListener('pointermove', onMove)
        host.removeEventListener('pointerleave', onLeave)
        window.removeEventListener('resize', onResize)
      }
    }

    /**
     * Re-evaluated on change rather than only at mount. Both of these can flip
     * during a session: someone docks a mouse to a tablet, or toggles Reduce
     * Motion in system settings. Deciding once on mount leaves the effect
     * permanently dead or permanently on for the rest of the page's life.
     */
    let detach: (() => void) | null = null
    const sync = () => {
      const wanted = fine.matches && !calm.matches
      if (wanted && !detach) {
        detach = attach()
      } else if (!wanted && detach) {
        detach()
        detach = null
        host.style.removeProperty('--px')
        host.style.removeProperty('--py')
      }
    }

    sync()
    fine.addEventListener('change', sync)
    calm.addEventListener('change', sync)

    return () => {
      fine.removeEventListener('change', sync)
      calm.removeEventListener('change', sync)
      detach?.()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={ref} className="vision-parallax absolute inset-0 -z-10">
      {children}
    </div>
  )
}
