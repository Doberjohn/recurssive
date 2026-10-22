import { platforms } from '@/content/capability-page'

/**
 * "We develop for" — the three mesh cards after the tech band, from the
 * Capability frames.
 *
 *              1920                            768
 *   heading    48, top 131 under the band      42, top 98 under it
 *   intro      16, 477, #6B6B6B                24 at -3%, the column
 *   cards      three across, 457x351, r35,     stacked, the column x 405,
 *              111.5 apart, 45 under the       50.5 apart, 34 under the
 *              intro's text                    intro's text
 *   mesh       --mesh-11, centred, its height  the same at 126.8%
 *              118.3% of the card's
 *   inside     57 in; marks' feet 77 down;     57 in; feet 81 down; title
 *              title (32) 94 down (box); body  98; body 24 at -3% in 482,
 *              18 / 1.5 in 343, 141 down;      141 down; 48 under it
 *              48 under it
 *   foot       173 above the band              112
 *
 * The marks are the file's own, one white path each, lifted from the 1920
 * export: a browser window 37x37, Android 34x40, Apple 32x40, set on a
 * shared foot as drawn. Body copy is 18px at 1920 where .t-body is 16 — like
 * Home's industries, a step up the designs take in cards on a mesh.
 *
 * The first card's content is drawn 47 in at 1920 and the others 57 — the
 * 768 frame and the body's own 343 in a 457 card (57 each side) agree on 57,
 * so all three take it. Three across needs ~320 of column per card before the
 * body is too narrow to read, so the row starts at xl; below it the cards
 * stack as the 768 frame draws them.
 */
const MARKS = {
  web: {
    box: [37, 37],
    d: 'M37 28.29C37 33.1 33.1 37 28.29 37H8.71C3.9 37 0 33.1 0 28.29V10.09H37V28.29ZM7.99 7.99H.03C.38 3.75 3.75.38 7.99.03V7.99ZM28.29 0C32.86 0 36.6 3.52 36.97 7.99H10.09V0H28.29Z',
  },
  android: {
    box: [34, 40],
    d: 'M11.9 8.53C12.16 8.53 12.38 8.44 12.57 8.26C12.75 8.07 12.85 7.85 12.85 7.6C12.85 7.34 12.75 7.12 12.57 6.94C12.38 6.75 12.16 6.66 11.9 6.66C11.65 6.66 11.43 6.75 11.25 6.94C11.08 7.12 10.99 7.34 10.99 7.6C10.99 7.85 11.08 8.07 11.25 8.26C11.43 8.44 11.65 8.53 11.9 8.53ZM22.1 8.53C22.35 8.53 22.57 8.44 22.75 8.26C22.92 8.07 23.01 7.85 23.01 7.6C23.01 7.34 22.92 7.12 22.75 6.94C22.57 6.75 22.35 6.66 22.1 6.66C21.84 6.66 21.62 6.75 21.43 6.94C21.25 7.12 21.15 7.34 21.15 7.6C21.15 7.85 21.25 8.07 21.43 8.26C21.62 8.44 21.84 8.53 22.1 8.53ZM2.49 12.96C3.16 12.96 3.74 13.2 4.23 13.68C4.71 14.16 4.95 14.74 4.95 15.41V25.75C4.95 26.43 4.71 27.02 4.24 27.5C3.76 27.98 3.18 28.22 2.49 28.22C1.79 28.22 1.21 27.98.72 27.5C.24 27.02 0 26.43 0 25.75V15.41C0 14.74.24 14.16.72 13.68C1.21 13.2 1.79 12.96 2.49 12.96ZM28.08 13.41V29.42C28.08 30.16 27.83 30.79 27.31 31.3C26.8 31.81 26.18 32.07 25.45 32.07H23.64V37.52C23.64 38.21 23.4 38.8 22.92 39.28C22.43 39.76 21.85 40 21.15 40C20.46 40 19.87 39.76 19.39 39.28C18.91 38.8 18.67 38.21 18.67 37.52V32.07H15.33V37.52C15.33 38.21 15.09 38.8 14.61 39.28C14.13 39.76 13.54 40 12.85 40C12.17 40 11.59 39.76 11.11 39.28C10.63 38.8 10.38 38.21 10.38 37.52L10.36 32.07H8.57C7.83 32.07 7.21 31.81 6.69 31.3C6.17 30.79 5.92 30.16 5.92 29.42V13.41H28.08ZM22.48 3.68C24.2 4.56 25.58 5.79 26.61 7.37C27.64 8.95 28.16 10.67 28.16 12.55H5.82C5.82 10.67 6.34 8.95 7.37 7.37C8.39 5.79 9.78 4.56 11.52 3.68L9.8.53C9.69.32 9.73.16 9.92.05C10.13-.05 10.29 0 10.41.19L12.15 3.37C13.68 2.69 15.29 2.36 17 2.36C18.71 2.36 20.32 2.69 21.85 3.37L23.59.19C23.71 0 23.87-.05 24.08.05C24.27.16 24.31.32 24.2.53L22.48 3.68ZM34 15.41V25.75C34 26.43 33.76 27.02 33.28 27.5C32.79 27.98 32.21 28.22 31.51 28.22C30.84 28.22 30.26 27.98 29.77 27.5C29.29 27.02 29.05 26.43 29.05 25.75V15.41C29.05 14.72 29.29 14.14 29.77 13.67C30.26 13.19 30.84 12.96 31.51 12.96C32.21 12.96 32.79 13.19 33.28 13.67C33.76 14.14 34 14.72 34 15.41Z',
  },
  ios: {
    box: [32, 40],
    d: 'M29.28 35C27.64 37.48 25.91 39.9 23.26 39.94C20.62 40 19.77 38.36 16.77 38.36C13.76 38.36 12.83 39.9 10.33 40C7.74 40.1 5.79 37.36 4.13 34.94C.76 30-1.82 20.9 1.65 14.78C3.36 11.74 6.44 9.82 9.77 9.76C12.3 9.72 14.7 11.5 16.26 11.5C17.8 11.5 20.72 9.36 23.78 9.68C25.06 9.74 28.65 10.2 30.95 13.64C30.78 13.76 26.68 16.2 26.71 21.26C26.77 27.3 31.94 29.32 32 29.34C31.94 29.48 31.17 32.22 29.28 35ZM18.02 3C19.46 1.34 21.84.08 23.82 0C24.07 2.34 23.14 4.7 21.76 6.38C20.4 8.08 18.16 9.4 15.95 9.22C15.65 6.92 16.75 4.52 18.02 3Z',
  },
} as const

export function CapabilityPlatforms() {
  return (
    <section
      aria-labelledby="platforms"
      className="container-content mb-[112px] mt-[101.45px] lg:mb-[173px] lg:mt-[134.8px]"
    >
      <h2 id="platforms" className="t-section font-heading font-semibold text-ink">
        {platforms.heading}
      </h2>
      <p className="t-body mt-[13.45px] text-ink-muted lg:mt-[15.8px] lg:max-w-[477px]">{platforms.intro}</p>

      <ul className="mt-[34px] grid gap-[50.5px] lg:mt-[45px] xl:grid-cols-3 xl:gap-x-[7%]">
        {platforms.cards.map((card) => {
          const { box, d } = MARKS[card.mark]
          return (
            <li
              key={card.name}
              className="relative isolate overflow-hidden rounded-[35px] px-[9.34%] pb-[48px] pt-[41px] text-cloud xl:px-[12.47%] xl:pt-[37px]"
            >
              <div
                aria-hidden="true"
                className="mesh absolute inset-0 -z-10 [--mesh-size:auto_126.8%] [--mesh:var(--mesh-11)] lg:[--mesh-size:auto_118.3%]"
              />
              <div aria-hidden="true" className="flex h-[40px] items-end">
                <svg viewBox={`0 0 ${box[0]} ${box[1]}`} width={box[0]} height={box[1]} className="fill-current">
                  <path d={d} />
                </svg>
              </div>
              <h3 className="mt-[20.5px] text-[2rem] leading-none">{card.name}</h3>
              <p className="t-body mt-[7.5px] max-w-[482px] lg:mt-[11.5px] lg:text-[18px] lg:leading-[27px] xl:max-w-none">
                {card.body}
              </p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
