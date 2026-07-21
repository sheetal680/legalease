import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Scale, Menu, X, LogOut, UserPlus, FileText, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const NAV = [
  { label: 'Dashboard',    to: '/admin',              icon: LayoutDashboard },
  { label: 'Add Advocate', to: '/admin/add-advocate', icon: UserPlus },
  { label: 'Add Template', to: '/admin/add-template', icon: FileText },
]

export default function AdminLayout({ children }) {
  const { profile, signOut } = useAuth()
  const [open, setOpen] = useState(false)   // sidebar starts closed — clean look
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/login', { replace: true })
  }

  const adminName = profile?.full_name || 'Admin'

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-30">
        <button
          onClick={() => setOpen(p => !p)}
          className="p-2 rounded-lg text-gray-400 hover:text-[#1e3a5f] hover:bg-gray-100 transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-[#c9a84c]" />
          <span className="text-[#1e3a5f] font-bold text-sm">Admin</span>
        </div>
      </header>

      {/* ── Slide-over sidebar ──────────────────────────────────────────── */}
      {open && (
        <div className="fixed inset-0 z-40 flex">
          {/* backdrop */}
          <div
            className="fixed inset-0 bg-black/20"
            onClick={() => setOpen(false)}
          />

          {/* drawer */}
          <aside className="relative z-50 w-64 bg-[#1e3a5f] flex flex-col h-full shadow-xl">

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#c9a84c]/20 flex items-center justify-center">
                  <Scale className="w-4 h-4 text-[#c9a84c]" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">Admin</p>
                  <p className="text-[#c9a84c]/60 text-[10px] uppercase tracking-widest">Portal</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-1">
              {NAV.map(({ label, to, icon: Icon }) => (
                <button
                  key={to}
                  onClick={() => { navigate(to); setOpen(false) }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {label}
                </button>
              ))}
            </nav>

            {/* Footer */}
            <div className="px-5 py-5 border-t border-white/10">
              <p className="text-white font-semibold text-sm truncate">{adminName}</p>
              <p className="text-white/40 text-xs mt-0.5 truncate">Palivela Legal Associates</p>
              <button
                onClick={handleSignOut}
                className="mt-3 flex items-center gap-2 text-white/40 hover:text-white/80 text-xs font-semibold transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ── Page content ────────────────────────────────────────────────── */}
      <main className="flex-1 p-8">
        {children}
      </main>

    </div>
  )
}
