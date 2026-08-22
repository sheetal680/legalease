// Seeds seven more scanned court forms into admin_templates.
//
//   20260819233646 -> Notice (Order 21 Rule 54 (1A))                    1 page
//   20260819233659 -> Notice of the day fixed setting & Sale Proclamation
//                     (Order 21 Rule 66) — English title, Telugu body    1 page
//   20260819233714 -> Notice U/Cr 21 48 CPC)                             1 page
//   20260819233722 -> Notice (I.A. / Original Suit)                      1 page
//   20260819233732 + 20260819233751 -> Petition Filed U/Sec. 279/355 of
//                     BNSS-2023 (STC/C.C/S.C.) — duplicate scans        2 pages
//   20260819233804 -> Propfarma of NI Act Cases Summons, Form I          1 page
//   20260819233822 -> Notice (Hindu Marriage Act, 1955)                  1 page
//
// Usage: node --env-file=.env.local scripts/seedNoticeBatch.js
//
// Reuses existing renderer capabilities: per-side page margins, per-template
// typeface (including the embedded Telugu face), elastic fill-lines (runs of
// 4+ dots/underscores stretch to the remaining width), whitespace-run
// preservation via &nbsp;, and hard page breaks.
//
// Printed text is reproduced verbatim, typos included: "devree", "ordersd",
// "theyou", "sarle", "Defandent", "Judhement", "The refore", "you re not
// attend", "obsence", "Given under may hand", "failling", "compliant",
// "want on", "PROPFARMA", "Accorting", "Instrurments", "attendanceis",
// "youare", "tostated", "caseof", "Petioner", "Specilty", "intructee",
// "Al so", "paaearance", "herad", "inteno", "requried", "statemen".

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

// ── Notice — Order 21 Rule 54 (1A) ─────────────────────────────────
const noticeO21R54 = `
<div data-page-margin="45 62 40 30"></div>
<div data-page-font="helvetica"></div>
<h2 style="text-align:center;"><strong><u>NOTICE</u></strong></h2>
<p style="text-align:center;">Order 21 Rule 54 (1A)</p>
<p>In the Court of the [COURT_NAME]</p>
<p style="margin-left:14%;">E.P.</p>
<p style="margin-left:44%;">In O.S${sp(24)}D H R</p>
<p style="text-align:right;">Plaintiff</p>
<p>${sp(4)}[CLIENT_NAME_IF_PETITIONER]</p>
${GAP(4)}
<p style="text-align:right;">J D R</p>
<p style="text-align:right;">Defandent</p>
<p>${sp(4)}[CLIENT_NAME_IF_RESPONDENT]</p>
${GAP(9)}
<p>${sp(6)}Whereas you have failed to satisfy devree passed against you on the</p>
<p style="margin-left:12%;">day of${sp(24)}202[YEAR_LAST]${sp(12)}Suit No.${sp(6)}[CASE_NUMBER]${sp(12)}in favour of</p>
<p style="margin-left:44%;">for Rs.</p>
<p>It is ordersd that theyou said${sp(48)}he and you are hereby</p>
<p style="text-align:justify;">prohibited and restrain until the further order of the Court from transferring or Charging the Property specified in the scheduled here under annexed by sale gift or otherwise and that a persons and that they are hereby prohibited from receiving the sarle day purchase, gift are otherwise. It is also ordered that you</p>
<p>should attend Court on the${sp(8)}day of${sp(6)}202[YEAR_LAST]${sp(6)}To take notice of the date fix for setting the</p>
<p>terms of the Given under my hand and the seal of the Court${sp(10)}day of${sp(12)}202[YEAR_LAST]</p>
<p>&nbsp;</p>
<p>Warrant Amount :</p>
<p>Hearing Date :${sp(48)}By Order</p>
<p>&nbsp;</p>
<p style="text-align:right;">Dv. NAZAR</p>
`.trim().replace(/\n/g, '')

// ── Notice of the day fixed setting & Sale Proclamation, O.21 R.66 ──
const noticeO21R66 = `
<div data-page-margin="50 45 40 42"></div>
<div data-page-font="telugu"></div>
<h2 style="text-align:center;"><strong>Notice&nbsp; of the day fixed setting &amp; Sale Proclamation</strong></h2>
<h2 style="text-align:center;"><strong>Order 21 Rule 66</strong></h2>
<p>మహారాజశ్రీ${sp(60)}కోర్టులో [COURT_NAME]</p>
<p style="margin-left:26%;">E.P.${sp(10)}[CASE_NUMBER]${sp(6)}/ 20${sp(14)}O.S.</p>
<p style="text-align:right;">వాది</p>
<p style="text-align:right;"><strong>DHR</strong></p>
<p>${sp(4)}[CLIENT_NAME_IF_PETITIONER]</p>
<p style="text-align:right;">ప్రతివాది</p>
<p style="text-align:right;"><strong>JDR</strong></p>
<p>${sp(4)}[CLIENT_NAME_IF_RESPONDENT]</p>
${GAP(11)}
<p>వాది</p>
<p>ప్రతివాది</p>
<p style="text-align:justify;">${sp(6)}పై నెంబరు దావాలో${dots(60)}డిక్రీ హౌల్దరు వేలం నిమిత్తం దరఖాస్తు దాఖలు చేసినందున మీకు యిందు మూలముగా తెలియజేయడమైనది. 20${dots(10)} సంవత్సరం${dots(20)} నెల${dots(20)} తేదీన షరతులు నిర్ణయించుటకు యేర్పరిచినారు. ${dots(16)}సంవత్సరం ${dots(16)} నెల${dots(20)}తేదీన చేవ్రాలున్నూ కోర్టు ముద్రయున్నూ వేయబడినది.</p>
${GAP(4)}
<p style="text-align:right;">జడ్జి</p>
`.trim().replace(/\n/g, '')

// ── Notice U/Cr 21 48 CPC) ─────────────────────────────────────────
const noticeO21R48 = `
<div data-page-margin="45 45 40 42"></div>
<div data-page-font="helvetica"></div>
<h2 style="text-align:center;"><strong>NOTICE U/Cr 21 48 CPC)</strong></h2>
<p>&nbsp;</p>
<p>${sp(2)}In the Court of the [COURT_NAME]</p>
<p>&nbsp;</p>
<p style="margin-left:22%;">E.P. No.${sp(14)}[CASE_NUMBER]${sp(6)}/ 202[YEAR_LAST]${sp(6)}in OS/SC${sp(16)}/ 202[YEAR_LAST]</p>
<p style="text-align:right;">D.H.R.${sp(20)}</p>
<p>${sp(4)}[CLIENT_NAME_IF_PETITIONER]</p>
<p style="text-align:center;">Vs.</p>
<p style="margin-left:12%;">J.D.F.</p>
<p>${sp(4)}[CLIENT_NAME_IF_RESPONDENT]</p>
<p>&nbsp;</p>
<p>${sp(2)}To,</p>
${GAP(10)}
<p style="text-align:justify;">${sp(6)}Where as the above named decree holder has filled a execution petition to attach the salary of the said Judhement debtor. The refore you are here by required to appear before this court on${sp(4)}at 10.00 a.m. to state your objections. If you re not attend the Court on the day the petition will be dismissed in your obsence.</p>
<p>&nbsp;</p>
<p>Given under may hand and seal of the court this the</p>
<p>&nbsp;</p>
<p>202[YEAR_LAST]</p>
${GAP(2)}
<p style="text-align:right;">day on</p>
<p style="text-align:right;">By Order</p>
<p>&nbsp;</p>
<p style="text-align:right;">Seristadar / head Clerk.</p>
`.trim().replace(/\n/g, '')

// ── Notice (I.A. / Original Suit) ──────────────────────────────────
const noticeIA = `
<div data-page-margin="40 30 40 50"></div>
<div data-page-font="helvetica"></div>
<h2><strong>IN THE COURT OF THE</strong> [COURT_NAME]</h2>
<p style="margin-left:34%;">I.A. No.${sp(8)}[CASE_NUMBER]${sp(10)}of 202[YEAR_LAST]</p>
<p style="margin-left:34%;">Original Suit No.${sp(10)}of 202[YEAR_LAST]</p>
<p>&nbsp;</p>
<p>Between :-${sp(6)}[CLIENT_NAME_IF_PETITIONER]${sp(30)}....Petitioner</p>
<p>&nbsp;</p>
<p>And :-${sp(6)}[CLIENT_NAME_IF_RESPONDENT]</p>
<p>&nbsp;</p>
<p style="text-align:right;">Respondent</p>
<p style="text-align:center;"><strong>NOTICE</strong></p>
<p>&nbsp;</p>
<p>From${sp(52)}...Advocate for Petitioner.</p>
<p>Sri [ADVOCATE_NAME]</p>
${GAP(4)}
<p>To${sp(54)}..Advocate for Petitioner.</p>
<p>Sri,</p>
${GAP(5)}
<p style="text-align:justify;">${sp(6)}Please take notice that the above petition filed by the petitioners is posted to for your notice and you are hereby informed to appear on that date to raise your objections if any failling which it will be decided in your absence. Copies of the petition and affidavit are herewith submitted.</p>
${GAP(2)}
<p><strong><em>Received Notice with copies of</em></strong></p>
<p><strong><em>Affidavit and Petition.</em></strong></p>
<p>&nbsp;</p>
<p><strong><em>Advocate for Respondent.</em></strong>${sp(40)}<strong><em>Advocate for Petitioner.</em></strong></p>
`.trim().replace(/\n/g, '')

// ── Petition Filed U/Sec. 279/355 of BNSS-2023 (STC/C.C/S.C.) ──────
const petitionStc = `
<div data-page-margin="75 45 40 62"></div>
<div data-page-font="times"></div>
<h2><strong>IN THE COURT OF THE</strong> [COURT_NAME]</h2>
<p style="margin-left:38%;"><strong>: AT</strong> [COURT_PLACE]</p>
<p>&nbsp;</p>
<p style="text-align:center;">Crl. M.P. No.${sp(6)}[CASE_NUMBER]${sp(4)}/2024</p>
<p style="text-align:center;">in</p>
<p style="text-align:center;">STC/C.C/S.C. No.${sp(6)}/202[YEAR_LAST]</p>
<p>Between:${sp(4)}[CLIENT_NAME_IF_PETITIONER]</p>
<p style="text-align:right;">…Petitioner/</p>
<p style="text-align:right;">…Complt</p>
<p>____</p>
<p style="text-align:right;">…accused</p>
<p style="text-align:center;">AND</p>
<p>${sp(4)}[CLIENT_NAME_IF_RESPONDENT]</p>
${GAP(2)}
<p style="text-align:right;">…Respondent</p>
<p>____</p>
<p style="text-align:right;">…Petitioner/accused</p>
<p>&nbsp;</p>
<p style="text-align:center;"><strong><u>PETITION FILED U/SEC. 279/355 of BNSS-2023.</u></strong></p>
<p>&nbsp;</p>
<p>${sp(1)}The petitioners/compliant/accused most respectfully submits as follows:</p>
<p style="text-align:justify;">${sp(1)}1).${sp(2)}That the petitioners is/are the accused/complainant/appellant/ petitioners in the above case and the case stands posted today.</p>
<p>&nbsp;</p>
<p style="text-align:justify;">2).${sp(2)}That the petitioners/appellant/complainant/accused unable to attend before the Hon'ble Court today due to</p>
<p>&nbsp;</p>
<p style="text-align:justify;">3). That the non-appearance of the petitioners/appellant/complainant /accused is/are neither intentional nor want on, but purely due to above said reason only.</p>
<p>&nbsp;</p>
<p style="text-align:justify;">${sp(4)}Hence, it is prayed that the Hon'ble Court may be pleased to dispense with the personal attendance of the petitioners/appellant/ complainant/accused today, in the interest of justice.</p>
${GAP(2)}
<p>${sp(2)}Dt:${sp(2)}[DAY]${sp(2)}-${sp(2)}[MONTH]${sp(2)}-2024${sp(12)}Advocate for petitioner/Complt/accused</p>
${PAGE_BREAK}
<p style="margin-left:46%;"><strong>IN THE COURT OF THE</strong></p>
<p style="margin-left:58%;"><strong>AT</strong> [COURT_PLACE]</p>
<p>&nbsp;</p>
<p style="margin-left:50%;">Crl. M.P. No.${sp(6)}[CASE_NUMBER]${sp(4)}/2024</p>
<p style="margin-left:58%;">in</p>
<p style="margin-left:50%;">SC/CC/STC. No.${sp(4)}/ 202[YEAR_LAST]</p>
<p style="margin-left:44%;">Between:</p>
${GAP(2)}
<p style="margin-left:42%;">________</p>
<p style="margin-left:62%;">..Petitioners</p>
<p style="margin-left:62%;">..Accused</p>
${GAP(2)}
<p style="margin-left:52%;">and</p>
${GAP(2)}
<p style="margin-left:42%;">________</p>
<p style="margin-left:62%;">..Respondents</p>
<p style="margin-left:62%;">.Accused/complt</p>
${GAP(3)}
<p style="margin-left:44%;"><strong><u>Petition filed U/s.279/355 of BNSS-2023</u></strong></p>
${GAP(6)}
<p style="margin-left:50%;">Filed on:${sp(2)}[DAY]${sp(2)}-${sp(2)}[MONTH]${sp(2)}-2024</p>
<p>&nbsp;</p>
<p style="margin-left:50%;">Advocate for Service: [ADVOCATE_ADDRESS]</p>
<p>&nbsp;</p>
<p style="margin-left:50%;">Filed by : [ADVOCATE_NAME]</p>
`.trim().replace(/\n/g, '')

// ── Propfarma of NI Act Cases Summons, Form I ──────────────────────
const niActSummons = `
<div data-page-margin="45 40 40 40"></div>
<div data-page-font="times"></div>
<h2 style="text-align:center;"><strong>PROPFARMA OF NI ACT CASES SUMMONS</strong></h2>
<p style="text-align:center;"><strong>FORM I</strong></p>
<p style="text-align:center;"><strong>[See Section 61]</strong></p>
<p style="text-align:center;"><strong>SUMMONS TO AN ACCUSED PERSON</strong></p>
<p style="text-align:center;"><strong>(Accorting to the decision rendered in M/s. Meters and Instrurments V. Kanchan Mehta</strong></p>
<p style="text-align:center;"><strong>Case by Hon'ble Supreme Court)</strong></p>
<p>&nbsp;</p>
<p>${sp(2)}To${sp(50)}.....Petitioner / Complainant</p>
<p>${sp(6)}[CLIENT_NAME_IF_PETITIONER]</p>
${GAP(3)}
<p>${sp(2)}V/S${sp(50)}.....Respondent / Accused</p>
<p>${sp(6)}[CLIENT_NAME_IF_RESPONDENT]</p>
${GAP(8)}
<p style="text-align:justify;">${sp(6)}Whereas your attendanceis necessary to answer to a charge of (U /Sec-138 Negotiable instrument Act. youare hereby required to appear in person (or by pleader, as the case may be) before the${dots(20)} Additional Judicial Magistrate of First Class${dots(24)} on the day of${dots(30)}202[YEAR_LAST]${dots(10)} You need not appear before this court on${dots(20)} if.${sp(4)}you deposit the amount of Rs. by (Date)${dots(24)} in to the complaint's (Name) bank Account bearing No${dots(20)}In are hereby directed tostated amount of Rs.${sp(12)}You are hereby directed to inform such deposit of amount, to this e-mail Id and also to the complaint E-mail ID${sp(12)}in caseof compliance of above said direction you need not appear before this court. Unless required and the proceedings may be closed subject to any valid objection of the complainant. In case of non-compliance of above said directions your attendance is necessary to answer the above mentioned charge U/Sec-138 NI Act. Herein fail not</p>
<p>&nbsp;</p>
<p>Dated this${sp(4)}[DAY]${sp(4)}day of${sp(8)}[MONTH]${sp(8)}-202[YEAR_LAST]</p>
${GAP(3)}
<p>((SEAL))${sp(4)}(Seal of the Court)${sp(40)}<strong>(Signature)</strong></p>
`.trim().replace(/\n/g, '')

// ── Notice (Hindu Marriage Act, 1955) ──────────────────────────────
const hmaNotice = `
<div data-page-margin="45 45 40 36"></div>
<div data-page-font="helvetica"></div>
<h2><strong>In the Court of the</strong>${sp(50)}${dots(30)}</h2>
<p style="margin-left:18%;"><strong>O.P. No.</strong>${sp(6)}[CASE_NUMBER]${sp(46)}of 202[YEAR_LAST]</p>
<p style="text-align:center;"><strong>(In the matter of Hindu Marriage Act. 1955)</strong></p>
<p>Between${sp(50)}Petioner</p>
<p>${sp(4)}[CLIENT_NAME_IF_PETITIONER]</p>
${GAP(3)}
<p style="text-align:center;">AND</p>
${GAP(3)}
<p>Respondent</p>
<p>${sp(4)}[CLIENT_NAME_IF_RESPONDENT]</p>
${GAP(7)}
<p style="text-align:justify;">${sp(6)}Whereas${sp(2)}on the${dots(24)}day of${dots(18)}202[YEAR_LAST]${dots(6)} the above named petioner filed a petition against the Respondent for${dots(50)} (Specilty the relief) you are hereby required to appear in the Court on the${dots(24)} day of ${dots(24)}in the forenoon in Person or by pleader duly intructee and able to answer all the materials questions related to the above proceedings.</p>
<p style="text-align:justify;">${sp(8)}Al so take notice in default of your paaearance on the aforesaid day. The issue will be settled and the petition herad and determined in your absence. You shall also bring will you or send by your pleader and document which the petitioner desires to inspect and any document on which you inteno to rely in support of your defence. You are requried to fill a written statemen in Court on or before the${dots(20)}day of${dots(16)}${sp(4)}${dots(16)}</p>
<p style="text-align:justify;">${sp(8)}Given under my hand and the seal of the Court, this the day of${dots(24)}</p>
<p>202[YEAR_LAST]${dots(24)}</p>
`.trim().replace(/\n/g, '')

const templates = [
  { name: 'Notice (Order 21 Rule 54 (1A))', content: noticeO21R54 },
  { name: 'Notice of the day fixed setting & Sale Proclamation (Order 21 Rule 66)', content: noticeO21R66 },
  { name: 'Notice U/Cr 21 48 CPC)', content: noticeO21R48 },
  { name: 'Notice (I.A. / Original Suit)', content: noticeIA },
  { name: 'Petition Filed U/Sec. 279/355 of BNSS-2023 (STC/C.C/S.C.)', content: petitionStc },
  { name: 'Propfarma of NI Act Cases Summons — Form I (Summons to an Accused Person)', content: niActSummons },
  { name: 'Notice (Hindu Marriage Act, 1955)', content: hmaNotice },
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
      console.log(`Updated  "${t.name}" (id: ${existing[0].id})`)
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
