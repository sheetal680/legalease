import { format } from 'date-fns'

// ─── Lawyer-side placeholders (auto-filled from profile) ─────────────────────

function buildLawyerMap(profile) {
  const addressParts = [
    profile.address_line1,
    profile.address_line2 || null,
  ].filter(Boolean)

  return {
    LAWYER_NAME:    profile.full_name    || null,
    BAR_NUMBER:     profile.bar_number   || null,
    FIRM_NAME:      profile.firm_name    || null,
    LAWYER_EMAIL:   profile.email        || null,
    LAWYER_PHONE:   profile.phone        || null,
    LAWYER_ADDRESS: addressParts.length ? addressParts.join(', ') : null,
    CITY:           profile.city         || null,
    STATE:          profile.state        || null,
    JURISDICTION:   profile.jurisdiction || null,
    DATE:           format(new Date(), 'dd MMMM yyyy'),
  }
}

// ─── All known placeholders (client-side remain manual) ──────────────────────

const CLIENT_PLACEHOLDERS = new Set([
  'CLIENT_NAME',
  'CLIENT_ADDRESS',
  'CASE_NUMBER',
  'COURT_NAME',
  'OPPOSING_PARTY',
  'CASE_DESCRIPTION',
  'AMOUNT',
  'DATE_OF_HEARING',
])

// Matches any [WORD] or [WORD_WORD] style placeholder
const PLACEHOLDER_RE = /\[([A-Z][A-Z0-9_]*)\]/g

// ─── fillTemplate ─────────────────────────────────────────────────────────────

/**
 * Replace [PLACEHOLDER] markers in a raw template string.
 *
 * Lawyer-side fields that have a value → <span class="autofill-field">
 * Client-side fields (or lawyer fields with no value) → <span class="manual-field">
 *
 * @param {string} templateContent  Raw template string
 * @param {object} lawyerProfile    lawyer_profiles row from Supabase
 * @returns {string}                HTML string ready for the editor
 */
export function fillTemplate(templateContent, lawyerProfile) {
  const lawyerMap = buildLawyerMap(lawyerProfile)

  // Escape the text before inserting HTML spans so we don't introduce XSS
  // through profile values.
  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
  }

  // Preserve newlines as <br> so the editor renders them correctly
  const escaped = templateContent
    .split('\n')
    .map(line => escapeHtml(line))
    .join('<br>\n')

  return escaped.replace(PLACEHOLDER_RE, (_match, key) => {
    const isLawyerField = Object.prototype.hasOwnProperty.call(lawyerMap, key)

    if (isLawyerField && lawyerMap[key]) {
      // Auto-filled — blue highlight
      return `<span class="autofill-field" data-field="${key}">${escapeHtml(lawyerMap[key])}</span>`
    }

    // Manual — yellow highlight with dashed underline
    return `<span class="manual-field" data-field="${key}">[${key}]</span>`
  })
}

// ─── extractManualFields ──────────────────────────────────────────────────────

/**
 * Scan a content string (plain text or HTML) for remaining [PLACEHOLDER]
 * patterns and return the unique field names still needing manual input.
 *
 * Works on both raw template strings and HTML output from fillTemplate
 * (the manual-field spans keep the [KEY] text inside them).
 *
 * @param {string} content
 * @returns {string[]}  Unique placeholder keys, e.g. ["CLIENT_NAME", "AMOUNT"]
 */
export function extractManualFields(content) {
  const found = new Set()
  let match

  // Reset lastIndex before iterating (regex is module-level with /g flag)
  const re = new RegExp(PLACEHOLDER_RE.source, 'g')
  while ((match = re.exec(content)) !== null) {
    found.add(match[1])
  }

  return [...found]
}
