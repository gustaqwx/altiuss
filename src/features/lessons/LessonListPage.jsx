import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { lessonsApi } from './api'

export default function LessonListPage() {
  const [lessons, setLessons] = useState([]); const [message, setMessage] = useState('')
  useEffect(() => { lessonsApi.list().then(setLessons).catch((e) => setMessage(e.message)) }, [])
  return <div className="mx-auto max-w-4xl"><p className="text-xs uppercase tracking-[.16em] text-accent">Conteúdo do programa</p><h1 className="mt-2 font-display text-3xl font-semibold">Aulas</h1><p className="mt-2 text-sm text-mute">Aulas publicadas disponíveis para você.</p>{message && <p className="mt-5 text-sm text-rose-200">{message}</p>}<ul className="mt-7 divide-y divide-white/10 border-y border-white/10">{lessons.map((lesson) => <li key={lesson.id} className="flex flex-wrap items-center justify-between gap-3 py-4">{lesson.isExample && <span className="sr-only">Exemplo: </span>}<div><p className="text-xs text-mute">{lesson.axis}</p><Link to={`/app/aulas/${lesson.id}`} className="mt-1 inline-block text-base font-medium underline-offset-4 hover:text-accent hover:underline">{lesson.title}</Link>{lesson.isExample && <p className="mt-1 text-xs text-amber-200">Exemplo</p>}</div><span className="text-xs text-mute">{lesson.position}</span></li>)}{lessons.length === 0 && <li className="py-6 text-sm text-mute">Nenhuma aula publicada.</li>}</ul></div>
}
