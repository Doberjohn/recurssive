# Where this project is

Living handoff. Update it when a phase closes or a decision is made. If a
session ends unexpectedly, start here.

**Last updated:** 2026-08-03

---

## Now

**Phase 4 — building pages from the designs.** Home is built and matches the
design's structure; a fidelity audit is running to find remaining differences.

| Phase | State |
|---|---|
| 0 — Unblock | Image licence **still open** (see Blockers) |
| 1 — Skeleton, tokens, CI budget gate | ✅ done |
| 2 — Image pipeline | ✅ done |
| 3 — MDX content layer | ✅ done |
| 4 — Pages | 🔄 Home built and audited (187 findings, systemic + high fixed, responsive scale in). Remaining: mid/low-tier polish. Then: Capability template → Capabilities → Cases/Case → About → Blog/Post → Contact → Legal → error states |
| 5 — SEO polish, OG images | not started |

**Measured state:** JS 125.3 KB against a 152 KB ceiling (26.7 KB headroom).
Every route statically prerendered. CI green.

---

## The contact form

Posts to `/api/contact`, a Route Handler — **the only server function in the
deployment**. Every page is still prerendered; CI asserts that and now exempts
`/api` specifically, so a page going dynamic still fails the build.

A plain form POST with a 303 redirect, not `fetch()`. That is why the form costs
0 KB of client JS, works with scripting off, and cannot be resubmitted by a
refresh. Outcomes are two prerendered pages: `/contact/thanks` and
`/contact/problem`. A banner on `/contact` was rejected — reading a query string
would make the page dynamic.

**It fails closed.** No API key, provider error, or invalid payload all land on
`/contact/problem`, which tells the visitor plainly that the message did not
arrive and gives them the address directly. Never redirect a failed send to
thanks.

Validation lives in `src/lib/contact.ts` (zod), shared by the route and the
form's option lists so client and server cannot drift — `interest` and `budget`
are an allow-list, since a radio group is trivially forged. A honeypot field
(`company`) is thanked and dropped rather than rejected, so a bot learns nothing.

`renderEnquiry` builds the email: subject carries name/interest/budget so a full
inbox is readable unopened, and **Reply-To is the enquirer** so a reply reaches
them. Plain text on purpose.

### Field messages are CSS-only — keep them that way

Every message a field can produce lives in `MESSAGES` in `src/lib/contact.ts`,
and the zod schema rejects with those same strings. Wording changes there and
nowhere else.

Each field shows the real message inline, chosen **without any JavaScript**:

| selector | shows |
| --- | --- |
| `peer-user-invalid:peer-placeholder-shown` | the empty case |
| `peer-user-invalid:peer-not-placeholder-shown` | typed but wrong |

Two messages cover every reachable case because **each field has exactly one way
to be filled and still invalid** — `maxLength` caps input rather than failing it,
so it never fires. If a field ever gains a second such mode, this stops being
sufficient and the choice becomes JS or a redesign.

**Telephone is required** — settled, do not propose making it optional again.
It was briefly made optional on a data-minimisation reading of GDPR Art. 5(1)(c)
(an email address already suffices to reply) and the owner reverted it. Every
field therefore has both a `missing` and an `invalid` message.

If it is ever revisited: an empty input still POSTs `tel=`, so making it optional
means the schema has to accept `''`. `.optional()` alone covers only an absent
key, which a browser never sends, so it would silently reject every submission
without a number.

Three things that are load-bearing and look removable:

- **`placeholder=" "` on every input.** `:placeholder-shown` does not match *at
  all* without the attribute — measured, not assumed. Remove it and the empty
  case silently stops showing.
- **The message elements are siblings of the input, not children of a wrapper.**
  `peer-*` compiles to the `~` combinator, which cannot reach a descendant.
- **Radio groups and the consent box use `group-has-[:user-invalid]` instead**,
  because a fieldset has no single sibling to hang the message off.

`aria-describedby` names both ids; the inactive one is `display:none` and so is
absent from the accessibility tree. Before this, the only error signal was an
`aria-hidden` "(error)" tag — nothing was announced at all, a WCAG 3.3.1 failure.

Testing trap: `minLength` sets `tooShort` **only for user-entered values**.
Assigning `.value` in a script leaves the field valid, so a scripted check will
report the message missing when it is working. Type with real key events.

## Blockers — only the owner can clear these

1. **Tony Noel photograph licence.** It is the About page hero — full-bleed,
   above the fold, and almost certainly the LCP element. No licence, and the
   subject is identifiable so a model release is a separate question. If it
   stalls, swap for one of the 15 cleared Unsplash photos rather than let one
   image hold up launch.
2. **Cookie banner decision.** Cookieless analytics removes the legal basis for
   a consent banner entirely, which deletes designed screens and is the single
   largest INP win available. Needs the owner's own legal sign-off.
3. **Strict CSP** — worth a day, or skip?
4. **Turnstile on the contact form** — Vercel Pro cannot use WAF managed rules.

---

## What lives where

| | |
|---|---|
| Repo root | `app/` — the Next.js project. Everything in git. |
| `app/docs/` | Knowledge base, content guide, design data, this file |
| `app/docs/design-data/` | **Design source of truth in git**: per-frame specs and the Home node manifests |
| `analysis/` | **Outside git.** Decoder scripts, both `.fig` revisions, audit outputs. ~3.3 MB. Regenerable but not backed up. |
| `Recurssive Folder/` | **Outside git.** ~1.3 GB of source assets. Never commit. |
| Deck + `.fig` | **Outside git.** ~540 MB. |

Anything outside `app/` exists on one disk only. The decoders in
`app/docs/tools/` can regenerate most of it from the deck and `.fig`.

---

## Decisions that are settled — do not reopen

- **Next.js 16.2.x App Router**, fully static, `cacheComponents` off, Tailwind v4,
  MDX in repo, Vercel Pro `fra1`. Reasoning in `KNOWLEDGE-BASE.md` §5.
- **Cloud White is `#FAFAFA`**, not `#FDFDFD`.
- **Purple/blue palette is deliberate** and measured as differentiated.
- **"Omnics Digital Agency" is the designer's credit**, not a Recurssive descriptor.
- **Zero Figma components is accepted** — the component layer lives in code.
- **Not `next/image`** — build-time `sharp` pipeline, custom `<Picture>`.
- **Every interaction is CSS.** INP excludes hover and scroll, so hover states
  cost nothing. Do not route them through React state.
- **The two design frames disagree on purpose.** At 768 headings are SMALLER
  and everything else is BIGGER (hero 72->48, section 48->42, but body 16->22,
  FAQ 18->26). The `.t-*` classes in globals.css encode the measured pairs;
  base is the 768 value and `lg` switches to 1920.

`KNOWLEDGE-BASE.md` §13 lists findings that were investigated and **disproved** —
read it before re-raising anything.

### Cleared on the footer mesh — do not re-investigate

Measured 2026-08-04 while chasing why the footer looked wrong. All ruled out;
the causes were the crop and the grain, both now fixed.

- **The mesh identity is right.** image7 -> `--mesh-12`, RMSE 0.8 against a
  next-best of 55.5 across all ten tokens. Full map: image3→mesh-2,
  image4→mesh-4, image6→mesh-5, image7→mesh-12, image8→mesh-7, image9→mesh-3.
- **128x80 is not too small.** PSNR 45.27 dB, mean ΔE 0.76 against the file's
  gradient at the same crop. 99.97% of the band's variance lives in features
  wider than the stored resolution — the pipeline's low-frequency premise holds.
- **No colour-profile problem.** Source PNG is sRGB, the AVIF signals sRGB.
- **Nothing is painted over the footer mesh** — no gradient, no `fill-opacity`,
  no blend mode. There is no overlay to reproduce.
- **`background-size: cover` is correct.** The pattern scale is uniform 0.48 on
  both axes; the design does not squash the gradient. Horizontal framing already
  matched exactly.

Known residuals, deliberately not fixed (all small, all on the shared `.mesh`):
the file's grain is blue-dominant chroma noise where the tile is monochrome; the
tile is fixed at 128 CSS px so it smooths on 2x displays; `mix-blend-mode:
overlay` scales with backdrop luminance, so grain thins in the dark top of the
band; and the downscale runs in gamma space rather than linear light (ΔE 1.80).

---

## Traps that have already bitten

- **Turbopack dev serves stale CSS.** A utility can appear missing when it is
  present in the production build. Verify against `next build`, or `rm -rf .next`.
- **Unlayered CSS outranks `@layer utilities`.** `.grained`'s `position: relative`
  silently beat Tailwind's `.absolute` and collapsed full-bleed images to zero
  height. `mesh.css` now emits inside `@layer components`.
- **Never pass `weight` to `next/font`** for Inter or Open Sans — both are
  variable. Specifying weights produced 17 files and 463 KB.
- **Metadata merges shallowly.** Always build it via `src/lib/metadata.ts`.
- **`notFound()` must be called before any `await`**, or Next injects `noindex`
  instead of returning a 404.
- **`Home.svg` in the asset folder is the authoritative render.** 238 MB, a
  full 1920x6949 export of the Home frame with everything composited. Open it
  in a browser. It settles questions the node tree cannot — and it revealed
  three things a node-level audit had got wrong. Look at it before trusting
  any derived manifest.
- **Do not exclude VECTOR nodes when building a design manifest.** They were
  skipped to avoid 30,000 icon paths, which made the footer wordmark — a
  1594x196 VECTOR at x163 y6753 — invisible to every analysis built on it,
  including the 187-finding audit. A separate 255px RECURSSIVE *text* node sits
  parked off-canvas at x8887 in all 31 frames; that one is a decoy.
  The same exclusion silently corrupted **every measurement of a panel**: the
  FAQ column was built at 650px because that was the widest *text* run — the
  #EAEAEA panels it sits on are vectors, and they are 686.1. Assume any width
  taken from the manifest is a text bbox until checked against the SVG.
- **`Home.svg` decodes cheaply.** It is 249 MB only because ten base64 rasters
  are inlined; stream them out and the vector skeleton is 4.5 MB with 1689
  paths and no `<text>` at all (Figma outlined it, one path per text run — so
  a run's bbox gives you its font size and line count, not its glyphs).
- **Measuring that a component is built correctly is not the same as checking it
  is the right component.** Look at the rendered page.
- **Passing `hidden` via a component's className prop does not beat a `display`
  utility in its own base string** — same layer, source order decides. Wrap the
  component instead.
- **`max-width` is a border-box value.** With padding-inline, gutters eat the
  column: the 1594px content width was only reachable at exactly 1920px.
  `.container-content` now sizes by `width: min(...)`.
- **Put base element styles in `@layer base`.** This cascade rule has bitten
  three times now: unlayered CSS outranks everything in `@layer utilities`, so
  an unlayered `h1-h6 { font-weight: 600 }` cannot be overridden by
  `font-medium` at the call site. Anything global belongs in a layer.
- **Never read `getComputedStyle` straight after `.focus()` or a hover.**
  Everything interactive here carries `transition-* duration-200`, so a
  synchronous read returns the value at t=0 — the *resting* one. This produced
  a completely false "the whole hover state is broken" reading. Wait ~500ms
  first. In real Chrome use top-level `await`; an `async` IIFE returns `{}`.
- **`CSSStyleRule.cssRules` exists and is truthy** (an empty list) now that
  Tailwind emits nested CSS. Walking the CSSOM with
  `if (r.cssRules) { recurse; continue }` therefore skips every leaf rule and
  reports zero matches. Test `r.cssRules?.length` instead.
- **The in-app Browser pane cannot screenshot or hover** — it never composites,
  and `requestAnimationFrame` never fires, so any `await rAF` hangs until the
  tool times out. Use the `claude-in-chrome` MCP against the **production**
  server for anything visual. chrome-devtools MCP is gone.
- **Turbopack dev CSS went stale again**, and this time silently: rules that
  exist in the production chunk were absent from the served dev stylesheet.
  Verify CSS against `npm run start`, never `next dev`. There is now a
  `recurssive-web-prod` entry in `.claude/launch.json` (port 3001) for this.
- **Backticks inside `build-mesh.mjs` broke it a SECOND time.** The whole CSS
  body is one template literal, so a backtick in a *comment* still ends the
  string. Escape them: `` \` ``. Check with `grep -n '[^\\]\`' scripts/build-mesh.mjs`
  — the plain `grep '\`'` spelling silently matches nothing useful.
- **`background-position: center` is not what the designs do.** Mesh surfaces
  crop their gradient at a deliberate point. On the footer, centring showed
  17.9%..82.1% of the source where the file shows 9.4%..66.5% — the bright core
  landed mid-band instead of below the bottom edge, and the whole footer read
  pale. Mean RGB 99,65,207 against 68,32,191. `.mesh` now takes `--mesh-pos`.
  Check every new mesh surface against its `pattern` transform before assuming
  centre.
- **Anchor a mesh crop from the edge the design defines it from, not the
  centre.** A `background-position` percentage resolves against
  (image height − band height), so it drifts whenever the band's content-driven
  height changes. The footer is 764px, not the drawn 685. Bottom-anchoring in
  `vw` (scale-invariant, because `cover` is width-driven on a wide band) scored
  MAE 6.34 against the file; a top anchor scored 15.95 and centring 34.10.
- **The brand face is At Hauss, not Inter — and the wordmark is never text.**
  It was set as `font-heading` (Inter), which is wrong twice: the wrong face,
  and a text node carries side bearings, so the ink stopped 56.3px short of the
  content column while the box measured a correct 1594. Every alignment in the
  footer is to the *ink*. `ui/Wordmark.tsx` is generated from the designer's
  `RECURSSIVE.svg` at 1dp — 845 B brotli, extents exactly 0..1594 x 0..196.
  Regenerate it, never hand-edit. Used in the footer and the nav lockup
  (146.2x17.9 there). No webfont: At Hauss is commercial, this is the only place
  it appears, and outlines cost no request, no licence and no FOUT.
- **`Intl.DateTimeFormat` rejects `dateStyle`/`timeStyle` alongside
  `timeZoneName`.** It throws `Invalid option : option` at runtime, not at build
  — the contact route 500'd on its first real submission while every invalid one
  redirected correctly, because only the valid path reached the formatter. Use
  explicit components (`day`/`month`/`year`/`hour`/`minute`) when you need the
  zone name.
- **A `<clipPath>` may only contain shapes, `<text>` and `<use>` — a `<g>` is
  ignored.** Wrapping the Contact artwork's paths in a `<g>` to carry a scale
  transform produced an EMPTY clip, and an empty clip renders nothing at all
  rather than falling back to unclipped. It looked exactly like a colour or
  z-index problem; forcing the fill to bright red and still seeing nothing is
  what separated the two. Put the transform on each shape instead.
- **An empty `<div>` generates no line box and collapses to 0px.** The binary
  diamond's taper emitted `''` for its first and last rows, which silently
  dropped them and left the field 31px short of the 707px it is drawn at. If a
  row must occupy vertical space, it needs content.
- **To pin a monospace advance to a measured value, use `calc(Xem - 1ch)`.**
  `1ch` *is* the advance of a monospace font, so subtracting it cancels whatever
  the system resolved and the `em` term sets the result. A fixed letter-spacing
  assumes a default advance — `-0.084em` assumed 0.6em, the font was 0.549em,
  and the field came out 41px narrow. Same trick applies anywhere a design
  measurement has to survive an unknown font stack.
- **A pale strip down one edge of the whole page means horizontal overflow, not
  a background bug.** Chased this a long way: it looked like a rogue border, then
  like the scrollbar track, then like `scrollbar-gutter`. It was the **nav**.
  The drawn 50px link gap is a 1920 measurement; at a 1029 viewport the lockup
  (214) + six links (~310) + CTA (115) + gaps came to ~953 against an 871px
  content column, so the nav pushed the document 10px wider than the viewport.
  The page then gained a horizontal scrollbar, and the moment it scrolled every
  full-bleed band slid off and exposed bare `#FAFAFA` canvas down the edge.
  Only visible between lg and the width where the nav finally fits, which is why
  it looked like a mystery band of viewport widths.
  **Diagnosis: `document.scrollWidth > clientWidth` is the tell.** Zero
  `scrollLeft` before scanning for the culprit — otherwise every rect is shifted
  by the scroll and the overflowing element hides from the scan. That cost a
  whole round of wrong answers here.
  **Any measurement taken from the 1920 frame is suspect at the narrow end of
  lg.** The nav gap now ramps 24px at 1024 to the drawn 50px at 1920.
- **`cover` stops overflowing vertically once the band's aspect drops under the
  image's.** Anything that offsets a background off one edge is silently relying
  on cover leaving spare pixels — and cover leaves *none* on the short axis by
  definition. The footer's desktop crop bottom-anchors by -20.95vw, which was
  fine at 1920 (band aspect 2.60, cover width-driven, 457px spare) and broke at
  1024x1036: band 1009x642, aspect **1.57** against the image's 1.6, so cover
  went height-driven, resolved to exactly 642 tall, and the offset pushed it
  down leaving **215px of bare page background** at the top of the footer.
  Tablets sit right on that 1.6 line, so this will not show up on a phone or a
  desktop. State the requirement instead of hoping cover meets it:
  `auto max(calc(100% + 20.95vw), 62.5vw)` — tall enough to anchor, or tall
  enough to cover the width, whichever is larger. **Test every full-bleed
  background at a ~1.5 aspect ratio, not just narrow and wide.**
- **`background-repeat` bites the moment you stop using `cover`.** `cover` can
  never leave a gap, so the default `repeat` was invisible — until `--mesh-size`
  let a surface declare its own size. On a 440px phone the footer mesh resolved
  to an 877.9px image in a 1065.3px band and tiled, drawing a hard seam straight
  across. `.mesh` is now `no-repeat`; the grain overlay still repeats, which is
  correct. **Any declared `background-size` needs `no-repeat` with it.**
- **A tall narrow band cannot use the drawn crop.** Below 768 the footer stacks
  and runs ~1060px tall, where `cover` is height-driven and shows the gradient's
  full height — putting the white core behind the text, at roughly 1:1 contrast.
  Fixed with `background-size: auto 152%` + `center top`: height-driven so it
  always covers, and 1/1.52 = 65.8% of the source shows, which lands the bottom
  edge where both frames put it (66.5% at 1920, 60.6% at 768) and keeps the core
  below the wordmark. Sizing by height is what makes it independent of how tall
  the band grows.
- **`justify-between` is wrong once a flex row wraps.** It stretches whatever
  landed on the last row across the full width — two items with a chasm between
  them. The footer's legal row now only gets it from 768 up, where it fits on
  one line.
- **`Logo.tsx` had a wrong viewBox for months.** It carried `1269.18 1517.68
  95.49 57.76`, a crop rectangle from the 100-tile lockup sheet, aspect 1.653.
  The mark is **1.497** — two independent designer exports agree (`footer.svg`
  at 160x106.9, `footer-mobile/Group.svg` at 120x80). So every instance rendered
  ~9% short. It only surfaced because the mobile footer's logo came out 72.6px
  where the frame says 79, which pushed the three columns 6.4px up. Regenerated
  from the official export; do not re-crop the viewBox.
  **Lesson: a viewBox lifted from a sheet is a crop, not the artwork's box.**
- **`figtree_v2.py` now emits `@x,y` for TEXT nodes and a bbox for collapsed
  vector runs.** It printed neither before, which is why the mobile footer's
  legal row and wordmark positions looked unobtainable. Re-run it rather than
  guessing; output goes to `scratchpad/v2/figspec/`, and note the frames are
  suffixed (`Home__768w_3.txt` is the current one, not `Home__768w.txt`).
- **The 768 frame IS the mobile design — it does not stack, so neither should
  we.** Its footer is three columns side by side at x79/321/585 across a 610
  content column (0 / 242 / 506), and that layout has to survive down to a
  phone. An earlier build treated 768 as a breakpoint to degrade *from* and
  stacked below it, which is a layout the designer never drew. Where the drawn
  type will not fit at phone widths, **ramp the type, do not change the
  layout** — `.footer-col` hits the drawn 22px exactly at 768 and eases to a
  14px floor by 360, which holds all three columns down to 320. Assume the same
  for every other 768 frame.
- **The legal row does not use body metrics.** Both frames set it on a 20px
  line-height (22/20 at 768, 16/20 at 1920) with -0.04em tracking at 768.
  Missing those made it ~8% wide, which is one line versus two at 610.
- **Column lists carry no `space-y`.** Both frames draw each column's items as
  ONE text node, so the rhythm is pure line-height — 4 lines in 132px at 768,
  96px at 1920. A 4px row gap compounded to 20px on a six-item column. With the
  gaps also corrected to the drawn 72/73 (they were 80), the desktop band came
  down from 764px to 733.7 — exactly the drawn 685 plus the 48px the two extra
  nav links cost.
- **The footer's three columns are placed, not distributed.** Their left edges
  are drawn at 0 / 767 / 1519 across the 1594 column; `justify-between` computes
  749.5 for the middle one even with the drawn content, so no distribution rule
  reproduces it. Encoded as `grid-cols-[minmax(0,767fr)_minmax(0,752fr)_max-content]`.
  The third track is content-sized on purpose — a fixed 75fr equals 75px at the
  drawn width and "Instagram" is 72.6, so it would overflow as soon as the
  column narrowed.
- **A live clock does not force the page dynamic.** Only rendering the time on
  the *server* would. A `'use client'` component that fills in on mount leaves
  the route `○ (Static)` — verified: the prerendered `index.html` ships
  `--:--:--`, and `/` still reports Static. This wrong belief is why the footer
  clock was dropped rather than built; the cost turned out to be 0.3 KB.
  Anything "live" on a static page belongs in a small client leaf, not in a
  rendering-mode change.
- **Any `new Date()` in a server component freezes at build.** It is baked into
  the prerendered HTML and stays there until the next deploy — the copyright
  year read the build year, so a quiet December would have shipped the wrong one
  all January. Assume every date on this site is a build artefact until checked.
  Fix: `useSyncExternalStore(subscribe, clientSnapshot, () => buildValue)` in a
  client leaf. It is the API for exactly this — a separate server snapshot means
  the prerender and the hydration render agree, so there is no mismatch to
  suppress and no setState in an effect (which the React compiler flags as a
  cascading render). Pass the build value in as a prop: calling `new Date()` at
  module scope inside a client component runs at build *and* in the browser,
  which is the mismatch you were avoiding, and it only surfaces in January.
  Proved by building with `fallback={2019}` — HTML said 2019, DOM said 2026,
  console clean. See `Year.tsx`.
- **Do not invent de-emphasis.** "Designed by Omnics" carried an `opacity-70`
  that exists nowhere in the file: all five items in that row are solid #FAFAFA
  with no opacity, group opacity or fill-opacity. Check the export before
  styling anything as secondary.
- **`--grain-opacity` was the photograph number copied onto meshes.** Photos
  carry their own grain and need almost none added; a 128x80 AVIF upscaled 15x
  measures sigma 0.06, i.e. nothing, so on a mesh the overlay supplies *all* the
  texture. 0.10 delivered 1.16 against a measured target of 7.21 — and the
  script's own comment already stated that target. Now 0.60. Keep
  `--grain-photo-opacity` separate; 0.10 is correct there and was measured.

---

## Verification

```bash
npm run check:overflow # every route x 13 widths, fails on horizontal overflow
npm run verify        # build + JS budget gate
npm run build:images  # regenerate photo renditions (needs the source folder)
npm run build:mesh    # regenerate mesh gradients + grain tile
```

Chrome is reachable through the chrome-devtools MCP — use it to look at pages,
not just measure them. The in-app Browser pane does not composite in this setup.

---

## Workflow runs (resumable in-session)

| Run ID | What |
|---|---|
| `wf_c8d672d4-05e` | Home design-fidelity audit |
| `wf_d12bdb77-51a` | Designer revision-2 verification |
| `wf_28384c02-839` | Tech-stack research |
| `wf_78d4bd02-a5c` | Original brand + design review |

Results persist at
`~/.claude/projects/D--johnn-Projects-recurssive/<session>/subagents/workflows/<runId>/journal.jsonl`
even if the session ends. Extract with `{"type":"result"}` lines.
