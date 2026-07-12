import { NavLink } from 'react-router-dom'
import {
  Scale,
  LayoutDashboard,
  FileText,
  Briefcase,
  Users,
  UserCircle,
  Settings,
} from 'lucide-react'

const MAIN_NAV = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/templates', label: 'Templates',  icon: FileText },
  { to: '/cases',     label: 'My Cases',   icon: Briefcase },
  { to: '/lawyers',   label: 'My Lawyers', icon: Users },
  { to: '/clients',   label: 'Clients',    icon: UserCircle },
]

function NavItem({ to, label, icon: Icon, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-[10px] px-5 py-3 text-sm font-medium transition-colors relative ${
          isActive
            ? 'text-[#b8960c] bg-white/15 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-[#b8960c] before:rounded-r'
            : 'text-white hover:bg-white/[0.08]'
        }`
      }
    >
      <Icon className="w-4 h-4 shrink-0" />
      {label}
    </NavLink>
  )
}

export default function Sidebar({ mobileOpen, onClose }) {
  return (
    <>
      {/* ── Desktop sidebar ─────────────────────────────────── */}
      <aside className="hidden md:flex flex-col fixed inset-y-0 left-0 w-60 bg-[#1e3a5f] z-40">
        <SidebarContent />
      </aside>

      {/* ── Mobile overlay ──────────────────────────────────── */}
      <div
        className={`md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Mobile drawer ───────────────────────────────────── */}
      <aside
        className={`md:hidden fixed inset-y-0 left-0 w-60 bg-[#1e3a5f] z-50 flex flex-col shadow-2xl transform transition-transform duration-300 ease-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent onClose={onClose} />
      </aside>
    </>
  )
}

function SidebarContent({ onClose }) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/10">
        <div className="w-8 h-8 bg-[#c9a84c] rounded-lg flex items-center justify-center shrink-0">
          <Scale className="text-white w-4 h-4" />
        </div>
        <span className="text-white font-bold text-lg tracking-tight">LegalEase</span>
      </div>

      {/* Main nav */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {MAIN_NAV.map(item => (
          <NavItem key={item.to} {...item} onClick={onClose} />
        ))}
      </nav>

      {/* Divider + Settings */}
      <div className="border-t border-white/10 py-3">
        <NavItem to="/settings" label="Settings" icon={Settings} onClick={onClose} />
      </div>
    </div>
  )
}
