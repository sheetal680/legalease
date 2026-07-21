import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LandingPage() {
  const { user, role, loading } = useAuth()

  if (loading) return null

  if (user && role === 'admin') return <Navigate to="/admin" replace />
  return <Navigate to="/login" replace />
}
