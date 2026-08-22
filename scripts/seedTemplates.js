// One-off seed script: inserts admin_templates rows using the Supabase
// service role key (bypasses RLS, since this app's login is no longer
// backed by real Supabase auth sessions).
//
// Usage: npm run seed   (loads .env.local via `node --env-file`)

import { createClient } from '@supabase/supabase-js'

const url = process.env.VITE_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceRoleKey) {
  console.error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Check .env.local.')
  process.exit(1)
}

const supabase = createClient(url, serviceRoleKey)

// Placeholder tokens use the exact names TemplateEditor.jsx's applyReplacements()
// understands: [ADVOCATE_NAME], [ADVOCATE_ADDRESS], [ADVOCATE_PHONE], [ADVOCATE_EMAIL],
// [BAR_NUMBER], [FIRM_NAME], [CLIENT_NAME], [CLIENT_ADDRESS], [CLIENT_PHONE],
// [CLIENT_EMAIL], [CASE_NUMBER], [PARTY_TYPE], [COURT_PLACE], [COURT_NAME], [DATE],
// [ASSOCIATE_NAME], [ASSOCIATE_BAR_NUMBER]. Tokens with no data source in the app
// ([STATE], [JURISDICTION], [CASE_DESCRIPTION], [OPPOSING_PARTY], [DATE_OF_HEARING])
// are intentionally left as literal brackets for the advocate to fill in manually
// in the rich-text editor.

const templates = [
  {
    name: 'High Court Vakalatnama',
    content: `<p><strong>IN THE HIGH COURT OF [STATE]</strong></p><p>[JURISDICTION]</p><p><strong>[CASE_DESCRIPTION] No. [CASE_NUMBER] of [DATE]</strong></p><p>BETWEEN:</p><p>[CLIENT_NAME] … Petitioner(s)/Appellant(s)</p><p>AND</p><p>[OPPOSING_PARTY] … Respondent(s)</p><p><strong>VAKALATNAMA</strong></p><p>I/We, [CLIENT_NAME], the above-named Petitioner(s)/Appellant(s), do hereby appoint and retain [ADVOCATE_NAME], Advocate of the High Court, Enrolment No. [BAR_NUMBER], of [FIRM_NAME], to appear for me/us in the above Petition/Appeal and to conduct and prosecute or defend the same and all proceedings that may be taken in respect of any application connected with the same, or any decree or order passed therein, including all applications for return of documents or receipt of any moneys payable to me/us in the said appeal/petition, and also to appear in application under Clause XV of the Letters Patent and in petition for Leave to the Supreme Court of India, and in all applications for review and for leave to appeal to the Supreme Court.</p><p>I/We certify that the contents of this Vakalatnama were read out and explained to the executant, who appeared to perfectly understand the same and made his/her/their signature in my presence.</p><p>Executed before me this [DATE].</p><p>_______________________</p><p>[ADVOCATE_NAME], Advocate</p><p>Bar Council No. [BAR_NUMBER] | [FIRM_NAME]</p><p>[ADVOCATE_ADDRESS]</p><p>Tel: [ADVOCATE_PHONE] | Email: [ADVOCATE_EMAIL]</p><p><strong>VAKALATNAMA — ACCEPTED</strong></p><p>Counsel for: [CLIENT_NAME]</p><p>Address for Service: [ADVOCATE_ADDRESS]</p><p>Petitioner(s)/Appellant(s): [CLIENT_NAME]</p><p>Respondent(s): [OPPOSING_PARTY]</p>`,
  },
  {
    name: 'Summons to Accused (Sec. 68 Cr.P.C.)',
    content: `<p><strong>SUMMONS TO ACCUSED PERSON</strong></p><p>(Section 68, Code of Criminal Procedure)</p><p><strong>IN THE COURT OF [COURT_NAME], [COURT_PLACE]</strong></p><p><strong>S.T.C. / C.C. No. [CASE_NUMBER]</strong></p><p>BETWEEN:</p><p>[CLIENT_NAME] … Complainant</p><p>AND</p><p>[OPPOSING_PARTY] … Accused</p><p>To,</p><p>[OPPOSING_PARTY]</p><p>Whereas your attendance is necessary to answer the charge under [CASE_DESCRIPTION] in the above case,</p><p>You are hereby required to appear in person before the undersigned at 10:30 a.m. on [DATE_OF_HEARING], and not depart until permitted, to answer the said charge.</p><p>Given under my hand and the seal of the Court, this [DATE].</p><p>_______________________</p><p>MAGISTRATE</p><p>[COURT_NAME], [COURT_PLACE]</p><p>Filed by: [ADVOCATE_NAME], Advocate — Bar Council No. [BAR_NUMBER], [FIRM_NAME]</p><p>Tel: [ADVOCATE_PHONE] | Email: [ADVOCATE_EMAIL]</p>`,
  },
  {
    name: 'CPC Summons (Order 5, Rules 1 & 5)',
    content: `<p><strong>SUMMONS</strong></p><p>(Order 5, Rules 1 &amp; 5, Code of Civil Procedure)</p><p><strong>IN THE COURT OF [COURT_NAME], [COURT_PLACE]</strong></p><p><strong>Original Suit No. [CASE_NUMBER] of [DATE]</strong></p><p>[CLIENT_NAME] … Plaintiff</p><p>versus</p><p>[OPPOSING_PARTY] … Defendant</p><p>WHEREAS the Plaintiff has instituted a suit against you for [CASE_DESCRIPTION] (copy of plaint enclosed), you are hereby summoned to appear in this Court in person, or by a pleader duly instructed and able to answer all material questions relating to the suit, on [DATE_OF_HEARING] at 10:30 a.m., and to produce on that day all documents upon which you intend to rely in support of your defence.</p><p>TAKE NOTICE that, in default of your appearance on the day above-mentioned, the suit will be heard and determined in your absence.</p><p>Given under my hand and the seal of the Court, this [DATE].</p><p>_______________________</p><p>(By Order of the Court)</p><p>Superintendent</p><p>Advocate for Plaintiff: [ADVOCATE_NAME], Bar Council No. [BAR_NUMBER]</p><p>[FIRM_NAME], [ADVOCATE_ADDRESS]</p><p>Tel: [ADVOCATE_PHONE] | Email: [ADVOCATE_EMAIL]</p>`,
  },
]

async function main() {
  const { data: existing, error: fetchError } = await supabase
    .from('admin_templates')
    .select('name')
  if (fetchError) {
    console.error('Failed to read existing templates:', fetchError.message)
    process.exit(1)
  }
  const existingNames = new Set((existing || []).map(r => r.name))

  const toInsert = templates.filter(t => !existingNames.has(t.name))
  const skipped = templates.filter(t => existingNames.has(t.name))

  skipped.forEach(t => console.log(`Skipping "${t.name}" — already exists.`))

  if (toInsert.length === 0) {
    console.log('Nothing to insert.')
    return
  }

  const { data, error } = await supabase
    .from('admin_templates')
    .insert(toInsert.map(({ name, content }) => ({ name, content, file_url: null, file_type: null })))
    .select('id, name')

  if (error) {
    console.error('Insert failed:', error.message)
    process.exit(1)
  }

  data.forEach(row => console.log(`Inserted "${row.name}" (id: ${row.id})`))
  console.log(`Done — ${data.length} template(s) added.`)
}

main()
