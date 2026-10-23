import { Navigate } from 'react-router-dom'
import { useAuth } from '../features/auth/AuthProvider'

export default function PlatformEntry() {
  const { session, loading } = useAuth()
  if (loading) return <main className="min-h-screen bg-ink p-8 text-snow" role="status">Carregando sessão…</main>
  return <Navigate to={session ? '/app' : '/login'} replace />
}
