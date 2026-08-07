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
  /** Radius cases; the other two need an outline and set `clipId`. */
  cls?: string
  clipId?: string
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
    w: 266, h: 96, clipId: 'proc-io',
    mesh: 'var(--mesh-7)', gw: 560.25, gh: 350.16, gx: 431.27, gy: 10.39, rot: 150,
    grain: 0.175,
  },

  /* Decision. Also rounded at each vertex, which a polygon() diamond cannot
     do — the four points came to sharp spikes. */
  decision: {
    w: 262, h: 161, clipId: 'proc-decision',
    mesh: 'var(--mesh-3)', gw: 468, gh: 293, gx: -2.34, gy: -127.56, grain: 0.146,
  },

  /* Process. Rounded rectangle, r10. */
  process: {
    w: 256, h: 111, cls: 'rounded-[calc(var(--sw)*10/266)]',
    mesh: 'var(--mesh-12)', gw: 440.74, gh: 275.46, gx: -129.66, gy: -70, grain: 0.138,
  },
}

/**
 * The two shapes that need a real outline, as SVG clipPaths in
 * objectBoundingBox units so they SCALE.
 *
 * They were `clip-path: path(...)` with the file's own px coordinates, and
 * `path()` has no relative units — which is the single reason the two-column
 * narrow layout could not go below 640px. A fixed 266px graphic beside a text
 * column leaves 61px for the text at 375. Normalising each coordinate by the
 * shape's own drawn box turns the same outlines into something that fits any
 * width, and at 266 they resolve back to the px values they replaced.
 *
 * Rendered once, off-canvas. Not `display: none` — a clipPath referenced from
 * a hidden subtree is a well-known way to get an empty clip, and an empty clip
 * renders NOTHING rather than falling back to unclipped (STATE.md records that
 * exact trap from the Contact artwork).
 */
function ClipPaths() {
  return (
    <svg
      aria-hidden="true"
      width="0"
      height="0"
      className="absolute h-0 w-0 overflow-hidden"
      focusable="false"
    >
      <defs>
        <clipPath id="proc-io" clipPathUnits="objectBoundingBox">
          <path d="M0.92647 0.91552C0.92259 0.96302 0.90737 0.99677 0.88977 0.99677H0.04703C0.02293 0.99677 0.00508 0.93479 0.01038 0.86969L0.0747 0.08219C0.07857 0.03479 0.0938 0.00104 0.11135 0.00104H0.83823C0.83835 0.00104 0.83842 0.00083 0.83838 0.00052C0.83835 0.00021 0.83842 0 0.83853 0H0.95395C0.97805 0 0.99594 0.06198 0.99064 0.12708L0.92647 0.91552Z" />
        </clipPath>
        <clipPath id="proc-decision" clipPathUnits="objectBoundingBox">
          <path d="M0.02034 0.45839L0.48088 0.01093C0.4921 0 0.50676 0 0.51813 0.01093L0.97847 0.45839C0.99863 0.47795 0.99863 0.5213 0.97847 0.54087L0.51794 0.98832C0.50676 0.99925 0.4921 0.99925 0.48069 0.98832L0.02015 0.54087C0 0.5213 0 0.47795 0.02015 0.45839L0.02034 0.45839Z" />
        </clipPath>
      </defs>
    </svg>
  )
}

/**
 * Gap below each shape, indexed by the step it hangs from. Measured shape-bottom
 * to shape-top: uniform 128 on the narrow layout, tightening 123 -> 85 -> 75 on
 * the wide one. Ramped below 768 (128/768 = 16.67vw) so a phone does not carry a
 * tablet's vertical rhythm.
 *
 * A FLOOR, not a fixed height, and the connector grows into whatever is left.
 * The drawn rhythm has no slack in it: at 768 the file's step body is 88
 * characters in a 321 column and ours is 123, which is five lines instead of
 * three, and with a fixed gap step 2's index landed 22px inside step 1's last
 * line. Growing the gap is the honest response — the alternative is a hard
 * collision the moment real copy is longer than the placeholder. At the drawn
 * copy length nothing grows and every gap is exactly the drawn one.
 */
const GAPS = [
  'min-h-[clamp(72px,16.67vw,128px)] lg:min-h-[123px]',
  'min-h-[clamp(72px,16.67vw,128px)] lg:min-h-[85px]',
  'min-h-[clamp(72px,16.67vw,128px)] lg:min-h-[75px]',
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
  /** Every offset rides --sw so the crop stays the drawn one at any size. */
  const u = (n: number) => `calc(var(--sw) * ${+(n / 266).toFixed(6)})`
  return (
    <span
      aria-hidden="true"
      className="mesh"
      style={{
        position: 'absolute',
        left: u(s.gx),
        top: u(s.gy),
        width: u(s.gw),
        height: u(s.gh),
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
    <span aria-hidden="true" className={`relative flex w-full flex-1 flex-col items-center ${gap}`}>
      {/* `flex-1`, not `h-full`. A percentage height resolves against the
          parent's SPECIFIED height, and the connector's is now `min-height`
          with `height: auto` — so `h-full` computed to auto, the line had no
          content, and it collapsed to nothing. Growing along the flex main
          axis is indifferent to how the parent got its height. */}
      <span className="w-[2px] flex-1 bg-cloud" />

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
    /* 131 at 768 is measured from the intro's box to the first SHAPE's top,
       which from sm up is where the first row starts — the text beside it is
       out of flow and hangs ~62 above that, landing 63 below the intro exactly
       as drawn. Below sm the text is back in flow, so the drawn 131 would be
       measuring the wrong thing and mt-24 stands. */
    <ol className="mt-[131px] space-y-0 lg:mt-24">
      <ClipPaths />
      {steps.map((step, i) => {
        const s = SHAPES[step.shape]
        return (
          <li
            key={step.name}
            /* Two columns below lg, five at lg — and TWO all the way down to
               320 now, not just to 640.

               At 1920 the column edges are the drawn ones, so the grid carries
               no gap of its own — the 210px between the shape and the body IS a
               column. 163 | 42 | 355 | 266 | 210 | 721 | 1757.
               At 768 `our process mobile.svg` draws index/name/body down the
               left and the shapes beside them, flush right at x429..689 in a
               610 column: 266 of 610 is 43.61%.

               `--sw` is that column, and it is the ONE number the whole shape
               column derives from — every box, radius, padding, gradient offset
               and the text's own vertical anchor is `calc(var(--sw) * n/266)`.
               At 768 it resolves to exactly 266 and every one of them returns
               the drawn pixel value. Capped at 266 so it stops growing once the
               container passes 610, which is what keeps 768..1024 drawn.

               `container-type: inline-size` is what makes 43.61cqw mean "of the
               content column" rather than of the viewport, so the gutters do
               not skew it.

               BELOW sm it stacks, and --sw goes back to the full column so the
               flowchart is drawn at its proper 266. Two columns were tried down
               to 320 once the shapes could scale, and they do scale — but the
               composition does not survive it. At 375 the shape column is 140
               and the text column 163: "Decide what to do" no longer fits
               inside its own diamond and gets clipped by it, and the body falls
               to eight ~20-character lines. Stacking is the better reading of
               the same design at that width, and it is the only place on this
               page where the narrow frame is departed from. */
            className="@container relative grid grid-cols-[minmax(0,1fr)_var(--sw)] items-center [--sw:clamp(60px,calc(50.18cqw_-_40.1px),266px)] lg:grid-cols-[42px_minmax(0,355fr)_var(--sw)_minmax(0,210fr)_minmax(0,721fr)] lg:[--sw:266px]"
          >
            {/* The narrow layout's left column. `lg:contents` dissolves it so
                the three become the li's own grid items again at lg.

                It stays in FLOW so the row can grow when the text needs more
                room than the drawn gap leaves (see GAPS), except on the last
                step, where there is no connector to be taller than it and an
                in-flow half-height would leave ~125px of phantom space under
                the band. Nothing follows that one, so out of flow is safe.

                Vertically the text is centred against the SHAPE, then lifted
                25. Measured on the export, the shape centre sits 29.3 / 19.1 /
                18.9 / 31.6 below the text block's centre; one 25px lift fits
                all four inside 7px, which is closer than any top- or
                bottom-alignment rule gets — the decision diamond is 160 tall
                against ~100 for the other three, so anything anchored to an
                edge fails on step 3.

                The 25 is a flat px, not scaled — it is a nudge against the
                text's own metrics rather than part of the flowchart, and the
                type does not shrink at the shape's rate. */}
            {/* The offset rides a custom property rather than `top`/`margin`
                directly, because an inline declaration cannot be scoped to a
                breakpoint and this one must not apply to the five-column layout
                at lg. */}
            <div
              className={`-translate-y-1/2 lg:contents ${
                i === steps.length - 1
                  ? 'absolute left-0 right-[var(--sw)] top-[var(--txt-top)]'
                  : 'col-start-1 row-start-1 mt-[var(--txt-top)] self-start'
              }`}
              style={{
                ['--txt-top' as string]: `max(20px, calc(var(--sw) * ${+(s.h / 2 / 266).toFixed(6)} - 25px))`,
              }}
            >
              <div className="flex lg:contents">
                {/* NOT `.t-index`. That token is ServiceIndex's — 14px Open Sans,
                    measured off its own rows — and this borrowed it, which is why
                    the number rendered 14px Open Sans at 1920 against a drawn 20px
                    Inter Regular. Both frames draw this one at 20/24, so unlike the
                    rest of the page it does not step between breakpoints.

                    44 wide at 768 (index x79, name x123). */}
                <span className="w-11 shrink-0 self-start font-heading text-[20px] leading-[1.2] text-accent lg:w-auto">
                  ({step.index})
                </span>

                {/* Rule: 3px #A59BFF. w-fit so it measures the name, as drawn —
                    83/130/121/144 against name widths of 82/123/118/139, and
                    70/109/101/121 against 68/103/99/116 at 768. */}
                <h3 className="t-step w-fit self-start border-b-[3px] border-accent pb-3 text-silver">
                  {step.name}
                </h3>
              </div>

              {/* 29 from the rule, and 330 wide — the 768 frame draws the body
                  at x79 in a 321-box, i.e. at the gutter under the name rather
                  than indented to it.

                  18/27 at 1920, not `.t-body`'s 16/24. Measured off the export:
                  the ink is 667.88x71.98 over three lines, which is a 26.94
                  line-height, and the figspec agrees at 18px. At 16 the same
                  copy fitted in two, so this was not only a size difference —
                  the block was a line short of the drawn one. Same step up the
                  Industry columns take, and the same 1.5 ratio. */}
              <p className="t-body mt-[29px] text-cloud max-w-[330px] lg:max-w-none lg:col-start-5 lg:mt-0 lg:max-w-[696px] lg:self-start lg:pt-1 lg:text-[18px] lg:leading-[27px]">
                {step.body}
              </p>
            </div>

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
            {/* Stretched from sm up, not centred, so the shape sits on the row
                top and the connector below it takes whatever height is left —
                which is how a grown row still lands the next shape exactly at
                the row's end. */}
            <div className="relative col-start-2 row-start-1 ml-auto flex w-full flex-col items-center self-stretch lg:col-start-3 lg:ml-0 lg:self-center">
              <div
                className={`relative flex items-center justify-center overflow-hidden px-[calc(var(--sw)*16/266)] text-center ${s.cls ?? ''}`}
                style={{
                  width: `calc(var(--sw) * ${+(s.w / 266).toFixed(6)})`,
                  height: `calc(var(--sw) * ${+(s.h / 266).toFixed(6)})`,
                  ...(s.clipId ? { clipPath: `url(#${s.clipId})` } : {}),
                }}
              >
                <ShapeFill s={s} />
                <span className="relative text-[max(11px,calc(var(--sw)*20/266))] font-semibold leading-[1.4] text-cloud lg:text-[18px]">
                  {step.label}
                </span>
              </div>

              {i < steps.length - 1 && <Connector gap={GAPS[i]} />}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

/**
 * Industry marks — three overlapping copies of one flowchart shape. Nesting
 * depth encodes organisational scale (deck p195).
 *
 * Rebuilt from `Industries we serve.svg`, which shows the previous version was
 * wrong in every respect except the 75px height. The file builds each mark the
 * way it builds the process shapes: a mask of 2px STROKED outlines with a
 * meshnoise gradient rect behind it, so what you see is gradient in the shape
 * of three outlines — not an accent border, and not a filled triangle.
 *
 *   startups     three 101x45 ellipses stacked VERTICALLY at y0/15/30 — the
 *                previous build had them 45x101 and offset sideways, i.e. the
 *                shape rotated 90 degrees and stacked on the wrong axis
 *   SMBs         three TRAPEZOIDS, 100.5 across the top narrowing to 67.1 at
 *                the bottom, offset 0/12/28 (the file's own spacing; the other
 *                two marks use 15/30, see STATE.md)
 *   enterprise   three OUTLINE triangles, base 96.7, height 72.2, offset
 *                0/15/30
 *
 * The group boxes are 101 / 131 / 132 wide — they are not one size. Two of the
 * three match the .fig exactly; the third does not, and the export wins. See
 * STATE.md.
 *
 * The gradient is `meshnoise-gradient-4`, identified at RMSE 1.02 against a
 * next-best of 41.35 across all ten tokens — the first use of --mesh-4 in the
 * build. Drawn 440.74x275.46 and rotated 180 about its own corner, exactly as
 * the four process shapes are. Grain follows the same ratio those use: 0.60 is
 * calibrated for the footer's 2.08x draw of the 4000px source, this draws it at
 * 9.07x, so 0.60 * 2.08/9.07.
 */
type MarkSpec = { w: number; h: number; mask: string; gx: number; gy: number }

/** Mask geometry, in each group's own coordinates. White = the gradient shows. */
const svgMask = (viewBox: string, body: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='${viewBox}'>` +
      `<g fill='none' stroke='#fff' stroke-width='2'>${body}</g></svg>`,
  )}")`

const MARKS: Record<'ellipse' | 'trapezoid' | 'triangle', MarkSpec> = {
  ellipse: {
    w: 101, h: 75, gx: -112, gy: -83,
    mask: svgMask(
      '0 0 101 75',
      [52.5, 37.5, 22.5]
        .map((cy) => `<ellipse cx='50.5' cy='${cy}' rx='49.5' ry='21.5'/>`)
        .join(''),
    ),
  },
  trapezoid: {
    w: 131, h: 75, gx: -89, gy: -82,
    mask: svgMask(
      '0 0 131 75',
      [28, 12, 0]
        .map((dx) => `<path d='M${101.745 + dx} 1L${85.036 + dx} 74H${17.964 + dx}L${1.255 + dx} 1Z'/>`)
        .join(''),
    ),
  },
  triangle: {
    w: 132, h: 75, gx: -111, gy: -82,
    mask: svgMask(
      '0 0 132 75',
      [30, 15, 0]
        .map((dx) => `<path d='M${99.36 + dx} 74L${2.64 + dx} 74L${51 + dx} 1.797Z'/>`)
        .join(''),
    ),
  },
}

export function IndustryMark({ shape }: { shape: keyof typeof MARKS }) {
  const m = MARKS[shape]
  return (
    // The mask lives on the WRAPPER, not on the gradient layer: the layer is
    // rotated 180 and a mask on it would rotate with it.
    <div
      aria-hidden="true"
      className="relative mb-[15px]"
      style={{
        width: m.w,
        height: m.h,
        maskImage: m.mask,
        WebkitMaskImage: m.mask,
        maskSize: '100% 100%',
        WebkitMaskSize: '100% 100%',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
      }}
    >
      <span
        className="mesh"
        style={{
          position: 'absolute',
          left: m.gx,
          top: m.gy,
          width: 440.74,
          height: 275.46,
          transform: 'rotate(180deg)',
          ['--mesh' as string]: 'var(--mesh-4)',
          ['--mesh-size' as string]: '100% 100%',
          ['--grain-opacity' as string]: 0.138,
        }}
      />
    </div>
  )
}
