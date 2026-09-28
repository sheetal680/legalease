// The courts reference list.
//
// TO ADD A COURT: add one line below and re-run `node scripts/seedCourts.js`.
// The script is idempotent — it upserts on (court_name, area), so re-running it
// never duplicates a row and editing a court_type here corrects it in place.
//
// court_type must be exactly one of:
//   'Supreme Court'
//   'High Court'
//   'District & Subordinate'
//   'Tribunal & Special'
//   'Family Court'
//
// `area` is the city or district the court sits in — it is what the advocate
// searches on, and what lands in the client's court_area.

export const COURT_TYPES = [
  'Supreme Court',
  'High Court',
  'District & Subordinate',
  'Tribunal & Special',
  'Family Court',
]

export const COURTS = [
  // court_name                                             court_type                 area
  ['Supreme Court of India',                                'Supreme Court',           'New Delhi'],
  ['High Court of Andhra Pradesh',                          'High Court',              'Amaravati'],
  ['I Addl. District & Sessions Court, Vijayawada',         'District & Subordinate',  'Vijayawada'],
  ['Principal District & Sessions Court, West Godavari',    'District & Subordinate',  'Bhimavaram'],
]
