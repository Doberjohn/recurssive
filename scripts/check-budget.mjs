#!/usr/bin/env node
/**
 * JS budget gate.
 *
 * Lighthouse reports transfer sizes as the CDN served them, which makes it a
 * poor guard for *our* code specifically. This measures the exact thing the
 * budget is about: brotli-compressed JavaScript the browser actually executes
 * on a modern engine, per prerendered route.
 *
 * `nomodule` polyfills are excluded — modern browsers never fetch them.
 *
 * Measured baseline on the empty skeleton (Next 16.2.12, zero client
 * components): 121.6 KB. The ceiling below leaves ~30 KB for first-party code.
 * If this fails, the fix is to delete JavaScript, not to raise the number.
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { join, basename } from 'node:path'
import { brotliCompressSync, constants } from 'node:zlib'

const CEILING_KB = Number(process.env.JS_BUDGET_KB ?? 152)
const NEXT_DIR = '.next'
const APP_DIR = join(NEXT_DIR, 'server', 'app')

const brotli = (buf) =>
  brotliCompressSync(buf, {
    params: { [constants.BROTLI_PARAM_QUALITY]: 11 },
  }).length

function htmlFiles(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry)
    if (statSync(p).isDirectory()) htmlFiles(p, acc)
    else if (entry.endsWith('.html')) acc.push(p)
  }
  return acc
}

if (!existsSync(APP_DIR)) {
  console.error(`✗ ${APP_DIR} not found — run \`next build\` first.`)
  process.exit(1)
}

let worst = 0
let failed = false
const rows = []

for (const file of htmlFiles(APP_DIR)) {
  const html = readFileSync(file, 'utf8')
  const seen = new Set()
  let bytes = 0

  for (const tag of html.match(/<script[^>]+src="[^"]+"[^>]*>/g) ?? []) {
    if (/nomodule/i.test(tag)) continue // legacy-only, never fetched by modern browsers
    const src = tag.match(/src="([^"]+)"/)[1].split('?')[0]
    if (!src.startsWith('/_next/') || seen.has(src)) continue
    seen.add(src)
    const onDisk = join(NEXT_DIR, src.slice('/_next/'.length))
    if (existsSync(onDisk)) bytes += brotli(readFileSync(onDisk))
  }

  const kb = bytes / 1024
  const route = '/' + basename(file, '.html').replace(/^index$/, '')
  rows.push([route, kb])
  worst = Math.max(worst, kb)
  if (kb > CEILING_KB) failed = true
}

rows.sort((a, b) => b[1] - a[1])
console.log(`\nJS per route (brotli, modern browsers) — ceiling ${CEILING_KB} KB\n`)
for (const [route, kb] of rows) {
  const flag = kb > CEILING_KB ? '✗' : ' '
  console.log(`  ${flag} ${route.padEnd(28)} ${kb.toFixed(1).padStart(7)} KB`)
}
console.log(
  `\n  worst route: ${worst.toFixed(1)} KB / ${CEILING_KB} KB` +
    `  (headroom ${(CEILING_KB - worst).toFixed(1)} KB)\n`
)

if (failed) {
  console.error('✗ JS budget exceeded. Delete JavaScript rather than raising the ceiling.')
  process.exit(1)
}
console.log('✓ within budget')
