// Seeds the courts reference table from scripts/data/courts.js.
//
//   node scripts/seedCourts.js
//
// Safe to re-run: rows are upserted on (court_name, area), so adding a court to
// the data file and running this again inserts only the new one. It never
// deletes, so a court removed from the data file stays in the table until it is
// taken out deliberately — clients may already be pointing at it.

import { readFileSync } from 'fs'
import { createClient } from '@supabase/supabase-js'
import { COURTS, COURT_TYPES } from './data/courts.js'

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

// Fail loudly before touching the database rather than letting Postgres reject
// one row midway and leave the seed half applied.
const bad = COURTS.filter(([, type]) => !COURT_TYPES.includes(type))
if (bad.length) {
  console.error('Invalid court_type on these rows:')
  bad.forEach(([name, type]) => console.error(`  ${name} -> "${type}"`))
  console.error('\nAllowed:', COURT_TYPES.join(' | '))
  process.exit(1)
}

const rows = COURTS.map(([court_name, court_type, area]) => ({ court_name, court_type, area }))

const { data, error } = await supabase
  .from('courts')
  .upsert(rows, { onConflict: 'court_name,area' })
  .select('court_name, court_type, area')

if (error) {
  console.error('Seed failed:', error.message)
  process.exit(1)
}

console.log(`Seeded ${data.length} court(s).\n`)
const { data: all } = await supabase
  .from('courts')
  .select('court_type, court_name, area')
  .order('court_type')
  .order('area')

const width = Math.max(...all.map(c => c.court_type.length))
all.forEach(c => console.log(`  ${c.court_type.padEnd(width)}  ${c.court_name} — ${c.area}`))
console.log(`\nTotal in table: ${all.length}`)
