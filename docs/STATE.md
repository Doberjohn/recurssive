# Where this project is

Living handoff. Update it when a phase closes or a decision is made. If a
session ends unexpectedly, start here.

**Last updated:** 2026-08-07

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
| 4 — Pages | 🔄 Home built and audited (187 findings, systemic + high fixed, responsive scale in). Our Process, What we do best and Industries we serve each rebuilt from their own standalone export — see below. Remaining: the **768/mobile** pass on all three (designs pending from the owner), then mid/low-tier polish. Then: Capability template → Capabilities → Cases/Case → About → Blog/Post → Contact → Legal → error states |
| 5 — SEO polish, OG images | not started |

**Measured state:** JS 125.0 KB against a 152 KB ceiling (27.0 KB headroom) —
down from 134.7 on 16.2, with no code change. Every route statically
prerendered. CI green.

### What we do best / Industries we serve — rebuilt from their own exports

The owner supplied `What we do best.svg` (1920x719, 9.8 MB) and
`Industries we serve.svg` (1920x935, 44.6 MB) in `Recurssive Folder/Recurssive
Folder/`. Strip the base64 rasters with the same `indexOf` scan the Our Process
note describes and they are 1.07 MB and 0.63 MB of readable geometry. Both land
exactly on the Home frame: the first at y1279.75, the second at y2116.

Everything below is measured off those files and re-measured on the build at
1920. The owner then supplied `What we do best mobile.svg` (768x1357),
`Industries we serve mobile.svg` (768x835) and `our process mobile.svg`
(768x1320); **the narrow pass is in too** and is recorded further down.

**What we do best** (ServiceIndex.tsx, page.tsx):

- **The service names carry NO letter-spacing.** `.t-item` sets -0.05em, which is
  right for its other users and wrong here. Proof rather than reading: the drawn
  boxes are 221/196/188/208/209/267 and canvas advance widths at tracking 0 are
  219.6/195.8/187.3/208.4/209.5/264.6 — every one within 2.4px — against
  200.4..239.0 as built. The 768 frame agrees (Inter Bold 36/100%, no `ls`).
- **The index is a superscript, not a centred item.** Its box is at row+28, level
  with the description's first line; `items-center` put it 11.6px lower. Now
  `lg:self-start lg:mt-[27px]` — 27 and not 28 because the drawn offset is from
  the rule's own y and its 1.5px stroke straddles that.
- **The rules are 1.5px** and the 100px pitch is line to line, so the row is
  98.5. Chrome snaps border widths to whole DEVICE pixels: at 1x the rule is used
  at 1px and the pitch measures 99.5, at 2x it is exactly 100. Do not re-tune the
  98.5 from a 1x measurement.
- The index column is 28, not 32 — which is what put the name at x195 and the
  description at x526 instead of the drawn 191 and 522.
- **The preview card must outrank the rows below it.** It is 344 tall on a 100px
  row and the file paints it over every rule it crosses. Each `<li>` is
  `relative` with z-index auto, so rows N+1 and N+2 painted their rules straight
  across it. `hover:z-10 focus-within:z-10`.
- The active band carries Figma's Noise effect, spelled out in the export as
  black at 25% over ~51% of pixels. That is a per-pixel sigma of 12.5% of the
  value; the grain tile through `overlay` perturbs by 2*0.102*opacity, so it
  wants 0.61 — the same 0.60 the mesh surfaces already use. `.grained` with
  `--grain-photo-opacity: 0.6`. Residual: the file's noise also DARKENS the band
  ~13% on average, which a mean-preserving overlay does not reproduce.
- The one card the design draws uses `kreit-xRuG2k1sjaw-unsplash`, which the
  pipeline calls **`case-hero`**. Row 3 had `home-texture` (the hero photo).

**Industries we serve** (page.tsx, `IndustryMark` in ProcessFlow.tsx):

- **Two full-bleed 1px #A59BFF rules were missing entirely**, at y302.5 and
  y733.5. They are in the 1920 frame (Line 120/121), the 768 frame (Line
  121/122) and the export, so they are content and not a guide.
- **The marks were wrong in every respect except their 75px height.** The file
  builds them the way it builds the process shapes — a mask of 2px STROKED
  outlines with a meshnoise rect behind — so what you see is gradient in the
  shape of three outlines, not an accent border. Startups is three 101x45
  ellipses stacked VERTICALLY (they were 45x101 offset sideways, i.e. rotated
  90 degrees and stacked on the wrong axis); SMBs is three TRAPEZOIDS (100.5
  across the top, 67.1 at the bottom), not rectangles; Enterprise is three
  OUTLINE triangles, not filled ones. The group boxes are **101 / 131 / 132** —
  not one size. Gradient identified as **`--mesh-4`** at RMSE 1.02 against a
  next-best of 41.35; first use of that token in the build.
- **The scrim runs the wrong way.** Drawn: #0F0F0F at 0 / 0.5 / 1.0 over 0 / 30%
  / 100%, whole fill at 0.75 — clear at the top, darkest at the bottom. It was
  70% at the top and 55% in the middle.
- **The photograph is stored greyscale** (all three channel means and stddevs
  116.85 / 74.80), the same as the Process band's copy. It was in colour.
- **The crop is not cover.** The pattern transform draws the 4096x2731 image
  2309x1539.5 at (-387, -324.4) on a 1922x935 rect: cover x1.2015, right edges
  coincident, 53.7% vertically. Reproduced as `object-[100%_53.7%]` +
  `origin-[100%_53.7%] scale-[1.2015]` — scaling about the same point the
  object-position anchors is what makes it come out at the drawn offsets.
- **The top row is placed, not halved**: the heading's box is 255 wide, which is
  what breaks it to "Industries / we serve", and the lead starts at x1147. So
  984 | 610 with no gap, not `grid-cols-2`'s 777 | 777.
- **The three columns are placed too** — 163 / 751 / 1326, i.e. 588 | 575 | 431,
  which no gap rule reproduces (same situation as the footer). `gap-12` gave 499
  columns and put columns 2 and 3 forty-one and sixty-eight px left of drawn.
- Body copy is **18px/27**, the one place on the page the designs step body copy
  up from `.t-body`'s 16.
- The industry columns are drawn as **five** lines, which is the long lorem, not
  the short one every other block uses. With the short one the band came out 57px
  under its drawn height. `LOREM_LONG` in page.tsx.

**Contrast — one marginal fail, and it is the design's.** Measured with the type
stripped, on the export and again on the build's own composite:

| element | drawn scrim | + the departure | needs |
|---|---|---|---|
| **heading** | **2.61** | **3.15** | 3.0 |
| lead paragraph | 5.92 | 6.87 | 4.5 |
| name "Startups" | 5.72 | 5.72 | 3.0 |
| bodies 1 / 2 / 3 | 6.68 / 10.27 / 13.08 | same | 4.5 |

So the drawn scrim fails on exactly one element, by 0.39. `page.tsx` carries a
second scrim layer — 25% at the top, fading out at the same 30% the drawn
gradient uses — marked as a departure. It is one line and nothing depends on it;
delete it if the owner would rather have the drawn scrim exactly.

**Designer-side, still open for the owner:**

1. **The Enterprise mark disagrees between sources.** The `.fig` has it 146x100
   (polygons 116x100); the export renders it ~129x74. Startups and SMBs match
   both sources exactly (101x75, 131x75), so the export reads as a later
   correction. Built from the export.
2. **The SMB mark's offsets are 12 and 28px** where the other two use 15 and 30.
   Reproduced verbatim, which is what makes that group 131 wide rather than 133.
3. **Row 1's description node in What we do best** has a collapsed 19px box and a
   100% line-height where rows 2-6 have 43px auto boxes, so it renders 1px lower
   and 2px shorter and is the only row off the 100px grid. Not reproduced.

### The 768 pass — three more exports, and one of them is a carousel

The narrow frames are not reflows of the wide ones. Each is a different
composition, and two of them change what is on the page at all.

**What we do best** (768x1357) is TWO lines per row, not four stacked:
`(0N)` and the name share the first at x79 / x120, the description takes the
second AT THE GUTTER rather than indented to the name, and the arrow — which
was hidden below lg because no narrow drawing existed — sits at x630, inset 16
from the column. Row pitch 213.67 (1282/6). The arrow is not the 1920 one
scaled: Figma expanded a 5.06px stroke there against 4px here and the head's
arms grow faster than the shaft, so the box goes 37.2x29.85 -> 42.78x37.75, a
different aspect. Both outlines are the file's own. The `lg:contents` wrappers
that build those two lines generate no box at lg, so the five drawn columns are
the link's own flex children again.

**Industries we serve** (768x835) drops the lead paragraph entirely — not
shortened, absent — and shows ONE industry with an arrow either side. It is a
carousel. Built as a scroll-snap track, so a swipe is native and free; the
arrows are anchors to the neighbouring slides, wrapping at both ends so both are
always live as drawn. `CarouselTrack.tsx` is the only client JS on the page
besides the contact button, 0.1 KB, and it exists for one measured reason:
fragment navigation aligns the target's TOP to the viewport, and a slide is
700px in a 667px viewport, so every press dragged the page down 103px.
**`scrollIntoView({block: 'nearest'})` does not fix that** — "nearest" only means
"do nothing" when the element is FULLY visible, which a slide never is. Scrolling
the track itself is the only version that cannot touch the page. With scripting
off the anchors still work.

**Our Process** (768x1320) settles the layout STATE.md listed as drawn-but-not-
built: index / name / body down the left at x79 / x123 / x79, shapes beside them
flush right at x429..689, uniform 128 gaps. Three things worth keeping:

- The four shapes' mesh specs are IDENTICAL at both breakpoints — same gradient,
  same size, same offset, same rotation. Only the band's own crop changes.
- The band's mesh is a different WINDOW at 768, not the same one resized:
  `auto max(102.77%, 62.5vw)` at `49.51% 17.95%`. Holding the wide values showed
  0..34.5% of the image where the file shows 32.6..68.
- The photograph keeps the 97.33% vertical anchor but is **227.7% of cover**
  there, because cover flips to height-driven at that aspect and would show a
  904px-wide slice of a 768 band.
- Two columns only from **sm (640)**, not all the way down. The shape column is a
  fixed 266 and the content column is 327 at 375px, which leaves 61 for the text.
  Ramping type cannot fix a fixed-width graphic; the shapes' clip-paths are px
  `path()` values, so making them scalable means SVG clipPaths in
  objectBoundingBox units. Until then it stacks below 640.
- **GAPS is now a floor, not a fixed height**, and the connector grows into the
  rest. The drawn rhythm has no slack: the file's 768 step body is 88 characters
  in a 321 column, ours is 123, which is five lines instead of three, and with a
  fixed gap step 2's index landed 22px inside step 1's last line.

**The narrow-only scrim on the Process band is deleted**, which is exactly what
this file said should happen once the two-column layout landed. Measured on the
export with the type stripped, at the drawn 1320 height:

| element | was (stretched band, with scrim) | now (drawn band, no scrim) | needs |
|---|---|---|---|
| heading | 5.12 (1.54 without) | **4.53** | 3.0 |
| intro | 4.94 (1.72 without) | **4.66** | 4.5 |
| step names | 4.89 (2.39 without) | 4.58 – 11.05 | 3.0 |
| bodies | — | 8.34 – 12.49 | 4.5 |
| **(01) / (02)** | 1.12 / 2.37 | **2.55 / 4.49** | 4.5 |

So what is left is the accent index labels, at both breakpoints, which is the
same design-level question §"Contrast" already records for 1920. Everything else
passes on the drawn band with no help. Re-measured on the build's own composite
at 375 (where the band stacks and runs 2328 tall): heading 3.74, intro 4.79,
name 5.58, body 6.84 — and (01) at 2.59.

**Three text colours were wrong, and two of them are the "do not invent
de-emphasis" lesson again.** The Process intro is #FAFAFA at 768 and #EAEAEA at
1920 (the design really does differ); it was silver at both, which is what put
the 375 intro at 4.16. The Process step bodies and the Industry bodies are drawn
solid #FAFAFA at BOTH breakpoints and were `text-cloud/85`. Check the export
before styling anything as secondary.

Verified after: `npm run verify` green at 125.1 KB (+0.1 for the carousel), and
`npm run check:overflow` clean across 17 routes x 13 widths.

**Known and copy-driven, not geometry:** the 768 bands run taller than drawn
because the file uses SHORTER placeholder strings at 768 than at 1920 for the
same elements (process bodies 88 characters against 123, the process intro 109
against 123) and we ship one string. The Process band comes out 1477 against a
drawn 1320 and its gaps grow 173/178/145 against a drawn 128. Geometry is exact
— every column edge, the 128 floor, the two-column split — so this closes by
itself when real copy lands.

**The Process step bodies are 18/27 at 1920 too**, not `.t-body`'s 16/24 — the
same step up the Industry columns take. Measured off `Our Process.svg`: the ink
is 667.88x71.98 over three lines, so a 26.94 line-height, and the figspec agrees
at 18px. That makes two of the three body blocks on this page 18 at 1920 and
only the service descriptions 16, which is what `.t-body` was measured from.
After it the band is 1200.4 against a drawn 1201, with gaps of exactly
123 / 85 / 75.

**Still open:** `.t-body`'s 22 at 768 against a drawn 24 remains as
PageHeader.tsx already records — 24 ls-3 is the dominant narrow body size across
all frames (99 uses) and 22 was measured off Home and Contact. One token,
flagged, not forked.

### The type scale RAMPS below lg — it used to hold

Every `.t-*` token applied the drawn **768** value flat from 1023 all the way
down to 320, and 768 is a tablet frame: 22px body, 24px form labels, 36px item
names and a 42px section heading are drawn against a 610px column and were
landing on a 327px one. Everything read a size too large on a phone. Three
classes already ramped (`.footer-col`, `.footer-legal`, `.hero-headline`); the
other nine now use the same construction — hit the drawn 768 value exactly at
768, ease to a phone value by 360, clamp at both ends.

The phone values are the 768 ones at a **uniform 0.727**, which is what "16px
body" resolves to. Scaling every step by one factor is the point: it keeps the
design's own hierarchy instead of flattening it.

| | 360 | 768 | 1920 |
|---|---|---|---|
| hero / section / step | 36 / 30 / 28 | 48 / 42 / 40 | 72 / 48 / 48 |
| item / question | 26 / 19 | 36 / 26 | 32 / 18 |
| body / form | 16 / 16 | 22 / 24 | 16 / 16 |
| index / label | 15 / 15 | 20 / 20 | 14 / 18 |

Nothing at 768 or at lg moved — verified: section 48, item 32, step 48, index 14
at 1920, and the whole 768 pass re-measured unchanged.

**Two things the ramp broke, both worth knowing:**

- **A px `max-width` tuned to one font size does not survive a ramp.** The
  Industries heading had `max-w-[196px]`, the drawn box at 42px, and re-wrapped
  to "Industries we / serve" as soon as the type reached 30. It is `5em` now —
  the measure only has to land between "Industries" (4.43em) and "Industries we"
  (5.73em), and in em it keeps doing that at every size.
- Anything else measured in px against the 768 type is in the same position.
  Check before assuming a drawn offset still holds at 375.

### The Process shapes are fluid now, and the flowchart still stacks on a phone

`clip-path: path()` has no relative units, which is the single reason the
two-column narrow layout could not go below 640. The two outlines that need one
are now SVG clipPaths in **objectBoundingBox** units, and the whole shape column
derives from one variable:

```
--sw: min(43.61cqw, 266px)      /* 266 of the drawn 610 column */
```

Every box, radius, padding, gradient offset and the text block's own vertical
anchor is `calc(var(--sw) * n/266)`. At 768 --sw resolves to exactly 266 and
every one of them returns the drawn pixel value; the cap holds 768..1024 drawn.
`container-type: inline-size` on the row is what makes `cqw` mean the content
column rather than the viewport.

**It is two columns at EVERY width**, including 320. Getting there took three
things beyond making the shapes scalable, each found by measuring rather than
by reasoning:

- **The share ramps; it is not a flat 43.61%.** Proportional scaling is the
  obvious answer and it does not work: at 375 it leaves a 148px text column and
  eight ~20-character lines. The graphic can give up more than the text can, so
  `--sw: clamp(60px, calc(50.18cqw - 40.1px), 266px)` — 266 at the drawn 610
  column, 124 at 375, 96 at 320. Text column 164 at 375 against 148.
- **The label sizes with the SHAPE, not the viewport.** `.t-label` is gone; a
  20px label in a 115px diamond is wider than the diamond at the height it sits
  at, and gets clipped by its own outline. It is
  `max(11px, calc(var(--sw) * 20/266))` — the drawn 20 at 768, 11 on a phone,
  and one line in every shape at every width down to 375 (two at 320, which the
  shapes are tall enough for).
- **`--txt-top` needs a floor.** The clearance between one step's text block and
  the next IS `--txt-top`, because both are centred on their own shape and the
  row is as tall as the taller of the two columns. `shapeH/2 - 25` goes to 2.5px
  at 375 and NEGATIVE at 320, so consecutive blocks touched and the first one
  rode up into the intro. `max(20px, ...)` holds a 20px clearance everywhere and
  changes nothing at 768, where the term is already 28.

Verified across 320 / 375 / 440 / 768 / 1920: no collisions, labels inside their
shapes, and 1920 still exactly 262x106 with 123 / 85 / 75 gaps.

**Trap:** `h-full` on the connector line silently collapsed it to nothing the
moment GAPS became `min-height` instead of `height`. A percentage height
resolves against the parent's SPECIFIED height, and the connector's is now
`auto` with a floor — so `h-full` computed to `auto`, and a span with no content
is 0 tall. `flex-1` is indifferent to how the parent got its height.

### Our Process — rebuilt from a standalone export

The owner supplied `Our Process.svg`, a 1920x1201 export of that one section,
in `Recurssive Folder/Recurssive Folder/`. It is **157 MB**, because all five
surfaces are embedded base64 rasters; strip `base64,…` to a marker and it is
825 KB of readable geometry. Do not try to open it directly, and do not regex
the blobs — one match is 35 MB and blows the regex engine's stack. Scan with
`indexOf`.

It settled three things the figspec could only render as `<N vector path(s)>`,
and the answers are now in ProcessFlow.tsx:

- Each shape has its **own** gradient at its own crop — mesh 2 / 7 / 3 / 12,
  top to bottom. All four matched files already in the pipeline at **RMSE 0**
  against a next-best of 18-56, so nothing new had to be generated. This
  retires `.bg-mesh-placeholder` for this section; the class is still in
  theme.css and still marked interim for whatever else uses it.
- The connector's arrowhead is a **chevron**, 2px accent with round caps — not
  the solid cloud triangle that was standing in, and not absent as the earlier
  note in ProcessFlow.tsx concluded. There are also 6px accent dots on each
  shape's bottom edge, which were missing entirely.
- The step-name rule is **3px #A59BFF**, at both breakpoints (the 768 frame's
  "Line 116" agrees). It was 1px silver/60.

Also corrected: the row grid (names were 32px right of drawn, shapes 107px),
the band's own padding, and the photograph, which the file stores **greyscale**
— identical frame otherwise, RMSE 2.83.

**One thing is deliberately NOT done, and it is an open question for the owner:**

1. **The Fibonacci spiral.** The export draws it inside the band, 742x1200
   flush right, ~20 arcs at #FAFAFA 0.5px. The Home 1920 frame parks the same
   construction *outside* the artboard at x1920, rotated the other way. The two
   sources disagree; the export is newer and is named for this section, so it
   probably wins, but it is a new decorative element rather than a correction
   and was left out pending a decision.

~~2. The 768 layout is not the drawn one.~~ **Done** — `our process mobile.svg`
   arrived and the two-column layout is built. The narrow-only scrim is deleted
   and the contrast re-measured. See the 768 pass above.

### Contrast: exactly one element type, and it is the design's

**Measure with the type hidden.** Sampling a text element's bounding box while
the glyphs are in it averages the light glyph pixels into the "background" and
reports a ratio far worse than reality — it produced 2.09:1 for a heading that
actually measures 3.58:1. For the file, strip the text paths (top-level `<path>`
with a text fill and `d` longer than 500 chars — that threshold clears the 418ch
chevrons and the 355/277ch mask outlines) and re-render. For the built page,
`visibility: hidden` keeps layout and gives the same thing.

Measured that way at 1920, on the file and on the build:

| element | file | build | needs | |
|---|---|---|---|---|
| heading "Our Process" | 3.58 | 3.53 | 3.0 | pass |
| intro paragraph | 4.46 | 4.26 | 4.5 | **marginal fail** |
| **"(01)"** | **2.94** | **2.58** | 4.5 | **fail** |
| **"(02)"** | **4.19** | **3.91** | 4.5 | **fail** |
| "(03)" / "(04)" | 5.37 / 6.29 | 4.65 / 5.26 | 4.5 | pass |
| step names | 6.14–12.37 | 5.34–10.38 | 3.0 | pass |
| body paragraphs | 7.47–13.18 | 4.87–11.33 | 4.5 | pass |
| shape labels | 4.92–6.51 | 4.98–6.69 | 4.5 | pass |

So it is **the accent index labels**, and marginally the intro — nothing else.
The cause is structural, not a crop that can be nudged: `#A59BFF` has a relative
luminance of 0.385, so against the mesh's upper-left quadrant it cannot reach
4.5:1 at any crop. It only passes further down the band, where the gradient goes
dark — which is exactly what the table shows happening between (02) and (03).

The build reproduces the file (every row within 0.4, same pass/fail pattern), so
this is the owner's call, not an implementation bug. Three ways out: darken the
band's upper-left, use a darker accent for these four labels only, or accept it
— they are decorative numbering that the adjacent step name already conveys.

---

## The contact form

Posts to `/api/contact`, a Route Handler — **the only server function in the
deployment**. Every page is still prerendered; CI asserts that and now exempts
`/api` specifically, so a page going dynamic still fails the build.

A plain form POST with a 303 redirect, not `fetch()`. That is why it works with
scripting off and cannot be resubmitted by a refresh. Outcomes are two
prerendered pages: `/contact/thanks` and `/contact/problem`. A banner on
`/contact` was rejected — reading a query string would make the page dynamic.

**It ships 0.6 KB of client JS, and only that** — `SubmitButton`, nothing else.
The form was 0 KB until a measurement changed the answer: a valid submission
spends **~394ms server-side on the Resend call** before the 303 is issued, plus
the visitor's own network. Nothing acknowledged the click for the best part of a
second, and a second click sent a second email, because a native POST has no
double-submit protection. Do not "restore" it to 0 KB without solving both.

Three things in that component are load-bearing:

- It listens for **`submit`, not `click`**. `submit` fires only after the
  browser's constraint validation passes, so an invalid form never leaves the
  button disabled behind a validation bubble.
- Disabling happens via React state, which applies *after* the handler returns —
  by then the browser has already begun the submission. Setting `disabled`
  synchronously inside the handler can cancel it. Verified by submitting for
  real and landing on `/contact/thanks`.
- It resets on **`pageshow` with `persisted`**. Back-navigation restores the page
  from bfcache with the JS heap intact, so without this the button comes back
  stuck on "Sending…" and permanently disabled.

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

- **Next.js 16.3.x App Router**, fully static, `cacheComponents` off, Tailwind v4,
  MDX in repo, Vercel Pro `fra1`. Reasoning in `KNOWLEDGE-BASE.md` §5.
- **TypeScript stays on 5.x.** Next 16.3 itself type-checks fine with TS 7,
  but `eslint-config-next` ships at the same version and depends on
  `typescript-eslint`, which hard-throws on TS >= 7 — so `npm run lint` cannot
  run. Tried end to end and reverted; the win was only ~3.6s per build. Revisit
  when TS 7.1 ships the new compiler API and typescript-eslint follows
  ([typescript-eslint#10940](https://github.com/typescript-eslint/typescript-eslint/issues/10940)).
- **Cloud White is `#FAFAFA`**, not `#FDFDFD`.
- **Purple/blue palette is deliberate** and measured as differentiated.
- **"Omnics Digital Agency" is the designer's credit**, not a Recurssive descriptor.
- **Zero Figma components is accepted** — the component layer lives in code.
- **Not `next/image`** — build-time `sharp` pipeline, custom `<Picture>`.
- **/cases is unlinked, not just noindex** — there is not enough real work to
  show. The nav, the footer's Contents column and the "Related work" section on
  `/capabilities/[slug]` all gave up their links, and the detail routes left the
  sitemap; `/cases/[slug]` was the miss, since it was indexable AND sitemapped
  while the index was already noIndex. Both now serve `noindex, nofollow`, and
  the routes still return 200 on a direct URL so the design work stays
  reviewable and `check:overflow` keeps covering them. `src/lib/site.ts` lists
  the five things that move back together; `robots.ts` records why this is not a
  `Disallow` (it would block the fetch, so the `noindex` would never be read).
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

- **The preview pane is a HIDDEN document, and it makes working code look
  broken.** `document.visibilityState` is `"hidden"` whenever the pane is not
  displayed, and three separate things stop working as a result. This cost most
  of a session before it was named, across three different features:
  - **`requestAnimationFrame` never fires.** Measured: 0 rAF callbacks against 1
    `setTimeout`. Anything deferred to a frame simply does not run, so a pointer
    parallax that was entirely correct read as dead.
  - **CSS transitions never advance.** `getComputedStyle` returns the frozen
    START value, so a `transition-colors` element reports its old colour forever.
    Disable the transition on the specific element before reading, and note that
    disabling it on an ancestor does nothing.
  - **`:focus` does not match at all** while `document.hasFocus()` is false, so
    focus styles report as missing. A real click via the `computer` tool restores
    document focus; `element.focus()` does not.

  Before concluding that an interaction is broken here, check
  `document.visibilityState` and `document.hasFocus()`. If the behaviour depends
  on a frame, a transition or focus, it cannot be observed in this pane — verify
  the CSS by setting its inputs by hand and ask the owner to confirm the live
  behaviour, rather than reporting a bug that is not there.

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
