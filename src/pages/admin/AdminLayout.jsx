import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Scale, Menu, X, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const NAV = [
  { label: 'Overview',   to: '/admin',              end: true },
  { label: 'Advocates',  to: '/admin/add-advocate' },
  { label: 'Templates',  to: '/admin/add-template' },
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
    <div className="flex h-screen overflow-hidden bg-gray-50">

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside
        style={{ width: open ? 248 : 0 }}
        className="shrink-0 overflow-hidden transition-[width] duration-200 ease-in-out bg-[#1e3a5f] flex flex-col"
      >
        {/* Logo — just "Admin" / "ADMIN PORTAL", no firm name */}
        <div className="flex items-center gap-3 px-5 pt-6 pb-5 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-[#c9a84c]/20 flex items-center justify-center shrink-0">
            <Scale className="w-5 h-5 text-[#c9a84c]" />
          </div>
          <div className="leading-tight whitespace-nowrap">
            <p className="text-white font-bold text-[15px]">Admin</p>
            <p className="text-[#c9a84c]/70 text-[10px] font-semibold tracking-[0.12em] uppercase">Admin Portal</p>
          </div>
        </div>

        <div className="mx-5 h-px bg-white/10 mb-5 shrink-0" />

        {/* Workspace label */}
        <p className="px-5 text-[10px] font-semibold tracking-[0.15em] uppercase text-white/30 mb-2 shrink-0">
          Workspace
        </p>

        {/* Nav links — dot-style indicator */}
        <nav className="flex-1 px-4 space-y-0.5 overflow-y-auto">
          {NAV.map(({ label, to, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-white'
                    : 'text-white/50 hover:text-white/80'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 transition-colors ${
                      isActive ? 'bg-[#c9a84c]' : 'bg-white/20'
                    }`}
                  />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom: user info + Arshith's company + sign out */}
        <div className="px-5 py-5 shrink-0 border-t border-white/10">
          <p className="text-white font-semibold text-sm truncate">Grandfather &amp; Admin</p>
          <p className="text-white/40 text-xs mt-0.5 truncate">Shared access — Palivela Legal Associates</p>
          <button
            onClick={handleSignOut}
            className="mt-3 flex items-center gap-2 text-white/40 hover:text-white/80 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main area ───────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Slim toggle bar */}
        <header className="shrink-0 flex items-center px-5 py-3 bg-white border-b border-gray-100">
          <button
            onClick={() => setOpen(p => !p)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-[#1e3a5f] hover:bg-gray-100 transition-colors"
            aria-label={open ? 'Close sidebar' : 'Open sidebar'}
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-8 bg-white">
          {children}
        </main>

      </div>
    </div>
  )
}
