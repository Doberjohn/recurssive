/**
 * The process flowchart.
 *
 * This is the brand's own logo construction used as a page section: the Reflow
 * mark is a recursive flowchart (Start -> Statement -> Condition -> Statement
 * -> End) abstracted into five shapes, and here the flowchart is drawn back out
 * in full. Missing that reads the section as four labels in boxes.
 *
 * Measured from the file — each shape is a mesh-gradient image masked by
 * flowchart geometry, roughly 260px wide, ~400px in from the content column:
 *
 *   terminator    ellipse            262x106   "Start the process"
 *   input/output  parallelogram      266x96    "Collect the data"
 *   decision      diamond            259x160   "Decide what to do"
 *   process       rounded rect r10   256x111   "Work on it"
 *
 * Shapes carry the mesh fill via CSS rather than a masked raster, so they cost
 * nothing extra — the gradient is already inlined for the mesh surfaces.
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
          <div className="relative flex flex-col items-center">
            <div
              className={`bg-mesh-placeholder flex w-full items-center justify-center px-4 text-center ${SHAPES[step.shape].cls}`}
              style={SHAPES[step.shape].style}
            >
              <span className="t-label font-semibold text-cloud">{step.label}</span>
            </div>

            {i < steps.length - 1 && (
              <span aria-hidden="true" className="flex h-24 flex-col items-center">
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
