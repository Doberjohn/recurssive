/**
 * Horizontal-overflow gate.
 *
 * Walks every prerendered route at a spread of viewport widths and fails if any
 * of them can scroll sideways.
 *
 * This exists because a single overflowing element is invisible until it isn't,
 * and then it presents as something else entirely. The nav's link gap — a 50px
 * value measured off the 1920 frame — pushed the document 10px wider than the
 * viewport between 1024 and roughly 1150. That gave the whole page a horizontal
 * scrollbar, and once scrolled, every full-bleed band slid off and exposed a
 * strip of bare canvas down the edge. It read as a rogue border, and cost a long
 * detour through the scrollbar track and `scrollbar-gutter` before the actual
 * cause turned up.
 *
 * The widths below are chosen to sit on the breakpoints and just inside them,
 * because that is where a fixed measurement taken from one frame stops fitting.
 *
 * Drives headless Chrome over CDP with the built-in WebSocket — no Puppeteer,
 * nothing added to the dependency tree.
 *
 * Usage: npm run check:overflow          (expects a server on :3001)
 *        BASE=http://localhost:3000 npm run check:overflow
 */

import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'

const BASE = process.env.BASE ?? 'http://localhost:3001'
const PORT = 9223

const ROUTES = [
  '/',
  '/contact',
  '/blog/why-recursion',
  '/capabilities/enterprise-migration',
  '/capabilities/on-device-ai',
  '/capabilities/product-development',
  '/capabilities/react-native-performance',
  '/cases/placeholder-fintech-app',
  '/this-route-does-not-exist', // renders the 404
  // The outcome pages share the error states' full-bleed layout, so they are
  // the same class of risk and were previously unchecked.
  '/contact/thanks',
  '/contact/problem',
]

/** Breakpoints and their inside edges — where frame-derived values stop fitting. */
const WIDTHS = [320, 360, 375, 440, 640, 768, 800, 1024, 1044, 1100, 1280, 1440, 1920]

const CHROME =
  (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH) ? process.env.CHROME_PATH : null) ??
  [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ].find(existsSync)

if (!CHROME) {
  console.error('✗ no Chrome binary found. Set CHROME_PATH to one.')
  process.exit(1)
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const chrome = spawn(CHROME, [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  '--no-first-run',
  '--no-default-browser-check',
  '--disable-gpu',
  '--hide-scrollbars', // so clientWidth is not confounded by scrollbar width
  // CI runners have no sandbox namespaces and a 64 MB /dev/shm, which crashes
  // the renderer part-way through a long sweep.
  ...(process.env.CI ? ['--no-sandbox', '--disable-dev-shm-usage'] : []),
  'about:blank',
], { stdio: 'ignore' })

let ws
const cleanup = () => { try { ws?.close() } catch {} ; chrome.kill() }
process.on('exit', cleanup)
process.on('SIGINT', () => { cleanup(); process.exit(130) })

// Wait for the debugging endpoint.
let target
for (let i = 0; i < 60; i++) {
  await sleep(250)
  try {
    const list = await fetch(`http://127.0.0.1:${PORT}/json/list`).then((r) => r.json())
    target = list.find((t) => t.type === 'page')
    if (target) break
  } catch {}
}
if (!target) { console.error('✗ Chrome did not expose a debug target'); cleanup(); process.exit(1) }

ws = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej })

let nextId = 1
const pending = new Map()
const events = new Map()
ws.onmessage = (m) => {
  const msg = JSON.parse(m.data)
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id)
    pending.delete(msg.id)
    if (msg.error) reject(new Error(msg.error.message))
    else resolve(msg.result)
  } else if (msg.method) {
    events.get(msg.method)?.forEach((fn) => fn(msg.params))
  }
}
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = nextId++
    pending.set(id, { resolve, reject })
    ws.send(JSON.stringify({ id, method, params }))
  })
const once = (method) =>
  new Promise((resolve) => {
    const arr = events.get(method) ?? []
    const fn = (p) => { events.set(method, (events.get(method) ?? []).filter((f) => f !== fn)); resolve(p) }
    events.set(method, [...arr, fn])
  })

await send('Page.enable')
await send('Runtime.enable')

// The measurement. scrollLeft is zeroed first: with the page scrolled, every
// rect is shifted by that amount and the overflowing element hides from its own
// scan — which is exactly how this was missed by hand.
const PROBE = `(() => {
  const d = document.documentElement;
  window.scrollTo(0, 0);
  const client = d.clientWidth;
  const over = [];
  d.querySelectorAll('*').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return;
    if (r.right > client + 0.5) {
      let cls = ((el.className && (el.className.baseVal ?? el.className)) || '') + '';
      over.push({ tag: el.tagName.toLowerCase(), cls: cls.slice(0, 60), over: +(r.right - client).toFixed(1) });
    }
  });
  over.sort((a, b) => b.over - a.over);
  return { client, scrollWidth: d.scrollWidth, overflow: +(d.scrollWidth - client).toFixed(1), culprits: over.slice(0, 3) };
})()`

const failures = []
let checks = 0

for (const route of ROUTES) {
  const cells = []
  for (const width of WIDTHS) {
    await send('Emulation.setDeviceMetricsOverride', {
      width, height: 900, deviceScaleFactor: 1, mobile: false,
    })
    const loaded = once('Page.loadEventFired')
    await send('Page.navigate', { url: BASE + route })
    await Promise.race([loaded, sleep(10000)])
    await sleep(120) // let fonts/layout settle

    const { result } = await send('Runtime.evaluate', { expression: PROBE, returnByValue: true })
    const v = result.value
    checks++
    if (v.overflow > 0.5) {
      failures.push({ route, width, ...v })
      cells.push(`\x1b[31m${String(width)}✗\x1b[0m`)
    } else {
      cells.push(`${width}·`)
    }
  }
  console.log(`  ${route.padEnd(46)} ${cells.join(' ')}`)
}

console.log(`\n${checks} checks across ${ROUTES.length} routes x ${WIDTHS.length} widths`)

if (failures.length) {
  console.error(`\n✗ horizontal overflow on ${failures.length}:\n`)
  for (const f of failures) {
    console.error(`  ${f.route} @ ${f.width}px — document is ${f.overflow}px wider than the viewport`)
    for (const c of f.culprits) console.error(`      ${c.tag}.${c.cls}  (+${c.over}px)`)
  }
  cleanup()
  process.exit(1)
}

console.log('\n✓ no horizontal overflow')
cleanup()
process.exit(0)
