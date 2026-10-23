// Notebook 3D do hero. Os ganchos #pc e .pc-tilt são usados por useLandingMotion (rotação no scroll e inclinação com o ponteiro).
const KEYS = [
  [1.5, ...Array(12).fill(1), 1.2],
  [...Array(13).fill(1), 1.6],
  [1.5, ...Array(12).fill(1), 1.1],
  [1.8, ...Array(11).fill(1), 1.9],
  [2.3, ...Array(10).fill(1), 2.4],
  [1, 1, 1, 1.3, 5.6, 1.3, 1, 1, 1, 1],
]
const PHASES = ['Explorar', 'Desenvolver', 'Aplicar', 'Decolar']

const icons = {
  calendar: <><rect x="3.5" y="5" width="17" height="15" rx="2.5" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>,
  layers: <><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /></>,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><circle cx="17.5" cy="9" r="2.4" /><path d="M17 14.2c2.4.3 4 2.2 4 4.8" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2.5" /><path d="M9 7V5.5A1.5 1.5 0 0110.5 4h3A1.5 1.5 0 0115 5.5V7M3 13h18" /></>,
}

function Card({ cls, icon, label, value }) {
  return (
    <div className={`fc ${cls}`}>
      <div className="fc-in">
        <span className="fc-ic">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{icons[icon]}</svg>
        </span>
        <span><b>{value}</b><small>{label}</small></span>
      </div>
    </div>
  )
}

export default function Laptop() {
  return (
    <div className="pc-scene relative lg:col-start-2 lg:row-span-2 lg:row-start-1" role="img" aria-label="Notebook exibindo a página do programa Altius Directio, com cartões sobre duração, competências, mentoria e projeto real">
      <div className="pc-light" aria-hidden="true" />
      <div className="pc-in" aria-hidden="true">
        <div className="pc-fit">
          <div className="pc-tilt">
            <div id="pc">
              <div className="lt-shadow" />
              <div className="lt-lid">
                <div className="lt-face lt-front">
                  <span className="lt-notch" />
                  <div className="lt-screen">
                    <span className="lt-brand">Altius Directio</span>
                    <p className="lt-h">Seu passo decisivo na carreira de tecnologia começa aqui.</p>
                    <p className="lt-sub">Hard e soft skills baseadas no Future of Jobs Report do WEF.</p>
                    <span className="lt-cta">Garanta sua vaga</span>
                    <div className="lt-foot">
                      <p className="lt-big">12<small>meses</small></p>
                      <ol className="lt-road">{PHASES.map((p) => <li key={p}>{p}</li>)}</ol>
                    </div>
                  </div>
                </div>
                <div className="lt-face lt-back" />
                <div className="lt-face lt-top" />
                <div className="lt-face lt-sl" />
                <div className="lt-face lt-sr" />
              </div>
              <div className="lt-hinge" />
              <div className="lt-deck">
                <div className="lt-kb">
                  {KEYS.map((row, r) => <div className="lt-row" key={r}>{row.map((u, k) => <i key={k} style={{ flex: u }} />)}</div>)}
                </div>
                <div className="lt-pad" />
              </div>
              <div className="lt-lip" />
              <div className="lt-dl" />
              <div className="lt-dr" />
            </div>
            <Card cls="fc-a" icon="calendar" value="12 meses" label="Programa" />
            <Card cls="fc-b" icon="layers" value="6 pilares" label="Competências do WEF" />
            <Card cls="fc-c" icon="users" value="Quinzenal" label="Mentoria" />
            <Card cls="fc-d" icon="briefcase" value="Projeto real" label="Fase 3" />
          </div>
        </div>
      </div>
    </div>
  )
}
