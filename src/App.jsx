import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { AuthProvider } from './context/AuthContext'
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
import SettingsPage from './pages/SettingsPage'

const SKIP_ROUTES = new Set(['/', '/login', '/auth/callback', '/onboarding'])

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