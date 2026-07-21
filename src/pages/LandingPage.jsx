import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Admin site has no public landing page.
// Logged-in admins → /admin. Everyone else → /login.
export default function LandingPage() {
  const { user, role, loading } = useAuth()

  if (loading) return null

  if (user) {
    return <Navigate to={role === 'admin' ? '/admin' : '/login'} replace />
  }

  return <Navigate to="/login" replace />
}
