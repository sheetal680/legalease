// Per-template table of which autofill fields actually resolve in the rendered
// document, for a real client under both party types.
// Usage: node --env-file=.env.local scripts/reportAutofillCoverage.js

import { client } from './lib/tagTemplates.js'

const GROUPS = {
  'court':    ['[COURT_NAME]'],
  'place':    ['[COURT_PLACE]'],
  'case no':  ['[CASE_NUMBER]'],
  'client':   ['[CLIENT_NAME]', '[CLIENT_NAME_IF_PETITIONER]', '[CLIENT_NAME_IF_RESPONDENT]', '[CLIENT_ADDRESS]'],
  'party':    ['[PARTY_TYPE]'],
  'advocate': ['[ADVOCATE_NAME]', '[ADVOCATE_ADDRESS]', '[FIRM_NAME]', '[BAR_NUMBER]'],
  'date':     ['[DATE]', '[DAY]', '[MONTH]', '[YEAR]', '[YEAR_LAST]'],
}

const supabase = client()
const { data: clients } = await supabase.from('clients').select('*').ilike('full_name', '%shwin%')
const { data: templates } = await supabase.from('admin_templates').select('name, content').order('name')
const c = clients[0]

const head = ['court', 'place', 'case no', 'client', 'party', 'advocate', 'date']
const width = Math.min(62, Math.max(...templates.map(t => t.name.length)))
console.log('template'.padEnd(width) + '  ' + head.map(h => h.padEnd(8)).join(''))
console.log('-'.repeat(width + 2 + head.length * 8))

const totals = Object.fromEntries(head.map(h => [h, 0]))
for (const t of templates) {
  const cells = head.map(g => {
    const toks = GROUPS[g]
    const present = toks.filter(tok => t.content.includes(tok))
    if (!present.length) return '–'
    // Does it actually produce a value for this client under either party type?
    const resolves = present.some(tok => {
      if (tok === '[CLIENT_NAME_IF_PETITIONER]' || tok === '[CLIENT_NAME_IF_RESPONDENT]') return true
      if (tok === '[COURT_NAME]') return !!c.court_name
      if (tok === '[COURT_PLACE]') return !!c.court_place
      if (tok === '[CASE_NUMBER]') return !!c.case_number
      if (tok === '[PARTY_TYPE]') return !!c.party_type
      if (tok.startsWith('[CLIENT')) return !!c.full_name
      return true
    })
    if (resolves) totals[g]++
    return resolves ? 'yes' : 'NO'
  })
  console.log(t.name.slice(0, width).padEnd(width) + '  ' + cells.map(x => x.padEnd(8)).join(''))
}
console.log('-'.repeat(width + 2 + head.length * 8))
console.log('resolving'.padEnd(width) + '  ' + head.map(h => String(totals[h]).padEnd(8)).join(''))
console.log(`\n${templates.length} templates.  "–" = the printed form has no slot for that field.`)
