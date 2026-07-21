import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { AuthProvider } from './context/AuthContext'
import { useAuth } from './context/AuthContext'

import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import AuthCallback from './pages/AuthCallback'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminAddAdvocate from './pages/admin/AdminAddAdvocate'
import AdminAddTemplate from './pages/admin/AdminAddTemplate'

function AdminRoute({ children }) {
  const { user, role, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  if (role !== 'admin') return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              borderRadius: '8px',
              background: '#1e3a5f',
              color: '#fff',
            },
          }}
        />

        <Routes>

          {/* ---------- PUBLIC ---------- */}

          <Route path="/"             element={<LandingPage />} />
          <Route path="/login"        element={<LoginPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* ---------- ADMIN ---------- */}

          <Route path="/admin"               element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/add-advocate"  element={<AdminRoute><AdminAddAdvocate /></AdminRoute>} />
          <Route path="/admin/add-template"  element={<AdminRoute><AdminAddTemplate /></AdminRoute>} />

          {/* ---------- FALLBACK ---------- */}

          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

      </AuthProvider>
    </BrowserRouter>
  )
}
