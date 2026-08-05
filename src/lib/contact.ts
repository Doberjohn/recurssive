import { z } from 'zod'
import { site, siteUrl } from './site'

/**
 * Contact form: what counts as valid, and what the enquiry email looks like.
 *
 * Kept out of the route handler so both halves can be reasoned about — and
 * tested — without standing up a request.
 *
 * The option lists are the server-side allow-list, not decoration. A radio group
 * is trivially forged, so `interest` and `budget` are checked against these
 * rather than accepted as free text.
 */

export const INTERESTS = [
  'Web Development',
  'Mobile App',
  'UI/UX Design',
  'Startup',
  'Other',
] as const

export const BUDGETS = ['<10K', '10-20K', '20-50K', '50-100K', '>100K', 'Not sure'] as const

/** Where enquiries land. */
export const INBOX = site.email

/**
 * Every message a failed field can produce, in one place.
 *
 * The form renders these inline and the schema rejects with them, so the two
 * halves cannot drift apart — and the wording can be rewritten here without
 * touching a component.
 *
 * `missing` is the empty case. `invalid` is present only where a field has a
 * second, reachable failure: something typed that is still wrong. It is exactly
 * one mode per field, which is what lets the form pick between them in CSS —
 * `maxLength` caps input rather than rejecting it, so it never fails.
 *
 * The chip groups and the consent box have one mode each: nothing chosen.
 */
export const MESSAGES = {
  name: {
    missing: 'Please give your name.',
    invalid: 'That looks too short.',
  },
  email: {
    missing: 'Please give your email address.',
    invalid: 'That email address does not look right.',
  },
  tel: {
    missing: 'Please give a phone number.',
    invalid: 'That number looks too short.',
  },
  description: {
    missing: 'Please tell us a little about the project.',
    invalid: 'A sentence or two would help.',
  },
  interest: { missing: 'Please choose what you are interested in.' },
  budget: { missing: 'Please choose a budget range.' },
  terms: { missing: 'Please accept the terms and conditions.' },
} as const

const trimmed = (max: number) => z.string().trim().max(max)

export const contactSchema = z.object({
  name: trimmed(100).min(2, MESSAGES.name.missing),

  // max 254 is the RFC 5321 limit on a whole address. Zod's email check is
  // deliberately permissive; the only real test of an address is sending to it,
  // and over-strict patterns reject valid addresses (apostrophes, new TLDs).
  email: trimmed(254).pipe(z.email(MESSAGES.email.invalid)),

  // Required, as drawn. Briefly made optional and reverted on the owner's
  // instruction — settled, do not raise it again. The argument for optional was
  // GDPR Art. 5(1)(c) data minimisation, since an email address already suffices
  // to reply; the owner's call is that a phone number is worth asking for.
  tel: trimmed(40).min(6, MESSAGES.tel.missing),

  description: trimmed(4000).min(10, MESSAGES.description.missing),

  interest: z.enum(INTERESTS, { message: MESSAGES.interest.missing }),
  budget: z.enum(BUDGETS, { message: MESSAGES.budget.missing }),

  // An unticked checkbox is absent from the payload entirely, so presence IS
  // the consent. Never defaulted — a pre-ticked box is not consent under
  // Art. 4(11) / Recital 32.
  terms: z.literal('on', { message: MESSAGES.terms.missing }),

  // Honeypot. Deliberately permissive — the route decides what to do with it.
  // Rejecting it here instead would send the bot to the failure page, which
  // tells it something was wrong; the route quietly thanks it and drops it.
  company: z.string().optional(),
})

export type ContactInput = z.infer<typeof contactSchema>

/**
 * Athens time, since that is where anyone reading the email is.
 *
 * Explicit components, not dateStyle/timeStyle: those cannot be combined with
 * timeZoneName and throw `Invalid option` at runtime if you try.
 */
function stamp(at: Date) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Athens',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZoneName: 'short',
  }).format(at)
}

/**
 * The email. Plain text on purpose: this is an internal notification, it renders
 * identically everywhere, and it cannot carry a tracking pixel or a broken
 * layout. The subject carries name, interest and budget so a full inbox is
 * readable without opening anything.
 */
export function renderEnquiry(data: ContactInput, at = new Date()) {
  const rows: [string, string][] = [
    ['Name', data.name],
    ['Email', data.email],
    ['Phone', data.tel],
    ['Interest', data.interest],
    ['Budget', data.budget],
    ['Consent', `Accepted ${stamp(at)}`],
  ]
  const pad = Math.max(...rows.map(([k]) => k.length)) + 3

  const text = [
    ...rows.map(([k, v]) => k.padEnd(pad) + v),
    '',
    'Description',
    '-'.repeat(11),
    data.description,
    '',
    `Sent from ${siteUrl.replace(/^https?:\/\//, '')}/contact`,
  ].join('\n')

  return {
    subject: `New enquiry: ${data.name}, ${data.interest}, ${data.budget}`,
    text,
    // So a reply goes to the person who wrote in, not into the void. This is the
    // single most useful line in the whole file.
    replyTo: data.email,
  }
}
