import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AuthCallback() {
  const navigate = useNavigate()
  const { user, loading, profileComplete } = useAuth()

  // If user is already logged in, redirect immediately.
  // Do NOT navigate to /login when user=null and loading=false — the PKCE
  // code exchange fires INITIAL_SESSION(null) before it completes, which sets
  // loading=false while the exchange is still in flight.  AuthContext's own
  // SIGNED_IN handler calls navigate() once the session is ready.
  useEffect(() => {
    if (loading) return
    if (user) {
      navigate(profileComplete ? '/dashboard' : '/onboarding', { replace: true })
    }
    // No else — let AuthContext handle the post-PKCE navigation.
  }, [loading, user, profileComplete, navigate])

  // Hard safety timeout — never stuck longer than 15s
  useEffect(() => {
    const t = setTimeout(() => navigate('/login', { replace: true }), 15_000)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-[#1e3a5f] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#1e3a5f] text-sm font-medium">Signing you in…</p>
      </div>
    </div>
  )
}