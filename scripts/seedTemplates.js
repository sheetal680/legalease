/**
 * LegalEase — Template Seeder
 *
 * Inserts all 21 built-in legal templates into the Supabase `templates` table
 * using the service role key (bypasses Row-Level Security).
 *
 * Usage:  npm run seed
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env.local (alongside the other vars).
 *
 * Safe to re-run: clears existing templates before inserting fresh.
 */

import { readFileSync } from 'fs'
import { createClient } from '@supabase/supabase-js'
import { templates } from '../src/templates/templateContent.js'

// ─── Load .env.local ──────────────────────────────────────────────────────────

function loadEnvFile(filePath = '.env.local') {
  try {
    const raw = readFileSync(filePath, 'utf8')
    for (const line of raw.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eqIdx = trimmed.indexOf('=')
      if (eqIdx === -1) continue
      const key = trimmed.slice(0, eqIdx).trim()
      const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '')
      if (key && !(key in process.env)) process.env[key] = val
    }
  } catch {
    // .env.local not found — fall through and rely on process.env
  }
}

loadEnvFile()

// ─── Validate environment ─────────────────────────────────────────────────────

const SUPABASE_URL      = process.env.VITE_SUPABASE_URL
const SERVICE_ROLE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY

const missing = []
if (!SUPABASE_URL)     missing.push('VITE_SUPABASE_URL')
if (!SERVICE_ROLE_KEY) missing.push('SUPABASE_SERVICE_ROLE_KEY')

if (missing.length > 0) {
  console.error('\n❌  Missing required environment variables:')
  missing.forEach(v => console.error(`     ${v}`))
  console.error('\n   Add them to .env.local and try again.')
  console.error('   See scripts/README.md for instructions.\n')
  process.exit(1)
}

// ─── Supabase admin client ────────────────────────────────────────────────────

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
})

// ─── Helpers ──────────────────────────────────────────────────────────────────

const RESET  = '\x1b[0m'
const GREEN  = '\x1b[32m'
const RED    = '\x1b[31m'
const YELLOW = '\x1b[33m'
const CYAN   = '\x1b[36m'
const BOLD   = '\x1b[1m'
const DIM    = '\x1b[2m'

function ok(msg)   { console.log(`  ${GREEN}✓${RESET}  ${msg}`) }
function fail(msg) { console.log(`  ${RED}✗${RESET}  ${msg}`) }
function info(msg) { console.log(`  ${CYAN}→${RESET}  ${msg}`) }
function warn(msg) { console.log(`  ${YELLOW}⚠${RESET}  ${msg}`) }
function hr()      { console.log(`${DIM}${'─'.repeat(60)}${RESET}`) }

// ─── Main ─────────────────────────────────────────────────────────────────────

async function seed() {
  console.log()
  console.log(`${BOLD}  LegalEase — Template Seeder${RESET}`)
  hr()
  info(`Supabase project: ${SUPABASE_URL}`)
  info(`Templates to seed: ${templates.length}`)
  console.log()

  // ── Step 1: check existing rows ──────────────────────────────────────────
  const { count, error: countErr } = await supabase
    .from('templates')
    .select('*', { count: 'exact', head: true })

  if (countErr) {
    console.error(`\n${RED}Failed to query templates table:${RESET}`, countErr.message)
    console.error('Make sure schema.sql has been run and the table exists.\n')
    process.exit(1)
  }

  if (count > 0) {
    warn(`Found ${count} existing template(s). Clearing before re-seeding…`)
    const { error: delErr } = await supabase
      .from('templates')
      .delete()
      .not('id', 'is', null)      // matches every row
    if (delErr) {
      console.error(`\n${RED}Failed to clear existing templates:${RESET}`, delErr.message)
      process.exit(1)
    }
    ok(`Cleared ${count} existing template(s)`)
  } else {
    info('No existing templates found — inserting fresh')
  }

  console.log()

  // ── Step 2: insert each template ─────────────────────────────────────────
  let successCount = 0
  let failCount    = 0

  for (const tmpl of templates) {
    // Map local template fields → DB columns.
    // Note: local `id` is a slug string (e.g. "client-engagement-letter"),
    // NOT a UUID. We let Supabase auto-generate the UUID primary key.
    const row = {
      name:        tmpl.name,
      category:    tmpl.category,
      description: tmpl.description ?? null,
      content:     tmpl.content,
      is_active:   true,
    }

    const { error } = await supabase.from('templates').insert(row)

    if (error) {
      fail(`${tmpl.name}`)
      console.error(`       ${RED}${error.message}${RESET}`)
      failCount++
    } else {
      ok(`${tmpl.name}  ${DIM}(${tmpl.category})${RESET}`)
      successCount++
    }
  }

  // ── Step 3: summary ───────────────────────────────────────────────────────
  console.log()
  hr()

  if (failCount === 0) {
    console.log(`\n${GREEN}${BOLD}  ✓ Seeding complete — ${successCount} template(s) inserted successfully.${RESET}\n`)
  } else {
    console.log(`\n${YELLOW}${BOLD}  ⚠ Seeding finished with issues:${RESET}`)
    console.log(`     ${GREEN}✓ ${successCount} inserted${RESET}`)
    console.log(`     ${RED}✗ ${failCount} failed${RESET}`)
    console.log()
    process.exit(1)
  }
}

seed().catch(err => {
  console.error(`\n${RED}Unexpected error:${RESET}`, err)
  process.exit(1)
})
