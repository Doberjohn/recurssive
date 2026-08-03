"""Build a readable screen-by-screen spec from the decoded Figma node tree."""
import json, os, collections

SP = r"C:\Users\johnn\AppData\Local\Temp\claude\D--johnn-Projects-recurssive\bdab32a0-2cc5-4ff3-b027-d031e8227310\scratchpad\v2"
m = json.load(open(os.path.join(SP, "canvas.json"), encoding="utf-8"))
nodes = m['nodeChanges']


def gid(g):
    return (g['sessionID'], g['localID'])


by_id = {gid(n['guid']): n for n in nodes}
children = collections.defaultdict(list)
for n in nodes:
    pi = n.get('parentIndex')
    if pi:
        children[gid(pi['guid'])].append((pi.get('position', ''), gid(n['guid'])))
for k in children:
    children[k].sort()


def hexcolor(c):
    if not c:
        return None
    r, g, b = (round(c.get(k, 0) * 255) for k in 'rgb')
    a = c.get('a', 1)
    h = f"#{r:02X}{g:02X}{b:02X}"
    return h if a >= 0.999 else f"{h} @{round(a,2)}"


def paints(n, key='fillPaints'):
    out = []
    for p in n.get(key) or []:
        if p.get('visible') is False:
            continue
        t = p.get('type')
        if t == 'SOLID':
            out.append(hexcolor(p.get('color')))
        elif t and 'GRADIENT' in t:
            stops = [hexcolor(s.get('color')) for s in (p.get('stops') or [])]
            out.append(f"{t}({'->'.join(x for x in stops if x)})")
        elif t == 'IMAGE':
            h = (p.get('image') or {}).get('hash')
            hs = ''.join(f"{b:02x}" for b in h) if isinstance(h, list) else str(h)
            out.append(f"IMAGE:{hs[:40]}")
        elif t:
            out.append(t)
    return [x for x in out if x]


def text_of(n):
    td = n.get('textData') or {}
    return (td.get('characters') or '').strip()


def font_of(n):
    fn = n.get('fontName') or {}
    fam = fn.get('family', '')
    sty = fn.get('style', '')
    sz = n.get('fontSize')
    lh = n.get('lineHeight') or {}
    ls = n.get('letterSpacing') or {}
    bits = [b for b in [fam, sty] if b]
    s = ' '.join(bits)
    if sz:
        s += f" {round(sz,1)}px"
    if lh.get('units') == 'PIXELS' and lh.get('value'):
        s += f"/{round(lh['value'],1)}"
    elif lh.get('units') == 'PERCENT' and lh.get('value'):
        s += f"/{round(lh['value'],1)}%"
    if ls.get('value'):
        s += f" ls{round(ls['value'],2)}"
    return s.strip()


def pos(n):
    t = n.get('transform') or {}
    return round(t.get('m02', 0)), round(t.get('m12', 0))


def size(n):
    s = n.get('size') or {}
    return round(s.get('x', 0)), round(s.get('y', 0))


def radius(n):
    r = n.get('cornerRadius')
    corners = [n.get(k) for k in ('rectangleTopLeftCornerRadius', 'rectangleTopRightCornerRadius',
                                  'rectangleBottomRightCornerRadius', 'rectangleBottomLeftCornerRadius')]
    if any(c for c in corners) and len(set(corners)) > 1:
        return 'r' + '/'.join(str(round(c or 0)) for c in corners)
    if r:
        return f"r{round(r)}"
    if corners[0]:
        return f"r{round(corners[0])}"
    return ''


SKIP_VECTOR_NOISE = True


def render(nid, depth, out, maxdepth=14):
    n = by_id.get(nid)
    if n is None or depth > maxdepth:
        return
    t = n.get('type')
    nm = n.get('name', '')
    ind = '  ' * depth
    w, h = size(n)
    x, y = pos(n)
    parts = []
    if t == 'TEXT':
        txt = text_of(n)
        f = font_of(n)
        col = paints(n)
        parts.append(f'{ind}TEXT "{txt}"')
        meta = [f for f in [f, ' '.join(col) if col else '', f"{w}x{h}", n.get('textAlignHorizontal', '')] if f]
        parts.append(f'{ind}     [{" | ".join(meta)}]')
    else:
        desc = [t, f'"{nm}"' if nm else '', f"{w}x{h}", f"@{x},{y}"]
        fp = paints(n)
        if fp:
            desc.append("fill:" + ",".join(fp))
        sp = paints(n, 'strokePaints')
        if sp:
            desc.append(f"stroke:{','.join(sp)} {round(n.get('strokeWeight') or 0,1)}px")
        r = radius(n)
        if r:
            desc.append(r)
        if n.get('opacity') is not None and n.get('opacity') < 0.999:
            desc.append(f"op{round(n['opacity'],2)}")
        if n.get('visible') is False:
            desc.append("HIDDEN")
        eff = n.get('effects') or []
        if eff:
            desc.append("fx:" + ",".join(str(e.get('type')) for e in eff))
        parts.append(ind + ' '.join(x for x in desc if x))
    out.extend(parts)
    kids = children.get(nid, [])
    # collapse long runs of unnamed vectors (icon paths) into a count
    vec_run = 0
    for _, cid in kids:
        c = by_id.get(cid)
        if SKIP_VECTOR_NOISE and c and c.get('type') == 'VECTOR' and not children.get(cid):
            vec_run += 1
            continue
        if vec_run:
            out.append('  ' * (depth + 1) + f"<{vec_run} vector path(s)>")
            vec_run = 0
        render(cid, depth + 1, out, maxdepth)
    if vec_run:
        out.append('  ' * (depth + 1) + f"<{vec_run} vector path(s)>")


canvases = [n for n in nodes if n.get('type') == 'CANVAS']
outdir = os.path.join(SP, "figspec")
os.makedirs(outdir, exist_ok=True)

index = []
for cv in canvases:
    cid = gid(cv['guid'])
    tops = [c for _, c in children.get(cid, [])]
    for tid in tops:
        n = by_id[tid]
        w, h = size(n)
        x, y = pos(n)
        index.append({'canvas': cv.get('name'), 'name': n.get('name'), 'type': n.get('type'),
                      'w': w, 'h': h, 'x': x, 'y': y, 'id': f"{tid[0]}_{tid[1]}",
                      'nodes': 0})

# count descendants
def count(nid):
    c = 1
    for _, k in children.get(nid, []):
        c += count(k)
    return c

for cv in canvases:
    cid = gid(cv['guid'])
    for _, tid in children.get(cid, []):
        for e in index:
            if e['id'] == f"{tid[0]}_{tid[1]}":
                e['nodes'] = count(tid)

json.dump(index, open(os.path.join(SP, "fig_index.json"), 'w', encoding='utf-8'),
          ensure_ascii=False, indent=1)
print("CANVASES:", [(c.get('name'), c.get('visible')) for c in canvases])
print("\nTOP-LEVEL FRAMES:")
for e in index:
    print(f"  [{e['canvas']}] {e['name']:<34} {e['type']:<8} {e['w']}x{e['h']} @{e['x']},{e['y']}  nodes={e['nodes']}")

# write per-frame spec files
for cv in canvases:
    cid = gid(cv['guid'])
    for _, tid in children.get(cid, []):
        n = by_id[tid]
        out = []
        render(tid, 0, out)
        safe = "".join(ch if ch.isalnum() or ch in "-_ " else "_" for ch in n.get('name', 'frame')).strip()
        w_, h_ = size(n)
        fn = os.path.join(outdir, f"{safe}__{w_}w.txt")
        k = 2
        while os.path.exists(fn):
            fn = os.path.join(outdir, f"{safe}__{w_}w_{k}.txt"); k += 1
        open(fn, 'w', encoding='utf-8').write("\n".join(out))
        print(f"wrote {fn} ({len(out)} lines)")
