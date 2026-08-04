import { Picture } from './ui/Picture'
import { BinaryMark } from './ui/BinaryMark'

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
 * The artwork is the Reflow mark drawn in binary — see ui/BinaryMark, which the
 * error states share. The five clusters in the export are the five Logo shapes,
 * so it clips one field with `LOGO_PATHS` rather than carrying a second copy of
 * the geometry; STATE.md records that copy going silently wrong for months.
 */

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
          <BinaryMark className="reflow-binary" />

          {/* The words sit ON the artwork, not under it: drawn at y1471 against
              an artwork spanning 1197..1823, i.e. 43.8% down it. Reads the same
              at 768 (184 into 421).

              justify-between across the two PARALLELOGRAMS — shapes 2 and 4 —
              not across the whole mark. Measured off feel-form-function.svg,
              whose five binary clusters sit at:

                1  479.0 ..  594.8   ellipse
                2  632.1 ..  749.2   parallelogram   <- "Feel." ink at 636.1
                3  778.3 .. 1142.5   rhombus
                4 1171.5 .. 1286.9   parallelogram   <- "Function." ink to 1284.4
                5 1325.3 .. 1441.0   ellipse

              The words touch 2 and 4 to within 4px; the outer ellipses are 157px
              away. Across the 962 artwork that is 15.92% to 83.98%.

              The em insets cancel the outer glyphs' side bearings, so it is the
              INK that lands on those edges rather than the layout boxes. */}
          <h2
            id="feel-form-function"
            className="absolute top-[43.8%] flex flex-nowrap items-baseline justify-between whitespace-nowrap font-heading font-semibold tracking-[-0.05em] text-cloud"
            style={{
              fontSize: 'clamp(24px, 25.97px + 1.632vw, 57.3px)',
              left: 'calc(15.92% - var(--ffs-bearing-l))',
              right: 'calc(16.02% - var(--ffs-bearing-r))',
              // Measured off the rendered font with canvas actualBoundingBox at
              // this weight and tracking: the F of "Feel." begins 0.0526em right
              // of its box, and the trailing full stop ends 0.0235em left of the
              // advance. Pulling the row out by exactly those lands the INK on
              // the artwork's edges rather than the layout boxes.
              ['--ffs-bearing-l' as string]: '0.0526em',
              ['--ffs-bearing-r' as string]: '0.0235em',
            }}
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
