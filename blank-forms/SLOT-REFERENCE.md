# Blank forms — slot reference

One row per numbered blank. The number in brackets on the printed sheet —
`(1)`, `(2)`, … — is the **slot no** column here. Numbering restarts at 1 for
each form.

| fill type | meaning |
|---|---|
| **AUTOFILLED** | the app fills it from stored client or advocate data |
| **MANUAL QUESTION** | the advocate is asked for it on the Template Details step |
| **NO SOURCE** | a token with nothing behind it — the app renders it empty |

**59 forms · 88 pages · 666 numbered slots**

- AUTOFILLED: 438
- MANUAL QUESTION: 228
- NO SOURCE: 0
- questions asked but not placed in any form: 1

## 1. Affidavit of Service by Post (Supreme Court, Form 21)

`01-Affidavit-of-Service-by-Post-Supreme-Court-Form-21.pdf` · 1 page · Supreme Court

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (2) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (3) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (4) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (5) | `[ADVOCATE_NAME]` | AUTOFILLED | Advocate — full name |
| (6) | `[ADVOCATE_ADDRESS]` | AUTOFILLED | Advocate — address |
| (7) | `[COURT_PLACE]` | AUTOFILLED | Client — court place |
| (8) | `[DAY]` | AUTOFILLED | Today — day of month |
| (9) | `[MONTH]` | AUTOFILLED | Today — month name |
| (10) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |

## 2. Affidavit of Service of Summons (Supreme Court, Form 20)

`02-Affidavit-of-Service-of-Summons-Supreme-Court-Form-20.pdf` · 1 page · Supreme Court

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (2) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (3) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (4) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (5) | `[ADVOCATE_NAME]` | AUTOFILLED | Advocate — full name |
| (6) | `[ADVOCATE_ADDRESS]` | AUTOFILLED | Advocate — address |
| (7) | `[COURT_PLACE]` | AUTOFILLED | Client — court place |
| (8) | `[DAY]` | AUTOFILLED | Today — day of month |
| (9) | `[MONTH]` | AUTOFILLED | Today — month name |
| (10) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |

## 3. Appearance Slip (Supreme Court, Form 30)

`03-Appearance-Slip-Supreme-Court-Form-30.pdf` · 1 page · Supreme Court

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[HEARING_DATE]` | MANUAL QUESTION | Date of Listing |
| (2) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (3) | `[ADVOCATE_NAME]` | AUTOFILLED | Advocate — full name |

## 4. Application for Adjournment (Delhi High Court)

`04-Application-for-Adjournment-Delhi-High-Court.pdf` · 1 page · High Court

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (2) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (3) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |

## 5. Application for Certified Copy (Delhi High Court)

`05-Application-for-Certified-Copy-Delhi-High-Court.pdf` · 2 pages · High Court · _page break added: the form is taller than one sheet_

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (2) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |

## 6. Application for Inspection of File (Delhi High Court)

`06-Application-for-Inspection-of-File-Delhi-High-Court.pdf` · 1 page · High Court

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (2) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (3) | `[DATE]` | AUTOFILLED | Today's date |
| (4) | `[ADVOCATE_ADDRESS]` | AUTOFILLED | Advocate — address |

## 7. Application for Supply of Digital Copy (Delhi High Court)

`07-Application-for-Supply-of-Digital-Copy-Delhi-High-Court.pdf` · 1 page · High Court

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[DATE]` | AUTOFILLED | Today's date |

## 8. Application for Uncertified Copy of Order (Delhi High Court)

`08-Application-for-Uncertified-Copy-of-Order-Delhi-High-Court.pdf` · 1 page · High Court

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (2) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (3) | `[ADVOCATE_NAME]` | AUTOFILLED | Advocate — full name |
| (4) | `[DATE]` | AUTOFILLED | Today's date |

## 9. Attachment in Execution - Prohibitory Order, Immovable Property (Order 21, Rule 54)

`09-Attachment-in-Execution-Prohibitory-Order-Immovable-Property-Order-21-Rule-54.pdf` · 1 page · District & Subordinate

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (2) | `[EP_NUMBER]` | MANUAL QUESTION | E.P. Number |
| (3) | `[EP_YEAR]` | MANUAL QUESTION | E.P. Year |
| (4) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (5) | `[OS_YEAR]` | MANUAL QUESTION | O.S. Year |
| (6) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (7) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (8) | `[DECREE_DAY]` | MANUAL QUESTION | Decree Date — Day |
| (9) | `[DECREE_MONTH]` | MANUAL QUESTION | Decree Date — Month |
| (10) | `[DECREE_YEAR]` | MANUAL QUESTION | Decree Date — Year |
| (11) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (12) | `[OS_YEAR]` | MANUAL QUESTION | O.S. Year |
| (13) | `[DECREE_IN_FAVOUR_OF]` | MANUAL QUESTION | Decree in Favour Of |
| (14) | `[DECREE_AMOUNT]` | MANUAL QUESTION | Decree Amount |
| (15) | `[ATTEND_DAY]` | MANUAL QUESTION | Date to Attend Court — Day |
| (16) | `[ATTEND_MONTH]` | MANUAL QUESTION | Date to Attend Court — Month |
| (17) | `[ATTEND_YEAR]` | MANUAL QUESTION | Date to Attend Court — Year |
| (18) | `[DAY]` | AUTOFILLED | Today — day of month |
| (19) | `[MONTH]` | AUTOFILLED | Today — month name |
| (20) | `[YEAR]` | AUTOFILLED | Today — 4-digit year |

## 10. Caveat (Delhi High Court)

`10-Caveat-Delhi-High-Court.pdf` · 1 page · High Court

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (2) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (3) | `[DATE]` | AUTOFILLED | Today's date |

## 11. Costs Memo and Fees Certificate

`11-Costs-Memo-and-Fees-Certificate.pdf` · 1 page · District & Subordinate

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (2) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (3) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (4) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (5) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (6) | `[PARTY_TYPE]` | AUTOFILLED | Client — party type (Plaintiff / Defendant) |
| (7) | `[COST_VAKALAT]` | MANUAL QUESTION | Vakalat |
| (8) | `[COST_WELFARE_FUND]` | MANUAL QUESTION | Advocate Welfare Fund |
| (9) | `[COST_PLAINT_FEES]` | MANUAL QUESTION | Plaint Fees |
| (10) | `[COST_PETITION_STAMP]` | MANUAL QUESTION | Petition Stamp |
| (11) | `[COST_PROCESS]` | MANUAL QUESTION | Process |
| (12) | `[COST_WITNESS_BATA]` | MANUAL QUESTION | Witness Bata |
| (13) | `[COST_PENALTY_STAMP]` | MANUAL QUESTION | Stamp for Penalty |
| (14) | `[COST_COURT_FEE_DOCUMENT]` | MANUAL QUESTION | Court Fee Affixed on Document |
| (15) | `[COST_COMMISSIONER]` | MANUAL QUESTION | Commissioner Fees |
| (16) | `[COST_PLEADERS_FEES]` | MANUAL QUESTION | Pleaders Fees |
| (17) | `[COST_PUBLICATION]` | MANUAL QUESTION | Publication Charges |
| (18) | `[COST_COURT_GUARDIAN]` | MANUAL QUESTION | Court Guardian Fees |
| (19) | `[COST_WRITING]` | MANUAL QUESTION | Writing Charges |
| (20) | `[COST_TYPE]` | MANUAL QUESTION | Type Charges |
| (21) | `[PARTY_TYPE]` | AUTOFILLED | Client — party type (Plaintiff / Defendant) |
| (22) | `[FEES_RECEIVED]` | MANUAL QUESTION | Fees Received |
| (23) | `[FEES_FROM]` | MANUAL QUESTION | Fees Received From |
| (24) | `[ADVOCATE_NAME]` | AUTOFILLED | Advocate — full name |

## 12. Execution Petition under Order 21, Rule II, Clause I - filed by the Decree Holder

`12-Execution-Petition-under-Order-21-Rule-II-Clause-I-filed-by-the-Decree-Holder.pdf` · 4 pages · District & Subordinate

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (2) | `[EP_NUMBER]` | MANUAL QUESTION | E.P. Number |
| (3) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (4) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (5) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (6) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (7) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (8) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (9) | `[DATE_OF_DECREE]` | MANUAL QUESTION | 4. Date of Decree |
| (10) | `[APPEAL_PREFERRED]` | MANUAL QUESTION | 5. Whether any Appeal Preferred from Decree |
| (11) | `[PREVIOUS_APPLICATION]` | MANUAL QUESTION | 6. Previous Application, with Date and Result |
| (12) | `[PAYMENT_ADJUSTMENT]` | MANUAL QUESTION | 7. Payment or Adjustment, if any |
| (13) | `[DECREE_TRANSFERRED]` | MANUAL QUESTION | 8. Whether Decree Transferred or Not |
| (14) | `[AMOUNT_RS]` | MANUAL QUESTION | 9. Amount Due — Rupees |
| (15) | `[AMOUNT_PS]` | MANUAL QUESTION | 9. Amount Due — Paise |
| (16) | `[DECREE_AMOUNT]` | MANUAL QUESTION | 9. Decree Amount |
| (17) | `[SUBSEQUENT_INTEREST]` | MANUAL QUESTION | 9. Subsequent Interest |
| (18) | `[INTEREST_FROM]` | MANUAL QUESTION | 9. Interest From |
| (19) | `[INTEREST_TO]` | MANUAL QUESTION | 9. Interest To |
| (20) | `[INTEREST_RATE]` | MANUAL QUESTION | 9. Interest Rate |
| (21) | `[COST_RS]` | MANUAL QUESTION | 10. Cost Awarded — Rupees |
| (22) | `[COST_PS]` | MANUAL QUESTION | 10. Cost Awarded — Paise |
| (23) | `[COST_AWARDED]` | MANUAL QUESTION | 10. Cost Awarded in the Decree |
| (24) | `[AGAINST_WHOM]` | MANUAL QUESTION | 11. Against Whom to be Executed |
| (25) | `[MODE_OF_ASSISTANCE]` | MANUAL QUESTION | 12. Mode in which the Court’s Assistance is Required |
| (26) | `[STATION]` | MANUAL QUESTION | Station |
| (27) | `[DATE]` | AUTOFILLED | Today's date |
| (28) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (29) | `[EP_NUMBER]` | MANUAL QUESTION | E.P. Number |
| (30) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |

## 13. F. No 7-A - Attachment of immovable Property before Judgement (Order 38, Rule 5 C.P.C.)

`13-F-No-7-A-Attachment-of-immovable-Property-before-Judgement-Order-38-Rule-5-C-P-C.pdf` · 1 page · District & Subordinate

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (2) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (3) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (4) | `[DEFENDANT_ADDRESS]` | MANUAL QUESTION | Address of the Defendant |
| (5) | `[CALLED_UPON_DATE]` | MANUAL QUESTION | Date the Court Called Upon the Defendant |
| (6) | `[WARRANT_AMOUNT]` | MANUAL QUESTION | Warrant Amount |
| (7) | `[HEARING_DATE]` | MANUAL QUESTION | Hearing Date — Day and Month |
| (8) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (9) | `[DAY]` | AUTOFILLED | Today — day of month |
| (10) | `[MONTH]` | AUTOFILLED | Today — month name |
| (11) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |

## 14. Form for Interlocutory Applications (Delhi High Court)

`14-Form-for-Interlocutory-Applications-Delhi-High-Court.pdf` · 1 page · High Court

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (2) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |

## 15. Form for Urgent (Mentioning) Cases for Listing (Delhi High Court)

`15-Form-for-Urgent-Mentioning-Cases-for-Listing-Delhi-High-Court.pdf` · 2 pages · High Court · _page break added: the form is taller than one sheet_

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (2) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (3) | `[ADVOCATE_NAME]` | AUTOFILLED | Advocate — full name |
| (4) | `[BAR_NUMBER]` | AUTOFILLED | Advocate — bar council number |
| (5) | `[ADVOCATE_ADDRESS]` | AUTOFILLED | Advocate — address |
| (6) | `[ADVOCATE_PHONE]` | AUTOFILLED | Advocate — phone |
| (7) | `[DATE]` | AUTOFILLED | Today's date |

**Questions asked but never placed in this form** — the advocate is prompted
for these on Template Details, yet the token appears nowhere in the document,
so the answer is collected and then dropped:

- `[URGENCY_GROUNDS]` — Grounds for Urgency and Nature of Relief Sought

## 16. Form No. 11 (Rule 15) - Notice in the matter of the Marriage Act

`16-Form-No-11-Rule-15-Notice-in-the-matter-of-the-Marriage-Act.pdf` · 2 pages · Family Court + District & Subordinate · _page break added: the form is taller than one sheet_

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (2) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (3) | `[PRESENTED_ON]` | MANUAL QUESTION | Petition Presented On |
| (4) | `[FILED_ON]` | MANUAL QUESTION | Petition Filed On |
| (5) | `[NOTICE_ISSUED_ON]` | MANUAL QUESTION | Notice Issued On |
| (6) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (7) | `[PETITION_DAY]` | MANUAL QUESTION | Petition Filed — Day |
| (8) | `[PETITION_MONTH]` | MANUAL QUESTION | Petition Filed — Month |
| (9) | `[PETITION_YEAR]` | MANUAL QUESTION | Petition Filed — Year |
| (10) | `[RELIEF_SOUGHT]` | MANUAL QUESTION | Relief Sought |
| (11) | `[APPEAR_DAY]` | MANUAL QUESTION | Respondent to Appear — Day |
| (12) | `[APPEAR_MONTH]` | MANUAL QUESTION | Respondent to Appear — Month |
| (13) | `[APPEAR_YEAR]` | MANUAL QUESTION | Respondent to Appear — Year |
| (14) | `[STATEMENT_DAY]` | MANUAL QUESTION | Return Statement Due — Day |
| (15) | `[STATEMENT_MONTH]` | MANUAL QUESTION | Return Statement Due — Month |
| (16) | `[STATEMENT_YEAR]` | MANUAL QUESTION | Return Statement Due — Year |
| (17) | `[DAY]` | AUTOFILLED | Today — day of month |
| (18) | `[MONTH]` | AUTOFILLED | Today — month name |
| (19) | `[YEAR]` | AUTOFILLED | Today — 4-digit year |

## 17. Form No. 51 (Rule 128 C.R.P.) - Application for Certified Copies

`17-Form-No-51-Rule-128-C-R-P-Application-for-Certified-Copies.pdf` · 2 pages · District & Subordinate

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (2) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (3) | `[SUIT_YEAR]` | MANUAL QUESTION | Suit Year |
| (4) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (5) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (6) | `[CLIENT_NAME]` | AUTOFILLED | Client — full name |
| (7) | `[URGENCY_REASON]` | MANUAL QUESTION | Why the Copies are Urgently Required |
| (8) | `[DOCUMENTS_REQUESTED]` | MANUAL QUESTION | Documents Requested |
| (9) | `[DAY]` | AUTOFILLED | Today — day of month |
| (10) | `[MONTH]` | AUTOFILLED | Today — month name |
| (11) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (12) | `[PARTY_TYPE]` | AUTOFILLED | Client — party type (Plaintiff / Defendant) |
| (13) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (14) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (15) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (16) | `[FILED_ON]` | MANUAL QUESTION | Filed On |
| (17) | `[ADVOCATE_NAME]` | AUTOFILLED | Advocate — full name |
| (18) | `[ADVOCATE_ADDRESS]` | AUTOFILLED | Advocate — address |

## 18. High Court Vakalatnama (Andhra Pradesh, Amaravati)

`18-High-Court-Vakalatnama-Andhra-Pradesh-Amaravati.pdf` · 2 pages · High Court

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (2) | `[CASE_YEAR]` | MANUAL QUESTION | Case Year |
| (3) | `[AGAINST_CASE_NUMBER]` | MANUAL QUESTION | Lower Court Case Number (appealed against) |
| (4) | `[AGAINST_CASE_YEAR]` | MANUAL QUESTION | Lower Court Case Year |
| (5) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (6) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (7) | `[EXECUTANT_NAME]` | MANUAL QUESTION | Name of the Person Signing the Vakalat |
| (8) | `[ADVOCATE_NAME]` | AUTOFILLED | Advocate — full name |
| (9) | `[EXPLAINED_IN_LANGUAGE]` | MANUAL QUESTION | Language the Vakalat was Explained In |
| (10) | `[DAY]` | AUTOFILLED | Today — day of month |
| (11) | `[MONTH]` | AUTOFILLED | Today — month name |
| (12) | `[SR_NUMBER]` | MANUAL QUESTION | S.R. Number |
| (13) | `[HC_DISTRICT]` | MANUAL QUESTION | District |
| (14) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (15) | `[CASE_YEAR]` | MANUAL QUESTION | Case Year |
| (16) | `[ADVOCATE_ADDRESS]` | AUTOFILLED | Advocate — address |

## 19. Index (Delhi High Court)

`19-Index-Delhi-High-Court.pdf` · 1 page · High Court

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[DAY]` | AUTOFILLED | Today — day of month |
| (2) | `[MONTH]` | AUTOFILLED | Today — month name |
| (3) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (4) | `[ADVOCATE_NAME]` | AUTOFILLED | Advocate — full name |

## 20. List of Documents Produced (Order XIII Rule 1, Delhi High Court)

`20-List-of-Documents-Produced-Order-XIII-Rule-1-Delhi-High-Court.pdf` · 1 page · High Court

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (2) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |

## 21. Listing Proforma — Typed (Delhi High Court)

`21-Listing-Proforma-Typed-Delhi-High-Court.pdf` · 5 pages · High Court · _page break added: the form is taller than one sheet_

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[DATE]` | AUTOFILLED | Today's date |
| (2) | `[BAR_NUMBER]` | AUTOFILLED | Advocate — bar council number |

## 22. Listing Proforma II — Handwritten (Delhi High Court)

`22-Listing-Proforma-II-Handwritten-Delhi-High-Court.pdf` · 2 pages · High Court

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[BAR_NUMBER]` | AUTOFILLED | Advocate — bar council number |

## 23. M.C. Notice (Section 125 Cr. P.C.)

`23-M-C-Notice-Section-125-Cr-P-C.pdf` · 1 page · Family Court + District & Subordinate

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (2) | `[COURT_PLACE]` | AUTOFILLED | Client — court place |
| (3) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (4) | `[CASE_YEAR]` | MANUAL QUESTION | M.C. Year |
| (5) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (6) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (7) | `[DAY]` | AUTOFILLED | Today — day of month |
| (8) | `[MONTH]` | AUTOFILLED | Today — month name |
| (9) | `[YEAR]` | AUTOFILLED | Today — 4-digit year |

## 24. Memo of Appearance (Criminal)

`24-Memo-of-Appearance-Criminal.pdf` · 2 pages · District & Subordinate

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (2) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (3) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (4) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (5) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (6) | `[ADVOCATE_NAME]` | AUTOFILLED | Advocate — full name |
| (7) | `[ACCUSED_ADDRESS]` | MANUAL QUESTION | Address of the Accused / Person Interested |
| (8) | `[CRIME_NUMBER]` | MANUAL QUESTION | Crime Number |
| (9) | `[CRIME_YEAR]` | MANUAL QUESTION | Crime Year |
| (10) | `[POLICE_STATION]` | MANUAL QUESTION | Police Station |
| (11) | `[ADVOCATE_NAME]` | AUTOFILLED | Advocate — full name |
| (12) | `[CLIENT_NAME]` | AUTOFILLED | Client — full name |
| (13) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (14) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (15) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (16) | `[ADVOCATE_ADDRESS]` | AUTOFILLED | Advocate — address |

## 25. Memo of Appearance with Verification by the Person Interested (Bail u/s 437 / 439 Cr. P.C.)

`25-Memo-of-Appearance-with-Verification-by-the-Person-Interested-Bail-u-s-437-439-Cr-P-C.pdf` · 2 pages · District & Subordinate

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (2) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (3) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (4) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (5) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (6) | `[ADVOCATE_NAME]` | AUTOFILLED | Advocate — full name |
| (7) | `[ACCUSED_ADDRESS]` | MANUAL QUESTION | Address of the Accused / Person Interested |
| (8) | `[CRIME_NUMBER]` | MANUAL QUESTION | Crime Number |
| (9) | `[CRIME_YEAR]` | MANUAL QUESTION | Crime Year |
| (10) | `[POLICE_STATION]` | MANUAL QUESTION | Police Station |
| (11) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (12) | `[PERSON_INTERESTED_NAME]` | MANUAL QUESTION | Name of the Person Interested |
| (13) | `[AUTHORISED_BY]` | MANUAL QUESTION | Authorised by Sri (name of the Accused) |
| (14) | `[POLICE_STATION]` | MANUAL QUESTION | Police Station |
| (15) | `[DISTRICT]` | MANUAL QUESTION | District |
| (16) | `[PRISON_NAME]` | MANUAL QUESTION | Prison Name |
| (17) | `[PRISON_PLACE]` | MANUAL QUESTION | Prison Location |
| (18) | `[ADVOCATE_NAME]` | AUTOFILLED | Advocate — full name |
| (19) | `[RELATIONSHIP_TO_ACCUSED]` | MANUAL QUESTION | Relationship to the Accused |
| (20) | `[PRIOR_PETITION_NUMBER]` | MANUAL QUESTION | Earlier Bail Petition Number |
| (21) | `[PRIOR_PETITION_DATE]` | MANUAL QUESTION | Earlier Bail Petition — Date |
| (22) | `[PRIOR_PETITION_COURT]` | MANUAL QUESTION | Earlier Bail Petition — Court |
| (23) | `[PRIOR_PETITION_PLACE]` | MANUAL QUESTION | Earlier Bail Petition — Place |
| (24) | `[PRIOR_PETITION_DISPOSAL]` | MANUAL QUESTION | Earlier Bail Petition — Disposal |
| (25) | `[ADVOCATE_NAME]` | AUTOFILLED | Advocate — full name |
| (26) | `[CLIENT_NAME]` | AUTOFILLED | Client — full name |
| (27) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (28) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (29) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (30) | `[ADVOCATE_ADDRESS]` | AUTOFILLED | Advocate — address |

## 26. Memorandum of Appearance (Form 6)

`26-Memorandum-of-Appearance-Form-6.pdf` · 1 page · District & Subordinate

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (2) | `[DATE]` | AUTOFILLED | Today's date |

## 27. Memorandum of Appearance in Person (Supreme Court, Form 8)

`27-Memorandum-of-Appearance-in-Person-Supreme-Court-Form-8.pdf` · 1 page · Supreme Court

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (2) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (3) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (4) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (5) | `[DAY]` | AUTOFILLED | Today — day of month |
| (6) | `[MONTH]` | AUTOFILLED | Today — month name |
| (7) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (8) | `[CLIENT_NAME]` | AUTOFILLED | Client — full name |

## 28. Memorandum of Appearance of Advocate

`28-Memorandum-of-Appearance-of-Advocate.pdf` · 1 page · High Court + District & Subordinate

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (2) | `[DATE]` | AUTOFILLED | Today's date |
| (3) | `[ADVOCATE_NAME]` | AUTOFILLED | Advocate — full name |

## 29. Memorandum of Appearance through Advocate-on-Record (Supreme Court, Form 9)

`29-Memorandum-of-Appearance-through-Advocate-on-Record-Supreme-Court-Form-9.pdf` · 1 page · Supreme Court

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (2) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (3) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (4) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (5) | `[DAY]` | AUTOFILLED | Today — day of month |
| (6) | `[MONTH]` | AUTOFILLED | Today — month name |
| (7) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (8) | `[ADVOCATE_NAME]` | AUTOFILLED | Advocate — full name |

## 30. Notice (Hindu Marriage Act, 1955)

`30-Notice-Hindu-Marriage-Act-1955.pdf` · 1 page · Family Court + District & Subordinate

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (2) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (3) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (4) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (5) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (6) | `[FILED_DAY]` | MANUAL QUESTION | Petition Filed On — Day |
| (7) | `[FILED_MONTH]` | MANUAL QUESTION | Petition Filed On — Month |
| (8) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (9) | `[RELIEF_SOUGHT]` | MANUAL QUESTION | Relief Sought |
| (10) | `[APPEAR_DAY]` | MANUAL QUESTION | Respondent to Appear — Day |
| (11) | `[APPEAR_MONTH]` | MANUAL QUESTION | Respondent to Appear — Month |
| (12) | `[STATEMENT_DAY]` | MANUAL QUESTION | Written Statement Due — Day |
| (13) | `[STATEMENT_MONTH]` | MANUAL QUESTION | Written Statement Due — Month |
| (14) | `[DAY]` | AUTOFILLED | Today — day of month |
| (15) | `[MONTH]` | AUTOFILLED | Today — month name |
| (16) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |

## 31. Notice (Hindu Marriage Act, 1955) - Nazar printing

`31-Notice-Hindu-Marriage-Act-1955-Nazar-printing.pdf` · 1 page · Family Court + District & Subordinate

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (2) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (3) | `[CASE_YEAR]` | MANUAL QUESTION | O.P. Year |
| (4) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (5) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (6) | `[FILED_DAY]` | MANUAL QUESTION | Petition Filed On — Day |
| (7) | `[FILED_MONTH]` | MANUAL QUESTION | Petition Filed On — Month |
| (8) | `[FILED_YEAR]` | MANUAL QUESTION | Petition Filed On — Year |
| (9) | `[RELIEF_SOUGHT]` | MANUAL QUESTION | Relief Sought |
| (10) | `[APPEAR_DAY]` | MANUAL QUESTION | Respondent to Appear — Day |
| (11) | `[APPEAR_MONTH]` | MANUAL QUESTION | Respondent to Appear — Month |
| (12) | `[APPEAR_YEAR]` | MANUAL QUESTION | Respondent to Appear — Year |
| (13) | `[STATEMENT_DAY]` | MANUAL QUESTION | Written Statement Due — Day |
| (14) | `[STATEMENT_MONTH]` | MANUAL QUESTION | Written Statement Due — Month |
| (15) | `[STATEMENT_YEAR]` | MANUAL QUESTION | Written Statement Due — Year |
| (16) | `[DAY]` | AUTOFILLED | Today — day of month |
| (17) | `[MONTH]` | AUTOFILLED | Today — month name |

## 32. Notice (I.A. / Original Suit)

`32-Notice-I-A-Original-Suit.pdf` · 1 page · District & Subordinate

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (2) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (3) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (4) | `[OS_NUMBER]` | MANUAL QUESTION | Original Suit Number |
| (5) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (6) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (7) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (8) | `[ADVOCATE_NAME]` | AUTOFILLED | Advocate — full name |
| (9) | `[RESPONDENT_ADVOCATE]` | MANUAL QUESTION | Respondent’s Advocate |
| (10) | `[POSTED_TO_DATE]` | MANUAL QUESTION | Date the Petition is Posted To |

## 33. Notice (Order 21 Rule 54 (1A))

`33-Notice-Order-21-Rule-54-1A.pdf` · 1 page · District & Subordinate

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (2) | `[EP_NUMBER]` | MANUAL QUESTION | E.P. Number |
| (3) | `[OS_NUMBER]` | MANUAL QUESTION | O.S. Number (the original suit) |
| (4) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (5) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (6) | `[DECREE_DAY]` | MANUAL QUESTION | Decree Date — Day |
| (7) | `[DECREE_MONTH]` | MANUAL QUESTION | Decree Date — Month |
| (8) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (9) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (10) | `[DECREE_IN_FAVOUR_OF]` | MANUAL QUESTION | Decree in Favour Of |
| (11) | `[DECREE_AMOUNT]` | MANUAL QUESTION | Decree Amount |
| (12) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (13) | `[ATTEND_DAY]` | MANUAL QUESTION | Date to Attend Court — Day |
| (14) | `[ATTEND_MONTH]` | MANUAL QUESTION | Date to Attend Court — Month |
| (15) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (16) | `[DAY]` | AUTOFILLED | Today — day of month |
| (17) | `[MONTH]` | AUTOFILLED | Today — month name |
| (18) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (19) | `[WARRANT_AMOUNT]` | MANUAL QUESTION | Warrant Amount |
| (20) | `[HEARING_DATE]` | MANUAL QUESTION | Hearing Date |

## 34. Notice (Order 21 Rule 54 (1A)) - Proclemation of sale printing

`34-Notice-Order-21-Rule-54-1A-Proclemation-of-sale-printing.pdf` · 1 page · District & Subordinate

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (2) | `[EP_NUMBER]` | MANUAL QUESTION | E.P. Number |
| (3) | `[OS_NUMBER]` | MANUAL QUESTION | O.S. Number (the original suit) |
| (4) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (5) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (6) | `[DECREE_DAY]` | MANUAL QUESTION | Decree Date — Day |
| (7) | `[DECREE_MONTH]` | MANUAL QUESTION | Decree Date — Month |
| (8) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (9) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (10) | `[DECREE_IN_FAVOUR_OF]` | MANUAL QUESTION | Decree in Favour Of |
| (11) | `[DECREE_AMOUNT]` | MANUAL QUESTION | Decree Amount |
| (12) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (13) | `[ATTEND_DAY]` | MANUAL QUESTION | Date to Attend Court — Day |
| (14) | `[ATTEND_MONTH]` | MANUAL QUESTION | Date to Attend Court — Month |
| (15) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (16) | `[DAY]` | AUTOFILLED | Today — day of month |
| (17) | `[MONTH]` | AUTOFILLED | Today — month name |
| (18) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (19) | `[WARRANT_AMOUNT]` | MANUAL QUESTION | Warrant Amount |
| (20) | `[HEARING_DATE]` | MANUAL QUESTION | Hearing Date |

## 35. Notice of Appearance (Supreme Court, Form 13)

`35-Notice-of-Appearance-Supreme-Court-Form-13.pdf` · 1 page · Supreme Court

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (2) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (3) | `[DAY]` | AUTOFILLED | Today — day of month |
| (4) | `[MONTH]` | AUTOFILLED | Today — month name |
| (5) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (6) | `[ADVOCATE_NAME]` | AUTOFILLED | Advocate — full name |

## 36. Notice of Motion (Delhi High Court)

`36-Notice-of-Motion-Delhi-High-Court.pdf` · 1 page · High Court

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (2) | `[ADVOCATE_NAME]` | AUTOFILLED | Advocate — full name |
| (3) | `[DATE]` | AUTOFILLED | Today's date |

## 37. Notice of Motion (Supreme Court, Form 4)

`37-Notice-of-Motion-Supreme-Court-Form-4.pdf` · 2 pages · Supreme Court · _page break added: the form is taller than one sheet_

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (2) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (3) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (4) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (5) | `[ADVOCATE_NAME]` | AUTOFILLED | Advocate — full name |
| (6) | `[DAY]` | AUTOFILLED | Today — day of month |
| (7) | `[MONTH]` | AUTOFILLED | Today — month name |
| (8) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (9) | `[ADVOCATE_ADDRESS]` | AUTOFILLED | Advocate — address |

## 38. Notice of the day fixed setting & Sale Proclanation (Order 21 Rule 66)

`38-Notice-of-the-day-fixed-setting-Sale-Proclanation-Order-21-Rule-66.pdf` · 1 page · District & Subordinate

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (2) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (3) | `[EP_YEAR]` | MANUAL QUESTION | E.P. Year |
| (4) | `[OS_NUMBER]` | MANUAL QUESTION | O.S. Number (the original suit) |
| (5) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (6) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (7) | `[DECREE_HOLDER]` | MANUAL QUESTION | Decree Holder |
| (8) | `[TERMS_YEAR]` | MANUAL QUESTION | Date Fixed for Settling Terms — Year |
| (9) | `[TERMS_MONTH]` | MANUAL QUESTION | Date Fixed for Settling Terms — Month |
| (10) | `[TERMS_DATE]` | MANUAL QUESTION | Date Fixed for Settling Terms — Day |
| (11) | `[YEAR]` | AUTOFILLED | Today — 4-digit year |
| (12) | `[MONTH]` | AUTOFILLED | Today — month name |
| (13) | `[DAY]` | AUTOFILLED | Today — day of month |

## 39. Notice to Send for pay particulars (Garnishee / Disbursing Officer)

`39-Notice-to-Send-for-pay-particulars-Garnishee-Disbursing-Officer.pdf` · 1 page · District & Subordinate

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (2) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (3) | `[EP_YEAR]` | MANUAL QUESTION | E.P. Year |
| (4) | `[OS_NUMBER]` | MANUAL QUESTION | O.S. Number |
| (5) | `[OS_YEAR]` | MANUAL QUESTION | O.S. Year |
| (6) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (7) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (8) | `[JDR_NUMBER]` | MANUAL QUESTION | Judgement Debtor Number |
| (9) | `[GARNISHEE_NAME]` | MANUAL QUESTION | Garnishee (the salary-paying officer) |
| (10) | `[JDR_NUMBER]` | MANUAL QUESTION | Judgement Debtor Number |
| (11) | `[JDR_FATHER_NAME]` | MANUAL QUESTION | Judgement Debtor — Father’s Name |
| (12) | `[JDR_ADDRESS]` | MANUAL QUESTION | Judgement Debtor — Address |
| (13) | `[DUE_DATE]` | MANUAL QUESTION | Particulars Due By — Day and Month (Telugu) |
| (14) | `[DUE_YEAR]` | MANUAL QUESTION | Particulars Due By — Year |
| (15) | `[YEAR]` | AUTOFILLED | Today — 4-digit year |
| (16) | `[MONTH]` | AUTOFILLED | Today — month name |
| (17) | `[DAY]` | AUTOFILLED | Today — day of month |

## 40. Notice U/Cr 21 48 CPC)

`40-Notice-U-Cr-21-48-CPC.pdf` · 1 page · District & Subordinate

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (2) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (3) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (4) | `[OS_SC_NUMBER]` | MANUAL QUESTION | O.S. / S.C. Number (the main case) |
| (5) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (6) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (7) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (8) | `[JDR_ADDRESS]` | MANUAL QUESTION | Address of the Judgement Debtor |
| (9) | `[APPEAR_DATE]` | MANUAL QUESTION | Date to Appear and State Objections |
| (10) | `[DAY]` | AUTOFILLED | Today — day of month |
| (11) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |

## 41. Opening Sheet for Criminal Appeal u/s 374 Cr.P.C. (Delhi High Court)

`41-Opening-Sheet-for-Criminal-Appeal-u-s-374-Cr-P-C-Delhi-High-Court.pdf` · 1 page · High Court

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (2) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |

## 42. Opening Sheet for Criminal Revision u/s 397 / 401 Cr.P.C. (Delhi High Court)

`42-Opening-Sheet-for-Criminal-Revision-u-s-397-401-Cr-P-C-Delhi-High-Court.pdf` · 1 page · High Court

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (2) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |

## 43. Petition Filed u/s. 317 / 256 of Cr. P.C.

`43-Petition-Filed-u-s-317-256-of-Cr-P-C.pdf` · 2 pages · District & Subordinate

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (2) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (3) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (4) | `[MAIN_CASE_NUMBER]` | MANUAL QUESTION | Main Case Number |
| (5) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (6) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (7) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (8) | `[REASON_FOR_ABSENCE]` | MANUAL QUESTION | Reason the Petitioner Cannot Attend |
| (9) | `[PLACE]` | MANUAL QUESTION | Place |
| (10) | `[DATE]` | AUTOFILLED | Today's date |
| (11) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (12) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (13) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (14) | `[MAIN_CASE_NUMBER]` | MANUAL QUESTION | Main Case Number |
| (15) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (16) | `[ADVOCATE_ADDRESS]` | AUTOFILLED | Advocate — address |

## 44. Petition Filed U/Sec. 279/355 of BNSS-2023

`44-Petition-Filed-U-Sec-279-355-of-BNSS-2023.pdf` · 2 pages · District & Subordinate

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (2) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (3) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (4) | `[MAIN_CASE_NUMBER]` | MANUAL QUESTION | CC / MC Number (the main case) |
| (5) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (6) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (7) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (8) | `[REASON_FOR_ABSENCE]` | MANUAL QUESTION | Reason the Petitioner Cannot Attend |
| (9) | `[DAY]` | AUTOFILLED | Today — day of month |
| (10) | `[MONTH]` | AUTOFILLED | Today — month name |
| (11) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (12) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (13) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (14) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (15) | `[MAIN_CASE_NUMBER]` | MANUAL QUESTION | CC / MC Number (the main case) |
| (16) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (17) | `[ADVOCATE_ADDRESS]` | AUTOFILLED | Advocate — address |

## 45. Petition Filed U/Sec. 279/355 of BNSS-2023 (STC/C.C/S.C.)

`45-Petition-Filed-U-Sec-279-355-of-BNSS-2023-STC-C-C-S-C.pdf` · 2 pages · District & Subordinate

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (2) | `[COURT_PLACE]` | AUTOFILLED | Client — court place |
| (3) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (4) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (5) | `[MAIN_CASE_NUMBER]` | MANUAL QUESTION | STC / C.C. / S.C. Number (the main case) |
| (6) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (7) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (8) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (9) | `[REASON_FOR_ABSENCE]` | MANUAL QUESTION | Reason the Petitioner Cannot Attend |
| (10) | `[DAY]` | AUTOFILLED | Today — day of month |
| (11) | `[MONTH]` | AUTOFILLED | Today — month name |
| (12) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (13) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (14) | `[COURT_PLACE]` | AUTOFILLED | Client — court place |
| (15) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (16) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (17) | `[MAIN_CASE_NUMBER]` | MANUAL QUESTION | STC / C.C. / S.C. Number (the main case) |
| (18) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (19) | `[DAY]` | AUTOFILLED | Today — day of month |
| (20) | `[MONTH]` | AUTOFILLED | Today — month name |
| (21) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (22) | `[ADVOCATE_ADDRESS]` | AUTOFILLED | Advocate — address |
| (23) | `[ADVOCATE_NAME]` | AUTOFILLED | Advocate — full name |

## 46. Petition to Condone Delay under Section 148 & 151 C.P.C. (with Affidavit)

`46-Petition-to-Condone-Delay-under-Section-148-151-C-P-C-with-Affidavit.pdf` · 3 pages · District & Subordinate

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (2) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (3) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (4) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (5) | `[MAIN_CASE_NUMBER]` | MANUAL QUESTION | Main Case Number |
| (6) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (7) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (8) | `[DEPONENT_NAME]` | MANUAL QUESTION | Deponent — Name |
| (9) | `[DEPONENT_AGE]` | MANUAL QUESTION | Deponent — Age |
| (10) | `[DELAY_PERIOD]` | MANUAL QUESTION | Length of Delay to be Condoned |
| (11) | `[ADVOCATE_NAME]` | AUTOFILLED | Advocate — full name |
| (12) | `[ADVOCATE_NAME]` | AUTOFILLED | Advocate — full name |
| (13) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (14) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (15) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (16) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (17) | `[MAIN_CASE_NUMBER]` | MANUAL QUESTION | Main Case Number |
| (18) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (19) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (20) | `[DELAY_PERIOD]` | MANUAL QUESTION | Length of Delay to be Condoned |
| (21) | `[STATION]` | MANUAL QUESTION | Station |
| (22) | `[DATE]` | AUTOFILLED | Today's date |
| (23) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (24) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (25) | `[MAIN_CASE_NUMBER]` | MANUAL QUESTION | Main Case Number |
| (26) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (27) | `[ADVOCATE_ADDRESS]` | AUTOFILLED | Advocate — address |

## 47. Petition to Number Out of Order under Rule 57 C.R.P. (with Affidavit u/s 139 C.P.C.)

`47-Petition-to-Number-Out-of-Order-under-Rule-57-C-R-P-with-Affidavit-u-s-139-C-P-C.pdf` · 4 pages · District & Subordinate · _page break added: the form is taller than one sheet_

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (2) | `[IA_NUMBER]` | MANUAL QUESTION | I.A. Number |
| (3) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (4) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (5) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (6) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (7) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (8) | `[DEPONENT_NAME]` | MANUAL QUESTION | Deponent — Name |
| (9) | `[DEPONENT_FATHER]` | MANUAL QUESTION | Deponent — Father’s Name |
| (10) | `[DEPONENT_AGE]` | MANUAL QUESTION | Deponent — Age |
| (11) | `[DEPONENT_RELIGION]` | MANUAL QUESTION | Deponent — Religion |
| (12) | `[DEPONENT_ADDRESS]` | MANUAL QUESTION | Deponent — Address |
| (13) | `[CASE_FILED_FOR]` | MANUAL QUESTION | What the Case was Filed For |
| (14) | `[URGENCY_REASON]` | MANUAL QUESTION | Why Urgent Orders are Needed |
| (15) | `[DAY]` | AUTOFILLED | Today — day of month |
| (16) | `[MONTH]` | AUTOFILLED | Today — month name |
| (17) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (18) | `[PLACE]` | MANUAL QUESTION | Place |
| (19) | `[ADVOCATE_NAME]` | AUTOFILLED | Advocate — full name |
| (20) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (21) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (22) | `[IA_NUMBER]` | MANUAL QUESTION | I.A. Number |
| (23) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (24) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (25) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (26) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (27) | `[PLACE]` | MANUAL QUESTION | Place |
| (28) | `[DATE]` | AUTOFILLED | Today's date |
| (29) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (30) | `[IA_NUMBER]` | MANUAL QUESTION | I.A. Number |
| (31) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |

## 48. Process Fee Form (Delhi High Court)

`48-Process-Fee-Form-Delhi-High-Court.pdf` · 1 page · High Court

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (2) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |

## 49. Process Memo

`49-Process-Memo.pdf` · 2 pages · District & Subordinate

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (2) | `[HEARING_DATE]` | MANUAL QUESTION | Hearing Date — Day and Month |
| (3) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (4) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (5) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (6) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (7) | `[PARTY_TYPE]` | AUTOFILLED | Client — party type (Plaintiff / Defendant) |
| (8) | `[PARTIES_TO_SUMMON]` | MANUAL QUESTION | Parties to be Summoned |
| (9) | `[ADVOCATE_NAME]` | AUTOFILLED | Advocate — full name |
| (10) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (11) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (12) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (13) | `[PARTY_TYPE]` | AUTOFILLED | Client — party type (Plaintiff / Defendant) |
| (14) | `[FILED_ON]` | MANUAL QUESTION | Filed On |
| (15) | `[ADVOCATE_ADDRESS]` | AUTOFILLED | Advocate — address |

## 50. Propfarma of NI Act Cases Summons — Form I (Summons to an Accused Person)

`50-Propfarma-of-NI-Act-Cases-Summons-Form-I-Summons-to-an-Accused-Person.pdf` · 1 page · District & Subordinate

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (2) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (3) | `[MAGISTRATE_COURT]` | MANUAL QUESTION | Magistrate to Appear Before |
| (4) | `[HEARING_MONTH]` | MANUAL QUESTION | Hearing Date — Day and Month |
| (5) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (6) | `[NO_APPEAR_DATE]` | MANUAL QUESTION | Date Appearance Can Be Avoided By |
| (7) | `[DEPOSIT_AMOUNT]` | MANUAL QUESTION | Amount to be Deposited |
| (8) | `[DEPOSIT_BY_DATE]` | MANUAL QUESTION | Deposit By — Date |
| (9) | `[COMPLAINANT_BANK_NAME]` | MANUAL QUESTION | Complainant’s Bank Name |
| (10) | `[BANK_ACCOUNT_NUMBER]` | MANUAL QUESTION | Complainant’s Bank Account Number |
| (11) | `[STATED_AMOUNT]` | MANUAL QUESTION | Stated Amount |
| (12) | `[COMPLAINANT_EMAIL]` | MANUAL QUESTION | Complainant’s E-mail ID |
| (13) | `[DAY]` | AUTOFILLED | Today — day of month |
| (14) | `[MONTH]` | AUTOFILLED | Today — month name |
| (15) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |

## 51. Summons (O. 5, RR 1, 5 C.P.C.)

`51-Summons-O-5-RR-1-5-C-P-C.pdf` · 1 page · District & Subordinate

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (2) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (3) | `[CASE_YEAR]` | MANUAL QUESTION | Suit Year |
| (4) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (5) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (6) | `[HEARING_YEAR]` | MANUAL QUESTION | Hearing Year |
| (7) | `[DAY]` | AUTOFILLED | Today — day of month |
| (8) | `[MONTH]` | AUTOFILLED | Today — month name |
| (9) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |

## 52. Summons to Accused (Sec. 61 Cr.P.C.) with Note on Provision for Compromise

`52-Summons-to-Accused-Sec-61-Cr-P-C-with-Note-on-Provision-for-Compromise.pdf` · 1 page · District & Subordinate

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (2) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (3) | `[CASE_YEAR]` | MANUAL QUESTION | C.C. Year |
| (4) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (5) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (6) | `[ACCUSED_ADDRESS]` | MANUAL QUESTION | Address of the Accused |
| (7) | `[CHARGE]` | MANUAL QUESTION | Charge |
| (8) | `[HEARING_DATE_TEXT]` | MANUAL QUESTION | Hearing Date — Day and Month |
| (9) | `[HEARING_YEAR]` | MANUAL QUESTION | Hearing Year |
| (10) | `[DAY]` | AUTOFILLED | Today — day of month |
| (11) | `[MONTH]` | AUTOFILLED | Today — month name |
| (12) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |

## 53. Summons to Accused Person (Section 68 Cri. Pro. Code)

`53-Summons-to-Accused-Person-Section-68-Cri-Pro-Code.pdf` · 2 pages · District & Subordinate · _page break added: the form is taller than one sheet_

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (2) | `[COURT_PLACE]` | AUTOFILLED | Client — court place |
| (3) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (4) | `[CASE_YEAR]` | MANUAL QUESTION | Case Year |
| (5) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (6) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (7) | `[ACCUSED_ADDRESS]` | MANUAL QUESTION | Address of the Accused |
| (8) | `[CHARGE_SECTION]` | MANUAL QUESTION | Charge — Section |
| (9) | `[APPEAR_BEFORE]` | MANUAL QUESTION | Appear Before (Magistrate / Court) |
| (10) | `[DAY]` | AUTOFILLED | Today — day of month |
| (11) | `[MONTH]` | AUTOFILLED | Today — month name |
| (12) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (13) | `[DAY]` | AUTOFILLED | Today — day of month |
| (14) | `[MONTH]` | AUTOFILLED | Today — month name |
| (15) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |

## 54. Surety Memo

`54-Surety-Memo.pdf` · 1 page · District & Subordinate

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (2) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (3) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (4) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (5) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (6) | `[OFFENCE_SECTION]` | MANUAL QUESTION | Offence — Section |
| (7) | `[SURETY_1]` | MANUAL QUESTION | First Surety — Name |
| (8) | `[SURETY_2]` | MANUAL QUESTION | Second Surety — Name |
| (9) | `[DATE]` | AUTOFILLED | Today's date |
| (10) | `[ADVOCATE_NAME]` | AUTOFILLED | Advocate — full name |

## 55. Vakalatnama (Delhi High Court)

`55-Vakalatnama-Delhi-High-Court.pdf` · 3 pages · High Court · _page break added: the form is taller than one sheet_

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (2) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (3) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (4) | `[CLIENT_NAME]` | AUTOFILLED | Client — full name |
| (5) | `[MONTH]` | AUTOFILLED | Today — month name |
| (6) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (7) | `[ADVOCATE_NAME]` | AUTOFILLED | Advocate — full name |
| (8) | `[CLIENT_NAME]` | AUTOFILLED | Client — full name |

## 56. దావాసమను / Suit Summons (Order 5, Rules 1 and 5)

`56-Suit-Summons-Order-5-Rules-1-and-5.pdf` · 1 page · District & Subordinate

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (2) | `[ADDRESSEE]` | MANUAL QUESTION | Addressee — Name and Address |
| (3) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (4) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (5) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (6) | `[RELIEF_SOUGHT]` | MANUAL QUESTION | Relief Sought |
| (7) | `[APPEAR_YEAR]` | MANUAL QUESTION | Date to Appear — Year |
| (8) | `[APPEAR_MONTH]` | MANUAL QUESTION | Date to Appear — Month (Telugu) |
| (9) | `[APPEAR_DATE]` | MANUAL QUESTION | Date to Appear — Day (Telugu) |
| (10) | `[YEAR]` | AUTOFILLED | Today — 4-digit year |
| (11) | `[MONTH]` | AUTOFILLED | Today — month name |
| (12) | `[DAY]` | AUTOFILLED | Today — day of month |

## 57. నోటీసు (Notice)

`57-Notice.pdf` · 1 page · District & Subordinate

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (2) | `[IA_NUMBER]` | MANUAL QUESTION | I.A. Number |
| (3) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (4) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (5) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (6) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (7) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (8) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (9) | `[HEARING_MONTH]` | MANUAL QUESTION | Objection Hearing — Month (Telugu) |
| (10) | `[HEARING_DATE]` | MANUAL QUESTION | Objection Hearing — Date (Telugu) |
| (11) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (12) | `[MONTH]` | AUTOFILLED | Today — month name |
| (13) | `[DAY]` | AUTOFILLED | Today — day of month |

## 58. వకాలత్ / Vakalath (Form No. 121, Rule No. 276-A)

`58-Vakalath-Form-No-121-Rule-No-276-A.pdf` · 2 pages · District & Subordinate

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (2) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (3) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (4) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (5) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (6) | `[ADVOCATE_NAME]` | AUTOFILLED | Advocate — full name |
| (7) | `[DATE]` | AUTOFILLED | Today's date |
| (8) | `[ADVOCATE_NAME]` | AUTOFILLED | Advocate — full name |
| (9) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (10) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (11) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (12) | `[PARTY_TYPE]` | AUTOFILLED | Client — party type (Plaintiff / Defendant) |
| (13) | `[ADVOCATE_ADDRESS]` | AUTOFILLED | Advocate — address |

## 59. సాక్షి సమను / Witness Summons (Order 16, Rules 1 and 5)

`59-Witness-Summons-Order-16-Rules-1-and-5.pdf` · 1 page · District & Subordinate

| slot | token | fill type | source / question |
|---:|---|---|---|
| (1) | `[WITNESS_NAME]` | MANUAL QUESTION | Witness — Name and Address |
| (2) | `[COURT_NAME]` | AUTOFILLED | Client — court name |
| (3) | `[CASE_NUMBER]` | AUTOFILLED | Client — case number |
| (4) | `[CLIENT_NAME_IF_PETITIONER]` | AUTOFILLED | Client name, only when party type is Plaintiff |
| (5) | `[CLIENT_NAME_IF_RESPONDENT]` | AUTOFILLED | Client name, only when party type is Defendant |
| (6) | `[YEAR_LAST]` | AUTOFILLED | Today — last digit of year (completes a printed "202_") |
| (7) | `[ATTEND_MONTH]` | MANUAL QUESTION | Date to Attend — Month (Telugu) |
| (8) | `[ATTEND_DATE]` | MANUAL QUESTION | Date to Attend — Day (Telugu) |
| (9) | `[DAILY_ALLOWANCE]` | MANUAL QUESTION | Daily Allowance (భత్యం) |
| (10) | `[TOTAL_AMOUNT]` | MANUAL QUESTION | Total Amount Sent (రూపాయలు) |
