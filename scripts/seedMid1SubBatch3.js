// Seeds twelve more scanned court forms into admin_templates.
//
//   MID1SUB/20260819231015 -> Attachment in Execution, Prohibitory Order
//                             (Order 21, Rule 54)                        1 page
//   MID1SUB/20260819231025 -> Summons to Accused (Sec. 61 Cr.PC) with
//                             Note: Provision for Compromise             1 page
//   MID1SUB/20260819231059 -> Form No. 11 (Rule 15) notice, marriage Act  1 page
//   MID1SUB/20260819231114 -> Notice to Send for pay particulars
//                             (garnishee / disbursing officer)           1 page
//   MID1SUB/20260819231123 -> Process Memo                               2 pages
//   MID1SUB/20260819231133 -> Form No. 51 (Rule 128 C.R.P.), Application
//                             for Certified Copies / Copy Application    2 pages
//   MID1SUB/20260819231155 -> దావాసమను, Suit Summons (OR 5 R1 & 5)         1 page
//   MID1SUB/20260819231211 -> Petition u/s 148 & 151 C.P.C. to condone
//                             delay, with affidavit                      3 pages
//   MID1SUB/20260819231244 -> Execution Petition under Order 21, Rule II,
//                             Clause I, schedule filed by the D H R      4 pages
//   MID1SUB/20260819231325 -> Memo of Appearance (criminal)              2 pages
//   MID1SUB/20260819231334 -> Memo of Appearance with Verification by the
//                             Person Interested (bail u/s 437 / 439)     2 pages
//   MID1SUB/20260819231344 -> Petition u/r 57 C.R.P. to number a matter
//                             Out of Order, with affidavit u/s 139       3 pages
//
// Not seeded from this batch:
//   MID1SUB/20260819231107 - a second copy of the Sec. 61 Cr.PC summons.
//   MID1SUB/20260819231144 - a second copy of the s.317 / 256 Cr.P.C.
//     petition already seeded by scripts/seedMid1SubBatch2.js.
//
// Usage: node --env-file=.env.local scripts/seedMid1SubBatch3.js
//
// Reuses existing renderer capabilities: per-side margins, per-template
// typeface with per-run script fallback, elastic dot leaders, whitespace-run
// preservation and hard page breaks. Cover / endorsement sheets each start on
// their own page.
//
// Printed text is reproduced verbatim, typos included: "Probhibitory",
// "here by", "pruchase", "there unto", "the Late fixed", "JUGDE",
// "necessary t answer", "than if", "on your.", "the the", "appearance",
// "heared", "rebay", "desposit", "Counter Cliam", "oversite", "latches",
// "petiton", "plain", "Suti Number", "Defenden", "facteds", "Pititioner",
// "metter", "Pul Her", "the facts of the care", "Rule 57 C.R.P".
//
// NOTE: the ruled columns of the Process Memo, the Copy Application and the
// Execution Petition schedule are drawn with vertical lines on the paper
// forms. The renderer has no table primitive, so the column headings, the
// numbered rows and the horizontal rules are reproduced but the vertical
// rules are not.

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
const rule = n => '_'.repeat(n)
const PAGE_BREAK = '<div data-page-break="true" style="page-break-before: always;"></div>'

// -- Attachment in Execution (Order 21, Rule 54) --------------------
const attachO21R54 = `
<div data-page-margin="60 45 40 45"></div>
<div data-page-font="times"></div>
<h1 style="text-align:center;">ATTACHMENT IN EXECUTION</h1>
<p style="text-align:center;">Probhibitory Order where the Property Consists of Immovable Property,</p>
<p style="text-align:center;">(Order 21, Rule 54)</p>
<p>${sp(2)}In the Court of the [COURT_NAME]</p>
<p>&nbsp;</p>
<p style="margin-left:16%;">E.P.${sp(20)}20${sp(12)}O. S.${sp(14)}20</p>
<p style="text-align:right;">...${sp(6)}Plaintiff</p>
<p>${sp(4)}[CLIENT_NAME_IF_PETITIONER]</p>
${GAP(2)}
<p style="text-align:right;">...${sp(6)}Defendant</p>
<p>To${sp(6)}[CLIENT_NAME_IF_RESPONDENT]</p>
${GAP(8)}
<p>${sp(10)}Where as you have failed to satisfy a decree passed against you on the</p>
<p>day${sp(8)}of${sp(8)}20${sp(8)}in Suit No${sp(10)}20${sp(10)}in favour of${sp(12)}for</p>
<p>Rs.${sp(20)}It is ordered that you the said${sp(20)}be, and you are</p>
<p style="text-align:justify;">here by prohibited and the property specified in the Schedule there unto annexed, by sale, gift or otherwise and that all persons be and that they are hereby, prohibited from receiving the same by pruchase, gift or otherwise.</p>
<p>&nbsp;</p>
<p>${sp(6)}It is also ordered that you should attend Court on the</p>
<p>of${sp(16)}20${sp(16)}to take Notice of the Late fixed for setting the</p>
<p>terms of the proclamation of sale..</p>
<p>&nbsp;</p>
<p>${sp(6)}Given under my hand the Seal of the Court the${sp(4)}[DAY]</p>
<p>of${sp(10)}[MONTH]${sp(10)}20</p>
`.trim().replace(/\n/g, '')

// -- Summons to Accused (Sec. 61 Cr.PC) -----------------------------
const summonsS61 = `
<div data-page-margin="60 50 40 50"></div>
<div data-page-font="times"></div>
<p style="text-align:center;">SUMMONS TO ACCUSED</p>
<p style="text-align:center;">(Sec.61 Cr.PC)</p>
<p style="text-align:center;">IN THE COURT OF THE HON'BLE${sp(4)}[COURT_NAME]${sp(4)}ADDL. JUNIOR CIVIL JUGDE CUM I CLASS MAGISTRATE, AT :BHIMAVARAM</p>
<p>&nbsp;</p>
<p style="margin-left:30%;">C.C.No.${sp(4)}[CASE_NUMBER]${sp(14)}OF 2022</p>
<p>Between:${sp(4)}[CLIENT_NAME_IF_PETITIONER]</p>
<p>&nbsp;</p>
<p style="text-align:right;">..Complainant</p>
<p>${sp(6)}and${sp(4)}[CLIENT_NAME_IF_RESPONDENT]</p>
<p>&nbsp;</p>
<p style="text-align:right;">..Accused</p>
<p>To</p>
${GAP(7)}
<p style="text-align:justify;">${sp(4)}Whereas your attendance is necessary t answer the charge of ${rule(20)} you are hereby directed to appear in person or by pleader before the${sp(2)}HON'BLE${sp(2)}I ADDL JUNIOR CIVIL JUGDE CUM${sp(3)}I CLASS MAGISTRATE, AT BHIMAVARAM, on the day of ${rule(24)} 2022 at 10-30 AM.</p>
<p>&nbsp;</p>
<p>Dated this ${rule(14)} day of ${rule(20)} 2022.</p>
${GAP(3)}
<p>SEAL${sp(60)}MAGISTRATE</p>
<p>&nbsp;</p>
<p><strong><u>Note: Provision for Compromise</u></strong></p>
<p style="text-align:justify;">${sp(6)}You accused can make an application for compounding of the offences at the first or second hearing of the case and than if such an application is made, compounding, may be allowed by the court without imposing any costs on your.</p>
<p style="text-align:justify;">${sp(6)}If an application for compounding is made before the Magistrate at a subsequent stage, compounding can be allowed subject to the condition that you will be required to pay 10% of the cheque amount to be deposited as a condition for compounding with the Legal Services Authority or such authority as the court deems fit.</p>
<p style="text-align:justify;">${sp(6)}If the application for compounding is made before the Sessions Court or High Court${sp(2)}in revision or appeal, such compounding may be allowed on the condition that the the accused pays 15% of the cheque amount by way of costs.</p>
<p style="text-align:justify;">${sp(6)}If the application for compounding is made before the Supreme Court, the figure would increase to 20% of the cheque amount.</p>
`.trim().replace(/\n/g, '')

// -- Form No. 11 (Rule 15), marriage Act notice ---------------------
const form11Rule15 = `
<div data-page-margin="50 40 40 45"></div>
<div data-page-font="helvetica"></div>
<p style="text-align:center;"><strong>FORM NO.11 (RULE 15)</strong></p>
<p style="text-align:center;">(In the matter of the marriage Act)</p>
<p>&nbsp;</p>
<p style="text-align:center;">IN THE COURT OF THE HON'BLE PRINCIPAL DISTRICT JUDGE ELURU</p>
<p>&nbsp;</p>
<p style="text-align:center;">D.OP${sp(4)}[CASE_NUMBER]</p>
<p>BETWEEN:${sp(4)}[CLIENT_NAME_IF_PETITIONER]</p>
${GAP(5)}
<p>Petition presented on</p>
<p>&nbsp;</p>
<p>Petition filed on</p>
<p>&nbsp;</p>
<p>Notice issued on</p>
<p>&nbsp;</p>
<p>To${sp(6)}[CLIENT_NAME_IF_RESPONDENT]</p>
${GAP(3)}
<p>Whereas on the${sp(10)}day of${sp(10)}201${sp(10)}the above</p>
<p>&nbsp;</p>
<p>Name of petitioner filed a petition against the respondent for</p>
<p>&nbsp;</p>
<p style="text-align:justify;">You are hereby required to appear in this court on the${sp(4)}day of${sp(4)}2017${sp(2)}at 10-30 A.M. this forenoon in person or by pleader duly instructed able to answer all material questions relating to the above proceedings</p>
<p>&nbsp;</p>
<p style="text-align:justify;">And also notice that in the default of your appearance on the above said day the issues will be settled and that the position heared and determined in your absence you shall also bring with you or send by your pleader any do payment which the petitioner desire to inspect the documents on which intend to rebay in support of defence you are required</p>
<p>&nbsp;</p>
<p>To filed a return statement in court before the${sp(8)}day of${sp(6)}2017</p>
<p>&nbsp;</p>
<p>Given under my hand and the seal of the court this${sp(8)}day of${sp(6)}2017</p>
${GAP(3)}
<p style="text-align:right;">Judge</p>
<p>&nbsp;</p>
<p>Note:- a copy of the petition accompanies the notice</p>
<p style="text-align:justify;">${sp(6)}(1)${sp(2)}This notice shall be received not less than 21 days before the day fixed above for settlement of issues.</p>
<p style="text-align:justify;">${sp(6)}(2)${sp(2)}This notices should be apprehenced you witness will not attend on their own such can have summons issued from this court to complete the attendance of any witness and the production or any document you have a right to call on the witness produce on applying the court and despositing necessary expenses,</p>
`.trim().replace(/\n/g, '')

// -- Notice to Send for pay particulars (garnishee) ------------------
const payParticulars = `
<div data-page-margin="50 40 40 45"></div>
<div data-page-font="telugu"></div>
<p style="text-align:center;">Hearing Date:</p>
<p>&nbsp;</p>
<h2 style="text-align:center;">Notice to Send for pay particulars</h2>
<p>&nbsp;</p>
<p>మహారాజశ్రీ In The Court of The${sp(20)}nior Civil Judge [COURT_NAME]</p>
<p>&nbsp;</p>
<p>E.P.No${sp(8)}[CASE_NUMBER]${sp(6)}/20${sp(8)}in O.S.NO.${sp(16)}/</p>
${GAP(2)}
<p style="text-align:right;">DHR</p>
<p>${sp(4)}[CLIENT_NAME_IF_PETITIONER]</p>
<p style="text-align:center;">Vs</p>
${GAP(2)}
<p style="text-align:right;">JDRs</p>
<p>${sp(4)}[CLIENT_NAME_IF_RESPONDENT]</p>
<p>&nbsp;</p>
<p>JDR.NO:-</p>
<p>GUARNISHEE</p>
${GAP(6)}
<p>పై నెంబరు E.P.లో JDR.NO${rule(46)}</p>
<p>S/o${rule(52)}</p>
<p>&nbsp;</p>
<p>${rule(60)}</p>
<p style="text-align:justify;">వార్కి మీరు జీతం ఇచ్చు అధికారి (గార్నిషి / డిస్‌బర్సింగ్ ఆఫీసర్) అయి ఉన్నారు. కనుక శ్రీ కోర్టువారి ఉత్తర్వుల ప్రకారం పై JDR వారిజీతం వివరములు శ్రీ కోర్టు వారు ఇచ్చిన వాయిదాతేది ${rule(8)} 20 లోపుగా మీరు శ్రీ కోర్టు వారితదుపరి ఉత్తర్వులకు గాను పై ఉత్తర్వులు ప్రత్యేకమైన అర్జంటు ఉత్తర్వులుగా పరిగణించి పై వివరములను పంపించగలరు.</p>
<p>&nbsp;</p>
<p>(20${sp(2)}సం||${rule(8)} నెల${rule(8)}తేదీన మాచేవ్రాలున్ను కోర్టు ముద్రయున్నూ వేయబడినవి.)</p>
<p><u>N.B.</u></p>
<p>సదరు జీతపు వివరములు ఈ దిగువ కోర్టువారికి నేరుగా పంపించగలరు.</p>
${GAP(3)}
<p style="text-align:right;">By Order</p>
<p style="text-align:right;">(Head Clerk)</p>
`.trim().replace(/\n/g, '')

// -- Process Memo ---------------------------------------------------
const processMemo = `
<div data-page-margin="55 45 40 45"></div>
<div data-page-font="helvetica"></div>
<h2><strong>In the Court of the</strong> [COURT_NAME]</h2>
<p>Hearing Date${sp(38)}/ 202[YEAR_LAST]${sp(14)}O.S.${sp(4)}[CASE_NUMBER]</p>
<p>Plaintiff :${sp(4)}[CLIENT_NAME_IF_PETITIONER]</p>
<p>Defendant :${sp(4)}[CLIENT_NAME_IF_RESPONDENT]</p>
<p>&nbsp;</p>
<p style="text-align:center;"><strong>PROCESS MEMO FILED ON BEHALF OF THE</strong></p>
<p>${rule(66)}</p>
<p>S.No.${sp(8)}Name of the Party${sp(16)}Address${sp(24)}Purpose of which${sp(4)}Process</p>
<p>${sp(74)}Summoned${sp(10)}fees</p>
<p>${rule(66)}</p>
${GAP(24)}
<p>${rule(66)}</p>
<p>It is requested that summons may be issued as above</p>
<p>&nbsp;</p>
<p style="text-align:right;">Advocate [ADVOCATE_NAME]</p>
${PAGE_BREAK}
<p style="margin-left:50%;"><strong>In the Court of the</strong> [COURT_NAME]</p>
${GAP(5)}
<p style="margin-left:52%;">O.S.${sp(4)}[CASE_NUMBER]${sp(10)}of / 202[YEAR_LAST]</p>
${GAP(7)}
<h2 style="margin-left:52%;"><strong>PROCESS MEMO</strong></h2>
<p>&nbsp;</p>
<p style="margin-left:54%;">Filed on behalf of the</p>
${GAP(6)}
<p style="margin-left:52%;">Filed${dots(30)}</p>
${GAP(11)}
<p style="margin-left:52%;">Address for Service : [ADVOCATE_ADDRESS]</p>
`.trim().replace(/\n/g, '')

// -- Form No. 51 (Rule 128 C.R.P.) - Copy Application ---------------
const copyApplication = `
<div data-page-margin="45 45 40 40"></div>
<div data-page-font="helvetica"></div>
<h2 style="text-align:center;"><strong>Form No.51 (Rule 128 C.R.P.)</strong></h2>
<p><strong>In the Court of the</strong> [COURT_NAME]</p>
<p style="margin-left:18%;">Suit No.${sp(4)}[CASE_NUMBER]${sp(10)}of /</p>
<p style="text-align:right;">Plaintiff / Petitioner</p>
<p>${sp(4)}[CLIENT_NAME_IF_PETITIONER]</p>
<p style="text-align:center;">AND</p>
<p style="text-align:right;">Defendent / Respondent</p>
<p>${sp(4)}[CLIENT_NAME_IF_RESPONDENT]</p>
<h1 style="text-align:center;">Application for Certified Copies</h1>
<p>It is requested that certified copies of documents here under mentioned may be furnished to</p>
<p>&nbsp;</p>
<p style="text-align:right;">Plaintiff / Defendent above named</p>
<p>${sp(12)}The said copies are urgently required respons that</p>
<p>${rule(66)}</p>
<p>S.No.${sp(6)}Date of filling${sp(14)}Description of${sp(18)}Order of any under</p>
<p>${sp(12)}document${sp(20)}Documents${sp(16)}which application is mode</p>
<p>${rule(66)}</p>
${GAP(22)}
<p>${rule(66)}</p>
<p>Date${sp(40)}day of${sp(20)}202[YEAR_LAST]</p>
<p style="text-align:center;">Advocate for${dots(40)}</p>
${PAGE_BREAK}
<p style="margin-left:48%;"><strong>In the Court of the</strong> [COURT_NAME]</p>
${GAP(3)}
<p style="margin-left:44%;">Between :${sp(4)}[CLIENT_NAME_IF_PETITIONER]</p>
<p style="text-align:right;">Plaintiff</p>
<p style="text-align:right;">Defendent</p>
<p>&nbsp;</p>
<p style="margin-left:60%;">AND${sp(4)}[CLIENT_NAME_IF_RESPONDENT]</p>
${GAP(3)}
<p style="text-align:right;">Defendent</p>
<p style="text-align:right;">Respondent</p>
${GAP(3)}
<h1 style="margin-left:46%;">COPY APPLICATION</h1>
<p>&nbsp;</p>
<p style="margin-left:56%;">Accepted</p>
<p>&nbsp;</p>
<p style="margin-left:44%;">Filed on :</p>
<p>&nbsp;</p>
<p style="margin-left:44%;">Filed by : [ADVOCATE_NAME]</p>
${GAP(4)}
<p style="margin-left:44%;">${rule(34)}</p>
<p style="margin-left:44%;">Address for Service [ADVOCATE_ADDRESS]</p>
`.trim().replace(/\n/g, '')

// -- దావాసమను, Suit Summons (OR 5 R1 & 5) ----------------------------
const davaSamanu = `
<div data-page-margin="48 40 40 42"></div>
<div data-page-font="telugu"></div>
<h2 style="text-align:center;"><strong>దావాసమను</strong></h2>
<p style="text-align:right;"><strong>OR 5 R1 &amp; 5</strong></p>
<p style="text-align:right;">కోర్టులో [COURT_NAME]</p>
<p>సారాంశములు ఏర్పరచటమునకు</p>
<p>&nbsp;</p>
<p>మహారాజశ్రీ</p>
<p style="text-align:center;">202[YEAR_LAST]</p>
${GAP(3)}
<p style="text-align:right;">వాది</p>
<p>${sp(4)}[CLIENT_NAME_IF_PETITIONER]</p>
${GAP(6)}
<p style="text-align:right;">ప్రతివాది</p>
<p>${sp(4)}[CLIENT_NAME_IF_RESPONDENT]</p>
${GAP(4)}
<p style="text-align:justify;">యీ దావాలో పరిహారం${sp(20)}నిమిత్తం నీమీద దావా వేసి యుండుటవలన స్వతహాగాగాని, సంపూర్ణముగా సంజాయిషి పొందిన అన్ని ప్రశ్నలకు ఉత్తరములు చెప్పగూడిన ప్లీడరుద్వారాగాని, అట్లే అన్ని ప్రశ్నలకు వుత్తరము చెప్పగూడిన కూడా వచ్చే ఏదో ఒక మనిషి ద్వారా గాని సదరు దావాకు ప్రత్యుత్తరము చెప్పగలందులకు${sp(8)}సం||${sp(8)}నెల${sp(8)}తేదీన 10-30 గంటలకు యీ కోర్టులో హాజరగుటకున్ను మరియు ఈ సమనుతో పంపిన ప్లెయింటు కాపి ననుసరించి ఆ రోజున మీరు ఈ దావాలో సంజాయిషి చెప్పు రిటెన్ స్టేటుమెంటు ఈ సమను ముట్టిన 30 రోజులలోగా దాఖలు చేయుటకున్ను మరియు ఆ రోజున మీరు ఆధారపడునటువంటిన్ని, మీ ఆధీనములో నున్నుటువంటిన్నీ మీ ప్రతివాదమునకు గాని, మినహాయింపు వాదనకు గాని Counter Cliam గాని, అవసరమైన సమస్త దస్తావేజులు దాఖలు చేయుటకున్నూ మరియు మీ ఆధీనములో నున్నను, లేకున్నను మీరు మీ ప్రతివాదన మినహాయింపు Counter Cliam లకు ఆధారపడు సమస్త దస్తావేజుల జాబితాలో మీ రిటెన్ స్టేట్‌మెంట్‌కు అనబంధముగా, చేర్చుటకు, ఆదేశించటమైనది. పై చెప్పబడ్డ దినమందు నీవు హాజరుగాకుండా తప్పిపోయే యెడల నీ పరోక్షమందు ఆ వాజ్యమును విమర్శ చేసితీర్మానించటమగునని మీరు తెలుసుకోవలసినది.</p>
<p>${sp(6)}సం||${sp(6)}నెల${sp(12)}తేదీన నాచేవ్రాలున్న${sp(10)}కోర్టు ముద్రయున్ను వేయబడినది.</p>
${GAP(4)}
<p style="text-align:right;">(By Order)</p>
<p>&nbsp;</p>
<p style="text-align:right;">(Head Clerk)</p>
`.trim().replace(/\n/g, '')

// -- Petition u/s 148 & 151 C.P.C. to condone delay ------------------
const condoneDelay = `
<div data-page-margin="50 45 40 45"></div>
<div data-page-font="times"></div>
<p style="text-align:center;">(1)</p>
<h1><strong>IN THE COURT OF THE</strong> [COURT_NAME]</h1>
<p>&nbsp;</p>
<p><strong>BETWEEN</strong>${sp(4)}[CLIENT_NAME_IF_PETITIONER]</p>
<p style="margin-left:60%;"><strong>I.A. NO.</strong>${sp(4)}[CASE_NUMBER]${sp(6)}<strong>/ 202</strong>[YEAR_LAST]</p>
<p>&nbsp;</p>
<p style="margin-left:60%;"><strong>NO.</strong>${sp(16)}<strong>/ 202</strong>[YEAR_LAST]</p>
<p>&nbsp;</p>
<p style="text-align:right;"><strong>.....PETITIONER</strong></p>
${GAP(2)}
<p style="text-align:center;"><strong>AND</strong>${sp(4)}[CLIENT_NAME_IF_RESPONDENT]</p>
${GAP(2)}
<p style="text-align:right;"><strong>.....RESPONDENT</strong></p>
<p>&nbsp;</p>
<p style="text-align:center;"><strong><u>AFFIDAVIT FILED BY AND ON BEHALF OF PETITIONER</u></strong></p>
<p>&nbsp;</p>
<p>${sp(8)}I</p>
<p>Advocate Clerk${sp(16)}Years, Hindu</p>
<p>Do hereby solemnly Affirmed and sincerely state as follows :-</p>
<p>1.${sp(6)}I am and I also know the Facts of the Case.</p>
<p style="text-align:justify;">2.${sp(6)}The Batta / Petition / Plaint enclosed to this petition could not be filed / represented in time due to oversite and pressure of work. there are no intentional latches on my part in not Filling / Representing the said batta / petition / plain. The delay may kindly be condoned.</p>
<p style="text-align:justify;">3.${sp(6)}Therefore it is just and necessary in the interests of justice and equity that the Honourable court may be pleased to condone the delay${sp(20)}in filling / representing the batta / petiton / plain enclosed herewith.</p>
${GAP(2)}
<p>Filed by</p>
<p style="text-align:right;">Be pleased to consider.</p>
<p>Advocate for [ADVOCATE_NAME]</p>
<p>&nbsp;</p>
<p style="text-align:right;">Deponent</p>
<p style="text-align:center;">This affidavity is duly sworn and signed before me.</p>
${GAP(3)}
<p style="text-align:right;">Attesting Officer</p>
${PAGE_BREAK}
<p style="text-align:center;">(3)</p>
<h1><strong>IN THE COURT OF THE</strong> [COURT_NAME]</h1>
<p>&nbsp;</p>
<p><strong>Between</strong>${sp(4)}[CLIENT_NAME_IF_PETITIONER]</p>
<p style="margin-left:58%;"><strong>I.A. no.</strong>${sp(4)}[CASE_NUMBER]${sp(6)}<strong>/ 202</strong>[YEAR_LAST]</p>
<p style="margin-left:66%;"><strong>in</strong></p>
<p style="margin-left:58%;"><strong>No.</strong>${sp(14)}<strong>/ 202</strong>[YEAR_LAST]</p>
<p>&nbsp;</p>
<p style="text-align:right;"><strong>.....PETITIONER</strong></p>
${GAP(2)}
<p style="text-align:center;"><strong>and</strong>${sp(4)}[CLIENT_NAME_IF_RESPONDENT]</p>
${GAP(2)}
<p style="text-align:right;"><strong>.....RESPONDENT</strong></p>
${GAP(6)}
<h2 style="text-align:center;"><strong>PETITION FILED BY THE PETITIONER</strong></h2>
<h2 style="text-align:center;"><strong>UNDER SECTION 148 &amp; 151 C.P.C.</strong></h2>
<p style="text-align:justify;">${sp(6)}For the reason stated in the enclosed affidavit, the petitioner prays that the Honourable Court may be pleased to condone the delay${sp(20)}in is filling / representing the batta, plaint, petition enclosed herewith.</p>
${GAP(4)}
<p style="text-align:right;"><strong>BE PLEASED TO CONSIDER.</strong></p>
<p>Station :</p>
<p>&nbsp;</p>
<p>Date : [DATE]</p>
${GAP(3)}
<p style="text-align:right;">Advocate for the Petitioner</p>
${PAGE_BREAK}
<p style="text-align:center;">(4)</p>
<h1 style="text-align:right;"><strong>IN THE COURT OF THE</strong></h1>
<p style="margin-left:64%;">I.A.${sp(2)}No.${sp(6)}[CASE_NUMBER]${sp(6)}of 202[YEAR_LAST]</p>
<p style="margin-left:64%;">No.${sp(18)}of 202[YEAR_LAST]</p>
${GAP(12)}
<h2 style="margin-left:52%;"><strong>Petition Filed on behalf</strong></h2>
<h2 style="margin-left:52%;"><strong>of the Petitioner Under</strong></h2>
<h2 style="margin-left:52%;"><strong>Sec.148 &amp; 151 C.P.C.</strong></h2>
${GAP(6)}
<p style="margin-left:52%;">Address for Service : [ADVOCATE_ADDRESS]</p>
`.trim().replace(/\n/g, '')

// -- Execution Petition, Order 21 Rule II Clause I -------------------
const executionPetition = `
<div data-page-margin="50 45 40 48"></div>
<div data-page-font="helvetica"></div>
<h2><strong>In the Court of the</strong> [COURT_NAME]</h2>
<p><strong>E.P. No.</strong>${sp(14)}202[YEAR_LAST]${sp(14)}O.S.C. No.${sp(6)}[CASE_NUMBER]${sp(6)}of 202[YEAR_LAST]</p>
<p>&nbsp;</p>
<p style="text-align:right;">Plaintiff</p>
<p style="text-align:right;">D H R</p>
<p>${sp(4)}[CLIENT_NAME_IF_PETITIONER]</p>
<p style="text-align:right;">Defendent</p>
<p style="text-align:right;">J D R</p>
<p>${sp(4)}[CLIENT_NAME_IF_RESPONDENT]</p>
<p>&nbsp;</p>
<p style="text-align:center;">EXECUTION PETITION UNDER ORDER 21, RULE II, CLAUSE I,</p>
<p style="text-align:center;">SCHEDULE FILED BY THE DECREE HOLDER</p>
<p>${rule(66)}</p>
<p>1.${sp(4)}Suti Number</p>
<p>${rule(66)}</p>
<p>2.${sp(4)}Plaintiff</p>
<p>${sp(6)}D H R</p>
<p>${rule(66)}</p>
<p>3.${sp(4)}Defenden</p>
<p>&nbsp;</p>
<p>${sp(6)}J D R</p>
${GAP(9)}
<p>${rule(66)}</p>
<p>4.${sp(4)}Date of Decree</p>
<p>${rule(66)}</p>
<p>5.${sp(4)}Whether any Appeal</p>
<p>${sp(6)}preferred from Decree</p>
<p>${rule(66)}</p>
<p>6.${sp(4)}Previous application if</p>
<p>${sp(6)}any with the Date and</p>
<p>${sp(6)}Result</p>
<p>${rule(66)}</p>
<p style="text-align:center;">1</p>
${PAGE_BREAK}
<p>${rule(66)}</p>
<p>7.${sp(4)}Payment or adjustment</p>
<p>${sp(6)}if any</p>
<p>${rule(66)}</p>
<p>8.${sp(4)}Whether Decree</p>
<p>${sp(6)}Transferred or not</p>
<p>${rule(66)}</p>
<p>9.${sp(4)}Amount with interest${sp(40)}Rs.${sp(8)}Ps.</p>
<p>${sp(6)}due upon the Decree</p>
<p>${sp(6)}or other relief granted</p>
<p>${sp(6)}there by together with${sp(16)}Decree Amount</p>
<p>${sp(6)}Particular of any${sp(22)}Subsequent interest of Rs</p>
<p>${sp(6)}Cross Decree</p>
<p>${sp(28)}from</p>
<p>&nbsp;</p>
<p>${sp(28)}to</p>
<p>&nbsp;</p>
<p>${sp(28)}at${sp(14)}A.P.</p>
${GAP(4)}
<p>${rule(66)}</p>
<p>10. Amount of Cost if${sp(40)}Rs.</p>
<p>${sp(6)}Ps${sp(8)}any Awarded</p>
<p>&nbsp;</p>
<p>${sp(28)}Cost awarded in the Decree</p>
${GAP(5)}
<p>${rule(66)}</p>
<p>11. Against whom to be</p>
<p>${sp(6)}executed</p>
<p>${rule(66)}</p>
<p style="text-align:center;">2</p>
${PAGE_BREAK}
<p>${rule(66)}</p>
<p>12. Mode in which the</p>
<p>${sp(6)}Assistance of the</p>
<p>${sp(6)}Court is required</p>
${GAP(3)}
<p>${rule(66)}</p>
<p style="text-align:center;"><strong>SCHEDULE</strong></p>
${GAP(10)}
<p style="text-align:right;">Be Pleased to Consider</p>
<p>&nbsp;</p>
<p>Advocate for D H R</p>
<p>&nbsp;</p>
<p style="text-align:justify;">${sp(4)}I the Decree - Holder hereby Declare that the facteds stated above are true to the best of my knowledge information and belief.</p>
${GAP(4)}
<p>Station${sp(2)}}</p>
<p>${sp(10)}D H R${sp(40)}Advocate</p>
<p>Date${sp(5)}}</p>
${PAGE_BREAK}
<h2 style="margin-left:50%;"><strong>In the Court of the</strong> [COURT_NAME]</h2>
${GAP(5)}
<p style="margin-left:50%;">E.P. No.${sp(4)}[CASE_NUMBER]${rule(20)}</p>
<p style="margin-left:50%;">O.S.C.</p>
${GAP(11)}
<p style="margin-left:50%;"><strong>E.P. FILED ON BEHALF OF THE</strong></p>
<p style="margin-left:56%;"><strong>DECREE HOLDER</strong></p>
`.trim().replace(/\n/g, '')

// -- Memo of Appearance (criminal) -----------------------------------
const memoAppearance = `
<div data-page-margin="55 45 40 48"></div>
<div data-page-font="times"></div>
<h1><strong>In the Court of the</strong> [COURT_NAME]</h1>
<p style="margin-left:56%;">No.${sp(4)}[CASE_NUMBER]${sp(12)}/ 202[YEAR_LAST]</p>
<p>&nbsp;</p>
<p>Between${sp(4)}[CLIENT_NAME_IF_PETITIONER]${sp(20)}Complainant</p>
${GAP(2)}
<p style="text-align:center;">And${sp(4)}[CLIENT_NAME_IF_RESPONDENT]</p>
${GAP(2)}
<p style="text-align:right;">Accused</p>
${GAP(9)}
<p style="text-align:center;"><strong>MEMO OF APPEARANCE FILED ON BEHALF OF</strong></p>
<p>I/We${sp(4)}[ADVOCATE_NAME]${sp(40)}Advocate(s)</p>
<p>&nbsp;</p>
<p>have been duly instructed by the Accused / Person interested in the accused, residing at${dots(16)}</p>
<p>&nbsp;</p>
<p>${dots(34)}to appear for the accused in Crime No${dots(38)}of</p>
<p>&nbsp;</p>
<p>202${dots(24)}of P.S${dots(70)}</p>
${GAP(6)}
<p>Signature of the Accused /${sp(46)}Signature of the</p>
<p>${sp(4)}Person interested${sp(50)}Counsel for Accused</p>
${PAGE_BREAK}
<p style="margin-left:48%;"><strong>Mr.</strong></p>
<p style="margin-left:48%;"><em>For</em></p>
<p>&nbsp;</p>
<h1 style="margin-left:48%;"><strong>IN THE COURT OF THE</strong> [COURT_NAME]</h1>
${GAP(4)}
<p style="margin-left:48%;">No.${sp(10)}[CASE_NUMBER]${sp(6)}of 202[YEAR_LAST]</p>
${GAP(5)}
<h1 style="margin-left:52%;"><strong>MEMO OF APPEARANCE</strong></h1>
${GAP(5)}
<p style="margin-left:48%;"><strong>Filed on behalf of the</strong>${sp(4)}<u>Accused</u></p>
<p style="margin-left:74%;">Complainant</p>
${GAP(8)}
<p style="margin-left:48%;">${rule(38)}</p>
<p style="margin-left:48%;">Address for Service : [ADVOCATE_ADDRESS]</p>
`.trim().replace(/\n/g, '')

// -- Memo of Appearance with Verification (bail u/s 437 / 439) -------
const memoAppearanceBail = `
<div data-page-margin="48 45 40 48"></div>
<div data-page-font="times"></div>
<h1><strong>In the Court of the</strong> [COURT_NAME]</h1>
<p>No.${sp(12)}[CASE_NUMBER]${sp(6)}/ 202[YEAR_LAST]</p>
<p>Between${sp(4)}[CLIENT_NAME_IF_PETITIONER]${sp(20)}Complainant</p>
<p style="text-align:center;">And</p>
<p style="text-align:right;">Accused</p>
<p>${sp(4)}[CLIENT_NAME_IF_RESPONDENT]</p>
<p style="text-align:center;"><strong>MEMO OF APPEARANCE FILED ON BEHALF OF</strong></p>
<p>I/We${sp(4)}[ADVOCATE_NAME]${sp(40)}Advocate(s)</p>
<p>&nbsp;</p>
<p>have been duly instructed by the Accused / Person interested in the accused, residing at${dots(16)}</p>
<p>&nbsp;</p>
<p>${dots(34)}to appear for the accused in Crime No${dots(38)}of</p>
<p>&nbsp;</p>
<p>202${dots(24)}of P.S${dots(70)}</p>
${GAP(2)}
<p>Signature of the Accused /${sp(46)}Signature of the</p>
<p>${sp(4)}Person interested${sp(50)}Counsel for accused</p>
<p>&nbsp;</p>
<p style="text-align:center;"><strong>VERIFICATION BY THE PERSON INTERESTED</strong></p>
<p style="text-align:center;"><strong>(For Bail u/s-437 / 439 Cr. P.C.)</strong></p>
<h1><strong>In the Court of the</strong> [COURT_NAME]</h1>
<p>&nbsp;</p>
<p>hereby verify that I am duly authorised by Sri</p>
<p>P.S.${sp(24)}Dist.</p>
<p>now lodged in${sp(40)}Prison at</p>
<p>to appoint Sri</p>
<p style="text-align:justify;">advocates to act on his / her / their behalf and that no other person has been authorised to appoint any advocate, Accused is my${dots(30)}</p>
<p>&nbsp;</p>
<p style="text-align:center;">Also verify that no petition / that petition No.</p>
<p>&nbsp;</p>
<p>dated${sp(40)}in the Court of</p>
<p>at${sp(43)}had been filed for bail on his behalf and the same</p>
<p>has</p>
<p>been disposed off.</p>
<p>Signature of the person interested.${sp(30)}Verified in my / our presence</p>
<p>&nbsp;</p>
<p>Address :${sp(50)}Advocate Signature</p>
${PAGE_BREAK}
<p style="margin-left:50%;"><strong>Mr.</strong></p>
<p style="margin-left:50%;"><em>For</em></p>
${GAP(3)}
<h1 style="margin-left:50%;"><strong>IN THE COURT OF THE</strong> [COURT_NAME]</h1>
${GAP(4)}
<p style="margin-left:50%;">No.${sp(10)}[CASE_NUMBER]${sp(6)}of 202[YEAR_LAST]</p>
${GAP(5)}
<h1 style="margin-left:50%;"><strong>MEMO OF APPEARANCE</strong></h1>
${GAP(2)}
<p style="margin-left:72%;"><u>Accused</u></p>
<p style="margin-left:72%;">Complainant</p>
${GAP(3)}
<p style="margin-left:50%;"><strong>Filed on behalf of the</strong></p>
${GAP(6)}
<p style="margin-left:50%;">${rule(38)}</p>
<p style="margin-left:50%;">Address for Service : [ADVOCATE_ADDRESS]</p>
`.trim().replace(/\n/g, '')

// -- Petition to number Out of Order (Rule 57 C.R.P) -----------------
const outOfOrder = `
<div data-page-margin="55 45 40 48"></div>
<div data-page-font="helvetica"></div>
<p style="text-align:center;">(1)</p>
<h1><strong>IN THE COURT OF THE</strong> [COURT_NAME]</h1>
<p>&nbsp;</p>
<p style="margin-left:46%;">I.A.${sp(20)}of / 202[YEAR_LAST]</p>
<p style="margin-left:46%;">O.s.${sp(20)}of / 202[YEAR_LAST]</p>
<p>BETWEEN${sp(4)}[CLIENT_NAME_IF_PETITIONER]</p>
<p>&nbsp;</p>
<p style="text-align:right;">Appellant</p>
<p style="text-align:right;">Petitioner</p>
<p>&nbsp;</p>
<p style="text-align:right;">Plaintiff</p>
<p style="text-align:center;">AND${sp(4)}[CLIENT_NAME_IF_RESPONDENT]</p>
${GAP(2)}
<p style="text-align:right;">Respondent</p>
<p style="text-align:right;">Defendant</p>
${GAP(3)}
<h2 style="text-align:center;"><strong>Affidavit Filed by the Petitioner</strong></h2>
<h2 style="text-align:center;"><strong>for Urgent Orders Section 139 of C.P.C.</strong></h2>
<p>&nbsp;</p>
<p>${sp(8)}I${sp(40)}Son of</p>
<p>age${sp(14)}Years${sp(10)}by Religion, residing at</p>
<p>do hereby solemnly affirm and sincerely state as follows.</p>
<p>&nbsp;</p>
<p>1.${sp(6)}I am the petitioner herein. I am well acquainted with the facts of the care</p>
<p>&nbsp;</p>
<p>2.${sp(6)}I have filed the above named case in this Honourable court for</p>
<p>&nbsp;</p>
<p style="text-align:justify;">3.${sp(6)}As urgent orders have to be obtained in the metter, it is just and necessary in the interests of Justice${sp(14)}that the Enclosed.</p>
<p>${sp(20)}Be taken on file, urgently and numbered out of order.</p>
<p style="text-align:right;">Be pleased to Consider.</p>
<p>&nbsp;</p>
<p style="text-align:right;">Deponent</p>
<p>&nbsp;</p>
<p>${sp(12)}Solemnly affirmed before me this the${sp(20)}day of${sp(12)}202-</p>
<p style="text-align:justify;">the contents of this affidavit having been truly and audibly read over and explained in Telugu and admitted by him to correct. who sign his Name. Pul Her / His mark in my presence.</p>
${GAP(2)}
<p>Place :${sp(50)}Before me</p>
<p>&nbsp;</p>
<p>Date ;${sp(52)}Advocate [ADVOCATE_NAME]</p>
${PAGE_BREAK}
<p style="text-align:center;">(3)</p>
<h1><strong>IN THE COURT OF THE</strong> [COURT_NAME]</h1>
<p>Between${sp(4)}[CLIENT_NAME_IF_PETITIONER]${sp(20)}I.A.${sp(8)}of / 202[YEAR_LAST]</p>
<p style="margin-left:64%;">O.s.${sp(8)}of / 202[YEAR_LAST]</p>
${GAP(2)}
<p style="text-align:right;">.....Petitioner</p>
${GAP(2)}
<p style="text-align:center;">AND${sp(4)}[CLIENT_NAME_IF_RESPONDENT]</p>
${GAP(2)}
<p style="text-align:right;">.....Respondent</p>
${GAP(5)}
<p style="text-align:center;"><strong>OUT OF ORDER</strong></p>
<h2 style="text-align:center;"><strong>Petition Filed on behalf of the Petitioner</strong></h2>
<h2 style="text-align:center;"><strong>Rule 57 C.R.P</strong></h2>
${GAP(2)}
<p style="text-align:justify;">${sp(6)}As orders on the accompanying petition have to be obtained urgently the Petitioner Prays that the Honourable Court may be pleased to take Plain-Appeal-Suit-petiton on file and to number the same OUT OF ORDER in the Interest of Justice.</p>
${GAP(2)}
<p style="text-align:right;">Be Pleased to Consider.</p>
<p>&nbsp;</p>
<p>Place :</p>
<p>&nbsp;</p>
<p>Date : [DATE]</p>
${GAP(2)}
<p style="text-align:right;">Advocate for Petitioner</p>
${PAGE_BREAK}
<p style="text-align:center;">(4)</p>
${GAP(3)}
<h1 style="margin-left:50%;"><strong>In the Court of the</strong> [COURT_NAME]</h1>
<p style="margin-left:52%;">I.A.${sp(20)}of</p>
<p style="margin-left:52%;">O S.${sp(20)}of</p>
${GAP(11)}
<p style="margin-left:56%;"><strong>OUT OF ORDER</strong></p>
<p style="margin-left:56%;"><strong>Petitioner filed on behalf</strong></p>
<p style="margin-left:58%;"><strong>of the Petitioner</strong></p>
<p style="margin-left:62%;"><strong>I Petition</strong></p>
`.trim().replace(/\n/g, '')

const templates = [
  { name: 'Attachment in Execution - Prohibitory Order, Immovable Property (Order 21, Rule 54)', content: attachO21R54 },
  { name: 'Summons to Accused (Sec. 61 Cr.P.C.) with Note on Provision for Compromise', content: summonsS61 },
  { name: 'Form No. 11 (Rule 15) - Notice in the matter of the Marriage Act', content: form11Rule15 },
  { name: 'Notice to Send for pay particulars (Garnishee / Disbursing Officer)', content: payParticulars },
  { name: 'Process Memo', content: processMemo },
  { name: 'Form No. 51 (Rule 128 C.R.P.) - Application for Certified Copies', content: copyApplication },
  { name: 'దావాసమను / Suit Summons (Order 5, Rules 1 and 5)', content: davaSamanu },
  { name: 'Petition to Condone Delay under Section 148 & 151 C.P.C. (with Affidavit)', content: condoneDelay },
  { name: 'Execution Petition under Order 21, Rule II, Clause I - filed by the Decree Holder', content: executionPetition },
  { name: 'Memo of Appearance (Criminal)', content: memoAppearance },
  { name: 'Memo of Appearance with Verification by the Person Interested (Bail u/s 437 / 439 Cr. P.C.)', content: memoAppearanceBail },
  { name: 'Petition to Number Out of Order under Rule 57 C.R.P. (with Affidavit u/s 139 C.P.C.)', content: outOfOrder },
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
}

main()
