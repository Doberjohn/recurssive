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
 */

export const purposeRows = [
  {
    label: '(Purpose)',
    heading: 'We create to inspire others to create.',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip consequat.',
  },
  {
    label: '(Vision)',
    heading: 'Creativity driven by people, efficiency driven by tech.',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip consequat.',
  },
  {
    label: '(Mission)',
    heading: 'Crafting custom web & app experiences that help people.',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip consequat.',
  },
]

/** Deck p15, carried to About in order, in the brand gradient. */
export const values = [
  'Reliability',
  'Empathy',
  'Performance',
  'Foresight',
  'Creativity',
].map((name) => ({
  name,
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
}))

/**
 * The 1920 frame draws five steps; the 768 frame draws only the first two. A
 * mobile layout that stops after "Process" is an incomplete mock, not a design
 * decision — so all five render at both widths.
 */
export const processSteps = [
  'Start',
  'Process',
  'Decide',
  'Process',
  'End',
].map((name) => ({
  name,
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
}))
