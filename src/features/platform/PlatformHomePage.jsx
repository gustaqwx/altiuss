import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import JourneyPage from '../journey/JourneyPage'
import AdminHomePage from '../admin/AdminHomePage'
import { adminApi } from '../admin/api'
import { lessonsApi } from '../lessons/api'
import { liveApi } from '../live/api'
import { reviewsApi } from '../reviews/api'

function HomeHeader({ title, description }) {
  return <header className="workspace-page-header"><p className="workspace-eyebrow">Área do programa</p><h1>{title}</h1><p>{description}</p></header>
}

function HomeLink({ to, children, detail }) {
  return <Link className="workspace-action-row" to={to}><span><strong>{children}</strong>{detail && <small>{detail}</small>}</span><ArrowRight size={16} aria-hidden="true" /></Link>
}

function AdminOverview() {
  const [overview, setOverview] = useState(null)
  const [queue, setQueue] = useState([])
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
    Promise.all([adminApi.getOverview(), reviewsApi.getQueue(), liveApi.list()])
      .then(([stats, reviews, liveSessions]) => { setOverview(stats); setQueue(reviews); setSessions(liveSessions) })
      .catch((reason) => setError(reason.message))
      .finally(() => setLoading(false))
  }, [])
  const upcoming = sessions.filter((session) => session.status === 'scheduled')
  return <div className="workspace-home">
    <HomeHeader title="Operação do programa" description="Acompanhe entregas pendentes e aulas ao vivo; acesse a gestão completa da equipe Altius." />
    {error && <p role="alert" className="workspace-error">{error}</p>}
    <section className="workspace-next"><div><p className="workspace-eyebrow">Próxima ação</p><h2>{loading ? 'Carregando a operação…' : queue.length ? 'Acompanhar entregas pendentes' : upcoming.length ? 'Conferir aulas ao vivo' : 'Abrir gestão da equipe'}</h2><p>{loading ? 'Consultando os dados disponíveis.' : queue.length ? `${queue.length} entrega${queue.length === 1 ? '' : 's'} aguardando revisão.` : upcoming.length ? `${upcoming.length} aula${upcoming.length === 1 ? '' : 's'} ao vivo agendada${upcoming.length === 1 ? '' : 's'}.` : 'Usuários, promoções e vínculos de mentoria.'}</p></div><HomeLink to={queue.length ? '/app/mentor/revisao' : upcoming.length ? '/app/ao-vivo' : '/app/admin'}>{queue.length ? 'Ver entregas' : upcoming.length ? 'Ver agenda' : 'Abrir gestão'}</HomeLink></section>
    {overview && <dl className="workspace-metrics">{[['Alunos', overview.students], ['Mentores', overview.mentors], ['Instrutores', overview.instructors], ['Entregas pendentes', overview.pending]].map(([label, value]) => <div key={label}><dt>{label}{overview.isExample ? ' · Exemplo' : ''}</dt><dd>{value ?? '—'}</dd></div>)}</dl>}
    <div className="workspace-home-columns"><section><div className="workspace-section-heading"><h2>Entregas pendentes</h2><Link to="/app/mentor/revisao">Abrir fila</Link></div>{loading ? <p className="workspace-muted">Carregando…</p> : queue.length ? <ul className="workspace-list">{queue.slice(0, 5).map((item) => <li key={item.id}><Link to={`/app/mentor/revisao/${item.id}`}><span>{item.title}</span><small>{item.student} · {item.phase}{item.isExample ? ' · Exemplo' : ''}</small></Link></li>)}</ul> : <p className="workspace-empty">Não há entregas pendentes de revisão.</p>}</section><section><div className="workspace-section-heading"><h2>Aulas ao vivo</h2><Link to="/app/ao-vivo">Abrir agenda</Link></div>{loading ? <p className="workspace-muted">Carregando…</p> : upcoming.length ? <ul className="workspace-list">{upcoming.slice(0, 5).map((session) => <li key={session.id}><Link to={`/app/ao-vivo/${session.id}`}><span>{session.title}</span><small>{new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short', timeZone: 'America/Sao_Paulo' }).format(new Date(session.starts_at))} · America/Sao_Paulo{session.isExample ? ' · Exemplo' : ''}</small></Link></li>)}</ul> : <p className="workspace-empty">Nenhuma aula ao vivo agendada.</p>}</section></div>
    <section className="workspace-section"><div className="workspace-section-heading"><h2>Acessos de gestão</h2></div><HomeLink to="/app/admin" detail="Usuários, promoções e visão completa">Administração</HomeLink><HomeLink to="/app/mentores" detail="Atribuir e acompanhar vínculos de mentoria">Mentores</HomeLink><HomeLink to="/app/admin/aulas" detail="Publicar e organizar conteúdo">Vídeo-aulas</HomeLink></section>
  </div>
}

function MentorHome() {
  const [queue, setQueue] = useState([])
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
    Promise.all([reviewsApi.getQueue(), reviewsApi.getMentorStudents()])
      .then(([reviews, people]) => { setQueue(reviews); setStudents(people) })
      .catch((reason) => setError(reason.message))
      .finally(() => setLoading(false))
  }, [])
  return <div className="workspace-home">
    <HomeHeader title="Acompanhamento de mentorias" description="Alunos acompanhados e entregas que aguardam sua revisão." />
    <section className="workspace-next" aria-labelledby="mentor-next-title"><div><p className="workspace-eyebrow">Próxima ação</p><h2 id="mentor-next-title">{loading ? 'Carregando entregas…' : queue.length ? 'Revisar entregas pendentes' : 'Ver alunos acompanhados'}</h2><p>{loading ? 'Buscando dados do seu acompanhamento.' : queue.length ? `${queue.length} entrega${queue.length === 1 ? '' : 's'} na fila de revisão.` : `${students.length} aluno${students.length === 1 ? '' : 's'} no acompanhamento.`}</p></div><HomeLink to={queue.length ? '/app/mentor/revisao' : '/app/mentor'}>{queue.length ? 'Abrir fila de revisão' : 'Ver alunos'}</HomeLink></section>
    {error && <p role="alert" className="workspace-error">{error}</p>}
    <div className="workspace-home-columns"><section><div className="workspace-section-heading"><h2>Entregas pendentes</h2><Link to="/app/mentor/revisao">Abrir fila</Link></div>{loading ? <p className="workspace-muted">Carregando…</p> : queue.length ? <ul className="workspace-list">{queue.slice(0, 5).map((item) => <li key={item.id}><Link to={`/app/mentor/revisao/${item.id}`}><span>{item.title}</span><small>{item.student} · {item.phase}</small></Link></li>)}</ul> : <p className="workspace-empty">Não há entregas pendentes de revisão.</p>}</section><section><div className="workspace-section-heading"><h2>Alunos acompanhados</h2><Link to="/app/mentor">Ver lista</Link></div>{loading ? <p className="workspace-muted">Carregando…</p> : students.length ? <ul className="workspace-list">{students.slice(0, 5).map((student, index) => <li key={student.id || `${student.name}-${index}`}><Link to="/app/mentor"><span>{student.name}</span><small>{student.phase || 'Fase não informada'} · {student.progress == null ? 'Progresso não informado' : `${student.progress}%`}</small></Link></li>)}</ul> : <p className="workspace-empty">Nenhum aluno associado ao seu acompanhamento.</p>}</section></div>
    <section className="workspace-section"><div className="workspace-section-heading"><h2>Mentorias</h2></div><HomeLink to="/app/mentor/mentoria" detail="Registrar data e anotações da sessão quinzenal">Abrir registros de mentoria</HomeLink></section>
  </div>
}

function InstructorHome() {
  const [lessons, setLessons] = useState([])
  const [sessions, setSessions] = useState([])
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
    Promise.all([lessonsApi.list({ all: true }), liveApi.list(), adminApi.getStudents()])
      .then(([ownedLessons, liveSessions, learners]) => { setLessons(ownedLessons); setSessions(liveSessions); setStudents(learners) })
      .catch((reason) => setError(reason.message))
      .finally(() => setLoading(false))
  }, [])
  const upcoming = sessions.filter((session) => session.status === 'scheduled')
  return <div className="workspace-home">
    <HomeHeader title="Suas aulas e encontros" description="Gerencie os conteúdos e sessões ao vivo que você criou. A lista de alunos exibe apenas os campos permitidos para Instrutor." />
    <section className="workspace-next"><div><p className="workspace-eyebrow">Próxima ação</p><h2>{loading ? 'Carregando suas atividades…' : upcoming.length ? 'Conferir aulas ao vivo agendadas' : 'Preparar uma vídeo-aula'}</h2><p>{loading ? 'Consultando seus dados.' : upcoming.length ? `${upcoming.length} aula${upcoming.length === 1 ? '' : 's'} ao vivo agendada${upcoming.length === 1 ? '' : 's'}.` : 'Cadastre ou edite aulas no seu espaço de conteúdo.'}</p></div><HomeLink to={upcoming.length ? '/app/ao-vivo' : '/app/admin/aulas'}>{upcoming.length ? 'Ver aulas ao vivo' : 'Gerenciar vídeo-aulas'}</HomeLink></section>
    {error && <p role="alert" className="workspace-error">{error}</p>}
    <dl className="workspace-metrics">{[['Vídeo-aulas', lessons.length], ['Aulas ao vivo', upcoming.length], ['Alunos', students.length]].map(([label, value]) => <div key={label}><dt>{label}{loading ? '' : lessons.some((row) => row.isExample) || sessions.some((row) => row.isExample) ? ' · Exemplo' : ''}</dt><dd>{loading ? '—' : value}</dd></div>)}</dl>
    <div className="workspace-home-columns"><section><div className="workspace-section-heading"><h2>Vídeo-aulas</h2><Link to="/app/admin/aulas">Gerenciar</Link></div>{loading ? <p className="workspace-muted">Carregando…</p> : lessons.length ? <ul className="workspace-list">{lessons.slice(0, 5).map((lesson) => <li key={lesson.id}><Link to="/app/admin/aulas"><span>{lesson.title}</span><small>{lesson.axis} · {lesson.status === 'published' ? 'Publicada' : 'Rascunho'}{lesson.isExample ? ' · Exemplo' : ''}</small></Link></li>)}</ul> : <p className="workspace-empty">Você ainda não cadastrou vídeo-aulas.</p>}</section><section><div className="workspace-section-heading"><h2>Aulas ao vivo</h2><Link to="/app/ao-vivo">Gerenciar</Link></div>{loading ? <p className="workspace-muted">Carregando…</p> : upcoming.length ? <ul className="workspace-list">{upcoming.slice(0, 5).map((session) => <li key={session.id}><Link to={`/app/ao-vivo/${session.id}`}><span>{session.title}</span><small>{new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short', timeZone: 'America/Sao_Paulo' }).format(new Date(session.starts_at))} · America/Sao_Paulo</small></Link></li>)}</ul> : <p className="workspace-empty">Nenhuma aula ao vivo agendada.</p>}</section></div>
    <section className="workspace-section"><div className="workspace-section-heading"><h2>Alunos</h2><Link to="/app/alunos">Ver lista</Link></div><p className="workspace-muted">A consulta mostra somente nome, fase, progresso e última atividade.</p>{loading ? <p className="workspace-muted">Carregando…</p> : students.length ? <ul className="workspace-list">{students.slice(0, 5).map((student, index) => <li key={student.id || `${student.name}-${index}`}><Link to="/app/alunos"><span>{student.name}</span><small>{student.phase || 'Fase não informada'} · {student.progress == null ? 'Progresso não informado' : `${student.progress}%`} · {student.lastActivity || 'Atividade não informada'}</small></Link></li>)}</ul> : <p className="workspace-empty">Nenhum aluno disponível.</p>}</section>
  </div>
}

export default function PlatformHomePage() {
  const { user } = useAuth()
  if (user?.role === 'admin') return <AdminOverview />
  if (user?.role === 'instructor') return <InstructorHome />
  if (user?.role === 'mentor') return <MentorHome />
  return <JourneyPage />
}
