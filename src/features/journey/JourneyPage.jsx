import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { competencies, phases, stateLabels } from '../../lib/model'
import { platformApi } from './api'

function progressFor(items) { return items.length ? Math.round(items.filter((item) => item.state === 'approved').length / items.length * 100) : 0 }
export default function JourneyPage() {
  const [activities, setActivities] = useState([])
  const [skills, setSkills] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { Promise.all([platformApi.getJourney(), platformApi.getCompetencies()]).then(([a, c]) => { setActivities(a); setSkills(c) }).catch((e) => setError(e.message)) }, [])
  const current = phases.find((phase) => progressFor(activities.filter((item) => item.phase === phase.name)) < 100) || phases[phases.length - 1]
  const currentIndex = phases.indexOf(current)
  return <div className="mx-auto max-w-5xl">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs uppercase tracking-[.16em] text-accent">Sua jornada</p><h1 className="mt-2 font-display text-3xl font-semibold">Continue de onde parou</h1></div><p className="text-sm text-mute">Progresso geral · {progressFor(activities)}%</p></div>
    {error && <p role="alert" className="mt-6 border-l-2 border-rose-300 pl-3 text-sm text-rose-200">{error}</p>}
    <section className="mt-9 border-y border-white/10 py-6" aria-labelledby="current-phase"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs text-mute">Fase atual · {current.period}</p><h2 id="current-phase" className="mt-1 font-display text-xl">{current.name}</h2><p className="mt-1 text-sm text-mute">{current.subtitle}</p></div><p className="text-sm text-mute">A seguir: {phases[currentIndex + 1]?.name || 'A definir com a Altius'}</p></div>
      <div className="mt-6 grid gap-0 md:grid-cols-4">{phases.map((phase, index) => <div key={phase.name} className={`border-t-2 py-4 pr-4 ${index <= currentIndex ? 'border-accent' : 'border-white/15'}`}><p className="text-xs text-mute">{phase.period}</p><p className="mt-1 font-medium">{phase.name}</p><p className="mt-2 text-xs text-mute">{progressFor(activities.filter((item) => item.phase === phase.name))}% aprovado</p></div>)}</div>
    </section>
    <section className="mt-10" aria-labelledby="activities-title"><div className="flex items-baseline justify-between"><h2 id="activities-title" className="font-display text-xl font-semibold">Atividades</h2><span className="text-xs text-mute">Prazos e critérios: A definir com a Altius</span></div>
      {phases.map((phase) => <div className="mt-7" key={phase.name}><h3 className="border-b border-white/10 pb-2 text-sm font-semibold">{phase.name}<span className="ml-2 font-normal text-mute">{phase.period}</span></h3><ul>{activities.filter((item) => item.phase === phase.name).map((item) => <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 py-3"><div><Link className="text-sm text-snow underline-offset-4 hover:text-accent hover:underline" to={`/app/atividades/${item.id}`}>{item.title}</Link><p className="mt-1 text-xs text-mute">{item.dueAt || 'Prazo: A definir com a Altius'}</p></div><span className="text-xs text-mute">{stateLabels[item.state] || 'Não iniciada'}</span></li>)}</ul></div>)}
    </section>
    <section className="mt-12" aria-labelledby="competencies-title"><h2 id="competencies-title" className="font-display text-xl font-semibold">Competências</h2><p className="mt-1 text-sm text-mute">Future of Jobs Report 2025{platformApi.isDemo() ? ' · Progresso de exemplo' : ''}</p><ul className="mt-4 divide-y divide-white/10 border-y border-white/10">{skills.map((skill) => <li key={skill.name} className="grid gap-2 py-4 sm:grid-cols-[14rem_1fr_10rem] sm:items-center"><span className="text-sm">{skill.name}</span>{skill.progress == null ? <span className="text-xs text-mute">Progresso: A definir com a Altius</span> : <><div className="h-1.5 bg-white/10" role="progressbar" aria-label={`Progresso em ${skill.name}`} aria-valuenow={skill.progress} aria-valuemin="0" aria-valuemax="100"><div className="h-full bg-accent" style={{ width: `${skill.progress}%` }} /></div><span className="text-xs tabular-nums text-mute">{skill.progress}%{skill.isExample ? ' · Exemplo' : ''}</span></>}</li>)}</ul></section>
  </div>
}
