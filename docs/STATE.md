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
- **A live clock does not force the page dynamic.** Only rendering the time on
  the *server* would. A `'use client'` component that fills in on mount leaves
  the route `○ (Static)` — verified: the prerendered `index.html` ships
  `--:--:--`, and `/` still reports Static. This wrong belief is why the footer
  clock was dropped rather than built; the cost turned out to be 0.3 KB.
  Anything "live" on a static page belongs in a small client leaf, not in a
  rendering-mode change.
- **`--grain-opacity` was the photograph number copied onto meshes.** Photos
  carry their own grain and need almost none added; a 128x80 AVIF upscaled 15x
  measures sigma 0.06, i.e. nothing, so on a mesh the overlay supplies *all* the
  texture. 0.10 delivered 1.16 against a measured target of 7.21 — and the
  script's own comment already stated that target. Now 0.60. Keep
  `--grain-photo-opacity` separate; 0.10 is correct there and was measured.

---

## Verification

```bash
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
