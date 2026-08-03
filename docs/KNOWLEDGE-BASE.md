# Recurssive — Project Knowledge Base

**Last updated:** 2026-07-31 · **Revision 2** (supersedes the 2026-07-29 edition)
**Sources:** `Recurssive Branding Presentation.pdf` (241pp) · `Recurssive Web Design.fig` (31 frames) · `Recurssive Folder/` (~1.7 GB design assets)
**Status:** Brand book complete. Web design has two breakpoints (1920 + 768) but is **not build-ready**. Build not started.

> Provenance: every number, hex and quote below was extracted directly from the source files — the
> PDF via full-page render + text layer, the `.fig` via a Kiwi decode of its node tree (32,833 nodes,
> byte-exact). Nothing is estimated. Findings that were raised and then *disproved* are recorded in
> §13 so they are not re-raised.
>
> **Deck page numbers changed in this revision.** Old p27+p28 merged into new p27, and old p229
> expanded into new p228–230. So new *n* = old *n+1* for n∈28..227, and old *n−1* for n∈231..241.
> **All page references in this document use the NEW (241-page) numbering**, verified by content search.

---

## 1. Source material — hard facts

| | Brand deck | Figma file |
|---|---|---|
| Size | 141 MB | 397 MB |
| Content | **241 pages** @ 1440×851 pt | **32,833 nodes**, 31 top-level frames |
| Canvas | — | **41,200 × 10,833 px**, canvas renamed "Website" |
| Embedded assets | — | 74 images |
| Breakpoints | — | **1920 (×16) and 768 (×15). Nothing else.** |

**Deck section map (new numbering)**

| Pages | Section |
|---|---|
| 1–6 | Introduction, Alignment Map, Challenges |
| 7–15 | Substance — Purpose (9), Vision (11), Mission (13), Core Values (15) |
| 16–33 | Positioning — Competitor Colors (19), Onliness (25), What Are We (26–27), What Do We Do (28–29), Value Ladder (31), Domain/Handle (33) |
| 34–42 | Personality — Archetype (36), Sliders, Brand Voice (39–40) |
| 43–50 | Tagline + deconstruction (final on 50) |
| 51–112 | Messaging — Quotes, Brand Philosophy, Recursion thesis (Engine of Reality on 112) |
| 113–221 | Visual Identity — Logo (114–138), Application matrix (139–163), Colors (164–172), Gradients (173–177), Fonts (178–181), Patterns (182–191), Icons (192–196), Grids (197–203), Photography (204–221) |
| 222–230 | Verbal — Recurssive Language **Pt.1–Pt.8** (now includes 404 / 500 / no-content copy) |
| 231–240 | Presence — Applications, Signage |
| 241 | Thank You |

**Design asset folder** — `Recurssive Folder/Recurssive Folder/`

| Folder | Contents |
|---|---|
| Logo | 9 files (Logo 01, Lockups, Patterns × .ai/.pdf/.svg) |
| Icons | Flowchart Icons Outline.svg, Solid.svg |
| Grids | Grid 1–10 .svg |
| Fonts | **Inter + Open Sans only**, both with OFL.txt |
| Mesh | 12 meshnoise PNGs + a .docx containing one URL |
| Images | 183 files, 476 MB (159 Unsplash, 2 Pexels, 22 "Tony Noel") |
| Website Assets | Vectors .ai/.pdf/.svg + a 414 MB .psd |
| Card, QR, Signature | Business card, QR codes, email signature |

---

## 2. SETTLED — Brand strategy

**Purpose (p9)** — *"we create to inspire others to create"*
**Vision (p11)** — *"Creativity driven by people, efficiency driven by tech."*
**Mission (p13)** — *"crafting custom web & app experiences that help people"*

**Tagline (p50)** — **"Feel. Form. Function."** (F³)
Emotion & Experience → *Feel*, Visuals & Composition → *Form*, Utility & Performance → *Function*.

**Core Values (p15)** — **Reliability, Empathy, Performance, Foresight, Creativity**, cascading into people level (Growth, Responsiveness, Timeliness) and experience level (Understanding, Communication). Carried to the About page in order, in a `#4813D0 → #4212BF → #A59BFF` gradient text fill.

**Category descriptor** — **"Visionary Web & App Studio"** (p27). *"Omnics Digital Agency"* in the deck footer is **the designer's studio credit**. Settled.

**Archetype (p36)** — 80% Creator / 20% Sage. Drivers Originality/Imagination; fears Familiarity/Duplication.

**Brand voice (pp39–40)** — *"50% tech, 50% non-tech language"*, *"50% logic, 50% emotion"*, pinned to Serious and Respectful: *"Seriousness stems from reliability"*, *"Respect stems from empathy"*.

**Recursion thesis (pp89–112)** — the intellectual core, landing on p112:

> *"Recursion is the engine of reality. It is feedback, memory, iteration. It is the way a river carves deeper channels each season, the way a sunflower spirals according to yesterday's light, the way galaxies wind themselves through dark matter scaffolding. These are living systems that learn as they move."*

**Market** — **Global.** (Supersedes "mainly in Greece" in the p25 Onliness Statement.)

**The offer (p29)** — four pillars, 19 services:

- **Consulting** — React Native Performance Optimization, New Architecture Migration, React Development, React Native Trainings, Expo Development, **Next.js Development**, React Native Upgrades
- **Enterprise Solutions** — Migration to React Native, Monitoring & Observability, Release Process Optimization
- **Product Dev** — Desktop App Development, Web App Development, Mobile App Development
- **AI Engineering** — On-device AI, Generative AI App Development, (+ "AI Vibe Coding Cleanup")

**Verbal assets (p33, p239)** — `recurssive.com` · `@recurssive` · `info@recurssive.com` · `john@recurssive.com` · (+30) 698 950 2436

**Verbal lines (pp222–230)** — now **Pt.1–Pt.8** with no duplicates: *"If you've seen it before, it's probably Recurssive"* · *"Got an idea that keeps coming back?"* · *"Tech we use on repeat"* · *"We create in circles"* · *"Stay in the loop"* · plus new Pt.6/7/8 supplying **404, 500 and no-content copy**.

**Spelling** — double-s "Recurssive" correct on all 241 pages and every frame. Verified.

---

## 3. SETTLED — Visual system

### 3.1 Palette (deck pp164–172) — authoritative, corrected in v2

| Name | HEX | RGB | CMYK | Role |
|---|---|---|---|---|
| **Cloud White** | **`#FAFAFA`** | 250,250,250 | 0,0,0,2 | Light ground — **changed from `#FDFDFD` in v2** |
| Silver Grey | `#EAEAEA` | 234,234,234 | 0,0,0,8 | Chips, dividers, checkbox fill |
| Storm Grey | `#999999` | 153,153,153 | 0,0,0,40 | *Effectively retired — see §7* |
| Phantom Black | `#0F0F0F` | 15,15,15 | 0,0,0,94 | Primary ink, dark bands, scrims |
| Flow | `#A59BFF` | 165,155,255 | 35,39,0,0 | Accent |
| Inception | `#4813D0` | 72,19,208 | 65,91,0,18 | Primary action fill |
| Gravity | `#360D9D` | 54,13,157 | 66,92,0,38 | Accordion glyph |

The summary board is now **p172** and every caption matches its swatch. Zero `#FDFDFD` remains in the deck. The fix propagated into the assets (`Logo Lockups.svg` line 4 = `#fafafa`).

**Undocumented eighth token:** `#6B6B6B` is used **369×** across 29 of 31 frames and appears **zero times** in the deck. It is the de-facto secondary text colour and passes AA on `#FAFAFA` at **5.11:1**. **Add it to the board or remove it from the file** — they currently describe different systems.

### 3.2 Gradients

- **Active-row** — `#966FFF 0% → #2805C3 34% → #4616E3 69% → #7856EC 100%` + NOISE (radius 4, opacity 0.25)
- **Text/metric** — `#4813D0 → #4212BF → #A59BFF`
- **Surfaces** — raster `meshnoise-gradient-*`, 30 instances

Deck pp173–177 are **pixel-identical to v1**. Still no stops, angles, grain opacity or blend mode. See §7.

### 3.3 Colour differentiation — verified, settled

Measured all 301 competitor swatches on p19: Blue 32.2% · Red 16.3% · Orange 14.6% · Green 8.3% · Black 7.6% · Yellow 6.6% · Cyan 4.3% · **Purple/violet 4.3%** · Pink 3.0% · Grey 2.7%.

**Only 20 of 301 (6.6%) sit in Recurssive's hue window (240–265°).** Brand hues: Flow 246°, Inception 257°, Gravity 257°. The crowded blue mass is *below* 240°. **Purple/blue is the brand — settled, do not re-raise.**

### 3.4 Typography

| Face | Role | Status |
|---|---|---|
| **At Haüss** | Wordmark only | Logo ships **fully outlined** (6,586 paths, no font dependency) — confirmed. **Licence still unresolved, see §9.** |
| **Inter** | Headlines | Semi Bold 340, Medium 314, Regular 88, Bold 75 |
| **Open Sans** | Body | Regular 728, SemiBold 82, Bold 16 |

No non-brand faces across 1,643 text nodes.

**There is no defined type scale.** 30 distinct sizes are in use, nine fractional (255.4, 147.7, 59.9, 57.3, 38.5, 19.9, 18.1, 16.8, 10.1); ten appear in a single file only. Deck pp178–181 give glyph specimens and weight names — no sizes, no line-heights, no tracking. **A scale must be authored during the build.**

### 3.5 Logo — "Reflow" (pp114–138)

A recursive flowchart abstracted, rotated 90°, shown to have **D₂ dihedral symmetry**, re-proportioned on a golden-ratio grid, then broken with a fish-eye distortion. The enlarged central diamond is justified as the algorithm's **base case** (p123).

**Application matrix (pp139–163)** — 5 configurations × 5 colorways, complete. The delivered `Logo Lockups.svg` **exceeds it**: 100 tiles = 5 configurations × 20 colorways.

### 3.6 Patterns, icons, grids, photography (pp182–221)

- **Patterns** — 3 tileable half-drop tiles, delivered as real SVG `<pattern>` defs
- **Icons** — 28-glyph ISO/ANSI flowchart vocabulary, outline + solid, complete
- **Grids** — 10 armatures, all 10 delivered
- **Photography** — five categories: Humans/Teams/Faces · Mirrors/Kaleidoscopes · Fish Eye · Tech/Lifestyle · Brutalist B&W
- **"Signs of Reality" (pp210–221)** — Grain, No Cap Text, Greyscale, Humanist, Grids, Mesh Grads, Marginalia, Flowchart, 0's & 1's, "Hand" Type

---

## 4. SETTLED — Website scope

**31 frames: 16 at 1920, 15 at 768.**

| Page | 1920 | 768 |
|---|---|---|
| Home | ✅ 6949px | ✅ 7846px |
| Menu (mobile nav) | — | ✅ 1203px |
| About | ✅ 6122px (+2 alternates) | ✅ 5858px |
| Cases · Case | ✅ 3498 · 3742 | ✅ 4990 · 3651 |
| Capabilities · Capabilitiy *(sic)* | ✅ 4298 · 7414 | ✅ 6174 · 10833 |
| Blog · Post | ✅ 3248 · 5514 | ✅ 3765 · 9241 |
| Contact | ✅ 2634 | ✅ 3022 |
| Privacy · Terms | ✅ 3566 · 3438 | ✅ 4555 · 4309 |
| 404 · 500 · No Content | ✅ 1533 each | ✅ "501"/"502"/No Content, 1376 each |

**Layout grid (1920)** — 163px margin, **1594px content column**. **768** — 79/610 margins.

**Navigation — settled**
- Header (all 1920 frames): Home / Cases / Capabilities / About / Blog / **Contact** + "Start a project"
- Menu frame carries the same six items + email + phone, with a proper X close
- Footer "Services" → Capabilities · "Cookies" → cookie modal
- Cookie modal trigger → Home, bottom-right of the top B&W image
- Footer clock → live component, not the hardcoded `22:52:19`

**Signature interactions** — service index on 100px pitch with gradient active row · indexed capability row (746×56 desktop, 70px tall at 768) · code-editor cards · Post reading rail · Contact ASCII artwork.

---

## 5. SETTLED — Tech stack

**Next.js (App Router) + TypeScript + Tailwind v4**, on Vercel.

- Content shape (blog + cases + service template) matches App Router + ISR
- `next/image` handles the oversized sources → AVIF/WebP with responsive `srcset`
- `next/font` self-hosts Inter and Open Sans — both OFL, no licence issue
- **"Next.js Development" is a listed Consulting service (p29)** — build the site in what you sell
- One token file shared with the React Native side

**Component inventory**

| Reuse | Component |
|---|---|
| 31 frames | `Nav`, `MobileMenu`, `Footer`, `CTABand` |
| 27 instances | `IndexedCapabilityRow` |
| 6 rows | `ServiceIndexRow` |
| repeated | `CodeEditorCard`, `CaseCard`, `ArticleCard`, `FilterChip`, `FAQAccordion`, `MetricBlock`, `ReadingRail`, `ClauseBlock`, `NewsletterBand`, `TabSwitcher` |
| primitives | `Button`, `Checkbox`, `FormField`, `BudgetSelector`, `MeshGradientSurface`, `GrainOverlay`, `Divider` |

> The file still has **zero components, styles or variables**. This is an accepted decision — the component layer lives in code. Do not log it as a defect.

---

## 6. DELIVERED in v2 — verified fixed

| Item | Evidence |
|---|---|
| **Contact in nav** | All 16 desktop frames + Menu. Nav group renamed 2263→2304 / 2264→2305. |
| **Light token settled** | p165 = `#FAFAFA` (250,250,250, CMYK 0,0,0,2); board p172 updated; zero `#FDFDFD` in the deck. |
| **Palette board corrected** | p172 captions all match their swatches. |
| **FAQ expanded row** | `Home__1920w.txt:134-137` — `#EAEAEA` fill, minus glyph, answer body. Mirrored at 768. |
| **Contrast largely fixed** | `#999999` references 134 → **12**; `#6B6B6B` at **5.11:1** on `#FAFAFA`. |
| **Second breakpoint** | 15 new 768 frames, section order preserved 1:1 against desktop. |
| **Mobile nav designed** | `Menu__768w` — six items incl. Contact, real X close, good tap targets. |
| **Utility screens exist** | Six frames + canonical copy in the deck at pp228–230. |
| **Form focus + error** | `Home__1920w.txt:82-89` — `#4813D0` focus rule, `#CC0000` error rule. |
| **Language sequence fixed** | Pt.1–Pt.8, no duplicates. |
| **Deck cleanups** | "developement" typo fixed; p27 merge; quote-block alignment on p225/p227; p206 photo replaced. |
| **Assets: logo, icons, grids** | 100 lockup tiles (5×20), all 28 outline icons, all 10 grids — clean vector, no raster, no font dependency. |
| **Legal parity at 768** | All 13 Privacy and 12 Terms clauses present, verbatim, same order. |
| **Font licensing (web)** | Inter + Open Sans both ship with OFL.txt. |

---

## 7. OPEN — Tier 0: a developer cannot start

1. **The mobile menu is unreachable.** The hamburger exists on exactly one frame (`Home__768w.txt:298-299`, Line 128/129 @630). The other **14 mobile frames** have only logo + "Start a project" — and there is no free slot, since Home's hamburger occupies x630–689, which elsewhere is inside `Frame 40` (x491–689). No prototype interactions exist.
2. **No phone breakpoint.** 768 is tablet portrait. Nothing at 375/390/430. Decide: commission a phone set, or declare 768 the only design target and let the phone layout be a dev-side decision.
3. **768 content never built:**
   - `Capabilities__768w` — **3× identical "Product Development Project"** cards; AI Engineering and Enterprise absent
   - `Capabilitiy__768w` — **9 of 38** tech chips, **1 of 9** category headings
   - `Case__768w` — **0 of 3** Solution blocks behind a live Challenges/Solutions tab switcher
   - Blog 9→3 cards · Industries 3→1 · About Process 5→3 · Cases metrics collapsed · Case 768 metrics contradict Case 1920
4. **No web-ready assets.** No standalone logo file anywhere — only a 555 KB / 2,080-path / 100-tile contact sheet and a 1.87 MB poster. `Website Assets/Recurssive Website Vectors.svg` is **708 bytes / 3 loose shapes**. No favicon, no PNG/WebP, no UI icons (chevrons, 18×18 and 20×20 glyphs, accordion markers, .NET mark). The 414 MB PSD has zero exports beside it.
5. **No type scale to build from.** See §3.4.
6. **No gradient recipe.** Deck pp173–177 are pixel-identical to v1 — no stops, angles, grain opacity or blend mode anywhere. The only reproduction path is an uncaptured third-party generator URL in `Mesh/How to create more mesh gradients.docx`. The one quantitative rule, "50%+ Light-Based", is contradicted by the shipped files (8 of 12 below 50%, combined 36.2%), and 13 artworks are shown against 12 delivered. **Interim plan stands:** agree a plain CSS gradient at build start and swap it when real specs arrive.

---

## 8. OPEN — Tier 1: renders broken or off-brand

7. **Capabilitiy scrim regression** — `Capabilitiy__1920w.txt:467-469`: photo at `@0,1653` but `Rectangle 1882` at `@461,1653` (v1 had `@-1,1652`). Columns 0–461 are bare photo, exactly where the `#EAEAEA` "Ask / Listen / Think / Create" column sits. `Home__1920w.txt:14` has the same scrim correctly at `@0`.
8. **12 nodes overflow the 768 frame** — worst `Post__768w.txt:106` (`Line 63` 1258×0 @105 → 595px off-canvas); `Capabilitiy__768w.txt:102-106`; `Home__768w.txt:260`. Separately `Capabilities__768w.txt:169,212,254,296` reuse un-resized 502px desktop code cards with desktop 14–16px type inside.
9. **Palette has forked** — 580 of 2,470 hex references (**23.5%**) are off-palette: `#6B6B6B` ×369, `#FFFFFF` ×34, `#232323` + traffic lights ×32, 4 mesh stops, `#FDFDFD` ×10 residual, `#CC0000` ×2, `#3B10AB`, `#4212BF`, `#F5F5F5`.
10. **Live contrast failures** — `*Project budget` `#999999` at **2.73:1** (×4, its five siblings are `#0F0F0F`); Contact mesh `(general)/(inquiry)/(social)/(phone)` at **1.00–1.42:1** desktop and 1.02–3.03:1 mobile (measured against the real mesh PNG, not a flat fill); Home "Our Process" `(01)–(04)` at 1.44–2.21:1 over photography; unchecked checkbox `#EAEAEA` on `#FAFAFA` = **1.15:1**; **25 of the 100 logo lockup tiles below 3:1**.
11. **States still missing** — loading, success, validation copy, disabled, filled, hover, unchecked. Focus/error exist on **1 of 4 form instances** (`Home__1920w` only). Nine pages carry a "Send Message" CTA where no form exists.
12. **Rename `501`/`502` → 404/500** — their content is verbatim 404/500 copy. A developer wiring status codes off frame names ships the wrong ones.
13. **Flatten the utility illustration** — 19,758 duplicated `#EAEAEA` vectors across 6 frames = **61% of the entire file** (20,031 of 32,833 nodes).
14. **Touch targets** — `Rectangle 1844` still 14×14 (Blog/Post/Contact/Home at 1920); cookie toggles 34×18; the same named checkbox ships at 14, 22 and 28px. 81 desktop nodes still ≤12px including two at 10.1px (`Post__1920w.txt:73,76`).
15. **Line-height** — 193 of 435 16px nodes still at `/100.0%`. Proof it is accidental: `Home__1920w.txt:40-43` carries the **same 234-character paragraph twice**, once crushed at `16px/100%` into an 878×19 box and once auto in 878×43.
16. **The empty state doesn't work as one** — "No Content" is a full-page takeover with no H1, no filter chips and no clear-filter control, so it cannot serve a Cases or Blog filter-miss. No filter *selected* state exists either ("All" is active in every frame).
17. **Footer contradicts the nav on all 31 frames** — "Contents" lists Home/Services/About/Contact; "Services" is not a page and Cases, Capabilities and Blog are missing.
18. **Asset-folder hygiene and the business card** *(moved from §10)* — 180.8 MB orphaned Illustrator `.tmp` in `Card/`; 7 `.DS_Store` files, one leaking a third party's username and Downloads path; 308 MB of mesh PNGs with a provably opaque alpha channel (WebP q80 @1920 ≈ 0.32 MB, ~78× smaller); 157 of 182 images unused. The business card is not print-ready: zero bleed on full-bleed art, DeviceRGB not CMYK, images at 1270 DPI, and an 80×50 mm trim rather than the 85×55 standard.

---

## 9. OPEN — Tier 2: legal and licensing

19. **Photography rights.** *(Updated 2026-08-03 — owner deleted 21 of the 22 "Tony Noel" photographs, keeping only the one used in the designs.)*
    - **Local exposure now: one file** — `Images/Tony Noel/tony_noel_impression_detail_img_03.jpg`, 1820×1200, 0.25 MB, zero EXIF. The `.DS_Store` no longer leaks a third party's path. Still no licence, release or credit anywhere in the asset tree.
    - **Deleting the sources did NOT unpublish them.** Deck **p207 ("Fish Eye Effect")** still shows three fisheye photographs from that shoot, and the deck is a distributed 141 MB PDF. A layer may also survive in the 414 MB `Website Assets/Recurssive Website Photos.psd`. **The deck, not the folder, is now the live exposure.**
    - The remaining photo does not byte-match any blob embedded in the `.fig` — but Figma re-encodes on import, so this is weak evidence. Confirm where it is actually used before clearing it.
    - The subject is identifiable, so **photographer licence and model release are two separate questions**.
    - Unchanged: no register for 159 Unsplash files, **2 unlabelled Pexels files** under different terms, and no model releases despite ~30 images with identifiable faces.
    - **Confirmed used:** the remaining Tony Noel photo matches an embedded Figma blob at Hamming distance 0. It *is* in the designs and does need clearing. (An earlier byte-hash test suggested otherwise; Figma re-encodes on import, so that test was invalid.)

19a. **Image usage audit** *(2026-08-03, `analysis/image-audit/`)* — perceptual match of all 74 embedded Figma blobs against the 174 source images.
    - **37 files are used** (323 MB): 27 photographs (77 MB) + 10 of the 12 mesh gradients (247 MB). Mesh gradients 8 and 9 are unused.
    - **137 files are unused** (434 MB, 57% of the library) — safe to delete. `KEEP.txt` / `DELETE.txt` hold the lists.
    - Separation is unambiguous: every used file scored dh ≤ 10, the best non-match scored dh 44 with 50× the tone distance.
    - `Images/evgeni-tcherkasski-nKuxm4Tk-j0-unsplash copy.jpg` is a duplicate of the non-copy; keep one.
    - **No assets are missing.** An earlier pass reported "4 photographs used but never delivered" — that was **wrong and is withdrawn**. All four are files already in the keep list, matched at perceptual distance 0.0005–0.0058 (threshold 0.05): the ice-crystal is `odya-kun-_ae6DzlFIrA`, the MacBook/code is `james-harrison-vpOeXr5wmR4`, the desk/keyboard is `guillaume-issaly-ZCv2Wn5KO6w`, the fourth is `max-kolganov-MvKy-zhHD2Q`. **Figma caps imported images at 4096px and stores a downscaled copy**, so one photo can appear as two blobs; the matcher assigns each source to its single best blob, leaving the second looking unmatched. Check layer names before concluding an asset is absent.
    - The **delete list is unaffected by that error** — it was computed source→blob, so all 137 deleted files were each compared against all 74 blobs and scored dh ≥ 44.
    - After the §7.6 pipeline the mesh gradients collapse to ~7.9 KB, so the real source payload to carry is the **77 MB of photographs**.

19b. **Image scope narrowed** *(owner's decision 2026-08-03)* — Blog and Post ship with temporary imagery; the owner supplies real content and images post-launch. **Their photography is out of scope for the build pipeline.**
    - **10 photos are Blog/Post-only and are deferred** (33.5 MB): `annie-spratt-MChSQHxGZrQ`, `brooke-cagle-NoRsyXmHGpI`, `cynthia-magana-mFPJXEQfb9M`, `daria-nepriakhina-gGoi4QTXXBA`, `govardhan-k-P6EeymU1I`, `james-harrison-vpOeXr5wmR4`, `max-kolganov-MvKy-zhHD2Q`, `odya-kun-_ae6DzlFIrA`, `shiwa-id-Bajw65b3mXo`, `zac-ong-lknu_oR_V3Q`.
    - `evgeni-tcherkasski-nKuxm4Tk-j0-unsplash copy.jpg` is an exact duplicate — delete (3.5 MB).
    - **CORE build set: 16 images, 39.6 MB** → ~192 derivatives at 6 widths × 2 formats. This is the entire Phase 2 pipeline input.
    - `sergey-zolkin-_UeY8aTI6d0` is the most-reused photo — it appears on **7 pages** (About, Capabilities, Capabilitiy, Case, Cases, Privacy, Terms). Optimise it first; it likely warrants preloading logic of its own.
    - **The Tony Noel photo is the About page hero** — `image 649`, 1969×1298 @−21,−97 desktop / @−463,−97 mobile, full-bleed above the fold on both breakpoints, and almost certainly the LCP element on About. It is *not* Blog/Post content, so **the licence and model release remain on the critical path**. If clearing it stalls, swap it for one of the 15 cleared Unsplash photos rather than letting it block launch.
20. **v2 removed the only attribution.** Deleting the sigma-global URLs from p134/p137 looked like cleanup; they were the deck's sole credits. Sweeping all 241 pages now returns **0 hits for "unsplash" and 0 for "sigma"**.
21. **At Haüss — trial font in a print-bound file.** `Card/Recurssive Business Card.pdf` embeds **`XFAGPY+AtHaussTRIAL-Semibold`** (also in the `.ai` and the stray `.tmp`), intended for a commercial printer. The deck still specifies At Haüss on p178 and p219, and the specimen is measurably a third typeface — so it cannot be closed as a naming error. The **logo itself is safe** (outlined).
22. **Legal pages were never touched** — a v1↔v2 string diff shows one delta: the added "Contact" nav label. Still missing: Limitation of Liability, Indemnification, controller identity and registered address, legal basis, retention periods, international-transfer disclosure (three US processors are named), supervisory-authority complaint right, consent-withdrawal path, effective date, objection/restriction/portability rights, children's data. Both pages still carry Lorem ipsum subtitles.
23. **The cookie promise is unfulfillable on mobile** — the banner says consent can be withdrawn via "Cookies" at the bottom of any page. `TEXT "Cookies"` appears in **14 of 14** desktop frames and **0 of 15** mobile frames, while `Home__768w.txt:292-297` ships a "Customize" button with no panel behind it.
24. **Email signature is not shippable** — 6× `example.com` including `mailto:info@example.com`; logo hotlinked from **`omnics.co`** (the designer's domain); 8 icons from HubSpot's CDN; `href="//recurssive.com"`; `tel:` with spaces and no country code; delivered as escaped HTML pasted into a .docx with no `.html` file.
25. **`Microsoft_.NET_logo 1` recoloured to `#A59BFF`** (`Capabilitiy__1920w.txt:205`) with no source asset and no clearance.

---

## 10. NOT PURSUING — deck cleanup

**Owner's decision (2026-07-31): brand-book hygiene does not concern the project. Do not re-raise.**
The deck is an internal artefact; these defects ship wrong but block nothing.

P1. Three breadcrumb defects — "Reflow Pt.4" on p119–122; "Communication /" on p193–196 and p198–203; "Visual Identity / Logo Creation" on p233–240.
P2. p194 regression — flowchart outline icons repainted to flat `#D8D8D8` (1.43:1), mismatching p193.
P3. p180 Inter specimen omits SemiBold, the most-used face in the system.
P4. Deck↔Figma copy drift on 2 of 3 utility lines (p228, p230).
P5. The p27 merge deleted the Character/Service/Space matrix that justified "Visionary Web & App Studio"; only the conclusion remains.

> Three items were originally filed here in error and have been moved, because they are not deck
> hygiene: **gradient specs** → §7.6 (blocks CSS), **asset-folder hygiene and the business card**
> → §8.25, **photo attribution** → §9.18 (legal).

---

## 11. Handled during the build

- **All copy** — written by the owner. Closes lorem ipsum (244 instances), remaining typos, the "Capabilitiy" frame name, and the third-party article text on Post.
- **Legal pages** — drafted during build. Note they need **new sections**, not new words (§9.20).
- **Consent checkboxes** — all 8 ship checked; build them **unchecked** by default.
- **Optimized image exports** — supplied at build time.

---

## 12. Closed by decision

| Item | Resolution |
|---|---|
| "Omnics Digital Agency" vs "Visionary Web & App Studio" | Omnics is the **designer's** brand. No conflict. |
| Purple/blue palette vs competitor analysis | **No problem** — 6.6% hue-window occupancy. Differentiated. |
| Deck third-party imagery in the *deck* (Dalí, meme watermark, ProcessOn) | Owner's call — not pursuing. *(Distinct from §9.17, which is website photography.)* |
| Three different process models | Intentionally different things. |
| Cases has no real client work | Added as real projects land. |
| 20–50K gap in the budget selector | Not pursuing. |
| Onliness Statement doesn't pass its own test | Owner's call. |
| Value Ladder caption vs order | Owner's call. |
| No bridge slide from recursion to sales | Owner's call. |
| "No Cap Text" vs all-caps dividers | Owner's call. |
| Zero components/styles/variables in Figma | Accepted — component layer lives in code. |

---

## 13. Corrections — do not re-raise

1. **"Purple is crowded."** Withdrawn. Direct measurement of all 301 swatches puts purple/violet at 4.3% — second-rarest chromatic family — and only 6.6% of competitors in Recurssive's hue band.
2. **"Line-height is unsystematised."** Withdrawn as stated. It is systematic; the real issue is 100% leading on 16px body copy (§8.14).
3. **"p173 had three wrong hex labels."** Corrected: it was **four** captions (`#FDFDFD`, `#C69BFF`, `#6F00FF`, `#4A00AB`), and **the swatch fills were never wrong** — pixel-sampling old p173 returns `#A49AFF/#4812D0/#360C9C`, byte-identical to the new board. The defect was caption-only and confined to one page; the seven individual spec pages were always correct.
4. **"16 deck pages changed in v2."** Two were false positives — p124 and p236 differ by 8 and 36 antialiased pixels (max channel delta 12/255). **14 pages carry real edits.**
5. **Claimed `(c) 2020 Acme` placeholder text.** Never verified; searched all frames; not present. Excluded.
6. **Scrim readings in the spec files are unreliable.** The exporter renders scrims as `GRADIENT_LINEAR(#0F0F0F → #0F0F0F)` and **hides `paint opacity`** — Rectangle 1882/1881 cap at 25% black, not opaque. Treat every "text on a `#0F0F0F` scrim" reading as unverified until measured against the underlying image.

---

## 14. Re-deriving the data

The `.fig` is a ZIP containing `canvas.fig`, `thumbnail.png`, `meta.json`, `images/`. `canvas.fig` is a Kiwi container: `fig-kiwi` magic + uint32 version + length-prefixed blocks — block 0 is a **deflate**-compressed schema, block 1 is **zstd**-compressed data. The schema ships inside the file, so the tree decodes with no Figma access.

```bash
python analysis/figdec.py <canvas.fig> canvas.json   # decode .fig -> JSON
python analysis/figtree.py                            # JSON -> per-page specs
```

Requires `pip install pymupdf zstandard`. PDFs over 100 MB exceed the direct-read limit — render pages with PyMuPDF instead.

**Artifacts in `analysis/`:**

| Path | Contents |
|---|---|
| `figspec-v2/` | **31 current per-page trees** — the fastest way to answer "what is on this page" during the build without opening Figma |
| `figspec-v1/` | 39 v1 trees, kept for diffing |
| `fig_index-v2.json` / `-v1.json` | Frame inventory: name, type, w/h, x/y, node count |
| `canvas-v2.fig` / `-v1.fig` | Raw Kiwi payloads, re-decodable |
| `figdec.py`, `figtree.py`, `figtree_v2.py` | Decoder and spec generators |
| `full-review.md` | The v1 long-form review |
| `v2-findings/verdict.md` | The 13-item verdict with evidence |
| `v2-findings/new-issues.md` | Problems introduced or newly revealed by v2 |
| `v2-findings/raw-findings.json` | All 14 analyst reports (99 resolved / 186 outstanding) |

> v2 spec files use `<Name>__<width>w.txt` naming (e.g. `Home__1920w.txt`, `Home__768w.txt`) because
> desktop and mobile frames share names and would otherwise overwrite each other. Spec lines carry
> node type, name, W×H, `@x,y`, hex fills, radius, opacity and effects; TEXT nodes carry the verbatim
> string plus font/size/line-height/colour/alignment.
