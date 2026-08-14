# Recurssive - Website Copy Deck

First full sweep. Every page, every placeholder slot, drafted against the brand deck's voice
system and the drawn geometry. **Nothing here has been written to the app** - this is a proposal
for review.

Produced by a 13-agent sweep: 2 foundation agents (voice system, measured slot inventory),
9 page agents, 2 adversarial critics.

---

## How to read a proposal

Each slot carries a **character budget** derived from the figspec: the drawn box width, the font
size and the drawn line count. Budgets are load-bearing - `docs/STATE.md` records real regressions
caused by string length alone. A proposal that busts its budget changes the page height.

`CHARS` is the actual count of the proposed string. Where it sits outside the stated window, the
agent verified the line count per-string and said so.

---

## At a glance

| Page group | Slots drafted | Open questions |
|---|---|---|
| / (Home) | 17 | 5 |
| /about | 16 | 7 |
| /capabilities (index) + /capabilities/[slug] (detail template) | 13 | 10 |
| /cases (index) + /cases/[slug] (detail) | 26 | 7 |
| /blog (index) + /blog/[slug] (Post detail) | 22 | 9 |
| /contact | 27 | 8 |
| Privacy Policy (/privacy-policy) and Terms of Service (/terms-of-service) | 3 | 18 |
| Error and empty states (404 / 500 / no content) | 13 | 8 |
| Global microcopy (nav, footer, newsletter, menu, metadata) | 43 | 9 |
| **Total** | **180** | **81** |

---

## Critic findings - read before accepting anything

Two adversarial passes ran over the whole corpus: one for claim safety, one for cross-page
consistency.

### Critic 1

> The prose is disciplined — no client names, no headcount, no founding year, no awards, no "trusted by", and the corpus visibly resisted the two slots that beg hardest for invented traction (Home Startups column, Home Enterprise column). The register audit is sound. But the corpus is scoped to strings, and the exposure on this site is not in the strings it proposes — it is in the numbers it leaves standing next to them.
> 
> Three structural problems dominate.
> 
> FIRST, /cases is not safe to fill. content/cases/placeholder-fintech-app.mdx carries a fabricated engagement in its frontmatter, not its body: title "Cutting cold start by 63% for a fintech app", a description with 4.1s→1.5s, `client: Placeholder Client`, `publishedAt: 2026-07-15`, and three metrics including 99.4% crash-free sessions. The in-body disclaimer never reaches a title tag, an OG card, or a search result, and all four index cards link there. The index itself hardcodes twelve metric values (30x, +89%, 70K$) with lorem labels. Right now the lorem protects you — obviously fake copy next to a number reads as scaffolding. The corpus's proposed intro ("Every case answers the same three questions") and meta ("Work from Recurssive, written up in full") remove exactly that protection. Blank the numbers and defang the frontmatter before a single sentence lands, and keep noIndex.
> 
> SECOND, the same pattern on /capabilities. The corpus edits the four pillar descriptions in src/content/capabilities-index.ts and leaves `uptime: "99.99%"` inside a function called `enterpriseHealth()` and `latency: "12ms"` under "AI Engineering Project" — both rendered as visible page text, both specific metrics attached to work that does not exist, and the corpus separately proposes lifting noIndex from this page. Its "nineteen kinds of work" intro is also a count the file's own header comment contradicts (fifteen of the nineteen have no content behind them).
> 
> THIRD, a cluster of soft contractual commitments the corpus either wrote or declined to touch: the unhedged "within two working days" response SLA repeated across Home, ContactDetails and /contact/thanks (which the corpus explicitly proposes leaving alone, and which is the same class of number the FAQ deliberately refuses for cost and timeline); "so your app keeps shipping while it happens" as an unconditional guarantee on enterprise migration; "a second platform costs a decision rather than a second budget" as a pricing promise; "so the same class of problem does not come back" as a non-recurrence warranty; and "not that the budget ran out" pre-empting the payment terms that legal.ts:164 assigns to a signed agreement. Each is fixable with one hedge at a cost of under ten characters.
> 
> Two other things worth the owner's attention. There is a live GDPR gap the corpus does not cover: the Newsletter band on /blog collects name and email behind a "terms and conditions" consent checkbox, while legal.ts:13 records that the newsletter section was deliberately removed from the privacy policy because there is no newsletter — a consent UI for processing the policy says does not happen. And the corpus contradicts itself on desktop: the Home row sells it, and the /capabilities rationale says in as many words that the claim cannot be stood behind. That is an owner decision, not a copy edit.
> 
> Everything flagged has a fix that keeps the slot filled and, where the corpus stated a character budget, stays inside it.

#### High severity (8)

**/cases/[slug]** - `cases.case-detail (content/cases/placeholder-fintech-app.mdx)`

The corpus writes an index intro and meta description over a case collection whose only entry is a fabricated engagement with hard numbers in its FRONTMATTER, not just its body. content/cases/placeholder-fintech-app.mdx line 2: `title: Cutting cold start by 63% for a fintech app`; line 3: `description: A React Native banking app took 4.1s to first interaction on mid-range Android. We profiled it, cut it to 1.5s, and left the team able to hold it.`; plus `client: Placeholder Client`, `publishedAt: 2026-07-15`, and `metrics: Cold start -63% / Crash-free sessions 99.4% / Bundle size -41%`. The body's disclaimer ("> **This is placeholder content.**") sits BELOW the fold and never reaches <title>, <meta description>, OG cards, or a search result. All four cards on the /cases index (page.tsx:45,57,69,81) link here. This is an invented client, an invented date, and five invented metrics attached to work that does not exist — the single largest exposure in the corpus's blast radius.

*Fix:* Do not let any copy land on /cases until this file is either deleted or defanged. If it must stay as a schema demo, move the disclaimer into the fields that travel: `title: Example case study (not client work)`, `description: A worked example of the case-study format. The figures are invented and no client is involved.`, drop `client:` entirely, drop `publishedAt`, and replace the three metric values with `—`. Keep `noIndex: true` on the route until a real case exists.

**/cases** - `cases.case-metrics-01-04 (src/app/cases/page.tsx:39-82)`

The four index cards carry transcribed metric VALUES with lorem labels: `{ value: '30x', label: 'Lorem ipsum' }`, `'+54%'`, `'10K$'`, then `'15x' / '+89%' / '16K$'`, `'19x' / '+33%' / '51K$'`, `'23x' / '+11%' / '70K$'`. The file's own comment (line 26) says "The metric VALUES are the one thing in here that is not lorem". The corpus proposes real prose descriptions for these cards. The moment a real sentence sits next to `+89%` and `70K$` under the heading "Brand Project Case", the numbers stop reading as placeholder geometry and start reading as results — including the dollar figures, which read as project values or revenue lift. Lorem next to a number is obviously fake; house-voice copy next to a number is a claim.

*Fix:* Blank the values before any description copy lands: `{ value: '—', label: 'Result' }` for all twelve, or drop the `metrics` array from the placeholder items and let CaseCard render the band empty. Do not write card descriptions and leave the numbers — that combination is worse than either alone.

**/cases** - `cases.meta-description`

Proposed: "Work from Recurssive, written up in full: what the problem was, what we built, and what it changed." This is the indexed search snippet for a page with zero real cases. "Work from Recurssive" asserts a body of delivered work; "what it changed" asserts measured outcomes. The corpus correctly kills "Selected work" for implying a set to select from, then replaces it with a phrase that asserts the same set less obviously. The corpus's own /capabilities note also proposes lifting `noIndex`, so the direction of travel is toward publishing these strings.

*Fix:* Describe the format, not the inventory: "How Recurssive writes up a project: what the problem was, what we built, and what it changed." (89 ch, well inside the 50-160 window). And keep `noIndex: true` at src/app/cases/page.tsx:15 until at least one real case ships — a meta description is the one string that gets read by people who never see the empty state.

**/capabilities** - `capabilities.page-intro`

Proposed: "Four groups, nineteen kinds of work. They run from a second opinion up to the system your company depends on." Two problems. (1) "nineteen kinds of work" is a capability-count claim, and src/content/capabilities-index.ts's own header comment (lines 10-12) says the nineteen rows are "nineteen would-be capability entries, fifteen of which do not exist as content yet". Deck p29 listing a service is not the same as the studio being able to deliver it — a buyer who clicks 'React Native Trainings' or 'Next.js Development' finds nothing. The corpus's rationale calls the number "falsifiable in one glance", which is exactly the problem: it is falsifiable, and it currently falsifies. (2) "the system your company depends on" implies experience running business-critical systems, of which there is no public evidence.

*Fix:* Drop the count and the criticality claim, keep the ladder: "Four groups, ordered by how much they take on: from a second opinion on your code up to a whole system." (102 ch, inside the stated 67-111 window, still 2 lines at both widths). Reinstate the number only when nineteen rows have somewhere to click through to.

**/capabilities** - `capabilities.pillar-description-enterprise-solutions`

Proposed: "Moving a large codebase to React Native one screen at a time, so your app keeps shipping while it happens. Most of the risk lives in the release process and the monitoring, not in the new code." "so your app keeps shipping while it happens" is an unconditional delivery guarantee on the highest-risk engagement type the studio offers, made with no completed migration to point at. A migration that stalls a release train is the single most likely failure mode, and this sentence pre-commits against it. "Most of the risk lives in..." is also a quantified risk distribution presented as observed fact about migrations the studio has not published.

*Fix:* Make the first clause modal and the second hedged: "Moving a large codebase to React Native one screen at a time, so the app can keep shipping while the move happens. Much of the risk tends to sit in the release process and the monitoring rather than in the new code." (204 ch, inside the stated 167-219 window, still 2 lines at 1920 / 4 at 768).

**/ (Home) · /contact · /contact/thanks** - `home.contact-lead`

The corpus proposes NO CHANGE to "We read all messages and come back within two working days." (src/app/page.tsx:568, and identically at src/components/ContactDetails.tsx:65; src/app/contact/thanks/page.tsx:35 carries "We'll come back to you within two working days"). This is an unhedged response-time SLA published in at least three places by a studio with no stated headcount. The brief's own framing is that the Home FAQ deliberately quotes no numbers for cost or timeline precisely because they become public promises — this is the same class of number and it slipped through because it is pre-existing. Nothing in src/content/legal.ts qualifies it; the Terms 'Disclaimers' section disclaims warranties for the Site and Services but says nothing about response times, so the representation stands unqualified. One holiday, one illness, one busy fortnight and every unanswered enquiry is a documented broken promise.

*Fix:* Add the hedge the house voice already uses sentence-initially three times in nine FAQ answers: "Tell us what you're building, even if it's still rough. We read every message and usually reply within two working days." (120 ch). Mirror it on ContactDetails.tsx:65 and thanks/page.tsx:35 in the same commit — the corpus's own openQuestion already warns those four will drift. "Usually" costs 8 characters and converts an SLA into a norm.

**/capabilities** - `capabilities.pillar-cards (src/content/capabilities-index.ts:135-149, 110-126)`

The corpus edits this file's four `description` fields and leaves the code cards, which render as visible on-page text. The Enterprise Solutions card prints `uptime: "99.99%"` inside a function literally named `enterpriseHealth()` under the heading "Enterprise Solutions Project"; the AI Engineering card prints `latency: "12ms"` and `privacy: "Local First"` under "AI Engineering Project". A reader does not parse these as decorative syntax highlighting — they parse as a spec sheet. 99.99% uptime is a four-nines availability figure (52 minutes of downtime a year) and 12ms is an inference latency benchmark, both attached to a named 'Project' that does not exist. The corpus also proposes lifting `noIndex` from this page (openQuestion 8), which would make both public and crawlable.

*Fix:* Neutralise the two numbers in the transcription, which the file already permits itself to do (it deviates from the frames elsewhere): `uptime: "monitored"` and `latency: "on-device"`. Also retitle the cards from "...Project" to "...Example" so the code blocks read as illustration. Do not remove `noIndex` until both are changed.

**/blog (shared band)** - `newsletter.body (src/components/Newsletter.tsx:55)`

GDPR gap the corpus does not cover, in a slot the brief names as canon-to-place (Pt.5 "Stay in the loop"). The band ships today on /blog with live `name` and `email` inputs, a `Join` submit button, and a consent checkbox labelled "I've read and accepted the terms and conditions" (lines 64-94). src/content/legal.ts:13 records that the Mailchimp section was deliberately DROPPED from the privacy policy because there is "no newsletter, no marketing email", and the policy's only collection disclosure is the 'Contact Forms' section covering the contact form fields. So the site presents a consent UI for processing its own privacy policy says does not happen. Two live defects: the checkbox obtains nothing (the form does not submit, per the component comment at line 28), which is a consent control that records no consent; and the label points at 'terms and conditions' rather than the privacy policy, which does not satisfy the Art. 13 information duty for a mailing list. If the corpus's later pass places Pt.5 copy here and someone wires the form, the policy is wrong on the day it ships.

*Fix:* Do not write finished copy into this band while the form is inert and undisclosed. Either (a) remove the band until there is a list, a processor, and a privacy section describing it — the same discipline legal.ts already applies to the Meta pixel at lines 28-45 — or (b) ship it with the inputs `disabled`, and change the consent label to "I have read the privacy policy" linked to /privacy-policy. Adding the newsletter later is a deploy that must carry the policy section with it, exactly as the pixel note specifies.

#### Medium severity (9)

**/ (Home)** - `home.service-description-01-desktop-apps`

Proposed: "Software that stays open all day, with the files and the keyboard close by. Desktop earns its place when a browser tab will not do." This is written as a considered offer, and the corpus contradicts itself about it inside the same document: the /capabilities Product Dev rationale states "Deliberately says iOS, Android and web and NOT desktop... One React Native codebase genuinely covering desktop is a claim I cannot stand behind." So Home offers desktop development and Capabilities silently withdraws it, one click apart. The settled positioning is React Native / Expo / on-device AI; the only support for desktop is a drawn row and a line in capabilities-index.ts:72. An enquiry generated by this sentence is one the studio has not said it can serve.

*Fix:* Owner decision, not a copy fix — the corpus's own openQuestion asks it and it needs answering before this slot lands. If desktop stays, write it as a question rather than an offer: "Some things belong outside the browser: files on disk, a keyboard, a window that stays open. Worth asking before a web app is assumed." (137 ch, inside 120-142). If it does not stay, change the row name, not the sentence.

**/capabilities** - `capabilities.pillar-description-product-dev`

Proposed: "Designing and building the product itself, from prototype to the version people pay for. One React Native codebase covers iOS, Android and web, so a second platform costs a decision rather than a second budget." Three exposures. (1) "a second platform costs a decision rather than a second budget" is a pricing claim — it tells a buyer the marginal platform is approximately free, which is a commercial commitment and directly cuts against the settled no-numbers cost position at page.tsx:54-58. (2) "covers iOS, Android and web" overstates one codebase: React Native Web is real but partial, and the shipped FAQ at page.tsx:74 is careful to say "Mobile apps in React Native and Expo, web apps" as two things. (3) "the version people pay for" implies delivered revenue-generating products, of which there are none.

*Fix:* "Designing and building the product itself, from the first prototype to the version that goes to real users. One React Native codebase covers iOS and Android, so most of the work counts once instead of twice." (203 ch, inside 167-219). Drops the price promise for a hedged effort claim, drops web from the shared-codebase assertion, and drops the revenue implication.

**/capabilities** - `capabilities.pillar-description-consulting`

Proposed: "...Sometimes that ends in a report and a training session, sometimes in the pull requests that fix it. Rarely in a rewrite." "Sometimes... sometimes... Rarely" are frequency claims, and a frequency claim is a claim about a population of past engagements. There is no such population. A sceptical buyer asks "rarely out of how many?" and there is no answer. The corpus praises "Rarely in a rewrite" as echoing the shipped one-word 'Often.' at page.tsx:104 — but that answer is about willingness to take rescue work, not a distribution over completed projects.

*Fix:* Switch from observed frequency to available outcome: "Reading a codebase you already have, then saying plainly what it is costing you. That can end in a report and a training session, or in the pull requests that fix it. A rewrite is the last option, not the first." (211 ch, inside 167-219). Same shape, same judgement, no implied track record.

**/capabilities** - `capabilities.pillar-description-ai-engineering`

Proposed: "Putting a model where it earns its place, which is usually on the device rather than in someone's data centre. That decides the rest: what fits in memory, what works offline, what never leaves the phone." Two issues. "usually" again asserts a distribution over engagements that do not exist, and it also asserts a contestable engineering generalisation — most useful models today do not fit on a phone, and a CTO will say so. "what never leaves the phone" is an absolute privacy guarantee; on-device inference does not by itself prevent telemetry, crash reporting, or model-update traffic, and 'never' is the kind of word a DPO quotes back.

*Fix:* "Putting a model where it earns its place, which is often on the device rather than in someone's data centre. That decides the rest: what fits in memory, what works offline, and what data never has to leave the phone." (211 ch, inside 167-219). "often" is an engineering preference rather than a claimed win rate; "never has to leave" is a capability statement rather than a guarantee about what your build actually does.

**/cases** - `cases.empty-state-body`

Proposed: "Nothing is published here yet. Write-ups go up once an outcome can be measured, not when the work ships. Ask what we are working on and we will tell you." Sentence one is honest; sentence two quietly un-does it. "not when the work ships" presupposes that work HAS shipped and is merely awaiting measurement — it converts 'we have no cases' into 'we have a backlog of unpublished cases', which is a stronger claim than the first sentence retracts. It is the most defensible-sounding sentence in the corpus and the one a buyer would be most annoyed to discover was aspirational.

*Fix:* "Nothing is published here yet. A write-up goes up when there is work we can show and a result we can measure. Ask what we are working on and we will tell you." (152 ch, holds 3 lines at both the 467/16px and 610/22px measures). States the publishing rule without implying a queue.

**/ (Home)** - `home.service-description-02-mobile-apps`

Proposed: "One codebase, both stores. React Native and Expo mean an iOS change and an Android change are the same change, not two pieces of work." "both stores" implies apps live in the App Store and Play Store — a shipped-product claim on a site with no shipped products, and the one phrase on the page a buyer can check in thirty seconds. The second half is also absolute where the shipped FAQ it derives from is hedged: page.tsx:94 says "which is usually the difference between shipping to both and quietly dropping one". Platform-specific work (permissions, push, store review, native modules) is exactly where a client discovers 'the same change' was two changes.

*Fix:* "One codebase, two platforms. With React Native and Expo an iOS change and an Android change are usually one change, not two." (122 ch, inside 120-142). Drops the store-presence implication and restores the FAQ's own hedge.

**/ (Home)** - `home.industry-body-03-enterprise`

Proposed opening: "Security, compliance and the systems already running decide the shape here before design does." Read on an Enterprise column, this scans as the studio offering security and compliance work. Deck p29 lists nothing of the kind — the Enterprise pillar is Migration to React Native, Monitoring & Observability, Release Process Optimization. The corpus is careful not to name SOC 2 or ISO, which is right, but the bare nouns still imply the studio takes compliance on rather than works within it. That is the sentence that gets quoted in a vendor security questionnaire.

*Fix:* Attribute the constraints to the client, which is also more accurate: "The security rules, the compliance obligations and the systems already running decide the shape here before design does." then keep the existing second sentence unchanged. Total 224 ch — identical to the proposal, so the verified 5/5 and 6/6 line counts hold.

**/about** - `about.process-step-body-05-end`

Proposed: "Finished means the stopping condition was met, not that the budget ran out. Both of us know which." This is a commercial commitment dressed as a philosophy line. It tells a buyer the studio does not down tools when money runs out — which, on a fixed-price engagement, is precisely the dispute it will be quoted in. src/content/legal.ts:164 puts scope, fees and deliverables in a separate signed agreement; a values page that pre-empts that agreement's payment terms creates two positions on the same question, and the more generous one is the public one.

*Fix:* Keep the stopping condition, drop the budget contrast: "Finished means the stopping condition was met. Agreed at the start, so both of us know when it is." (98 ch — measures 4 lines at both the 230/16px and 337/24px boxes, same as the proposal). Says the honest thing without underwriting overrun.

**/capabilities/react-native-performance** - `capability.mdx-body-rnp-what-you-get`

Proposed close: "...Then a short session walking your team through what was wrong, so the same class of problem does not come back." That final clause is an outcome guarantee about a team the studio does not control, on a codebase it will not be maintaining. A knowledge-transfer session cannot guarantee non-recurrence, and the sentence is phrased as a deliverable in a '## What you get' section, which is the part of the page that reads as a scope of work.

*Fix:* "A written report with before and after measurements, and the changes as reviewable pull requests. Then a short session walking your team through what was wrong, so the same class of problem is easier to catch next time." (216 ch, inside the 211-240 register window). Same value proposition, no warranty.

#### Low severity (4)

**/about** - `about.hero-story-paragraph`

Proposed: "Recurssive was set up not to skip it." The corpus flags this as the page's only past-tense claim and defends it as asserting intention rather than a date. It still invites the follow-up the page cannot answer — set up when, by whom, how many. On an About page that deliberately carries no founding year, no team and no history, a past-tense founding sentence is the one hook a sceptical reader will pull on.

*Fix:* Present tense removes the hook at no cost to the meaning: "Recurssive exists in order not to skip it." (40 ch vs 38 — the paragraph stays at 321 ch, inside the 316-346 window and still 3/8 lines).

**/ (Home)** - `home.industry-body-01-startups`

Proposed close: "Changing your mind stays cheap for longer." Written in the second person about the reader's own project, this reads as a commitment about how the studio prices change requests, not as a general observation. A client will cite it the first time a mid-build pivot is quoted.

*Fix:* Generalise off the reader: "Changing your mind costs less the earlier you do it." (48 ch vs 42; paragraph goes 232 to 238, still inside 226-250 and still 5/6 lines). True of every project, promises nothing about yours.

**/ (Home)** - `home.process-step-body-03-think`

Proposed: "Options are weighed against cost and time, and the reason for the choice is written down." The corpus's own rationale makes the exposure explicit — "a client can ask to see it". That turns a process description into a per-decision deliverable (a written decision record) that no engagement letter mentions and no other page repeats. It is cheap to honour on a good project and awkward to produce retrospectively on a bad one.

*Fix:* Keep it only if a decision record will genuinely exist on every engagement. If not: "Options are weighed against cost and time, and the reasoning is shared, not only the conclusion." (89 ch — same as the proposal, at the stated 90 ceiling, 3/3 lines at 768).

**/capabilities/react-native-performance** - `capability.mdx-body-rnp-how-we-work`

The corpus rewrites this line's opener but preserves "Hermes sampling profiles, Systrace on Android, Instruments on iOS". Systrace has been deprecated in favour of Perfetto for several Android releases and the React Native docs no longer point at it. This is not a claim-safety issue in the legal sense, but it is the exact kind of detail the target reader — a sceptical CTO — uses to decide whether the rest of the page is current. A named tool that is out of date reads worse than naming no tools.

*Fix:* "Profiling comes first and code changes second. That means Hermes sampling profiles, Perfetto on Android, Instruments on iOS, and a written baseline before any edit, so the improvement is a number rather than an impression." (219 ch, unchanged from the proposal's length).


### Critic 2

> The corpus is strong sentence by sentence and weak as a system. Every string passes the mechanical lint — I ran the full set through a checker and found zero em-dashes, zero en-dashes, zero exclamation marks, zero straight apostrophes, zero 'Recursive'-with-one-s, and zero surviving banned phrases (the one hit my scan raised, "our team" in the React Native Performance deliverables paragraph, is a false positive inside "your team"). Typographically and lexically this is clean work. The failures are all at the level above the sentence.
> 
> Three of them matter most. First, the Home sweep's documented "cross-page consistency" is not cross-page: every FAQ answer it reuses lives in src/app/page.tsx, the same file and the same scroll as the proposals reusing it. On the built Home page after these land, "in front of real people" appears three times, "React Native and Expo" three times, "the same craft" twice, "what is already there" twice, "scope/more than hours" twice, and the Enterprise column repeats FAQ L69 for twelve consecutive words. Restating an idea in different words across pages is discipline; doing it 1,500px apart on one page is a stutter. Second, the recursion metaphor is over-drawn on /about specifically — nine loop/round-again/recursion tokens on one page, five of them inside a single five-item strip that the reader takes in as a list. It should appear twice there: once in the paragraph whose subject it is, once as "base case" in the diamond. Third, the two sweeps contradict each other in public on whether the studio does desktop work, and Home's Desktop Apps row links directly to the page that drops it — each sweep raised half of this in its openQuestions and neither saw the collision.
> 
> Below that sit two register problems. About has acquired a mannerism the shipped copy does not have: eight paragraphs closing on a short aphoristic verdict, three of them consecutive, against exactly one such move in nine shipped answers. And the X-rather-than-Y contrast has been applied as a template rather than observed as a habit — 20 instances across ~40 strings, including four of five value bodies ending on a negation, where the shipped rate is 3 in 9.
> 
> On budgets: nothing actually overflows a window. But five charCounts in the Capabilities sweep are wrong by 1-3 characters, and four slots across Home and About state a floor their own proposal sits below, rescued by a per-string override nobody downstream can reproduce. Neither breaks a layout; both cost the document the precision it claims, which matters because the whole method rests on the owner being able to check it.
> 
> One shipped defect the corpus does not fix and should: "Tell us what you're building, even if it's still rough" already ships in three divergent forms (page.tsx L568, ContactDetails.tsx L65, BuildVision.tsx L62-63), the two-working-days promise in a fourth (contact/thanks L35), and Home says "Tell us what you are building" twice on its own (L89 and L568). That wants a single exported constant before any of this lands, or the four will keep drifting.

#### High severity (6)

**/ (Home)** - `home.industry-body-03-enterprise`

A 12-word verbatim run against an answer on the SAME page. Shipped FAQ, src/app/page.tsx L69: "Less of the work is writing code and more of it is making the thing fit what is already there." Proposed Enterprise body: "Less of the work is writing code and more of it is fitting the thing to what is already there, and to the people who sign it off." Measured: the first twelve words are identical, and the tail reconverges on "what is already there". The same paragraph also re-uses the FAQ's "security and compliance" pair and its "people who have to agree" clause as "the people who sign it off". The sweep files this under "CROSS-PAGE CONSISTENCY I DELIBERATELY MAINTAINED" — but both strings live in page.tsx and a visitor scrolling Home meets them roughly 1,500px apart. This is the single most visible repeat in the corpus.

*Fix:* The industries band comes BEFORE the FAQ in the scroll, so the column keeps the idea and the FAQ answer surrenders it, or vice versa — pick one. Cheapest: rewrite the Enterprise column so it does not restate the code-versus-fitting trade at all, and let it carry the one thing the FAQ answer does not, which is the sequencing. Something on the order of: "Security, compliance and the systems already running decide the shape here before design does. Nothing ships until the people who have to sign it off have seen it, which is a schedule constraint more than a technical one." (223 ch, same word-boundary profile, still one 10+ letter word.) Then re-measure at 434px column 1.

**/ (Home) + /capabilities** - `home.service-description-05-ai-workflows`

The on-device sentence is now written three times sitewide and twice on Home. Shipped FAQ page.tsx L74 ends "...runs AI on the device rather than in someone else’s cloud." Proposed service row 05 opens "Models that run on the device rather than in someone else’s data centre...". The two share a six-word-plus run: "on the device rather than in someone else’s" — only the final noun differs. capabilities.pillar-description-ai-engineering makes it three: "usually on the device rather than in someone’s data centre". Swapping cloud→data centre does not disguise a construction this distinctive; it reads as one sentence the studio cannot stop saying. My n-gram check: home.svc05 and the shipped FAQ share six four-grams; home.svc05 and cap.ai share four.

*Fix:* Home service row 05 is the one to change, because it sits on the same page as L74 and it is the shorter slot. Drop the contrast construction entirely and lead on what the constraint buys, which no other instance says: "The model has to fit on the phone, load fast and answer with the network off. That constraint is what keeps the data where it was collected." (137 ch, inside the 120-142 window, 2/2 at 1920 and 3/3 at 768 needs re-verifying). Keep the "rather than in someone else’s data centre" phrasing for /capabilities only, where L74 is not on screen — and change cap.ai's "someone’s" back to "someone else’s" so the site has exactly one canonical wording rather than three near-misses.

**/ (Home)** - `home.process-step-body-04-create`

"in front of real people" lands three times on one page. Shipped FAQ L84: "a working slice you can put in front of real people". Proposed process step 04: "A working slice goes in front of real people". Proposed Startups column: "a working slice in front of real people". "working slice" itself is also 3x. The two proposals additionally share three four-grams with each other ("front of real people", "in front of real", "of real people and"), so they read as drafts of the same sentence placed in two bands 800px apart.

*Fix:* Keep it in exactly one place. The FAQ answer is shipped and settled, so cut it from both proposals. Step 04 is the flowchart's return leg and should say what returns, not what is shipped: "What people do with it is the next input, and that is what decides the second pass." (85 ch, in the 65-90 window). The Startups column should keep "working slice" only if step 04 loses it — pick one owner for the phrase, and note the column is the better home because it is the one aimed at a reader deciding whether to start.

**/ (Home) vs /capabilities** - `home.service-description-01-desktop-apps`

The two sweeps take opposite public positions on whether the studio does desktop, and the Home row links straight to the page that contradicts it. Home row 01 is 'Desktop Apps' with href '/capabilities/product-development' (page.tsx L38) and the proposed body sells it: "Desktop earns its place when a browser tab will not do." The Capabilities sweep writes the destination pillar as "One React Native codebase covers iOS, Android and web" and states in its own rationale: "Deliberately says iOS, Android and web and NOT desktop... one React Native codebase genuinely covering desktop is a claim I cannot stand behind." So the click path is: read a confident desktop offer, click, land on a pillar description that silently drops desktop. 'Desktop App Development' is a real row in src/content/capabilities-index.ts L72, which makes the omission on the pillar page the anomaly, not the row.

*Fix:* This is the owner's decision, not a wording one, and it must be made once: either desktop is offered, in which case cap.proddev has to include it ("covers iOS, Android, web and desktop" — costs 10 characters against a 219 ceiling at 210 actual, so it fits), or it is not, in which case Home row 01 changes and capabilities-index.ts L72 comes out. Do not ship the current pair. Flag to the owner alongside the Home sweep's own openQuestion on the same subject — the two sweeps each raised half of this and neither saw the collision.

**/about** - `about.process-step-body-04-process`

The recursion metaphor becomes a tic on About specifically. Counted across the proposed About strings: step 01 "Every loop needs an entry point"; step 03 "whether this goes round again"; step 04 "Round again, carrying what the last pass taught. A loop is only worth running..." (two in 99 characters); step 05 "the stopping condition was met"; recursion paragraph "Recursion is the engine of reality" ... "feeds what it learns back into the next version" ... "The ones that never loop quietly stop being used"; meta description "the recursive process behind the work". That is nine loop/round-again/recursion tokens on one page, five of them inside a five-item strip where the reader takes them in as a list. Step 04 is the worst single offender: "Round again" and "A loop" in the same 99 characters, immediately after step 03 has already said "goes round again".

*Fix:* Allow the metaphor twice on About: once in the recursion paragraph (its subject) and once in the strip (step 03's "base case", which is deck p123 and is the one place the term does work the plain word cannot). Strip it everywhere else. Step 01: replace "Every loop needs an entry point" with a plain opening — "Somewhere the work has to start, and it is not with a framework choice. Yours starts as a conversation about what the thing is for." Step 04: cut "Round again" and keep only the falsifiable half — "The second pass is only worth running if the input changed. Otherwise it is the first pass again, more expensively." Leave step 03 and the recursion paragraph as written.

**cross-page (already shipped)** - `home.contact-lead`

One sentence already ships in three divergent forms and the corpus proposes no change to any of them, so the drift will survive the rewrite. src/app/page.tsx L568-570: "Tell us what you’re building, even if it’s still rough. We read all messages and come back within two working days." src/components/ContactDetails.tsx L65: identical wording. src/components/BuildVision.tsx L62-63: "Tell us what you’re building, even if it’s still rough. We read every message ourselves." — same first sentence, a DIFFERENT promise in the second, and no two-working-days commitment at all. src/app/contact/thanks/page.tsx L35 states the promise a fourth way: "We’ll come back to you within two working days." On top of that, page.tsx L89 (FAQ, same page as L568) opens "Tell us what you are building and we will come back with a figure..." — so Home alone says "Tell us what you are/you’re building" twice. The Home sweep's rule note says of the two-working-days promise "change both or neither"; there are four sites, not two.

*Fix:* Lift the sentence into one exported constant (src/lib/site.ts alongside the email and phone) and import it in all three components, so the promise cannot drift again. Settle on the page.tsx L568 wording, which is the one carrying the commitment. Separately, change the FAQ cost answer's opener at page.tsx L89 so "Tell us what you are building" appears once on Home, not twice — "Send the scope and we will come back with a figure tied to it" preserves the sentence and its length.

#### Medium severity (9)

**/ (Home)** - `home.service-description-02-mobile-apps`

Opens with the identical five words as an answer on the same page. Shipped FAQ L94: "React Native and Expo mean iOS and Android share the same app...". Proposed row 02: "React Native and Expo mean an iOS change and an Android change are the same change...". Verbatim leading run measured at five words, and both then use "the same" + a noun. The sweep argues the two frame the saving differently, which is true of the second half and irrelevant to the reader, who hears the same sentence start twice. "React Native and Expo" appears three times on Home once this lands (L74, L94, row 02).

*Fix:* Row 02 keeps the idea, loses the opening. "One codebase, both stores. An iOS change and an Android change are the same change here, not two pieces of work on two schedules." (129 ch, inside 120-142). The technology name is already carried twice by the FAQ on the same page, so the consequence clause rule is satisfied page-wide without row 02 naming it a third time.

**/about** - `about.vision-body`

Register drift from the shipped reference: About ends paragraph after paragraph on a short aphoristic verdict. Measured, nine proposed strings close on a fragment of six words or fewer, and eight of them are on About: "Neither half works alone." (vision), "Both words are doing work." (mission), "We measure the work by what it starts." (purpose), "Including when it is no." (value 01), "Agreed in advance." (step 03), "Both of us know which." (step 05), "Elegance comes from solving, not decorating." (value 05). Purpose, vision and mission are three CONSECUTIVE blocks all ending this way, and two of them ("Neither half works alone" / "Both words are doing work") are the same construction: a two-word subject plus a flat verdict on the sentence you have just read. The shipped FAQ contains exactly one move of this kind in nine answers ("Often.", page.tsx L104) and the About sweep's own note calls it "the page's strongest opening... worth protecting" — then writes eight of them.

*Fix:* Cap it at two per page and never in consecutive blocks. Of the purpose/vision/mission trio, keep one clincher (mission's "Both words are doing work." earns it, because it is a genuine gloss on the canon heading) and let purpose and vision end on their explanation instead. Vision: absorb the close into the preceding sentence — "...tools take the tedium, people keep the judgement, and neither half is much use running alone." Purpose: end on the mechanism rather than the verdict.

**/about** - `about.value-body-05-creativity`

The five value bodies are built to a formula the reader will spot as a list. Four of five end on a negation: "and not expensive to keep running" (performance), "not only to be launched" (foresight), "not decorating" (creativity), and reliability's "Including when it is no." Three of five step bodies do the same ("not on the schedule", "not against a mood", "not that the budget ran out"). Across the whole corpus I count 20 instances of the X-rather-than-Y / comma-not construction in ~40 strings; the shipped reference uses it 3 times in 9 answers. The rule "PREFER THE CONTRAST TO THE SUPERLATIVE" was written from an observed frequency and has been applied as a template.

*Fix:* Let the values block carry the contrast twice, not four times, and vary where it sits. Creativity is the one to convert because it is the last item and the reader is primed by then: "Familiar is the easy answer and rarely the right one. Elegance is what a solved problem looks like." (99 ch, same window). Performance's second triplet also has to go for a separate reason — see the next finding.

**/about** - `about.value-body-03-performance`

Says the same thing twice in 99 characters, using two list-triplets back to back. "Effective, efficient, economical. Quick to use, quick to answer, and not expensive to keep running." Sentence two is a plain-English translation of sentence one, item for item: effective→quick to use, efficient→quick to answer, economical→not expensive to keep running. In a 99-character slot that is half the budget spent restating the other half. It is also the densest rhythm-filler in the corpus: two triplets with nothing between them, which is the shape the banned list targets even though it bans only the em-dash-joined version.

*Fix:* Place the deck's own triplet (p15) or translate it, not both. Translating is better here because "Effective, efficient, economical" is internal vocabulary: "Quick to use, quick to answer, and not expensive to keep running once it is live." (79 ch — under the 88 floor, so add a second clause rather than restoring the first triplet). Or keep the deck triplet and spend sentence two on the one thing neither triplet says, which is what performance work actually costs to maintain.

**/about** - `about.purpose-body`

Breaks the corpus's own hardest rule — "EVERY CLAIM ABOUT US MUST BE FALSIFIABLE BY THE READER IN ONE SENTENCE" — and does so twice in one paragraph. "Creative work spreads." is unfalsifiable. "We measure the work by what it starts." is a claim about an internal practice with no artefact behind it; no reader can check it and there is no measure to point at. The same paragraph's "Something built with care gives the next person permission to build with care" is the register the banned list exists to catch — it is not on the list by name, but "gives the next person permission to" is the same unfalsifiable warmth as "passionate about". By contrast the sweep's own vision and mission bodies are clean and concrete.

*Fix:* Purpose is the hardest slot on the site precisely because the canon heading ("We create to inspire others to create") is already the abstract claim; the body's job is to make it concrete, not to restate it. Anchor it to something checkable — the studio's own practice of publishing how things were built, or the refusal to keep methods private: "The work is meant to be copied. What we figure out gets written down and published, including the parts that did not work, because a method nobody can see helps nobody." (166 ch, needs re-measuring against the 190-220 window before use.) If nothing publishable exists yet, say so to the owner rather than writing round it.

**/capabilities** - `capabilities.page-intro`

"Four groups, nineteen kinds of work" is verifiable against src/content/capabilities-index.ts — I counted 7+5+4+3 = 19 rows, so the number is honest. But Home advertises two service rows that are not among the nineteen: 'Web Design' (the index row is 'Web App Development', L73) and 'AI Workflows' (the four AI rows are On-device AI, Generative AI App Development, AI Knowledge Integration, AI Vibe Coding Cleanup, L102-105). A reader who arrives from Home looking for either will not find it in the nineteen, which is the one moment the number stops being a strength and becomes a discrepancy. Home's proposed row 03 body compounds it by writing to 'Web Design' as pages ("Pages that load fast, read clearly") while the index row is an app-development service.

*Fix:* Either reconcile the Home row names to the index (Web Design→Web Apps, AI Workflows→On-device AI, which is also the row the site's own descriptor claims) or drop the count from the intro. Reconciling is better — the count is the only genuinely differentiating fact the page has, and Home's row 05 already links to /capabilities/on-device-ai, so the name is the only thing out of step. If the rows are renamed, home.service-description-03 needs rewriting from pages to apps.

**/capabilities** - `capabilities.pillar-description-ai-engineering`

Five stated charCounts in the Capabilities sweep do not match the strings. Measured: cap AI pillar stated 201, actual 203; product-development.mdx description stated 123, actual 124; product-dev scope body stated 170, actual 172; react-native-performance how-we-work stated 219, actual 222; enterprise-migration order-of-work stated 142, actual 143. None of these overflows its stated window, so nothing breaks — but the same sweep argues character-level precision in its own rationale ("I trimmed both from 215 deliberately: at 215 the 1920 render is 1.96 lines, inside the error bar"), and it is doing that arithmetic with a count that is two characters out. The charCount field is the audit trail an owner spot-checks; five wrong entries out of the corpus's ~50 costs the whole document its authority.

*Fix:* Recompute every charCount mechanically before this goes to the owner, and state the counting convention (typographic apostrophe counts as one character; leading 'title: ' and 'description: ' prefixes are excluded). Re-run the line-fit for cap.ai at 203, since that slot's rationale claims a 2-character margin.

**/ (Home) + /about** - `about.hero-story-paragraph`

Four slots ship a headline budget that the derivation inside the same budget field contradicts, so nobody downstream can verify them. (1) about.hero-story states "316-346 chars" and then derives "Overlap = 332-346" in the next sentence; the proposal is 319 and the alternate 328, both below the derived floor, rescued only by an unreproducible per-string override. (2) about.process-step bodies 02, 04 and 05 state "101-107" and propose 99, 99 and 98. (3) home.industry-body-03-enterprise states "226-250" and opens with "THIS ONE IS 2 UNDER THE FLOOR AND I AM PROPOSING IT ANYWAY" at 224. The honest ones are self-flagged, which is good practice, but the effect across the corpus is that a floor means nothing — the next editor cannot tell which floors are real.

*Fix:* Split the field in two: a lorem-swept worst-case window (reproducible, conservative) and a per-string verified line count (the actual claim). State them separately so "224 chars, verified 5/5 at 434px and 6/6 at 458px" is checkable without reference to a floor that does not apply to it. Where the per-string measure is the only thing keeping a slot legal, say so in the budget field rather than in the rationale.

**cross-page** - `capabilities.pillar-description-consulting`

Person drifts page by page. Measured across the proposed strings: /capabilities is 8 second-person to 0 first-person; /cases is 1 to 4; /about is 3 to 4; Home is 2 to 2. The shipped reference (nine FAQ answers) is 8 to 5. The result is that /capabilities reads as a sales sheet addressed at the reader while /cases and /about read as institutional statements about the studio — two different voices a visitor meets in one session. The About sweep flags its own 3:3 and argues it is structural; nobody looked at the four pages together, which is where the swing shows.

*Fix:* Nothing needs rewriting for its own sake. The cheapest correction is at the two extremes: give /capabilities one first-person commitment at the close of the Consulting pillar (it is the pillar where a reader is deciding whether to make contact, and "Rarely in a rewrite" is currently a verdict with no one behind it), and convert one of /cases's four first-person instances to second person. Target roughly 3:2 per page rather than a single global ratio.

#### Low severity (5)

**/ (Home) + /about** - `home.process-intro`

The Ask/Listen/Think triad is placed four times across two pages. home.process-intro spells it out: "Ask, listen, think, create, then ask again...". about.meta-description spells it out again: "the recursive process behind the work: ask, listen, think, then build." about.hero paraphrases it as "Asking who the software is for, and then actually listening to the answer". about.process-step-02 offers a near-variant list, "Reading, asking, sketching, building." A visitor going Home to About meets the same four-verb list twice explicitly and twice in paraphrase. Deck p88 is canon and should be placed, but it is being placed four times, not once.

*Fix:* Home's process intro is its rightful home — it is a legend for the flowchart directly beneath it, which is the only place the list is doing structural work. Cut it from about.meta-description (which has 151 characters to spend on something the Home page does not already say) and change about.process-step-02's opening list so it is not a fifth variant: "Which of those it is depends on the question, not on the schedule" works if step 02 leads with something other than a verb list.

**/capabilities** - `capabilities.page-intro`

The alternate exposes internal deck vocabulary to the reader: "The order is the ladder: a second opinion first, a whole system last." Nothing on the page establishes that there is a ladder, so "the ladder" has no referent — it is deck p31's Value Ladder leaking through. The primary handles the same idea correctly by describing the ascent without naming it ("They run from a second opinion up to the system your company depends on"), which is why the primary is the right pick.

*Fix:* Drop the alternate rather than presenting it as an equal option, or rewrite it so the ordering is stated rather than named.

**/capabilities** - `capability.why-us-benefit-headings`

Two of the six drawn 'Why us' labels the sweep offers to write bodies for are banned-list items in different words. Capabilitiy__1920w.txt L267-314 draws 'Latest tech' and 'Future ready'; the banned list forbids 'cutting-edge' and 'future-proof', which is what those two say. 'Solution oriented' is also within a word of 'solutions that scale'. Writing six house-voice bodies underneath three headings that are themselves off-register would put the violation in 48px type above copy that obeys the rule.

*Fix:* Raise it with the owner before the six bodies are written, not after. 'Latest tech' and 'Future ready' both have honest replacements that say more: the studio's actual position is that a technology is named only with its consequence attached, so 'Latest tech' becomes something like 'Chosen for the consequence' and 'Future ready' becomes 'Built to be maintained', which is already the wording of about.value-body-04-foresight and would tie the two pages together properly.

**/cases** - `cases.page-intro`

cases.page-intro and cases.meta-description share eight four-grams and are effectively the same sentence: "...what the problem was, what we built, and what it changed." appears in both. The meta is the search snippet and the intro is the first thing on the page, so a visitor arriving from a search result reads the identical clause twice within a second. The parallel is deliberate per the sweep, and parallelism between a snippet and its page is normally good; verbatim identity is not.

*Fix:* Keep the triplet in the meta (where it does the SEO work) and vary the on-page intro so the landing is not an echo — the intro can afford to be more specific about the standard, e.g. what counts as 'what it changed' when there is no client-supplied metric.

**/ (Home)** - `home.service-description-02-mobile-apps`

Copy and destination disagree. Row 02 'Mobile Apps' links to '/capabilities/react-native-performance' (src/app/page.tsx L39), which is a Consulting-pillar page about profiling an existing app, while the proposed body sells building a new one from one codebase for both stores. A reader who acts on the copy lands on a performance-audit page. Row 01 'Desktop Apps' and rows 03, 04, 06 all point at '/capabilities/product-development', so row 02 is the outlier.

*Fix:* Point row 02 at the product-development page like its siblings, or leave the link and rewrite the body to be about an app that already exists. This is a routing decision the copy cannot fix on its own — flag it with the desktop question above, since both are symptoms of six Home rows being mapped onto four MDX files.


---

## Proposals, page by page

---

## / (Home)

MEASUREMENT: I re-derived every budget from the figspec rather than taking the inventory's on trust, and calibrated the per-character advance against the DRAWN strings instead of the generic 0.48em rule. Calibrated values, each pinned to a drawn box: 16px Open Sans Regular at 1920 = 0.4575em (the 231-ch lorem fills 878x43 in exactly 2 lines); 18px at 1920 = 0.483em (same lorem fills 441x135 in 5 and 696x75 in 3); 24px at 768 with the frame's negative tracking = 0.43em (the 140-ch string fills 516x108 in 3, and the 89-ch step body fills 321x119 in 3); 22px at 768, which is what the BUILD ships (globals.css:88 .t-body clamps to 1.375rem before snapping back to 1rem at lg) = 0.4575em at tracking 0. The generic 0.48em constant is about 5% too wide at 24px and wrongly predicts 4 lines for the design's own service description — worth fixing in the voice system, since it would have made every 768 body a line shorter than drawn. Every proposed string was run through a greedy wrapper against all four boxes (drawn 1920, drawn 768, built 1920, built 768) and the line counts are reported per slot.

ONE THING THE INVENTORY DOES NOT MEASURE: the figspec's `ls-N.0` is NEGATIVE tracking, not positive. The build ships tracking-[-0.05em] against the frames' `ls-5.0` on every heading, so `ls-3.0` on 24px body means -0.72px per character and the line holds MORE characters, not fewer. Reading it as positive is what produces the "768 sets the ceiling at 143" figure; the real 768 ceiling is nearer 150 and 1920 is nowhere near binding either way, so the practical window for the six service rows is 120-142 rather than 126-143.

SLOT THE INVENTORY MISSES: home.hero-headline (page.tsx:171). It has the tightest budget on the page after the 500 body — 58 characters over 2 lines at both breakpoints, currently 55 — and it is the page's only h1. No change proposed; listed so it is measured somewhere.

REGISTER AUDIT OF THE NINE SHIPPED FAQ ANSWERS (page.tsx:60-106), which I was asked to check rather than rewrite: they hold. Zero em-dashes, zero exclamation marks, zero verbal contractions, zero straight apostrophes, no banned lexicon, no numbers except 'two working days' which is not in them. Openings are all subject-first, no 'We'. Both We-initial sentences are final and are commitments. Four colons, all the cash-out shape. One semicolon, balancing web against mobile. Three hedges, all sentence-initial. Second person outnumbers first, 8 to 5. Nothing is off-register and I would change none of them. Two small observations, neither a defect: 'Often.' at page.tsx:104 is the only one-word sentence in the shipped copy, which makes it the page's strongest opening and is worth protecting from a future tidy-up; and the answer at page.tsx:69 carries two 10+ letter words ('constraints', 'compliance') against the one-per-paragraph rule, which tells me that rule is an observed average rather than a hard cap — I have kept to one everywhere except the Enterprise industry body, where 'compliance' is the only 10+ word and 'Integration' was cut to keep it that way.

THE PROCESS BODIES ARE THE ONE PLACE I COULD NOT SATISFY THE DESIGN. 1920 draws three lines of 18px in a 696px box, which wants 161-241 characters; 768 draws three lines in a 321px box at 24px, which caps at about 90. There is no string that satisfies both. I wrote to 768 at 82-89 characters, so all four land 3 lines at 768 as drawn and 2 lines at 1920 against a drawn 3. That direction is deliberate: overshooting at 768 is the failure ProcessFlow.tsx:158-163 already records from the placeholder (five lines where three are drawn, and step 2's index landing inside step 1's last line), whereas undershooting at 1920 only shortens a band whose gaps are min-heights. If the owner wants the drawn 1920 block, the fix is a per-breakpoint string, not a longer sentence.

CROSS-PAGE CONSISTENCY I DELIBERATELY MAINTAINED, so a reviewer can see it is reuse rather than repetition: 'working slice' (process step 04 and Startups, matching page.tsx:84); 'scope more than hours' (Product Strategy, matching page.tsx:89); 'reaches everyone / cheapest to change' (Web Design, matching page.tsx:79); 'someone else's data centre' (AI Workflows, against the shipped 'someone else's cloud' at page.tsx:74); 'The same craft' (industries lead, against page.tsx:69); 'fitting the thing to what is already there' (Enterprise, against the same answer). In each case the idea is restated in different words rather than quoted, so no two places on the page carry the same sentence.

BANNED-LIST AND TYPOGRAPHY LINT: every proposed string was checked programmatically for em-dashes, en-dashes, exclamation marks, straight apostrophes, and 'Recursive' with one s. All clean. Every apostrophe is U+2019. Where a proposed string lands in JSX text rather than a prop it can be pasted as-is; the one caution from problem/page.tsx:31 applies only to props, where an HTML entity renders literally.

WHAT I DID NOT INVENT: no client names, no metrics, no team size, no founding year, no certifications, no compliance frameworks, no 'trusted by'. The two places the design pulls hardest for a fact that does not exist are the Startups column (where traction numbers would sit naturally) and the Enterprise column (where a named standard would sit naturally); both are written to describe the work instead.

FILES READ: D:/johnn/Projects/recurssive/app/docs/design-data/figspec/Home__1920w.txt, D:/johnn/Projects/recurssive/app/docs/design-data/figspec/Home__768w.txt, D:/johnn/Projects/recurssive/app/src/app/page.tsx, D:/johnn/Projects/recurssive/app/src/components/ServiceIndex.tsx, D:/johnn/Projects/recurssive/app/src/components/ProcessFlow.tsx, D:/johnn/Projects/recurssive/app/src/components/Faq.tsx, D:/johnn/Projects/recurssive/app/src/lib/contact.ts, D:/johnn/Projects/recurssive/app/src/content/about.ts, D:/johnn/Projects/recurssive/app/src/content/capabilities-index.ts, D:/johnn/Projects/recurssive/app/src/app/globals.css (typography ramps only). No files were edited.

### `home.hero-headline`

`src/app/page.tsx:171`

- **Current:** Crafting custom web & app experiences that help people.
- **Proposed (55 chars):** Crafting custom web & app experiences that help people.
- **Budget:** 58 ch max, 2 lines. 1920: Inter Semi Bold 72px ls-5% in a 966x130 box (130 = two 65px lines); 966/(0.46x72=33.1) = 29.2 ch/line x2 = 58. 768: 48px ls-5.5% in 621x86 (two 43px lines); 621/(0.4455x48=21.4) = 29 ch/line x2 = 58. Current 55 lands 2 lines at both.
- **Why:** NO CHANGE PROPOSED, and this is a slot the measured inventory omits entirely. The string is the Mission verbatim (deck p13, settled fact) and is DRAWN verbatim in both frames (Home__1920w.txt:17, Home__768w.txt:76). It is also the page's only h1. Rewriting it would contradict a settled brand fact and two drawn frames at once. Listed so the sweep is complete, not because anything is wrong. Note the budget has only 3 characters of headroom: any future edit that adds a word breaks it to 3 lines against a drawn 2.

### `home.service-description-01-desktop-apps`

`src/app/page.tsx:38`

- **Current:** LOREM — 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' (123 ch, shared by all six rows)
- **Proposed (131 chars):** Software that stays open all day, with the files and the keyboard close by. Desktop earns its place when a browser tab will not do.
- **Budget:** 120-142 ch. Re-measured from the drawn strings rather than the 0.48em rule: 1920 draws the 231-ch lorem in an 878x43 box over 2 lines, so 16px Open Sans Regular runs 0.4575em = 7.32px/ch and the line caps at 119; 768 draws its own 140-ch string in a 516x108 box over 3 lines, so 24px with the frame's -3% tracking runs 0.43em = 10.32px/ch and caps at 50/line. The build's 768 ramp is 22px at tracking 0 (globals.css:88, .t-body clamp) in the same 516 cap (ServiceIndex.tsx:141), which caps at 51. 131 ch verified at 2/2 lines at 1920 and 3/3 at 768 on both the drawn and the built measure. NB the inventory's '119.5 ch/line' at 1920 is right; its '50.1' at 768 is right too — only the generic 0.48em constant is slightly wide, and it wrongly predicts 4 lines for the design's own drawn string.
- **Why:** Definition-by-activity opening, no 'We' (styleRules: zero of nine shipped FAQ answers open with it). Two sentences, the shipped 2-3 distribution. Closes on X-rather-than-Y ('when a browser tab will not do') so the judgement rides on the contrast, not an adjective. Zero em-dashes, zero contractions in explanatory body, no 10+ letter word. Claims nothing that does not exist — it says when desktop is the right shape, which is checkable, rather than asserting desktop expertise.

### `home.service-description-02-mobile-apps`

`src/app/page.tsx:39`

- **Current:** LOREM (123 ch)
- **Proposed (134 chars):** One codebase, both stores. React Native and Expo mean an iOS change and an Android change are the same change, not two pieces of work.
- **Budget:** 120-142 ch (same geometry as row 01). Verified 2/2 lines at 1920, 3/3 at 768 on both the drawn and the built measure.
- **Why:** THE CONSEQUENCE CLAUSE, which is the one rule that governs naming a technology: React Native and Expo appear with what they save attached, exactly as the shipped answer at page.tsx:94 does. Deliberately NOT a paraphrase of that answer — the FAQ frames the saving as 'shipping to both versus quietly dropping one', this frames it as one change instead of two, so the page does not say the same sentence twice. Opens on a three-word fragment, which is the tightest way to spend the first line of a two-line box.

### `home.service-description-03-web-design`

`src/app/page.tsx:40`

- **Current:** LOREM (123 ch)
- **Proposed (135 chars):** Pages that load fast, read clearly and hold up on a phone. The browser reaches everyone at once and stays the cheapest thing to change.
- **Budget:** 120-142 ch (same geometry as row 01). Verified 2/2 lines at 1920, 3/3 at 768. This is the ACTIVE row in both frames — the one drawn with the preview card, the gradient band and inverted #FAFAFA text — so it is the only description a visitor is guaranteed to read in the hover state.
- **Why:** Deliberately consistent with the shipped FAQ answer at page.tsx:79 ('Web reaches everyone immediately and is cheaper to change'), restated rather than repeated so the two do not read as copy-paste. Three plain verbs (load, read, hold up) instead of a design adjective — 'Web Design' is the row name, so the body's job is the consequence, not the category. No superlative about us; the superlative is about the medium ('cheapest thing to change'), which is a falsifiable claim about web versus native rather than about the studio.

### `home.service-description-04-uiux-design`

`src/app/page.tsx:41`

- **Current:** LOREM (123 ch)
- **Proposed (130 chars):** How the thing is understood before it is decorated: what goes on which screen, in what order, and what happens when it goes wrong.
- **Alternate:** What goes on which screen, in what order, and what happens when it goes wrong. Decoration is the last part, not the first. (122 ch, also 2/2 and 3/3 lines)
- **Budget:** 120-142 ch (same geometry as row 01). Primary verified 2/2 lines at 1920, 3/3 at 768; alternate at 122 ch verified the same.
- **Why:** CLAIM, THEN THE COLON THAT CASHES IT OUT — the shipped pattern at page.tsx:69, one colon, three concrete items after it. This is the only single-sentence body of the six, which is why the alternate exists: the two-sentence version obeys the 2-3-sentences-per-paragraph rule strictly and sacrifices the colon shape. Genuinely open call, so both are given. 'what happens when it goes wrong' is the error-state discipline the shipped MESSAGES block already practises (lib/contact.ts:42-62) and is the least generic thing a UI/UX row can say.

### `home.service-description-05-ai-workflows`

`src/app/page.tsx:42`

- **Current:** LOREM (123 ch)
- **Proposed (132 chars):** Models that run on the device rather than in someone else’s data centre, so the answer arrives without a network and nothing leaves.
- **Alternate:** Models that run on the device rather than in someone else’s data centre. The answer arrives without a network and the data stays put. (133 ch, also 2/2 and 3/3 lines)
- **Budget:** 120-142 ch (same geometry as row 01). Primary verified 2/2 lines at 1920, 3/3 at 768; alternate at 133 ch verified the same.
- **Why:** X RATHER THAN Y, with the on-device consequence attached — this row is the studio's actual differentiator (site descriptor: on-device AI) and the deck's 'Tech for people by people' reading of it is privacy, not novelty. Echoes the shipped 'rather than in someone else’s cloud' at page.tsx:74, with 'data centre' rather than 'cloud' so it is not the same phrase twice on one page. Typographic apostrophe U+2019, as every shipped string uses. Primary is one sentence with the documented contrast pattern; alternate splits it in two for the sentence-count rule. Note 'AI-powered' as a bare adjective is banned and is absent.

### `home.service-description-06-product-strategy`

`src/app/page.tsx:43`

- **Current:** LOREM (123 ch)
- **Proposed (138 chars):** Deciding what to build first, what to cut and what can wait. Scope moves a budget more than hours do, so it is settled before code starts.
- **Budget:** 120-142 ch (same geometry as row 01). 138 is the longest of the six and still verified 2/2 lines at 1920 and 3/3 at 768; treat 142 as the hard ceiling.
- **Why:** Gerund opening (definition by activity, page.tsx:64's own shape). The second sentence restates the shipped cost commitment at page.tsx:89 ('Cost tracks scope more than hours') so the page and the FAQ agree — that answer is one of the three the owner settled as a business commitment, and a strategy row that contradicted it would create two public positions on pricing. No figures, per the note at page.tsx:54-58.

### `home.industries-lead`

`src/app/page.tsx:304`

- **Current:** LOREM (123 ch) — the {LOREM} in the <p className="t-item hidden font-semibold text-cloud lg:block">
- **Proposed (126 chars):** The same craft at three different scales. What changes is who has to agree, how much already exists, and how fast it can move.
- **Alternate:** The same craft at three different scales. What changes is how much already exists, who has to agree, and how fast it can move. (126 ch, same line count — the two orderings map the three columns in different sequences)
- **Budget:** 105-130 ch, 3 lines, 1920 ONLY. Figspec draws 651x114 at Open Sans SemiBold 32px ls-5% (114 = three 38px lines) holding the 123-ch lorem, so ~45 ch/line. THE BUILD IS NARROWER THAN THE DRAWN BOX: page.tsx:285 gives this cell minmax(0,610fr) of a 1594 column = 610px, while the drawn box is 651 starting at x1147 and running to x1798, i.e. 41px past the content column's right edge at 1757. At 610 the cap falls to ~42 ch/line — and the design's OWN 123-ch string breaks to 4 lines there. 126 ch survives at 3 lines in both boxes only because of where its words fall. Verified 3/3 at 651 and 3/3 at 610. Anything longer than ~130 should be re-checked at 610, not at 651. The 768 frame drops this paragraph entirely and the build hides it below lg, so there is no second constraint.
- **Why:** Biggest body type on the page (32px semibold), so it has to earn every word. Opens by naming the through-line ('The same craft') and then does the work in the contrast — which is the shipped move at page.tsx:69, 'The same craft with more constraints'. Reusing that stem deliberately: it is the one phrase the FAQ already uses to relate small and large clients, and this paragraph's whole job is to say the three columns are not three different companies. Three-item list with no colon (the colon budget is spent in the service rows), no em-dash, no 'We' opening, no client claims.

### `home.industry-body-01-startups`

`src/app/page.tsx:119`

- **Current:** No per-item string exists. `industries` (page.tsx:118-122) carries only { name, shape }; the render at page.tsx:358 prints one shared LOREM_LONG (231 ch) three times.
- **Proposed (232 chars):** Usually the question is whether the idea holds, not which framework wins. The fastest honest answer is a working slice in front of real people, and then a decision about what to build next. Changing your mind stays cheap for longer.
- **Budget:** 226-250 ch, 5 lines at 1920 and 6 at 768. 1920: 441x135 at 18px Open Sans Regular (135 = five 27px lines); the drawn 231-ch lorem fills exactly five, so 18px runs 0.483em = 8.69px/ch and caps at 50/line (49 in column 1, which is drawn 434 not 441). 768: 461x216 at 24px ls-3% = six 36px lines, cap 44. The build at 768 renders 22px in the 458px card (page.tsx:352,357), cap 45. Floor is 5x45 = 226 to reach the sixth line at 768; ceiling is 5x50 = 250 before a sixth appears at 1920. Verified 5/5/6/6.
- **Why:** REQUIRES A SCHEMA CHANGE FIRST: `industries` needs a `body` field before three different paragraphs can exist. Flagged in notes. Copy: front-loaded one-word hedge ('Usually'), which is the shipped position for all three hedges in the FAQ and never mid-sentence. Three sentences, the top of the shipped range. Second person at the close ('Changing your mind'). Restates the MVP position from page.tsx:99 and the working-slice position from page.tsx:84 without repeating either sentence. No 'trusted by', no funding-stage names, no client claims — a startup column is where invented traction is most tempting and there is none here.

### `home.industry-body-02-smbs`

`src/app/page.tsx:120`

- **Current:** No per-item string exists (shared LOREM_LONG, 231 ch).
- **Proposed (227 chars):** Something already exists and mostly works, which is the harder case. One thing is slow, one thing is still manual, and nobody is sure which fix is worth paying for. Start with what it costs you now, then change that part first.
- **Budget:** 226-250 ch (same geometry as column 01, but this is drawn in the 441px column). Verified 5/5 lines at 1920, 6/6 at 768. At 227 it sits one character above the floor: do not shorten it.
- **Why:** REFUSE THE FLATTERING READING — 'which is the harder case' concedes that an existing system is more work than a blank page, which is the opposite of the usual pitch and is checkable by anyone who has tried it. Three sentences, imperative close, second person twice ('costs you', and the implied you of 'Start'). Consistent with the rescue answer at page.tsx:104 ('We start with an audit of what is there, then fix what is costing you most') without reusing its wording. No company-size numbers, no 'SMB' jargon in the body — the column heading already says it.

### `home.industry-body-03-enterprise`

`src/app/page.tsx:121`

- **Current:** No per-item string exists (shared LOREM_LONG, 231 ch).
- **Proposed (224 chars):** Security, compliance and the systems already running decide the shape here before design does. Less of the work is writing code and more of it is fitting the thing to what is already there, and to the people who sign it off.
- **Budget:** 226-250 ch (same geometry as column 01) — THIS ONE IS 2 UNDER THE FLOOR AND I AM PROPOSING IT ANYWAY. Verified 5/5 lines at 1920 and 6/6 at 768 on both the drawn 461@24 and the built 458@22 measure, because the floor of 226 is a worst-case wrap and this string's word boundaries land favourably. Longer versions were tested: at 233 and 244 ch it holds 6 lines at 768 but gains a sixth line in the 434px first column at 1920. 224 is the version that satisfies every one of the four boxes simultaneously.
- **Why:** Carries the enterprise answer's own list from page.tsx:69 ('security and compliance to satisfy, and more people who have to agree') into the column that is actually about enterprise, reordered so it is not a quotation. 'Less of the work is writing code and more of it is fitting the thing to what is already there' is lifted deliberately — that clause IS the settled house position on enterprise work and restating it consistently is better than inventing a second one. One 10+ letter word ('compliance'); 'Integration' was cut from an earlier draft precisely because it made two. No client names, no compliance frameworks named (SOC 2, ISO, HIPAA) — naming one would be an implied certification claim.

### `home.process-step-body-01-ask`

`src/app/page.tsx:110`

- **Current:** LOREM (123 ch), shared by all four steps
- **Proposed (82 chars):** Development starts with the right questions, and none of them are about the stack.
- **Budget:** 65-90 ch. THE TWO FRAMES CONFLICT AND CANNOT BOTH BE SATISFIED. 1920 draws 696x75 at 18px = three 27px lines holding the 231-ch lorem, so it wants 161-241 ch. 768 draws 321x119 at 24px ls-4% = three 36px lines holding its OWN 89-ch string, so it caps at ~90. No overlap. Resolution: write to 768, which is the shorter constraint and the one that breaks visibly — ProcessFlow.tsx:158-163 records the exact failure, 123 ch giving five lines where three are drawn and step 2's index landing 22px inside step 1's last line. At 82 ch this lands 2 lines against a drawn 3 at 1920, which only shortens the band; GAPS (ProcessFlow.tsx:165-169) are min-heights, so nothing collides. Verified 3/3 at both the drawn 321@24 and the built 330@22.
- **Why:** Places two settled brand-philosophy lines in one sentence: 'Development is all about asking the right questions' and 'Tech stack is just means to an end' (deck pp72/88). Neither is quoted, both are legible. This is the highest-value 82 characters on the page because the step is named Ask and the deck's p88 line is its source. Full declarative sentence, matching the other three so the four read as one voice.

### `home.process-step-body-02-listen`

`src/app/page.tsx:111`

- **Current:** LOREM (123 ch)
- **Proposed (84 chars):** Usually the useful part gets said once, in passing, by someone who is not in charge.
- **Budget:** 65-90 ch (same conflict and resolution as step 01). Verified 3/3 lines at 768 on both the drawn and the built measure; 2 lines at 1920 against a drawn 3.
- **Why:** HEDGE AT THE FRONT — 'Usually' in position 1, the only legal position per the shipped pattern (three hedges in nine answers, all sentence-initial). The claim is falsifiable in one sentence and is the actual argument for the step being called Listen rather than Gather Requirements. 'someone who is not in charge' is the concrete detail that keeps it from being a platitude; it also quietly encodes the deck's Empathy value without using the word.

### `home.process-step-body-03-think`

`src/app/page.tsx:112`

- **Current:** LOREM (123 ch)
- **Proposed (89 chars):** Options are weighed against cost and time, and the reason for the choice is written down.
- **Budget:** 65-90 ch (same conflict and resolution as step 01). At 89 this is at the ceiling — the design's own 768 string is 89 ch, so this is exactly the drawn length. Verified 3/3 at 768. Do not add a word.
- **Why:** This step is the decision diamond (shape: 'decision', label 'Decide what to do') and the deck's base case at p123 is the rule that decides stop or continue — so the body has to describe a decision being made and recorded, not a brainstorm. 'the reason for the choice is written down' is the falsifiable half: a client can ask to see it. Passive voice is deliberate here and only here; the alternative ('We weigh the options') opens with 'we', which zero of the nine shipped answers do.

### `home.process-step-body-04-create`

`src/app/page.tsx:113`

- **Current:** LOREM (123 ch)
- **Proposed (86 chars):** A working slice goes in front of real people, and what they say starts the loop again.
- **Budget:** 65-90 ch (same conflict and resolution as step 01). Verified 3/3 lines at 768 on both measures; 2 lines at 1920 against a drawn 3.
- **Why:** The fourth step has to close the loop or the flowchart is four boxes in a column. 'starts the loop again' returns the reader to step 01 and is the only place the recursion thesis (deck p112, 'feedback, memory, iteration') pays off in body copy on this page. 'loop' is lexicon; 'working slice' matches the shipped timeline answer at page.tsx:84 word for word, so the process band and the FAQ describe the same practice.

### `home.process-intro`

`src/app/page.tsx:526`

- **Current:** LOREM (123 ch) — the paragraph under 'Our Process'
- **Proposed (107 chars):** We create in circles. Ask, listen, think, create, then ask again with better questions than the first time.
- **Alternate:** We create in circles. Ask, listen, think, create, then start again with better questions than last time. (104 ch, also 2 lines everywhere)
- **Budget:** 60-109 ch, 2 lines. 1920: 421x37 at 16px = two 18.5px lines holding the drawn 110-ch string, cap ~57/line. The build renders lg:max-w-xl = 576px (page.tsx:526), cap ~78, so 107 is still 2 lines there. 768: 610x62 at 24px ls-3% = two 31px lines, cap ~59; the build's 610 at 22px caps at ~60. Verified 2/2 at all four measures. 109 is the hard ceiling — the design's own string is 110 and sits exactly on 2 lines at 1920.
- **Why:** THE ONE SLOT WHERE A CANON LINE IS PLACED RATHER THAN WRITTEN. 'We create in circles' is Recurssive Language Pt.4 (deck p226) and the voice system names this paragraph as its sanctioned home — it is also the sole licensed exception to the never-open-with-'We' rule. The second sentence is the four step names in order (Ask / Listen / Think / Create, page.tsx:110-113) turned back into the loop, so the intro is a legend for the flowchart underneath it rather than a separate claim. Primary and alternate differ only in the close; 'than the first time' is slightly stronger because it names a first pass, which is what makes the second one recursive.

### `home.contact-lead`

`src/app/page.tsx:568`

- **Current:** Tell us what you’re building, even if it’s still rough. We read all messages and come back within two working days. (115 ch)
- **Proposed (115 chars):** Tell us what you’re building, even if it’s still rough. We read all messages and come back within two working days.
- **Budget:** THE OVERSET HERE IS A LAYOUT BUG, NOT A COPY BUG, AND I AM PROPOSING NO COPY CHANGE. Drawn 1920: 407x72 at 16px holding a 102-ch string on 2 lines (the box has slack for 3), cap ~52. Drawn 768: 573x65 at 24px ls-4% on 2 lines, cap ~54. The build caps this paragraph at max-w-md = 448px at EVERY width (page.tsx:567). At 1920 that is wider than the drawn 407, so 115 ch lands 2 lines and is correct. At 768 .t-body ramps to 22px (globals.css:88) in the same 448px, cap ~42, so 115 ch takes 3 lines where the design draws 2 in a 573px box — the box is 125px narrower than drawn. Fitting 2 lines at 448px/22px would mean cutting to ~84 ch, which cannot be done without dropping the two-working-days promise.
- **Why:** Leaving the sentence alone and widening the box is the correct fix: the promise is load-bearing (it is repeated on /contact/thanks, and page.tsx:562-564 says change both or neither), and a parallel sweep is already proposing edits to that same sentence on /contact — see openQuestions. Suggested build change, for the owner not for me: give this paragraph lg:max-w-md and max-w-[573px] so 768 gets the drawn measure. Register check on the existing string: contraction in second-person microcopy (legal), typographic apostrophes, no em-dash, 'we' last, two sentences. It is in voice as written.

### Open questions - / (Home)

- STRUCTURAL BLOCKER, needs a code change before three of my proposals can land: `industries` at src/app/page.tsx:118-122 is [{ name, shape }] with no `body` field, and the render at page.tsx:358 prints one shared LOREM_LONG three times. Three different industry paragraphs cannot exist until an item-level `body` is added and the <p> reads {body} instead of {LOREM_LONG}. Owner's call whether to add the field now or keep one shared paragraph — if it stays shared, only one of my three can be used and the column headings Startups / SMBs / Enterprise stop meaning anything.
- The 768 frame supplies SHORTER FAQ questions for four of the nine and the build ships only the 1920 wording. Home__768w.txt:24,29,39,54 draw 'What types of apps do you build?' (32 ch), 'Should I build a web or mobile app?' (35), 'How much does an app cost?' (26) and 'Do you offer app redesign services?' (35), against the shipped 41 / 39 / 35 / 46. At 768 the summary renders 26px in roughly 488px of usable width (Faq.tsx:47, .t-question 1.625rem), which is about 35 characters a line — so questions 3, 4, 5 and 9 wrap to two lines and each drawn 61px panel grows to about 95px. Nothing breaks (min-h, not h) but the drawn rhythm does. Three options and only the owner can pick: ship one string and accept the wrap, add a short variant per question and swap below lg, or shorten the 1920 wording to the 768 wording everywhere. Note the 768 variants also drop the brand name from question 3 ('does Recurssive build' -> 'do you build'), which is an SEO decision, not only a length one.
- Does the studio actually do desktop work? Row 01 is 'Desktop Apps' in both frames and 'Desktop App Development' is listed under Product Dev in src/content/capabilities-index.ts:73, so I have written to it — but the settled positioning is React Native / Expo / on-device AI, and my line implies desktop is a considered offer rather than a row inherited from the design. If it is not something you want enquiries for, the honest fix is to change the row, not the sentence.
- The contact lead at page.tsx:568 is being edited by a parallel sweep. A sibling agent's working file in this session's scratchpad shows candidate rewrites of the same sentence for /contact (including replacing it with Recurssive Language Pt.2, 'Got an idea that keeps coming back? Contact us'). The Home instance, /contact, /contact/thanks and BuildVision.tsx:62 all carry versions of it. Decide once, centrally, or the four will drift.
- Should the industries lead paragraph be built at its drawn width? The frame draws it 651px wide running to x1798, which is 41px past the content column's right edge at x1757; the build gives it 610 (page.tsx:285). At 610 the design's own placeholder breaks to four lines against a drawn three, so the drawn box is genuinely wider than the grid allows. My 126-ch line holds three lines at both widths, but the margin is a word.

---

## /about

MEASUREMENT. I did not take the inventory's budgets on trust. I built a greedy line-breaker over approximate Open Sans Regular advance widths and calibrated it against every drawn lorem string on both About frames: PVM 620x66@16 -> 3, recursion 1128x68@16 -> 3, hero story 846x66@16 -> 3, value 266x79@14 -> 3, process 230x79@16 -> 4, and the 768 counterparts at 24px with ls-3% -> 4, 8, 8, 2, 4. It reproduces all ten, plus the shipped Home FAQ answer at 640x91@16 -> 3. Effective advance is 0.477em for Open Sans Regular; the 768 ls-3.0 is -3% of the font size, giving 0.447em. The inventory's stated "0.48 / 0.46" rule is right; its arithmetic in two places is not (it reports 153.6 ch/line for 1128px@16, which implies 0.459em, and it is that slip that produced the two "frames CONFLICT, no overlap" verdicts I correct below). All sixteen proposed strings were then measured individually and every one lands on the drawn line count at BOTH breakpoints. 16/16.

THREE BUDGET CORRECTIONS.
1. about.hero-story-paragraph: the inventory says 1920 (242-328) and 768 (346-358) do not overlap and tells you to take 1920. They do overlap: 230-346 against 332-369, window 332-346. The drawn 1920 lorem is itself 334 ch, which is only explicable if the overlap exists. Writing to 319-330 satisfies both frames instead of sacrificing the 768 band.
2. about.process-step-body: the inventory says 103-119. The 1920 ceiling for 4 lines in a 230px box is 107. Anything from 108 takes a fifth line and pushes the strip past its drawn height - the exact failure mode STATE.md already records on Home. The real window is 101-107 and it is the tightest on this page.
3. about.recursion-paragraph: the inventory says 435-438 ("the tightest window on the site"). Measured, it is 404-443. I confirmed the floor is real by testing a 417-ch variant that drops the word "scaffolding" - it falls to 7 lines at 768 - but the ceiling is 443, not 438, and the window is 40 characters wide rather than 4.

WHAT THIS PAGE CANNOT SAY. There is no team, no founding year, no history and no client work, and the About page is the slot that structurally begs for all four. Nothing above invents any of them. The hero story paragraph is written as a statement of method rather than of origin, and "Recurssive was set up not to skip it" is the only past-tense claim on the page - it asserts an intention, not a date or a founder count. If the owner wants a genuine origin story, that is a fact I do not have and it belongs in a follow-up, not in a guess.

REGISTER AUDIT of the fifteen body strings (excluding the alternates). Zero em-dashes. Zero exclamation marks. Zero semicolons. Zero contractions in explanatory copy. Zero straight apostrophes - the one apostrophe on the page is U+2019 in "yesterday’s". Zero numbers, so nothing here becomes a public promise. Zero title case, all-caps or bold. Zero banned-list terms. "Recurssive" appears twice with the double s; "recursion"/"recursive" appear with the single s and only as the noun and adjective, which is the correct split. No paragraph opens with "We"; the two first-person sentences are both the FINAL sentence of their paragraph and both are commitments, matching page.tsx L79 and L104 exactly. Openings are Asking / Creative / Machines / Custom / Stability / Understanding / Effective / Preventing / Familiar / Every / Reading / The / Round / Finished / Recursion.

TWO PLACES I KNOWINGLY BROKE A RULE, both flagged in the proposal rationales rather than hidden. (a) The 10-letter-word ceiling: value.empathy has two (Understanding, Accessible) and about.recursion has three (spiralling, yesterday’s, scaffolding). All five are the deck's own words - p15's Empathy cascade and p112's text - and all five are concrete rather than Latinate marketing, which is what that rule exists to catch. (b) Sentence count: about.recursion runs four sentences against the shipped 2-3, which is proportionate at 429 ch when the shipped answers are 211-240 ch, and its longest sentence is 31 words against a shipped max of 32.

THE ONE REGISTER FIGURE I MISSED. Second person outnumbers first person 8:5 in the shipped Home answers. Across my fifteen strings the ratio is 3:3 (you/your in mission, step.start, value.reliability; we/us/our in hero, purpose, step.end). About is a page about the studio, so a lower "you" count is structural rather than a slip - but it is a slip against the stated rule and you should know I could not fix it without inventing a reader the page does not otherwise address. If you want the ratio restored, the cheapest place is value.foresight and value.creativity, both of which currently have slack (98 ch against a 107 ceiling).

SENTENCE LENGTH. Mean across all fifteen is 11.7 words against the shipped 17.0. That is driven entirely by the ten short slots - the five value bodies and five step bodies are 98-107 characters each and physically cannot hold a 17-word sentence twice. Across the five prose slots (hero, purpose, vision, mission, recursion) the mean is 14.6 with a max of 31, which is inside register.

SLOTS ON THIS PAGE I DID NOT WRITE. BuildVision ("Let’s build your vision" + its 88-ch body, src/components/BuildVision.tsx L62) renders on About but is a shared component already carrying real copy, and the inventory assigns it across five pages - the note there that it comes in ~33px short at 768 still stands and is not mine to change unilaterally. The "(Our Story)", "(Purpose)", "(Vision)", "(Mission)", "Our Values" and "We live & breathe recursion" strings are drawn labels and canon headings and are untouched. The three purpose/vision/mission headings are deck pp9/11/13 verbatim and I confirmed about.ts L1-16 already documents why they follow the deck rather than the frame; I did not touch them.

FILES READ, NONE EDITED: docs/design-data/figspec/About__1920w.txt, About__1920w_2.txt, About__1920w_3.txt, About__768w.txt; src/app/about/page.tsx; src/content/about.ts; src/app/page.tsx L50-119; src/app/globals.css L82-92 and L405-418; src/app/theme.css L128-142; deck-text.txt pp8-15, 25-31, 76-95, 108-125.

### `about.hero-story-paragraph`

`src/app/about/page.tsx:71`

- **Current:** Inline lorem under the "(Our Story)" eyebrow, white on the full-bleed hero photograph (334 ch)
- **Proposed (319 chars):** Asking who the software is for, and then actually listening to the answer, is the part most projects skip. Recurssive was set up not to skip it. The tech stack is a means to an end here, never the point, and the question comes before the framework every time. We would rather be slow at the start than wrong at the end.
- **Alternate:** Understanding people is the only reliable way to design for them, and it is the part most projects treat as optional. Recurssive treats it as the method, not as a phase to get through. The tech stack is a means to an end, never the point, and no framework has ever rescued a product nobody wanted. We ask first and build second. (328 ch, also 3/8.) This is the genuinely open call on the page: the primary leads with the ACTIVITY (asking, listening) and the alternate leads with the PRINCIPLE (human-centricity, deck p83). The alternate is closer to the deck; the primary is closer to the shipped FAQ register.
- **Budget:** 316-346 chars. 1920: 846px @16px Open Sans Regular -> 3 lines (drawn box 846x66, 3 lines auto-height = 65.4px, confirmed); the 3-line window is 230-346. 768: 485px @24px ls-3% -> 8 lines (drawn box 485x237); the 8-line window is 332-369. Overlap = 332-346, and this string lands 3/8 exactly when measured per-string (English packs tighter than the lorem the window was swept with). NOTE: the slot inventory says these two frames have NO overlap (242-328 vs 346-358). That is wrong - the drawn 1920 lorem is itself 334 ch, inside the overlap. My greedy line-breaker reproduces every drawn line count on this page (16/16), including this box.
- **Why:** Deck p86 "We have to understand people, so we can design for them" and p88 "The most powerful tools we have: Ask, Listen, Think", with p72 "Tech stack is just means to an end". Opens with a gerund (DEFINITION BY ACTIVITY, page.tsx L64 pattern), never with "We". First person is earned at the close and is a commitment (PUT 'we' LAST - matches page.tsx L79/L104). "X rather than Y" closer. Four sentences at 19/8/22/13 words for a 319-ch slot. Zero em-dashes, zero contractions, zero colons, no invented history, no team, no founding year.

### `about.purpose-body`

`src/content/about.ts:22`

- **Current:** Lorem (217 ch) under the canon heading "We create to inspire others to create."
- **Proposed (197 chars):** Creative work spreads. Something built with care gives the next person permission to build with care, and none of it is meant to be the last word on anything. We measure the work by what it starts.
- **Budget:** 190-220 chars. 1920: 620px @16px -> 3 lines (drawn box 620x66 = exactly 3 auto lines); 3-line window 172-245. 768: 610px @24px ls-3% -> 4 lines (drawn box 610x122); 4-line window 172-220. Overlap 172-220; the drawn lorem sits at 217. Verified per-string at 3/4.
- **Why:** Deck p8 defines Purpose as "why we exist beyond making money", and p87 "We make the world better by leaving something creative behind" is the same thought. Body explains the heading rather than restating it. Opens with "Creative" (not "We"); the single first-person sentence is the last one and is a commitment. Falsifiable in one sentence. No numbers, no clients, no awards.

### `about.vision-body`

`src/content/about.ts:27`

- **Current:** Lorem (217 ch) under the canon heading "Creativity driven by people, efficiency driven by tech."
- **Proposed (205 chars):** Machines are good at the repeatable parts and poor at the parts a person will remember. Keeping that line honest is the ambition: tools take the tedium, people keep the judgement. Neither half works alone.
- **Budget:** 190-220 chars (same geometry as Purpose: 1920 620x66 = 3 lines, 768 610x122 = 4 lines). Verified per-string at 3/4.
- **Why:** This is deck p76 ("The Battle Must Become Balance": Automated/Human, IQ/EQ, Logic/Emotion) read as the vision's own two halves, and p10 defines Vision as the 5-20 year ambition, so the middle sentence names it as an ambition rather than a fact. One colon, cashing out the claim before it (the page.tsx L69 pattern). Opens with "Machines". "judgement" is the British spelling, consistent with 'licence' in about/page.tsx L24 and en-GB in lib/contact.ts L105.

### `about.mission-body`

`src/content/about.ts:32`

- **Current:** Lorem (217 ch) under the canon heading "Crafting custom web & app experiences that help people."
- **Proposed (215 chars):** Custom means the thing is shaped around your problem, not around a template that shipped for someone else. Help means it has to hold up on a bad day, on an old phone, on a slow connection. Both words are doing work.
- **Budget:** 190-220 chars (same geometry as Purpose). Verified per-string at 3/4. At 215 this is the closest of the three to the 768 ceiling of 220 - do not lengthen it.
- **Why:** Deck p12 defines Mission as "the commitment", so the body cashes out the two load-bearing words in the canon heading rather than paraphrasing it. "X rather than Y" via 'not around a template' (page.tsx L84 pattern). Carries the page's only sustained second person ("your problem"), which keeps the you/we ratio from inverting. No 10-letter-plus word except 'connection'.

### `about.value-body-01-reliability`

`src/content/about.ts:45`

- **Current:** One shared lorem (116 ch) mapped over all five value names - there is no per-value body field yet
- **Proposed (107 chars):** Stability and security in the product, and a straight answer when you ask for one. Including when it is no.
- **Alternate:** Stability and security in the product. A straight answer in the relationship, including a slow no. (98 ch, also 3/2.) Genuinely open because the primary sits on the 107-char ceiling with no slack; the alternate buys 9 characters and uses the deck's own word 'relationship' (p15) instead of second person. Pick the alternate if the owner wants headroom, the primary if he wants the 'you' in the values block.
- **Budget:** 88-107 chars. 1920: 266px @14px -> 3 lines (drawn box 266x79, drawn string 116 ch = 3 lines); 3-line window 81-107. 768: 575px @24px ls-3% -> 2 lines (drawn box 575x55, drawn string 103 ch); 2-line window 63-107. Overlap 81-107. NOTE the two frames draw DIFFERENT strings here (116 at 1920, 103 at 768) and the 1920 string would be 3 lines at 768, breaking the 55px box - so 107 is a hard ceiling, and this proposal sits exactly on it. Verified per-string at 3/2.
- **Why:** Deck p15 cascades Reliability into In Relationship / In Support / In Responsibility (people level) and Stability / Security / Clarity / Usability (product level). The body carries one term from each level so the value is not just an adjective. Second sentence is the falsifiable commitment. Zero jargon, zero superlative.

### `about.value-body-02-empathy`

`src/content/about.ts:45`

- **Current:** One shared lorem (116 ch) mapped over all five value names
- **Proposed (99 chars):** Understanding people before designing for them. Accessible by default, because bad days are normal.
- **Budget:** 88-107 chars (same geometry as Reliability). Verified per-string at 3/2.
- **Why:** Deck p15 cascades Empathy into Understanding / Experience / Communication and User Centricity / Emotional Design / Accessibility; deck p86 is the sentence this compresses. DEVIATION I am flagging rather than hiding: two words of 10+ letters ('Understanding', 'Accessible') against the one-per-paragraph rule. Both are p15's own cascade terms and cutting either drops the link to the deck, so I kept them - the rule's real target is Latinate marketing vocabulary, which neither is.

### `about.value-body-03-performance`

`src/content/about.ts:45`

- **Current:** One shared lorem (116 ch) mapped over all five value names
- **Proposed (99 chars):** Effective, efficient, economical. Quick to use, quick to answer, and not expensive to keep running.
- **Budget:** 88-107 chars (same geometry as Reliability). Verified per-string at 3/2.
- **Why:** Deck p15's product-level cascade for Performance is literally Effective / Efficient / Economical - placed verbatim as the opening, then translated into plain consequence, which is the CONSEQUENCE CLAUSE pattern applied to a value rather than a technology. The triplet is the deck's own, not rhythm filler, and it is comma-joined rather than em-dash-joined.

### `about.value-body-04-foresight`

`src/content/about.ts:45`

- **Current:** One shared lorem (116 ch) mapped over all five value names
- **Proposed (98 chars):** Preventing the problem costs less than fixing it. Built to be maintained, not only to be launched.
- **Budget:** 88-107 chars (same geometry as Reliability). Verified per-string at 3/2.
- **Why:** Deck p15 cascades Foresight into Vision / Evolution / Prevention and Scalability / Maintenance / Feedback Analysis. Both sentences use PREFER THE CONTRAST TO THE SUPERLATIVE ('costs less than', 'not only to be'), which is the shipped copy's dominant move (rather than x3, instead of x1 across nine answers). No figure is quoted, so 'costs less' stays a claim about order of magnitude rather than a public promise.

### `about.value-body-05-creativity`

`src/content/about.ts:45`

- **Current:** One shared lorem (116 ch) mapped over all five value names
- **Proposed (98 chars):** Familiar is the easy answer and rarely the right one. Elegance comes from solving, not decorating.
- **Budget:** 88-107 chars (same geometry as Reliability). Verified per-string at 3/2.
- **Why:** Deck p36: the Creator archetype's fears are Familiarity and Duplication - so 'Familiar' is the correct thing to refuse here, by name. Deck p15 cascades Creativity into Problem Solving / Ideation / Strategy and Elegance / Uniqueness / Innovation; 'Elegance comes from solving, not decorating' is REFUSE THE FLATTERING READING (page.tsx L99 pattern) at value scale.

### `about.process-step-body-01-start`

`src/content/about.ts:61`

- **Current:** One shared lorem (116 ch) mapped over all five step names (Start / Process / Decide / Process / End)
- **Proposed (103 chars):** Every loop needs an entry point. Yours is a conversation about what the thing is for and who it is for.
- **Budget:** 101-107 chars - the tightest window on this page. 1920: 230px @16px -> 4 lines (drawn box 230x79, drawn 116-ch string = 4 lines); 4-line window 84-107. 768: 337px @24px ls-3% -> 4 lines (drawn box 337x122); 4-line window 101-125. Overlap is only 101-107. CORRECTION to the slot inventory, which gives 103-119: 108+ takes a 5th line at 1920 and breaks the drawn box. Verified per-string at 4/4.
- **Why:** These five names are the LOGO, not a client process - deck p120: 2 ellipses, 2 parallelograms, 1 rhombus, drawn as Start / Process / Decide / Process / End. So each body has to say what that shape does on a real project. 'Start' is the first ellipse (deck p117 'Start'). Opens with 'Every', not 'We'; second person in sentence 2 ('Yours'). Note this page's step names differ from the Home process (Ask/Listen/Think/Create, page.tsx L110-113) and should not be made to echo it.

### `about.process-step-body-02-process`

`src/content/about.ts:61`

- **Current:** One shared lorem (116 ch) mapped over all five step names
- **Proposed (99 chars):** Reading, asking, sketching, building. Which one it is depends on the question, not on the schedule.
- **Budget:** 101-107 chars is the safe window from the lorem sweep, but this string measures 4 lines at BOTH frames at 99 ch (real English packs tighter than lorem). Verified per-string at 4/4 - 1920 230px @16px and 768 337px @24px ls-3%.
- **Why:** The first parallelogram. Deck p88 'Ask, Listen, Think' and p72 'Tech stack is just means to an end' - the point of this step is that the activity is chosen by the question, not by a fixed methodology. Gerund opening (DEFINITION BY ACTIVITY). 'X rather than Y' via 'not on the schedule'. No 10-letter-plus word.

### `about.process-step-body-03-decide`

`src/content/about.ts:61`

- **Current:** One shared lorem (116 ch) mapped over all five step names
- **Proposed (101 chars):** The diamond is the base case: the rule that decides whether this goes round again. Agreed in advance.
- **Alternate:** Somebody has to say stop or go round again. That call is made against a rule, not against a mood. (97 ch, also 4/4.) Open call: the primary explains the LOGO (deck p123, and the strip is the logo), the alternate explains the WORKING HABIT and reads better to a founder who has not seen the deck. If the strip ships without any visual of the diamond, take the alternate.
- **Budget:** 101-107 chars. Verified per-string at 4/4 (1920 230px @16px; 768 337px @24px ls-3%).
- **Why:** Deck p123 verbatim-adjacent: "The crown jewel of this flow is the diamond... where a well-defined stopping condition is checked. This corresponds to the base case. The rule that determines whether the process should stop or continue." 'base case' is in the approved lexicon for exactly this slot. One colon, cashing out the claim before it. Naming the shape ties the process strip to the logo, which is the only reason these five words are on the page.

### `about.process-step-body-04-process`

`src/content/about.ts:61`

- **Current:** One shared lorem (116 ch) mapped over all five step names
- **Proposed (99 chars):** Round again, carrying what the last pass taught. A loop is only worth running if the input changed.
- **Budget:** 101-107 chars is the lorem-swept window; this string measures 4 lines at both frames at 99 ch. Verified per-string at 4/4.
- **Why:** The second parallelogram, which in the drawn flow is the return leg. Deck p90 defines recursion as "when a process becomes the input to itself" and p112 gives feedback/memory/iteration - so the honest content of step 4 is that a second pass with unchanged input is not iteration. Falsifiable, no superlative, opens with 'Round'.

### `about.process-step-body-05-end`

`src/content/about.ts:61`

- **Current:** One shared lorem (116 ch) mapped over all five step names
- **Proposed (98 chars):** Finished means the stopping condition was met, not that the budget ran out. Both of us know which.
- **Budget:** 101-107 chars is the lorem-swept window; this string measures 4 lines at both frames at 98 ch. Verified per-string at 4/4.
- **Why:** The closing ellipse. Deck p123's 'well-defined stopping condition' again, turned into the commitment the reader actually cares about. REFUSE THE FLATTERING READING (page.tsx L99 pattern): says what finished is not, then what it is. 'Both of us' is the only place first and second person share a clause, which is deliberate at the end of the strip. Carries no figure, so it is a promise about honesty rather than about a timeline.

### `about.recursion-paragraph`

`src/app/about/page.tsx:166`

- **Current:** Inline lorem under "We live & breathe recursion" (445 ch at 1920; the 768 frame draws a 424-ch variant)
- **Proposed (429 chars):** Recursion is the engine of reality: feedback, memory, iteration. It is a river carving a deeper channel each season, a sunflower spiralling to yesterday’s light, a galaxy winding itself through dark matter scaffolding. Software is the same shape, and a product that ships, gets used, and feeds what it learns back into the next version is a living system that learns as it moves. The ones that never loop quietly stop being used.
- **Budget:** 404-443 chars. 1920: 1128px @16px -> 3 lines (drawn box 1128x68, drawn 445-ch string = 3 lines); 3-line window 313-458, hard ceiling ~443 by the 0.477em measure. 768: 609px @24px ls-3% -> 8 lines (drawn box 609x279); 8-line window 404-453. Overlap 404-443. CORRECTION to the slot inventory's 435-438: that window is ~10x tighter than the geometry requires. I tested a 417-ch variant (dropping 'scaffolding') and it drops to 7 lines at 768, so the floor is real but sits nearer 420 than 435. Verified per-string at 3/8.
- **Why:** Deck p112 is the source and is quoted closely for the first two sentences (river / sunflower / galaxy, and 'living systems that learn as they move'), because the brief treats deck lines as canon to place rather than rewrite. Sentences 3 and 4 do the work the heading promises - 'We live & breathe recursion' has to cash out as a claim about software, not only about nature. One colon, no semicolon, no em-dash. British 'spiralling'. DEVIATIONS I am flagging: three words of 10+ letters (spiralling, yesterday’s, scaffolding), all three lifted from p112 and all three concrete; and four sentences rather than the shipped 2-3, which is proportionate at 429 ch (the shipped answers are 211-240 ch with 2-3), landing 9/24/31/9 words against a shipped max of 32.

### `about.meta-description (SLOT NOT IN THE INVENTORY - found during the sweep)`

`src/app/about/page.tsx:11`

- **Current:** 'Recurssive is a web and app studio in Thessaloniki, Greece.' (58 ch) - real copy, but it is the only user-facing string on this page that states a market, and 'in Thessaloniki, Greece' reads as the p...
- **Proposed (151 chars):** Recurssive is a web and app studio. The purpose, the vision, the five values and the recursive process behind the work: ask, listen, think, then build.
- **Alternate:** A web and app studio built on one habit: asking what the software is for, and who has to live with it, before choosing a framework. This is how Recurssive works. (161 ch - 3 over the safe snippet length, so the last two words may truncate.) Genuinely open: the primary describes what is ON the page (better for search intent), the alternate describes the studio's method (better as a standalone claim). Take the alternate only if the owner will accept possible truncation.
- **Budget:** 120-158 chars. No figspec box - this is a search snippet, so the budget is Google's ~155-160 char truncation rather than a drawn box. 151 renders whole. Note the sentence-case rule still applies (deck p212) and it does.
- **Why:** Two problems with the current string, one of which is a brand fact: (a) the market is GLOBAL per the brief, and a description that pins the studio to a city is the one place on About where that gets contradicted in a search result; (b) it describes the company rather than the page, and this page is the philosophy. 'recursive' is the single-s adjective and 'Recurssive' the double-s company, both used correctly in the same sentence, which is the intended distinction (deck pp223-230 vs pp89-112). Ask/listen/think is deck p88 verbatim.

### Open questions - /about

- src/content/about.ts L43-46 and L59-62 map ONE shared body string over five names. Five different value paragraphs and five different step paragraphs cannot land until `values` and `processSteps` become explicit arrays with a per-item `body`. Same shape as the Home `industries` array note. Do you want me to restructure those two exports, or is that a separate build task?
- src/app/about/page.tsx L146-149: the values column is `lg:flex-1` with no max-width. At 1920 the container is 1594px, the image is `lg:w-[60%]` (956px) plus a 5% gap, leaving ~558px, and the (01) marker plus its 28px gap leaves ~504px of text measure against the drawn 266px box. My 98-107 char bodies therefore render TWO lines at 1920 where the frame draws THREE. Cap the paragraph at `lg:max-w-[266px]`, or accept the wider rhythm and let me rewrite the five bodies to ~200 chars for a 504px measure? The copy above is written to the drawn box.
- src/app/about/page.tsx L188: the process step body is `max-w-[231px]` at EVERY width, but the 768 frame draws that box at 337px and `.t-body` is 22px at 768. A 103-char body renders 5-6 lines in a 231px column against 4 drawn. This wants `max-w-[337px] lg:max-w-[231px]`. Confirm before the copy lands, otherwise the strip is ~2 lines tall per step past its drawn height on mobile.
- src/app/about/page.tsx L70: the hero story paragraph is `max-w-[846px]` only. The 768 frame caps it at 485px inside a 610px container, which is what produces the drawn 8 lines; the build gives it the full 610px, so 319 chars renders 6 lines there and the band comes in ~2 lines short. Add `max-w-[485px] lg:max-w-[846px]`, or accept the shorter hero?
- src/app/about/page.tsx L14 sets `noIndex: true` with the comment 'Body copy is still lorem'. If these proposals land, does About go indexable in the same change, or does it wait for the Tony Noel hero photo licence (STATE.md L487) to clear?
- The five values render as an `<ol>` with (01)-(05) markers, which reads as a ranking. Deck p15 lists them in this order but does not rank them. Is Reliability first because it is first, or because the deck's grid started there? The copy does not assume a ranking either way.
- At 768 the drawn value-body box is 575px, but the build's is ~528px once the 46px flex gap and the 20px (01) marker are subtracted from the 610px container. My bodies still land 2 lines at 528px, so nothing breaks - flagging only because the 47px gap means a future longer string will fail at 768 before it fails at 1920.

---

## /capabilities (index) + /capabilities/[slug] (detail template)

MEASUREMENT — I did not take the brief's 0.48em constant on trust, and it is wrong for this page. The Capabilities frames bound the Open Sans advance tighter than the brief's calibration set does: the 427x90 box at 16px ls-2% holds a 230-char lorem in four lines, which caps advance at 0.464em INCLUDING the 2% tracking (base <= 0.444em), and the 343x162 box at 18px holds the same string in six lines, which floors it at 0.414em. 0.43em sits in that window and reproduces every drawn wrap on both frames; 0.48em does not — it predicts three lines for the 768 page intro, which is drawn at two, and it predicts three lines for the 421px Home process intro that the brief itself cites as a two-line fit. The reconciliation is that 0.48em was calibrated on strings without spaces (the footer's 'Thessaloniki', 'Services'); lorem and English prose carry a 0.26em space every five or six characters, which pulls the mean to ~0.43. Every budget above uses 0.43em, and it agrees with the slot inventory's own 58.9-59.2 ch/line figure for a 606-610px 24px box. If a later agent used 0.48 on another page, its budgets are ~10% tight.

TWO DRAWN BOXES ON THIS PAGE ARE LIARS. At 768 the four pillar description boxes hold the identical 199-character string, but Consulting's is 610x138 and the other three are 610x70. A box cannot render the same string in four lines and in two. The 138 is auto-height (four lines at 34.5 lh); the three 70s are hand-dragged and overflow their own content. I measured against the 138 only. Same pattern at 1920, where all four are 754x70 against a 24px line height — that is roughly three lines of slack holding two lines of text. Anyone re-deriving these budgets from box HEIGHT rather than from character count will get the wrong answer twice.

CANON PLACEMENT — nothing left to do, both lines are already drawn. Pt.3 'Tech we use on repeat' is at Capabilitiy__1920w.txt:41-42 as a 48px heading, and Pt.2 'Got an idea that keeps coming back?' is at line 330 of the same frame, on the dark band above the CTA. The brief asked me to place Pt.3; the designer already did. What is missing is not the line but the chips under it, and those are a fact problem, not a copy problem — see openQuestions.

THE FOUR PILLAR PARAGRAPHS ALL OPEN ON A GERUND (Reading / Designing / Putting / Moving) AND THAT IS DELIBERATE. It is the shipped DEFINITION BY ACTIVITY pattern from page.tsx:64, it is the cleanest way to satisfy the never-open-with-'We' rule four times in a row, and read down the page the four verbs track the p31 ladder: you read, then you design and build, then you place, then you move. If it reads as formulaic to you, the one I would break first is Enterprise ('A large codebase moves to React Native one screen at a time...'), because it is the only one where the passive is more honest about who does the work.

VOICE CHECK ON EVERYTHING I WROTE — em-dashes: 0. Exclamation marks: 0. Contractions in explanatory body: 0. Colons: 1, in AI Engineering, cashing out the claim before it. Semicolons: 0. Title Case: 0. All-caps: 0. Words of 10+ letters: 'Engineering' in the meta description only, one per paragraph elsewhere. Paragraphs opening with 'We': 0. 'we/us/our' across the five index strings: 1 ('we' in the meta description). 'you/your': 5. Sentence means 10.0 / 12.0 / 17.5 / 18.5 / 18.5 against a shipped 17.0. Recurssive vs recursive: the company name appears once, correctly double-s, in the meta description; the adjective does not appear. No client names, no numbers, no team size, no founding year.

THE EXISTING MDX IS IN BETTER SHAPE THAN THE INDEX. on-device-ai.mdx needs nothing — I checked it against every rule and it passes, including the harder ones (no We-initial paragraph, 'Latency stops depending on the network' as a consequence clause, second person in the closing sentence). I deliberately did not propose a change to it rather than churn good copy. react-native-performance.mdx's '## The problem' paragraph is the strongest prose in the repo after the FAQ answers. The three defects I did find are all the same defect: a paragraph opening with 'We', in product-development.mdx:15, react-native-performance.mdx:23 and enterprise-migration.mdx:22. Worth a grep before any future MDX lands.

BLOCKED, NOT WRITTEN — the detail template's hero lead, the six 'Why build a...' benefit headings and bodies, the three 'We develop for' bodies, the six 'Why us' bodies, the 'Discover More Services' lead (Capabilitiy__1920w.txt:335-336, 477x44 at 16px = two lines, 68-136 chars), and the tech chips. That is roughly 4,500 characters of drawn copy on the capability detail page. None of it has a field in the content model or a line in the build to attach a proposal to — capabilities/[slug]/page.tsx is still the unstyled placeholder at py-24 with a text-6xl h1 — and four of those slots need decisions only you can make. I would rather hand you nine questions than nine paragraphs written against a template that does not exist yet. Say the word on the openQuestions and the detail-page sweep is a single further pass.

FILES READ: docs/design-data/figspec/Capabilities__1920w.txt, Capabilities__768w.txt, Capabilitiy__1920w.txt, Capabilitiy__768w.txt; src/app/capabilities/page.tsx; src/app/capabilities/[slug]/page.tsx; src/content/capabilities-index.ts; src/components/PageHeader.tsx; all four files in content/capabilities/; src/app/page.tsx lines 50-122 for the house-voice reference; deck-text.txt pages 27-36.

### `capabilities.page-intro`

`src/app/capabilities/page.tsx:38`

- **Current:** Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. (123 ch)
- **Proposed (109 chars):** Four groups, nineteen kinds of work. They run from a second opinion up to the system your company depends on.
- **Alternate:** Nineteen kinds of work in four groups. The order is the ladder: a second opinion first, a whole system last.  (108 ch)
- **Budget:** 67-111 chars, 2 lines at both widths. 1920: PageHeader.tsx:41 caps at lg:max-w-[467px]; 467px @16px Open Sans = 67.9 ch/line -> 2 lines = 68-136. 768: the build gives the full 610px column; 610px @24px ls-3% = 55.3 ch/line -> 2 lines = 56-111. 768 sets the ceiling at 111. NOTE I re-derived the per-char constant rather than using the brief's 0.48em: the Capabilities 1920 frame's own boxes bound it tighter. The 427x90 box at 16px ls-2% holds a 230-ch lorem in 4 lines, which caps advance at 0.464em INCLUDING the 2% tracking, i.e. base <= 0.444em; the 343x162 box at 18px holds the same 230 ch in 6 lines, which floors it at 0.414em. 0.43em sits in that window and reproduces every drawn wrap on this page; 0.48em does not (it predicts 3 lines for the drawn 768 intro, which is drawn at 2). The inventory's 58.9-59.2 ch/line for a 606-610px 24px box is the same 0.43em figure and is confirmed.
- **Why:** Deck p31 Value Ladder: the page's own pillar order (Consulting, Product Dev, AI Engineering, Enterprise) IS the ladder, ascending value/cost/workload. The sentence encodes that without the word 'ladder'. 'Nineteen' is falsifiable in one glance (7+5+4+3 rows drawn, and deck p29 lists 19), which satisfies the falsifiability rule where a category claim would not. Does not open with 'We'; second person present ('your company'), first person absent; no em-dash, no colon, no contraction, sentence mean 10 words.

### `capabilities.meta-description`

`src/app/capabilities/page.tsx:13`

- **Current:** What Recurssive builds, and how each capability is delivered. (60 ch)
- **Proposed (140 chars):** What Recurssive takes on, in four groups: consulting on code you already have, product development, AI engineering and enterprise migration.
- **Budget:** 120-155 chars. Not a drawn box - this is the <meta name="description"> via buildMetadata (src/lib/metadata.ts). Search results truncate around 155-160; the current 60 wastes half the slot. One colon, cashing out the claim before it, per the shipped pattern at page.tsx:69.
- **Why:** Real shipped copy already, but under-length for its job and it says nothing a competitor's page would not. The replacement names the four pillars, which is the only genuinely differentiating fact this page has. 'consulting on code you already have' is the honest framing of the bottom rung and avoids the 'clients/portfolio' lexicon, which is banned while nothing has shipped.

### `capabilities.pillar-description-consulting`

`src/content/capabilities-index.ts:36`

- **Current:** description: LOREM,  -> the 199-ch lorem defined at capabilities-index.ts:30-31, shared by all four pillars
- **Proposed (201 chars):** Reading a codebase you already have, then saying plainly what it is costing you. Sometimes that ends in a report and a training session, sometimes in the pull requests that fix it. Rarely in a rewrite.
- **Budget:** 167-219 chars; land 2 lines at 1920 and 4 lines at 768. 1920: build caps at max-w-[754px] (capabilities/page.tsx:59), matching the drawn 754x70 box; 754px @16px = 109.6 ch/line -> 2 lines = 110-219. 768: 610px @24px ls-3% = 55.3 ch/line; the drawn box is 610x138 = 4 lines at 34.5 lh -> 167-221. Combined 167-219, and the drawn lorem's own 199 ch sits mid-window, so ~200 reproduces the drawn wrap exactly. 201 -> 1.83 lines at 1920, 3.63 -> 4 lines at 768. NOTE the three non-Consulting 768 boxes are drawn 610x70 with the same 199-ch string in them: those are hand-fixed heights that overflow their own content, not a 2-line instruction. Only the 610x138 box is auto-height and therefore trustworthy.
- **Why:** DEFINITION BY ACTIVITY (page.tsx:64 'Designing and building software people actually use'): opens on a gerund, never 'We'. Bottom rung of the p31 ladder, so the promise is deliberately small - an opinion on code that already exists, not a build. 'Rarely in a rewrite' is REFUSE THE FLATTERING READING plus the one-word-sentence precedent set by 'Often.' at page.tsx:104. Two 'you', zero 'we'. No tech name without a consequence, because no tech is named here - the seven rows underneath name them.

### `capabilities.pillar-description-product-dev`

`src/content/capabilities-index.ts:70`

- **Current:** description: LOREM, (199 ch)
- **Proposed (210 chars):** Designing and building the product itself, from prototype to the version people pay for. One React Native codebase covers iOS, Android and web, so a second platform costs a decision rather than a second budget.
- **Budget:** 167-219 chars (identical geometry to Consulting). 210 -> 1.92 lines at 1920, 3.80 -> 4 lines at 768.
- **Why:** THE CONSEQUENCE CLAUSE: React Native is named and immediately paid for ('so a second platform costs a decision rather than a second budget'), the same move as page.tsx:94. X RATHER THAN Y carries the judgement with no adjective. 'people' not 'users' (deck p13/p83). Deliberately says iOS, Android and web and NOT desktop, even though 'Desktop App Development' is a drawn row - one React Native codebase genuinely covering desktop is a claim I cannot stand behind, and overstating it here would be the kind of thing a CTO catches. Sentence mean 17.5 words, against the shipped 17.0.

### `capabilities.pillar-description-ai-engineering`

`src/content/capabilities-index.ts:100`

- **Current:** description: LOREM, (199 ch)
- **Proposed (201 chars):** Putting a model where it earns its place, which is usually on the device rather than in someone’s data centre. That decides the rest: what fits in memory, what works offline, what never leaves the phone.
- **Alternate:** Putting a model where it earns its place, which is usually on the device rather than in someone else’s data centre. And reading the code a model wrote for you, before it becomes the part nobody dares change.  (207 ch) - this is a genuinely open call: four rows sit under this pillar and 200 characters holds two of them. The primary leads on On-device AI, which is the studio's own category descriptor and the one row no competitor list has. The alternate leads on on-device but spends its second sentence on AI Vibe Coding Cleanup, which is where the inbound demand probably is and which nothing else on the site mentions.
- **Budget:** 167-219 chars (identical geometry to Consulting). Primary 201 -> 1.83 lines at 1920, 3.63 -> 4 lines at 768. Alternate 207 -> 1.89 / 3.74, also in budget. I trimmed both from 215 deliberately: at 215 the 1920 render is 1.96 lines, inside the error bar of my 0.43em constant, and a third line there would break the parallel with the other three pillars.
- **Why:** CLAIM, THEN THE COLON THAT CASHES IT OUT, exactly the shape of page.tsx:69, and the only colon in the four pillar paragraphs. 'on the device rather than in someone’s data centre' is X RATHER THAN Y and reuses the phrasing already shipped at page.tsx:74 ('rather than in someone else’s cloud'), which is why the primary says 'someone’s' - repeating 'someone else’s cloud' verbatim two pages apart reads as a stock phrase. Typographic apostrophe U+2019 in both variants, per problem/page.tsx:31.

### `capabilities.pillar-description-enterprise-solutions`

`src/content/capabilities-index.ts:130`

- **Current:** description: LOREM, (199 ch)
- **Proposed (193 chars):** Moving a large codebase to React Native one screen at a time, so your app keeps shipping while it happens. Most of the risk lives in the release process and the monitoring, not in the new code.
- **Alternate:** Moving a large codebase to React Native one screen at a time, so your app keeps shipping while it happens. The release process and the monitoring carry more of the risk than the new code does.  (192 ch)
- **Budget:** 167-219 chars (identical geometry to Consulting). 193 -> 1.76 lines at 1920, 3.49 -> 4 lines at 768.
- **Why:** Top rung of the p31 ladder, so this is the only one of the four that names a risk rather than a deliverable. It is the position enterprise-migration.mdx already argues ('A full rewrite is the most common way these projects fail') compressed to the index, so the two pages agree. The second sentence justifies the two rows that would otherwise look like filler next to the migration row (Monitoring & Observability, Release Process Optimization). Second person 'your app'; zero 'we'.

### `capability.mdx-title-product-development`

`content/capabilities/product-development.mdx:2`

- **Current:** title: Product Development
- **Proposed (22 chars):** title: Mobile App Development
- **Budget:** 1-31 chars, 2 lines max. Drawn hero on Capabilitiy__1920w.txt:33-34 is Inter Semi Bold 72px ls-5% in a 540x144 box = 2 lines at 72 lh; 540px / (72 * 0.48em incl tracking) = 15.6 ch/line -> 31 chars. The frame's own example title is 'Mobile App Developement' (23 ch, and yes, misspelled in Figma). 'Product Development' is 19 and fits; the proposed 22 also fits.
- **Why:** Not a voice fix, a taxonomy fix, and it needs your call. 'Product Development' is not one of the nineteen drawn rows and it is not on deck p29 - the three rows under that pillar are Desktop, Web and Mobile App Development. As it stands the file's title duplicates the pillar name rendered directly above it on the index ('Product Dev'), and the detail frame's own worked example is the Mobile App Development page. Retitling makes the four MDX files four real rows instead of three rows plus a pillar. The slug and body would follow.

### `capability.mdx-description-product-development`

`content/capabilities/product-development.mdx:3`

- **Current:** description: Building web, mobile and desktop applications end to end, from the first prototype through to a maintained product in production. (129 ch)
- **Proposed (123 chars):** description: Building the app people actually use on their phone, from the first prototype through to a maintained product in the stores.
- **Budget:** 120-155 chars as a meta description (this field is the only thing feeding buildMetadata at capabilities/[slug]/page.tsx:24). As the DRAWN hero lead it is far short - see openQuestions; the frame draws 477x96 at 16px = 4 lines = 208-277 chars, and every one of the four current descriptions lands at 2 lines against that.
- **Why:** Follows the retitle above; if the title stays 'Product Development' this proposal is void. 'end to end' is one hop from the banned 'end-to-end solution' and is doing no work. 'the app people actually use' echoes the shipped page.tsx:64 'software people actually use', which is the register anchor for the whole site.

### `capability.mdx-body-product-dev-scope`

`content/capabilities/product-development.mdx:15`

- **Current:** We take products from an idea to something people use, and stay long enough to see what the first real usage teaches. That usually changes the plan, which is the point. (166 ch)
- **Proposed (170 chars):** Taking a product from an idea to something people use, then staying long enough to see what the first real usage teaches. That usually changes the plan, which is the point.
- **Budget:** No drawn box. The detail template is not built - capabilities/[slug]/page.tsx renders the MDX into an unstyled max-w-3xl at line 72, and none of the frame's sections (Why build a Mobile App / We develop for / Tech we use on repeat / Why us) exist in code. Budget is the shipped FAQ register instead: 2-3 sentences, 211-240 chars, sentence mean 17.
- **Why:** Only real defect is the opener. NEVER OPEN A BODY PARAGRAPH WITH 'We' - zero of the nine shipped FAQ answers do, and this is one of three MDX paragraphs that break it. The gerund rewrite is DEFINITION BY ACTIVITY and costs four characters. Second sentence is already good and is untouched. This file is also the shortest of the four at one section; if the retitle above lands it needs a second section to match its siblings.

### `capability.mdx-body-rnp-how-we-work`

`content/capabilities/react-native-performance.mdx:23`

- **Current:** We profile first and change code second. That means Hermes sampling profiles, Systrace on Android, Instruments on iOS, and a written baseline before any edit, so the improvement is a number, not an im...
- **Proposed (219 chars):** Profiling comes first and code changes second. That means Hermes sampling profiles, Systrace on Android, Instruments on iOS, and a written baseline before any edit, so the improvement is a number rather than an impression.
- **Budget:** No drawn box (template unbuilt). Shipped-answer register: 211-240 chars, 2-3 sentences. 219 is inside it.
- **Why:** Two fixes. (1) We-initial opener, same violation as product-development.mdx. (2) 'a number, not an impression' becomes 'a number rather than an impression' - PREFER THE CONTRAST TO THE SUPERLATIVE uses 'rather than' three times in the shipped answers and the bare comma-not construction nowhere. Everything else in this file is already house voice; the '## The problem' paragraph in particular ('Most React Native apps do not feel slow because React Native is slow') is the best-written prose in the content directory and I would not touch it.

### `capability.mdx-body-rnp-what-you-get`

`content/capabilities/react-native-performance.mdx:38`

- **Current:** A written report with before and after measurements, the changes as reviewable pull requests, and a short session walking your team through what was wrong so the same class of problem does not come ba...
- **Proposed (209 chars):** A written report with before and after measurements, and the changes as reviewable pull requests. Then a short session walking your team through what was wrong, so the same class of problem does not come back.
- **Budget:** No drawn box (template unbuilt). Shipped register: 2-3 sentences per body paragraph, never one, never four (distribution 2,2,2,3,3,2,2,3,3 across the nine answers); sentence mean 17.0 words.
- **Why:** Lowest-value proposal on this list - the content is right, only the shape is off. It is a single 34-word sentence where the shipped distribution never runs one sentence and never exceeds 32 words. Splitting gives two sentences of 16 and 20. Take it or leave it; nothing breaks either way.

### `capability.mdx-body-enterprise-order-of-work`

`content/capabilities/enterprise-migration.mdx:22`

- **Current:** We start with the screens that change most often, because those are where a shared codebase pays back fastest, and leave the stable ones for last. (144 ch)
- **Proposed (142 chars):** The screens that change most often go first, because that is where a shared codebase pays back fastest. The stable ones can wait until the end.
- **Budget:** No drawn box (template unbuilt). Shipped register: 2-3 sentences, 211-240 chars - both current and proposed run short of that, which is fine for a two-section MDX page but worth knowing.
- **Why:** Third and last We-initial opener. Note the OTHER 'We' in this file, at line 16 ('A full rewrite is the most common way these projects fail. We migrate screen by screen...'), is correct as written and I am not proposing a change: it is the final sentence of its paragraph and it is a commitment, which is exactly the PUT 'we' LAST pattern from page.tsx:79 and page.tsx:104.

### `capability.pillar-eyebrow`

`src/app/capabilities/[slug]/page.tsx:50`

- **Current:** <p className="text-sm uppercase tracking-wide text-ink-muted">{capability.meta.pillar.replace('-', ' ')}</p>  -> renders "AI ENGINEERING", "PRODUCT DEV", "ENTERPRISE"
- **Proposed (19 chars):** Render the pillar's display name from capabilities-index.ts (Consulting / Product Dev / AI Engineering / Enterprise Solutions) and drop `uppercase` from the className.
- **Budget:** Longest value is 'Enterprise Solutions' at 20 chars, one line at 14px in a max-w-3xl header. No geometry risk.
- **Why:** Two located voice violations in one line of JSX. (1) `uppercase` sets user-facing copy in all caps, which deck p212 ('Signs of Reality: No Cap Text') bans outright and which no other shipped string does. (2) The derived string does not match the copy on the index it links back from: the frontmatter slug is `enterprise`, so the detail page says 'enterprise' where the index says 'Enterprise Solutions', and `product-dev` renders as 'product dev'. This is a code change, not a string edit, which is why `proposed` describes it rather than quoting it.

### Open questions - /capabilities (index) + /capabilities/[slug] (detail template)

- THE DETAIL HERO LEAD HAS NO FIELD, AND THE ONE FIELD THAT EXISTS CANNOT DO BOTH JOBS. Capabilitiy__1920w.txt:35-36 draws the hero lead as Open Sans 16px in a 477x96 box - four lines, 208-277 chars. The only text the build has for that position is `description`, which is also the sole input to <meta name="description"> (capabilities/[slug]/page.tsx:24). Meta wants <=155; the drawn hero wants >=208. All four current descriptions are 127-141, i.e. correct for meta and two lines short of the drawn hero. Do you want a separate `lead` field in the frontmatter, or should the hero run two lines against a drawn four? I have not written hero leads because I do not know which field they would go in.
- 'React Native Performance Optimization' (36 ch) DOES NOT FIT ITS OWN HERO. The drawn H1 is Inter Semi Bold 72px in a 540x144 box = 2 lines = ~31 chars; the frame's example 'Mobile App Developement' is 23. That title is the deck's own service name (p29) and I am not proposing to shorten it. Should the H1 ramp down for long titles, or does the hero get a 3-line state (540x216)? Note the same 540px block would also need checking at 768.
- 'Product Development' is not one of the nineteen. Deck p29 and the drawn rows both give Desktop / Web / Mobile App Development under the Product Dev pillar - there is no 'Product Development' row, and as a page title it duplicates the pillar heading. Retitle it to a drawn row (my proposal says Mobile App Development, which is also the frame's worked example) and change the slug, or is that file deliberately a pillar-level overview page? This decides whether the detail routes are per-service (19 of them) or per-pillar (4).
- THE 'Tech we use on repeat' CHIPS ARE A STOCK LIST AND SHIPPING THEM WOULD MAKE THE CANON LINE FALSE. Recurssive Language Pt.3 is already placed in the design - Capabilitiy__1920w.txt:41-42 draws it verbatim as a 48px heading, so there is nothing for me to place. But the 38 chips drawn under it (Capabilitiy__1920w.txt:73-250) include Slack, Jira, Airtable, Sketch, Creative Cloud, Angular, Vue, Laravel, Ruby, .NET Framework, mySQL, MariaDB, MongoDB, ChatGPT, Gemini, Azure, AWS, Google Cloud, Meta, Flutter, Kotlin, Swift. 'Tech we use on repeat' is a first-person factual claim, and that list is a category sampler, not a stack. Which of those do you actually use on repeat? Everything else is an invented fact and I will not write it.
- 'Benefit One' through 'Benefit Six' are unfilled headings with no source. The detail frame draws six 32px headings plus six 427x90 bodies (~230 chars each) under 'Why build a Mobile App?'. Nothing in the deck supplies them and they are per-capability by construction. Six benefits x nineteen capabilities is 114 paragraphs; are the six shared across all capabilities with only the bodies varying, or genuinely six per page?
- The 'We develop for' section draws exactly three platforms - iOS, Android, Web - each with a 343x162 body (six lines, ~250 chars). Fixed for every capability, or per-capability? For 'On-device AI' or 'Release Process Optimization' those three headings do not obviously apply.
- The 'Why us' six are already real and are the best copy in the frame (Human touch / Latest tech / Future ready / Reliable partner / Solution oriented / Efficient systems - Capabilitiy__1920w.txt:267-314, each with a 299x129 body, ~205 chars). They map cleanly onto the five core values plus the p88 'Ask, Listen, Think'. Are those six settled, and are they the same six on every capability page? If yes I can write the six bodies once, to budget, in one pass.
- /capabilities carries `noIndex: true` (capabilities/page.tsx:16) with the comment 'Body copy is still lorem from the frame'. If the five index-page proposals above land, that flag has no remaining justification - remove it in the same commit?
- Deck p31 puts UI/UX as its own rung between Consulting and Product Dev, but deck p29 and the drawn rows put 'UI/UX Design' inside Product Dev. My Product Dev description assumes the p29 reading (design is part of the build, not a rung). Confirm, because if UI/UX is a rung the page is missing a fifth pillar.
- AI Engineering has two defensible leads and I have given both. Primary leads on On-device AI, which is in the studio's own category descriptor and is the row nobody else's list has. The alternate spends its second sentence on AI Vibe Coding Cleanup, which is probably where the inbound demand is and which nothing else on the site mentions. Your call on which one is the pillar's face.

---

## /cases (index) + /cases/[slug] (detail)

MEASUREMENT METHOD. I did not use the 0.48em heuristic. I parsed cmap/hmtx/hhea out of the project's own font binaries (D:/johnn/Projects/recurssive/Recurssive Folder/Recurssive Folder/Fonts/Open Sans/static/OpenSans-Regular.ttf and Inter/static/Inter_18pt-SemiBold.ttf) and measured real advances, then greedy-wrapped at 99.5% of the box. Calibration against drawn hug boxes: 'Try to refresh the page...' 537.9 vs drawn 539; 'Thessaloniki' 91.7 vs 92; 'Startups' 94.3 vs 95; 'Go back to home' 190.6 vs 191; 'Lorem ipsum' at 12px 73.9 vs 74. Every one within 1%. Open Sans auto line-height is 1.362em (21.79px at 16px), which is how I told hug boxes from fixed ones.

TWO CORRECTIONS TO THE INVENTORY, both verified.
(1) The figspec's `ls-3.0` / `ls-5.0` annotations DO NOT affect Open Sans advance widths in these frames. Proof: 'Lorem ipsum' at 20px ls-5.0 is drawn 124px; plain measures 123.2, +5% would be 134.2, -5% would be 112.2. Any budget derived from adding tracking at 768 is wrong. Inter Semi Bold display IS narrower than plain by a constant factor of 0.923 (kerning plus Inter's optical size) - 'Main Challenge Name' predicts 461.8 against a drawn 462 at 48px and 404.1 against 405 at 42px, and 'Brand Project Case' predicts 404.8/354.2 against drawn 404/353.
(2) cases.case-description is 340-385 chars, not 376-393. At 390 the 1920 column breaks to a sixth line. The 1920 box (608x135) is fixed-height with ~26px of slack, not a 5-line hug - 135 is 6.20 line-heights, which is why it looked ambiguous.

THREE FRAMES OVERSHOOT THEIR OWN BOXES. The 1920 page intro's drawn 123-char lorem measures 3 lines in its 467x44 (2-line) box. The 768 page intro's 110-char lorem measures 3 lines in its 606x63 (2-line) box. The 768 card description's 376-char lorem measures 8 lines in a 615x213 box that holds 6.5. The lorem was pasted, not fitted. Where a frame and the build disagree I wrote to the build, since that is what ships: PageHeader is lg:max-w-[467px] at 16px and full 610px container at t-body 22px; CaseCard's text column computes to 607.3px (1594 - 6.8% gap - 55.1% image), which matches the drawn 608 to within a pixel.

WHAT IS AND IS NOT BLOCKED. Fillable now with no invented fact: the page intro, the meta description, twelve metric labels, the empty-state body, and the 'Impact we made' heading. Blocked on real work: four card descriptions, four card titles, twelve metric values, the detail lead, six challenge/solution bodies, the impact paragraph. That is the honest split - roughly a third of the lorem on this page is template chrome and two thirds is client work.

THE DETAIL PAGE IS NOT BUILT TO ITS FRAME AT ALL. src/app/cases/[slug]/page.tsx renders a generic MDX article: client eyebrow, h1, description, a metrics <dl>, the body, then a Stack/Capabilities footer. The Case frame draws chips, title, rule, full-bleed hero, three numbered Challenge blocks, three numbered Solution blocks, a Challenges/Solutions toggle at 768, an 'Impact we made' band with a centred paragraph and six metrics, and two half-width images. None of that exists in code, so most of the detail-page 'slots' have no home to land in yet. Worth knowing before anyone tries to apply detail-page copy.

VOICE CHECKS RUN ON EVERY PROPOSED STRING: zero em-dashes, zero exclamation marks, zero contractions in explanatory copy, no Title Case, no ALL CAPS, no banned term, no sentence opening with 'We', one colon maximum per paragraph, 'Recurssive' spelled with the double s wherever the company is meant. Second person versus first: the intro is 0 you / 1 we, the empty state 0 you / 2 we with both in the closing commitment - lower on second person than the shipped FAQ's 8:5 ratio, which is unavoidable in copy about a page rather than about a reader's project. Flagged rather than fudged.

FILES (absolute):
D:/johnn/Projects/recurssive/app/src/app/cases/page.tsx
D:/johnn/Projects/recurssive/app/src/app/cases/[slug]/page.tsx
D:/johnn/Projects/recurssive/app/src/components/CaseCard.tsx
D:/johnn/Projects/recurssive/app/src/components/PageHeader.tsx
D:/johnn/Projects/recurssive/app/src/lib/content/schema.ts
D:/johnn/Projects/recurssive/app/src/lib/site.ts
D:/johnn/Projects/recurssive/app/content/cases/placeholder-fintech-app.mdx
D:/johnn/Projects/recurssive/app/docs/design-data/figspec/Cases__1920w.txt, Cases__768w.txt, Case__1920w.txt, Case__768w.txt
Measurement scripts (scratchpad, disposable): C:/Users/johnn/AppData/Local/Temp/claude/D--johnn-Projects-recurssive/c50e1ef0-ed42-4c56-8523-1fa49e8743f5/scratchpad/ttfmeasure.py and final.py

NO FILES WERE EDITED.

### `cases.page-intro`

`src/app/cases/page.tsx:100`

- **Current:** Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. (123 ch)
- **Proposed (102 chars):** Every case answers the same three questions: what the problem was, what we built, and what it changed.
- **Budget:** 66-107 chars, 2 lines. Re-measured from the TTFs, not estimated: 1920 = PageHeader lg:max-w-[467px] at 16px Open Sans Regular; 768 = container-content 610px at t-body 22px. Filler-probe boundaries: 66 ch is the first length that reaches 2 lines at 1920, 108 ch tips 768 to 3. VERIFIED at 102 ch: 2 lines at both. NOTE the inventory's 67-112 is close but the drawn 123-ch lorem does NOT fit its own 467x44 box - it measures 3 lines. The 768 drawn box (606x63 @24px) is also over-drawn: its own 110-ch string is 3 lines there. Both frames overshoot; the build's 22px at 610px is the shipping constraint.
- **Why:** Sentence pattern 'CLAIM, THEN THE COLON THAT CASHES IT OUT' (one colon, three concrete items). Does not open with 'We'; the single 'we' sits mid-sentence in a commitment clause. No em-dash, no contraction, no number, no superlative. It is also the only intro that stays true at one case or at twenty, which is what a template needs. It reuses the shape already in this file's own metadata (line 12), so page and meta agree.

### `cases.meta-description`

`src/app/cases/page.tsx:12`

- **Current:** Selected work: what the problem was, what we built, what it did.
- **Proposed (99 chars):** Work from Recurssive, written up in full: what the problem was, what we built, and what it changed.
- **Budget:** 50-160 chars (search-result truncation, same window caseSchema.description enforces). No drawn box - this string never renders on the page.
- **Why:** 'Selected work' is on the lexicon's avoid list alongside 'portfolio' and 'case studies', and it also implies a set to select from, which does not exist. Otherwise the current line is already house voice, so this is a two-word repair plus the brand name for search, not a rewrite. Kept parallel with the on-page intro so the two do not drift.

### `cases.empty-state-body (NEW SLOT - not in the inventory, not drawn, not built)`

`src/app/cases/page.tsx:106`

- **Current:** (nothing - lines 106-110 render the four hardcoded placeholder cards)
- **Proposed (153 chars):** Nothing is published here yet. Write-ups go up once an outcome can be measured, not when the work ships. Ask what we are working on and we will tell you.
- **Alternate:** Place the canon No Content state instead: the drawn heading 'No content available' (No Content__1920w.txt L15, Inter Semi Bold 72px) over Recurssive Language Pt.8, 'Basically you found an empty page about an empty page.' - full stop, not the '!' the Figma variant carries. That reuses a frame that already exists and invents no new copy at all. The trade-off is tone: Pt.8 is a joke, which reads well on a 404 and reads flippant to a prospect who navigated to Cases on purpose.
- **Budget:** Target 3 lines. VERIFIED 3 lines at 467px/16px (1920, the PageHeader intro measure) and 3 lines at 610px/22px (768). There is NO drawn box for this - the frames only ever draw four filled cards - so the measure is borrowed from the intro column directly above it, which is the only defensible reference.
- **Why:** This is the slot the page actually needs today, and it is the honest answer to a Cases index with no cases. Opens with the subject ('Nothing'), not 'We'; three sentences; the one first-person clause is the final one and is a commitment, matching both shipped We-sentences at page.tsx L79 and L104. 'X rather than Y' judgement carried by 'not when the work ships'. Zero em-dashes, zero numbers, no contraction.

### `cases.case-description-01`

`src/app/cases/page.tsx:38`

- **Current:** LOREM (382 ch, the constant at line 19)
- **Proposed (0 chars):** (HOLD - do not fill.) This card describes work that does not exist. Recommended: delete the `cases` array (lines 34-83) and render cases.empty-state-body in its place.
- **Alternate:** DO NOT SHIP AS A CLAIM. This exists only to prove the 340-385 window is writable and to show the shape; it restates the repo's own labelled placeholder study (content/cases/placeholder-fintech-app.mdx) and would appear on the index card WITHOUT the 'This is placeholder content' banner that protects it inside the MDX body: "A React Native banking app opened to a spinner for four seconds on the phones most of its customers actually owned. Internal testing ran on flagship devices, so the team that built it could not see the problem. Startup now takes 1.5 seconds at the 75th percentile, and the profiling setup that found it stayed behind so the team can hold the number." (349 ch, VERIFIED 5 lines at 1920 and 7 at 768.)
- **Budget:** 340-385 chars, 5 lines at 1920 and 7 lines at 768 - for when a real study lands. Measured: 1920 text column is 1594 - 6.8% gap - 55.1% image = 607.3px at 16px (CaseCard.tsx L41-52, matches the drawn 608); 768 is container-content 610px at t-body 22px. Filler probe: 310-380 ch = 5 lines at 1920, 390 tips to 6; 340-380 = 7 lines at 768. The drawn 382-ch lorem lands 5/7 exactly. The inventory's 376-393 is 8 chars too generous at the top: 390 breaks 1920 to a sixth line.
- **Why:** Constraint 2: no invented facts. There is no client work, so no honest sentence exists for this box. The shape a real one takes is the three-question structure the intro promises - problem, what got built, what changed - opening with the subject rather than 'We', naming the technology only with its consequence attached, and quoting a figure only where it is a measurement rather than a promise.

### `cases.case-description-02`

`src/app/cases/page.tsx:50`

- **Current:** LOREM (382 ch)
- **Proposed (0 chars):** (HOLD - do not fill.) Same as card 01: no work to describe. This card comes out with the array.
- **Budget:** 340-385 chars, 5 lines at 1920 / 7 at 768 (identical geometry to card 01).
- **Why:** Constraint 2. Blocked on fact.

### `cases.case-description-03`

`src/app/cases/page.tsx:62`

- **Current:** LOREM (382 ch)
- **Proposed (0 chars):** (HOLD - do not fill.) Same as card 01: no work to describe. This card comes out with the array.
- **Budget:** 340-385 chars, 5 lines at 1920 / 7 at 768 (identical geometry to card 01).
- **Why:** Constraint 2. Blocked on fact.

### `cases.case-description-04`

`src/app/cases/page.tsx:74`

- **Current:** LOREM (382 ch)
- **Proposed (0 chars):** (HOLD - do not fill.) Same as card 01: no work to describe. This card comes out with the array.
- **Budget:** 340-385 chars, 5 lines at 1920 / 7 at 768 (identical geometry to card 01).
- **Why:** Constraint 2. Blocked on fact.

### `cases.metric-label-01a`

`src/app/cases/page.tsx:40`

- **Current:** Lorem ipsum
- **Proposed (10 chars):** Cold start
- **Budget:** 1 line. Drawn hug is 74px at 12px (1920) and 124px at 20px (768) - 'Lorem ipsum' measures 73.9 and 123.2, so the box IS the string and 11 chars is the design's own rhythm. Build cell is far wider: grid-cols-3 with gap-x-4 in the 607px column = 191.8px at lg:text-xs 12px, and 192.7px at text-lg 18px on 768 (CaseCard.tsx L73-77). 18px/768 binds first at ~22 chars. This label: 54.1px at 12px, 81.2px at 18px - inside the drawn rhythm.
- **Why:** Same vocabulary as the study already in the repo (placeholder-fintech-app.mdx L12), so index and detail read as one measurement language. Names a quantity the studio can actually measure on any project, which is what makes it a reusable template rather than a claim.

### `cases.metric-label-01b`

`src/app/cases/page.tsx:41`

- **Current:** Lorem ipsum
- **Proposed (19 chars):** Crash-free sessions
- **Alternate:** 'Crash-free' (10 ch, 58.5px at 12px) if the drawn 74px rhythm is treated as binding. The full term is the industry-standard one and is what the MDX already uses; the short one is what the frame drew room for.
- **Budget:** 1 line. 108.8px at 12px (build cell 191.8, fits) and 163.2px at 18px (cell 192.7, fits). 47% over the drawn 74px rhythm - it fits the build, it does not match the drawing.
- **Why:** Industry-standard term, already the house term at placeholder-fintech-app.mdx L14. Falsifiable and unit-bearing.

### `cases.metric-label-01c`

`src/app/cases/page.tsx:42`

- **Current:** Lorem ipsum
- **Proposed (11 chars):** Bundle size
- **Budget:** 1 line. 63.8px at 12px, 95.7px at 18px. Inside the drawn 74px rhythm.
- **Why:** Third of the trio already used at placeholder-fintech-app.mdx L16. Engineering quantity, no adjective doing work.

### `cases.metric-label-02a`

`src/app/cases/page.tsx:52`

- **Current:** Lorem ipsum
- **Proposed (19 chars):** Time to interactive
- **Alternate:** 'Time to load' (12 ch, 69.5px at 12px) - inside the drawn rhythm, and the plainer half of the 50/50 tech/non-tech rule.
- **Budget:** 1 line. 104.0px at 12px, 156.0px at 18px - both inside the build cell. 41% over the drawn 74px rhythm.
- **Why:** Second card needs a distinct trio or the four cards read as one repeated card. A CTO reads 'time to interactive' as TTI; a founder reads it as when the thing is usable. That is the 50/50 test passing.

### `cases.metric-label-02b`

`src/app/cases/page.tsx:53`

- **Current:** Lorem ipsum
- **Proposed (18 chars):** Releases per month
- **Alternate:** 'Release pace' (12 ch, 72.7px at 12px) - inside the drawn rhythm.
- **Budget:** 1 line. 111.3px at 12px, 166.9px at 18px - inside the build cell. 50% over the drawn 74px rhythm.
- **Why:** Pairs with the drawn multiplier value shape ('15x') without asserting anything about a client. Cadence is a thing a studio measures about its own delivery, which keeps the template honest.

### `cases.metric-label-02c`

`src/app/cases/page.tsx:54`

- **Current:** Lorem ipsum
- **Proposed (15 chars):** Support tickets
- **Budget:** 1 line. 84.2px at 12px, 126.4px at 18px. 14% over the drawn 74px rhythm - close enough to keep the rhythm readable.
- **Why:** Non-tech half of the 50/50: the number a founder feels. No jargon, no superlative.

### `cases.metric-label-03a`

`src/app/cases/page.tsx:64`

- **Current:** Lorem ipsum
- **Proposed (19 chars):** Checkout completion
- **Alternate:** 'Checkout rate' (13 ch, 78.3px at 12px, 117.4px at 18px) - inside the drawn rhythm with real headroom at 768.
- **Budget:** 1 line. 118.8px at 12px, 178.1px at 18px - inside the build cell (192.7 at 768, 14px of headroom, the tightest of the twelve). 60% over the drawn 74px rhythm - the worst offender of the set.
- **Why:** Product rather than engineering, which the third card needs so the twelve labels are not all latency. Falsifiable in one sentence.

### `cases.metric-label-03b`

`src/app/cases/page.tsx:65`

- **Current:** Lorem ipsum
- **Proposed (12 chars):** p95 response
- **Budget:** 1 line. 75.9px at 12px (drawn rhythm is 74 - 3% over, effectively on it), 113.9px at 18px.
- **Why:** Deliberately the most technical of the twelve, and the only lowercase-initial one: deck p212 forbids Title Case, and 'p95' is a proper technical token, not a sentence start. It is the one label a CTO checks the studio knows how to write.

### `cases.metric-label-03c`

`src/app/cases/page.tsx:66`

- **Current:** Lorem ipsum
- **Proposed (10 chars):** Build time
- **Budget:** 1 line. 56.8px at 12px, 85.2px at 18px. Inside the drawn 74px rhythm.
- **Why:** Studio-side measurement, cheap to prove, impossible to inflate.

### `cases.metric-label-04a`

`src/app/cases/page.tsx:76`

- **Current:** Lorem ipsum
- **Proposed (19 chars):** Onboarding drop-off
- **Alternate:** 'Sign-up drop-off' (16 ch, 91.1px at 12px) - closer to the drawn rhythm and plainer.
- **Budget:** 1 line. 116.2px at 12px, 174.2px at 18px - inside the build cell. 57% over the drawn 74px rhythm.
- **Why:** A metric that goes DOWN when the work is good, which stops the twelve labels reading as one direction of bragging. Pairs with the design's '+11%' value shape only if the value is re-signed - see cases.metric-value.

### `cases.metric-label-04b`

`src/app/cases/page.tsx:77`

- **Current:** Lorem ipsum
- **Proposed (16 chars):** Offline sessions
- **Budget:** 1 line. 87.9px at 12px, 131.9px at 18px. 19% over the drawn 74px rhythm.
- **Why:** One of the two things the shipped FAQ names as the reason to build mobile at all (page.tsx L79: 'the camera, offline use, or a place on the home screen'). Ties the metric vocabulary to copy that is already public.

### `cases.metric-label-04c`

`src/app/cases/page.tsx:78`

- **Current:** Lorem ipsum
- **Proposed (17 chars):** Maintenance hours
- **Alternate:** 'Upkeep hours' (12 ch, 78.9px at 12px) - inside the drawn rhythm.
- **Budget:** 1 line. 108.4px at 12px, 162.6px at 18px - inside the build cell. 46% over the drawn 74px rhythm.
- **Why:** 'maintenance' is in the preferred lexicon (deck p15/p42 Function). It is also the only one of the twelve that measures what happens after launch, which is the half of the work the Home FAQ opens by claiming (page.tsx L64: 'what happens to it after launch').

### `cases.metric-value (x12) - INVENTED NUMBERS, not a copy slot`

`src/app/cases/page.tsx:40`

- **Current:** 30x / +54% / 10K$ / 15x / +89% / 16K$ / 19x / +33% / 51K$ / 23x / +11% / 70K$ (lines 40-42, 52-54, 64-66, 76-78)
- **Proposed (4 chars):** 00x / +00% / 00K$ (repeated per card)
- **Alternate:** Remove the `metrics` array from the four fixtures entirely and let CaseCard render an empty <dl>. Cleaner, but it removes the gradient numeral - the one piece of brand colour on the whole card - from a page that is still being design-reviewed.
- **Budget:** 1-4 chars, Inter Semi Bold 36px, auto-width 57-96px at 1920. '00x' = 3 ch and '+00%' / '00K$' = 4 ch, so the glyph rhythm and column widths are unchanged from the drawing.
- **Why:** These are not copy to rewrite. They are the only strings on either page that assert a result, and they were transcribed from the frame rather than measured on anything. A reader cannot tell them from real figures, and page.tsx L54-58 already records the house rule that a published number is a public promise. '00' preserves the drawn geometry while being unmistakably a template. This is the item most likely to survive by accident when someone flips the five switches in src/lib/site.ts.

### `cases.card-title (x4)`

`src/app/cases/page.tsx:36`

- **Current:** "Brand Project Case" x4 (lines 36, 48, 60, 72)
- **Proposed (0 chars):** (HOLD - leave as drawn.) It is the frame's own placeholder and is already unmistakably not a client name.
- **Budget:** ~24 chars, ONE line - for when a real title lands. Inter Semi Bold via .t-section = 48px at lg in the 607px column, 42px in the 610px column at 768. Calibration: this design's Inter Semi Bold measures plain-advance x 0.923 (verified exactly - 'Main Challenge Name' predicts 461.8 against a drawn 462 at 48px and 404.1 against 405 at 42px). That gives ~657px of plain advance before the 607px column breaks, so 'Cutting cold start by 63%' (25 ch, 539.8px effective) fits and anything past ~28 chars does not. There is no drawn two-line title state - the drawn box is 404x58, one line - so a second line pushes the chips, description, metrics and CTA down together.
- **Why:** Not lorem and not a claim, so it is the one placeholder on the page that is safe where it stands. Flagged only because the real budget is tight: the MDX study's own title, 'Cutting cold start by 63%', is 25 of the ~28 available characters, so real titles will need writing to this measure rather than to the schema's 70-char cap.

### `case.detail.lead - STRUCTURAL, no field exists`

`content/cases/placeholder-fintech-app.mdx:3`

- **Current:** A React Native banking app took 4.1s to first interaction on mid-range Android. We profiled it, cut it to 1.5s, and left the team able to hold it. (146 ch)
- **Proposed (0 chars):** (BLOCKED ON SCHEMA, not on voice.) Keep `description` as-is for the meta tag and add a separate `lead` field to caseSchema for the drawn paragraph.
- **Budget:** The drawn lead is 336-385 chars: Case__1920w L28-29 draws it 740x89 at 16px, which is 4 lines at 22.2px (Open Sans auto line-height is 1.362em = 21.79 at 16px, so 89 is a clean 4-line hug). Filler probe at 740px: 300 ch = 4 lines, 396 ch tips to 5. But caseSchema.description is capped at 160 chars because it doubles as the meta description (schema.ts L33), and the current 146-char string measures 2 lines in that box - half the drawn height. The two requirements cannot be met by one field.
- **Why:** Reported rather than written around. Every other index page on the site gets away with one description field because its drawn intro is ~110 chars; the Case detail is the only frame that draws a 4-line lead, and it collides with the 160-char search-result limit. Owner call, so it is also in openQuestions.

### `case.detail.challenge-heading (x3)`

`content/cases/placeholder-fintech-app.mdx:28`

- **Current:** ## Challenge  (frame draws "Main Challenge Name" x3, numbered (01) (02) (03))
- **Proposed (0 chars):** (TEMPLATE, per case.) Three numbered challenge headings, each ~19 chars, replacing the single "## Challenge" section.
- **Budget:** ~19-20 chars if the drawn hug is honoured (462px at Inter Semi Bold 48px, 1920; 405px at 42px, 768 - both reproduced to within 1px by the x0.923 factor). The heading is NOT actually capped there - the drawn box is a hug around the placeholder string, and the column is 1594px wide - but past ~19 chars the heading stops sitting flush over its (01) index and its 746px body block. Body under each: 273 chars, 3 lines at 746px/16px (Case__1920w L69-70, box 746x64 = 2.94 line-heights); 768 draws 610x152 at 24px with a 260-char string.
- **Why:** Blocked on fact for the copy itself, but the STRUCTURE is a finding: the frame draws three challenges and three solutions in numbered pairs, with a Challenges/Solutions toggle at 768 (Case__768w L56-62). The MDX template has one Challenge and one Solution section. Whichever way that is settled, it has to be settled before a real study is written, because it changes how the author drafts.

### `case.detail.solution-heading (x3)`

`content/cases/placeholder-fintech-app.mdx:34`

- **Current:** ## Solution  (frame draws "Main Solution Name" x3, numbered (01) (02) (03))
- **Proposed (0 chars):** (TEMPLATE, per case.) Three numbered solution headings, each ~18 chars, replacing the single "## Solution" section.
- **Budget:** ~18-19 chars at the drawn hug (422px at Inter Semi Bold 48px - 'Main Solution Name' is 18 ch). Same 273-char / 3-line body block as the challenge sections.
- **Why:** Same structural finding as the challenge headings. The 768 frame's toggle chip labels 'Challenges' and 'Solutions' (Case__768w L59-62) are drawn, real and in-voice - place them verbatim, do not rewrite them to 'The problem' / 'What we did'.

### `case.detail.impact-heading`

`content/cases/placeholder-fintech-app.mdx:42`

- **Current:** ## Impact  (frame draws "Impact we made")
- **Proposed (14 chars):** Impact we made
- **Budget:** 1 line. Drawn hug 350px at Inter Semi Bold 48px (1920) and 306px at 42px (768); the x0.923 factor predicts 347.2 and 303.9 - within 3px of both. Plenty of column left, so no risk.
- **Why:** Already the design's own words and already in voice - past tense, first person, no adjective. This is a 'place it, do not rewrite it' string, and the current '## Impact' is the generic version of it. Note the band it heads (740x89 CENTER, ~340-385 chars, Case__1920w L30-31) is blocked on fact like everything else on this page.

### `case.detail.metric-label (x3) - ALREADY REAL, reference`

`content/cases/placeholder-fintech-app.mdx:12`

- **Current:** Cold start / Crash-free sessions / Bundle size (lines 12, 14, 16)
- **Proposed (0 chars):** (KEEP.) These three are the canonical label vocabulary; the twelve index labels above are written to match them.
- **Budget:** Drawn box is 132x28 at 18px on the 1920 Case frame - but that box is fixed, not hug ('Lorem ipsum' measures 110.9px inside a 132px box and 28px of height against a 24.5px line), so it is not a real ceiling. 'Crash-free sessions' at 18px is 163.2px, 24% past the drawn 132. The BUILD has no constraint at all here: cases/[slug]/page.tsx L62-69 puts them in a 3-column grid across the full 1594px container at text-sm.
- **Why:** The only metric labels in the repo written by a human rather than transcribed from the frame, and they already pass every voice test - plain, unit-bearing, falsifiable, no Title Case. Making the index match them is cheaper than inventing a second vocabulary.

### Open questions - /cases (index) + /cases/[slug] (detail)

- THE FOUR CASE BODIES CANNOT BE WRITTEN. There is no real client work, so there is no honest sentence for cases.case-description-01..04, and no amount of measuring changes that. Three ways forward, and only the owner can pick: (a) leave /cases exactly as it is - unlinked, noindex, four lorem cards - because it is a design fixture under review and lorem is the safest possible label for a fixture; (b) ship it publicly with the four cards deleted and cases.empty-state-body in their place; (c) hold the whole route until the first real write-up exists. My recommendation is (a) until there is one real case, then (b) is never needed because (c) resolves itself. What must NOT happen is the four cards surviving the day someone flips the five switches in src/lib/site.ts.
- THE TWELVE METRIC VALUES ARE THE REAL HAZARD, not the lorem. 30x, +54%, 10K$, 15x, +89%, 16K$, 19x, +33%, 51K$, 23x, +11%, 70K$ are transcribed from the frame and are indistinguishable from measured client results. The lorem announces itself; these do not. Confirm they become 00x / +00% / 00K$ (or are deleted) before /cases is linked from anywhere. This should be item 6 on the five-point checklist in src/lib/site.ts L54-60.
- THE DETAIL PAGE'S LEAD PARAGRAPH HAS NO FIELD. Case__1920w draws a 740x89 four-line lead of ~340-385 characters; caseSchema.description is capped at 160 because it doubles as the meta description (schema.ts L33), and the placeholder study's 146-char description fills only half that box. Add a `lead` field to caseSchema, or redraw the paragraph to two lines? Owner call - it changes both the schema and the frame.
- THE DETAIL PAGE'S SECTION STRUCTURE DISAGREES WITH THE TEMPLATE. The frame draws THREE numbered challenges and THREE numbered solutions in (01)(02)(03) pairs, with a Challenges/Solutions toggle at 768. The MDX template has one Challenge section and one Solution section. Is three-and-three the required shape, or is the frame showing a maximum that collapses gracefully to one? An author cannot draft a real study until this is settled.
- THE SEGMENT FILTER SHIPS WITH NOTHING TO FILTER. FilterTabs renders All / Startups / SMB's / Enterprise (page.tsx L102) and caseSchema already has the matching enum, but with zero real cases the chips are decoration and, once wired, three of the four will return an empty list. Hide the row until there are cases in at least two segments, or wire it and accept empty states?
- THE CARD TITLE HAS ~28 CHARACTERS AND NO SECOND LINE. The drawn title box is 404x58 - one line - and the real ceiling in the 607px column is ~28 characters at 48px. The repo's own study title, 'Cutting cold start by 63%', is 25 of them. Either real case titles get written to that measure, or the card needs a two-line title state that the design does not currently have. Worth deciding before ten studies exist with titles that do not fit.
- DOES THE METRIC ROW SURVIVE A CASE WITH NO CLEAN NUMBER? Some good work has no headline figure. The design gives every card three gradient numerals and no state without them. If the first real study cannot produce three honest numbers, does the row degrade to one, or does the card lose the row entirely?

---

## /blog (index) + /blog/[slug] (Post detail)

MEASUREMENT NOTES (all budgets derived from the four named figspec frames, not inherited)

Calibration I used and verified against drawn strings on these frames:
- Open Sans Regular: 0.48em per character. Blog 1920 page-intro box 467px at 16px predicts 60.8 ch/line; the drawn 123-char lorem takes 2 lines in a 44px box, consistent.
- Inter Semi Bold display with ls-5%: 0.458em. Proven exactly here — the drawn 26-char post title measures 380px at 32px (380/26 = 14.62) and 499px at 42px (499/26 = 19.19). Both agree to within 0.3%.
- 24px ls-3% at 768: ~11.0px per character (610px box carrying a 110-char string over 2 lines). This is slightly wider per character than the inventory's implied 10.29px, so my 768 ceilings come out a few characters TIGHTER than the inventory states. Where they differ I used mine and said so.

Two inventory budgets I would revise:
1. blog.page-intro — inventory says 67-112. My 1920 floor is 61, not 67 (467/7.68 = 60.8 ch/line, so 62 chars already makes two lines), and my 768 ceiling is 110, not 112 (the drawn 768 string is exactly 110 chars at 2 lines, which is the observed maximum, not a computed one). Usable window: 62-110.
2. blog.post-description — inventory says 68-113 and treats it as an index-only slot. It is not: /blog/[slug]/page.tsx:66 renders the same post.meta.description field, and the drawn Post hero deck is a 343x43 box at 1920 (44.7 ch/line, 2 lines = 45-89) and 483x71 at 768 (43.9 ch/line = 44-87). One field, four drawn boxes. The real window is 63-87, materially tighter than stated.

SLOTS THE INVENTORY DOES NOT LIST, ADDED HERE
- blog.post-date-format (page.tsx:44) — 13-char drawn US format contradicting the en-GB format the slug page already ships.
- blog.card-tag-chips (page.tsx:43) — hardcoded, and the vocabulary matches neither the filter row nor the one real post.
- blog.show-more (page.tsx:90) — drawn verbatim, but unconditional against one post.
- blog.empty-state x3 (heading / body / action) — drawn on the No Content frames, not built anywhere on /blog. NoticeBlock (NoticePage.tsx:50, as="h2") already exists for exactly this and its docstring says so.
- post.suggested-reads-heading — drawn verbatim at both widths, band not built.
- post.hero-deck — a fourth drawn box on the shared description field, and the tightest of the four.
- why-recursion.mdx x4 — title, description, tags, and the temporary-post banner.

WHAT I DID NOT WRITE, AND WHY
No article bodies. Per the knowledge base (finding 19b, owner's decision 2026-08-03), Blog and Post ship with temporary imagery and the owner supplies real content post-launch. The five subjects above are titles and standfirsts drawn from the deck's own pages (pp89-112 recursion, p123 base case, p85 designers/developers, p72 stack, p88 ask-listen-think, pp44-50 and p82-84 feel), marked PROPOSED, NOT WRITTEN, with no invented body text.
No reading-rail labels and no MDX section headings for unwritten articles — those are per-article and depend on articles that do not exist. For reference when they do: H2s are <=58 chars for one line at 1920 (861px body column at 32px Inter SB) and <=72 over the drawn two lines at 768 (528px column, 36 ch/line). The drawn examples measure 26, 42 and 47 chars.

VOICE CHECKS RUN ON EVERY PROPOSED STRING
Zero em-dashes. Zero exclamation marks (which is why the empty-state body takes the deck's p230 full stop over Figma's '!' — a genuine one-character conflict between the two sources, resolved to the deck). Zero contractions in explanatory copy. No paragraph opens with 'We'. No Title Case, no all-caps, no bold sentences. 'Recurssive' vs 'recursive' grepped: the company name appears nowhere in these strings; 'Recursion' appears twice as the concept, correctly single-s. Banned list swept — no seamless, cutting-edge, elevate, unlock, empower, transform, journey, passionate, trusted by, world-class, pixel-perfect. No invented facts: no client names, no numbers, no team size, no founding year, no awards. The only figure anywhere in these proposals is a date format.

TWO THINGS I COULD NOT FIT, REPORTED RATHER THAN OVERSHOT
1. why-recursion's existing 150-char description cannot be preserved. Every honest trim to the 63-87 window loses the third clause ('and it is why the studio is named the way it is'). I cut it rather than let it take four lines in a 43px box.
2. The blog.proposed-article-01 description lands on 87, the exact ceiling. If the Post hero is built to the drawn 343px rather than the current 768px column, that string has no slack at all and should lose three characters.

BUILD OBSERVATIONS THAT AFFECT COPY BUT ARE NOT COPY
- The Post template is essentially unbuilt. /blog/[slug]/page.tsx is a plain article — header, h1 at text-6xl, description, MDX — with none of the drawn full-bleed hero, the reading rail, the inline images, or the Suggested reads band. Every Post-side budget above is therefore latent: nothing overflows today, and everything overflows at once when the template lands.
- .t-body resolves to 22px at a 768 viewport (globals.css:88), against the 24px every one of these frames draws. PageHeader.tsx:20-24 already documents and defends this. It means the real 768 render has slightly MORE room than the drawn boxes, so writing to the drawn measure is the conservative side of the error.
- FilterTabs is static by its own admission (FilterTabs.tsx:27) and nothing on /blog filters. The empty-state copy above is written for a filter-miss that cannot currently occur.

### `blog.page-intro`

`src/app/blog/page.tsx:67`

- **Current:** "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." (123 ch)
- **Proposed (103 chars):** Notes on React Native, on-device AI and building for the web. Written while the work is still going on.
- **Alternate:** Short pieces on how the work actually goes: what we chose, what it cost, and what we would do differently. (106 ch — same 2 lines at both widths, but spends its one colon and uses "we" twice)
- **Budget:** 62-110 chars, 2 lines. 1920: drawn box 467x44 @16px Open Sans Regular (Blog__1920w.txt:164-165) = 60.8 ch/line at 0.48em, so >61 for 2 lines, <=121. 768: drawn box 606x63 @24px ls-3% (Blog__768w.txt:116-117) with a 110-ch string over 2 lines = ~55 ch/line, so >56 and <=110. 768 sets the ceiling. Build renders lg:max-w-[467px] and full 610px column at 768 with .t-body at 22px (globals.css:88), i.e. 57.8 ch/line there — slightly MORE slack than drawn, so writing to the drawn 110 is the safe side. Inventory said 67-112; my 1920 floor is 61 not 67 and my 768 ceiling is 110 not 112, so the usable window is marginally narrower than stated.
- **Why:** Sentence 1 is the already-shipped meta description on this same file (page.tsx:13, 'Notes on React Native, on-device AI and building for the web.') — reusing it keeps the <title> card and the page saying the same thing, and it is copy the house already approved. Sentence 2 is the honest qualifier: there is no archive and no schedule. Two sentences matches both shipped leads (faq-intro page.tsx:407, contact-lead page.tsx:568). Does not open with 'We' (voice rule). Zero em-dashes, zero contractions, zero exclamation marks. Naming React Native / on-device AI without a consequence clause is permitted here because this is a subject list, not a claim — same construction the shipped meta description already uses.

### `blog.post-title (x9 placeholder cards)`

`src/app/blog/page.tsx:40`

- **Current:** "Lorem ipsum dolor sit amet" (26 ch), repeated nine times via IMAGES.map
- **Proposed (28 chars):** Why we named it after a loop
- **Alternate:** Why the name is a loop (22 ch — sits inside the drawn 26-char box with room, at the cost of saying less)
- **Budget:** <=26 to match the drawn box exactly; <=31 to hold ONE line in the built card; hard fail above 34. 1920: drawn 380x39 @32px Inter Semi Bold ls-5% (Blog__1920w.txt:30-31) — the 26-ch lorem measures 380px, so the box is fitted to the string at 14.65px/char (0.458em). Built column is 514px minus the 10px text inset = 504px = 34.4 ch/line (PostCard.tsx:39,49,61). 768: drawn 499x51 @42px (Blog__768w.txt:50-51), built column is the full 610px flush = 31.7 ch/line. 768 therefore sets the one-line ceiling at 31. My 28 is 2 chars over the drawn box (410px vs 380) but 94px inside the built column.
- **Why:** This is the only real post that exists (content/blog/why-recursion.mdx), so it is the only honest string for this slot. Its current title, 'Why we named the studio after a loop', is 36 chars — 5 over the built one-line cap and 10 over the drawn box — so it takes two lines at both widths and the design draws no two-line title state. 'Why we named it after a loop' keeps the sentence and loses the redundant 'the studio' (the reader is on the studio's site). Sentence case, not Title Case (deck p212). See openQuestions for the structural point: nine hardcoded lorem cards should become getAll('blog').

### `blog.post-description (x9 placeholder cards)`

`src/app/blog/page.tsx:42`

- **Current:** "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." (123 ch)
- **Proposed (84 chars):** Recursion is not a trick we like. It is the shape of how products actually get made.
- **Alternate:** Recursion is not a programming trick. It is the shape of how products get made here. (84 ch — drops the first-person 'we like', which is the more matter-of-fact read; 'here' does the falsifiability work instead)
- **Budget:** 63-87 chars if one string serves the index card AND the Post hero deck (it does — both read post.meta.description). Index card 1920: drawn 477x72 @16px (Blog__1920w.txt:113-114) = 62.1 ch/line, box has slack for 3 lines but the drawn string sets 2, so >62 and <=124. Index card 768: drawn 610x62 @24px ls-3% with a 110-ch string over 2 lines = ~55 ch/line, so >56 and <=110. Post hero deck 1920: drawn 343x43 @16px (Post__1920w.txt:81-82), 44.7 ch/line, 2 lines = 45-89. Post hero deck 768: drawn 483x71 @24px = 43.9 ch/line, 2 lines = 44-87. Intersection of all four: 63-87. Separately postSchema (src/lib/content/schema.ts:33) enforces 50-160, which is looser at both ends and does not protect this.
- **Why:** Sentence-pattern 'REFUSE THE FLATTERING READING' — say what it is not, then what it is, two short parallel sentences (shipped precedent: page.tsx:99, 'It is not a cheap version of the product. It is the fastest way...'). Opens with the subject, not 'We'. No contractions in explanatory copy. The current mdx description is 150 chars: schema-valid, but 3 lines on the index card at both widths and 4 on the Post hero deck. This is the same trim as the why-recursion.description proposal below — they are one string, and changing one changes both.

### `blog.post-date-format (x9 cards)`

`src/app/blog/page.tsx:44`

- **Current:** "June 25, 2026" (13 ch, hardcoded on every card)
- **Proposed (12 chars):** 25 June 2026
- **Budget:** 1-13 chars, one line. 1920: drawn box 76x16 @12px Open Sans (Blog__1920w.txt:129-130) — 76px is the exact advance of the 13-char drawn string, so the box is fitted to it at ~5.85px/char. 768: 126x27 @20px (Blog__768w.txt:64-65). 12 chars is inside both; the built cell is not width-constrained (PostCard.tsx:67).
- **Why:** The build already contradicts itself here and the code comment on page.tsx:56-57 flags it: the index hardcodes the US 'June 25, 2026' while /blog/[slug] formats the same field as en-GB '25 June 2026' (blog/[slug]/page.tsx:55). The voice system commits to British/international where the choice arises, and the build already commits elsewhere — Intl.DateTimeFormat('en-GB') in src/lib/contact.ts:105, 'licence' in about/page.tsx:24. One format, derived from post.meta.publishedAt rather than typed. This is the same class of change as 'two working days': change it in both places or neither.

### `blog.filter-chips (the row under the header)`

`src/app/blog/page.tsx:69`

- **Current:** options={['All', 'Insights', 'Technology', 'Tools']}
- **Proposed (42 chars):** ['All', 'Insights', 'Technology', 'Tools'] — KEEP AS DRAWN. These are not placeholder: all four are drawn verbatim at both widths (Blog__1920w.txt:48-53,81-83; Blog__768w.txt:118-126). No copy change proposed. The change needed is on the content side — see the tags proposal below.
- **Alternate:** If the owner would rather the chips name what he will actually write about: ['All', 'Notes', 'Engineering', 'Craft']. Budget holds — 'Engineering' is 11 chars = ~127px at 24px, one pixel wider than the drawn 'Technology' at 128px, so the 768 row still measures ~433px of the 610px container and the flex-1 rule keeps its 40px minimum.
- **Budget:** Row must fit 610px at 768 with the rule keeping min-w-[40px] (FilterTabs.tsx:43). Drawn 768 row: pill 58 + 20 + 87 + 20 + 128 + 20 + 60 = 393px, leaving 217px for the rule. Per-label ceiling ~11 chars at 24px (11.5px/char). 1920 is uncontended: 49 + 40 + 58 + 40 + 86 + 40 + 40 = 353px of a 1594px container.
- **Why:** These are drawn English words, not lorem, so the design has already decided them and I am not rewriting a decision the deck made. The real defect is that the taxonomy has no content behind it: the one real post is tagged brand + engineering (why-recursion.mdx:5-7), which matches none of the three chips. Also worth recording: FilterTabs is static by the component's own admission (FilterTabs.tsx:27) — nothing filters, so the chips currently promise an interaction the page does not have.

### `blog.card-tag-chips (x2 per card)`

`src/app/blog/page.tsx:43`

- **Current:** tags: ['Insights', 'Technology'] — hardcoded on all nine placeholder cards
- **Proposed (20 chars):** Derive from post.meta.tags rather than hardcoding, and align the vocabulary with the filter row. For the one real post that means retagging why-recursion.mdx from ['brand','engineering'] to ['Insights','Technology'].
- **Budget:** 8-10 chars per chip is the drawn rhythm. 1920: chip frames 63x29 and 83x29, r4, 12px Open Sans with 9px horizontal padding (Blog__1920w.txt:54-56,84-86; build px-[9px] at PostCard.tsx:54) — 'Insights' measures 44px, 'Technology' 64px. 768: 92x40 and 126x40 at 20px. Two chips at 768 take 92+15+126 = 233px of 610, so the cell is not the constraint; the drawn rhythm is. A chip over ~14 chars stops matching the drawn proportions.
- **Why:** Card chips and filter chips have to be the same vocabulary or the filter cannot ever match a card. Casing follows the drawn chips (capitalised single words), not the lowercase kebab tags the mdx currently carries — which is a data-shape decision the build has to make anyway, since PostCard renders post.tags verbatim (PostCard.tsx:56).

### `blog.show-more`

`src/app/blog/page.tsx:90`

- **Current:** "Show more" (9 ch) — drawn verbatim, always rendered
- **Proposed (9 chars):** Show more — keep the string, condition the button. Render it only when unshown posts exist. With one post in content/blog it currently offers to reveal nothing.
- **Budget:** 9 chars, one line, inside a 226x44 group that is pixel-identical at both widths (Blog__1920w.txt:156-158; Blog__768w.txt:88-90). 161px of that is the label at 32px Inter Semi Bold ls-5%; the 44px circle and its 21px gap take the rest. Ceiling ~13 chars before the group exceeds its drawn 226px.
- **Why:** Drawn verbatim at both widths, so no rewrite. Flagged because a control that does nothing is worse copy than no control: the design draws nine cards and a 'Show more', the content directory holds one file, and the button is unconditional in the build.

### `newsletter.description`

`src/components/Newsletter.tsx:55`

- **Current:** "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor." (79 ch)
- **Proposed (79 chars):** An email when something new goes up here. No schedule, no digest, nothing else.
- **Alternate:** One email when there is something new to read. No schedule, no digest, nothing else. (84 ch — same two lines at both widths; 'one email' is the firmer promise, which is also the riskier one while there is no list)
- **Budget:** 56-97 chars, 2 lines. 1920: drawn box 374x48 @16px Open Sans (Blog__1920w.txt:5-6, Post__1920w.txt:5-6) = 48.7 ch/line, so >49 for 2 lines and <=97. 768: drawn box 610x62 @24px ls-3% carrying the LONGER 110-ch lorem over 2 lines (Blog__768w.txt:62-63) = ~55 ch/line, so >56 and <=110. 1920 sets the ceiling at 97, 768 the floor at 56. Build already matches both boxes (max-w-[610px] lg:max-w-[374px], Newsletter.tsx:54). My 79 is exactly the drawn 1920 length.
- **Why:** Sits under 'Stay in the loop' — Recurssive Language Pt.5 (deck p227), already placed verbatim, so this paragraph only has to say what arriving in the loop costs you. States a commitment the business can keep and refuses the three things newsletter copy usually promises, using the shipped triplet shape (page.tsx:69) with commas, not em-dashes. Second person once, first person zero, does not open with 'We'. No contractions (explanatory register). Banned-word sweep clean. See openQuestions — Newsletter.tsx:29-31 records that the form submits nowhere and there is no list, so this sentence is a promise the studio cannot currently keep.

### `blog.empty-state-heading (DRAWN, NOT BUILT)`

`src/app/blog/page.tsx:76`

- **Current:** nothing — the grid renders unconditionally; there is no zero-post or zero-match branch
- **Proposed (16 chars):** Nothing here yet
- **Alternate:** No content available (20 ch — the string the No Content frame actually draws; use this if the owner wants the standalone /blog empty page to read identically to the drawn frame, and reserve 'Nothing here yet' for the filter-miss)
- **Budget:** <=22 chars, one line. Drawn on No Content__1920w.txt:15-16 as 72px Inter Semi Bold ls-5% in a 657x87 box: 20 chars at 657px = 32.85px/char (0.456em), against an artwork width of 764px = 23 chars. 768 is the binding width: 534px artwork at 52px = 23.8px/char = 22 chars (NoticePage.tsx:20-24,86). Above 22 the headline wraps and the drawn one-line silhouette goes.
- **Why:** NoticeBlock already exists for exactly this and says so in its own docstring — 'covers a 404, a failure, a confirmation and an empty list without lying about any of them' (NoticePage.tsx:6-13), with as="h2" for the in-page case. Knowledge base finding #16 records that the drawn No Content frame is a full-page takeover with no H1 and no filter chips, so it cannot serve a filter-miss; the in-page NoticeBlock can. Sentence case, no exclamation mark.

### `blog.empty-state-body (DRAWN, NOT BUILT)`

`src/app/blog/page.tsx:76`

- **Current:** nothing built. The frame draws: "Basically you found an empty page about an empty page!" (54 ch, with an exclamation mark)
- **Proposed (54 chars):** Basically you found an empty page about an empty page.
- **Alternate:** For the filter-miss variant specifically, where the canon line is a poor fit because the page is not empty: Nothing matches that filter yet. Try another one, or read everything. (69 ch, 2 lines at 1920, in budget)
- **Budget:** 44-88 chars. Drawn 1920: 533x27 @20px in a single line (No Content__1920w.txt:17-18) — 54 chars at 533px = 9.87px/char (0.49em). But the BUILT paragraph caps at max-w-[max(59%,22ch)] = ~441px of the 764px artwork (NoticePage.tsx:100-101), so 44 ch/line and this line renders 2, which the component's own comment anticipates. 768: 303px at 24px = ~26 ch/line, 2-3 lines. Ceiling ~88 before it takes a fourth line at 768.
- **Why:** Recurssive Language Pt.8, deck p230, placed verbatim rather than rewritten. One change from the Figma frame: the deck writes it with a FULL STOP and Figma's variant ends in '!'. The deck is the source, the sliders sit at Serious and Matter-of-fact (p40), and there is not one exclamation mark in any shipped string — so the full stop wins. This is a real one-character discrepancy between the frame and the deck, not a preference.

### `blog.empty-state-action (DRAWN, NOT BUILT)`

`src/app/blog/page.tsx:76`

- **Current:** nothing built. NoticeBlock defaults actionLabel to "Go back to home" (15 ch), which is what the No Content frame draws
- **Proposed (15 chars):** Read everything
- **Budget:** <=20 chars, one line, centred. Drawn 143x25 @18px Open Sans (No Content__1920w.txt:19-20) = 7.94px/char; built at clamp(18px, 28px - 0.521vw, 24px) (NoticePage.tsx:110) so 24px at 768 = 11.5px/char, and the artwork is 534px wide there — ~46 chars before wrap. Not width-bound; bound by reading as one control.
- **Why:** Only for the in-page filter-miss variant, where 'Go back to home' sends the reader off the page they were trying to use. On the standalone /blog-is-empty case the drawn 'Go back to home' stays, because there is genuinely nowhere else on that route to send them. Imperative, like every string in MESSAGES (src/lib/contact.ts:42-62).

### `post.suggested-reads-heading (DRAWN, NOT BUILT)`

`src/app/blog/[slug]/page.tsx:72`

- **Current:** nothing — the article closes after <Mdx source={post.body} /> with no related-posts band
- **Proposed (15 chars):** Suggested reads
- **Budget:** <=24 chars comfortably. Drawn 361x58 centred, 48px Inter Semi Bold ls-5% at 1920 (Post__1920w.txt:125-126) and 316x51 at 42px at 768 (Post__768w.txt:49-50) — 15 chars at 361px = 24.07px/char. The 1594px container at 1920 and 610px at 768 leave the string uncontended; 610/19.24 = 31 chars is the 768 one-line cap.
- **Why:** Drawn verbatim at both widths, sentence case, so it is a decided string rather than a slot to fill. Recorded as a proposal because the band it heads does not exist in the build: the frame draws three PostCards below it (Post__1920w.txt:85-123 — identical 380x39 titles, 477x72 descriptions, chips and dates to the index), which is a whole component the Post template is missing. The three cards inherit the index card budgets above exactly.

### `post.hero-deck (the standfirst over the hero image)`

`src/app/blog/[slug]/page.tsx:66`

- **Current:** {post.meta.description} rendered as text-lg in a max-w-3xl column — the drawn hero (full-bleed image, title, date, tags, deck) is not built
- **Proposed (84 chars):** No new string: this slot reads post.meta.description, the same field the index card reads. The proposal is the budget, not the copy — write that one description to 63-87 chars and it satisfies four drawn boxes at once.
- **Budget:** 45-88 chars on this slot alone. 1920: drawn 343x43 @16px Open Sans (Post__1920w.txt:81-82) = 44.7 ch/line, 2 lines. 768: drawn 483x71 @24px ls-3% (Post__768w.txt:55-56) = 43.9 ch/line, 2 lines within a 71px box. Combined with the index card's 63-110 window, the shared field's real budget is 63-87. postSchema allows 50-160 (schema.ts:33) and therefore does not protect either box.
- **Why:** Worth stating explicitly because the build hides it: /blog/[slug] currently renders description at 18px in a 768px column where anything under 160 chars looks fine, so nothing fails until the drawn Post hero is built and every over-long description overflows a 343px box at once. Same class of latent break as the industries band recorded at page.tsx:24-29.

### `why-recursion.title (EXISTING REAL CONTENT)`

`content/blog/why-recursion.mdx:2`

- **Current:** Why we named the studio after a loop (36 ch)
- **Proposed (28 chars):** Why we named it after a loop
- **Budget:** <=26 drawn / <=31 to hold one line in the built card (see blog.post-title above). 36 chars is 5 over the built 768 cap (36 x 19.24px = 693px against a 610px column) and 10 over the drawn box, so it wraps to two lines at both widths — and neither frame draws a two-line title state.
- **Why:** The sentence survives the cut intact; 'the studio' is the only thing lost and the reader is already on it. Keeps the voice (a question opening, sentence case, no Title Case per deck p212). If the owner would rather keep the longer title, that is a legitimate call but it needs a two-line card state added to the design, not absorbed silently.

### `why-recursion.description (EXISTING REAL CONTENT)`

`content/blog/why-recursion.mdx:3`

- **Current:** Recursion is not a programming trick we like. It is the shape of how good products actually get made, and it is why the studio is named the way it is. (150 ch)
- **Proposed (84 chars):** Recursion is not a trick we like. It is the shape of how products actually get made.
- **Alternate:** Recursion is not a programming trick. It is the shape of how products get made here. (84 ch — swaps the first-person opinion for a falsifiable claim about this studio, which is the stronger version by the voice system's own test)
- **Budget:** 63-87 (index card + Post hero deck, derived above). Current 150 is schema-valid (50-160) but renders 3 lines in the index card's drawn 477x72 box at 1920, 3 at 768, and 4 in the Post hero's 343x43 deck — the box that has no slack at all.
- **Why:** The existing sentence is already in the house voice; it is only too long. The trim keeps both halves of the refuse-the-flattering-reading pattern and drops the third clause, which restated the title. This is the same string as the blog.post-description proposal — one field, two renderers.

### `why-recursion.tags (EXISTING REAL CONTENT)`

`content/blog/why-recursion.mdx:5`

- **Current:** tags:\n  - brand\n  - engineering
- **Proposed (8 chars):** tags:\n  - Insights\n  - Technology
- **Budget:** 8-10 chars per tag is the drawn chip rhythm (63x29 / 83x29 at 1920, 92x40 / 126x40 at 768). 'Insights' 8, 'Technology' 10 — the exact drawn strings.
- **Why:** Neither existing tag appears in the drawn filter row (All / Insights / Technology / Tools), so today a reader who clicks a chip — once filtering is wired — matches nothing, and the card chips render lowercase kebab where the design draws capitalised words. Aligning content to the drawn vocabulary is the cheaper of the two fixes; the alternate under blog.filter-chips is the other direction.

### `why-recursion.temp-banner (MUST NOT SHIP)`

`content/blog/why-recursion.mdx:11`

- **Current:** > **Temporary post.** Structure and styling only. Real writing to follow.
- **Proposed (0 chars):** Delete. It is the first thing a reader sees on the only live article, it is a bold sentence in body copy (deck p212 forbids it), and it tells a visitor the page is not finished.
- **Budget:** n/a — removal.
- **Why:** Contained today only because /blog carries noIndex (blog/page.tsx:16) and is absent from `routes` (src/lib/site.ts:75). Those two come off together when copy lands, per the checklist in site.ts:44-70, and this line has to go in the same commit or the launch ships a page that announces it is a placeholder. The rest of the file is genuinely in voice and needs no rewrite: 'Recursion is when a process becomes the input to itself' is deck p90; the H2s 'A process that feeds itself' (26) and 'The base case matters most' (26) are both inside the <=58-char one-line H2 budget drawn at Post__1920w.txt:32-33.

### `blog.proposed-article-01 (PROPOSED, NOT WRITTEN)`

`content/blog/(new file):1`

- **Current:** does not exist — subject proposal only, no article text written
- **Proposed (28 chars):** title: Every loop needs a base case
description: Iteration without a stopping condition is not diligence. It is a team unable to decide.
- **Budget:** Title 28 ch (<=31 built one-line cap; 2 over the drawn 26). Description 87 ch (63-87 window; sits on the ceiling — trim 3 chars if the Post hero deck is built to the drawn 343px exactly).
- **Why:** Deck pp89-112 (the recursion thesis) plus p123's base-case diamond, which is the logo's own decision shape. The subject is already half-written in why-recursion.mdx's second section, so this is the piece that exists in outline. Description uses the X-rather-than-Y judgement with no adjective doing the work. NOT WRITTEN — this is a title and a standfirst for the owner to fill or reject.

### `blog.proposed-article-02 (PROPOSED, NOT WRITTEN)`

`content/blog/(new file):1`

- **Current:** does not exist — subject proposal only, no article text written
- **Proposed (28 chars):** title: Make designers think in code
description: Design and code are one problem seen twice. The long-term goal is to close the gap.
- **Budget:** Title 28 ch (<=31). Description 83 ch (63-87).
- **Why:** Deck p85 verbatim as the long-term goal — 'Make Designers Think Like Developers / Make Developers Think Like Designers ... to bridge the gap between them and transform people into holistic problem solvers'. Retitled to sentence case and cut to 28 chars; the deck's own phrasing is 36. This is the deck's most concrete opinion and the one with the most to say. NOT WRITTEN.

### `blog.proposed-article-03 (PROPOSED, NOT WRITTEN)`

`content/blog/(new file):1`

- **Current:** does not exist — subject proposal only, no article text written
- **Proposed (30 chars):** title: The stack is a means to an end
description: A stack is chosen for its consequences, not its reputation. Here is how we pick ours.
- **Budget:** Title 30 ch — 1 char under the built 768 one-line cap of 31 (30 x 19.24px = 577px against a 610px column). Tight; anything longer needs the two-line state. Description 85 ch (63-87).
- **Why:** Brand philosophy p72, 'Tech stack is just means to an end'. Pairs directly with the shipped consequence-clause rule and with the canon Pt.3 line 'Tech we use on repeat' already reserved for the stack list. 'we' lands last, as the shipped copy does. NOT WRITTEN.

### `blog.proposed-article-04 (PROPOSED, NOT WRITTEN)`

`content/blog/(new file):1`

- **Current:** does not exist — subject proposal only, no article text written
- **Proposed (23 chars):** title: Ask, listen, then think
description: Three questions decide most of a project, and all three come before any code exists.
- **Budget:** Title 23 ch — inside the drawn 26 as well as the built 31. Description 84 ch (63-87).
- **Why:** Deck p88, 'The most powerful tools we have: Ask, Listen, Think', which is also the Home process band's own four steps (page.tsx:110-113 — Ask / Listen / Think / Create). The article is the long form of a band the site already ships, so it is the one with a built-in internal link. NOT WRITTEN.

### `blog.proposed-article-05 (PROPOSED, NOT WRITTEN)`

`content/blog/(new file):1`

- **Current:** does not exist — subject proposal only, no article text written
- **Proposed (25 chars):** title: Feel is a requirement too
description: How a product feels is a requirement, not a finish. Specify it or you are guessing.
- **Budget:** Title 25 ch (inside the drawn 26). Description 83 ch (63-87).
- **Why:** The tagline's own first third (deck pp44-50, Feel = Emotion & Experience), read against p84's 'Apps With: Feel-Grade Use / Performance-Grade Use' and p82's 'In a world so distant and apathetic, the goal is to feel again'. Says what the thing is not, then what it is. Second person in the payoff. NOT WRITTEN.

### Open questions - /blog (index) + /blog/[slug] (Post detail) — frames Blog__1920w / Blog__768w / Post__1920w / Post__768w

- The five article subjects above are proposals, not drafts. Only the owner can decide which he will actually write, and nothing should ship as a card until the article behind it exists — nine cards linking to one file is the current state and it is worse than three cards linking to three.
- The newsletter promises delivery. Newsletter.tsx:29-31 records that the form submits nowhere, that there is no list to subscribe to, and that it is deliberately NOT wired to the contact route. 'An email when something new goes up here' is therefore a commitment the studio cannot keep today. Ship the band with an inert form and honest copy, or hold the band until a list exists?
- Tag vocabulary: keep the drawn Insights / Technology / Tools and retag the content to match, or keep the content's own tags (brand, engineering) and redraw the chips? Both are defensible; the one thing that cannot stand is the current split, where no chip matches any post.
- Date format. The index draws US 'June 25, 2026'; /blog/[slug] already formats en-GB '25 June 2026'; contact.ts:105 and about/page.tsx:24 commit the build to en-GB. Adopting en-GB everywhere changes a drawn string. Owner's call, and it must change on both surfaces or neither.
- The title budget conflict is structural and only the owner can resolve it. The index card draws 26 chars on ONE line (380x39 at 1920, 499x51 at 768); the Post hero draws 58 chars over 3-4 lines (421x212 / 518x138); postSchema permits 70. Either every title stays <=31 and the Post hero is permanently under-filled, or the index card needs a two-line title state that neither frame draws.
- 'Show more' — pagination, or removed until there are more than nine posts? The button is currently unconditional and there is one post.
- When copy lands, /blog has to come out of noIndex (blog/page.tsx:16) and into `routes` (src/lib/site.ts:75) in the same commit, per the checklist at site.ts:44-70. That is a launch decision, not a copy one.
- Reading-rail labels on the Post template (Post__1920w.txt:43-46,55-58,67-70) are per-article and sit in a ~64px column at 16px — 'Frontier for solid defense' is 25 chars wrapped over three lines in 64px. They cannot be the H2s, which are drawn at 26-47 chars. Does the owner want to author a short rail label per section, or should the rail be dropped?
- The Post frames carry ~2,400 words of verbatim third-party article text (OpenAI's Rosalind Biodefense announcement, Post__1920w.txt:34-65). It is someone else's copyrighted copy sitting in the design file. It is not in the build and must never reach it — confirming that is a launch check, not a copy proposal.

---

## /contact

MEASUREMENTS I RE-DERIVED (and where the inventory needed extending)

The slot inventory supplied with the brief has no Contact rows at all, so every budget above is my own measurement off Contact__1920w.txt and Contact__768w.txt. Six new slot families that were not in the inventory: the contact card heading and body, the four card row labels, the six field labels/legends, the eleven chip labels, the consent line, and the submit button.

The calibration constants held. Open Sans Regular measures 0.477em/char on this page, checked twice on the same string at two sizes: the consent line is 47 chars in 314px at 14px (1920) and 493px at 22px (768) — 0.477 both times. That is the cleanest confirmation of the 0.48 rule anywhere I looked. Inter Bold on the dark card measures 0.521em/char (heading, 24 ch = 400px at 32px). Inter with ls-5% on display headings measures ~0.496em/char (404 frame heading, 13 ch = 464px at 72px), but that figure is inflated by digits — per-glyph measurement is required for punctuation-heavy strings like 'Thanks, we’ve got it.', which the average wrongly rejects.

THE INVARIANT THAT DECIDES THE PAGE: the contact card's content column is 478px at BOTH widths (648−2×85 at 1920, 610−2×66 at 768). ContactDetails.tsx L11-13 already records it. It is why the card heading budget is 25 characters and not 28.

THE VERTICAL BUDGET NOBODY HAS WRITTEN DOWN. The card is md:h-[683px] with overflow-hidden, so its constraint is a height sum, not a line count. At 768 the stack is heading 39.6 + mt-3 12 + body 3×33.6 + rows (4×56 + 3×36) 332 = 484.4 in a 520px content box. 35.6px of slack against a 39.6px heading line. That is the number that rules Pt.2 out of the card heading and puts it in the body — and it means any future two-line heading there silently clips the '(phone)' row rather than growing the card.

WHERE PT.2 LANDS, EXACTLY: src/components/ContactDetails.tsx line 65, as the opening sentence of the card body, placed verbatim and terminal — 'Got an idea that keeps coming back? Contact us.' The card sits left of the form at 1920 and above it at 768, so 'Contact us' points at the thing it names. 101 chars total, 2 lines at 1920 and 3 at 768, both drawn counts hit exactly.

TWO MEASURED FACTS ABOUT THE CHIP ROWS worth recording in STATE.md, because neither is obvious from the code:
1. The 768 interest row fits in 607 of 610 pixels. Three pixels. The two short labels in SHORT_LABELS are not a convenience — they are the reason the row exists on one line, and any edit to them wraps it.
2. The sixth budget chip the build added ('20-50K') already wraps that row at 768: 676 against a 610 column, so five chips on row one and 'Not sure' alone on row two, +63px of form height. Free at 1920 (570 of 753). Worth keeping — a 30K project has nothing to select without it — but it should be a known cost, not a surprise.

REGISTER AUDIT OF WHAT WAS ALREADY WRITTEN
- lib/contact.ts MESSAGES: eleven strings, ten clean. Every one is imperative or describes the input rather than the person, which is the house rule. The single break is 'Please give a phone number.' against 'Please give your name.' / 'Please give your email address.' — proposed as a 3-character fix, with the alternate acknowledging the indefinite article may have been deliberate.
- /contact/problem: opens on 'Your', which is right; carries one scolding clause and three contractions in a single sentence, which is not. 120 chars against a drawn range of 46-63.
- /contact/thanks: the one clear voice failure on the page. It opens with 'We’ll' — zero of nine shipped FAQ answers open with 'We', and both We-initial sentences in shipped copy are the FINAL sentence of their paragraph. It also runs 107 chars where the drawn notice bodies run 46 and 63, i.e. two extra lines at both widths.
- The dark card body, the contact form's field messages, the honeypot label, the email `title` hint and the enquiry email subject are all in voice and need no change beyond the pair noted above.
- Zero em-dashes, zero exclamation marks, zero banned words and zero straight apostrophes in any shipped user-facing string on this page or its two outcome pages. That part of the system is holding.

WHAT I DID NOT TOUCH
The 'Feel. Form. Function.' band has no copy slot — I checked both frames line by line and the band contains a photograph, a scrim, five vector groups and the three canon words. The nav CTA 'Start a project' is drawn on this frame but is site-wide, not a Contact slot. The '(active)' / '(error)' field annotations are aria-hidden and match the card's own parenthetical lowercase labels; no change. Telephone stays required, as instructed, and I have not reopened it.

No files were edited.

### `contact.h1`

`src/app/contact/page.tsx:49`

- **Current:** Let’s Talk (10 ch)
- **Proposed (10 chars):** Let’s talk
- **Alternate:** Let’s Talk — keep the frame verbatim if drawn strings outrank p212. This is a real call: it is the page's <h1> and the frame draws it capped at both widths.
- **Budget:** ≤29 chars, ONE line. 768 governs: the h1 is t-section = 42px at 768 (clamp resolves to exactly the drawn 42) in the 610 container. Inter with ls-5% measures ~0.496em/char, calibrated off the 404 frame's own heading ("404 Not found", 13 ch = 464px at 72px) → 20.8px/char → 29.3 ch/line. At 1920 the container is 1593 (card at x165, form ends x1758) at 48px → ~80 ch. The drawn boxes are 195x58 (1920) and 370x51 (768); 370 is a set box, not the string's advance.
- **Why:** Deck p212 'Signs of Reality: No Cap Text' — 'Humans naturally use lowercase, capping only the very first letter of a sentence or proper nouns'. Every other drawn heading on the site obeys it ('What we do best', 'Industries we serve', 'We want to hear from you', 'Start a project'). 'Let’s Talk' and 'Send Message' are the only two Title Case strings in the whole Contact frame. Same character count, so nothing moves.

### `contact.meta-description`

`src/app/contact/page.tsx:14`

- **Current:** Talk to Recurssive about a web or app project. Based in Thessaloniki, working globally. (87 ch)
- **Proposed (87 chars):** Talk to Recurssive about a web or app project. Based in Thessaloniki, working globally.
- **Budget:** ≤155 chars before Google truncates; sibling descriptions run 60-70 (blog/page.tsx L13 = 61, capabilities/page.tsx L13 = 61, about/page.tsx L11 = 62). 87 sits in the same band.
- **Why:** Audited, no change. It is already in the siblings' register: matter-of-fact, third person, no direct address, no contractions, no banned words. 'Based in Thessaloniki, working globally' is the correct handling of the global-market fact — it states the base without the p25 'mainly in Greece' claim the knowledge base supersedes. Lengthening it to ~150 to 'use the space' would break register with the four other pages.

### `contact.card-heading`

`src/components/ContactDetails.tsx:61`

- **Current:** We want to hear from you (24 ch)
- **Proposed (24 chars):** We want to hear from you
- **Budget:** ≤25 chars, ONE line — 768 governs and there is one character of slack. Card content column is 478px at BOTH widths (648−2×85 at 1920, 610−2×66 at 768). Inter Bold measures 0.521em/char here (drawn 24 ch = 400px at 32px). At 768 the heading is 36px → 18.76px/char → 478/18.76 = 25.5 ch/line; the drawn box is 450x44, i.e. 28px of slack in a 478 column. At 1920: 478/16.67 = 28.6 ch/line.
- **Why:** Audited, keep. Drawn copy, already in the house voice: sentence case, second person, no banned words, opens on the subject rather than a claim. Note this heading is also the reason Pt.2 cannot live here — see the card-body row.

### `contact.card-body — the home of Recurssive Language Pt.2`

`src/components/ContactDetails.tsx:65`

- **Current:** Tell us what you’re building, even if it’s still rough. We read all messages and come back within two working days. (115 ch)
- **Proposed (101 chars):** Got an idea that keeps coming back? Contact us. Rough is fine, and we answer within two working days.
- **Alternate:** Got an idea that keeps coming back? Contact us. Tell us what you’re building, even if it is still rough. (104 ch, same 2/3 line counts) — keeps the shipped second sentence and the invitation, drops the two-working-days promise from this page (it still stands on Home and on /contact/thanks).
- **Budget:** 89-124 chars. 1920: 478px column at 16px Open Sans Regular = 7.68px/char = 62.2 ch/line, drawn 2 lines (box 477x42) → 63-124. 768: 24px ls-3% = 10.8px/char = 44.2 ch/line, drawn 3 lines (box 477x92, drawn with a 115-ch string) → 89-132. Intersection 89-124. Proposed lands 2 lines at 1920 and 3 at 768 — both drawn counts exactly.
- **Why:** THIS IS WHERE PT.2 GOES, and the measurement says it goes in the body, not the heading. Pt.2's first half alone is 35 chars; the heading holds 25, so it takes 2 lines, and the card is fixed-height (md:h-[683px]) with overflow-hidden. At 768 the stack is heading 39.6 + mt-3 12 + body 3×33.6 + rows 332 = 484.4 in a 520px content box — 35.6px of slack against a 39.6px heading line. A 2-line heading clips the last contact row. In the body the canon line is placed verbatim and terminal ('Contact us.'), pointing at the form beside it, and the house voice picks up after it. Voice: does not open with 'We' (rule), the first-person commitment is last (rule), zero em-dashes, zero contractions, no colon, sentence case. 'answer' not 'come back' deliberately — 'keeps coming back … we come back' collides in one paragraph. 'two working days' is unchanged, so it still matches page.tsx L570 and contact/thanks L35.

### `contact.card-row-labels (x4)`

`src/components/ContactDetails.tsx:36`

- **Current:** (general) / (support) / (social) / (phone) — the frame draws (general) / (inquiry) / (social) / (phone), and pairs (inquiry) with john@recurssive.com
- **Proposed (9 chars):** (general) / (support) / (social) / (phone)
- **Budget:** ≤12 chars each, one line. Drawn 14px at 1920 ("(general)" = 58px for 9 ch = 6.4px/char) and 20px at 768 (82px for 9 ch). The 478 column holds ~74 ch at 1920 — width is not the constraint here, convention is.
- **Why:** Keep '(support)', because the shipped address IS support@recurssive.com (site.ts L32) and the label should name the mailbox honestly. Flagging the divergence rather than silently keeping it: the frame draws john@recurssive.com labelled '(inquiry)', which is a named personal address, not the one the build ships. IF that pairing comes back, the label must be '(enquiry)' — British/international spelling is the standing rule (Intl.DateTimeFormat('en-GB') in lib/contact.ts L105, 'licence' in about/page.tsx L24), and the code already says enquiry everywhere (renderEnquiry, 'New enquiry:'). See openQuestions.

### `contact.field-label-name`

`src/components/ContactForm.tsx:253`

- **Current:** Name (drawn "*Name", 54x22 at 16px)
- **Proposed (4 chars):** Name
- **Budget:** ≤54 chars one line (768: 610px rule at 24px Open Sans = 11.2px/char). Width is not binding on any field label; the drawn strings are 4-14 ch.
- **Why:** Audited, keep. Drawn verbatim, sentence case, no article, matches the other five. The asterisk is a separate aria-hidden run as the design draws it.

### `contact.field-label-email`

`src/components/ContactForm.tsx:266`

- **Current:** E-mail (drawn "*E-mail", 55x22 at 16px)
- **Proposed (6 chars):** E-mail
- **Budget:** ≤54 chars one line (see field-label-name).
- **Why:** Audited, keep the hyphen. It is drawn 'E-mail' on both Contact frames AND in the footer Socials column on every frame (Contact 1920 L119, 404 L46), so 'Email' here would be the odd one out. Prose stays lowercase 'email address' (MESSAGES.email, lib/contact.ts L48-49) — that is correct, not a drift: a label is a name, prose is prose.

### `contact.field-label-tel`

`src/components/ContactForm.tsx:276`

- **Current:** Telephone (drawn "*Telephone", 88x22 at 16px)
- **Proposed (9 chars):** Telephone
- **Budget:** ≤54 chars one line (see field-label-name).
- **Why:** Audited, keep. Drawn verbatim. Required status is settled (lib/contact.ts L75-78) and not reopened here.

### `contact.field-label-description`

`src/components/ContactForm.tsx:285`

- **Current:** Description (drawn "*Description", 95x22 at 16px)
- **Proposed (11 chars):** Description
- **Budget:** ≤54 chars one line (see field-label-name).
- **Why:** Audited, keep. Drawn verbatim, and the missing-message already supplies the object the bare noun lacks: 'Please tell us a little about the project.' (lib/contact.ts L56). Renaming it 'Project description' would duplicate the word 'Project' that the budget legend below already owns.

### `contact.legend-interest`

`src/components/ContactForm.tsx:302`

- **Current:** Interested in (drawn "*Interested in", 104x22 at 16px)
- **Proposed (13 chars):** Interested in
- **Budget:** ≤54 chars one line (see field-label-name).
- **Why:** Audited, keep. Drawn verbatim; second person, sentence case, and it is what makes the chip row read as a sentence completion rather than a taxonomy.

### `contact.legend-budget`

`src/components/ContactForm.tsx:308`

- **Current:** Project budget (drawn "*Project budget", 118x22 at 16px)
- **Proposed (14 chars):** Project budget
- **Alternate:** Project budget (EUR) — 20 ch, still one line at both widths. Use this only once the invoicing currency is confirmed; it is the cheapest place to state it, because the alternative (a symbol on all six chips) costs ~9px per chip and the 768 chip row has already wrapped.
- **Budget:** ≤54 chars one line at 768 (610px rule at 24px). '(EUR)' adds 6 chars / ~67px — nowhere near the rule's width, so the legend is the free place to state a currency.
- **Why:** Audited, keep as drawn. The chips carry no currency symbol anywhere on the page while the Cases frame writes '10K$' — a real ambiguity on a global-market site, but the currency is a fact I do not have, so it does not go into the copy. See openQuestions.

### `contact.interest-options (x5)`

`src/lib/contact.ts:15`

- **Current:** Web Development / Mobile App / UI/UX Design / Startup / Other — frame draws "Website developement" (misspelt) for the first
- **Proposed (15 chars):** Web Development / Mobile App / UI/UX Design / Startup / Other
- **Budget:** Row fit, not char count. 768 is the binding frame: drawn chip boxes 122+147+90+106+90 = 555 plus 4×13 gaps = 607 against a 610 column — THREE pixels of slack, so the interest row is at capacity and any sixth option or longer short label wraps it (+63px: one 50px row plus a 13px gap). 1920: the build's 'Web Development' (15 ch ≈ 129px of ink) makes a ~160px chip against the drawn 202, so the row totals ~623 of 753 — comfortable.
- **Why:** Audited, keep the build's set. The build has already made the one correction the frame needs: 'Website developement' is misspelt in the 1920 export. Values double as the server-side allow-list (lib/contact.ts L82), so any change here is a schema change, not a copy change. 'Startup' is the one non-parallel member — it names a client type in a list of services — but it is drawn, it is the enquirer's own word for themselves, and replacing it would invent a taxonomy the deck does not hold. Raised in openQuestions instead.

### `contact.interest-short-labels (768 only)`

`src/components/ContactForm.tsx:30`

- **Current:** 'Web Development' → 'Web Dev', 'UI/UX Design' → 'UI/UX'
- **Proposed (7 chars):** 'Web Development' → 'Web Dev', 'UI/UX Design' → 'UI/UX'
- **Budget:** Fixed by the 768 frame, which draws exactly these two strings ("Web Dev" 92px of ink in a 122x50 chip, "UI/UX" 60px in 90x50). Any longer string breaks the 607-of-610 row.
- **Why:** Audited, keep. These are the frame's own narrow-width labels, not an invention, and the submitted value is unchanged so the allow-list is untouched. This is the slot with the least headroom on the page: three pixels.

### `contact.budget-options (x6)`

`src/lib/contact.ts:23`

- **Current:** <10K / 10-20K / 20-50K / 50-100K / >100K / Not sure — frame draws five, without 20-50K
- **Proposed (6 chars):** <10K / 10-20K / 20-50K / 50-100K / >100K / Not sure
- **Budget:** Row fit. 1920: drawn five = 68+82+91+77+95 = 413 plus 4×15 = 473; the sixth chip (~82px, same shape as '10-20K') takes it to 570 of 753 — still one row. 768: drawn five = 510 plus 4×13 = 562 of 610; the sixth takes it to 676, so it WRAPS. Row 1 holds five chips (544), row 2 holds 'Not sure' (119). Measured cost: +63px of form height at 768 only.
- **Why:** Audited, keep the six. The gap the build closed is real — the drawn ladder jumps 20K to 50K, so a 30K project has nothing to select (ContactForm.tsx L21-22 records this). Reporting the cost rather than leaving it implicit: the sixth chip is free at 1920 and buys a second row at 768. Labels themselves stay as drawn — terse, no currency, 'Not sure' last.

### `contact.consent-checkbox`

`src/components/ContactForm.tsx:330`

- **Current:** I’ve read and accepted the terms and conditions (47 ch), linking only /terms-of-service
- **Proposed (49 chars):** I’ve read the privacy policy and accept the terms
- **Alternate:** I’ve read and accepted the terms and conditions (47 ch, the frame verbatim) — keep only if the owner's legal position is that the privacy notice does not belong on the consent line. Then MESSAGES.terms.missing stays as it is too.
- **Budget:** ≤54 chars, ONE line. 768 governs: 22px Open Sans measures 0.477em/char (drawn 47 ch = 493px at 22px, and 314px at 14px — the same 0.477 both times, the cleanest calibration on the page) → 10.49px/char; available width is 610 − 28 box − 8 gap = 574 → 54.7 ch. Proposed 49 ch = 514px + 36 = 550 of 610. At 1920: 14px, 734px available → 109 ch, not binding.
- **Why:** Two located problems with the drawn line, both fixed inside the budget. (1) It says 'terms and conditions' but links a page titled Terms of Service — the label and the destination do not match. (2) A form collecting name, email, phone and free text links no privacy notice at all, while /privacy-policy exists and is in `routes` (site.ts L79). Splitting the verbs is also more accurate than one blanket 'accepted': you READ a privacy notice, you ACCEPT terms. Kept deliberately plain and non-clever, as instructed. Two links: 'privacy policy' → /privacy-policy, 'terms' → /terms-of-service. Typographic apostrophe as everywhere else, and it must be the literal character, not an entity, if it ever moves into a prop (problem/page.tsx L31 records why).

### `contact.msg-terms-missing`

`src/lib/contact.ts:61`

- **Current:** Please accept the terms and conditions. (39 ch)
- **Proposed (36 chars):** Please accept the terms to continue.
- **Alternate:** Please accept the terms. (24 ch) — shorter, and correct if you would rather not imply the form is otherwise complete.
- **Budget:** Inline error, text-base (16px) under the checkbox, full column width — 753px at 1920 / 610 at 768 = 47+ chars per line at the narrow end. One line at both. No geometric pressure; the constraint is that it must name the same thing the checkbox names.
- **Why:** Moves only if the consent line moves — these two strings are a pair, and MESSAGES is the single source the schema rejects with (lib/contact.ts L36-41, STATE.md 'Field messages are CSS-only'). Keeps the house rule that error copy says what to DO, not what went wrong: imperative, no blame, no 'You did not…'.

### `contact.msg-tel-missing`

`src/lib/contact.ts:52`

- **Current:** Please give a phone number. (27 ch)
- **Proposed (30 chars):** Please give your phone number.
- **Alternate:** Please give a phone number. — keep if the indefinite article was deliberate (any reachable number, not necessarily the enquirer's own). That is a defensible reading and only the owner knows which was meant.
- **Budget:** Inline error, 16px, full column. One line at both widths. No geometric constraint.
- **Why:** Parallelism, and it is the only one of the three that breaks it: 'Please give your name.' / 'Please give your email address.' / 'Please give a phone number.' The determiner change costs 3 characters and nothing else.

### `contact.submit-button`

`src/components/ContactForm.tsx:344`

- **Current:** Send Message (12 ch)
- **Proposed (12 chars):** Send message
- **Alternate:** Send Message — keep the frame verbatim. If 'Let’s Talk' stays capped, this should stay capped too; the one thing that would read as an accident is fixing one and not the other.
- **Budget:** 12 chars to keep the drawn button width. The 768 button is 202x53 = 16 + 170 + 16, and the label is exactly that 170px (12 ch of Inter Medium at 24px = 14.17px/char) — SubmitButton.tsx L62-63 and Button.tsx L45-48 both record that the padding accounts for the full width, which is also how we know the drawn accent button has no arrow. Each extra character costs ~14px at 768 and ~9.4px at 1920. 'M' → 'm' changes the advance by under a pixel.
- **Why:** Same p212 argument as the h1, and this is the weaker of the two cases to defend: 'Start a project' — the site's other drawn button — is sentence case, on this very frame. Free change: identical character count, identical width.

### `contact.submit-sending-label`

`src/components/SubmitButton.tsx:25`

- **Current:** Sending… (8 ch)
- **Proposed (8 chars):** Sending…
- **Budget:** ≤12 chars to stay inside the drawn 202px button; 8 ch is ~113px at 24px, so the button narrows slightly while sending. Not visible against a 202px box with a 44px minimum touch target.
- **Why:** Audited, keep. Single typographic ellipsis (U+2026), not three periods — consistent with the apostrophes rule. Present participle rather than 'Please wait', which would be the only imperative aimed at the reader that is not asking them for something.

### `contact.enquiry-email-consent-row`

`src/lib/contact.ts:130`

- **Current:** ['Consent', `Accepted ${stamp(at)}`]
- **Proposed (5 chars):** ['Terms', `Accepted ${stamp(at)}`]
- **Budget:** ≤8 chars to leave the column alignment untouched: `pad` is max key length + 3 (L132) and the longest key is 'Interest' at 8, so anything up to 8 keeps pad at 11 and the table looks identical. 'Terms' is 5.
- **Why:** The record should name what the box actually obtained. With the proposed wording the enquirer accepts terms and acknowledges a privacy notice — they do not give consent in the Art. 4(11) sense, and the schema comment at L86-88 is already careful about exactly this distinction. Labelling the row 'Consent' claims a legal basis the checkbox does not establish. Only ships if the consent line ships.

### `contact.feel-form-function-band`

`src/components/FeelFormFunction.tsx:37`

- **Current:** ['Feel.', 'Form.', 'Function.']
- **Proposed (9 chars):** ['Feel.', 'Form.', 'Function.']
- **Budget:** Fixed by geometry, not by a character budget. The three words are pinned to shapes 2 and 4 of the binary artwork (15.92% and 83.98% across it) with measured side-bearing insets, and sized at 5.95cqi so the ink lands on the artwork edges at every width. Drawn advances are 120 / 146 / 221px at 57.3px. Any fourth word, or a longer word, breaks the pinning maths in FeelFormFunction.tsx L106-124.
- **Why:** AUDITED — there is no copy slot in this band. I checked both frames line by line: Contact 1920 L74-93 and 768 L126-145 contain the photograph, the scrim, five vector groups and these three words. Nothing else. The tagline is canon (deck p44-50), it is already placed, and the one editorial decision — the full stop on 'Function.', which the file draws without at both widths — is already recorded as the owner's correction (L34-36). No proposal. If a gloss is ever wanted, Feel = Emotion & Experience / Form = Visuals & Composition / Function = Utility & Performance is the deck's own, but there is no drawn box for it and adding one would push the words off the artwork.

### `thanks.heading`

`src/app/contact/thanks/page.tsx:34`

- **Current:** Thanks, we’ve got it. (21 ch)
- **Proposed (21 chars):** Thanks, we’ve got it.
- **Budget:** ~20 chars by the crude average, but this string clears it — measured per-glyph rather than by the average, because the average is inflated by digits. At 52px (768) with ls-5% it comes to ~471px against a 534px artwork cap; at 72px (1920) ~652 against 764. One line at both. The drawn comparators are '404 Not found' (13 ch = 464px) and 'Something went wrong' (20 ch = 533px against a 534 cap — that one fits by a single pixel).
- **Why:** Audited, keep. Contraction in direct address is exactly right per the shipped split (explanatory body copy takes none; 'Tell us what you’re building', 'That didn’t send' do). Sentence case, no exclamation mark, typographic apostrophe. It is the strongest of the four notice headings.

### `thanks.description`

`src/app/contact/thanks/page.tsx:35`

- **Current:** We’ll come back to you within two working days. If it’s urgent, support@recurssive.com reaches us directly. (107 ch)
- **Proposed (35 chars):** Two working days is the usual wait.
- **Alternate:** Two working days is the usual wait. If it’s urgent, email support@recurssive.com. (81 ch) — keeps an escape hatch on the success page, at the cost of 2 lines at 1920 and 4 at 768. Defensible: /contact/problem keeps its address for a documented reason, and consistency between the two outcome pages has value. My call is that a success page does not need an escape hatch, and the short version is the one that matches the frames.
- **Budget:** 28-46 chars for the drawn rhythm. 1920: max-w is 59% of the 764 artwork = 451px at 20px Open Sans = 47 ch/line, and 47 chars measures 451px — so 46 is the honest ceiling for one line. 768: 59% of 534 = 315px at 24px = 27.3 ch/line, so 28+ takes the second line the design draws. The drawn 404 body is 46 ch (1 line / 2 lines) and the drawn 500 body is 63 ch (2 / 3). The current 107 ch renders 3 lines at 1920 and 4 at 768 — two over the drawn state at both widths.
- **Why:** Two problems, one fix. It opens with 'We’ll', and no shipped body paragraph opens with 'We' (nine of nine open on the subject of the question) — first person is earned at the close, never claimed at the open. And it runs 107 chars where the drawn notice bodies run 46 and 63. Opening on 'Two working days' puts the only fact the reader wants first, keeps the number identical to page.tsx L570 and the contact card, and lands the drawn 1-line / 2-line shape exactly.

### `problem.heading`

`src/app/contact/problem/page.tsx:36`

- **Current:** That didn’t send. (17 ch)
- **Proposed (17 chars):** That didn’t send.
- **Budget:** ≤20 chars, one line; measures ~383px at 52px against the 534px cap, ~530px at 72px against 764. Comfortable at both.
- **Why:** Audited, keep. Says what happened in three words, no blame, no 'Error', no exclamation mark. Contraction is correct for direct address, and it rhymes structurally with 'Thanks, we’ve got it.' — the two outcome pages read as a pair.

### `problem.description`

`src/app/contact/problem/page.tsx:39`

- **Current:** Your message didn’t reach us, so please don’t assume we’ve seen it. Email support@recurssive.com directly, or try again. (120 ch)
- **Proposed (82 chars):** Your message didn’t reach us. Email support@recurssive.com directly, or try again.
- **Alternate:** Your message didn’t reach us. Email us directly, or try again. (62 ch — inside the drawn range, 2 lines at 1920 and 3 at 768) with the action link changed from 'Back to the form' to the mailto. This is the only way to hit the drawn budget, and it costs the documented reason the address is inline (problem/page.tsx L26-29: the address must not depend on the form working). Genuinely open.
- **Budget:** 28-63 chars is the drawn range (404 = 46, 500 = 63; 47 ch/line at 1920, 27.3 at 768). 82 ch is over it — 2 lines at 1920 (the 500's own count) and 4 at 768. It cannot be brought inside the range while keeping the address: support@recurssive.com is 22 characters on its own, and 'Your message didn’t reach us.' is 29, so the floor with an inline address is ~75. Reporting rather than overshooting silently.
- **Why:** Opens on the subject ('Your') — correct already. The cut is 'so please don’t assume we’ve seen it', which is 38 characters spent telling the reader not to make an inference the first clause has already blocked, and the only faintly scolding sentence in the whole app. Three contractions in one sentence also tips direct address into chattiness. What remains is the two things the page exists to do: say it did not arrive, hand over an address that does not depend on this form.

### `problem.action-label`

`src/app/contact/problem/page.tsx:47`

- **Current:** Back to the form (16 ch)
- **Proposed (16 chars):** Back to the form
- **Budget:** ≤ ~30 chars, one line, centred. The drawn label is 'Go back to home' (15 ch = 143px at 18px, 404 frame L19-20); this one is 16 ch ≈ 152px against a 764px block. No pressure.
- **Why:** Audited, keep. Sentence case, matches the drawn label's shape, and the destination is right for the state: whoever lands here was mid-task and their words are gone, so the form is the useful next step, not the homepage.

### `notice.action-label-default (inherited by /contact/thanks)`

`src/components/NoticePage.tsx:53`

- **Current:** Go back to home (15 ch)
- **Proposed (15 chars):** Go back to home
- **Budget:** Drawn exactly: 'Go back to home', Open Sans Regular 18px, 143x25, centred (404__1920w.txt L19-20). One line.
- **Why:** Audited, keep. It is the frame's own string, and /contact/thanks inherits it by default rather than overriding — which is right, since a completed enquiry has nowhere better to go. Slightly redundant English ('go back to home' vs 'back to home'), but it is drawn, and changing it would touch all four notice routes.

### Open questions - /contact

- CURRENCY. The budget ladder reads <10K / 10-20K / 20-50K / 50-100K / >100K with no currency anywhere on the page, while the Cases frame writes '10K$'. On a global-market site a US enquirer will read dollars and a German one euros. Which currency do you invoice in, and do you want it stated once in the legend ('Project budget (EUR)', 20 ch, still one line at both widths) or left unstated? A symbol on all six chips costs ~9px each and the 768 chip row has already wrapped, so the legend is the cheap place.
- AN AI INTEREST OPTION. AI Engineering is one of the four pillars (deck p29) and the studio's own descriptor is on-device AI, but the drawn chip set has no AI option — those enquiries currently land in 'Other'. Measured cost of a sixth chip: at 768 the interest row is at 607 of 610, so it wraps (+63px); at 1920 it takes the row to roughly 748 of 753. If you want it, my label would be 'AI Features' (short label 'AI'), not 'AI Engineering' — the chips name what the enquirer wants, not what the pillar is called. It is also a schema change: INTERESTS is the server-side allow-list.
- 'STARTUP' IN A LIST OF SERVICES. Web Development / Mobile App / UI/UX Design are services; Startup is a client type. It is drawn that way and I have kept it, because replacing it would invent a taxonomy the deck does not hold and because it is genuinely the word a founder reaches for. Confirm it stays.
- THE CONSENT LINE NEEDS YOUR LEGAL CALL. I have proposed 'I’ve read the privacy policy and accept the terms' (49 ch, one line at both widths) because the drawn line says 'terms and conditions' while linking a page titled Terms of Service, and because a form collecting name, email, phone and free text links no privacy notice at all. This changes what the enquirer is agreeing to, and with it the enquiry email's 'Consent' row label. It is GDPR-adjacent and I am not your lawyer — sign it off or reject it as a pair.
- SENTENCE CASE ON THE TWO DRAWN TITLE-CASE STRINGS. 'Let’s Talk' (h1) and 'Send Message' (button) are the only Title Case strings on the Contact frame, and deck p212 is explicit that only the first letter of a sentence or a proper noun is capped. Both changes are free (identical character counts, identical widths). Decide both together — fixing one and not the other is the reading that looks accidental.
- THE SECOND CONTACT ROW. The frame draws john@recurssive.com labelled '(inquiry)'; the build ships support@recurssive.com labelled '(support)'. Which is the real second address? If the personal one comes back, the label must be '(enquiry)' — the code already says enquiry everywhere (renderEnquiry, 'New enquiry:') and en-GB is the standing spelling rule.
- 'TWO WORKING DAYS' IS NOW A PUBLIC PROMISE IN THREE PLACES: the Home contact lead (page.tsx L570), the /contact card, and /contact/thanks. Confirm you will keep it, or change all three together. It is the only number in shipped user-facing copy and page.tsx L54-58 already records why numbers here become promises.
- NOTHING ON THIS PAGE IS BLOCKED ON A FACT THAT DOES NOT EXIST. No client names, numbers, team size or founding year are structurally demanded by any Contact slot — unlike /cases. The only unavailable facts are the two above (currency, second address), and neither has been guessed into the copy.

---

## Privacy Policy (/privacy-policy) and Terms of Service (/terms-of-service)

TWO CORRECTIONS TO THE MEASURED SLOT INVENTORY, both located.

1. The inventory says of legal.page-intro: \"The 1920 legal frames draw NO intro at all (title @165,193 then straight to the rule)\" and calls the slot 768-only. That is wrong on both frames. Privacy Policy__1920w.txt:87-88 draws the 123-character lorem in Open Sans Regular 16px, #6B6B6B, box 467x48, sitting between the title (line 85-86) and the rule (line 89). Terms of Service__1920w.txt:82-83 is identical. The slot is drawn at BOTH breakpoints, in the same 467/16 geometry the Cases, Blog and Capabilities PageHeader intros use — which makes it a normal missing intro rather than a mobile-only oddity, and makes the case for building it stronger, not weaker.

2. The inventory's 606px @24px ls-3% = 58.9 ch/line is about 5% too generous, and its 62-112 budget would overflow the drawn box. I recalibrated against the 22 real strings the four legal frames draw, where box width, font size and line count are all known: 861px/18px yields 99.0-105.8 ch/line and 610px/24px ls-3% yields 55.3-56.6 ch/line. Independent check: those bounds predict a 2-line ceiling of 109 characters for the 606x63 intro box, and the string the designer actually drew there is 109 characters. Anything from 110 up takes a third line at 768. I used 65-109 for both subtitles.

BUILD WORK THE COPY DEPENDS ON. LegalPage takes title, sections and updated only (LegalPage.tsx:46-59) and renders h1 -> \"Last updated\" -> hr (lines 69-85). Neither subtitle can land until an intro prop exists. Drawn order is title, subtitle, rule, so the paragraph belongs between the h1 and the existing \"Last updated\" line. The site's own convention puts page-level intro strings inline in the route file, not in src/content — /cases, /blog and /capabilities all do — which is why both proposals are filed against the page.tsx lines rather than legal.ts. Styling should be .t-body plus text-ink-muted to match PageHeader.tsx:41; the drawn 768 size is 24 against the token's 22, which is the same deliberate two-pixel gap PageHeader.tsx:20-24 already documents and accepts. At 22px the proposed strings still land on 2 lines (59.9 ch/line at 606px), so the token does not break the budget.

WHAT IS AND IS NOT LOREM ON THESE FRAMES. Each of the four frames contains exactly two lorem strings: the page subtitle and the BuildVision band body. Everything else is real, amended copy in src/content/legal.ts, whose header comment (lines 3-56) documents what was dropped and rewritten and why. I proposed nothing there. The section bodies are legal assertions, not voice slots, and rewriting them for register would be exactly the wrong intervention on a document that is already accurate and awaiting a lawyer.

ONE IDEA THAT WOULD NOT FIT. I tried to get \"cookieless analytics\" into the Privacy subtitle alongside the contact form and the retention point. Every version ran 118-134 characters, i.e. into a third line at 768. The three-item fragment plus the cookie sentence is what fits at 98, and analytics is one scroll down at legal.ts:78-82. Reporting it rather than shipping an overflow.

REGISTER CHECK ON ALL THREE PROPOSALS: zero em-dashes, zero exclamation marks, zero straight apostrophes (BuildVision uses U+2019 via &rsquo; in a text node, which is safe — the entity-in-a-prop failure documented at contact/problem/page.tsx:31 does not apply), zero contractions in the two explanatory subtitles, contractions retained in the second-person BuildVision line, sentence case throughout, no banned lexicon, no invented fact, no number, and no paragraph opening with \"We\".

### `legal.page-intro.privacy`

`src/app/privacy-policy/page.tsx:20`

- **Current:** Not built. The frames draw "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." (123 ch) at 1920 (Privacy Policy__1920w.txt:87-...
- **Proposed (98 chars):** What the contact form collects, where it goes, and how long it is kept. This site sets no cookies.
- **Alternate:** What personal data this site collects, where it goes, and what you can ask us to do with it. (92 ch, also 2/2 lines.) This is the durable version: it makes no cookie claim, so it survives the Meta pixel deploy that legal.ts:28-51 documents as roughly a month out, and it maps onto Contact Forms / Who we share your data with / What rights you have. The cost is that it is a near-paraphrase of the page's own meta description at privacy-policy/page.tsx:8-10 ("How Recurssive collects, uses and retains personal data, and what rights you have over it"), so the visible line adds nothing the tab title does not.
- **Budget:** 65-109 chars, exactly 2 lines at both breakpoints. Calibrated on the 22 drawn body strings across all four legal frames rather than on the generic formula: at 861px/18px the observed capacity is 99.0-105.8 ch/line (per-char 0.452-0.483em); at 610px/24px ls-3% it is 55.3-56.6 ch/line. Scaling to the intro boxes gives 467px/16px = 60.4-64.6 ch/line -> 2 lines needs 66-120 ch, and 606px/24px ls-3% = 54.9-56.2 ch/line -> 2 lines needs 58-109 ch. Intersection 66-109; the designer's own 768 string is 109, i.e. exactly at my computed ceiling, which corroborates the calibration. NOTE: the slot inventory's 58.9 ch/line for 606px/24px is ~5% optimistic and its stated budget of 62-112 would overflow to 3 lines at 768 above 109 characters.
- **Why:** Definition-by-activity, not by category: the fragment names three of the document's own sections in the reader's order (Contact Forms L66, Who we share your data with L96, Data Retention L90), then the second sentence lands the one fact a privacy page can give that is checkable in one second, straight from legal.ts:74. Opens on "What", not "We" (zero of nine shipped FAQ answers open with We). No contractions, no em-dash, no colon, no exclamation, no number, sentence case. Second person 0 / first person 0 in the first sentence and the commitment sits last, which is the shipped pattern. Deliberately distinct from the meta description so the two are not duplicates.

### `legal.page-intro.terms`

`src/app/terms-of-service/page.tsx:20`

- **Current:** Not built. The frames draw the same lorem: 1920 at Terms of Service__1920w.txt:82-83 (Open Sans Regular 16px, #6B6B6B, box 467x48, 123 ch) and 768 at Terms of Service__768w.txt:126-127 (24px ls-3%, #6...
- **Proposed (104 chars):** What you agree to by using this site. A signed project agreement governs the work itself, not this page.
- **Alternate:** What you agree to by using this site, and what a signed project agreement changes about it. (91 ch, 2/2 lines.) One sentence instead of two; softer, and it poses the precedence point as a question the reader has to open the page to answer rather than answering it in the subtitle. Choose this if the owner would rather the subtitle not appear to state a rule of its own.
- **Budget:** 65-109 chars, exactly 2 lines at both breakpoints. Identical geometry to the Privacy intro (467x48 at 1920, 606x63 at 768) — the two legal frames are the same composition with different words, as LegalPage.tsx:6-16 already records.
- **Why:** The subtitle summarises two clauses that already exist rather than inventing a third: legal.ts:147 (ownership governed by the project agreement, "not by this general Terms page") and legal.ts:164 (on conflict, the project agreement governs). That is the one thing a prospective client actually needs from this page, and it is the most reassuring true thing on it. Zero first person, one second person, no contractions, no em-dash, no colon, sentence case, X-rather-than-Y judgement carried by "not this page". Also chosen to avoid echoing the meta description at terms-of-service/page.tsx:8-9 ("The terms under which Recurssive provides this website and its services"), which the rejected candidate "The rules for using this site..." would have restated.

### `buildvision.body (shared — appears on both my frames)`

`src/components/BuildVision.tsx:62`

- **Current:** "Tell us what you’re building, even if it’s still rough. We read every message ourselves." (88 ch)
- **Proposed (120 chars):** Tell us what you’re building, even if it’s still rough. It does not need to be a brief. We read every message ourselves.
- **Alternate:** Leave it at 88 ch. This string is shared by /about, /cases, /capabilities and both legal pages, it is already house-voice reference copy, and the only defect is a ~30px short band at one breakpoint. If another page's sweep proposes a different fix, one version has to win across all five — do not let two sweeps land different strings here.
- **Budget:** 90-123 chars. Both legal frames draw this band. At 1920 the box is 477x72 with a 123-ch string on 2 lines (Privacy Policy__1920w.txt:8-9, Terms of Service__1920w.txt:8-9) — 123 is therefore a measured ceiling, not a model output. At 768 the drawn box is 489x84 with a 115-ch string on 3 lines (Privacy Policy__768w.txt:124-125); the build caps at max-w-[477px] with no lg variant (BuildVision.tsx:61), so 477px governs both, giving 43.2-44.3 ch/line at 24px ls-3% -> 3 lines needs 90-129 ch. Combined window 90-123. The shipped 88 ch is one to two characters below the 3-line threshold, which is why the band lands ~30px short of its drawn height at 768 and only there.
- **Why:** Adds a middle sentence rather than extending either existing one, so the shipped opening and the shipped commitment close both survive verbatim. Deliberately adds no number: "and answer within two working days" would also have fitted at 123 ch but would create a third place holding the same public promise (page.tsx:570, contact/thanks:35), and the voice system's rule is change both or neither. Three sentences is within the shipped 2-3 distribution; "It does not need to be a brief" is the refuse-the-flattering-reading pattern and is falsifiable in one sentence.

### Open questions - Privacy Policy (/privacy-policy) and Terms of Service (/terms-of-service)

- CLAUSE TEXT IS OUT OF SCOPE — everything below needs a qualified lawyer, not a copywriter. This is the handover checklist, ordered so it can be sent as-is. Jurisdiction assumption to confirm first: the studio operates from Thessaloniki (Footer "Where" column) so GDPR plus Greek implementing law and the Hellenic DPA are the working assumption, while the market is global — a lawyer should confirm whether UK GDPR, CCPA/CPRA or others are also in scope before anything is drafted.
- PRIVACY — controller identity and registered address. legal.ts:117-121 gives an email and nothing else. Needed: the legal entity behind the name Recurssive (sole trader or company), its registered address, company/VAT number, and whether a DPO or Art. 27 representative is required. I cannot supply any of these; they are facts, not copy.
- PRIVACY — legal basis per purpose (Art. 6). Nothing in legal.ts states one. At minimum: the contact form (pre-contractual steps at Art. 6(1)(b), or legitimate interest at 6(1)(f)) and cookieless analytics (legitimate interest). If legitimate interest is used anywhere, the balancing test has to exist somewhere the owner can produce it.
- PRIVACY — retention stated as an actual period. legal.ts:92 says "as long as we need them ... and for as long as the law requires", which is not a period. Related defect the lawyer should resolve at the same time: the document carries TWO retention sections saying the same thing, "Data Retention" (legal.ts:90-93) and "How long we retain your data" (legal.ts:105-108). Both are inherited from the frame. They should be merged or given distinct jobs.
- PRIVACY — international transfer disclosure (Art. 44-49). The shipped policy names two US processors, Vercel and Resend (legal.ts:100-101), not the three the knowledge base records — Facebook, Google Analytics and Mailchimp were dropped when the file was amended. Needed: the transfer mechanism actually in place for each (SCCs, EU-US Data Privacy Framework certification), stated by name.
- PRIVACY — Art. 28 processor agreements. Confirm a DPA is signed and in force with Vercel and with Resend, and reference it. The policy currently asserts sharing without asserting the contractual basis for it.
- PRIVACY — supervisory-authority complaint right (Art. 77), naming the Hellenic Data Protection Authority and how to reach it. Absent entirely.
- PRIVACY — rights currently under-stated. legal.ts:113 covers access, rectification and erasure only. Missing: restriction (Art. 18), portability (Art. 20), objection (Art. 21), and the response deadline. Also missing: a statement on automated decision-making and profiling (Art. 22), which is presumably "none" but has to say so.
- PRIVACY — consent withdrawal path. The contact form carries a consent tick that links here (privacy-policy/page.tsx:15). A lawyer needs to say what that tick legally is: if it is Art. 6 consent, a withdrawal route is mandatory and does not exist; if it is acknowledgement of the terms rather than consent to processing, the label and this document should both stop implying consent.
- PRIVACY — children's data. No age statement anywhere in legal.ts. Needed: a minimum age for submitting the form and what happens if data about a child is received.
- PRIVACY — effective date vs last updated. The build shows "Last updated 5 August 2026" (LegalPage.tsx:77-80, updated="2026-08-05" on both routes), which is an addition the frames do not draw. Confirm whether an effective date is separately required and whether prior versions must be retained.
- TERMS — Limitation of Liability. Absent entirely from termsSections. This is the single largest gap; a services business with no cap on liability is exposed on every engagement, including ones that never sign a project agreement.
- TERMS — Indemnification. Absent entirely.
- TERMS — consumer-law carve-out. Two clauses may not bind an EU consumer as written: the as-is / as-available disclaimer (legal.ts:176) against mandatory consumer warranties, and the exclusive-Greek-jurisdiction clause (legal.ts:188), since a consumer can generally sue and be sued where they live. A lawyer should add the standard "nothing in these terms affects your statutory rights" carve-out and decide whether the jurisdiction clause survives.
- TERMS — governing law names a country but no court. legal.ts:188 says "courts located in Greece"; a specific forum (e.g. the courts of Thessaloniki) is the normal drafting.
- TERMS — standard clauses absent: severability, entire agreement, assignment, force majeure, waiver, and a survival clause. The precedence clause does exist (legal.ts:164) and should be checked rather than added.
- BOTH — the Meta pixel deploy already scoped in legal.ts:28-51 will invalidate copy in more than one place. If the primary Privacy subtitle is chosen, the sentence "This site sets no cookies" becomes a THIRD thing that must change on that deploy, alongside the Cookies section (legal.ts:72-76) and the consent gate. The owner should decide now whether to accept that or take the alternate subtitle, which is pixel-proof.
- BUILD, not copy — /cookies is a 404. Footer.tsx:160 links "Cookies" from lg upward on every page including both legal pages, and its own comment at Footer.tsx:135 says "it is a real page, so it stays". There is no src/app/cookies route in the tree. On a page whose subtitle may read "This site sets no cookies", a dead cookie-policy link is the worst possible neighbour. Either delete the link or point it at an anchor on the Cookies section of the privacy policy.

---

## Error and empty states (404 / 500 / no content)

DRIFT REPORT — the three canon lines against what the app ships.\n\n1. 404 (deck p228, Pt.6). Deck: \"We looked again and again but found nothing.\" Shipped (src/app/not-found.tsx L35): \"We looked again and again but found nothing...\" — three ASCII full stops, byte-checked (0x2e x3), not a U+2026 ellipsis. The app followed the Figma frames, which draw the ellipsis at both widths. DRIFT, editorial only: at 44 vs 46 characters the line counts are identical (1 line at 1920, 2 at 768) under either cap, so the fix is free.\n\n2. 500 (deck p229, Pt.7). Deck: \"Try to refresh the page. If it doesn't work, circle back later.\" Shipped (src/app/error.tsx L49): identical, character for character, including U+2019 in \"doesn't\". NO DRIFT in the string. It does not render as drawn, but that is the cap, not the copy — see note 5.\n\n3. No content (deck p230, Pt.8). Deck: \"Basically you found an empty page about an empty page.\" Shipped: NOT SHIPPED AT ALL. No file in src/ contains this string; the state is drawn at both widths and has no caller. The Figma frames write it with an exclamation mark, which the deck does not.\n\nSummary: one punctuation drift, one clean match, one unbuilt state. The two punctuation divergences (\"...\" and \"!\") both come from Figma and both go the same direction — the frames are looser than the deck, and deck p40's Serious / Matter-of-fact sliders plus zero exclamation marks in any shipped string say the deck is right.\n\n4. HOW I MEASURED. I parsed the project's own TTFs (head/hhea/hmtx/cmap, summing real glyph advances) from \"Recurssive Folder/Recurssive Folder/Fonts/\", rather than using a chars-per-line constant. Open Sans Regular reproduces every drawn body and link box to under 1.1px — 440.4 vs a drawn 441, 537.9 vs 539, 532.0 vs 533, 142.9 vs 143, 109.9 vs 110, 190.6 vs 191, 146.6 vs 147. Seven boxes, all within a pixel, so every body and link figure above is measured, not estimated.\n\nInter is the caveat. No local instance reproduces the drawn headings exactly: Inter_18pt-SemiBold at ls-5% under-predicts the three drawn boxes by 1.9%, 2.3% and 4.1%, and 24pt/28pt/variable-default are all worse. The error scales with the amount of lowercase, so the frames were set in a wider Inter than any file here (the build in turn loads next/font Inter v4 with font-optical-sizing:auto, which at 52–72px picks a HIGH optical size and renders narrower still). I therefore applied a +5% safety correction fitted to the drawn set and reported headings in em, which is breakpoint-independent. Treat heading numbers as +/-5%, body and link numbers as exact.\n\n5. THE REAL HEADING CAP IS 10.27 em, NOT \"~20 chars\". The slot inventory's error.heading entry derives its budget from \"Something went wrong\" measuring 533px against a 534px cap. My measurement puts that string at 523px uncorrected and 549px corrected — so the \"fits by ONE pixel\" claim is inside the noise and cannot carry a budget. The stable derivation is geometric: the block width is the ARTWORK constant (NoticePage.tsx L48), 534px at 768 against a 52px font and 764px at 1920 against 72px, giving 10.269 em and 10.611 em. 768 governs. Against that ceiling the drawn headings sit at 6.32 em (404 Not found), 7.12 em (500 Server error) and 8.75 em (No content available) — 62%, 69% and 85% of cap. \"Something went wrong\" is 10.05 em, i.e. 98%, the only heading in the system with under 3% margin and the longest string the site would carry. That is the measured case against keeping it, independent of voice.\n\n6. THE 59% BODY CAP IS CALIBRATED ON ONE FRAME. NoticePage.tsx L91-99 reasons carefully from 441/764 = 57.7% and 303/534 = 56.7%, and both numbers come from the 404 frame. The other two frames draw 539/764 = 70.5% and 533/764 = 69.8%. I greedy-wrapped all three canon lines at 59/65/68/70/71/72%: 59% matches 2 of 6 drawn boxes, 70% matches 5, and 71% is the first value that matches all six. The comment's own logic is sound and its conclusion is one frame short.\n\n7. STRUCTURAL GAP — THE INLINE EMPTY STATE. The knowledge base's note is correct and I can now say precisely why. NoticePage (L136-158) renders Nav, a full-height main, the block, and Footer — it replaces the page. So a filter miss on /cases or /blog would destroy the H1 that PageHeader draws (PageHeader.tsx L40), the intro beside it, and the FilterTabs row the person just clicked — leaving them with no way to see which chip they are on or to get back off it, and a link pointing home instead of at the unfiltered list.\n\nMost of that is already solvable without new layout: NoticeBlock is exported separately from NoticePage and takes as='h2' (L67), actionLabel and actionHref (L65-66), so dropping it inside the existing page keeps the H1 and the chips and retargets the link. Three things still do not exist. (a) No empty branch: cases/page.tsx L106 maps four hardcoded cards and blog/page.tsx L76 maps nine, unconditionally. (b) No filter to miss: FilterTabs.tsx L24-26 says the component is static and the pill is the drawn active state. (c) No frame — the design has no inline empty state at any width, which is why the budgets in those three slots are derived from the drawn No Content boxes as a ceiling rather than measured from a box of their own.\n\nAlso worth separating, because it changes which copy fires: these are TWO states, not one. An index with items where the filter matches none is the inline state (\"Nothing in this filter\" — the list exists, offer the way back to it). An index with no items at all is the full-page No Content state (deck Pt.8 — the page really is empty). Wiring the second to a filter miss would tell the reader the page is empty when it is not.\n\n8. NO INVENTED FACTS were needed on this page. Every proposed string is either drawn, deck canon, or plain second-person microcopy. The one place a fact would have been required is the /cases empty state, and it resolves the other way: because there is no real client work, /cases is the one index whose unfiltered list is genuinely empty, which is an argument for mounting the full-page No Content state there once the hardcoded lorem cards come out — not for writing around it.\n\n9. SCOPE NOTE. src/components/PlaceholderPage.tsx was named as a source and carries no copy slot of its own: it renders Nav, an h1 from the `title` prop, BuildVision and Footer, with a deliberately empty main (L31-39). Its four callers pass real route names. It is a scaffold for unbuilt routes, not an empty state, and its L21-24 comment already records why it must keep an h1 (a heading-less route reads as a soft 404). No proposal needed; flagging so its absence from the list is not read as an oversight.\n\n10. NO FILES WERE EDITED. Measurement script written to the session scratchpad only: C:\\Users\\johnn\\AppData\\Local\\Temp\\claude\\D--johnn-Projects-recurssive\\c50e1ef0-ed42-4c56-8523-1fa49e8743f5\\scratchpad\\measure.js — run `node measure.js calib` to reproduce the seven-box Open Sans calibration and the Inter discrepancy.

### `error.404.heading`

`src/app/not-found.tsx:34`

- **Current:** 404 Not found (13 ch) — drawn verbatim on both frames: 464x87 @72px at 1920, 335x63 @52px at 768.
- **Proposed (13 chars):** 404 Not found
- **Alternate:** Page not found (14 ch, 6.56 em, 64% of cap). Aligns the H1 with the page's own metadata title, which already reads 'Page not found' (not-found.tsx L27), and drops the status-code jargon for the non-tech half of the 50/50. Costs the departure from a drawn string.
- **Budget:** Cap 10.269 em. Derivation: the heading's width limit is the ARTWORK constant (NoticePage.tsx L48), 534px at 768 against a 52px font, and 764px at 1920 against 72px. 534/52 = 10.269 em; 764/72 = 10.611 em, so 768 GOVERNS. Measured 6.32 em (345px of 534) = 62% of cap. The three drawn headings sit at 6.32 / 7.12 / 8.75 em, so ~10.2 em is the true ceiling, not the ~20 chars the slot inventory quotes.
- **Why:** Keep as drawn. It is one of only two headings the design supplies that is still literally true (the 500's is not — see error.500.heading), it is sentence case not Title Case (deck p212), and the numeral is the one piece of information a developer wants. Flagging rather than changing: not-found.tsx L27 sets metadata title 'Page not found' while L34 renders '404 Not found', so the tab and the H1 disagree today. That is a real inconsistency but it is the owner's call which way to resolve it.

### `error.404.body`

`src/app/not-found.tsx:35`

- **Current:** We looked again and again but found nothing... (46 ch — three ASCII full stops, byte-checked)
- **Proposed (44 chars):** We looked again and again but found nothing.
- **Budget:** Body cap is max(59%, 22ch) of ARTWORK (NoticePage.tsx L101) at clamp(20px,…,24px): 450.8px @20px at 1920, 315.1px @24px at 768. Drawn boxes: 441x27 at 1920 (ONE line) and 303x72 at 768 (TWO lines). Proposed string measures 430px @20px and 516px @24px — greedy-wraps to 1 line at 1920 and 2 at 768, landing both drawn line counts exactly. Unchanged from the current string's line counts, so this is a pure fidelity fix with zero layout cost.
- **Why:** DRIFT. Deck p228 (Recurssive Language Pt.6) writes this with a single full stop: 'We looked again and again but found nothing.' Both figspec frames draw '...' and the app copied Figma. The precedent for deck-over-Figma is already established in this same set: Figma draws Pt.8 with an exclamation mark and the deck (p230) writes a full stop, and the voice system records zero exclamation marks in shipped copy against sliders at Serious / Matter-of-fact (deck p40). Same call, same direction. The trailing '...' also softens a line whose whole joke is the flat delivery.

### `error.404.action-label`

`src/components/NoticePage.tsx:53`

- **Current:** Go back to home (15 ch) — the default parameter, drawn verbatim on both 404 frames (143x25 @18px at 1920, 191x33 @24px at 768) and on both No Content frames.
- **Proposed (15 chars):** Go back to home
- **Budget:** No cap binds: a centred single line at clamp(18px,…,24px) inside a 534–764px block. Measured 142.9px @18px against a drawn 143, and 190.6px @24px against a drawn 191 — the measurer reproduces both drawn boxes to under half a pixel. Effective ceiling ~44 ch before it wraps at 768.
- **Why:** Keep as drawn, and keep it as the shared default. This is the only control on the page, and after a 404 there is exactly one honest destination: the person was looking for something that is not there, and no other route is a better guess. Worth naming what this default reaches, because it is not obvious from not-found.tsx: NoticePage.tsx L53 supplies the label for the 404, the error boundary AND /contact/thanks. Only /contact/problem overrides it (L47). Any edit here is a three-page edit.

### `error.500.heading`

`src/app/error.tsx:48`

- **Current:** Something went wrong (20 ch) — explicitly placeholder: error.tsx L21 records 'The heading is placeholder copy pending the owner's wording.' The frames draw '500 Server error' (525x87 at 1920, 379x63 a...
- **Proposed (17 chars):** That didn’t load.
- **Alternate:** Something went wrong (20 ch) — keep the placeholder. Defensible as the maximally status-neutral true statement, and it does not commit the site to a second heading register. But it is 98% of the width cap at 768 and is the longest heading anywhere on the site, so it has no room for a future edit.
- **Budget:** Cap 10.269 em (534px @52px at 768; 768 governs). Proposed measures 6.87 em = 375px of 534 = 67% of cap, so 159px of margin. For contrast the current placeholder measures 10.05 em = 98% of cap — the only heading in the system above 85%, and the reason it should not survive as a permanent string (see rationale).
- **Why:** Two reasons. (1) Voice: /contact/problem already ships 'That didn’t send.' (problem/page.tsx L36) through this same component, so 'That didn’t load.' is the existing family, not a new invention — subject, contracted negative, plain verb, full stop. It obeys the rule that direct address contracts while explanatory body does not, and it uses U+2019 as every shipped string does. (2) Measurement: I could not make any local Inter instance reproduce the drawn heading widths exactly (Inter_18pt-SemiBold at ls-5% under-predicts the three drawn boxes by 1.9%, 2.3% and 4.1%), so I fitted a 5% safety correction to the drawn set. Under that correction 'Something went wrong' comes out at 549px against a 534px cap (overflows); uncorrected it is 523px (fits by 11px). It is genuinely too close to call, which is itself the argument for a shorter string. Note this creates a register split with the drawn '404 Not found' — see openQuestions.

### `error.500.body`

`src/app/error.tsx:49`

- **Current:** Try to refresh the page. If it doesn’t work, circle back later. (63 ch)
- **Proposed (63 chars):** Try to refresh the page. If it doesn’t work, circle back later.
- **Budget:** Drawn 539x27 at 1920 (ONE line) and 603x72 at 768 (TWO lines, with a manual break after 'page.'). Measures 537.9px @20px and 645.5px @24px. Against the SHIPPED cap (59% = 450.8px / 315.1px) it greedy-wraps to 2 lines at 1920 and 3 at 768 — one line over the drawn count at both widths. Against a 72% cap (550px / 384.6px) it lands 1 and 2, exactly as drawn. 71% is the strict minimum that works (542px @1920 vs the string's 538px, 4px of slack); 72% is the safe recommendation.
- **Why:** NO DRIFT — this matches deck p229 (Pt.7) character for character, including the U+2019 in 'doesn’t'. Do not touch the string. The finding here is structural, not editorial: this is the longest of the three canon lines and the component's 59% cap cannot render it as drawn. NoticePage.tsx L91-99 derives the 59% from 441/764 = 57.7% and 303/534 = 56.7% — both taken from the 404 frame only. The 500 frame draws 539/764 = 70.5% and No Content draws 533/764 = 69.8%, so the cap was calibrated on the one frame it fits. See openQuestions.

### `error.500.action-label`

`src/app/error.tsx:47`

- **Current:** (nothing passed — inherits 'Go back to home' from the NoticePage.tsx L53 default). The frame draws 'Refresh page' (110x25 at 1920, 147x33 at 768).
- **Proposed (15 chars):** Go back to home
- **Alternate:** Refresh page (12 ch) — restore the drawn label, pointing at a plain anchor to the current URL so it performs a real document reload. This is the only way the body's first instruction gets a control. It needs a build decision, not just a string: error.tsx L24-27 rules out React's reset() on the correct grounds that it re-renders without re-fetching and so cannot recover a Server Component error.
- **Budget:** Same as the 404 label: no cap binds. 'Go back to home' measures 142.9px @18px / 190.6px @24px; the drawn alternative 'Refresh page' measures 109.9 / 146.6 against drawn boxes of 110 / 147.
- **Why:** Keep, but the mismatch should be on the record rather than quietly accepted. The body issues two instructions — refresh, then leave and come back — and the single control does neither: it goes home. Read charitably the link IS the second instruction ('circle back later' means leave, and home is where you leave to), which is why I am proposing keep rather than change. But a reader who follows sentence one will hunt for a refresh control that is not there. The design gives this page exactly one control (NoticePage.tsx L41-44), so this is a choice between the two instructions, not a chance to have both.

### `nocontent.heading`

`src/components/NoticePage.tsx:50`

- **Current:** NOT BUILT — no file in the app contains this string. Drawn on both frames as 'No content available' (657x87 @72px at 1920, 474x63 @52px at 768).
- **Proposed (20 chars):** No content available
- **Budget:** Cap 10.269 em (534px @52px at 768). Measured 8.75 em = 478px of 534 = 85% of cap. This is the widest of the three drawn headings and it still clears the artwork by 56px at 768. Note it does wrap on a phone: at 375px the container gives 327px against a 45.2px font (7.24 em available vs 8.75 em needed) — but so does the drawn '500 Server error' (7.29 em), so wrapping below 768 is the design's own behaviour, not a defect introduced here.
- **Why:** Keep as drawn. It is plain, sentence case, and says the thing without decoration — and unlike the 500's heading it is still true of every situation it would appear in. The real finding is that nothing renders it: NoticePage/NoticeBlock is consumed only by not-found.tsx, error.tsx, contact/thanks and contact/problem (grepped across src/). The third drawn state in the set has no caller at all.

### `nocontent.body`

`src/components/NoticePage.tsx:50`

- **Current:** NOT BUILT. Figma draws 'Basically you found an empty page about an empty page!' (533x27 at 1920, 365x72 at 768) — with an exclamation mark.
- **Proposed (54 chars):** Basically you found an empty page about an empty page.
- **Budget:** Drawn 533x27 at 1920 (ONE line) and 365x72 at 768 (TWO lines). Measures 532.0px @20px and 638.4px @24px — 1.0px under the drawn 533, so the measurement is trustworthy here. Under the SHIPPED 59% cap it wraps to 2 lines at 1920 and 3 at 768, one over the drawn count at both. Under a 72% cap it lands 1 and 2, as drawn. Swapping '!' for '.' does not change the character count or the line count; both variants measure 532px.
- **Why:** Deck p230 (Pt.8) writes this with a full stop; only the Figma frame adds the exclamation mark. Deck wins, for the same reason as the 404's ellipsis: zero exclamation marks appear in any shipped user-facing string, and deck p40 puts the voice sliders at Serious and Matter-of-fact. The line is already funny; the '!' tells the reader it is a joke, which is the one thing that stops it being one. Same structural caveat as the 500 body — it needs the 72% cap to render as drawn.

### `nocontent.action-label`

`src/components/NoticePage.tsx:50`

- **Current:** NOT BUILT. Drawn 'Go back to home' (143x25 at 1920, 191x33 at 768) — identical to the 404's.
- **Proposed (15 chars):** Go back to home
- **Budget:** No cap binds. 142.9px @18px / 190.6px @24px against drawn 143 / 191.
- **Why:** Keep as drawn, and it needs no override — it is already the NoticePage.tsx L53 default, so a No Content route would inherit it for free. Home is the correct single destination here for the same reason as the 404: whatever the person came for is not on this page, and the design allows exactly one way out. Do NOT reuse this state for a filter miss, where home is the wrong destination and the right one is the unfiltered index — see the inline-empty slots below.

### `inline-empty.heading`

`src/app/cases/page.tsx:106`

- **Current:** DOES NOT EXIST — no inline empty state is drawn in any frame or built in any file. cases/page.tsx L106 renders four hardcoded cards unconditionally; blog/page.tsx L76 renders nine. Neither has an empt...
- **Proposed (22 chars):** Nothing in this filter
- **Alternate:** No content available (20 ch, 8.75 em) — reuse the drawn heading verbatim so both empty states share one line. Cheaper and stays inside drawn copy, but it is vague where the person needs specificity: it says the page is empty when in fact only their filter is, which invites them to leave rather than to try another chip.
- **Budget:** No drawn box exists, so I budgeted against the drawn No Content heading as the ceiling — an inline state must not be wider than the full-page one it derives from. Measured 8.24 em vs the drawn 'No content available' at 8.75 em, so it is narrower than the design's own widest heading and clears the 10.269 em cap with 2.0 em to spare. If the inline block reuses NoticeBlock at its full 36→72px clamp it fits; if it is dropped to the page's own .t-section scale (48/42px) it gains roughly 25% more margin.
- **Why:** Names the actual condition, which is what separates this state from No Content. Sentence case, no Title Case (deck p212), no exclamation, does not open with 'We' (the shipped body rule, honoured here for a heading too), and 'filter' covers both indexes — the chips are segments on Cases (All / Startups / SMB’s / Enterprise, cases/page.tsx L102) and tags on Blog (All / Insights / Technology / Tools, blog/page.tsx L69). Deliberately NOT the deck's Pt.8 line: 'an empty page about an empty page' is a joke about a page with no content, and a filter miss is a page with plenty of content that this one chip does not reach. Using Pt.8 here would spend canon on the wrong state and tell the reader something false.

### `inline-empty.body`

`src/app/cases/page.tsx:106`

- **Current:** DOES NOT EXIST.
- **Proposed (44 chars):** The list is not empty, only this slice of it.
- **Alternate:** Try another filter, or start over with all of them. (51 ch, 438px @20px, 525px @24px — also 1/2 under both caps, but only 13px inside the shipped 450.8px cap at 1920). Puts the copy in the imperative register that src/lib/contact.ts L42-62 uses for every validation string. Choose this if the reset link is dropped and the body has to carry the whole recovery.
- **Budget:** No drawn box. Budgeted to the drawn No Content body's density so the inline state reads at the same weight: 44 ch against its 54, measuring 368px @20px and 442px @24px. Under the SHIPPED 59% cap that is 1 line at 1920 and 2 at 768 — the drawn line counts — and it is the only one of the three body candidates that lands them under the current cap without the 72% change. Under a 72% cap it is still 1/2.
- **Why:** Two clauses, the 'X rather than Y' judgement carried entirely by the contrast with no adjective doing the work, and no contraction — this is explanatory, not direct address. 'slice' is the deck's own word (it is in the preferred lexicon alongside scope and constraint). Does not open with 'We', contains no em-dash, no colon, no exclamation, and makes no claim the reader cannot check in one glance at the chips above it. It also deliberately does not repeat the action: the heading states the condition, the body refuses the panic reading, the link does the recovery. Three parts, no overlap.

### `inline-empty.action-label (Cases)`

`src/app/cases/page.tsx:106`

- **Current:** DOES NOT EXIST — and cannot yet. FilterTabs.tsx L24-26 is explicit that the component is static: the filled pill is the drawn active state and nothing is wired, so there is no filter to clear.
- **Proposed (14 chars):** Show all cases
- **Alternate:** Clear the filter (16 ch, 119.2px @18px / 158.9px @24px). Names the mechanism instead of the destination. Prefer it if the filter ends up as client-side state where nothing navigates; prefer 'Show all cases' if it resolves to a real URL, because then the label should describe where the link goes.
- **Budget:** No cap binds. Measures 120.4px @18px and 160.4px @24px, against the drawn 'Go back to home' at 143 / 191 — comfortably inside the drawn rhythm at both widths.
- **Why:** An imperative that says what to do rather than what went wrong, which is the rule every string in the MESSAGES table already follows (src/lib/contact.ts L42-62). Points at the unfiltered index, not at home — this is the single structural difference from the full-page No Content state and the whole reason that state cannot serve a filter miss. Naming 'cases' rather than 'everything' also keeps the label honest about scope.

### `inline-empty.action-label (Blog)`

`src/app/blog/page.tsx:76`

- **Current:** DOES NOT EXIST — same gap as Cases; blog/page.tsx L76 renders the nine-card grid with no empty branch, and its FilterTabs (L69) is the same static component.
- **Proposed (14 chars):** Show all posts
- **Budget:** No cap binds. Measures 120.4px @18px and 159.4px @24px — within a pixel of the Cases label at both sizes, so the two indexes keep an identical control rhythm.
- **Why:** The Blog twin of the Cases label, same imperative shape, same destination logic. 'posts' rather than 'articles' because PostCard/PostItem is what the code already calls them (blog/page.tsx L6, L39) and the reader sees post cards. The heading and body are shared verbatim across both indexes; only this label changes, which is what makes a single inline component viable rather than two.

### Open questions - Error and empty states — 404, 500 / error boundary, and "No content available" (frames: 404__1920w, 500__1920w, 501__768w and 502__768w [both misnamed; contents are verbatim 404 and 500], No Content__1920w, No Content__768w). Sources: src/app/not-found.tsx, src/app/error.tsx, src/components/NoticePage.tsx, src/components/PlaceholderPage.tsx.

- BODY MAX-WIDTH CAP — the one change that decides whether canon lands as drawn. NoticePage.tsx L101 caps the description at max(59%, 22ch) of the artwork. I greedy-wrapped all three canon lines at both breakpoints: 59% reproduces only the 404's two drawn boxes and misses four of six (the 500 body renders 2 lines at 1920 where 1 is drawn and 3 at 768 where 2 are drawn; No Content the same). 71% is the strict minimum that reproduces all six; 72% is the safe recommendation (550px at 1920 against the 500 line's 538px, vs only 4px of slack at 71%). The 22ch floor never binds at either breakpoint (251.6px at 20px, 301.9px at 24px). Raise it, or accept that two of the three canon lines run a line long at both drawn widths?
- HEADING REGISTER — the set is currently split and only the owner can settle it. The drawn headings are status-style with no terminal punctuation ('404 Not found', '500 Server error', 'No content available'); the two written ones already shipping through the same component are sentence-style with a full stop ('Thanks, we’ve got it.', 'That didn’t send.'). Replacing the 500's heading moves that page into the sentence register while the 404 stays in the status one. Three coherent options: (a) keep the drawn two and write only the 500, accepting the split; (b) move all three to sentence register — 'Page not found' / 'That didn’t load.' / 'Nothing here yet' — which also fixes the metadata mismatch below but departs from three drawn strings; (c) stay in status register and keep 'Something went wrong'.
- 404 METADATA MISMATCH — not-found.tsx L27 sets the metadata title to 'Page not found' while L34 renders the H1 as '404 Not found'. The browser tab and the page disagree. Change the H1, change the metadata, or accept it deliberately?
- DOES THE 500 GET A REAL REFRESH CONTROL? The canon body instructs 'Try to refresh the page' and the only control on the page says 'Go back to home'. The frame drew 'Refresh page'. error.tsx L24-27 correctly rules out React's reset() (it re-renders without re-fetching, so it cannot recover a Server Component error), but a plain anchor to the current URL would perform a genuine document reload. Restore the drawn label pointing at that, or keep home and let the browser's own reload serve the first sentence?
- WHERE DOES THE FULL-PAGE 'No content available' STATE MOUNT? It is drawn at both widths and supplied with canon copy, and nothing in the app renders it — NoticePage/NoticeBlock is consumed only by not-found.tsx, error.tsx, contact/thanks and contact/problem. Today /cases cannot reach it because cases/page.tsx L34-83 hardcodes four cards, and /blog cannot because blog/page.tsx L39 maps nine. It becomes reachable only once both indexes read from their real collections. Should it ship now behind that wiring, or wait?
- INLINE EMPTY STATE — TYPE SCALE. NoticeBlock already takes as='h2' (NoticePage.tsx L67), so the component anticipates an inline use, but its heading clamps 36→72px, which at 1920 would render the empty state's H2 at 72px against the page's own H1 at 48px (PageHeader.tsx L40, .t-section). Does the inline variant get its own smaller scale, and does it keep the BinaryMark artwork at all, or is it text only? No frame draws this, so it is a design decision, not a measurement.
- CLEAR-FILTER CONTROL — the copy is blocked on a build decision. FilterTabs.tsx L24-26 states plainly that nothing is wired because there is nothing to filter yet, and that making the chips interactive needs a choice between client-side filtering and /blog/tag/[tag] routes. That choice also picks the action label: a real URL wants 'Show all cases' (describes the destination), client-side state wants 'Clear the filter' (describes the mechanism). Which way?
- CONFIRM DECK-OVER-FIGMA ON PUNCTUATION. Two of the three canon lines differ between the deck and the frames: the 404 body is '...' in Figma and '.' in the deck (p228), and the No Content body is '!' in Figma and '.' in the deck (p230). I have proposed the deck reading for both. Confirm that is the standing rule, since it decides these two strings and any future canon placement.

---

## Global microcopy (nav, footer, newsletter, menu, metadata)

"WHAT I MEASURED, AND WHERE I DISAGREED WITH THE INVENTORY\n\nOnly one slot on this page carries lorem: the newsletter description (Newsletter.tsx:55). Everything else global is either drawn-and-shipped or a metadata string. So most of this sweep is verification and correction rather than filling, and the findings are worth more than the new sentences.\n\nNewsletter description budget — I derived 57-97 chars, tighter than the inventory's 62-97, and I trust mine because I checked it against the frame's own line breaks rather than a formula. The 768 frame (Post__768w.txt:114-115) draws a 110-character string in a 610x62 box at 24px ls-3%. It breaks at \"...consectetur adipiscing elit,\" = 56 characters, then 53. Both sit just under 56.5 ch/line, which is what 610 / (0.48 x 24 - 0.03 x 24) predicts. At 1920 the box is 374x48 at 16px = 48.7 ch/line over 2 drawn lines. Two lines at BOTH widths therefore needs >57 and <=97. My 89-character line wraps 46/43 at 1920 and 49/38 at 768. The inventory's 50.9 and 59.2 ch/line figures are ~4-5% looser; at ~85-90 characters the two models agree, so nothing turns on it here — but the tighter number is the one to use if this slot is ever rewritten near the ceiling.\n\nTHE NAV CTA IS THE TIGHTEST STRING ON THE SITE. \"Start a project\" is 15 characters and BOTH drawn pills are fitted to exactly that: 15 + 110 + 10 + 15 + 15 = 165 at 1920 (Home__1920w.txt:346-348), 15 + 143 + 10 + 15 + 15 = 198 at 768 (Privacy Policy__768w.txt:7-9). The Button component reproduces both paddings (Button.tsx:38-40) and the element is auto-width, so a 16th character widens the pill — and STATE.md L706-719 records that the nav already overflowed the viewport at 1029px and gave the whole document a horizontal scrollbar. This is the one label where a synonym has a measurable cost.\n\nFIVE FINDINGS THAT ARE NOT COPY PREFERENCES\n\n1. /cookies is a 404. Footer.tsx:160 links to it from lg up. There is no src/app/cookies/page.tsx and no rewrite in next.config.ts. The comment at Footer.tsx:136 asserts the opposite — \"the frames omit Cookies; it is a real page, so it stays\" — so the belief is recorded in the code as well as the markup. Compounding it: /privacy-policy already states \"We do not use cookies. This site sets none...\" (legal.ts:74), so a separate cookie policy is the wrong artefact anyway. Point it at /privacy-policy#cookies (add id=\"cookies\" at LegalPage.tsx:95) or drop it.\n\n2. \"SMB's\" is a possessive apostrophe on a plural. cases/page.tsx:102 ships the frame's version; page.tsx:120 already ships the correct \"SMBs\" in the Home industries band. Same three segments, two spellings, two pages. The frontmatter enum agrees with Home (docs/writing-content.md L65: startups / smbs / enterprise).\n\n3. The newsletter consent checkbox asks a reader to accept \"the terms and conditions\" — a document by that name does not exist, the phrase is not a link, and for a mailing list the governing document is the privacy policy, not the terms of service. A consent control pointing at an unopenable, misnamed document is the only outright compliance-shaped defect I found.\n\n4. og:locale says en_US while the build's dates, times and spelling are all en-GB (Clock.tsx:27, lib/contact.ts:105, about/page.tsx:24, page.tsx:117).\n\n5. /contact/thanks and /contact/problem pass no description, so both inherit site.description via metadata.ts:19 and describe themselves as \"Recurssive is a visionary web and app studio...\". They are noIndex, so this only surfaces in a shared link preview — but that is exactly when a confirmation page gets shared.\n\nTHE FOOTER-VERSUS-NAV CONTRADICTION, COPY SIDE\n\nThe brief is right that all 31 frames contradict themselves, and the build has already made the correct call — but the fault is worth stating precisely, because it is three faults, not one. The drawn Contents column reads Home / Services / About / Contact against a drawn nav of Home / Cases / Capabilities / About / Blog / Contact.\n\n(a) \"Services\" names a page that does not exist and never did. The studio's own noun for that page is \"Capabilities\" — it is the nav label on the same frame, the route name, and the deck's own word for the four pillars on p29. This is the frames contradicting themselves inside one composition, not a naming preference.\n(b) Blog is in the drawn nav and missing from the drawn footer, so a reader who has scrolled past the header loses the route entirely.\n(c) Cases is likewise missing from the drawn footer — accidentally what we now want, for entirely the wrong reason.\n\nFooter.tsx:52-60 fixes all three and I recommend no change. The one remaining asymmetry is deliberate and should stay: the nav omits Contact because the pill beside it already goes there, and the footer keeps Contact because the footer has no pill. The two lists answer different questions and forcing them to match would make one of them wrong.\n\nTWO BUILD OBSERVATIONS I FOUND WHILE MEASURING, PASSED ON WITHOUT ACTING\n\n- The newsletter Join button is narrower than drawn. Frame 124 is 96x41 at 1920 with a 34px label, i.e. 31px of side padding; the accent variant renders lg:px-[15px] = 64px total. At 768 the drawn 135x53 against md:px-4 = 81px. That is 32px and 54px short. Not a copy issue, but it is in the band I was measuring and \"Join\" is not what is making it narrow.\n- The mobile drawer's hamburger label reads \"Open menu\" with no aria-expanded, so it announces \"Open menu\" while the sheet is open (Nav.tsx:104-112). Markup, not wording.\n\nCANON PLACEMENT ON THIS PAGE: Pt.5 \"Stay in the loop\" is already correctly placed at Newsletter.tsx:52 and needs nothing. Pt.2 \"Got an idea that keeps coming back? Contact us\" has no home in global microcopy — 45 characters against a 15-character pill — and belongs on a /contact lead or the BuildVision band, neither of which is my page. Flagging so it does not get lost between agents."

### `nav.cta`

`src/components/Nav.tsx:99`

- **Current:** "Start a project" (15 ch) — desktop pill; the identical string is at Nav.tsx:212 in the mobile drawer
- **Proposed (15 chars):** Start a project
- **Budget:** 15 chars, HARD. Both drawn pills are fitted to this exact string. 1920 Home__1920w.txt:346-348 — Frame 58 is 165x39 and the label measures 110x19 at Inter Medium 16px; 15 + 110 + 10 + 15(arrow) + 15 = 165 exactly. 768 Privacy Policy__768w.txt:7-9 — Frame 40 is 198x47 and the label measures 143x27 at Inter Semi Bold 22px ls-3%; 15 + 143 + 10 + 15 + 15 = 198 exactly. Button.tsx:38-40 reproduces both paddings, and the element is auto-width, so every extra character widens the pill.
- **Why:** Drawn verbatim on all 31 frames, and already in register: imperative, second-person-implied, no first person, no adjective. Changing it is not free — STATE.md L706-719 records that at a 1029px viewport the lockup + six links + this pill + gaps already came to ~953 against an 871 content column and pushed the document 10px wider than the viewport. The nav CTA is the one string on the site where a longer synonym has a measurable layout cost. Recurssive Language Pt.2 ("Got an idea that keeps coming back? Contact us", 45 ch) is the natural contact line but is three times the budget and belongs on a /contact lead, not a pill.

### `nav.links`

`src/components/Nav.tsx:23`

- **Current:** Home / Capabilities / About / Blog (4 links)
- **Proposed (34 chars):** Home / Capabilities / About / Blog
- **Budget:** Sum of label advances at Inter Medium 16px, 1920: Home 46 + Capabilities 90 + About 47 + Blog 34 = 217px (Home__1920w.txt:331-343 gives every drawn advance). The drawn six add Cases 48 + Contact 62 = 327px. The gap ramps 24px at 1024 to 50px at 1920 (Nav.tsx:78), so each extra link costs one label plus one gap.
- **Why:** Keep as built. The drawn nav is six (Home / Cases / Capabilities / About / Blog / Contact) and the build ships four; both omissions are already reasoned and correct on copy grounds. Cases is held back because there is no real work (site.ts:52-67). Contact is redundant next to a pill that already points at /contact, and a nav that offers the same destination twice reads as padding. No copy change. The word to watch is "Capabilities" — it is the studio's own noun on p29 and in the nav on all 31 frames, and "Services" (which the drawn footer uses) is not a page and not the register.

### `menu.aria-labels`

`src/components/Nav.tsx:108`

- **Current:** aria-label="Open menu" (Nav.tsx:108) and aria-label="Close menu" (Nav.tsx:161)
- **Proposed (22 chars):** Open menu / Close menu
- **Budget:** No geometry — these are accessible names, never painted. Screen readers announce them appended to the role, so "Open menu, button". Keep under ~25 chars so the announcement is not a sentence.
- **Why:** Keep. Conventional, imperative, and matches the error/validation rule that microcopy says what to do rather than what state a thing is in. Also matches the nav's other accessible names — "Recurssive, home" (Nav.tsx:59) and "Main" (Nav.tsx:51) — which are already correct and need no change. Worth noting for whoever touches the drawer: the label carries no aria-expanded/aria-controls, so "Open menu" is announced even while the sheet is open. That is a markup fix, not a copy fix.

### `menu.phone`

`src/components/Nav.tsx:204`

- **Current:** site.phone renders "+30 698 950 2436" (16 ch); the Menu frame draws "(+30) 698 950 2436" (18 ch)
- **Proposed (16 chars):** +30 698 950 2436
- **Alternate:** (+30) 698 950 2436 — if the owner wants the frame reproduced exactly. Then site.ts:33 changes, not the component, so /contact and the footer move with it.
- **Budget:** Menu__768w.txt:24-25 — the drawn string measures 230x39 at Open Sans Regular 26px (12.8px/char). At 16 chars the built string measures ~205px in the same slot, against a menu-meta block that shares a flex row with a 249px pill across a 610px column. Both fit; this is a form question, not a fit question.
- **Why:** Keep the site.ts form and correct the frame, not the build. The market is global (this supersedes p25), and "(+30)" is a Greek domestic convention that reads as an optional trunk code to anyone dialling from outside Greece — which is precisely the reader this studio is written for. "+30 698 950 2436" is unambiguous internationally and is already the single source in site.ts:33, so the frame is the outlier. Flagging rather than silently forking: this is the only place the two disagree.

### `footer.heading-contents`

`src/components/Footer.tsx:99`

- **Current:** "Contents" (8 ch)
- **Proposed (8 chars):** Contents
- **Budget:** 8-19 chars, one line. 1920: drawn 71x24 at Inter Medium 16px (Home__1920w.txt:240-241), auto-width in a 767fr track — effectively unbounded. 768: drawn 97x33 at 22px (Home__768w.txt:102-103) in a 242fr track of 610 = 242px, so 24 chars. The binding case is a 360px phone, where .footer-col eases to 14px and the track is ~124px: 124 / (0.46 x 14) = 19 chars.
- **Why:** Keep. Drawn on all 31 frames, lowercase-after-the-cap per deck p212, and a plain functional noun rather than a marketing one ("Explore", "Navigate", "Discover" would all be off-register). Nothing to gain by changing it.

### `footer.contents-list`

`src/components/Footer.tsx:52`

- **Current:** Home / Capabilities / About / Blog / Contact (5 items). All 31 frames draw Home / Services / About / Contact (4 items).
- **Proposed (43 chars):** Home / Capabilities / About / Blog / Contact
- **Budget:** Line count is the budget, not characters. Each column item is one line-height: 24px at 1920, 32.5px at 768 (Footer.tsx:36-45). The drawn 4 make a 96px column (the drawn text node is 61x96 at 1920, Home__1920w.txt:235-239). Five items measure the band at 709.7px against the drawn 685; six put it at 733.7. Character width is not a constraint — the longest label, "Capabilities", is 90px at 1920 in a 767fr track.
- **Why:** Keep as built; the build has already made the correct copy call and the frames are wrong. Three separate faults in the drawn list: (1) "Services" names a page that does not exist and never did — the nav on the same frame says "Capabilities", which is also the deck's own noun for the four pillars on p29, so the footer contradicts the nav inside one composition; (2) Blog is drawn in the nav and missing from the footer, so a reader who scrolled past the nav loses the route; (3) Cases is drawn in the nav and missing from the footer, which is accidentally what we now want but for the wrong reason. The only judgement left is Contact, which the nav deliberately drops (the pill covers it) and the footer deliberately keeps (the footer has no pill). That asymmetry is correct: the two lists answer different questions, so they should not be forced to match.

### `footer.heading-where`

`src/components/Footer.tsx:109`

- **Current:** "Where" (5 ch)
- **Proposed (5 chars):** Where
- **Budget:** 5-19 chars, one line. Drawn 50x24 at Inter Medium 16px (Home__1920w.txt:247-248). Same 19-char floor as Contents at a 360px viewport.
- **Why:** Keep. A bare interrogative noun is exactly the matter-of-fact end of the p40 sliders, and it is honest about what the column answers — where we are, not where we work.

### `footer.where-list`

`src/components/Footer.tsx:110`

- **Current:** Thessaloniki / Greece / live clock (2 lines) = 4 lines, matching the drawn 92x96 text node
- **Proposed (34 chars):** Thessaloniki / Greece / live clock
- **Alternate:** Thessaloniki / Greece / Working globally / live clock — adds a 4th text line (16 ch) before the clock, taking the column to 5 lines, which is exactly the height Contents already forces. No band-height change. Only take this if the owner does not want the claim carried solely by /about and /contact.
- **Budget:** 4 lines drawn (Home__1920w.txt:242-246, node 92x96 at 16/24). A fifth line is free: the Contents column next to it already runs 5 items, so the footer band is sized by Contents, not by Where. Longest item "Thessaloniki" is 92px at 1920 and ~145px at 768 in a 242px track.
- **Why:** Keep as drawn. The global-market fact belongs in a sentence, not in a location column — "Where" answers where the studio sits, and Thessaloniki / Greece is true. Raising the alternate only because the fifth line costs nothing structurally and the studio currently says "working globally" nowhere a human reads, only in two meta descriptions.

### `footer.heading-socials`

`src/components/Footer.tsx:115`

- **Current:** "Socials" (7 ch)
- **Proposed (7 chars):** Socials
- **Budget:** 7-19 chars, one line. Drawn 55x24 at Inter Medium 16px (Home__1920w.txt:249-250). The track is max-content (Footer.tsx:98), sized to "Instagram" at 72.6px, so the heading is not the constraint.
- **Why:** Keep. Drawn on all 31 frames.

### `footer.socials-email`

`src/components/Footer.tsx:66`

- **Current:** "E-mail" (6 ch)
- **Proposed (6 chars):** E-mail
- **Budget:** 6-9 chars. Drawn as the fourth line of the 76x96 Socials node (Home__1920w.txt:251-254), and the track is max-content sized to "Instagram" (72.6px), so anything up to ~9 chars at 16px is free.
- **Why:** Keep — but this is the site's one live spelling inconsistency and it should be settled here. "E-mail" is drawn and shipped in three places: this row, the newsletter label and placeholder (Newsletter.tsx:73, 80), and the contact form label (ContactForm.tsx:266). "Email" is shipped in two: the prose on /contact/problem (problem/page.tsx:40) and the legal copy (legal.ts:120). That split is actually defensible and I recommend keeping it — "E-mail" is the drawn UI label, "Email" is the word in a sentence — but it is a split, and it should be a decision rather than an accident. Do not put a hyphen inside running prose.

### `footer.legal-cookies`

`src/components/Footer.tsx:160`

- **Current:** "Cookies" (7 ch), linking to /cookies — a route that does not exist. There is no src/app/cookies/page.tsx and no rewrite in next.config.ts, so this link 404s at every viewport from lg up.
- **Proposed (7 chars):** Cookies
- **Alternate:** Remove the item entirely. The 768 frames already omit it, the site sets no cookies, and four items is what the narrow legal row was measured for. Cleaner, but it drops the one place a reader can check the no-cookies claim from the footer.
- **Budget:** 7-18 chars, one line, shared row. 1920 draws five items totalling 446px of text across a 1594 column (Home__1920w.txt:255-266) — unconstrained. 768 draws four and the item is hidden below lg (Footer.tsx:160). STATE.md's own note: five items measure 398px against a 392px column at a 440px viewport, so the row is at its limit there and this item is already the one dropped.
- **Why:** The word stays; the destination has to change. Two faults, both copy-visible. First, Footer.tsx:136 asserts "the frames omit Cookies; it is a real page, so it stays" — it is not a real page, so the site's own footer serves a 404 on every desktop view. Second, /privacy-policy already says "We do not use cookies. This site sets none..." (legal.ts:74), which makes a standalone cookie policy the wrong artefact anyway. Point the link at /privacy-policy#cookies and add id="cookies" to the section wrapper in LegalPage.tsx:95. That turns a broken link into a live one that lands on a genuine differentiator: a studio site with no banner because there is nothing to consent to.

### `footer.credit`

`src/components/Footer.tsx:167`

- **Current:** "Designed by Omnics" (18 ch), with only "Omnics" as the link
- **Proposed (18 chars):** Designed by Omnics
- **Budget:** 18 chars is the drawn width: 153x20 at Open Sans Regular 16/20 (Home__1920w.txt:265-266). At 768 the same slot is drawn 170x20 at 22px ls-4%. This is the longest item in the legal row, and STATE.md records that five items measure 398px against a 392px column at 440px — so it is the item that decides whether the row wraps. Do not lengthen it.
- **Why:** Keep, and note the frame typo. The 768 frames draw "Design by Omnics" (Home__768w.txt:110-111) — a missing d, not a different credit. The 1920 frames draw "Designed by Omnics" and the build ships that, which is right. Also correct that only the studio name carries the link (Footer.tsx:166-176): the credit is a sentence, the link is a proper noun. "Omnics Digital Agency" is the designer's full credit and must never leak into Recurssive's own descriptor (site.ts:25).

### `newsletter.heading`

`src/components/Newsletter.tsx:52`

- **Current:** "Stay in the loop" (16 ch)
- **Proposed (16 chars):** Stay in the loop
- **Budget:** 16 chars. Drawn 323x96 at Inter Semi Bold 48px ls-5% on both frames with no ramp (Blog__1920w.txt:3-4, Blog__768w.txt:96-97). 16 x (0.46 x 48 - 0.05 x 48) = 315px predicted against 323 drawn. At 768 the heading is centred in a 610 column, so it has headroom; at 1920 it shares a flex row with the form and has none to spare.
- **Why:** Canon. Recurssive Language Pt.5 (deck p230), placed verbatim and already correct. This is the one canon line on my page that already has its home, and it is the reason the band works: the pun does the persuading so the description underneath can be plain.

### `newsletter.description`

`src/components/Newsletter.tsx:55`

- **Current:** LOREM — "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor." (79 ch)
- **Proposed (89 chars):** New posts when there are new posts, and nothing in between. One click gets you out again.
- **Alternate:** "Notes on what we are building and what we got wrong. One click gets you out again." (82 ch; wraps 2 lines at both widths). Take this one if the newsletter is a letter in its own right rather than a post notification. It is a genuinely open call and it changes what the list has to deliver, so it belongs with the owner — see openQuestions.
- **Budget:** 57-97 chars, 2 lines at both widths. 1920: box 374x48 at Open Sans Regular 16px (Blog__1920w.txt:5-6) = 374 / (0.48 x 16) = 48.7 ch/line, drawn 2 lines, so >49 and <=97. 768: box 610x62 at 24px ls-3% (Post__768w.txt:114-115) = 610 / (0.48 x 24 - 0.03 x 24) = 56.5 ch/line, drawn 2 lines, so >57 and <=113. Intersection 57-97. I verified 56.5 against the frame's own string: the drawn 110-ch 768 line breaks at "...adipiscing elit," = 56 chars, then 53 — both just under 56.5, which is what a fitted box looks like. NB this is tighter than the inventory's 62-97; the inventory's 50.9/59.2 ch/line figures are ~4% looser than the drawn break point. My 89-ch line wraps 46/43 at 1920 and 49/38 at 768 — 2 lines both, as drawn. Build max-widths already match both boxes (Newsletter.tsx:54).
- **Why:** Says what arrives and what does not, with no cadence invented and no volume claimed — there is no list and nothing has been published, so "weekly", "monthly" and "curated" are all facts that do not exist. Voice checks: opens on "New", not "We"; zero first person against one "you"; no contraction in the explanatory half; the unsubscribe promise is falsifiable in one click, literally. "and nothing in between" is the X-rather-than-Y contrast doing the judgement without an adjective. Sentences run 11 and 6 words, short of the 17-word body mean, which is right for a 2-line slot under a 48px heading — the shipped FAQ intro (73 ch, 2 sentences) is the precedent.

### `newsletter.placeholder-name`

`src/components/Newsletter.tsx:68`

- **Current:** placeholder="Name" (4 ch), with a matching sr-only label
- **Proposed (4 chars):** Name
- **Budget:** <=14 chars. The field is 200px wide with 15px side padding (drawn Frame 3 200x42 at 1920, 200x53 at 768; Blog__1920w.txt:7-9, Blog__768w.txt:98-100), leaving 170px of content. At 1920's 16px that is 22 chars; at 768's 24px it is 14. 768 binds. Drawn label measures 45x22 at 16px.
- **Why:** Keep. Drawn verbatim, and the field already carries a real sr-only label (Newsletter.tsx:61-63) so the placeholder is redundancy rather than the only affordance.

### `newsletter.placeholder-email`

`src/components/Newsletter.tsx:80`

- **Current:** placeholder="E-mail" (6 ch), with a matching sr-only label
- **Proposed (6 chars):** E-mail
- **Budget:** <=14 chars, same field geometry as Name. Drawn label 46x22 at 16px (Blog__1920w.txt:11-12), 69x33 at 24px (Blog__768w.txt:102-103).
- **Why:** Keep, and keep it identical to the contact form's label (ContactForm.tsx:266) and the footer's Socials row (Footer.tsx:66). "E-mail" is the drawn UI-label form on all 31 frames; the prose form is "Email". See footer.socials-email.

### `newsletter.submit`

`src/components/Newsletter.tsx:86`

- **Current:** "Join" (4 ch)
- **Proposed (4 chars):** Join
- **Budget:** <=8 chars at the built padding. Drawn Frame 124 is 96x41 with a 34x20 label at Inter Medium 16.8px (Blog__1920w.txt:25-27) and 135x53 with a 49x29 label at 24px (Blog__768w.txt:104-106). The build's accent variant uses lg:px-[15px] and md:px-4 (Button.tsx:54-56), so it renders ~64px wide against the drawn 96 and ~81px against the drawn 135. That leaves headroom in characters but the button is 32px/54px narrower than drawn — a padding bug, not a copy one.
- **Why:** Keep. Four characters, imperative, and it only reads as unambiguous because "Stay in the loop" sits directly above it — "Subscribe" (9 ch) would say the same thing twice and push the pill 45px wider at 1920. Do not use "Sign up": there is no account.

### `newsletter.consent`

`src/components/Newsletter.tsx:92`

- **Current:** "I’ve read and accepted the terms and conditions" (47 ch), plain text, not a link, next to a required-looking unchecked box
- **Proposed (41 chars):** I’ve read and accepted the privacy policy
- **Alternate:** "I’ve read and accepted the terms of service" (43 ch) — keeps the frame's document and still fits one line at both widths. Only defensible if the owner treats the newsletter as a service under the ToS rather than as marketing consent. Either way the phrase must become a link.
- **Budget:** <=47 chars, ONE line. 1920: Group 2100 is 333x19 — a 14x14 box, a ~5px gap, and a 314px text node at Open Sans Regular 14px (Blog__1920w.txt:13-15). 314 / (0.48 x 14) = 46.7 chars, and the drawn string is 47 — the box is fitted to it, so there is no slack. 768: group 523x30, 22px box, 493px text node at 22px ls-3% (Blog__768w.txt:107-109) = 49.8 chars. 1920 binds at 46-47. My 41 leaves 6 characters of margin, which is the room a link underline needs.
- **Why:** Two problems the frame carries and the build inherited. First the document is wrong: joining a mailing list is consent to be emailed, and the document that governs that is the privacy policy (legal.ts:58-124 covers exactly what is collected and what rights follow), not the terms of service. Second the phrase is not a link, so a reader is asked to accept something they cannot open — which is the one thing a consent checkbox may not do. "Accepted" also outruns the truth: nobody has read anything. Voice: the contraction stays, because this is the reader speaking, not us, and the drawn string sets that precedent; the apostrophe is U+2019, matching every other shipped string.

### `filtertabs.blog`

`src/app/blog/page.tsx:69`

- **Current:** ['All', 'Insights', 'Technology', 'Tools']
- **Proposed (35 chars):** All / Insights / Technology / Tools
- **Budget:** Sum of drawn advances at Open Sans Regular 16px, 1920: All 19 (in a 49x42 pill) + Insights 58 + Technology 86 + Tools 40 (Blog__1920w.txt:47-54, 81-83). The row is flex-wrap with a flex-1 rule taking the remainder (FilterTabs.tsx:43), so labels are only constrained by the min-w-[40px] the rule reserves.
- **Why:** Keep — drawn verbatim on both Blog frames, and the three categories are the right shape for what this studio writes: Insights is the thinking, Technology is the stack, Tools is what we reach for. Do not rename "Tools" to "Resources"; the deck's own p88 verbs are ask / listen / think, and Tools is the concrete noun. Note the tags must match real frontmatter values for the chips to ever mean anything (docs/writing-content.md L60).

### `filtertabs.cases`

`src/app/cases/page.tsx:102`

- **Current:** ['All', 'Startups', 'SMB’s', 'Enterprise'] — "SMB’s" carries a possessive apostrophe on a plural
- **Proposed (34 chars):** All / Startups / SMBs / Enterprise
- **Budget:** Drawn advances at Open Sans Regular 16px, 1920: All 19 + Startups 63 + SMB’s 44 + Enterprise 77 (Cases__1920w.txt:15-23). "SMBs" is one character narrower than "SMB’s", so the fix can only shorten the row. Auto-width pills in a flex-wrap row — no fit risk either way.
- **Why:** "SMB’s" is a plural, not a possessive, so the apostrophe is a straight error. It is also inconsistent inside the build: the Home industries band already ships the correct "SMBs" (page.tsx:120) while this row ships the frame's version, so the same three segments are spelled two ways on two pages. The style system calls this out by name — the double-s/single-s slip is "the one typo that reads as amateurish", and a rogue greengrocer's apostrophe in a filter chip is the same class of damage. The frame is wrong; the Home band is right. Note the segment values in frontmatter are already `startups` / `smbs` / `enterprise` (docs/writing-content.md L65), which agrees.

### `site.descriptor`

`src/lib/site.ts:26`

- **Current:** "Visionary Web & App Studio" (26 ch)
- **Proposed (26 chars):** Visionary Web & App Studio
- **Budget:** 26 chars. Consumed as the second half of the home <title> and of title.default: "Recurssive | Visionary Web & App Studio" = 39 chars against a 70-char ceiling (docs/writing-content.md L45).
- **Why:** Keep — locked on deck p27 and I was told not to re-derive it. Flagging one tension rather than acting on it: it is Title Case, which deck p212 bans in headings and body copy. The defensible reading is that this is a descriptor, i.e. a name, not a heading — same class as "Privacy Policy". Worth the owner confirming once, because it is the most-rendered string on the site.

### `site.description`

`src/lib/site.ts:28`

- **Current:** "Recurssive is a visionary web and app studio crafting custom web & app experiences that help people." (100 ch)
- **Proposed (133 chars):** Recurssive is a web and app studio. Custom software in React Native and Expo, so iOS, Android and the browser come from one codebase.
- **Alternate:** "A web and app studio crafting custom web & app experiences that help people. Working globally, in React Native, Expo and on-device AI." (134 ch) — keeps the mission verbatim (p13) as the first sentence and adds the global correction. Take this if the owner wants the mission to be the fallback description everywhere.
- **Budget:** 50-160 chars (docs/writing-content.md L46-47, the range the content pipeline enforces). This string is also the FALLBACK description for every route that passes none — currently /contact/thanks and /contact/problem (metadata.ts:19).
- **Why:** The current line says "web and app" and then "web & app" nine words later, which is the only literal duplication in shipped copy, and it spends its opening on "visionary" — a self-description that is unfalsifiable and already carried by the title beside it. The replacement swaps the adjective for a consequence clause: naming React Native and Expo with what they buy is the pattern the FAQ already uses (page.tsx:94), and it is the sentence a CTO and a founder read differently but agree on. Zero superlatives, zero first person, one 10+ letter word ("codebase"). "Browser" rather than "web" in the second clause avoids a third "web" in 133 characters.

### `layout.og-locale`

`src/app/layout.tsx:27`

- **Current:** openGraph.locale: 'en_US' (layout.tsx:27 and metadata.ts:52), against <html lang="en"> from site.locale (site.ts:34)
- **Proposed (5 chars):** en_GB
- **Budget:** Fixed BCP-47 / OG locale token. No layout impact.
- **Why:** A copy-consistency finding, not a style choice. The build has already committed to British/international English in three places: Intl.DateTimeFormat('en-GB', ...) in Clock.tsx:27 and lib/contact.ts:105, "licence" in about/page.tsx:24, and "organisational" in page.tsx:117. Declaring en_US to every social scraper while the copy, the dates and the times are all en-GB is the machine-readable half of the site contradicting the written half. Change og:locale to en_GB, and consider site.locale 'en-GB' so <html lang> agrees. Zero visible copy changes; it only affects what crawlers and screen-reader voice selection are told.

### `meta.title./`

`src/app/page.tsx:17`

- **Current:** `${site.name} | ${site.descriptor}` -> "Recurssive | Visionary Web & App Studio" (39 ch)
- **Proposed (39 chars):** Recurssive | Visionary Web & App Studio
- **Budget:** <=70 chars. This one is NOT templated: Next applies title.template to CHILD segments only, and app/page.tsx is the same route segment as app/layout.tsx (node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md L285-289). So it renders exactly as written, with no " | Recurssive" suffix and no doubling. Verified rather than assumed, because the doubling failure is invisible until someone looks at a SERP.
- **Why:** Keep. Brand + p27 descriptor, 39 of 70 characters, and it is the one page where leading with the studio name is right because the query is navigational.

### `meta.description./`

`src/app/page.tsx:18`

- **Current:** none — falls through to site.description (metadata.ts:19)
- **Proposed (137 chars):** A web and app studio crafting custom experiences that help people. React Native and Expo, so iOS, Android and the web share one codebase.
- **Budget:** 50-160 chars. Give / its own description rather than letting it inherit site.description, so the fallback string can be tuned for the two notice routes without dragging the home page with it.
- **Why:** Opens on the mission's own words (p13: "crafting custom web & app experiences that help people") without repeating the title's "web and app studio" a second time, then attaches the consequence clause. Definition by activity, not by category. No first person, no adjective about ourselves, no number to keep.

### `meta.title./about`

`src/app/about/page.tsx:10`

- **Current:** "About" -> renders "About | Recurssive" (18 ch)
- **Proposed (16 chars):** About the studio
- **Budget:** <=57 chars for the child value (70 minus the 13-char " | Recurssive" suffix from layout.tsx:19). Renders 29 chars.
- **Why:** "About | Recurssive" spends 18 of 70 characters and says nothing a result list can use. "About the studio" is sentence case per p212, keeps the p27 noun (studio, never agency), and reads as a page rather than a nav label. Not "About Recurssive" — the template would render "About Recurssive | Recurssive".

### `meta.description./about`

`src/app/about/page.tsx:11`

- **Current:** "Recurssive is a web and app studio in Thessaloniki, Greece." (59 ch)
- **Proposed (109 chars):** Purpose, vision, values, and why recursion runs through all of them. Based in Thessaloniki, working globally.
- **Budget:** 50-160 chars. Current 59 is in range but uses 37% of the slot.
- **Why:** The current line is the one place the site actively contradicts a settled fact: it locates the studio and stops, which reads as a local shop, where the market is global (this supersedes p25). The replacement keeps the location — it is true and it is trust-building — and adds the correction in three words. It also puts recursion in the description, which is the thing that makes this page worth opening: the single-s adjective is correct here (the thesis, p112), against the double-s company name everywhere else.

### `meta.title./capabilities`

`src/app/capabilities/page.tsx:12`

- **Current:** "Capabilities" -> renders "Capabilities | Recurssive" (25 ch)
- **Proposed (49 chars):** Capabilities: consulting, product, enterprise, AI
- **Alternate:** "Capabilities" (12 ch) — keep it bare if the owner would rather the four pillars be discovered on the page than promised in a result list.
- **Budget:** <=57 chars for the child value. Renders 62 of 70. Google truncates by pixel width around 600px, so the tail may clip on the suffix — acceptable, since the four pillars are all in the first 49 characters.
- **Why:** Names all four pillars from deck p29 in the slot where a reader is deciding whether to click, using the claim-then-colon shape the shipped FAQ already uses. Sentence case per p212. "Enterprise Solutions" and "Product Dev" are shortened to their heads to fit; the full pillar names stay on the page itself.

### `meta.description./capabilities`

`src/app/capabilities/page.tsx:13`

- **Current:** "What Recurssive builds, and how each capability is delivered." (61 ch)
- **Proposed (115 chars):** Four pillars and the services under them: consulting, product development, enterprise solutions and AI engineering.
- **Budget:** 50-160 chars.
- **Why:** The current line is structurally fine but abstract — "how each capability is delivered" describes the page rather than the work, and "delivered" is the register the deck's p38/p76 left-hand column warns against (transactional). The replacement is the CLAIM-then-COLON pattern, cashing out the general statement with the four concrete pillars. "enterprise solutions" is a pillar name from p29, not the banned "solutions that scale".

### `meta.title./cases`

`src/app/cases/page.tsx:11`

- **Current:** "Cases" -> renders "Cases | Recurssive" (18 ch)
- **Proposed (5 chars):** Cases
- **Budget:** <=57 chars for the child value. Renders 18. The route carries noIndex:true (cases/page.tsx:15) and is unlinked, so this string reaches a reader only through a shared link preview.
- **Why:** Keep bare. Enriching the title of a page that has nothing on it would be the one genuinely dishonest move available here.

### `meta.description./cases`

`src/app/cases/page.tsx:12`

- **Current:** "Selected work: what the problem was, what we built, what it did." (64 ch)
- **Proposed (113 chars):** What the problem was, what got built, and what changed after. Case studies appear here as work becomes shareable.
- **Budget:** 50-160 chars.
- **Why:** "Selected work" is on the banned list, and it is banned for a reason that applies literally: selection implies a body of work to select from, and there is none. The replacement keeps the three-part shape (problem / build / result) as a description of what a case study will contain rather than a claim that any exist, then says plainly why the page is empty. Passive "what got built" instead of "what we built" also keeps first person out of a sentence that cannot yet back it.

### `meta.title./blog`

`src/app/blog/page.tsx:12`

- **Current:** "Blog" -> renders "Blog | Recurssive" (17 ch)
- **Proposed (44 chars):** Blog: React Native, on-device AI and the web
- **Alternate:** "Blog" (4 ch) — keep it bare if the owner would rather not commit the title to three subjects before any post exists.
- **Budget:** <=57 chars for the child value. Renders 57 of 70 — inside the ceiling with 13 to spare.
- **Why:** "Blog | Recurssive" is 17 of 70 characters and matches nothing anyone searches for. The subjects are the three the studio actually writes about and they are already agreed in the current description, so this only moves them into the slot that gets read first. Sentence case, one colon, no adjective.

### `meta.description./blog`

`src/app/blog/page.tsx:13`

- **Current:** "Notes on React Native, on-device AI and building for the web." (61 ch)
- **Proposed (61 chars):** Notes on React Native, on-device AI and building for the web.
- **Alternate:** "Notes on React Native, on-device AI and building for the web. Written while building rather than after." (103 ch) — only if the title stays bare "Blog", so the subjects are stated once.
- **Budget:** 50-160 chars. Current 61 is in range.
- **Why:** Keep unchanged. This one is not generic — it is already house voice: definition by activity, no first person, no adjective, three concrete subjects. It is the reference the other nine descriptions should be judged against. If the title takes the three subjects (above), consider extending this to avoid an exact echo — but do not do both at once.

### `meta.title./contact`

`src/app/contact/page.tsx:13`

- **Current:** "Contact" -> renders "Contact | Recurssive" (20 ch)
- **Proposed (7 chars):** Contact
- **Alternate:** "Start a project" (15 ch, renders 28) — matches the nav pill so the tab title echoes the button just clicked. Better for the arrival experience, worse for search.
- **Budget:** <=57 chars for the child value. Renders 20.
- **Why:** Keep. "Contact" is what people type, and the comment at contact/page.tsx:11-12 already documents why the site name is not repeated here. The CTA that leads here says "Start a project", which is a different job: the pill persuades, the title is found.

### `meta.description./contact`

`src/app/contact/page.tsx:14`

- **Current:** `Talk to ${site.name} about a web or app project. Based in Thessaloniki, working globally.` -> 87 ch
- **Proposed (106 chars):** Tell Recurssive what you are building, even if it is still rough. Based in Thessaloniki, working globally.
- **Budget:** 50-160 chars. Current 87 is in range and already carries the global correction.
- **Why:** A light improvement, not a rescue — the current line is sound. "Tell us what you're building, even if it's still rough" is the shipped contact lead (page.tsx:568) and reusing its opening makes the result list and the landing page say the same thing, which is the cheapest trust there is. Contractions drop for the meta slot, matching the explanatory register. Deliberately NOT quoting "two working days" here: that promise is currently made in exactly two places (page.tsx:570 and contact/thanks:35) and putting it in a search result makes it a public commitment in a third, which the style rules say must be moved all at once or not at all.

### `meta.title./privacy-policy`

`src/app/privacy-policy/page.tsx:7`

- **Current:** "Privacy Policy" -> renders "Privacy Policy | Recurssive" (27 ch)
- **Proposed (14 chars):** Privacy Policy
- **Budget:** <=57 chars for the child value. Renders 27.
- **Why:** Keep, including the capitals. Deck p212 bans Title Case in headings and body, but a legal instrument's name is a proper noun — the document itself is titled that, the same string is the visible H1 via LegalPage.tsx:70, and lowercasing it would make the site look unsure of what it had published. Flagged rather than silently kept, because it and "Terms of Service" are the only Title Case strings shipping.

### `meta.description./privacy-policy`

`src/app/privacy-policy/page.tsx:8`

- **Current:** "How Recurssive collects, uses and retains personal data, and what rights you have over it." (90 ch)
- **Proposed (125 chars):** What the contact form collects, how long it is kept, and what rights you have over it. No cookies and no cross-site tracking.
- **Budget:** 50-160 chars. Current 90 is in range.
- **Why:** The current line is competent and interchangeable with every privacy description on the web. The replacement names the only thing that actually collects data on this site (the contact form) and then states the differentiator the policy itself backs: "We do not use cookies. This site sets none..." (legal.ts:74) and the cookieless analytics at legal.ts:80. That claim is falsifiable by the reader in one sentence, which is the test. Second person twice, first person zero.

### `meta.title./terms-of-service`

`src/app/terms-of-service/page.tsx:7`

- **Current:** "Terms of Service" -> renders "Terms of Service | Recurssive" (29 ch)
- **Proposed (16 chars):** Terms of Service
- **Budget:** <=57 chars for the child value. Renders 29.
- **Why:** Keep. Same reasoning as Privacy Policy: a document name, not a heading.

### `meta.description./terms-of-service`

`src/app/terms-of-service/page.tsx:8`

- **Current:** "The terms under which Recurssive provides this website and its services." (72 ch)
- **Proposed (120 chars):** The terms this website and its services are provided under: what is agreed, what is not promised, and which law applies.
- **Budget:** 50-160 chars. Current 72 is in range.
- **Why:** Same information, but the colon cashes the claim out into the three things a reader actually wants to know before opening a terms page, and all three are real sections in the document: Acceptance of Terms, Disclaimers, and Governing Law (legal.ts:133, 174, 186). "what is not promised" is the refuse-the-flattering-reading move — a terms page that admits its own limits is more likely to be read than one that does not.

### `meta.title./contact/thanks`

`src/app/contact/thanks/page.tsx:7`

- **Current:** "Message sent" -> renders "Message sent | Recurssive" (25 ch)
- **Proposed (12 chars):** Message sent
- **Budget:** <=57 chars for the child value. Renders 25. noIndex:true (thanks/page.tsx:11), so this reaches a reader only via the browser tab and a shared link.
- **Why:** Keep. Two words, states the outcome, matches the H1's promise without repeating it. Correctly sentence case.

### `meta.description./contact/thanks`

`src/app/contact/thanks/page.tsx:8`

- **Current:** none — inherits site.description, so a confirmation page currently describes itself as "Recurssive is a visionary web and app studio..." (metadata.ts:19)
- **Proposed (59 chars):** Your message reached us and a person will come back to you.
- **Budget:** 50-160 chars. 59 is in range.
- **Why:** A confirmation page inheriting the studio's marketing description is the fallback misfiring: if the URL is ever shared or bookmarked, the preview describes a different page. Short is correct here — there is nothing more to say and the page body already carries the detail. Deliberately does not restate "two working days": that number is already on the page at thanks/page.tsx:35 and repeating it in metadata makes it a third public instance. "a person" rather than "we" keeps first person out of the opening and is checkable — the contact route goes to a human inbox.

### `meta.title./contact/problem`

`src/app/contact/problem/page.tsx:7`

- **Current:** "Message not sent" -> renders "Message not sent | Recurssive" (29 ch)
- **Proposed (16 chars):** Message not sent
- **Budget:** <=57 chars for the child value. Renders 29. noIndex:true (problem/page.tsx:9).
- **Why:** Keep. States the outcome plainly rather than apologising, and it is the honest inverse of the thanks title. Correctly sentence case.

### `meta.description./contact/problem`

`src/app/contact/problem/page.tsx:8`

- **Current:** none — inherits site.description, same misfire as /contact/thanks
- **Proposed (90 chars):** The form did not send. Email support@recurssive.com and the message reaches us either way.
- **Budget:** 50-160 chars.
- **Why:** Follows the error-copy rule exactly: say what to do, not what went wrong. One short statement of fact, then the imperative with the route that works. Matches the page body, which already gives the same address (problem/page.tsx:40-42). No blame, no "unfortunately", no exclamation.

### Open questions - GLOBAL MICROCOPY — nav, footer, newsletter band, mobile menu, filter chips, and the title/description pair for all ten routes

- The newsletter form submits nowhere and there is no list. Newsletter.tsx:59 has no action and no handler, and the comment at :30 says it is deliberately not wired to /api/contact. Any description I write promises something the build cannot yet do. Ship the copy anyway (the field is inert but honest), or hide the whole band until a list exists? This decides whether the description lands now or later — it does not change which description is right.
- Is the newsletter post notifications or a letter in its own right? That is the only genuinely open call in the band, and it is the owner's. Post notifications: "New posts when there are new posts, and nothing in between." A letter: "Notes on what we are building and what we got wrong." Both fit the 57-97 window at 2 lines. Do not decide it by which reads better — decide it by what will actually be sent.
- The footer's Cookies link points at /cookies, which does not exist. There is no src/app/cookies/page.tsx and no rewrite, so Footer.tsx:160 serves a 404 at every viewport from lg up. Fix by pointing it at /privacy-policy#cookies (needs id="cookies" on the section wrapper at LegalPage.tsx:95), or remove the item, which the 768 frames already do. Either is a one-line change; the choice is whether the no-cookies claim stays reachable from the footer.
- Which document does the newsletter consent checkbox bind a reader to? Under GDPR, consent to marketing email is governed by the privacy policy, not the terms of service, and the frame's "terms and conditions" names neither of the two documents this site actually publishes. Also: should the phrase become a link? Right now it asks a reader to accept something they cannot open, which is the one thing a consent control may not do.
- The mobile Menu frame draws six rows — Home, Cases, Capabilities, About, Blog, Contact (Menu__768w.txt:10-21) — and the built drawer renders four. Cases is deliberate. Contact is a judgement call the desktop nav made for a desktop reason (the pill sits beside the links); on a phone the pill sits at the bottom of a scrolling sheet, several hundred pixels below the row where a reader would look for it. Add a Contact row to the drawer only, or leave the pill as the single contact route on mobile?
- One phone format, site-wide. site.ts:33 has "+30 698 950 2436"; the Menu frame draws "(+30) 698 950 2436". I recommend the site.ts form for a global audience, but it is the owner's number and the frames say otherwise. Whatever is chosen, it changes in site.ts and the menu, footer and contact page follow.
- Should anything a human reads say the market is global? Right now the claim exists only in two meta descriptions. The "Where" column could carry it as a fourth line for free — the Contents column beside it already runs five items, so the band height would not move — but that overloads a column that answers "where are you". The alternative is to leave it entirely to /about and /contact body copy, which is not my page.
- og:locale declares en_US (layout.tsx:27, metadata.ts:52) while the build has committed to en-GB in Clock.tsx:27, lib/contact.ts:105, "licence" in about/page.tsx:24 and "organisational" in page.tsx:117. Change og:locale to en_GB and site.locale to 'en-GB'? Zero visible copy change; it only affects what crawlers and screen readers are told. Raising it because the forward rule is "British/international spelling where the choice arises" and this is a place it has already arisen and been answered inconsistently.
- "Privacy Policy" and "Terms of Service" are the only Title Case strings shipping, against deck p212. I kept them — a legal instrument's name is a proper noun and lowercasing it reads as uncertainty — but it is a rule the owner wrote, so it should be an explicit exception rather than an oversight. The same question applies to "Visionary Web & App Studio" (site.ts:26), which is p27 canon and appears in the home <title>.

---

## Appendix A - the voice system

Derived from the brand deck and calibrated against the copy the app already ships in the house
voice (the nine Home FAQ answers, the contact form messages, the thanks/problem pages).

### Style rules

- MEASURE FIRST, WRITE SECOND. Before any slot, derive its budget from the figspec: chars-per-line = box width / (0.48 x font-size) for Open Sans Regular, and / (0.46 x font-size) for Inter Semi Bold display. Verified against six drawn boxes: About recursion para (1128px/16px/3 lines) predicts 441, drawn lorem is 440; Home process intro (421/16/2) predicts 110, drawn is 110; CTA band lead (477/16/2) predicts 124, drawn is 123; Home hero (966/72/2, Inter SB) predicts 58, drawn 'Crafting custom web & app experiences that help people.' is 55. The one outlier is the 500 body (539/20, drawn 62 chars = 0.435em) - that slot has NO slack.
- LAND ON THE DRAWN LINE COUNT EXACTLY. Where the design draws N lines, write N. N-1 reads as a hole; N+1 pushes the band past its drawn height. This is already documented as a real regression in the build: src/app/page.tsx L24-29 records that the short placeholder gave three lines where five were drawn and left the industries band 57px under height.
- SENTENCES AVERAGE 17 WORDS. Measured over the 22 sentences in the nine shipped FAQ answers (src/app/page.tsx L60-106): mean 17.0, min 1, max 32. A paragraph whose mean exceeds 20 is off-register.
- TWO OR THREE SENTENCES PER BODY PARAGRAPH. Shipped distribution is 2,2,2,3,3,2,2,3,3 - never one, never four. Body answers run 211-240 characters (mean 227).
- NEVER OPEN A BODY PARAGRAPH WITH 'We'. Zero of nine shipped answers do. They open with the subject of the question instead: Designing / The / Mobile / Usually / Discovery / Cost / Both / Building / Often. Sole exception: canon lines are placed verbatim, which is why Pt.4 'We create in circles' may open the Home process paragraph.
- PUT 'we' LAST. Both We-initial sentences in the shipped copy are the FINAL sentence of their answer, and both are a commitment: 'We will tell you which yours actually needs.' (L79) and 'We start with an audit of what is there...' (L104). First person is earned at the close, never claimed at the open.
- SECOND PERSON OUTNUMBERS FIRST PERSON. Shipped ratio across the nine answers is 8 you/your/yours to 5 we/us/our. Test: count both. If 'we' leads, rewrite.
- ZERO EM-DASHES IN USER-FACING COPY. Count across all nine FAQ answers, the hero, the FAQ lead, the contact lead, /contact/thanks and /contact/problem: 0. (The code comments use them constantly - that is not the copy voice.)
- AT MOST ONE COLON PER PARAGRAPH, AND ONLY TO CASH OUT THE CLAIM BEFORE IT. Four colons in nine answers, all the same shape: 'The same craft with more constraints: existing systems to integrate with, security and compliance to satisfy, and more people who have to agree.' (L69)
- SEMICOLONS ONLY TO BALANCE TWO ALTERNATIVES. One occurrence in nine answers: 'Web reaches everyone immediately and is cheaper to change; mobile earns its keep when you need the camera, offline use, or a place on the home screen.' (L79)
- NO EXCLAMATION MARKS. Zero in shipped copy. The only '!' anywhere in the system is Figma's variant of Pt.8, which the deck itself (p230) writes with a full stop. The sliders sit at Serious and Matter-of-fact (p40).
- NO CONTRACTIONS IN EXPLANATORY BODY COPY; CONTRACTIONS IN SECOND-PERSON MICROCOPY. The nine FAQ answers contain zero verbal contractions - 'It is not a cheap version', 'that is the shape we like', 'what is already there'. The direct-address strings do contract: 'Tell us what you're building' (L568), 'Thanks, we've got it' (thanks/page.tsx L34), 'That didn't send' (problem/page.tsx L36). Explanation is Formal; addressing a person is not.
- APOSTROPHES AND QUOTES ARE TYPOGRAPHIC, NEVER STRAIGHT. Every shipped string uses U+2019 (page.tsx L74, L104, L568; both notice pages). In JSX props use the literal character, not an entity - problem/page.tsx L31 documents that an entity in a prop renders as the characters '&rsquo;'.
- HEDGE AT THE FRONT OR NOT AT ALL. 'Usually' twice, 'Often' once - all three sentence-initial and all three in position 1 of their answer. Never hedge mid-sentence ('we would probably', 'in most cases we tend to').
- PREFER THE CONTRAST TO THE SUPERLATIVE. 'rather than' x3, 'instead of' x1, 'more than' x1 across nine answers; superlatives about ourselves: zero. The judgement rides on what we are NOT doing.
- NO NUMBERS EXCEPT COMMITMENTS THE BUSINESS WILL KEEP. The nine answers quote zero figures - deliberately, per the note at page.tsx L54-58 ('they become a public promise'). The only number in shipped copy is 'two working days', stated twice (page.tsx L570 and contact/thanks L35). Change both or neither.
- NAME A TECHNOLOGY ONLY WITH ITS CONSEQUENCE ATTACHED. React Native / Expo appear in 2 of 9 answers; both times a clause says what it costs or saves - 'iOS and Android share the same app instead of being built and maintained twice, which is usually the difference between shipping to both and quietly dropping one.' (L94). A tech name with no consequence clause is cut.
- AT MOST ONE WORD OF 10+ LETTERS PER PARAGRAPH. Shipped: 8 distinct in 376 words (compliance, constraints, difference, immediately, increasingly, inheriting, maintained, performance) - all plain register, none Latinate marketing.
- EVERY CLAIM ABOUT US MUST BE FALSIFIABLE BY THE READER IN ONE SENTENCE. 'Inheriting someone else's codebase is normal work here' (L104) is checkable. 'We are passionate about craft' is not, and is cut.
- NO TITLE CASE, ALL-CAPS OR BOLD SENTENCES IN BODY COPY. Deck p212 ('Signs of Reality: No Cap Text') is explicit: 'Humans naturally use lowercase, capping only the very first letter of a sentence or proper nouns'. Headings follow the same rule - the drawn ones are 'What we do best', 'Industries we serve', 'Ready for success?', not Title Case.
- THE COMPANY IS 'Recurssive' (double s); THE ADJECTIVE IS 'recursive' (single s). Both are correct at different jobs - deck p223-230 vs p89-112. Mixing them is the one typo that reads as amateurish. Grep every draft for both.
- BRITISH / INTERNATIONAL SPELLING WHERE THE CHOICE ARISES. The build already commits: Intl.DateTimeFormat('en-GB', ...) in src/lib/contact.ts L105, 'licence' in about/page.tsx L24, 'organisational' in page.tsx L117. No shipped user-facing string forces an -ise/-ize choice yet, so this is a forward rule rather than a correction.
- ERROR AND VALIDATION COPY SAYS WHAT TO DO, NOT WHAT WENT WRONG. Every string in MESSAGES (src/lib/contact.ts L42-62) is imperative - 'Please give your name.', 'Please choose a budget range.' The two that describe describe the input, not the person: 'That looks too short.', 'That email address does not look right.' Never 'You entered an invalid...'.

### Banned

`seamless / seamlessly`, `cutting-edge`, `state-of-the-art`, `elevate`, `unlock`, `empower`, `in today's fast-paced world`, `we don't just X, we Y`, `transform your`, `digital transformation`, `journey (as in 'your journey', 'our journey', 'embark on')`, `solutions that scale`, `passionate about`, `world-class`, `best-in-class`, `industry-leading`, `trusted by`, `loved by`, `X+ happy clients`, `revolutionary`, `disruptive`, `game-changing`, `next-level`, `10x`, `supercharge / turbocharge`, `future-proof`, `end-to-end solution`, `holistic solution`, `synergy`, `rockstar / ninja / guru developer`, `delight / delightful`, `at the end of the day`, `simply / it's that simple / easy as that`, `pixel-perfect`, `AI-powered (as a bare adjective with no object)`, `we build apps that people love (unfalsifiable, and there are no apps to point at)`, `three em-dash-joined clauses used as rhythm - any em-dash at all in user-facing copy`, `any exclamation mark`, `ALL CAPS FOR EMPHASIS (deck p212)`, `a whole sentence set in bold (deck p212)`, `Title Case In Headings Or Body (deck p212)`, `'Recursive' with one s when the company is meant`

### Lexicon - preferred

reliable / reliability (p15, p42, and p40's 'Seriousness stems from reliability'), empathetic / empathy (p15, p42, p40 'Respect stems from empathy'), respectful, responsive, timely, efficient, elegant, thoughtful, approachable, insightful, visionary (p27 descriptor - use of the studio, not of the client), performance (p15, p42, p44-48 'Function'), stability, security, usability, scalability, maintenance, clarity, accessibility, prevention, foresight, growth, strategy, trust, confidence, calm, capable, feel / form / function (p44-50, the tagline's own three), emotion (p76 right), human (p76 right; p81 'Tech for people by people'), people (p13, p83 - preferred over 'users'), instinctive (p76 right), lateral thinking (p38, p76 right), divergent (p76 right), expression (p76 right; p80 'digital expression'), imagination (p36 Creator driver; p76 right), elasticity / elastic (p38, p76 right), experiential (p38, p76 right), independence (p76 right), liberating (p76 right), qualitative (p76 right), soft skills (p76 right), emerge (p76 right - against 'submerge'), recursion (p42 Elements, p89-112), loop, iteration (p112 'It is feedback, memory, iteration'), feedback, memory, base case (p123 - the diamond, the rule that decides stop or continue), flow chart (p42 Elements, p114-120), grid (p42, p197-198, p215), spiral / fractal / self-similarity (p42, p105, p110), 0's and 1's (p42, p219), ask / listen / think (p88 'The most powerful tools we have'), create (p9 'we create to inspire others to create'), craft / crafting (p13, mission verbatim), custom (p13, mission verbatim), studio (p27 'Visionary Web & App Studio'), build / design / ship / fix / audit / read / tell (the shipped copy's own verbs), codebase, constraint, trade-off, scope, estimate, slice, on-device, React Native / Expo (only with a consequence clause attached)

### Lexicon - avoid

robotic (p38 left pole, p76 left - the half that must become balance), strict / strictness (p38, p76 left), distant (p38 left pole; p82 'In a world so distant and apathetic'), tool-focused (p38 left pole - p72 'Tech stack is just means to an end'), transactional (p38, p76 left), analytical, used alone without its instinctive half (p38, p76 left), vertical thinking (p38, p76 left), convergent (p76 left), automated (p76 left) - as a virtue in its own right, predictable (p76 left), sterile / sterilisation (p76 left), common (p76 left - p36 Creator fears Familiarity/Duplication), limiting (p76 left), hard skills, used alone (p76 left), dependence (p76 left), suppression (p76 left), quantitative and rationalism, used alone (p76 left), IQ, used without EQ (p76), agency (p27 settles it as studio; 'Omnics Digital Agency' is the designer's credit, per src/lib/site.ts L25), digital agency, Omnics, Greece / Greek market / 'mainly in Greece' (p25's Where is superseded - the market is global), clients / our clients / client roster, portfolio / case studies / 'selected work' (nothing has shipped; /cases is deliberately empty, unlinked and de-indexed - src/lib/site.ts), our team / the team / 'a team of', founded / since 20XX / years of experience, award-winning / certified partner / accredited, users (prefer 'people' - p13, p83), leverage (verb), utilise, bespoke (prefer 'custom', the mission's own word, p13), reach out (prefer 'get in touch' or 'tell us'), guys / folks / hey / hi there

### Sentence patterns

- CLAIM, THEN THE COLON THAT CASHES IT OUT. A general statement, a colon, then two or three concrete items that prove it. Max one per paragraph. --- Shipped (page.tsx L69): 'The same craft with more constraints: existing systems to integrate with, security and compliance to satisfy, and more people who have to agree.' --- New, for a capability lead: 'On-device AI has one constraint that decides the rest: the model has to fit, load and answer without a network.'
- DEFINITION BY ACTIVITY, NOT BY CATEGORY. Open with a gerund naming what is actually done. Never 'We are a...'. --- Shipped (page.tsx L64): 'Designing and building software people actually use, on a phone, in a browser, or both.' --- New, for the rescue capability: 'Reading a codebase you inherited, before anyone argues about rewriting it.'
- X RATHER THAN Y. The preferred term first, the rejected one second; the judgement rides entirely on the contrast, with no adjective doing the work. --- Shipped (page.tsx L84): 'You see something running early rather than waiting months for a launch date.' --- New: 'The model runs on the phone rather than in someone else's data centre.'
- HEDGE, THEN COMMIT. A one-word sentence-initial hedge that concedes the honest range, then an unhedged commitment later in the same paragraph. --- Shipped (page.tsx L79): 'Usually the honest answer is start with one. ... We will tell you which yours actually needs.' --- New: 'Often, yes. We will say so in the first call if it is not.'
- THE SEMICOLON BALANCE. Two alternatives weighed clause against clause, verdict withheld until the next sentence. At most once per page. --- Shipped (page.tsx L79): 'Web reaches everyone immediately and is cheaper to change; mobile earns its keep when you need the camera, offline use, or a place on the home screen.' --- New: 'A rewrite buys you a clean base; an audit buys you next month.'
- THE CONSEQUENCE CLAUSE. Name a technology, then a 'which is' / 'means' clause saying what it costs or saves. A technology named without one gets cut. --- Shipped (page.tsx L94): 'React Native and Expo mean iOS and Android share the same app instead of being built and maintained twice, which is usually the difference between shipping to both and quietly dropping one.' --- New: 'Expo owns the build pipeline, which is the part that usually eats a week per release.'
- REFUSE THE FLATTERING READING. Say what the thing is not, then what it is. Two short sentences, parallel openings. --- Shipped (page.tsx L99): 'It is not a cheap version of the product. It is the fastest way to find out whether the expensive version is worth building at all.' --- New: 'This is not a discovery workshop. It is two days of reading your code and telling you what it costs you.'
- THE COMMITMENT CLOSE. Final sentence, first person, one action, no adverbs, no adjectives. This is the only place 'We' may start a sentence. --- Shipped (page.tsx L104): 'We start with an audit of what is there, then fix what is costing you most, whether that is performance, the design, or the parts nobody dares change.' --- New: 'We will come back with a figure, not a range.'

### Placing the eight canon lines

| Line | Deck | Goes | Why |
|---|---|---|---|
| If you've seen it before, it's probably Recurssive | p223 | /about - the LAST sentence of the three-line body paragraph under the 'We live & breathe recursion' heading. Slot: docs/design-data/figspec/About__1920w.txt L46-48, TEXT [Open Sans Regular 16px / #6B6B6B / 1128x68] = 3 lines x 147 chars = 441-char budget (the drawn lorem is 440). The line is 49 chars, leaving ~390 for the two sentences that set it up. 768 counterpart: About__768w.txt L143-145, same 48px heading, paragraph eight words shorter. | The line has two readings and only one of them is honest today. Read as reach ('you have already used our work') it is an invented fact: there is no client work, which is why /cases is empty, unlinked and de-indexed (src |
| Got an idea that keeps coming back? Contact us | p224 | The shared CTA band ('Let's build your vision' + lead + Send Message), as the OPENING sentence of the lead paragraph. One component across five frames: About__1920w.txt L12-13, Cases__1920w.txt L8-9 and Capabilitiy__1920w.txt L17-18 all draw [Open Sans Regular 16px / #FAFAFA / 477x72 / CENTER] = 3 lines; Capabilities__1920w.txt L9 draws the same slot at 477x48 = 2 lines. Budget is 62 chars/line, so write to the SHORTEST instance: 2 lines, 124 chars. The line is 46, leaving 78 for one follow-on sentence. NOT the heading - 'Let's build your vision' is [Inter Semi Bold 48px / 448x96] = 2 lines x 20 chars = 40, and a 46-char line breaks it to three and pushes the band on five pages. | The line's second half is an instruction, so it belongs where the reader is not yet at a form - which is exactly the set of pages this band covers, and excludes the two pages that already have one (Home has its own 'Read |
| Tech we use on repeat | p225 | Already drawn and settled - /capabilities/[slug], the tech-stack band heading. figspec/Capabilitiy__1920w.txt L41 [Inter Semi Bold 48px/100% ls-5 / #FAFAFA / 475x58] = one line; 768 counterpart Capabilitiy__768w.txt L215. Verbatim, no budget decision. What sits beneath it is chip rows (Frame 3 'React.js' @163,5085; Frame 62 @163,5314), so this is a heading with no lead paragraph to write. | The deck annotates it '(for our tech stack list)' and the file has already placed it there, so the only live decision is where NOT to duplicate it. It must not migrate onto Home's 'What we do best' index, which is servic |
| We create in circles | p226 | / (Home) - the OPENING sentence of the Our Process intro paragraph, currently LOREM at src/app/page.tsx L526. Slot: figspec/Home__1920w.txt [Open Sans Regular 16px / #EAEAEA / 421x37] = 2 lines x 55 chars = 110-char budget (the drawn lorem is exactly 110). The line is 21 chars with its full stop, leaving ~88 for one follow-on sentence. At 768 the build already pins this to two lines via max-w-[610px] (page.tsx L525-526). | This is the only band on the site where the working method is drawn as a loop rather than a list. The four steps sit on the logo's own flowchart shapes (page.tsx L108-114); the logo IS a recursive flowchart whose diamond |
| Stay in the loop | p227 | Already drawn and settled - the newsletter band on /blog and /blog/[slug]. figspec/Blog__1920w.txt L3-4 and Post__1920w.txt L3-4, [Inter Semi Bold 48px ls-5 / #FAFAFA / 323x96]: 16 chars at 0.46em is 353px against a 323 box, so it is drawn as TWO lines ('Stay in the / loop'). Keep the box; do not widen it to force one line. 768: Blog__768w.txt L96, Post__768w.txt L116, CENTER - and both 768 frames drop the lead paragraph entirely. The writable slot is the 1920-only lead: Blog__1920w.txt L5-6 [Open Sans Regular 16px / #6B6B6B / 374x48] = 2 lines x 49 chars = 97 chars. | The deck annotates it '(Newsletter CTA)' and both blog frames already carry it, so placement is not in question. The work left is those 97 characters, and the register makes their job non-negotiable: say what actually ar |
| We looked again and again but found nothing. | p228 | The 404 - already shipping at src/app/not-found.tsx L35 and drawn at figspec/404__1920w.txt [Open Sans Regular 20px / #6B6B6B / 441x27 / CENTER] = one line, 46-char budget. The deck string is 44 chars and fits; Figma's variant 'found nothing...' is 45 and also fits. RECOMMENDED CHANGE: replace the shipped ellipsis with the deck's full stop. Heading stays '404 Not found' as drawn. | Placement is not an argument here - the file drew it into the frame. The only live decision is the deck-vs-Figma drift the knowledge base already logs as defect P4 (RECURSSIVE-KNOWLEDGE-BASE.md L304). Take the deck: p40  |
| Try to refresh the page. If it doesn't work, circle back later. | p229 | The error boundary - already shipping verbatim at src/app/error.tsx L49, drawn at figspec/500__1920w.txt [Open Sans Regular 20px / #6B6B6B / 539x27 / CENTER] = one line. THIS IS THE TIGHTEST TEXT FIT IN THE SYSTEM: 62 characters in 539px is 8.69px/char (0.435em) against a 0.48em system mean, so there is no slack at all. Do not add a word. Do not restore the drawn '500 Server error' heading either - error.tsx L17-19 already records why the shipped heading is generic ('this boundary catches client render errors too, where 500 would be a lie'). | Already placed and already correct, and it is the best-argued line in the whole set - two sentences, mechanism then reassurance, no apology, no blame, and the recursion pun lands on 'circle back' where it costs the reade |
| Basically you found an empty page about an empty page. | p230 | NOT SHIPPING ANYWHERE TODAY - the only canon line with no home in code. It is a state, not a route: it belongs in the zero-item branch of /cases (src/app/cases/page.tsx) and /blog (src/app/blog/page.tsx), rendered through NoticeBlock, whose own doc comment already claims the case ('Notice covers a 404, a failure, a confirmation and an empty list' - src/components/NoticePage.tsx L9-13). Drawn at figspec/No Content__1920w.txt [Open Sans Regular 20px / #6B6B6B / 533x27 / CENTER] = one line, 56-char budget; the deck string is 53 and fits. Heading as drawn: 'No content available' [Inter Semi Bold 72px / 657x87 / CENTER]. RECOMMENDED: the deck's full stop, not Figma's exclamation mark. | This matters now rather than later. /cases is empty, unlinked and de-indexed by deliberate decision (src/lib/site.ts), so the empty state is the actual state of that page today, not a theoretical branch. Two decisions ri |

### Register notes

"HOW 50/50 ACTUALLY WORKS. The deck's two ratios (p40: '50% tech, 50% non-tech language' and '50% logic, 50% emotion') are not page-level averages and not alternation between paragraphs. Page 76 titles the mechanism outright - 'The Battle Must Become Balance' - and pairs the halves as a table: Logic/Emotion, Think/Feel, Tools/Solutions, Analytical/Instinctive, Hard skills/Soft skills, IQ/EQ. Balance, not averaging. So the unit is the SENTENCE, and usually the two halves either side of a comma. A page that is technical for three paragraphs and warm for one has failed the ratio even though the arithmetic works.\n\nCASHING OUT 50% TECH / 50% NON-TECH. Rule: any sentence that names a technology must also name a human consequence, and the consequence goes last. Put the concrete noun (React Native, Expo, an on-device model, a codebase) in the subject, and what it does to the person paying in the predicate. p72 is the authority - 'Tech stack is just means to an end' - so the stack is never the sentence's destination.\nBEFORE: 'We leverage React Native and Expo to deliver seamless cross-platform excellence.' (all tech, no consequence, two banned words, unfalsifiable)\nAFTER (shipped, page.tsx L94): 'React Native and Expo mean iOS and Android share the same app instead of being built and maintained twice, which is usually the difference between shipping to both and quietly dropping one.'\nThe failure runs the other way too. A sentence with no technology in it at all is not warm, it is empty.\nBEFORE: 'We build human-centred digital experiences.' (all non-tech, nothing to check)\nAFTER (shipped, page.tsx L64): 'Designing and building software people actually use, on a phone, in a browser, or both.' The tech content is three words - phone, browser, both - and that is enough to make the sentence about something.\n\nCASHING OUT 50% LOGIC / 50% EMOTION. The logic half is a mechanism, a constraint or a trade-off. The emotion half is what that mechanism feels like to the person paying for it. Crucially, p40 pins both to trust rather than to enthusiasm: 'Seriousness stems from reliability' and 'Respect stems from empathy'. So the emotion in this voice is RELIEF, never excitement. If a sentence makes the reader feel energised rather than unworried, it is the wrong emotion for this brand.\nBEFORE: 'Our process is transparent, collaborative and built around you.' (emotion only, three adjectives, nothing falsifiable)\nAFTER (shipped, page.tsx L84): 'You see something running early rather than waiting months for a launch date. That is also how the estimate stays honest.' Sentence one is the mechanism, sentence two is the relief. One each, in that order.\nBEFORE: 'Cost is a function of scope, platform count, integration surface and novelty.' (logic only - accurate, and reads like a rate card)\nAFTER (shipped, page.tsx L89): 'Cost tracks scope more than hours: how many platforms, how much of it is genuinely new, and what it has to integrate with. Tell us what you are building and we will come back with a figure tied to that, rather than a range that fits anyone.' The whole emotional load is carried by one clause - 'rather than a range that fits anyone' - which is about 12% of the words and 100% of the reassurance. That is the correct proportion. Emotion is a clause, not a paragraph.\nTHE TWO-DELETION TEST. Delete the emotional half: would a CTO notice anything missing? Delete the logical half: would a founder still believe it? Both answers must be yes.\n\nTHE 80/20 ARCHETYPE AS A VERB RATIO. p36 sets 80% Creator / 20% Sage. That cashes out as roughly four making verbs per knowing verb across a page. Creator verbs: build, design, craft, ship, cut, draw, write, fix. Sage verbs: ask, listen, think, read, audit, tell - and p88 names the Sage triad exactly, 'The most powerful tools we have: Ask, Listen, Think'. The Sage verbs cluster at the two ends: at discovery ('We start with an audit of what is there', L104) and at the commitment ('We will tell you which yours actually needs', L79). The middle of a paragraph is Creator territory. A page that is all Sage reads as consultancy and sells nothing; a page that is all Creator reads as a shop.\n\nWHAT 'FORMAL' MEANS HERE, AND WHAT IT DOES NOT. Formal in this voice shows up as full forms in explanation - 'It is not a cheap version', 'what is already there' - and as the absence of slang. It does NOT mean Latinate vocabulary: the shipped copy is formal and near-monosyllabic at the same time, with only 8 words of ten letters or more across 376. The test is spoken: if you would not say the sentence to a client across a table, it is not Formal, it is stiff. Note the deliberate split - explanation does not contract, direct address does ('Tell us what you're building', 'Thanks, we've got it', 'That didn't send'). Formality is a property of exposition, not of manners.\n\nTHE HONESTY CONSTRAINT IS PART OF THE REGISTER, NOT A LIMITATION ON IT. There is no client work, no team size, no founding year, no awards. That removes every conventional trust device, which is why the shipped copy builds trust the only way left: by conceding things. 'Usually the honest answer is start with one.' 'Cost tracks scope more than hours.' 'Inheriting someone else's codebase is normal work here.' Each of those tells the reader something that costs the studio a little to say, and that concession IS the empathy p40 asks for. When a slot structurally demands a fact that does not exist, the move is not to soften the claim - it is to swap the claim for a concession. Two of these are already load-bearing business commitments settled by the owner (page.tsx L54-58): the cost answer quotes no figures and the timeline answer describes phases rather than weeks. Adding a number to either turns copy into a public promise."

---

## Appendix B - measured slot inventory

46 slots measured off the figspec.

| Page | Slot | File:line | Box | Size | Lines | Budget |
|---|---|---|---|---|---|---|
| / | `home.service-description-01-desktop-apps` | `src/app/page.tsx:38` | 878 | 16 | 2 | 126-143 chars. 1920: 878px @16px Open Sans Regular = 119.5 ch/line, drawn 2 lines (box 878 |
| / | `home.service-description-02-mobile-apps` | `src/app/page.tsx:39` | 878 | 16 | 2 | 126-143 chars (same slot geometry as row 01). |
| / | `home.service-description-03-web-design` | `src/app/page.tsx:40` | 878 | 16 | 2 | 126-143 chars (same slot geometry as row 01). This is the ACTIVE row in the design — the o |
| / | `home.service-description-04-uiux-design` | `src/app/page.tsx:41` | 878 | 16 | 2 | 126-143 chars (same slot geometry as row 01). |
| / | `home.service-description-05-ai-workflows` | `src/app/page.tsx:42` | 878 | 16 | 2 | 126-143 chars (same slot geometry as row 01). |
| / | `home.service-description-06-product-strategy` | `src/app/page.tsx:43` | 878 | 16 | 2 | 126-143 chars (same slot geometry as row 01). |
| / | `home.industries-lead` | `src/app/page.tsx:304` | 651 | 32 | 3 | 101-137 chars. 1920 ONLY: 651px @32px Open Sans SemiBold ls-5% = 48.1 ch/line, drawn 3 lin |
| / | `home.industry-body (x3 — Startups / SMBs / Enterprise)` | `src/app/page.tsx:358` | 441 | 18 | 5 | 235-249 chars each. 1920: 441px @18px = 53.4 ch/line (col 1 is 434px = 52.5), drawn 5 line |
| / | `home.process-step-body-01-ask` | `src/app/page.tsx:110` | 696 | 18 | 3 | 66-90 chars (768 governs; the two frames CONFLICT). 1920: 696px @18px = 84.2 ch/line, draw |
| / | `home.process-step-body-02-listen` | `src/app/page.tsx:111` | 696 | 18 | 3 | 66-90 chars (same conflict and resolution as step 01). |
| / | `home.process-step-body-03-think` | `src/app/page.tsx:112` | 696 | 18 | 3 | 66-90 chars (same conflict and resolution as step 01). |
| / | `home.process-step-body-04-create` | `src/app/page.tsx:113` | 696 | 18 | 3 | 66-90 chars (same conflict and resolution as step 01). |
| / | `home.process-intro` | `src/app/page.tsx:526` | 421 | 16 | 2 | 62-109 chars. 1920: 421px @16px = 57.3 ch/line, drawn 2 lines (box 421x37) -> 60-109. 768: |
| / | `home.faq-intro (ALREADY REAL — reference)` | `src/app/page.tsx:407` | 374 | 18 | 2 | 48-85 chars; currently 73, in budget at both widths. 1920: 374px @18px = 45.3 ch/line, 2 l |
| / | `home.faq-answer (x9) (ALREADY REAL — reference)` | `src/app/page.tsx:63` | 640 | 16 | 4 | 274-331 chars at 1920 (640px @16px = 87.1 ch/line, drawn 4 lines in a 640x91 box; STATE.md |
| / | `home.contact-lead (ALREADY REAL — over the drawn box)` | `src/app/page.tsx:568` | 407 | 16 | 2 | 60-105 chars. 1920: 407px @16px = 55.4 ch/line, drawn 2 lines (box 407x72, which has slack |
| /cases | `cases.page-intro` | `src/app/cases/page.tsx:100` | 467 | 16 | 2 | 67-112 chars. 1920: 467px @16px = 63.6 ch/line, drawn 2 lines (box 467x44) -> 67-121. 768: |
| /cases | `cases.case-description-01` | `src/app/cases/page.tsx:38` | 608 | 16 | 5 | 376-393 chars. 1920: 608px @16px = 82.8 ch/line, drawn 5 lines (box 608x135) -> 348-393. 7 |
| /cases | `cases.case-description-02` | `src/app/cases/page.tsx:50` | 608 | 16 | 5 | 376-393 chars (same geometry as card 01). BLOCKED ON FACT. |
| /cases | `cases.case-description-03` | `src/app/cases/page.tsx:62` | 608 | 16 | 5 | 376-393 chars (same geometry as card 01). BLOCKED ON FACT. |
| /cases | `cases.case-description-04` | `src/app/cases/page.tsx:74` | 608 | 16 | 5 | 376-393 chars (same geometry as card 01). BLOCKED ON FACT. |
| /cases | `cases.metric-label (x12)` | `src/app/cases/page.tsx:40` | 74 | 12 | 1 | 1-13 chars, ONE line. 1920: drawn box 74x16 @12px is auto-width — 74px is exactly the adva |
| /cases | `cases.metric-value (x12) — INVENTED NUMBERS` | `src/app/cases/page.tsx:40` | 65 | 36 | 1 | 1-4 chars (Inter Semi Bold 36px ls-5%, auto-width boxes 57-96px at 1920). These are transc |
| /blog | `blog.page-intro` | `src/app/blog/page.tsx:67` | 467 | 16 | 2 | 67-112 chars. 1920: 467px @16px = 63.6 ch/line, drawn 2 lines (box 467x44 @1291,186). 768: |
| /blog | `blog.post-title (x9)` | `src/app/blog/page.tsx:40` | 380 | 32 | 1 | 1-26 chars, ONE line — and 26 is where the design sits, not headroom. 1920: Inter Semi Bol |
| /blog | `blog.post-description (x9)` | `src/app/blog/page.tsx:42` | 477 | 16 | 2 | 68-113 chars. 1920: 477px @16px = 64.9 ch/line, drawn 2 lines (box 477x72 — the box has sl |
| /blog and /blog/[slug] | `newsletter.description` | `src/components/Newsletter.tsx:55` | 374 | 16 | 2 | 62-97 chars. 1920: 374px @16px = 50.9 ch/line, drawn 2 lines (box 374x48) -> 53-97. 768: 6 |
| /capabilities | `capabilities.page-intro` | `src/app/capabilities/page.tsx:38` | 467 | 16 | 2 | 67-112 chars. Same PageHeader geometry as Cases and Blog: 1920 467px @16px 2 lines (box 46 |
| /capabilities | `capabilities.pillar-description-consulting` | `src/content/capabilities-index.ts:36` | 754 | 16 | 2 | 187-195 chars. 1920: 754px @16px = 102.7 ch/line, drawn 2 lines (box 754x70 — slack for 3) |
| /capabilities | `capabilities.pillar-description-product-dev` | `src/content/capabilities-index.ts:70` | 754 | 16 | 2 | 187-195 chars (same geometry as Consulting). |
| /capabilities | `capabilities.pillar-description-ai-engineering` | `src/content/capabilities-index.ts:100` | 754 | 16 | 2 | 187-195 chars (same geometry as Consulting). |
| /capabilities | `capabilities.pillar-description-enterprise-solutions` | `src/content/capabilities-index.ts:130` | 754 | 16 | 2 | 187-195 chars (same geometry as Consulting). NB the 1920 frame draws 198 ch here and 199 o |
| /about | `about.hero-story-paragraph` | `src/app/about/page.tsx:71` | 846 | 16 | 3 | 242-328 chars (1920 governs; frames CONFLICT). 1920: 846px @16px = 115.2 ch/line, drawn 3  |
| /about | `about.purpose-body` | `src/content/about.ts:22` | 620 | 16 | 3 | 187-225 chars. 1920: 620px @16px = 84.4 ch/line, drawn 3 lines (box 620x66) -> 177-241. 76 |
| /about | `about.vision-body` | `src/content/about.ts:27` | 620 | 16 | 3 | 187-225 chars (same geometry as Purpose). |
| /about | `about.mission-body` | `src/content/about.ts:32` | 620 | 16 | 3 | 187-225 chars (same geometry as Purpose). |
| /about | `about.value-body (x5 — Reliability/Empathy/Performance/Foresight/Creativity)` | `src/content/about.ts:45` | 266 | 14 | 3 | 87-106 chars each. 1920: 266px @14px = 41.4 ch/line, drawn 3 lines (box 266x79) -> 87-118. |
| /about | `about.recursion-paragraph` | `src/app/about/page.tsx:166` | 1128 | 16 | 3 | 435-438 chars — the tightest window on the site. 1920: 1128px @16px = 153.6 ch/line, drawn |
| /about | `about.process-step-body (x5 — Start/Process/Decide/Process/End)` | `src/content/about.ts:61` | 230 | 16 | 4 | 103-119 chars each. 1920: 230-231px @16px = 31.3 ch/line, drawn 4 lines (box 230x79) -> 99 |
| /about, /cases, /capabilities, /privacy-policy, /terms-of-service | `buildvision.body (ALREADY REAL — under the 768 budget)` | `src/components/BuildVision.tsx:62` | 477 | 16 | 2 | 100-123 chars. 1920: 477px @16px = 64.9 ch/line, drawn 2 lines (box 477x72) -> 68-123. 768 |
| /privacy-policy, /terms-of-service | `legal.page-intro — DRAWN BUT NOT BUILT` | `src/components/LegalPage.tsx:77` | 606 | 24 | 2 | 62-112 chars, if it is built. 768 ONLY: 606px @24px ls-3% = 58.9 ch/line, drawn 2 lines (b |
| / (error boundary) | `error.heading — PROVISIONAL` | `src/app/error.tsx:48` | 764 | 72 | 1 | Max ~20 chars, one line. Inter Semi Bold ls-5% ramped 36px->72px; the block is the artwork |
| / (error boundary) | `error.body (canon Pt.7 — wraps wider than drawn)` | `src/app/error.tsx:49` | 539 | 20 | 1 | 32-46 chars to match the build's own measure; the drawn string is 63 and needs 539px. The  |
| /404 | `notfound.body (canon Pt.6 — in budget)` | `src/app/not-found.tsx:35` | 441 | 20 | 1 | 45 ch measures 440px against a drawn 441 box and a build cap of 450.8 — one line at 1920,  |
| /contact/thanks | `thanks.heading + description — PROVISIONAL` | `src/app/contact/thanks/page.tsx:34` | 764 | 72 | 1 | Heading: max ~20-23 chars, one line (measures 649px at 72px / 469px at 52px — comfortable) |
| /contact/problem | `problem.heading + description — PROVISIONAL` | `src/app/contact/problem/page.tsx:36` | 764 | 72 | 1 | Heading: 17 ch = 525px at 72px, well inside the 764 cap. Description: same 32-46 char draw |

### Inventory notes

HOW THE BUDGETS WERE DERIVED (so you can re-run or challenge any of them)

The figspec files in D:/johnn/Projects/recurssive/app/docs/design-data/figspec carry the string, the font, the size, the tracking and the WxH box, but NOT the node positions. The positions come from the v2 dump at C:/Users/johnn/AppData/Local/Temp/claude/D--johnn-Projects-recurssive/bdab32a0-2cc5-4ff3-b027-d031e8227310/scratchpad/v2/figspec/ (STATE.md §"figtree_v2.py now emits @x,y"). Strings and boxes are identical in both; every @x,y quoted above is from v2.

Character density is MEASURED, not estimated. I parsed the app's own webfonts out of D:/johnn/Projects/recurssive/app/.next/static/media (woff2 -> brotli -> table directory -> hmtx/cmap) and computed real advance widths. Scripts are in the scratchpad: woff2.mjs (parser), density.mjs (per-character density), analyse.mjs (figspec reader), final.mjs (the budget table).

Three independent checks say the model is right to under 1%:
- Open Sans Regular, the 231-char LOREM_LONG at 18px = 1967.88px. STATE.md's own canvas measurement is 1967.9.
- "(02)" at 14px = 24.27px against a drawn auto-width box of 25 (Figma ceils).
- Inter Semi Bold at 1.03x the 400-weight default instance reproduces every auto-width heading box: 466 vs a drawn 464 ("404 Not found" @72), 523 vs 525 ("500 Server error"), 440 vs 441 and 538 vs 539 for the two notice bodies.

Density constants, for anything measured later:
- Open Sans Regular, HOUSE VOICE (measured across all nine shipped FAQ answers plus the two contact leads, 2258 characters): 0.459 em per character.
- Open Sans Regular, lorem ipsum: 0.4733 em per character — lorem is 3% WIDER per character than the copy actually shipped, so a lorem-length budget is slightly conservative.
- STATE.md's "686px at 16px = ~86 characters" was a round estimate; measured against the real answers it is 93.4. That does not change the 250-340 figure it produced, which is right for 3-4 lines.
- Open Sans auto line-height 1.3618 em; Inter 1.2100 em.

Budget arithmetic: to land on exactly N lines you need more than (N-1) full lines and less than N. I report [round((N-1) x ch/line x 1.05), round(N x ch/line x 0.95)] — the 5% either side is the slack a ragged right edge eats. Where the two frames both draw the slot, the reported budget is the INTERSECTION of the two ranges.

Numeric columns are the 1920 frame throughout (except the legal intro, which exists only at 768) so the columns compare; where 768 sets the ceiling the charBudget string says so.

--------------------------------------------------------------------
WHERE THE TWO FRAMES DEMAND INCOMPATIBLE LENGTHS

Three real conflicts, no overlap at all:

1. Home process step bodies (src/app/page.tsx:110-113). 1920 wants 177-240 chars in a 696px column; 768 wants 66-90 in a 316px one. Both draw 3 lines. This is the same failure STATE.md already records ("the file's 768 step body is 88 characters in a 321 column, ours is 123, which is five lines instead of three"). Write 66-90. GAPS is a floor rather than a fixed height, so at 1920 the band just closes up.

2. About hero story paragraph (src/app/about/page.tsx:71). 1920 wants 242-328 in an 846px column (3 lines); 768 wants 346-358 in a 485px one (8 lines). Write to 1920 — the build never applies the 485px cap at 768, it uses the full 610 column, so the narrow layout is roomier than the frame.

3. Newsletter description (src/components/Newsletter.tsx:55). Not a conflict but worth naming: the frames use two different placeholder strings for the same element, 79 chars at 1920 and 110 at 768. The intersection is 62-97.

Two more that are nearly conflicts — windows under 15 characters wide, so they need hitting deliberately rather than approximately:
- About recursion paragraph: 435-438 chars (a 4-character window).
- Home industry bodies: 235-249.
- Capabilities pillar descriptions: 187-195.

The general pattern, which holds everywhere: the 768 frame uses SHORTER strings for the same element but sets them in a much narrower column at a much larger size, so it usually ends up demanding MORE characters than 1920, not fewer. The exception is the process steps, where 768 is drastically tighter. Do not assume one direction.

--------------------------------------------------------------------
WHERE THE DESIGN DRAWS SOMETHING THE CONTENT LAYER CANNOT SUPPLY

- /cases is the big one. Four case descriptions of 376-393 characters each, twelve metric labels, and twelve metric VALUES (30x, +54%, 10K$, 15x, +89%, 16K$, 19x, +33%, 51K$, 23x, +11%, 70K$). There is no real client work. The values are currently transcribed from the frame and read as genuine results; content/cases/placeholder-fintech-app.mdx goes further and states "Cutting cold start by 63% for a fintech app", "Placeholder Client", -63% / 99.4% / -41%. The MDX body carries an honest "This is placeholder content" banner, but the frontmatter does not, and the frontmatter is what /cases and the metadata render. Honest alternative: leave /cases as it is (already unlinked and noindex on both the index and the detail route, per src/lib/site.ts) and do not write copy for it until there is one real engagement. If a public /cases is needed before then, the only defensible version is a "what we would measure" page with no numbers — which is a different design, not different copy.

- Blog post titles have no two-line state. The drawn box is 380x39 at 1920 — exactly one 32px line, fitted to a 26-character string. Real post titles run 40-70 characters. The build's card is ~504px wide so 26-40 still holds one line, but past that the design has no answer. Flag to the designer rather than writing 26-character titles.

- The nine blog cards and the four case cards all render ONE shared string today (blog/page.tsx:39-47 maps one object; cases/page.tsx repeats LOREM). Same for Home's three industry bodies (page.tsx:358 — the `industries` array at 118-122 has no body field), About's five value bodies (about.ts:43-46) and About's five process step bodies (about.ts:59-62). Each of those needs the content shape to gain a per-item field before distinct copy can exist. That is a code change, not a copy change, and it is worth doing in the same commit as the copy.

- Legal page intro. The knowledge base is right that both legal pages carry a lorem subtitle, but only at 768: a 606x63 box at 24px ls-3% at @83,235 on both Privacy Policy__768w and Terms of Service__768w. The 1920 frames draw no such node. LegalPage.tsx has no intro prop at all, so the slot does not exist in code. Decide whether to build it before writing for it.

- The Home 1920 frame draws a COOKIE BANNER ("We use cookies…" plus a 102-char lorem line in a 338x38 box at 14px, @1357,798). The build has no banner — STATE.md lists it as an owner decision, and content/legal.ts states plainly that the site sets no cookies. If the banner never ships, that lorem never needs copy.

- The "No Content" frame (1920 and 768) exists with its own canon line — Recurssive Language Pt.8, drawn verbatim as "Basically you found an empty page about an empty page!" — but NO route uses it. NoticePage supports it; nothing calls it with that copy. Candidate: an empty /blog or /cases filter result once filtering is wired.

- The three detail templates — Case__1920w/768w (15 and 12 lorem nodes), Capabilitiy__1920w/768w (27 each) and Post__1920w/768w (7 and 5) — are fully designed and NOT built. /cases/[slug], /capabilities/[slug] and /blog/[slug] render unstyled MDX today. I have not itemised those slots because there is no code to attach them to; they become a second inventory when those templates get built.

--------------------------------------------------------------------
SLOTS WHERE THE BUILD DOES NOT REPRODUCE THE DRAWN MEASURE

Worth knowing before writing to a drawn box that the build will not enforce:

- About value bodies: drawn 266px at 14px (3 lines); the build gives the column ~558px with no max-width (about/page.tsx:149), so the same copy renders one line.
- NoticeBlock body: drawn 539px on the 500 frame and 533 on No Content (~70% of the artwork); the build caps at max(59%, 22ch) = 450.8px, derived from the 404 frame's 441px. The canon Pt.7 line therefore wraps to two lines where the frame draws one.
- Home process intro: drawn 421px at 1920; the build uses lg:max-w-xl (576px). Harmless — it only buys slack.
- Home contact lead: drawn 407px; the build uses max-w-md (448px), which is why the current 115-character sentence looks fine despite being 10 over the drawn 2-line budget.
- Cases metric labels: drawn 74px auto-width; the build's grid cell is ~192px.
- ServiceIndex descriptions and the Newsletter description DO match their drawn boxes exactly at both breakpoints — those two budgets are enforced by the build.

One more: the build ships `.t-body` at 22px at 768 where every frame draws 24 (STATE.md already flags this, and PageHeader.tsx records it for the four index intros). The effect on these budgets is under 2% — the build is very slightly narrower per character than the drawn 24px ls-3%, so every 768 budget above is marginally conservative rather than optimistic.

--------------------------------------------------------------------
REFERENCE REGISTER

The nine FAQ answers (src/app/page.tsx:60-106), the contact lead (568), the BuildVision body (BuildVision.tsx:62), the ContactDetails body (ContactDetails.tsx:65) and the contact form's MESSAGES (src/lib/contact.ts) are the only body copy already written in the house voice. They run 88-240 characters, sit at 0.459 em per character, and are the target register for everything above. The FAQ answers are deliberately under their drawn budget — 211-240 against a drawn 274-331 — which is a useful precedent: under-filling a box shortens a band, over-filling one moves everything below it.
