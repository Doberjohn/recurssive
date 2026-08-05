/**
 * The process flowchart.
 *
 * This is the brand's own logo construction used as a page section: the Reflow
 * mark is a recursive flowchart (Start -> Statement -> Condition -> Statement
 * -> End) abstracted into five shapes, and here the flowchart is drawn back out
 * in full. Missing that reads the section as four labels in boxes.
 *
 * Each shape is a mesh-gradient image masked by flowchart geometry. Measured at
 * both breakpoints — 1920 first, 768 second:
 *
 *   terminator    ellipse            262x106 / 260x105   "Start the process"
 *   input/output  parallelogram      266x96  / 264x95    "Collect the data"
 *   decision      diamond            259x160 / 257x159   "Decide what to do"
 *   process       rounded rect r10   256x111 / 254x110   "Work on it"
 *
 * The shapes do NOT resize between breakpoints — 1-2px is rounding, not intent.
 * So the heights here are correctly flat, unlike most of this page. What DOES
 * change is everything around them, and that is where this was wrong:
 *
 * - Width. The shape is ~260 at BOTH widths. `w-full` is only right at lg, where
 *   the grid gives it a 262px column; below lg the single-column grid stretched
 *   it to the full content width (610 at 768), more than twice the drawn size.
 * - Alignment. At 768 the shapes sit at x429..689 in a content column that ends
 *   at 689 — flush right, not centred. (Left edge 350 into a 610 column.)
 *
 * Shapes carry the mesh fill via CSS rather than a masked raster, so they cost
 * nothing extra — the gradient is already inlined for the mesh surfaces.
 *
 * The connector is NOT what we draw here; see the note at the arrow below.
 */

export type Step = {
  index: string
  name: string
  label: string
  body: string
  shape: 'terminator' | 'io' | 'decision' | 'process'
}

const SHAPES: Record<Step['shape'], { cls: string; style?: React.CSSProperties }> = {
  // Flowchart terminator — rounded ends.
  terminator: { cls: 'h-[106px] rounded-full' },
  // Input/output — parallelogram, slanted on both edges.
  io: {
    cls: 'h-[96px] rounded-xl',
    style: { clipPath: 'polygon(6% 0, 100% 0, 94% 100%, 0 100%)' },
  },
  // Decision — diamond.
  decision: {
    cls: 'h-[160px]',
    style: { clipPath: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)' },
  },
  // Process — rounded rectangle.
  process: { cls: 'h-[111px] rounded-xl' },
}

/**
 * Gap below each shape, indexed by the step it hangs from. Uniform 128 on the
 * narrow layout, tightening 123 -> 85 -> 75 on the wide one. Ramped below 768
 * (128/768 = 16.67vw) so a phone does not carry a tablet's vertical rhythm.
 */
const GAPS = [
  'h-[clamp(72px,16.67vw,128px)] lg:h-[123px]',
  'h-[clamp(72px,16.67vw,128px)] lg:h-[85px]',
  'h-[clamp(72px,16.67vw,128px)] lg:h-[75px]',
]

export function ProcessFlow({ steps }: { steps: Step[] }) {
  return (
    <ol className="mt-24 space-y-0">
      {steps.map((step, i) => (
        <li
          key={step.name}
          className="grid items-center gap-x-8 gap-y-6 lg:grid-cols-[42px_minmax(0,300fr)_262px_minmax(0,600fr)]"
        >
          <span className="t-index self-start text-accent lg:pt-2">({step.index})</span>

          <h3 className="t-step w-fit self-start border-b border-silver/60 pb-3 text-silver">
            {step.name}
          </h3>

          {/* Shape + the connector down to the next one. */}
          <div className="relative flex flex-col items-end lg:items-center">
            <div
              className={`bg-mesh-placeholder flex w-[260px] items-center justify-center px-4 text-center lg:w-full ${SHAPES[step.shape].cls}`}
              style={SHAPES[step.shape].style}
            >
              <span className="t-label font-semibold text-cloud">{step.label}</span>
            </div>

            {/*
             * Drawn gap between one shape's bottom and the next shape's top:
             *
             *   1920:  123, 85, 75      768:  128, 128, 128
             *
             * A flat h-24 (96) matched neither. The narrow layout is uniform, so
             * it gets one value; the wide layout tightens as it descends, which
             * is why this reads off an array rather than a single class.
             *
             * NOTE for the owner — the drawn connector is a different object to
             * this one. The file has ONE continuous 2px line running behind the
             * shapes from the top of shape 2 to the top of shape 4, with a 6px
             * #A59BFF dot sitting on the bottom edge of each of the first three
             * shapes (Ellipse 159/155/156). There is no arrowhead anywhere. What
             * we render is a per-gap line with a triangle. Changing that is a
             * visual decision, not a measurement, so it is left as drawn-vs-built
             * rather than silently swapped.
             */}
            {i < steps.length - 1 && (
              <span aria-hidden="true" className={`flex flex-col items-center ${GAPS[i]}`}>
                <span className="w-px flex-1 bg-cloud/50" />
                <svg width="11" height="7" viewBox="0 0 11 7" className="-mt-px text-cloud/50">
                  <path d="M5.5 7L0 0h11L5.5 7z" fill="currentColor" />
                </svg>
              </span>
            )}
          </div>

          <p className="t-body self-start text-cloud/85 lg:pt-1">{step.body}</p>
        </li>
      ))}
    </ol>
  )
}

/**
 * Industry marks — three overlapping copies of one shape, offset ~15px.
 * Nesting depth encodes organisational scale (deck p195): ellipses for
 * startups, rectangles for SMBs, triangles for enterprise.
 */
export function IndustryMark({ shape }: { shape: 'ellipse' | 'rect' | 'triangle' }) {
  const base = 'absolute top-0 h-[75px] w-[45px] border border-accent'
  const geo = {
    ellipse: 'rounded-full',
    rect: '',
    triangle: '[clip-path:polygon(50%_0,100%_100%,0_100%)] border-0 bg-accent/30',
  }[shape]

  return (
    <div aria-hidden="true" className="relative mb-8 h-[75px] w-[101px]">
      {[0, 15, 30].map((x) => (
        <span key={x} className={`${base} ${geo}`} style={{ left: x }} />
      ))}
    </div>
  )
}
