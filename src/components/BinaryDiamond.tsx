/**
 * The 0/1 diamond beside the contact form.
 *
 * Measured from `contact_home.svg`: a 412x707 field of ones and zeroes, 1446
 * glyphs on a 15.15px row pitch — 47 rows, 61 characters at the widest. The
 * glyphs are not painted; they MASK a mesh gradient, and the whole group sits at
 * opacity 0.1. It is the "0's & 1's" principle from Signs of Reality
 * (deck pp210-221), not a photograph.
 *
 * Two things were wrong before. The type was clamped to a 6px floor, so 40 rows
 * filled ~276px of a 707px box and it read as a small smudge. And the glyphs
 * were flat #999 at 45%, where the file masks a gradient at 10%.
 *
 * The mask is `background-clip: text` — the glyphs cut the mesh out of a
 * background rather than being coloured. Same compositing as the file, in one
 * declaration and no JavaScript. Styles live in globals.css as `.binary-diamond`
 * because background-clip needs a -webkit- pair.
 *
 * The gradient is mesh-5: matched by decoding the export's embedded raster and
 * scoring it against every shipped token — RMSE 0.87 against a next-best of
 * 24.01. The file draws it 1165x728 inside the 412 box, i.e. 282.8% of the box
 * width, centred both ways.
 *
 * Sized in cqi so the field keeps its proportions at any container width:
 * 47 rows x 1.15 leading x 3.18cqi = 171.9% of the width, and the drawn box is
 * 707/411 = 172% tall. It fills exactly.
 */

const ROWS = 47
const COLS = 61

/** Deterministic PRNG — no Math.random, so builds stay reproducible. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function build() {
  const rand = mulberry32(0x0110_0110)
  const lines: string[] = []
  for (let r = 0; r < ROWS; r++) {
    // Diamond: width peaks at the middle row and tapers to both ends.
    const t = 1 - Math.abs(r - (ROWS - 1) / 2) / ((ROWS - 1) / 2)
    // Never zero: an empty div generates no line box and collapses to 0px, which
    // silently dropped the first and last rows and left the field 31px short of
    // the 707px it is drawn at. A diamond tapers to a point, not to nothing.
    const width = Math.max(1, Math.round(t * COLS))
    let row = ''
    for (let c = 0; c < width; c++) row += rand() > 0.5 ? '1' : '0'
    lines.push(row)
  }
  return lines
}

const LINES = build()

export function BinaryDiamond({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`binary-diamond select-none ${className}`}>
      {LINES.map((line, i) => (
        <div key={i} className="whitespace-pre text-center">
          {line}
        </div>
      ))}
    </div>
  )
}
