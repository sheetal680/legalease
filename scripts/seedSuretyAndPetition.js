// Seeds two more scanned court forms into admin_templates using the service
// role key (RLS blocks browser writes).
//
//   E:\20260819233524.pdf -> "Surety Memo"                                  1 page
//   E:\20260819233632.pdf -> "Petition Filed U/Sec. 279/355 of BNSS-2023"   2 pages
//
// Usage: node --env-file=.env.local scripts/seedSuretyAndPetition.js
//
// Reuses the renderer capabilities already in place: per-side page margins
// (<div data-page-margin="top right bottom left">), per-template typeface
// (<div data-page-font>), elastic fill-lines (a run of 4+ dots/underscores
// stretches to the remaining width), and whitespace-run preservation via
// &nbsp; (normalised back to real spaces at measure time).
//
// Original spellings/typos reproduced verbatim: "Wethe", "theresore",
// "Be pleased consider.", "compliant", "Compltant", "neigher", "want on",
// "dispence", "interst", and the spaced-out "c a s e" line break artifact.

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
const PAGE_BREAK = '<div data-page-break="true" style="page-break-before: always;"></div>'

// ── Surety Memo ────────────────────────────────────────────────────
// Margins measured off the scan: top 63pt, right 46pt, bottom 40pt, left 44pt.
const suretyMemo = `
<div data-page-margin="63 46 40 44"></div>
<div data-page-font="helvetica"></div>
<h2><strong>In the Court of the</strong> [COURT_NAME]</h2>
<p>&nbsp;</p>
<p style="text-align:center;">S.T.C.C.S.T.${sp(10)}[CASE_NUMBER]${sp(28)}202[YEAR_LAST]</p>
<p>&nbsp;</p>
<p>Between${sp(6)}[CLIENT_NAME_IF_PETITIONER]</p>
<p style="text-align:right;">Petitioner / Accused</p>
${GAP(3)}
<p style="text-align:center;">And${sp(6)}[CLIENT_NAME_IF_RESPONDENT]</p>
<p style="text-align:right;">Respondent / complainant</p>
${GAP(3)}
<p>Offence under Section</p>
${GAP(3)}
<h2 style="text-align:center;">SURETY MEMO</h2>
<p>&nbsp;</p>
<p style="text-align:justify;">Wethe undersigned are giving surety to the above named accused in the above case. The solvency papers and ration cards etc., are herewith filled. theresore the hon'ble Court may accept our surety to the above accused.</p>
<p>&nbsp;</p>
<p style="text-align:right;">Be pleased consider.</p>
${GAP(2)}
<p style="text-align:center;">SURETIES</p>
${GAP(2)}
<p>(${sp(52)}1)</p>
${GAP(3)}
<p style="margin-left:44%;">(2)</p>
${GAP(3)}
<p>Date : [DATE]</p>
${GAP(2)}
<p style="margin-left:40%;">Advocate for accused</p>
<p style="margin-left:40%;">[ADVOCATE_NAME]</p>
`.trim().replace(/\n/g, '')

// ── Petition u/Sec. 279/355 of BNSS-2023 ───────────────────────────
// Margins measured off the scan: top 55pt, right 39pt, bottom 40pt, left 46pt.
// Two pages — page 2 is the cover/endorsement sheet and starts on its own
// page via a hard break. (The mirrored text visible on page 2 of the scan is
// show-through from page 1, not printed content, so it is not reproduced.)
const petitionBnss = `
<div data-page-margin="55 39 40 46"></div>
<div data-page-font="times"></div>
<h2><strong>In the Court of the</strong> [COURT_NAME]</h2>
<p>&nbsp;</p>
<p style="text-align:center;">Crl. M.P. No.${sp(4)}[CASE_NUMBER]${sp(4)}/ 202[YEAR_LAST]</p>
<p style="text-align:center;">in</p>
<p style="text-align:center;">CC / MC No.${sp(10)}/ 202[YEAR_LAST]</p>
<p>Between :${sp(4)}[CLIENT_NAME_IF_PETITIONER]</p>
${GAP(2)}
<p style="text-align:right;">...Petitioner/</p>
<p style="text-align:right;">...Compltant</p>
<p style="text-align:right;">...accused</p>
<p style="text-align:center;">AND</p>
<p>${sp(9)}[CLIENT_NAME_IF_RESPONDENT]</p>
${GAP(3)}
<p style="text-align:right;">...Respondent</p>
<p style="text-align:right;">...Petitioner</p>
${GAP(3)}
<p style="text-align:center;"><strong>PETITION FILED U/SEC. 279/355 OF BNSS-2023</strong></p>
<p>&nbsp;</p>
<p>The petitioners/compliant/accused most respectfully submits as follows:</p>
<p>&nbsp;</p>
<p>1).${sp(2)}That the petitioners is/are the accused/complainant/appellant/petitioners in the above case and the${sp(3)}c a s e stands posted today</p>
<p>&nbsp;</p>
<p>2).${sp(2)}That the petitioners/appellant/complainant/accused unable to attend before the Hon'ble Court today due to</p>
<p>&nbsp;</p>
<p>3).${sp(2)}That the non-appearance of the petitioners/appellant/complainant / accused is/are neigher intentional nor want on, but purely due to above said reason only.</p>
<p>&nbsp;</p>
<p>${sp(4)}Hence, it is prayed that the Hon'ble Court may be pleased to dispence with the personal attendance of the petitioners/appellant/complainant/accused today, in the interst of justice.</p>
${GAP(3)}
<p>Dt :${sp(4)}[DAY]${sp(2)}-${sp(2)}[MONTH]${sp(2)}-${sp(2)}202[YEAR_LAST]${sp(12)}Advocate for petitioner/Complt/accused</p>
${PAGE_BREAK}
<h2 style="margin-left:38%;"><strong>IN THE COURT OF THE</strong></h2>
<p>&nbsp;</p>
<p style="margin-left:48%;">Crl. M.P. No.${sp(4)}[CASE_NUMBER]${sp(4)}/ 202[YEAR_LAST]</p>
<p style="margin-left:57%;">in</p>
<p style="margin-left:48%;">CC / MC No.${sp(10)}/ 202[YEAR_LAST]</p>
${GAP(4)}
<p style="margin-left:44%;"><strong><u>Petition Filed U/s. 279/355 of BNSS 2023</u></strong></p>
${GAP(9)}
<p>________</p>
<p style="margin-left:44%;">Address for Service : [ADVOCATE_ADDRESS]</p>
`.trim().replace(/\n/g, '')

const templates = [
  { name: 'Surety Memo', content: suretyMemo },
  { name: 'Petition Filed U/Sec. 279/355 of BNSS-2023', content: petitionBnss },
]

async function main() {
  for (const t of templates) {
    const { data: existing, error: findErr } = await supabase
      .from('admin_templates').select('id').eq('name', t.name)
    if (findErr) { console.error('Lookup failed:', findErr.message); process.exit(1) }

    if (existing && existing.length) {
      const { error } = await supabase
        .from('admin_templates').update({ content: t.content }).eq('id', existing[0].id)
      if (error) { console.error('Update failed:', error.message); process.exit(1) }
      console.log(`Updated "${t.name}" (id: ${existing[0].id})`)
    } else {
      const { data, error } = await supabase
        .from('admin_templates')
        .insert({ name: t.name, content: t.content, file_url: null, file_type: null })
        .select('id').single()
      if (error) { console.error('Insert failed:', error.message); process.exit(1) }
      console.log(`Inserted "${t.name}" (id: ${data.id})`)
    }
  }
}

main()
