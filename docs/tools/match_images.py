"""Identify which source images are actually used in the Figma designs.

Figma re-encodes (and sometimes crops/resizes) images on import, so byte hashing fails.
We compare perceptually instead: normalise to greyscale, downscale, and compare both a
difference-hash (structure) and a coarse pixel grid (tone). A source file is "used" when
some embedded blob matches it closely on both.
"""
import os, json
from PIL import Image

Image.MAX_IMAGE_PIXELS = None

SP = r"C:\Users\johnn\AppData\Local\Temp\claude\D--johnn-Projects-recurssive\bdab32a0-2cc5-4ff3-b027-d031e8227310\scratchpad"
FIG = os.path.join(SP, "v2", "fig", "images")
ASSETS = r"D:\johnn\Projects\recurssive\Recurssive Folder\Recurssive Folder"

SOURCES = [
    ("Images", os.path.join(ASSETS, "Images")),
    ("Images/Tony Noel", os.path.join(ASSETS, "Images", "Tony Noel")),
    ("Mesh", os.path.join(ASSETS, "Mesh")),
]


def load_small(path, box=64):
    """Load cheaply (JPEG draft mode) and return a normalised greyscale thumbnail."""
    im = Image.open(path)
    try:
        im.draft("L", (box * 4, box * 4))   # JPEG-only fast path; ignored otherwise
    except Exception:
        pass
    im = im.convert("L").resize((box, box), Image.LANCZOS)
    return im


def dhash(im, s=16):
    """Difference hash — encodes structure, robust to re-encoding and scaling."""
    g = im.resize((s + 1, s), Image.LANCZOS)
    px = g.load()
    bits = 0
    for y in range(s):
        for x in range(s):
            bits = (bits << 1) | (1 if px[x, y] > px[x + 1, y] else 0)
    return bits


def grid(im, s=8):
    """Coarse tone grid, contrast-normalised — catches near-uniform images dhash can't."""
    g = im.resize((s, s), Image.LANCZOS)
    v = list(g.getdata())
    lo, hi = min(v), max(v)
    rng = (hi - lo) or 1
    return [(p - lo) / rng for p in v]


def ham(a, b):
    return bin(a ^ b).count("1")


def griddist(a, b):
    return sum(abs(x - y) for x, y in zip(a, b)) / len(a)


def fingerprint(path):
    im = load_small(path)
    full = Image.open(path)
    return {"dhash": dhash(im), "grid": grid(im), "w": full.width, "h": full.height,
            "bytes": os.path.getsize(path)}


print("fingerprinting embedded blobs...", flush=True)
figs = {}
for f in sorted(os.listdir(FIG)):
    p = os.path.join(FIG, f)
    if not os.path.isfile(p):
        continue
    try:
        figs[f] = fingerprint(p)
    except Exception as e:
        print("  skip", f[:12], e)
print(f"  {len(figs)} blobs")

print("fingerprinting source files...", flush=True)
srcs = {}
for label, d in SOURCES:
    if not os.path.isdir(d):
        continue
    for f in sorted(os.listdir(d)):
        p = os.path.join(d, f)
        if not os.path.isfile(p) or f.startswith("."):
            continue
        if os.path.splitext(f)[1].lower() not in (".jpg", ".jpeg", ".png"):
            continue
        try:
            srcs[f"{label}/{f}"] = fingerprint(p)
        except Exception as e:
            print("  skip", f[:30], e)
print(f"  {len(srcs)} source images")

# Match every source against its best blob.
DH_MAX, GRID_MAX = 40, 0.085
results = []
for name, s in srcs.items():
    best, bestd, bestg = None, 999, 9.0
    for fn, g in figs.items():
        d = ham(s["dhash"], g["dhash"])
        if d < bestd:
            gd = griddist(s["grid"], g["grid"])
            best, bestd, bestg = fn, d, gd
    results.append({"src": name, "blob": best, "dh": bestd, "grid": round(bestg, 4),
                    "used": bestd <= DH_MAX and bestg <= GRID_MAX,
                    "bytes": s["bytes"], "dim": f"{s['w']}x{s['h']}"})

used = [r for r in results if r["used"]]
unused = [r for r in results if not r["used"]]
used.sort(key=lambda r: r["dh"])
unused.sort(key=lambda r: -r["bytes"])

print(f"\n{'='*66}\nUSED: {len(used)}    UNUSED: {len(unused)}")
tot = sum(r["bytes"] for r in results)
ub = sum(r["bytes"] for r in used)
print(f"total {tot/1048576:.0f} MB   used {ub/1048576:.0f} MB   "
      f"reclaimable {(tot-ub)/1048576:.0f} MB ({(tot-ub)/tot*100:.0f}%)")

print(f"\n--- USED ({len(used)}) ---")
for r in used:
    print(f"  dh={r['dh']:>3} grid={r['grid']:.3f}  {r['bytes']/1048576:6.1f}MB  {r['dim']:>11}  {r['src']}")

print(f"\n--- borderline (dh 41-60), review by eye ---")
near = [r for r in unused if r["dh"] <= 60]
for r in sorted(near, key=lambda x: x["dh"])[:15]:
    print(f"  dh={r['dh']:>3} grid={r['grid']:.3f}  {r['bytes']/1048576:6.1f}MB  {r['src']}")
print(f"  ({len(near)} borderline)")

json.dump({"used": used, "unused": unused},
          open(os.path.join(SP, "image_usage.json"), "w", encoding="utf-8"), indent=1)
print(f"\nwrote {os.path.join(SP,'image_usage.json')}")
