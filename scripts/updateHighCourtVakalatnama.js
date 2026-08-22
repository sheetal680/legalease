// Updates (not duplicates) the existing "High Court Vakalatnama (Andhra
// Pradesh, Amaravati)" admin_templates row with content checked directly
// against a scanned copy of the real printed form (E:\20260819233420.pdf,
// 2 pages, no text layer — image-only scan). Uses the service role key
// (bypasses RLS, since this app's login is a hardcoded sessionStorage flag,
// not a real Supabase auth session).
//
// Usage: node --env-file=.env.local scripts/updateHighCourtVakalatnama.js
//
// Findings from the scan that changed this from the earlier text-outline
// version (see git history for the prior seedHighCourtVakalatnama.js):
//   - The "No. ___ of 202" blanks, the Between/Respondent name blanks, the
//     "I/We" blank, and the advocate-name gap after "do hereby appoint and
//     retain" have NO printed underline at all — just plain whitespace.
//   - The certification paragraph's blanks ("...explained____", "____to the
//     executant...", "Executed before me this ___ day of ___") DO have
//     printed underlines. These two blank styles are visually different in
//     the original and are reproduced as such here.
//   - Page 2's title block, the Appellate/Special-original-side/case-number
//     group, "VAKALATNAMA", "ACCEPTED", "Counsel for"/"Appellant(s)", and
//     "Address for Service" are NOT centered across the full page — they sit
//     in a column shifted right of page-center. Reproduced via a new
//     Indent extension (RichTextEditor.jsx) that preserves margin-left,
//     which — like font-size/margin before it — does not survive TipTap's
//     HTML parsing unless explicitly registered.
//   - Approximation, disclosed rather than hidden: exact indent amounts are
//     visual estimates from a skewed, text-layer-less scan, not measured
//     coordinates. "ACCEPTED" sits further right than "VAKALATNAMA" in the
//     original; reproduced with a larger margin-left for that line only.

import { createClient } from '@supabase/supabase-js'

const url = process.env.VITE_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceRoleKey) {
  console.error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Check .env.local.')
  process.exit(1)
}

const supabase = createClient(url, serviceRoleKey)

const U = (n) => `<u>${'&nbsp;'.repeat(n)}</u>`       // underlined blank (matches original's underlined fill-lines)
const BLANK = (n) => '&nbsp;'.repeat(n)                 // plain blank, NO underline (matches original's un-ruled blanks)
const GAP = (n) => '<p>&nbsp;</p>'.repeat(n)
const PAGE_BREAK = '<div data-page-break="true" style="page-break-before: always;"></div>'

// Right-shifted columns on page 2, as margin-left percentages (see note above).
const CENTERED_COL = 'margin-left: 20%;'   // title block / Appellate-side group / VAKALATNAMA (centered within the column)
const ACCEPTED_COL = 'margin-left: 35%;'   // ACCEPTED sits further right than VAKALATNAMA
const LEFT_COL = 'margin-left: 54%;'       // Counsel for / Appellant(s) / Address for Service (left-aligned within the column)

const content = `
<h2 style="text-align:center;">IN THE HIGH COURT OF ANDHRA PRADESH</h2>
<h2 style="text-align:center;">AT : : AMARAVATI</h2>
<p style="text-align:center;"><u>Appellate side</u></p>
<p style="text-align:center;">Special original side</p>
<p style="text-align:center;">No.&nbsp;&nbsp;[CASE_NUMBER]${BLANK(35)}of 202</p>
<p style="text-align:center;">AGAINST</p>
<p style="text-align:center;">No.&nbsp;${BLANK(40)}of 202</p>
<p style="text-align:right;"><u>Petitioner(s)</u></p>
<p>Between</p>
<p>[CLIENT_NAME_IF_PETITIONER]${BLANK(40)}</p>
<p style="text-align:center;">Versus</p>
<p style="text-align:right;"><u>Respondent/s</u></p>
<p>[CLIENT_NAME_IF_RESPONDENT]${BLANK(40)}</p>
<p>I/We</p>
<p>${BLANK(50)}</p>
<p style="text-align:center;"><u>Petition</u></p>
<p style="text-align:center;">On the above Appeal&nbsp;&nbsp;do hereby appoint and retain</p>
<p style="text-align:center;">[ADVOCATE_NAME]</p>
<p style="text-align:justify;">Advocate of the High Court to appeal for me/us in the above PETITION/APPEAL and to conduct and prosecute or defend the same and all proceedings that may be taken in respect of any application connected with the same or any decree or order passed therein, including all applications for return of documents or the receipt of any moneys that my be payable to me/us in the said appeal /petition and also to appear in application under Class XV of the letters patent and in petition or Leave to the Supreme Court of India and in all applications or review, and for leave to appeal to the Supreme Court.</p>
${GAP(5)}
<p>I/We certified that the contents of this Vakalat were read out and explained${U(12)}</p>
<p>${U(24)}to the executant who appeared perfectly to understand the same and made his/her/their signature mark in my presence.</p>
<p>Executed before me this&nbsp;${U(10)}&nbsp;day of&nbsp;${U(14)}&nbsp;202</p>
<p style="text-align:right;">Advocate / Amaravati</p>
${PAGE_BREAK}
<p>S.R.No.${'&nbsp;'.repeat(60)}DISTRICT</p>
<p style="text-align:center;${CENTERED_COL}"><strong>IN THE HIGH COURT OF</strong></p>
<p style="text-align:center;${CENTERED_COL}"><strong>ANDHRA PRADESH,</strong></p>
<p style="text-align:center;${CENTERED_COL}"><strong>AT : : AMARAVATI</strong></p>
<p style="text-align:center;${CENTERED_COL}"><u>Appellate side</u></p>
<p style="text-align:center;${CENTERED_COL}">Special original side</p>
<p style="text-align:center;${CENTERED_COL}">No.&nbsp;&nbsp;[CASE_NUMBER]${BLANK(20)}of 202</p>
${GAP(2)}
<h2 style="text-align:center;${CENTERED_COL}">VAKALATNAMA</h2>
${GAP(1)}
<p style="text-align:center;${ACCEPTED_COL}"><strong>ACCEPTED</strong></p>
${GAP(4)}
<p style="text-align:right;">Petitioner(s)</p>
<p style="${LEFT_COL}"><u>Counsel for</u></p>
<p style="${LEFT_COL}">Appellant(s)</p>
<p style="text-align:right;">Respondent(s)</p>
<p style="${LEFT_COL}"><em>Address for Service : [ADVOCATE_ADDRESS]</em></p>
`.trim().replace(/\n/g, '')

async function main() {
  const name = 'High Court Vakalatnama (Andhra Pradesh, Amaravati)'

  const { data: existing, error: findErr } = await supabase
    .from('admin_templates')
    .select('id')
    .eq('name', name)
  if (findErr) {
    console.error('Lookup failed:', findErr.message)
    process.exit(1)
  }

  if (existing && existing.length > 0) {
    const { error } = await supabase
      .from('admin_templates')
      .update({ content })
      .eq('id', existing[0].id)
    if (error) { console.error('Update failed:', error.message); process.exit(1) }
    console.log(`Updated "${name}" (id: ${existing[0].id})`)
  } else {
    const { data, error } = await supabase
      .from('admin_templates')
      .insert({ name, content, file_url: null, file_type: null })
      .select('id')
      .single()
    if (error) { console.error('Insert failed:', error.message); process.exit(1) }
    console.log(`Inserted "${name}" (id: ${data.id})`)
  }
}

main()
