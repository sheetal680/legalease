// Tags each template with the kind(s) of court the form is actually filed in.
//
//   node scripts/tagTemplateCourtTypes.js           # dry run, prints the table
//   node scripts/tagTemplateCourtTypes.js --apply   # writes court_types
//
// The classification below was read out of each document's cause title and the
// court it directs the reader to appear before — not inferred from its name.
// Where a document mentions a higher court only in a citation or in a clause
// about appellate costs, that mention is NOT the filing court and is ignored.
//
// A template left out of this list keeps court_types NULL, which means valid
// in every court. Untagged must never mean "valid nowhere".

import { readFileSync } from 'fs'
import { createClient } from '@supabase/supabase-js'

const APPLY = process.argv.includes('--apply')

const HC = 'High Court'
const DS = 'District & Subordinate'
const FC = 'Family Court'

// name -> [court types, reason read from the document]
const TAGS = {
  'High Court Vakalatnama (Andhra Pradesh, Amaravati)':
    [[HC], 'Cause title: "IN THE HIGH COURT OF ANDHRA PRADESH AT AMARAVATI"'],

  'Form No. 11 (Rule 15) - Notice in the matter of the Marriage Act':
    [[FC, DS], 'Marriage Act matter, filed before the Principal District Judge, Eluru'],
  'Notice (Hindu Marriage Act, 1955)':
    [[FC, DS], 'O.P. "in the matter of Hindu Marriage Act, 1955"'],
  'Notice (Hindu Marriage Act, 1955) - Nazar printing':
    [[FC, DS], 'O.P. "in the matter of Hindu Marriage Act, 1955"'],

  'Attachment in Execution - Prohibitory Order, Immovable Property (Order 21, Rule 54)':
    [[DS], 'Execution in a suit court — Order 21 CPC'],
  'Costs Memo and Fees Certificate':
    [[DS], 'Costs memo in an O.S.'],
  'Execution Petition under Order 21, Rule II, Clause I - filed by the Decree Holder':
    [[DS], 'Execution petition — Order 21 CPC'],
  'F. No 7-A - Attachment of immovable Property before Judgement (Order 38, Rule 5 C.P.C.)':
    [[DS], 'Attachment before judgement — Order 38 CPC'],
  'Form No. 51 (Rule 128 C.R.P.) - Application for Certified Copies':
    [[DS], 'Certified copies in a suit before the trial court'],
  'M.C. Notice (Section 125 Cr. P.C.)':
    [[DS], 'Directs appearance "before the First Class Magistrate"'],
  'Memo of Appearance (Criminal)':
    [[DS], 'Criminal memo of appearance, complainant/accused cause title'],
  'Memo of Appearance with Verification by the Person Interested (Bail u/s 437 / 439 Cr. P.C.)':
    [[DS], 'Bail memo under 437/439 CrPC'],
  'Notice (I.A. / Original Suit)':
    [[DS], 'I.A. in an Original Suit'],
  'Notice (Order 21 Rule 54 (1A))':
    [[DS], 'Execution notice — Order 21 CPC'],
  'Notice (Order 21 Rule 54 (1A)) - Proclemation of sale printing':
    [[DS], 'Execution notice — Order 21 CPC'],
  'Notice of the day fixed setting & Sale Proclanation (Order 21 Rule 66)':
    [[DS], 'Sale proclamation — Order 21 CPC'],
  'Notice to Send for pay particulars (Garnishee / Disbursing Officer)':
    [[DS], 'Cause title names the Senior Civil Judge'],
  'Notice U/Cr 21 48 CPC)':
    [[DS], 'Execution notice — Order 21 Rule 48 CPC'],
  'Petition Filed u/s. 317 / 256 of Cr. P.C.':
    [[DS], 'Crl. M.P. in a magistrate/sessions case'],
  'Petition Filed U/Sec. 279/355 of BNSS-2023':
    [[DS], 'Crl. M.P. in CC / MC'],
  'Petition Filed U/Sec. 279/355 of BNSS-2023 (STC/C.C/S.C.)':
    [[DS], 'Crl. M.P. in STC / C.C. / S.C.'],
  'Petition to Condone Delay under Section 148 & 151 C.P.C. (with Affidavit)':
    [[DS], 'I.A. under 148 & 151 CPC before the trial court'],
  'Petition to Number Out of Order under Rule 57 C.R.P. (with Affidavit u/s 139 C.P.C.)':
    [[DS], 'I.A. in an O.S. before the trial court'],
  'Process Memo':
    [[DS], 'Process memo in an O.S.'],
  'Propfarma of NI Act Cases Summons — Form I (Summons to an Accused Person)':
    [[DS], 'Directs appearance before the Addl. Judicial Magistrate of First Class'],
  'Summons (O. 5, RR 1, 5 C.P.C.)':
    [[DS], 'Suit summons — Order 5 CPC'],
  'Summons to Accused (Sec. 61 Cr.P.C.) with Note on Provision for Compromise':
    [[DS], 'Cause title: Addl. Junior Civil Judge cum I Class Magistrate, Bhimavaram'],
  'Summons to Accused Person (Section 68 Cri. Pro. Code)':
    [[DS], 'Cause title names the J.F.C.M.'],
  'Surety Memo':
    [[DS], 'Surety in an S.T.C. / C.C.'],
  'దావాసమను / Suit Summons (Order 5, Rules 1 and 5)':
    [[DS], 'Suit summons — Order 5 CPC'],
  'నోటీసు (Notice)':
    [[DS], 'I.A. notice in a suit'],
  'వకాలత్ / Vakalath (Form No. 121, Rule No. 276-A)':
    [[DS], 'Vakalat, Form 121 — subordinate court form'],
  'సాక్షి సమను / Witness Summons (Order 16, Rules 1 and 5)':
    [[DS], 'Witness summons — Order 16 CPC'],
}

const env = Object.fromEntries(
  readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
    .split(/\r?\n/)
    .filter(l => l.includes('=') && !l.trim().startsWith('#'))
    .map(l => {
      const i = l.indexOf('=')
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]
    })
)
const supabase = createClient(env.VITE_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)

const { data: templates, error } = await supabase
  .from('admin_templates').select('id, name, court_types').order('name')
if (error) { console.error(error.message); process.exit(1) }

// Refuse to run half-blind: a template named here that no longer exists means
// this list has drifted from the database and the rest of it is suspect too.
const unknown = Object.keys(TAGS).filter(n => !templates.some(t => t.name === n))
if (unknown.length) {
  console.error('These tagged names match no template:')
  unknown.forEach(n => console.error('  ' + n))
  process.exit(1)
}

const untagged = templates.filter(t => !TAGS[t.name])

console.log(APPLY ? '=== APPLYING ===\n' : '=== DRY RUN (nothing written) ===\n')
console.log('| # | Template | Court types | Read from the document |')
console.log('|---|---|---|---|')
templates.forEach((t, i) => {
  const entry = TAGS[t.name]
  const types = entry ? entry[0].join(' + ') : '— (valid everywhere)'
  const why = entry ? entry[1] : 'not tagged'
  console.log(`| ${i + 1} | ${t.name} | ${types} | ${why} |`)
})

const count = types => templates.filter(t => TAGS[t.name]?.[0].join() === types.join()).length
console.log(`\nTotals: High Court ${count([HC])} | District & Subordinate ${count([DS])}`
  + ` | Family Court + District & Subordinate ${count([FC, DS])} | untagged ${untagged.length}`)
console.log(`Templates: ${templates.length}`)

if (!APPLY) { console.log('\nRe-run with --apply to write court_types.'); process.exit(0) }

let written = 0
for (const t of templates) {
  const entry = TAGS[t.name]
  if (!entry) continue
  const { error } = await supabase
    .from('admin_templates').update({ court_types: entry[0] }).eq('id', t.id)
  if (error) console.error(`  FAILED ${t.name}: ${error.message}`)
  else written++
}
console.log(`\nTagged ${written} template(s).`)
