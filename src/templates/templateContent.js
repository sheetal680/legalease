// ─────────────────────────────────────────────────────────────────────────────
// LegalEase — Legal Document Templates
// Placeholders:  [LAWYER_NAME]  [BAR_NUMBER]  [FIRM_NAME]  [LAWYER_EMAIL]
//                [LAWYER_PHONE] [LAWYER_ADDRESS] [CITY] [STATE] [JURISDICTION]
//                [DATE]  [CLIENT_NAME]  [CLIENT_ADDRESS]  [CASE_NUMBER]
//                [COURT_NAME]  [OPPOSING_PARTY]  [CASE_DESCRIPTION]
//                [AMOUNT]  [DATE_OF_HEARING]
// ─────────────────────────────────────────────────────────────────────────────

export const templates = [

  // ══════════════════════════════════════════════════════════════════════════
  // GENERAL
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'client-engagement-letter',
    name: 'Client Engagement Letter',
    category: 'general',
    description: 'Formal letter confirming the lawyer–client relationship and scope of work.',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE]  |  Email: [LAWYER_EMAIL]

Date: [DATE]

To,
[CLIENT_NAME]
[CLIENT_ADDRESS]

Subject: Engagement Letter — Legal Representation

Dear [CLIENT_NAME],

Thank you for placing your trust in [FIRM_NAME]. This letter confirms our mutual understanding regarding the terms on which [LAWYER_NAME] ("the Advocate") agrees to represent you ("the Client") in the matter described below.

SCOPE OF ENGAGEMENT
The Advocate agrees to provide legal services in connection with: [CASE_DESCRIPTION], including legal advice, drafting of documents, correspondence, and representation before [COURT_NAME] / relevant authorities as may be required.

FEES AND BILLING
Professional fees for this engagement are as set out in the accompanying Fee Agreement Letter. Fees are payable in the manner and at the intervals specified therein. All out-of-pocket expenses (court fees, travel, notarial charges, etc.) shall be billed separately and are payable on demand.

RESPONSIBILITIES OF THE CLIENT
The Client agrees to: (a) provide accurate and complete information; (b) respond promptly to requests for instructions or documents; (c) make timely payment of fees and disbursements; and (d) refrain from directly contacting opposing parties or courts without prior consultation with the Advocate.

CONFIDENTIALITY
All information shared by the Client with the Advocate shall be held in strict confidence in accordance with the Bar Council of India Rules and applicable law, except where disclosure is required by law or by the Client's express written consent.

TERMINATION
Either party may terminate this engagement by giving fifteen (15) days' written notice. Fees earned and expenses incurred up to the date of termination shall remain payable.

GOVERNING LAW
This engagement is governed by the laws of India and subject to the jurisdiction of the courts at [CITY].

Please sign and return a copy of this letter to confirm your acceptance of the above terms.

Yours sincerely,

______________________________
[LAWYER_NAME]
Advocate — [BAR_NUMBER]
[FIRM_NAME], [CITY]

ACCEPTED AND AGREED:

______________________________
[CLIENT_NAME]
Date: _______________`,
  },

  {
    id: 'retainer-agreement',
    name: 'Retainer Agreement',
    category: 'general',
    description: 'Monthly/annual retainer arrangement for ongoing legal services.',
    content: `RETAINER AGREEMENT

This Retainer Agreement ("Agreement") is entered into on [DATE] between:

ADVOCATE:  [LAWYER_NAME], Advocate, enrolled with the Bar Council of [STATE], Bar No. [BAR_NUMBER], practising at [FIRM_NAME], [LAWYER_ADDRESS], [CITY] — hereinafter referred to as "the Advocate"; AND

CLIENT:    [CLIENT_NAME], [CLIENT_ADDRESS] — hereinafter referred to as "the Client".

WHEREAS the Client desires to retain the Advocate for ongoing legal services, and the Advocate is willing to provide such services on the terms set forth herein;

NOW, THEREFORE, in consideration of the mutual covenants contained herein, the parties agree as follows:

1. RETAINER SERVICES
   The Advocate shall provide the following services during the retainer period:
   (a) Legal advice and consultation on matters arising in the ordinary course of the Client's affairs;
   (b) Review and drafting of contracts, agreements, notices, and correspondence;
   (c) Representation in negotiations with third parties;
   (d) Monthly legal update relevant to the Client's industry/matter.

   Services excluded from retainer (billed separately): court appearances, litigation, government filings, registration charges.

2. RETAINER FEE
   The Client shall pay a monthly retainer fee of ₹[AMOUNT] (Rupees [AMOUNT] only), payable on or before the 5th day of each calendar month, to the Advocate's designated account.

3. TERM
   This Agreement shall commence on [DATE] and continue on a month-to-month basis unless terminated by either party with thirty (30) days' written notice.

4. CONFLICT OF INTEREST
   The Advocate shall promptly disclose any actual or potential conflict of interest. In the event of an irreconcilable conflict, the Advocate may decline to act on a specific matter.

5. CONFIDENTIALITY
   Both parties shall maintain strict confidentiality with respect to all information exchanged under this Agreement.

6. GOVERNING LAW & JURISDICTION
   This Agreement shall be governed by Indian law. Disputes shall be subject to the exclusive jurisdiction of courts in [CITY].

IN WITNESS WHEREOF the parties have executed this Agreement on the date first written above.

______________________________          ______________________________
[LAWYER_NAME], Advocate                 [CLIENT_NAME]
Bar No. [BAR_NUMBER]                    Date: _______________
[FIRM_NAME], [CITY]`,
  },

  {
    id: 'non-disclosure-agreement',
    name: 'Non-Disclosure Agreement (NDA)',
    category: 'general',
    description: 'Mutual or one-way NDA for protecting confidential information.',
    content: `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("Agreement") is entered into as of [DATE] by and between:

DISCLOSING PARTY: [CLIENT_NAME], [CLIENT_ADDRESS] ("Discloser"); AND
RECEIVING PARTY:  [OPPOSING_PARTY] ("Recipient").

Drafted by: [LAWYER_NAME], Advocate, [FIRM_NAME], [BAR_NUMBER], [CITY].

WHEREAS the Discloser possesses certain confidential and proprietary information relating to [CASE_DESCRIPTION] and desires to disclose such information to the Recipient solely for the purpose of evaluating a potential business relationship ("Permitted Purpose");

NOW, THEREFORE, in consideration of the mutual obligations set forth herein, the parties agree:

1. DEFINITION OF CONFIDENTIAL INFORMATION
   "Confidential Information" means any data or information, oral or written, that relates to the Discloser's business, technical, financial, commercial, or personal affairs that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information and circumstances of disclosure.

2. OBLIGATIONS OF RECIPIENT
   The Recipient agrees to: (a) hold Confidential Information in strict confidence using at least the same degree of care used to protect its own confidential information, but not less than reasonable care; (b) not disclose Confidential Information to any third party without prior written consent; (c) use Confidential Information solely for the Permitted Purpose.

3. EXCLUSIONS
   Obligations do not apply to information that: (a) is or becomes publicly available through no breach hereof; (b) was rightfully known to the Recipient prior to disclosure; (c) is independently developed without use of Confidential Information; (d) is required to be disclosed by law or court order.

4. TERM
   This Agreement shall remain in effect for three (3) years from the date hereof.

5. RETURN OF INFORMATION
   Upon written request, the Recipient shall promptly return or destroy all Confidential Information and certify such destruction in writing.

6. REMEDIES
   The Recipient acknowledges that breach of this Agreement may cause irreparable harm for which monetary damages would be inadequate. The Discloser shall be entitled to seek equitable relief in addition to all other remedies available at law.

7. GOVERNING LAW
   This Agreement shall be governed by the laws of India and subject to the jurisdiction of courts at [CITY].

IN WITNESS WHEREOF the parties have signed this Agreement on the date stated above.

______________________________          ______________________________
[CLIENT_NAME] (Discloser)               [OPPOSING_PARTY] (Recipient)
Date: _______________                   Date: _______________

Prepared by:
[LAWYER_NAME], Advocate — [BAR_NUMBER]
[FIRM_NAME], [CITY]  |  [LAWYER_PHONE]`,
  },

  {
    id: 'power-of-attorney',
    name: 'Power of Attorney',
    category: 'general',
    description: 'General or specific power of attorney authorising an agent to act on behalf of the principal.',
    content: `POWER OF ATTORNEY

KNOW ALL MEN BY THESE PRESENTS that I, [CLIENT_NAME], aged ___ years, residing at [CLIENT_ADDRESS] (hereinafter referred to as "the Principal"), do hereby appoint and authorise [OPPOSING_PARTY], aged ___ years, residing at _________________________ (hereinafter referred to as "the Attorney / Agent"), to act on my behalf in the manner and for the purposes hereinafter set forth.

Date of Execution: [DATE]
Place: [CITY], [STATE]

WHEREAS the Principal desires to appoint an Attorney to manage, administer, and act in relation to [CASE_DESCRIPTION];

NOW, THEREFORE, the Principal hereby grants to the Attorney the following powers:

1. To appear before any court, tribunal, government office, or authority in the State of [STATE] and across India in connection with [CASE_DESCRIPTION] and [COURT_NAME], including Case No. [CASE_NUMBER];

2. To sign, execute, and deliver any deed, document, application, petition, plaint, written statement, affidavit, vakalatnama, or other instrument required in connection with the aforesaid matter;

3. To receive payments, give valid receipts, and to compromise, settle, or compound any claim on terms the Attorney deems fit;

4. To appoint sub-agents, advocates, or representatives as necessary, and to delegate all or any of these powers;

5. To do all such other acts, deeds, and things as may be necessary or incidental to give effect to the above powers.

DECLARATIONS
I declare that: (a) I am of sound mind and free will; (b) I understand the contents of this document; (c) no undue influence has been exercised on me.

This Power of Attorney shall remain in full force and effect until revoked in writing.

IN WITNESS WHEREOF I have hereunto set my hand on [DATE] at [CITY].

______________________________
[CLIENT_NAME] (Principal)

WITNESSES:
1. ___________________________    2. ___________________________
   Name:                              Name:
   Address:                           Address:

ATTESTED / NOTARISED BY:
[LAWYER_NAME], Advocate — [BAR_NUMBER]
[FIRM_NAME], [LAWYER_ADDRESS], [CITY]
Tel: [LAWYER_PHONE]  |  [LAWYER_EMAIL]`,
  },

  {
    id: 'general-affidavit',
    name: 'General Affidavit',
    category: 'general',
    description: 'Sworn statement of facts for use before courts, authorities, or for official purposes.',
    content: `AFFIDAVIT

I, [CLIENT_NAME], aged ___ years, son/daughter/spouse of _______________, residing at [CLIENT_ADDRESS], do hereby solemnly affirm and state on oath as follows:

Date: [DATE]
Place: [CITY], [STATE]

1. I am the deponent herein and am competent to swear this affidavit. I have personal knowledge of the facts stated herein.

2. [CASE_DESCRIPTION]

3. I state that the facts mentioned hereinabove are true and correct to the best of my knowledge, belief, and information.

4. I am swearing this affidavit voluntarily and without any pressure, coercion, or undue influence from any person whatsoever.

5. I fully understand the contents of this affidavit and the legal consequences of making a false statement.

6. This affidavit is being made for the purpose of submission before [COURT_NAME] / relevant authority in connection with [CASE_NUMBER] / for general legal purposes.

VERIFICATION

I, [CLIENT_NAME], the deponent above-named, do hereby verify that the contents of paragraphs 1 to 5 above are true and correct to the best of my knowledge and belief. Nothing material has been concealed therefrom.

Verified at [CITY] on [DATE].

______________________________
[CLIENT_NAME] (Deponent)

SWORN BEFORE ME / ATTESTED BY:

______________________________
[LAWYER_NAME], Advocate
Bar No. [BAR_NUMBER]
[FIRM_NAME], [CITY]
Tel: [LAWYER_PHONE]

Solemnly affirmed and signed before me on [DATE] at [CITY], [STATE].`,
  },

  {
    id: 'client-intake-form',
    name: 'Client Intake Form',
    category: 'general',
    description: 'Structured intake form to collect client details at the first consultation.',
    content: `CLIENT INTAKE FORM
[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Tel: [LAWYER_PHONE]  |  Email: [LAWYER_EMAIL]
Bar No.: [BAR_NUMBER]

Date of Consultation: [DATE]
Attending Advocate: [LAWYER_NAME]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION A — CLIENT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Full Name:           [CLIENT_NAME]
Date of Birth:       _______________
Gender:              ☐ Male  ☐ Female  ☐ Other
Aadhar No.:          _______________  (last 4 digits only)
PAN No.:             _______________
Address:             [CLIENT_ADDRESS]
Phone (Primary):     _______________
Phone (Alternate):   _______________
Email:               _______________
Occupation:          _______________
Referred By:         _______________

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION B — MATTER DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nature of Matter:    [CASE_DESCRIPTION]
Opposing Party:      [OPPOSING_PARTY]
Court / Forum:       [COURT_NAME]
Case Number:         [CASE_NUMBER]
Date of Next Hearing:[DATE_OF_HEARING]
Urgency:             ☐ High  ☐ Medium  ☐ Low

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION C — DOCUMENTS PROVIDED BY CLIENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
☐ Identity Proof       ☐ Address Proof      ☐ FIR / Complaint Copy
☐ Previous Orders      ☐ Contracts / Deeds  ☐ Correspondence
☐ Other: _______________

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION D — CONFLICT CHECK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Has this firm/advocate represented any party adverse to the above client in any matter?
☐ Yes (details: _______________)  ☐ No

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION E — FEE DISCUSSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Fee Quoted:          ₹[AMOUNT]
Retainer Received:   ₹_______________
Mode of Payment:     ☐ Cash  ☐ UPI  ☐ Bank Transfer  ☐ Cheque

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION F — CLIENT DECLARATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
I, the client, confirm that the information provided above is true and correct.

______________________________          ______________________________
[CLIENT_NAME]                           [LAWYER_NAME], Advocate
(Client Signature)                      (Receiving Advocate)
Date: _______________                   Date: [DATE]`,
  },

  {
    id: 'fee-agreement-letter',
    name: 'Fee Agreement Letter',
    category: 'general',
    description: 'Written agreement detailing professional fees, payment schedule, and billing terms.',
    content: `FEE AGREEMENT LETTER

[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar No.: [BAR_NUMBER]  |  Tel: [LAWYER_PHONE]  |  Email: [LAWYER_EMAIL]

Date: [DATE]

To,
[CLIENT_NAME]
[CLIENT_ADDRESS]

Subject: Fee Agreement — [CASE_DESCRIPTION]

Dear [CLIENT_NAME],

This letter sets out the professional fees agreed upon between [LAWYER_NAME], Advocate ("the Advocate"), and [CLIENT_NAME] ("the Client") for legal services in connection with the above matter.

1. SCOPE OF MATTER
   [CASE_DESCRIPTION], before [COURT_NAME], Case No. [CASE_NUMBER] (or such other forums as may be required).

2. FEE STRUCTURE

   (a) Professional Fee:        ₹[AMOUNT]
   (b) Appearance Fee:          ₹_______________ per hearing
   (c) Drafting / Filing Fee:   ₹_______________ per document
   (d) Retainer (if applicable):₹_______________ per month

3. PAYMENT SCHEDULE
   - Advance retainer of 50% payable upon signing this letter.
   - Balance payable on or before [DATE_OF_HEARING] / as mutually agreed.
   - Hearing fees payable 48 hours prior to each date of hearing.

4. DISBURSEMENTS
   All court fees, stamp duties, process-serving charges, travel, and other out-of-pocket expenses are payable by the Client in addition to professional fees and will be billed at actuals.

5. GST
   Professional fees are subject to Goods and Services Tax (GST) at applicable rates. The Advocate's GSTIN is _______________.

6. BILLING DISPUTES
   Any dispute regarding a bill must be raised within 15 days of receipt. Undisputed portions are payable within the agreed schedule.

7. NON-PAYMENT
   In the event of non-payment beyond 30 days from due date, the Advocate reserves the right to suspend services and, if necessary, apply to withdraw from representation with notice.

8. ACKNOWLEDGEMENT
   The Client confirms having read and understood the above fee terms.

Yours sincerely,

______________________________
[LAWYER_NAME], Advocate — [BAR_NUMBER]
[FIRM_NAME], [CITY]

ACCEPTED:

______________________________
[CLIENT_NAME]
Date: _______________`,
  },

  {
    id: 'legal-notice',
    name: 'Legal Notice',
    category: 'general',
    description: 'Formal legal notice to an individual or entity demanding action or compliance.',
    content: `LEGAL NOTICE

Under instructions from and on behalf of our client [CLIENT_NAME], [CLIENT_ADDRESS] (hereinafter referred to as "our Client"), we, [LAWYER_NAME], Advocate, [FIRM_NAME], [LAWYER_ADDRESS], [CITY], Bar Council Enrolment No. [BAR_NUMBER], hereby serve upon you, [OPPOSING_PARTY], the following notice:

Date: [DATE]

To,
[OPPOSING_PARTY]
[CLIENT_ADDRESS]

Sir / Madam,

1. Our Client [CLIENT_NAME] instructs us to address you as follows.

2. FACTS: [CASE_DESCRIPTION]

3. DEMAND: On account of the foregoing, our Client calls upon you to:
   (a) [State specific demand / action required];
   (b) Pay the sum of ₹[AMOUNT] together with applicable interest within fifteen (15) days of receipt of this notice; OR
   (c) Cease and desist from the acts/omissions complained of immediately.

4. CONSEQUENCES OF NON-COMPLIANCE: Please take notice that should you fail to comply with the above demands within the stipulated period, our Client shall be constrained to initiate appropriate civil and/or criminal proceedings before the competent courts / authorities at [CITY] / [JURISDICTION], including recovery of costs and interest, entirely at your risk as to costs and consequences.

5. This notice is issued without prejudice to all other rights and remedies available to our Client under law, equity, or contract, all of which are expressly reserved.

Issued at [CITY] on [DATE].

Yours truly,

______________________________
[LAWYER_NAME], Advocate
[BAR_NUMBER]
[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Tel: [LAWYER_PHONE]  |  Email: [LAWYER_EMAIL]

Note: Please acknowledge receipt of this notice within 48 hours.`,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CRIMINAL
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'bail-application',
    name: 'Bail Application',
    category: 'criminal',
    description: 'Application for regular bail under Section 437/439 CrPC before a Sessions or High Court.',
    content: `IN THE [COURT_NAME]
[JURISDICTION]

Case No.: [CASE_NUMBER]
Date of Hearing: [DATE_OF_HEARING]

IN THE MATTER OF:
[CLIENT_NAME]                                         … Applicant / Accused
(arrested on _______, currently in judicial custody)

VERSUS

STATE OF [STATE]                                      … Respondent

APPLICATION FOR BAIL UNDER SECTION 437 / 439 Cr.P.C.

To,
The Honourable [COURT_NAME],
[JURISDICTION]

Most Respectfully Showeth:

1. That the Applicant [CLIENT_NAME] has been arrested and is presently in judicial custody in connection with FIR No. [CASE_NUMBER], Police Station _______________, dated _______________, for alleged offences under _______________.

2. BRIEF FACTS: [CASE_DESCRIPTION]

3. GROUNDS FOR BAIL:
   (a) The Applicant is innocent of all charges and has been falsely implicated. The FIR is motivated by personal vendetta / dispute between the parties.
   (b) The offence alleged, even if taken at face value, does not warrant continued incarceration. The investigation is complete / nearing completion, and custodial interrogation is no longer required.
   (c) The Applicant has deep roots in the community, permanent residence at [CLIENT_ADDRESS], and is not a flight risk.
   (d) The Applicant undertakes to cooperate with the investigation and to appear before this Court / police / other authorities as and when required.
   (e) The Applicant has no prior criminal antecedents.
   (f) Continued detention is causing severe hardship to the Applicant's family, including _________________________.

4. The Applicant is willing to furnish surety/security as directed by this Honourable Court.

5. No previous bail application has been filed and rejected, except: [none / details].

PRAYER
It is, therefore, most respectfully prayed that this Honourable Court may be pleased to:
(a) Release the Applicant on bail on such terms and conditions as this Court deems fit; and
(b) Pass such other and further orders as this Honourable Court deems just and proper.

Place: [CITY]
Date: [DATE]

______________________________
[LAWYER_NAME], Advocate
[BAR_NUMBER] | [FIRM_NAME]
[LAWYER_PHONE] | [LAWYER_EMAIL]
Counsel for the Applicant`,
  },

  {
    id: 'anticipatory-bail-application',
    name: 'Anticipatory Bail Application',
    category: 'criminal',
    description: 'Application for anticipatory bail under Section 438 CrPC to prevent arrest.',
    content: `IN THE [COURT_NAME]
[JURISDICTION]

Anticipatory Bail Application No. _____ of [DATE]

IN THE MATTER OF:
[CLIENT_NAME], [CLIENT_ADDRESS]                       … Applicant

VERSUS

STATE OF [STATE]                                      … Respondent

APPLICATION FOR ANTICIPATORY BAIL UNDER SECTION 438 Cr.P.C.

To,
The Honourable [COURT_NAME],
[JURISDICTION]

Most Respectfully Showeth:

1. That the Applicant, [CLIENT_NAME], apprehends arrest in connection with: [CASE_DESCRIPTION], arising out of / likely to arise out of Complaint / FIR No. [CASE_NUMBER], lodged at Police Station _______________, [CITY].

2. BACKGROUND & FACTS: [CASE_DESCRIPTION]

3. GROUNDS:
   (a) The Applicant is a law-abiding citizen with no criminal record whatsoever.
   (b) The anticipated arrest is motivated by malice and is an abuse of the process of law by [OPPOSING_PARTY].
   (c) The allegation(s) are false, frivolous, and fabricated with a view to harass the Applicant.
   (d) The Applicant has cooperated / is willing to cooperate fully with any investigation and undertakes to appear before the Investigating Officer / Court at any time.
   (e) The Applicant is not likely to abscond or tamper with evidence. The Applicant's passport, if any, will be deposited with the Court if so directed.
   (f) The offence alleged, even if assumed to be true, is bailable in nature / does not warrant custodial interrogation.

4. The Applicant is willing to abide by any conditions imposed by this Honourable Court and shall not leave the jurisdiction without prior permission.

PRAYER
It is, therefore, most respectfully prayed that this Honourable Court may be pleased to:
(a) Direct that in the event of arrest, the Applicant be released on bail forthwith;
(b) Restrain the police from arresting the Applicant pending disposal of this application; and
(c) Pass such other orders as may be just and proper.

Place: [CITY]
Date: [DATE]

______________________________
[LAWYER_NAME], Advocate
[BAR_NUMBER] | [FIRM_NAME]
[LAWYER_PHONE] | [LAWYER_EMAIL]
Counsel for the Applicant`,
  },

  {
    id: 'fir-response-letter',
    name: 'FIR Response Letter',
    category: 'criminal',
    description: 'Letter to the Superintendent of Police responding to / seeking quashing of an FIR.',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar No.: [BAR_NUMBER]

Date: [DATE]

To,
The Superintendent of Police / Station House Officer,
Police Station: _______________,
[CITY], [STATE]

Subject: Response / Representation against FIR No. [CASE_NUMBER] dated _______________

Sir / Madam,

I am instructed by and write on behalf of my Client, [CLIENT_NAME], [CLIENT_ADDRESS], who has been named as accused / suspect in the above FIR registered at your police station at the instance of [OPPOSING_PARTY].

2. THE FIR AND ALLEGATIONS: [CASE_DESCRIPTION]

3. REBUTTAL OF ALLEGATIONS:
   (a) My Client categorically denies each and every allegation levelled against him/her in the said FIR.
   (b) The FIR has been filed out of personal animosity / a property dispute / commercial rivalry between my Client and the complainant, and is entirely baseless.
   (c) My Client was not present at the scene at the time alleged. Supporting evidence is enclosed.
   (d) No cognisable offence, even as prima facie stated, is made out against my Client.

4. DOCUMENTS ENCLOSED:
   (a) Identity and residence proof of my Client;
   (b) _______________ (supporting documentary evidence);
   (c) Copies of relevant correspondence.

5. REQUEST: My Client requests that:
   (a) A fair and impartial investigation be conducted;
   (b) My Client not be arrested without prior notice to enable him/her to cooperate;
   (c) A copy of the FIR and related documents be provided as per statutory entitlement.

6. My Client undertakes to cooperate fully with the investigation and shall appear before the Investigating Officer on any date communicated with at least 48 hours' notice.

Yours faithfully,

______________________________
[LAWYER_NAME], Advocate
[BAR_NUMBER] | [FIRM_NAME]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Enclosures: As above`,
  },

  {
    id: 'vakalatnama',
    name: 'Vakalatnama',
    category: 'criminal',
    description: 'Standard vakalatnama authorising an advocate to appear and act in court.',
    content: `VAKALATNAMA

IN THE [COURT_NAME]
[JURISDICTION]

Case No.: [CASE_NUMBER]
Date of Next Hearing: [DATE_OF_HEARING]

BETWEEN:
[CLIENT_NAME]                                         … Petitioner / Applicant / Accused
AND
[OPPOSING_PARTY] / STATE OF [STATE]                   … Respondent / Complainant

VAKALATNAMA

I, [CLIENT_NAME], [CLIENT_ADDRESS], do hereby appoint and retain [LAWYER_NAME], Advocate, enrolled with the Bar Council of [STATE], Enrolment No. [BAR_NUMBER], practising at [FIRM_NAME], [LAWYER_ADDRESS], [CITY], as my Advocate to act, appear, and plead on my behalf in the above matter and in all proceedings arising therefrom, including appeals, revisions, execution, and any other ancillary proceedings.

I authorise my Advocate to:
(a) File, sign, and verify all plaints, petitions, applications, affidavits, written statements, and other documents;
(b) Compromise, settle, or withdraw proceedings with my prior consent;
(c) Accept notices, summons, and processes on my behalf;
(d) Appoint and instruct junior advocates and clerks as necessary;
(e) Receive all costs and moneys awarded in my favour by the Court.

I agree to ratify and confirm all acts done by my Advocate in pursuance of this Vakalatnama.

Signed at [CITY] on [DATE].

______________________________
[CLIENT_NAME]
(Signature of Client)

ACCEPTED BY ADVOCATE:

I, [LAWYER_NAME], Advocate, Bar No. [BAR_NUMBER], do hereby accept the above vakalatnama and undertake to appear and act in the matter in accordance with the rules of professional conduct.

______________________________
[LAWYER_NAME], Advocate
[BAR_NUMBER] | [FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]`,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // FINANCIAL / CORPORATE
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'memorandum-of-understanding',
    name: 'Memorandum of Understanding (MOU)',
    category: 'financial',
    description: 'Non-binding framework agreement outlining the intent and terms of a proposed arrangement.',
    content: `MEMORANDUM OF UNDERSTANDING

This Memorandum of Understanding ("MOU") is entered into on [DATE] between:

PARTY A:  [CLIENT_NAME], [CLIENT_ADDRESS] (hereinafter "Party A"); AND
PARTY B:  [OPPOSING_PARTY] (hereinafter "Party B").

Collectively referred to as "the Parties".

Drafted by: [LAWYER_NAME], Advocate, [FIRM_NAME], [BAR_NUMBER], [CITY].

PURPOSE
The Parties intend to set out their mutual understanding regarding: [CASE_DESCRIPTION]

WHEREAS the Parties wish to record the terms of their proposed collaboration / transaction / arrangement in writing, this MOU is executed as follows:

1. SCOPE OF COOPERATION
   The Parties agree to cooperate in good faith for the purpose of [CASE_DESCRIPTION] on terms mutually agreed and to be incorporated in a formal definitive agreement ("Definitive Agreement").

2. KEY TERMS (INDICATIVE)
   (a) Consideration / Investment:    ₹[AMOUNT]
   (b) Duration of Arrangement:       _______________ months/years
   (c) Roles & Responsibilities:      As set out in Schedule I (to be annexed)
   (d) Revenue / Profit Sharing:      As agreed between the Parties

3. EXCLUSIVITY
   During the period of ___ days from the date of this MOU, Party A / the Parties shall not negotiate with any third party regarding the subject matter hereof without prior written consent.

4. CONFIDENTIALITY
   Each Party shall keep the terms of this MOU and all related negotiations strictly confidential.

5. NON-BINDING NATURE
   This MOU is a statement of intent only and is not legally binding except for Clauses 4 (Confidentiality) and 6 (Governing Law), which shall be binding.

6. GOVERNING LAW
   This MOU shall be governed by Indian law. Any disputes shall be subject to the jurisdiction of courts in [CITY].

7. DEFINITIVE AGREEMENT
   The Parties shall endeavour to execute a Definitive Agreement within ___ days of this MOU.

8. TERMINATION
   Either Party may terminate this MOU on 7 days' written notice without liability.

______________________________          ______________________________
[CLIENT_NAME] (Party A)                 [OPPOSING_PARTY] (Party B)
Date: _______________                   Date: _______________

Witnessed by:
[LAWYER_NAME], Advocate — [BAR_NUMBER]
[FIRM_NAME], [CITY]`,
  },

  {
    id: 'loan-agreement',
    name: 'Loan Agreement',
    category: 'financial',
    description: 'Formal agreement documenting a loan between two parties, including repayment terms.',
    content: `LOAN AGREEMENT

This Loan Agreement ("Agreement") is entered into on [DATE] between:

LENDER:   [CLIENT_NAME], [CLIENT_ADDRESS] ("Lender"); AND
BORROWER: [OPPOSING_PARTY] ("Borrower").

Drafted by: [LAWYER_NAME], Advocate, [FIRM_NAME], [BAR_NUMBER], [CITY].

WHEREAS the Lender agrees to advance a loan to the Borrower, and the Borrower agrees to repay the same, on the terms and conditions set forth herein;

NOW, THEREFORE, the parties agree as follows:

1. LOAN AMOUNT
   The Lender agrees to lend and the Borrower agrees to borrow the sum of ₹[AMOUNT] (Rupees _______________ only) ("Loan Amount").

2. DISBURSEMENT
   The Loan Amount shall be disbursed by [mode: NEFT/cheque/cash] to the Borrower's account on or before _______________.

3. INTEREST
   The Loan shall bear interest at the rate of ___% per annum, computed on a reducing balance basis, payable monthly.

4. REPAYMENT SCHEDULE
   (a) The Loan shall be repaid in ___ equal monthly instalments of ₹_______________ each, commencing from _______________.
   (b) All payments shall be made by the ___ day of each calendar month.
   (c) In case of default in any instalment, the entire outstanding balance shall become immediately due and payable.

5. SECURITY
   As security for repayment, the Borrower provides: [description of security / "nil" if unsecured].

6. PREPAYMENT
   The Borrower may prepay the Loan, in whole or in part, at any time without penalty, provided 15 days' prior written notice is given.

7. EVENTS OF DEFAULT
   The following shall constitute events of default: (a) failure to pay any instalment within 15 days of due date; (b) insolvency or bankruptcy of the Borrower; (c) material misrepresentation.

8. GOVERNING LAW
   This Agreement is governed by Indian law and subject to the jurisdiction of courts at [CITY].

IN WITNESS WHEREOF the parties have executed this Agreement on [DATE].

______________________________          ______________________________
[CLIENT_NAME] (Lender)                  [OPPOSING_PARTY] (Borrower)
Date: _______________                   Date: _______________

WITNESSES:
1. ___________________________    2. ___________________________

Prepared by: [LAWYER_NAME], Advocate — [BAR_NUMBER], [FIRM_NAME], [CITY]`,
  },

  {
    id: 'partnership-deed',
    name: 'Partnership Deed',
    category: 'financial',
    description: 'Deed constituting a partnership firm and governing relations between partners.',
    content: `PARTNERSHIP DEED

This Partnership Deed ("Deed") is executed at [CITY] on [DATE] between:

PARTNER 1: [CLIENT_NAME], [CLIENT_ADDRESS] ("Partner 1"); AND
PARTNER 2: [OPPOSING_PARTY] ("Partner 2").

(Collectively referred to as "the Partners")

Prepared by: [LAWYER_NAME], Advocate, [FIRM_NAME], [BAR_NUMBER], [CITY].

WHEREAS the Partners desire to carry on business in partnership on the terms and conditions set out herein;

NOW, THEREFORE, THIS DEED WITNESSES AS FOLLOWS:

1. FIRM NAME
   The partnership shall carry on business under the name and style of "_______________ & Co." / "[CLIENT_NAME] & [OPPOSING_PARTY]" or such other name as the Partners may agree.

2. NATURE OF BUSINESS
   [CASE_DESCRIPTION] and all incidental and ancillary activities.

3. PLACE OF BUSINESS
   The principal place of business shall be [CLIENT_ADDRESS]. Additional branches may be opened by mutual consent.

4. COMMENCEMENT
   The partnership shall commence on [DATE] and continue until dissolved in accordance with this Deed.

5. CAPITAL CONTRIBUTION
   Partner 1 shall contribute ₹[AMOUNT] and Partner 2 shall contribute ₹_______________ as initial capital. Additional capital may be introduced by mutual consent.

6. PROFIT & LOSS SHARING
   Profits and losses of the partnership shall be shared equally (50:50) / in the ratio of ___:___ between Partner 1 and Partner 2.

7. MANAGEMENT
   Both Partners shall jointly manage the firm. Day-to-day operations shall be managed by Partner _______________.

8. DRAWINGS
   Each Partner may withdraw ₹_______________ per month from the firm's accounts as drawings, subject to the firm's financial position.

9. BANKING
   All firm accounts shall be operated jointly by both Partners / by Partner _______________ alone.

10. RETIREMENT & DISSOLUTION
    A Partner may retire by giving 30 days' written notice. The firm shall be dissolved on mutual agreement or by order of a competent court.

11. ARBITRATION
    All disputes shall be referred to arbitration under the Arbitration and Conciliation Act, 1996.

12. GOVERNING LAW
    This Deed is governed by the Indian Partnership Act, 1932, and the laws of India.

IN WITNESS WHEREOF the Partners have executed this Deed on the date stated above.

______________________________          ______________________________
[CLIENT_NAME] (Partner 1)               [OPPOSING_PARTY] (Partner 2)
Date: _______________                   Date: _______________

WITNESSES:
1. ___________________________    2. ___________________________

Prepared by: [LAWYER_NAME], Advocate — [BAR_NUMBER], [FIRM_NAME], [CITY]`,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // FAMILY
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'divorce-petition',
    name: 'Divorce Petition',
    category: 'family',
    description: 'Petition for dissolution of marriage under the Hindu Marriage Act / Special Marriage Act.',
    content: `IN THE [COURT_NAME]
[JURISDICTION]

Petition No. _____ of [DATE]

IN THE MATTER OF:
[CLIENT_NAME], [CLIENT_ADDRESS]                       … Petitioner

VERSUS

[OPPOSING_PARTY]                                      … Respondent

PETITION FOR DIVORCE UNDER SECTION 13 OF THE HINDU MARRIAGE ACT, 1955
(/ SECTION 27 OF THE SPECIAL MARRIAGE ACT, 1954)

To,
The Honourable [COURT_NAME],
[JURISDICTION]

Most Respectfully Showeth:

1. That the Petitioner, [CLIENT_NAME], and the Respondent, [OPPOSING_PARTY], were married on _______________ at _______________, in accordance with Hindu rites and ceremonies / under the Special Marriage Act, as evidenced by Marriage Certificate No. _______________.

2. That from the said marriage, ___ child/children was/were born: (i) _______________, aged ___; (ii) _______________, aged ___.

3. That the matrimonial home was at [CLIENT_ADDRESS].

4. GROUNDS FOR DIVORCE: [CASE_DESCRIPTION]
   The Petitioner states that the Respondent has:
   (a) treated the Petitioner with cruelty (physical and/or mental) since ____________;
   (b) deserted the Petitioner without reasonable cause and without the Petitioner's consent for a continuous period of not less than two years prior to this petition; OR
   (c) [other applicable ground].

5. That the parties have been living separately since _______________ and there is no reasonable possibility of reconciliation.

6. That no previous petition for divorce / judicial separation has been filed except: [none / details].

PRAYER
The Petitioner, therefore, most respectfully prays that this Honourable Court may be pleased to:
(a) Decree dissolution of the marriage between the Petitioner and the Respondent;
(b) Award permanent alimony of ₹[AMOUNT] per month to the Petitioner / ward custody as prayed;
(c) Grant costs of this petition; and
(d) Grant such further and other relief as this Honourable Court deems fit.

Place: [CITY]
Date: [DATE]

______________________________
[CLIENT_NAME] (Petitioner)

______________________________
[LAWYER_NAME], Advocate
[BAR_NUMBER] | [FIRM_NAME]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]
Counsel for the Petitioner`,
  },

  {
    id: 'child-custody-agreement',
    name: 'Child Custody Agreement',
    category: 'family',
    description: 'Consent terms for child custody, visitation, and parenting plan between separated parents.',
    content: `CHILD CUSTODY AGREEMENT / CONSENT TERMS

This Agreement is entered into on [DATE] between:

PARENT 1: [CLIENT_NAME], [CLIENT_ADDRESS] ("Mother / Father"); AND
PARENT 2: [OPPOSING_PARTY] ("Father / Mother").

(Collectively "the Parents")

In the matter of the custody, care, and welfare of the minor child/children:
(i) Name: _______________, Date of Birth: _______________
(ii) Name: _______________, Date of Birth: _______________ (if applicable)
("the Child / Children")

Prepared by: [LAWYER_NAME], Advocate, [FIRM_NAME], [BAR_NUMBER], [CITY].

BACKGROUND
The Parents, having separated / obtained a decree of divorce / judicial separation, now wish to formalise arrangements for the upbringing of the Child in the best interests of the Child.

TERMS AGREED:

1. CUSTODY
   (a) Primary / Physical Custody shall vest with [CLIENT_NAME / OPPOSING_PARTY].
   (b) Legal Custody (decision-making authority regarding education, health, and welfare) shall be shared jointly by both Parents.

2. VISITATION / PARENTING TIME
   [OPPOSING_PARTY / CLIENT_NAME] shall have visitation rights as follows:
   (a) Regular visitation: Every _____________ weekend from ___ a.m. to ___ p.m.;
   (b) School holidays: Alternate holidays as mutually agreed;
   (c) Summer vacation: Weeks _____ to _____ with each Parent alternately;
   (d) Festivals: As per Schedule A annexed hereto.

3. CHILD SUPPORT / MAINTENANCE
   [OPPOSING_PARTY] shall pay monthly maintenance of ₹[AMOUNT] to [CLIENT_NAME] for the Child's upkeep, payable by the ___ day of each month.

4. EDUCATION & HEALTH DECISIONS
   Major decisions shall be taken jointly. In case of emergency, the Parent with the Child may act and inform the other promptly.

5. RELOCATION
   Neither Parent shall relocate with the Child outside [CITY] / India without the prior written consent of the other Parent or Court order.

6. REVIEW
   The terms of this Agreement may be reviewed by mutual consent or by application to the Court as the Child's needs change.

7. BEST INTERESTS
   Both Parents covenant to act at all times in the best interests of the Child and to refrain from making derogatory statements about the other Parent in the Child's presence.

Signed at [CITY] on [DATE].

______________________________          ______________________________
[CLIENT_NAME] (Parent 1)                [OPPOSING_PARTY] (Parent 2)
Date: _______________                   Date: _______________

Prepared by: [LAWYER_NAME], Advocate — [BAR_NUMBER], [FIRM_NAME], [CITY]`,
  },

  {
    id: 'alimony-agreement',
    name: 'Alimony Agreement',
    category: 'family',
    description: 'Agreement specifying permanent alimony or maintenance payable between spouses.',
    content: `ALIMONY / MAINTENANCE AGREEMENT

This Agreement is entered into on [DATE] between:

PAYER:    [OPPOSING_PARTY] (hereinafter "the Payer"); AND
PAYEE:    [CLIENT_NAME], [CLIENT_ADDRESS] (hereinafter "the Payee").

Prepared by: [LAWYER_NAME], Advocate, [FIRM_NAME], [BAR_NUMBER], [CITY].

RECITALS
WHEREAS the Payer and the Payee are parties to matrimonial proceedings / have obtained a decree of divorce in Petition No. [CASE_NUMBER] before [COURT_NAME]; AND WHEREAS both parties wish to resolve the question of alimony / permanent maintenance amicably;

NOW, THEREFORE, in full and final settlement of the Payee's claim for alimony and maintenance, the parties agree as follows:

1. ALIMONY / MAINTENANCE
   (a) Lump Sum Settlement: The Payer shall pay the Payee a lump sum amount of ₹[AMOUNT] (Rupees _______________ only) within ___ days of execution of this Agreement; OR
   (b) Monthly Maintenance: The Payer shall pay the Payee ₹[AMOUNT] per month, payable on or before the 5th day of each month, commencing [DATE].

2. DURATION
   Monthly maintenance (if applicable) shall continue until:
   (a) the death of the Payee; or
   (b) the Payee's remarriage; or
   (c) as ordered by the Court; whichever is earlier.

3. ESCALATION
   Monthly maintenance shall increase by ___% per annum to account for inflation, or as mutually agreed.

4. MEDICAL EXPENSES
   The Payer shall additionally bear the Payee's medical expenses up to ₹_______________ per annum.

5. VARIATION
   This Agreement may be modified by written consent or by order of the competent court.

6. FULL AND FINAL SETTLEMENT
   The Payee acknowledges that receipt of the agreed alimony constitutes full and final settlement of all financial claims arising from the marriage.

7. GOVERNING LAW
   This Agreement is governed by the Hindu Marriage Act / Special Marriage Act / applicable personal law and the laws of India.

Signed at [CITY] on [DATE].

______________________________          ______________________________
[OPPOSING_PARTY] (Payer)                [CLIENT_NAME] (Payee)
Date: _______________                   Date: _______________

WITNESSES:
1. ___________________________    2. ___________________________

Prepared by: [LAWYER_NAME], Advocate — [BAR_NUMBER], [FIRM_NAME], [CITY]`,
  },

  // ══════════════════════════════════════════════════════════════════════════
  // PROPERTY
  // ══════════════════════════════════════════════════════════════════════════

  {
    id: 'sale-deed',
    name: 'Sale Deed',
    category: 'property',
    description: 'Registered sale deed transferring ownership of immovable property.',
    content: `SALE DEED

This Sale Deed ("Deed") is executed at [CITY] on [DATE] between:

VENDOR:    [CLIENT_NAME], [CLIENT_ADDRESS] (hereinafter "the Vendor"); AND
PURCHASER: [OPPOSING_PARTY] (hereinafter "the Purchaser").

Prepared by: [LAWYER_NAME], Advocate, [FIRM_NAME], [BAR_NUMBER], [CITY].

PROPERTY DESCRIPTION
All that piece and parcel of immovable property bearing Survey No. / Flat No. / Plot No. _______________, situated at _______________, [CITY], [STATE], admeasuring _______________ sq. ft. / sq. m., more fully described in Schedule A annexed hereto ("the Property").

WHEREAS the Vendor is the absolute owner of the Property, free from all encumbrances, claims, and demands; AND WHEREAS the Vendor has agreed to sell and the Purchaser has agreed to purchase the Property on the terms herein;

NOW, THEREFORE, THIS DEED WITNESSES AS FOLLOWS:

1. SALE CONSIDERATION
   The total sale consideration is ₹[AMOUNT] (Rupees _______________ only), which the Purchaser has paid / agreed to pay to the Vendor as follows:
   (a) Advance paid on _______________:    ₹_______________
   (b) Balance payable on registration:   ₹_______________

2. RECEIPT OF CONSIDERATION
   The Vendor hereby acknowledges receipt of the full consideration and gives a valid and effective discharge therefor.

3. TRANSFER OF TITLE
   The Vendor hereby transfers and conveys to the Purchaser all the Vendor's right, title, and interest in the Property, free from all encumbrances.

4. VACANT POSSESSION
   The Vendor shall deliver vacant and peaceful possession of the Property to the Purchaser on or before _______________.

5. VENDOR'S WARRANTIES
   The Vendor warrants that: (a) the Property is free from all mortgages, charges, and claims; (b) the Vendor has full power to sell; (c) all property taxes, dues, and outgoings up to date of sale have been paid.

6. REGISTRATION
   This Deed shall be registered before the Sub-Registrar of Assurances, [CITY], and stamp duty and registration charges shall be borne by the Purchaser.

7. GOVERNING LAW
   This Deed is governed by the Transfer of Property Act, 1882, Registration Act, 1908, and the laws of India.

IN WITNESS WHEREOF the parties have signed this Deed on the date stated above.

______________________________          ______________________________
[CLIENT_NAME] (Vendor)                  [OPPOSING_PARTY] (Purchaser)

WITNESSES:
1. ___________________________    2. ___________________________

SCHEDULE A — PROPERTY DESCRIPTION
_______________________________________________

Prepared by: [LAWYER_NAME], Advocate — [BAR_NUMBER], [FIRM_NAME], [CITY]`,
  },

  {
    id: 'lease-agreement',
    name: 'Lease Agreement',
    category: 'property',
    description: 'Commercial or residential lease agreement for a term exceeding 11 months.',
    content: `LEASE AGREEMENT

This Lease Agreement ("Agreement") is executed at [CITY] on [DATE] between:

LESSOR:  [CLIENT_NAME], [CLIENT_ADDRESS] (hereinafter "the Lessor / Landlord"); AND
LESSEE:  [OPPOSING_PARTY] (hereinafter "the Lessee / Tenant").

Prepared by: [LAWYER_NAME], Advocate, [FIRM_NAME], [BAR_NUMBER], [CITY].

PROPERTY
Flat / Office / Premises No. _______________, situated at _______________, [CITY], [STATE], admeasuring approximately _______________ sq. ft. (hereinafter "the Premises").

WHEREAS the Lessor is the owner and in lawful possession of the Premises and desires to let out the same on lease to the Lessee for residential / commercial purposes;

NOW THIS AGREEMENT WITNESSES AS FOLLOWS:

1. TERM OF LEASE
   The lease shall commence on [DATE] and shall be for a period of ___ years, expiring on _______________, renewable on mutual consent.

2. LEASE RENT
   The monthly lease rent shall be ₹[AMOUNT] payable on or before the ___ day of each month.

3. SECURITY DEPOSIT
   The Lessee has deposited ₹_______________ (equivalent to ___ months' rent) as interest-free refundable security deposit, to be returned on vacation of the Premises after deduction of outstanding dues and repair costs.

4. USE OF PREMISES
   The Lessee shall use the Premises only for residential / commercial purposes and shall not sublet, assign, or part with possession without the Lessor's prior written consent.

5. MAINTENANCE & REPAIRS
   (a) The Lessee shall maintain the Premises in good condition and return it in the same state at the end of the lease.
   (b) Minor repairs (below ₹_______________) shall be the Lessee's responsibility.
   (c) Major structural repairs shall be the Lessor's responsibility.

6. UTILITIES
   Electricity, water, and other utility charges shall be borne by the Lessee and paid directly to the concerned authorities.

7. TERMINATION
   Either party may terminate this Agreement by giving ___ months' written notice.

8. REGISTRATION
   This Agreement shall be registered in accordance with the Registration Act, 1908. Stamp duty and registration charges shall be borne equally / by the Lessee.

IN WITNESS WHEREOF the parties have executed this Agreement on [DATE].

______________________________          ______________________________
[CLIENT_NAME] (Lessor)                  [OPPOSING_PARTY] (Lessee)

WITNESSES:
1. ___________________________    2. ___________________________

Prepared by: [LAWYER_NAME], Advocate — [BAR_NUMBER], [FIRM_NAME], [CITY]`,
  },

  {
    id: 'rent-agreement',
    name: 'Rent Agreement',
    category: 'property',
    description: '11-month rental agreement for residential premises (not requiring compulsory registration).',
    content: `RENT AGREEMENT

This Rent Agreement ("Agreement") is made and executed at [CITY] on [DATE] between:

OWNER / LANDLORD: [CLIENT_NAME], [CLIENT_ADDRESS] (hereinafter "the Owner"); AND
TENANT:           [OPPOSING_PARTY] (hereinafter "the Tenant").

PROPERTY: Flat / House No. _______________, [CLIENT_ADDRESS], [CITY], [STATE] — hereinafter "the Premises".

TERMS AND CONDITIONS:

1. TERM: The tenancy shall be for a period of Eleven (11) months commencing [DATE] and ending on _______________.

2. MONTHLY RENT: ₹[AMOUNT] per month, payable on or before the ___ day of each month in advance. Rent shall be paid by [cash / bank transfer / UPI].

3. SECURITY DEPOSIT: ₹_______________ (equivalent to ___ months' rent) has been received by the Owner as refundable security, free of interest, to be returned on vacation after deducting arrears and damage costs.

4. PURPOSE: The Tenant shall use the Premises solely for residential purposes for self and immediate family members. No commercial activity shall be conducted.

5. SUBLETTING: The Tenant shall not sublet, assign, or part with possession of the Premises without the Owner's written consent.

6. UTILITIES: Electricity, gas, water, and maintenance charges shall be paid directly by the Tenant.

7. MAINTENANCE: The Tenant shall maintain the Premises in clean condition and shall not make any structural alterations without prior written consent.

8. INSPECTION: The Owner shall have the right to inspect the Premises with 24 hours' notice.

9. RENEWAL: This Agreement may be renewed for a further period on mutually agreed terms before expiry.

10. TERMINATION: Either party may terminate this Agreement by giving one month's written notice.

11. LOCK-IN PERIOD: Neither party shall terminate the Agreement for the first ___ months.

12. GOVERNING LAW: This Agreement is governed by the applicable Rent Control legislation of [STATE] and the Transfer of Property Act, 1882.

IN WITNESS WHEREOF the parties have signed this Agreement on [DATE].

______________________________          ______________________________
[CLIENT_NAME] (Owner)                   [OPPOSING_PARTY] (Tenant)

WITNESSES:
1. Name: _____________  Sign: _____________  Date: _______________
2. Name: _____________  Sign: _____________  Date: _______________

Prepared by: [LAWYER_NAME], Advocate — [BAR_NUMBER], [FIRM_NAME], [CITY]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]`,
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Specialization → category mapping
// ─────────────────────────────────────────────────────────────────────────────

const SPECIALIZATION_CATEGORY_MAP = {
  'Criminal Lawyer':                         ['criminal'],
  'Financial / Corporate Lawyer':            ['financial'],
  'Family Lawyer':                           ['family'],
  'Civil Lawyer':                            ['civil'],
  'Property / Real Estate Lawyer':           ['property'],
  'Tax Lawyer':                              ['tax', 'financial'],
  'Immigration Lawyer':                      ['immigration'],
  'Intellectual Property (IP) Lawyer':       ['ip'],
  'Labour / Employment Lawyer':              ['labour'],
  'Other':                                   [],
}

/**
 * Returns all general templates plus templates matching the given specialization.
 * Falls back to all templates if the specialization is unrecognised.
 *
 * @param {string} specialization - Value from lawyer_profiles.specialization
 * @returns {Array} Filtered array of template objects
 */
export function getTemplatesForSpecialization(specialization) {
  const categories = SPECIALIZATION_CATEGORY_MAP[specialization]

  if (!categories) {
    // Unknown specialization — return everything
    return templates
  }

  return templates.filter(
    t => t.category === 'general' || categories.includes(t.category)
  )
}

export default templates
