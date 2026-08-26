// Follow-up to Phase 2: closes the gaps found by the client-autofill audit.
// Usage: node --env-file=.env.local scripts/fixClientAutofillGaps.js
//
// The audit confirmed Phase 2 removed no autofill token — every token that
// exists resolves correctly against a real client record. It did surface two
// genuine faults of my own making:
//
//   1. Four templates ask for a suit number the app already holds on the client
//      record. Those slots become [CASE_NUMBER] and the question is dropped.
//      Where a form carries BOTH an I.A./E.P. number and the underlying suit
//      number, only the suit number is autofilled — the I.A./E.P. number stays
//      a question, because the client record does not hold it.
//
//   2. The High Court Vakalatnama's execution date was never autofilled. It is
//      the only template in the library with no date token at all.
//
// Not changed, because they are correct as they stand:
//   * High Court Vakalatnama, Form No. 11 and the NI Act summons have no
//     [COURT_NAME] — the first two print a fixed court (the High Court at
//     Amaravati; the Principal District Judge, Eluru) and the third has no
//     court line, so the client's court would be wrong there.

import { client } from './lib/tagTemplates.js'

const supabase = client()

// Templates whose primary suit-number slot duplicates clients.case_number.
const CASE_NUMBER_FIXES = [
  { name: 'Attachment in Execution - Prohibitory Order, Immovable Property (Order 21, Rule 54)', from: '[OS_NUMBER]' },
  { name: 'Costs Memo and Fees Certificate', from: '[OS_NUMBER]' },
  { name: 'Petition to Number Out of Order under Rule 57 C.R.P. (with Affidavit u/s 139 C.P.C.)', from: '[OS_NUMBER]' },
  { name: 'సాక్షి సమను / Witness Summons (Order 16, Rules 1 and 5)', from: '[OSC_NUMBER]' },
]

const DATE_FIXES = [
  {
    name: 'High Court Vakalatnama (Andhra Pradesh, Amaravati)',
    edits: [
      ['Executed before me this&nbsp;<u>', 'Executed before me this&nbsp;[DAY]&nbsp;<u>'],
      ['&nbsp;day of&nbsp;<u>', '&nbsp;day of&nbsp;[MONTH]&nbsp;<u>'],
    ],
  },
]

async function main() {
  for (const fix of CASE_NUMBER_FIXES) {
    const { data: row, error } = await supabase
      .from('admin_templates').select('id, name, content, manual_fields').eq('name', fix.name).single()
    if (error) { console.error(`  ✗ ${fix.name}: ${error.message}`); process.exit(1) }

    if (!row.content.includes(fix.from)) { console.log(`  – ${fix.name} (already fixed)`); continue }
    const spots = row.content.split(fix.from).length - 1
    const content = row.content.split(fix.from).join('[CASE_NUMBER]')
    const manual_fields = (row.manual_fields || []).filter(f => f.token !== fix.from)

    const { error: upErr } = await supabase
      .from('admin_templates').update({ content, manual_fields }).eq('id', row.id)
    if (upErr) { console.error(`  ✗ ${fix.name}: ${upErr.message}`); process.exit(1) }
    console.log(`  ✓ ${fix.name}`)
    console.log(`      ${fix.from} -> [CASE_NUMBER] in ${spots} spot(s); question dropped, ` +
                `${manual_fields.length} remain`)
  }

  for (const fix of DATE_FIXES) {
    const { data: row, error } = await supabase
      .from('admin_templates').select('id, name, content').eq('name', fix.name).single()
    if (error) { console.error(`  ✗ ${fix.name}: ${error.message}`); process.exit(1) }

    let content = row.content
    for (const [anchor, replacement] of fix.edits) {
      if (content.includes(replacement)) continue
      const hits = content.split(anchor).length - 1
      if (hits !== 1) { console.error(`  ✗ ${fix.name}: anchor ${JSON.stringify(anchor)} matched ${hits}x`); process.exit(1) }
      content = content.replace(anchor, replacement)
    }
    if (content === row.content) { console.log(`  – ${fix.name} (already fixed)`); continue }
    const { error: upErr } = await supabase.from('admin_templates').update({ content }).eq('id', row.id)
    if (upErr) { console.error(`  ✗ ${fix.name}: ${upErr.message}`); process.exit(1) }
    console.log(`  ✓ ${fix.name}`)
    console.log(`      execution date now autofills ([DAY] / [MONTH])`)
  }
}

main()
