import { phases, competencies } from '../../lib/model'
import { extractYouTubeId } from '../../config/video'
import { saoPauloLocalToIso } from '../../lib/time'

const demoMode = import.meta.env.VITE_DEMO_MODE === 'true' && !import.meta.env.PROD
const DB_KEY = 'altius-directio-platform-demo-v1'
const exampleActivityNames = phases.flatMap((phase, phaseIndex) => phase.activities.map((title, index) => ({
  id: `activity-${phaseIndex + 1}-${index + 1}`, phase: phase.name, phaseIndex, title, position: index + 1,
  criteria: ['Critérios de avaliação: A definir com a Altius'], dueAt: null,
})))
function seed() {
  const activities = exampleActivityNames.map((activity, index) => ({ ...activity,
    state: index === 0 ? 'in_progress' : 'not_started', versions: [], feedback: null,
  }))
  return {
    activities,
    lessons: [
      { id: 'lesson-example-1', title: 'Fundamentos de TI — exemplo', description: 'Aula de demonstração; conteúdo e currículo: A definir com a Altius.', youtube_video_id: 'DEMOEXEMP01', axis: 'Explorar', position: 1, status: 'published', created_by: 'demo-instructor', isExample: true },
      { id: 'lesson-example-2', title: 'Trilhas de hard skills — exemplo', description: 'Aula de demonstração; conteúdo: A definir com a Altius.', youtube_video_id: 'DEMOEXEMP02', axis: 'Desenvolver', position: 1, status: 'published', created_by: 'demo-instructor', isExample: true },
      { id: 'lesson-example-3', title: 'Portfólio técnico — exemplo', description: 'Aula de demonstração; conteúdo: A definir com a Altius.', youtube_video_id: 'DEMOEXEMP03', axis: 'Aplicar', position: 1, status: 'draft', created_by: 'demo-instructor', isExample: true },
    ],
    liveSessions: [
      { id: 'live-example-meeting', title: 'Encontro ao vivo — exemplo', mode: 'meeting', meeting_url: 'https://example.com/sala-de-exemplo', youtube_video_id: null, starts_at: '2026-11-05T18:00:00-03:00', status: 'scheduled', created_by: 'demo-instructor', isExample: true },
      { id: 'live-example-youtube', title: 'Transmissão ao vivo — exemplo', mode: 'youtube_live', meeting_url: null, youtube_video_id: 'DEMOEXEMP04', starts_at: '2026-11-12T18:00:00-03:00', status: 'scheduled', created_by: 'demo-instructor', isExample: true },
    ],
    people: [
      { id: 'demo-student', name: 'Ana Souza', role: 'student', phase: 'Desenvolver', progress: 28, lastActivity: 'Hoje', email: 'student@exemplo.invalid', enrollment: 'exemplo', mentor: 'Marina Costa' },
      { id: 'demo-student-2', name: 'Lucas Lima', role: 'student', phase: 'Explorar', progress: 12, lastActivity: 'Ontem', email: 'aluno2@exemplo.invalid', enrollment: 'exemplo', mentor: 'Marina Costa' },
      { id: 'demo-student-3', name: 'Bia Alves', role: 'student', phase: 'Aplicar', progress: 61, lastActivity: 'Há 3 dias', email: 'aluno3@exemplo.invalid', enrollment: 'exemplo', mentor: 'Rafael Nunes' },
      { id: 'demo-mentor', name: 'Marina Costa', role: 'mentor', email: 'mentor@exemplo.invalid' },
      { id: 'demo-instructor', name: 'Instrutor de exemplo', role: 'instructor', email: 'instructor@exemplo.invalid' },
      { id: 'demo-admin', name: 'Equipe Altius', role: 'admin', email: 'admin@exemplo.invalid' },
    ],
    mentorStudents: [{ mentorId: 'demo-mentor', studentId: 'demo-student' }, { mentorId: 'demo-mentor', studentId: 'demo-student-2' }, { mentorId: 'demo-mentor', studentId: 'demo-student-3' }],
    submissions: [], notifications: [{ id: 'notification-example', title: 'Dados de demonstração carregados', read: false, isExample: true }],
    mentoringSessions: [], attendance: [], completions: [],
  }
}
function readDb() {
  if (!demoMode) throw new Error('Dados reais exigem backend Supabase configurado. A demonstração está desativada.')
  try { return { ...seed(), ...JSON.parse(localStorage.getItem(DB_KEY) || '{}') } } catch { return seed() }
}
function writeDb(db) { localStorage.setItem(DB_KEY, JSON.stringify(db)); return db }
function currentUser() { try { return JSON.parse(sessionStorage.getItem('altius-directio-demo-session') || 'null')?.user } catch { return null } }
function isAdmin(user = currentUser()) { return user?.role === 'admin' }
function isOwner(record, user = currentUser()) { return isAdmin(user) || record.created_by === user?.id }
function requireDemo() { if (!demoMode) throw new Error('Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY para conectar os dados reais.') }

async function rest(path, options = {}) {
  const url = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, '')
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY
  let session = null
  try { session = JSON.parse(localStorage.getItem('altius-directio-auth-session') || 'null') } catch { /* noop */ }
  if (!url || !key || !session?.access_token) throw new Error('Conecte Supabase Auth e banco de dados para usar dados reais.')
  const response = await fetch(`${url}/rest/v1/${path}`, { ...options, headers: { apikey: key, Authorization: `Bearer ${session.access_token}`, 'Content-Type': 'application/json', Prefer: 'return=representation', ...options.headers } })
  if (!response.ok) { const error = await response.json().catch(() => ({})); throw new Error(error.message || 'Falha ao acessar dados.') }
  return response.status === 204 ? null : response.json()
}
function getRole() { try { return JSON.parse(localStorage.getItem('altius-directio-auth-session') || 'null')?.user?.role || currentUser()?.role || 'student' } catch { return currentUser()?.role || 'student' } }

export const platformApi = {
  isDemo: () => demoMode,
  async getJourney() {
    if (!demoMode) return rest('rpc/student_journey', { method: 'POST', body: '{}' })
    const db = readDb(); return db.activities.map((item) => ({ ...item, versions: db.submissions.filter((s) => s.activityId === item.id) }))
  },
  async submitActivity(id, payload) {
    if (!demoMode) return rest('rpc/submit_activity', { method: 'POST', body: JSON.stringify({ target_activity_id: id, content_text: payload.text || '', link_url: payload.link || null }) })
    const db = readDb(); const activity = db.activities.find((item) => item.id === id); if (!activity) throw new Error('Atividade não encontrada.')
    const version = { id: `submission-${Date.now()}`, activityId: id, text: payload.text || '', link: payload.link || '', createdAt: new Date().toISOString(), state: 'submitted', isExample: true }
    db.submissions.unshift(version); activity.state = 'submitted'; writeDb(db); return version
  },
  async completeLesson(id) {
    if (!demoMode) return rest('rpc/complete_lesson', { method: 'POST', body: JSON.stringify({ target_lesson_id: id }) })
    const db = readDb(); if (!db.completions.includes(id)) db.completions.push(id); writeDb(db); return true
  },
  async getLessons({ all = false } = {}) {
    if (!demoMode) {
      const session = JSON.parse(localStorage.getItem('altius-directio-auth-session') || 'null')
      const filters = all && getRole() === 'instructor' ? `&created_by=eq.${encodeURIComponent(session?.user?.id)}` : all ? '' : '&status=eq.published'
      return rest(`lessons?select=*&order=axis,position${filters}`)
    }
    const db = readDb(); const user = currentUser(); return db.lessons.filter((lesson) => (all && isOwner(lesson, user)) || lesson.status === 'published')
  },
  async saveLesson(input) {
    if (!demoMode) return rest(`lessons${input.id ? `?id=eq.${encodeURIComponent(input.id)}` : ''}`, { method: input.id ? 'PATCH' : 'POST', body: JSON.stringify({ title: input.title, description: input.description, youtube_video_id: extractYouTubeId(input.videoLink), axis: input.axis, position: Number(input.position), status: input.verified ? input.status : 'draft' }) })
    const db = readDb(); const user = currentUser(); const lesson = { ...input, youtube_video_id: extractYouTubeId(input.videoLink), videoLink: undefined, position: Number(input.position), created_by: input.id ? db.lessons.find((item) => item.id === input.id)?.created_by : user.id, status: input.verified ? input.status : 'draft', isExample: true }
    if (input.id) { const index = db.lessons.findIndex((item) => item.id === input.id); if (index < 0 || !isOwner(db.lessons[index], user)) throw new Error('Você só pode editar aulas próprias.'); db.lessons[index] = { ...db.lessons[index], ...lesson } }
    else { lesson.id = `lesson-${Date.now()}`; db.lessons.push(lesson) }
    writeDb(db); return lesson
  },
  async deleteLesson(id) {
    if (!demoMode) return rest(`lessons?id=eq.${encodeURIComponent(id)}`, { method: 'DELETE' })
    const db = readDb(); const lesson = db.lessons.find((item) => item.id === id); if (!lesson || !isOwner(lesson)) throw new Error('Sem permissão para excluir esta aula.'); writeDb({ ...db, lessons: db.lessons.filter((item) => item.id !== id) })
  },
  async getLiveSessions() {
    if (!demoMode) {
      const session = JSON.parse(localStorage.getItem('altius-directio-auth-session') || 'null')
      const ownOnly = getRole() === 'instructor' ? `&created_by=eq.${encodeURIComponent(session?.user?.id)}` : ''
      return rest(`live_sessions?select=*&order=starts_at${ownOnly}`)
    }
    const db = readDb(); return db.liveSessions.filter((session) => getRole() === 'instructor' ? isOwner(session) : isOwner(session) || session.status !== 'draft')
  },
  async getLiveSession(id) {
    if (!demoMode) { const [session] = await rest(`live_sessions?id=eq.${encodeURIComponent(id)}&select=*`); return session }
    return readDb().liveSessions.find((session) => session.id === id)
  },
  async saveLiveSession(input) {
    if (!demoMode) return rest(`live_sessions${input.id ? `?id=eq.${encodeURIComponent(input.id)}` : ''}`, { method: input.id ? 'PATCH' : 'POST', body: JSON.stringify({ title: input.title, description: input.description, mode: input.mode, meeting_url: input.mode === 'meeting' ? input.meeting_url : null, youtube_video_id: input.mode === 'youtube_live' ? extractYouTubeId(input.videoLink) : null, starts_at: input.starts_at ? saoPauloLocalToIso(input.starts_at) : undefined, status: input.status, recording_lesson_id: input.recording_lesson_id || null }) })
    const db = readDb(); const user = currentUser(); const existing = db.liveSessions.find((item) => item.id === input.id); if (existing && !isOwner(existing, user)) throw new Error('Só o autor ou Admin pode editar esta aula.')
    const next = { ...input, starts_at: input.starts_at ? saoPauloLocalToIso(input.starts_at) : input.starts_at, id: input.id || `live-${Date.now()}`, created_by: existing?.created_by || user.id, meeting_url: input.mode === 'meeting' ? input.meeting_url : null, youtube_video_id: input.mode === 'youtube_live' ? extractYouTubeId(input.videoLink) : null, isExample: true }
    delete next.videoLink; const liveSessions = existing ? db.liveSessions.map((item) => item.id === input.id ? next : item) : [...db.liveSessions, next]; writeDb({ ...db, liveSessions }); return next
  },
  async markAttendance(sessionId, studentId) {
    if (!demoMode) return rest('rpc/mark_live_attendance', { method: 'POST', body: JSON.stringify({ target_session_id: sessionId, student_name: studentId }) })
    const db = readDb(); const session = db.liveSessions.find((item) => item.id === sessionId); if (!session || !isOwner(session)) throw new Error('Presença só pode ser registrada pelo dono da aula ou Admin.')
    const student = db.people.find((person) => person.id === studentId || person.name === studentId)
    if (!student) throw new Error('Aluno não encontrado.')
    const attendance = [...db.attendance.filter((row) => row.sessionId !== sessionId || row.studentId !== student.id), { sessionId, studentId: student.id, present: true, isExample: true }]; writeDb({ ...db, attendance }); return attendance
  },
  async getStudents() {
    if (getRole() === 'mentor') return this.getMentorStudents()
    if (!demoMode) {
      const rows = await rest(getRole() === 'instructor' ? 'rpc/list_students_for_instructor' : 'rpc/list_students_for_admin', { method: 'POST', body: '{}' })
      return rows.map((row) => getRole() === 'instructor'
        ? ({ name: row.name, phase: row.phase, progress: row.progress, lastActivity: row.last_activity })
        : ({ ...row, id: row.user_id, lastActivity: row.last_activity, enrollment: row.enrollment_status }))
    }
    const db = readDb(); const students = db.people.filter((person) => person.role === 'student')
    if (getRole() === 'mentor') { const ids = db.mentorStudents.filter((link) => link.mentorId === currentUser()?.id).map((link) => link.studentId); return students.filter((student) => ids.includes(student.id)).map(({ name, phase, progress, lastActivity }) => ({ name, phase, progress, lastActivity })) }
    return getRole() === 'instructor' ? students.map(({ name, phase, progress, lastActivity }) => ({ name, phase, progress, lastActivity })) : students
  },
  async getUsers() {
    if (!demoMode) return rest('rpc/list_users_for_admin', { method: 'POST', body: '{}' }).then((rows) => rows.map((row) => ({ ...row, id: row.user_id })))
    if (!isAdmin()) throw new Error('Somente Admin pode acessar a lista completa de usuários.')
    return readDb().people
  },
  async getMentors() {
    if (!demoMode) return rest('profiles?role=eq.mentor&select=id,full_name,email')
    return readDb().people.filter((person) => person.role === 'mentor')
  },
  async getMentorStudents() {
    if (!demoMode) return rest('rpc/list_mentor_students', { method: 'POST', body: '{}' }).then((rows) => rows.map((row) => ({ id: row.user_id, name: row.name, phase: row.phase, progress: row.progress, lastActivity: row.last_activity })))
    const db = readDb(); const ids = db.mentorStudents.filter((link) => link.mentorId === currentUser()?.id).map((link) => link.studentId); return db.people.filter((person) => ids.includes(person.id)).map(({ id, name, phase, progress, lastActivity }) => ({ id, name, phase, progress, lastActivity }))
  },
  async updateProfileRole(id, role) {
    if (!demoMode) return rest('rpc/promote_user', { method: 'POST', body: JSON.stringify({ target_user_id: id, new_role: role }) })
    if (!isAdmin() || !['mentor', 'instructor'].includes(role)) throw new Error('Somente Admin pode promover para Mentor ou Instrutor.')
    const db = readDb(); const people = db.people.map((person) => person.id === id ? { ...person, role } : person); writeDb({ ...db, people }); return people.find((person) => person.id === id)
  },
  async assignMentor(studentId, mentorId) {
    if (!demoMode) return rest('rpc/assign_mentor', { method: 'POST', body: JSON.stringify({ target_student_id: studentId, target_mentor_id: mentorId }) })
    if (!isAdmin()) throw new Error('Somente Admin pode associar mentores.')
    const db = readDb(); const mentorStudents = [...db.mentorStudents.filter((item) => item.studentId !== studentId), { studentId, mentorId }]; writeDb({ ...db, mentorStudents }); return mentorStudents
  },
  async saveReview(activityId, review) {
    if (!demoMode) return rest('rpc/review_submission', { method: 'POST', body: JSON.stringify({ target_submission_id: activityId, criteria_scores: review.scores, comments: review.comments, result_status: review.status }) })
    const db = readDb(); const submission = db.submissions.find((item) => item.id === activityId); const activity = db.activities.find((item) => item.id === (submission?.activityId || activityId)); if (!activity) throw new Error('Atividade não encontrada.')
    activity.state = review.status; activity.feedback = { ...review, createdAt: new Date().toISOString(), isExample: true }; if (submission) submission.state = review.status; db.notifications.unshift({ id: `feedback-${Date.now()}`, activityId: activity.id, title: `Novo feedback: ${activity.title}`, read: false, isExample: true }); writeDb(db); return activity.feedback
  },
  async startReview(submissionId) {
    if (!demoMode) return rest('rpc/start_review', { method: 'POST', body: JSON.stringify({ target_submission_id: submissionId }) })
    const db = readDb(); const submission = db.submissions.find((item) => item.id === submissionId); if (!submission || !['submitted', 'in_review'].includes(submission.state)) throw new Error('Entrega indisponível para revisão.')
    submission.state = 'in_review'; const activity = db.activities.find((item) => item.id === submission.activityId); if (activity) activity.state = 'in_review'; writeDb(db); return submission
  },
  async saveMentoringSession(data) {
    if (!demoMode) return rest('rpc/create_mentoring_session', { method: 'POST', body: JSON.stringify({ held_at: data.held_at, notes: data.notes, target_student_id: data.studentId }) })
    const db = readDb(); const mentoringSessions = [{ ...data, id: `mentoring-${Date.now()}`, isExample: true }, ...db.mentoringSessions]; writeDb({ ...db, mentoringSessions }); return mentoringSessions[0]
  },
  async getNotifications() {
    if (!demoMode) return rest('notifications?select=*&order=created_at.desc')
    return readDb().notifications
  },
  async getOverview() {
    if (!demoMode) return rest('rpc/admin_overview', { method: 'POST', body: '{}' })
    const db = readDb(); return { students: db.people.filter((p) => p.role === 'student').length, mentors: db.people.filter((p) => p.role === 'mentor').length, instructors: db.people.filter((p) => p.role === 'instructor').length, pending: db.activities.filter((a) => a.state === 'submitted' || a.state === 'in_review').length, isExample: true }
  },
  async getReviewQueue() {
    if (!demoMode) return rest('rpc/list_pending_submissions', { method: 'POST', body: '{}' })
    const db = readDb(); return db.submissions.filter((submission) => ['submitted', 'in_review'].includes(submission.state)).map((submission) => ({ ...db.activities.find((activity) => activity.id === submission.activityId), ...submission, activityId: submission.activityId, student: 'Ana Souza', isExample: true }))
  },
  async getDemoRoster() { return demoMode ? readDb().people.filter((person) => person.role === 'student') : [] },
  async getCompletions() { return demoMode ? readDb().completions : rest('lesson_completions?select=lesson_id').then((rows) => rows.map((row) => row.lesson_id)) },
  async getCompetencies() {
    if (!demoMode) {
      const rows = await rest('competency_progress?select=competency,progress')
      return competencies.map((name) => ({ name, progress: rows.find((row) => row.competency === name)?.progress ?? null, isExample: false }))
    }
    return competencies.map((name, index) => ({ name, progress: [35, 18, 29, 42, 24, 12][index], isExample: true }))
  },
}
