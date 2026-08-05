import { Resend } from 'resend'
import { contactSchema, renderEnquiry, INBOX } from '@/lib/contact'

/**
 * Contact form endpoint.
 *
 * A plain form POST with a 303 redirect, not fetch(). That is why the form costs
 * 0 KB of client JavaScript, works with scripting disabled, and cannot be
 * double-submitted by a refresh — the browser lands on a GET afterwards.
 *
 * This is the only server function in the deployment. Every page stays
 * prerendered; `npm run verify` asserts that, and its check now allows /api
 * specifically so a route handler does not read as a page going dynamic.
 *
 * Setup this needs before it can send anything:
 *   1. A Resend account with recurssive.com verified (their SPF + DKIM records).
 *   2. RESEND_API_KEY in Vercel's environment, and .env.local for development.
 *   3. FROM_EMAIL if the sender should be anything other than the default below.
 *
 * Without the key it fails closed: it logs, redirects to /contact/problem, and
 * never pretends the message was sent.
 */

// The From address must be on a domain verified with Resend. It is NOT the
// enquirer's address — sending as them would fail SPF/DKIM and land in spam.
// Their address goes in Reply-To instead.
const FROM = process.env.FROM_EMAIL ?? 'Recurssive site <noreply@recurssive.com>'

/** 303 so the browser re-issues as GET and a refresh cannot resubmit. */
function seeOther(path: string, request: Request) {
  return Response.redirect(new URL(path, request.url), 303)
}

export async function POST(request: Request) {
  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return seeOther('/contact/problem', request)
  }

  const parsed = contactSchema.safeParse(Object.fromEntries(form))

  if (!parsed.success) {
    // Reachable only by a crafted request: the browser's own constraint
    // validation stops a real person before submit, with or without JS.
    console.warn('[contact] rejected:', parsed.error.issues.map((i) => i.path.join('.')).join(', '))
    return seeOther('/contact/problem', request)
  }

  // Honeypot. Thank the bot and drop it, rather than send it to the failure
  // page — a failure tells it something was wrong and is worth retrying.
  if (parsed.data.company?.trim()) {
    console.info('[contact] honeypot tripped, discarded')
    return seeOther('/contact/thanks', request)
  }

  const { subject, text, replyTo } = renderEnquiry(parsed.data)

  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.error('[contact] RESEND_API_KEY is not set, enquiry NOT delivered')
    // Outside production, print what would have gone out. Makes the whole flow
    // testable before the Resend account exists, and shows the exact wording of
    // the email without sending one. Never in production: this is personal data.
    if (process.env.NODE_ENV !== 'production') {
      console.info(
        `\n[contact] would send to ${INBOX}\n` +
          `Subject: ${subject}\nReply-To: ${replyTo}\n\n${text}\n`
      )
    }
    return seeOther('/contact/problem', request)
  }

  try {
    const { error } = await new Resend(key).emails.send({
      from: FROM,
      to: INBOX,
      replyTo,
      subject,
      text,
    })
    if (error) {
      console.error('[contact] Resend rejected the send:', error)
      return seeOther('/contact/problem', request)
    }
  } catch (err) {
    console.error('[contact] send threw:', err)
    return seeOther('/contact/problem', request)
  }

  return seeOther('/contact/thanks', request)
}

/** Anything but POST here is a mistake or a probe; send it to the form. */
export async function GET(request: Request) {
  return seeOther('/contact', request)
}
