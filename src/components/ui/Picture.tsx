import { images, type ImageName } from '@/lib/images.generated'

/**
 * Responsive image.
 *
 * Deliberately not `next/image`. Renditions are generated at build time by
 * scripts/build-images.mjs into content-hashed folders, so there is no runtime
 * optimiser, no transform latency on the LCP path, no per-transform billing,
 * and nothing here is tied to Vercel.
 *
 * Emits plain <picture> with an AVIF source and a JPEG fallback. Zero client JS.
 *
 * Positioning note: `className` lands on the OUTER element, never the <img>.
 * The grain overlay needs `position: relative` on the wrapper, which silently
 * captures any `absolute` positioning meant for the section — an earlier
 * version put `absolute inset-0` on the <img> and those images collapsed to
 * zero height and never loaded. Use `fill` for background images instead.
 */

type Props = {
  name: ImageName
  alt: string
  /**
   * How wide this renders at each breakpoint. No default: getting it wrong is
   * the usual way a phone ends up downloading a 2560px file.
   */
  sizes: string
  /**
   * Absolutely fill the nearest positioned ancestor — for full-bleed section
   * backgrounds. The wrapper takes the positioning; the image covers it.
   */
  fill?: boolean
  /**
   * Set on the LCP image only. Adds fetchpriority and eager loading. Never set
   * it on more than one image per page.
   *
   * No <link rel="preload">: with two designed breakpoints the LCP element
   * differs by viewport, and preloading the wrong one is a net loss.
   */
  priority?: boolean
  /** Classes for the wrapper. */
  className?: string
  /** Classes for the <img> itself, e.g. object-position. */
  imgClassName?: string
  /** Low-quality placeholder behind the image while it decodes. */
  placeholder?: boolean
  /** Brand grain overlay — see .grained in generated/mesh.css. */
  grain?: boolean
}

export function Picture({
  name,
  alt,
  sizes,
  fill = false,
  priority = false,
  className = '',
  imgClassName = '',
  placeholder = true,
  grain = false,
}: Props) {
  const img = images[name]
  if (!img) throw new Error(`Unknown image "${name}". Run \`npm run build:images\``)

  const srcSet = (ext: 'avif' | 'jpg') =>
    img.widths.map((w) => `${img.src}/${w}.${ext} ${w}w`).join(', ')

  const largest = img.widths[img.widths.length - 1]

  const wrapper = [
    grain ? 'grained' : '',
    fill ? 'absolute inset-0 block h-full w-full overflow-hidden' : 'block',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <picture className={wrapper}>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <img
        src={`${img.src}/${largest}.jpg`}
        srcSet={srcSet('jpg')}
        sizes={sizes}
        alt={alt}
        // Intrinsic dimensions reserve the aspect ratio before the image
        // arrives, so there is no layout shift.
        width={img.width}
        height={img.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={`${fill ? 'h-full w-full object-cover' : ''} ${imgClassName}`.trim()}
        style={
          placeholder
            ? {
                backgroundImage: `url("${img.lqip}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : { backgroundColor: img.color }
        }
      />
    </picture>
  )
}
