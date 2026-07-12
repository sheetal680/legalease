import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Scale, Settings, LogOut, Menu, ChevronDown,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function Topbar({ onMenuOpen }) {
  const { user, profile, signOut } = useAuth()
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const displayName = profile?.full_name || user?.user_metadata?.full_name || 'Lawyer'
  const avatarUrl   = user?.user_metadata?.avatar_url

  async function handleSignOut() {
    try {
      await signOut()
      toast.success('Signed out')
    } catch {
      toast.error('Could not sign out. Try again.')
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 md:left-60 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-30 shadow-sm">

      {/* Hamburger (mobile only) */}
      <button
        className="md:hidden p-2 text-gray-500 hover:text-[#1e3a5f] rounded-lg hover:bg-gray-100 transition-colors"
        onClick={onMenuOpen}
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile logo (desktop logo lives in Sidebar) */}
      <Link
        to="/dashboard"
        className="md:hidden flex items-center gap-2"
      >
        <div className="w-7 h-7 bg-[#1e3a5f] rounded-lg flex items-center justify-center">
          <Scale className="text-[#c9a84c] w-3.5 h-3.5" />
        </div>
        <span className="text-[#1e3a5f] font-bold text-base tracking-tight">LegalEase</span>
      </Link>

      {/* Spacer (desktop) */}
      <div className="hidden md:block flex-1" />

      {/* Right: profile dropdown */}
      <div className="relative">
        <button
          onClick={() => setUserMenuOpen(p => !p)}
          className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <Avatar src={avatarUrl} name={displayName} />
          <span className="hidden sm:block text-sm font-medium text-gray-700 max-w-[120px] truncate">
            {displayName}
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
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
    </header>
  )
}

function Avatar({ src, name }) {
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
        className="w-8 h-8 rounded-full object-cover border-2 border-[#c9a84c]/40 shrink-0"
      />
    )
  }

  return (
    <div className="w-8 h-8 rounded-full bg-[#1e3a5f] flex items-center justify-center text-xs font-bold text-white border-2 border-[#c9a84c]/60 shrink-0">
      {initials}
    </div>
  )
}
