# Docs

Project context that lives with the code, so anyone touching this repo has the
reasoning behind it.

| File | What it is |
|---|---|
| `KNOWLEDGE-BASE.md` | **Read this first.** Every settled decision: brand strategy, the exact colour and type tokens, website scope, tech-stack rationale, the tiered open list, and a "do not re-raise" section for findings that were investigated and disproved. |
| `design-delivery-verdict.md` | Item-by-item verdict on the designer's revision 2, with evidence. |
| `images-in-use.txt` | The 37 source images actually referenced by the Figma file. Drives the Phase 2 build — the pipeline runs off this list, not the folder. |
| `tools/` | Scripts used to derive all of the above. |

## Source material

The brand deck (241pp PDF), the Figma file and the full asset library are
**deliberately outside this repo** — around 1.9 GB of binaries that would bloat
every clone and diff. They live alongside it in the parent directory. The tools
below regenerate anything derived from them.

## Tools

Require `pip install pymupdf zstandard pillow brotli`.

```bash
python docs/tools/figdec.py <canvas.fig> canvas.json   # decode a .fig node tree
python docs/tools/figtree.py                            # JSON -> per-page specs
python docs/tools/match_images.py                       # which images are actually used
python docs/tools/extract_logo.py                       # single logos from the lockup sheet
```

A `.fig` export is a ZIP containing `canvas.fig`, which is a Kiwi container:
`fig-kiwi` magic, uint32 version, then length-prefixed blocks — block 0 is a
deflate-compressed schema, block 1 is zstd-compressed data. Because the schema
ships inside the file, the whole tree decodes with no Figma account and no
network. Paths in the scripts point at the original locations and will need
editing if the source files move.

## Things that will bite you

- **Metadata merges shallowly.** A child route's partial `openGraph` silently
  replaces the parent's entirely. Always build metadata via
  `src/lib/metadata.ts`, never inline.
- **Never pass `weight` to `next/font`** for Inter or Open Sans. Both are
  variable fonts; specifying weights emits one static file per weight per
  subset — it produced 17 files and 463 KB before being caught.
- **The JS budget is enforced in CI** (`npm run check:budget`). If it fails, the
  fix is to delete JavaScript, not to raise the ceiling.
- **Every route must stay statically prerendered.** Adding `cookies()` or
  `headers()` to a layout moves metadata out of `<head>` and breaks TTFB.
