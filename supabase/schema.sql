-- ============================================================
-- LegalEase Database Schema
-- ============================================================
-- Run this SQL in your Supabase project's SQL Editor to set up
-- the database.
--
-- Steps:
--   1. Open your Supabase project at https://app.supabase.com
--   2. Go to SQL Editor → New query
--   3. Paste this entire file and click "Run"
-- ============================================================


-- ------------------------------------------------------------
-- lawyer_profiles
-- Extends Supabase Auth users with lawyer-specific details.
-- ------------------------------------------------------------
CREATE TABLE lawyer_profiles (
  id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID        REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  full_name           TEXT        NOT NULL,
  bar_number          TEXT        NOT NULL,
  firm_name           TEXT,
  designation         TEXT,
  years_experience    INTEGER,
  phone               TEXT        NOT NULL,
  email               TEXT        NOT NULL,
  address_line1       TEXT        NOT NULL,
  address_line2       TEXT,
  city                TEXT        NOT NULL,
  state               TEXT        NOT NULL,
  pin_code            TEXT        NOT NULL,
  jurisdiction        TEXT,
  specialization      TEXT        NOT NULL,
  languages           TEXT[],
  signature_url       TEXT,
  profile_photo_url   TEXT,
  profile_complete    BOOLEAN     DEFAULT false,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);


-- ------------------------------------------------------------
-- templates
-- Pre-built legal document templates (managed by admins).
-- ------------------------------------------------------------
CREATE TABLE templates (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,
  category    TEXT        NOT NULL,
  description TEXT,
  content     TEXT        NOT NULL,
  is_active   BOOLEAN     DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ------------------------------------------------------------
-- documents
-- User-generated documents based on templates.
-- ------------------------------------------------------------
CREATE TABLE documents (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID        REFERENCES auth.users(id) ON DELETE CASCADE,
  template_id UUID        REFERENCES templates(id),
  title       TEXT        NOT NULL,
  client_name TEXT,
  content     TEXT,
  status      TEXT        DEFAULT 'draft',
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ------------------------------------------------------------
-- subscriptions
-- Tracks user plan and billing status.
-- ------------------------------------------------------------
CREATE TABLE subscriptions (
  id            UUID  PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID  REFERENCES auth.users(id) ON DELETE CASCADE,
  plan          TEXT  NOT NULL DEFAULT 'free',
  price         INTEGER       DEFAULT 0,
  billing_cycle TEXT          DEFAULT 'monthly',
  start_date    DATE          DEFAULT CURRENT_DATE,
  end_date      DATE,
  status        TEXT          DEFAULT 'active'
);


-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE lawyer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents        ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions    ENABLE ROW LEVEL SECURITY;
-- templates has no RLS; access is controlled by the SELECT policy below.
ALTER TABLE templates        ENABLE ROW LEVEL SECURITY;


-- ------------------------------------------------------------
-- RLS Policies
-- ------------------------------------------------------------

-- Each user can only read/write their own profile
CREATE POLICY "Users can only access own profile"
  ON lawyer_profiles
  FOR ALL
  USING (auth.uid() = user_id);

-- Each user can only read/write their own documents
CREATE POLICY "Users can only access own documents"
  ON documents
  FOR ALL
  USING (auth.uid() = user_id);

-- Each user can only read/write their own subscription
CREATE POLICY "Users can only access own subscription"
  ON subscriptions
  FOR ALL
  USING (auth.uid() = user_id);

-- Any authenticated user can read active templates
CREATE POLICY "Authenticated users can read templates"
  ON templates
  FOR SELECT
  USING (auth.role() = 'authenticated');


-- ============================================================
-- Auto-update updated_at timestamps
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_lawyer_profiles
  BEFORE UPDATE ON lawyer_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_documents
  BEFORE UPDATE ON documents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ============================================================
-- Storage buckets for file uploads
-- ============================================================
-- Run these in the Supabase SQL Editor AFTER creating buckets
-- named "profile-photos" and "signatures" via the Storage UI
-- (Storage → New bucket → set Public = true for each).

-- Allow authenticated users to upload/update/delete their own files
CREATE POLICY "Authenticated upload to profile-photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'profile-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Owner manages profile-photos"
  ON storage.objects FOR ALL
  USING (bucket_id = 'profile-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Public read profile-photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'profile-photos');

CREATE POLICY "Authenticated upload to signatures"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'signatures' AND auth.role() = 'authenticated');

CREATE POLICY "Owner manages signatures"
  ON storage.objects FOR ALL
  USING (bucket_id = 'signatures' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Public read signatures"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'signatures');
