/**
 * The sections every capability page shares, read from the Capability frames
 * (Capability.svg 1920x7414 and Capability mobile.svg 768x10833, the same
 * frames as "Capabilitiy" in analysis/canvas-v2.fig).
 *
 * OWNER-APPROVED COPY, every string, from the copy interview of 2026-10-22:
 * each sentence written from a multiple-choice answer and approved line by
 * line. Change a fact only by asking the owner. Line counts were checked in
 * the page at 1920, 768 and 390; the platform cards hold the drawn 6 lines at
 * 1920 and keep equal heights below it, so re-render after any edit.
 *
 * The tech list is the frame's, confirmed by the owner as true ("Tech we use on
 * repeat" is a factual claim), with three names corrected on his say-so:
 * .NET Framework, MySQL and Google Analytics.
 *
 * Our Process is shared with Home outright (components/ProcessSection), copy
 * and all: the frames draw the same band, steps and shapes on both pages.
 */

import { site } from '@/lib/site'
import type { TechLogo } from './tech-logos'

/** Owner-approved 2026-10-22 from the copy interview. The six replace the
 *  frames' headings (Human touch … Reliable partner), which the owner chose to
 *  rethink; two of those were the banned "future-proof" and "cutting-edge" in
 *  other words. Each `icon` is the mark drawn in that slot, kept by position:
 *  the marks are abstract and were never tied to their old words. */
export const whyUs = {
  heading: 'Why us',
  intro: 'How we work on every project, whichever of the four groups it belongs to.',
  items: [
    {
      name: 'Direct line',
      icon: 'human-touch',
      body: 'The developer writing your code is the one answering your messages. Nobody relays them in between, so questions go straight to the person who actually knows.',
    },
    {
      name: 'Plain answers',
      icon: 'solution-oriented',
      body: 'Before you spend anything on the build, you hear what’s wrong and what it will take, including the parts nobody likes hearing. We’d rather say it then than halfway through.',
    },
    {
      name: 'Side by side',
      icon: 'future-ready',
      body: 'Your own developers work alongside ours before we step back. By the time we leave, the code is already theirs and they know their way around it.',
    },
    {
      name: 'Plan first',
      icon: 'latest-tech',
      body: 'Scope and designs are agreed before any code is written. If the plan has to change halfway, we agree the change and what it affects with you before carrying on.',
    },
    {
      name: 'Tools per job',
      icon: 'efficient-systems',
      body: 'No stack is presumed on our side. Each project starts from what the product needs, and the tools follow from that, even when they differ from the last project’s.',
    },
    {
      name: 'After launch',
      icon: 'reliable-partner',
      body: 'Once it’s live, staying on is your call. Ongoing fixes and monitoring are there if you want them, and if you’d rather take it from there, the exit is a clean one.',
    },
  ],
}

export const ideaCard = {
  heading: 'Got an idea that keeps coming back?',
  // The owner's reply promise, from its one source so it cannot drift.
  body: `Tell us about it. ${site.replyPromise}`,
  action: 'Inquire',
}

export const moreServices = {
  heading: 'Discover More Services',
  intro: 'Other kinds of work we take on, across the four groups.',
  /** The frames' eight, in their order: four AI rows, then four from
   *  Consulting and Enterprise. Which services a page offers next is a
   *  content decision per page; until then every page carries these, except
   *  that a page never lists itself: its own row gives way to `standIn`. */
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
  /** Fills the slot on the eight pages whose own row is above, so the list
   *  keeps its drawn eight: the flagship page drawn in the frames. */
  standIn: 'Mobile App Development',
}

/** A chip: the tool's name as drawn, and its mark in public/icons/tech.svg. */
type Tool = { name: string; logo: TechLogo }

export const techStack: { heading: string; intro: string; groups: { name: string; tools: Tool[] }[] } = {
  heading: 'Tech we use on repeat',
  intro: 'These come up on project after project, but none of them is a given. Each project picks the ones its product needs.',
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
        { name: '.NET Framework', logo: 'dotnet' },
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
        { name: 'Google Analytics', logo: 'google-analytics' },
        { name: 'Azure', logo: 'azure' },
        { name: 'Meta', logo: 'meta' },
      ],
    },
    {
      name: 'Databases',
      tools: [
        { name: 'MySQL', logo: 'mysql' },
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
  intro: 'Everything we build runs on at least one of these three. On phones, a single codebase usually covers both Android and iOS.',
  cards: [
    {
      name: 'Web',
      mark: 'web',
      body: 'Web apps people sign in to, and company websites too. Pages load quickly and are built to be found in search, on any screen size. Where there’s also a phone app, the web version shares much of its code.',
    },
    {
      name: 'Android',
      mark: 'android',
      body: 'Built from the same code as the iPhone app, then tested across Android phones, older and cheaper ones included. The back button and notifications behave as Android users expect, and we publish it on Google Play.',
    },
    {
      name: 'iOS',
      mark: 'ios',
      body: 'The same codebase as the Android app, shaped so it feels like an iPhone app in its gestures and layout. Widgets, Apple Pay or Face ID come in when the product needs them, and we steer it through Apple’s review.',
    },
  ],
}
