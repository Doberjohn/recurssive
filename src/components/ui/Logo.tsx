/**
 * The Reflow mark.
 *
 * Five shapes — two ellipses, two parallelograms and one rhombus — matching the
 * construction on deck p120.
 *
 * Generated from the designer's own export (`footer-mobile/Group.svg`,
 * viewBox 0 0 120 80, ink 119.94x80.10). Do not hand-edit or "tidy" these
 * paths, and do not re-crop the viewBox — regenerate them.
 *
 * The previous version carried a viewBox lifted from the 100-tile lockup sheet,
 * `1269.18 1517.68 95.49 57.76`. That box is aspect 1.653, but the mark is
 * 1.497: two independent exports agree — this one, and the footer.svg mark at
 * 160x106.9. So the crop was carrying padding, and every instance rendered ~9%
 * short. In the footer that cost 6.4px of height and pushed the three columns
 * up out of position, which is how it was caught.
 *
 * Inlined rather than <img> so it inherits currentColor — one component serves
 * light headers, dark footers, purple and lavender surfaces.
 *
 * Drawn sizes: 120x79 mobile footer, 160x106 desktop footer.
 */
export function Logo({
  className = '',
  title = 'Recurssive',
}: {
  className?: string
  title?: string
}) {
  return (
    <svg
      viewBox="0 0 120 80"
      fill="currentColor"
      role="img"
      aria-label={title}
      className={className}
    >
      <path d="M58.06 78.07C51.22 65.68 44.39 52.96 37.58 41.08C37.07 40.22 37.07 39.07 37.58 38.21C44.37 26.32 51.22 13.6 58.06 1.22C58.96 -0.41 60.96 -0.41 61.85 1.22C68.7 13.61 75.53 26.34 82.34 38.21C82.85 39.07 82.85 40.22 82.34 41.08C75.55 52.97 68.7 65.69 61.85 78.07C60.96 79.7 58.96 79.7 58.06 78.07Z" />
      <path d="M32.33 69.35C28.48 68.83 24.64 68.2 20.83 67.48C19.9 67.3 19.15 66.16 19.15 64.97V14.29C19.15 13.09 19.9 11.97 20.83 11.78C24.64 11.05 28.48 10.43 32.33 9.91C33.28 9.79 34.03 10.74 34.05 12.06V67.2C34.05 68.52 33.28 69.47 32.33 69.35Z" />
      <path d="M7.45 21.38C11.58 20.45 14.97 28.69 14.97 39.63C14.97 50.57 11.58 58.81 7.45 57.87C3.32 56.92 0 48.68 0 39.63C0 30.58 3.32 22.34 7.45 21.38Z" />
      <path d="M87.6 9.91C91.46 10.43 95.3 11.05 99.1 11.78C100.04 11.95 100.79 13.09 100.79 14.29V64.99C100.79 66.18 100.04 67.3 99.1 67.49C95.3 68.22 91.46 68.85 87.6 69.36C86.66 69.49 85.89 68.53 85.89 67.22V12.06C85.89 10.74 86.66 9.79 87.6 9.91Z" />
      <path d="M119.94 39.63C119.94 48.68 116.62 56.92 112.49 57.87C108.35 58.81 104.97 50.57 104.97 39.63C104.97 28.69 108.35 20.45 112.49 21.38C116.62 22.34 119.94 30.58 119.94 39.63Z" />
    </svg>
  )
}
