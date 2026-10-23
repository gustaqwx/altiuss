import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { activitiesApi } from './api'
export default function NotificationsPage() {
  const [items, setItems] = useState([]); const [message, setMessage] = useState('')
  useEffect(() => { activitiesApi.getNotifications().then(setItems).catch((e) => setMessage(e.message)) }, [])
  return <div className="mx-auto max-w-3xl"><p className="text-xs uppercase tracking-[.16em] text-accent">Sua conta</p><h1 className="mt-2 font-display text-3xl font-semibold">Notificações</h1>{message && <p className="mt-4 text-sm text-mute">{message}</p>}<ul className="mt-7 divide-y divide-white/10 border-y border-white/10">{items.map((item) => <li key={item.id} className="py-4"><p className="text-sm">{item.title}</p>{item.activity_id || item.activityId ? <Link className="mt-2 inline-block text-sm text-accent underline underline-offset-4" to={`/app/atividades/${item.activity_id || item.activityId}`}>Abrir atividade</Link> : null}{item.isExample && <span className="mt-1 inline-block text-xs text-amber-200">Exemplo</span>}</li>)}{items.length === 0 && <li className="py-5 text-sm text-mute">Nenhuma notificação no momento.</li>}</ul></div>
}
