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

/**
 * Half the taper, measured row by row off the export, centre row last. Mirrored
 * for the lower half, giving 47 rows. Embedded rather than computed: it is
 * almost 2.5 characters per row, but a formula is off by one at index 12 (32 vs
 * 33), and 2 x sum - 60 = 1446 reproduces the export's glyph count exactly.
 */
const HALF = [1, 5, 8, 10, 13, 15, 18, 20, 23, 25, 28, 30, 32, 35, 38, 40, 43, 45, 48, 50, 53, 55, 58, 60]
const ROWS = HALF.length * 2 - 1 // 47; centre row is HALF's last entry, 60 wide

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
    // Mirror the measured half. Row 0 is a single glyph, never an empty string:
    // an empty div generates no line box and collapses to 0px, which silently
    // dropped the end rows and left the field short of its drawn 707.
    const width = HALF[r < HALF.length ? r : ROWS - 1 - r]
    // Strictly alternating, never random. The export has ZERO adjacent equal
    // characters across 1399 pairs. Only the digit each row STARTS on varies,
    // and that follows no rule that survives checking — column parity predicts
    // it on 23 of 47 rows, which is chance — so one deterministic bit per row.
    const start = rand() > 0.5 ? 1 : 0
    let row = ''
    for (let c = 0; c < width; c++) row += (c + start) % 2 === 0 ? '0' : '1'
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
