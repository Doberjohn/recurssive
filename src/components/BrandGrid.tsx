/**
 * The construction grid behind the FAQ.
 *
 * In `Home.svg` this is document element #2 — the very first thing painted
 * after the page ground, a full-bleed line drawing at 10% opacity that runs
 * y2914..4293. Everything else is painted over it, so the only stretch where
 * it actually shows is y3051..4146: the gap between the Industries photograph
 * and the Process photograph, which is exactly the FAQ. That is why it reads
 * as "the FAQ background" even though nothing scopes it to the FAQ.
 *
 * The geometry is the brand's own construction diagram — the triangles and
 * bisectors the Reflow mark is derived from, blown up to page scale and turned
 * down until it is barely there. Same move as the process flowchart: the logo's
 * construction reused as page furniture.
 *
 * Measured from the file: 43 stroked polygons, #4813D0, 1.5px, no fill, group
 * opacity 0.1. Deduplicating shared polygon edges gives 81 unique segments —
 * pixel-equivalent (only sub-pixel antialiasing differs) at 573 B brotli.
 *
 * `vector-effect="non-scaling-stroke"` holds the hairline at 1.5px as the
 * drawing scales down, so it does not fade out entirely on a phone.
 */

const D =
  'M1390.6 3299L1935.1 2914M1179.7 2914L1390.6 3299M1179.7 2914L1935.1 2914M1935.1 2914L1935.1 3448.4M1642.4 3448.4L1935.1 3448.4M1935.1 2914L1642.4 3448.4M1935.1 3448.4L1935.1 3758.4M1642.2 3758.4L1935.1 3758.4M1557.5 3603.5L1642.2 3758.4M1642.4 3448.4L1557.5 3603.5M1935.1 3758.4L1935.1 4292.3M1934.6 4292L1642.2 3758.4M1934.8 4292.3L1180.1 4292.3M1390.8 3907.6L1180.1 4292.3M1934.6 4292L1390.8 3907.6M1935.1 4292.9L740.4 4292.9M740.4 4292.3L1934.8 4292.3M1179.7 3758.4L740.4 3758.4M740.4 3758.4L740.4 4292.3M740.4 4292.3L1179.7 4292.3M1179.7 4292.3L1179.7 3758.4M1179.6 3758.4L740.6 3758.4M960.1 3603.3L740.6 3758.4M1179.6 3758.4L960.1 3603.3M1179.7 3758.4L1179.7 3448.4M960.1 3603.3L1179.1 3448.4M1179.1 3448.4L960.2 3603.3M960.2 3603.3L741.1 3448.4M741.1 3448.4L1179.1 3448.4M740.4 3448.4L740.4 3758.4M741 3448.4L960.1 3603.3M1179.7 3448L1179.7 2914M1179.1 3448.4L741 3448.4M740.4 2914L740.4 3448M740.4 2914L1179.7 2914M515.7 3289L740.4 3448M714.1 2914L515.7 3289M714.1 2914L740.4 2914M-15 2914L515.7 3289M-15 2914L714.1 2914M431.4 3448.4L515.7 3289M267.7 3448.4L431.4 3448.4M-15 2914L267.7 3448.4M431.4 3448.4L740.4 3448.4M-15 3448.4L267.7 3448.4M-15 3448.4L-15 2914M349.6 3603.3L431.4 3448.4M267.7 3448.4L349.6 3603.3M267.4 3758.4L349.6 3603.3M-15 3758.4L267.4 3758.4M-15 3758.4L-15 3448.4M267.4 3758.4L431.7 3758.4M349.6 3603.3L431.7 3758.4M740.4 3758.4L431.8 3758.4M431.8 3758.4L349.6 3603.3M515.7 3917.3L740.4 3758.4M431.7 3758.4L515.7 3917.3M431.7 3758.4L740.4 3758.4M-15 4292.3L515.7 3917.3M267.4 3758.4L-15 4292.3M-15 4292.3L-15 3758.4M714.1 4292.3L-15 4292.3M714.1 4292.3L515.7 3917.3M740.4 4292.3L714.1 4292.3M1179.7 4292.3L-15 4292.3M-15 4292.9L1179.7 4292.9M1179.7 3448L1390.6 3299M1642.2 3758.4L1472.6 3758.4M1557.5 3603.5L1472.6 3758.4M1472.6 3758.4L1390.8 3907.6M1472.6 3758.4L1642.3 3758.4M1642.3 3758.4L1934.6 4292M1642.4 3448.4L1472.4 3448.4M1472.4 3448.4L1390.6 3299M1472.5 3448.3L1179.7 3448.3M1390.6 3299L1472.5 3448.3M1179.7 3758.4L1472.6 3758.4M1179.7 3448.4L1472.5 3448.4M1557.5 3603.5L1472.5 3448.4M1472.5 3448.4L1642.4 3448.4M1179.7 3758.4L1390.8 3907.6'

export function BrandGrid({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 2914 1920 1379"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      className={className}
    >
      <path
        d={D}
        stroke="var(--color-primary)"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        opacity="0.1"
      />
    </svg>
  )
}
