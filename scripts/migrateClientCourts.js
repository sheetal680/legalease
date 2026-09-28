// Matches each client's free-text court against the courts reference table and
// fills in court_type / court_area / court_place.
//
//   node scripts/migrateClientCourts.js           # dry run, changes nothing
//   node scripts/migrateClientCourts.js --apply   # writes the confident matches
//
// Only two shapes count as a match:
//   1. the client text equals a reference court_name exactly
//   2. the client text is "<court_name> (<area>)", the form the old picker used
// Anything else is reported and left alone. A court is the thing that decides
// where a document is filed — a near-miss guessed here would be silent and
// wrong in a filed document.

import { readFileSync } from 'fs'
import { createClient } from '@supabase/supabase-js'

const APPLY = process.argv.includes('--apply')

const env = Object.fromEntries(
  readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
    .split(/\r?\n/)
    .filter(l => l.includes('=') && !l.trim().startsWith('#'))
    .map(l => {
      const i = l.indexOf('=')
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')]
    })
)
const supabase = createClient(env.VITE_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)

const norm = s => (s || '').replace(/\s+/g, ' ').trim().toLowerCase()

const { data: courts, error: cErr } = await supabase
  .from('courts').select('court_type, court_name, area')
if (cErr) { console.error(cErr.message); process.exit(1) }

const { data: clients, error: clErr } = await supabase
  .from('clients').select('id, full_name, court_name, court_place, court_type, court_area')
  .order('created_at')
if (clErr) { console.error(clErr.message); process.exit(1) }

function findCourt(text) {
  const t = norm(text)
  if (!t) return null
  for (const c of courts) {
    if (norm(c.court_name) === t) return { court: c, how: 'exact name' }
    if (norm(`${c.court_name} (${c.area})`) === t) return { court: c, how: 'name (area)' }
  }
  return null
}

const matched = [], unmatched = [], noCourt = []
for (const cl of clients) {
  if (!norm(cl.court_name)) { noCourt.push(cl); continue }
  const hit = findCourt(cl.court_name)
  if (hit) matched.push({ client: cl, ...hit })
  else unmatched.push(cl)
}

console.log(APPLY ? '=== APPLYING ===\n' : '=== DRY RUN (nothing written) ===\n')

console.log(`MATCHED (${matched.length}) — court_type + court_area added, existing text untouched:`)
for (const m of matched) {
  console.log(`  ${m.client.full_name}`)
  console.log(`      text : ${m.client.court_name}`)
  console.log(`      ->   : ${m.court.court_type} | ${m.court.court_name} | ${m.court.area}   (${m.how})`)
}

console.log(`\nNOT MATCHED (${unmatched.length}) — left exactly as they are:`)
for (const c of unmatched) {
  console.log(`  ${c.full_name}: "${c.court_name}" (place: ${c.court_place || '—'})`)
}

console.log(`\nNO COURT RECORDED (${noCourt.length}) — nothing to match:`)
for (const c of noCourt) console.log(`  ${c.full_name}`)

if (!APPLY) {
  console.log('\nRe-run with --apply to write the matched rows.')
  process.exit(0)
}

let written = 0
for (const m of matched) {
  // Strictly additive: only the two new columns are written. court_name and
  // court_place are left exactly as the advocate typed them, because they are
  // what [COURT_NAME] and [COURT_PLACE] render into documents. Normalising
  // "… West Godavari (Bhimavaram)" down to the reference name would quietly
  // drop the sitting place out of every future cause title for that client.
  const { error } = await supabase.from('clients').update({
    court_type: m.court.court_type,
    court_area: m.court.area,
  }).eq('id', m.client.id)
  if (error) console.error(`  FAILED ${m.client.full_name}: ${error.message}`)
  else written++
}
console.log(`\nUpdated ${written} of ${matched.length} client(s).`)
