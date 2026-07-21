import { useNavigate } from 'react-router-dom'
import { UserPlus, FileText } from 'lucide-react'
import AdminLayout from './AdminLayout'

const ACTIONS = [
  {
    num: '01',
    label: 'Add Advocate',
    description:
      'Register a new lawyer with access to the main platform — full name, short name, and bar council number.',
    icon: UserPlus,
    linkLabel: 'Add advocate →',
    to: '/admin/add-advocate',
  },
  {
    num: '02',
    label: 'Add Templates',
    description:
      'Draft a new document template with placeholders — the only templates advocates will see on their side.',
    icon: FileText,
    linkLabel: 'Add template →',
    to: '/admin/add-template',
  },
]

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning.'
  if (h < 17) return 'Good afternoon.'
  return 'Good evening.'
}

function formatDate() {
  return new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function AdminDashboard() {
  const navigate = useNavigate()

  return (
    <AdminLayout>
      {/* ── Header row ───────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#c9a84c] mb-2">
            Admin Dashboard
          </p>
          <h1 className="text-3xl font-bold text-[#1e3a5f] leading-tight">{greeting()}</h1>
          <p className="text-gray-400 text-sm mt-2 max-w-sm leading-relaxed">
            Manage the advocates who use the platform and the document
            templates they draft from — everything here is only visible to the
            two of you.
          </p>
        </div>
        <span className="shrink-0 mt-1 text-sm font-semibold text-gray-400 bg-gray-100 px-3 py-1.5 rounded-lg">
          {formatDate()}
        </span>
      </div>

      {/* ── Action cards ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
        {ACTIONS.map(({ num, label, description, icon: Icon, linkLabel, to }) => (
          <div
            key={to}
            className="relative border border-gray-200 rounded-2xl p-6 bg-[#faf9f6] hover:shadow-sm transition-shadow"
          >
            {/* Gold top accent on first card */}
            {num === '01' && (
              <div className="absolute top-0 left-6 right-6 h-0.5 bg-[#c9a84c] rounded-full" />
            )}
            <p className="text-xs font-semibold text-gray-300 mb-4">{num}</p>
            <div className="w-10 h-10 bg-[#c9a84c]/10 rounded-xl flex items-center justify-center mb-4">
              <Icon className="w-5 h-5 text-[#c9a84c]" />
            </div>
            <p className="text-[#1e3a5f] font-bold text-base mb-2">{label}</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">{description}</p>
            <button
              onClick={() => navigate(to)}
              className="text-sm font-bold text-[#1e3a5f] hover:text-[#c9a84c] transition-colors"
            >
              {linkLabel}
            </button>
          </div>
        ))}
      </div>

      {/* ── Footer note ──────────────────────────────────────── */}
      <div className="mt-10 max-w-2xl rounded-xl border border-gray-100 bg-gray-50 px-5 py-4 text-sm text-gray-400 leading-relaxed">
        <span className="font-semibold text-[#1e3a5f]">Just these two.</span>{' '}
        No case data, billing, or client records live here — this dashboard only feeds advocate accounts and templates into the main platform.
      </div>
    </AdminLayout>
  )
}
