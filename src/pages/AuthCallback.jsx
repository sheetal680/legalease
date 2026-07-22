import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AuthCallback() {
  const { user, loading, role } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (loading) return
    if (user) navigate(role === 'admin' ? '/admin' : '/login', { replace: true })
  }, [loading, user, role, navigate])
  useEffect(() => {
    const t = setTimeout(() => navigate('/login', { replace: true }), 10000)
    return () => clearTimeout(t)
  }, [navigate])
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}
