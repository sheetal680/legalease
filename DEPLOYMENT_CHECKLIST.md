# LegalEase — Deployment Checklist

Work through this list top-to-bottom before going live. Each item links to the relevant section of the README for details.

---

## Supabase Setup

- [ ] Supabase project created at [supabase.com](https://supabase.com)
- [ ] `supabase/schema.sql` executed in the SQL Editor (creates all 4 tables + RLS + triggers)
- [ ] Row-Level Security confirmed enabled on all tables:
  - [ ] `lawyer_profiles`
  - [ ] `templates`
  - [ ] `documents`
  - [ ] `subscriptions`
- [ ] Storage buckets created (both set to **Public**):
  - [ ] `profile-photos`
  - [ ] `signatures`
- [ ] Storage RLS policies applied (included in `schema.sql`)

---

## Google OAuth Setup

- [ ] Google Cloud project created at [console.cloud.google.com](https://console.cloud.google.com)
- [ ] OAuth 2.0 Client ID and Client Secret generated (Web application type)
- [ ] Supabase callback URL added to Google OAuth **Authorized redirect URIs**
  - Format: `https://xxxxxxxxxxxx.supabase.co/auth/v1/callback`
- [ ] Google provider enabled in **Supabase → Authentication → Providers → Google**
- [ ] Client ID and Client Secret saved in Supabase Google provider settings

---

## Supabase URL Configuration

- [ ] Local dev URL added: `http://localhost:5173`
- [ ] Production URL added: `https://your-app.vercel.app` (or custom domain)
- [ ] Site URL set to production URL in **Supabase → Authentication → URL Configuration**

---

## Local Development

- [ ] `.env.local` created with real Supabase credentials (never commit this file)
- [ ] `npm install` run successfully
- [ ] `npm run dev` starts without errors
- [ ] Can sign in with Google locally
- [ ] Onboarding flow completes and saves to Supabase
- [ ] Can create a document from a template
- [ ] Editor saves to Supabase (check `documents` table)
- [ ] PDF export downloads correctly
- [ ] Word export downloads correctly

---

## Vercel Deployment

- [ ] Code pushed to GitHub repository
- [ ] Vercel project created and connected to GitHub repo
- [ ] Build settings verified (auto-detected by Vercel):
  - Build Command: `npm run build`
  - Output Directory: `dist`
  - Install Command: `npm install`
- [ ] Environment variables added in Vercel dashboard:
  - [ ] `VITE_SUPABASE_URL`
  - [ ] `VITE_SUPABASE_ANON_KEY`
- [ ] First deployment succeeded (no build errors)
- [ ] `vercel.json` rewrite rule confirmed working (direct URL navigation works)

---

## Post-Deployment Verification

Run through the complete user flow on the live production URL:

- [ ] **Landing page** loads correctly with correct favicon
- [ ] **Login** → Google OAuth redirects back to app successfully
- [ ] **Onboarding** → all 4 steps complete, profile saved, redirects to Dashboard
- [ ] **Dashboard** → stats load, recent documents appear
- [ ] **Template Library** → templates display, search works
- [ ] **Editor** → template autofills, sidebar fills update document, Save works
- [ ] **PDF Export** → downloads with letterhead and lawyer details
- [ ] **Word Export** → downloads `.docx` file
- [ ] **My Cases** → documents listed, search/filter/sort work, duplicate works
- [ ] **Settings** → profile updates save, photo upload works, signature upload works
- [ ] **Mobile (375px)** → Navbar drawer opens/closes, Cases shows cards, Editor FAB works
- [ ] **Sign out** → redirects to login, protected routes redirect correctly

---

## Optional

- [ ] Custom domain configured in Vercel
- [ ] Custom domain added to Supabase URL Configuration
- [ ] Google OAuth Authorized JavaScript origins updated with custom domain
- [ ] `robots.txt` added to `/public` if SEO is needed
- [ ] Vercel Analytics enabled in project settings
- [ ] Error monitoring (e.g. Sentry) configured

---

## Quick Reference: Key URLs

| Resource | Where to find it |
|----------|-----------------|
| Supabase project URL | Supabase dashboard → Project Settings → API |
| Supabase anon key | Supabase dashboard → Project Settings → API |
| Supabase callback URL | Supabase dashboard → Authentication → Providers → Google |
| Google OAuth credentials | console.cloud.google.com → APIs & Services → Credentials |
| Vercel deployment URL | Vercel dashboard → project → Domains |
