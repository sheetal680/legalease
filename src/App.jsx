import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { AuthProvider } from './context/AuthContext'
import { useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import AuthCallback from './pages/AuthCallback'
import OnboardingPage from './pages/OnboardingPage'
import DashboardPage from './pages/DashboardPage'
import Templates from './pages/Templates'
import Editor from './pages/Editor'
import Cases from './pages/Cases'
import LawyersPage from './pages/LawyersPage'
import ClientsPage from './pages/ClientsPage'
import SettingsPage from './pages/SettingsPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminAddAdvocate from './pages/admin/AdminAddAdvocate'
import AdminAddTemplate from './pages/admin/AdminAddTemplate'
import AdvocateHome from './pages/AdvocateHome'

const SKIP_ROUTES = new Set(['/', '/login', '/auth/callback', '/onboarding'])

function AdminRoute({ children }) {
  const { user, role, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  if (role !== 'admin') return <Navigate to="/" replace />
  return children
}

function AdvocateRoute({ children }) {
  const { user, role, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  if (role !== 'advocate') return <Navigate to="/" replace />
  return children
}

function RouteTracker() {
  const { pathname } = useLocation()
  if (!SKIP_ROUTES.has(pathname)) {
    try { localStorage.setItem('le_last_route', pathname) } catch {}
  }
  return null
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

        <RouteTracker />
        <Routes>

          {/* ---------- PUBLIC ---------- */}

          <Route
            path="/"
            element={<LandingPage />}
          />

          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            path="/auth/callback"
            element={<AuthCallback />}
          />

          {/* ---------- PROTECTED ---------- */}

          <Route
            path="/onboarding"
            element={
              <ProtectedRoute noNav>
                <OnboardingPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/templates"
            element={
              <ProtectedRoute>
                <Templates />
              </ProtectedRoute>
            }
          />

          <Route
            path="/editor/:documentId"
            element={
              <ProtectedRoute>
                <Editor />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cases"
            element={
              <ProtectedRoute>
                <Cases />
              </ProtectedRoute>
            }
          />

          <Route
            path="/clients"
            element={
              <ProtectedRoute>
                <ClientsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/lawyers"
            element={
              <ProtectedRoute>
                <LawyersPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />

          {/* ---------- ADMIN ---------- */}

          <Route
            path="/admin"
            element={<AdminRoute><AdminDashboard /></AdminRoute>}
          />
          <Route
            path="/admin/add-advocate"
            element={<AdminRoute><AdminAddAdvocate /></AdminRoute>}
          />
          <Route
            path="/admin/add-template"
            element={<AdminRoute><AdminAddTemplate /></AdminRoute>}
          />

          {/* ---------- ADVOCATE ---------- */}

          <Route
            path="/advocate-home"
            element={<AdvocateRoute><AdvocateHome /></AdvocateRoute>}
          />

          {/* ---------- FALLBACK ---------- */}

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

        </Routes>

      </AuthProvider>
    </BrowserRouter>
  )
}