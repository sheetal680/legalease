# LegalEase

A private, AI-assisted legal document workspace built for Indian lawyers. Draft, autofill, and export professional legal documents — powered by React, Vite, TipTap, and Supabase.

---

## Features

- **Google OAuth** — one-click sign-in, no passwords
- **21 Indian legal templates** across Criminal, Financial, Family, Property, and General law
- **Smart autofill** — lawyer profile data is highlighted and pre-filled; client fields are clearly marked for manual entry
- **Rich text editor** — TipTap-powered with formatting toolbar, auto-save, and word count
- **PDF export** — letterhead, signature block, page numbers
- **Word export** — `.docx` with proper header/footer
- **My Cases** — full document history with search, filter, sort, duplicate, and delete
- **Settings** — update profile, photo, signature, and subscription plan
- **Mobile-responsive** — works on 375px phones through 1280px+ desktops

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 |
| Rich Text | TipTap 3 (StarterKit, Highlight, TextAlign, Underline) |
| Backend / Auth | Supabase (PostgreSQL + Row-Level Security + Storage) |
| PDF | jsPDF + html2canvas |
| Word | docx |
| Routing | React Router v7 |
| Notifications | react-hot-toast |
| Icons | lucide-react |
| Dates | date-fns |

---

## Prerequisites

- **Node.js 18+** (check with `node -v`)
- **npm 9+** (comes with Node)
- A free **Supabase account** at [supabase.com](https://supabase.com)
- A **Google Cloud project** with OAuth 2.0 credentials (for Google sign-in)

---

## Local Development Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd legalease
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create your environment file

Copy the example and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Then edit `.env.local`:

```
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

You'll find both values in your Supabase project under **Project Settings → API**.

### 4. Run the database schema

1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Paste the contents of `supabase/schema.sql` and click **Run**

This creates the four tables (`lawyer_profiles`, `templates`, `documents`, `subscriptions`), enables Row-Level Security, and sets up Storage policies for `profile-photos` and `signatures` buckets.

### 5. Create Supabase Storage buckets

In your Supabase dashboard, go to **Storage** and create two **public** buckets:

- `profile-photos`
- `signatures`

### 6. Enable Google OAuth

1. Go to **Supabase → Authentication → Providers → Google**
2. Toggle **Google** on
3. Enter your Google OAuth **Client ID** and **Client Secret**
   - Get these from [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials → OAuth 2.0 Client IDs
4. Add the Supabase callback URL shown in the dashboard to your Google OAuth app's **Authorized redirect URIs**

### 7. Add redirect URLs

In **Supabase → Authentication → URL Configuration**, add:

```
http://localhost:5173
```

(Add your production URL here too when you deploy.)

### 8. Start the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Sticky nav with mobile sliding drawer
│   ├── ProtectedRoute.jsx  # Auth guard + Navbar wrapper
│   └── TemplateCard.jsx    # Template library card
├── context/
│   └── AuthContext.jsx     # Supabase auth state + profile
├── hooks/
│   └── usePageTitle.js     # Sets document.title per page
├── lib/
│   ├── autofill.js         # Template → highlighted HTML
│   ├── exportDocument.js   # PDF (jsPDF) and Word (docx) export
│   └── supabase.js         # Supabase client init
├── pages/
│   ├── LandingPage.jsx
│   ├── LoginPage.jsx
│   ├── OnboardingPage.jsx  # 4-step profile setup
│   ├── DashboardPage.jsx
│   ├── TemplatesPage.jsx
│   ├── EditorPage.jsx      # TipTap editor + sidebar + export
│   ├── CasesPage.jsx       # Document history + filters + sort
│   └── SettingsPage.jsx
├── templates/
│   └── templateContent.js  # 21 Indian legal templates
├── App.jsx
├── main.jsx
└── index.css               # Tailwind v4 + custom theme vars
supabase/
└── schema.sql              # Full DB schema with RLS
public/
└── favicon.svg
```

---

## Deployment on Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/legalease.git
git push -u origin main
```

### 2. Import on Vercel

1. Go to [vercel.com](https://vercel.com) and click **Add New Project**
2. Import your GitHub repository
3. Vercel auto-detects Vite — leave the build settings as-is:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

### 3. Add environment variables

In the Vercel project dashboard → **Settings → Environment Variables**, add:

| Name | Value |
|------|-------|
| `VITE_SUPABASE_URL` | `https://xxxxxxxxxxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOi...` |

### 4. Add your Vercel URL to Supabase

In **Supabase → Authentication → URL Configuration**, add your Vercel deployment URL:

```
https://your-app.vercel.app
```

And set it as the **Site URL**.

### 5. Deploy

Click **Deploy**. Vercel will build and deploy automatically. The `vercel.json` at the project root ensures React Router client-side routes work correctly.

---

## Environment Variables Reference

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL (from Project Settings → API) |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon/public key (from Project Settings → API) |

> Both variables must be prefixed with `VITE_` to be accessible in the browser bundle.

---

## Database Schema Overview

| Table | Purpose |
|-------|---------|
| `lawyer_profiles` | Extends `auth.users` — stores name, bar number, firm, specialization, photo/signature URLs |
| `templates` | (Optional) custom templates per lawyer |
| `documents` | All drafts and exported documents, linked to user |
| `subscriptions` | Current plan per user (Free / Starter / Professional / Enterprise) |

RLS is enabled on all tables. Users can only read/write their own rows.

---

## License

Private — all rights reserved.
