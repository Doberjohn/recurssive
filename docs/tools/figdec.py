"""Generic Kiwi decoder for Figma .fig canvas files.

The .fig container is: b'fig-kiwi' | uint32 version | (uint32 len + block)*
Block 0 = deflate-compressed Kiwi *schema*; block 1 = zstd-compressed Kiwi *data*.
Because the schema is embedded, we can decode without knowing Figma's types ahead of time.
"""
import struct, zlib, json, sys

TYPE_BOOL, TYPE_BYTE, TYPE_INT, TYPE_UINT = -1, -2, -3, -4
TYPE_FLOAT, TYPE_STRING, TYPE_INT64, TYPE_UINT64 = -5, -6, -7, -8
KIND_ENUM, KIND_STRUCT, KIND_MESSAGE = 0, 1, 2


class Reader:
    def __init__(self, data):
        self.d = data
        self.i = 0

    def byte(self):
        v = self.d[self.i]
        self.i += 1
        return v

    def varuint(self):
        shift = 0
        result = 0
        while True:
            b = self.byte()
            result |= (b & 0x7F) << shift
            shift += 7
            if not (b & 0x80) or shift >= 35:
                break
        return result & 0xFFFFFFFF

    def varint(self):
        v = self.varuint()
        return (v >> 1) ^ -(v & 1)

    def varuint64(self):
        shift = 0
        result = 0
        while True:
            b = self.byte()
            result |= (b & 0x7F) << shift
            shift += 7
            if not (b & 0x80) or shift >= 70:
                break
        return result

    def varint64(self):
        v = self.varuint64()
        return (v >> 1) ^ -(v & 1)

    def float32(self):
        # Kiwi stores 0.0 as a single zero byte; otherwise 4 LE bytes rotated left 23.
        if self.d[self.i] == 0:
            self.i += 1
            return 0.0
        bits = struct.unpack_from('<I', self.d, self.i)[0]
        self.i += 4
        bits = ((bits << 23) | (bits >> 9)) & 0xFFFFFFFF
        return struct.unpack('<f', struct.pack('<I', bits))[0]

    def string(self):
        start = self.i
        while self.d[self.i] != 0:
            self.i += 1
        s = self.d[start:self.i].decode('utf-8', 'replace')
        self.i += 1
        return s

    def eof(self):
        return self.i >= len(self.d)


def parse_schema(data):
    r = Reader(data)
    defs = []
    for _ in range(r.varuint()):
        name = r.string()
        kind = r.byte()
        fields = []
        for _ in range(r.varuint()):
            fname = r.string()
            ftype = r.varint()
            is_array = bool(r.byte())
            value = r.varuint()
            fields.append({'name': fname, 'type': ftype, 'array': is_array, 'value': value})
        defs.append({'name': name, 'kind': kind, 'fields': fields})
    return defs


class Decoder:
    def __init__(self, defs):
        self.defs = defs
        self.by_name = {d['name']: i for i, d in enumerate(defs)}

    def value(self, r, ftype):
        if ftype == TYPE_BOOL:
            return bool(r.byte())
        if ftype == TYPE_BYTE:
            return r.byte()
        if ftype == TYPE_INT:
            return r.varint()
        if ftype == TYPE_UINT:
            return r.varuint()
        if ftype == TYPE_FLOAT:
            return r.float32()
        if ftype == TYPE_STRING:
            return r.string()
        if ftype == TYPE_INT64:
            return r.varint64()
        if ftype == TYPE_UINT64:
            return r.varuint64()
        return self.decode(r, ftype)

    def field(self, r, f):
        if f['array']:
            return [self.value(r, f['type']) for _ in range(r.varuint())]
        return self.value(r, f['type'])

    def decode(self, r, idx):
        d = self.defs[idx]
        if d['kind'] == KIND_ENUM:
            v = r.varuint()
            for f in d['fields']:
                if f['value'] == v:
                    return f['name']
            return v
        if d['kind'] == KIND_STRUCT:
            return {f['name']: self.field(r, f) for f in d['fields']}
        # MESSAGE: field ids until terminator 0
        out = {}
        while True:
            fid = r.varuint()
            if fid == 0:
                return out
            f = next((x for x in d['fields'] if x['value'] == fid), None)
            if f is None:
                raise ValueError(f"unknown field id {fid} in {d['name']}")
            out[f['name']] = self.field(r, f)


def load(path):
    raw = open(path, 'rb').read()
    assert raw[:8] == b'fig-kiwi', raw[:8]
    off = 12
    blocks = []
    while off + 4 <= len(raw):
        n = struct.unpack_from('<I', raw, off)[0]
        off += 4
        if n == 0 or off + n > len(raw):
            break
        blocks.append(raw[off:off + n])
        off += n
    schema_raw = zlib.decompress(blocks[0], -15)
    import zstandard
    data_raw = zstandard.ZstdDecompressor().decompress(
        blocks[1], max_output_size=512 * 1024 * 1024)
    defs = parse_schema(schema_raw)
    return defs, data_raw


if __name__ == '__main__':
    path = sys.argv[1]
    defs, data = load(path)
    print("schema defs:", len(defs), file=sys.stderr)
    dec = Decoder(defs)
    r = Reader(data)
    root_idx = dec.by_name.get('Message')
    print("root Message idx:", root_idx, file=sys.stderr)
    msg = dec.decode(r, root_idx)
    print("decoded root keys:", list(msg.keys()), file=sys.stderr)
    print("consumed", r.i, "of", len(data), file=sys.stderr)
    json.dump(msg, open(sys.argv[2], 'w', encoding='utf-8'), ensure_ascii=False)
    print("nodeChanges:", len(msg.get('nodeChanges', [])), file=sys.stderr)
