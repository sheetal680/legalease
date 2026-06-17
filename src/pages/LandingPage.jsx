import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Lock, Zap, FileDown,
  Scale, CheckCircle, ChevronRight,
} from 'lucide-react'
import Footer from '../components/Footer'

const FEATURES = [
  {
    icon: Lock,
    title: 'Private Workspace',
    desc: 'Your documents stay yours. End-to-end secure storage — no one else can access your drafts or client data.',
  },
  {
    icon: Zap,
    title: 'Smart Auto-Fill',
    desc: 'Templates populate instantly with your bar number, firm details, and client info — zero copy-paste.',
  },
  {
    icon: FileDown,
    title: 'Export Ready',
    desc: 'Download polished PDFs or editable Word files in one click, court-ready and professionally formatted.',
  },
]


export default function LandingPage() {
  useEffect(() => { document.title = 'LegalEase — AI Legal Document Drafting for Indian Lawyers' }, [])
  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans flex flex-col">

      {/* ── Navbar ── */}
      <header className="bg-[#1e3a5f] sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="text-[#c9a84c] w-6 h-6" />
            <span className="text-white font-bold text-xl tracking-tight">LegalEase</span>
          </div>
          <Link
            to="/login"
            className="bg-[#c9a84c] hover:bg-[#a8882f] text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
          >
            Login with Google
          </Link>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="bg-[#1e3a5f] text-white py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-[#c9a84c]/20 border border-[#c9a84c]/40 text-[#c9a84c] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            Built for Indian Lawyers
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            The private workspace<br className="hidden sm:block" /> every lawyer needs
          </h1>
          <p className="text-lg sm:text-xl text-blue-200 max-w-2xl mx-auto mb-10">
            Smart templates, auto-filled with your details, ready in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 bg-[#c9a84c] hover:bg-[#a8882f] text-white font-bold text-lg px-8 py-4 rounded-xl transition-colors shadow-lg"
            >
              <GoogleIcon />
              Login with Google
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Social proof strip ── */}
      <div className="bg-[#142840] py-4 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-x-10 gap-y-2 text-blue-200 text-sm">
          {['NDA', 'Lease Agreement', 'Power of Attorney', 'Partnership Deed', 'Legal Notice', 'Affidavit'].map(t => (
            <span key={t} className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-[#c9a84c]" /> {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── Features ── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-4">
              Everything you need, nothing you don't
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Purpose-built for legal professionals who value their time and their clients' trust.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 bg-[#1e3a5f]/10 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-[#1e3a5f]" />
                </div>
                <h3 className="text-lg font-bold text-[#1e3a5f] mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-[#1e3a5f] py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-12">From login to letterhead in 60 seconds</h2>
          <div className="grid sm:grid-cols-3 gap-8 text-left">
            {[
              { step: '01', title: 'Sign in with Google', desc: 'One click, no passwords, instant access.' },
              { step: '02', title: 'Complete your profile', desc: 'Enter your bar number and firm details once.' },
              { step: '03', title: 'Pick a template & export', desc: 'Auto-filled, formatted, and ready to serve.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4">
                <span className="text-4xl font-black text-[#c9a84c]/30 leading-none">{step}</span>
                <div>
                  <h4 className="text-white font-semibold mb-1">{title}</h4>
                  <p className="text-blue-300 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1e3a5f] mb-8">
            Join lawyers who draft faster and smarter.
          </h2>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-[#c9a84c] hover:bg-[#a8882f] text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-lg"
          >
            <GoogleIcon />
            Login with Google
          </Link>
        </div>
      </section>

      <Footer />

    </div>
  )
}

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}
