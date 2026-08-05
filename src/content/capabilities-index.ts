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
 */

export type Pillar = {
  name: string
  description: string
  rows: string[]
  card: { title: string; code: string; muted: boolean }
}

/** The lorem block the frame repeats under every pillar heading. */
const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.'

export const pillars: Pillar[] = [
  {
    name: 'Consulting',
    description: LOREM,
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
    description: LOREM,
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
    description: LOREM,
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
    description: LOREM,
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
