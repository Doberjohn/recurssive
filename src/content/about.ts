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
 */

export const purposeRows = [
  {
    label: '(Purpose)',
    heading: 'We create to inspire others to create.',
    body: 'The work is meant to be copied. What we figure out gets written down and published, because a method nobody can see helps nobody. The studios we learned from published theirs.',
  },
  {
    label: '(Vision)',
    heading: 'Creativity driven by people, efficiency driven by tech.',
    body: 'Machines are better than us at the parts that repeat. People are better at deciding what is worth repeating. We spend our judgement on the second and let the tooling take the first.',
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
    body: 'Fast is something users feel long before they can name it, and it is the cheapest quality to keep.',
  },
  {
    name: 'Foresight',
    body: "Most of a product's life comes after launch, so the real question is what it will cost to keep alive.",
  },
  {
    name: 'Creativity',
    body: 'Familiar is the easy answer and rarely the right one. Elegance is what a solved problem looks like.',
  },
]

/**
 * The 1920 frame draws five steps; the 768 frame draws only the first two. A
 * mobile layout that stops after "Process" is an incomplete mock, not a design
 * decision — so all five render at both widths.
 *
 * This is NOT the Home flowchart. Home runs Ask / Listen / Think / Create (deck
 * p88); this is the abstract Start / Process / Decide / Process / End shape. The
 * knowledge base records that the two process models are intentionally different
 * things, so they must not converge on the same wording. Step 01 in particular
 * must avoid Home's "the opening questions are about your business".
 */
export const processSteps = [
  {
    name: 'Start',
    body: 'Somewhere in the business there is a problem worth paying to solve. That is the entry point.',
  },
  {
    name: 'Process',
    body: 'Work happens, and it stays visible while it happens rather than being revealed at the end.',
  },
  {
    name: 'Decide',
    body: 'A real decision has a stopping condition agreed in advance, rather than a mood on the day.',
  },
  {
    name: 'Process',
    body: 'The second pass is only worth running if something changed. Otherwise it is the same pass again.',
  },
  {
    name: 'End',
    body: 'Finished means the agreed condition was met, and both of us knew what it was beforehand.',
  },
]
