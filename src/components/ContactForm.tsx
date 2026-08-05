import { SubmitButton } from './SubmitButton'
import { INTERESTS, BUDGETS, MESSAGES } from '@/lib/contact'

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

// Sourced from the schema, not re-typed: these doubles as the server-side
// allow-list, and a radio group is trivially forged.
const interests = INTERESTS
const budgets = BUDGETS

function Field({
  label,
  name,
  type = 'text',
  required = true,
  textarea = false,
  autoComplete,
  minLength,
  maxLength,
  pattern,
  title,
  messages,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  textarea?: boolean
  /** WCAG 1.3.5. Absent everywhere before this. */
  autoComplete?: string
  /** Matches the server schema so the browser catches it first. */
  minLength?: number
  /**
   * Also the server schema. The schema `.max()`es REJECT rather than truncate,
   * and a rejection redirects to /contact/problem, where everything typed is
   * gone — POST-redirect-GET keeps no state. Capping the input means a long
   * description cannot be lost, which is the enquiry you least want to lose.
   */
  maxLength?: number
  pattern?: string
  title?: string
  /** From MESSAGES in lib/contact — the same strings the server rejects with. */
  messages: { readonly missing: string; readonly invalid?: string }
}) {
  const shared =
    'peer w-full border-0 border-b border-border bg-transparent pb-2 pt-1 text-base text-ink ' +
    'outline-none transition-colors placeholder:text-ink-muted ' +
    'focus:border-primary ' +
    // :invalid only bites once the field has been interacted with, so the form
    // does not open covered in red.
    'user-invalid:border-error'

  // Only the visible message is in the accessibility tree — the other is
  // display:none — so naming both here exposes exactly one at a time.
  const describedBy = [`${name}-missing`, messages.invalid && `${name}-invalid`]
    .filter(Boolean)
    .join(' ')

  const msg = 'mt-2 hidden text-base text-error'

  return (
    <div className="relative">
      <label htmlFor={name} className="t-form block text-ink">
        {required && <span aria-hidden="true">*</span>}
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={3}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          autoComplete={autoComplete}
          // A space, never seen. :placeholder-shown is the only way CSS can ask
          // "is this empty?", and it does not match at all without the
          // attribute — verified in the browser before relying on it.
          placeholder=" "
          aria-describedby={describedBy}
          className={`${shared} resize-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          pattern={pattern}
          title={title}
          autoComplete={autoComplete}
          placeholder=" "
          aria-describedby={describedBy}
          className={shared}
        />
      )}

      {/* Siblings of the input, not children of a wrapper: `peer-*` compiles to
          the `~` combinator, which cannot reach into a descendant.

          Empty vs typed-but-wrong is the whole distinction, and it is the only
          one that exists — maxLength caps input rather than failing it, so each
          field has exactly one way to be filled and still invalid. */}
      <p id={`${name}-missing`} className={`${msg} peer-user-invalid:peer-placeholder-shown:block`}>
        {messages.missing}
      </p>
      {messages.invalid && (
        <p
          id={`${name}-invalid`}
          className={`${msg} peer-user-invalid:peer-not-placeholder-shown:block`}
        >
          {messages.invalid}
        </p>
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
  message,
  muted = false,
}: {
  legend: string
  name: string
  options: readonly string[]
  message: string
  muted?: boolean
}) {
  return (
    // `group` + `has()` rather than `peer`: a radio group has no single sibling
    // to hang the message off, so the fieldset reports on its own contents.
    <fieldset className="group" aria-describedby={`${name}-missing`}>
      <legend className={`t-form ${muted ? 'text-storm' : 'text-ink'}`}>
        <span aria-hidden="true">*</span>
        {legend}
      </legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <label
            key={o}
            className="relative cursor-pointer rounded-xl border border-border t-body px-4 py-1.5 text-ink transition-colors has-[:checked]:rounded-md has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-cloud has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent"
          >
            {/* Not sr-only: a 1x1 clipped input makes the browser anchor its
                validation bubble to the corner of the form instead of the chip.
                Covering the label keeps it invisible but correctly placed. */}
            <input
              type="radio"
              name={name}
              value={o}
              required
              className="absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0"
            />
            {o}
          </label>
        ))}
      </div>
      <p
        id={`${name}-missing`}
        className="mt-2 hidden text-base text-error group-has-[:user-invalid]:block"
      >
        {message}
      </p>
    </fieldset>
  )
}

export function ContactForm() {
  return (
    <form className="relative space-y-8" action="/api/contact" method="post">
      <Field
        label="Name"
        name="name"
        autoComplete="name"
        minLength={2}
        maxLength={100}
        messages={MESSAGES.name}
      />
      {/* type="email" alone accepts "maria@gmail" — a missing TLD is an ordinary
          typo, and the server rejects it, so without this the enquirer loses
          everything they wrote. The pattern is the weaker of the two checks by
          design: the server stays the real gate, this just stops a real person
          reaching it. */}
      <Field
        label="E-mail"
        name="email"
        type="email"
        autoComplete="email"
        maxLength={254}
        pattern="[^@\s]+@[^@\s]+\.[^@\s]{2,}"
        title="Include the full domain, for example name@example.com"
        messages={MESSAGES.email}
      />
      <Field
        label="Telephone"
        name="tel"
        type="tel"
        autoComplete="tel"
        minLength={6}
        maxLength={40}
        messages={MESSAGES.tel}
      />
      <Field
        label="Description"
        name="description"
        textarea
        minLength={10}
        maxLength={4000}
        messages={MESSAGES.description}
      />

      {/* Honeypot. Never shown, never announced, never focusable — anything in
          it came from a bot, and the server thanks it without sending. Hidden
          with a wrapper rather than display:none, which some bots skip. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company (leave this empty)</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <ChipGroup
        legend="Interested in"
        name="interest"
        options={interests}
        message={MESSAGES.interest.missing}
      />
      <ChipGroup
        legend="Project budget"
        name="budget"
        options={budgets}
        message={MESSAGES.budget.missing}
        muted
      />

      {/* Wrapped so the message can sit outside the label — inside it, clicking
          the message would toggle the box. */}
      <div className="group">
        <label className="flex items-start gap-3 text-sm text-ink">
          {/* Unchecked by default — see the note at the top of this file. */}
          <input
            type="checkbox"
            name="terms"
            required
            aria-describedby="terms-missing"
            className="mt-0.5 h-6 w-6 shrink-0 accent-primary"
          />
          <span>
            I&rsquo;ve read and accepted the{' '}
            <a href="/terms-of-service" className="underline underline-offset-2">
              terms and conditions
            </a>
          </span>
        </label>
        <p
          id="terms-missing"
          className="mt-2 hidden text-base text-error group-has-[:user-invalid]:block"
        >
          {MESSAGES.terms.missing}
        </p>
      </div>

      <SubmitButton label="Send Message" />
    </form>
  )
}
