// Phase 2, batch 1 of 6 — tags manual_fields on six templates.
// Usage: node --env-file=.env.local scripts/tagBatch1.js
//
// See scripts/lib/tagTemplates.js for the conventions and the safety checks.

import { tagBatch } from './lib/tagTemplates.js'

await tagBatch([

  // ── High Court Vakalatnama ────────────────────────────────────
  // Two case numbers: the High Court's own, and the lower court matter it is
  // filed AGAINST. Only the first is autofilled from the client record.
  {
    name: 'High Court Vakalatnama (Andhra Pradesh, Amaravati)',
    edits: [
      ['of 202</p><p style="text-align:center;">AGAINST',
       'of 202[CASE_YEAR]</p><p style="text-align:center;">AGAINST'],
      ['AGAINST</p><p style="text-align:center;">No.&nbsp;',
       'AGAINST</p><p style="text-align:center;">No.&nbsp;[AGAINST_CASE_NUMBER]'],
      ['of 202</p><p style="text-align:right;"><u>Petitioner(s)</u>',
       'of 202[AGAINST_CASE_YEAR]</p><p style="text-align:right;"><u>Petitioner(s)</u>'],
      ['<p>I/We</p><p>&nbsp;', '<p>I/We</p><p>[EXECUTANT_NAME]&nbsp;'],
      ['</u>to the executant', '[EXPLAINED_IN_LANGUAGE]&nbsp;</u>to the executant'],
      ['<p>S.R.No.</p>', '<p>S.R.No.&nbsp;[SR_NUMBER]</p>'],
      ['<p style="text-align:right;">DISTRICT</p>',
       '<p style="text-align:right;">[HC_DISTRICT]&nbsp;DISTRICT</p>'],
      ['of 202</p><p>&nbsp;</p><p>&nbsp;</p><h2',
       'of 202[CASE_YEAR]</p><p>&nbsp;</p><p>&nbsp;</p><h2'],
    ],
    repairs: [
      // Was flush against the following words: "Teluguto the executant".
      ['[EXPLAINED_IN_LANGUAGE]</u>', '[EXPLAINED_IN_LANGUAGE]&nbsp;</u>'],
    ],
    fields: [
      { token: '[CASE_YEAR]', label: 'Case Year', type: 'year', prefix: '202' },
      { token: '[AGAINST_CASE_NUMBER]', label: 'Lower Court Case Number (appealed against)', type: 'text', printedLabel: 'No.' },
      { token: '[AGAINST_CASE_YEAR]', label: 'Lower Court Case Year', type: 'year', prefix: '202' },
      { token: '[EXECUTANT_NAME]', label: 'Name of the Person Signing the Vakalat', type: 'textarea',
        hint: 'The “I/We” line — the client or clients executing this vakalat.' },
      { token: '[EXPLAINED_IN_LANGUAGE]', label: 'Language the Vakalat was Explained In', type: 'text',
        hint: 'For example Telugu.' },
      { token: '[SR_NUMBER]', label: 'S.R. Number', type: 'text', printedLabel: 'S.R.No.' },
      { token: '[HC_DISTRICT]', label: 'District', type: 'text', printedLabel: 'DISTRICT' },
    ],
  },

  // ── Summons to Accused Person (S.68 Cri. Pro. Code) ───────────
  {
    name: 'Summons to Accused Person (Section 68 Cri. Pro. Code)',
    edits: [
      ['</u>of 202', '</u>of 202[CASE_YEAR]'],
      ['<p>To</p>', '<p>To&nbsp;[ACCUSED_ADDRESS]</p>'],
      ['necessary to the charge U/Sec.', 'necessary to the charge U/Sec.&nbsp;[CHARGE_SECTION]'],
      ['appear in person before.', 'appear in person before&nbsp;[APPEAR_BEFORE].'],
    ],
    fields: [
      { token: '[CASE_YEAR]', label: 'Case Year', type: 'year', prefix: '202' },
      { token: '[ACCUSED_ADDRESS]', label: 'Address of the Accused', type: 'textarea',
        hint: 'The “To” block — where the summons is to be served.' },
      { token: '[CHARGE_SECTION]', label: 'Charge — Section', type: 'text', printedLabel: 'U/Sec.',
        hint: 'The form prints “of I.P.C. / 138 of NI ACT” after this blank.' },
      { token: '[APPEAR_BEFORE]', label: 'Appear Before (Magistrate / Court)', type: 'text' },
    ],
  },

  // ── Summons (O. 5, RR 1, 5 C.P.C.) ────────────────────────────
  // Sparse by design: almost every blank on this form is autofilled.
  {
    name: 'Summons (O. 5, RR 1, 5 C.P.C.)',
    edits: [
      ['&nbsp;of 202</p>', '&nbsp;of 202[CASE_YEAR]</p>'],
      ['day of 202&nbsp;', 'day of 202[HEARING_YEAR]&nbsp;'],
    ],
    fields: [
      { token: '[CASE_YEAR]', label: 'Suit Year', type: 'year', prefix: '202' },
      { token: '[HEARING_YEAR]', label: 'Hearing Year', type: 'year', prefix: '202',
        hint: 'The year the defendant is summoned to appear.' },
    ],
  },

  // ── Surety Memo ───────────────────────────────────────────────
  // "SURETIES" is followed by two numbered signing lines, 1) and (2).
  {
    name: 'Surety Memo',
    edits: [
      ['<p>Offence under Section</p>', '<p>Offence under Section&nbsp;[OFFENCE_SECTION]</p>'],
      ['1)</p>', '1)&nbsp;[SURETY_1]</p>'],
      ['(2)</p>', '(2)&nbsp;[SURETY_2]</p>'],
    ],
    fields: [
      { token: '[OFFENCE_SECTION]', label: 'Offence — Section', type: 'text', printedLabel: 'Section' },
      { token: '[SURETY_1]', label: 'First Surety — Name', type: 'text' },
      { token: '[SURETY_2]', label: 'Second Surety — Name', type: 'text' },
    ],
  },

  // ── Petition U/Sec. 279/355 of BNSS-2023 ──────────────────────
  // The CC / MC number is the underlying matter this Crl. M.P. sits inside,
  // so it is not the case number on the client record. It appears on both the
  // petition and the endorsement sheet — one question fills both.
  {
    name: 'Petition Filed U/Sec. 279/355 of BNSS-2023',
    edits: [
      // Once on the petition, once on the endorsement sheet.
      ['CC / MC No.&nbsp;', 'CC / MC No.&nbsp;[MAIN_CASE_NUMBER]', 2],
      ['Hon\'ble Court today due to</p>', 'Hon\'ble Court today due to&nbsp;[REASON_FOR_ABSENCE]</p>'],
      ['<strong>IN THE COURT OF THE</strong>', '<strong>IN THE COURT OF THE</strong> [COURT_NAME]'],
    ],
    fields: [
      { token: '[MAIN_CASE_NUMBER]', label: 'CC / MC Number (the main case)', type: 'text', printedLabel: 'No.',
        hint: 'The case this petition is filed in, not the Crl. M.P. number.' },
      { token: '[REASON_FOR_ABSENCE]', label: 'Reason the Petitioner Cannot Attend', type: 'textarea' },
    ],
  },

  // ── నోటీసు (Notice) ────────────────────────────────────────────
  // Header reads "___ /A ___ /202_ IN ___ S No. ___ /202_". Only the I.A.
  // number is manual; the suit number and both years already autofill.
  {
    name: 'నోటీసు (Notice)',
    edits: [
      ['/ A&nbsp;', '/ A&nbsp;[IA_NUMBER]'],
      ['సం.&nbsp;', 'సం.&nbsp;[HEARING_MONTH]'],
      ['నెల&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;తేది ', 'నెల&nbsp;[HEARING_DATE]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;తేది '],
      // The signing date is today's — autofilled, not asked about.
      ['సం||&nbsp;', 'సం||&nbsp;[MONTH]'],
      ['నెల&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;తేదీన', 'నెల&nbsp;[DAY]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;తేదీన'],
    ],
    fields: [
      { token: '[IA_NUMBER]', label: 'I.A. Number', type: 'text' },
      { token: '[HEARING_MONTH]', label: 'Objection Hearing — Month (Telugu)', type: 'text',
        hint: 'Completes “202_ సం. ___ నెల ___ తేది” — the date by which objections must be raised.' },
      { token: '[HEARING_DATE]', label: 'Objection Hearing — Date (Telugu)', type: 'text' },
    ],
  },

])
