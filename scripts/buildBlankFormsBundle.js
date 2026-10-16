// Merges the per-template blank PDFs into one printable bundle and writes the
// reference sheet that maps every numbered slot back to what fills it.
//
//   node scripts/buildBlankFormsBundle.js
//
// Run after scripts/blankFormsCollector.js has received a full set.

import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join } from 'path'
import { PDFDocument } from 'pdf-lib'

const DIR = 'D:/CHACHI/LegalEase/blank-forms'
const manifest = JSON.parse(readFileSync(join(DIR, 'manifest.json'), 'utf8'))
  .sort((a, b) => a.index - b.index)

// ── combined PDF ───────────────────────────────────────────────────
// Each form already starts on its own first page, so copying whole documents
// in order is enough to guarantee none begins mid-page.
const out = await PDFDocument.create()
let copied = 0
for (const m of manifest) {
  const bytes = readFileSync(join(DIR, 'forms', m.file))
  const src = await PDFDocument.load(bytes)
  const pages = await out.copyPages(src, src.getPageIndices())
  pages.forEach(p => out.addPage(p))
  copied += pages.length
}
out.setTitle('LegalEase — blank forms for autofill verification')
writeFileSync(join(DIR, 'ALL-59-FORMS.pdf'), await out.save())
console.log(`Combined PDF: ${copied} pages from ${manifest.length} forms`)

// ── reference sheet ────────────────────────────────────────────────
const esc = s => `"${String(s ?? '').replace(/"/g, '""')}"`
const csv = [['form_no', 'template', 'file', 'pages', 'slot_no', 'token', 'fill_type', 'source_or_question'].join(',')]
const md = []

md.push('# Blank forms — slot reference')
md.push('')
md.push('One row per numbered blank. The number in brackets on the printed sheet —')
md.push('`(1)`, `(2)`, … — is the **slot no** column here. Numbering restarts at 1 for')
md.push('each form.')
md.push('')
md.push('| fill type | meaning |')
md.push('|---|---|')
md.push('| **AUTOFILLED** | the app fills it from stored client or advocate data |')
md.push('| **MANUAL QUESTION** | the advocate is asked for it on the Template Details step |')
md.push('| **NO SOURCE** | a token with nothing behind it — the app renders it empty |')
md.push('')

let totals = { AUTOFILLED: 0, 'MANUAL QUESTION': 0, 'NO SOURCE': 0 }
let orphanCount = 0

for (const m of manifest) {
  md.push(`## ${m.index}. ${m.name}`)
  md.push('')
  md.push(`\`${m.file}\` · ${m.pages} page${m.pages === 1 ? '' : 's'}`
    + ` · ${(m.court_types || []).join(' + ') || 'untagged'}`
    + (m.paginated ? ' · _page break added: the form is taller than one sheet_' : ''))
  md.push('')
  if (!m.slots.length) {
    md.push('_No fillable slots — this form carries no tokens._')
  } else {
    md.push('| slot | token | fill type | source / question |')
    md.push('|---:|---|---|---|')
    for (const s of m.slots) {
      totals[s.kind] = (totals[s.kind] || 0) + 1
      md.push(`| (${s.n}) | \`${s.token}\` | ${s.kind} | ${s.detail} |`)
      csv.push([m.index, esc(m.name), esc(m.file), m.pages, s.n, esc(s.token), esc(s.kind), esc(s.detail)].join(','))
    }
  }
  if (m.orphanQuestions && m.orphanQuestions.length) {
    orphanCount += m.orphanQuestions.length
    md.push('')
    md.push('**Questions asked but never placed in this form** — the advocate is prompted')
    md.push('for these on Template Details, yet the token appears nowhere in the document,')
    md.push('so the answer is collected and then dropped:')
    md.push('')
    for (const o of m.orphanQuestions) md.push(`- \`${o.token}\` — ${o.label}`)
  }
  md.push('')
}

const totalSlots = Object.values(totals).reduce((a, b) => a + b, 0)
md.splice(12, 0,
  `**${manifest.length} forms · ${manifest.reduce((a, b) => a + b.pages, 0)} pages · ${totalSlots} numbered slots**`,
  '',
  `- AUTOFILLED: ${totals.AUTOFILLED}`,
  `- MANUAL QUESTION: ${totals['MANUAL QUESTION']}`,
  `- NO SOURCE: ${totals['NO SOURCE']}`,
  ...(orphanCount ? [`- questions asked but not placed in any form: ${orphanCount}`] : []),
  '')

writeFileSync(join(DIR, 'SLOT-REFERENCE.md'), md.join('\n'))
writeFileSync(join(DIR, 'SLOT-REFERENCE.csv'), csv.join('\n'))

console.log(`Reference sheet: ${totalSlots} slots`
  + ` (autofilled ${totals.AUTOFILLED}, manual ${totals['MANUAL QUESTION']}, no source ${totals['NO SOURCE']})`)
if (orphanCount) console.log(`Questions asked but never placed in a form: ${orphanCount}`)
console.log(`\nWrote ALL-59-FORMS.pdf, SLOT-REFERENCE.md, SLOT-REFERENCE.csv to ${DIR}`)
console.log(`forms/ holds ${readdirSync(join(DIR, 'forms')).length} files`)
