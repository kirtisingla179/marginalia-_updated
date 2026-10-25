import { createContext, useContext, useState, useCallback } from 'react'
import * as authService from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getCurrentUser())

  // Both return a Promise; a rejected Promise (bad login etc.) is handled by the caller.
  const login = useCallback(async (email, password) => {
    const loggedIn = await authService.login(email, password)
    setUser(loggedIn)
    return loggedIn
  }, [])

  const signup = useCallback(async (details) => {
    const created = await authService.signup(details)
    setUser(created)
    return created
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