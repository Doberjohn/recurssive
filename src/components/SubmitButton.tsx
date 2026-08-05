'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from './ui/Button'

/**
 * The contact form's submit button, with a sending state.
 *
 * This is the only JavaScript the form ships, and it is here for a measured
 * reason: a valid submission spends ~394ms server-side on the Resend call before
 * the 303 is even issued, plus the visitor's own network on top. Until this,
 * nothing on the page acknowledged the click for the best part of a second — and
 * a second click sent a second email, because a native form POST has no
 * double-submit protection.
 *
 * Deliberately not a spinner: nothing in the 31 frames draws one, and swapping
 * the label says the same thing in the site's own voice.
 *
 * Everything else about the form stays server-rendered. Only this button is a
 * Client Component, so the form still works with scripting off — it just submits
 * without the label change, which is the correct degradation.
 */
export function SubmitButton({
  label,
  sendingLabel = 'Sending…',
}: {
  label: string
  sendingLabel?: string
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    const form = ref.current?.form
    if (!form) return

    // `submit` fires only after the browser's own constraint validation passes,
    // so an invalid form never reaches here and the button is never left
    // disabled behind a validation bubble. Listening for `click` instead would
    // have that bug.
    const onSubmit = () => setSending(true)

    // Back-navigation restores the page from bfcache with the JS heap intact,
    // so `sending` would still be true and the button stuck disabled on a form
    // the visitor can see and wants to reuse. `persisted` is what distinguishes
    // a bfcache restore from a fresh load.
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) setSending(false)
    }

    form.addEventListener('submit', onSubmit)
    window.addEventListener('pageshow', onPageShow)
    return () => {
      form.removeEventListener('submit', onSubmit)
      window.removeEventListener('pageshow', onPageShow)
    }
  }, [])

  return (
    <Button
      ref={ref}
      type="submit"
      // No arrow: the drawn button is 202 wide and its padding plus label
      // account for all of it (16 + 170 + 16). Arrows are the nav CTA's.
      disabled={sending}
      aria-busy={sending}
      // Set here rather than in Button's base: a disabled button is not always a
      // busy one, and `progress` would be wrong on the others.
      className="disabled:cursor-progress"
    >
      {sending ? sendingLabel : label}
    </Button>
  )
}
