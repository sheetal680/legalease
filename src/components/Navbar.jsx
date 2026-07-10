import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import {
  Scale, LayoutDashboard, FileText, Briefcase,
  Settings, LogOut, Menu, X, ChevronDown,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const NAV_LINKS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/templates', label: 'Templates',  icon: FileText },
  { to: '/cases',     label: 'My Cases',   icon: Briefcase },
]

export default function Navbar() {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const displayName = profile?.full_name || user?.user_metadata?.full_name || 'Lawyer'
  const avatarUrl   = user?.user_metadata?.avatar_url

  async function handleSignOut() {
    try {
      await signOut()
      toast.success('Signed out')
      // Navigation handled automatically by SIGNED_OUT event in AuthContext
    } catch {
      toast.error('Could not sign out. Try again.')
    }
  }

  const activeCls   = 'text-[#c9a84c] border-b-2 border-[#c9a84c]'
  const inactiveCls = 'text-blue-100 hover:text-white border-b-2 border-transparent'

  return (
    <>
      <nav className="bg-[#1e3a5f] shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">

            <Link to="/dashboard" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 bg-[#c9a84c] rounded-lg flex items-center justify-center">
                <Scale className="text-white w-4 h-4" />
              </div>
              <span className="text-white font-bold text-lg tracking-tight">LegalEase</span>
            </Link>

            <div className="hidden md:flex items-center gap-1 h-full">
              {NAV_LINKS.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-4 h-full text-sm font-medium transition-colors pb-0.5 ${isActive ? activeCls : inactiveCls}`
                  }
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </NavLink>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/settings"
                className="p-2 text-blue-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </Link>

              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(p => !p)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <Avatar src={avatarUrl} name={displayName} />
                  <span className="text-white text-sm font-medium max-w-[120px] truncate">{displayName}</span>
                  <ChevronDown className={`w-4 h-4 text-blue-200 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-20">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-xs text-gray-400">Signed in as</p>
                        <p className="text-sm font-semibold text-[#1e3a5f] truncate">{user?.email}</p>
                      </div>
                      <Link
                        to="/settings"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Settings className="w-4 h-4 text-gray-400" />
                        Settings
                      </Link>
                      <button
                        onClick={() => { setUserMenuOpen(false); handleSignOut() }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            <button
              className="md:hidden p-2 text-blue-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(p => !p)}
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`md:hidden fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      <div
        className={`md:hidden fixed top-0 right-0 h-full w-72 bg-[#142840] z-50 flex flex-col shadow-2xl transform transition-transform duration-300 ease-out overflow-y-auto ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <Link to="/dashboard" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
            <div className="w-7 h-7 bg-[#c9a84c] rounded-lg flex items-center justify-center">
              <Scale className="text-white w-3.5 h-3.5" />
            </div>
            <span className="text-white font-bold text-base">LegalEase</span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 text-blue-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
          <Avatar src={avatarUrl} name={displayName} size="lg" />
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm truncate">{displayName}</p>
            <p className="text-blue-300 text-xs truncate">{user?.email}</p>
          </div>
        </div>

        <nav className="px-3 py-4 space-y-1 flex-1">
          {NAV_LINKS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#c9a84c]/20 text-[#c9a84c]'
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 pb-6 pt-2 border-t border-white/10 space-y-1">
          <Link
            to="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-blue-100 hover:bg-white/10 hover:text-white transition-colors"
          >
            <Settings className="w-4 h-4 shrink-0" />
            Settings
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            Sign out
          </button>
        </div>
      </div>
    </>
  )
}

function Avatar({ src, name, size = 'sm' }) {
  const dim = size === 'lg' ? 'w-10 h-10 text-sm' : 'w-8 h-8 text-xs'
  const initials = name
    ?.split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || '?'

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${dim} rounded-full object-cover border-2 border-[#c9a84c]/40 shrink-0`}
      />
    )
  }

  return (
    <div className={`${dim} rounded-full bg-[#c9a84c] flex items-center justify-center font-bold text-white border-2 border-[#c9a84c]/60 shrink-0`}>
      {initials}
    </div>
  )
}
