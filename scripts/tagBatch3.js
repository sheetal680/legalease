// Phase 2, batch 3 of 6 — tags manual_fields on six templates.
// Usage: node --env-file=.env.local scripts/tagBatch3.js

import { tagBatch } from './lib/tagTemplates.js'

await tagBatch([

  // ── Notice (Hindu Marriage Act, 1955) ─────────────────────────
  // Three separate dates on this form — when the petition was filed, when the
  // respondent must appear, and when the written statement is due — each
  // printed as a "___ day of ___" pair, so each needs two questions.
  {
    name: 'Notice (Hindu Marriage Act, 1955)',
    edits: [
      ['<strong>In the Court of the</strong>&nbsp;', '<strong>In the Court of the</strong> [COURT_NAME]&nbsp;'],
      ['Whereas&nbsp;&nbsp;on the.', 'Whereas&nbsp;&nbsp;on the&nbsp;[FILED_DAY].'],
      ['day of..................202', 'day of&nbsp;[FILED_MONTH]..................202'],
      ['Respondent for.', 'Respondent for&nbsp;[RELIEF_SOUGHT].'],
      ['appear in the Court on the.', 'appear in the Court on the&nbsp;[APPEAR_DAY].'],
      ['day of ........................in the forenoon', 'day of [APPEAR_MONTH]........................in the forenoon'],
      ['on or before the.', 'on or before the&nbsp;[STATEMENT_DAY].'],
      ['day of................&nbsp;', 'day of&nbsp;[STATEMENT_MONTH]...............&nbsp;'],
      // Signing date is today's — autofilled.
      ['Court, this the day of.', 'Court, this the&nbsp;[DAY] day of&nbsp;[MONTH].'],
    ],
    fields: [
      { token: '[FILED_DAY]', label: 'Petition Filed On — Day', type: 'text' },
      { token: '[FILED_MONTH]', label: 'Petition Filed On — Month', type: 'text' },
      { token: '[RELIEF_SOUGHT]', label: 'Relief Sought', type: 'textarea',
        hint: 'The form prints “(Specilty the relief)” after this blank.' },
      { token: '[APPEAR_DAY]', label: 'Respondent to Appear — Day', type: 'text' },
      { token: '[APPEAR_MONTH]', label: 'Respondent to Appear — Month', type: 'text' },
      { token: '[STATEMENT_DAY]', label: 'Written Statement Due — Day', type: 'text' },
      { token: '[STATEMENT_MONTH]', label: 'Written Statement Due — Month', type: 'text' },
    ],
  },

  // ── వకాలత్ / Vakalath (Form No. 121) ───────────────────────────
  // No manual blanks at all: the addressee advocate, the date and the party
  // filed for are all known. Tagged with an empty question list so it is
  // recorded as reviewed rather than merely not looked at yet — the Details
  // page is skipped either way.
  {
    name: 'వకాలత్ / Vakalath (Form No. 121, Rule No. 276-A)',
    edits: [
      ['మహారాజశ్రీ&nbsp;', 'మహారాజశ్రీ&nbsp;[ADVOCATE_NAME]'],
      ['<p>Date.', '<p>Date&nbsp;[DATE].'],
      ['Filed for behalf of the</p>', 'Filed for behalf of the&nbsp;[PARTY_TYPE]</p>'],
    ],
    fields: [],
  },

  // ── Notice (Hindu Marriage Act, 1955) — Nazar printing ────────
  // Same form as above but an older printing: the year slots read "200_", so
  // each date carries its own year question.
  {
    name: 'Notice (Hindu Marriage Act, 1955) - Nazar printing',
    edits: [
      ['<strong>IN THE COURT OF THE</strong>&nbsp;', '<strong>IN THE COURT OF THE</strong> [COURT_NAME]&nbsp;'],
      ['<strong>of</strong> 200</p>', '<strong>of</strong> 200[CASE_YEAR]</p>'],
      ['Whereas on the .', 'Whereas on the&nbsp;[FILED_DAY] .'],
      ['day of ................ 200.', 'day of [FILED_MONTH]................ 200[FILED_YEAR].'],
      ['Respondent for .', 'Respondent for&nbsp;[RELIEF_SOUGHT] .'],
      ['appear in the Court on the .', 'appear in the Court on the&nbsp;[APPEAR_DAY] .'],
      ['day of .................... 200.', 'day of [APPEAR_MONTH].................... 200[APPEAR_YEAR].'],
      ['on or before the .', 'on or before the&nbsp;[STATEMENT_DAY] .'],
      ['day of .............. 200 ', 'day of [STATEMENT_MONTH].............. 200[STATEMENT_YEAR] '],
      // Signing date is today's — autofilled.
      ['Court, this the day of : ', 'Court, this the&nbsp;[DAY] day of&nbsp;[MONTH] : '],
    ],
    fields: [
      { token: '[CASE_YEAR]', label: 'O.P. Year', type: 'year', prefix: '200' },
      { token: '[FILED_DAY]', label: 'Petition Filed On — Day', type: 'text' },
      { token: '[FILED_MONTH]', label: 'Petition Filed On — Month', type: 'text' },
      { token: '[FILED_YEAR]', label: 'Petition Filed On — Year', type: 'year', prefix: '200' },
      { token: '[RELIEF_SOUGHT]', label: 'Relief Sought', type: 'textarea',
        hint: 'The form prints “(Specify the relief)” after this blank.' },
      { token: '[APPEAR_DAY]', label: 'Respondent to Appear — Day', type: 'text' },
      { token: '[APPEAR_MONTH]', label: 'Respondent to Appear — Month', type: 'text' },
      { token: '[APPEAR_YEAR]', label: 'Respondent to Appear — Year', type: 'year', prefix: '200' },
      { token: '[STATEMENT_DAY]', label: 'Written Statement Due — Day', type: 'text' },
      { token: '[STATEMENT_MONTH]', label: 'Written Statement Due — Month', type: 'text' },
      { token: '[STATEMENT_YEAR]', label: 'Written Statement Due — Year', type: 'year', prefix: '200' },
    ],
  },

  // ── Notice O.21 R.54 (1A) — Proclemation of sale printing ─────
  // A second printing of the form tagged in batch 2; same questions.
  {
    name: 'Notice (Order 21 Rule 54 (1A)) - Proclemation of sale printing',
    edits: [
      ['<p style="margin-left:20%;">E.P.&nbsp;', '<p style="margin-left:20%;">E.P.&nbsp;[EP_NUMBER]'],
      ['In O.S&nbsp;', 'In O.S&nbsp;[OS_NUMBER]'],
      ['against you on the</p>', 'against you on the&nbsp;[DECREE_DAY]</p>'],
      ['<p style="margin-left:12%;">day of&nbsp;', '<p style="margin-left:12%;">day of&nbsp;[DECREE_MONTH]'],
      ['in favour of</p>', 'in favour of&nbsp;[DECREE_IN_FAVOUR_OF]</p>'],
      ['for Rs.</p>', 'for Rs.&nbsp;[DECREE_AMOUNT]</p>'],
      ['you the said&nbsp;&nbsp;prohibitedand', 'you the said&nbsp;[CLIENT_NAME_IF_RESPONDENT]&nbsp;prohibitedand'],
      ['should attend Court on the&nbsp;', 'should attend Court on the&nbsp;[ATTEND_DAY]'],
      ['day of&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;202[YEAR_LAST]&nbsp;&nbsp;&nbsp;&nbsp;To take',
       'day of&nbsp;[ATTEND_MONTH]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;202[YEAR_LAST]&nbsp;&nbsp;&nbsp;&nbsp;To take'],
      // Seal date is today's — autofilled.
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

  // ── Petition u/s. 317 / 256 of Cr. P.C. ───────────────────────
  // Same shape as the BNSS dispense-with-attendance petitions: the underlying
  // case number, and why the petitioner cannot attend.
  {
    name: 'Petition Filed u/s. 317 / 256 of Cr. P.C.',
    edits: [
      ['<p style="margin-left:14%;">No.&nbsp;', '<p style="margin-left:14%;">No.&nbsp;[MAIN_CASE_NUMBER]'],
      ['<p style="margin-left:48%;">No.&nbsp;', '<p style="margin-left:48%;">No.&nbsp;[MAIN_CASE_NUMBER]'],
      ['Hon\'ble Court to day due to</p>', 'Hon\'ble Court to day due to&nbsp;[REASON_FOR_ABSENCE]</p>'],
      ['<p>Place :</p>', '<p>Place :&nbsp;[PLACE]</p>'],
    ],
    fields: [
      { token: '[MAIN_CASE_NUMBER]', label: 'Main Case Number', type: 'text', printedLabel: 'No.',
        hint: 'The case this petition sits inside, not the Cril. M.P. number.' },
      { token: '[REASON_FOR_ABSENCE]', label: 'Reason the Petitioner Cannot Attend', type: 'textarea' },
      { token: '[PLACE]', label: 'Place', type: 'text', printedLabel: 'Place' },
    ],
  },

  // ── సాక్షి సమను / Witness Summons (O.16 rr.1, 5) ───────────────
  // Addressed to the witness, not to a party, so the addressee is asked for.
  // Telugu order: "202_ సంవత్సరం [month] నెల [date] తేదీన".
  {
    name: 'సాక్షి సమను / Witness Summons (Order 16, Rules 1 and 5)',
    edits: [
      ['మహారాజశ్రీ&nbsp;', 'మహారాజశ్రీ&nbsp;[WITNESS_NAME]'],
      ['<strong>O.S.C.</strong>.', '<strong>O.S.C.</strong>&nbsp;[OSC_NUMBER].'],
      ['సంవత్సరం .', 'సంవత్సరం [ATTEND_MONTH].'],
      ['నెల.... ', 'నెల&nbsp;[ATTEND_DATE].... '],
      ['భత్యం.', 'భత్యం&nbsp;[DAILY_ALLOWANCE].'],
      ['వీలుగాను .', 'వీలుగాను [TOTAL_AMOUNT].'],
    ],
    fields: [
      { token: '[WITNESS_NAME]', label: 'Witness — Name and Address', type: 'textarea',
        hint: 'Who this summons is addressed to.' },
      { token: '[OSC_NUMBER]', label: 'O.S.C. Number', type: 'text', printedLabel: 'O.S.C.' },
      { token: '[ATTEND_MONTH]', label: 'Date to Attend — Month (Telugu)', type: 'text' },
      { token: '[ATTEND_DATE]', label: 'Date to Attend — Day (Telugu)', type: 'text' },
      { token: '[DAILY_ALLOWANCE]', label: 'Daily Allowance (భత్యం)', type: 'text' },
      { token: '[TOTAL_AMOUNT]', label: 'Total Amount Sent (రూపాయలు)', type: 'text' },
    ],
  },

])
