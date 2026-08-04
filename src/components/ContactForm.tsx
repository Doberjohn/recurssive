import { Button } from './ui/Button'

/**
 * Contact form — the block at x975 on Home, repeated on /contact.
 *
 * Fields are underline-only in the designs: label above (16px, #0F0F0F) with a
 * rule beneath, and small right-aligned state labels — "(active)" in #4813D0,
 * "(error)" in #CC0000. Those are drawn as static annotations; here they are
 * real :focus and :invalid states.
 *
 * Uncontrolled inputs with native constraint validation, validated on blur and
 * submit rather than per keystroke. Per-keystroke validation across six
 * controlled fields is a textbook INP failure, and none of it is needed: the
 * platform already does this.
 *
 * Two corrections to the drawn version:
 *   - The consent checkbox ships pre-ticked. Pre-ticked consent is not consent
 *     under GDPR, so it renders unchecked.
 *   - The budget ladder reads <10K / 10-20K / 50-100K / >100K / Not sure —
 *     a 30K project has nothing to select. 20-50K added.
 */

const interests = [
  'Web Development',
  'Mobile App',
  'UI/UX Design',
  'Startup',
  'Other',
]

const budgets = ['<10K', '10-20K', '20-50K', '50-100K', '>100K', 'Not sure']

function Field({
  label,
  name,
  type = 'text',
  required = true,
  textarea = false,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  textarea?: boolean
}) {
  const shared =
    'peer w-full border-0 border-b border-border bg-transparent pb-2 pt-1 text-base text-ink ' +
    'outline-none transition-colors placeholder:text-ink-muted ' +
    'focus:border-primary ' +
    // :invalid only bites once the field has been interacted with, so the form
    // does not open covered in red.
    'user-invalid:border-error'

  return (
    <div className="relative">
      <label htmlFor={name} className="block text-base text-ink">
        {required && <span aria-hidden="true">*</span>}
        {label}
      </label>
      {textarea ? (
        <textarea id={name} name={name} rows={3} required={required} className={`${shared} resize-none`} />
      ) : (
        <input id={name} name={name} type={type} required={required} className={shared} />
      )}
      {/* The "(active)" / "(error)" annotations from the designs, wired to real
          state rather than drawn in place. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 text-base text-primary opacity-0 peer-focus:opacity-100"
      >
        (active)
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 text-base text-error opacity-0 peer-user-invalid:peer-not-focus:opacity-100"
      >
        (error)
      </span>
    </div>
  )
}

function ChipGroup({
  legend,
  name,
  options,
  muted = false,
}: {
  legend: string
  name: string
  options: string[]
  muted?: boolean
}) {
  return (
    <fieldset>
      <legend className={`text-base ${muted ? 'text-storm' : 'text-ink'}`}>
        <span aria-hidden="true">*</span>
        {legend}
      </legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <label
            key={o}
            className="cursor-pointer rounded-xl border border-border px-4 py-1.5 text-base text-ink transition-colors has-[:checked]:rounded-md has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-cloud has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent"
          >
            <input type="radio" name={name} value={o} className="sr-only" />
            {o}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export function ContactForm() {
  return (
    <form className="space-y-8" action="/api/contact" method="post">
      <Field label="Name" name="name" />
      <Field label="E-mail" name="email" type="email" />
      <Field label="Telephone" name="tel" type="tel" />
      <Field label="Description" name="description" textarea />

      <ChipGroup legend="Interested in" name="interest" options={interests} />
      <ChipGroup legend="Project budget" name="budget" options={budgets} muted />

      <label className="flex items-start gap-3 text-sm text-ink">
        {/* Unchecked by default — see the note at the top of this file. */}
        <input
          type="checkbox"
          name="terms"
          required
          className="mt-0.5 h-6 w-6 shrink-0 accent-primary"
        />
        <span>
          I&rsquo;ve read and accepted the{' '}
          <a href="/terms-of-service" className="underline underline-offset-2">
            terms and conditions
          </a>
        </span>
      </label>

      <Button type="submit" arrow>
        Send Message
      </Button>
    </form>
  )
}
