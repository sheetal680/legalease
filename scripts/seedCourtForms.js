// Seeds templates from official court forms.
//
//   node scripts/seedCourtForms.js            # dry run: prints the report
//   node scripts/seedCourtForms.js --apply    # inserts / updates the templates
//
// Source text comes from `pdftotext -layout` over the downloaded PDFs, so the
// printed alignment is preserved rather than re-imagined. formToHtml.js turns
// that into the same HTML shape the existing 33 templates use. The only
// authored part is the token rules below: where the printed form leaves a
// blank that the app already holds data for, the blank becomes a token.
//
// Blanks the app has no data for are deliberately LEFT as printed dots or
// underscores. The renderer treats a run of 4+ of either as an elastic
// fill-line that shrinks as text is typed into it, so an untokenised blank is
// still a working blank — not a defect.

import { readFileSync, existsSync } from 'fs'
import { createClient } from '@supabase/supabase-js'
import { formToHtml, applyTokens } from './lib/formToHtml.js'

const APPLY = process.argv.includes('--apply')
const DIR = 'C:/Users/shiva/AppData/Local/Temp/forms'

const SC = ['Supreme Court']
const HC = ['High Court']
const DS = ['District & Subordinate']

// The Supreme Court forms use [A.B.] / (A.B.) for the appellant and
// [C.D.] / (C.D.) for the respondent, but ALSO "[State of A.B.]" as an
// alternative party description on the line beneath. Substituting naively
// would produce "[State of [CLIENT_NAME_IF_PETITIONER]]", so the longer
// phrase is parked behind a sentinel first and restored afterwards.
function parties(text) {
  const P = '[CLIENT_NAME_IF_PETITIONER]'
  const R = '[CLIENT_NAME_IF_RESPONDENT]'
  return text
    .split('[State of A.B.]').join('\u0001').split('[State of C.D.]').join('\u0002')
    .split('(State of A.B.)').join('\u0003').split('(State of C.D.)').join('\u0004')
    .split('[A.B.]').join(P).split('[C.D.]').join(R)
    .split('(A.B.)').join(P).split('(C.D.)').join(R)
    .split('\u0001').join('[State of A.B.]').split('\u0002').join('[State of C.D.]')
    .split('\u0003').join('(State of A.B.)').split('\u0004').join('(State of C.D.)')
}

// A dotted or underscored blank of at least `min` characters, replaced by a
// token. Keeps a couple of leading dots so the blank still reads as a blank
// when the token resolves to nothing.
const blank = min => new RegExp(`\\.{${min},}`)

const FORMS = [
  // ── Supreme Court ────────────────────────────────────────────────
  {
    file: 'sc01', name: 'Memorandum of Appearance through Advocate-on-Record (Supreme Court, Form 9)',
    court_types: SC, pre: parties,
    rules: [
      [/Appeal No\.{3,}of \.{3,} 20\.{3,}/, 'Appeal No. [CASE_NUMBER] of 20[YEAR_LAST]'],
      [/Dated this the \.{3,} day of \.{3,}20\.{3,}/, 'Dated this the [DAY] day of [MONTH] 20[YEAR_LAST]'],
      [/\(Signed\)\.{3,}/, '(Signed) [ADVOCATE_NAME]'],
    ],
  },
  {
    file: 'sc02', name: 'Memorandum of Appearance in Person (Supreme Court, Form 8)',
    court_types: SC, pre: parties,
    rules: [
      [/Appeal No\.{3,} of \.{3,} 20\.{3,}/, 'Appeal No. [CASE_NUMBER] of 20[YEAR_LAST]'],
      [/Dated this the \.{3,} day of \.{3,} 20\.{3,}/, 'Dated this the [DAY] day of [MONTH] 20[YEAR_LAST]'],
      [/\(Signature\)\.{3,}/, '(Signature) [CLIENT_NAME]'],
    ],
  },
  {
    file: 'sc03', name: 'Appearance Slip (Supreme Court, Form 30)',
    court_types: SC,
    rules: [
      [/Case No\. \.{3,}/, 'Case No. [CASE_NUMBER]'],
      [/1 \.{3,}/, '1 [ADVOCATE_NAME]'],
      [/Date of Listing \.{3,}/, 'Date of Listing [HEARING_DATE]'],
    ],
    manual_fields: [
      { token: '[HEARING_DATE]', label: 'Date of Listing', type: 'date' },
    ],
  },
  {
    file: 'sc04', name: 'Notice of Appearance (Supreme Court, Form 13)',
    court_types: SC, pre: parties,
    rules: [
      [/Case No\.{3,}of \.{3,}20\.{3,}/, 'Case No. [CASE_NUMBER] of 20[YEAR_LAST]'],
      [/Dated this the \.{3,} day of \.{3,} 20 \.{3,}/, 'Dated this the [DAY] day of [MONTH] 20[YEAR_LAST]'],
      [/\(Signed\) \.{3,}/, '(Signed) [ADVOCATE_NAME]'],
    ],
  },
  {
    file: 'sc05', name: 'Affidavit of Service by Post (Supreme Court, Form 21)',
    court_types: SC, pre: parties,
    rules: [
      [/Appeal No\.{3,}of 20\.{3,}/, 'Appeal No. [CASE_NUMBER] of 20[YEAR_LAST]'],
      [/I,\.{3,}of\.{3,}Advocate-on-record/, 'I, [ADVOCATE_NAME] of [ADVOCATE_ADDRESS] Advocate-on-record'],
      [/Sworn at\.{3,}this\.{3,} day of\.{3,}20\.{3,}/, 'Sworn at [COURT_PLACE] this [DAY] day of [MONTH] 20[YEAR_LAST]'],
    ],
  },
  {
    file: 'sc06', name: 'Affidavit of Service of Summons (Supreme Court, Form 20)',
    court_types: SC, pre: parties,
    rules: [
      [/Appeal No\.{3,}of 20\.{3,}/, 'Appeal No. [CASE_NUMBER] of 20[YEAR_LAST]'],
      [/I,\.{3,}of\.{3,}Advocate-on-record/, 'I, [ADVOCATE_NAME] of [ADVOCATE_ADDRESS] Advocate-on-record'],
      [/Sworn at\.{3,}this \.{3,}day of\.{3,}20\.{3,}/, 'Sworn at [COURT_PLACE] this [DAY] day of [MONTH] 20[YEAR_LAST]'],
    ],
  },
  {
    file: 'sc08', name: 'Notice of Motion (Supreme Court, Form 4)',
    court_types: SC, pre: parties,
    rules: [
      [/Civil \/Criminal Misc\.Petition No\.{3,} of \.{3,} 20\.{3,}/,
       'Civil /Criminal Misc.Petition No. [CASE_NUMBER] of 20[YEAR_LAST]'],
      [/by Mr\.{3,} counsel/, 'by Mr. [ADVOCATE_NAME] counsel'],
      [/Dated this the \.{3,} day of \.{3,} 20\.{3,}/, 'Dated this the [DAY] day of [MONTH] 20[YEAR_LAST]'],
      [/Address: \.{3,}/, 'Address: [ADVOCATE_ADDRESS]'],
    ],
  },

  // ── Shared: the eCourts memo of appearance ───────────────────────
  // ecourts.gov.in and the Delhi High Court mirror serve byte-identical
  // files, and the form names no court ("In the Court of ______"), so it is
  // seeded once and tagged for both benches rather than twice over.
  {
    file: 'hc01', name: 'Memorandum of Appearance of Advocate',
    court_types: ['High Court', 'District & Subordinate'],
    rules: [
      [/In the Court of _{4,}/, 'In the Court of [COURT_NAME]'],
      [/Dated {2}ADVOCATE/, 'Dated [DATE]&&&ADVOCATE&&&[ADVOCATE_NAME]'],
    ],
  },

  // ── Delhi High Court ─────────────────────────────────────────────
  {
    file: 'hc02', name: 'Application for Adjournment (Delhi High Court)',
    court_types: HC,
    rules: [
      [/1\. Case No\./, '1. Case No. [CASE_NUMBER]'],
      [/3\. Name of the petition\/ applicant\./, '3. Name of the petition/ applicant. [CLIENT_NAME_IF_PETITIONER]'],
      [/4\. Name of the respondent\./, '4. Name of the respondent. [CLIENT_NAME_IF_RESPONDENT]'],
    ],
  },
  {
    file: 'hc03', name: 'Caveat (Delhi High Court)',
    court_types: HC,
    rules: [
      [/Caveat No\._{4,} of 2002/, 'Caveat No. [CASE_NUMBER] of 202[YEAR_LAST]'],
      [/File on _{4,}/, 'File on [DATE]'],
    ],
  },
  {
    file: 'hc04', name: 'Index (Delhi High Court)',
    court_types: HC,
    rules: [
      [/Dated this {2,}day of {2,}2002\./, 'Dated this [DAY] day of [MONTH] 202[YEAR_LAST].'],
      [/Advocate for Petitioner \/ Respondent/, 'Advocate for Petitioner / Respondent&&&[ADVOCATE_NAME]'],
    ],
  },
  {
    file: 'hc05', name: 'List of Documents Produced (Order XIII Rule 1, Delhi High Court)',
    court_types: HC,
    rules: [
      [/Suit No\._{4,} of 2002/, 'Suit No. [CASE_NUMBER] of 202[YEAR_LAST]'],
    ],
  },
  {
    file: 'hc06', name: 'Form for Urgent (Mentioning) Cases for Listing (Delhi High Court)',
    court_types: HC,
    rules: [
      [/CASE TYPE _{4,} OF 2011/, 'CASE TYPE [CASE_NUMBER] OF 202[YEAR_LAST]'],
      [/Name of the Counsel _{4,}/, 'Name of the Counsel [ADVOCATE_NAME]'],
      [/Enrolment No\. _{4,}/, 'Enrolment No. [BAR_NUMBER]'],
      [/Address _{4,}/, 'Address [ADVOCATE_ADDRESS]'],
      [/Mobile No\. _{4,}/, 'Mobile No. [ADVOCATE_PHONE]'],
      [/Date : _{4,}/, 'Date : [DATE]'],
    ],
    manual_fields: [
      { token: '[URGENCY_GROUNDS]', label: 'Grounds for Urgency and Nature of Relief Sought', type: 'textarea',
        hint: 'In brief — this is the box the Registry reads first.' },
    ],
    post: t => t.replace(/(GROUNDS FOR URGENCY AND THE NATURE OF RELIEF SOUGHT \(IN BRIEF\) :\n)/,
      '$1[URGENCY_GROUNDS]\n'),
  },
  {
    file: 'hc07', name: 'Vakalatnama (Delhi High Court)',
    court_types: HC,
    rules: [
      [/IN THE COURT OF _{4,}/, 'IN THE COURT OF [COURT_NAME]'],
      [/Suit \/Appeal No\.\/CWP _{4,}/, 'Suit /Appeal No./CWP [CASE_NUMBER]'],
      [/of 2001/, 'of 202[YEAR_LAST]'],
      [/that I\/We _{4,}/, 'that I/We [CLIENT_NAME]'],
      [/day of _{4,}2002\./, 'day of [MONTH] 202[YEAR_LAST].'],
      [/Advocate {2}Client {2}Client/, '[ADVOCATE_NAME]&&&Advocate&&&&&&[CLIENT_NAME]&&&Client'],
    ],
  },
  {
    file: 'hc08', name: 'Application for Certified Copy (Delhi High Court)',
    court_types: HC,
    // This source PDF is a scan with a poor text layer. Only unmistakable
    // scan damage is repaired — letters the OCR misread and speckle it
    // invented. Nothing the form actually says is reworded.
    ocrFixes: [
      ['Plailltiff IAppellants/Petitioner', 'Plaintiff /Appellants/Petitioner'],
      [/-+:DefendantiRespondent/, 'Defendant/Respondent'],
      ['(S) Document (s)', '(5) Document (s)'],
      [/^S\.(\s)/m, '5.$1'],
      ["Advocate for Petitioner IAppellant'", 'Advocate for Petitioner /Appellant/'],
      ['DefendantiRespondent', 'Defendant/Respondent'],
      ['CaseNo. ', 'Case No. '],
      [' of20', ' of 20'],
    ],
    rules: [
      [/Case No\. _{4,} of 20/, 'Case No. [CASE_NUMBER] of 202[YEAR_LAST]'],
    ],
  },
  {
    file: 'hc09', name: 'Application for Uncertified Copy of Order (Delhi High Court)',
    court_types: HC,
    rules: [
      [/Case No\. _{4,} of 2002/, 'Case No. [CASE_NUMBER] of 202[YEAR_LAST]'],
      [/Signature of Advocate _{4,}/, 'Signature of Advocate [ADVOCATE_NAME]'],
      [/Dated _{4,} Petitioner \/ Respondent No\. _{4,}/,
       'Dated [DATE] Petitioner / Respondent No. ________________'],
    ],
  },
  {
    file: 'hc10', name: 'Notice of Motion (Delhi High Court)',
    court_types: HC,
    rules: [
      [/NO\._{4,}/, 'NO. [CASE_NUMBER]'],
      [/SHRI _{4,}/, 'SHRI [ADVOCATE_NAME]'],
      [/New Delhi {2}Through/, 'New Delhi&&&Through'],
      [/Date :/, 'Date : [DATE]'],
    ],
  },
  {
    file: 'hc11', name: 'Process Fee Form (Delhi High Court)',
    court_types: HC,
    rules: [
      [/In the Court of/, 'In the Court of [COURT_NAME]'],
      [/^Case {2,}/m, 'Case [CASE_NUMBER]   '],
    ],
  },
  {
    file: 'hc12', name: 'Form for Interlocutory Applications (Delhi High Court)',
    court_types: HC,
    rules: [
      [/Suit \/ Petition \/ O\.M\.P\. No\. {2,}of 2002/,
       'Suit / Petition / O.M.P. No. [CASE_NUMBER] of 202[YEAR_LAST]'],
    ],
  },
  {
    file: 'hc13', name: 'Listing Proforma — Typed (Delhi High Court)',
    court_types: HC,
    rules: [
      [/DATE {2,}Lawyers Code/, 'DATE [DATE]   Lawyers Code [BAR_NUMBER]'],
    ],
  },
  {
    file: 'hc14', name: 'Listing Proforma II — Handwritten (Delhi High Court)',
    court_types: HC,
    rules: [
      [/Lawyers Code/, 'Lawyers Code [BAR_NUMBER]'],
    ],
  },
  {
    file: 'hc16', name: 'Application for Inspection of File (Delhi High Court)',
    court_types: HC,
    rules: [
      [/Case No\. _{4,} of 2002/, 'Case No. [CASE_NUMBER] of 202[YEAR_LAST]'],
      [/Dated :/, 'Dated : [DATE]'],
      [/Address _{4,}/, 'Address [ADVOCATE_ADDRESS]'],
    ],
  },
  {
    file: 'hc17', name: 'Opening Sheet for Criminal Revision u/s 397 / 401 Cr.P.C. (Delhi High Court)',
    court_types: HC,
    rules: [
      [/Criminal Revision No\. _{4,} of 2002/, 'Criminal Revision No. [CASE_NUMBER] of 202[YEAR_LAST]'],
    ],
  },
  {
    file: 'hc18', name: 'Opening Sheet for Criminal Appeal u/s 374 Cr.P.C. (Delhi High Court)',
    court_types: HC,
    rules: [
      [/Criminal Appeal No\. _{4,} of 2002/, 'Criminal Appeal No. [CASE_NUMBER] of 202[YEAR_LAST]'],
    ],
  },
  {
    file: 'hc19', name: 'Application for Supply of Digital Copy (Delhi High Court)',
    court_types: HC,
    ocrFixes: [
      ['PLAINTIFF/APPELLANTIPETITIONER', 'PLAINTIFF/APPELLANT/PETITIONER'],
      ['CDs/DVD~nclosed', 'CDs/DVDs enclosed'],
      ['Advocate for Petitioner!Appellant', 'Advocate for Petitioner/Appellant'],
      ['Em-oUment No', 'Enrolment No'],
      ['Na,me:', 'Name:'],
      [/^\. Signature:/m, '  Signature:'],
      [' of20', ' of 20'],
    ],
    rules: [
      [/Dated:/, 'Dated: [DATE]'],
    ],
  },

  // ── District & Subordinate ───────────────────────────────────────
  {
    file: 'ds02', name: 'Memorandum of Appearance (Form 6)',
    court_types: DS,
    rules: [
      [/In the Court of \.{4,}/, 'In the Court of [COURT_NAME]'],
      [/Date: \.{4,}/, 'Date: [DATE]'],
    ],
  },
]

// ── run ────────────────────────────────────────────────────────────

const env = Object.fromEntries(
  readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
    .split(/\r?\n/).filter(l => l.includes('=') && !l.trim().startsWith('#'))
    .map(l => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')] })
)
const supabase = createClient(env.VITE_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)

const built = []
const failed = []

for (const form of FORMS) {
  const path = `${DIR}/${form.file}.txt`
  if (!existsSync(path)) { failed.push([form.name, 'extracted text missing']); continue }
  let text = readFileSync(path, 'utf8')
  try {
    if (form.pre) text = form.pre(text)
    if (form.ocrFixes) {
      text = applyTokens(text, form.ocrFixes, `${form.name} / OCR`)
      // A scan turns a ruled blank into spaced underscores or dashes
      // ("_ _ _ _", "- - - -"). Collapsed back to a solid run so the renderer
      // sees a fill-line it can stretch, rather than a row of stray marks.
      text = text
        .replace(/(?:_[ 	]){3,}_*/g, m => '_'.repeat(m.length))
        // A dash followed by three or more dashes/spaces is a ruled blank the
        // scanner broke up ("- - --", "------------"), not punctuation.
        // [ 	-], never \s: \s matches a newline, so a rule ending a line
        // would swallow the break and weld the next line onto it.
        .replace(/-[ 	-]{3,}/g, m => '_'.repeat(m.length))
        // Speckle: marks the scanner invented. Only characters left floating
        // in whitespace at the end of a line, or stranded on a rule, are
        // removed — never anything sitting inside the form's own wording.
        .replace(/(_{4,})[~—-]+$/gm, '$1')
        .replace(/\s{6,}[.,]{1,2}$/gm, '')
        .replace(/\s{15,}[jIJ]$/gm, '')
        .replace(/\s{15,}-\.\s*[jIJ]$/gm, '')
        .replace(/(Total number of pages)\s+-$/gm, '$1')
    }
    text = applyTokens(text, form.rules, form.name)
    if (form.post) text = form.post(text)
    // &&& is a line-splitter used where pdftotext collapsed a stacked
    // signature block onto one line.
    text = text.split('&&&').join('\n')
    const pages = text.split('\f').filter((p, i, all) => i < all.length - 1 || p.trim()).length
    built.push({ ...form, html: formToHtml(text), pages })
  } catch (e) {
    failed.push([form.name, e.message])
  }
}

console.log(APPLY ? '=== APPLYING ===\n' : '=== DRY RUN (nothing written) ===\n')
console.log('| Template | Court types | Pages |')
console.log('|---|---|---|')
built.forEach(b => console.log(`| ${b.name} | ${b.court_types.join(' + ')} | ${b.pages} |`))
if (failed.length) {
  console.log('\nFAILED TO BUILD:')
  failed.forEach(([n, why]) => console.log(`  ${n}: ${why}`))
}
console.log(`\nBuilt ${built.length}, failed ${failed.length}`)

if (!APPLY) { console.log('\nRe-run with --apply to insert.'); process.exit(failed.length ? 1 : 0) }

const { data: existing } = await supabase.from('admin_templates').select('id, name')
let inserted = 0, updated = 0
for (const b of built) {
  const row = {
    name: b.name, content: b.html, court_types: b.court_types,
    manual_fields: b.manual_fields ?? [],
  }
  const hit = existing.find(e => e.name === b.name)
  const res = hit
    ? await supabase.from('admin_templates').update(row).eq('id', hit.id)
    : await supabase.from('admin_templates').insert(row)
  if (res.error) console.error(`  FAILED ${b.name}: ${res.error.message}`)
  else if (hit) updated++
  else inserted++
}
console.log(`\nInserted ${inserted}, updated ${updated}.`)
