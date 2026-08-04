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
- **The design canvas contains off-canvas debris.** The 255px RECURSSIVE node at
  x8887 is not content — it is not a missing hero element.
- **Measuring that a component is built correctly is not the same as checking it
  is the right component.** Look at the rendered page.
- **Passing `hidden` via a component's className prop does not beat a `display`
  utility in its own base string** — same layer, source order decides. Wrap the
  component instead.
- **`max-width` is a border-box value.** With padding-inline, gutters eat the
  column: the 1594px content width was only reachable at exactly 1920px.
  `.container-content` now sizes by `width: min(...)`.

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
