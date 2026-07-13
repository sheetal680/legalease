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

  // ── GENERAL ───────────────────────────────────────────────────────────────

  {
    id: 'general-power-of-attorney',
    name: 'General Power of Attorney',
    category: 'general',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

GENERAL POWER OF ATTORNEY

I, [CLIENT_NAME], son/daughter of [FATHER_NAME], aged [CLIENT_AGE] years, residing at [CLIENT_ADDRESS], do hereby constitute, nominate, appoint and authorise [ATTORNEY_NAME], son/daughter of [ATTORNEY_FATHER_NAME], aged [ATTORNEY_AGE] years, residing at [ATTORNEY_ADDRESS], as my true and lawful Attorney to act, transact, deal, and sign on my behalf as follows:

WHEREAS the Donor is desirous of appointing a Power of Attorney to manage, conduct, and attend to all matters, business, dealings, and affairs of every nature and description on his/her behalf;

NOW THIS GENERAL POWER OF ATTORNEY WITNESSES AS FOLLOWS:

1. TO manage, conduct, look after, supervise, and deal with all matters pertaining to immovable properties owned or possessed by me or in which I have any interest, including but not limited to selling, purchasing, leasing, mortgaging, or otherwise dealing with the same.

2. TO appear before all Courts of Law, Tribunals, Revenue Courts, Government Offices, Semi-Government Bodies, Municipal Corporations, Development Authorities, and all other authorities and officers and to present, file, and sign all plaints, petitions, applications, affidavits, appeals, revisions, reviews, and other documents in connection with all cases, suits, or proceedings in which I am or may be a party.

3. TO receive, recover, and give receipts for all sums of money, debts, dues, rents, interests, profits, and other amounts due and payable to me from any person, firm, company, or authority.

4. TO sign, execute, acknowledge, and deliver all deeds, instruments, agreements, contracts, receipts, vouchers, and other documents of every kind and description.

5. TO open, operate, close, and deal with bank accounts in any scheduled bank and to deposit, withdraw, and transfer moneys to and from such accounts.

6. TO do all such other acts, deeds, matters, and things as the said Attorney may in his/her absolute discretion deem necessary, expedient, or proper for and in connection with any of the purposes aforesaid.

I hereby declare that all acts done and things executed by the said Attorney in pursuance of this Power of Attorney shall be binding upon me, my heirs, successors, executors, administrators, and assigns as if done and executed by me personally.

IN WITNESS WHEREOF, I have hereunto set and subscribed my hand and seal on this [DATE] at [CITY].

Signature: ________________________
[CLIENT_NAME]
(Donor)

ACCEPTED BY ATTORNEY:
Signature: ________________________
[ATTORNEY_NAME]
(Attorney)

WITNESSES:
1. Name: _________________ Sign: _________________ Date: _____________
2. Name: _________________ Sign: _________________ Date: _____________

Drafted by:
[LAWYER_NAME]
Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]`,
  },

  {
    id: 'special-power-of-attorney',
    name: 'Special Power of Attorney',
    category: 'general',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

SPECIAL POWER OF ATTORNEY

I, [CLIENT_NAME], son/daughter of [FATHER_NAME], aged [CLIENT_AGE] years, residing at [CLIENT_ADDRESS], hereby appoint and constitute [ATTORNEY_NAME], residing at [ATTORNEY_ADDRESS], as my Special Attorney to do the following specific act(s) on my behalf:

PURPOSE OF THIS SPECIAL POWER OF ATTORNEY:

[SPECIFIC_PURPOSE]

IN FURTHERANCE of the above, my said Attorney is specifically authorised to:

1. TO execute all necessary documents, agreements, sale deeds, purchase deeds, or any other instruments in connection with [SPECIFIC_MATTER] bearing property/matter details: [PROPERTY_DETAILS].

2. TO appear before the Sub-Registrar's Office, [CITY], and to present for registration any deed or document executed in connection with the above matter and to admit execution thereof on my behalf.

3. TO negotiate, settle, and finalise the terms and conditions of [SPECIFIC_MATTER] on such terms and conditions as the Attorney deems fit and proper.

4. TO receive and acknowledge receipt of the consideration amount or any part thereof in connection with the above matter.

5. TO sign, execute, and deliver all papers, forms, applications, affidavits, declarations, and documents required by any authority in connection with the above matter.

6. TO do all such further acts and things as may be incidental or necessary for giving full effect to the powers conferred hereunder.

This Special Power of Attorney is specific to the matter described above and does not confer any general authority on the said Attorney. This Power of Attorney shall remain in force until the completion of the aforesaid purpose or until revoked by me in writing, whichever is earlier.

I undertake to ratify and confirm everything that my said Attorney shall lawfully do or cause to be done in pursuance of this Special Power of Attorney.

Executed at [CITY] on [DATE].

Signature: ________________________
[CLIENT_NAME]
(Donor/Principal)

WITNESSES:
1. Name: _________________ Sign: _________________ Date: _____________
2. Name: _________________ Sign: _________________ Date: _____________

Notarised/Drafted by:
[LAWYER_NAME]
Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]`,
  },

  {
    id: 'authorization-letter',
    name: 'Authorization Letter',
    category: 'general',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

AUTHORIZATION LETTER

To,
[RECIPIENT_NAME / AUTHORITY],
[RECIPIENT_ADDRESS]

Subject: Authorization to [AUTHORIZED_PERSON_NAME] to act on behalf of [CLIENT_NAME]

Dear Sir/Madam,

I, [CLIENT_NAME], son/daughter of [FATHER_NAME], aged [CLIENT_AGE] years, residing at [CLIENT_ADDRESS], do hereby authorize Mr./Ms. [AUTHORIZED_PERSON_NAME], son/daughter of [AUTHORIZED_FATHER_NAME], bearing [ID_TYPE] No. [ID_NUMBER], to act on my behalf for the following specific purpose:

PURPOSE:
[SPECIFIC_PURPOSE — e.g., "to collect the registered sale deed bearing Document No. [DOC_NO] dated [DOC_DATE] from the Sub-Registrar Office, [CITY]"]

SCOPE OF AUTHORIZATION:
The said authorized person is permitted to:
1. Appear before [AUTHORITY_NAME] on my behalf.
2. Sign and receive all documents, papers, and correspondence in connection with the above matter.
3. Make payments and collect receipts as required.
4. Do all acts incidental and necessary to complete the above purpose.

This authorization is limited to the specific purpose stated above and shall remain valid until [VALIDITY_DATE] or until the said purpose is accomplished, whichever is earlier.

I request you to extend all necessary cooperation and assistance to the said authorized person.

Yours sincerely,

Signature: ________________________
[CLIENT_NAME]
Date: [DATE]
Contact: [CLIENT_PHONE]

I, [AUTHORIZED_PERSON_NAME], accept the above authorization.

Signature: ________________________
[AUTHORIZED_PERSON_NAME]

Prepared by:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]
Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'undertaking-letter',
    name: 'Undertaking Letter',
    category: 'general',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

UNDERTAKING

To,
[RECIPIENT_NAME],
[RECIPIENT_DESIGNATION],
[RECIPIENT_ORGANIZATION],
[RECIPIENT_ADDRESS]

Subject: Undertaking by [CLIENT_NAME] regarding [SUBJECT_MATTER]

I, [CLIENT_NAME], son/daughter of [FATHER_NAME], aged [CLIENT_AGE] years, residing at [CLIENT_ADDRESS], do hereby solemnly undertake and declare as follows:

1. That I am fully aware of all the terms, conditions, rules, and regulations governing [SUBJECT_MATTER].

2. That I hereby undertake to [SPECIFIC_OBLIGATION_1].

3. That I further undertake to [SPECIFIC_OBLIGATION_2].

4. That I shall not, directly or indirectly, [PROHIBITED_ACTION].

5. That I shall comply with all applicable laws, rules, regulations, and directions of competent authorities in relation to [SUBJECT_MATTER].

6. That in the event of any breach of this undertaking by me, I shall be liable for all consequences as may be deemed appropriate by [RECIPIENT_ORGANIZATION], including forfeiture of any amount paid/deposited by me.

7. That this undertaking is voluntarily given without any coercion, undue influence, or misrepresentation and I am fully aware of the legal consequences of giving this undertaking.

8. That the facts stated herein are true and correct to the best of my knowledge and belief and nothing material has been concealed therefrom.

I undertake to abide by all terms stated above unconditionally.

Yours faithfully,

Signature: ________________________
[CLIENT_NAME]
Date: [DATE]
Place: [CITY]
Contact: [CLIENT_PHONE]

VERIFICATION:
I, [CLIENT_NAME], do hereby verify that the contents of the above undertaking are true and correct to the best of my knowledge and belief.

Verified at [CITY] on [DATE].

[CLIENT_NAME]

Witnessed and Drafted by:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]`,
  },

  {
    id: 'indemnity-bond',
    name: 'Indemnity Bond',
    category: 'general',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

INDEMNITY BOND

THIS INDEMNITY BOND is executed at [CITY] on [DATE] by:

[CLIENT_NAME], son/daughter of [FATHER_NAME], aged [CLIENT_AGE] years, residing at [CLIENT_ADDRESS] (hereinafter referred to as "the Indemnifier", which expression shall unless repugnant to the context include their heirs, legal representatives, executors, administrators, and assigns).

IN FAVOUR OF:

[BENEFICIARY_NAME], son/daughter of [BENEFICIARY_FATHER_NAME], residing at [BENEFICIARY_ADDRESS] (hereinafter referred to as "the Beneficiary").

WHEREAS:
1. The Beneficiary has [DESCRIBE_CIRCUMSTANCE — e.g., "agreed to release/deliver/make payment of [AMOUNT/ITEM] in favour of the Indemnifier"].
2. The Indemnifier has requested the Beneficiary to do so on the basis of this Indemnity Bond.

NOW, THEREFORE, in consideration of the Beneficiary agreeing to [SPECIFIC_ACT], the Indemnifier hereby agrees, undertakes, and covenants as follows:

1. The Indemnifier shall at all times hereafter indemnify, keep indemnified, and hold harmless the Beneficiary from and against all actions, suits, proceedings, claims, demands, costs, charges, damages, losses, and expenses of whatever nature which the Beneficiary may suffer, incur, or sustain in consequence of [INDEMNIFIED_EVENT].

2. The Indemnifier shall pay on demand to the Beneficiary all losses, damages, costs, and expenses which the Beneficiary may suffer or incur by reason of or arising out of [INDEMNIFIED_EVENT].

3. In the event the Indemnifier fails to pay the same, the Indemnifier shall be liable to pay interest at the rate of [INTEREST_RATE]% per annum on the outstanding amount from the date of demand until actual payment.

4. This indemnity shall be a continuing indemnity and shall remain in full force and effect until all claims arising hereunder have been fully satisfied.

5. The obligations under this Bond shall be binding upon the legal heirs, successors, and assigns of the Indemnifier.

IN WITNESS WHEREOF, the Indemnifier has executed this Indemnity Bond on the day, month, and year first above written.

Signature: ________________________
[CLIENT_NAME]
(Indemnifier)

WITNESSES:
1. Name: _________________ Sign: _________________ Date: _____________
2. Name: _________________ Sign: _________________ Date: _____________

Drafted by:
[LAWYER_NAME]
Advocate, Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY] | Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'surety-bond',
    name: 'Surety Bond',
    category: 'general',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

SURETY BOND

KNOW ALL MEN BY THESE PRESENTS THAT WE:

1. [CLIENT_NAME] (Principal), son/daughter of [FATHER_NAME], residing at [CLIENT_ADDRESS]; AND
2. [SURETY_NAME] (Surety), son/daughter of [SURETY_FATHER_NAME], residing at [SURETY_ADDRESS];

are jointly and severally held and firmly bound unto [OBLIGEE_NAME], [OBLIGEE_DESIGNATION], [OBLIGEE_ADDRESS] (hereinafter called "the Obligee") in the sum of Rs. [BOND_AMOUNT]/- (Rupees [BOND_AMOUNT_IN_WORDS] only) to be paid to the Obligee, for which payment well and truly to be made, we do jointly and severally bind ourselves, our heirs, executors, administrators, and assigns.

THE CONDITION OF THIS OBLIGATION IS SUCH THAT:

WHEREAS the Obligee has agreed to [OBLIGATION_DESCRIPTION — e.g., "release/grant bail to/permit"] the Principal subject to the Principal executing this Surety Bond for the due performance of [SPECIFIC_OBLIGATION].

NOW THEREFORE, if the Principal shall faithfully [CONDITION], then this obligation shall be null and void, otherwise it shall remain in full force and effect.

TERMS:
1. The Principal undertakes to [SPECIFIC_UNDERTAKING_1].
2. The Principal undertakes to [SPECIFIC_UNDERTAKING_2].
3. The Surety guarantees the performance of all obligations of the Principal under this Bond.
4. In case of default by the Principal, the Surety shall forthwith pay to the Obligee the entire bond amount of Rs. [BOND_AMOUNT]/-.
5. This Bond shall remain in force until [PERIOD/CONDITION].

The Principal and Surety acknowledge having read and understood the above terms.

Signature of Principal:           Signature of Surety:
[CLIENT_NAME]                     [SURETY_NAME]
Date: [DATE]                      Date: [DATE]

WITNESSES:
1. Name: _______________ Sign: _______________ Date: _______________
2. Name: _______________ Sign: _______________ Date: _______________

Drafted by:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]`,
  },

  {
    id: 'settlement-agreement',
    name: 'Settlement Agreement',
    category: 'general',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

SETTLEMENT AGREEMENT

THIS SETTLEMENT AGREEMENT ("Agreement") is entered into on [DATE] at [CITY] between:

PARTY 1: [CLIENT_NAME], son/daughter of [FATHER_NAME], residing at [CLIENT_ADDRESS] (hereinafter referred to as "Party A"); AND

PARTY 2: [OPPOSING_PARTY], son/daughter of [OPPOSING_FATHER_NAME], residing at [OPPOSING_ADDRESS] (hereinafter referred to as "Party B").

RECITALS:
A. A dispute has arisen between the parties in relation to [DISPUTE_DESCRIPTION] (hereinafter referred to as "the Dispute").
B. The parties have agreed to settle the Dispute amicably on the terms and conditions set out herein without admission of any liability by either party.
C. This Agreement is entered into voluntarily by both parties with full understanding of its legal implications.

TERMS OF SETTLEMENT:
1. PAYMENT: Party [A/B] shall pay to Party [A/B] a sum of Rs. [SETTLEMENT_AMOUNT]/- (Rupees [AMOUNT_IN_WORDS] only) as full and final settlement of all claims arising out of or in connection with the Dispute. The said amount shall be paid by [PAYMENT_MODE] on or before [PAYMENT_DATE].

2. WITHDRAWAL OF CASES: Both parties agree to withdraw/not proceed with any legal proceedings, complaints, or cases filed against each other in relation to the Dispute, including [CASE_DETAILS if any].

3. FULL AND FINAL SETTLEMENT: Upon receipt of the settlement amount, both parties agree that all claims, demands, rights, and causes of action, whether existing or future, arising from the Dispute shall stand fully and finally settled.

4. RELEASE: Each party hereby releases and discharges the other party from all claims, suits, actions, causes of action, and demands of any kind arising from or in connection with the Dispute.

5. NON-DISPARAGEMENT: Both parties agree not to make any disparaging remarks or statements against each other in connection with the Dispute.

6. CONFIDENTIALITY: The parties agree to keep the terms of this Agreement strictly confidential.

7. GOVERNING LAW: This Agreement shall be governed by the laws of India and courts at [CITY] shall have exclusive jurisdiction.

IN WITNESS WHEREOF, the parties have executed this Settlement Agreement on the date mentioned above.

Party A:                           Party B:
[CLIENT_NAME]                      [OPPOSING_PARTY]

WITNESSES:
1. Name: _______________ Sign: _______________
2. Name: _______________ Sign: _______________

Drafted and Witnessed by:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME]`,
  },

  {
    id: 'demand-notice',
    name: 'Demand Notice',
    category: 'general',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

LEGAL NOTICE / DEMAND NOTICE

To,
[NOTICEE_NAME],
[NOTICEE_ADDRESS]

Sent via: Speed Post / Registered Post AD / Email

Under instructions from and on behalf of my client, [CLIENT_NAME], son/daughter of [FATHER_NAME], residing at [CLIENT_ADDRESS], I hereby issue this Legal Demand Notice as under:

1. That my client and you [entered into an agreement/are in a business relationship/are known to each other] in connection with [MATTER_DESCRIPTION] on [RELEVANT_DATE].

2. That as per the said agreement/understanding, you had undertaken and agreed to [OBLIGATION — e.g., "repay the sum of Rs. [AMOUNT]/- within [PERIOD]"/ "deliver [GOODS/PROPERTY]"/"perform [SPECIFIC_ACT]"].

3. That despite repeated oral and written requests and reminders by my client, you have failed, neglected, and refused to fulfil your obligations as stated above and have thereby committed a clear breach of your duties.

4. That owing to your default, my client has suffered and is continuing to suffer monetary loss and injury to the tune of Rs. [LOSS_AMOUNT]/- (Rupees [LOSS_IN_WORDS] only), besides mental agony, harassment, and loss of time.

5. That my client has a clear and subsisting legal right to claim and recover from you the sum of Rs. [DEMAND_AMOUNT]/- (Rupees [DEMAND_IN_WORDS] only) along with interest at [INTEREST_RATE]% per annum from [DATE] till date of realisation.

YOU ARE THEREFORE HEREBY CALLED UPON to pay/perform [SPECIFIC_DEMAND] within [NOTICE_PERIOD] days from the receipt of this Notice, failing which my client shall be constrained to initiate appropriate civil and/or criminal proceedings against you before the competent court of law, entirely at your risk, cost, and consequences.

Please note that this Notice shall be treated as a notice under Section 80 of the Code of Civil Procedure, 1908 as well as under any other applicable provision of law.

Yours truly,

[LAWYER_NAME]
Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Note: A copy of this Notice is retained in our office for record.`,
  },

  {
    id: 'cease-and-desist',
    name: 'Cease and Desist Notice',
    category: 'general',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

WITHOUT PREJUDICE
CEASE AND DESIST NOTICE

To,
[NOTICEE_NAME],
[NOTICEE_DESIGNATION (if applicable)],
[NOTICEE_ADDRESS]

Sent via: Registered Post AD / Email / Courier

Dear Sir/Madam,

Under instructions from and on behalf of my client, [CLIENT_NAME], I hereby serve upon you this Cease and Desist Notice as follows:

1. My client is the lawful owner/holder of [DESCRIPTION OF RIGHT — e.g., "the trademark/copyright/trade secret/property/business name"] being [SPECIFIC_DETAILS], which is legally protected under [APPLICABLE LAW — e.g., the Trade Marks Act, 1999 / Copyright Act, 1957 / Indian Penal Code].

2. It has come to the attention of my client that you have been engaged in the following unlawful act(s):

   (a) [INFRINGING/WRONGFUL ACT 1]
   (b) [INFRINGING/WRONGFUL ACT 2]
   (c) [INFRINGING/WRONGFUL ACT 3]

3. The aforesaid acts constitute a clear violation of my client's legal rights and are causing irreparable harm, damage, and financial loss to my client.

4. My client has not authorised, licensed, or consented to any of the above acts.

YOU ARE HEREBY CALLED UPON TO:

(i) IMMEDIATELY CEASE AND DESIST from [PROHIBITED CONDUCT];
(ii) REMOVE and/or DESTROY all materials, products, listings, or content that infringe upon my client's rights;
(iii) PROVIDE a written undertaking within [NOTICE_PERIOD] days from the receipt of this Notice that you have ceased the infringing activities;
(iv) PAY damages and compensation to my client for losses caused, the quantum of which is reserved.

Should you fail to comply with the above within the stipulated time, my client shall be constrained to initiate civil and/or criminal proceedings against you without further notice, including seeking injunctive relief, damages, and costs, all at your risk and expense.

This Notice is issued without prejudice to all rights and remedies available to my client under law.

Yours truly,

[LAWYER_NAME]
Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]`,
  },

  {
    id: 'witness-statement',
    name: 'Witness Statement / Affidavit of Evidence',
    category: 'general',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE COURT OF [COURT_NAME], [CITY]

[CASE_TYPE] No. [CASE_NUMBER] of [YEAR]

[PLAINTIFF/PETITIONER_NAME]                   ... Plaintiff/Petitioner
VERSUS
[DEFENDANT/RESPONDENT_NAME]                   ... Defendant/Respondent

AFFIDAVIT OF EVIDENCE / WITNESS STATEMENT

I, [WITNESS_NAME], son/daughter of [WITNESS_FATHER_NAME], aged [WITNESS_AGE] years, [WITNESS_OCCUPATION], residing at [WITNESS_ADDRESS], do hereby solemnly affirm and state as follows:

1. I am the [WITNESS ROLE — e.g., "witness on behalf of the Plaintiff/Defendant"] in the above-captioned matter. I am personally acquainted with the facts stated herein and I am competent to depose to the same.

2. I state that [FACT_1 — e.g., "I was present at [PLACE] on [DATE] when the incident described in the plaint occurred"].

3. I further state that [FACT_2].

4. I say that [FACT_3 — describe what witness saw, heard, or knows].

5. I say that [FACT_4].

6. I say that [FACT_5].

7. I say that on [DATE], I witnessed [SPECIFIC_EVENT_DESCRIPTION].

8. I state that the documents exhibited herewith as Exhibit [EXHIBIT_NO.] are true copies of the originals and are relevant to this matter.

9. I state that all the facts stated above are true and correct to the best of my knowledge, information, and belief.

10. I further state that nothing material has been concealed and the contents of this affidavit are true and correct.

VERIFICATION:
I, [WITNESS_NAME], the deponent above-named, do hereby verify that the contents of this affidavit are true and correct to the best of my knowledge and belief and that nothing material has been concealed therefrom.

Verified at [CITY] on [DATE].

Deponent: ________________________
[WITNESS_NAME]

Identified/Attested by:
[LAWYER_NAME]
Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]`,
  },

  {
    id: 'arbitration-notice',
    name: 'Arbitration Notice',
    category: 'general',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

NOTICE OF ARBITRATION
(Under Section 21 of the Arbitration and Conciliation Act, 1996)

To,
[RESPONDENT_NAME],
[RESPONDENT_ADDRESS]

Sent via: Registered Post AD / Courier with acknowledgement

Dear Sir/Madam,

Under the instructions from and on behalf of my client, [CLIENT_NAME], I hereby issue this Notice of Arbitration under Section 21 of the Arbitration and Conciliation Act, 1996 as under:

1. PARTIES: The Claimant is [CLIENT_NAME], [ADDRESS]. The Respondent is [RESPONDENT_NAME], [RESPONDENT_ADDRESS].

2. ARBITRATION AGREEMENT: The parties entered into an Agreement dated [AGREEMENT_DATE] bearing reference no. [REF_NO.] (hereinafter "the Agreement"), which contains an Arbitration Clause at Clause [CLAUSE_NO.], inter alia providing for resolution of disputes by arbitration.

3. DISPUTE: A dispute has arisen between the parties in respect of [DISPUTE_DESCRIPTION]. The Claimant's grievance arises from the Respondent's [BREACH/DEFAULT DESCRIPTION] in contravention of the terms of the Agreement.

4. RELIEF SOUGHT: The Claimant claims the following relief from the Arbitral Tribunal:
   (a) A sum of Rs. [CLAIM_AMOUNT]/- (Rupees [CLAIM_IN_WORDS] only) towards [NATURE OF CLAIM];
   (b) Interest at [INTEREST_RATE]% per annum on the aforesaid amount from [DATE] till realisation;
   (c) Costs of arbitration; and
   (d) Such further and other relief as the Arbitral Tribunal deems fit.

5. APPOINTMENT OF ARBITRATOR: In terms of Clause [CLAUSE_NO.] of the Agreement, the Claimant proposes the appointment of [PROPOSED_ARBITRATOR_NAME] as the sole arbitrator. You are requested to concur with the said appointment within 30 days of receipt of this Notice. In the event of failure to agree, the Claimant reserves the right to approach the competent court for appointment of an arbitrator under Section 11 of the Act.

6. SEAT AND LANGUAGE: The seat of arbitration shall be [SEAT_CITY] and the language of arbitration shall be English.

The Claimant reserves all its rights and remedies under the Agreement and the law.

Yours truly,

[LAWYER_NAME]
Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]`,
  },

  {
    id: 'compromise-deed',
    name: 'Compromise Deed',
    category: 'general',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

DEED OF COMPROMISE

THIS DEED OF COMPROMISE is made and executed on [DATE] at [CITY] between:

1. [CLIENT_NAME], son/daughter of [FATHER_NAME], aged [CLIENT_AGE] years, residing at [CLIENT_ADDRESS] (hereinafter referred to as "Party of the First Part"); AND

2. [SECOND_PARTY_NAME], son/daughter of [SECOND_FATHER_NAME], aged [SECOND_AGE] years, residing at [SECOND_ADDRESS] (hereinafter referred to as "Party of the Second Part").

WHEREAS:

(A) A dispute arose between the parties with respect to [DISPUTE_DESCRIPTION], and in connection therewith a [suit/case/complaint] bearing No. [CASE_NO.] of [YEAR] is pending before the [COURT/AUTHORITY NAME], [CITY].

(B) The parties have mutually agreed to compromise and settle all their disputes and differences amicably without any admission of liability and on the terms and conditions hereinafter set out.

NOW THIS DEED WITNESSETH AS FOLLOWS:

1. COMPROMISE TERMS: In full and final settlement of all disputes, differences, claims, and counter-claims between the parties arising out of or in connection with [DISPUTE_DESCRIPTION], the parties agree as follows:
   (a) [TERM 1 — e.g., "The Party of the First Part shall pay to the Party of the Second Part a sum of Rs. [AMOUNT]/- on or before [DATE]"];
   (b) [TERM 2];
   (c) [TERM 3].

2. WITHDRAWAL: The parties shall jointly file a compromise petition before the [COURT] and shall take all necessary steps for recording the compromise and consequent disposal of [CASE NO.].

3. NO FURTHER CLAIM: Upon execution of this Deed and compliance with the above terms, neither party shall have any further claim, demand, or cause of action against the other in relation to the said dispute.

4. GOOD FAITH: Both parties declare that this compromise is entered into voluntarily, in good faith, and without coercion.

IN WITNESS WHEREOF, the parties have signed this Deed of Compromise on the day and year first above written.

Party of the First Part:           Party of the Second Part:
[CLIENT_NAME]                      [SECOND_PARTY_NAME]

WITNESSES:
1. Name: _________________ Sign: _________________
2. Name: _________________ Sign: _________________

Drafted by:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER], [FIRM_NAME], [CITY]`,
  },

  {
    id: 'mediation-agreement',
    name: 'Mediation Agreement',
    category: 'general',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

MEDIATION AGREEMENT

This Mediation Agreement is entered into on [DATE] at [CITY] between:

Party 1: [CLIENT_NAME], residing at [CLIENT_ADDRESS] (hereinafter "Claimant"); AND
Party 2: [RESPONDENT_NAME], residing at [RESPONDENT_ADDRESS] (hereinafter "Respondent").

WHEREAS the parties have a dispute arising from [DISPUTE_DESCRIPTION] and desire to resolve the same through mediation;

NOW, THEREFORE, the parties agree as follows:

1. AGREEMENT TO MEDIATE: The parties voluntarily agree to participate in mediation in good faith to attempt to resolve the dispute described herein.

2. MEDIATOR: The parties jointly agree to appoint [MEDIATOR_NAME], [MEDIATOR_QUALIFICATION], as the Mediator. The Mediator shall be neutral and shall not favour any party.

3. CONFIDENTIALITY: All mediation proceedings, communications, and documents shall be strictly confidential. Neither party shall disclose the contents of mediation to any third party without the prior written consent of the other party, except as required by law.

4. AUTHORITY: Each party confirms that they have full authority to settle the dispute and execute any settlement agreement arising from mediation.

5. COSTS: The costs of mediation shall be shared equally between the parties unless otherwise agreed.

6. NON-BINDING PROCESS: Mediation is a non-binding process. Either party may withdraw from mediation at any time. No settlement shall be binding unless reduced to a signed written agreement.

7. SETTLEMENT: Any settlement reached shall be reduced to writing, signed by both parties, and shall be binding and enforceable.

8. GOVERNING LAW: This Agreement shall be governed by Indian law and shall be subject to the jurisdiction of courts at [CITY].

Signed by the Parties:

[CLIENT_NAME]                      [RESPONDENT_NAME]
Date: [DATE]                       Date: [DATE]

Mediation facilitated through:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]`,
  },

  // ── CRIMINAL ──────────────────────────────────────────────────────────────

  {
    id: 'anticipatory-bail',
    name: 'Anticipatory Bail Application (S.438 CrPC)',
    category: 'criminal',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE HON'BLE [COURT_NAME]
[CITY], [STATE]

Criminal Misc. Application No. ________ of [YEAR]
(Under Section 438 of the Code of Criminal Procedure, 1973)

IN THE MATTER OF:

[CLIENT_NAME], son/daughter of [FATHER_NAME],
aged [CLIENT_AGE] years, [CLIENT_OCCUPATION],
residing at [CLIENT_ADDRESS]                          ... APPLICANT

VERSUS

State of [STATE] through [POLICE_STATION] Police Station   ... RESPONDENT

APPLICATION FOR ANTICIPATORY BAIL UNDER SECTION 438 Cr.P.C.

MOST RESPECTFULLY SHOWETH:

1. That the Applicant, fearing imminent arrest in connection with FIR No. [FIR_NO.] dated [FIR_DATE] registered at [POLICE_STATION] Police Station, [CITY], under Sections [IPC_SECTIONS] of the Indian Penal Code, 1860, approaches this Hon'ble Court with this application for anticipatory bail under Section 438 of the Code of Criminal Procedure, 1973.

2. That the Applicant is a reputed citizen, having no prior criminal record of any kind. The Applicant has deep roots in the community and there is no apprehension of flight risk.

3. FACTS OF THE CASE: [BRIEF FACTS — e.g., "The FIR alleges that on [DATE], the Applicant had [ALLEGED ACT]. The said allegation is false, frivolous, and motivated by personal vendetta/property dispute/business rivalry, as detailed below."]

4. GROUNDS FOR ANTICIPATORY BAIL:
   (a) That the Applicant has been falsely implicated and the allegations are baseless, vexatious, and made with ulterior motives.
   (b) That there is no credible evidence connecting the Applicant to the alleged offence.
   (c) That the offence alleged, if any, is [BAILABLE/NON-BAILABLE but compoundable] in nature and the Applicant is prepared to cooperate fully with the investigation.
   (d) That there is no likelihood of the Applicant fleeing from justice; the Applicant has fixed residential and business address and has strong family ties in [CITY].
   (e) That the Applicant is not likely to tamper with evidence or influence witnesses.
   (f) That the Applicant is ready and willing to abide by all conditions that this Hon'ble Court may deem fit to impose.

5. That the Applicant has not filed any other application for anticipatory bail before any other court in connection with this FIR.

PRAYER:
It is, therefore, most humbly prayed that this Hon'ble Court may be pleased to:

(a) Direct that in the event of arrest, the Applicant shall be released on bail;
(b) Grant interim protection from arrest till the hearing and disposal of this application;
(c) Pass such other and further order(s) as this Hon'ble Court may deem fit and proper in the circumstances of the case.

Filed through:

[LAWYER_NAME]
Advocate for Applicant
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]
Tel: [LAWYER_PHONE]

Respectfully submitted,
[LAWYER_NAME]
Advocate`,
  },

  {
    id: 'bail-extension',
    name: 'Bail Extension Application',
    category: 'criminal',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE HON'BLE COURT OF [COURT_NAME]
[CITY], [STATE]

[CASE_TYPE] No. [CASE_NUMBER] of [YEAR]

State of [STATE]                              ... Prosecution
VERSUS
[CLIENT_NAME]                                 ... Accused/Applicant

APPLICATION FOR EXTENSION OF BAIL

Most Respectfully Showeth:

1. That the Applicant/Accused [CLIENT_NAME] is an accused in the above-captioned matter, arising out of FIR No. [FIR_NO.] registered at [POLICE_STATION] Police Station under Sections [IPC_SECTIONS].

2. That this Hon'ble Court was pleased to grant bail to the Applicant vide Order dated [BAIL_ORDER_DATE] in [BAIL_APPLICATION_NO.], on the following conditions:
   (a) [BAIL_CONDITION_1]
   (b) [BAIL_CONDITION_2]
   (c) [BAIL_CONDITION_3]

3. That the bail period granted by this Hon'ble Court is set to expire on [EXPIRY_DATE].

4. That the Applicant has faithfully and diligently complied with all the conditions of bail imposed by this Hon'ble Court and has appeared before the Investigating Officer as and when required.

5. That the trial/investigation is still in progress and is likely to take further time. The charges have not yet been framed / the trial is at the stage of [STAGE_OF_PROCEEDINGS].

6. That the Applicant has deep roots in the community, has a fixed residential address, is not a flight risk, and has been fully cooperating with the investigation and the proceedings of this court.

7. That there is no likelihood of the Applicant tampering with evidence or influencing witnesses, as the investigation is substantially complete.

8. That the Applicant is prepared to abide by such further conditions as this Hon'ble Court may deem appropriate.

PRAYER:
It is, therefore, most humbly prayed that this Hon'ble Court be pleased to:
(a) Extend the bail granted to the Applicant for a further period of [EXTENSION_PERIOD];
(b) Continue all the existing conditions of bail; and
(c) Pass such other order(s) as this Hon'ble Court may deem just and proper.

[LAWYER_NAME]
Advocate for Applicant
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]
Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'criminal-complaint-200',
    name: 'Criminal Complaint (S.200 CrPC)',
    category: 'criminal',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE COURT OF [MAGISTRATE DESIGNATION], [CITY]

CRIMINAL COMPLAINT NO. _______ OF [YEAR]
(Under Section 200 of the Code of Criminal Procedure, 1973)

IN THE MATTER OF:

[CLIENT_NAME], son/daughter of [FATHER_NAME],
aged [CLIENT_AGE] years, [CLIENT_OCCUPATION],
residing at [CLIENT_ADDRESS]                          ... COMPLAINANT

VERSUS

[ACCUSED_NAME], son/daughter of [ACCUSED_FATHER_NAME],
residing at [ACCUSED_ADDRESS]                          ... ACCUSED

COMPLAINT UNDER SECTION 200 Cr.P.C. READ WITH SECTIONS [IPC_SECTIONS] OF THE INDIAN PENAL CODE, 1860

MOST RESPECTFULLY SHOWETH:

1. That the Complainant is a law-abiding citizen and the Accused is personally known to him/her.

2. BACKGROUND: [DESCRIBE BACKGROUND — e.g., "The Complainant and Accused were partners in a business/neighbours/had a financial transaction on [DATE]"].

3. INCIDENT: On [INCIDENT_DATE] at approximately [TIME], at [PLACE], the Accused [DESCRIBE THE ALLEGED ACT in detail, including specific acts, words spoken, witnesses present].

4. OFFENCES COMMITTED: By the aforesaid acts, the Accused has committed the following offences:
   (a) [OFFENCE UNDER SECTION — e.g., Section 420 IPC — Cheating];
   (b) [OFFENCE UNDER SECTION — e.g., Section 406 IPC — Criminal Breach of Trust];
   (c) [OTHER OFFENCE].

5. EVIDENCE: The Complainant relies upon the following documents/evidence:
   (a) [DOCUMENT/EVIDENCE 1 — e.g., "Agreement dated [DATE]"];
   (b) [DOCUMENT/EVIDENCE 2 — e.g., "Demand Draft / Cheque / Receipt"];
   (c) [WITNESS NAME] who was present at the time of the incident.

6. POLICE COMPLAINT: The Complainant had lodged a complaint with [POLICE_STATION] Police Station on [DATE] bearing Complaint No. [NO.], but no action was taken by the police.

7. That no other complaint/FIR has been filed by the Complainant in connection with this matter before any court or authority.

PRAYER:
It is therefore most humbly prayed that this Hon'ble Court may be pleased to:
(a) Take cognizance of the offence committed by the Accused;
(b) Issue summons/process to the Accused;
(c) Pass such other and further order as this Hon'ble Court may deem fit and proper.

VERIFICATION:
I, [CLIENT_NAME], do hereby verify that the contents of the above Complaint are true and correct to the best of my knowledge, information, and belief and nothing material has been concealed therefrom.

Verified at [CITY] on [DATE].

Complainant: ________________________
[CLIENT_NAME]

Filed through:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]`,
  },

  {
    id: 'discharge-application',
    name: 'Discharge Application (S.227/239 CrPC)',
    category: 'criminal',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE COURT OF [COURT_NAME], [CITY]

[SESSIONS/MAGISTRATE] Case No. [CASE_NUMBER] of [YEAR]
(Arising from FIR No. [FIR_NO.] dated [FIR_DATE], [POLICE_STATION])

State of [STATE]                           ... Prosecution
VERSUS
[CLIENT_NAME]                              ... Accused/Applicant

APPLICATION FOR DISCHARGE UNDER SECTION [227/239] OF THE CODE OF CRIMINAL PROCEDURE, 1973

MOST RESPECTFULLY SHOWETH:

1. That the Applicant/Accused [CLIENT_NAME] has been charge-sheeted in the aforesaid case under Sections [IPC_SECTIONS] of the Indian Penal Code, 1860 / [OTHER ACT]. The matter is now at the stage of consideration of charge.

2. That after consideration of the record of the case and the documents submitted therewith, and after hearing the submissions of the parties, this Hon'ble Court should discharge the Applicant on the following grounds:

GROUNDS FOR DISCHARGE:

(a) LACK OF PRIMA FACIE CASE: There is no prima facie material on record against the Applicant to frame charge. The prosecution's own documents and statements do not disclose any case against this Applicant.

(b) NO EVIDENCE OF INVOLVEMENT: The evidence on record does not even remotely connect the Applicant to the alleged offence. The allegations are vague, general, and unsupported by any credible material.

(c) FALSE IMPLICATION: The Applicant has been falsely implicated due to [PERSONAL MOTIVE — e.g., "a pre-existing property dispute / personal enmity / business rivalry"].

(d) LEGAL INFIRMITY: [LEGAL GROUND — e.g., "The offence alleged is barred by limitation under Section [X]" / "The complaint is not maintainable without sanction under Section [Y]"].

(e) EXCULPATORY EVIDENCE: [EXCULPATORY DOCUMENTS/EVIDENCE — e.g., "The documents filed by the prosecution themselves show that the Applicant was not present at the scene of the alleged incident"].

3. That the Hon'ble Supreme Court in [RELEVANT CASE — e.g., Union of India v. Prafulla Kumar Samal, (1979) 3 SCC 4] has held that at the stage of framing of charge, if the court finds that the evidence is wholly insufficient to sustain the charge, it must discharge the accused.

4. That framing of charge against the Applicant would cause grave prejudice and would amount to an abuse of the process of this Court.

PRAYER:
It is, therefore, most humbly prayed that this Hon'ble Court may be pleased to:
(a) Discharge the Applicant/Accused from all charges in the above case under Section [227/239] Cr.P.C.;
(b) Pass such other order as this Hon'ble Court may deem fit.

Respectfully submitted,

[LAWYER_NAME]
Advocate for Applicant/Accused
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]
Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'quashing-petition-482',
    name: 'Quashing Petition (S.482 CrPC)',
    category: 'criminal',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE HON'BLE HIGH COURT OF [STATE]
AT [HIGH_COURT_CITY]

Criminal Misc. Petition No. ________ of [YEAR]

IN THE MATTER OF:

[CLIENT_NAME], son/daughter of [FATHER_NAME],
aged [CLIENT_AGE] years, residing at [CLIENT_ADDRESS]   ... PETITIONER

VERSUS

1. State of [STATE]                                         ... RESPONDENT NO.1
2. [COMPLAINANT_NAME], residing at [COMPLAINANT_ADDRESS]    ... RESPONDENT NO.2

PETITION UNDER SECTION 482 OF THE CODE OF CRIMINAL PROCEDURE, 1973 FOR QUASHING OF FIR NO. [FIR_NO.] DATED [FIR_DATE] REGISTERED AT [POLICE_STATION] POLICE STATION AND ALL PROCEEDINGS EMANATING THEREFROM

MOST RESPECTFULLY SHOWETH:

1. That the Petitioner is an aggrieved person whose fundamental rights and legal rights are being gravely prejudiced by the impugned FIR and the proceedings pursuant thereto.

2. IMPUGNED FIR: The FIR No. [FIR_NO.] dated [FIR_DATE] was registered at [POLICE_STATION] Police Station under Sections [IPC_SECTIONS] on the complaint of Respondent No.2. A copy of the FIR is annexed as Annexure P-1.

3. BACKGROUND: [FACTS PRECEDING THE FIR — describe the relationship between parties, dispute, and circumstances leading to FIR].

4. GROUNDS FOR QUASHING:
   (a) CIVIL DISPUTE DRESSED AS CRIMINAL: The impugned FIR is nothing but a civil dispute which has been given a criminal colour. The Hon'ble Supreme Court in State of Haryana v. Bhajanlal, AIR 1992 SC 604 has laid down categories where FIR should be quashed.
   (b) ABUSE OF PROCESS: The FIR has been registered with mala fide intent and amounts to clear abuse of the process of law.
   (c) NO COGNIZABLE OFFENCE DISCLOSED: On a bare reading of the FIR, no cognizable offence is made out against the Petitioner.
   (d) SETTLEMENT: The parties have since arrived at an amicable settlement and Respondent No.2 has no objection to quashing of the FIR.
   (e) [OTHER GROUND].

5. That in view of the law settled by the Supreme Court in Gian Singh v. State of Punjab (2012) 10 SCC 303, this Hon'ble Court has ample jurisdiction to quash the FIR and all proceedings on the ground of settlement.

6. That the Petitioner has not filed any similar petition before any other court.

PRAYER:
It is therefore most humbly prayed that this Hon'ble Court be pleased to:
(a) Quash and set aside FIR No. [FIR_NO.] dated [FIR_DATE] at [POLICE_STATION] and all proceedings arising therefrom;
(b) Stay investigation pursuant to the impugned FIR pending hearing of this petition;
(c) Pass such other orders as this Hon'ble Court may deem fit.

Respectfully submitted,

[LAWYER_NAME]
Advocate for Petitioner
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]
Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'criminal-appeal',
    name: 'Criminal Appeal',
    category: 'criminal',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE HON'BLE COURT OF SESSIONS / HIGH COURT OF [STATE]
AT [CITY]

Criminal Appeal No. ________ of [YEAR]

IN THE MATTER OF:

[CLIENT_NAME], son/daughter of [FATHER_NAME],
aged [CLIENT_AGE] years, residing at [CLIENT_ADDRESS]   ... APPELLANT

VERSUS

State of [STATE]                                          ... RESPONDENT

APPEAL UNDER SECTION [374/378] OF THE CODE OF CRIMINAL PROCEDURE, 1973 AGAINST THE JUDGMENT AND ORDER DATED [JUDGMENT_DATE] PASSED BY [TRIAL_COURT_NAME] IN [CASE_NO.], CONVICTING THE APPELLANT UNDER SECTION(S) [IPC_SECTIONS]

MOST RESPECTFULLY SHOWETH:

1. That the above-named Appellant is aggrieved by and prefers this Appeal against the Judgment and Order of Conviction dated [JUDGMENT_DATE] passed by the Ld. [TRIAL_JUDGE], [TRIAL_COURT], [CITY], in [CASE_NO.], whereby the Appellant was convicted under Section(s) [IPC_SECTIONS] and sentenced to [SENTENCE_DETAILS].

2. BRIEF FACTS: [BRIEF FACTS OF THE CASE — what was alleged, what occurred at trial].

3. GROUNDS OF APPEAL:
   (a) That the learned trial court grossly erred in appreciating the evidence on record and the impugned judgment is against the weight of evidence.
   (b) That the prosecution has failed to prove the charge beyond all reasonable doubt, as mandated by law, and the benefit of doubt ought to have been extended to the Appellant.
   (c) That the evidence of the prosecution witnesses is contradictory, inconsistent, and unreliable, and has been wrongly accepted by the trial court.
   (d) That the trial court failed to appreciate the defence evidence and erroneously rejected the same.
   (e) That the procedure prescribed by law was not followed during the trial causing serious prejudice to the Appellant.
   (f) That the sentence awarded is excessive, harsh, and disproportionate to the alleged offence even if the conviction were to be upheld.
   (g) [ADDITIONAL GROUNDS].

4. That the Appellant craves leave to urge additional grounds at the time of hearing.

PRAYER:
It is therefore most humbly prayed that this Hon'ble Court be pleased to:
(a) Admit this appeal;
(b) Stay the sentence during the pendency of this appeal and release the Appellant on bail;
(c) Call for the records of the trial court;
(d) Set aside the Judgment and Order of Conviction dated [JUDGMENT_DATE] and acquit the Appellant; or in the alternative, reduce the sentence to the period already undergone;
(e) Pass such other order(s) as this Hon'ble Court may deem fit.

Respectfully submitted,

[LAWYER_NAME]
Advocate for Appellant
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]
Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'criminal-revision',
    name: 'Criminal Revision Petition',
    category: 'criminal',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE HON'BLE COURT OF SESSIONS / HIGH COURT OF [STATE]

Criminal Revision No. _______ of [YEAR]

[CLIENT_NAME], [ADDRESS]                                  ... REVISIONIST/PETITIONER

VERSUS

State of [STATE] / [OPPOSITE_PARTY_NAME]                  ... RESPONDENT

CRIMINAL REVISION PETITION UNDER SECTION 397/401 OF THE CODE OF CRIMINAL PROCEDURE, 1973 AGAINST ORDER DATED [ORDER_DATE] PASSED BY [LOWER_COURT] IN [CASE_NO.]

MOST RESPECTFULLY SHOWETH:

1. That the Petitioner challenges the Order dated [ORDER_DATE] passed by the Ld. [LOWER_COURT], [CITY] in [CASE_NO.], whereby [BRIEFLY DESCRIBE IMPUGNED ORDER].

2. FACTS: [BRIEF FACTS OF THE CASE].

3. IMPUGNED ORDER: [DESCRIBE WHAT ORDER WAS PASSED AND WHY IT IS WRONG].

4. GROUNDS OF REVISION:
   (a) That the impugned order is illegal, perverse, and without jurisdiction.
   (b) That the learned court below failed to apply the correct legal principles while passing the impugned order.
   (c) That the impugned order is against the weight of evidence and the findings recorded are perverse.
   (d) That [SPECIFIC LEGAL ERROR — e.g., "the court below failed to consider material evidence on record"].
   (e) That the impugned order has caused grave injustice to the Petitioner and requires correction in the exercise of this Court's revisional jurisdiction.

5. That the Petitioner has not filed any similar revision before any other court.

PRAYER:
It is most humbly prayed that this Hon'ble Court be pleased to:
(a) Admit this revision petition;
(b) Stay the operation of the impugned Order dated [ORDER_DATE];
(c) Call for the record of [LOWER_COURT];
(d) Set aside/modify the impugned order and pass such order as may be just;
(e) Pass such other orders as this Hon'ble Court may deem fit.

Respectfully submitted,

[LAWYER_NAME]
Advocate for Petitioner
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]
Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'bail-bond',
    name: 'Bail Bond / Personal Bond',
    category: 'criminal',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE COURT OF [COURT_NAME], [CITY]

[CASE_TYPE] No. [CASE_NUMBER] of [YEAR]

State of [STATE]                                    ... Prosecution
VERSUS
[CLIENT_NAME]                                       ... Accused

PERSONAL BOND / BAIL BOND

KNOW ALL PERSONS BY THESE PRESENTS THAT I, [CLIENT_NAME], son/daughter of [FATHER_NAME], aged [CLIENT_AGE] years, [CLIENT_OCCUPATION], residing at [CLIENT_ADDRESS], the above-named accused/applicant, do hereby bind myself and undertake to this Hon'ble Court as under:

WHEREAS this Hon'ble Court has been pleased to grant bail to the undersigned in the above-captioned case vide Order dated [BAIL_DATE] subject to the following conditions:

1. That the undersigned shall appear before this Hon'ble Court on every date of hearing without fail and shall not leave the jurisdiction of this court without prior permission.

2. That the undersigned shall not tamper with evidence or attempt to influence any witnesses connected with the above case.

3. That the undersigned shall furnish an address and contact number where they can be reached at all times during the pendency of the proceedings.

4. That the undersigned shall surrender their Passport/travel documents (if any) to the Investigating Officer/Registrar of this Court.

5. That the undersigned shall report to [POLICE_STATION] Police Station on [REPORTING_FREQUENCY — e.g., "every Monday"].

6. That in case of any change of address, the undersigned shall immediately intimate this Hon'ble Court and the Investigating Officer.

NOW, THEREFORE, in consideration of the grant of bail by this Hon'ble Court, the undersigned hereby binds himself/herself in the sum of Rs. [BOND_AMOUNT]/- (Rupees [AMOUNT_IN_WORDS] only) to appear before this Court on all dates of hearing and to comply with all the aforesaid conditions.

SURETIES (if applicable):
Surety Name: [SURETY_NAME], Son/Daughter of [SURETY_FATHER], residing at [SURETY_ADDRESS], occupying property worth Rs. [SURETY_AMOUNT].

Signed this ________ day of [MONTH] [YEAR] at [CITY].

Accused:                           Surety (if any):
[CLIENT_NAME]                      [SURETY_NAME]
Date: [DATE]                       Date: [DATE]

WITNESSES:
1. Name: _______________ Sign: _______________
2. Name: _______________ Sign: _______________

Prepared by:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER], [FIRM_NAME], [CITY]`,
  },

  {
    id: 'probation-application',
    name: 'Probation Application (Probation of Offenders Act, 1958)',
    category: 'criminal',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE COURT OF [COURT_NAME], [CITY]

[CASE_TYPE] No. [CASE_NUMBER] of [YEAR]

State of [STATE]                                    ... Prosecution
VERSUS
[CLIENT_NAME]                                       ... Accused/Applicant

APPLICATION UNDER SECTIONS 3/4 OF THE PROBATION OF OFFENDERS ACT, 1958 FOR RELEASE OF ACCUSED ON PROBATION OF GOOD CONDUCT

MOST RESPECTFULLY SHOWETH:

1. That the Applicant/Accused [CLIENT_NAME] has been tried and convicted by this Hon'ble Court in the above case for the offence(s) under [SECTIONS] of the [ACT], punishable with imprisonment up to [MAX_SENTENCE].

2. That the Applicant's age is [CLIENT_AGE] years. [If under 21: "The Applicant is below 21 years of age and under Section 6 of the Probation of Offenders Act, 1958, this Court shall not impose a sentence of imprisonment unless it is satisfied that having regard to the circumstances, including the nature of the offence, it is not desirable to deal with the offender under Section 3 or 4."]

3. That the Applicant has no previous criminal antecedents and this is the first time the Applicant has been convicted.

4. That the Applicant is genuinely remorseful and contrite for the act committed. The offence was committed under [MITIGATING CIRCUMSTANCES].

5. That the Applicant comes from a [FAMILY BACKGROUND — e.g., "poor, law-abiding family"] and has dependants who are entirely dependent on the Applicant.

6. That the Probation of Offenders Act, 1958, is a reformatory legislation and its purpose is to prevent the conversion of persons into hardened criminals by avoiding incarceration where possible.

7. That in the facts and circumstances of this case, the ends of justice would be better served by placing the Applicant on probation of good conduct rather than sentencing the Applicant to imprisonment.

8. That a Probation Officer's report as required under the Act may be called for before passing the order, if this Hon'ble Court deems it necessary.

PRAYER:
It is therefore most humbly prayed that this Hon'ble Court be pleased to:
(a) Release the Applicant on probation of good conduct under Section [3/4] of the Probation of Offenders Act, 1958 on such conditions as this Court may deem fit;
(b) Direct the Applicant to execute a bond with or without sureties for good behaviour;
(c) Pass such other orders as this Hon'ble Court may deem appropriate.

Respectfully submitted,

[LAWYER_NAME]
Advocate for Applicant
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]
Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'suspension-of-sentence',
    name: 'Suspension of Sentence Application',
    category: 'criminal',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE HON'BLE COURT OF SESSIONS / HIGH COURT OF [STATE]

Criminal Appeal No. ________ of [YEAR]
(Arising from [TRIAL_COURT] Case No. [CASE_NO.] of [YEAR])

[CLIENT_NAME]                                       ... APPELLANT/APPLICANT
VERSUS
State of [STATE]                                    ... RESPONDENT

APPLICATION FOR SUSPENSION OF SENTENCE AND GRANT OF BAIL PENDING APPEAL UNDER SECTION 389 Cr.P.C.

MOST RESPECTFULLY SHOWETH:

1. That the Applicant has filed the above Criminal Appeal against the Judgment and Order dated [JUDGMENT_DATE] passed by the Ld. [TRIAL_COURT], [CITY], convicting the Applicant under Section(s) [IPC_SECTIONS] and sentencing the Applicant to [SENTENCE_DETAILS].

2. That the Applicant has been taken into custody and is currently in judicial custody at [JAIL_NAME].

3. That the Applicant has preferred the Criminal Appeal as aforesaid, which raises substantial questions of law and fact, and the Applicant has good grounds to succeed therein.

4. GROUNDS FOR SUSPENSION:
   (a) That the conviction of the Applicant is erroneous and the appeal has substantial merit.
   (b) That if the sentence is not suspended, the Applicant will have to undergo imprisonment, which would cause irreparable harm.
   (c) That the Applicant is not a flight risk, has a fixed address, and strong family ties in [CITY].
   (d) That there is no likelihood of the Applicant tampering with evidence or influencing witnesses, as the trial is concluded.
   (e) That the Applicant has dependants [FAMILY DETAILS] who depend entirely on the Applicant.

5. That the Applicant undertakes to abide by all conditions as this Hon'ble Court may impose.

PRAYER:
It is most humbly prayed that this Hon'ble Court be pleased to:
(a) Suspend the sentence of conviction dated [JUDGMENT_DATE] pending hearing and disposal of the Criminal Appeal;
(b) Release the Applicant on bail on such terms and conditions as this Hon'ble Court may deem fit;
(c) Pass such other orders as this Hon'ble Court may deem just and proper.

Respectfully submitted,

[LAWYER_NAME]
Advocate for Appellant/Applicant
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]
Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'compounding-application',
    name: 'Compounding Application (S.320 CrPC)',
    category: 'criminal',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE COURT OF [COURT_NAME], [CITY]

[CASE_TYPE] No. [CASE_NUMBER] of [YEAR]
(FIR No. [FIR_NO.] dated [FIR_DATE], [POLICE_STATION] Police Station)

State of [STATE]                                    ... Prosecution
VERSUS
[ACCUSED_NAME]                                      ... Accused

JOINT APPLICATION FOR COMPOUNDING OF OFFENCE UNDER SECTION 320 OF THE CODE OF CRIMINAL PROCEDURE, 1973

The above parties jointly and most respectfully state as follows:

1. That the above case arose from FIR No. [FIR_NO.] dated [FIR_DATE] registered at [POLICE_STATION] Police Station under Section(s) [IPC_SECTIONS], which are compoundable offences under Section 320 of the Code of Criminal Procedure, 1973.

2. That the Complainant/Victim is [COMPLAINANT_NAME], residing at [COMPLAINANT_ADDRESS], and the Accused is [ACCUSED_NAME], residing at [ACCUSED_ADDRESS].

3. That the parties have amicably settled all their disputes and differences in relation to the above case and have arrived at a full and final settlement.

4. That the Complainant/Victim has received full and complete satisfaction and has no grievance remaining against the Accused.

5. That the Accused and Complainant declare that the compromise/settlement has been arrived at voluntarily, without any coercion, force, or undue influence and both parties are above 18 years of age.

6. That the offence involved in this case is specifically listed as a compoundable offence under [Column 1 of the Table to Section 320 Cr.P.C. / with the permission of the Court].

7. That no public interest is involved in the continuation of this case and allowing compounding would serve the interests of justice.

PRAYER:
The parties jointly pray that this Hon'ble Court be pleased to:
(a) Allow the compounding of the offence under Section 320 Cr.P.C.;
(b) Acquit the Accused in view of the compounding;
(c) Pass such other order as this Hon'ble Court may deem fit.

Complainant:                       Accused:
[COMPLAINANT_NAME]                 [ACCUSED_NAME]
Date: [DATE]                       Date: [DATE]

Advocates for Parties:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]`,
  },

  // ── CIVIL ─────────────────────────────────────────────────────────────────

  {
    id: 'civil-plaint',
    name: 'Civil Plaint (Money Recovery Suit)',
    category: 'civil',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE COURT OF [COURT_NAME], [CITY]

Civil Suit No. _______ of [YEAR]

[CLIENT_NAME], son/daughter of [FATHER_NAME],
aged [CLIENT_AGE] years, [CLIENT_OCCUPATION],
residing at [CLIENT_ADDRESS]                          ... PLAINTIFF

VERSUS

[DEFENDANT_NAME], son/daughter of [DEFENDANT_FATHER_NAME],
[DEFENDANT_OCCUPATION], residing at [DEFENDANT_ADDRESS]   ... DEFENDANT

PLAINT FOR RECOVERY OF MONEY / [RELIEF SOUGHT]

MOST RESPECTFULLY SHOWETH:

1. CAUSE OF ACTION: The cause of action for this suit arose in [CITY], within the jurisdiction of this Hon'ble Court, in the following manner:

2. BACKGROUND: [DESCRIBE BACKGROUND — e.g., "The Plaintiff and Defendant are known to each other since [YEAR]. On [DATE], the Defendant borrowed a sum of Rs. [AMOUNT]/- from the Plaintiff, promising to repay the same with interest at [RATE]% per annum by [DATE]."]

3. DEFAULT: [DESCRIBE DEFAULT — e.g., "Despite repeated requests and demands, the Defendant has failed and refused to repay the aforesaid sum or any part thereof."]

4. LEGAL NOTICE: The Plaintiff caused a Legal Notice dated [NOTICE_DATE] to be served upon the Defendant through the registered post, calling upon the Defendant to pay the dues within [PERIOD] days. The Defendant has not complied with the same.

5. AMOUNT DUE: The following amounts are due and payable by the Defendant to the Plaintiff:
   (a) Principal: Rs. [PRINCIPAL_AMOUNT]/-
   (b) Interest @ [RATE]% p.a. from [DATE] to [DATE]: Rs. [INTEREST_AMOUNT]/-
   (c) Total: Rs. [TOTAL_AMOUNT]/-

6. JURISDICTION: This Court has jurisdiction to try this suit as the cause of action arose in [CITY] within the territorial jurisdiction of this Court and the suit value does not exceed the pecuniary jurisdiction of this Court.

7. LIMITATION: This suit is filed within the period of limitation.

8. VALUATION: The suit is valued at Rs. [TOTAL_AMOUNT]/- for purposes of court fee and jurisdiction. Court fee of Rs. [COURT_FEE]/- is paid herewith.

PRAYER:
It is therefore most humbly prayed that this Hon'ble Court be pleased to:
(a) Decree the suit in favour of the Plaintiff for a sum of Rs. [TOTAL_AMOUNT]/- against the Defendant;
(b) Award interest at [RATE]% per annum from [DATE] till the date of decree and thereafter at [POST_DECREE_RATE]% per annum till realisation;
(c) Award costs of the suit to the Plaintiff;
(d) Pass such other decree(s) as this Hon'ble Court may deem fit and proper in the facts and circumstances of the case.

VERIFICATION:
I, [CLIENT_NAME], the Plaintiff above-named, do hereby verify that the contents of this Plaint are true and correct to the best of my knowledge and belief and that nothing material has been concealed.

Verified at [CITY] on [DATE].

Plaintiff: ________________________
[CLIENT_NAME]

Filed through:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]
Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'written-statement',
    name: 'Written Statement (Civil Defence)',
    category: 'civil',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE COURT OF [COURT_NAME], [CITY]

Civil Suit No. [CASE_NUMBER] of [YEAR]

[PLAINTIFF_NAME]                                    ... PLAINTIFF

VERSUS

[CLIENT_NAME]                                       ... DEFENDANT

WRITTEN STATEMENT FILED BY THE DEFENDANT UNDER ORDER VIII RULE 1, C.P.C.

MOST RESPECTFULLY SHOWETH:

PRELIMINARY OBJECTIONS:

1. MAINTAINABILITY: The suit as filed is not maintainable in law and on facts. [SPECIFY WHY — e.g., "The suit is barred by limitation under Article [__] of the Limitation Act, 1963"].

2. JURISDICTION: This Hon'ble Court has no territorial/pecuniary jurisdiction to entertain the suit.

3. CAUSE OF ACTION: The suit discloses no valid cause of action against the Defendant.

4. [OTHER PRELIMINARY OBJECTION].

ON MERITS:

5. That the Defendant specifically denies paragraph [__] of the Plaint. [It is denied that the Defendant borrowed any sum from the Plaintiff].

6. That the Defendant specifically denies paragraph [__] of the Plaint. [DENIAL OF SPECIFIC ALLEGATION].

7. That paragraph [__] of the Plaint is not admitted and the Plaintiff is put to strict proof thereof.

8. The true facts, which the Defendant avers, are as follows: [STATE DEFENDANT'S VERSION OF FACTS IN DETAIL].

9. That the Defendant states that the Plaintiff has suppressed material facts and has approached this Court with unclean hands.

10. That the Plaintiff's own documents annexed to the Plaint do not support the claim made by the Plaintiff.

11. The suit, being without any legal or factual basis, is liable to be dismissed with exemplary costs.

VERIFICATION:
I, [CLIENT_NAME], the Defendant above-named, do hereby verify that the contents of this Written Statement are true and correct to the best of my knowledge and belief and nothing material has been concealed.

Verified at [CITY] on [DATE].

Defendant: ________________________
[CLIENT_NAME]

Filed through:
[LAWYER_NAME], Advocate for Defendant
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]
Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'temp-injunction',
    name: 'Temporary Injunction Application (Order XXXIX CPC)',
    category: 'civil',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE COURT OF [COURT_NAME], [CITY]

Civil Suit No. _______ of [YEAR]
I.A. No. _______ of [YEAR]
(Application under Order XXXIX Rules 1 & 2 read with Section 151 C.P.C.)

[CLIENT_NAME]                                       ... PLAINTIFF

VERSUS

[DEFENDANT_NAME]                                    ... DEFENDANT

APPLICATION FOR TEMPORARY INJUNCTION

MOST RESPECTFULLY SHOWETH:

1. That the Plaintiff has filed the above Civil Suit for [MAIN RELIEF IN SUIT] against the Defendant, which is pending before this Hon'ble Court.

2. PRIMA FACIE CASE: The Plaintiff has a strong prima facie case. [DESCRIBE WHY — e.g., "The Plaintiff is the registered owner of the property bearing [PROPERTY DETAILS] as evidenced by the registered Sale Deed dated [DATE]. The Defendant has no right, title, or interest in the said property."]

3. BALANCE OF CONVENIENCE: The balance of convenience is entirely in favour of the Plaintiff. If the temporary injunction is not granted, the Plaintiff will suffer irreparable harm. [DESCRIBE SPECIFIC HARM].

4. IRREPARABLE LOSS: The Plaintiff will suffer irreparable harm that cannot be adequately compensated in money if the Defendant is allowed to [DESCRIBE DEFENDANT'S THREATENED ACT — e.g., "dispossess the Plaintiff / alienate the property / continue the infringing activity"].

5. DEFENDANT'S THREATENED ACT: The Plaintiff has reliable information that the Defendant is threatening and intending to [DESCRIBE THREATENED ACT] which, if allowed, will render the suit infructuous and cause irreparable prejudice to the Plaintiff.

6. That the three requirements for grant of temporary injunction — prima facie case, balance of convenience, and irreparable harm — are all established in the present case.

PRAYER:
It is most humbly prayed that this Hon'ble Court be pleased to:
(a) Pass an ex parte ad interim temporary injunction restraining the Defendant from [SPECIFIC RESTRAINED ACT] pending hearing and disposal of this Application;
(b) On notice, make the interim injunction absolute during the pendency of the suit;
(c) Pass such other order as this Hon'ble Court may deem fit.

Respectfully submitted,

[LAWYER_NAME]
Advocate for Plaintiff
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]
Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'stay-application',
    name: 'Stay Application (S.148A CPC)',
    category: 'civil',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE HON'BLE [COURT_NAME]
[CITY], [STATE]

[APPEAL/REVISION] No. _______ of [YEAR]
I.A. No. _______ of [YEAR]

[CLIENT_NAME]                                       ... APPELLANT/PETITIONER

VERSUS

[RESPONDENT_NAME]                                   ... RESPONDENT

APPLICATION FOR STAY OF PROCEEDINGS / OPERATION OF IMPUGNED ORDER / EXECUTION OF DECREE

MOST RESPECTFULLY SHOWETH:

1. That the Appellant/Petitioner has preferred the above [Appeal/Revision] against the [Judgment/Order/Decree] dated [ORDER_DATE] passed by the [LOWER_COURT], [CITY] in [CASE_NO.].

2. THE IMPUGNED ORDER: By the impugned [Judgment/Order], the [LOWER_COURT] has [BRIEFLY DESCRIBE WHAT ORDER WAS PASSED].

3. GROUNDS FOR STAY:
   (a) That the Appellant has a strong prima facie case and the [Appeal/Revision] raises substantial questions of law/fact.
   (b) That if stay is not granted, the Appellant will suffer irreparable loss and harm that cannot be compensated in money.
   (c) That the balance of convenience strongly favours grant of stay.
   (d) That [SPECIFIC HARM IF STAY NOT GRANTED — e.g., "the execution of the decree will result in the dispossession of the Appellant from the property, which will render the appeal infructuous"].
   (e) That the Respondent will not suffer any loss or prejudice by the grant of stay.

4. That the Appellant undertakes to prosecute the [Appeal/Revision] diligently and expeditiously.

PRAYER:
It is most humbly prayed that this Hon'ble Court be pleased to:
(a) Stay the operation of the impugned [Judgment/Order/Decree] dated [ORDER_DATE] of [LOWER_COURT] pending hearing and disposal of the [Appeal/Revision];
(b) Stay all proceedings in execution of the decree;
(c) Pass such other order(s) as this Hon'ble Court may deem just and proper.

Respectfully submitted,

[LAWYER_NAME]
Advocate for Appellant/Petitioner
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]
Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'civil-appeal',
    name: 'Civil Appeal',
    category: 'civil',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE HON'BLE COURT OF [APPELLATE COURT NAME], [CITY]

First Appeal No. _______ of [YEAR]
(Under Section 96 of the Code of Civil Procedure, 1908)

[CLIENT_NAME], son/daughter of [FATHER_NAME],
residing at [CLIENT_ADDRESS]                          ... APPELLANT

VERSUS

[RESPONDENT_NAME], son/daughter of [RESPONDENT_FATHER_NAME],
residing at [RESPONDENT_ADDRESS]                      ... RESPONDENT

MEMORANDUM OF APPEAL UNDER SECTION 96 C.P.C. AGAINST THE JUDGMENT AND DECREE DATED [JUDGMENT_DATE] PASSED BY [TRIAL_COURT_NAME] IN CIVIL SUIT NO. [CASE_NO.] OF [YEAR]

MOST RESPECTFULLY SHOWETH:

1. That the above-named Appellant is aggrieved by and dissatisfied with the Judgment and Decree dated [JUDGMENT_DATE] passed by the Ld. [TRIAL_COURT], [CITY], in Civil Suit No. [CASE_NO.] of [YEAR], whereby the suit of the Plaintiff was [decreed/dismissed] and [DESCRIBE DECREE].

2. FACTS: [BRIEF FACTS OF THE CASE].

3. GROUNDS OF APPEAL:
   (a) That the learned trial court erred in appreciating the evidence on record and the finding recorded is perverse and against the weight of evidence.
   (b) That the trial court failed to properly appreciate [DOCUMENTARY EVIDENCE / ORAL EVIDENCE] filed by the [Plaintiff/Defendant].
   (c) That the trial court erred in law in [SPECIFIC LEGAL ERROR].
   (d) That the impugned judgment and decree is contrary to [LEGAL PROVISIONS / SETTLED LAW].
   (e) That the trial court failed to decide issue no. [__] properly.
   (f) That the impugned decree is against the weight of probabilities.
   (g) [ADDITIONAL GROUNDS].

4. That the Appellant craves leave to urge further grounds at the time of hearing.

PRAYER:
It is most humbly prayed that this Hon'ble Court be pleased to:
(a) Admit this Appeal;
(b) Stay the execution of the impugned decree pending disposal of this Appeal;
(c) Call for the record of the trial court;
(d) Set aside / modify the Judgment and Decree dated [JUDGMENT_DATE] and pass a [decree/order] as prayed in the plaint / as the Appellant is entitled to;
(e) Award costs of this Appeal to the Appellant;
(f) Pass such other decree / order as this Hon'ble Court may deem fit.

Respectfully submitted,

[LAWYER_NAME]
Advocate for Appellant
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]
Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'civil-revision',
    name: 'Civil Revision Petition (S.115 CPC)',
    category: 'civil',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE HON'BLE HIGH COURT OF [STATE] / DISTRICT COURT, [CITY]

Civil Revision Petition No. _______ of [YEAR]
(Under Section 115 of the Code of Civil Procedure, 1908)

[CLIENT_NAME]                                       ... REVISIONIST/PETITIONER

VERSUS

[RESPONDENT_NAME]                                   ... RESPONDENT

REVISION PETITION UNDER SECTION 115 C.P.C. AGAINST ORDER DATED [ORDER_DATE] OF [LOWER_COURT] IN [CASE_NO.]

MOST RESPECTFULLY SHOWETH:

1. That this revision petition is directed against the Order dated [ORDER_DATE] passed by the Ld. [LOWER_COURT], [CITY] in [CASE_NO.] of [YEAR], whereby [DESCRIBE ORDER].

2. FACTS: [BRIEF FACTS].

3. IMPUGNED ORDER: The learned court below by the impugned order has [DESCRIBE WHAT WAS ORDERED]. This order is illegal and erroneous for the following reasons:

4. GROUNDS OF REVISION:
   (a) That the impugned order is without jurisdiction. The court below has [JURISDICTIONAL ERROR].
   (b) That the court below has failed to exercise jurisdiction vested in it by [LEGAL PROVISION].
   (c) That the court below has acted with material irregularity in the exercise of its jurisdiction by [SPECIFIC IRREGULARITY].
   (d) That the impugned order is contrary to the settled principles laid down in [RELEVANT CASE LAW].
   (e) That the impugned order, if allowed to stand, will cause irreparable prejudice to the Petitioner.

5. POWER OF REVISION: Under Section 115 C.P.C., this Court has the power to call for the record of any case decided by any subordinate court and satisfy itself as to the correctness, legality, or propriety of any decision.

PRAYER:
It is most humbly prayed that this Hon'ble Court be pleased to:
(a) Admit this Revision Petition;
(b) Stay the operation of the impugned Order;
(c) Call for the record of [LOWER_COURT];
(d) Set aside the impugned Order dated [ORDER_DATE] and restore [CASE TO STAGE / PASS APPROPRIATE ORDER];
(e) Pass such other order as this Hon'ble Court may deem fit.

Respectfully submitted,

[LAWYER_NAME]
Advocate for Petitioner
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]
Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'interlocutory-application',
    name: 'Interlocutory Application (S.151 CPC)',
    category: 'civil',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE COURT OF [COURT_NAME], [CITY]

Civil Suit No. [CASE_NUMBER] of [YEAR]
I.A. No. _______ of [YEAR]

[CLIENT_NAME]                                       ... PLAINTIFF/APPLICANT

VERSUS

[DEFENDANT_NAME]                                    ... DEFENDANT/RESPONDENT

INTERLOCUTORY APPLICATION UNDER SECTION 151 OF THE CODE OF CIVIL PROCEDURE, 1908 FOR [SPECIFIC RELIEF]

MOST RESPECTFULLY SHOWETH:

1. That the Applicant is the Plaintiff in the above Civil Suit, which is presently pending before this Hon'ble Court.

2. PURPOSE OF APPLICATION: The Applicant files this application for [SPECIFIC RELIEF — e.g., "appointment of Local Commissioner / summoning documents / amendment of plaint / production of documents"] under Section 151 C.P.C. read with [ORDER/RULE if applicable].

3. GROUNDS:
   (a) [GROUND 1 — explain why the relief is needed];
   (b) [GROUND 2];
   (c) [GROUND 3].

4. NECESSITY: This application is necessary for [REASON — e.g., "proper adjudication of the suit / to prevent miscarriage of justice / to secure the ends of justice"].

5. No prejudice would be caused to the Respondent by granting this application.

PRAYER:
It is most humbly prayed that this Hon'ble Court be pleased to:
(a) Allow this Interlocutory Application and [SPECIFIC RELIEF];
(b) Pass such other order as this Hon'ble Court may deem fit.

Respectfully submitted,

[LAWYER_NAME]
Advocate for Applicant
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]
Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'caveat-application',
    name: 'Caveat Application (S.148A CPC)',
    category: 'civil',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE COURT OF [COURT_NAME], [CITY]

CAVEAT PETITION NO. ________ of [YEAR]
(Under Section 148A of the Code of Civil Procedure, 1908)

IN THE MATTER OF:

[CLIENT_NAME], son/daughter of [FATHER_NAME],
aged [CLIENT_AGE] years, residing at [CLIENT_ADDRESS]   ... CAVEATOR

CAVEAT PETITION

MOST RESPECTFULLY SHOWETH:

1. That the Caveator, [CLIENT_NAME], is a [CAVEATOR'S RELATIONSHIP TO THE MATTER — e.g., "registered owner/occupant/interested party"] in respect of [PROPERTY/MATTER DESCRIPTION].

2. That the Caveator has reliable information that [LIKELY OPPONENT / OPPOSITE PARTY NAME] and/or their associates are likely to approach this Hon'ble Court for [LIKELY RELIEF — e.g., "an ex parte injunction / stay order / interim order"] against the Caveator in connection with [SUBJECT MATTER].

3. That the Caveator has a legitimate and subsisting interest in the aforesaid matter and it is essential that any application filed by the Opposite Party should not be entertained without prior notice to the Caveator.

4. That the Caveator undertakes to appear before this Hon'ble Court on the next date after receiving notice pursuant to this Caveat.

5. ADDRESS FOR SERVICE: The Caveator's address for service of notice is:
   [CLIENT_NAME], [CLIENT_ADDRESS], Contact: [CLIENT_PHONE].
   Caveator's Advocate: [LAWYER_NAME], [FIRM_NAME], [LAWYER_ADDRESS], [CITY].
   Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL].

PRAYER:
It is most humbly prayed that this Hon'ble Court be pleased to:
(a) Register this Caveat under Section 148A C.P.C.;
(b) Direct that no ex parte order be passed against the Caveator without notice;
(c) Issue notice to the Caveator before entertaining any application filed by [OPPOSITE PARTY];
(d) Pass such other order as this Hon'ble Court may deem fit.

Respectfully submitted,

[LAWYER_NAME]
Advocate for Caveator
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Caveator: ________________________
[CLIENT_NAME]
Date: [DATE]`,
  },

  {
    id: 'execution-petition',
    name: 'Execution Petition (Order XXI CPC)',
    category: 'civil',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE COURT OF [COURT_NAME], [CITY]

EXECUTION PETITION NO. _______ of [YEAR]
(Under Order XXI of the Code of Civil Procedure, 1908)

IN EXECUTION OF DECREE DATED [DECREE_DATE] IN CIVIL SUIT NO. [ORIGINAL_CASE_NO.] OF [YEAR]

[CLIENT_NAME], son/daughter of [FATHER_NAME],
residing at [CLIENT_ADDRESS]                          ... DECREE HOLDER

VERSUS

[JUDGMENT_DEBTOR_NAME], son/daughter of [JD_FATHER_NAME],
residing at [JD_ADDRESS]                              ... JUDGMENT DEBTOR

EXECUTION PETITION

MOST RESPECTFULLY SHOWETH:

1. That a Decree was passed by this Hon'ble Court on [DECREE_DATE] in Civil Suit No. [ORIGINAL_CASE_NO.] of [YEAR] in favour of the Decree Holder/Petitioner and against the Judgment Debtor/Respondent for:
   (a) Recovery of Rs. [DECREE_AMOUNT]/- with interest at [RATE]% per annum from [DATE] till realisation; and/or
   (b) [OTHER RELIEF GRANTED IN DECREE].

2. That despite demand, the Judgment Debtor has failed, refused, and neglected to satisfy the said decree.

3. AMOUNT IN EXECUTION: The following amounts are due under the decree:
   (a) Decree amount: Rs. [DECREE_AMOUNT]/-
   (b) Interest from [DATE] to [DATE]: Rs. [INTEREST]/-
   (c) Costs: Rs. [COSTS]/-
   Total: Rs. [TOTAL]/-

4. MODE OF EXECUTION SOUGHT:
   [  ] Attachment and sale of movable property of the Judgment Debtor described as [PROPERTY].
   [  ] Attachment and sale of immovable property bearing [PROPERTY DETAILS].
   [  ] Arrest and detention of the Judgment Debtor in civil prison.
   [  ] [OTHER MODE].

5. That the Decree Holder believes that the Judgment Debtor owns the following property:
   (a) [PROPERTY DETAILS].

6. That the limitation period for execution is within 12 years from the date of decree.

PRAYER:
It is most humbly prayed that this Hon'ble Court be pleased to:
(a) Execute the Decree dated [DECREE_DATE] in Civil Suit No. [ORIGINAL_CASE_NO.] of [YEAR];
(b) Order attachment and sale of the properties of the Judgment Debtor as described above;
(c) Pass such other order(s) as this Hon'ble Court may deem fit.

Respectfully submitted,

[LAWYER_NAME]
Advocate for Decree Holder
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]
Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'amendment-application',
    name: 'Amendment Application (Order VI Rule 17 CPC)',
    category: 'civil',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE COURT OF [COURT_NAME], [CITY]

Civil Suit No. [CASE_NUMBER] of [YEAR]
I.A. No. _______ of [YEAR]

[CLIENT_NAME]                                       ... PLAINTIFF/APPLICANT

VERSUS

[DEFENDANT_NAME]                                    ... DEFENDANT/RESPONDENT

APPLICATION FOR AMENDMENT OF PLAINT / WRITTEN STATEMENT UNDER ORDER VI RULE 17 OF THE CODE OF CIVIL PROCEDURE, 1908

MOST RESPECTFULLY SHOWETH:

1. That the above Civil Suit is pending before this Hon'ble Court and the [Plaint/Written Statement] was filed by the Applicant on [DATE].

2. That after filing the [Plaint/Written Statement], the Applicant has discovered certain facts/errors which need to be [corrected/added/deleted] in the [Plaint/Written Statement]. The proposed amendments are as follows:

   Existing Text: "[EXISTING TEXT]"
   Proposed Amendment: "[AMENDED TEXT]"
   [Repeat for each amendment]

3. GROUNDS FOR AMENDMENT:
   (a) That the proposed amendments are necessary for determination of the real questions in controversy between the parties.
   (b) That the amendments would not change the nature or character of the suit.
   (c) That the Respondent/Defendant will not be prejudiced by the proposed amendments.
   (d) That the amendments are required due to [REASON — e.g., "inadvertent omission / subsequently discovered material facts / change in circumstances"].
   (e) [IF AFTER COMMENCEMENT OF TRIAL: "The amendments are necessitated by circumstances which could not have been foreseen at the time of drafting."]

4. That the proposed amendments will enable the court to adjudicate on all matters in dispute between the parties effectively.

5. That the Applicant undertakes to pay such costs as this Hon'ble Court may award.

PRAYER:
It is most humbly prayed that this Hon'ble Court be pleased to:
(a) Allow this application for amendment;
(b) Permit the Applicant to file an amended [Plaint/Written Statement] incorporating the proposed amendments;
(c) Condone any delay in filing this application;
(d) Pass such other order as this Hon'ble Court may deem fit.

Respectfully submitted,

[LAWYER_NAME]
Advocate for Applicant
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]
Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'counter-claim',
    name: 'Counter Claim (Order VIII Rule 6A CPC)',
    category: 'civil',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE COURT OF [COURT_NAME], [CITY]

Civil Suit No. [CASE_NUMBER] of [YEAR]

[PLAINTIFF_NAME]                                    ... PLAINTIFF

VERSUS

[CLIENT_NAME]                                       ... DEFENDANT/COUNTER-CLAIMANT

COUNTER CLAIM BY DEFENDANT UNDER ORDER VIII RULE 6A OF THE CODE OF CIVIL PROCEDURE, 1908

MOST RESPECTFULLY SHOWETH:

1. That the Plaintiff has filed the above Civil Suit against the Defendant for [MAIN SUIT RELIEF].

2. That the Defendant, while denying all the allegations in the Plaint for reasons stated in the Written Statement filed separately, prefers this Counter Claim against the Plaintiff under Order VIII Rule 6A C.P.C.

3. COUNTER CLAIM FACTS: [DESCRIBE FACTS GIVING RISE TO COUNTER CLAIM — e.g., "The Plaintiff had agreed on [DATE] to pay the Defendant a sum of Rs. [AMOUNT]/- towards [REASON], but has failed to do so despite repeated demands."]

4. LEGAL BASIS OF COUNTER CLAIM: The Defendant is entitled to the following relief against the Plaintiff:
   (a) Recovery of Rs. [AMOUNT]/- with interest at [RATE]% per annum from [DATE];
   (b) [OTHER COUNTER-CLAIM RELIEF].

5. VALUATION: The Counter Claim is valued at Rs. [COUNTER_CLAIM_AMOUNT]/-.

6. JURISDICTION: This Court has jurisdiction to try this Counter Claim along with the main suit.

7. That the Counter Claim is filed within the period of limitation.

PRAYER:
It is most humbly prayed that this Hon'ble Court be pleased to:
(a) Entertain and try this Counter Claim along with the main suit;
(b) Decree the Counter Claim in favour of the Defendant/Counter-Claimant for a sum of Rs. [COUNTER_CLAIM_AMOUNT]/- with interest;
(c) Award costs to the Defendant/Counter-Claimant;
(d) Pass such other decree/order as this Hon'ble Court may deem fit.

VERIFICATION:
I, [CLIENT_NAME], the Defendant/Counter-Claimant, verify that the contents of the Counter Claim are true and correct to my knowledge and belief.

Verified at [CITY] on [DATE].

Defendant/Counter-Claimant: ________________________
[CLIENT_NAME]

Filed through:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]
Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'contempt-application',
    name: 'Contempt Application',
    category: 'civil',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE HON'BLE HIGH COURT OF [STATE] AT [CITY]
/ IN THE COURT OF [COURT_NAME], [CITY]

Contempt Petition No. _______ of [YEAR]
(Under Section 11/12 of the Contempt of Courts Act, 1971 / under the inherent powers of this Court)

IN THE MATTER OF:

[CLIENT_NAME], son/daughter of [FATHER_NAME],
residing at [CLIENT_ADDRESS]                          ... PETITIONER

VERSUS

[CONTEMNOR_NAME], son/daughter of [CONTEMNOR_FATHER_NAME],
[DESIGNATION], residing at / Officer at [CONTEMNOR_ADDRESS]   ... RESPONDENT/ALLEGED CONTEMNOR

CONTEMPT PETITION FOR WILLFUL DISOBEDIENCE OF ORDER DATED [ORDER_DATE] PASSED BY THIS HON'BLE COURT / [COURT_NAME] IN [CASE_NO.]

MOST RESPECTFULLY SHOWETH:

1. That this Hon'ble Court / the [COURT_NAME] passed an Order dated [ORDER_DATE] in [CASE_NO.], directing [RESPONDENT/CONTEMNOR_NAME] to [DESCRIBE WHAT WAS DIRECTED].

A certified copy of the said Order is annexed hereto as Annexure P-1.

2. That despite service of the said Order upon the Respondent/Contemnor and repeated requests by the Petitioner, the Respondent/Contemnor has willfully, deliberately, and brazenly disobeyed and failed to comply with the aforesaid Order.

3. ACTS OF CONTEMPT: The following acts constitute willful disobedience of the Order dated [ORDER_DATE]:
   (a) [ACT OF NON-COMPLIANCE 1 — with date and specific details];
   (b) [ACT OF NON-COMPLIANCE 2];
   (c) [ACT OF NON-COMPLIANCE 3].

4. That the disobedience of the Order of this Court is deliberate and intentional and cannot be attributed to any misunderstanding or impossibility.

5. That the Petitioner has suffered [HARM/PREJUDICE] as a consequence of the Contemnor's non-compliance.

PRAYER:
It is most humbly prayed that this Hon'ble Court be pleased to:
(a) Issue notice to the Respondent/Alleged Contemnor to show cause why contempt proceedings should not be initiated;
(b) Hold the Respondent/Alleged Contemnor guilty of contempt of court;
(c) Punish the Respondent/Alleged Contemnor as per the provisions of the Contempt of Courts Act, 1971;
(d) Direct the Respondent/Alleged Contemnor to comply with the Order dated [ORDER_DATE] forthwith;
(e) Pass such other order(s) as this Hon'ble Court may deem fit.

Respectfully submitted,

[LAWYER_NAME]
Advocate for Petitioner
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]
Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'memo-of-appearance',
    name: 'Memo of Appearance / Vakalatnama (General)',
    category: 'civil',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE COURT OF [COURT_NAME], [CITY]

[CASE_TYPE] No. [CASE_NUMBER] of [YEAR]

[PARTY1_NAME]                                       ... [PLAINTIFF/PETITIONER]

VERSUS

[PARTY2_NAME]                                       ... [DEFENDANT/RESPONDENT]

MEMO OF APPEARANCE

The undersigned Advocate(s) do hereby enter their/his/her appearance on behalf of the [Plaintiff/Petitioner/Defendant/Respondent], [CLIENT_NAME], in the above-captioned matter.

Appearing Advocate(s):

1. [LAWYER_NAME]
   Advocate
   Bar Council Enrolment No.: [BAR_NUMBER]
   [FIRM_NAME]
   [LAWYER_ADDRESS], [CITY], [STATE] – [PIN_CODE]
   Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Address for Service of Notices/Orders: [FIRM_NAME], [LAWYER_ADDRESS], [CITY].

[LAWYER_NAME]
Advocate for [CLIENT_NAME]
Bar Council No.: [BAR_NUMBER]

---

AUTHORIZATION BY CLIENT

I, [CLIENT_NAME], son/daughter of [FATHER_NAME], aged [CLIENT_AGE] years, residing at [CLIENT_ADDRESS], do hereby authorise [LAWYER_NAME] and/or such other Advocate(s) from [FIRM_NAME] as may be designated, to appear, act, and plead on my behalf in the above matter before this Court and all courts connected therewith.

I authorise the said Advocate(s) to:
1. File, sign, and present all applications, affidavits, documents, and pleadings on my behalf.
2. Receive notices and orders on my behalf.
3. Make compromises and agreements as they deem fit.
4. Do all acts necessary for the conduct of this matter.

Signature: ________________________
[CLIENT_NAME]
Date: [DATE]
Contact: [CLIENT_PHONE]`,
  },

  {
    id: 'review-petition',
    name: 'Review Petition',
    category: 'civil',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE COURT OF [COURT_NAME], [CITY]

Review Petition No. _______ of [YEAR]
(Under Order XLVII Rule 1 read with Section 114 of the Code of Civil Procedure, 1908)

IN THE MATTER OF:

Civil Suit No. [CASE_NO.] of [YEAR]:
[PLAINTIFF_NAME]  vs.  [DEFENDANT_NAME]

[CLIENT_NAME]                                       ... REVIEW PETITIONER

VERSUS

[OPPOSITE_PARTY_NAME]                               ... RESPONDENT

REVIEW PETITION AGAINST JUDGMENT/ORDER DATED [JUDGMENT_DATE]

MOST RESPECTFULLY SHOWETH:

1. That the Petitioner is aggrieved by the Judgment/Order dated [JUDGMENT_DATE] passed by this Hon'ble Court in Civil Suit No. [CASE_NO.] of [YEAR].

2. GROUNDS FOR REVIEW UNDER ORDER XLVII RULE 1 C.P.C.:

   (a) DISCOVERY OF NEW AND IMPORTANT MATTER/EVIDENCE: After the passing of the Judgment, the Petitioner has discovered new and important evidence which, though in existence at the time of the decree, was not within the knowledge of the Petitioner despite due diligence. The said evidence is: [DESCRIBE NEW EVIDENCE].

   (b) MISTAKE OR ERROR APPARENT ON THE FACE OF THE RECORD: There is an apparent error on the face of the record, in that [DESCRIBE ERROR — e.g., "the learned court has calculated the interest incorrectly / applied the wrong provision of law / failed to consider Exhibit [X]"].

   (c) SUFFICIENT CAUSE: [DESCRIBE OTHER SUFFICIENT CAUSE — e.g., "the order on cost is incorrect"].

3. That the Petitioner brings to the notice of this Hon'ble Court the following facts/evidence which were not placed before the court earlier: [DETAILS].

4. That the above errors/omissions have led to a miscarriage of justice and require correction in review.

PRAYER:
It is most humbly prayed that this Hon'ble Court be pleased to:
(a) Admit this Review Petition;
(b) Review and recall / modify the Judgment/Order dated [JUDGMENT_DATE];
(c) Pass such other order as this Court may deem fit.

Respectfully submitted,

[LAWYER_NAME]
Advocate for Review Petitioner
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]
Tel: [LAWYER_PHONE]`,
  },

  // ── PROPERTY & REAL ESTATE ────────────────────────────────────────────────

  {
    id: 'sale-agreement',
    name: 'Sale Agreement',
    category: 'property',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

AGREEMENT FOR SALE OF IMMOVABLE PROPERTY

THIS AGREEMENT FOR SALE ("Agreement") is made and executed on [DATE] at [CITY] between:

VENDOR/SELLER: [CLIENT_NAME], son/daughter of [FATHER_NAME], aged [CLIENT_AGE] years, residing at [CLIENT_ADDRESS], (hereinafter referred to as "the Vendor", which expression shall include their heirs, legal representatives, and assigns); AND

PURCHASER/BUYER: [BUYER_NAME], son/daughter of [BUYER_FATHER_NAME], aged [BUYER_AGE] years, residing at [BUYER_ADDRESS], (hereinafter referred to as "the Purchaser", which expression shall include their heirs, legal representatives, and assigns).

RECITALS:
WHEREAS the Vendor is the absolute and lawful owner in possession of the immovable property more particularly described in the Schedule hereunder and bearing [PROPERTY NO.], situated at [PROPERTY_ADDRESS] (hereinafter "the Property");

WHEREAS the Vendor has agreed to sell and the Purchaser has agreed to purchase the said Property on the terms and conditions hereinafter set out;

NOW THIS AGREEMENT WITNESSETH AS FOLLOWS:

1. SALE CONSIDERATION: The total sale consideration for the Property is agreed at Rs. [TOTAL_AMOUNT]/- (Rupees [AMOUNT_IN_WORDS] only). The Purchaser has paid to the Vendor an advance/earnest money of Rs. [ADVANCE_AMOUNT]/- (Rupees [ADVANCE_IN_WORDS] only) by [CHEQUE/CASH/RTGS], the receipt whereof the Vendor hereby acknowledges.

2. BALANCE PAYMENT: The balance sale consideration of Rs. [BALANCE_AMOUNT]/- shall be paid by the Purchaser to the Vendor at the time of execution and registration of the Sale Deed.

3. COMPLETION DATE: The Sale Deed shall be executed and registered at the Office of the Sub-Registrar, [CITY] on or before [COMPLETION_DATE].

4. TITLE: The Vendor warrants that the Property is free from all encumbrances, mortgages, charges, attachments, liens, lis pendens, claims, and demands of any nature whatsoever and shall deliver clear and marketable title to the Purchaser.

5. DOCUMENTS: The Vendor shall, on or before the date of execution of the Sale Deed, hand over all original title documents relating to the Property to the Purchaser.

6. POSSESSION: Physical possession of the Property shall be delivered to the Purchaser simultaneously with the execution of the registered Sale Deed.

7. OUTGOINGS: All taxes, rates, and charges in respect of the Property up to the date of registration shall be paid by the Vendor. Thereafter, the same shall be the liability of the Purchaser.

8. DEFAULT:
   (a) If the Vendor fails to execute the Sale Deed by the Completion Date, the Vendor shall refund the advance amount with interest at [RATE]% p.a. and the Purchaser shall be entitled to seek specific performance.
   (b) If the Purchaser fails to complete the purchase by the Completion Date, the advance shall stand forfeited.

9. SPECIFIC PERFORMANCE: Both parties agree that this Agreement is specifically enforceable.

SCHEDULE OF PROPERTY:
All that piece and parcel of [LAND/FLAT/PLOT] admeasuring [AREA] [sq.ft./sq.m./Guntas/Acres] bearing [SURVEY NO./FLAT NO./PLOT NO.], situated at [FULL PROPERTY ADDRESS], bounded by:
North: [BOUNDARY NORTH]
South: [BOUNDARY SOUTH]
East: [BOUNDARY EAST]
West: [BOUNDARY WEST]

IN WITNESS WHEREOF, the parties have executed this Agreement on the date first mentioned above.

Vendor:                            Purchaser:
[CLIENT_NAME]                      [BUYER_NAME]

WITNESSES:
1. Name: _________________ Sign: _________________
2. Name: _________________ Sign: _________________

Drafted by:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY] | Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'gift-deed',
    name: 'Gift Deed',
    category: 'property',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

DEED OF GIFT

THIS DEED OF GIFT is made and executed on [DATE] at [CITY] by:

DONOR: [CLIENT_NAME], son/daughter of [FATHER_NAME], aged [CLIENT_AGE] years, residing at [CLIENT_ADDRESS] (hereinafter referred to as "the Donor"); IN FAVOUR OF

DONEE: [DONEE_NAME], son/daughter of [DONEE_FATHER_NAME], aged [DONEE_AGE] years, residing at [DONEE_ADDRESS], [RELATIONSHIP TO DONOR — e.g., "son/daughter/brother/sister of the Donor"] (hereinafter referred to as "the Donee").

RECITALS:
WHEREAS the Donor is the absolute and lawful owner in possession of the immovable property more particularly described in the Schedule below;

WHEREAS the Donor, out of natural love and affection for the Donee and without any monetary consideration whatsoever, desires to gift the said Property to the Donee;

WHEREAS the Donee has accepted the gift of the said Property;

NOW THIS DEED OF GIFT WITNESSETH AS FOLLOWS:

1. GIFT: In consideration of natural love and affection the Donor has for the Donee and for no monetary consideration, the Donor hereby grants, conveys, transfers, and gifts to the Donee the Property described in the Schedule below, to have and to hold the same unto and to the use of the Donee absolutely and forever.

2. ACCEPTANCE: The Donee hereby accepts the gift of the said Property and acknowledges that the same has been accepted during the lifetime of the Donor as required under Section 122 of the Transfer of Property Act, 1882.

3. DELIVERY OF POSSESSION: The Donor has already delivered and the Donee has received physical possession of the gifted Property on the date of these presents.

4. TITLE AND WARRANTY: The Donor warrants that the Property is the absolute property of the Donor, free from all encumbrances, charges, mortgages, liens, demands, and claims, and that the Donor has good right, full power, and absolute authority to make this gift.

5. TITLE DOCUMENTS: The Donor shall deliver all original title documents of the Property to the Donee simultaneously with the registration of this Deed.

6. CONSIDERATION: This gift is made out of natural love and affection only and no monetary consideration has been paid or is payable by the Donee.

SCHEDULE OF PROPERTY:
All that piece and parcel of [PROPERTY TYPE — Land/Flat/House] admeasuring [AREA — sq.ft./sq.m./Guntas] bearing [SURVEY NO./FLAT NO./HOUSE NO.], situated at [FULL PROPERTY ADDRESS], registered in the name of the Donor vide Document No. [DOCUMENT_NO.] dated [DOCUMENT_DATE] registered at the Sub-Registrar Office, [CITY], bounded by:
North: [BOUNDARY NORTH]
South: [BOUNDARY SOUTH]
East: [BOUNDARY EAST]
West: [BOUNDARY WEST]

Market Value: Rs. [MARKET_VALUE]/- (for stamp duty purposes)

IN WITNESS WHEREOF, the Donor has executed this Deed of Gift and the Donee has accepted the same on the date first mentioned above.

Donor:                             Donee:
[CLIENT_NAME]                      [DONEE_NAME]

WITNESSES:
1. Name: _________________ Sign: _________________ Date: _____________
2. Name: _________________ Sign: _________________ Date: _____________

Drafted by:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]`,
  },

  {
    id: 'eviction-notice',
    name: 'Eviction / Termination Notice',
    category: 'property',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

LEGAL NOTICE FOR EVICTION / TERMINATION OF TENANCY

To,
[TENANT_NAME],
[TENANTED_PREMISES_ADDRESS]

Sent via: Registered Post AD / Speed Post / Courier

Under instructions from and on behalf of my client, [CLIENT_NAME], the owner/landlord of the premises bearing [PROPERTY DESCRIPTION] situated at [PROPERTY_ADDRESS] (hereinafter "the Premises"), I hereby serve upon you this Notice as under:

1. That my client is the absolute owner of the Premises. By virtue of a Rent/Lease Agreement dated [AGREEMENT_DATE], you are in occupation of the Premises as a [monthly/annual] tenant at a monthly rent of Rs. [RENT_AMOUNT]/-.

2. GROUNDS FOR TERMINATION/EVICTION:
   [Select applicable ground(s):]
   (a) NON-PAYMENT OF RENT: You have failed and neglected to pay rent for the months of [MONTHS], aggregating to Rs. [ARREARS_AMOUNT]/-. Despite repeated oral demands, you have refused to clear the arrears.
   (b) EXPIRY OF TENANCY: The tenancy period as agreed in the Rent Agreement dated [AGREEMENT_DATE] has expired on [EXPIRY_DATE] and has not been renewed.
   (c) BREACH OF TERMS: You have violated the terms of the Rent Agreement by [SPECIFIC BREACH — e.g., "subletting the premises without consent / carrying out unauthorised construction / using the premises for commercial purposes contrary to the agreement"].
   (d) BONA FIDE REQUIREMENT: My client bonafide requires the Premises for their own occupation and use.

3. That in view of the above, my client hereby terminates the tenancy with immediate effect / with effect from [TERMINATION_DATE] in accordance with the provisions of [STATE RENT CONTROL ACT / Transfer of Property Act, 1882].

YOU ARE HEREBY CALLED UPON TO:
(a) Vacate and deliver peaceful possession of the Premises to my client on or before [VACATE_BY_DATE];
(b) Pay the rent arrears of Rs. [ARREARS_AMOUNT]/- along with mesne profits;
(c) Remove all your belongings from the Premises.

Should you fail to comply with this Notice within the period stipulated above, my client shall be constrained to initiate eviction proceedings under [State Rent Control Act / Transfer of Property Act] before the competent court, entirely at your risk and cost.

Please note that this Notice serves as a notice of termination of tenancy under Section 106 of the Transfer of Property Act, 1882.

Yours truly,

[LAWYER_NAME]
Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]`,
  },

  {
    id: 'partition-deed',
    name: 'Partition Deed',
    category: 'property',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

DEED OF PARTITION

THIS DEED OF PARTITION is made and executed on [DATE] at [CITY] between the following co-owners/co-parceners:

PARTY OF THE FIRST PART: [CLIENT_NAME], son/daughter of [FATHER_NAME], aged [CLIENT_AGE] years, residing at [CLIENT_ADDRESS];

PARTY OF THE SECOND PART: [SECOND_PARTY_NAME], son/daughter of [SECOND_FATHER_NAME], aged [SECOND_AGE] years, residing at [SECOND_ADDRESS];

PARTY OF THE THIRD PART: [THIRD_PARTY_NAME], son/daughter of [THIRD_FATHER_NAME], aged [THIRD_AGE] years, residing at [THIRD_ADDRESS];

(All the above parties are hereinafter individually referred to as "Partitioner" and collectively as "the Parties".)

RECITALS:
(A) The Parties are the legal heirs/co-owners of the immovable property described in Schedule "A" below (hereinafter "the Joint Property"), having inherited/acquired the same from [DECEASED_ANCESTOR_NAME] / through [TITLE_ORIGIN].

(B) The Parties hold the Joint Property jointly and in undivided shares as follows:
    - [CLIENT_NAME]: [SHARE — e.g., "1/3rd share"]
    - [SECOND_PARTY_NAME]: [SHARE]
    - [THIRD_PARTY_NAME]: [SHARE]

(C) The Parties have mutually agreed to partition the Joint Property amicably and to hold their respective shares separately and independently.

NOW THIS DEED OF PARTITION WITNESSETH AS FOLLOWS:

1. PARTITION: The Parties hereby mutually agree and arrange that the Joint Property shall stand partitioned as follows:

   SHARE ALLOTTED TO [CLIENT_NAME] ("Schedule B Property"):
   [DESCRIPTION OF ALLOTTED PORTION — area, location, boundaries]

   SHARE ALLOTTED TO [SECOND_PARTY_NAME] ("Schedule C Property"):
   [DESCRIPTION OF ALLOTTED PORTION]

   SHARE ALLOTTED TO [THIRD_PARTY_NAME] ("Schedule D Property"):
   [DESCRIPTION OF ALLOTTED PORTION]

2. EQUALISATION: In consideration of the partition, [PARTY_NAME] shall pay to [OTHER_PARTY_NAME] a sum of Rs. [EQUALISATION_AMOUNT]/- as equalisation money to make up the difference in value, if any.

3. POSSESSION: Each Party shall henceforth hold, possess, and enjoy their respective allotted portion absolutely and in their own right, free from all claims of the other Parties.

4. TITLE DOCUMENTS: All original title documents shall be deposited with / retained by [PARTY_NAME]. Certified copies shall be made available to all Parties.

5. ENCUMBRANCES: Each Party shall be solely responsible for all liabilities, dues, and encumbrances, if any, in respect of their respective allotted portion.

6. COMMON AREAS: The following shall remain as common property to be jointly owned and maintained: [COMMON AREAS — e.g., "driveway / passage / open area / terrace"].

SCHEDULE A — JOINT PROPERTY:
[FULL DESCRIPTION OF ENTIRE JOINT PROPERTY WITH BOUNDARIES AND MEASUREMENT]

IN WITNESS WHEREOF, all the Parties have executed this Deed of Partition on the date first mentioned above.

Party of the First Part:     Party of the Second Part:    Party of the Third Part:
[CLIENT_NAME]                [SECOND_PARTY_NAME]          [THIRD_PARTY_NAME]

WITNESSES:
1. Name: _________________ Sign: _________________
2. Name: _________________ Sign: _________________

Drafted by:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER], [FIRM_NAME], [CITY]`,
  },

  {
    id: 'relinquishment-deed',
    name: 'Relinquishment Deed',
    category: 'property',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

DEED OF RELINQUISHMENT

THIS DEED OF RELINQUISHMENT is executed on [DATE] at [CITY] by:

RELEASOR: [CLIENT_NAME], son/daughter of [FATHER_NAME], aged [CLIENT_AGE] years, residing at [CLIENT_ADDRESS] (hereinafter referred to as "the Releasor"); IN FAVOUR OF

RELEASEE: [RELEASEE_NAME], son/daughter of [RELEASEE_FATHER_NAME], aged [RELEASEE_AGE] years, residing at [RELEASEE_ADDRESS], [RELATIONSHIP — e.g., "brother of the Releasor"] (hereinafter referred to as "the Releasee").

RECITALS:
(A) The Releasor and the Releasee are co-owners and legal heirs of the immovable property described in the Schedule below ("the Property"), being legal heirs of late [DECEASED_NAME], who died intestate/testate on [DATE_OF_DEATH].

(B) The Releasor's share in the said Property is [SHARE — e.g., "1/2 (half) undivided share"].

(C) The Releasor, out of natural love and affection for the Releasee and in consideration of Rs. [CONSIDERATION]/- (receipt of which is hereby acknowledged / for no monetary consideration), desires to relinquish his/her share in the Property in favour of the Releasee.

NOW THIS DEED WITNESSETH AS FOLLOWS:

1. RELINQUISHMENT: The Releasor hereby relinquishes, releases, and gives up all his/her right, title, interest, share, and claim of whatsoever nature in and to the Property described in the Schedule below in favour of the Releasee.

2. FUTURE CLAIM: The Releasor, for himself/herself and for his/her heirs, executors, administrators, and assigns, hereby covenants that he/she shall not at any time hereafter make any claim or demand in respect of the said Property or interfere with the peaceful possession and enjoyment thereof by the Releasee.

3. CONSIDERATION: This relinquishment is made in consideration of natural love and affection / a sum of Rs. [AMOUNT]/- paid by the Releasee to the Releasor, receipt of which is hereby acknowledged.

4. INDEMNITY: The Releasor shall indemnify and keep indemnified the Releasee against any claim made by any third party in connection with the Releasor's share in the Property.

5. DELIVERY: The Releasor has simultaneously delivered/confirms delivery of possession of his/her portion to the Releasee.

SCHEDULE OF PROPERTY:
All that [PROPERTY TYPE] admeasuring [AREA] bearing [SURVEY NO./PROPERTY NO.], situated at [ADDRESS], bounded by:
North: [NORTH] | South: [SOUTH] | East: [EAST] | West: [WEST]
Originally registered in the name of [ORIGINAL OWNER] vide Doc. No. [DOC_NO.] dated [DOC_DATE], Sub-Registrar's Office, [CITY].

IN WITNESS WHEREOF, the Releasor has executed this Deed of Relinquishment on the date above mentioned.

Releasor:                          Releasee (Accepting):
[CLIENT_NAME]                      [RELEASEE_NAME]

WITNESSES:
1. Name: _________________ Sign: _________________
2. Name: _________________ Sign: _________________

Drafted by:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER], [FIRM_NAME], [CITY]`,
  },

  {
    id: 'mortgage-deed',
    name: 'Mortgage Deed',
    category: 'property',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

DEED OF MORTGAGE
(Simple Mortgage / Usufructuary Mortgage — as applicable)
(Under Section 58 of the Transfer of Property Act, 1882)

THIS DEED OF MORTGAGE is made and executed on [DATE] at [CITY] between:

MORTGAGOR: [CLIENT_NAME], son/daughter of [FATHER_NAME], aged [CLIENT_AGE] years, residing at [CLIENT_ADDRESS] (hereinafter referred to as "the Mortgagor"); AND

MORTGAGEE: [LENDER_NAME], [son/daughter of [LENDER_FATHER_NAME] / a banking company/NBFC incorporated under [ACT]], having its [office/branch] at [LENDER_ADDRESS] (hereinafter referred to as "the Mortgagee").

RECITALS:
(A) The Mortgagor is the absolute owner of the property described in the Schedule below ("the Mortgaged Property").
(B) The Mortgagor has approached the Mortgagee for a loan of Rs. [LOAN_AMOUNT]/-.
(C) The Mortgagee has agreed to advance the said loan against the security of the Mortgaged Property.

NOW THIS DEED OF MORTGAGE WITNESSETH AS FOLLOWS:

1. LOAN AMOUNT: In consideration of the Mortgagee having this day advanced to the Mortgagor a sum of Rs. [LOAN_AMOUNT]/- (Rupees [AMOUNT_IN_WORDS] only) by [CHEQUE/RTGS/DD NO.] dated [DATE], the receipt of which the Mortgagor hereby acknowledges, the Mortgagor hereby creates a mortgage over the Mortgaged Property in favour of the Mortgagee.

2. INTEREST: The Mortgagor shall pay interest on the loan amount at the rate of [INTEREST_RATE]% per annum, payable [monthly/quarterly], commencing from [DATE].

3. REPAYMENT: The loan amount together with interest shall be repaid by the Mortgagor in [NUMBER] equal monthly instalments of Rs. [EMI_AMOUNT]/- each, commencing from [DATE], or as per the repayment schedule to be provided by the Mortgagee.

4. SECURITY: As security for repayment of the loan and interest, the Mortgagor hereby mortgages by way of simple mortgage the Mortgaged Property in favour of the Mortgagee, and covenants to pay the mortgage money and if the Mortgagor fails to do so, the Mortgagee shall have the right to cause the Mortgaged Property to be sold.

5. TITLE DOCUMENTS: The Mortgagor shall deposit all original title documents of the Mortgaged Property with the Mortgagee as security.

6. INSURANCE: The Mortgagor shall keep the Mortgaged Property insured against fire and other risks during the subsistence of this mortgage.

7. DISCHARGE: Upon repayment of the entire loan amount with interest and charges, the Mortgagee shall execute a Deed of Reconveyance/Discharge in favour of the Mortgagor.

8. DEFAULT: In the event of default in repayment, the Mortgagee shall be entitled to enforce the mortgage by sale of the Mortgaged Property in accordance with law.

SCHEDULE OF MORTGAGED PROPERTY:
[FULL PROPERTY DESCRIPTION — type, survey no., area, address, boundaries]
Registered in the name of the Mortgagor vide Doc. No. [DOC_NO.] dated [DOC_DATE], Sub-Registrar's Office, [CITY].
Present Market Value: Rs. [MARKET_VALUE]/-

IN WITNESS WHEREOF, the Mortgagor has executed this Deed of Mortgage on the date first mentioned above.

Mortgagor:                         Mortgagee/Authorised Signatory:
[CLIENT_NAME]                      [LENDER_NAME]

WITNESSES:
1. Name: _________________ Sign: _________________
2. Name: _________________ Sign: _________________

Drafted by:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER], [FIRM_NAME], [CITY]`,
  },

  {
    id: 'property-dispute-notice',
    name: 'Property Dispute Legal Notice',
    category: 'property',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

WITHOUT PREJUDICE
LEGAL NOTICE

To,
[NOTICEE_NAME],
[NOTICEE_ADDRESS]

Sent via: Registered Post AD / Speed Post

Under instructions from and on behalf of my client, [CLIENT_NAME], son/daughter of [FATHER_NAME], residing at [CLIENT_ADDRESS], the absolute owner of the immovable property described hereunder, I hereby issue this Legal Notice as under:

1. OWNERSHIP: My client is the absolute owner of the property bearing [SURVEY NO./PLOT NO./FLAT NO.], admeasuring [AREA], situated at [PROPERTY_ADDRESS] (hereinafter "the Property"), as evidenced by [TITLE DEED/SALE DEED dated [DEED_DATE], registered as Doc. No. [DOC_NO.] at Sub-Registrar's Office, [CITY]].

2. DISPUTE: It has come to my client's attention that you are/have been:
   [Select applicable]:
   (a) Claiming ownership / title / interest in the Property without any legal basis;
   (b) Trespassing upon and unauthorisedly occupying a portion / the entirety of the Property;
   (c) Attempting to alienate / sell / transfer the Property or a part thereof to third parties despite having no right, title, or interest therein;
   (d) Interfering with my client's peaceful possession and enjoyment of the Property;
   (e) Raising illegal construction / encroachment upon the Property.

3. TITLE: Your purported claim of [OWNERSHIP/OCCUPATION/INTEREST] in the Property is illegal, baseless, and contrary to law. My client's title to the Property is clear and marketable.

4. LOSS: Due to your unlawful acts, my client has suffered and is continuing to suffer [SPECIFY LOSS — irreparable harm / financial loss / mental agony].

YOU ARE HEREBY CALLED UPON to:
(a) Forthwith desist from making any claim, creating any encumbrance, or interfering with my client's rights over the Property;
(b) Vacate and deliver peaceful possession of any portion of the Property in your unauthorised occupation;
(c) Withdraw and cancel any sale/transfer/encumbrance documents created by you in respect of the Property;
(d) Pay damages of Rs. [DAMAGES_AMOUNT]/- towards losses caused to my client.

Failing compliance within [NOTICE_PERIOD] days of receipt hereof, my client shall be constrained to initiate civil proceedings for declaration of title, permanent injunction, recovery of possession, and mesne profits, as well as criminal proceedings for trespass under the Indian Penal Code, without further notice, at your risk and cost.

Yours truly,

[LAWYER_NAME]
Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]`,
  },

  {
    id: 'builder-dispute-notice',
    name: 'Builder Dispute Notice',
    category: 'property',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

LEGAL NOTICE

To,
[BUILDER_NAME / DEVELOPER_NAME],
[DESIGNATION],
[COMPANY_NAME],
[COMPANY_ADDRESS]

Sent via: Registered Post AD / Speed Post / Email

Under instructions from and on behalf of my client, [CLIENT_NAME], son/daughter of [FATHER_NAME], residing at [CLIENT_ADDRESS], I hereby issue this Legal Notice as under:

1. BOOKING: My client had entered into an Agreement for Sale / Builder Buyer Agreement dated [AGREEMENT_DATE] with you / your company for purchase of [FLAT/VILLA/PLOT] bearing Unit No. [UNIT_NO.], [FLOOR/BLOCK/TOWER], in your project "[PROJECT_NAME]" situated at [PROJECT_ADDRESS], having a carpet/super built-up area of [AREA], at a total consideration of Rs. [TOTAL_AMOUNT]/-.

2. PAYMENTS MADE: My client has duly made payments amounting to Rs. [PAID_AMOUNT]/- out of the total consideration, as per the payment schedule, details of which are as under: [PAYMENT_DETAILS / "Refer to Annexure A"].

3. GRIEVANCES: Despite my client having made substantial payments and despite the agreed possession date of [POSSESSION_DATE] having long elapsed, you have:
   (a) Failed to deliver possession of the aforesaid unit on the promised date;
   (b) Failed to complete the construction / obtain Occupancy Certificate;
   (c) Made unauthorised changes to the specifications/layout without my client's consent;
   (d) Demanded illegal extra charges not agreed upon in the Agreement;
   (e) [OTHER GRIEVANCE].

4. LEGAL RIGHTS: My client is protected under the Real Estate (Regulation and Development) Act, 2016 (RERA), the Consumer Protection Act, 2019, and the Builder Buyer Agreement. You are in clear breach of your obligations.

YOU ARE HEREBY CALLED UPON to:
(a) Hand over complete and ready possession of Unit No. [UNIT_NO.] along with the Occupancy Certificate on or before [DATE];
(b) Pay delay compensation at the rate prescribed under RERA / as agreed in the Agreement from [POSSESSION_DATE] till date of possession;
(c) Refund the excess/illegal charges collected, amounting to Rs. [AMOUNT]/-.

Should you fail to comply within [NOTICE_PERIOD] days of receipt hereof, my client shall be constrained to file a complaint before the RERA Authority / Consumer Disputes Redressal Commission / Civil Court and claim refund of the full amount paid with interest, delay compensation, and damages, without further notice.

Yours truly,

[LAWYER_NAME]
Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]`,
  },

  {
    id: 'land-encroachment-notice',
    name: 'Land Encroachment Notice',
    category: 'property',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

LEGAL NOTICE — ENCROACHMENT ON PRIVATE PROPERTY

To,
[ENCROACHER_NAME],
[ENCROACHER_ADDRESS]

Sent via: Registered Post AD / Speed Post

Under instructions from and on behalf of my client, [CLIENT_NAME], son/daughter of [FATHER_NAME], residing at [CLIENT_ADDRESS], the absolute owner of the land described hereunder, I hereby issue this Legal Notice as under:

1. OWNERSHIP: My client is the absolute owner in peaceful possession of agricultural/residential/commercial land bearing Survey No. [SURVEY_NO.], admeasuring [AREA — e.g., "3 Acres 10 Guntas"], situated at [VILLAGE/LOCALITY], [TALUK], [DISTRICT], [STATE], as evidenced by registered Sale Deed / Title Deed bearing Doc. No. [DOC_NO.] dated [DOC_DATE] registered at Sub-Registrar Office, [OFFICE_NAME]. The land is entered in my client's name in the revenue records/Pahani as well.

2. ENCROACHMENT: It has come to my client's notice that you have, without any authority, permission, or colour of title, illegally and forcibly encroached upon approximately [ENCROACHED_AREA] of my client's abovementioned land. Specifically, you have:
   (a) Erected [FENCE/COMPOUND WALL/STRUCTURE/SHED] on my client's land;
   (b) Ploughed / cultivated my client's land as if it were your own;
   (c) Blocked the access road / pathway to my client's land.

3. NO RIGHT: You have absolutely no right, title, interest, or claim over my client's land. Your encroachment is illegal and amounts to trespass punishable under the applicable provisions of the Indian Penal Code and the [State Land Revenue Act].

4. LOSS: My client is suffering irreparable loss and damage due to your illegal encroachment, and the same cannot be compensated in money.

YOU ARE HEREBY CALLED UPON to:
(a) Immediately and forthwith REMOVE the encroachment, unauthorised structure, fencing, or construction on my client's land;
(b) Vacate and restore peaceful possession of the encroached portion to my client;
(c) Pay damages of Rs. [DAMAGES]/- for the period of illegal occupation.

Failing compliance within [NOTICE_PERIOD] days of receipt hereof, my client shall be constrained to file a civil suit for mandatory injunction, declaration of title, recovery of possession, and damages, and shall also lodge a complaint for criminal trespass under Section 441 IPC, entirely at your risk and cost.

Yours truly,

[LAWYER_NAME]
Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]`,
  },

  // ── FAMILY LAW ────────────────────────────────────────────────────────────

  {
    id: 'divorce-mutual',
    name: 'Divorce Petition (Mutual Consent — Section 13B HMA)',
    category: 'family',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE COURT OF THE PRINCIPAL JUDGE / [FAMILY COURT], [CITY]

Divorce Petition No. _______ of [YEAR]
(Under Section 13B of the Hindu Marriage Act, 1955)

IN THE MATTER OF:

[CLIENT_NAME] (Petitioner No. 1)
son/daughter of [FATHER_NAME], aged [CLIENT_AGE] years,
residing at [CLIENT_ADDRESS]

AND

[SPOUSE_NAME] (Petitioner No. 2)
son/daughter of [SPOUSE_FATHER_NAME], aged [SPOUSE_AGE] years,
residing at [SPOUSE_ADDRESS]

JOINT PETITION FOR DISSOLUTION OF MARRIAGE BY MUTUAL CONSENT UNDER SECTION 13B OF THE HINDU MARRIAGE ACT, 1955

MOST RESPECTFULLY SHOWETH:

1. That the Petitioners were married to each other on [MARRIAGE_DATE] at [MARRIAGE_PLACE] according to Hindu rites and customs / as per the Special Marriage Act. The marriage was duly registered vide Certificate No. [CERT_NO.] dated [CERT_DATE].

2. That after the marriage, the parties lived together at [MATRIMONIAL_HOME_ADDRESS] as husband and wife.

3. [If applicable] That from the said wedlock, [NUMBER] child/children was/were born, namely: [CHILD_NAME(S)], aged [AGE(S)].

4. That owing to irreconcilable differences and incompatibility in temperament, the parties have been living separately since [SEPARATION_DATE], i.e., for more than one year preceding the date of this petition.

5. That the parties have mutually agreed that their marriage has broken down irretrievably and that it would be in the best interest of both parties to dissolve the marriage.

6. That the parties have arrived at a full and final settlement of all their claims, disputes, and differences, including maintenance, alimony, return of stridhan/dowry articles, and custody of children, on the following terms:
   (a) ALIMONY/MAINTENANCE: [SPOUSE_NAME] shall receive / neither party shall claim permanent alimony from the other.
   (b) CUSTODY OF CHILDREN: [CUSTODY TERMS — e.g., "Custody of the minor child [NAME] shall vest with [Petitioner No. 1/2]. The other petitioner shall have visitation rights on [DAYS/SCHEDULE]."]
   (c) STRIDHAN/DOWRY ARTICLES: All stridhan articles have been returned to [SPOUSE_NAME] to their full satisfaction.
   (d) PROPERTY SETTLEMENT: [PROPERTY TERMS, if any].

7. That both petitioners declare that the petition is not presented in collusion with each other and that the averments made herein are true and correct.

8. That both petitioners pray that this Hon'ble Court be pleased to pass a decree of dissolution of marriage under Section 13B(1) of the Hindu Marriage Act, 1955, and after the statutory period of six months, confirm the same under Section 13B(2).

PRAYER:
It is most humbly prayed that this Hon'ble Court be pleased to:
(a) Pass a decree of divorce dissolving the marriage between the Petitioners under Section 13B of the Hindu Marriage Act, 1955;
(b) Dispense with the mandatory waiting period of six months if this Court is satisfied that the marriage has broken down irretrievably [relying on Amardeep Singh v. Harveen Kaur, (2017) 8 SCC 746];
(c) Pass such other order as this Court may deem fit.

VERIFICATION:
We, the Petitioners above-named, do hereby verify that the contents of this petition are true and correct to our knowledge and belief.

Petitioner No. 1:                  Petitioner No. 2:
[CLIENT_NAME]                      [SPOUSE_NAME]
Date: [DATE]                       Date: [DATE]

Filed through:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY] | Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'divorce-contested',
    name: 'Divorce Petition (Contested)',
    category: 'family',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE COURT OF THE PRINCIPAL JUDGE / [FAMILY COURT], [CITY]

Divorce Petition No. _______ of [YEAR]
(Under Section 13 of the Hindu Marriage Act, 1955)

IN THE MATTER OF:

[CLIENT_NAME]                                         ... PETITIONER
son/daughter of [FATHER_NAME], aged [CLIENT_AGE] years,
residing at [CLIENT_ADDRESS]

VERSUS

[SPOUSE_NAME]                                         ... RESPONDENT
son/daughter of [SPOUSE_FATHER_NAME], aged [SPOUSE_AGE] years,
residing at [SPOUSE_ADDRESS]

PETITION FOR DISSOLUTION OF MARRIAGE UNDER SECTION 13 OF THE HINDU MARRIAGE ACT, 1955

MOST RESPECTFULLY SHOWETH:

1. That the Petitioner and Respondent were married to each other on [MARRIAGE_DATE] at [MARRIAGE_PLACE] according to Hindu rites and ceremonies. The marriage was registered vide Certificate No. [CERT_NO.].

2. That after the marriage, the parties resided together at [MATRIMONIAL_HOME_ADDRESS].

3. [If applicable] That from the said wedlock, [NUMBER] child/children was/were born, namely [CHILD_NAME(S)], aged [AGE(S)], presently residing with [PETITIONER/RESPONDENT].

4. GROUNDS FOR DIVORCE (under Section 13, HMA):

   [Select applicable ground(s):]

   (a) CRUELTY [Section 13(1)(ia)]: That the Respondent has treated the Petitioner with cruelty, both physical and mental. Specifically:
       (i) The Respondent has been subjecting the Petitioner to verbal abuse, humiliation, and physical assault since [DATE];
       (ii) [SPECIFIC INCIDENT 1 with date and details];
       (iii) [SPECIFIC INCIDENT 2 with date and details].
       The said acts of cruelty have made it impossible for the Petitioner to live with the Respondent.

   (b) DESERTION [Section 13(1)(ib)]: That the Respondent has deserted the Petitioner without reasonable cause and without the consent of the Petitioner for a continuous period of not less than two years immediately preceding the date of this petition, i.e., since [DESERTION_DATE].

   (c) ADULTERY [Section 13(1)(i)]: [If applicable — describe].

5. That the Petitioner has not in any manner condoned the said acts of the Respondent.

6. That there has been no collusion between the Petitioner and the Respondent in presenting this petition.

7. That the parties have been living separately since [SEPARATION_DATE].

8. That this petition is not barred under any of the provisions of Section 23 of the Hindu Marriage Act, 1955.

9. That this Court has jurisdiction to try this petition as the parties last resided together within the jurisdiction of this Court / the marriage was solemnized within the jurisdiction of this Court.

PRAYER:
It is most humbly prayed that this Hon'ble Court be pleased to:
(a) Pass a decree of divorce dissolving the marriage solemnized between the Petitioner and Respondent on [MARRIAGE_DATE];
(b) Award permanent alimony and maintenance to the Petitioner / Grant custody of the minor child to the Petitioner;
(c) Pass such other order as this Court may deem fit and proper.

VERIFICATION:
I, [CLIENT_NAME], the Petitioner above-named, verify that the contents of this petition are true to my knowledge and belief.

Verified at [CITY] on [DATE].

Petitioner: ________________________
[CLIENT_NAME]

Filed through:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]`,
  },

  {
    id: 'maintenance-125',
    name: 'Maintenance Application (Section 125 CrPC)',
    category: 'family',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE COURT OF THE JUDICIAL MAGISTRATE FIRST CLASS / PRINCIPAL JUDGE, FAMILY COURT, [CITY]

Criminal Misc. Application No. _______ of [YEAR]
(Under Section 125 of the Code of Criminal Procedure, 1973)

IN THE MATTER OF:

[CLIENT_NAME]                                         ... APPLICANT
wife/child of [RESPONDENT_NAME],
aged [CLIENT_AGE] years, residing at [CLIENT_ADDRESS]

VERSUS

[RESPONDENT_NAME]                                     ... RESPONDENT
son of [RESPONDENT_FATHER_NAME], aged [RESPONDENT_AGE] years,
[RESPONDENT_OCCUPATION], residing at [RESPONDENT_ADDRESS]

APPLICATION FOR MAINTENANCE UNDER SECTION 125 Cr.P.C.

MOST RESPECTFULLY SHOWETH:

1. That the Applicant is the [wife/minor child/major disabled child/father/mother] of the Respondent. The Applicant and Respondent were married on [MARRIAGE_DATE] at [MARRIAGE_PLACE] according to [RELIGIOUS RITES / SPECIAL MARRIAGE ACT]. [If child: "The Applicant is the minor child of the Respondent born on [DATE_OF_BIRTH]."]

2. That the Respondent is employed as [OCCUPATION] earning a monthly income of approximately Rs. [RESPONDENT_INCOME]/- per month [from salary / business / profession], exclusive of perquisites and other benefits.

3. That the Respondent has, without any sufficient reason, neglected and refused to maintain the Applicant since [DATE], despite the Applicant having no independent income/source of livelihood.

4. FINANCIAL POSITION OF APPLICANT: The Applicant has no independent income or means of sustenance. The Applicant is entirely dependent on the Respondent for maintenance. The monthly expenses of the Applicant are approximately Rs. [APPLICANT_EXPENSES]/-.

5. GROUNDS FOR MAINTENANCE:
   (a) That the Respondent has deserted the Applicant without reasonable cause since [DATE].
   (b) That the Respondent has been treating the Applicant with cruelty and has driven the Applicant out of the matrimonial home.
   (c) That the Respondent has refused and neglected to maintain the Applicant despite having sufficient means to do so.

6. That the Applicant is entitled to maintenance under Section 125 Cr.P.C. at the rate of Rs. [MAINTENANCE_AMOUNT]/- per month.

7. INTERIM MAINTENANCE: The Applicant is in immediate financial need and prays for interim maintenance pending final disposal of this application.

8. That the Applicant has not filed any similar application before any other Court.

PRAYER:
It is most humbly prayed that this Hon'ble Court be pleased to:
(a) Direct the Respondent to pay maintenance to the Applicant at the rate of Rs. [MAINTENANCE_AMOUNT]/- per month from the date of this application;
(b) Direct the Respondent to pay interim maintenance at the rate of Rs. [INTERIM_AMOUNT]/- per month pending disposal of this application;
(c) Direct the Respondent to pay litigation expenses of Rs. [LITIGATION_EXPENSES]/-;
(d) Pass such other order as this Court may deem fit and proper.

VERIFICATION:
I, [CLIENT_NAME], the Applicant above-named, verify that the contents of this application are true and correct.

Verified at [CITY] on [DATE].

Applicant: ________________________
[CLIENT_NAME]

Filed through:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]`,
  },

  {
    id: 'child-custody',
    name: 'Child Custody Application',
    category: 'family',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE COURT OF THE PRINCIPAL JUDGE, FAMILY COURT / [COURT_NAME], [CITY]

Application No. _______ of [YEAR]
(Under Section 26 of the Hindu Marriage Act, 1955 / Section 25 of the Guardians and Wards Act, 1890)

IN THE MATTER OF:

[CLIENT_NAME]                                         ... APPLICANT/PETITIONER
[RELATIONSHIP — Father/Mother] of the minor child,
residing at [CLIENT_ADDRESS]

VERSUS

[RESPONDENT_NAME]                                     ... RESPONDENT
[RELATIONSHIP — Father/Mother] of the minor child,
residing at [RESPONDENT_ADDRESS]

APPLICATION FOR CUSTODY OF MINOR CHILD

MOST RESPECTFULLY SHOWETH:

1. That the Applicant and Respondent are the natural parents of the minor child [CHILD_NAME], born on [CHILD_DOB], presently aged [CHILD_AGE] years.

2. That the parents were married on [MARRIAGE_DATE] and have been living separately since [SEPARATION_DATE] due to matrimonial disputes. [Divorce proceedings are pending before / a decree of divorce has been passed by this Court in [CASE_NO.].]

3. That the minor child is presently in the custody of the Respondent at [ADDRESS], without the consent and against the wishes of the Applicant.

4. BEST INTEREST OF CHILD: The welfare and best interest of the minor child, which is the paramount consideration in all matters of custody (as held by the Supreme Court in Gaurav Nagpal v. Sumedha Nagpal, (2009) 1 SCC 42), lies with the Applicant for the following reasons:
   (a) The Applicant is better placed financially and emotionally to care for the child.
   (b) The child has been bonded with and accustomed to the care of the Applicant.
   (c) The Respondent has [REASON — e.g., "been neglecting the child / is unfit to care for the child / has been alienating the child from the Applicant"].
   (d) The Applicant has stable housing, regular income of Rs. [INCOME]/- per month, and strong family support.

5. EDUCATIONAL AND SOCIAL WELFARE: The child is presently studying at [SCHOOL_NAME], [CITY]. The Applicant undertakes to ensure continuity of education and all-round development of the child.

6. VISITATION: The Applicant is willing to grant reasonable and structured visitation rights to the Respondent on mutually agreed terms.

7. INTERIM CUSTODY: The Applicant prays for interim custody of the minor child pending final disposal of this application to prevent further harm to the child's welfare.

8. That the Applicant has not filed any similar application before any other Court.

PRAYER:
It is most humbly prayed that this Hon'ble Court be pleased to:
(a) Grant permanent custody of the minor child [CHILD_NAME] to the Applicant;
(b) Grant interim custody of the minor child to the Applicant pending disposal of this application;
(c) Direct the Respondent to hand over the minor child to the Applicant forthwith;
(d) Regulate visitation rights of the Respondent as this Court may deem fit;
(e) Pass such other orders as this Court may deem fit and proper in the interest of the minor child.

Applicant: ________________________
[CLIENT_NAME]

Filed through:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY] | Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'domestic-violence',
    name: 'Domestic Violence Complaint (PWDVA 2005)',
    category: 'family',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE COURT OF THE JUDICIAL MAGISTRATE FIRST CLASS / METROPOLITAN MAGISTRATE, [CITY]

Complaint / Application No. _______ of [YEAR]
(Under Sections 12, 18, 19, 20, 21, 22 of the Protection of Women from Domestic Violence Act, 2005)

IN THE MATTER OF:

[CLIENT_NAME]                                         ... AGGRIEVED PERSON/COMPLAINANT
wife/daughter of [RESPONDENT_NAME],
aged [CLIENT_AGE] years, residing at [CURRENT_SAFE_ADDRESS]

VERSUS

1. [RESPONDENT_NAME] (Husband/Partner)                ... RESPONDENT NO. 1
   residing at [RESPONDENT_ADDRESS]
2. [IN-LAW_NAME] (Mother-in-law / Father-in-law)      ... RESPONDENT NO. 2
   residing at [RESPONDENT_2_ADDRESS]

COMPLAINT/APPLICATION UNDER SECTIONS 12, 18, 19, 20, 21 AND 22 OF THE PROTECTION OF WOMEN FROM DOMESTIC VIOLENCE ACT, 2005

MOST RESPECTFULLY SHOWETH:

1. That the Complainant/Aggrieved Person and Respondent No. 1 were married on [MARRIAGE_DATE] at [MARRIAGE_PLACE] according to Hindu rites. They resided together at the shared household at [MATRIMONIAL_HOME_ADDRESS].

2. That [CHILD DETAILS if any: "From the said wedlock, [NUMBER] child/children was/were born, namely [CHILD_NAME(S)], aged [AGE(S)]."]

3. ACTS OF DOMESTIC VIOLENCE:
   The Respondents have been subjecting the Complainant to domestic violence as defined under Section 3 of the PWDVA, 2005, which includes:

   (a) PHYSICAL ABUSE: [DATE-WISE INCIDENTS — e.g., "On [DATE], Respondent No. 1 physically assaulted the Complainant by [DESCRIPTION OF ASSAULT], causing [INJURIES]. Medical treatment was taken at [HOSPITAL_NAME]."]

   (b) SEXUAL ABUSE: [If applicable — describe without graphic detail].

   (c) VERBAL AND EMOTIONAL ABUSE: The Respondents have been regularly hurling abuses, making derogatory remarks, humiliating the Complainant in front of family members, and threatening her with dire consequences.

   (d) ECONOMIC ABUSE: The Respondents have [deprived the Complainant of financial resources / stopped giving household expenses since [DATE] / taken away all her jewellery and stridhan worth Rs. [AMOUNT]/-].

   (e) HARASSMENT FOR DOWRY: The Respondents have been making persistent illegal demands for additional dowry of Rs. [AMOUNT]/- and [GOODS], and on failure to meet such demands, have subjected the Complainant to further violence.

4. That the Complainant was forced to leave the matrimonial home on [DATE] and is currently residing at [SAFE_LOCATION].

5. That the Complainant requires protection, residence, and maintenance orders urgently to safeguard herself and her children from further violence.

RELIEFS SOUGHT:

PRAYER:
It is most humbly prayed that this Hon'ble Court be pleased to:
(a) Pass a PROTECTION ORDER under Section 18 directing the Respondents to stop committing acts of domestic violence against the Complainant;
(b) Pass a RESIDENCE ORDER under Section 19 directing the Respondents not to dispossess the Complainant from the shared household / direct the Respondents to secure alternate accommodation for the Complainant;
(c) Pass a MONETARY RELIEF ORDER under Section 20 directing Respondent No. 1 to pay Rs. [AMOUNT]/- per month as maintenance and Rs. [AMOUNT]/- towards medical expenses;
(d) Pass a CUSTODY ORDER under Section 21 granting interim custody of the minor child/children to the Complainant;
(e) Pass a COMPENSATION ORDER under Section 22 directing the Respondents to pay compensation and damages of Rs. [COMPENSATION_AMOUNT]/- for the injuries and mental torture caused;
(f) Pass such other orders as this Court may deem fit to protect the Complainant.

Verified and filed through:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY] | Tel: [LAWYER_PHONE]

Complainant: ________________________
[CLIENT_NAME]`,
  },

  {
    id: 'protection-order',
    name: 'Protection Order Application',
    category: 'family',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE COURT OF THE JUDICIAL MAGISTRATE FIRST CLASS, [CITY]

Application No. _______ of [YEAR]
(Under Section 18 of the Protection of Women from Domestic Violence Act, 2005)

IN THE MATTER OF:

[CLIENT_NAME], aged [CLIENT_AGE] years,
residing at [CLIENT_ADDRESS]                          ... AGGRIEVED PERSON

VERSUS

[RESPONDENT_NAME], aged [RESPONDENT_AGE] years,
residing at [RESPONDENT_ADDRESS]                      ... RESPONDENT

APPLICATION FOR PROTECTION ORDER UNDER SECTION 18 OF THE PWDVA, 2005

MOST RESPECTFULLY SHOWETH:

1. That the Applicant is the [wife/daughter/sister] of the Respondent. The Applicant has been subjected to domestic violence as defined under Section 3 of the Protection of Women from Domestic Violence Act, 2005 (PWDVA), at the hands of the Respondent.

2. DOMESTIC VIOLENCE INCIDENTS:
   (a) On [INCIDENT_DATE_1], the Respondent [DESCRIPTION OF VIOLENCE — e.g., "physically assaulted the Applicant causing injuries to her arms and face. The Applicant received medical treatment at [HOSPITAL_NAME]"].
   (b) On [INCIDENT_DATE_2], the Respondent [DESCRIPTION].
   (c) The Respondent has been making repeated threats to harm the Applicant, stating [SPECIFIC THREATS].

3. That the Applicant is in genuine and immediate apprehension of further violence at the hands of the Respondent and requires urgent protection.

4. That the Domestic Incident Report has been filed with / the Protection Officer at [PO_ADDRESS] has been informed of the incidents.

5. URGENCY: The Respondent has recently [ESCALATION — e.g., "threatened the Applicant with a weapon / visited the Applicant's current place of residence and created a disturbance"], making the situation urgent. An ex parte order is required to protect the Applicant from imminent harm.

6. That the reliefs sought herein are necessary for the protection of the life, limb, and liberty of the Applicant.

PRAYER:
It is most humbly prayed that this Hon'ble Court be pleased to:
(a) Pass an ex parte interim Protection Order under Section 18 of the PWDVA directing the Respondent to:
    (i) Immediately cease and desist from committing any act of domestic violence against the Applicant;
    (ii) Not enter the Applicant's place of residence at [ADDRESS];
    (iii) Not contact the Applicant by phone, messaging, email, or through third parties;
    (iv) Not alienate any property/assets of the Applicant;
(b) On notice, make the Protection Order absolute during the pendency of the proceedings;
(c) Direct the Respondent to pay compensation to the Applicant under Section 22 of the PWDVA;
(d) Pass such other orders as this Court may deem fit and proper for the safety of the Applicant.

Applicant: ________________________
[CLIENT_NAME]

Filed through:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY] | Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'adoption-petition',
    name: 'Adoption Petition',
    category: 'family',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE COURT OF THE DISTRICT JUDGE / FAMILY COURT, [CITY]

Adoption Petition No. _______ of [YEAR]
(Under the Hindu Adoptions and Maintenance Act, 1956 / Juvenile Justice (Care and Protection of Children) Act, 2015)

IN THE MATTER OF:

[CLIENT_NAME]                                         ... PETITIONER/ADOPTIVE PARENT
son/daughter of [FATHER_NAME], aged [CLIENT_AGE] years,
residing at [CLIENT_ADDRESS]

AND

[SPOUSE_NAME] (if joint adoption)                     ... PETITIONER NO. 2
aged [SPOUSE_AGE] years, residing at [CLIENT_ADDRESS]

PETITION FOR ADOPTION OF A MINOR CHILD

MOST RESPECTFULLY SHOWETH:

1. That the Petitioner(s) are Hindus / Christians / [RELIGION] and are governed by the Hindu Adoptions and Maintenance Act, 1956 / the personal law applicable to them.

2. MARITAL STATUS OF PETITIONERS: The Petitioners are legally married to each other since [MARRIAGE_DATE]. [If single: "The Petitioner is unmarried / a widower / a widow."]

3. CHILD PROPOSED TO BE ADOPTED: The Petitioners propose to adopt [CHILD_NAME], a [male/female] child born on [CHILD_DOB], aged [CHILD_AGE] years. [CHILD_ORIGIN — e.g., "The child is the biological child of [BIOLOGICAL_PARENT] who has given consent for adoption / The child is an orphan/abandoned child registered with [CHILD CARE INSTITUTION NAME] under the Juvenile Justice Act."]

4. CAPACITY OF PETITIONERS: The Petitioners satisfy all the conditions prescribed under Section 7/8/10 of the Hindu Adoptions and Maintenance Act, 1956:
   (a) The Petitioners are of sound mind and are not minors;
   (b) The male Petitioner is above 21 years of age and female Petitioner is above 18 years;
   (c) [If adopting a male child:] The Petitioners do not have a living Hindu son, grandson, or great-grandson;
   (d) [If adopting a female child:] The Petitioners do not have a living Hindu daughter or granddaughter.

5. CONSENT: [Biological parent/guardian] has given valid consent to the adoption of the child as required under Section 9 of the HAMA, 1956. The consent document is annexed as Annexure P-[__].

6. FINANCIAL CAPACITY: The Petitioners have sufficient financial means to provide for the care, education, and welfare of the child. The combined monthly income of the Petitioners is Rs. [INCOME]/-. The Petitioners own [HOUSE/PROPERTY] and have stable employment.

7. HOME STUDY REPORT: A Home Study Report conducted by [CWWA/DISTRICT CHILD PROTECTION UNIT] dated [DATE] confirms that the Petitioners are fit and proper persons to adopt.

8. WELFARE OF CHILD: Adoption is in the best interest of the minor child and will give the child a stable, loving home environment.

PRAYER:
It is most humbly prayed that this Hon'ble Court be pleased to:
(a) Permit and declare the adoption of [CHILD_NAME] by the Petitioners;
(b) Direct that [CHILD_NAME] shall henceforth be the adopted child of the Petitioners with all legal rights;
(c) Direct the Registration Authority to issue a revised Birth Certificate in the name of [ADOPTED_CHILD_NEW_NAME] showing the Petitioners as parents;
(d) Pass such other orders as this Court may deem fit.

Petitioners:
[CLIENT_NAME]                      [SPOUSE_NAME]

Filed through:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]`,
  },

  {
    id: 'guardianship-application',
    name: 'Guardianship Application',
    category: 'family',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE COURT OF THE DISTRICT JUDGE / FAMILY COURT, [CITY]

Guardianship Petition No. _______ of [YEAR]
(Under Sections 7, 8, 9 and 25 of the Guardians and Wards Act, 1890 / Section 6 of the Hindu Minority and Guardianship Act, 1956)

IN THE MATTER OF:

[CLIENT_NAME]                                         ... PETITIONER
son/daughter of [FATHER_NAME], aged [CLIENT_AGE] years,
residing at [CLIENT_ADDRESS]

FOR THE APPOINTMENT AS GUARDIAN OF THE MINOR: [MINOR_NAME]
born on [MINOR_DOB], aged [MINOR_AGE] years,
son/daughter of [MINOR_FATHER_NAME]

PETITION FOR APPOINTMENT OF GUARDIAN

MOST RESPECTFULLY SHOWETH:

1. That the minor [MINOR_NAME] is a [male/female] child aged [MINOR_AGE] years, born on [MINOR_DOB] to [PARENTS_NAMES].

2. CIRCUMSTANCES REQUIRING GUARDIANSHIP: [Select applicable:]
   (a) The father/mother of the minor, [NAME], died on [DATE_OF_DEATH] leaving the minor without a natural guardian;
   (b) The natural guardian is [incapable of performing the duties of a guardian / has been declared legally incompetent / is of unsound mind];
   (c) The minor has no guardian and is in need of one.

3. RELATIONSHIP OF PETITIONER: The Petitioner is the [maternal uncle/aunt / paternal grandparent / elder sibling / other relative] of the minor and has been caring for the minor since [DATE].

4. WELFARE OF MINOR: The Petitioner is fully capable and willing to act as guardian of the minor. The Petitioner is:
   (a) Financially stable with a monthly income of Rs. [INCOME]/-;
   (b) Of sound mind and good moral character;
   (c) Deeply attached to the minor and genuinely concerned with the minor's welfare.

5. PROPERTY OF MINOR: The minor has the following property: [MINOR'S PROPERTY — inheritance / insurance proceeds / bank account / immovable property at [ADDRESS]].

6. That appointment of the Petitioner as guardian is necessary for the protection of the minor's person and property, and for ensuring the minor's education and welfare.

7. That this petition is filed in the best interest of the minor and is not opposed by any other interested party.

PRAYER:
It is most humbly prayed that this Hon'ble Court be pleased to:
(a) Appoint [CLIENT_NAME] as the Guardian of the person and/or property of the minor [MINOR_NAME] under the Guardians and Wards Act, 1890;
(b) Direct the Petitioner to render accounts of the minor's property as this Court may direct;
(c) Pass such other orders as this Court may deem fit and proper in the interest of the minor.

Petitioner: ________________________
[CLIENT_NAME]

Filed through:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY] | Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'succession-certificate',
    name: 'Succession Certificate Application',
    category: 'family',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE COURT OF THE DISTRICT JUDGE / CIVIL JUDGE (SENIOR DIVISION), [CITY]

Succession Certificate Petition No. _______ of [YEAR]
(Under Sections 370–390 of the Indian Succession Act, 1925)

IN THE MATTER OF:

[CLIENT_NAME]                                         ... PETITIONER
son/daughter of late [DECEASED_NAME],
aged [CLIENT_AGE] years, residing at [CLIENT_ADDRESS]

PETITION FOR GRANT OF SUCCESSION CERTIFICATE

MOST RESPECTFULLY SHOWETH:

1. That [DECEASED_NAME], son/daughter of [DECEASED_FATHER_NAME], aged [DECEASED_AGE] years, residing at [DECEASED_ADDRESS] (hereinafter "the Deceased") died on [DATE_OF_DEATH] at [PLACE_OF_DEATH] intestate, i.e., without leaving a Will.

2. That the Deceased left behind the following legal heirs:
   (a) [CLIENT_NAME] (son/daughter) — Petitioner;
   (b) [HEIR_2_NAME] (son/daughter/spouse);
   (c) [HEIR_3_NAME] (if applicable).
   [Other heirs have given their No Objection / consent for grant of succession certificate to the Petitioner, which is annexed hereto.]

3. ASSETS OF DECEASED: The Deceased left behind the following movable debts and securities:
   (a) Bank Account No. [ACCOUNT_NO.] with [BANK_NAME], [BRANCH], standing in the name of the Deceased with a balance of approximately Rs. [BALANCE]/-;
   (b) Fixed Deposit(s) bearing receipt no. [FD_NO.] for Rs. [FD_AMOUNT]/- with [BANK_NAME];
   (c) [SHARES/BONDS/OTHER SECURITIES];
   (d) Insurance policy bearing No. [POLICY_NO.] for Rs. [SUM_ASSURED]/-;
   (e) [OTHER ASSETS].

4. That no petition for probate, letters of administration, or succession certificate has been filed in this Court or any other Court in relation to the estate of the Deceased.

5. That the Petitioner intends to collect/receive the above-mentioned debts and securities belonging to the estate of the Deceased and for that purpose requires a Succession Certificate from this Hon'ble Court.

6. That this Court has jurisdiction to grant the Succession Certificate as [the Deceased resided / the assets are located] within the jurisdiction of this Court at the time of death.

7. That the required court fee has been paid / shall be paid as determined by this Court.

PRAYER:
It is most humbly prayed that this Hon'ble Court be pleased to:
(a) Grant a Succession Certificate in favour of the Petitioner under Section 370 of the Indian Succession Act, 1925, empowering the Petitioner to receive, collect, and realise the debts and securities described above;
(b) Pass such other order as this Court may deem fit and proper.

VERIFICATION:
I, [CLIENT_NAME], the Petitioner, verify that the contents of this petition are true to my knowledge and belief.

Verified at [CITY] on [DATE].

Petitioner: ________________________
[CLIENT_NAME]

Filed through:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]`,
  },

  {
    id: 'probate-application',
    name: 'Probate Application',
    category: 'family',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE COURT OF THE DISTRICT JUDGE / HIGH COURT, [CITY]

Testamentary Case / Probate Petition No. _______ of [YEAR]
(Under Sections 276–283 of the Indian Succession Act, 1925)

IN THE MATTER OF THE ESTATE OF: Late [DECEASED_NAME]

AND IN THE MATTER OF:

[CLIENT_NAME]                                         ... PETITIONER/EXECUTOR
son/daughter of late [DECEASED_NAME],
aged [CLIENT_AGE] years, residing at [CLIENT_ADDRESS]

PETITION FOR GRANT OF PROBATE

MOST RESPECTFULLY SHOWETH:

1. That [DECEASED_NAME], son/daughter of [DECEASED_FATHER_NAME], residing at [DECEASED_ADDRESS], died on [DATE_OF_DEATH] at [PLACE_OF_DEATH].

2. That the Deceased, during his/her lifetime, duly executed a Last Will and Testament on [WILL_DATE] at [WILL_EXECUTION_PLACE], which has been signed by the Testator and attested by two witnesses as required under Section 63 of the Indian Succession Act, 1925. A true copy of the Will is annexed hereto as Annexure P-1.

3. That by the said Will, the Deceased has bequeathed his/her estate as follows:
   (a) [BEQUEST_1 — e.g., "the property at [ADDRESS] to [BENEFICIARY]"];
   (b) [BEQUEST_2];
   (c) [BEQUEST_3].

4. That the Deceased appointed the Petitioner as the Executor of the said Will.

5. HEIRS / INTERESTED PARTIES: The following persons are the legal heirs of the Deceased:
   (a) [HEIR_1_NAME], [RELATIONSHIP];
   (b) [HEIR_2_NAME], [RELATIONSHIP].

6. ESTATE OF DECEASED: The estate of the Deceased consists of:
   (a) Immovable property: [PROPERTY DETAILS];
   (b) Movable property / Bank accounts: [DETAILS];
   (c) Total estimated value: Rs. [ESTATE_VALUE]/-.

7. That no other Will of the Deceased is known to exist.

8. That no previous petition for probate has been filed in any Court in respect of the Will of the Deceased.

9. That the Petitioner undertakes to administer the estate of the Deceased in accordance with law.

PRAYER:
It is most humbly prayed that this Hon'ble Court be pleased to:
(a) Grant Probate of the Last Will and Testament dated [WILL_DATE] of the late [DECEASED_NAME] in favour of the Petitioner;
(b) Direct that the Petitioner be at liberty to administer the estate of the Deceased in accordance with the said Will;
(c) Pass such other orders as this Court may deem fit and proper.

VERIFICATION:
I, [CLIENT_NAME], the Petitioner, verify that the contents of this petition are true to my knowledge and belief.

Verified at [CITY] on [DATE].

Petitioner: ________________________
[CLIENT_NAME]

Filed through:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]`,
  },

  // ── CONSUMER & CONSTITUTIONAL ─────────────────────────────────────────────

  {
    id: 'consumer-forum-complaint',
    name: 'Consumer Forum Complaint',
    category: 'constitutional',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

BEFORE THE [DISTRICT / STATE / NATIONAL] CONSUMER DISPUTES REDRESSAL COMMISSION, [CITY/STATE]

Consumer Complaint No. _______ of [YEAR]
(Under Section 35 of the Consumer Protection Act, 2019)

IN THE MATTER OF:

[CLIENT_NAME], son/daughter of [FATHER_NAME],
aged [CLIENT_AGE] years, [CLIENT_OCCUPATION],
residing at [CLIENT_ADDRESS]                          ... COMPLAINANT

VERSUS

1. [OPPOSITE_PARTY_1_NAME]
   [DESIGNATION], [COMPANY_NAME]
   [OP_1_ADDRESS]                                     ... OPPOSITE PARTY NO. 1

2. [OPPOSITE_PARTY_2_NAME] (if any)
   [OP_2_ADDRESS]                                     ... OPPOSITE PARTY NO. 2

CONSUMER COMPLAINT UNDER SECTION 35 OF THE CONSUMER PROTECTION ACT, 2019

MOST RESPECTFULLY SHOWETH:

1. JURISDICTION: The Complainant is a "consumer" within the meaning of Section 2(7) of the Consumer Protection Act, 2019. The value of goods/services in dispute is Rs. [DISPUTE_VALUE]/-, which is within the pecuniary jurisdiction of this Commission.

2. PURCHASE/SERVICE TRANSACTION: The Complainant purchased [GOODS/SERVICES DESCRIPTION] from the Opposite Party on [PURCHASE_DATE] vide Invoice / Order No. [INVOICE_NO.] for a total consideration of Rs. [AMOUNT]/-. The Complainant paid the said amount by [PAYMENT_MODE]. A copy of the invoice/receipt is annexed as Annexure C-1.

3. DEFICIENCY IN SERVICE / DEFECTIVE GOODS: After purchase, the following deficiencies were noticed:
   (a) [DEFICIENCY/DEFECT 1 — with specific details and date discovered];
   (b) [DEFICIENCY/DEFECT 2];
   (c) [DEFICIENCY/DEFECT 3 — e.g., "The product stopped functioning within [PERIOD] of purchase" / "The service was not rendered as promised" / "The Opposite Party refused to honour the warranty"].

4. COMPLAINT TO OPPOSITE PARTY: The Complainant lodged a complaint with the Opposite Party on [COMPLAINT_DATE] vide Complaint Reference No. [REF.NO.]. Despite follow-ups, the Opposite Party has failed to rectify the defect / render proper service / issue refund.

5. LEGAL NOTICE: A legal notice dated [NOTICE_DATE] was sent to the Opposite Party, who failed to respond / responded inadequately.

6. CAUSE OF ACTION: The cause of action arose on [DATE] and is continuing. The complaint is filed within two years of the cause of action as required under Section 69 of the Consumer Protection Act, 2019.

7. RELIEF CLAIMED: The Complainant is entitled to the following reliefs:
   (a) Refund of Rs. [AMOUNT]/- paid by the Complainant;
   (b) Compensation of Rs. [COMPENSATION]/- for mental agony, harassment, and loss;
   (c) Litigation costs of Rs. [LITIGATION_COST]/-;
   (d) [OTHER SPECIFIC RELIEF — repair / replacement / service completion].

PRAYER:
It is most humbly prayed that this Hon'ble Commission be pleased to:
(a) Admit this complaint and issue notice to the Opposite Parties;
(b) Direct the Opposite Parties to refund Rs. [AMOUNT]/- to the Complainant;
(c) Award compensation of Rs. [COMPENSATION]/- for mental agony and harassment;
(d) Award litigation costs of Rs. [COST]/-;
(e) Pass such other order as this Commission may deem fit.

VERIFICATION:
I, [CLIENT_NAME], the Complainant, verify that the contents of this complaint are true and correct.

Verified at [CITY] on [DATE].

Complainant: ________________________
[CLIENT_NAME]

Filed through:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY] | Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'rera-complaint',
    name: 'RERA Complaint',
    category: 'constitutional',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

BEFORE THE REAL ESTATE REGULATORY AUTHORITY ([STATE] RERA), [CITY]

Complaint No. _______ of [YEAR]
(Under Section 31 of the Real Estate (Regulation and Development) Act, 2016)

IN THE MATTER OF:

[CLIENT_NAME], son/daughter of [FATHER_NAME],
residing at [CLIENT_ADDRESS]                          ... COMPLAINANT/ALLOTTEE

VERSUS

[PROMOTER/DEVELOPER_NAME]
[COMPANY_NAME / FIRM_NAME]
[REGISTERED_OFFICE_ADDRESS]
RERA Registration No. of Project: [RERA_REG_NO.]    ... RESPONDENT/PROMOTER

COMPLAINT UNDER SECTION 31 OF THE REAL ESTATE (REGULATION AND DEVELOPMENT) ACT, 2016

MOST RESPECTFULLY SHOWETH:

1. That the Complainant is an allottee under Section 2(d) of the RERA, 2016, having entered into an Agreement for Sale / Allotment Letter dated [AGREEMENT_DATE] with the Respondent/Promoter for purchase of [FLAT/VILLA/PLOT] bearing Unit No. [UNIT_NO.], [TOWER/BLOCK], in project "[PROJECT_NAME]" registered under RERA vide Registration No. [RERA_REG_NO.], situated at [PROJECT_ADDRESS].

2. CONSIDERATION PAID: The total sale consideration agreed was Rs. [TOTAL_AMOUNT]/-, of which the Complainant has paid Rs. [PAID_AMOUNT]/- as detailed in Annexure C-1.

3. PROMISED POSSESSION DATE: As per the Agreement for Sale, the Respondent was required to deliver possession of the unit by [POSSESSION_DATE].

4. GRIEVANCES:
   (a) DELAY IN POSSESSION: The Respondent has failed to deliver possession of the unit on the agreed date. The delay is [NUMBER] months/years as on date. The Respondent has not offered any valid explanation for such delay.
   (b) STRUCTURAL DEFECTS: The unit delivered/under construction has the following defects: [DEFECT DETAILS].
   (c) DEVIATION FROM SPECIFICATIONS: The Respondent has deviated from the sanctioned plans and specifications without the Complainant's consent, in violation of Section 14 of the RERA.
   (d) ILLEGAL CHARGES: The Respondent has demanded Rs. [AMOUNT]/- as [charges not agreed upon] in violation of Section 13 of the RERA.
   (e) NON-DISCLOSURE: The Respondent has not disclosed [information required under Section 4 of RERA].

5. LEGAL NOTICE: A legal notice dated [NOTICE_DATE] was sent to the Respondent, who has not complied.

6. RELIEFS:
   (a) Under Section 18 of the RERA, the Complainant is entitled to withdraw from the project and claim full refund with interest at [RERA_RATE]% p.a.;
   (b) Alternatively, the Complainant claims delay compensation at the applicable rate till actual possession.

PRAYER:
It is most humbly prayed that this Hon'ble Authority be pleased to:
(a) Direct the Respondent to refund the amount of Rs. [PAID_AMOUNT]/- with interest at the prescribed rate under RERA from the respective dates of payment; OR
(b) Direct the Respondent to complete construction and deliver possession of Unit No. [UNIT_NO.] forthwith along with delay compensation;
(c) Direct the Respondent to pay compensation for deficiency in service and mental agony;
(d) Impose penalty on the Respondent under Section 63 of the RERA;
(e) Pass such other order as this Authority may deem fit.

Complainant: ________________________
[CLIENT_NAME]

Filed through:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY] | Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'rti-application',
    name: 'RTI Application',
    category: 'constitutional',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

APPLICATION UNDER SECTION 6(1) OF THE RIGHT TO INFORMATION ACT, 2005

To,
The Public Information Officer (PIO),
[DEPARTMENT/MINISTRY NAME],
[PUBLIC_AUTHORITY_ADDRESS]

Subject: Application under Section 6 of the RTI Act, 2005 seeking information regarding [SUBJECT_MATTER]

Sir/Madam,

I, [CLIENT_NAME], son/daughter of [FATHER_NAME], aged [CLIENT_AGE] years, residing at [CLIENT_ADDRESS], a citizen of India, hereby submit this application under Section 6(1) of the Right to Information Act, 2005, and request the following information:

INFORMATION SOUGHT:

1. [QUERY_1 — e.g., "Please provide certified copies of all files, noting sheets, orders, and correspondence relating to [SUBJECT] bearing file no. [FILE_NO.] for the period [FROM_DATE] to [TO_DATE]."]

2. [QUERY_2 — e.g., "Please provide details of the action taken on complaint/application dated [DATE] submitted by [NAME] bearing reference no. [REF_NO.]."]

3. [QUERY_3 — e.g., "Please provide a copy of the status report / inspection report / survey report pertaining to [PROPERTY/MATTER]."]

4. [QUERY_4 — e.g., "Please disclose the names and designations of officials who processed the above file."]

5. [QUERY_5 — specify additional information needed].

REASON FOR SEEKING INFORMATION:
The information is required in connection with [BRIEF REASON — e.g., "a legal matter / for my personal record / to ascertain the status of my application / to verify official records"].

PERIOD COVERED: [FROM_DATE] to [TO_DATE] / as available.

APPLICATION FEE:
The prescribed application fee of Rs. 10/- (Rupees Ten only) is enclosed herewith [by Indian Postal Order / Court Fee Stamp / Online Payment Reference No. [PAYMENT_REF.]].

BPL STATUS: [If applicable: "I am a Below Poverty Line (BPL) card holder bearing BPL Card No. [BPL_CARD_NO.] and am exempt from payment of fees under Rule 4(2) of the RTI (Fee and Cost) Rules, 2005."]

ADDRESS FOR COMMUNICATION:
[CLIENT_NAME]
[CLIENT_ADDRESS]
Mobile: [CLIENT_PHONE]
Email: [CLIENT_EMAIL]

I request that the information be provided within the statutory period of 30 days as prescribed under Section 7(1) of the RTI Act, 2005.

Yours faithfully,

[CLIENT_NAME]
Date: [DATE]

Submitted on behalf of Applicant by:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY] | Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'pil-draft',
    name: 'PIL Draft (High Court)',
    category: 'constitutional',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE HON'BLE HIGH COURT OF [STATE] AT [CITY]

Writ Petition (Public Interest Litigation) No. _______ of [YEAR]
(Under Article 226 of the Constitution of India)

IN THE MATTER OF:

[CLIENT_NAME / ORGANISATION_NAME]
son/daughter of [FATHER_NAME], aged [CLIENT_AGE] years,
residing at / registered at [CLIENT_ADDRESS]          ... PETITIONER (in PIL)

VERSUS

1. State of [STATE], through its Chief Secretary              ... RESPONDENT NO. 1
2. [CONCERNED DEPARTMENT/MINISTRY], through its Secretary     ... RESPONDENT NO. 2
3. [OTHER AUTHORITY/BODY]                                     ... RESPONDENT NO. 3

PUBLIC INTEREST LITIGATION UNDER ARTICLE 226 OF THE CONSTITUTION OF INDIA

MOST RESPECTFULLY SHOWETH:

1. LOCUS STANDI: The Petitioner is a public-spirited citizen / a registered NGO / an advocate who has filed this Public Interest Litigation in good faith for the benefit of the public at large and not for any personal gain. The Petitioner has no personal interest in the outcome of this petition.

2. SUBJECT MATTER: This PIL raises issues of grave public importance concerning [BRIEF DESCRIPTION OF ISSUE — e.g., "the failure of the State Government to provide safe drinking water to residents of [AREA]" / "illegal dumping of industrial effluents causing environmental degradation and public health hazard"].

3. FACTS:
   (a) [FACTUAL BACKGROUND — describe the issue with specifics: location, people affected, nature of violation];
   (b) The Respondents are the authorities responsible for [ACTION/INACTION];
   (c) The Petitioner became aware of the issue on [DATE] through [SOURCE — field visit / news report / affidavit of affected persons];
   (d) On [DATE], the Petitioner submitted a representation to [AUTHORITY] seeking remedial action, but no action has been taken till date.

4. GROUNDS:
   (a) That the inaction / action of the Respondents violates the Petitioner's / public's Fundamental Rights under Article [14/19/21] of the Constitution of India;
   (b) That the right to life guaranteed under Article 21 includes [clean environment / health / dignity / livelihood];
   (c) That the Respondents are under a constitutional and statutory obligation to [SPECIFIC DUTY];
   (d) That the Supreme Court has held in [RELEVANT CASE — e.g., M.C. Mehta v. Union of India] that [RELEVANT PRINCIPLE];
   (e) That the inaction of the Respondents amounts to dereliction of constitutional duty.

5. URGENCY: The situation is urgent and continued inaction will cause irreparable harm to [NUMBER] citizens / the environment / public health.

PRAYER:
It is most humbly prayed that this Hon'ble Court be pleased to:
(a) Issue Rule Nisi calling upon the Respondents to show cause why the reliefs sought herein should not be granted;
(b) Issue a writ of mandamus / directions directing the Respondents to [SPECIFIC ACTION];
(c) Constitute a Committee to [INSPECT / MONITOR / IMPLEMENT];
(d) Direct the Respondents to submit a compliance report within [PERIOD];
(e) Pass such other orders as this Hon'ble Court may deem fit and proper.

Respectfully submitted,

[LAWYER_NAME]
Advocate for Petitioner
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY] | Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'writ-habeas-corpus',
    name: 'Writ Petition — Habeas Corpus',
    category: 'constitutional',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE HON'BLE HIGH COURT OF [STATE] AT [CITY]

Writ Petition (Criminal) No. _______ of [YEAR]
(Under Article 226 of the Constitution of India)

IN THE MATTER OF:

[CLIENT_NAME], son/daughter of [FATHER_NAME],
residing at [CLIENT_ADDRESS]                          ... PETITIONER

VERSUS

1. State of [STATE], through the Principal Secretary (Home)   ... RESPONDENT NO. 1
2. Superintendent, [JAIL/DETENTION_CENTER_NAME], [CITY]       ... RESPONDENT NO. 2
3. [DETAINING AUTHORITY, if any]                              ... RESPONDENT NO. 3

WRIT PETITION UNDER ARTICLE 226 OF THE CONSTITUTION OF INDIA FOR ISSUANCE OF A WRIT OF HABEAS CORPUS OR ANY OTHER APPROPRIATE WRIT, ORDER, OR DIRECTION

MOST RESPECTFULLY SHOWETH:

1. That the Petitioner is the [father/mother/spouse/relative] of [DETAINEE_NAME], son/daughter of [FATHER_NAME], aged [DETAINEE_AGE] years, residing at [DETAINEE_ADDRESS].

2. DETENTION: [DETAINEE_NAME] has been [arrested / detained] by [AUTHORITY_NAME] on [DATE_OF_ARREST] and is currently lodged at [JAIL/DETENTION CENTER] without / in excess of legal authority.

3. ILLEGAL DETENTION: The detention of [DETAINEE_NAME] is illegal and without any lawful basis for the following reasons:
   (a) [DETAINEE_NAME] was arrested without any valid warrant / FIR / legal basis;
   (b) The mandatory procedure under Sections 50, 57 of the CrPC has not been followed;
   (c) The Detainee has not been produced before a Magistrate within 24 hours of arrest as mandated by Article 22(2) of the Constitution and Section 57 CrPC;
   (d) The grounds of detention are vague, not communicated, and violate Article 22(5) of the Constitution;
   (e) [OTHER GROUNDS — e.g., "The period of remand has expired and the Detainee is still in custody without lawful authority"].

4. That the Petitioner has made inquiries about the whereabouts and custody of [DETAINEE_NAME] but the Respondents have not cooperated.

5. That the illegal detention violates the fundamental rights of [DETAINEE_NAME] under Articles 14, 21, and 22 of the Constitution of India.

PRAYER:
It is most humbly prayed that this Hon'ble Court be pleased to:
(a) Issue a Writ of Habeas Corpus or any other appropriate writ, order, or direction;
(b) Direct the Respondents to produce the body of [DETAINEE_NAME] before this Court forthwith;
(c) Enquire into the cause of detention and set [DETAINEE_NAME] at liberty if the detention is found to be unlawful;
(d) Pass interim directions for the release of [DETAINEE_NAME] pending final hearing;
(e) Pass such other orders as this Court may deem fit.

Respectfully submitted,

[LAWYER_NAME]
Advocate for Petitioner
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY] | Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'writ-mandamus',
    name: 'Writ Petition — Mandamus',
    category: 'constitutional',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE HON'BLE HIGH COURT OF [STATE] AT [CITY]

Writ Petition (Civil) No. _______ of [YEAR]
(Under Article 226 of the Constitution of India)

IN THE MATTER OF:

[CLIENT_NAME], son/daughter of [FATHER_NAME],
aged [CLIENT_AGE] years, [CLIENT_OCCUPATION],
residing at [CLIENT_ADDRESS]                          ... PETITIONER

VERSUS

1. [RESPONDENT_AUTHORITY_NAME] through its [DESIGNATION]      ... RESPONDENT NO. 1
   [AUTHORITY_ADDRESS]
2. [STATE GOVERNMENT / UNION OF INDIA] through [SECRETARY]    ... RESPONDENT NO. 2

WRIT PETITION UNDER ARTICLE 226 OF THE CONSTITUTION OF INDIA SEEKING ISSUANCE OF A WRIT OF MANDAMUS

MOST RESPECTFULLY SHOWETH:

1. BACKGROUND: The Petitioner [BACKGROUND — e.g., "applied for [LICENCE/BENEFIT/APPOINTMENT/SERVICE] on [DATE] under [SCHEME/ACT]"].

2. ENTITLEMENT: The Petitioner is legally entitled to [SPECIFIC ENTITLEMENT] by virtue of [STATUTORY PROVISION / ORDER / POLICY / JUDGMENT].

3. REPRESENTATION: The Petitioner submitted a representation / application to the Respondent(s) on [DATE], supported by all required documents. A copy is annexed as Annexure P-1.

4. INACTION / REFUSAL: Despite the Petitioner's undisputed entitlement and the statutory obligation of the Respondent(s):
   (a) The Respondent(s) have neither acted upon nor rejected the Petitioner's application;
   (b) [Number] months have elapsed without any response, in violation of [APPLICABLE TIME LIMIT UNDER ACT / RULES];
   (c) [If rejected:] The Respondent wrongly rejected the application vide order dated [ORDER_DATE] on untenable grounds, namely [REJECTION GROUNDS], which are contrary to law.

5. LEGAL OBLIGATION: The Respondent(s) are under a clear legal duty to [SPECIFIC ACT] under [SECTION/RULE of APPLICABLE ACT]. The Petitioner has a corresponding legal right to compel performance of this duty.

6. GROUNDS:
   (a) The impugned inaction/order is arbitrary, unreasonable, and violates Article 14 of the Constitution;
   (b) The Petitioner's right to livelihood / property / service under Article 21 / 19 is being violated;
   (c) The Respondent has no valid ground to [refuse/delay];
   (d) The action/inaction is contrary to [STATUTE/POLICY/BINDING PRECEDENT].

PRAYER:
It is most humbly prayed that this Hon'ble Court be pleased to:
(a) Issue Rule Nisi calling upon the Respondents to show cause;
(b) Issue a Writ of Mandamus or any other appropriate writ directing the Respondents to [SPECIFIC DIRECTION — e.g., "forthwith grant/process/release/issue [LICENCE/ORDER/AMOUNT]"];
(c) Stay the impugned order / direct the Respondent to maintain status quo pending disposal;
(d) Pass such other orders as this Court may deem fit.

Respectfully submitted,

[LAWYER_NAME]
Advocate for Petitioner
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY] | Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'writ-certiorari',
    name: 'Writ Petition — Certiorari',
    category: 'constitutional',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE HON'BLE HIGH COURT OF [STATE] AT [CITY]

Writ Petition (Civil/Criminal) No. _______ of [YEAR]
(Under Article 226 of the Constitution of India)

IN THE MATTER OF:

[CLIENT_NAME], son/daughter of [FATHER_NAME],
residing at [CLIENT_ADDRESS]                          ... PETITIONER

VERSUS

1. [INFERIOR TRIBUNAL/AUTHORITY_NAME] through its [DESIGNATION]  ... RESPONDENT NO. 1
2. [STATE GOVERNMENT] through [SECRETARY]                        ... RESPONDENT NO. 2
3. [OPPOSITE PARTY IN LOWER PROCEEDINGS]                         ... RESPONDENT NO. 3

WRIT PETITION UNDER ARTICLE 226 OF THE CONSTITUTION OF INDIA FOR ISSUANCE OF A WRIT OF CERTIORARI

MOST RESPECTFULLY SHOWETH:

1. That the Petitioner challenges the Order / Award / Decision dated [IMPUGNED_ORDER_DATE] passed by the Respondent No. 1 / [TRIBUNAL/AUTHORITY] in [CASE/REFERENCE NO.], whereby [BRIEFLY DESCRIBE THE IMPUGNED ORDER/DECISION].

2. FACTS: [BRIEF BACKGROUND AND PROCEEDINGS BEFORE THE INFERIOR TRIBUNAL].

3. GROUNDS FOR CERTIORARI:
   (a) EXCESS OF JURISDICTION: The Respondent No. 1 exceeded its jurisdiction in [passing the impugned order / entertaining the complaint / making the award] as [EXPLAIN].
   (b) LACK OF JURISDICTION: The Respondent No. 1 had no jurisdiction to [ACT] as [LEGAL REASON].
   (c) ERROR OF LAW APPARENT ON FACE OF RECORD: The impugned order contains patent errors of law, namely [SPECIFY LEGAL ERROR].
   (d) VIOLATION OF PRINCIPLES OF NATURAL JUSTICE: The Petitioner was not given a proper opportunity of hearing. [AUDI ALTERAM PARTEM] was violated inasmuch as [DETAILS].
   (e) BIAS / MALA FIDES: The proceedings were vitiated by [BIAS/MALA FIDES of the authority, if applicable].
   (f) PERVERSITY: The findings are perverse and contrary to the evidence on record.

4. That the impugned order has caused grave prejudice to the Petitioner and is liable to be quashed.

PRAYER:
It is most humbly prayed that this Hon'ble Court be pleased to:
(a) Issue a Writ of Certiorari calling for the records of [TRIBUNAL/AUTHORITY] in [CASE NO.] and quash and set aside the impugned Order dated [IMPUGNED_ORDER_DATE];
(b) Stay the operation of the impugned Order pending disposal of this Writ Petition;
(c) Pass such other orders as this Court may deem fit.

Respectfully submitted,

[LAWYER_NAME]
Advocate for Petitioner
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY] | Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'writ-prohibition',
    name: 'Writ Petition — Prohibition',
    category: 'constitutional',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE HON'BLE HIGH COURT OF [STATE] AT [CITY]

Writ Petition No. _______ of [YEAR]
(Under Article 226 of the Constitution of India)

IN THE MATTER OF:

[CLIENT_NAME], son/daughter of [FATHER_NAME],
residing at [CLIENT_ADDRESS]                          ... PETITIONER

VERSUS

1. [TRIBUNAL/AUTHORITY NAME]                                  ... RESPONDENT NO. 1
2. [STATE GOVERNMENT] through [SECRETARY]                     ... RESPONDENT NO. 2

WRIT PETITION UNDER ARTICLE 226 OF THE CONSTITUTION OF INDIA FOR ISSUANCE OF A WRIT OF PROHIBITION

MOST RESPECTFULLY SHOWETH:

1. That proceedings bearing [CASE/REFERENCE NO.] are pending before the Respondent No. 1 / [TRIBUNAL/AUTHORITY] at [PLACE].

2. That the Petitioner is a party to the said proceedings and apprehends that the Respondent No. 1 is about to act / continue to act without or in excess of its jurisdiction.

3. LACK OF JURISDICTION: Respondent No. 1 does not have jurisdiction to entertain / continue the said proceedings / pass the proposed order for the following reasons:
   (a) [JURISDICTIONAL GROUND 1 — e.g., "The subject matter falls within the exclusive jurisdiction of [CIVIL COURT / OTHER AUTHORITY]"];
   (b) [JURISDICTIONAL GROUND 2 — e.g., "The matter is barred by limitation"];
   (c) [JURISDICTIONAL GROUND 3 — e.g., "The Tribunal was constituted after the cause of action arose and has no retrospective jurisdiction"].

4. EXCESS OF JURISDICTION: Even assuming jurisdiction, the Respondent is acting in excess thereof by [SPECIFIC ACT — e.g., "entertaining claims beyond its pecuniary jurisdiction / adjudicating matters not within its subject-matter jurisdiction"].

5. IRREPARABLE HARM: If the Respondent is not prohibited from continuing the proceedings, the Petitioner will suffer irreparable harm and prejudice. The proceedings themselves are an abuse of process.

6. That a Writ of Prohibition is the appropriate remedy as the Respondent is about to exceed its jurisdiction and there is no other adequate remedy available.

PRAYER:
It is most humbly prayed that this Hon'ble Court be pleased to:
(a) Issue Rule Nisi on this Writ Petition;
(b) Issue a Writ of Prohibition or any other appropriate writ, order, or direction, prohibiting the Respondent No. 1 from proceeding further with [CASE/REFERENCE NO.] / from passing any order in the said proceedings;
(c) Stay all proceedings before Respondent No. 1 pending disposal of this Writ Petition;
(d) Pass such other orders as this Court may deem fit.

Respectfully submitted,

[LAWYER_NAME]
Advocate for Petitioner
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY] | Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'writ-quo-warranto',
    name: 'Writ Petition — Quo Warranto',
    category: 'constitutional',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE HON'BLE HIGH COURT OF [STATE] AT [CITY]

Writ Petition No. _______ of [YEAR]
(Under Article 226 of the Constitution of India)

IN THE MATTER OF:

[CLIENT_NAME], son/daughter of [FATHER_NAME],
residing at [CLIENT_ADDRESS]                          ... PETITIONER

VERSUS

1. [PERSON_HOLDING_OFFICE_NAME], [DESIGNATION]                ... RESPONDENT NO. 1
   [RESPONDENT_ADDRESS]
2. [APPOINTING AUTHORITY / STATE GOVERNMENT]                  ... RESPONDENT NO. 2

WRIT PETITION UNDER ARTICLE 226 OF THE CONSTITUTION OF INDIA FOR ISSUANCE OF A WRIT OF QUO WARRANTO

MOST RESPECTFULLY SHOWETH:

1. That Respondent No. 1, [PERSON_NAME], is currently holding the office of [DESIGNATION/POST] in [ORGANISATION/BODY] and is exercising the powers and performing the duties of the said office.

2. DISQUALIFICATION / ILLEGALITY: The appointment of / continued holding of office by Respondent No. 1 is illegal, without authority of law, and without jurisdiction, for the following reasons:

   (a) INELIGIBILITY: Respondent No. 1 does not possess the qualifications prescribed under [ACT/RULE/STATUTE] for holding the said office. Specifically, [QUALIFICATION DEFICIENCY — e.g., "the minimum educational qualification required is [X] but Respondent No. 1 does not possess the same / the age limit prescribed is [X] years but Respondent No. 1 exceeds the same"].

   (b) DISQUALIFICATION: Respondent No. 1 suffers from a statutory disqualification under [SECTION] of [ACT], namely [SPECIFIC DISQUALIFICATION].

   (c) ILLEGAL APPOINTMENT: The appointment of Respondent No. 1 was made in violation of [PROCEDURE / RULES / RESERVATION POLICY] as [DETAILS OF ILLEGALITY].

   (d) CONFLICT OF INTEREST: [If applicable — describe].

3. That the said office is a public office to which a Writ of Quo Warranto lies.

4. That the Petitioner has a sufficient interest in the matter as [REASON — "a citizen directly affected by / a member of the public"].

5. LEGAL BASIS: The Supreme Court in [RELEVANT CASE] has held that a Writ of Quo Warranto lies where a person holds a public office without legal authority.

PRAYER:
It is most humbly prayed that this Hon'ble Court be pleased to:
(a) Issue a Writ of Quo Warranto or any other appropriate writ calling upon Respondent No. 1 to show by what authority he/she holds the office of [DESIGNATION];
(b) Declare the appointment / continued holding of office of Respondent No. 1 as illegal and void;
(c) Direct Respondent No. 1 to vacate the office of [DESIGNATION] forthwith;
(d) Pass such other orders as this Court may deem fit.

Respectfully submitted,

[LAWYER_NAME]
Advocate for Petitioner
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY] | Tel: [LAWYER_PHONE]`,
  },

  // ── CHEQUE BOUNCE / NI ACT ────────────────────────────────────────────────

  {
    id: 'cheque-bounce-notice',
    name: 'Legal Notice — Section 138 NI Act (Cheque Bounce)',
    category: 'ni-act',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

LEGAL NOTICE UNDER SECTION 138 READ WITH SECTION 141 OF THE NEGOTIABLE INSTRUMENTS ACT, 1881

To,
[DRAWER_NAME],
[DRAWER_ADDRESS]

Sent via: Registered Post AD / Speed Post

Under instructions from and on behalf of my client, [CLIENT_NAME], son/daughter of [FATHER_NAME], residing at [CLIENT_ADDRESS], I hereby issue this Statutory Notice under Section 138 of the Negotiable Instruments Act, 1881 as under:

1. That you had issued Cheque No. [CHEQUE_NO.] dated [CHEQUE_DATE] for Rs. [CHEQUE_AMOUNT]/- (Rupees [AMOUNT_IN_WORDS] only) drawn on [BANK_NAME], [BRANCH_NAME], [CITY], Account No. [ACCOUNT_NO.], in favour of my client towards [REASON — e.g., "repayment of loan / in discharge of legally enforceable debt / towards consideration for [TRANSACTION]"].

2. That my client presented the said cheque for encashment through [PRESENTING_BANK_NAME], [BRANCH] on [PRESENTATION_DATE], which was returned unpaid on [DISHONOUR_DATE] with the bank memo stating "[REASON FOR DISHONOUR — e.g., 'Funds Insufficient' / 'Payment Stopped' / 'Account Closed']". A copy of the dishonoured cheque and the bank return memo are enclosed.

3. That by issuing the said cheque in discharge of a legally enforceable liability which was dishonoured on presentation, you have committed an offence under Section 138 of the Negotiable Instruments Act, 1881, which is punishable with imprisonment up to two years or fine up to twice the amount of the cheque, or both.

4. That my client is entitled to initiate criminal proceedings against you under Section 138 of the NI Act.

YOU ARE THEREFORE HEREBY CALLED UPON to pay to my client the sum of Rs. [CHEQUE_AMOUNT]/- (Rupees [AMOUNT_IN_WORDS] only) together with interest at [RATE]% per annum and other charges, within FIFTEEN DAYS of receipt of this Notice.

Please note that this is a statutory notice under Section 138(b) of the Negotiable Instruments Act, 1881, which is a condition precedent to filing a criminal complaint. The 15-day period commences from the date of receipt of this Notice.

If payment is not made within the stipulated period, my client shall be constrained to file a criminal complaint against you under Section 138 of the Negotiable Instruments Act, 1881 before the competent Magistrate, without further notice, entirely at your risk and cost.

Yours truly,

[LAWYER_NAME]
Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Enclosures:
1. Copy of dishonoured cheque
2. Bank return memo dated [DISHONOUR_DATE]`,
  },

  {
    id: 'cheque-bounce-complaint',
    name: 'Criminal Complaint — Section 138 NI Act',
    category: 'ni-act',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE COURT OF THE JUDICIAL MAGISTRATE FIRST CLASS / METROPOLITAN MAGISTRATE, [CITY]

Complaint Case No. _______ of [YEAR]

IN THE MATTER OF:

[CLIENT_NAME], son/daughter of [FATHER_NAME],
aged [CLIENT_AGE] years, [CLIENT_OCCUPATION],
residing at [CLIENT_ADDRESS]                          ... COMPLAINANT

VERSUS

[ACCUSED_NAME], son/daughter of [ACCUSED_FATHER_NAME],
[ACCUSED_OCCUPATION], residing at [ACCUSED_ADDRESS]  ... ACCUSED

COMPLAINT UNDER SECTION 138 OF THE NEGOTIABLE INSTRUMENTS ACT, 1881

MOST RESPECTFULLY SHOWETH:

1. That the Complainant is filing this complaint against the Accused under Section 138 of the Negotiable Instruments Act, 1881 on the following facts:

2. UNDERLYING TRANSACTION: The Accused is liable to pay the Complainant a sum of Rs. [TOTAL_DUE_AMOUNT]/- towards [REASON — e.g., "repayment of friendly loan advanced by the Complainant to the Accused on [LOAN_DATE]" / "consideration for sale of [GOODS/PROPERTY] under Agreement dated [DATE]"].

3. CHEQUE ISSUED: In discharge of the above-mentioned legally enforceable debt/liability, the Accused issued Cheque No. [CHEQUE_NO.] dated [CHEQUE_DATE] for Rs. [CHEQUE_AMOUNT]/- (Rupees [AMOUNT_IN_WORDS] only) drawn on [BANK_NAME], [BRANCH], [CITY], Account No. [ACCOUNT_NO.], in favour of the Complainant.

4. DISHONOUR: The Complainant presented the said cheque for encashment through [COMPLAINANT'S_BANK_NAME], [BRANCH] on [PRESENTATION_DATE]. The said cheque was returned unpaid on [DISHONOUR_DATE] with the bank memo endorsed "Insufficient Funds / Payment Stopped / Account Closed." The cheque and return memo are annexed as Exhibit C-1 and C-2.

5. LEGAL NOTICE: A statutory legal notice under Section 138(b) of the NI Act was sent to the Accused on [NOTICE_DATE] via Registered Post/Speed Post, demanding payment of Rs. [CHEQUE_AMOUNT]/- within 15 days. The notice was received by the Accused on [RECEIPT_DATE]. A copy of the notice, postal receipt, and acknowledgement are annexed as Exhibit C-3 to C-5.

6. FAILURE TO PAY: Despite receipt of the notice and expiry of 15 days, the Accused has failed and neglected to pay the cheque amount or any part thereof.

7. COMPLAINT WITHIN LIMITATION: This complaint is filed within one month of the expiry of the 15-day notice period, i.e., within the period of limitation prescribed under Section 142(b) of the NI Act.

8. OFFENCE: By the above acts, the Accused has committed the offence punishable under Section 138 of the Negotiable Instruments Act, 1881.

9. JURISDICTION: This Court has jurisdiction as the cheque was presented at [BANK BRANCH ADDRESS] within the jurisdiction of this Court.

PRAYER:
It is most humbly prayed that this Hon'ble Court be pleased to:
(a) Take cognizance of the offence committed by the Accused under Section 138 of the NI Act;
(b) Issue summons / process to the Accused;
(c) On trial, convict and sentence the Accused as prescribed under the proviso to Section 138 of the NI Act;
(d) Direct the Accused to pay compensation of Rs. [CHEQUE_AMOUNT]/- with interest to the Complainant under Section 357 CrPC;
(e) Pass such other order as this Court may deem fit.

VERIFICATION:
I, [CLIENT_NAME], the Complainant, verify that the contents of this complaint are true and correct to my knowledge and belief.

Verified at [CITY] on [DATE].

Complainant: ________________________
[CLIENT_NAME]

Filed through:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY] | Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'cheque-bounce-rejoinder',
    name: 'Rejoinder to Written Statement (Cheque Bounce)',
    category: 'ni-act',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE COURT OF THE JUDICIAL MAGISTRATE FIRST CLASS, [CITY]

Complaint Case No. [CASE_NUMBER] of [YEAR]
(Under Section 138 of the Negotiable Instruments Act, 1881)

[CLIENT_NAME]                                         ... COMPLAINANT

VERSUS

[ACCUSED_NAME]                                        ... ACCUSED

REJOINDER TO THE WRITTEN STATEMENT / REPLY FILED BY THE ACCUSED

MOST RESPECTFULLY SHOWETH:

The Complainant files this Rejoinder to the Written Statement dated [WS_DATE] filed by the Accused and submits as under:

PRELIMINARY:
The Written Statement filed by the Accused is vague, evasive, and made with the sole intention of delaying and defeating the legitimate claim of the Complainant. The defences raised are afterthoughts and have been fabricated to avoid criminal liability.

SPECIFIC REPLIES:

1. As to Paragraph [__] of the Written Statement: The Accused has alleged that [ACCUSED'S ALLEGATION]. This is denied in toto. The Complainant states that [COMPLAINANT'S REBUTTAL].

2. As to Paragraph [__]: The Accused's claim that [ALLEGATION — e.g., "the cheque was issued as security and not in discharge of a debt"] is false and incorrect. The cheque was issued in discharge of a legally enforceable debt as evidenced by [EVIDENCE — e.g., "the written acknowledgement of loan / WhatsApp messages / bank transfer records annexed as Exhibit C-[__]"]. It is settled law that a cheque issued as security is also a cheque issued "in discharge of" a debt within the meaning of Section 138 NI Act (Supreme Court in Krishna Janardhan Bhat v. Dattatraya G. Hegde).

3. As to Paragraph [__]: The Accused's denial of receipt of the legal notice is false. The legal notice was sent via Registered Post AD and the acknowledgement card clearly bears the signature of the Accused / a family member at the Accused's address. The notice is deemed served in law.

4. As to Paragraph [__]: The Accused alleges that [ALLEGATION]. This is incorrect. [REBUTTAL WITH EVIDENCE].

5. That all defences raised by the Accused have no merit in law or on facts. The essential ingredients of Section 138 NI Act — legally enforceable debt, dishonoured cheque, statutory notice, and failure to pay — are all conclusively established.

6. That the Complainant relies on all documents already on record and craves leave to file additional documents if required.

PRAYER:
The Complainant prays that this Hon'ble Court be pleased to:
(a) Reject the defences raised by the Accused;
(b) Proceed with the trial and convict the Accused under Section 138 NI Act;
(c) Pass such other order as this Court may deem fit.

[CLIENT_NAME]
Complainant

Filed through:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY] | Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'cheque-bounce-appeal',
    name: 'Appeal — Cheque Bounce Case',
    category: 'ni-act',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

IN THE HON'BLE COURT OF SESSIONS / [APPELLATE COURT], [CITY]

Criminal Appeal No. _______ of [YEAR]
(Under Section 374 / 378 of the Code of Criminal Procedure, 1973)

IN THE MATTER OF:

[CLIENT_NAME], son/daughter of [FATHER_NAME],
residing at [CLIENT_ADDRESS]                          ... APPELLANT

VERSUS

[RESPONDENT_NAME], son/daughter of [RESPONDENT_FATHER_NAME],
residing at [RESPONDENT_ADDRESS]                      ... RESPONDENT

MEMORANDUM OF APPEAL AGAINST THE JUDGMENT AND ORDER DATED [JUDGMENT_DATE] PASSED BY THE COURT OF [TRIAL_COURT_NAME] IN COMPLAINT CASE NO. [CASE_NO.] OF [YEAR] UNDER SECTION 138 OF THE NEGOTIABLE INSTRUMENTS ACT, 1881

MOST RESPECTFULLY SHOWETH:

1. The Appellant is aggrieved by the Judgment and Order dated [JUDGMENT_DATE] passed by the Ld. [TRIAL_COURT], [CITY] in Complaint Case No. [CASE_NO.] of [YEAR], whereby [the Appellant was convicted under Section 138 NI Act and sentenced to [SENTENCE] / the complaint was dismissed].

2. BRIEF FACTS: [BRIEF FACTS OF THE TRIAL — cheque details, notice, proceedings].

3. GROUNDS OF APPEAL:

   [If convicted Accused is Appellant:]
   (a) The trial court erred in law in holding that there was a legally enforceable debt. The Complainant failed to prove the underlying transaction through any admissible evidence.
   (b) The trial court failed to appreciate that the cheque was issued as security and not in discharge of any existing liability.
   (c) The statutory notice was not properly served on the Appellant and the complaint was premature.
   (d) The trial court wrongly rejected the defence evidence, which clearly demonstrates that no amount was due.
   (e) The sentence imposed is excessive and disproportionate.

   [If Complainant's appeal against acquittal:]
   (a) The trial court erred in accepting the untenable defence raised by the Accused.
   (b) Once the signature on the cheque is admitted, the presumption under Section 139 NI Act stands attracted and the burden shifts to the Accused.
   (c) The Accused failed to rebut the presumption under Section 139 NI Act by adducing cogent and reliable evidence.
   (d) The trial court's findings are contrary to the evidence on record.

4. That the Appellant craves leave to urge additional grounds at the time of hearing.

PRAYER:
It is most humbly prayed that this Hon'ble Court be pleased to:
(a) Admit this appeal;
(b) Suspend the sentence and release the Appellant on bail pending appeal (if convicted);
(c) Set aside the impugned Judgment and Order dated [JUDGMENT_DATE] and [acquit the Appellant / convict the Respondent and award appropriate sentence and compensation];
(d) Pass such other order as this Court may deem fit.

Respectfully submitted,

[LAWYER_NAME]
Advocate for Appellant
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY] | Tel: [LAWYER_PHONE]`,
  },

  // ── CORPORATE & COMMERCIAL ────────────────────────────────────────────────

  {
    id: 'service-agreement',
    name: 'Service Agreement',
    category: 'corporate',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

SERVICE AGREEMENT

THIS SERVICE AGREEMENT ("Agreement") is entered into on [DATE] at [CITY] between:

SERVICE PROVIDER: [CLIENT_NAME] / [CLIENT_COMPANY_NAME], [having its registered office at / residing at] [CLIENT_ADDRESS] (hereinafter referred to as "the Service Provider"); AND

CLIENT: [CLIENT_COMPANY_NAME / INDIVIDUAL_NAME], [having its registered office at / residing at] [CLIENT_2_ADDRESS] (hereinafter referred to as "the Client").

(The Service Provider and the Client are hereinafter collectively referred to as "the Parties".)

RECITALS:
WHEREAS the Service Provider is engaged in the business of providing [NATURE OF SERVICES]; and
WHEREAS the Client desires to engage the Service Provider to render the said services on the terms and conditions hereinafter set out;

NOW, THEREFORE, in consideration of the mutual covenants contained herein, the Parties agree as follows:

1. SERVICES: The Service Provider shall render the following services to the Client ("Services"):
   (a) [SERVICE DESCRIPTION 1];
   (b) [SERVICE DESCRIPTION 2];
   (c) [SERVICE DESCRIPTION 3].
   A detailed Scope of Work is set out in Schedule 1 annexed hereto.

2. TERM: This Agreement shall commence on [COMMENCEMENT_DATE] and shall remain in force for a period of [DURATION] ending on [END_DATE], unless earlier terminated in accordance with this Agreement.

3. FEES AND PAYMENT:
   (a) In consideration of the Services, the Client shall pay the Service Provider a fee of Rs. [FEE_AMOUNT]/- per [month/quarter/project] (exclusive of applicable taxes).
   (b) Invoices shall be raised [monthly/upon milestone] and payment shall be made within [PAYMENT_DAYS] days of receipt of invoice.
   (c) Late payment shall attract interest at [RATE]% per month.

4. INTELLECTUAL PROPERTY: All deliverables, reports, and work product created by the Service Provider in the course of rendering Services shall be the exclusive property of the Client upon full payment of fees.

5. CONFIDENTIALITY: The Service Provider shall maintain strict confidentiality of all proprietary and confidential information of the Client and shall not disclose the same to any third party during or after the term of this Agreement.

6. NON-SOLICITATION: During the term of this Agreement and for a period of [PERIOD] thereafter, the Service Provider shall not directly or indirectly solicit or engage any employee or client of the Client.

7. INDEMNITY: Each party shall indemnify and hold harmless the other party from any loss, damage, or liability arising from its breach of this Agreement or negligence.

8. TERMINATION: Either party may terminate this Agreement by giving [NOTICE_PERIOD] days' written notice. The Client may terminate immediately in case of material breach by the Service Provider.

9. GOVERNING LAW AND DISPUTE RESOLUTION: This Agreement shall be governed by Indian law. All disputes shall be referred to arbitration under the Arbitration and Conciliation Act, 1996. The seat of arbitration shall be [CITY].

SCHEDULE 1 — SCOPE OF WORK:
[DETAILED SCOPE OF SERVICES]

IN WITNESS WHEREOF, the Parties have executed this Agreement on the date mentioned above.

Service Provider:                  Client:
[CLIENT_NAME]                      [CLIENT_2_NAME]

WITNESSES:
1. Name: _________________ Sign: _________________
2. Name: _________________ Sign: _________________

Drafted by:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER], [FIRM_NAME], [CITY]`,
  },

  {
    id: 'consultancy-agreement',
    name: 'Consultancy Agreement',
    category: 'corporate',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

CONSULTANCY AGREEMENT

THIS CONSULTANCY AGREEMENT is made on [DATE] between:

CONSULTANT: [CLIENT_NAME], son/daughter of [FATHER_NAME], [QUALIFICATION], residing at [CLIENT_ADDRESS] (hereinafter "the Consultant"); AND

COMPANY: [COMPANY_NAME], a company incorporated under the Companies Act, 2013, having its registered office at [COMPANY_ADDRESS], represented by its [DIRECTOR/AUTHORIZED SIGNATORY], [SIGNATORY_NAME] (hereinafter "the Company").

1. ENGAGEMENT: The Company hereby engages the Consultant as an independent consultant to provide advisory and consultancy services in the domain of [DOMAIN — e.g., "finance / technology / legal / management"] as more particularly described in Schedule A.

2. NATURE OF RELATIONSHIP: The Consultant is an independent contractor and not an employee, agent, or partner of the Company. The Consultant shall not be entitled to any employee benefits including provident fund, gratuity, or insurance.

3. TERM: This Agreement is effective from [START_DATE] for a period of [DURATION], renewable by mutual written consent.

4. RETAINER / CONSULTANCY FEE:
   (a) The Company shall pay the Consultant a monthly retainer of Rs. [RETAINER_AMOUNT]/- (plus applicable GST).
   (b) Payments shall be made by the [DAY] of each month against a valid invoice.
   (c) The Consultant shall be reimbursed for pre-approved out-of-pocket expenses incurred in the performance of duties.

5. DELIVERABLES: The Consultant shall provide the deliverables set out in Schedule A within the timelines specified therein.

6. EXCLUSIVITY: [Select: "This is a non-exclusive engagement and the Consultant is free to take up other assignments." / "During the term, the Consultant shall not provide services to any competitor of the Company without prior written consent."]

7. CONFIDENTIALITY: The Consultant shall keep all Confidential Information of the Company strictly confidential during and for 3 years after the term of this Agreement.

8. INTELLECTUAL PROPERTY: All work product, reports, analyses, and intellectual property created by the Consultant in the performance of services shall vest exclusively in the Company upon payment of fees.

9. TERMINATION: Either party may terminate this Agreement with [NOTICE_PERIOD] days' written notice. The Company may terminate immediately for cause.

10. GOVERNING LAW: This Agreement shall be governed by the laws of India. Disputes shall be resolved by arbitration at [CITY] under the Arbitration and Conciliation Act, 1996.

SCHEDULE A — SCOPE OF CONSULTANCY:
[DETAILED SCOPE]

IN WITNESS WHEREOF:

Consultant:                        Company (Authorised Signatory):
[CLIENT_NAME]                      [SIGNATORY_NAME]
Date: [DATE]                       Date: [DATE]

Drafted by:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER], [FIRM_NAME], [CITY]`,
  },

  {
    id: 'employment-agreement',
    name: 'Employment Agreement',
    category: 'corporate',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

EMPLOYMENT AGREEMENT

THIS EMPLOYMENT AGREEMENT ("Agreement") is entered into on [DATE] between:

EMPLOYER: [COMPANY_NAME], a company incorporated under the Companies Act, 2013, having its registered office at [COMPANY_ADDRESS] (hereinafter "the Company"); AND

EMPLOYEE: [CLIENT_NAME], son/daughter of [FATHER_NAME], residing at [CLIENT_ADDRESS] (hereinafter "the Employee").

1. APPOINTMENT: The Company hereby appoints the Employee as [DESIGNATION] in the [DEPARTMENT/DIVISION], based at [WORK_LOCATION], with effect from [JOINING_DATE].

2. DUTIES AND RESPONSIBILITIES: The Employee shall perform such duties and responsibilities as are assigned by the Company from time to time, which shall include without limitation: [DUTY_1], [DUTY_2], [DUTY_3].

3. REMUNERATION:
   (a) Basic Salary: Rs. [BASIC_SALARY]/- per month
   (b) HRA: Rs. [HRA]/- per month
   (c) Special Allowance: Rs. [SPECIAL_ALLOWANCE]/- per month
   (d) Total CTC: Rs. [TOTAL_CTC]/- per annum
   The Employee's remuneration shall be subject to applicable TDS and statutory deductions.

4. WORKING HOURS: The Employee shall work [HOURS] hours per day, [DAYS] days per week. The Company may require the Employee to work beyond regular hours as needed.

5. PROBATION: The Employee shall be on probation for a period of [PROBATION_PERIOD] from the date of joining. The probation period may be extended at the Company's discretion.

6. LEAVE: The Employee shall be entitled to [EARNED_LEAVE] days of earned leave, [CASUAL_LEAVE] days of casual leave, and [SICK_LEAVE] days of sick leave per annum in accordance with the Company's leave policy.

7. CONFIDENTIALITY: During and after employment, the Employee shall maintain strict confidentiality of all proprietary and confidential information, trade secrets, client data, and business strategies of the Company.

8. INTELLECTUAL PROPERTY: All inventions, works, developments, and intellectual property created by the Employee during the course of employment shall be the exclusive property of the Company.

9. NON-COMPETE AND NON-SOLICITATION: For a period of [PERIOD] after cessation of employment, the Employee shall not join any competing organisation / solicit any clients or employees of the Company without prior written consent.

10. TERMINATION:
    (a) During probation: Either party may terminate with [NOTICE] days' notice or salary in lieu.
    (b) After confirmation: The Company may terminate by giving [NOTICE_PERIOD] days' written notice or salary in lieu. The Employee may resign with [NOTICE_PERIOD] days' written notice.
    (c) The Company may terminate immediately for cause (misconduct, fraud, breach of policy).

11. GOVERNING LAW: This Agreement is governed by Indian law and the courts at [CITY] shall have jurisdiction.

IN WITNESS WHEREOF:

Employee:                          Company (Authorised Signatory):
[CLIENT_NAME]                      [SIGNATORY_NAME], [DESIGNATION]
Date: [DATE]                       Date: [DATE]

Drafted by:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER], [FIRM_NAME], [CITY]`,
  },

  {
    id: 'termination-notice',
    name: 'Termination Notice (Employment)',
    category: 'corporate',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

WITHOUT PREJUDICE
TERMINATION NOTICE

To,
[EMPLOYEE_NAME],
[EMPLOYEE_DESIGNATION],
[EMPLOYEE_ADDRESS / EMPLOYEE ID: [EMP_ID]]

Dear [EMPLOYEE_NAME],

This is to inform you that [COMPANY_NAME] (hereinafter "the Company") has decided to terminate your employment with the Company with effect from [TERMINATION_DATE] / at the expiry of the notice period stated herein, for the following reason(s):

GROUNDS FOR TERMINATION:

[Select applicable:]

(a) PERFORMANCE: Despite repeated warnings and a Performance Improvement Plan ("PIP") placed on [PIP_DATE], you have failed to demonstrate the minimum required performance standards for the role of [DESIGNATION]. Your performance has continued to be unsatisfactory as evidenced by [DETAILS].

(b) MISCONDUCT: A Show Cause Notice was issued to you on [SCN_DATE] regarding [MISCONDUCT — e.g., "misconduct / insubordination / breach of company policy / fraud / dishonesty"]. Your reply dated [REPLY_DATE] was considered and a domestic enquiry was conducted. The Enquiry Officer has found the charges proved, and after due consideration, the Company has decided to terminate your services.

(c) RESTRUCTURING / REDUNDANCY: Due to organisational restructuring / downsizing / elimination of your role, your services are no longer required by the Company.

(d) BREACH OF CONTRACT: You have been found to have [BREACH — e.g., "joined a competitor / disclosed confidential information / violated the Non-Compete clause"] in breach of your Employment Agreement dated [AGREEMENT_DATE].

NOTICE PERIOD: In accordance with your Employment Agreement / Company Policy, you are entitled to [NOTICE_PERIOD] days' notice. Your last working day shall be [LAST_WORKING_DATE]. / In lieu of notice, you shall be paid [NOTICE_PAY_AMOUNT]/-.

FULL AND FINAL SETTLEMENT: You shall receive full and final settlement of your dues including unpaid salary up to [DATE], encashment of [EARNED_LEAVE_DAYS] days of earned leave, and [OTHER DUES]. Statutory dues including gratuity (if eligible under the Payment of Gratuity Act, 1972) shall be paid as applicable.

HANDOVER: You are required to hand over all company property, documents, access cards, and electronic assets to [HR/REPORTING_MANAGER] by [DATE].

Please sign and return the duplicate copy of this letter as acknowledgement.

Yours faithfully,

[AUTHORIZED_SIGNATORY_NAME]
[DESIGNATION]
[COMPANY_NAME]

Acknowledged by:
[EMPLOYEE_NAME]
Date: ___________

Drafted by:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER], [FIRM_NAME], [CITY]`,
  },

  {
    id: 'partnership-agreement',
    name: 'Partnership Agreement',
    category: 'corporate',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

PARTNERSHIP DEED

THIS PARTNERSHIP DEED is made and executed on [DATE] at [CITY] between:

1. [CLIENT_NAME], son/daughter of [FATHER_NAME], aged [CLIENT_AGE] years, residing at [CLIENT_ADDRESS] (hereinafter "Partner 1");

2. [PARTNER_2_NAME], son/daughter of [PARTNER_2_FATHER_NAME], aged [PARTNER_2_AGE] years, residing at [PARTNER_2_ADDRESS] (hereinafter "Partner 2");

3. [PARTNER_3_NAME] (if applicable), residing at [PARTNER_3_ADDRESS] (hereinafter "Partner 3");

(All the above are collectively referred to as "the Partners".)

WHEREAS the Partners have agreed to form a Partnership Firm for carrying on the business described herein under the provisions of the Indian Partnership Act, 1932.

NOW THIS DEED WITNESSETH AS FOLLOWS:

1. NAME OF FIRM: The Partnership Firm shall be carried on under the name and style of "[FIRM_NAME]" (hereinafter "the Firm").

2. PLACE OF BUSINESS: The principal place of business of the Firm shall be at [BUSINESS_ADDRESS], [CITY]. The Firm may open additional branches as mutually agreed.

3. NATURE OF BUSINESS: The Firm shall carry on the business of [BUSINESS_DESCRIPTION — e.g., "trading in [GOODS] / providing [SERVICES] / manufacturing [PRODUCTS]"] and such other business as the Partners may unanimously agree.

4. COMMENCEMENT: The Partnership shall be deemed to have commenced from [START_DATE] and shall continue until dissolved in accordance with this Deed.

5. CAPITAL CONTRIBUTION:
   Partner 1: Rs. [PARTNER_1_CAPITAL]/-  ([SHARE]%)
   Partner 2: Rs. [PARTNER_2_CAPITAL]/-  ([SHARE]%)
   Partner 3: Rs. [PARTNER_3_CAPITAL]/-  ([SHARE]%)
   Additional capital may be introduced by mutual written consent.

6. PROFIT AND LOSS SHARING: The profits and losses of the Firm shall be shared among the Partners in the following ratio:
   Partner 1: [RATIO]% | Partner 2: [RATIO]% | Partner 3: [RATIO]%

7. MANAGEMENT: All Partners shall actively participate in the management of the Firm. Day-to-day management shall be handled by [MANAGING_PARTNER_NAME] as the Managing Partner. Major decisions requiring unanimous consent of all Partners include: [MAJOR_DECISIONS — e.g., borrowing above Rs. [LIMIT] / entering new business lines / admitting new partners].

8. BANKING: The Firm's bank accounts shall be maintained with [BANK_NAME] and shall be operated jointly by [TWO/ALL] Partners.

9. INTEREST ON CAPITAL: Partners shall be entitled to interest on capital at [RATE]% per annum before division of profits.

10. PARTNER'S REMUNERATION: [MANAGING/WORKING] Partner(s) shall be entitled to a monthly salary of Rs. [SALARY]/- each, subject to the Firm earning profits.

11. ACCOUNTS: Proper books of accounts shall be maintained at the principal place of business. The accounts shall be finalised on 31st March each year.

12. RETIREMENT AND DISSOLUTION: Any partner may retire with [NOTICE_PERIOD] months' written notice. The Firm shall be dissolved by mutual consent or in accordance with the Indian Partnership Act, 1932.

IN WITNESS WHEREOF, all the Partners have executed this Deed on the date first mentioned above.

Partner 1:        Partner 2:        Partner 3:
[CLIENT_NAME]     [PARTNER_2_NAME]  [PARTNER_3_NAME]

WITNESSES:
1. Name: _________________ Sign: _________________
2. Name: _________________ Sign: _________________

Drafted by:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER], [FIRM_NAME], [CITY]`,
  },

  {
    id: 'franchise-agreement',
    name: 'Franchise Agreement',
    category: 'corporate',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

FRANCHISE AGREEMENT

THIS FRANCHISE AGREEMENT ("Agreement") is entered into on [DATE] between:

FRANCHISOR: [FRANCHISOR_NAME / COMPANY_NAME], [incorporated under the Companies Act / Partnership Firm], having its principal office at [FRANCHISOR_ADDRESS] (hereinafter "the Franchisor"); AND

FRANCHISEE: [CLIENT_NAME] / [FRANCHISEE_COMPANY_NAME], residing / having its office at [CLIENT_ADDRESS] (hereinafter "the Franchisee").

1. GRANT OF FRANCHISE: The Franchisor hereby grants to the Franchisee, and the Franchisee accepts, an exclusive / non-exclusive franchise to operate a [BRAND_NAME] [BUSINESS TYPE — e.g., outlet / service centre / dealership] at the location: [FRANCHISE_LOCATION_ADDRESS] (hereinafter "the Franchised Location").

2. TERM: This Agreement shall be valid for a period of [TERM_YEARS] years commencing from [COMMENCEMENT_DATE], renewable on mutual agreement.

3. FRANCHISE FEE: The Franchisee shall pay the Franchisor:
   (a) A one-time franchise fee of Rs. [FRANCHISE_FEE]/- payable on signing;
   (b) A monthly royalty of [ROYALTY]% of gross revenue, payable by the [DAY] of the succeeding month.

4. TRAINING: The Franchisor shall provide initial training of [DURATION] to the Franchisee and key staff. Ongoing training support shall be provided as agreed.

5. STANDARDS: The Franchisee shall strictly adhere to the Franchisor's Standard Operating Procedures, brand guidelines, quality standards, and operational manuals as updated from time to time.

6. INTELLECTUAL PROPERTY: The Franchisor grants the Franchisee a limited, non-exclusive, non-transferable licence to use the Franchisor's trademarks, brand name "[BRAND_NAME]", logos, and other intellectual property solely for the purpose of operating the franchise at the Franchised Location.

7. TERRITORY: The Franchisee shall have exclusive rights to operate within [TERRITORY DESCRIPTION] subject to achieving minimum performance benchmarks of Rs. [MIN_REVENUE]/- per month.

8. AUDIT AND REPORTING: The Franchisor shall have the right to audit the Franchisee's books and operations at any time. The Franchisee shall submit monthly sales reports by the [DATE] of each month.

9. TERMINATION: The Franchisor may terminate this Agreement immediately on: breach of brand standards / non-payment of royalties / insolvency / failure to maintain minimum performance. Either party may terminate with [NOTICE_PERIOD] written notice.

10. GOVERNING LAW: This Agreement is governed by Indian law. Disputes shall be resolved by arbitration at [CITY].

IN WITNESS WHEREOF:

Franchisor:                        Franchisee:
[FRANCHISOR_NAME]                  [CLIENT_NAME]
Date: [DATE]                       Date: [DATE]

Drafted by:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER], [FIRM_NAME], [CITY]`,
  },

  {
    id: 'distribution-agreement',
    name: 'Distribution Agreement',
    category: 'corporate',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

DISTRIBUTION AGREEMENT

THIS DISTRIBUTION AGREEMENT ("Agreement") is made on [DATE] between:

SUPPLIER/PRINCIPAL: [CLIENT_NAME / COMPANY_NAME], having its office at [CLIENT_ADDRESS] (hereinafter "the Supplier"); AND

DISTRIBUTOR: [DISTRIBUTOR_NAME / COMPANY_NAME], having its office at [DISTRIBUTOR_ADDRESS] (hereinafter "the Distributor").

1. APPOINTMENT: The Supplier hereby appoints the Distributor as its [exclusive/non-exclusive] distributor for the sale and distribution of the Products described in Schedule A in the Territory described in Schedule B, and the Distributor accepts such appointment.

2. PRODUCTS: The Products covered under this Agreement are set out in Schedule A attached hereto, as may be amended by mutual agreement from time to time.

3. TERRITORY: The Distributor shall have distribution rights in the Territory as described in Schedule B. The Distributor shall not actively sell Products outside the Territory.

4. PURCHASE PRICE AND PAYMENT:
   (a) The Distributor shall purchase Products from the Supplier at the prices set out in the Price List (Schedule C), subject to revision with [NOTICE_PERIOD] notice.
   (b) Payment terms: [PAYMENT_TERMS — e.g., "100% advance / 30 days credit from date of invoice"].
   (c) All payments shall be made by RTGS/NEFT to the Supplier's bank account.

5. MINIMUM PURCHASE COMMITMENT: The Distributor commits to purchase a minimum of [MINIMUM_UNITS/VALUE] per [quarter/year] ("Minimum Purchase"). Failure to meet Minimum Purchase targets shall entitle the Supplier to convert the appointment to non-exclusive or terminate.

6. MARKETING AND PROMOTION: The Distributor shall actively market and promote the Products in the Territory at its own cost and shall comply with the Supplier's brand guidelines.

7. AFTER-SALES SUPPORT: The Distributor shall provide first-level after-sales support and warranty service to customers. The Supplier shall provide second-level technical support.

8. INTELLECTUAL PROPERTY: The Distributor is granted a limited licence to use the Supplier's trademarks solely for the purpose of distributing the Products.

9. CONFIDENTIALITY: The Distributor shall maintain strict confidentiality of pricing, business strategies, and other proprietary information of the Supplier.

10. TERM AND TERMINATION: This Agreement is valid for [TERM] years. Either party may terminate with [NOTICE] days' notice. Immediate termination is available for material breach or insolvency.

SCHEDULES:
Schedule A — Products: [LIST OF PRODUCTS]
Schedule B — Territory: [TERRITORY DESCRIPTION]
Schedule C — Price List: [PRICES]

IN WITNESS WHEREOF:

Supplier:                          Distributor:
[CLIENT_NAME]                      [DISTRIBUTOR_NAME]

Drafted by:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER], [FIRM_NAME], [CITY]`,
  },

  {
    id: 'assignment-agreement',
    name: 'Assignment Agreement',
    category: 'corporate',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

DEED OF ASSIGNMENT

THIS DEED OF ASSIGNMENT ("Deed") is made on [DATE] between:

ASSIGNOR: [CLIENT_NAME] / [ASSIGNOR_COMPANY], [residing at / having its office at] [CLIENT_ADDRESS] (hereinafter "the Assignor"); AND

ASSIGNEE: [ASSIGNEE_NAME] / [ASSIGNEE_COMPANY], [residing at / having its office at] [ASSIGNEE_ADDRESS] (hereinafter "the Assignee").

RECITALS:
(A) The Assignor is the lawful owner of [ASSIGNED_RIGHT/ASSET — e.g., "the intellectual property rights / contractual rights / receivables / trademark / patent / copyright"] more fully described in Schedule A hereto ("the Assigned Asset").
(B) The Assignor desires to assign the Assigned Asset to the Assignee, and the Assignee desires to accept such assignment, on the terms and conditions set out herein.

NOW THIS DEED WITNESSETH AS FOLLOWS:

1. ASSIGNMENT: In consideration of the payment of Rs. [CONSIDERATION]/- (Rupees [AMOUNT_IN_WORDS] only) by the Assignee to the Assignor (receipt of which the Assignor hereby acknowledges), the Assignor hereby absolutely assigns, transfers, and conveys to the Assignee all of the Assignor's right, title, interest, and benefit in and to the Assigned Asset described in Schedule A, free and clear of all encumbrances, with effect from [EFFECTIVE_DATE].

2. RIGHTS TRANSFERRED: The assignment includes, without limitation:
   (a) All [IP RIGHTS — copyright / patent / trademark / design rights] in and to the Assigned Asset;
   (b) The right to use, reproduce, modify, sub-licence, and exploit the Assigned Asset;
   (c) All associated documentation, source code, records, and materials.

3. WARRANTIES: The Assignor warrants that:
   (a) The Assignor is the sole and exclusive owner of the Assigned Asset;
   (b) The Assigned Asset is free from all claims, disputes, and encumbrances;
   (c) The Assignor has full authority to execute this Deed.

4. FURTHER ASSURANCE: The Assignor shall, at the Assignee's request, execute such further documents and do all such acts as may be necessary to give full effect to this Deed.

5. INDEMNITY: The Assignor shall indemnify the Assignee against any third-party claims in respect of the Assigned Asset arising prior to the date of this Deed.

6. GOVERNING LAW: This Deed is governed by Indian law. Disputes shall be resolved by arbitration at [CITY].

SCHEDULE A — DESCRIPTION OF ASSIGNED ASSET:
[DETAILED DESCRIPTION]

IN WITNESS WHEREOF:

Assignor:                          Assignee:
[CLIENT_NAME]                      [ASSIGNEE_NAME]

WITNESSES:
1. Name: _________________ Sign: _________________
2. Name: _________________ Sign: _________________

Drafted by:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER], [FIRM_NAME], [CITY]`,
  },

  {
    id: 'corporate-guarantee',
    name: 'Corporate Guarantee Letter',
    category: 'corporate',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

CORPORATE GUARANTEE

To,
[BENEFICIARY_NAME],
[BENEFICIARY_ADDRESS]

Dear Sir/Madam,

In consideration of [BENEFICIARY_NAME] (hereinafter "the Beneficiary") agreeing to [advance a loan of Rs. [LOAN_AMOUNT]/- / provide credit facility of Rs. [CREDIT_LIMIT]/- / enter into agreement dated [DATE]] in favour of [BORROWER/PRINCIPAL_DEBTOR_NAME] (hereinafter "the Principal Debtor"), we, [CLIENT_COMPANY_NAME], a company incorporated under the Companies Act, 2013, having its registered office at [CLIENT_ADDRESS], CIN: [CIN_NO.], represented by its [DIRECTOR/AUTHORIZED SIGNATORY], [SIGNATORY_NAME], duly authorized by a resolution of the Board of Directors dated [BOARD_RESOLUTION_DATE] (hereinafter "the Guarantor"), hereby irrevocably and unconditionally GUARANTEE to you as follows:

1. GUARANTEE: The Guarantor hereby unconditionally guarantees the due and punctual payment and performance by the Principal Debtor of all its obligations, liabilities, and indebtedness to the Beneficiary, whether present or future, including principal, interest, charges, and costs (hereinafter "the Guaranteed Obligations").

2. LIMIT OF GUARANTEE: The total liability of the Guarantor under this Guarantee shall not exceed Rs. [GUARANTEE_LIMIT]/- (Rupees [AMOUNT_IN_WORDS] only).

3. DEMAND: This is a demand guarantee. On first written demand by the Beneficiary, the Guarantor shall forthwith pay the demanded amount without raising any objection or requiring proof of the Principal Debtor's default.

4. PRIMARY OBLIGATION: The Guarantor's liability hereunder is primary and not secondary. The Beneficiary shall not be required to first proceed against the Principal Debtor or any security before calling upon this Guarantee.

5. CONTINUING GUARANTEE: This is a continuing guarantee and shall remain in force until all Guaranteed Obligations are fully discharged.

6. AUTHORITY: The Guarantor confirms that it has obtained all necessary corporate approvals, including board resolution and shareholder approval (if required under Section 186 of the Companies Act, 2013), to issue this Guarantee.

7. GOVERNING LAW: This Guarantee shall be governed by Indian law and the courts at [CITY] shall have jurisdiction.

Yours faithfully,

For and on behalf of [CLIENT_COMPANY_NAME]:

Authorised Signatory: ________________________
Name: [SIGNATORY_NAME]
Designation: [DESIGNATION]
Date: [DATE]

Company Seal

Drafted by:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER], [FIRM_NAME], [CITY]`,
  },

  // ── LABOUR & EMPLOYMENT ───────────────────────────────────────────────────

  {
    id: 'labour-court-complaint',
    name: 'Labour Court Complaint',
    category: 'labour',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

BEFORE THE PRESIDING OFFICER / LABOUR COURT, [CITY]

I.D. Application / Reference No. _______ of [YEAR]
(Under Section 2A / Section 10 of the Industrial Disputes Act, 1947)

IN THE MATTER OF:

[CLIENT_NAME], son/daughter of [FATHER_NAME],
aged [CLIENT_AGE] years, former [DESIGNATION],
previously employed at [EMPLOYER_NAME]
residing at [CLIENT_ADDRESS]                          ... WORKMAN/COMPLAINANT

VERSUS

[EMPLOYER_NAME],
[COMPANY_TYPE], having its office at [EMPLOYER_ADDRESS]   ... MANAGEMENT/RESPONDENT

COMPLAINT / APPLICATION UNDER SECTION 2A / 10 OF THE INDUSTRIAL DISPUTES ACT, 1947

MOST RESPECTFULLY SHOWETH:

1. That the Complainant was employed by the Respondent/Management as [DESIGNATION] from [JOINING_DATE] at a monthly salary of Rs. [SALARY]/-.

2. NATURE OF TERMINATION: The Complainant's services were terminated by the Respondent on [TERMINATION_DATE] vide [TERMINATION LETTER dated [DATE] / orally without any notice]. The said termination was without any valid reason, notice, or compliance with the mandatory provisions of the Industrial Disputes Act, 1947.

3. VIOLATIONS BY MANAGEMENT:
   (a) NO NOTICE AND NO RETRENCHMENT COMPENSATION: The Respondent terminated the Complainant's services without giving one month's notice or salary in lieu thereof as required under Section 25F(a) of the Industrial Disputes Act, 1947.
   (b) NO RETRENCHMENT COMPENSATION: No retrenchment compensation at the rate of 15 days' average pay for each completed year of service has been paid as mandated under Section 25F(b) of the Act.
   (c) NO VALID ENQUIRY: The alleged misconduct (if cited as reason) was not established through a fair domestic enquiry with due notice to the Complainant.
   (d) DUES UNPAID: The following outstanding dues have not been paid:
       - Arrears of wages: Rs. [AMOUNT]/-
       - Earned leave encashment: Rs. [AMOUNT]/-
       - Gratuity: Rs. [AMOUNT]/-
       - Notice pay: Rs. [AMOUNT]/-

4. STANDING ORDERS: The termination is also in violation of the [Company's Standing Orders / Model Standing Orders under the Industrial Employment (Standing Orders) Act, 1946].

5. RELIEF SOUGHT: The Complainant prays for reinstatement with back wages and continuity of service, or alternatively, retrenchment compensation and all statutory dues.

PRAYER:
It is most humbly prayed that this Hon'ble Labour Court be pleased to:
(a) Hold that the termination of the Complainant is illegal, unjustified, and void;
(b) Direct reinstatement of the Complainant with full back wages and continuity of service;
(c) In the alternative, direct payment of retrenchment compensation and all outstanding dues;
(d) Award compensation for the illegal termination;
(e) Pass such other order as this Court may deem fit.

VERIFICATION:
I, [CLIENT_NAME], verify that the contents of this application are true and correct.

Verified at [CITY] on [DATE].

Complainant: ________________________
[CLIENT_NAME]

Filed through:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY] | Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'wrongful-termination-notice',
    name: 'Wrongful Termination Notice',
    category: 'labour',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

LEGAL NOTICE — WRONGFUL / ILLEGAL TERMINATION

To,
The [Director / Managing Director / HR Manager],
[EMPLOYER_COMPANY_NAME],
[EMPLOYER_ADDRESS]

Sent via: Registered Post AD / Speed Post

Under instructions from and on behalf of my client, [CLIENT_NAME], former [DESIGNATION] (Employee ID: [EMP_ID]) of your organisation, I hereby issue this Legal Notice as under:

1. EMPLOYMENT: My client was employed with your organisation as [DESIGNATION] since [JOINING_DATE] at a monthly gross salary of Rs. [SALARY]/-.

2. TERMINATION: My client's services were terminated by your organisation on [TERMINATION_DATE] vide [termination letter / orally / without any notice / with a show cause notice bearing date [SCN_DATE]].

3. ILLEGALITY OF TERMINATION:
   (a) The termination is in violation of Section 25F of the Industrial Disputes Act, 1947, as no notice pay / retrenchment compensation was paid;
   (b) No valid domestic enquiry was conducted before termination for alleged misconduct;
   (c) The principles of natural justice were not followed — my client was not given an adequate opportunity to defend himself/herself;
   (d) The termination is in breach of the Employment Agreement dated [AGREEMENT_DATE] / Service Rules;
   (e) The termination is discriminatory / motivated by personal vendetta / in retaliation for my client's lawful complaint dated [COMPLAINT_DATE].

4. OUTSTANDING DUES: The following dues are payable by your organisation to my client but remain unpaid:
   (a) Salary for the months of [MONTHS]: Rs. [AMOUNT]/-
   (b) Notice pay: Rs. [AMOUNT]/-
   (c) Gratuity under the Payment of Gratuity Act, 1972: Rs. [AMOUNT]/-
   (d) Earned leave encashment ([DAYS] days): Rs. [AMOUNT]/-
   (e) Bonus: Rs. [AMOUNT]/-
   TOTAL: Rs. [TOTAL_DUES]/-

YOU ARE HEREBY CALLED UPON to:
(a) Forthwith reinstate my client with full back wages and continuity of service;
(b) Pay all outstanding dues of Rs. [TOTAL_DUES]/- within [NOTICE_PERIOD] days of receipt hereof;
(c) Issue a proper relieving letter and experience certificate.

Failing compliance, my client shall be constrained to initiate legal proceedings before the Labour Court / Industrial Tribunal / Civil Court for reinstatement, back wages, damages, and appropriate relief, without further notice.

Yours truly,

[LAWYER_NAME]
Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY] | Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'gratuity-claim-notice',
    name: 'Gratuity Claim Notice',
    category: 'labour',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

LEGAL NOTICE — CLAIM FOR PAYMENT OF GRATUITY
(Under Sections 4 and 7 of the Payment of Gratuity Act, 1972)

To,
The Employer / HR Head,
[EMPLOYER_COMPANY_NAME],
[EMPLOYER_ADDRESS]

Under instructions from and on behalf of my client, [CLIENT_NAME], ex-[DESIGNATION] (Employee ID: [EMP_ID]), I hereby issue this Legal Notice as under:

1. EMPLOYMENT: My client was employed by your organisation in the capacity of [DESIGNATION] from [JOINING_DATE] to [LAST_WORKING_DATE], i.e., for a continuous service period of [YEARS] years and [MONTHS] months.

2. CESSATION OF SERVICE: My client's services came to an end on [LAST_WORKING_DATE] by reason of [RETIREMENT / RESIGNATION / TERMINATION / DEATH (in case of nominee)], after completing not less than five years of continuous service as mandated under Section 4 of the Payment of Gratuity Act, 1972.

3. ENTITLEMENT: Under Section 4(1) of the Payment of Gratuity Act, 1972, my client is entitled to gratuity at the rate of 15 days' wages (last drawn basic + DA) for each completed year of service. The computation is as follows:
   - Last drawn basic + DA: Rs. [BASIC_DA_AMOUNT]/-
   - Number of completed years of service: [YEARS]
   - Gratuity = (Basic + DA × 15 / 26) × [YEARS] = Rs. [GRATUITY_AMOUNT]/-
   - Subject to the ceiling of Rs. 20,00,000/- (Twenty Lakhs) under the Act.

4. NON-PAYMENT: Despite the cessation of my client's employment on [LAST_WORKING_DATE] and despite Form I / Form J having been submitted on [APPLICATION_DATE], you have failed and neglected to pay the gratuity amount of Rs. [GRATUITY_AMOUNT]/- within the stipulated period of 30 days as required under Section 7(3) of the Payment of Gratuity Act, 1972.

5. INTEREST: Under Section 7(3A) of the Act, interest at the prescribed rate is payable on the gratuity amount for the period of delay.

YOU ARE HEREBY CALLED UPON to:
(a) Pay the gratuity amount of Rs. [GRATUITY_AMOUNT]/- along with interest under Section 7(3A) of the Act, within [NOTICE_PERIOD] days of receipt of this Notice.

Failing compliance, my client shall file an application before the Controlling Authority under the Payment of Gratuity Act, 1972 for determination and payment of gratuity, and shall seek penal action under Section 9 of the Act.

Yours truly,

[LAWYER_NAME]
Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY] | Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'pf-esic-notice',
    name: 'PF / ESIC Demand Notice',
    category: 'labour',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

LEGAL NOTICE — NON-DEPOSIT OF PF / ESIC CONTRIBUTIONS

To,
The Employer / Managing Director / Director,
[EMPLOYER_COMPANY_NAME],
[EMPLOYER_ADDRESS]

Under instructions from and on behalf of my client, [CLIENT_NAME], former [DESIGNATION] (PF Account No.: [PF_ACCOUNT_NO.] / ESIC No.: [ESIC_NO.]), I hereby issue this Legal Notice as under:

1. EMPLOYMENT: My client was employed in your organisation as [DESIGNATION] from [JOINING_DATE] to [LAST_WORKING_DATE] at a monthly basic salary of Rs. [BASIC_SALARY]/-.

2. STATUTORY OBLIGATIONS: As an employer covered under the Employees' Provident Funds and Miscellaneous Provisions Act, 1952 and the Employees' State Insurance Act, 1948, your organisation was obligated to:
   (a) Deduct Provident Fund (PF) contribution from the Employee's salary at 12% of basic wages and deposit the same along with your matching employer contribution of 12% to the EPFO each month;
   (b) Deduct ESIC contribution from the Employee's salary at 0.75% (employee) and deposit the same along with employer contribution of 3.25% to the ESIC each month.

3. DEFAULT: It has come to my client's knowledge that:
   (a) PF contributions for the period [FROM_DATE] to [TO_DATE] amounting to Rs. [PF_AMOUNT]/- (both employee and employer share) have NOT been deposited with the EPFO;
   (b) ESIC contributions for the period [FROM_DATE] to [TO_DATE] amounting to Rs. [ESIC_AMOUNT]/- have NOT been deposited with ESIC.

4. PREJUDICE: Due to the non-deposit of PF contributions, my client's PF account does not reflect the correct balance and my client is unable to withdraw PF and avail of pension benefits. Due to non-deposit of ESIC contributions, my client has been denied medical and other benefits under the ESI Act.

5. CONSEQUENCES: Non-payment of PF contributions is an offence under Section 14 of the EPF & MP Act, 1952, punishable with imprisonment up to 3 years. Non-payment of ESIC contributions is an offence under Section 85 of the ESI Act, 1948.

YOU ARE HEREBY CALLED UPON to:
(a) Immediately deposit the PF contributions of Rs. [PF_AMOUNT]/- with the EPFO and ESIC contributions of Rs. [ESIC_AMOUNT]/- with ESIC, along with applicable interest and damages;
(b) Provide my client with the passbook / deposit receipts within [NOTICE_PERIOD] days.

Failing compliance, my client shall lodge complaints with the Regional PF Commissioner and ESIC Regional Office respectively, and shall initiate criminal prosecution against your organisation and its directors.

Yours truly,

[LAWYER_NAME]
Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY] | Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'workmen-compensation',
    name: 'Workmen Compensation Claim',
    category: 'labour',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

BEFORE THE COMMISSIONER FOR WORKMEN'S COMPENSATION / LABOUR COURT, [CITY]

Claim Application No. _______ of [YEAR]
(Under Section 10 of the Employees' Compensation Act, 1923)

IN THE MATTER OF:

[CLIENT_NAME], son/daughter of [FATHER_NAME],
aged [CLIENT_AGE] years, [OCCUPATION],
residing at [CLIENT_ADDRESS]                          ... CLAIMANT/WORKMAN

VERSUS

[EMPLOYER_NAME],
[having its office at] [EMPLOYER_ADDRESS]             ... RESPONDENT/EMPLOYER

CLAIM PETITION UNDER SECTION 10 OF THE EMPLOYEES' COMPENSATION ACT, 1923

MOST RESPECTFULLY SHOWETH:

1. That the Claimant was employed as a [DESIGNATION/WORKMAN — e.g., "construction worker / factory worker / driver"] with the Respondent/Employer at [WORKPLACE_ADDRESS] at a monthly wage of Rs. [WAGE_AMOUNT]/-.

2. ACCIDENT: On [ACCIDENT_DATE] at approximately [TIME], while the Claimant was in the course of employment at [ACCIDENT_PLACE], [DESCRIPTION OF ACCIDENT — e.g., "a heavy machine/load fell on the Claimant / the Claimant fell from a height of [X] feet / the Claimant was injured in a road accident while on official duty"]. The accident arose out of and in the course of employment.

3. INJURIES: As a result of the accident, the Claimant sustained the following injuries: [INJURY DETAILS — e.g., "fracture of the right leg / amputation of fingers / spinal injury / loss of eyesight"]. The Claimant was admitted to [HOSPITAL_NAME] on [DATE] and received treatment for [DURATION]. Medical records are annexed as Annexure C-1.

4. DISABILITY: The Claimant has suffered [PERMANENT TOTAL / PERMANENT PARTIAL / TEMPORARY] disability. Medical assessment by [DOCTOR_NAME] dated [ASSESSMENT_DATE] confirms [PERCENTAGE]% [disability / loss of earning capacity]. The Claimant is no longer able to [work in the same capacity / work at all] due to the injuries.

5. COMPENSATION CLAIMED:
   (a) Under Section 4(1)(b) of the Employees' Compensation Act, 1923, for Permanent Total Disability:
       Compensation = 50% × monthly wage × Relevant Factor (as per Schedule IV)
       = 50% × Rs. [WAGE]/- × [FACTOR] = Rs. [COMPENSATION_AMOUNT]/-
   (b) Medical expenses: Rs. [MEDICAL_EXPENSES]/-
   (c) Funeral expenses (if applicable): Rs. [AMOUNT]/-
   Total Claim: Rs. [TOTAL_CLAIM]/-

6. NON-PAYMENT: The Respondent has failed to pay any compensation to the Claimant despite the accident and injuries.

PRAYER:
It is most humbly prayed that this Hon'ble Commissioner be pleased to:
(a) Determine and award compensation of Rs. [TOTAL_CLAIM]/- to the Claimant under the Employees' Compensation Act, 1923;
(b) Award interest at 12% per annum on the compensation amount from [ACCIDENT_DATE];
(c) Levy penalty under Section 4A(3) of the Act for delayed payment;
(d) Pass such other order as this Commissioner may deem fit.

VERIFICATION:
I, [CLIENT_NAME], verify that the contents of this application are true to my knowledge.

Verified at [CITY] on [DATE].

Claimant: ________________________
[CLIENT_NAME]

Filed through:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY] | Tel: [LAWYER_PHONE]`,
  },

  // ── MISCELLANEOUS ─────────────────────────────────────────────────────────

  {
    id: 'land-acquisition-objection',
    name: 'Land Acquisition Objection Notice',
    category: 'other',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

OBJECTION PETITION UNDER SECTION 15 READ WITH SECTION 19 OF THE RIGHT TO FAIR COMPENSATION AND TRANSPARENCY IN LAND ACQUISITION, REHABILITATION AND RESETTLEMENT ACT, 2013

To,
The Land Acquisition Collector,
[DISTRICT/OFFICE_NAME],
[COLLECTOR_ADDRESS]

Subject: Objections to proposed land acquisition — Notification under Section 11 / Section 19 dated [NOTIFICATION_DATE], [NOTIFICATION_NO.]

Sir/Madam,

I, [CLIENT_NAME], son/daughter of [FATHER_NAME], aged [CLIENT_AGE] years, residing at [CLIENT_ADDRESS], the owner / co-owner of the land described herein, hereby file these objections to the proposed acquisition of my land under the above-mentioned Notification issued under the Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013 (hereinafter "the Act").

1. LAND DETAILS: The land proposed to be acquired bearing Survey No. [SURVEY_NO.], admeasuring [AREA], situated at [VILLAGE/LOCATION], [TALUK], [DISTRICT], stands in my name as evidenced by [TITLE DEED / REVENUE RECORDS / PAHANI] attached herewith.

2. OBJECTIONS:

   (a) PUBLIC PURPOSE NOT ESTABLISHED: The Notification does not satisfy the requirement of a valid "public purpose" as defined under Section 2(1) of the Act. [SPECIFY — e.g., "The land is being acquired for a private company's benefit, which does not meet the threshold requirements of Section 2(2)(b)"].

   (b) SOCIAL IMPACT ASSESSMENT DEFECTIVE: The Social Impact Assessment (SIA) required under Section 4 of the Act has not been properly conducted / published. The affected persons including the Objector were not consulted.

   (c) MULTI-CROP LAND: The land proposed to be acquired is irrigated multi-crop agricultural land. Acquisition of such land is subject to strict limitations under Section 10 of the Act, which have not been satisfied.

   (d) INADEQUATE COMPENSATION: The compensation proposed in the Notification does not meet the requirements of the Act and is far below the actual market value of the land, which is Rs. [MARKET_VALUE]/- per [unit]. The compensation should be 2×/4× the market value as per Section 26 and Section 30 of the Act.

   (e) REHABILITATION AND RESETTLEMENT: No adequate plan for Rehabilitation and Resettlement of the Objector and family has been prepared as required under Chapter V of the Act.

   (f) LESS RESTRICTIVE ALTERNATIVE: Adequate and suitable alternative government land is available at [LOCATION] which could serve the stated purpose without acquisition of private agricultural land.

3. The Objector requests a personal hearing before the Collector as provided under Section 15 of the Act.

PRAYER:
The Objector most respectfully requests:
(a) Drop the proposed acquisition of the Objector's land;
(b) If acquisition proceeds, determine just and adequate compensation in accordance with Sections 26–30 of the Act;
(c) Prepare and implement a proper R&R plan;
(d) Issue a speaking order on these objections.

Yours faithfully,

[CLIENT_NAME]
Date: [DATE]

Filed through:
[LAWYER_NAME], Advocate
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY] | Tel: [LAWYER_PHONE]`,
  },

  {
    id: 'ngt-complaint',
    name: 'NGT Environment Complaint',
    category: 'other',
    content: `[FIRM_NAME]
[LAWYER_ADDRESS], [CITY], [STATE]
Bar Council No.: [BAR_NUMBER]
Tel: [LAWYER_PHONE] | Email: [LAWYER_EMAIL]

Date: [DATE]

BEFORE THE NATIONAL GREEN TRIBUNAL
[PRINCIPAL BENCH, NEW DELHI / [ZONE] BENCH, [CITY]]

Application No. _______ of [YEAR]
(Under Section 14 / 15 / 18 of the National Green Tribunal Act, 2010)

IN THE MATTER OF:

[CLIENT_NAME], son/daughter of [FATHER_NAME],
aged [CLIENT_AGE] years, residing at [CLIENT_ADDRESS]  ... APPLICANT

VERSUS

1. [RESPONDENT_1 — POLLUTER/COMPANY/INDUSTRY_NAME]          ... RESPONDENT NO. 1
   [having its office at] [RESPONDENT_1_ADDRESS]
2. State Pollution Control Board, [STATE]                    ... RESPONDENT NO. 2
3. Ministry of Environment, Forest and Climate Change,
   Government of India, New Delhi                           ... RESPONDENT NO. 3
4. State of [STATE] through its Chief Secretary             ... RESPONDENT NO. 4

APPLICATION UNDER SECTION 14 OF THE NATIONAL GREEN TRIBUNAL ACT, 2010 FOR ENFORCEMENT OF ENVIRONMENTAL LAWS AND GRANT OF COMPENSATION FOR ENVIRONMENTAL DAMAGE

MOST RESPECTFULLY SHOWETH:

1. JURISDICTION: This Hon'ble Tribunal has jurisdiction under Section 14 of the NGT Act, 2010 to adjudicate disputes relating to substantial questions relating to environment, including enforcement of legal rights relating to environment and relief and compensation for damages.

2. APPLICANT'S LOCUS: The Applicant is a person aggrieved and is directly affected by the environmental damage/violation described herein. [In PIL: "The Applicant is a public-spirited citizen filing this application in the larger public interest."]

3. ENVIRONMENTAL VIOLATION:
   (a) The Respondent No. 1 is operating a [FACTORY/INDUSTRY/UNIT] at [LOCATION] engaged in [BUSINESS — e.g., "chemical manufacturing / stone crushing / brick kiln / waste disposal"].
   (b) The Respondent is discharging [EFFLUENTS/EMISSIONS/WASTE — e.g., "untreated industrial effluents into the [RIVER_NAME] / burning of [MATERIAL] releasing toxic fumes / illegally dumping solid/hazardous waste at [LOCATION]"].
   (c) The Respondent is operating without valid [CONSENT TO ESTABLISH / CONSENT TO OPERATE / ENVIRONMENTAL CLEARANCE] under the [Water (Prevention and Control of Pollution) Act, 1974 / Air (Prevention and Control of Pollution) Act, 1981 / Environment Protection Act, 1986].

4. DAMAGE CAUSED:
   (a) The pollution has [contaminated groundwater / river water / air quality] in the surrounding area of [RADIUS] km;
   (b) Residents in [VILLAGE/AREA] are suffering from [HEALTH IMPACTS — respiratory disease / skin disease / contaminated drinking water];
   (c) Agricultural land measuring [AREA] in the surrounding area has been rendered unfit for cultivation;
   (d) Local biodiversity and ecosystem have been severely damaged.

5. INACTION OF AUTHORITIES: Despite representations and complaints to the State Pollution Control Board on [DATE], no effective action has been taken against the Respondent.

6. STATUTORY VIOLATIONS: The Respondent's acts violate: Sections [__] of the Environment Protection Act, 1986; Water Act, 1974; Air Act, 1981; Hazardous Waste Rules, 2016; and applicable [STATE] pollution control norms.

PRAYER:
It is most humbly prayed that this Hon'ble Tribunal be pleased to:
(a) Issue notice to all Respondents and admit this Application;
(b) Direct immediate closure / suspension of operations of the Respondent No. 1 till environmental compliance is achieved;
(c) Direct the Respondent No. 1 to pay compensation of Rs. [COMPENSATION]/- for environmental damage, restoration costs, and harm to affected residents under Section 15 of the NGT Act;
(d) Direct Respondent Nos. 2 and 3 to conduct an independent environmental audit and submit report;
(e) Direct restoration of the affected environment within a time-bound period;
(f) Pass such other orders as this Tribunal may deem fit.

Respectfully submitted,

[LAWYER_NAME]
Advocate for Applicant
Bar Council No.: [BAR_NUMBER]
[FIRM_NAME], [CITY] | Tel: [LAWYER_PHONE]

Applicant: ________________________
[CLIENT_NAME]`,
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
