import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const location = useLocation()

  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [profileComplete, setProfileComplete] = useState(false)
  const [loading, setLoading] = useState(true)

  // -------------------------------------------------
  // Load lawyer profile
  // -------------------------------------------------

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

  // -------------------------------------------------
  // Handle logged in user
  // -------------------------------------------------

  const processSession = useCallback(
    async (session) => {
      // -------------------------------
      // User NOT logged in
      // -------------------------------

      if (!session?.user) {
        setUser(null)
        setProfile(null)
        setProfileComplete(false)
        setLoading(false)

        // IMPORTANT:
        // Do NOT redirect visitors to /login.
        // Allow Landing Page to remain visible.
        return
      }

      // -------------------------------
      // User logged in
      // -------------------------------

      setUser(session.user)

      const profileData = await fetchProfile(session.user.id)

      setProfile(profileData)

      const completed = Boolean(profileData?.profile_complete)

      setProfileComplete(completed)

      setLoading(false)

      const currentPath = location.pathname

      // Only redirect when coming from
      // landing page or login page.

      if (
        currentPath === '/' ||
        currentPath === '/login'
      ) {
        if (completed) {
          navigate('/dashboard', {
            replace: true,
          })
        } else {
          navigate('/onboarding', {
            replace: true,
          })
        }
      }
    },
    [
      fetchProfile,
      navigate,
      location.pathname,
    ]
  )

  // -------------------------------------------------
  // Restore session on refresh
  // -------------------------------------------------

  useEffect(() => {
    let mounted = true

    async function initializeAuth() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!mounted) return

      await processSession(session)
    }

    initializeAuth()
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

          // User intentionally logged out
          navigate('/', {
            replace: true,
          })
          break

        default:
          break
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [processSession, navigate])

  // -------------------------------------------------
  // Google Login
  // -------------------------------------------------

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

  // -------------------------------------------------
  // Logout
  // -------------------------------------------------

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut()

    if (error) throw error

    setUser(null)
    setProfile(null)
    setProfileComplete(false)

    navigate('/', {
      replace: true,
    })
  }, [navigate])

  // -------------------------------------------------
  // Refresh Profile
  // -------------------------------------------------

  const refreshProfile = useCallback(async () => {
    if (!user) return

    const profileData = await fetchProfile(user.id)

    setProfile(profileData)

    setProfileComplete(
      Boolean(profileData?.profile_complete)
    )
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
    throw new Error(
      'useAuth must be used inside AuthProvider'
    )
  }

  return context
}