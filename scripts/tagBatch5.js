// Phase 2, batch 5 of 6 — tags manual_fields on six templates.
// Usage: node --env-file=.env.local scripts/tagBatch5.js

import { tagBatch } from './lib/tagTemplates.js'

const sp = n => '&nbsp;'.repeat(n)

await tagBatch([

  // ── Notice to Send for pay particulars (Garnishee) ────────────
  // Addressed to the employer paying the judgement debtor's salary, so it
  // needs the debtor's identity as well as the case numbers.
  {
    name: 'Notice to Send for pay particulars (Garnishee / Disbursing Officer)',
    edits: [
      ['/20&nbsp;', '/20[EP_YEAR]&nbsp;'],
      ['in O.S.NO.&nbsp;', 'in O.S.NO.&nbsp;[OS_NUMBER]'],
      [`in O.S.NO.&nbsp;[OS_NUMBER]${sp(15)}/</p>`, `in O.S.NO.&nbsp;[OS_NUMBER]${sp(15)}/&nbsp;[OS_YEAR]</p>`],
      ['<p>JDR.NO:-</p>', '<p>JDR.NO:-&nbsp;[JDR_NUMBER]</p>'],
      ['<p>GUARNISHEE</p>', '<p>GUARNISHEE&nbsp;[GARNISHEE_NAME]</p>'],
      ['E.P.లో JDR.NO_', 'E.P.లో JDR.NO&nbsp;[JDR_NUMBER]_'],
      ['<p>S/o_', '<p>S/o&nbsp;[JDR_FATHER_NAME]_'],
      ['<p>____________________________________________________________</p>',
       '<p>[JDR_ADDRESS]____________________________________________________________</p>'],
      ['వాయిదాతేది _', 'వాయిదాతేది [DUE_DATE]_'],
      ['________ 20 లోపుగా', '________ 20[DUE_YEAR] లోపుగా'],
      // Signing date is today's; the "(20" slot takes the full autofilled year.
      ['<p>(20&nbsp;&nbsp;సం||_', '<p>([YEAR]&nbsp;సం||&nbsp;[MONTH]_'],
      ['నెల________తేదీన', 'నెల&nbsp;[DAY]________తేదీన'],
    ],
    fields: [
      { token: '[EP_YEAR]', label: 'E.P. Year', type: 'year', prefix: '20' },
      { token: '[OS_NUMBER]', label: 'O.S. Number', type: 'text', printedLabel: 'O.S.NO.' },
      { token: '[OS_YEAR]', label: 'O.S. Year', type: 'year' },
      { token: '[JDR_NUMBER]', label: 'Judgement Debtor Number', type: 'text', printedLabel: 'JDR.NO',
        hint: 'Used at the head of the notice and again in the Telugu body.' },
      { token: '[GARNISHEE_NAME]', label: 'Garnishee (the salary-paying officer)', type: 'text' },
      { token: '[JDR_FATHER_NAME]', label: 'Judgement Debtor — Father’s Name', type: 'text', printedLabel: 'S/o' },
      { token: '[JDR_ADDRESS]', label: 'Judgement Debtor — Address', type: 'textarea' },
      { token: '[DUE_DATE]', label: 'Particulars Due By — Day and Month (Telugu)', type: 'text',
        hint: 'Completes “వాయిదాతేది ___ 20__ లోపుగా”.' },
      { token: '[DUE_YEAR]', label: 'Particulars Due By — Year', type: 'year', prefix: '20' },
    ],
  },

  // ── Process Memo ──────────────────────────────────────────────
  // The ruled grid of parties to summon is free-form, so it is asked for as
  // one block rather than inventing a fixed number of rows.
  {
    name: 'Process Memo',
    edits: [
      ['<p>Hearing Date&nbsp;', '<p>Hearing Date&nbsp;[HEARING_DATE]'],
      ['PROCESS MEMO FILED ON BEHALF OF THE</strong>', 'PROCESS MEMO FILED ON BEHALF OF THE [PARTY_TYPE]</strong>'],
      [`Summoned${sp(10)}fees</p>`, `Summoned${sp(10)}fees</p><p>[PARTIES_TO_SUMMON]</p>`],
      ['Filed on behalf of the</p>', 'Filed on behalf of the&nbsp;[PARTY_TYPE]</p>'],
      ['<p style="margin-left:52%;">Filed.', '<p style="margin-left:52%;">Filed&nbsp;[FILED_ON].'],
    ],
    fields: [
      { token: '[HEARING_DATE]', label: 'Hearing Date — Day and Month', type: 'text',
        hint: 'The form prints “/ 202_” after this blank.' },
      { token: '[PARTIES_TO_SUMMON]', label: 'Parties to be Summoned', type: 'textarea',
        hint: 'One line per party: name, address, purpose summoned, process fees.' },
      { token: '[FILED_ON]', label: 'Filed On', type: 'date' },
    ],
  },

  // ── Form No. 51 (r.128 C.R.P.) — Certified Copies ─────────────
  {
    name: 'Form No. 51 (Rule 128 C.R.P.) - Application for Certified Copies',
    edits: [
      ['of /</p>', 'of /&nbsp;[SUIT_YEAR]</p>'],
      ['may be furnished to</p>', 'may be furnished to&nbsp;[CLIENT_NAME]</p>'],
      ['urgently required respons that</p>', 'urgently required respons that&nbsp;[URGENCY_REASON]</p>'],
      [`which application is mode</p>`, `which application is mode</p><p>[DOCUMENTS_REQUESTED]</p>`],
      // Application date is today's — autofilled.
      ['<p>Date&nbsp;', '<p>Date&nbsp;[DAY]'],
      [`day of${sp(20)}202[YEAR_LAST]</p>`, `day of&nbsp;[MONTH]${sp(19)}202[YEAR_LAST]</p>`],
      ['Advocate for.', 'Advocate for [PARTY_TYPE].'],
      ['<p style="margin-left:44%;">Filed on :</p>', '<p style="margin-left:44%;">Filed on :&nbsp;[FILED_ON]</p>'],
    ],
    fields: [
      { token: '[SUIT_YEAR]', label: 'Suit Year', type: 'year' },
      { token: '[URGENCY_REASON]', label: 'Why the Copies are Urgently Required', type: 'textarea' },
      { token: '[DOCUMENTS_REQUESTED]', label: 'Documents Requested', type: 'textarea',
        hint: 'One line per document: date of filing, description, and the order it is applied under.' },
      { token: '[FILED_ON]', label: 'Filed On', type: 'date' },
    ],
  },

  // ── దావాసమను / Suit Summons (O.5 rr.1, 5) ──────────────────────
  // Telugu order is "[year] సం|| [month] నెల [date] తేదీన".
  {
    name: 'దావాసమను / Suit Summons (Order 5, Rules 1 and 5)',
    edits: [
      ['<p>మహారాజశ్రీ</p>', '<p>మహారాజశ్రీ&nbsp;[ADDRESSEE]</p>'],
      [`యీ దావాలో పరిహారం${sp(20)}నిమిత్తం`, `యీ దావాలో పరిహారం&nbsp;[RELIEF_SOUGHT]${sp(19)}నిమిత్తం`],
      [`చెప్పగలందులకు${sp(8)}సం||${sp(8)}నెల${sp(8)}తేదీన 10-30`,
       `చెప్పగలందులకు&nbsp;[APPEAR_YEAR]${sp(7)}సం||&nbsp;[APPEAR_MONTH]${sp(7)}నెల&nbsp;[APPEAR_DATE]${sp(7)}తేదీన 10-30`],
      // Signing date is today's — autofilled.
      [`<p>${sp(6)}సం||${sp(6)}నెల${sp(12)}తేదీన నాచేవ్రాలున్న`,
       `<p>${sp(5)}[YEAR]&nbsp;సం||&nbsp;[MONTH]${sp(5)}నెల&nbsp;[DAY]${sp(11)}తేదీన నాచేవ్రాలున్న`],
    ],
    fields: [
      { token: '[ADDRESSEE]', label: 'Addressee — Name and Address', type: 'textarea',
        hint: 'Who this summons is served on (“మహారాజశ్రీ ___”).' },
      { token: '[RELIEF_SOUGHT]', label: 'Relief Sought', type: 'text',
        hint: 'Completes “యీ దావాలో పరిహారం ___ నిమిత్తం …”.' },
      { token: '[APPEAR_YEAR]', label: 'Date to Appear — Year', type: 'year' },
      { token: '[APPEAR_MONTH]', label: 'Date to Appear — Month (Telugu)', type: 'text' },
      { token: '[APPEAR_DATE]', label: 'Date to Appear — Day (Telugu)', type: 'text' },
    ],
  },

  // ── Petition to Condone Delay (s.148 & 151 C.P.C.) ────────────
  // The main case number appears on the affidavit, the petition and the
  // cover sheet — one question fills all three.
  {
    name: 'Petition to Condone Delay under Section 148 & 151 C.P.C. (with Affidavit)',
    edits: [
      ['<strong>NO.</strong>&nbsp;', '<strong>NO.</strong>&nbsp;[MAIN_CASE_NUMBER]'],
      ['<strong>No.</strong>&nbsp;', '<strong>No.</strong>&nbsp;[MAIN_CASE_NUMBER]'],
      ['<p style="margin-left:64%;">No.&nbsp;', '<p style="margin-left:64%;">No.&nbsp;[MAIN_CASE_NUMBER]'],
      [`<p>${sp(8)}I</p>`, `<p>${sp(8)}I&nbsp;[DEPONENT_NAME]</p>`],
      ['<p>Advocate Clerk&nbsp;', '<p>Advocate Clerk&nbsp;[DEPONENT_AGE]'],
      ['condone the delay&nbsp;', 'condone the delay&nbsp;[DELAY_PERIOD]', 2],
      ['<p>Filed by</p>', '<p>Filed by&nbsp;[ADVOCATE_NAME]</p>'],
      ['<p>Station :</p>', '<p>Station :&nbsp;[STATION]</p>'],
    ],
    fields: [
      { token: '[MAIN_CASE_NUMBER]', label: 'Main Case Number', type: 'text', printedLabel: 'No.',
        hint: 'The suit or case the I.A. sits inside, not the I.A. number.' },
      { token: '[DEPONENT_NAME]', label: 'Deponent — Name', type: 'text',
        hint: 'Who swears the affidavit (“I ___, Advocate Clerk”).' },
      { token: '[DEPONENT_AGE]', label: 'Deponent — Age', type: 'number', printedLabel: 'Years' },
      { token: '[DELAY_PERIOD]', label: 'Length of Delay to be Condoned', type: 'text',
        hint: 'Appears on both the affidavit and the petition.' },
      { token: '[STATION]', label: 'Station', type: 'text', printedLabel: 'Station' },
    ],
  },

  // ── Execution Petition (O.21 r.II cl.I) ───────────────────────
  // The body is a twelve-item schedule the decree holder must complete, so
  // each numbered item is a question. The property schedule itself is left
  // to the editor — it is a free-form block, not a labelled blank.
  {
    name: 'Execution Petition under Order 21, Rule II, Clause I - filed by the Decree Holder',
    edits: [
      ['<strong>E.P. No.</strong>&nbsp;', '<strong>E.P. No.</strong>&nbsp;[EP_NUMBER]'],
      ['Suti Number</p>', 'Suti Number&nbsp;[SUIT_NUMBER]</p>'],
      ['Date of Decree</p>', 'Date of Decree&nbsp;[DATE_OF_DECREE]</p>'],
      ['preferred from Decree</p>', 'preferred from Decree&nbsp;[APPEAL_PREFERRED]</p>'],
      [`${sp(6)}Result</p>`, `${sp(6)}Result&nbsp;[PREVIOUS_APPLICATION]</p>`],
      [`<p>${sp(6)}if any</p>`, `<p>${sp(6)}if any&nbsp;[PAYMENT_ADJUSTMENT]</p>`],
      ['Transferred or not</p>', 'Transferred or not&nbsp;[DECREE_TRANSFERRED]</p>'],
      [`Rs.${sp(8)}Ps.</p>`, `Rs.&nbsp;[AMOUNT_RS]${sp(7)}Ps.&nbsp;[AMOUNT_PS]</p>`],
      ['Decree Amount</p>', 'Decree Amount&nbsp;[DECREE_AMOUNT]</p>'],
      ['Subsequent interest of Rs</p>', 'Subsequent interest of Rs&nbsp;[SUBSEQUENT_INTEREST]</p>'],
      [`<p>${sp(28)}from</p>`, `<p>${sp(28)}from&nbsp;[INTEREST_FROM]</p>`],
      [`<p>${sp(28)}to</p>`, `<p>${sp(28)}to&nbsp;[INTEREST_TO]</p>`],
      [`at${sp(14)}A.P.</p>`, `at&nbsp;[INTEREST_RATE]${sp(13)}A.P.</p>`],
      [`10. Amount of Cost if${sp(40)}Rs.</p>`, `10. Amount of Cost if${sp(40)}Rs.&nbsp;[COST_RS]</p>`],
      [`<p>${sp(6)}Ps${sp(8)}any Awarded</p>`, `<p>${sp(6)}Ps&nbsp;[COST_PS]${sp(7)}any Awarded</p>`],
      ['Cost awarded in the Decree</p>', 'Cost awarded in the Decree&nbsp;[COST_AWARDED]</p>'],
      [`<p>${sp(6)}executed</p>`, `<p>${sp(6)}executed&nbsp;[AGAINST_WHOM]</p>`],
      ['Court is required</p>', 'Court is required&nbsp;[MODE_OF_ASSISTANCE]</p>'],
      ['<p>Station&nbsp;&nbsp;}</p>', '<p>Station&nbsp;[STATION]&nbsp;}</p>'],
      ['<p style="margin-left:50%;">O.S.C.</p>', '<p style="margin-left:50%;">O.S.C.&nbsp;[CASE_NUMBER]</p>'],
    ],
    fields: [
      { token: '[EP_NUMBER]', label: 'E.P. Number', type: 'text', printedLabel: 'E.P. No.' },
      { token: '[SUIT_NUMBER]', label: '1. Suit Number', type: 'text' },
      { token: '[DATE_OF_DECREE]', label: '4. Date of Decree', type: 'date' },
      { token: '[APPEAL_PREFERRED]', label: '5. Whether any Appeal Preferred from Decree', type: 'text' },
      { token: '[PREVIOUS_APPLICATION]', label: '6. Previous Application, with Date and Result', type: 'textarea' },
      { token: '[PAYMENT_ADJUSTMENT]', label: '7. Payment or Adjustment, if any', type: 'text' },
      { token: '[DECREE_TRANSFERRED]', label: '8. Whether Decree Transferred or Not', type: 'text' },
      { token: '[AMOUNT_RS]', label: '9. Amount Due — Rupees', type: 'text', printedLabel: 'Rs.' },
      { token: '[AMOUNT_PS]', label: '9. Amount Due — Paise', type: 'text', printedLabel: 'Ps.' },
      { token: '[DECREE_AMOUNT]', label: '9. Decree Amount', type: 'text' },
      { token: '[SUBSEQUENT_INTEREST]', label: '9. Subsequent Interest', type: 'text', printedLabel: 'Rs' },
      { token: '[INTEREST_FROM]', label: '9. Interest From', type: 'text', printedLabel: 'from' },
      { token: '[INTEREST_TO]', label: '9. Interest To', type: 'text', printedLabel: 'to' },
      { token: '[INTEREST_RATE]', label: '9. Interest Rate', type: 'text',
        hint: 'The form prints “A.P.” after this blank.' },
      { token: '[COST_RS]', label: '10. Cost Awarded — Rupees', type: 'text', printedLabel: 'Rs.' },
      { token: '[COST_PS]', label: '10. Cost Awarded — Paise', type: 'text', printedLabel: 'Ps' },
      { token: '[COST_AWARDED]', label: '10. Cost Awarded in the Decree', type: 'text' },
      { token: '[AGAINST_WHOM]', label: '11. Against Whom to be Executed', type: 'text' },
      { token: '[MODE_OF_ASSISTANCE]', label: '12. Mode in which the Court’s Assistance is Required', type: 'textarea' },
      { token: '[STATION]', label: 'Station', type: 'text', printedLabel: 'Station' },
    ],
  },

])
