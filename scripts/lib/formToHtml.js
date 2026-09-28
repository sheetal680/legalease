// Turns `pdftotext -layout` output into the template HTML the app renders.
//
// pdftotext -layout already preserves the printed form's column alignment as
// runs of spaces. That is exactly the shape the existing 33 templates store,
// except they express horizontal space as &nbsp; runs. So the job here is a
// faithful transcription, not a re-layout:
//
//   * a blank line stays a blank line          -> <p>&nbsp;</p>
//   * leading and internal space runs are kept -> &nbsp; runs
//   * runs of 4+ dots or underscores are left alone, because the renderer
//     treats those as elastic fill-lines that shrink as a value is typed in
//   * a form feed becomes a real page break marker
//
// The one adjustment is horizontal scale. pdftotext lays a form out at
// whatever character width the source PDF implies — 79 columns for some Delhi
// forms, 169 for the eCourts memo — and a 169-column line at 11pt would run
// off an A4 page. Each form is therefore scaled by a single factor so its
// widest line lands inside the printable measure. One factor for the whole
// document keeps every column in the same relative position.

const TARGET_COLS = 92

const esc = s => s
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')

// Tokens are written into the source text before conversion, so they must
// survive escaping intact — they only ever contain A-Z, 0-9 and underscore.
const nbsp = n => '&nbsp;'.repeat(Math.max(0, n))

export function formToHtml(text, {
  margin = '55 45 40 45',
  font = 'helvetica',
  targetCols = TARGET_COLS,
} = {}) {
  // pdftotext ends the file with a form feed, which would otherwise be read
  // as the start of an extra, empty page.
  const pages = text.split('\f').filter((p, i, all) => i < all.length - 1 || p.trim())
  const lines = []

  pages.forEach((page, pageIndex) => {
    if (pageIndex > 0) lines.push({ pageBreak: true })
    page.split(/\r?\n/).forEach(l => lines.push({ text: l.replace(/[ \t]+$/, '') }))
  })

  // Trim leading and trailing blank lines of the document as a whole; blank
  // lines *inside* the form are meaningful and are kept.
  while (lines.length && !lines[0].pageBreak && !lines[0].text.trim()) lines.shift()
  while (lines.length && !lines[lines.length - 1].pageBreak
         && !lines[lines.length - 1].text.trim()) lines.pop()

  const widest = Math.max(1, ...lines.filter(l => !l.pageBreak).map(l => l.text.length))
  const scale = Math.min(1, targetCols / widest)
  const sc = n => Math.round(n * scale)

  const html = lines.map(l => {
    if (l.pageBreak) return '<div data-page-break="true"></div>'
    if (!l.text.trim()) return '<p>&nbsp;</p>'

    // Split into alternating space-runs and word-runs so every run of two or
    // more spaces becomes a scaled &nbsp; run and single spaces stay single.
    let out = ''
    const parts = l.text.match(/ +|[^ ]+/g) || []
    for (const p of parts) {
      if (p[0] === ' ') out += p.length === 1 ? ' ' : nbsp(sc(p.length))
      else out += esc(p)
    }
    return `<p>${out}</p>`
  }).join('')

  return `<div data-page-margin="${margin}"></div>`
    + `<div data-page-font="${font}"></div>`
    + html
}

// Applies an ordered list of [find, replace] pairs to the plain text before
// conversion. Each pair must match, so a form whose wording drifts from what
// was read fails loudly here instead of being seeded with its tokens silently
// missing.
export function applyTokens(text, rules, label) {
  let out = text
  for (const [find, replace] of rules) {
    const before = out
    out = typeof find === 'string' ? out.split(find).join(replace) : out.replace(find, replace)
    if (out === before) {
      throw new Error(`[${label}] token rule matched nothing: ${find}`)
    }
  }
  return out
}
