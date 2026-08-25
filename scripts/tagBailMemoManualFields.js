// Phase 1 of the Template Details feature: tags exactly ONE template with
// `manual_fields`, so the mechanism can be tried end-to-end before the rest of
// the library is tagged.
//
//   "Memo of Appearance with Verification by the Person Interested
//    (Bail u/s 437 / 439 Cr. P.C.)"
//
// Usage: node --env-file=.env.local scripts/tagBailMemoManualFields.js
//
// Two things happen, in one update:
//   1. Named tokens are inserted into the template HTML at each blank that the
//      app cannot autofill from saved advocate/client data.
//   2. `manual_fields` is set to the matching question list.
//
// Token placement rule: one separating space, then the token, then the existing
// whitespace / dot-leader run. Where the printed label is followed by an &nbsp;
// run, the separator is taken FROM that run rather than added to it, so the
// blank form keeps exactly the width it has today; an answered token sits on
// the leader, which the renderer's elastic fill-lines then shrink to keep the
// line flush at the right margin.
//
// The one deliberate exception is [CRIME_YEAR], which must sit flush against
// the pre-printed "202" so the two read as a single year. That field is typed
// `year` with prefix "202": the advocate is asked for a plain four-digit year
// and only the digits the form leaves room for are emitted. This is the
// standard pattern for any pre-printed year slot.
//
// Blanks deliberately NOT asked about, because they already autofill:
//   the court name, the case number, the year, the advocate's name (both the
//   "to appoint Sri" line and the cover "Mr." line), the advocate's address for
//   service, the client's name, and the date.
//
// [POLICE_STATION] intentionally appears twice in the document (the memo's
// "of P.S." line and the verification's "P.S." line) — one question fills both.

import { createClient } from '@supabase/supabase-js'

const url = process.env.VITE_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !serviceRoleKey) {
  console.error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Check .env.local.')
  process.exit(1)
}
const supabase = createClient(url, serviceRoleKey)

const TEMPLATE_NAME =
  'Memo of Appearance with Verification by the Person Interested (Bail u/s 437 / 439 Cr. P.C.)'

// [anchor, replacement] — each anchor must occur exactly once, or the script
// aborts rather than silently mis-tagging the document.
const EDITS = [
  ['residing at',                'residing at&nbsp;[ACCUSED_ADDRESS]'],
  ['in Crime No',                'in Crime No&nbsp;[CRIME_NUMBER]'],
  ['<p>202',                     '<p>202[CRIME_YEAR]'],
  ['of P.S.',                    'of P.S.&nbsp;[POLICE_STATION]'],
  ['<p>hereby verify',           '<p>[PERSON_INTERESTED_NAME]&nbsp;&nbsp;hereby verify'],
  ['authorised by Sri</p>',      'authorised by Sri&nbsp;[AUTHORISED_BY]</p>'],
  ['<p>P.S.&nbsp;',              '<p>P.S.&nbsp;[POLICE_STATION]'],
  ['Dist.</p>',                  'Dist.&nbsp;[DISTRICT]</p>'],
  ['now lodged in&nbsp;',        'now lodged in&nbsp;[PRISON_NAME]'],
  ['Prison at</p>',              'Prison at&nbsp;[PRISON_PLACE]</p>'],
  ['<p>to appoint Sri</p>',      '<p>to appoint Sri&nbsp;[ADVOCATE_NAME]</p>'],
  ['Accused is my',              'Accused is my&nbsp;[RELATIONSHIP_TO_ACCUSED]'],
  ['that petition No.</p>',      'that petition No.&nbsp;[PRIOR_PETITION_NUMBER]</p>'],
  ['<p>dated&nbsp;',             '<p>dated&nbsp;[PRIOR_PETITION_DATE]'],
  ['in the Court of</p>',        'in the Court of&nbsp;[PRIOR_PETITION_COURT]</p>'],
  ['<p>at&nbsp;',                '<p>at&nbsp;[PRIOR_PETITION_PLACE]'],
  ['<p>has</p>',                 '<p>has&nbsp;[PRIOR_PETITION_DISPOSAL]</p>'],
  ['<strong>Mr.</strong>',       '<strong>Mr.</strong>&nbsp;[ADVOCATE_NAME]'],
  ['<em>For</em>',               '<em>For</em>&nbsp;[CLIENT_NAME]'],
]

// Rewrites of earlier passes of this script, so re-running converges on the
// current shape rather than needing the template re-seeded. On a freshly
// seeded template none of them match.
const REPAIRS = [
  // [CRIME_YEAR_LAST] asked for a single digit; it is now [CRIME_YEAR], a
  // four-digit year whose pre-printed "202" is stripped at render time.
  ['[CRIME_YEAR_LAST]', '[CRIME_YEAR]'],
  ['residing at[ACCUSED_ADDRESS]',        'residing at&nbsp;[ACCUSED_ADDRESS]'],
  ['in Crime No[CRIME_NUMBER]',           'in Crime No&nbsp;[CRIME_NUMBER]'],
  ['of P.S.[POLICE_STATION]',             'of P.S.&nbsp;[POLICE_STATION]'],
  ['<p>P.S.[POLICE_STATION]&nbsp;',       '<p>P.S.&nbsp;[POLICE_STATION]'],
  ['Dist.[DISTRICT]',                     'Dist.&nbsp;[DISTRICT]'],
  ['now lodged in[PRISON_NAME]&nbsp;',    'now lodged in&nbsp;[PRISON_NAME]'],
  ['Accused is my[RELATIONSHIP_TO_ACCUSED]', 'Accused is my&nbsp;[RELATIONSHIP_TO_ACCUSED]'],
  ['<p>dated[PRIOR_PETITION_DATE]&nbsp;', '<p>dated&nbsp;[PRIOR_PETITION_DATE]'],
  ['<p>at[PRIOR_PETITION_PLACE]&nbsp;',   '<p>at&nbsp;[PRIOR_PETITION_PLACE]'],
]

// Plain-language questions, in the order the blanks appear in the document.
const MANUAL_FIELDS = [
  { token: '[ACCUSED_ADDRESS]', label: 'Address of the Accused / Person Interested', type: 'textarea' },
  { token: '[CRIME_NUMBER]', label: 'Crime Number', type: 'text' },
  { token: '[CRIME_YEAR]', label: 'Crime Year', type: 'year', prefix: '202' },
  { token: '[POLICE_STATION]', label: 'Police Station', type: 'text',
    hint: 'Used on both the memo and the verification.' },
  { token: '[PERSON_INTERESTED_NAME]', label: 'Name of the Person Interested', type: 'text',
    hint: 'Whoever is signing the verification on the accused’s behalf.' },
  { token: '[AUTHORISED_BY]', label: 'Authorised by Sri (name of the Accused)', type: 'text' },
  { token: '[DISTRICT]', label: 'District', type: 'text' },
  { token: '[PRISON_NAME]', label: 'Prison Name', type: 'text' },
  { token: '[PRISON_PLACE]', label: 'Prison Location', type: 'text' },
  { token: '[RELATIONSHIP_TO_ACCUSED]', label: 'Relationship to the Accused', type: 'text',
    hint: 'Completes "Accused is my …" — for example father, brother, wife.' },
  { token: '[PRIOR_PETITION_NUMBER]', label: 'Earlier Bail Petition Number', type: 'text',
    hint: 'Leave blank if no earlier bail petition was filed.' },
  { token: '[PRIOR_PETITION_DATE]', label: 'Earlier Bail Petition — Date', type: 'date' },
  { token: '[PRIOR_PETITION_COURT]', label: 'Earlier Bail Petition — Court', type: 'text' },
  { token: '[PRIOR_PETITION_PLACE]', label: 'Earlier Bail Petition — Place', type: 'text' },
  { token: '[PRIOR_PETITION_DISPOSAL]', label: 'Earlier Bail Petition — Disposal', type: 'text',
    hint: 'The line reads "the same has … been disposed off." Type "not" if it has not been disposed of; otherwise leave blank.' },
]

async function main() {
  const { data: row, error: findErr } = await supabase
    .from('admin_templates').select('id, name, content').eq('name', TEMPLATE_NAME).single()
  if (findErr) { console.error('Template not found:', findErr.message); process.exit(1) }

  let content = row.content

  for (const [from, to] of REPAIRS) {
    if (content.includes(from)) { content = content.split(from).join(to); console.log('  rewrote:', from) }
  }

  for (const [anchor, replacement] of EDITS) {
    // Idempotent: re-running after a successful tag is a no-op, not a double-insert.
    if (content.includes(replacement)) { console.log('  already tagged:', anchor); continue }
    const occurrences = content.split(anchor).length - 1
    if (occurrences !== 1) {
      console.error(`Anchor ${JSON.stringify(anchor)} matched ${occurrences} times (expected 1). Aborting without writing.`)
      process.exit(1)
    }
    content = content.replace(anchor, replacement)
  }

  // Every declared token must actually exist in the document, or the Details
  // page would ask a question whose answer goes nowhere.
  const missing = MANUAL_FIELDS.map(f => f.token).filter(t => !content.includes(t))
  if (missing.length) {
    console.error('Declared tokens absent from the document:', missing.join(', '))
    process.exit(1)
  }

  const { error } = await supabase
    .from('admin_templates')
    .update({ content, manual_fields: MANUAL_FIELDS })
    .eq('id', row.id)
  if (error) { console.error('Update failed:', error.message); process.exit(1) }

  console.log(`\nTagged "${row.name}"`)
  console.log(`  id: ${row.id}`)
  console.log(`  ${MANUAL_FIELDS.length} questions, ${EDITS.length} token insertions`)
}

main()
