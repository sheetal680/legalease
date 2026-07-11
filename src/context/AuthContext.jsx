import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)
const SB_SESSION_KEY = 'sb-tkchrwpyrwoyibpfdhfl-auth-token'
const PROFILE_CACHE_KEY = 'le_profile_cache'

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

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const initialUser = readUserFromStorage()
  const cachedProfile = getCachedProfile()

  const [user, setUser] = useState(initialUser)
  const [profile, setProfile] = useState(cachedProfile)
  const [profileComplete, setProfileComplete] = useState(Boolean(cachedProfile?.profile_complete))
  const [loading, setLoading] = useState(!(initialUser && Boolean(cachedProfile?.profile_complete)))

  const fetchProfile = useCallback(async (userId) => {
    const { data, error } = await supabase
      .from('lawyer_profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle()
    if (error) { console.error('Profile fetch error:', error); return null }
    return data
  }, [])

  const processSession = useCallback(async (session) => {
    if (!session?.user) {
      setUser(null)
      setProfile(null)
      setProfileComplete(false)
      setCachedProfile(null)
      setLoading(false)
      return null
    }
    try {
      setUser(session.user)
      const cached = getCachedProfile()
      if (cached) {
        setProfile(cached)
        setProfileComplete(Boolean(cached.profile_complete))
      }
      const profileData = await fetchProfile(session.user.id)
      if (profileData) {
        setCachedProfile(profileData)
        setProfile(profileData)
        setProfileComplete(Boolean(profileData.profile_complete))
      } else {
        setCachedProfile(null)
        setProfile(null)
        setProfileComplete(false)
      }
      return profileData
    } catch (err) {
      console.error('processSession error:', err)
      return null
    } finally {
      setLoading(false)
    }
  }, [fetchProfile])

  useEffect(() => {
    const isOAuthCallback = () =>
      new URL(window.location.href).searchParams.has('code')

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        switch (event) {

          case 'INITIAL_SESSION':
            // On the OAuth callback page (?code=...), INITIAL_SESSION fires with a
            // null session before the code has been exchanged. Skip it so loading
            // stays true — the SIGNED_IN event below handles everything.
            if (isOAuthCallback()) break
            await processSession(session)
            break

          case 'SIGNED_IN': {
            // Fires after the OAuth code exchange completes.
            // We fetch profile here and navigate AFTER we have the confirmed value
            // from DB — eliminating the race condition with LandingPage.
            const profileData = await processSession(session)
            if (isOAuthCallback()) {
              navigate(
                profileData?.profile_complete ? '/dashboard' : '/onboarding',
                { replace: true }
              )
            }
            break
          }

          case 'TOKEN_REFRESHED':
          case 'USER_UPDATED':
            await processSession(session)
            break

          case 'SIGNED_OUT':
            setUser(null)
            setProfile(null)
            setProfileComplete(false)
            setCachedProfile(null)
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
        redirectTo: `${window.location.origin}/`,
        skipBrowserRedirect: false,
      },
    })
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
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
