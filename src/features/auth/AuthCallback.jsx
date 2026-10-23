import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'
export default function AuthCallback() {
  const { session, loading } = useAuth(); const navigate = useNavigate()
  const params = new URLSearchParams(window.location.hash.slice(1))
  const recovery = params.get('type') === 'recovery' || new URLSearchParams(window.location.search).get('type') === 'recovery'
  useEffect(() => { if (loading) return; if (recovery) navigate('/redefinir-senha', { replace: true }); else if (session) navigate(({ admin: '/app/admin', instructor: '/app/admin/aulas', mentor: '/app/mentor', student: '/app' })[session.user.role] || '/app', { replace: true }); else if (!window.location.hash.includes('access_token=')) navigate('/login', { replace: true }) }, [loading, recovery, navigate, session])
  return <main className="min-h-screen bg-ink p-8 text-snow" aria-live="polite">Concluindo autenticação…</main>
}
