// Shared machinery for Phase 2 of the Template Details feature: tagging each
// template's manually-filled blanks with tokens and a question list.
//
// A batch is an array of:
//   {
//     name:    exact admin_templates.name,
//     edits:   [[anchor, replacement], ...]      token insertions into the HTML
//              [[anchor, replacement, n], ...]   n spots, all replaced — for one
//                                                token filling repeated blanks
//     fields:  [{ token, label, type, ... }]     the questions
//     repairs: [[from, to], ...]                 optional rewrites of earlier passes
//   }
//
// Guarantees, so a bad batch fails loudly instead of quietly mangling a form:
//   * every anchor must occur exactly as many times as declared (default once),
//     so a blank appearing on more than one page is a deliberate choice rather
//     than something noticed after the fact
//   * every declared token must end up present in the document
//   * every token left in the document must be either declared or autofilled
//   * re-running is a no-op once a template is tagged
//
// Conventions for authoring `fields` (see also the app's src/lib/manualFields.js):
//   type: 'year' + prefix: '202'   a slot where the form pre-prints part of the
//                                  year; the advocate is asked for the full year
//   printedLabel: 'P.S.'           the form prints this label beside the blank,
//                                  so the answer should not repeat it
//   hint                           only where the wording genuinely needs it;
//                                  prefix/printedLabel generate their own
//
// Token placement rule: one separating space, then the token, then the existing
// whitespace / dot-leader run — with the separator taken FROM that run wherever
// one exists, so the unfilled document keeps exactly the width it has today.

import { createClient } from '@supabase/supabase-js'

// Tokens the app fills from saved advocate/client data. Never ask about these.
export const AUTOFILLED = new Set([
  '[ADVOCATE_NAME]', '[FIRM_NAME]', '[ADVOCATE_ADDRESS]', '[ADVOCATE_PHONE]',
  '[ADVOCATE_EMAIL]', '[BAR_NUMBER]', '[BAR_COUNCIL_NO]',
  '[CLIENT_NAME]', '[CLIENT_ADDRESS]', '[CLIENT_PHONE]', '[CLIENT_EMAIL]',
  '[CASE_NUMBER]', '[PARTY_TYPE]', '[COURT_PLACE]', '[COURT_NAME]',
  '[DATE]', '[TODAY]', '[DAY]', '[MONTH]', '[YEAR]', '[YEAR_LAST]',
  '[ASSOCIATE_NAME]', '[ASSOCIATE_BAR_NUMBER]', '[ASSOCIATE_BAR_NO]',
  '[CLIENT_NAME_IF_PETITIONER]', '[CLIENT_NAME_IF_RESPONDENT]',
])

const TOKEN_RE = /\[[A-Z_][A-Z0-9_]*\]/g

export function client() {
  const url = process.env.VITE_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    console.error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Check .env.local.')
    process.exit(1)
  }
  return createClient(url, key)
}

export async function tagBatch(batch) {
  const supabase = client()
  let failed = 0

  for (const spec of batch) {
    const { data: row, error } = await supabase
      .from('admin_templates').select('id, name, content').eq('name', spec.name).maybeSingle()
    if (error || !row) {
      console.error(`  ✗ ${spec.name}\n      not found${error ? ': ' + error.message : ''}`)
      failed++
      continue
    }

    let content = row.content
    let ok = true

    for (const [from, to] of spec.repairs || []) {
      if (content.includes(from)) content = content.split(from).join(to)
    }

    for (const [anchor, replacement, expected = 1] of spec.edits) {
      const hits = content.split(anchor).length - 1
      const done = content.split(replacement).length - 1
      // "Already applied" cannot be inferred from the replacement merely being
      // present: a replacement like "/202[YEAR_LAST]" may already exist
      // elsewhere in the document for an unrelated reason, which would silently
      // skip a real edit. It counts as applied only when the replacement is
      // there at least as often as expected AND the anchor is either gone or
      // only still visible because it is a substring of the replacement.
      if (done >= expected && (hits === 0 || hits === expected)) continue
      if (hits !== expected) {
        console.error(`  ✗ ${spec.name}\n      anchor ${JSON.stringify(anchor)} matched ${hits}x (expected ${expected})`)
        ok = false
        break
      }
      content = content.split(anchor).join(replacement)
    }
    if (!ok) { failed++; continue }

    const declared = spec.fields.map(f => f.token)
    const missing = declared.filter(t => !content.includes(t))
    if (missing.length) {
      console.error(`  ✗ ${spec.name}\n      declared but absent from document: ${missing.join(', ')}`)
      failed++
      continue
    }

    const present = [...new Set(content.match(TOKEN_RE) || [])]
    const orphans = present.filter(t => !declared.includes(t) && !AUTOFILLED.has(t))
    if (orphans.length) {
      console.error(`  ✗ ${spec.name}\n      orphan tokens (neither declared nor autofilled): ${orphans.join(', ')}`)
      failed++
      continue
    }

    const dupes = declared.filter((t, i) => declared.indexOf(t) !== i)
    if (dupes.length) {
      console.error(`  ✗ ${spec.name}\n      duplicate question tokens: ${[...new Set(dupes)].join(', ')}`)
      failed++
      continue
    }

    const { error: upErr } = await supabase
      .from('admin_templates')
      .update({ content, manual_fields: spec.fields })
      .eq('id', row.id)
    if (upErr) { console.error(`  ✗ ${spec.name}\n      update failed: ${upErr.message}`); failed++; continue }

    const reused = declared.filter(t => (content.split(t).length - 1) > 1)
    console.log(`  ✓ ${spec.name}`)
    console.log(`      ${spec.fields.length} questions, ${spec.edits.length} insertions` +
      (reused.length ? `, reused: ${reused.join(', ')}` : ''))
  }

  console.log(`\n${batch.length - failed}/${batch.length} tagged` + (failed ? ` — ${failed} FAILED` : ''))
  if (failed) process.exit(1)
}
