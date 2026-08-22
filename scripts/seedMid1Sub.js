// Seeds three more scanned court forms into admin_templates.
//
//   MID1SUB/20260819230553 -> Vakalath, Form No. 121 / Rule No. 276-A   2 pages
//   MID1SUB/20260819230653 -> Notice, Hindu Marriage Act 1955 (Nazar)   1 page
//   MID1SUB/20260819230701 -> Notice, Order 21 Rule 54 (1A)             1 page
//
// Usage: node --env-file=.env.local scripts/seedMid1Sub.js
//
// The last two are DISTINCT PRINTINGS of forms already in the table, not
// duplicates - they differ in wording, year stub and signatory, so they get
// their own names rather than overwriting the existing rows:
//   * HMA notice: this printing reads "200", "agaisnt", "intructed", "ALSO",
//     "appearance", "statement" and is signed NAZAR; the seeded one reads
//     "202", "Petioner", "Specilty", "paaearance", "intructee", "Al so",
//     "statemen" and is unsigned.
//   * O.21 R.54 notice: this printing reads "it is ordersd that you the
//     said", "prohibitedand", carries "Proclemation of sale." on its own
//     line and is signed "Dv. NAZAP"; the seeded one reads "It is ordersd
//     that theyou said" and is signed "Dv. NAZAR".
//
// Reuses existing renderer capabilities: per-side margins, per-template
// typeface with per-run script fallback (the Vakalath mixes an English
// masthead with a Telugu body), elastic dot leaders, whitespace-run
// preservation and hard page breaks.
//
// NOTE: the Telugu body of the Vakalath was transcribed from an image-only
// scan (no text layer) and is worth a proofread against the paper original.

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
const PAGE_BREAK = '<div data-page-break="true" style="page-break-before: always;"></div>'

// -- Vakalath - Form No. 121, Rule No. 276-A ------------------------
const vakalath = `
<div data-page-margin="66 47 40 36"></div>
<div data-page-font="telugu"></div>
<p><u>Form No. 121</u>${sp(28)}<strong>వకాలత్</strong></p>
<p>Rule No. 276-A</p>
<h2><strong>In the Court of the</strong> [COURT_NAME]</h2>
<p style="margin-left:26%;">No.${sp(2)}[CASE_NUMBER]${sp(24)}of 202[YEAR_LAST]${sp(18)}Plaintiff</p>
<p>Between${sp(4)}[CLIENT_NAME_IF_PETITIONER]${sp(40)}Petitioner</p>
${GAP(3)}
<p style="text-align:center;">And${sp(4)}[CLIENT_NAME_IF_RESPONDENT]</p>
${GAP(3)}
<p>మహారాజశ్రీ${sp(52)}Defendant</p>
<p style="text-align:right;">Respondant</p>
<p style="text-align:right;">వారికి</p>
<p style="text-align:justify;">${sp(8)}నేను / మేము వ్రాయించి యుచ్చిన వకాలత్తునామా యేమంటే మీరు నా / మా తరపున సదరు కోర్టులో హాజరైదాఖలు చేయవలసిన పత్రాలను దాఖలు చేసి యావత్తు వ్యవహారములు పూర్తిగా జరిపించగలందులకున్ను, ఎగ్జిక్యూషన్ నెరవేర్చగలందులకున్ను, వ్యాజ్యమునందుగాని తర్వాత గాని కోర్టు నుంచి నా / మాకు రావలసిన సొమ్ము పైకము దస్తావేజులు వగైరాలను పుచ్చుకోగలందులకున్ను, రాజీనామా విత్‌డ్రా పిటిషన్ దాఖలు చేయుటకున్ను, నకళ్ళు వగైరా యావత్తు పనులు జరిపించుటకు మిమ్ములను వకీలుగా నియమించుకున్నాను/ము.</p>
<p style="text-align:justify;">${sp(8)}సదరు వ్యాజ్యము కోర్టులో పైసలు అయ్యేవరకు దీనికి సంబంధించిన అప్పీలు డివిజన్ పిటిషనులతో పైన అందుల గురించి మీరు, మీవల్ల నియమించబడే మరియే ప్లీడరుగాని జరిపించే యావత్తు కార్యములునున్ను స్వయంగా నేను/మేము జరిపించుకొనుసునట్లు ఒప్పుకొనుచున్నాను/ము. సదరు దావాలో కోర్టు నుండి మాకు రావలసిన దస్తావేజులు,సొమ్ము తీసుకొనుటకు సి||పి||సి|| 3 ఆర్డరు 4 రూల్స్ ప్రకారం ఇందు మూలముగా మీకు అధికారమివ్వడమైనది.</p>
<p style="text-align:justify;">${sp(8)}ఇందువల్ల మీతో ఏర్పాటు చేసుకొన్న ప్రకారము ఫీజులున్ను జైతు ఫీజులున్నూ యావత్తు పైకము మీ లెక్క ప్రకారము యివ్వగలవాడను/ము. అట్లు ఇవ్వనంతట మీరు హాజరు కావలసిన నిర్భందము లేదు.</p>
${GAP(6)}
<p style="text-align:justify;">ఈ వకాలత్తునామా నా యెదుట సంతకముదారునకు చదివి వినిపించబడి (లేక నా యెదుట తర్జుమా చేసి తెలియచెప్పబడి యితనికి తెలిసినట్లుగా ఏర్పడినందున) వారి చేవ్రాలు / చేతిగుర్తు నా యెదుటవేయబడినది.</p>
${GAP(3)}
<p>Date${dots(24)}${sp(40)}Advocate [ADVOCATE_NAME]</p>
${PAGE_BREAK}
<p style="margin-left:46%;"><strong>In the Court of the</strong> [COURT_NAME]</p>
${GAP(4)}
<p style="margin-left:52%;">No.${sp(2)}[CASE_NUMBER]${sp(10)}of 202[YEAR_LAST]</p>
${GAP(9)}
<h2 style="margin-left:46%;"><strong>VAKALATNAMA</strong></h2>
<p>&nbsp;</p>
<p style="margin-left:48%;">Filed for behalf of the</p>
${GAP(10)}
<p style="margin-left:44%;">________</p>
<p style="margin-left:44%;">Address for Service : [ADVOCATE_ADDRESS]</p>
`.trim().replace(/\n/g, '')

// -- Notice - Hindu Marriage Act, 1955 (Nazar printing) -------------
const hmaNazar = `
<div data-page-margin="64 73 40 57"></div>
<div data-page-font="helvetica"></div>
<p><strong>IN THE COURT OF THE</strong>${sp(30)}${dots(28)}</p>
<p style="margin-left:26%;"><strong>O.P.No.</strong>${sp(4)}[CASE_NUMBER]${sp(38)}<strong>of</strong> 200</p>
<p style="text-align:center;"><strong>(In the matter of Hindu Marriage Act, 1955)</strong></p>
<p>Between${sp(4)}[CLIENT_NAME_IF_PETITIONER]${sp(40)}Petitioner</p>
${GAP(2)}
<p style="text-align:center;">AND</p>
${GAP(2)}
<p>${sp(4)}[CLIENT_NAME_IF_RESPONDENT]${sp(40)}Respondent</p>
${GAP(10)}
<p style="text-align:justify;">${sp(6)}Whereas on the ${dots(24)} day of ${dots(16)} 200${dots(4)} the above named petitioner filed a petition agaisnt the Respondent for ${dots(34)} ${dots(8)} (Specify the relief) you are hereby required to appear in the Court on the ${dots(26)} day of ${dots(20)} 200${dots(20)} in the forenoon in Person or by pleader duly intructed and able to answer all the materials questions related to the above proceedings.</p>
<p style="text-align:justify;">ALSO take notice in default of your appearance on the aforesaid day. The issue will be settled and the petition herad and determined in your absence.${sp(2)}You shall also bring will you or send by your pleader and document which the petitioner desires to inspect and any document on which you inteno to rely in support of your defence.${sp(2)}You are requried to fill a written statement in Court on or before the ${dots(20)} day of ${dots(14)} 200 ${dots(18)}</p>
<p style="text-align:justify;">${sp(6)}Given under my hand and the seal of the Court, this the day of : ${dots(28)}</p>
<p>200${dots(4)} ${dots(20)}</p>
<p>&nbsp;</p>
<p style="text-align:right;">NAZAR</p>
`.trim().replace(/\n/g, '')

// -- Notice - Order 21 Rule 54 (1A) (Proclemation printing) ---------
const noticeR54Nazap = `
<div data-page-margin="136 82 40 76"></div>
<div data-page-font="helvetica"></div>
<h2 style="text-align:center;"><strong>NOTICE</strong></h2>
<p style="text-align:center;">Order 21 Rule 54 (1A)</p>
<p>In the Court of the [COURT_NAME]</p>
<p style="margin-left:20%;">E.P.${sp(30)}In O.S${sp(28)}D H R</p>
<p style="text-align:right;">Plaintiff</p>
<p>${sp(4)}[CLIENT_NAME_IF_PETITIONER]</p>
${GAP(2)}
<p style="text-align:right;">J D R</p>
<p style="text-align:right;">Defandent</p>
<p>${sp(4)}[CLIENT_NAME_IF_RESPONDENT]</p>
${GAP(9)}
<p>${sp(6)}Whereas you have failed to satisfy devree passed against you on the</p>
<p style="margin-left:12%;">day of${sp(20)}202[YEAR_LAST]${sp(10)}Suit No.${sp(4)}[CASE_NUMBER]${sp(10)}in favour of</p>
<p style="margin-left:44%;">for Rs.</p>
<p style="text-align:right;">he and you are hereby</p>
<p style="text-align:justify;">it is ordersd that you the said${sp(2)}prohibitedand restrain until the further order of the Court from transferring or Charging the Property specified in the scheduled here under annexed by sale gift or otherwise and that a persons and that they are hereby prohibited from receiving the sarle day purchase, gift or otherwise. It is also ordered that you should attend Court on the${sp(6)}day of${sp(6)}202[YEAR_LAST]${sp(4)}To take notice of the date fix for setting the terms of the</p>
<p>Proclemation of sale.</p>
<p>Given under my hand and the seal of the Court${sp(12)}day of${sp(12)}202[YEAR_LAST]</p>
<p>&nbsp;</p>
<p>Warrant Amount :</p>
<p>&nbsp;</p>
<p>Hearing Date :${sp(40)}By Order</p>
<p>&nbsp;</p>
<p style="text-align:right;">Dv. NAZAP</p>
`.trim().replace(/\n/g, '')

const templates = [
  { name: 'వకాలత్ / Vakalath (Form No. 121, Rule No. 276-A)', content: vakalath },
  { name: 'Notice (Hindu Marriage Act, 1955) - Nazar printing', content: hmaNazar },
  { name: 'Notice (Order 21 Rule 54 (1A)) - Proclemation of sale printing', content: noticeR54Nazap },
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
