import { Picture } from './ui/Picture'
import { LOGO_PATHS, LOGO_VIEWBOX } from './ui/Logo'

/**
 * "Feel. Form. Function." — the band between the form and the footer on Contact.
 *
 * Measured:
 *              1920                      768
 *   band       1920x883 @y1066           1292x594 @y1868
 *   artwork    962x626  @479,+131        647x421  @66,+88
 *   words      57.3px   @+405            38.5px   @+272
 *
 * The 768 frame is a uniform 0.673 scale of the 1920 one (1292/1920 = 0.6729,
 * 647/962 = 0.6726, 38.5/57.3 = 0.672) — not a re-layout. But the viewport only
 * scales 0.4, so at 768 the drawn band is wider than the screen. Rather than
 * freeze it and crop (which would push scrollWidth past clientWidth and
 * reproduce the pale-strip bug STATE.md records from the nav), the artwork and
 * type ramp linearly between the two frames and the photograph covers. Both
 * ramps hit the drawn value exactly at 768 and at 1920.
 *
 * The scrim is a single gradient to rgba(15,15,15,0.75) — the file draws a flat
 * #0F0F0F fill at 0.75 opacity, folded into the end stop. Deliberately not
 * Home's three-stop scrims, which are near-uniform.
 *
 * `object-position: 50% 82%` comes from the pattern transform: ty -325.1px
 * against 397.2px of spare height is 81.85%, not centre.
 *
 * The artwork is the Reflow mark drawn in binary. The five clusters in the
 * export are the five Logo shapes, so this clips one field with `LOGO_PATHS`
 * rather than carrying a second copy of the geometry — STATE.md records that
 * copy going silently wrong for months.
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

// The frames draw "Feel." and "Form." with full stops and "Function" without,
// at both 1920 and 768. That is a slip in the file, not a rhythm — corrected on
// the owner's instruction.
const WORDS = ['Feel.', 'Form.', 'Function.']

export function FeelFormFunction() {
  return (
    // overflow-clip, not hidden: the band is full-bleed and nothing inside may
    // widen the document. `clip` does not create a scroll container.
    <section
      className="relative isolate overflow-clip"
      aria-labelledby="feel-form-function"
      style={{
        // 131/126 at 1920, 88/85 at 768 — the same 0.673 ramp as everything
        // else in this band.
        paddingTop: 'clamp(56px, 59.35px + 3.73vw, 131px)',
        paddingBottom: 'clamp(54px, 57.66px + 3.56vw, 126px)',
      }}
    >
      <Picture
        name="contact"
        alt=""
        sizes="100vw"
        grain
        fill
        className="-z-20"
        imgClassName="object-cover [object-position:50%_82%]"
      />
      {/* Uniform, not a ramp. The file draws `GRADIENT_LINEAR(#0F0F0F -> #0F0F0F)`
          at op0.75 — the same colour at both stops, so it is a flat 75% wash.
          Built as a top-to-bottom fade first, which left the upper half bright
          enough that the #999999 artwork over it was invisible. Deliberately
          unlike Home's scrims, which do vary. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[rgba(15,15,15,0.75)]"
      />

      <div className="container-content">
        {/* Artwork: 962 wide at 1920, 647 at 768 — ramped, not frozen. */}
        <div
          className="relative mx-auto [container-type:inline-size]"
          style={{ width: 'clamp(320px, 437px + 27.34vw, 962px)' }}
        >
          <BinaryMark />

          {/* The words sit ON the artwork, not under it: drawn at y1471 against
              an artwork spanning 1197..1823, i.e. 43.8% down it. Both are
              centred on the band. Reads the same at 768 (184 into 421). */}
          <h2
            id="feel-form-function"
            className="absolute inset-x-0 top-[43.8%] flex flex-wrap justify-center gap-x-[7.2%] gap-y-1 font-heading font-semibold tracking-[-0.05em] text-cloud"
            style={{ fontSize: 'clamp(24px, 25.97px + 1.632vw, 57.3px)' }}
          >
            {WORDS.map((w) => (
              <span key={w}>{w}</span>
            ))}
          </h2>
        </div>
      </div>
    </section>
  )
}

/** The mark's silhouette cut out of a field of ones and zeroes. */
function BinaryMark() {
  const { w, h } = LOGO_VIEWBOX
  return (
    <div className="relative" style={{ aspectRatio: `${w} / ${h}` }}>
      <svg width="0" height="0" aria-hidden="true" className="absolute">
        <defs>
          {/* objectBoundingBox so the clip tracks the box at any ramped width.
              The scale goes on each path, NOT on a wrapping <g>: a clipPath may
              only contain shapes, <text> and <use>, so a <g> is ignored and the
              clip silently resolves to empty — which renders nothing at all,
              not "unclipped". */}
          <clipPath id="reflow-binary-clip" clipPathUnits="objectBoundingBox">
            {LOGO_PATHS.map((d) => (
              <path key={d} d={d} transform={`scale(${1 / w} ${1 / h})`} />
            ))}
          </clipPath>
        </defs>
      </svg>

      <div
        aria-hidden="true"
        className="reflow-binary absolute inset-0 select-none [clip-path:url(#reflow-binary-clip)]"
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
