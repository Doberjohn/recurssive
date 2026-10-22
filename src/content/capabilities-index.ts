/**
 * Hardcoded content for the Capabilities index, read from the Figma frame.
 *
 * Hardcoded on purpose, and it is worth being clear why rather than leaving it
 * to look like an oversight.
 *
 * The `capabilities` MDX collection has FOUR entries, one per pillar. This page
 * draws NINETEEN rows. The drawn rows are also not those capabilities' `services`
 * lists — Consulting draws "React Development", "Expo Development",
 * "Next.js Development" and so on, none of which appear in
 * react-native-performance.mdx's services. So the rows are nineteen would-be
 * capability entries, fifteen of which do not exist as content yet.
 *
 * Wiring this to `getAll('capabilities')` today would render four rows against a
 * design that draws nineteen. Hardcoding renders what was designed and keeps the
 * shape the content layer will eventually supply, which is the honest interim.
 *
 * The code samples are drawn verbatim in the frame — they are real, chosen
 * copy rather than filler, so they are transcribed exactly.
 *
 * ── COPY BUDGETS, MEASURED. Do not derive these, and do not take the figure in
 * docs/copy-deck.md:711 on trust — it is wrong, and wrong in the dangerous
 * direction.
 *
 * That note argues the Open Sans advance is 0.43em and that the brief's 0.48em
 * is "~10% tight". Parsing hmtx/cmap out of the project's own
 * Fonts/Open Sans/static/OpenSans-Regular.ttf and greedy-wrapping these four
 * strings gives a weighted mean of 0.4651em. The deck's constant is ~8%
 * optimistic, and two of its five proposed strings overflowed because of it.
 *
 * The mistake is instructive: it was calibrated against the DRAWN frames, which
 * set this paragraph at 24px, while the BUILD rendered .t-body, which was
 * clamp(16px, …, 22px) and resolved to 22px at 768. Measure the built box,
 * never the drawn one. (Since 2026-10-22 .t-body IS the drawn 24 at -3%, so the
 * 768 figures below are re-measured against that.)
 *
 *   description  1920  746px @16px  → 2 lines
 *                 768  595px @24px  → 4 lines
 *
 * Both counts are the drawn intent. At 768 only Consulting's 610x138 box is
 * auto-height and therefore trustworthy; the other three are hand-dragged
 * 610x70 boxes that overflow their own content, so they say nothing about line
 * count. (The frame's own Lorem, laid out at 610 and 24px -3%, takes 4 lines in
 * all four.)
 *
 * The two box widths are BROWSER-MEASURED, and neither is what the source
 * looks like it says. At 1920 the p carries max-w-[754px], but its parent is
 * w-[746px] (page.tsx:52), so the parent binds and the 754 never applies. At
 * 768 the container is 610px less the 15px scrollbar gutter. Both run narrower
 * than the source suggests, which is how a string that measures fine on paper
 * renders one line too tall. (The size no longer drifts: .t-body reaches the
 * drawn 24 at a 767.8px viewport, where it used to resolve to 21.78, not 22.)
 *
 * The window is roughly 180-195 characters, but character count is NOT the
 * real constraint and must not be used as one: at 768 the 186-character Product
 * Dev string has 17px less headroom than the 194-character Consulting one,
 * because headroom depends on where the words break. Verify by rendering.
 *
 * All four below are browser-verified at 2 lines / 4 lines, re-run at 24px on
 * 2026-10-22: each takes 18-37px less width at 1920, and 74-91px less at 768,
 * before it gains a line. An earlier pass had Enterprise at 1px, which rendered
 * correctly and would have tipped to a fifth line on any edit.
 *
 * ── VOICE. docs/verbal-identity.md governs. Two rules bit hardest here, and
 * both are recorded because an earlier draft of these four broke them.
 *
 *   NEVER OPEN WITH "We" IS NOT THE SAME AS NEVER SAYING "we". The copy deck's
 *   draft had zero we/our/us across all five index strings. §5 of the verbal
 *   identity measures the TOLERATED copy at 1.3 per 100 words and the REJECTED
 *   copy at 0.3, diagnosing the latter as "the studio has vanished". Zero is
 *   past the rejected end. These four carry two, each in the last clause of its
 *   paragraph, which is the PUT "we" LAST pattern from page.tsx:107.
 *
 *   NO TEMPLATE ACROSS THE BAND. The deck's four descriptions all opened on a
 *   gerund (Reading / Designing / Putting / Moving). An owner rejection is on
 *   record at page.tsx:114-121 for a band where five of six rows shared one
 *   rhythm; four of four is tighter than that. These open on four different
 *   shapes — noun phrase, adverbial, quantified claim, negative declarative —
 *   and their sentence means ramp 13.0 / 15.5 / 16.0 / 18.5 rather than
 *   converging. Check this mechanically after any edit, not by ear.
 */

export type Pillar = {
  name: string
  description: string
  rows: string[]
  card: { title: string; code: string; muted: boolean }
}

export const pillars: Pillar[] = [
  {
    name: 'Consulting',
    description:
      'An outside read on code that already exists, and a plain account of what it is costing you to keep running. That comes back as a report, or as the pull requests that fix it. Rarely as a rewrite.',
    rows: [
      'React Native Performance Optimization',
      'New Architecture Migration',
      'React Development',
      'React Native Trainings',
      'Expo Development',
      'Next.js Development',
      'React Native Upgrades',
    ],
    card: {
      title: 'Consulting Project',
      // The only card the frame draws in muted grey rather than near-white.
      muted: true,
      code: `import { optimizeApp } from "@company/performance";
const config = {
  framework: "React Native",
  architecture: "New Architecture",
  platform: "Expo + Next.js",
};
async function consulting() {
  const metrics = await optimizeApp(config);

  return {
    fps: metrics.fps,
    startupTime: metrics.startupTime,
    status: "Optimized",
  };

}`,
    },
  },
  {
    name: 'Product Dev',
    description:
      'Prototype first, then the version people actually pay for. One React Native codebase covers phone and web, so adding a second platform costs a decision rather than a whole second budget.',
    rows: [
      'Desktop App Development',
      'Web App Development',
      'Mobile App Development',
      'UI/UX Design',
      'Product Strategy',
    ],
    card: {
      title: 'Product Development Project',
      muted: false,
      code: `const products = [
  { type: "Web", color: "#3B82F6" },
  { type: "Mobile", color: "#10B981" },
  { type: "Desktop", color: "#F97316" },
];

export const buildProduct = () =>
  products.map(product => ({
    ...product,
    scalable: true,
    tested: true,
    deployed: true,
  }));

console.log("Shipping products worldwide");`,
    },
  },
  {
    name: 'AI Engineering',
    description:
      'Most models belong on the device rather than in someone’s data centre. That one decision settles what works offline and what never leaves the phone, and we would rather make it early.',
    rows: [
      'On-device AI',
      'Generative AI App Development',
      'AI Knowledge Integration',
      'AI Vibe Coding Cleanup',
    ],
    card: {
      title: 'AI Engineering Project',
      muted: false,
      code: `const ai = {
  model: "On-device AI",
  knowledge: "Integrated",
  generation: "Enabled",
};

async function createExperience(prompt: string) {
  return {
    output: await generate(prompt),
    latency: "12ms",
    color: "#8B5CF6",
    privacy: "Local First",
  };
}

createExperience("Build something amazing");`,
    },
  },
  {
    name: 'Enterprise Solutions',
    description:
      'Nothing has to stop shipping. A large app moves to React Native one screen at a time, and most of the risk lives in the release process and the monitoring, which is where we spend the time.',
    rows: ['Migration to React Native', 'Monitoring & Observability', 'Release Process Optimization'],
    card: {
      title: 'Enterprise Solutions Project',
      muted: false,
      code: `const observability = {
  monitoring: "active",
  releases: "automated",
  migration: "React Native",
};

function enterpriseHealth() {
  return {
    uptime: "99.99%",
    alerts: "#EF4444",
    dashboards: "#6366F1",
    deployments: "#22C55E",
  };
}
export default enterpriseHealth;`,
    },
  },
]
