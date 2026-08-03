"""Extract single-configuration logo SVGs from the 100-tile lockup contact sheet.

The source is a flat 10x10 grid (261.54 x 161.76 tiles, pitch 296.54 x 183.2) with no per-tile
grouping. We bucket paths by the tile their bounding box falls in, then emit a minimal SVG whose
viewBox is that tile's content bbox. Coordinates are left untouched — no rewriting, so no risk of
corrupting the geometry — and fills become currentColor so one file serves light and dark.
"""
import re, os, collections

SRC = r"D:\johnn\Projects\recurssive\Recurssive Folder\Recurssive Folder\Logo\Recurssive Logo Lockups.svg"
OUT = r"D:\johnn\Projects\recurssive\analysis\logo-export"
CX, CY = 296.54, 183.2

s = open(SRC, encoding="utf-8").read()
paths = re.findall(r'<path class="(cls-\d+)" d="(.*?)"/>', s, re.S)


def bbox(d):
    xs, ys = [], []
    toks = re.findall(r'[A-Za-z]|-?\d*\.?\d+', d)
    i, cmd, px, py = 0, None, 0.0, 0.0
    while i < len(toks):
        t = toks[i]
        if re.match(r'[A-Za-z]', t):
            cmd = t; i += 1; continue
        rel = cmd.islower(); C = cmd.upper()
        n = {'M': 2, 'L': 2, 'C': 6, 'S': 4, 'Q': 4, 'T': 2, 'A': 7, 'H': 1, 'V': 1, 'Z': 0}.get(C, 2)
        vals = [float(v) for v in toks[i:i + n]]; i += n
        if len(vals) < n:
            break
        if C == 'H':
            x = (px + vals[0]) if rel else vals[0]; y = py
        elif C == 'V':
            x = px; y = (py + vals[0]) if rel else vals[0]
        elif C == 'A':
            x = (px + vals[5]) if rel else vals[5]; y = (py + vals[6]) if rel else vals[6]
        else:
            x = (px + vals[-2]) if rel else vals[-2]; y = (py + vals[-1]) if rel else vals[-1]
        xs.append(x); ys.append(y); px, py = x, y
    return (min(xs), min(ys), max(xs), max(ys)) if xs else None


tiles = collections.defaultdict(list)
for cls, d in paths:
    b = bbox(d)
    if not b:
        continue
    key = (max(0, min(9, int(b[1] // CY))), max(0, min(9, int(b[0] // CX))))
    tiles[key].append((d, b))

# column -> configuration. Row 8 is #0f0f0f ink on #fafafa (the light-mode set).
CONFIGS = {
    4: ("logo-mark",       "Symbol alone — the Reflow mark"),
    2: ("logo-horizontal", "Mark + wordmark, no tagline"),
    3: ("logo-wordmark",   "Wordmark alone"),
    0: ("logo-vertical",   "Vertical lockup with tagline"),
    1: ("logo-lockup",     "Horizontal lockup with tagline"),
}
ROW = 8

os.makedirs(OUT, exist_ok=True)
for col, (name, desc) in CONFIGS.items():
    items = tiles.get((ROW, col), [])
    if not items:
        print(f"!! no paths for col {col}")
        continue
    x0 = min(b[0] for _, b in items); y0 = min(b[1] for _, b in items)
    x1 = max(b[2] for _, b in items); y1 = max(b[3] for _, b in items)
    pad = 0.0
    w, h = x1 - x0 + 2 * pad, y1 - y0 + 2 * pad
    body = "\n  ".join(f'<path d="{d}"/>' for d, _ in items)
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x0-pad:.2f} {y0-pad:.2f} {w:.2f} {h:.2f}" '
        f'fill="currentColor" role="img" aria-label="Recurssive">\n'
        f'  <title>Recurssive — {desc}</title>\n  {body}\n</svg>\n'
    )
    fn = os.path.join(OUT, name + ".svg")
    open(fn, "w", encoding="utf-8").write(svg)
    print(f"{name+'.svg':<22} {len(items):>2} paths  {w:7.2f} x {h:6.2f}  ratio {w/h:5.2f}  {len(svg)/1024:6.1f} KB")
