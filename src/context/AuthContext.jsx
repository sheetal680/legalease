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

  const fetchProfile = useCallback(async (userId) => {
    const { data, error } = await supabase
      .from('lawyer_profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle()

    if (error) {
      console.error(error)
      return null
    }

    return data
  }, [])

  const processUser = useCallback(
    async (session) => {
      if (!session?.user) {
        setUser(null)
        setProfile(null)
        setProfileComplete(false)
        setLoading(false)

        if (location.pathname !== '/login') {
          navigate('/login', { replace: true })
        }

        return
      }

      setUser(session.user)

      const profileData = await fetchProfile(session.user.id)

      setProfile(profileData)

      const completed = Boolean(profileData?.profile_complete)

      setProfileComplete(completed)

      setLoading(false)

      const current = location.pathname

      if (
        current === '/' ||
        current === '/login' ||
        current.startsWith('/auth')
      ) {
        if (completed) {
          navigate('/dashboard', { replace: true })
        } else {
          navigate('/onboarding', { replace: true })
        }
      }
    },
    [fetchProfile, navigate, location.pathname]
  )

  useEffect(() => {
    let mounted = true

    async function init() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!mounted) return

      await processUser(session)
    }

    init()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('AUTH EVENT:', event)

      switch (event) {
        case 'INITIAL_SESSION':
        case 'SIGNED_IN':
        case 'TOKEN_REFRESHED':
        case 'USER_UPDATED':
          await processUser(session)
          break

        case 'SIGNED_OUT':
          setUser(null)
          setProfile(null)
          setProfileComplete(false)
          setLoading(false)

          navigate('/login', { replace: true })
          break

        default:
          break
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [processUser, navigate])
    const signInWithGoogle = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
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

    setProfile(profileData)
    setProfileComplete(Boolean(profileData?.profile_complete))
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