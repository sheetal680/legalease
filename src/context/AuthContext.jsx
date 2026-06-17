import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]                       = useState(null)
  const [profile, setProfile]                 = useState(null)
  const [profileComplete, setProfileComplete] = useState(false)
  const [loading, setLoading]                 = useState(true)
  const navigate = useNavigate()

  // Track current user in a ref so the auth listener closure is never stale
  const userRef = useRef(null)
  useEffect(() => { userRef.current = user }, [user])

  // ── Fetch helpers ────────────────────────────────────────────────────────────

  const fetchProfile = useCallback(async (userId) => {
    const { data, error } = await supabase
      .from('lawyer_profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle()
    if (error) console.error('Error fetching profile:', error.message)
    return data ?? null
  }, [])

  // ── Session handler ──────────────────────────────────────────────────────────

  const handleSession = useCallback(async (session, isInitial = false) => {
    if (!session?.user) {
      setUser(null)
      setProfile(null)
      setProfileComplete(false)
      setLoading(false)
      return
    }

    setUser(session.user)
    userRef.current = session.user

    const profileData = await fetchProfile(session.user.id)
    setProfile(profileData)

    const complete = Boolean(profileData?.profile_complete)
    setProfileComplete(complete)
    setLoading(false)

    if (!isInitial) {
      if (!profileData || !complete) {
        navigate('/onboarding')
      } else {
        navigate('/dashboard')
      }
    }
  }, [fetchProfile, navigate])

  // ── Auth state listener ──────────────────────────────────────────────────────

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSession(session, true)
    })

    const { data: { subscription: authListener } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (_event === 'SIGNED_IN') {
        // Only navigate on a genuine new sign-in.
        // If the user is already authenticated (same user ID), this is a silent
        // session/token refresh triggered by tab focus — just update state, no redirect.
        const previousUserId = userRef.current?.id
        const incomingUserId = session?.user?.id

        if (!previousUserId || previousUserId !== incomingUserId) {
          handleSession(session, false)
        } else {
          // Session refreshed for the same user — update quietly
          setUser(session.user)
        }
      } else if (_event === 'SIGNED_OUT') {
        setUser(null)
        setProfile(null)
        setProfileComplete(false)
        setLoading(false)
        navigate('/login')
      }
    })

    return () => authListener.unsubscribe()
  }, [handleSession, navigate])

  // ── Actions ──────────────────────────────────────────────────────────────────

  const signInWithGoogle = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
    if (error) throw error
  }, [])

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }, [])

  const refreshProfile = useCallback(async () => {
    if (!user) return
    const data = await fetchProfile(user.id)
    setProfile(data)
    setProfileComplete(Boolean(data?.profile_complete))
  }, [user, fetchProfile])

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      profileComplete,
      loading,
      signInWithGoogle,
      signOut,
      refreshProfile,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
