/**
 * The tool marks in public/icons/tech.svg, one <symbol> each, and the box each
 * is drawn in on a 15px chip (the 1920 frame's): [width, height] in px.
 *
 * Lifted from Capability.svg, the 1920 export: every chip's mark is the paths
 * left of its label, moved to the mark's own origin and rounded to 0.01px
 * (rasterised at 8x against the export's untouched paths, they match to the
 * antialiasing). React Native draws React's atom, so the two share one.
 *
 * The chip scales these with its font size, so a mark keeps its drawn size
 * and position against the label at both frames' scales.
 */
export const techLogos = {
  react: [21.21, 18.88],
  angular: [16.97, 18],
  javascript: [16, 16],
  nextjs: [18, 18],
  typescript: [17, 16],
  vue: [20.78, 18],
  threejs: [17.82, 18],
  gsap: [17, 20],
  vite: [17.98, 18],
  nodejs: [18, 20.28],
  python: [18, 18],
  dotnet: [18, 18],
  java: [13.28, 18],
  nestjs: [18, 18],
  ruby: [18, 17.86],
  laravel: [18, 19],
  swift: [18, 15],
  kotlin: [18, 18],
  flutter: [16, 20],
  slack: [18, 18.04],
  jira: [18, 18],
  airtable: [22, 18],
  'creative-cloud': [18, 13],
  figma: [13, 18],
  sketch: [18, 15],
  chatgpt: [18, 18],
  gemini: [18, 18],
  claude: [18, 18],
  'google-analytics': [17, 17],
  azure: [18, 13.94],
  meta: [18, 11.96],
  mysql: [18, 18],
  mariadb: [18, 12],
  mongodb: [8.08, 18],
  vercel: [21, 18],
  aws: [25.09, 15],
  'google-cloud': [22.52, 18],
} as const satisfies Record<string, readonly [number, number]>

export type TechLogo = keyof typeof techLogos
