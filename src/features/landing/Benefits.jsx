// Conteúdo dos benefícios (mantido do site). Ícones: mesma grade 24x24, traço 1.7.
const BENEFITS = [
  { id: 'trilhas', icon: 'route', title: 'Trilhas personalizadas', text: 'Percursos baseados no seu perfil diagnóstico.' },
  { id: 'simulacoes', icon: 'check', title: 'Simulações de processos seletivos', text: 'Com feedback estruturado a cada rodada.' },
  { id: 'mentoria', icon: 'users', title: 'Mentoria', text: 'Com profissionais de mercado da indústria tech.' },
  { id: 'dashboard', icon: 'chart', title: 'Dashboard em tempo real', text: 'Para acompanhar a evolução das suas competências.' },
  { id: 'projetos', icon: 'briefcase', title: 'Projetos aplicados', text: 'Com empresas parceiras.' },
  { id: 'comunidade', icon: 'network', title: 'Comunidade viva', text: 'Hackathons e eventos exclusivos com recrutadores.' },
]

const ICONS = {
  route: <><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="6" r="2.5" /><path d="M8.5 18H15a3 3 0 000-6H9a3 3 0 010-6h6.5" /></>,
  check: <><rect x="5" y="4" width="14" height="17" rx="2.5" /><path d="M9 4V3.5M15 4V3.5M9 13l2 2 4-4" /></>,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><circle cx="17.5" cy="9" r="2.4" /><path d="M17 14.2c2.4.3 4 2.2 4 4.8" /></>,
  chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2.5" /><path d="M9 7V5.5A1.5 1.5 0 0110.5 4h3A1.5 1.5 0 0115 5.5V7M3 13h18" /></>,
  network: <><circle cx="12" cy="5" r="2.5" /><circle cx="5" cy="18" r="2.5" /><circle cx="19" cy="18" r="2.5" /><path d="M12 7.5V12M12 12l-5.5 4M12 12l5.5 4" /></>,
}

export default function Benefits() {
  return (
    <section id="beneficios" className="ben" aria-labelledby="t-ben">
      <div className="ben-in">
        <header className="ben-head">
          <h2 id="t-ben" className="ben-title">O que o programa oferece</h2>
          <p className="ben-sub">Seis frentes para você chegar à primeira vaga com preparo, prática e contatos.</p>
        </header>
        <ul className="ben-grid">
          {BENEFITS.map((b) => (
            <li key={b.id} className="ben-card">
              <span className="ben-ic" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{ICONS[b.icon]}</svg>
              </span>
              <h3 className="ben-h">{b.title}</h3>
              <p className="ben-p">{b.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
