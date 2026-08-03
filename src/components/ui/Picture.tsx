import { images, type ImageName } from '@/lib/images.generated'

/**
 * Responsive image.
 *
 * Deliberately not `next/image`. The renditions are generated at build time by
 * scripts/build-images.mjs into content-hashed folders, so there is no runtime
 * optimiser, no transform latency on the LCP path, no per-transform billing,
 * and nothing here is tied to Vercel.
 *
 * Emits plain <picture> with an AVIF source and a JPEG fallback. Zero client JS.
 */

type Props = {
  name: ImageName
  alt: string
  /**
   * The `sizes` attribute — how wide this image renders at each breakpoint.
   * Getting this wrong is the most common way to ship a 2560px file to a
   * phone, so it has no default: every caller must state it.
   */
  sizes: string
  /**
   * Set on the LCP image only (the one above the fold). Adds fetchpriority and
   * eager loading. Never set it on more than one image per page.
   *
   * Note: no <link rel="preload"> — with two designed breakpoints the LCP
   * element differs by viewport, and preloading the wrong one is a net loss.
   */
  priority?: boolean
  className?: string
  /** Renders the low-quality placeholder as a background while decoding. */
  placeholder?: boolean
  /** Applies the brand grain overlay — see .grained in generated/mesh.css. */
  grain?: boolean
}

export function Picture({
  name,
  alt,
  sizes,
  priority = false,
  className = '',
  placeholder = true,
  grain = false,
}: Props) {
  const img = images[name]
  if (!img) throw new Error(`Unknown image "${name}" — run \`npm run build:images\``)

  const srcSet = (ext: 'avif' | 'jpg') =>
    img.widths.map((w) => `${img.src}/${w}.${ext} ${w}w`).join(', ')

  const largest = img.widths[img.widths.length - 1]

  return (
    <picture className={grain ? 'grained block' : undefined}>
      <source type="image/avif" srcSet={srcSet('avif')} sizes={sizes} />
      <img
        src={`${img.src}/${largest}.jpg`}
        srcSet={srcSet('jpg')}
        sizes={sizes}
        alt={alt}
        // Intrinsic dimensions reserve the right aspect ratio before the image
        // arrives, so there is no layout shift.
        width={img.width}
        height={img.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={className}
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
