/**
 * The process flowchart.
 *
 * This is the brand's own logo construction used as a page section: the Reflow
 * mark is a recursive flowchart (Start -> Statement -> Condition -> Statement
 * -> End) abstracted into five shapes, and here the flowchart is drawn back out
 * in full. Missing that reads the section as four labels in boxes.
 *
 * Rebuilt against `Our Process.svg`, a standalone 1920x1201 export of this
 * section supplied by the owner. That export settles three things the Home
 * figspec could only describe as "<N vector path(s)>", and every number below
 * is read off it rather than inferred:
 *
 *  1. Each shape carries a DIFFERENT mesh gradient, at its own crop. They were
 *     all `.bg-mesh-placeholder` — the interim stand-in that theme.css marks
 *     "swap when real specs arrive". These are the real specs. Every one of the
 *     four matched a file already in the pipeline at RMSE 0 (next-best 18-56),
 *     so nothing new had to be generated.
 *  2. The connector is a continuous 2px #FAFAFA line with a 6px #A59BFF dot on
 *     each shape's bottom edge and a 2px #A59BFF CHEVRON at the next shape's
 *     top edge. The previous note here recorded "no arrowhead anywhere" from
 *     the figspec; there is one, it is a chevron rather than the solid triangle
 *     that was standing in, and it is accent-coloured rather than cloud.
 *  3. The step-name rule is 3px #A59BFF, not the 1px silver/60 that was built.
 *
 * Geometry, 1920 frame, x measured against a content column of 163..1757:
 *
 *   index   163, 42 wide          name    205
 *   shapes  560..826, centred 693 body    1036, wrapping at 696
 *
 * The shapes are drawn at the same size in both frames — 1-2px between 1920 and
 * 768 is rounding, not intent — so their boxes are flat px rather than fluid.
 * What changes between breakpoints is everything around them:
 *
 * - Width. `w-full` is only right at lg, where the grid gives the shape its own
 *   column; below lg the single-column grid stretched it to the full content
 *   width (610 at 768), more than twice the drawn size.
 * - Alignment. At 768 the shapes sit at x429..689 in a content column that ends
 *   at 689 — flush right, not centred. (Left edge 350 into a 610 column.)
 */

export type Step = {
  index: string
  name: string
  label: string
  body: string
  shape: 'terminator' | 'io' | 'decision' | 'process'
}

/**
 * Every shape is built the way the file builds it: a mask, and a gradient
 * rectangle drawn inside it at a specific size and offset. Reproducing the
 * offset is the whole job — the footer note in Footer.tsx is the standing
 * example of what centring a mesh instead of cropping it costs.
 *
 * `mesh`/`gw`/`gh`/`gx`/`gy` are that rectangle: which gradient, drawn at what
 * size, at what offset from the shape's top-left. `rot` is the file's rotation
 * about that same offset point, which only the parallelogram carries.
 *
 * `grain` follows the ratio the contact card established: --grain-opacity 0.60
 * is calibrated for the footer, which draws the 4000px source at 2.08x, and a
 * surface drawing it at Nx needs 0.60 x 2.08/N. These four draw it at 7.1x to
 * 9.7x. Derived, not measured — the same status the contact card's 0.39 has.
 */
type ShapeSpec = {
  w: number
  h: number
  /** Radius cases; the other two need a path and set `clip`. */
  cls?: string
  clip?: string
  mesh: string
  gw: number
  gh: number
  gx: number
  gy: number
  rot?: number
  grain: number
}

const SHAPES: Record<Step['shape'], ShapeSpec> = {
  /* Terminator. A true ELLIPSE in the file (rx131 ry53), not the stadium that
     `rounded-full` produces — that gives semicircular ends and a flat top and
     bottom. `50%` is the radius that inscribes an ellipse in the box. */
  terminator: {
    w: 262, h: 106, cls: 'rounded-[50%]',
    mesh: 'var(--mesh-2)', gw: 411, gh: 257, gx: -13, gy: -129, grain: 0.128,
  },

  /* Input/output. The drawn parallelogram is ROUNDED at all four corners and
     slants 21.65px over 266 — 8.1%, against the 6% that was standing in. Both
     of those need the real path, so the file's own outline is used verbatim,
     translated into the box's coordinates. Fixed px in the path is fine here
     precisely because the shape does not resize. */
  io: {
    w: 266, h: 96,
    clip:
      'path("M246.44 87.89C245.41 92.45 241.36 95.69 236.68 95.69H12.51C6.1 95.69 1.35 89.74 2.76 83.49L19.87 7.89C20.9 3.34 24.95 0.1 29.62 0.1H222.97C223 0.1 223.02 0.08 223.01 0.05C223 0.02 223.02 0 223.05 0H253.75C260.16 0 264.92 5.95 263.51 12.2L246.44 87.89Z")',
    mesh: 'var(--mesh-7)', gw: 560.25, gh: 350.16, gx: 431.27, gy: 10.39, rot: 150,
    grain: 0.175,
  },

  /* Decision. Also rounded at each vertex, which a polygon() diamond cannot
     do — the four points came to sharp spikes. */
  decision: {
    w: 262, h: 161,
    clip:
      'path("M5.33 73.8L125.99 1.76C128.93 0 132.77 0 135.75 1.76L256.36 73.8C261.64 76.95 261.64 83.93 256.36 87.08L135.7 159.12C132.77 160.88 128.93 160.88 125.94 159.12L5.28 87.08C0 83.93 0 76.95 5.28 73.8L5.33 73.8Z")',
    mesh: 'var(--mesh-3)', gw: 468, gh: 293, gx: -2.34, gy: -127.56, grain: 0.146,
  },

  /* Process. Rounded rectangle, r10. */
  process: {
    w: 256, h: 111, cls: 'rounded-[10px]',
    mesh: 'var(--mesh-12)', gw: 440.74, gh: 275.46, gx: -129.66, gy: -70, grain: 0.138,
  },
}

/**
 * Gap below each shape, indexed by the step it hangs from. Measured shape-bottom
 * to shape-top: uniform 128 on the narrow layout, tightening 123 -> 85 -> 75 on
 * the wide one. Ramped below 768 (128/768 = 16.67vw) so a phone does not carry a
 * tablet's vertical rhythm.
 */
const GAPS = [
  'h-[clamp(72px,16.67vw,128px)] lg:h-[123px]',
  'h-[clamp(72px,16.67vw,128px)] lg:h-[85px]',
  'h-[clamp(72px,16.67vw,128px)] lg:h-[75px]',
]

/**
 * The gradient rectangle inside a shape's mask. Absolutely positioned so it
 * takes no part in centring the label, and clipped by the shape on the parent.
 *
 * `position` is set inline rather than with a utility class because `.mesh`
 * declares `position: relative` at the same specificity, and which one wins
 * would then depend on stylesheet order.
 */
function ShapeFill({ s }: { s: ShapeSpec }) {
  return (
    <span
      aria-hidden="true"
      className="mesh"
      style={{
        position: 'absolute',
        left: s.gx,
        top: s.gy,
        width: s.gw,
        height: s.gh,
        ...(s.rot ? { transformOrigin: '0 0', transform: `rotate(${s.rot}deg)` } : {}),
        ['--mesh' as string]: s.mesh,
        // The file's patterns map each image onto its rect 1:1 (every pattern
        // transform resolves to 1.000-1.002 of the rect in both axes), so the
        // gradient fills this layer exactly and the crop is done by the offset.
        ['--mesh-size' as string]: '100% 100%',
        ['--grain-opacity' as string]: s.grain,
      }}
    />
  )
}

/**
 * One gap's worth of connector.
 *
 * The file draws this as ONE 2px #FAFAFA line running from inside shape 1 to
 * the centre of shape 4, painted BEHIND the shapes, so all that is ever visible
 * is the three gaps. Rendering it per-gap is the same picture and does not need
 * the shapes to be transparent-safe.
 *
 * Dot and chevron are absolutely positioned because both straddle an edge: the
 * dot is centred ON the bottom edge of the shape above (half of it is over the
 * shape), and the chevron's tip lands on the top edge of the shape below. In
 * flow they would each have eaten their own height out of the measured gap.
 */
function Connector({ gap }: { gap: string }) {
  return (
    <span aria-hidden="true" className={`relative flex flex-col items-center ${gap}`}>
      <span className="h-full w-[2px] bg-cloud" />

      {/* Ellipse 159/155/156 — 6px, on the shape's bottom edge. */}
      <span className="absolute top-0 size-[6px] -translate-y-1/2 rounded-full bg-accent" />

      {/* Chevron, not a filled triangle: a 2px stroke with round caps, arms of
          6.06px each way, so 12.12 across and 6.06 down. Sized to the drawn
          14.12x8.06 including the caps. */}
      <svg
        width="14.12"
        height="8.06"
        viewBox="0 0 14.12 8.06"
        fill="none"
        className="absolute -bottom-px text-accent"
      >
        <path
          d="M1 1L7.06 7.06L13.12 1"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

export function ProcessFlow({ steps }: { steps: Step[] }) {
  return (
    <ol className="mt-24 space-y-0">
      {steps.map((step, i) => {
        const s = SHAPES[step.shape]
        return (
          <li
            key={step.name}
            /* Column edges are the drawn ones, so the grid carries no gap of
               its own — the 210px between the shape and the body IS a column.
               163 | 42 | 355 | 266 | 210 | 721 | 1757. The fixed 266 is the
               shape; the two fr tracks split what is left in the drawn ratio,
               which is what keeps this sane between lg and 1920. */
            className="grid items-center gap-y-6 lg:grid-cols-[42px_minmax(0,355fr)_266px_minmax(0,210fr)_minmax(0,721fr)]"
          >
            {/* NOT `.t-index`. That token is ServiceIndex's — 14px Open Sans,
                measured off its own rows — and this borrowed it, which is why
                the number rendered 14px Open Sans at 1920 against a drawn 20px
                Inter Regular. Both frames draw this one at 20/24, so unlike the
                rest of the page it does not step between breakpoints. */}
            <span className="self-start font-heading text-[20px] leading-[1.2] text-accent">
              ({step.index})
            </span>

            {/* Rule: 3px #A59BFF. w-fit so it measures the name, as drawn —
                83/130/121/144 against name widths of 82/123/118/139. */}
            <h3 className="t-step w-fit self-start border-b-[3px] border-accent pb-3 text-silver">
              {step.name}
            </h3>

            {/* A fixed 266 column — the widest shape — centred on its own
                axis and pushed flush right below lg, which is where the frame
                puts the group (x429..689 in a content column ending at 689).

                `items-end` used to do the pushing, and it could not survive the
                shapes having their own widths: right-aligning boxes of 256..266
                puts their centres 10px apart, and the connector, which is a
                flex item barely wider than its chevron, was aligned to the same
                right edge — so below lg it hung off the shapes' right shoulder
                instead of running down their spine. The flowchart's spine is
                the one thing in here that cannot drift. */}
            <div className="relative ml-auto flex w-[266px] flex-col items-center lg:ml-0 lg:w-full">
              <div
                className={`relative flex items-center justify-center overflow-hidden px-4 text-center ${s.cls ?? ''}`}
                style={{
                  width: s.w,
                  height: s.h,
                  ...(s.clip ? { clipPath: s.clip } : {}),
                }}
              >
                <ShapeFill s={s} />
                <span className="t-label relative font-semibold text-cloud">{step.label}</span>
              </div>

              {i < steps.length - 1 && <Connector gap={GAPS[i]} />}
            </div>

            <p className="t-body self-start text-cloud/85 lg:col-start-5 lg:max-w-[696px] lg:pt-1">
              {step.body}
            </p>
          </li>
        )
      })}
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
