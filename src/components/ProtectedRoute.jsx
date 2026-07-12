import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Topbar from './Navbar'
import Sidebar from './layout/Sidebar'

export default function ProtectedRoute({ children, noNav = false }) {
  const { user, loading } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#1e3a5f] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#1e3a5f] text-sm font-medium">Loading your workspace...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (noNav) {
    return children
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Topbar onMenuOpen={() => setSidebarOpen(true)} />

      {/* Content area: offset for sidebar (desktop) and topbar */}
      <main className="md:ml-60 pt-14">
        {children}
      </main>
    </div>
  )
}
