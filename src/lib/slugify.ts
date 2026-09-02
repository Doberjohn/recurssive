/**
 * URL slug for a heading or a title: lower-case, ASCII letters and digits, single hyphens.
 * Diacritics are folded to their base letter so "Café" and "cafe" share a slug.
 */
export function slugify(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** The same slug, made unique against the ones already taken on the page. */
export function uniqueSlug(input: string, taken: Set<string>): string {
  const base = slugify(input);
  let candidate = base;
  for (let n = 2; taken.has(candidate); n++) {
    candidate = `${base}-${n}`;
  }
  taken.add(candidate);
  return candidate;
}
