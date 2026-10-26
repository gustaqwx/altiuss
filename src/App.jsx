import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Landing from './pages/Landing'
import PlatformEntry from './pages/PlatformEntry'
import Checkout from './pages/Checkout'
import AuthPage from './pages/AuthPage'
import LegalPage from './pages/LegalPage'
import { AuthProvider } from './features/auth/AuthProvider'
import ProtectedRoute from './features/auth/ProtectedRoute'
import AuthCallback from './features/auth/AuthCallback'
import PlatformLayout from './pages/Platform'
import PlatformHomePage from './features/platform/PlatformHomePage'
import ActivityPage from './pages/Activity'
import NotificationsPage from './pages/Notifications'
import LessonListPage from './pages/LessonLibrary'
import LessonDetailPage from './pages/LessonDetail'
import LessonAdminPage from './pages/LessonAdministration'
import LiveSessionsPage from './pages/LiveSessions'
import LiveSessionDetailPage from './pages/LiveSession'
import StudentsPage from './pages/Students'
import AdminHomePage from './pages/AdminHome'
import DirectoryPage from './pages/Directory'
import ReviewQueuePage from './pages/ReviewQueue'
import ReviewDetailPage from './pages/Review'
import MentoringPage from './pages/Mentoring'
import { routes } from './config/site'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return <AuthProvider><ScrollToTop /><Routes>
    <Route path={routes.home} element={<PlatformEntry />} />
    <Route path="/programa" element={<Landing />} />
    <Route path={routes.checkout} element={<Checkout />} />
    <Route path="/login" element={<AuthPage mode="login" />} />
    <Route path="/registro" element={<AuthPage mode="register" />} />
    <Route path="/recuperar-senha" element={<AuthPage mode="recovery" />} />
    <Route path="/auth/callback" element={<AuthCallback />} />
    <Route path="/redefinir-senha" element={<AuthPage mode="reset" />} />
    <Route path={routes.privacy} element={<LegalPage type="privacidade" />} />
    <Route path={routes.terms} element={<LegalPage type="termos" />} />
    <Route element={<ProtectedRoute />}><Route element={<PlatformLayout />}>
      <Route path="/app" element={<PlatformHomePage />} />
      <Route path="/app/atividades/:id" element={<ProtectedRoute allowedRoles={['student']}><ActivityPage /></ProtectedRoute>} />
      <Route path="/app/aulas" element={<ProtectedRoute allowedRoles={['student', 'mentor', 'admin']}><LessonListPage /></ProtectedRoute>} />
      <Route path="/app/aulas/:id" element={<ProtectedRoute allowedRoles={['student', 'mentor', 'admin']}><LessonDetailPage /></ProtectedRoute>} />
      <Route path="/app/notificacoes" element={<NotificationsPage />} />
      <Route path="/app/mentor" element={<ProtectedRoute allowedRoles={['mentor']}><StudentsPage /></ProtectedRoute>} />
      <Route path="/app/mentor/revisao" element={<ProtectedRoute allowedRoles={['mentor', 'admin']}><ReviewQueuePage /></ProtectedRoute>} />
      <Route path="/app/mentor/revisao/:id" element={<ProtectedRoute allowedRoles={['mentor', 'admin']}><ReviewDetailPage /></ProtectedRoute>} />
      <Route path="/app/mentor/mentoria" element={<ProtectedRoute allowedRoles={['mentor']}><MentoringPage /></ProtectedRoute>} />
      <Route path="/app/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminHomePage /></ProtectedRoute>} />
      <Route path="/app/admin/aulas" element={<ProtectedRoute allowedRoles={['admin', 'instructor']}><LessonAdminPage /></ProtectedRoute>} />
      <Route path="/app/alunos" element={<ProtectedRoute allowedRoles={['admin', 'instructor']}><StudentsPage /></ProtectedRoute>} />
      <Route path="/app/ao-vivo" element={<LiveSessionsPage />} />
      <Route path="/app/ao-vivo/:id" element={<LiveSessionDetailPage />} />
      <Route path="/app/mentores" element={<ProtectedRoute allowedRoles={['admin']}><DirectoryPage kind="mentors" /></ProtectedRoute>} />
      <Route path="/app/equipe" element={<ProtectedRoute allowedRoles={['admin']}><DirectoryPage kind="team" /></ProtectedRoute>} />
    </Route></Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></AuthProvider>
}
