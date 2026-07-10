import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

// ─── Profile cache (localStorage) ────────────────────────────
const PROFILE_CACHE_KEY = 'le_profile_cache'

function getCachedProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_CACHE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function setCachedProfile(profile) {
  try {
    if (profile) localStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(profile))
    else localStorage.removeItem(PROFILE_CACHE_KEY)
  } catch {}
}
// ─────────────────────────────────────────────────────────────

export function AuthProvider({ children }) {
  const navigate = useNavigate()

  // Read cache SYNCHRONOUSLY so we can set loading=false immediately
  // on return visits — user sees dashboard instantly, no spinner wait.
  const cachedProfile = getCachedProfile()

  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(cachedProfile)
  const [profileComplete, setProfileComplete] = useState(
    Boolean(cachedProfile?.profile_complete)
  )
  // If we already have a cached profile, skip the loading spinner entirely
  const [loading, setLoading] = useState(!cachedProfile)

  // ── Fetch profile from Supabase ────────────────────────────
  const fetchProfile = useCallback(async (userId) => {
    const { data, error } = await supabase
      .from('lawyer_profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle()

    if (error) {
      console.error('Profile Error:', error)
      return null
    }

    return data
  }, [])

  // ── Process a Supabase session ─────────────────────────────
  // IMPORTANT: No location.pathname in deps — this must NOT
  // be recreated on every navigation.
  const processSession = useCallback(
    async (session) => {
      if (!session?.user) {
        setUser(null)
        setProfile(null)
        setProfileComplete(false)
        setLoading(false)
        setCachedProfile(null)
        return
      }

      setUser(session.user)

      // Show UI immediately using cached profile (zero network wait)
      const cached = getCachedProfile()
      if (cached) {
        setProfile(cached)
        setProfileComplete(Boolean(cached.profile_complete))
        setLoading(false)
      }

      // Fetch fresh profile from network in the background
      const profileData = await fetchProfile(session.user.id)

      if (profileData) {
        setCachedProfile(profileData)
        setProfile(profileData)
        setProfileComplete(Boolean(profileData.profile_complete))
      }

      // In case there was no cache, mark loading done now
      setLoading(false)
    },
    [fetchProfile]
  )

  // ── Auth state listener ────────────────────────────────────
  useEffect(() => {
    // KEY FIX: Do NOT call getSession() / initializeAuth() manually here.
    // supabase.auth.onAuthStateChange fires INITIAL_SESSION automatically
    // when a session exists — calling getSession() as well causes
    // processSession (and fetchProfile) to run TWICE, adding 1-2 seconds.

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      switch (event) {
        case 'INITIAL_SESSION':
        case 'SIGNED_IN':
        case 'TOKEN_REFRESHED':
        case 'USER_UPDATED':
          await processSession(session)
          break

        case 'SIGNED_OUT':
          setUser(null)
          setProfile(null)
          setProfileComplete(false)
          setLoading(false)
          setCachedProfile(null)
          navigate('/', { replace: true })
          break

        default:
          break
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [processSession, navigate])

  // ── Google OAuth ───────────────────────────────────────────
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

  // ── Sign out ───────────────────────────────────────────────
  // Do NOT call navigate() here — SIGNED_OUT event above handles it.
  // Calling navigate here too causes double navigation.
  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }, [])

  // ── Refresh profile (call after onboarding saves) ──────────
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
    <AuthContext.Provider
      value={{
        user,
        profile,
        profileComplete,
        loading,
        signInWithGoogle,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
