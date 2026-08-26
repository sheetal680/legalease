// Phase 2, batch 4 of 6 — tags manual_fields on six templates.
// Usage: node --env-file=.env.local scripts/tagBatch4.js

import { tagBatch } from './lib/tagTemplates.js'

const sp = n => '&nbsp;'.repeat(n)

await tagBatch([

  // ── F. No 7-A — Attachment before Judgement (O.38 r.5) ────────
  {
    name: 'F. No 7-A - Attachment of immovable Property before Judgement (Order 38, Rule 5 C.P.C.)',
    edits: [
      ['<p>To</p>', '<p>To&nbsp;[DEFENDANT_ADDRESS]</p>'],
      ['called upon you,&nbsp;', 'called upon you,&nbsp;[CALLED_UPON_DATE]'],
      ['Warrant amount Rs.&nbsp;', 'Warrant amount Rs.&nbsp;[WARRANT_AMOUNT]'],
      ['Hearing date:&nbsp;', 'Hearing date:&nbsp;[HEARING_DATE]'],
      // Seal date is today's — autofilled.
      ['of this&nbsp;', 'of this&nbsp;[DAY]'],
      ['<p>of&nbsp;', '<p>of&nbsp;[MONTH]'],
    ],
    fields: [
      { token: '[DEFENDANT_ADDRESS]', label: 'Address of the Defendant', type: 'textarea',
        hint: 'The “To” block — where this order is to be served.' },
      { token: '[CALLED_UPON_DATE]', label: 'Date the Court Called Upon the Defendant', type: 'text' },
      { token: '[WARRANT_AMOUNT]', label: 'Warrant Amount', type: 'text', printedLabel: 'Rs.' },
      { token: '[HEARING_DATE]', label: 'Hearing Date — Day and Month', type: 'text',
        hint: 'The form prints “202_” after this blank.' },
    ],
  },

  // ── Costs Memo and Fees Certificate ───────────────────────────
  // The printed form is a ruled table of fourteen cost heads with an amount
  // column. The renderer has no table primitive, so each amount is asked for
  // and rendered beside its head. All optional — an advocate fills only the
  // heads that apply.
  {
    name: 'Costs Memo and Fees Certificate',
    edits: [
      ['<strong>O.S.</strong>.', '<strong>O.S.</strong>&nbsp;[OS_NUMBER].'],
      ['COSTS MEMO FILED ON BEHALF OF THE</strong>', 'COSTS MEMO FILED ON BEHALF OF THE [PARTY_TYPE]</strong>'],
      ['<p>1.&nbsp;&nbsp;&nbsp;&nbsp;Vakalat</p>', '<p>1.&nbsp;&nbsp;&nbsp;&nbsp;Vakalat&nbsp;[COST_VAKALAT]</p>'],
      ['<p>2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Advocate welfare fund</p>', '<p>2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Advocate welfare fund&nbsp;[COST_WELFARE_FUND]</p>'],
      ['<p>3.&nbsp;&nbsp;&nbsp;&nbsp;Plaint Fees</p>', '<p>3.&nbsp;&nbsp;&nbsp;&nbsp;Plaint Fees&nbsp;[COST_PLAINT_FEES]</p>'],
      ['<p>4.&nbsp;&nbsp;&nbsp;&nbsp;Petion Stamp</p>', '<p>4.&nbsp;&nbsp;&nbsp;&nbsp;Petion Stamp&nbsp;[COST_PETITION_STAMP]</p>'],
      ['<p>5.&nbsp;&nbsp;&nbsp;&nbsp;Process</p>', '<p>5.&nbsp;&nbsp;&nbsp;&nbsp;Process&nbsp;[COST_PROCESS]</p>'],
      ['<p>6.&nbsp;&nbsp;&nbsp;&nbsp;Witness bata</p>', '<p>6.&nbsp;&nbsp;&nbsp;&nbsp;Witness bata&nbsp;[COST_WITNESS_BATA]</p>'],
      ['<p>7.&nbsp;&nbsp;&nbsp;&nbsp;Stamp for penality</p>', '<p>7.&nbsp;&nbsp;&nbsp;&nbsp;Stamp for penality&nbsp;[COST_PENALTY_STAMP]</p>'],
      ['<p>8.&nbsp;&nbsp;&nbsp;&nbsp;Court fee Afixing on Document</p>', '<p>8.&nbsp;&nbsp;&nbsp;&nbsp;Court fee Afixing on Document&nbsp;[COST_COURT_FEE_DOCUMENT]</p>'],
      ['<p>9.&nbsp;&nbsp;&nbsp;&nbsp;Commissioner fees</p>', '<p>9.&nbsp;&nbsp;&nbsp;&nbsp;Commissioner fees&nbsp;[COST_COMMISSIONER]</p>'],
      ['<p>10. Pleaders fees</p>', '<p>10. Pleaders fees&nbsp;[COST_PLEADERS_FEES]</p>'],
      ['<p>11. Publication Charges</p>', '<p>11. Publication Charges&nbsp;[COST_PUBLICATION]</p>'],
      ['<p>12. Court Guardian Fees</p>', '<p>12. Court Guardian Fees&nbsp;[COST_COURT_GUARDIAN]</p>'],
      ['<p>13. Writing Charges</p>', '<p>13. Writing Charges&nbsp;[COST_WRITING]</p>'],
      ['<p>14. Type Charges</p>', '<p>14. Type Charges&nbsp;[COST_TYPE]</p>'],
      ['FEES CERTIFICATE FILED ON BEHALF OF THE</p>', 'FEES CERTIFICATE FILED ON BEHALF OF THE [PARTY_TYPE]</p>'],
      ['Received the sum of Rs.&nbsp;', 'Received the sum of Rs.&nbsp;[FEES_RECEIVED]'],
      ['fees from the&nbsp;', 'fees from the&nbsp;[FEES_FROM]'],
    ],
    fields: [
      { token: '[OS_NUMBER]', label: 'O.S. Number', type: 'text', printedLabel: 'O.S.' },
      { token: '[COST_VAKALAT]', label: 'Vakalat', type: 'text',
        hint: 'Amounts for the costs memo — leave any head blank if it does not apply.' },
      { token: '[COST_WELFARE_FUND]', label: 'Advocate Welfare Fund', type: 'text' },
      { token: '[COST_PLAINT_FEES]', label: 'Plaint Fees', type: 'text' },
      { token: '[COST_PETITION_STAMP]', label: 'Petition Stamp', type: 'text' },
      { token: '[COST_PROCESS]', label: 'Process', type: 'text' },
      { token: '[COST_WITNESS_BATA]', label: 'Witness Bata', type: 'text' },
      { token: '[COST_PENALTY_STAMP]', label: 'Stamp for Penalty', type: 'text' },
      { token: '[COST_COURT_FEE_DOCUMENT]', label: 'Court Fee Affixed on Document', type: 'text' },
      { token: '[COST_COMMISSIONER]', label: 'Commissioner Fees', type: 'text' },
      { token: '[COST_PLEADERS_FEES]', label: 'Pleaders Fees', type: 'text' },
      { token: '[COST_PUBLICATION]', label: 'Publication Charges', type: 'text' },
      { token: '[COST_COURT_GUARDIAN]', label: 'Court Guardian Fees', type: 'text' },
      { token: '[COST_WRITING]', label: 'Writing Charges', type: 'text' },
      { token: '[COST_TYPE]', label: 'Type Charges', type: 'text' },
      { token: '[FEES_RECEIVED]', label: 'Fees Received', type: 'text', printedLabel: 'Rs.',
        hint: 'For the fees certificate: “I here by certify that I have Received the sum of Rs. ___”.' },
      { token: '[FEES_FROM]', label: 'Fees Received From', type: 'text' },
    ],
  },

  // ── M.C. Notice (s.125 Cr. P.C.) ──────────────────────────────
  // Almost everything autofills; only the M.C. year is manual. The signing
  // year slot prints "20", so it takes the full autofilled year instead.
  {
    name: 'M.C. Notice (Section 125 Cr. P.C.)',
    edits: [
      ['<p style="margin-left:30%;">At.', '<p style="margin-left:30%;">At&nbsp;[COURT_PLACE].'],
      ['of 20</p>', 'of 20[CASE_YEAR]</p>'],
      ['&nbsp;&nbsp;20</p>', '&nbsp;&nbsp;[YEAR]</p>'],
    ],
    fields: [
      { token: '[CASE_YEAR]', label: 'M.C. Year', type: 'year', prefix: '20' },
    ],
  },

  // ── Attachment in Execution — Prohibitory Order (O.21 r.54) ───
  // Every number on this form carries its own "20__" year slot. "in Suit No"
  // is the same original suit as the O.S. line, so it reuses those questions.
  {
    name: 'Attachment in Execution - Prohibitory Order, Immovable Property (Order 21, Rule 54)',
    // Whole-line replacements: these lines pack several slots into one run of
    // spacing, and chaining separate edits across them meant each edit had to
    // predict how many spaces the previous one had consumed. Each separator
    // below is taken from the existing run, so the blank form keeps its width.
    edits: [
      [`<p style="margin-left:16%;">E.P.${sp(20)}20${sp(12)}O. S.${sp(14)}20</p>`,
       `<p style="margin-left:16%;">E.P.&nbsp;[EP_NUMBER]${sp(19)}20[EP_YEAR]${sp(11)}O. S.&nbsp;[OS_NUMBER]${sp(13)}20[OS_YEAR]</p>`],
      ['passed against you on the</p>', 'passed against you on the&nbsp;[DECREE_DAY]</p>'],
      [`<p>day${sp(8)}of${sp(8)}20${sp(8)}in Suit No${sp(10)}20${sp(10)}in favour of${sp(12)}for</p>`,
       `<p>day${sp(8)}of&nbsp;[DECREE_MONTH]${sp(7)}20[DECREE_YEAR]${sp(8)}in Suit No&nbsp;[OS_NUMBER]${sp(9)}20[OS_YEAR]${sp(10)}in favour of&nbsp;[DECREE_IN_FAVOUR_OF]${sp(11)}for</p>`],
      ['<p>Rs.&nbsp;', '<p>Rs.&nbsp;[DECREE_AMOUNT]'],
      ['you should attend Court on the</p>', 'you should attend Court on the&nbsp;[ATTEND_DAY]</p>'],
      [`<p>of${sp(16)}20${sp(16)}to take Notice`,
       `<p>of&nbsp;[ATTEND_MONTH]${sp(15)}20[ATTEND_YEAR]${sp(16)}to take Notice`],
      // Seal date is today's; the trailing "20" takes the full autofilled year.
      [`<p>of${sp(10)}[MONTH]${sp(10)}20</p>`, `<p>of${sp(10)}[MONTH]${sp(10)}[YEAR]</p>`],
    ],
    fields: [
      { token: '[EP_NUMBER]', label: 'E.P. Number', type: 'text', printedLabel: 'E.P.' },
      { token: '[EP_YEAR]', label: 'E.P. Year', type: 'year', prefix: '20' },
      { token: '[OS_NUMBER]', label: 'O.S. Number (the original suit)', type: 'text', printedLabel: 'O. S.',
        hint: 'Also fills the “in Suit No” blank further down.' },
      { token: '[OS_YEAR]', label: 'O.S. Year', type: 'year', prefix: '20' },
      { token: '[DECREE_DAY]', label: 'Decree Date — Day', type: 'text' },
      { token: '[DECREE_MONTH]', label: 'Decree Date — Month', type: 'text' },
      { token: '[DECREE_YEAR]', label: 'Decree Date — Year', type: 'year', prefix: '20' },
      { token: '[DECREE_IN_FAVOUR_OF]', label: 'Decree in Favour Of', type: 'text' },
      { token: '[DECREE_AMOUNT]', label: 'Decree Amount', type: 'text', printedLabel: 'Rs.' },
      { token: '[ATTEND_DAY]', label: 'Date to Attend Court — Day', type: 'text' },
      { token: '[ATTEND_MONTH]', label: 'Date to Attend Court — Month', type: 'text' },
      { token: '[ATTEND_YEAR]', label: 'Date to Attend Court — Year', type: 'year', prefix: '20' },
    ],
  },

  // ── Summons to Accused (s.61 Cr.P.C.) + compromise note ───────
  // The printing carries a hardcoded 2022 in three places: the case year and
  // hearing year become questions, the signing year autofills.
  {
    name: 'Summons to Accused (Sec. 61 Cr.P.C.) with Note on Provision for Compromise',
    edits: [
      ['OF 2022', 'OF 202[CASE_YEAR]'],
      ['<p>To</p>', '<p>To&nbsp;[ACCUSED_ADDRESS]</p>'],
      ['the charge of ____', 'the charge of [CHARGE] ____'],
      ['on the day of ____', 'on the day of [HEARING_DATE_TEXT] ____'],
      ['2022 at 10-30 AM.', '202[HEARING_YEAR] at 10-30 AM.'],
      ['Dated this ______________ day of ____________________ 2022.',
       'Dated this [DAY] ______________ day of [MONTH] ____________________ 202[YEAR_LAST].'],
    ],
    fields: [
      { token: '[CASE_YEAR]', label: 'C.C. Year', type: 'year', prefix: '202' },
      { token: '[ACCUSED_ADDRESS]', label: 'Address of the Accused', type: 'textarea',
        hint: 'The “To” block — where this summons is to be served.' },
      { token: '[CHARGE]', label: 'Charge', type: 'text',
        hint: 'Completes “your attendance is necessary t answer the charge of ___”.' },
      { token: '[HEARING_DATE_TEXT]', label: 'Hearing Date — Day and Month', type: 'text' },
      { token: '[HEARING_YEAR]', label: 'Hearing Year', type: 'year', prefix: '202' },
    ],
  },

  // ── Form No. 11 (Rule 15) — Marriage Act notice ───────────────
  // Carries three tracking dates at the head (presented / filed / notice
  // issued) as well as the usual petition, appearance and statement dates.
  // Hardcoded 201_ and 2017 year slots become year questions.
  {
    name: 'Form No. 11 (Rule 15) - Notice in the matter of the Marriage Act',
    edits: [
      ['<p>Petition presented on</p>', '<p>Petition presented on&nbsp;[PRESENTED_ON]</p>'],
      ['<p>Petition filed on</p>', '<p>Petition filed on&nbsp;[FILED_ON]</p>'],
      ['<p>Notice issued on</p>', '<p>Notice issued on&nbsp;[NOTICE_ISSUED_ON]</p>'],
      ['<p>Whereas on the&nbsp;', '<p>Whereas on the&nbsp;[PETITION_DAY]'],
      ['day of&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;201&nbsp;', 'day of&nbsp;[PETITION_MONTH]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;201[PETITION_YEAR]&nbsp;'],
      ['against the respondent for</p>', 'against the respondent for&nbsp;[RELIEF_SOUGHT]</p>'],
      ['appear in this court on the&nbsp;', 'appear in this court on the&nbsp;[APPEAR_DAY]'],
      ['day of&nbsp;&nbsp;&nbsp;&nbsp;2017', 'day of&nbsp;[APPEAR_MONTH]&nbsp;&nbsp;&nbsp;201[APPEAR_YEAR]'],
      ['statement in court before the&nbsp;', 'statement in court before the&nbsp;[STATEMENT_DAY]'],
      ['<p>To filed a return statement in court before the&nbsp;[STATEMENT_DAY]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;day of&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2017</p>',
       '<p>To filed a return statement in court before the&nbsp;[STATEMENT_DAY]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;day of&nbsp;[STATEMENT_MONTH]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;201[STATEMENT_YEAR]</p>'],
      // Signing date is today's — autofilled.
      ['<p>Given under my hand and the seal of the court this&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;day of&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2017</p>',
       '<p>Given under my hand and the seal of the court this&nbsp;[DAY]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;day of&nbsp;[MONTH]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[YEAR]</p>'],
    ],
    fields: [
      { token: '[PRESENTED_ON]', label: 'Petition Presented On', type: 'date' },
      { token: '[FILED_ON]', label: 'Petition Filed On', type: 'date' },
      { token: '[NOTICE_ISSUED_ON]', label: 'Notice Issued On', type: 'date' },
      { token: '[PETITION_DAY]', label: 'Petition Filed — Day', type: 'text' },
      { token: '[PETITION_MONTH]', label: 'Petition Filed — Month', type: 'text' },
      { token: '[PETITION_YEAR]', label: 'Petition Filed — Year', type: 'year', prefix: '201' },
      { token: '[RELIEF_SOUGHT]', label: 'Relief Sought', type: 'textarea' },
      { token: '[APPEAR_DAY]', label: 'Respondent to Appear — Day', type: 'text' },
      { token: '[APPEAR_MONTH]', label: 'Respondent to Appear — Month', type: 'text' },
      { token: '[APPEAR_YEAR]', label: 'Respondent to Appear — Year', type: 'year', prefix: '201' },
      { token: '[STATEMENT_DAY]', label: 'Return Statement Due — Day', type: 'text' },
      { token: '[STATEMENT_MONTH]', label: 'Return Statement Due — Month', type: 'text' },
      { token: '[STATEMENT_YEAR]', label: 'Return Statement Due — Year', type: 'year', prefix: '201' },
    ],
  },

])
