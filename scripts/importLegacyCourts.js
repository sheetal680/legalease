// Imports the courts that used to be hardcoded in the lawyer app's
// src/lib/courts.js into the courts reference table.
//
//   node scripts/importLegacyCourts.js           # dry run + classification report
//   node scripts/importLegacyCourts.js --apply   # upserts into `courts`
//
// CLASSIFICATION IS BY EXPLICIT TABLE, NOT BY PATTERN.
//
// Every court name reduces to a "kind" — the name with its trailing place and
// any parenthesised bench removed — and there are only 49 of those across the
// whole list. Each one is listed in KINDS below with the type it maps to.
// A kind that is not in the table imports with court_type NULL and is
// reported; it is never guessed at by a fallback regex.
//
// That matters more here than the tidiness of a regex: court_type decides
// which forms an advocate is shown. A court typed wrongly silently offers the
// wrong forms, which is worse than one typed NULL — NULL simply means the
// filter has nothing to narrow by, and every form stays reachable.

import { readFileSync } from 'fs'
import { createClient } from '@supabase/supabase-js'

const APPLY = process.argv.includes('--apply')
const COURTS_JS = 'D:/LegalEaseLawyer/src/lib/courts.js'

const DS = 'District & Subordinate'
const FC = 'Family Court'
const TS = 'Tribunal & Special'
const HC = 'High Court'

// kind -> court_type. `null` means "deliberately not typed" (see NOTE below).
const KINDS = {
  // ── the ordinary district judiciary ─────────────────────────────
  'Principal District & Sessions Court': DS,
  'District & Sessions Court': DS,
  'I Addl. District & Sessions Court': DS,
  'II Addl. District & Sessions Court': DS,
  'District Court': DS,
  'Chief Judicial Magistrate Court': DS,
  'I Addl. Chief Judicial Magistrate Court': DS,
  'Chief Metropolitan Magistrate Court': DS,
  'I Addl. Chief Metropolitan Magistrate Court': DS,
  'City Civil & Sessions Court': DS,
  'I Addl. City Civil & Sessions Court': DS,
  'City Civil Court': DS,
  'Principal City Civil Court': DS,
  'City Sessions Court': DS,

  // ── family ──────────────────────────────────────────────────────
  'Family Court': FC,
  'I Addl. Family Court': FC,

  // ── tribunals and special fora ──────────────────────────────────
  'Consumer Disputes Redressal Commission': TS,   // the post-2019 Consumer Forum
  'MACT': TS,                                      // Motor Accidents Claims Tribunal
  'Motor Accidents Claims Tribunal': TS,
  'Permanent Lok Adalat': TS,
  'Debt Recovery Tribunal': TS,
  'Industrial Tribunal': TS,

  // NOTE — deliberately left NULL, not typed:
  // A Labour Court (and an Industrial Court) is constituted under s.7 of the
  // Industrial Disputes Act. It is neither part of the district judiciary nor
  // named a tribunal, and it is not in the list of special fora this import
  // was told to recognise. Calling it Tribunal & Special is a reasonable
  // reading, but it is a reading — so it is reported instead of assumed.
  'Labour Court': null,
  'Industrial Court': null,

  // ── High Courts ─────────────────────────────────────────────────
  'High Court of Andhra Pradesh': HC,
  'High Court of Telangana': HC,
  'High Court of Karnataka': HC,
  'High Court of Gujarat': HC,
  'High Court of Madras': HC,
  'High Court of Allahabad (Principal Bench)': HC,
  'Madurai Bench of Madras High Court': HC,
  'Bombay High Court': HC,
  'Bombay High Court (Goa Bench)': HC,
  'Delhi High Court': HC,
  'Calcutta High Court': HC,
  'Kerala High Court': HC,
  'Allahabad High Court': HC,
  'Rajasthan High Court': HC,
  'Rajasthan High Court (Principal Bench)': HC,
  'MP High Court': HC,
  'MP High Court (Principal Bench)': HC,
  'Punjab & Haryana High Court': HC,
  'Patna High Court': HC,
  'Orissa High Court': HC,
  'Gauhati High Court': HC,
  'Jharkhand High Court': HC,
  'Himachal Pradesh High Court': HC,
  'Uttarakhand High Court': HC,
  'Chhattisgarh High Court': HC,
}

// The kind is the name minus a trailing parenthesised bench and minus the
// trailing ", <place>". "Principal District & Sessions Court, Krishna
// (Vijayawada)" -> "Principal District & Sessions Court".
function kindOf(name) {
  const noBench = name.replace(/\s*\([^)]*\)\s*$/, '').trim()
  // A High Court's bench parenthesis is part of its identity, so try the full
  // name first and only strip when that is not a known kind.
  if (KINDS[name] !== undefined) return name
  if (KINDS[noBench] !== undefined) return noBench
  const noPlace = noBench.replace(/,[^,]*$/, '').trim()
  return noPlace
}

const titleCase = s => s.replace(/\S+/g, w => w[0].toUpperCase() + w.slice(1))

// ── read the legacy map ────────────────────────────────────────────
const src = readFileSync(COURTS_JS, 'utf8')
const head = src.slice(0, src.indexOf('export function'))
const body = head.slice(head.indexOf('{'), head.lastIndexOf('}') + 1)
// eslint-disable-next-line no-eval
const MAP = eval('(' + body + ')')

const seen = new Set()
const rows = []
const untyped = []
for (const [city, courts] of Object.entries(MAP)) {
  const area = titleCase(city)
  for (const court_name of courts) {
    const key = `${court_name}\u0000${area}`
    if (seen.has(key)) continue        // same court listed twice under one city
    seen.add(key)
    const kind = kindOf(court_name)
    const court_type = KINDS[kind] ?? null
    if (court_type === null) untyped.push({ court_name, area, kind })
    rows.push({ court_name, area, court_type })
  }
}

const byType = {}
rows.forEach(r => { const k = r.court_type || '(not typed)'; byType[k] = (byType[k] || 0) + 1 })

console.log(APPLY ? '=== APPLYING ===\n' : '=== DRY RUN (nothing written) ===\n')
console.log(`Courts found in the legacy list: ${rows.length} (across ${Object.keys(MAP).length} areas)\n`)
console.log('| court_type | courts |')
console.log('|---|---|')
Object.entries(byType).sort((a, b) => b[1] - a[1])
  .forEach(([t, n]) => console.log(`| ${t} | ${n} |`))

if (untyped.length) {
  const kinds = [...new Set(untyped.map(u => u.kind))]
  console.log(`\nNOT TYPED — imported with court_type NULL (${untyped.length} courts, ${kinds.length} kind(s)):`)
  kinds.forEach(k => {
    const ex = untyped.filter(u => u.kind === k)
    console.log(`  ${k} — ${ex.length} courts, e.g. "${ex[0].court_name}"`)
  })
}

if (!APPLY) { console.log('\nRe-run with --apply to import.'); process.exit(0) }

const env = Object.fromEntries(
  readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
    .split(/\r?\n/).filter(l => l.includes('=') && !l.trim().startsWith('#'))
    .map(l => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')] })
)
const supabase = createClient(env.VITE_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)

let done = 0
for (let i = 0; i < rows.length; i += 200) {
  const chunk = rows.slice(i, i + 200)
  const { error } = await supabase.from('courts').upsert(chunk, { onConflict: 'court_name,area' })
  if (error) { console.error(`  chunk ${i}: ${error.message}`); continue }
  done += chunk.length
}
const { count } = await supabase.from('courts').select('*', { count: 'exact', head: true })
console.log(`\nUpserted ${done} rows. Courts table now holds ${count}.`)
