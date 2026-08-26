// Phase 2, batch 6 of 6 — the last two templates.
// Usage: node --env-file=.env.local scripts/tagBatch6.js

import { tagBatch } from './lib/tagTemplates.js'

const sp = n => '&nbsp;'.repeat(n)

await tagBatch([

  // ── Memo of Appearance (Criminal) ─────────────────────────────
  // The same form as the bail memo tagged in Phase 1, without the
  // verification section, so it carries the same four questions.
  {
    name: 'Memo of Appearance (Criminal)',
    edits: [
      ['residing at', 'residing at&nbsp;[ACCUSED_ADDRESS]'],
      ['in Crime No', 'in Crime No&nbsp;[CRIME_NUMBER]'],
      ['<p>202', '<p>202[CRIME_YEAR]'],
      ['of P.S.', 'of P.S.&nbsp;[POLICE_STATION]'],
      ['<strong>Mr.</strong>', '<strong>Mr.</strong>&nbsp;[ADVOCATE_NAME]'],
      ['<em>For</em>', '<em>For</em>&nbsp;[CLIENT_NAME]'],
    ],
    fields: [
      { token: '[ACCUSED_ADDRESS]', label: 'Address of the Accused / Person Interested', type: 'textarea' },
      { token: '[CRIME_NUMBER]', label: 'Crime Number', type: 'text', printedLabel: 'Crime No' },
      { token: '[CRIME_YEAR]', label: 'Crime Year', type: 'year', prefix: '202' },
      { token: '[POLICE_STATION]', label: 'Police Station', type: 'text', printedLabel: 'P.S.' },
    ],
  },

  // ── Petition to Number Out of Order (r.57 C.R.P.) ─────────────
  // The affidavit is sworn by the petitioner personally rather than by an
  // advocate's clerk, so it asks for their name, parentage, age, religion and
  // address. The I.A. and O.S. numbers each appear on three of the four pages.
  {
    name: 'Petition to Number Out of Order under Rule 57 C.R.P. (with Affidavit u/s 139 C.P.C.)',
    edits: [
      [`<p style="margin-left:46%;">I.A.${sp(20)}of / 202[YEAR_LAST]</p>`,
       `<p style="margin-left:46%;">I.A.&nbsp;[IA_NUMBER]${sp(19)}of / 202[YEAR_LAST]</p>`],
      [`<p style="margin-left:46%;">O.s.${sp(20)}of / 202[YEAR_LAST]</p>`,
       `<p style="margin-left:46%;">O.s.&nbsp;[OS_NUMBER]${sp(19)}of / 202[YEAR_LAST]</p>`],
      [`I.A.${sp(8)}of / 202[YEAR_LAST]</p>`, `I.A.&nbsp;[IA_NUMBER]${sp(7)}of / 202[YEAR_LAST]</p>`],
      [`<p style="margin-left:64%;">O.s.${sp(8)}of / 202[YEAR_LAST]</p>`,
       `<p style="margin-left:64%;">O.s.&nbsp;[OS_NUMBER]${sp(7)}of / 202[YEAR_LAST]</p>`],
      [`<p style="margin-left:52%;">I.A.${sp(20)}of</p>`,
       `<p style="margin-left:52%;">I.A.&nbsp;[IA_NUMBER]${sp(19)}of</p>`],
      [`<p style="margin-left:52%;">O S.${sp(20)}of</p>`,
       `<p style="margin-left:52%;">O S.&nbsp;[OS_NUMBER]${sp(19)}of</p>`],
      [`<p>${sp(8)}I&nbsp;`, `<p>${sp(8)}I&nbsp;[DEPONENT_NAME]`],
      ['Son of</p>', 'Son of&nbsp;[DEPONENT_FATHER]</p>'],
      [`<p>age${sp(14)}Years${sp(10)}by Religion, residing at</p>`,
       `<p>age&nbsp;[DEPONENT_AGE]${sp(13)}Years&nbsp;[DEPONENT_RELIGION]${sp(9)}by Religion, residing at&nbsp;[DEPONENT_ADDRESS]</p>`],
      ['Honourable court for</p>', 'Honourable court for&nbsp;[CASE_FILED_FOR]</p>'],
      ['interests of Justice&nbsp;', 'interests of Justice&nbsp;[URGENCY_REASON]'],
      ['<p>Place :&nbsp;', '<p>Place :&nbsp;[PLACE]'],
      ['<p>Place :</p>', '<p>Place :&nbsp;[PLACE]</p>'],
      // The attestation date is today's; the printed "202-" takes the
      // autofilled trailing digit.
      [`before me this the${sp(20)}day of${sp(12)}202-`,
       `before me this the&nbsp;[DAY]${sp(19)}day of&nbsp;[MONTH]${sp(11)}202[YEAR_LAST]`],
    ],
    fields: [
      { token: '[IA_NUMBER]', label: 'I.A. Number', type: 'text', printedLabel: 'I.A.',
        hint: 'Appears on the affidavit, the petition and the cover sheet.' },
      { token: '[OS_NUMBER]', label: 'O.S. Number', type: 'text', printedLabel: 'O.S.' },
      { token: '[DEPONENT_NAME]', label: 'Deponent — Name', type: 'text',
        hint: 'The petitioner swears this affidavit personally.' },
      { token: '[DEPONENT_FATHER]', label: 'Deponent — Father’s Name', type: 'text', printedLabel: 'Son of' },
      { token: '[DEPONENT_AGE]', label: 'Deponent — Age', type: 'number', printedLabel: 'Years' },
      { token: '[DEPONENT_RELIGION]', label: 'Deponent — Religion', type: 'text', printedLabel: 'by Religion' },
      { token: '[DEPONENT_ADDRESS]', label: 'Deponent — Address', type: 'textarea' },
      { token: '[CASE_FILED_FOR]', label: 'What the Case was Filed For', type: 'textarea',
        hint: 'Completes “I have filed the above named case in this Honourable court for ___”.' },
      { token: '[URGENCY_REASON]', label: 'Why Urgent Orders are Needed', type: 'textarea' },
      { token: '[PLACE]', label: 'Place', type: 'text', printedLabel: 'Place',
        hint: 'Appears on both the affidavit and the petition.' },
    ],
  },

])
