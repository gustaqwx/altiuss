// Benefícios do programa: ordem por importancia para o aluno
// Cada benefício tem uma capa DIFERENTE feita de fatos reais do programa (HTML/CSS, aria-hidden)

import NotchedCard from './NotchedCard'

const BENEFITS = [
  {
    id: 'trilhas',
    badge: 'Explorar',
    title: 'Trilhas personalizadas',
    description: 'Percurso adaptado ao seu perfil diagnóstico com módulos progressivos de hard e soft skills.',
    labels: ['Hard skills', 'Soft skills'],
    href: '#roadmap',
    cover: (
      <div className="nc-cover-inner" aria-hidden="true" style={{ '--surface': 'var(--ink)' }}>
        <div className="nc-timeline-4">
          {['Explorar', 'Desenvolver', 'Aplicar', 'Decolar'].map((phase, i) => (
            <div key={phase} className="nc-phase" style={{ '--i': i }}>
              <span className="nc-phase-dot" />
              <span className="nc-phase-label">{phase}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'mentoria',
    badge: 'Quinzenal',
    title: 'Mentoria quinzenal',
    description: 'Sessões individuais e em grupo com profissionais de mercado da indústria tech.',
    labels: ['Individual', 'Grupo'],
    href: '#competencias',
    cover: (
      <div className="nc-cover-inner" aria-hidden="true" style={{ '--surface': 'var(--ink)' }}>
        <div className="nc-timeline-quinzenal" aria-label="6 marcas quinzenais">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="nc-qdot" style={{ '--odd': i % 2 === 0 }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'simulacoes',
    badge: 'Simulação',
    title: 'Simulações de processos seletivos',
    description: 'Entrevistas técnicas e comportamentais com feedback estruturado a cada rodada.',
    labels: ['Técnica', 'Comportamental'],
    href: '#competencias',
    cover: (
      <div className="nc-cover-inner" aria-hidden="true" style={{ '--surface': 'var(--ink)' }}>
        <div className="nc-dual-bars" aria-label="Live coding e fit cultural">
          <div className="nc-bar-row">
            <span className="nc-bar-label">Live coding</span>
            <div className="nc-bar-track"><div className="nc-bar-fill" style={{ width: '65%' }} /></div>
            <span className="nc-bar-value">A definir</span>
          </div>
          <div className="nc-bar-row">
            <span className="nc-bar-label">Fit cultural</span>
            <div className="nc-bar-track"><div className="nc-bar-fill" style={{ width: '78%' }} /></div>
            <span className="nc-bar-value">A definir</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'dashboard',
    badge: 'Dashboard',
    title: 'Dashboard de competências',
    description: 'Acompanhamento em tempo real das 6 habilidades do mapa WEF com metas e marcos.',
    labels: ['Tempo real', 'Metas'],
    href: '#competencias',
    cover: (
      <div className="nc-cover-inner" aria-hidden="true" style={{ '--surface': 'var(--ink)' }}>
        <div className="nc-criteria-bars" aria-label="6 critérios com valores A definir">
          {['Pensamento Analítico', 'IA & Big Data', 'Programação', 'Flexibilidade', 'Colaboração', 'Liderança'].map((c, i) => (
            <div key={c} className="nc-criterion">
              <span className="nc-crit-label">{c}</span>
              <div className="nc-crit-track"><div className="nc-crit-fill" style={{ width: `${[15, 35, 55, 70, 45, 25][i]}%` }} /></div>
              <span className="nc-crit-value">A definir</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'projetos',
    badge: 'Fase 3',
    title: 'Projetos aplicados',
    description: 'Desafios reais de empresas parceiras na Fase 3 (meses 6 a 9) geram portfólio e networking.',
    labels: ['Portfólio', 'Networking'],
    href: '#roadmap',
    cover: (
      <div className="nc-cover-inner" aria-hidden="true" style={{ '--surface': 'var(--ink)' }}>
        <ul className="nc-deliverables" aria-label="Entregas de exemplo">
          <li><span className="nc-del-dot" /> MVP funcional</li>
          <li><span className="nc-del-dot" /> Documentação técnica</li>
          <li><span className="nc-del-dot" /> Apresentação executiva</li>
        </ul>
        <span className="nc-example-tag">Exemplo</span>
      </div>
    ),
  },
  {
    id: 'comunidade',
    badge: 'Comunidade',
    title: 'Comunidade e eventos',
    description: 'Rede de ex-alunos, hackathons, workshops e encontros com recrutadores.',
    labels: ['Ex-alunos', 'Recrutadores'],
    href: null, // sem destino honesto → article sem link, sem seta, sem cursor pointer
    cover: (
      <div className="nc-cover-inner" aria-hidden="true" style={{ '--surface': 'var(--ink)' }}>
        <div className="nc-squad-blocks" aria-label="Squads heterogêneos">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="nc-squad-cell" style={{ '--n': i }} />
          ))}
        </div>
      </div>
    ),
  },
]

export default function Benefits() {
  return (
    <section id="beneficios" className="ben" aria-labelledby="t-ben">
      <div className="ben-in">
        <header className="ben-head">
          <h2 id="t-ben" className="ben-title">O que o programa oferece</h2>
          <p className="ben-sub">Seis frentes para você chegar à primeira vaga com preparo, prática e contatos.</p>
        </header>
        <ul className="ben-grid" role="list">
          {BENEFITS.map((b) => (
            <li key={b.id} className="ben-card">
              <NotchedCard
                cover={b.cover}
                badge={b.badge}
                title={b.title}
                description={b.description}
                labels={b.labels}
                href={b.href}
                ariaLabel={b.title}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}