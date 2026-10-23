import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { reviewsApi } from './api'
import { reviewInstructions } from '../../content/admin'

export default function ReviewDetailPage() {
  const { id } = useParams()
  const [activity, setActivity] = useState(null)
  const [comments, setComments] = useState('')
  const [scores, setScores] = useState([{ name: 'Critério: A definir com a Altius', score: '', comment: '' }])
  const [message, setMessage] = useState('')
  useEffect(() => { reviewsApi.getQueue().then((items) => setActivity(items.find((item) => item.id === id))).catch((e) => setMessage(e.message)) }, [id])
  async function save(status) { try { await reviewsApi.save(id, { comments, scores, status }); setMessage(status === 'approved' ? 'Entrega aprovada.' : status === 'changes_requested' ? 'Ajustes solicitados. O aluno poderá reenviar.' : 'Feedback enviado ao aluno.') } catch (e) { setMessage(e.message) } }
  async function startReview() { try { await reviewsApi.startReview(id); setActivity({ ...activity, state: 'in_review' }); setMessage('Entrega marcada como em revisão.') } catch (e) { setMessage(e.message) } }
  if (!activity) return <p className="text-sm text-mute">{message || 'Carregando entrega…'}</p>
  return <div className="mx-auto max-w-3xl">
    <Link to="/app/mentor/revisao" className="text-sm text-mute underline underline-offset-4">← Fila de revisão</Link>
    <p className="mt-7 text-xs text-accent">{activity.phase} · {activity.student}</p>
    <h1 className="mt-2 font-display text-3xl font-semibold">{activity.title}</h1>
    <section className="mt-5 border-y border-white/10 py-4"><h2 className="text-sm font-medium">Entrega recebida</h2><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-mute">{activity.content_text || activity.text || 'Sem texto enviado.'}</p>{(activity.link_url || activity.link) && <a className="mt-2 inline-block text-sm text-accent underline" href={activity.link_url || activity.link} target="_blank" rel="noreferrer">Abrir link da entrega</a>}</section>
    <p className="mt-3 text-xs text-mute">Estado: {activity.state === 'in_review' ? 'Em revisão' : 'Enviada'}</p>
    {activity.state !== 'in_review' && <button type="button" onClick={startReview} className="mt-3 border border-white/20 px-4 py-2 text-sm">Iniciar revisão</button>}
    <p className="mt-4 text-xs text-mute">{reviewInstructions}</p>
    <section className="mt-8"><h2 className="font-display text-lg font-semibold">Avaliação por critério</h2>{scores.map((item, index) => <div key={`${item.name}-${index}`} className="mt-4 grid gap-3 border-t border-white/10 pt-4 sm:grid-cols-[1fr_14rem]"><label className="text-sm">{item.name}<textarea className="mt-2 min-h-20 w-full border border-white/15 bg-night p-3" value={item.comment} onChange={(e) => setScores(scores.map((score, i) => i === index ? { ...score, comment: e.target.value } : score))} placeholder="Comentário sobre este critério" /></label><label className="text-sm">Nota ou avaliação<input type="text" className="mt-2 w-full border border-white/15 bg-night p-3" placeholder="A definir com a Altius" value={item.score} onChange={(e) => setScores(scores.map((score, i) => i === index ? { ...score, score: e.target.value } : score))} /></label></div>)}<button type="button" onClick={() => setScores([...scores, { name: 'Critério: A definir com a Altius', score: '', comment: '' }])} className="mt-3 text-sm text-mute underline underline-offset-4">Adicionar critério</button></section>
    <label className="mt-7 block text-sm">Comentário geral<textarea className="mt-2 min-h-28 w-full border border-white/15 bg-night p-3" value={comments} onChange={(e) => setComments(e.target.value)} /></label>
    <div className="mt-5 flex flex-wrap gap-3"><button onClick={() => save('feedback')} className="border border-white/20 px-4 py-3 text-sm">Enviar feedback</button><button onClick={() => save('approved')} className="border border-accent bg-accent px-4 py-3 text-sm font-semibold text-ink">Aprovar entrega</button><button onClick={() => save('changes_requested')} className="border border-white/20 px-4 py-3 text-sm">Pedir ajustes</button></div>
    {message && <p className="mt-4 text-sm text-mute" role="status">{message}</p>}
  </div>
}
