# Recurssive — Brand Voice & Verbal Identity

**Derived 2026-08-10.** Two independent sources, read separately and then reconciled:

| Source | What it gives | How it was read |
|---|---|---|
| `Recurssive Branding Presentation.pdf`, 241pp | The **declared** voice | Full text layer + vector geometry of the slider pages + page renders |
| The shipped site (`app/src`, `app/content`) + 31 Figma frames | The **observed** voice | Split by provenance — see the warning below; 181 drawn strings |

Everything below carries a page number, a file and line, or a measurement. Where the two
sources disagree, the disagreement is stated rather than smoothed over (§8).

> ## ⚠ Provenance — read before trusting any "observed voice" claim
>
> **Not all copy in this repo is the owner's, and the difference is load-bearing.** `git status`
> draws the line exactly: the Home body copy is **uncommitted work from an agent session the owner
> rejected**, and it must not be read as evidence of the house voice. Three tiers:
>
> | Tier | What | Status |
> |---|---|---|
> | **A. Owner's own hand** | Two commits with hand-typed messages: `3145c21` "updated copy in ContactDetails" and `9fcce50` "Updated copy in Ready for Success" | The only strings demonstrably written or edited by the owner |
> | **B. Tolerated** | The nine FAQ answers (`c56db59`, 08-05), legal, contact microcopy, the utility states. Committed, and left untouched through five later working days in the same files | Not approved, but survived contact |
> | **C. Rejected** | The six service rows, four process bodies, three industry bodies and two lead paragraphs — the whole uncommitted `git diff` on `src/app/page.tsx` | **Owner is not happy with it. Do not cite it as the voice.** |
>
> §5 measures B and C separately, because the difference between them is the most useful
> finding in this document.

---

## 1. The short answer

> **A serious, respectful studio voice that stays deliberately half-technical and half-human,
> leads with the question rather than the answer, and refuses every number it cannot stand
> behind. It is warm without being enthusiastic, plain without being dry, and it puts all of its
> humour into recursion jokes that live in named slots and nowhere else.**

The distinguishing move is not a word or a rhythm. It is **balance held under two absolutes** —
and that is the deck's own explicit instruction, not an interpretation (§2).

---

## 2. The governing principle: "The Battle Must Become Balance" (p76)

Deck p76 lays out **29 opposing pairs** — Logic/Emotion, Robotic/Human, Tools/Solutions,
Analytical/Instinctive, Vertical Thinking/Lateral Thinking, Iteration/Recursion, IQ/EQ,
Hard skills/Soft skills — under the heading *"The Battle Must Become Balance."*

The instruction is not to pick a pole. It is to hold both. This single page explains every other
verbal decision in the deck, and it is the reason the Brand Voice sliders look the way they do.

### 2.1 Brand Voice, measured (p40)

The page draws four tracks. Marker positions measured off the vector geometry — track runs
x270→x849pt, midpoint 559.5pt, marker diameter 59.8pt:

| Axis | Marker centre | Reading |
|---|---|---|
| Formal ↔ Casual | **558.9pt (49.9%)** | **Dead centre** |
| Serious ↔ Funny | 303.9pt, left edge flush at 274.0 against a track starting at 270.0 | **Serious, at the stop** |
| Respectful ↔ Irreverent | 303.9pt, same flush left edge | **Respectful, at the stop** |
| Matter-of-fact ↔ Enthusiastic | **558.9pt (49.9%)** | **Dead centre** |

**Two axes are maxed out. Two are at exact 50/50.** That is the whole voice in one diagram.

The page's four grey annotations are **per-row glosses**, not general notes — each sits on its own
axis's baseline (measured: y303.7 against the Formal label at y300, y393.7 against Serious at
y390, y486.7 against Respectful at y481, y571.7 against Matter-of-fact at y568). So they read:

- Formal ↔ Casual is centred **because** the language is *"50% tech, 50% non-tech."*
- Matter-of-fact ↔ Enthusiastic is centred **because** the content is *"50% logic, 50% emotion."*
- Serious is absolute **because** *"Seriousness stems from reliability."*
- Respectful is absolute **because** *"Respect stems from empathy."*

Reliability and Empathy are core values #1 and #2 (p15). **The two pinned axes are the voice
consequence of the two top values.** This matters practically:

> Serious does not mean solemn. It means *dependable*. Respectful does not mean deferential.
> It means *empathetic*. Neither is a licence to write dry copy — and `app/src/app/page.tsx:74-79`
> records that an earlier draft made exactly that mistake and "would pass a compliance review
> and inspire nobody."

### 2.2 Personality, measured (p38)

Twelve axes on a −3…0…+3 scale. Every marker sits at exactly 770.0pt or 907.0pt, against tick
centres of 770.1 (=1) and 907.2 (=2). No estimation involved:

| +2 | +1 |
|---|---|
| Human · Solution-oriented · Elegant · Empathetic · Experiential | Emotional · Elastic · Approachable · **Expensive** · Bright · Lateral Thinking · Instinctive |

Three facts fall out of this:

1. **Every one of the twelve leans warm.** Nothing is at zero, nothing is negative.
2. **Nothing reaches +3.** The brand is consistently warm and never extreme. That is the same
   restraint as the two centred voice axes.
3. **"Expensive +1" is a positioning instruction.** Do not write cheap, do not compete on price,
   do not apologise for cost. The shipped FAQ obeys this (`page.tsx:204`: cost "tracks scope more
   than hours", and no figure is quoted).

**"Solution-oriented, not Tool-focused"** is the slider that governs the copy most often. It pairs
with p72 *"Tech stack is just means to an end."* Framework names never lead a sentence; they
appear only with a consequence attached.

---

## 3. Archetype and the question habit

**80% Creator / 20% Sage (p36).** Creator drivers: Originality, Imagination. Creator fears:
Familiarity, Duplication. Sage drivers: Wisdom, Expertise.

That 20% Sage is not decorative — it is the single most repeated idea in the entire messaging
section:

- **Seven consecutive quote pages (pp53–59)** are about asking rather than answering: Einstein
  (55 minutes on the problem), Lincoln (sharpening the axe), Heisenberg (*"nature exposed to our
  method of questioning"*), Confucius (*"the one who asks the questions has the power"*), Socrates,
  Drucker (*"the true dangerous thing is asking the wrong question"*), Voltaire.
- **Eight more (pp60–67)** are about creativity — that is the Creator 80%.
- Brand Philosophy p69: *"Development is all about asking the right questions."*
- p71: *"A great product starts with a great tool question."*
- p88: *"The most powerful tools we have: Ask, Listen, Think."*

**This is the brand's signature rhetorical move: lead with the question; let the answer arrive as
a consequence.** The shipped copy already does it — `page.tsx:246`: *"Development starts with the
right questions, and none of them are about the stack."*

---

## 4. Four registers, and what separates them

The most useful thing this analysis produced. The site does not have one voice; it has four, and
they are separated by hard, measurable rules. Most of the confusion about "what is our tone" comes
from reading a rule from one register and applying it to another.

### Register A — Canon

The fixed strategic lines. **Never paraphrased, never re-written.**

| Line | Source |
|---|---|
| We create to inspire others to create. | p9 (Purpose) |
| Creativity driven by people, efficiency driven by tech. | p11 (Vision) |
| Crafting custom web & app experiences that help people. | p13 (Mission) |
| Feel. Form. Function. | p50 (Tagline) |
| Visionary Web & App Studio | p27 (Descriptor) |

Deck sets them lowercase inside quotation marks; the build sets them sentence case with a full stop
(`src/content/about.ts:21,26,31`). **The build's convention is the right one for a web page** — record
it and stop re-deciding it.

### Register B — Recurssive Language (the campaign line)

Eight lines, pp223–230. **Every single one is a recursion joke**, and this is the only register that
is allowed to be funny:

| Pt | Line | Where it lands today |
|---|---|---|
| 1 | *"If you've seen it before, it's probably Recurssive"* | **Nowhere.** Absent from all 31 frames and from the build |
| 2 | *"Got an idea that keeps coming back?"* | Drawn on `Capabilitiy` |
| 3 | *"Tech we use on repeat"* | Drawn on `Capabilitiy` |
| 4 | *"We create in circles"* | `src/app/page.tsx:728` (process intro) — not drawn anywhere |
| 5 | *"Stay in the loop"* | `src/components/Newsletter.tsx:52`; drawn on Blog + Post |
| 6 | *"We looked again and again but found nothing"* | `src/app/not-found.tsx:35` |
| 7 | *"Try to refresh the page. If it doesn't work, circle back later."* | `src/app/error.tsx:49` |
| 8 | *"Basically you found an empty page about an empty page"* | Drawn on `No Content` |

**How p40's maximum Serious coexists with eight jokes:** humour is *slot-bound*. It is permitted in
a campaign line, a section eyebrow, and a utility state. It is permitted nowhere else — and the
1,069-word body corpus contains no joke at all. That is the resolution, and it is a rule you can
hand to anybody.

Register B also contracts freely ("you've", "it's", "doesn't"). Register C now does too — see the
2026-09-29 note below.

### Register C — Explanatory body

Service rows, FAQ answers, process and industry bodies, capability and blog MDX. **This is 90% of
the words on the site and it is where the voice is really decided.**

> #### 2026-09-29 — contractions are allowed here, and the "never contracts" rule is withdrawn
>
> That rule was never the owner's. An agent session inferred it from AI-drafted copy and wrote it
> down (§8 item 3), and every later draft obeyed it. A multi-reviewer voice review of Home and
> About then named the complete absence of contractions as one of the main reasons the copy read
> stiff and machine-made: three independent reviewers raised it unprompted, and the only body line
> that contracted was the owner's own contact line. Home was edited on that basis. Use contractions
> where a person would say them aloud; do not force them in, and do not strip them out.
>
> The same review found the machine feel came from a handful of repeated moves rather than from any
> one bad line: corrective contrasts ("rather than", ", not X") in 14 of 42 passages, sincerity
> words ("honest" in three consecutive FAQ answers, "the real question" on both pages, "actually"),
> every item in a band sharing one sentence shape and length, and the About page built as a run of
> quotable maxims. Check a band for those before shipping it.
>
> Owner-written lines on Home, per the comments in `src/app/page.tsx`: service rows 01 (Web
> Design), 05 (Replatforming) and 06 (Product Strategy), plus the contact line in `lib/site.ts`.
> Do not edit them without asking.

> #### The calibration sample — the owner's own sentence
>
> Written by the owner as the Web Design row, and the single most reliable thing in this document.
> Everything above it was inferred; this was authored. **When the two conflict, this wins.**
>
> > *Your web presence is your most valuable asset and the first impression you give to your
> > customers matters the world both to you and us.*
>
> Five things it does that three agent drafts did not:
>
> 1. **One continuous sentence hinged on "and"** — 23 words, no full stop in the middle. Not two
>    clipped sentences.
> 2. **An unhedged superlative** — "your most valuable asset". Superlatives are *not* banned. What
>    is banned is a superlative about the studio.
> 3. **Value vocabulary, not mechanism** — asset, first impression, customers. It never says what
>    gets built or how. It sells why the category matters.
> 4. **An emotional intensifier** — "matters the world". *(2026-09-29: at the owner's request the live
>    line now reads "means the world", with a comma before "and" and "to both you and us". The
>    sentence above is kept as he first wrote it, because it is the calibration sample.)* This is the half-enthusiasm p40 measures
>    at dead centre, and it is the thing dry drafts leave out.
> 5. **It ends by joining you and us.** The studio appears late, as someone who *cares*, not
>    someone who *does*. That is the Empathy value, and it is why `we` earns its place.
>
> **A correction to §4 above, which sent one session badly wrong:** humour is slot-bound, but
> *warmth is not*. p40 pins Serious against **Funny** — not against warm, not against creative, and
> not against enthusiastic. Reading the Serious slider as a licence for dry understatement produced
> copy the owner rejected outright. So did over-correcting into contrarian aphorism.
>
> **And do not template this sentence.** It has been over-fitted four separate ways, each caught
> only after shipping: every row opening "Your"; every row about "your customers"; `most _ thing`
> lifted into three rows at once; and every row built as one sentence hinged on "and". Give each
> row a different *subject*, then verify mechanically that no content word appears in more than two
> of six and that sentence counts vary.

### Register D — Transactional microcopy

Form labels, validation, notices, invitations, confirmations. Short, direct, second person,
**contracted**, and it says "Please":

```
Please give your email address.                 lib/contact.ts
That email address does not look right.         lib/contact.ts
A sentence or two would help.                   lib/contact.ts
Tell us what you're building, even if it's      lib/site.ts:61
  still rough.
We read every message and usually reply         lib/site.ts:55
  within two working days.
Thanks, we've got it.                           app/contact/thanks/page.tsx:34
That didn't send.                               app/contact/problem/page.tsx:36
```

Note `That didn't send.` — three words, no blame, no apology, no error code. That is the register at
its best.

---

## 5. Tolerated vs rejected, measured side by side

Two corpora of almost identical size, from the same repo, four days apart. **The tolerated one is
the nine FAQ answers (374 words). The rejected one is the previous session's Home copy (372
words).** Everything mechanical is identical between them — zero em dashes, zero exclamation marks,
zero contractions, zero digits, the same 2:1 lean toward "you". The differences are all elsewhere:

| Measure | **Tolerated** (FAQ) | **Rejected** (Home) | |
|---|---|---|---|
| we / our / us / Recurssive, per 100 words | **1.3** | **0.3** | 4× fewer. The studio has vanished |
| Negative or absence tokens, per 100 words | **1.9** | **4.3** | 2.3× more |
| "nobody" | 1 | **4** | |
| Opens on a generalisation about the world | 2 of 9 | **11 of 15** | |
| Names a technology or concrete noun | **10** | **0** | Nothing is named at all |
| Exactly two sentences | 5 of 9 | 8 of 15 | |
| Median sentence | 18 words | 14 words | |

**The diagnosis is in the last two rows of that table.** The rejected copy is more negative, more
impersonal, more aphoristic and completely abstract. Six service rows and not one says what gets
built, what the studio does, or what anything is called.

That was not an accident — it was a rule the session wrote for itself at `page.tsx:57-66`:

> *"outcome, never method; no tooling, no framework names, no engineering constraints"*

derived from p72 (*"Tech stack is just means to an end"*) and the Solution-oriented slider. **The
derivation is wrong.** "The stack is a means to an end" means do not let the stack be the pitch. It
does not mean never name anything. The FAQ that survived names React Native, Expo, iOS, Android,
codebase and browser **ten times in 374 words** — and it is the copy that lasted.

### 5.1 The pattern that got rejected, and why it repeats

The same session's comment at `page.tsx:80-92` records an earlier rejection: five of six rows had
converged on comma triplets and *"the owner rejected the whole band as reading machine-written."*
It diagnosed the mechanism correctly — a comma list is the easiest thing to tune to a character
budget, so a fixed budget quietly selects for enumeration — and then **replaced one formula with
another**: the aphorism. Observation about the world, then a twist. Eight of fifteen strings, two
sentences each, four of them opening on what fails.

A tight character budget will always select for *some* repeatable shape. The defence is not a
better shape. It is to write each string from what that specific row is actually selling, and to
accept unequal sentence counts across the band.

### 5.2 Naming: a depth gradient, not a rule

**This is where both agent sessions failed, in opposite directions, and it needs stating precisely.**

The previous session banned all naming (`page.tsx:57-66`: *"no tooling, no framework names"*) and
produced six abstractions with nothing concrete in them at all. The next session read the FAQ's ten
technology mentions as evidence that naming was house style, and put "built in Next.js" under a row
the designer had deliberately labelled "Web Design". **Both were wrong, and the correction is the
same one: name the product, never the tooling.**

> A customer owns *an app that works on every phone*. React Native is how it gets built. The first
> is theirs; the second is ours. p42's Audience column says the reader is **Non-tech, Busy, Time
> constrained** — they may not know what any of these words are, and being made to feel behind is
> the opposite of the Confidence and Calm the same page asks for.

Where naming is allowed, by depth:

| Surface | Framework / OS / language names | Why |
|---|---|---|
| **Home service rows** | **Never** | A non-technical reader, scanning, seconds in. The six drawn row names — Desktop Apps, Mobile Apps, Web Design, UI/UX Design, AI Workflows, Product Strategy — contain **zero** technology names. The designer already decided this. |
| **FAQ** | Only when the drawn question already uses them | `Home__1920w.txt` draws *"Do you build iOS and Android apps?"* The reader asked in those terms, so answering in them is not volunteering them. |
| **Capability detail page** | Yes, expected | Two clicks deep. This reader is evaluating, and 38 tech chips are drawn on `Capabilitiy`. |
| **"Tech we use on repeat" band** | The names *are* the content | Recurssive Language Pt.3, deck p225. |

**Four things in the source material pull toward name-dropping. Know them, and discount them:**

1. **Deck p29** expresses the offer as a stack list — **8 of its 17 service names contain a
   framework**: React Native Performance Optimization, Expo Development, Next.js Development,
   Migration to React Native, and four more. p29 is an *internal sales taxonomy*, not a public
   message. It answers "what do we sell", not "what do I get".
2. **Pt.3 "Tech we use on repeat" (p225)** is a whole verbal asset for listing the stack.
3. **The nine FAQ answers** name technology ten times in 374 words. That is register-specific (see
   the table above), not a house rule.
4. **The project's own shorthand** — the knowledge base and the studio's self-description call it
   "a React Native / Expo / on-device AI studio", which primes the vocabulary before any copy gets
   written.

### 5.2b Cheese: reverence for the object, then the studio bowing to it

Six drafts for one row were rejected as *"corny, cheesy and cringe"*. They shared one structure:
**be reverent about the thing, then have the studio genuflect.** Four of the six are caught by a
word list; two needed a human read.

| Caught mechanically | Needed a read |
|---|---|
| `honour` · `privilege` · `deserves` · `sacred` · `precious` · `treasure` · `cherish` · `love` · `favourite` · `intimate` · `closeness` · `heart` · `journey` · `magic` · `delight` · `passion` · `humbled` · `grateful` · `granted` · `pocket` · `alongside` · `joy` · `proud` · `dream` | **Literary performance.** Precious wordplay ("being kept is harder to earn than being visited") and writerly phrasing ("attention is already spoken for"). No list catches these. |
| Plus `we treat` / `we believe` / `we never` / `we do not ever` / `we truly` / `we genuinely` — the studio narrating its own virtue | |

**The replacement is not coldness.** It is to write from the reader's **commercial stakes**, which is
what the owner's own line does — your asset, your impression, your customers, it matters to both of
us. And when the studio does appear, it appears as **capability**, in the owner's own construction
from the Replatforming row: *"requires patience and expertise."* Competent, not adoring.

### 5.2c Measured budgets — never derive these

Every character budget in this project has been wrong when calculated and right when measured on the
built page. Measure before writing, and re-measure after any layout change.

| Slot | Box | Ceiling | Evidence |
|---|---|---|---|
| **Service row** | 878px @16px (1920) · 516px @21.78px (768) | **143** | 143 holds 3 lines at 768, **145 breaks to 4**. 768 is binding. |
| **Process step** | 721px @18px (1920) · 329px @21.78px (768) | **89** | 89 holds 3 lines at 768, **91 breaks to 4**. |

Both are **word-boundary sensitive**, so treat the number as a hard stop rather than rounding up.

For the process steps, also **write to the top of the window, not the middle**: one line at 1920 holds
about 85 characters, so a string in the low 80s renders one line against a drawn three, while 85–89
renders two. The earlier strings sat at 82–85 and were losing a line for nothing.

### 5.3 What is worth keeping from the tolerated copy

1. **Define by what it is not, then what it is.**
   *"It is not a cheap version of the product. It is the fastest way to find out whether the
   expensive version is worth building at all."* — `page.tsx:214`
3. **The one-word answer as a position.** *"Often."* — `page.tsx:219`. The only one-word sentence
   in the repo and the strongest thing on the page.
4. **Refuse the number out loud.** *"Cost tracks scope more than hours"* — states the policy
   instead of dodging.

### 5.3 The one string that is definitely the owner's

`3145c21` wrote it and `9fcce50` edited it:

> Tell us what you're building, even if it's still rough. **We read all messages** and come back
> within two working days.

The edit direction is the signal. The agent had written *"We read every message **ourselves**"*;
the owner cut **"ourselves"** and changed **"every message" → "all messages"**. Plainer, shorter,
less self-regarding, no flourish.

**The previous session then reversed it**, to *"We read every message and usually reply within two
working days"* (`lib/site.ts:55`, uncommitted) — reinstating the "every message" that had been
edited out and adding a hedge nobody asked for. If one line in this repo is the house voice, it is
the owner's version, and it should go back.

### 5.2 The no-numbers policy

`page.tsx:167-172` records it as an owner decision: cost describes what drives it and quotes no
figure, timeline describes phases rather than weeks, "they become a public promise." The one number
that survived — the reply time — was **hedged to "usually"** on the owner's instruction and lifted
into a single constant (`lib/site.ts:55`, `STATE.md:55`) because it had already drifted into four
wordings across four files.

**Rule: a number in the copy is a commitment. Write none you would not put in a contract.**

---

## 6. The rejection record

The strongest evidence in the project, because it is the owner saying no rather than a deck saying
yes. Recorded in the source at the point of the decision:

| Rejected | Where | Why |
|---|---|---|
| **Comma triplets** — "load fast, read clearly and hold up on a phone" | `page.tsx:80-92` | Five of six rows had converged on one rhythm; **"the owner rejected the whole band as reading machine-written."** Note the diagnosis recorded there: a comma list is the easiest thing to tune to a character budget, so budgets quietly select for enumeration. **Hit the budget by rewriting the sentence, not by lengthening a list.** |
| **"the thing"** as a noun | `page.tsx:101-104` | "reads as dodging a noun" |
| **Every em dash in rendered text** | commit `1ae2ce4` | Zero remain |
| **An unhedged response-time SLA** | `STATE.md:55`, `lib/site.ts:36-56` | Same class of number the FAQ refuses |
| **Any FAQ row shipping expanded** | `components/Faq.tsx:28` | |
| **Making the phone field optional** | `lib/contact.ts:74-77` | Reverted on the owner's instruction; settled |

Current comma count per service row, held deliberately: **0 / 1 / 1 / 0 / 0 / 1**.

---

## 7. Lexicon

### On-brand — the declared "how you sound" list (p42, Character column, 17 words)

Reliable · Respectful · Serious · Empathetic · Creative · Approachable · Insightful · Inspiring ·
Motivating · Responsible · Supportive · Responsive · Timely · Efficient · Visionary · Elegant ·
Problem Solver

### Who you are writing for (p42, Audience column, 17 words)

**Mature · Busy · Thoughtful · Non-tech · Time constrained · Resource conscious · Demanding** ·
Ambitious · Business owner · Daring · Wealthy · Opportunity driven · Passionate · Competitive ·
Open minded · Collaborative · UX sensitive

The bolded ones are the tone brief in miniature: a busy, non-technical, demanding decision-maker.
That is *why* the register is plain, hedged and short. It is not a stylistic preference.

### What the reader should feel (p42, Feeling column, 17 words)

Confidence · Calm · Safety · Inspiration · Pride · Motivation · Clarity · Trust · Engagement ·
Empowered · Fulfilled · Amazed · Capable · Involved · Optimistic · Touched · Moved

**Calm and Clarity are load-bearing.** They rule out urgency, scarcity and exclamation marks.

### The recursion vocabulary

The metaphor has a real grammar, drawn from pp89–112 — *a process becomes the input to itself*
(p90), *the base case* (p102, p123), *feedback, memory, iteration* (p112). Usable terms: **loop,
again, base case, stopping condition, the next input, the second pass, circle back, on repeat, in
circles.**

**Ration it.** The copy-deck's own cross-page critic counted nine recursion tokens on a single
draft About page and called it a tic. Two per page: once where recursion is genuinely the subject,
once where "base case" does work a plain word cannot.

### Off-brand

Cutting-edge · future-proof · solutions that scale · seamless · robust · passionate about ·
world-class · leading · innovative · empower · leverage · unlock · game-changing · "we're excited
to" · any exclamation mark · any em dash · any invented metric · "the thing" · three-item comma
lists used as rhythm.

Two of these are currently **drawn as headings** on `Capabilitiy`: *"Latest tech"* and *"Future
ready"* — the banned ideas in different words. Honest replacements that say more: *"Chosen for the
consequence"* and *"Built to be maintained."*

---

## 8. Where the two sources disagree — four open decisions

Each is small, and each is a decision only you can make.

1. **The exclamation mark.** Deck p230 ends Pt.8 with a full stop. The `No Content` frame draws it
   with an exclamation mark — and that is the **only exclamation mark in all 31 frames**, against a
   voice with Serious pinned at the stop and zero exclamation marks in 1,069 shipped words.
   **Recommendation: take the deck's full stop.** (The frames also add an ellipsis to Pt.6, which
   has shipped that way at `not-found.tsx:35` and is fine — an ellipsis reads as looking, which is
   the joke.)

2. **Pt.1 has no home.** *"If you've seen it before, it's probably Recurssive"* is the strongest
   line in the deck and appears in no frame and no file. It is a positioning line, not a utility
   line. Natural homes: the About hero, the footer above the lockup, or the OG/social card.

3. **Contractions.** *(Superseded 2026-09-29 — see the note under Register C in §4.)* An earlier
   session recorded that Register C never contracts. That was inferred from AI-drafted copy, never
   decided by the owner, and a voice review found it made the copy stiff. It is withdrawn.

4. **Place.** p25's Onliness statement says *"mainly in Greece"*; the market is settled as global
   (knowledge base §2), and `app/about/page.tsx:11` ships *"a web and app studio in Thessaloniki,
   Greece."* These are consistent — the studio has a location, the market does not — but p25 should
   be read as superseded, not as a second position.

---

## 9. One-page checklist

Before any string ships:

- [ ] Would a busy, non-technical decision-maker understand it on one read?
- [ ] **Does it name something concrete from the customer's world** — a website, an app, a phone, a
      screen, a page, a release? Abstraction with nothing named is one failure mode; naming the
      *tooling* instead of the product is the other. Both have happened here.
- [ ] **Zero framework, operating-system or language names**, unless this is the FAQ answering a
      question drawn in those terms, a capability detail page, or the tech band. See §5.2.
- [ ] Is there a question in it, explicit or implied, before there is an answer?
- [ ] **Is the studio anywhere in it?** Roughly one "we/our/Recurssive" per 75 words is the
      tolerated rate; the rejected copy ran at one per 370.
- [ ] Zero em dashes, zero exclamation marks, zero invented numbers?
- [ ] Contractions wherever a person would say them aloud (withdrawn rule: see §4, 2026-09-29)?
- [ ] Fewer than two commas? Is any three-item list doing rhythmic work rather than real work?
- [ ] Is the claim falsifiable by the reader in one sentence?
- [ ] Does it hedge where it is genuinely uncertain, and not hedge where it is not?
- [ ] Is it more Calm and Clear than it is clever?

**Two failure modes are on record, and both came from writing to a character budget.** Formula one
was the comma triplet. Formula two was the aphorism — observation about the world, then a twist.
If a band reads as machine-written, look for the shape all its rows share, not for a bad word.

---

## 10. Re-deriving this

```bash
# deck text layer + per-page dump
python -c "import fitz; d=fitz.open('Recurssive Branding Presentation.pdf'); \
open('deck.txt','w',encoding='utf-8').write('\n'.join(p.get_text() for p in d))"

# slider geometry (pp38, 40): tracks are the only wide/short rects, markers the only
# ~60pt light-grey discs. p38's markers are vector; p40's must be pixel-sampled.
```

The shipped-copy metrics in §5 come from the 27 strings in `src/app/page.tsx` (`description`,
`answer`, `body`) plus the five MDX bodies in `content/`, with lorem, headings and fenced code
stripped.

**Related:** `RECURSSIVE-KNOWLEDGE-BASE.md` §2 (settled strategy) · `docs/copy-deck.md` (180 drafted
slots and two critic passes) · `docs/writing-content.md` (how to publish).
