import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { authApi } from './api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    authApi.getSession().then((value) => {
      if (active) setSession(value)
    }).finally(() => {
      if (active) setLoading(false)
    })
    const unsubscribe = authApi.onSessionChange(setSession)
    return () => { active = false; unsubscribe() }
  }, [])

  const signInDemo = useCallback(async (role) => {
    const next = await authApi.signInDemo(role)
    setSession(next)
    return next
  }, [])

  const signIn = useCallback(async (credentials) => {
    const next = await authApi.signIn(credentials)
    setSession(next)
    return next
  }, [])
  const signUp = useCallback(async (details) => {
    const next = await authApi.signUp(details)
    setSession(next)
    return next
  }, [])
  const requestPasswordRecovery = useCallback((details) => authApi.requestPasswordRecovery(details), [])
  const signInWithApple = useCallback(() => authApi.signInWithApple(), [])
  const updatePassword = useCallback(async (details) => { const result = await authApi.updatePassword(details); setSession(null); return result }, [])

  const signOut = useCallback(async () => {
    await authApi.signOut()
    setSession(null)
  }, [])

  const value = useMemo(() => ({
    session,
    user: session?.user || null,
    loading,
    demoEnabled: authApi.isDemoEnabled(),
    authConfigured: authApi.isConfigured(),
    signInDemo,
    signIn,
    signUp,
    requestPasswordRecovery,
    signInWithApple,
    updatePassword,
    signOut,
  }), [session, loading, signInDemo, signIn, signUp, requestPasswordRecovery, signInWithApple, updatePassword, signOut])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider.')
  return context
}
