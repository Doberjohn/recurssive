#!/usr/bin/env node
/**
 * Verification probe for the mesh-gradient strategy — NOT part of the build.
 *
 * The claim under test: the "noise" in meshnoise-gradient-*.png is 1-pixel
 * white noise, which is maximum-entropy (uncompressible) but also
 * information-free (regenerable). If true, downscaling to 128x80 averages the
 * noise away, the smooth gradient survives, and re-adding grain as a shared
 * tile reproduces the original at a fraction of the bytes.
 *
 * Prior measurements came from Pillow. sharp exposes different encoder controls
 * (notably `effort`), so absolute sizes will differ. This re-measures with the
 * encoder we will actually ship.
 */
import sharp from 'sharp'
import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const MESH_DIR =
  process.env.MESH_DIR ??
  'D:/johnn/Projects/recurssive/Recurssive Folder/Recurssive Folder/Mesh'

/** Peak signal-to-noise ratio between two equally sized raw greyscale buffers. */
function psnr(a, b) {
  let sum = 0
  for (let i = 0; i < a.length; i++) {
    const d = a[i] - b[i]
    sum += d * d
  }
  const mse = sum / a.length
  return mse === 0 ? Infinity : 10 * Math.log10((255 * 255) / mse)
}

/** Horizontal autocorrelation of the residual after a mild blur — tests for white noise. */
async function noiseCharacter(file) {
  const img = sharp(file)
  const { width, height } = await img.metadata()
  const box = { left: Math.floor(width / 2) - 256, top: Math.floor(height / 2) - 256, width: 512, height: 512 }
  const raw = await sharp(file).extract(box).greyscale().raw().toBuffer()
  const smooth = await sharp(file).extract(box).greyscale().blur(2).raw().toBuffer()
  const res = new Float64Array(raw.length)
  for (let i = 0; i < raw.length; i++) res[i] = raw[i] - smooth[i]
  const mean = res.reduce((s, v) => s + v, 0) / res.length
  let v0 = 0, l1 = 0, l2 = 0
  for (let i = 0; i < res.length - 2; i++) {
    const d = res[i] - mean
    v0 += d * d
    l1 += d * (res[i + 1] - mean)
    l2 += d * (res[i + 2] - mean)
  }
  return { lag1: l1 / v0, lag2: l2 / v0, sigma: Math.sqrt(v0 / res.length) }
}

const files = readdirSync(MESH_DIR).filter((f) => f.endsWith('.png')).sort()
console.log(`\nProbing ${files.length} mesh gradients with sharp / libvips ${sharp.versions.vips}\n`)

let totalSrc = 0
let totalOut = 0
const rows = []

for (const f of files) {
  const src = join(MESH_DIR, f)
  const srcBytes = statSync(src).size
  totalSrc += srcBytes

  const meta = await sharp(src).metadata()

  // 1. Downscale to 128x80 (lanczos3 averages the white noise away).
  const small = await sharp(src)
    .resize(128, 80, { kernel: 'lanczos3', fit: 'fill' })
    .avif({ quality: 80, effort: 9, chromaSubsampling: '4:4:4' })
    .toBuffer()
  totalOut += small.length

  // 2. Fidelity: upscale the tiny AVIF back to 1920x1200 and compare against a
  //    grain-free reference (the source blurred just enough to kill the noise).
  const restored = await sharp(small).resize(1920, 1200, { kernel: 'lanczos3', fit: 'fill' }).greyscale().raw().toBuffer()
  const reference = await sharp(src).resize(1920, 1200, { kernel: 'lanczos3', fit: 'fill' }).blur(1.2).greyscale().raw().toBuffer()

  const n = await noiseCharacter(src)
  rows.push({
    name: f.replace('meshnoise-gradient-', 'mesh-').replace('.png', ''),
    srcMB: srcBytes / 1048576,
    outB: small.length,
    psnr: psnr(restored, reference),
    lag1: n.lag1,
    sigma: n.sigma,
    dims: `${meta.width}x${meta.height}`,
  })
}

console.log('  name        source     ->   128x80 AVIF    PSNR     noise lag1    sigma')
for (const r of rows) {
  console.log(
    `  ${r.name.padEnd(10)} ${r.srcMB.toFixed(1).padStart(6)} MB  ->  ${String(r.outB).padStart(6)} B   ` +
      `${r.psnr.toFixed(1).padStart(5)} dB   ${r.lag1.toFixed(3).padStart(8)}   ${r.sigma.toFixed(1).padStart(6)}`
  )
}

const ratio = totalSrc / totalOut
console.log(
  `\n  TOTAL  ${(totalSrc / 1048576).toFixed(1)} MB  ->  ${(totalOut / 1024).toFixed(1)} KB` +
    `   (${ratio.toFixed(0)}x reduction)\n`
)
console.log('  lag1 near 0 => white noise (uncompressible, regenerable).')
console.log('  PSNR > 40 dB => visually indistinguishable from the grain-free gradient.\n')
