// Seeds two scanned court forms into admin_templates using the service role
// key (RLS blocks browser writes; the admin app's login is a hardcoded
// sessionStorage flag, not a real Supabase auth session).
//
//   E:\20260819233427.pdf  -> "Summons to Accused Person (Section 68 Cri. Pro. Code)"   1 page
//   E:\20260819233435.pdf  -> "Summons (O. 5, RR 1, 5 C.P.C.)"                          1 page
//
// Usage: node --env-file=.env.local scripts/seedSummonsForms.js
//
// Fidelity notes (checked against de-skewed 300dpi crops of the scans):
//  * Form A's upper fill-lines are SOLID rules; its lower half uses DOTTED
//    leaders. Both are reproduced with real glyphs (underscore / period)
//    rather than nbsp padding, because jsPDF measures U+00A0 at 6.12pt while
//    rendering it at space width, which desynchronises wrapping. Real glyphs
//    also match the typewritten original exactly.
//  * Form B has NO fill-lines at all — plain blank space throughout.
//  * Fill-line lengths are computed from measured Times-12pt glyph widths so
//    each line ends flush at the right margin like the original.
//  * Printed court forms don't use 1in margins; each template declares its
//    own via <div data-page-margin="…">, measured off the scans.
//  * Original spellings/typos are reproduced verbatim, including
//    "Plaintiiff", "WHERE AS", "attache", "whiich", "apperarance", "iin",
//    "GIVIN", "You here by", and the citation printed as "(0, 5, RR 1, 5 C.P.C.)".

import { createClient } from '@supabase/supabase-js'

const url = process.env.VITE_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !serviceRoleKey) {
  console.error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Check .env.local.')
  process.exit(1)
}
const supabase = createClient(url, serviceRoleKey)

const dots = n => '.'.repeat(n)
const rule = n => '_'.repeat(n)
const sp = n => '&nbsp;'.repeat(n)
const GAP = n => '<p>&nbsp;</p>'.repeat(n)

// ── Form A: Summons to Accused Person ──────────────────────────────
// Margins measured off the scan: top 78pt, sides 45pt. Content width 505.28pt.
const A_MARGIN = '78 45 40 45'   // top right bottom left, measured off the scan
const formA = `
<div data-page-margin="${A_MARGIN}"></div>
<h2 style="text-align:center;"><u>SUMMONS TO ACCUSED PERSON</u></h2>
<p style="text-align:center;">(Section 68 Cri. Pro. Code)</p>
<p>&nbsp;</p>
<p>In the court of the<u>[COURT_NAME]${rule(62)}</u><strong>J.F.C.M.</strong></p>
<p style="text-align:center;">at [COURT_PLACE]</p>
<p>S.T.C. / C.C. No.<u>[CASE_NUMBER]${rule(65)}</u>of 202</p>
<p>&nbsp;</p>
<p>BETWEEN :</p>
<p style="margin-left:17%;">[CLIENT_NAME_IF_PETITIONER]${dots(119)}Complainant</p>
<p style="text-align:center;">AND</p>
<p style="margin-left:17%;">[CLIENT_NAME_IF_RESPONDENT]${dots(126)}Accused</p>
<p>&nbsp;</p>
<p>To</p>
${GAP(19)}
<p>Whereas your attendance is necessary to the charge U/Sec.</p>
<p>&nbsp;</p>
<p style="margin-left:54%;">of I.P.C. / 138 of NI ACT</p>
<p>You here by requested to appear in person before${dots(90)}</p>
<p>${dots(36)}J.F.C.M.${sp(9)}at 10-0 a.m. on the${dots(74)}day</p>
<p>of${dots(67)}202${dots(92)}</p>
<p>${dots(98)}Given under my hand and Seal of the Court</p>
<p>${dots(38)}on this day of${dots(77)}202${dots(26)}</p>
<p>&nbsp;</p>
<p style="margin-left:23%;">( Seal )${sp(86)}MAGISTRATE</p>
`.trim().replace(/\n/g, '')

// ── Form B: Summons (O. 5, RR 1, 5 C.P.C.) ─────────────────────────
// Margins measured off the scan: top 95pt, sides 23pt. Content width 549.28pt.
const B_MARGIN = '95 23 40 23'   // top right bottom left, measured off the scan
const formB = `
<div data-page-margin="${B_MARGIN}"></div>
<h2><strong>SUMMONS</strong>${sp(10)}(0, 5, RR 1, 5 C.P.C.)</h2>
<p>&nbsp;</p>
<p>IN THE COURT OF THE [COURT_NAME]</p>
<p>&nbsp;</p>
<p>Original Suit No.${sp(6)}[CASE_NUMBER]${sp(27)}of 202</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p style="text-align:right;">Plaintiiff : [CLIENT_NAME_IF_PETITIONER]</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p style="text-align:right;">Defendants : [CLIENT_NAME_IF_RESPONDENT]</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p style="text-align:justify;">&nbsp;&nbsp;&nbsp;&nbsp;WHERE AS the Plaintiff has instituted a suit you against you for the Plaintiff mentioned relief vide Plaint copy attache herewith, you are hereby summoned to appear in the Court in person or by a Pleader duly instructed and able to answer all material questions relating to the suit or who shall be accompanied by some other person able to answer all such questions on the 30 day of 202${sp(3)}at 10-30 o' clock in the forenoon answer the claim and you are directed to produce on that day all the documents upon whiich you intend to rely in support of defence.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p style="text-align:justify;">TAKE notice that, in defaults of your apperarance on the day before mentioned the suit will be heard and determined iin your absence.</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>GIVIN under my hand and the seal of the Court this</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>202</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p style="text-align:right;">(By order of the Court)</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Advocates for Plaintiff</p>
<p style="margin-left:4%;">Superintendent</p>
`.trim().replace(/\n/g, '')

const templates = [
  { name: 'Summons to Accused Person (Section 68 Cri. Pro. Code)', content: formA },
  { name: 'Summons (O. 5, RR 1, 5 C.P.C.)', content: formB },
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
