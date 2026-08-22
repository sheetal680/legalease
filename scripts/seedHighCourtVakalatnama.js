// One-off seed script: inserts the "High Court Vakalatnama (Andhra Pradesh,
// Amaravati)" template using the service role key (bypasses RLS, since this
// app's login is a hardcoded sessionStorage flag, not a real Supabase auth
// session).
//
// Usage: node --env-file=.env.local scripts/seedHighCourtVakalatnama.js
//
// Markup constraints (verified via a TipTap parse/render round-trip test in
// LegalEaseLawyer before writing this):
//   - text-align survives on <p>/<h1-6> via the TextAlign extension.
//   - bold/underline survive via <strong>/<u> (or equivalent inline style,
//     which TipTap normalizes to those tags).
//   - font-size and margin inline styles do NOT survive — arbitrary style
//     properties beyond what an extension explicitly tracks are stripped.
//     "Large" text therefore uses real heading levels (<h2>), and vertical
//     gaps use repeated empty <p>&nbsp;</p> lines, not margin.
//   - A bare, unrecognized <div> is deleted entirely on parse (not just
//     stripped of style) — the page break is a genuine custom TipTap node
//     (see RichTextEditor.jsx's PageBreak node) matched via
//     `div[data-page-break]`, which IS preserved.
//   - No table/flex support exists in the current editor schema, so the
//     "S.R.No. ... DISTRICT" top row on page 2 (originally two items on one
//     printed line, left vs right) is approximated with nbsp-padded text on
//     a single line rather than a real two-column layout.

import { createClient } from '@supabase/supabase-js'

const url = process.env.VITE_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceRoleKey) {
  console.error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Check .env.local.')
  process.exit(1)
}

const supabase = createClient(url, serviceRoleKey)

const BLANK = (n) => `<u>${'&nbsp;'.repeat(n)}</u>`
const GAP = (n) => '<p>&nbsp;</p>'.repeat(n)
const PAGE_BREAK = '<div data-page-break="true" style="page-break-before: always;"></div>'

const content = `
<h2 style="text-align:center;">IN THE HIGH COURT OF ANDHRA PRADESH</h2>
<h2 style="text-align:center;">AT : : AMARAVATI</h2>
<p style="text-align:center;"><u>Appellate side</u></p>
<p style="text-align:center;">Special original side</p>
<p style="text-align:center;">No.&nbsp;&nbsp;[CASE_NUMBER]&nbsp;&nbsp;of 202${BLANK(2)}</p>
<p style="text-align:center;">AGAINST</p>
<p style="text-align:center;">No.&nbsp;${BLANK(8)}&nbsp;of 202${BLANK(2)}</p>
<p style="text-align:right;"><u>Petitioner(s)</u></p>
<p>Between</p>
<p><u>[CLIENT_NAME_IF_PETITIONER]${'&nbsp;'.repeat(30)}</u></p>
<p style="text-align:center;">Versus</p>
<p style="text-align:right;"><u>Respondent/s</u></p>
<p><u>[CLIENT_NAME_IF_RESPONDENT]${'&nbsp;'.repeat(30)}</u></p>
<p>I/We</p>
<p>${BLANK(40)}</p>
<p style="text-align:center;"><u>Petition</u></p>
<p style="text-align:center;">On the above Appeal&nbsp;&nbsp;do hereby appoint and retain</p>
<p style="text-align:center;"><u>[ADVOCATE_NAME]${'&nbsp;'.repeat(20)}</u></p>
<p style="text-align:justify;">Advocate of the High Court to appeal for me/us in the above PETITION/APPEAL and to conduct and prosecute or defend the same and all proceedings that may be taken in respect of any application connected with the same or any decree or order passed therein, including all applications for return of documents or the receipt of any moneys that my be payable to me/us in the said appeal /petition and also to appear in application under Class XV of the letters patent and in petition or Leave to the Supreme Court of India and in all applications or review, and for leave to appeal to the Supreme Court.</p>
${GAP(5)}
<p>I/We certified that the contents of this Vakalat were read out and explained${BLANK(12)}</p>
<p>${BLANK(24)}to the executant who appeared perfectly to understand the same and made his/her/their signature mark in my presence.</p>
<p>Executed before me this&nbsp;${BLANK(10)}&nbsp;day of&nbsp;${BLANK(14)}&nbsp;202${BLANK(2)}</p>
<p style="text-align:right;">Advocate / Amaravati</p>
${PAGE_BREAK}
<p>S.R.No.${'&nbsp;'.repeat(60)}DISTRICT</p>
<p style="text-align:center;"><strong>IN THE HIGH COURT OF</strong></p>
<p style="text-align:center;"><strong>ANDHRA PRADESH,</strong></p>
<p style="text-align:center;"><strong>AT : : AMARAVATI</strong></p>
<p style="text-align:center;"><u>Appellate side</u></p>
<p style="text-align:center;">Special original side</p>
<p style="text-align:center;">No.&nbsp;&nbsp;[CASE_NUMBER]&nbsp;&nbsp;of 202${BLANK(2)}</p>
${GAP(2)}
<h2 style="text-align:center;">VAKALATNAMA</h2>
${GAP(1)}
<p style="text-align:center;"><strong>ACCEPTED</strong></p>
${GAP(4)}
<p style="text-align:right;">Petitioner(s)</p>
<p>Counsel for</p>
<p>Appellant(s)</p>
<p style="text-align:right;">Respondent(s)</p>
<p><em>Address for Service : [ADVOCATE_ADDRESS]</em></p>
`.trim().replace(/\n/g, '')

async function main() {
  const name = 'High Court Vakalatnama (Andhra Pradesh, Amaravati)'

  const { data: existing } = await supabase
    .from('admin_templates')
    .select('id')
    .eq('name', name)
  if (existing && existing.length > 0) {
    console.log(`"${name}" already exists (id: ${existing[0].id}) — skipping.`)
    return
  }

  const { data, error } = await supabase
    .from('admin_templates')
    .insert({ name, content, file_url: null, file_type: null })
    .select('id, name')
    .single()

  if (error) {
    console.error('Insert failed:', error.message)
    process.exit(1)
  }
  console.log(`Inserted "${data.name}" (id: ${data.id})`)
}

main()
