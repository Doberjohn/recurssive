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
 * copy rather than filler, so they are transcribed exactly. So are their
 * colours: the frame colours each run by hand, read here from the .fig's
 * per-character fills and marked [[r:…]] red, [[p:…]] purple, [[g:…]] green,
 * [[o:…]] orange or [[m:…]] grey. CodeCard reads the marks.
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
 * All four below are browser-verified at 2 lines / 4 lines on 2026-10-22, with
 * 123 / 94 / 214 / 21px to spare on the last line at 1920 and 477 / 411 / 557 /
 * 295px at 768. Enterprise is the tight one: re-render it after any edit.
 *
 * ── COPY. Written on 2026-10-22 from the owner's multiple-choice interview,
 * each sentence from a picked answer, and approved line by line: Consulting
 * gives findings first and lets the client choose who fixes, and sometimes
 * says "rewrite"; Product Dev starts from an idea, plan and designs before the
 * build, for whatever platforms it needs; AI is mostly features inside apps,
 * phone or cloud decided per feature; Enterprise moves an app piece by piece
 * so it keeps shipping, monitoring and releases in every move and sold alone.
 * Change a fact only by asking the owner.
 *
 * ── VOICE. docs/verbal-identity.md governs. Two rules bit hardest here, and
 * both are recorded because an earlier draft of these four broke them.
 *
 *   NEVER OPEN WITH "We" IS NOT THE SAME AS NEVER SAYING "we". The copy deck's
 *   draft had zero we/our/us across all five index strings. §5 of the verbal
 *   identity measures the TOLERATED copy at 1.3 per 100 words and the REJECTED
 *   copy at 0.3, diagnosing the latter as "the studio has vanished". Zero is
 *   past the rejected end. All four carry the studio, and none opens on it.
 *
 *   NO TEMPLATE ACROSS THE BAND. The deck's four descriptions all opened on a
 *   gerund (Reading / Designing / Putting / Moving). An owner rejection is on
 *   record at page.tsx:114-121 for a band where five of six rows shared one
 *   rhythm; four of four is tighter than that. These open on four different
 *   shapes: an inversion ("First comes"), a quantity ("Most of this work"), a
 *   definite noun phrase ("The usual request") and a negative ("Nothing that
 *   works"). Check this mechanically after any edit, not by ear.
 */

export type Pillar = {
  name: string
  description: string
  rows: string[]
  /** `minHeight` only where the frames draw the card taller than its 484. */
  card: { title: string; code: string; minHeight?: number }
}

export const pillars: Pillar[] = [
  {
    name: 'Consulting',
    description:
      'First comes a plain account of what’s holding the app back. Then you choose who fixes it: your own team, or us. Now and then the honest answer is a rewrite, and when it is, we say so.',
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
      // Drawn 520 at both widths where the others are 484: at 1920 its foot
      // lands on the seventh row's rule, the only pillar long enough to reach.
      minHeight: 520,
      code: `[[o:import]] [[m:{]] [[p:optimizeApp]] [[m:}]] [[r:from]] [[g:"@company/performance"]];
[[r:const]] [[p:config]] = {
  framework: [[g:"React Native"]],
  architecture: [[g:"New Architecture"]],
  platform: [[g:"Expo + Next.js"]],
};
[[r:async function]] [[p:consulting]]() {
  [[r:const]] [[p:metrics]] = [[r:await]] [[p:optimizeApp]]([[p:config]]);

  [[r:return]] {
    fps: [[p:metrics]].fps,
    startupTime: [[p:metrics]].startupTime,
    status: [[g:"Optimized"]],
  };

}`,
    },
  },
  {
    name: 'Product Dev',
    description:
      'Most of this work begins as an idea and nothing more. The plan and the designs come first, and the build is its own step. We build for phone, web or desktop, whichever the product needs.',
    rows: [
      'Desktop App Development',
      'Web App Development',
      'Mobile App Development',
      'UI/UX Design',
      'Product Strategy',
    ],
    card: {
      title: 'Product Development Project',
      code: `[[r:const]] [[p:products]] = [
  { type: [[g:"Web"]], color: [[g:"#3B82F6"]] },
  { type: [[g:"Mobile"]], color: [[g:"#10B981"]] },
  { type: [[g:"Desktop"]], color: [[g:"#F97316"]] },
];

[[r:export const]] [[p:buildProduct]] [[r:=]] () =>
  [[p:products]].map([[p:product]] => ({
    ...[[p:product]],
    scalable: [[r:true]],
    tested: [[r:true]],
    deployed: [[r:true]],
  }));

[[p:console]].log([[g:"Shipping products worldwide"]]);`,
    },
  },
  {
    name: 'AI Engineering',
    description:
      'The usual request is an AI feature inside an app, new or already in use. Some features belong on the phone and some in the cloud, and we decide that one feature at a time.',
    rows: [
      'On-device AI',
      'Generative AI App Development',
      'AI Knowledge Integration',
      'AI Vibe Coding Cleanup',
    ],
    card: {
      title: 'AI Engineering Project',
      code: `[[r:const]] [[p:ai]] = {
  model: [[g:"On-device AI"]],
  knowledge: [[g:"Integrated"]],
  generation: [[g:"Enabled"]],
};

[[r:async function]] [[p:createExperience]]([[p:prompt]]: [[p:string]]) {
  [[r:return]] {
    output: [[r:await]] [[p:generate]]([[p:prompt]]),
    latency: [[g:"12ms"]],
    color: [[g:"#8B5CF6"]],
    privacy: [[g:"Local First"]],
  };
}

[[p:createExperience]]([[g:"Build something amazing"]]);`,
    },
  },
  {
    name: 'Enterprise Solutions',
    description:
      'Nothing that works today should break on the way. A large app moves screen by screen and keeps shipping, with monitoring and a release process in every move. We set those up on their own too.',
    rows: ['Migration to React Native', 'Monitoring & Observability', 'Release Process Optimization'],
    card: {
      title: 'Enterprise Solutions Project',
      code: `[[o:const]] [[p:observability]] [[r:=]] {
  monitoring: [[g:"active"]],
  releases: [[g:"automated"]],
  migration: [[g:"React Native"]],
};

[[r:function]] [[p:enterpriseHealth]]() {
  return {
    uptime: [[g:"99.99%"]],
    alerts: [[g:"#EF4444"]],
    dashboards: [[g:"#6366F1"]],
    deployments: [[g:"#22C55E"]],
  };
}
[[r:export default]] [[p:enterpriseHealth]];`,
    },
  },
]
