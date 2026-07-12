import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * Dedicated OAuth / PKCE callback page.
 *
 * Google now redirects to /auth/callback?code=… instead of /?code=…
 * This page shows a spinner and waits for AuthContext to resolve the
 * session (via INITIAL_SESSION or SIGNED_IN).  Once loading is false
 * and a user is available, it navigates to the correct destination.
 *
 * AuthContext's SIGNED_IN handler also calls navigate() independently,
 * so the user always reaches the right page even if one path is faster.
 */
export default function AuthCallback() {
  const navigate = useNavigate()
  const { user, loading, profileComplete } = useAuth()

  // Navigate as soon as AuthContext resolves the session
  useEffect(() => {
    if (loading) return                          // still exchanging the code
    if (user) {
      navigate(profileComplete ? '/dashboard' : '/onboarding', { replace: true })
    }
    // loading=false + user=null → INITIAL_SESSION fired with null (code exchange
    // still in flight).  SIGNED_IN will fire next; its AuthContext handler
    // calls navigate() directly, so we just keep showing the spinner.
  }, [loading, user, profileComplete, navigate])

  // Safety net: if nothing resolves in 15 s, bail to login
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
