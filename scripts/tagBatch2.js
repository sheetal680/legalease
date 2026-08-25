// Phase 2, batch 2 of 6 — tags manual_fields on six templates.
// Usage: node --env-file=.env.local scripts/tagBatch2.js

import { tagBatch } from './lib/tagTemplates.js'

await tagBatch([

  // ── Notice (Order 21 Rule 54 (1A)) ────────────────────────────
  // An attachment notice: it recites a decree already passed (its date, who it
  // favours, the sum) and then fixes a date to attend. The decree's own date is
  // in the past, so it is asked for rather than taken from today.
  {
    name: 'Notice (Order 21 Rule 54 (1A))',
    edits: [
      ['<p style="margin-left:14%;">E.P.</p>', '<p style="margin-left:14%;">E.P.&nbsp;[EP_NUMBER]</p>'],
      ['In O.S&nbsp;', 'In O.S&nbsp;[OS_NUMBER]'],
      ['against you on the</p>', 'against you on the&nbsp;[DECREE_DAY]</p>'],
      ['<p style="margin-left:12%;">day of&nbsp;', '<p style="margin-left:12%;">day of&nbsp;[DECREE_MONTH]'],
      ['in favour of</p>', 'in favour of&nbsp;[DECREE_IN_FAVOUR_OF]</p>'],
      ['for Rs.</p>', 'for Rs.&nbsp;[DECREE_AMOUNT]</p>'],
      // "you the said ___" is the judgement debtor already named above.
      ['theyou said&nbsp;', 'theyou said&nbsp;[CLIENT_NAME_IF_RESPONDENT]'],
      ['should attend Court on the&nbsp;', 'should attend Court on the&nbsp;[ATTEND_DAY]'],
      ['day of&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;202[YEAR_LAST]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To take',
       'day of&nbsp;[ATTEND_MONTH]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;202[YEAR_LAST]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To take'],
      // The seal date is today's — autofilled, not asked about.
      ['seal of the Court&nbsp;', 'seal of the Court&nbsp;[DAY]'],
      ['day of&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;202[YEAR_LAST]</p>',
       'day of&nbsp;[MONTH]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;202[YEAR_LAST]</p>'],
      ['<p>Warrant Amount :</p>', '<p>Warrant Amount :&nbsp;[WARRANT_AMOUNT]</p>'],
      ['Hearing Date :&nbsp;', 'Hearing Date :&nbsp;[HEARING_DATE]'],
    ],
    fields: [
      { token: '[EP_NUMBER]', label: 'E.P. Number', type: 'text', printedLabel: 'E.P.' },
      { token: '[OS_NUMBER]', label: 'O.S. Number (the original suit)', type: 'text', printedLabel: 'O.S' },
      { token: '[DECREE_DAY]', label: 'Decree Date — Day', type: 'text',
        hint: 'The date the decree was passed: “passed against you on the ___ day of ___”.' },
      { token: '[DECREE_MONTH]', label: 'Decree Date — Month', type: 'text' },
      { token: '[DECREE_IN_FAVOUR_OF]', label: 'Decree in Favour Of', type: 'text' },
      { token: '[DECREE_AMOUNT]', label: 'Decree Amount', type: 'text', printedLabel: 'Rs.' },
      { token: '[ATTEND_DAY]', label: 'Date to Attend Court — Day', type: 'text' },
      { token: '[ATTEND_MONTH]', label: 'Date to Attend Court — Month', type: 'text' },
      { token: '[WARRANT_AMOUNT]', label: 'Warrant Amount', type: 'text', printedLabel: 'Warrant Amount' },
      { token: '[HEARING_DATE]', label: 'Hearing Date', type: 'date', printedLabel: 'Hearing Date' },
    ],
  },

  // ── Notice O.21 R.66, Sale Proclanation (Telugu) ──────────────
  // Telugu order is "20__ సంవత్సరం [month] నెల [date] తేదీన" — the blank after
  // సంవత్సరం is the month, the one after నెల is the day.
  {
    name: 'Notice of the day fixed setting & Sale Proclanation (Order 21 Rule 66)',
    edits: [
      ['/ 20&nbsp;', '/ 20[EP_YEAR]&nbsp;'],
      ['O.S.</p>', 'O.S.&nbsp;[OS_NUMBER]</p>'],
      ['దావాలో.', 'దావాలో&nbsp;[DECREE_HOLDER].'],
      ['20..........', '20[TERMS_YEAR]..........'],
      ['సంవత్సరం.', 'సంవత్సరం&nbsp;[TERMS_MONTH].'],
      ['నెల.................... తేదీన', 'నెల&nbsp;[TERMS_DATE].................... తేదీన'],
      // Signing date is today's — autofilled.
      ['యేర్పరిచినారు. ', 'యేర్పరిచినారు. [YEAR]'],
      ['సంవత్సరం ', 'సంవత్సరం [MONTH]'],
      ['నెల....................తేదీన', 'నెల&nbsp;[DAY]....................తేదీన'],
    ],
    repairs: [
      // An earlier pass placed these flush against the printed Telugu word,
      // leaving no gap between label and answer.
      ['దావాలో[DECREE_HOLDER]', 'దావాలో&nbsp;[DECREE_HOLDER]'],
      ['సంవత్సరం[TERMS_MONTH]', 'సంవత్సరం&nbsp;[TERMS_MONTH]'],
      ['నెల[TERMS_DATE]', 'నెల&nbsp;[TERMS_DATE]'],
      ['నెల[DAY]', 'నెల&nbsp;[DAY]'],
    ],
    fields: [
      { token: '[EP_YEAR]', label: 'E.P. Year', type: 'year', prefix: '20' },
      { token: '[OS_NUMBER]', label: 'O.S. Number (the original suit)', type: 'text', printedLabel: 'O.S.' },
      { token: '[DECREE_HOLDER]', label: 'Decree Holder', type: 'text',
        hint: 'Completes “పై నెంబరు దావాలో ___ డిక్రీ హౌల్దరు వేలం నిమిత్తం …”.' },
      { token: '[TERMS_YEAR]', label: 'Date Fixed for Settling Terms — Year', type: 'year', prefix: '20' },
      { token: '[TERMS_MONTH]', label: 'Date Fixed for Settling Terms — Month', type: 'text' },
      { token: '[TERMS_DATE]', label: 'Date Fixed for Settling Terms — Day', type: 'text' },
    ],
  },

  // ── Notice U/Cr 21 48 CPC (salary attachment) ─────────────────
  {
    name: 'Notice U/Cr 21 48 CPC)',
    edits: [
      ['in OS/SC&nbsp;', 'in OS/SC&nbsp;[OS_SC_NUMBER]'],
      ['<p>&nbsp;&nbsp;To,</p>', '<p>&nbsp;&nbsp;To,&nbsp;[JDR_ADDRESS]</p>'],
      ['appear before this court on&nbsp;', 'appear before this court on&nbsp;[APPEAR_DATE]'],
      ['seal of the court this the</p>', 'seal of the court this the&nbsp;[DAY]</p>'],
    ],
    fields: [
      { token: '[OS_SC_NUMBER]', label: 'O.S. / S.C. Number (the main case)', type: 'text' },
      { token: '[JDR_ADDRESS]', label: 'Address of the Judgement Debtor', type: 'textarea',
        hint: 'The “To,” block — where this notice is to be served.' },
      { token: '[APPEAR_DATE]', label: 'Date to Appear and State Objections', type: 'date' },
    ],
  },

  // ── Notice (I.A. / Original Suit) ─────────────────────────────
  {
    name: 'Notice (I.A. / Original Suit)',
    edits: [
      ['Original Suit No.&nbsp;', 'Original Suit No.&nbsp;[OS_NUMBER]'],
      ['<p>Sri,</p>', '<p>Sri,&nbsp;[RESPONDENT_ADVOCATE]</p>'],
      ['is posted to for your notice', 'is posted to&nbsp;[POSTED_TO_DATE] for your notice'],
    ],
    fields: [
      { token: '[OS_NUMBER]', label: 'Original Suit Number', type: 'text', printedLabel: 'No.' },
      { token: '[RESPONDENT_ADVOCATE]', label: 'Respondent’s Advocate', type: 'text', printedLabel: 'Sri',
        hint: 'The advocate this notice is addressed to.' },
      { token: '[POSTED_TO_DATE]', label: 'Date the Petition is Posted To', type: 'date' },
    ],
  },

  // ── Petition U/Sec. 279/355 BNSS-2023 (STC/C.C/S.C.) ──────────
  // The transcription baked 2024 into the case line and both date lines; those
  // are switched to the autofilled year so the form does not go stale.
  {
    name: 'Petition Filed U/Sec. 279/355 of BNSS-2023 (STC/C.C/S.C.)',
    edits: [
      ['/2024', '/202[YEAR_LAST]', 2],
      ['-2024', '-202[YEAR_LAST]', 2],
      ['STC/C.C/S.C. No.&nbsp;', 'STC/C.C/S.C. No.&nbsp;[MAIN_CASE_NUMBER]'],
      ['SC/CC/STC. No.&nbsp;', 'SC/CC/STC. No.&nbsp;[MAIN_CASE_NUMBER]'],
      ['Hon\'ble Court today due to</p>', 'Hon\'ble Court today due to&nbsp;[REASON_FOR_ABSENCE]</p>'],
      ['<p style="margin-left:46%;"><strong>IN THE COURT OF THE</strong></p>',
       '<p style="margin-left:46%;"><strong>IN THE COURT OF THE</strong> [COURT_NAME]</p>'],
    ],
    fields: [
      { token: '[MAIN_CASE_NUMBER]', label: 'STC / C.C. / S.C. Number (the main case)', type: 'text', printedLabel: 'No.',
        hint: 'The case this petition is filed in, not the Crl. M.P. number.' },
      { token: '[REASON_FOR_ABSENCE]', label: 'Reason the Petitioner Cannot Attend', type: 'textarea' },
    ],
  },

  // ── NI Act Summons, Form I (S.138) ────────────────────────────
  // Under Meters & Instruments the accused can avoid appearing by depositing
  // the cheque amount, so the form carries a deposit route: amount, deadline,
  // the complainant's bank account and e-mail.
  {
    name: 'Propfarma of NI Act Cases Summons — Form I (Summons to an Accused Person)',
    edits: [
      ['before the.', 'before the&nbsp;[MAGISTRATE_COURT].'],
      ['on the day of.', 'on the day of&nbsp;[HEARING_MONTH].'],
      ['not appear before this court on.', 'not appear before this court on&nbsp;[NO_APPEAR_DATE].'],
      ['amount of Rs. by (Date)', 'amount of Rs.&nbsp;[DEPOSIT_AMOUNT] by (Date)'],
      ['by (Date).', 'by (Date)&nbsp;[DEPOSIT_BY_DATE].'],
      ['complaint\'s (Name)', 'complaint\'s (Name)&nbsp;[COMPLAINANT_BANK_NAME]'],
      ['bank Account bearing No.', 'bank Account bearing No.&nbsp;[BANK_ACCOUNT_NUMBER]'],
      ['tostated amount of Rs.&nbsp;', 'tostated amount of Rs.&nbsp;[STATED_AMOUNT]'],
      ['complaint E-mail ID&nbsp;', 'complaint E-mail ID&nbsp;[COMPLAINANT_EMAIL]'],
    ],
    repairs: [
      // Same flush-token repair: "Rs.5000", "before theII Addl. JCJ".
      ['before the[MAGISTRATE_COURT]', 'before the&nbsp;[MAGISTRATE_COURT]'],
      ['day of[HEARING_MONTH]', 'day of&nbsp;[HEARING_MONTH]'],
      ['court on[NO_APPEAR_DATE]', 'court on&nbsp;[NO_APPEAR_DATE]'],
      ['Rs.[DEPOSIT_AMOUNT]', 'Rs.&nbsp;[DEPOSIT_AMOUNT]'],
      ['(Date)[DEPOSIT_BY_DATE]', '(Date)&nbsp;[DEPOSIT_BY_DATE]'],
      ['(Name)[COMPLAINANT_BANK_NAME]', '(Name)&nbsp;[COMPLAINANT_BANK_NAME]'],
      ['No.[BANK_ACCOUNT_NUMBER]', 'No.&nbsp;[BANK_ACCOUNT_NUMBER]'],
    ],
    fields: [
      { token: '[MAGISTRATE_COURT]', label: 'Magistrate to Appear Before', type: 'text',
        hint: 'The form prints “Additional Judicial Magistrate of First Class” after this blank.' },
      { token: '[HEARING_MONTH]', label: 'Hearing Date — Day and Month', type: 'text',
        hint: 'Completes “on the day of ___ 202_”.' },
      { token: '[NO_APPEAR_DATE]', label: 'Date Appearance Can Be Avoided By', type: 'date',
        hint: '“You need not appear before this court on ___ if you deposit the amount.”' },
      { token: '[DEPOSIT_AMOUNT]', label: 'Amount to be Deposited', type: 'text', printedLabel: 'Rs.' },
      { token: '[DEPOSIT_BY_DATE]', label: 'Deposit By — Date', type: 'date' },
      { token: '[COMPLAINANT_BANK_NAME]', label: 'Complainant’s Bank Name', type: 'text' },
      { token: '[BANK_ACCOUNT_NUMBER]', label: 'Complainant’s Bank Account Number', type: 'text', printedLabel: 'No.' },
      { token: '[STATED_AMOUNT]', label: 'Stated Amount', type: 'text', printedLabel: 'Rs.' },
      { token: '[COMPLAINANT_EMAIL]', label: 'Complainant’s E-mail ID', type: 'text' },
    ],
  },

])
