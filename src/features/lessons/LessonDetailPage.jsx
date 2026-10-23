import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import YouTubePlayer from './YouTubePlayer'
import { lessonsApi } from './api'

export default function LessonDetailPage() {
  const { id } = useParams(); const [lesson, setLesson] = useState(null); const [done, setDone] = useState(false); const [message, setMessage] = useState('')
  useEffect(() => { Promise.all([lessonsApi.list(), lessonsApi.getCompletions()]).then(([items, complete]) => { const found = items.find((item) => item.id === id); if (!found) setMessage('Aula indisponível.'); setLesson(found); setDone(Array.isArray(complete) && complete.includes(id)) }).catch((e) => setMessage(e.message)) }, [id])
  async function complete() { try { await lessonsApi.complete(id); setDone(true); setMessage('Aula marcada como concluída.') } catch (e) { setMessage(e.message) } }
  if (!lesson) return <div className="text-sm text-mute">{message || 'Carregando aula…'}</div>
  return <div className="mx-auto max-w-4xl"><Link to="/app/aulas" className="text-sm text-mute underline underline-offset-4">← Todas as aulas</Link><p className="mt-7 text-xs uppercase tracking-[.16em] text-accent">{lesson.axis}</p><h1 className="mt-2 font-display text-3xl font-semibold">{lesson.title}</h1>{lesson.isExample && <p className="mt-2 text-xs text-amber-200">Conteúdo de exemplo</p>}<div className="mt-7"><YouTubePlayer videoId={lesson.youtube_video_id} title={`Vídeo-aula: ${lesson.title}`} /></div><p className="mt-5 leading-7 text-mute">{lesson.description || 'Descrição: A definir com a Altius.'}</p><button type="button" onClick={complete} disabled={done} className="mt-6 border border-accent px-5 py-3 text-sm font-medium text-snow hover:bg-accent hover:text-ink disabled:opacity-50">{done ? 'Concluída' : 'Marcar como concluída'}</button>{message && <p className="mt-3 text-sm text-mute" role="status">{message}</p>}</div>
}
