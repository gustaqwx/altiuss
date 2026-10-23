import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './AuthProvider'

export default function ProtectedRoute({ allowedRoles, children }) {
  const { session, loading } = useAuth()
  const location = useLocation()

  if (loading) return <main className="min-h-screen bg-ink p-8 text-snow" aria-live="polite">Carregando sessão…</main>
  if (!session) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  if (allowedRoles && !allowedRoles.includes(session.user.role)) {
    const home = { admin: '/app/admin', instructor: '/app/admin/aulas', mentor: '/app/mentor', student: '/app' }[session.user.role] || '/app'
    return <Navigate to={home} replace />
  }
  return children || <Outlet />
}
