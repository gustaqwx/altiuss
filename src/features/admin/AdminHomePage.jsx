import { useEffect, useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { roleLabels } from '../../lib/model'
import { adminApi } from './api'

const adminShortcuts = [
  { title: 'Alunos', description: 'Consulte progresso, atividade recente e matrícula.', href: '/app/alunos' },
  { title: 'Mentores', description: 'Consulte mentores e associe acompanhamentos.', href: '/app/mentores' },
  { title: 'Equipe', description: 'Consulte perfis da equipe Altius.', href: '/app/equipe' },
  { title: 'Entregas', description: 'Acesse a fila de entregas pendentes de revisão.', href: '/app/mentor/revisao' },
  { title: 'Vídeo-aulas', description: 'Gerencie conteúdo, rascunhos e publicações.', href: '/app/admin/aulas' },
  { title: 'Aulas ao vivo', description: 'Organize sessões e registre presença.', href: '/app/ao-vivo' },
]

export default function AdminHomePage() {
  const [overview, setOverview] = useState(null)
  const [users, setUsers] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [busyUser, setBusyUser] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  async function refresh() {
    setLoading(true)
    setError('')
    try {
      const [stats, people] = await Promise.all([adminApi.getOverview(), adminApi.getUsers()])
      setOverview(stats)
      setUsers(people)
    } catch (reason) { setError(reason.message) }
    finally { setLoading(false) }
  }

  useEffect(() => { refresh() }, [])

  async function promote(person, role) {
    setBusyUser(person.id)
    setMessage('')
    setError('')
    try {
      await adminApi.promote(person.id, role)
      await refresh()
      setMessage(`${person.name} agora tem o perfil ${roleLabels[role]}.`)
    } catch (reason) { setError(reason.message) }
    finally { setBusyUser('') }
  }

  const students = useMemo(() => users.filter((person) => person.role === 'student' && `${person.name || ''} ${person.email || ''}`.toLocaleLowerCase('pt-BR').includes(query.toLocaleLowerCase('pt-BR'))), [users, query])
  const metrics = overview ? [['Alunos', overview.students], ['Mentores', overview.mentors], ['Instrutores', overview.instructors], ['Entregas pendentes', overview.pending]] : []

  return <div className="workspace-home">
    <header className="workspace-page-header"><p className="workspace-eyebrow">Equipe Altius · Administração</p><h1>Visão geral</h1><p>Gestão de pessoas, conteúdos e acompanhamento da operação.</p></header>
    {error && <p className="workspace-error" role="alert">{error}</p>}
    {message && <p className="workspace-muted" role="status">{message}</p>}
    <section aria-label="Indicadores da plataforma">
      {loading && !overview ? <p className="workspace-muted" role="status">Carregando indicadores…</p> : overview && <dl className="workspace-metrics workspace-admin-metrics">{metrics.map(([label, value]) => <div key={label}><dt>{label}{overview.isExample ? ' · Exemplo' : ''}</dt><dd>{value ?? 'sem dado'}</dd></div>)}</dl>}
    </section>
    <section className="workspace-section" aria-labelledby="admin-shortcuts-title"><div className="workspace-section-heading"><h2 id="admin-shortcuts-title">Gestão</h2></div><ul className="workspace-admin-links">{adminShortcuts.map((item) => <li key={item.href}><Link to={item.href}><span><strong>{item.title}</strong><small>{item.description}</small></span><ArrowRight size={16} aria-hidden="true" /></Link></li>)}</ul></section>
    <section className="workspace-section" aria-labelledby="promote-users-title"><div className="workspace-section-heading"><div><h2 id="promote-users-title">Promover usuários</h2><p>Novos cadastros começam como Aluno. Promoções são registradas no servidor.</p></div><span>{students.length} alunos</span></div>
      <label className="workspace-search-label" htmlFor="admin-user-search">Buscar por nome ou e-mail</label><input id="admin-user-search" className="workspace-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nome ou e-mail" />
      {loading && users.length === 0 ? <p className="workspace-muted" role="status">Carregando usuários…</p> : students.length ? <ul className="workspace-promotion-list">{students.map((person) => <li key={person.id}><div><strong>{person.name || 'Nome indisponível'}{person.isExample && <span className="workspace-example"> · Exemplo</span>}</strong><small>{person.email || 'E-mail indisponível'}</small></div><div className="workspace-promotion-actions"><button disabled={busyUser === person.id} onClick={() => promote(person, 'mentor')}>{busyUser === person.id ? 'Salvando…' : 'Promover a Mentor'}</button><button disabled={busyUser === person.id} onClick={() => promote(person, 'instructor')}>{busyUser === person.id ? 'Salvando…' : 'Promover a Instrutor'}</button></div></li>)}</ul> : <p className="workspace-empty">{users.some((person) => person.role === 'student') ? 'Nenhum aluno corresponde à busca.' : 'Não há usuários para promover.'}</p>}
    </section>
  </div>
}
