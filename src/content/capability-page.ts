/**
 * The sections every capability page shares, read from the Capability frames
 * (Capability.svg 1920x7414 and Capability mobile.svg 768x10833, the same
 * frames as "Capabilitiy" in analysis/canvas-v2.fig).
 *
 * PLACEHOLDER COPY. Every paragraph here is the frames' own Lorem ipsum, kept so
 * the template can be measured against them line for line; headings and labels
 * are as drawn. All of it is replaced from the owner's copy interview before
 * any capability page ships, and until then only a draft entry renders it.
 *
 * The tech list is the frame's too, spelling included ("Net Framework",
 * "mySQL"). It is a factual claim — "Tech we use on repeat" — so the owner
 * confirms or edits it before launch.
 *
 * Our Process is shared with Home outright (components/ProcessSection), copy
 * and all: the frames draw the same band, steps and shapes on both pages.
 */

import type { TechLogo } from './tech-logos'

/** The frames' placeholder paragraphs: 231 and 123 characters at 1920. */
const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
const LOREM_SHORT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

export const whyUs = {
  heading: 'Why us',
  intro: LOREM_SHORT,
  items: [
    { name: 'Human touch', icon: 'human-touch', body: LOREM },
    { name: 'Solution oriented', icon: 'solution-oriented', body: LOREM },
    { name: 'Future ready', icon: 'future-ready', body: LOREM },
    { name: 'Latest tech', icon: 'latest-tech', body: LOREM },
    { name: 'Efficient systems', icon: 'efficient-systems', body: LOREM },
    { name: 'Reliable partner', icon: 'reliable-partner', body: LOREM },
  ],
}

export const ideaCard = {
  heading: 'Got an idea that keeps coming back?',
  body: LOREM_SHORT,
  action: 'Inquire',
}

export const moreServices = {
  heading: 'Discover More Services',
  intro: LOREM_SHORT,
  /** The frames' eight, in their order: four AI rows, then four from
   *  Consulting and Enterprise. Which services a page offers next is a
   *  content decision per page; until then every page carries these. */
  rows: [
    'On-device AI',
    'Generative AI App Development',
    'AI Knowledge Integration',
    'AI Vibe Coding Cleanup',
    'New Architecture Migration',
    'React Development',
    'Monitoring & Observability',
    'React Native Upgrades',
  ],
}

/** A chip: the tool's name as drawn, and its mark in public/icons/tech.svg. */
type Tool = { name: string; logo: TechLogo }

export const techStack: { heading: string; intro: string; groups: { name: string; tools: Tool[] }[] } = {
  heading: 'Tech we use on repeat',
  intro: LOREM_SHORT,
  groups: [
    {
      name: 'Front End',
      tools: [
        { name: 'React.js', logo: 'react' },
        { name: 'Angular', logo: 'angular' },
        { name: 'JavaScript', logo: 'javascript' },
        { name: 'Next.js', logo: 'nextjs' },
        { name: 'TypeScript', logo: 'typescript' },
        { name: 'Vue', logo: 'vue' },
        { name: 'Three.js', logo: 'threejs' },
        { name: 'GSAP', logo: 'gsap' },
        { name: 'Vite', logo: 'vite' },
      ],
    },
    {
      name: 'Back End',
      tools: [
        { name: 'Node.js', logo: 'nodejs' },
        { name: 'Python', logo: 'python' },
        { name: 'Net Framework', logo: 'dotnet' },
        { name: 'Java', logo: 'java' },
        { name: 'NestJS', logo: 'nestjs' },
        { name: 'Ruby', logo: 'ruby' },
        { name: 'Laravel', logo: 'laravel' },
      ],
    },
    {
      name: 'Mobile Development',
      tools: [
        { name: 'Swift (iOS)', logo: 'swift' },
        { name: 'Kotlin (Android)', logo: 'kotlin' },
        { name: 'React Native (Cross)', logo: 'react' },
        { name: 'Flutter (Cross)', logo: 'flutter' },
      ],
    },
    {
      name: 'Product Management',
      tools: [
        { name: 'Slack', logo: 'slack' },
        { name: 'Jira', logo: 'jira' },
        { name: 'Airtable', logo: 'airtable' },
      ],
    },
    {
      name: 'UI/UX Design',
      tools: [
        { name: 'Creative Cloud', logo: 'creative-cloud' },
        { name: 'Figma', logo: 'figma' },
        { name: 'Sketch', logo: 'sketch' },
      ],
    },
    {
      name: 'AI Models',
      tools: [
        { name: 'ChatGPT', logo: 'chatgpt' },
        { name: 'Gemini', logo: 'gemini' },
        { name: 'Claude', logo: 'claude' },
      ],
    },
    {
      name: 'Analytics',
      tools: [
        { name: 'Google', logo: 'google-analytics' },
        { name: 'Azure', logo: 'azure' },
        { name: 'Meta', logo: 'meta' },
      ],
    },
    {
      name: 'Databases',
      tools: [
        { name: 'mySQL', logo: 'mysql' },
        { name: 'MariaDB', logo: 'mariadb' },
        { name: 'MongoDB', logo: 'mongodb' },
      ],
    },
    {
      name: 'Cloud Infrastructure',
      tools: [
        { name: 'Vercel', logo: 'vercel' },
        { name: 'AWS', logo: 'aws' },
        { name: 'Google Cloud', logo: 'google-cloud' },
      ],
    },
  ],
}

export const platforms: {
  heading: string
  intro: string
  cards: { name: string; mark: 'web' | 'android' | 'ios'; body: string }[]
} = {
  heading: 'We develop for',
  intro: LOREM_SHORT,
  cards: [
    { name: 'Web', mark: 'web', body: LOREM },
    { name: 'Android', mark: 'android', body: LOREM },
    { name: 'iOS', mark: 'ios', body: LOREM },
  ],
}
