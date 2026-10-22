/**
 * The carousels' arrow: a 35px shaft, 4 thick, and a round-ended head, 37x30
 * overall, in the current colour. Both 768 frames draw it, beside Home's
 * industries and the capability page's tech groups; `prev` is the same mark
 * mirrored, as drawn.
 */
export function SlideArrow({ direction }: { direction: 'prev' | 'next' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="1723 1632.08 37.2 29.84"
      className={`h-[30px] w-[37px] fill-current ${direction === 'prev' ? '-scale-x-100' : ''}`}
    >
      <path d="M1759.41 1648.41C1760.2 1647.63 1760.2 1646.37 1759.41 1645.59L1746.69 1632.86C1745.91 1632.08 1744.64 1632.08 1743.86 1632.86C1743.08 1633.64 1743.08 1634.91 1743.86 1635.69L1755.17 1647L1743.86 1658.31C1743.08 1659.09 1743.08 1660.36 1743.86 1661.14C1744.64 1661.92 1745.91 1661.92 1746.69 1661.14L1759.41 1648.41ZM1723 1647L1723 1649L1758 1649L1758 1647L1758 1645L1723 1645L1723 1647Z" />
    </svg>
  )
}
