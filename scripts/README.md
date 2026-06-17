# LegalEase — Scripts

## `seedTemplates.js`

Populates the Supabase `templates` table with all 21 built-in Indian legal document templates.

### When to run

**Once**, after the initial database setup. You do not need to re-run it unless you want to reset the templates table to the bundled defaults.

> **Safe to re-run.** The script clears all existing rows in `templates` before inserting, so running it multiple times is idempotent — you will not end up with duplicates.

---

### Prerequisites

1. `supabase/schema.sql` has been executed in the Supabase SQL Editor (creates the `templates` table).
2. Your `.env.local` file contains all three required variables (see below).

---

### Environment variables

The seed script reads from `.env.local` in the project root. Add the service role key — it is already listed as a placeholder:

```
# .env.local
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...   # ← needed for seeding
```

**Where to find `SUPABASE_SERVICE_ROLE_KEY`:**
Supabase dashboard → **Project Settings → API → Project API keys → `service_role` (secret)**

> ⚠️ The service role key bypasses Row-Level Security. Never expose it to the browser or commit it to version control. `.env.local` is gitignored by default.

---

### Command

```bash
npm run seed
```

### Expected output

```
  LegalEase — Template Seeder
────────────────────────────────────────────────────────────
  →  Supabase project: https://xxxxxxxxxxxx.supabase.co
  →  Templates to seed: 21

  →  No existing templates found — inserting fresh
  ✓  Client Engagement Letter  (general)
  ✓  Legal Notice              (general)
  ✓  Vakalatnama               (general)
  ✓  Affidavit                 (general)
  ...
  ✓  Employment Contract       (labour)

────────────────────────────────────────────────────────────

  ✓ Seeding complete — 21 template(s) inserted successfully.
```

---

### What the script does

1. Loads `.env.local` (without requiring an external package like `dotenv`)
2. Validates that all three required environment variables are present
3. Creates a Supabase **admin** client using the service role key (bypasses RLS)
4. Counts existing rows in `templates`; if any exist, deletes them all before inserting
5. Inserts each of the 21 templates one at a time and logs `✓` / `✗` per template
6. Exits with code `1` if any insert fails (CI-friendly)

The local template `id` field (e.g. `"client-engagement-letter"`) is a slug used only
by the front-end for client-side filtering and routing. It is **not** inserted into the
database — Supabase auto-generates a UUID primary key for each row.

---

### Troubleshooting

| Error | Fix |
|-------|-----|
| `Missing required environment variables` | Add the missing keys to `.env.local` |
| `Failed to query templates table` | Run `supabase/schema.sql` first |
| `new row violates row-level security policy` | You used the anon key, not the service role key |
| `relation "templates" does not exist` | Run `supabase/schema.sql` in the Supabase SQL Editor |
