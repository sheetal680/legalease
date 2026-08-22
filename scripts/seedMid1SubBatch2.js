// Seeds five more scanned court forms into admin_templates, and corrects the
// title of one already-seeded form.
//
//   MID1SUB/20260819230712 -> Petition Filed u/s. 317 / 256 of Cr. P.C.   2 pages
//   MID1SUB/20260819230745 -> Witness Summons, Order 16 Rules 1 and 5     1 page
//   MID1SUB/20260819230756 -> F. No 7-A, Attachment of immovable Property
//                             before Judgement, Order 38 Rule 5 C.P.C.    1 page
//   MID1SUB/20260819230807 -> Costs Memo / Fees Certificate               1 page
//   MID1SUB/20260819230820 -> M.C. Notice (S.125 Cr.P.C. maintenance)     1 page
//
// Not seeded from this batch:
//   MID1SUB/20260819230723 - another copy of the Telugu నోటీసు already seeded.
//   MID1SUB/20260819230737 - a cleaner scan of the Order 21 Rule 66 notice
//     already seeded. Its title was cropped in the first scan and had been
//     reconstructed as "Sale Proclamation"; this scan shows the full printed
//     line reads "Sale Proclanation", so the existing row is corrected below
//     rather than duplicated.
//
// Usage: node --env-file=.env.local scripts/seedMid1SubBatch2.js
//
// Reuses existing renderer capabilities: per-side margins, per-template
// typeface with per-run script fallback, elastic dot leaders, whitespace-run
// preservation and hard page breaks.
//
// Printed text reproduced verbatim, typos included: "Cril. M.P. No.",
// "wanton", "dependant", "showcase", "transfer ing", "schul", "restrined",
// "Defendent", "Byorder", "Pititioner", "Petion Stamp", "Witness bata",
// "penality", "Afixing", "I here by", "First  Class Magistrates".

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
const dots = n => '.'.repeat(n)
const PAGE_BREAK = '<div data-page-break="true" style="page-break-before: always;"></div>'

// -- Petition Filed u/s. 317 / 256 of Cr. P.C. ----------------------
const petition317 = `
<div data-page-margin="60 40 40 40"></div>
<div data-page-font="helvetica"></div>
<h2><strong>IN THE COURT OF THE</strong> [COURT_NAME]</h2>
<p>&nbsp;</p>
<p style="margin-left:16%;">Cril. M.P. No.${sp(4)}[CASE_NUMBER]${sp(26)}/ 202[YEAR_LAST]</p>
<p style="margin-left:14%;">No.${sp(14)}In${sp(24)}/ 202[YEAR_LAST]</p>
<p>Between :${sp(4)}[CLIENT_NAME_IF_PETITIONER]</p>
${GAP(2)}
<p style="text-align:right;">Petitioner / Complt. / Accused</p>
${GAP(4)}
<p style="text-align:center;">And${sp(4)}[CLIENT_NAME_IF_RESPONDENT]</p>
${GAP(3)}
<p style="text-align:right;">Respondents / Complt. / Accused</p>
<p>&nbsp;</p>
<p style="text-align:center;"><strong><u>Petition Filed u/s. 317 / 256 of Cr. P.C.</u></strong></p>
<p style="text-align:center;">The Petitioner most respectfully submits as follows :</p>
<p style="text-align:justify;">1) That the petitioner is / are the Complt. / accused in the above case and the same${sp(8)}stands posted today.</p>
<p>&nbsp;</p>
<p style="text-align:justify;">2) That the Petitioners unable to${sp(2)}attend before the Hon'ble Court to day due to</p>
${GAP(2)}
<p style="text-align:justify;">3) That the appearance of the petitioner is neither intentional nor wanton, but purely${sp(2)}due to above said reason only.</p>
<p>&nbsp;</p>
<p style="text-align:justify;">${sp(6)}Hence, it is prayed that the Hon'ble Court may be pleased to dispense with the personal attendance of the issued petitioner / Complt / Accused today in the interest of justice.</p>
${GAP(3)}
<p>Place :</p>
<p>Date : [DATE]${sp(40)}Advocate for Petitioner</p>
${PAGE_BREAK}
<p style="margin-left:44%;"><strong>In the Court of the</strong> [COURT_NAME]</p>
<p>&nbsp;</p>
<p style="margin-left:46%;">Cril. M.P. No.${sp(4)}[CASE_NUMBER]${sp(6)}of 202[YEAR_LAST]</p>
<p style="margin-left:62%;">In</p>
<p style="margin-left:48%;">No.${sp(16)}of 202[YEAR_LAST]</p>
${GAP(8)}
<p style="margin-left:46%;"><strong><u>Petition Filed under u/s 317 / 256 of Cr. P.C</u></strong></p>
${GAP(9)}
<p style="margin-left:44%;">________</p>
<p style="margin-left:44%;">Address for Service : [ADVOCATE_ADDRESS]</p>
`.trim().replace(/\n/g, '')

// -- Witness Summons, Order 16 Rules 1 and 5 ------------------------
const witnessSummons = `
<div data-page-margin="45 40 40 40"></div>
<div data-page-font="telugu"></div>
<h2 style="text-align:center;"><strong>సాక్షి సమను OR 16 Rules 1 and 5</strong></h2>
<p>మహారాజశ్రీ${sp(60)}కోర్టులో [COURT_NAME]</p>
${GAP(2)}
<p style="text-align:right;"><strong>O.S.C.</strong>${dots(34)}</p>
${GAP(3)}
<p style="text-align:right;">వాది</p>
<p>${sp(4)}[CLIENT_NAME_IF_PETITIONER]</p>
${GAP(2)}
<p style="text-align:right;">ప్రతివాది</p>
<p>${sp(4)}[CLIENT_NAME_IF_RESPONDENT]</p>
${GAP(11)}
<p style="text-align:justify;">${sp(8)}పై వ్యాజ్యములో వాదిపరమున సాక్ష్యమిచ్చుటకు / ప్రతివాది పరమున ఈ క్రింది చెప్పబడ్డ దస్తావేజులు హాజరుపరచుటకు మీరు హాజరు కావసియున్నందున 202[YEAR_LAST]${sp(6)}సంవత్సరం ${dots(10)} ${dots(4)} నెల${dots(4)} ${dots(10)} తేదీన ఉదయం 10 గంటలకు యీ కోర్టువారి యెదుట హాజరు కావలయునని / సదరు దస్తావేజులు హాజరు చేయవలెనని యిందువల్ల మీరు కోరబడుచున్నారు.</p>
<p style="text-align:justify;">${sp(8)}ప్రయాణములకు యితర విషయములకు ఖర్చులు ఒకరోజు భత్యం${dots(28)} వీలుగాను ${dots(30)}రూపాయలు యిందుతో పంపించడమైనది.</p>
${GAP(4)}
<p style="text-align:right;">జడ్జి</p>
`.trim().replace(/\n/g, '')

// -- F. No 7-A, Attachment of immovable Property before Judgement ---
const attachment7A = `
<div data-page-margin="45 55 40 40"></div>
<div data-page-font="helvetica"></div>
<h2 style="text-align:center;"><strong>F. No 7-A, Attachment of&nbsp; immovable Property before</strong></h2>
<h2 style="text-align:center;"><strong>Judgement Order 38, Rule 5 C.P.C.</strong></h2>
<p>&nbsp;</p>
<h2><strong>IN THE COURT OF THE</strong> [COURT_NAME]</h2>
<p>&nbsp;</p>
<p style="text-align:right;"><strong>Plaintiff</strong></p>
<p>${sp(4)}[CLIENT_NAME_IF_PETITIONER]</p>
<p style="text-align:right;"><strong>Defendent</strong></p>
<p>${sp(4)}[CLIENT_NAME_IF_RESPONDENT]</p>
<p>&nbsp;</p>
<p>To</p>
<p>&nbsp;</p>
<p>${sp(12)}Whereas on the application of</p>
<p>the plaintiff in this suit the Court, called upon you,${sp(40)}the</p>
<p style="text-align:justify;">dependant to furnish security to fulfil any decree that may be passed, against you in the${sp(2)}suit showcase why${sp(2)}you should${sp(2)}not${sp(2)}furnish${sp(2)}such${sp(3)}security and</p>
<p>you have failed to show case why you should not furnish such security</p>
<p>________</p>
<p style="text-align:justify;">${sp(1)}you have failed to furnish the security required within the time fixed by the court${sp(24)}it is ordered that you the said be, and you are hereby prohibited and restrained until the further order this Court, from transfer ing or charging the properties described in the schul hereunto annexed, by sale gift, or otherwise, and that all persons be and that they are hereby prohibited and restrined from receiving the same by purchase, gift or otherwise.</p>
${GAP(3)}
<p>Warrant amount Rs.${sp(30)}Hearing date:${sp(16)}202[YEAR_LAST]</p>
<p>&nbsp;</p>
<p>Given under hand and the seal of this Court, of this${sp(30)}day</p>
<p>of${sp(16)}202[YEAR_LAST]</p>
<p>&nbsp;</p>
<p>schedule copies and order copies enclosed.</p>
${GAP(4)}
<p style="text-align:right;"><strong>(Byorder)</strong></p>
`.trim().replace(/\n/g, '')

// -- Costs Memo / Fees Certificate ----------------------------------
const costsMemo = `
<div data-page-margin="40 55 40 30"></div>
<div data-page-font="helvetica"></div>
<h2><strong>IN THE COURT OF THE</strong> [COURT_NAME]</h2>
<p style="margin-left:56%;"><strong>O.S.</strong>${dots(26)}<strong>202[YEAR_LAST]</strong></p>
<p><strong>Plaintiff</strong>${sp(6)}}</p>
<p><strong>Pititioner</strong>${sp(4)}}${sp(6)}[CLIENT_NAME_IF_PETITIONER]</p>
<p>&nbsp;</p>
<p><strong>Defendent</strong>${sp(4)}}</p>
<p><strong>Respondent</strong>${sp(2)}}${sp(6)}[CLIENT_NAME_IF_RESPONDENT]</p>
<p style="text-align:center;"><strong>COSTS MEMO FILED ON BEHALF OF THE</strong></p>
<p>________</p>
<p>1.${sp(4)}Vakalat</p>
<p>2${sp(5)}Advocate welfare fund</p>
<p>3.${sp(4)}Plaint Fees</p>
<p>4.${sp(4)}Petion Stamp</p>
<p>5.${sp(4)}Process</p>
<p>6.${sp(4)}Witness bata</p>
<p>7.${sp(4)}Stamp for penality</p>
<p>8.${sp(4)}Court fee Afixing on Document</p>
<p>9.${sp(4)}Commissioner fees</p>
<p>10. Pleaders fees</p>
<p>11. Publication Charges</p>
<p>12. Court Guardian Fees</p>
<p>13. Writing Charges</p>
<p>14. Type Charges</p>
<p>________</p>
<p>FEES CERTIFICATE FILED ON BEHALF OF THE</p>
<p style="text-align:right;">Advocate for</p>
<p>${sp(4)}I here by certify that I have Received the sum of Rs.${sp(16)}towards my</p>
<p>fees from the${sp(40)}in this Suit.</p>
<p style="text-align:right;">Advocate [ADVOCATE_NAME]</p>
`.trim().replace(/\n/g, '')

// -- M.C. Notice (S.125 Cr.P.C. maintenance) ------------------------
const mcNotice = `
<div data-page-margin="60 55 40 40"></div>
<div data-page-font="helvetica"></div>
<h2 style="text-align:center;"><strong>M.C. NOTICE</strong></h2>
<p><strong>IN THE COURT OF THE</strong> [COURT_NAME]</p>
<p>&nbsp;</p>
<p style="margin-left:30%;">At${dots(34)}</p>
<p style="margin-left:38%;">M.C. No.${sp(4)}[CASE_NUMBER]${sp(20)}of 20</p>
<p>Between :${sp(4)}[CLIENT_NAME_IF_PETITIONER]${sp(30)}Petitioner</p>
${GAP(3)}
<p style="text-align:center;">A N D</p>
${GAP(3)}
<p>To.${sp(6)}[CLIENT_NAME_IF_RESPONDENT]${sp(30)}Respondent</p>
${GAP(5)}
<p style="text-align:justify;">whereas your attendance is necessary to answer the petition filed under Section 125 Cr. P.C. for maintenance you are hereby required to appear in person (or by a pleader duly instructed) before the First Class Magistrate.</p>
${GAP(3)}
<p>Dated this${sp(20)}[DAY]${sp(10)}day of${sp(10)}[MONTH]${sp(20)}20</p>
${GAP(2)}
<p style="text-align:right;">First&nbsp; Class Magistrates</p>
`.trim().replace(/\n/g, '')

const templates = [
  { name: 'Petition Filed u/s. 317 / 256 of Cr. P.C.', content: petition317 },
  { name: 'సాక్షి సమను / Witness Summons (Order 16, Rules 1 and 5)', content: witnessSummons },
  { name: 'F. No 7-A - Attachment of immovable Property before Judgement (Order 38, Rule 5 C.P.C.)', content: attachment7A },
  { name: 'Costs Memo and Fees Certificate', content: costsMemo },
  { name: 'M.C. Notice (Section 125 Cr. P.C.)', content: mcNotice },
]

// The Order 21 Rule 66 title was reconstructed from a cropped scan; the newer
// scan shows the printed word is "Proclanation".
const TITLE_FIX = {
  oldName: 'Notice of the day fixed setting & Sale Proclamation (Order 21 Rule 66)',
  newName: 'Notice of the day fixed setting & Sale Proclanation (Order 21 Rule 66)',
}

async function main() {
  for (const t of templates) {
    const { data: existing, error: findErr } = await supabase
      .from('admin_templates').select('id').eq('name', t.name)
    if (findErr) { console.error('Lookup failed:', findErr.message); process.exit(1) }

    if (existing && existing.length) {
      const { error } = await supabase
        .from('admin_templates').update({ content: t.content }).eq('id', existing[0].id)
      if (error) { console.error('Update failed:', error.message); process.exit(1) }
      console.log('Updated  "' + t.name + '" (id: ' + existing[0].id + ')')
    } else {
      const { data, error } = await supabase
        .from('admin_templates')
        .insert({ name: t.name, content: t.content, file_url: null, file_type: null })
        .select('id').single()
      if (error) { console.error('Insert failed:', error.message); process.exit(1) }
      console.log('Inserted "' + t.name + '" (id: ' + data.id + ')')
    }
  }

  const { data: row } = await supabase
    .from('admin_templates').select('id, content').eq('name', TITLE_FIX.oldName).maybeSingle()
  if (row) {
    const fixed = row.content.split('Sale Proclamation').join('Sale Proclanation')
    const { error } = await supabase
      .from('admin_templates')
      .update({ name: TITLE_FIX.newName, content: fixed })
      .eq('id', row.id)
    if (error) { console.error('Title fix failed:', error.message); process.exit(1) }
    console.log('Corrected title -> "' + TITLE_FIX.newName + '" (id: ' + row.id + ')')
  } else {
    console.log('Title fix skipped (row not found under old name)')
  }
}

main()
