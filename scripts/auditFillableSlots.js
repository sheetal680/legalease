// Inverted autofill audit.
//
// The earlier audit asked "does every token that exists resolve?" — which can
// never see a slot that SHOULD carry a token but doesn't. Those render as an
// empty gap and read as correctly blank. This asks the opposite question:
//
//   render each template with a real client, a real advocate and today's date,
//   with every manual question filled by a sentinel, then look for printed
//   labels that are still followed by a gap.
//
// Anything it reports is a slot the app could fill but isn't filling. The
// sentinel is what makes this work: it means a gap left by an unanswered
// Details question can be told apart from a genuinely missing token.
//
// Usage: node --env-file=.env.local scripts/auditFillableSlots.js

import { client } from './lib/tagTemplates.js'

const SENTINEL = '‹Q›'   // ‹Q› — a filled manual answer

// Labels that sit next to data the app already holds. `covered` names the
// value whose presence nearby means the slot is already filled.
//
// Party-role words (Petitioner / Respondent / వాది …) are deliberately NOT
// labels: on these forms they are right-aligned captions beside or above the
// name line, not blanks in their own right. Treating them as blanks is what
// buried the real findings in false positives on the first pass.
const LABELS = [
  { field: 'court name',  covered: 'court_name',  re: /(?:In|IN) [Tt]he [Cc]ourt [Oo][Ff] [Tt][Hh][Ee]|COURT OF THE HON'BLE|కోర్టులో/g },
  { field: 'court place', covered: 'court_place', re: /(?:^|\s)(?:At|AT)[.:]?(?=\s|$)/gm },
  { field: 'case number', covered: 'case_number', re: /(?:Suit No|O\.\s?S\.?C?\.?\s?No\.|C\.C\.No|M\.C\. No|E\.P\.\s?No\.|I\.A\.\s?[Nn]o\.|O\.P\.?\s?No|D\.OP|Cril?\.\s?M\.P\.\s?No|Original Suit No|Suti Number)/g },
  { field: 'client name', covered: 'full_name',   re: /(?:^\s*Between\b|^\s*BETWEEN\b|^\s*To[.:]?\s*$)/gm },
  { field: 'date',        covered: 'today',       re: /(?:Dated this|^\s*Date\s*[:}]|^\s*Dt\s*:|Given under)/gm },
]

// What counts as "still blank" right after a label.
const GAP = /^(?:&nbsp;|\s){2,}(?:$|\.{3,}|_{3,})|^(?:&nbsp;|\s)*(?:\.{4,}|_{4,})|^(?:&nbsp;|\s){3,}|^\s*[}]?\s*$/

function renderPlain(html, ctx) {
  const fmt = v => v || ''
  const now = new Date()
  const today = now.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  const map = {
    '[ADVOCATE_NAME]': fmt(ctx.advocate.full_name), '[FIRM_NAME]': fmt(ctx.advocate.firm_name),
    '[ADVOCATE_ADDRESS]': fmt(ctx.advocate.address), '[ADVOCATE_PHONE]': fmt(ctx.advocate.phone),
    '[ADVOCATE_EMAIL]': fmt(ctx.advocate.email), '[BAR_NUMBER]': fmt(ctx.advocate.bar_council_number),
    '[CLIENT_NAME]': fmt(ctx.client.full_name), '[CLIENT_ADDRESS]': fmt(ctx.client.address),
    '[CLIENT_PHONE]': fmt(ctx.client.phone), '[CLIENT_EMAIL]': fmt(ctx.client.email),
    '[CASE_NUMBER]': fmt(ctx.client.case_number), '[PARTY_TYPE]': fmt(ctx.client.party_type),
    '[COURT_PLACE]': fmt(ctx.client.court_place), '[COURT_NAME]': fmt(ctx.client.court_name),
    '[DATE]': today, '[TODAY]': today, '[DAY]': String(now.getDate()),
    '[MONTH]': now.toLocaleDateString('en-IN', { month: 'long' }),
    '[YEAR]': String(now.getFullYear()), '[YEAR_LAST]': String(now.getFullYear()).slice(3),
  }
  const pt = ctx.client.party_type || ''
  map['[CLIENT_NAME_IF_PETITIONER]'] = pt === 'Plaintiff' ? fmt(ctx.client.full_name) : ''
  map['[CLIENT_NAME_IF_RESPONDENT]'] = pt === 'Defendant' ? fmt(ctx.client.full_name) : ''
  for (const tok of ctx.manualTokens) map[tok] = SENTINEL

  let r = html
  for (const [k, v] of Object.entries(map)) r = r.split(k).join(v)
  r = r.replace(/\[[A-Z_][A-Z0-9_]*\]/g, '')
  return r.replace(/<\/(p|h1|h2|h3|div)>/g, '\n').replace(/<[^>]+>/g, '')
          .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
          .split('\n').map(l => l.replace(/\s+$/, ''))
}

async function main() {
  const supabase = client()
  const { data: clients } = await supabase.from('clients').select('*').ilike('full_name', '%shwin%')
  const { data: profiles } = await supabase.from('advocate_profiles').select('*').limit(1)
  const { data: templates } = await supabase
    .from('admin_templates').select('name, content, manual_fields').order('name')

  const ctx = { client: clients[0], advocate: profiles[0] || {}, manualTokens: [] }
  if (!ctx.client) { console.error('No test client found'); process.exit(1) }

  let totalGaps = 0
  const report = []

  for (const t of templates) {
    ctx.manualTokens = (t.manual_fields || []).map(f => f.token)
    // A "Between ___" slot fed by [CLIENT_NAME_IF_PETITIONER] is correctly
    // blank for a Defendant client and vice versa. Rendering under both party
    // types and intersecting the results removes that whole false-positive
    // class: only a slot blank under BOTH is genuinely missing a token.
    const perParty = ['Plaintiff', 'Defendant'].map(pt =>
      renderPlain(t.content, { ...ctx, client: { ...ctx.client, party_type: pt } }))
    const lines = perParty[0]
    const gaps = []

    const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    const thisMonth = new Date().toLocaleDateString('en-IN', { month: 'long' })
    const values = {
      court_name: ctx.client.court_name, court_place: ctx.client.court_place,
      case_number: ctx.client.case_number, full_name: ctx.client.full_name,
      today,
    }

    lines.forEach((line, n) => {
      for (const { field, re, covered } of LABELS) {
        re.lastIndex = 0
        let m
        while ((m = re.exec(line))) {
          const after = line.slice(m.index + m[0].length)
          if (!(after.trim() === '' || GAP.test(after))) continue

          // Covered if the value this label calls for already appears in the
          // immediate neighbourhood — many forms print the caption on one line
          // and the value on the next.
          const nearIn = ls => ls.slice(Math.max(0, n - 1), n + 3).join(' ')
          const val = values[covered]
          // Covered if the value appears nearby under EITHER party type.
          if (val && perParty.some(ls => nearIn(ls).includes(val))) continue
          // A date slot is covered by a day number plus this month's name —
          // forms that print "___ day of ___" fill it from [DAY] and [MONTH]
          // rather than from one formatted [DATE].
          if (covered === 'today' && perParty.some(ls => {
                const near = nearIn(ls)
                return /\d/.test(near) && near.includes(thisMonth)
              })) continue
          const near = nearIn(lines)
          if (ctx.manualTokens.length && near.includes(SENTINEL) && field !== 'date') {
            // A manual question already answers this spot.
            if (after.includes(SENTINEL) || after.trim() === '') continue
          }

          gaps.push({ line: n + 1, field, label: m[0].trim(), text: line.trim().slice(0, 78) })
        }
      }
    })

    if (gaps.length) {
      totalGaps += gaps.length
      report.push({ name: t.name, gaps })
    }
  }

  console.log('=== EMPTY SLOTS: a printed label the app could fill, but no token ===')
  for (const r of report) {
    console.log('\n' + r.name)
    for (const g of r.gaps) console.log(`   L${String(g.line).padStart(3)}  ${g.field.padEnd(11)} "${g.label}"   ${JSON.stringify(g.text)}`)
  }
  console.log(`\n${templates.length} templates, ${report.length} with candidate gaps, ${totalGaps} candidates total`)

  // ── Mis-mapped slots ────────────────────────────────────────────
  // The gap scan above can only see a slot with NO token. It is blind to a
  // slot holding the WRONG token — which is how "E.P. No. OS/532/2026" (the
  // suit number in the execution-petition slot) survived every earlier pass.
  //
  // Detection: if an autofill token sits directly after a printed label, and
  // the same template declares a manual question whose printedLabel is that
  // same label, then the form is answering that label two different ways.
  console.log('\n=== MIS-MAPPED SLOTS: autofill token under a label owned by a question ===')
  let misMaps = 0
  const AUTO = ['[CASE_NUMBER]', '[COURT_NAME]', '[COURT_PLACE]', '[CLIENT_NAME]', '[PARTY_TYPE]']
  for (const t of templates) {
    const fields = t.manual_fields || []
    const labelled = fields.filter(f => f.printedLabel)
    if (!labelled.length) continue
    for (const tok of AUTO) {
      let i = -1
      while ((i = t.content.indexOf(tok, i + 1)) !== -1) {
        const before = t.content.slice(Math.max(0, i - 40), i)
          .replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim()
        for (const f of labelled) {
          if (!before.endsWith(f.printedLabel)) continue
          misMaps++
          console.log(`\n${t.name}`)
          console.log(`   "${f.printedLabel}" is the printed label for the question ${f.token} ("${f.label}"),`)
          console.log(`   but this slot is filled by ${tok}:  …${before.slice(-30)}▮${tok}`)
        }
      }
    }
  }
  console.log(`\n${misMaps} mis-mapped slot(s)`)
  console.log('\n(both lists are candidates — each needs judging)')
}

main()
