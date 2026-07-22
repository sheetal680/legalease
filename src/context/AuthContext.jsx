import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const USERNAME = 'ARSHITH'
const PASSWORD = 'CHACHI123'

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => sessionStorage.getItem('la_auth') === 'true')

  function login(username, password) {
    if (username.trim().toUpperCase() === USERNAME && password === PASSWORD) {
      sessionStorage.setItem('la_auth', 'true')
      setIsLoggedIn(true)
      return true
    }
    return false
  }

  function logout() {
    sessionStorage.removeItem('la_auth')
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
