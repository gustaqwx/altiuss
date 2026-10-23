import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import YouTubePlayer from '../lessons/YouTubePlayer'
import { liveApi } from './api'
const tz = 'America/Sao_Paulo'
function dateLabel(value) { return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeStyle: 'short', timeZone: tz }).format(new Date(value)) }
export default function LiveSessionDetailPage() {
  const { id } = useParams(); const { user } = useAuth(); const [session, setSession] = useState(null); const [students, setStudents] = useState([]); const [message, setMessage] = useState(''); const canManage = ['admin', 'instructor'].includes(user?.role)
  useEffect(() => { liveApi.get(id).then((value) => { setSession(value); if (canManage && value) liveApi.getStudents().then(setStudents).catch((e) => setMessage(e.message)) }).catch((e) => setMessage(e.message)) }, [id, canManage])
  async function attendance(studentName) { try { await liveApi.markAttendance(id, studentName); setMessage('Presença registrada.') } catch (e) { setMessage(e.message) } }
  if (!session) return <p className="text-sm text-mute">{message || 'Carregando aula…'}</p>
  const upcoming = new Date(session.starts_at).getTime() > Date.now()
  return <div className="mx-auto max-w-4xl"><Link to="/app/ao-vivo" className="text-sm text-mute underline underline-offset-4">← Todas as aulas ao vivo</Link><p className="mt-7 text-xs uppercase tracking-[.16em] text-accent">{session.mode === 'meeting' ? 'Aula por link externo' : 'YouTube Live'}</p><h1 className="mt-2 font-display text-3xl font-semibold">{session.title}</h1><p className="mt-3 text-sm text-mute">{dateLabel(session.starts_at)} · {tz}</p>{session.isExample && <p className="mt-2 text-xs text-amber-200">Dados de exemplo</p>}{session.status === 'cancelled' && <p className="mt-6 border-l-2 border-rose-300 pl-3 text-sm text-rose-200">Esta aula foi cancelada.</p>}{session.description && <p className="mt-5 leading-7 text-mute">{session.description}</p>}
    {session.status !== 'cancelled' && session.mode === 'meeting' && <a className="mt-6 inline-block border border-accent bg-accent px-5 py-3 text-sm font-semibold text-ink" href={session.meeting_url} target="_blank" rel="noreferrer">Entrar na aula</a>}
    {session.status !== 'cancelled' && session.mode === 'youtube_live' && (upcoming ? <p className="mt-6 border-y border-white/10 py-4 text-sm">A transmissão começa em {dateLabel(session.starts_at)} ({tz}).</p> : <div className="mt-6"><YouTubePlayer videoId={session.youtube_video_id} title={`Transmissão ao vivo: ${session.title}`} /></div>)}
    {session.recording_lesson_id && <p className="mt-5 text-sm"><Link className="text-accent underline underline-offset-4" to={`/app/aulas/${session.recording_lesson_id}`}>Assistir à gravação</Link></p>}
    {canManage && <section className="mt-10 border-t border-white/10 pt-6"><h2 className="font-display text-lg font-semibold">Presença</h2><p className="mt-2 text-xs text-mute">Apenas Admin ou Instrutor dono da sessão pode registrar.</p><ul className="mt-3 divide-y divide-white/10">{students.filter((s) => s.role === 'student' || !s.role).map((student) => <li key={student.id || student.name} className="flex items-center justify-between py-3"><span className="text-sm">{student.name}</span><button onClick={() => attendance(student.name)} className="text-sm text-accent underline underline-offset-4">Marcar presença</button></li>)}</ul></section>}{message && <p className="mt-4 text-sm text-mute" role="status">{message}</p>}</div>
}
