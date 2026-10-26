'use client';

import { motion } from 'framer-motion';
import NotchedCard from './NotchedCard'
import Marquee from './Marquee'

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
            <div className="nc-bar-track"><div className="nc-bar-fill" style={{ '--w': '65%' }} /></div>
            <span className="nc-bar-value">A definir</span>
          </div>
          <div className="nc-bar-row">
            <span className="nc-bar-label">Fit cultural</span>
            <div className="nc-bar-track"><div className="nc-bar-fill" style={{ '--w': '78%' }} /></div>
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
              <div className="nc-crit-track"><div className="nc-crit-fill" style={{ '--w': `${[15, 35, 55, 70, 45, 25][i]}%` }} /></div>
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
    href: null,
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
    <section id="beneficios" className="relative py-20 lg:py-32" aria-labelledby="t-ben">
      {/* Background light streak */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] max-w-[800px] -z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-magenta/5 via-transparent to-transparent blur-3xl opacity-50" />
      </div>

      <div className="mx-auto max-w-[90rem] px-5 md:px-10">
        {/* Header */}
        <motion.div
          className="mb-16 lg:mb-20 text-center lg:text-left max-w-2xl mx-auto lg:mx-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-micro-base text-magenta mb-4 block">Benefícios do Programa</span>
          <h2 id="t-ben" className="font-display-alt text-heading-xl lg:text-heading-lg font-extrabold leading-tight text-snow">
            O que o programa oferece
          </h2>
          <p className="mt-6 text-body-lg text-mute max-w-lg mx-auto lg:mx-0">
            Seis frentes para você chegar à primeira vaga com preparo, prática e contatos.
          </p>
        </motion.div>

        {/* Marquee de tecnologias */}
        <motion.div
          className="mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Marquee speed={40} showBorder />
        </motion.div>

        {/* Grid de Benefícios */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6" role="list">
          {BENEFITS.map((b, index) => (
            <motion.li
              key={b.id}
              className="ben-card group"
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 0.7,
                delay: 0.3 + index * 0.08,
                ease: [0.22, 1, 0.36, 1]
              }}
              role="listitem"
              style={{
                willChange: 'transform, box-shadow',
              }}
            >
              <NotchedCard
                cover={b.cover}
                badge={b.badge}
                title={b.title}
                description={b.description}
                labels={b.labels}
                href={b.href}
                ariaLabel={b.title}
              />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}