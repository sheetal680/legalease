// Three corrections to the Execution Petition (Order 21, Rule II, Clause I),
// all found in live testing rather than by the automated audits.
//
// Usage: node --env-file=.env.local scripts/fixExecutionPetitionSlots.js
//
// 1. COVER SHEET MIS-MAP. The cover printed "E.P. No. [CASE_NUMBER]", i.e. the
//    client's suit number in the execution-petition slot, so it rendered
//    "E.P. No. OS/532/2026". The E.P. number is a different number and is
//    already asked for as a question; the header line was correct, only the
//    cover was wrong. This came from the original seed, not from the Phase 2
//    tagging. Neither audit caught it: the gap scan only looks for slots with
//    NO token, and this slot had one.
//
// 2. "1. Suti Number" WAS NEVER CONVERTED. It was reported as changed to
//    [CASE_NUMBER] in an earlier summary; it was not — it still held the
//    [SUIT_NUMBER] question, which is why it rendered blank when unanswered.
//    The suit number IS the client's case number, so it becomes [CASE_NUMBER]
//    and the redundant question is dropped.
//
// 3. NO DATE TOKEN. The "Date }" line beside the decree-holder signature block
//    had no token at all, so it never filled.
//
// Not changed: the Costs Memo. It was reported as missing a date too, but that
// printed form has no date line anywhere — there is nothing to attach [DATE]
// to, and inventing one would add text the form does not have.

import { client } from './lib/tagTemplates.js'

const NAME = 'Execution Petition under Order 21, Rule II, Clause I - filed by the Decree Holder'

const EDITS = [
  // 1. cover sheet: the E.P. slot takes the E.P. number, not the suit number
  ['<p style="margin-left:50%;">E.P. No.&nbsp;&nbsp;&nbsp;&nbsp;[CASE_NUMBER]',
   '<p style="margin-left:50%;">E.P. No.&nbsp;&nbsp;&nbsp;&nbsp;[EP_NUMBER]'],
  // 2. the schedule's suit number is the client's case number
  ['Suti Number&nbsp;[SUIT_NUMBER]', 'Suti Number&nbsp;[CASE_NUMBER]'],
  // 3. the signature block's date
  ['<p>Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</p>', '<p>Date&nbsp;[DATE]&nbsp;&nbsp;&nbsp;&nbsp;}</p>'],
]

const DROP_QUESTIONS = ['[SUIT_NUMBER]']

async function main() {
  const supabase = client()
  const { data: row, error } = await supabase
    .from('admin_templates').select('id, name, content, manual_fields').eq('name', NAME).single()
  if (error) { console.error('Not found:', error.message); process.exit(1) }

  let content = row.content
  for (const [from, to] of EDITS) {
    if (content.includes(to)) { console.log('  already applied:', to.slice(0, 46)); continue }
    const hits = content.split(from).length - 1
    if (hits !== 1) {
      console.error(`  ✗ ${JSON.stringify(from.slice(0, 50))} matched ${hits}x (expected 1) — aborting`)
      process.exit(1)
    }
    content = content.replace(from, to)
    console.log('  fixed:', to.slice(0, 60))
  }

  const fields = (row.manual_fields || []).filter(f => !DROP_QUESTIONS.includes(f.token))
  for (const tok of DROP_QUESTIONS) {
    if (content.includes(tok)) {
      console.error(`  ✗ dropping question ${tok} but it is still in the document — aborting`)
      process.exit(1)
    }
  }

  const { error: upErr } = await supabase
    .from('admin_templates').update({ content, manual_fields: fields }).eq('id', row.id)
  if (upErr) { console.error('Update failed:', upErr.message); process.exit(1) }

  console.log(`\n${row.name}`)
  console.log(`  questions: ${(row.manual_fields || []).length} -> ${fields.length}`)
}

main()
