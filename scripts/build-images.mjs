#!/usr/bin/env node
/**
 * Photograph pipeline.
 *
 * Unlike the mesh gradients, nothing here is reconstructed — photographs carry
 * real detail that cannot be regenerated. Each image is only resized to the
 * widths actually displayed and encoded with a modern codec.
 *
 * Decisions and why:
 *
 *  - AVIF primary, progressive JPEG fallback. WebP is skipped: it covers only
 *    ~2.7 percentage points more than AVIF, and that tail is served fine by
 *    JPEG. Dropping the tier halves the build matrix and the output size.
 *
 *  - Widths cap at 2560. Beyond that the curve turns vicious — 3840 costs
 *    roughly 6x the bytes of 1920 for 2x the width, and Next's default
 *    deviceSizes would hand that file to a 1440@2x laptop as its LCP element.
 *
 *  - Quality drops as width rises (q62 -> q45). Compression artefacts halve in
 *    angular size at 2x DPR, so a lower number at 2560 is imperceptible while
 *    saving a large fraction of the bytes.
 *
 *  - Only images actually referenced by the designs are processed. The list
 *    comes from docs/images-in-use.txt, derived by perceptually matching every
 *    image embedded in the .fig against the source library.
 *
 * Output is committed to the repo: the source photographs live outside it, so
 * CI cannot regenerate these.
 */
import sharp from 'sharp'
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const SRC_DIR =
  process.env.IMAGES_DIR ??
  'D:/johnn/Projects/recurssive/Recurssive Folder/Recurssive Folder/Images'
const OUT_DIR = 'public/img'
const MANIFEST = 'src/lib/images.generated.ts'

const WIDTHS = [640, 828, 1080, 1440, 1920, 2560]

/**
 * DPR-aware: larger renditions are viewed at higher pixel density, so
 * compression artefacts halve in angular size and a lower number is safe.
 *
 * Nudged up from the planned q55@1920 after measuring a worst-case image (a
 * dark interior with coloured lighting — large low-contrast shadow regions are
 * where AVIF blotches first). The visible failure there is smoothing, not
 * blockiness, and it responds better to chroma precision than to raw quality.
 */
const QUALITY = { 640: 64, 828: 64, 1080: 62, 1440: 60, 1920: 60, 2560: 50 }

/**
 * 4:4:4 rather than the usual 4:2:0.
 *
 * Measured on the dark-interior worst case at 1920: q65 4:4:4 gave 73 KB at
 * 45.83 dB, while q75 4:2:0 gave 109 KB at 45.68 dB — better fidelity, 33%
 * smaller. Chroma subsampling is a poor trade on this library because the
 * photography is full of saturated coloured light (warm lamps, blue dusk,
 * purple brand surfaces), which is exactly what 4:2:0 discards.
 */
const CHROMA = '4:4:4'

/** The 16 photographs the designs reference. Blog/Post imagery is excluded —
 *  those pages ship with temporary content the owner replaces later. */
const SOURCES = [
  ['Tony Noel/tony_noel_impression_detail_img_03.jpg', 'about-hero'],
  ['annie-spratt-J67BWDuNq0U-unsplash.jpg', 'process'],
  ['boitumelo-_8gR561QtEA-unsplash.jpg', 'editorial'],
  ['brooke-cagle--uHVRvDr7pg-unsplash.jpg', 'team-meeting'],
  ['camden-hailey-george-OwLxDAEJ3g4-unsplash.jpg', 'contact'],
  ['charlesdeluvio-Lks7vei-eAg-unsplash.jpg', 'home-collab'],
  ['claude-gabriel-PRQ4vfZHspk-unsplash.jpg', 'home-portrait'],
  ['david-werbrouck-5GwLlb-_UYk-unsplash.jpg', 'home-texture'],
  ['evgeni-tcherkasski-nKuxm4Tk-j0-unsplash.jpg', 'about-square'],
  ['guillaume-issaly-ZCv2Wn5KO6w-unsplash.jpg', 'about-desk'],
  ['james-qualtrough-h8qbn0-fOC0-unsplash.jpg', 'capability-a'],
  ['kohei-ikeda-emsrI7ZFcGU-unsplash.jpg', 'capability-b'],
  ['kreit-xRuG2k1sjaw-unsplash.jpg', 'case-hero'],
  ['microsoft-copilot-qUJ8fgoaLTg-unsplash.jpg', 'ai'],
  ['product-school-XZkk5xT8Xrk-unsplash.jpg', 'home-desk'],
  ['sergey-zolkin-_UeY8aTI6d0-unsplash.jpg', 'shared'],
]

if (!existsSync(SRC_DIR)) {
  console.error(`✗ IMAGES_DIR not found: ${SRC_DIR}`)
  process.exit(1)
}

if (existsSync(OUT_DIR)) rmSync(OUT_DIR, { recursive: true })
mkdirSync(OUT_DIR, { recursive: true })

const entries = {}
let srcTotal = 0
let outTotal = 0
let missing = 0

for (const [file, slug] of SOURCES) {
  const src = join(SRC_DIR, file)
  if (!existsSync(src)) {
    console.warn(`  ! missing ${file}`)
    missing++
    continue
  }
  const raw = readFileSync(src)
  srcTotal += raw.length

  const meta = await sharp(src).metadata()
  const hash = createHash('sha256').update(raw).digest('hex').slice(0, 8)
  const dir = join(OUT_DIR, `${slug}-${hash}`)
  mkdirSync(dir, { recursive: true })

  // Never upscale — cap the ladder at the source width.
  const widths = WIDTHS.filter((w) => w <= meta.width)
  if (widths.length === 0) widths.push(meta.width)

  let bytes = 0
  for (const w of widths) {
    const q = QUALITY[w] ?? 55
    const base = sharp(src).resize(w, null, { kernel: 'lanczos3', withoutEnlargement: true })

    const avif = await base
      .clone()
      .avif({ quality: q, effort: 6, chromaSubsampling: CHROMA })
      .toBuffer()
    writeFileSync(join(dir, `${w}.avif`), avif)

    const jpeg = await base
      .clone()
      .jpeg({ quality: Math.min(q + 20, 82), progressive: true, mozjpeg: true })
      .toBuffer()
    writeFileSync(join(dir, `${w}.jpg`), jpeg)

    bytes += avif.length + jpeg.length
  }
  outTotal += bytes

  // 8px-wide WebP placeholder, inlined. WebP not AVIF: AVIF has a ~3.4 KB
  // container floor, which is 40x larger than WebP for a thumbnail this size.
  const lqipBuf = await sharp(src)
    .resize(8, null, { fit: 'inside' })
    .webp({ quality: 20, alphaQuality: 0, effort: 6 })
    .toBuffer()
  const { dominant } = await sharp(src).stats()
  const toHex = (c) =>
    '#' + [c.r, c.g, c.b].map((v) => v.toString(16).padStart(2, '0')).join('')

  entries[slug] = {
    src: `/img/${slug}-${hash}`,
    width: meta.width,
    height: meta.height,
    widths,
    lqip: `data:image/webp;base64,${lqipBuf.toString('base64')}`,
    color: toHex(dominant),
  }

  console.log(
    `  ${slug.padEnd(14)} ${String(meta.width).padStart(5)}x${String(meta.height).padEnd(5)}` +
      ` ${(raw.length / 1048576).toFixed(1).padStart(5)} MB -> ${(bytes / 1024).toFixed(0).padStart(5)} KB` +
      `  (${widths.length} widths)`
  )
}

const ts = `// GENERATED by scripts/build-images.mjs — do not edit.
// ${Object.keys(entries).length} photographs, ${WIDTHS.length} widths, AVIF + progressive JPEG.
// Source library lives outside this repo; these derivatives are committed
// because CI cannot regenerate them.

export type ImageAsset = {
  /** Directory holding the renditions, e.g. /img/about-hero-1a2b3c4d */
  src: string
  /** Intrinsic dimensions of the original — use for aspect-ratio boxes. */
  width: number
  height: number
  /** Rendition widths available on disk. */
  widths: number[]
  /** 8px inline placeholder. */
  lqip: string
  /** Dominant colour, for a flat placeholder where LQIP is overkill. */
  color: string
}

export const images = ${JSON.stringify(entries, null, 2)} as const satisfies Record<string, ImageAsset>

export type ImageName = keyof typeof images
`

mkdirSync('src/lib', { recursive: true })
writeFileSync(MANIFEST, ts)

console.log(
  `\n  ${Object.keys(entries).length} images` +
    (missing ? `  (${missing} missing)` : '') +
    `\n  source     ${(srcTotal / 1048576).toFixed(1)} MB` +
    `\n  derivatives ${(outTotal / 1048576).toFixed(1)} MB` +
    `\n  wrote ${MANIFEST}\n`
)
