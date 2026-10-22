/**
 * Hardcoded content for the About page, read from the Figma frame.
 *
 * Two strings deliberately follow the DECK rather than the frame, because the
 * deck is the source and the frame is a drawing of it (deck pp9/11/13, recorded
 * in the knowledge base):
 *
 *   Vision   the deck has "driven by people, efficiency" — the frame drops the
 *            comma, which turns a balanced pair into a run-on.
 *   Mission  the deck has "web & app"; the 1920 frame draws "and", the 768 frame
 *            draws "&". The frames disagree with each other, so the deck breaks
 *            the tie.
 *
 * This is the same call already made for the footer's nav list, where the frame
 * draws four links and the site has six.
 *
 * ── COPY BUDGETS, MEASURED on the built page at 1920 against the drawn line
 * counts. Do not derive these; the calculation has been wrong every time.
 *
 *   purposeRows.body   620px @16px, drawn 3 lines  → ceiling 208 (240 breaks to 4)
 *   values.body        311px @14px, drawn THREE lines. The 506/2-line figure
 *                      here came from the figspec and is superseded by
 *                      Values.svg, which puts the column at 1446..1757 and
 *                      draws every body over three lines (56px ink). All five
 *                      are written to 98-103, which is what reaches line three
 *                      at 311. Foresight was 96 and fell to two lines, which
 *                      cost the values list 21px and left the last body short
 *                      of the image bottom — the rhythm depends on all five
 *                      matching.
 *   processSteps.body  231px @16px, drawn 4 lines  → ceiling 101 (130 breaks to 5)
 *
 * The two inline paragraphs live in app/about/page.tsx: the hero story (846px
 * @16px, 3 lines, ceiling 323) and the recursion paragraph (1128px @16px, 3
 * lines, ceiling ~437).
 *
 * ── VOICE. docs/verbal-identity.md holds the derivation; the short version is
 * that About is the page most likely to slide into self-regard, and that is the
 * exact failure the owner has rejected twice. Rules that bite hardest here:
 *
 *   - The studio appears as CAPABILITY, not as sentiment. No "we love", no
 *     "privilege", no "honoured". The cheese list is in the verbal-identity doc.
 *   - The three canon headings (deck pp9/11/13) are already the abstract claim.
 *     Each body's job is to make it CONCRETE, never to restate it.
 *   - No three-item comma lists anywhere. This is the shape rejected twice.
 *   - No framework, OS or language names.
 *
 * Checked mechanically: no content word appears in more than three of the
 * fifteen About strings, and no five-word run repeats anything on Home.
 *
 * ── PROVENANCE. The body copy was written 2026-09-30 from the owner's answers
 * to a multiple-choice interview, and the owner approved every line as
 * written. Four lines survive from the earlier draft because the owner chose
 * to keep them: Mission, Reliability, Empathy and Start. Treat all of it as
 * owner-approved and change it only with the owner's go-ahead, the same rule
 * as the owner's rows on Home (rule 0 in app/page.tsx).
 */

export const purposeRows = [
  {
    label: '(Purpose)',
    heading: 'We create to inspire others to create.',
    // Stated as an ambition because it is one: the owner's answer was that
    // this isn't a track record yet, so the body claims none.
    body: 'This one is still an ambition, and we’re growing into it. We’d like our apps and websites to be good enough that whoever uses them feels like going off to make something of their own.',
  },
  {
    label: '(Vision)',
    heading: 'Creativity driven by people, efficiency driven by tech.',
    body: 'AI tools and automation do the repetitive parts of the job, so projects move faster. The time that frees up goes into the decisions that need a person, like what to build and how it should feel.',
  },
  {
    label: '(Mission)',
    heading: 'Crafting custom web & app experiences that help people.',
    body: 'Custom is the operative word there. Off-the-shelf is cheaper right up to the point where your business has to bend around the software instead of the software bending around you.',
  },
]

/** Deck p15, carried to About in order, in the brand gradient.
 *  Names are canon and locked. Bodies gloss the value in plain terms. */
export const values = [
  {
    name: 'Reliability',
    body: 'It should be boring in the best possible sense. You stop thinking about it once it is running properly.',
  },
  {
    name: 'Empathy',
    body: 'Somebody has to sit with the person using it and notice what they never bothered to complain about.',
  },
  {
    name: 'Performance',
    body: 'Speed is designed in from the start. People leave an app that feels slow, whatever its benchmarks say.',
  },
  {
    name: 'Foresight',
    body: 'We plan ahead for the next system update and for growth, so neither one means rewriting everything.',
  },
  {
    name: 'Creativity',
    body: 'The unusual idea gets tried before the familiar one, and the small details are where the craft shows.',
  },
]

/**
 * The 1920 frame draws five steps; the 768 frame draws only the first two. A
 * mobile layout that stops after "Process" is an incomplete mock, not a design
 * decision — so all five render at both widths. Below lg they run as one
 * sideways strip, two in view and the rest a swipe away, which is how the 768
 * export draws the first two (owner's call, 2026-10-21).
 *
 * This is NOT the Home flowchart. Home runs Ask / Listen / Think / Create (deck
 * p88); this is the abstract Start / Process / Decide / Process / End shape. The
 * knowledge base records that the two process models are intentionally different
 * things, so they must not converge on the same wording. Step 01 in particular
 * must avoid Home's "the opening questions are about your business".
 *
 * The steps describe how the work actually runs, per the owner: regular demos,
 * options laid out with a recommendation, the client makes the call, and
 * finished means live and running without problems. The earlier draft's
 * "stopping condition agreed in advance" and "second pass only if something
 * changed" were dropped because the work doesn't run that way.
 */
export const processSteps = [
  {
    name: 'Start',
    shape: 'terminator',
    body: 'Somewhere in the business there is a problem worth paying to solve. That is the entry point.',
  },
  {
    name: 'Process',
    shape: 'process',
    body: 'You see the work as it happens, in regular demos that show what has changed since the last one.',
  },
  {
    name: 'Decide',
    shape: 'decision',
    body: 'We lay out the options and what each would cost, and say which we’d pick. The call is yours.',
  },
  {
    name: 'Process',
    shape: 'process',
    body: 'The option you chose goes ahead from there, and you see the result running at the next demo.',
  },
  {
    name: 'End',
    shape: 'terminator',
    body: 'Finished means it’s live and the people it was made for have been using it without problems.',
  },
] as const
