import { format } from 'date-fns'

// ─── Lawyer-side placeholder map ──────────────────────────────────────────────
// Supports both old convention (BAR_NUMBER, FIRM_NAME) and new (LAWYER_BAR_COUNCIL, LAWYER_FIRM).

function buildLawyerMap(profile, userEmail) {
  const addressParts = [profile.address_line1, profile.address_line2 || null].filter(Boolean)
  const address = addressParts.length ? addressParts.join(', ') : (profile.address || null)

  return {
    // New-style placeholders (used in new templates)
    LAWYER_NAME:        profile.full_name  || null,
    LAWYER_FIRM:        profile.firm_name  || null,
    LAWYER_ADDRESS:     address            || null,
    LAWYER_PHONE:       profile.phone      || null,
    LAWYER_EMAIL:       userEmail || profile.email || null,
    LAWYER_BAR_COUNCIL: profile.bar_number || profile.bar_council_number || null,
    // Old-style (backward compat with existing templates)
    FIRM_NAME:          profile.firm_name  || null,
    BAR_NUMBER:         profile.bar_number || profile.bar_council_number || null,
    CITY:               profile.city       || null,
    STATE:              profile.state      || null,
    JURISDICTION:       profile.jurisdiction || profile.state || null,
    DATE: format(new Date(), 'dd MMMM yyyy'),
  }
}

const PLACEHOLDER_RE = /\[([A-Z][A-Z0-9_]*)\]/g

// ─── fillTemplate ─────────────────────────────────────────────────────────────
export function fillTemplate(templateContent, lawyerProfile, userEmail) {
  const lawyerMap = buildLawyerMap(lawyerProfile, userEmail)

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
  }

  const escaped = templateContent
    .split('\n')
    .map(line => escapeHtml(line))
    .join('<br>\n')

  return escaped.replace(PLACEHOLDER_RE, (_match, key) => {
    const isLawyerField = Object.prototype.hasOwnProperty.call(lawyerMap, key)
    if (isLawyerField && lawyerMap[key]) {
      return `<span class="autofill-field" data-field="${key}">${escapeHtml(lawyerMap[key])}</span>`
    }
    return `<span class="manual-field" data-field="${key}">[${key}]</span>`
  })
}

// ─── Helpers for left-panel lawyer/client switching ───────────────────────────

export function buildLawyerDataFromProfile(profile, userEmail) {
  const addressParts = [profile.address_line1, profile.address_line2].filter(Boolean)
  return {
    name:        profile.full_name  || '',
    firm:        profile.firm_name  || '',
    address:     addressParts.length ? addressParts.join(', ') : (profile.address || ''),
    phone:       profile.phone      || '',
    email:       userEmail || profile.email || '',
    bar_council: profile.bar_number || profile.bar_council_number || '',
  }
}

export function buildLawyerDataFromFirmLawyer(firmLawyer, firmName) {
  return {
    name:        firmLawyer.full_name          || '',
    firm:        firmName                      || '',
    address:     firmLawyer.address            || '',
    phone:       firmLawyer.phone              || '',
    email:       firmLawyer.email              || '',
    bar_council: firmLawyer.bar_council_number || '',
  }
}

export function lawyerDataToFieldMap(data) {
  return {
    LAWYER_NAME:        data.name,
    LAWYER_FIRM:        data.firm,
    LAWYER_ADDRESS:     data.address,
    LAWYER_PHONE:       data.phone,
    LAWYER_EMAIL:       data.email,
    LAWYER_BAR_COUNCIL: data.bar_council,
    // backward compat keys
    FIRM_NAME:          data.firm,
    BAR_NUMBER:         data.bar_council,
  }
}

export function extractManualFields(content) {
  const found = new Set()
  let match
  const re = new RegExp(PLACEHOLDER_RE.source, 'g')
  while ((match = re.exec(content)) !== null) found.add(match[1])
  return [...found]
}
