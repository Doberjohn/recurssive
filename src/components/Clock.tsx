'use client'

import { useEffect, useState } from 'react'

/**
 * The footer clock — the two bottom lines of the "Where" column.
 *
 * The file draws this as a hardcoded `22:52:19` / `(Utc+3)` on all 31 frames.
 * It was previously dropped entirely on the grounds that a frozen timestamp
 * reads as broken and a live one "would force the page dynamic". The first half
 * was right; the second was wrong, and it is why the line went missing rather
 * than getting built. A client-rendered clock costs the page nothing: `/` stays
 * fully prerendered, the server emits a placeholder, and the time appears on
 * hydration.
 *
 * Europe/Athens rather than a fixed +3, so it follows EEST/EET without carrying
 * a DST table. The offset label is derived from the same zone for the same
 * reason — the drawn `(Utc+3)` is only true from late March to late October;
 * the rest of the year Greece is on UTC+2, and with a live clock sitting
 * directly above it that contradiction would be on screen and checkable.
 *
 * `--:--:--` is the pre-hydration and no-JS state. It reads as "not available"
 * rather than asserting a wrong time, and the column is sized by
 * "Thessaloniki" (92px against the clock's ~62px), so the swap shifts nothing.
 */

const TIME = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Athens',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
})

/** Intl gives "GMT+3"; the designs and the rest of the site say UTC. */
function offsetLabel(at: Date) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Athens',
    timeZoneName: 'shortOffset',
  }).formatToParts(at)
  const zone = parts.find((p) => p.type === 'timeZoneName')?.value
  return zone ? zone.replace('GMT', 'UTC') : 'UTC+3'
}

export function Clock() {
  // null until mounted, so the first client render matches the server exactly
  // and there is no hydration mismatch to suppress.
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    let id: number

    const tick = () => {
      setNow(new Date())
      // Re-align on every tick rather than using setInterval: the clock never
      // drifts off the second boundary, and it catches up in one step after a
      // background tab has had its timers throttled.
      id = window.setTimeout(tick, 1000 - (Date.now() % 1000))
    }
    tick()

    // Returning to a throttled tab should not show a stale time for up to a
    // minute while the pending timeout runs down.
    const onVisibility = () => {
      if (!document.hidden) {
        window.clearTimeout(id)
        tick()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      window.clearTimeout(id)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <>
      {/* tabular-nums so the digits do not jitter as they change. */}
      <li className="tabular-nums">
        {now ? (
          <time dateTime={now.toISOString()}>{TIME.format(now)}</time>
        ) : (
          '--:--:--'
        )}
      </li>
      <li>({now ? offsetLabel(now) : 'UTC+3'})</li>
    </>
  )
}
