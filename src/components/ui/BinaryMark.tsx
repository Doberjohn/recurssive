import { LOGO_PATHS, LOGO_VIEWBOX } from './Logo'

/**
 * The Reflow mark drawn as a field of ones and zeroes.
 *
 * Extracted from FeelFormFunction so the error states can reuse it. The design
 * uses the same artwork at two scales — 962x626 on Contact, 764x497 on the error
 * frames — and both are the same 1.537 aspect, so this is one component sized by
 * its container rather than two sets of geometry. STATE.md records a duplicated
 * copy of this mark going silently wrong for months; that is why the clip is
 * driven by LOGO_PATHS instead.
 *
 * Sizing is `cqi`, so the caller sets a width and the glyphs follow. Colour and
 * opacity come from `className` — the field is #999999 @0.5 over Contact's
 * photograph and #EAEAEA @1 on the pale error ground.
 */

const ROWS = 47
const COLS = 158

/** Deterministic — no Math.random, so the field is identical on every build. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Strictly alternating, as the exports are — one phase bit per row. */
const FIELD = (() => {
  const rand = mulberry32(0x0f0f_0f0f)
  const out: string[] = []
  for (let r = 0; r < ROWS; r++) {
    const start = rand() > 0.5 ? 1 : 0
    let row = ''
    for (let c = 0; c < COLS; c++) row += (c + start) % 2 === 0 ? '0' : '1'
    out.push(row)
  }
  return out
})()

export function BinaryMark({
  className = '',
  /** Only matters if two marks ever share a page; they currently never do. */
  clipId = 'reflow-binary-clip',
}: {
  className?: string
  clipId?: string
}) {
  const { w, h } = LOGO_VIEWBOX
  return (
    <div className="relative" style={{ aspectRatio: `${w} / ${h}` }}>
      <svg width="0" height="0" aria-hidden="true" className="absolute">
        <defs>
          {/* objectBoundingBox so the clip tracks the box at any width. The
              scale goes on each path, NOT on a wrapping <g>: a clipPath may only
              contain shapes, <text> and <use>, so a <g> is ignored and the clip
              silently resolves to empty — which renders nothing at all, not
              "unclipped". */}
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            {LOGO_PATHS.map((d) => (
              <path key={d} d={d} transform={`scale(${1 / w} ${1 / h})`} />
            ))}
          </clipPath>
        </defs>
      </svg>

      <div
        aria-hidden="true"
        className={`absolute inset-0 select-none ${className}`}
        style={{ clipPath: `url(#${clipId})` }}
      >
        {FIELD.map((line, i) => (
          <div key={i} className="whitespace-pre text-center">
            {line}
          </div>
        ))}
      </div>
    </div>
  )
}
