import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Scale, LayoutDashboard, UserPlus, FileText, Menu, X, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const NAV = [
  { label: 'Dashboard',     to: '/admin',              icon: LayoutDashboard, end: true },
  { label: 'Add Advocate',  to: '/admin/add-advocate', icon: UserPlus },
  { label: 'Add Template',  to: '/admin/add-template', icon: FileText },
]

export default function AdminLayout({ children }) {
  const { profile, signOut } = useAuth()
  const [open, setOpen] = useState(true)
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/', { replace: true })
  }

  const adminName = profile?.full_name || 'Admin'

  return (
    <div className="flex h-screen overflow-hidden bg-white">

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside
        style={{ width: open ? 240 : 0 }}
        className="shrink-0 overflow-hidden transition-[width] duration-200 ease-in-out bg-[#1e3a5f] flex flex-col"
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 shrink-0">
          <div className="w-8 h-8 bg-[#c9a84c]/20 rounded-lg flex items-center justify-center shrink-0">
            <Scale className="w-4 h-4 text-[#c9a84c]" />
          </div>
          <span className="text-[#c9a84c] font-bold text-base whitespace-nowrap leading-tight">
            LegalEase<br />
            <span className="text-[10px] font-semibold tracking-widest text-[#c9a84c]/70 uppercase">Admin</span>
          </span>
        </div>

        <div className="mx-4 h-px bg-white/10 mb-4 shrink-0" />

        {/* Nav links */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {NAV.map(({ label, to, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-[#c9a84c] text-[#1e3a5f]'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom: user + sign out */}
        <div className="px-4 py-4 shrink-0 border-t border-white/10">
          <p className="text-white/50 text-[10px] uppercase tracking-widest mb-1">Signed in as</p>
          <p className="text-white text-sm font-semibold truncate mb-3">{adminName}</p>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-white/60 hover:text-white text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main area ───────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Top bar with toggle */}
        <header className="shrink-0 flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-white">
          <button
            onClick={() => setOpen(p => !p)}
            className="p-2 rounded-lg text-gray-400 hover:text-[#1e3a5f] hover:bg-gray-100 transition-colors"
            aria-label={open ? 'Close sidebar' : 'Open sidebar'}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="text-sm font-semibold text-gray-400">LegalEase Admin</span>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-8 bg-white">
          {children}
        </main>

      </div>
    </div>
  )
}
