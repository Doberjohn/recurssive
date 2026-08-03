# Writing content

You write a text file, it becomes a page. No CMS, no admin login — the file *is*
the page, and saving it to GitHub publishes it.

## The three kinds

| Folder | Becomes | Use it for |
|---|---|---|
| `content/blog/` | `/blog/your-file-name` | Articles, announcements, opinion |
| `content/cases/` | `/cases/your-file-name` | Client work, results, before-and-after |
| `content/capabilities/` | `/capabilities/your-file-name` | A service you sell |

**The filename becomes the web address.** `content/blog/why-recursion.mdx` is
published at `recurssive.com/blog/why-recursion`. Use lowercase words separated
by hyphens, no spaces, and end it `.mdx`.

## The shape of a file

Every file has two parts: a settings block at the top between `---` lines, then
your writing below it.

```mdx
---
title: Why we named the studio after a loop
description: Recursion is not a programming trick we like. It is the shape of how good products actually get made.
publishedAt: 2026-08-12
tags:
  - brand
---

## A heading

Your first paragraph. Just write normally.

Leave a blank line between paragraphs.
```

That's a complete, publishable post.

## The settings block

**Every file needs these four:**

- `title` — up to 70 characters. Longer gets cut off in Google results.
- `description` — between 50 and 160 characters. This is the grey text under
  your link in search results, so write it for a human deciding whether to click.
- `publishedAt` — the date, as `2026-08-12`.
- Nothing else is required.

**Optional on any file:**

- `updatedAt` — a second date, if you revise it later
- `draft: true` — hides it completely. Not published, not in the sitemap, not in
  any list. Use this while writing.
- `image` — a picture for the top of the page. See "Pictures" below.

**Blog posts can also have:**

- `tags` — a list, used for filtering

**Case studies can also have:**

- `client` — the client's name, if you can say it
- `segment` — one of `startups`, `smbs`, `enterprise`
- `metrics` — up to three headline numbers (see the example below)
- `stack` — the technologies used
- `capabilities` — which of your services this demonstrates, by filename

**Service pages also need:**

- `pillar` — one of `consulting`, `product-dev`, `enterprise`, `ai-engineering`
- `order` — a number controlling sort order; lower appears first
- `services` — a list of specific things included

## A full case study

```mdx
---
title: Cutting cold start by 63% for a fintech app
description: A React Native banking app took 4.1s to first interaction. We profiled it, cut it to 1.5s, and left the team able to hold it.
publishedAt: 2026-08-12
client: Acme Bank
segment: enterprise
capabilities:
  - react-native-performance
metrics:
  - label: Cold start
    value: -63%
  - label: Bundle size
    value: -41%
stack:
  - React Native
  - Hermes
---

## Challenge

What was wrong, in the client's words if possible.

## Solution

What you actually did.

## Impact

What changed, with numbers.
```

The `capabilities` list must match real filenames in `content/capabilities/`.
Get one wrong and publishing stops with a message naming the valid options —
it will not quietly publish a broken link.

## Writing the body

Normal writing works. A few extras:

```mdx
## Big heading
### Smaller heading

**bold** and *italic*

- a list
- another item

> A pulled-out quote.

[link text](https://example.com)
```

Code samples go between triple backticks, with the language named:

````mdx
```ts
const x = 1
```
````

They get coloured automatically.

## Pictures

Pictures are not automatic — they have to be prepared first, because a photo
straight from a camera is roughly 40× too heavy for a web page.

Put the original in the shared image folder, tell me, and I'll add it to the
pipeline. It then becomes available by a short name:

```mdx
image: editorial
```

Currently available: `about-hero`, `about-desk`, `about-square`, `ai`,
`capability-a`, `capability-b`, `case-hero`, `contact`, `editorial`,
`home-collab`, `home-desk`, `home-portrait`, `home-texture`, `process`,
`shared`, `team-meeting`.

## Publishing

Save the file, commit it, push. The site rebuilds itself.

**If something is wrong, publishing stops and tells you what.** A description
that's too long, a malformed date, a service page that doesn't exist — you get a
message naming the file and the problem. Nothing broken reaches the live site.

That is the safety net working, not something going wrong.

## Starting a draft

Add `draft: true` to the settings block and it stays invisible until you remove
it. Safe to commit and push half-finished work.
