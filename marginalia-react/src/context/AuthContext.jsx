import { createContext, useContext, useState, useCallback } from 'react'
import * as authService from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getCurrentUser())

  const login = useCallback((email, password) => {
    const result = authService.login(email, password)
    if (result.ok) setUser(result.user)
    return result
  }, [])

  const signup = useCallback((details) => {
    const result = authService.signup(details)
    if (result.ok) setUser(result.user)
    return result
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
