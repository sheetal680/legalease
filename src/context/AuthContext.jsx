import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)
const SB_SESSION_KEY = 'sb-tkchrwpyrwoyibpfdhfl-auth-token'
const PROFILE_CACHE_KEY = 'le_profile_cache'
const ROLE_CACHE_KEY = 'le_role_cache'

function readUserFromStorage() {
  try {
    const raw = localStorage.getItem(SB_SESSION_KEY)
    if (!raw) return null
    const session = JSON.parse(raw)
    if (!session?.access_token) return null
    if (session.expires_at && Date.now() / 1000 > session.expires_at) return null
    return session.user ?? null
  } catch { return null }
}

function getCachedProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_CACHE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

function setCachedProfile(profile) {
  try {
    if (profile) localStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(profile))
    else localStorage.removeItem(PROFILE_CACHE_KEY)
  } catch {}
}

function getCachedRole() {
  try { return localStorage.getItem(ROLE_CACHE_KEY) || null } catch { return null }
}

function setCachedRole(role) {
  try {
    if (role) localStorage.setItem(ROLE_CACHE_KEY, role)
    else localStorage.removeItem(ROLE_CACHE_KEY)
  } catch {}
}

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const initialUser = readUserFromStorage()
  const cachedProfile = getCachedProfile()

  const [user, setUser]                   = useState(initialUser)
  const [profile, setProfile]             = useState(cachedProfile)
  const [profileComplete, setProfileComplete] = useState(Boolean(cachedProfile?.profile_complete))
  const [role, setRole]                   = useState(getCachedRole)
  const [loading, setLoading]             = useState(!(initialUser && Boolean(cachedProfile?.profile_complete)))

  // Fetches lawyer profile with a 5-second timeout
  const fetchProfile = useCallback(async (userId) => {
    try {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Profile fetch timed out after 5s')), 5000)
      )
      const fetchPromise = supabase
        .from('lawyer_profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle()
      const { data, error } = await Promise.race([fetchPromise, timeoutPromise])
      if (error) { console.error('Profile fetch error:', error); return null }
      return data
    } catch (err) {
      console.error('fetchProfile failed:', err.message)
      return null
    }
  }, [])

  // Fetches the user's role from user_roles table
  const fetchRole = useCallback(async (userId) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .maybeSingle()
      if (error) { console.error('Role fetch error:', error); return null }
      return data?.role ?? null
    } catch (err) {
      console.error('fetchRole failed:', err.message)
      return null
    }
  }, [])

  // Determines redirect path after a fresh login based on role + profile
  function resolvePostLoginRoute(userRole, profileData) {
    if (userRole === 'admin') return '/admin'
    if (userRole === 'advocate') return '/advocate-home'
    return profileData?.profile_complete ? '/dashboard' : '/onboarding'
  }

  const processSession = useCallback(async (session) => {
    if (!session?.user) {
      setUser(null)
      setProfile(null)
      setProfileComplete(false)
      setRole(null)
      setCachedProfile(null)
      setCachedRole(null)
      setLoading(false)
      return { profileData: null, userRole: null }
    }
    try {
      setUser(session.user)

      // Restore from cache immediately so UI isn't blank
      const cached = getCachedProfile()
      if (cached) {
        setProfile(cached)
        setProfileComplete(Boolean(cached.profile_complete))
      }
      const cachedR = getCachedRole()
      if (cachedR) setRole(cachedR)

      // Fetch both in parallel
      const [profileData, userRole] = await Promise.all([
        fetchProfile(session.user.id),
        fetchRole(session.user.id),
      ])

      if (profileData) {
        setCachedProfile(profileData)
        setProfile(profileData)
        setProfileComplete(Boolean(profileData.profile_complete))
      } else {
        setCachedProfile(null)
        setProfile(null)
        setProfileComplete(false)
      }

      setCachedRole(userRole)
      setRole(userRole)

      return { profileData, userRole }
    } catch (err) {
      console.error('processSession error:', err)
      return { profileData: null, userRole: null }
    } finally {
      setLoading(false)
    }
  }, [fetchProfile, fetchRole])

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        switch (event) {

          case 'INITIAL_SESSION':
            if (!session && new URLSearchParams(window.location.search).has('code')) {
              break
            }
            {
              const { profileData } = await processSession(session)
              if (profileData?.profile_complete) {
                const lastRoute = localStorage.getItem('le_last_route')
                if (lastRoute && lastRoute !== '/dashboard') {
                  localStorage.removeItem('le_last_route')
                  navigate(lastRoute, { replace: true })
                }
              }
            }
            break

          case 'SIGNED_IN': {
            const { profileData, userRole } = await processSession(session)
            const AUTH_PAGES = ['/', '/login', '/auth/callback', '/onboarding']
            if (AUTH_PAGES.includes(window.location.pathname)) {
              navigate(resolvePostLoginRoute(userRole, profileData), { replace: true })
            }
            break
          }

          case 'TOKEN_REFRESHED':
          case 'USER_UPDATED':
            break

          case 'SIGNED_OUT':
            setUser(null)
            setProfile(null)
            setProfileComplete(false)
            setRole(null)
            setCachedProfile(null)
            setCachedRole(null)
            setLoading(false)
            navigate('/', { replace: true })
            break

          default:
            break
        }
      }
    )
    return () => subscription.unsubscribe()
  }, [processSession, navigate])

  const signInWithGoogle = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        skipBrowserRedirect: false,
      },
    })
    if (error) throw error
  }, [])

  const signInWithEmail = useCallback(async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }, [])

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }, [])

  const refreshProfile = useCallback(async () => {
    if (!user) return
    const profileData = await fetchProfile(user.id)
    if (profileData) {
      setCachedProfile(profileData)
      setProfile(profileData)
      setProfileComplete(Boolean(profileData.profile_complete))
    }
  }, [user, fetchProfile])

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      profileComplete,
      role,
      loading,
      signInWithGoogle,
      signInWithEmail,
      signOut,
      refreshProfile,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
