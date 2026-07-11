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

// ── Supabase session key in localStorage ──────────────────────
const SB_SESSION_KEY = 'sb-tkchrwpyrwoyibpfdhfl-auth-token'

// ── Profile cache key ─────────────────────────────────────────
const PROFILE_CACHE_KEY = 'le_profile_cache'

// Read the Supabase user SYNCHRONOUSLY from localStorage.
// This lets us initialize user state before any async work,
// so the component tree renders with user already set.
function readUserFromStorage() {
  try {
    const raw = localStorage.getItem(SB_SESSION_KEY)
    if (!raw) return null
    const session = JSON.parse(raw)
    if (!session?.access_token) return null
    // If token is expired, don't use it (Supabase will refresh via INITIAL_SESSION)
    if (session.expires_at && Date.now() / 1000 > session.expires_at) return null
    return session.user ?? null
  } catch {
    return null
  }
}

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

export function AuthProvider({ children }) {
  const navigate = useNavigate()

  // Read SYNCHRONOUSLY — these run before the first render
  const initialUser    = readUserFromStorage()
  const cachedProfile  = getCachedProfile()

  // Initialize state with what we already know — no waiting
  const [user,            setUser]            = useState(initialUser)
  const [profile,         setProfile]         = useState(cachedProfile)
  const [profileComplete, setProfileComplete] = useState(Boolean(cachedProfile?.profile_complete))

  // loading=false immediately if we have a user (even without profile)
  // The dashboard renders fine with profile=null; profile fills in from cache or network.
  const [loading, setLoading] = useState(!initialUser)

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

      // Set user immediately — this is the gate for ProtectedRoute
      setUser(session.user)

      // Apply cache immediately so dashboard shows real data at once
      const cached = getCachedProfile()
      if (cached) {
        setProfile(cached)
        setProfileComplete(Boolean(cached.profile_complete))
      }

      // loading=false as soon as user is known — do NOT wait for profile fetch
      setLoading(false)

      // Fetch fresh profile from network in the background (non-blocking)
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
    },
    [fetchProfile]
  )

  useEffect(() => {
    // Do NOT call getSession() here — INITIAL_SESSION covers it.
    // Calling getSession() separately makes processSession run twice.
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

  // Do NOT call navigate() here — SIGNED_OUT event handles it
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
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
