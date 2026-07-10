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

export function AuthProvider({ children }) {
  const navigate = useNavigate()

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
        return
      }

      setUser(session.user)

      const profileData = await fetchProfile(session.user.id)

      setProfile(profileData)

      const completed = Boolean(profileData?.profile_complete)

      setProfileComplete(completed)

      setLoading(false)
    },
    [fetchProfile]
  )

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
          navigate('/', { replace: true })
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
