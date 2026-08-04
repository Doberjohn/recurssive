/**
 * The 0/1 diamond that sits beside the contact form.
 *
 * Drawn as a 411x707 masked group — a field of ones and zeroes clipped to a
 * diamond. It is the "0's & 1's" principle from Signs of Reality (deck pp210-221),
 * not a photograph; an earlier build put a stock image here.
 *
 * Generated deterministically so the pattern is identical on every build, and
 * rendered as text rather than an image so it costs no bytes and scales
 * cleanly. Hidden from assistive tech — it is texture, not content.
 */

const ROWS = 40
const COLS = 26

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
    const width = Math.max(0, Math.round(t * COLS))
    if (width === 0) {
      lines.push('')
      continue
    }
    let row = ''
    for (let c = 0; c < width; c++) row += rand() > 0.5 ? '1' : '0'
    lines.push(row)
  }
  return lines
}

const LINES = build()

export function BinaryDiamond({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`select-none font-mono leading-[1.15] tracking-[0.12em] text-storm/45 ${className}`}
      style={{ fontSize: 'clamp(6px, 1.05cqi, 11px)' }}
    >
      {LINES.map((line, i) => (
        <div key={i} className="text-center whitespace-pre">
          {line}
        </div>
      ))}
    </div>
  )
}
