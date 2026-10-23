import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { reviewsApi } from './api'
export default function ReviewQueuePage() {
  const [queue, setQueue] = useState([]); const [message, setMessage] = useState('')
  useEffect(() => { reviewsApi.getQueue().then(setQueue).catch((e) => setMessage(e.message)) }, [])
  return <div className="mx-auto max-w-4xl"><p className="text-xs uppercase tracking-[.16em] text-accent">Mentoria</p><h1 className="mt-2 font-display text-3xl font-semibold">Entregas para revisar</h1>{message && <p className="mt-4 text-sm text-mute">{message}</p>}<ul className="mt-7 divide-y divide-white/10 border-y border-white/10">{queue.map((item) => <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 py-4"><div><p className="text-sm font-medium">{item.title}</p><p className="mt-1 text-xs text-mute">{item.student} · {item.phase} · {item.state === 'in_review' ? 'Em revisão' : 'Enviada'}{item.isExample ? ' · Exemplo' : ''}</p></div><Link className="text-sm text-accent underline underline-offset-4" to={`/app/mentor/revisao/${item.id}`}>Revisar</Link></li>)}{queue.length === 0 && <li className="py-6 text-sm text-mute">Nenhuma entrega pendente de revisão.</li>}</ul></div>
}
