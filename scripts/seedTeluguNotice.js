// Seeds the Telugu "నోటీసు" (Notice) court form into admin_templates.
//
//   E:\20260819233443.pdf and E:\20260819233616.pdf are duplicate scans of
//   this same single-page form, so it is seeded once.
//
// Usage: node --env-file=.env.local scripts/seedTeluguNotice.js
//
// The Telugu text is reproduced exactly as printed — not translated, not
// transliterated, no English added alongside. Rendering uses the embedded
// Noto Sans Telugu face declared via <div data-page-font="telugu">, which the
// renderer lazy-loads (jsPDF's built-in Type1 faces are WinAnsi-only and
// cannot carry Telugu script).

import { createClient } from '@supabase/supabase-js'

const url = process.env.VITE_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !serviceRoleKey) {
  console.error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Check .env.local.')
  process.exit(1)
}
const supabase = createClient(url, serviceRoleKey)

const sp = n => '&nbsp;'.repeat(n)
const GAP = n => '<p>&nbsp;</p>'.repeat(n)

// Margins measured off the scan: top 62pt, right 40pt, bottom 40pt, left 42pt.
const name = 'నోటీసు (Notice)'
const content = `
<div data-page-margin="62 40 40 42"></div>
<div data-page-font="telugu"></div>
<h2 style="text-align:center;"><strong>నోటీసు</strong></h2>
<p>మహారాజశ్రీ,${sp(60)}కోర్టులో [COURT_NAME]</p>
${GAP(2)}
<p>${sp(6)}/ A${sp(12)}/ 202[YEAR_LAST]${sp(2)}IN${sp(16)}S${sp(14)}No.${sp(8)}[CASE_NUMBER]${sp(6)}/ 202[YEAR_LAST]</p>
${GAP(4)}
<p>${sp(4)}[CLIENT_NAME_IF_PETITIONER]</p>
<p style="text-align:right;">పిటీషినర్</p>
${GAP(7)}
<p>${sp(4)}[CLIENT_NAME_IF_RESPONDENT]</p>
<p style="text-align:right;">రెస్పాండెంట్</p>
${GAP(9)}
<p style="text-align:justify;">కోరుచు పిటీషను దాఖలు చేసినందున యిందు విషయమై అక్షేపణలున్న${sp(4)}202[YEAR_LAST]${sp(6)}సం.${sp(10)}నెల${sp(8)}తేది పగలు 10 గంటలకు ఖుద్దునగాని, వకీలు ద్వారా గాని పై కోర్టులో హాజరై కోర్టు వారితో మనవి చేసుకోవలసినది.${sp(3)}లేని యెడల సదరు విషయమై నీ పరోక్షమున విచారించి తీర్మానము చేయుదురని తెలియచేయడమైనది.${sp(4)}202[YEAR_LAST]${sp(8)}సం||${sp(8)}నెల${sp(10)}తేదీన మా చేవ్రాలున్ను కోర్టు ముద్రయున్నూ వేయబడినది.</p>
${GAP(4)}
<p style="text-align:right;">(By Order)</p>
<p>&nbsp;</p>
<p style="text-align:right;">(Head Clerk)</p>
`.trim().replace(/\n/g, '')

async function main() {
  const { data: existing, error: findErr } = await supabase
    .from('admin_templates').select('id').eq('name', name)
  if (findErr) { console.error('Lookup failed:', findErr.message); process.exit(1) }

  if (existing && existing.length) {
    const { error } = await supabase
      .from('admin_templates').update({ content }).eq('id', existing[0].id)
    if (error) { console.error('Update failed:', error.message); process.exit(1) }
    console.log(`Updated "${name}" (id: ${existing[0].id})`)
  } else {
    const { data, error } = await supabase
      .from('admin_templates')
      .insert({ name, content, file_url: null, file_type: null })
      .select('id').single()
    if (error) { console.error('Insert failed:', error.message); process.exit(1) }
    console.log(`Inserted "${name}" (id: ${data.id})`)
  }
}

main()
