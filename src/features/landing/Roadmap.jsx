export default function Roadmap() {
  return (
    <>
      <section id="roadmap" className="border-t border-[color:var(--line)] px-5 py-24 md:px-10 lg:py-32" aria-labelledby="t-road">
        <div className="mx-auto grid max-w-[90rem] gap-12 lg:grid-cols-[2fr_3fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 id="t-road" className="font-display text-4xl font-bold leading-[1.05] md:text-5xl">
              Roadmap do programa
            </h2>
            <p className="mt-5 max-w-sm text-mute">
              Doze meses, quatro fases: do diagnóstico à sua primeira oportunidade.
            </p>
          </div>
          <ol id="road-list" className="relative pl-10 md:pl-14">
            <span className="absolute bottom-0 left-[7px] top-0 w-px bg-[color:var(--line)]" aria-hidden="true">
              <span id="road-line" className="block h-full w-full origin-top bg-accent">
              </span>
            </span>
            <li className="road-step relative pb-20">
              <span className="road-dot absolute -left-10 top-3 h-[15px] w-[15px] rounded-full border border-mute bg-ink md:-left-14" aria-hidden="true">
              </span>
              <p className="text-sm text-mute">
                Fase 01, meses 1 e 2
              </p>
              <h3 className="mt-2 flex items-baseline gap-4 font-display text-3xl font-extrabold md:text-5xl">
                <span className="text-mute">
                  01/
                </span>
                Diagnose &amp; Base
              </h3>
              <ul className="mt-5 max-w-md divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
                <li className="py-3">
                  Assessment de perfil
                </li>
                <li className="py-3">
                  Fundamentos de TI
                </li>
                <li className="py-3">
                  Autoconhecimento
                </li>
                <li className="py-3">
                  Plano individual
                </li>
              </ul>
            </li>
            <li className="road-step relative pb-20">
              <span className="road-dot absolute -left-10 top-3 h-[15px] w-[15px] rounded-full border border-mute bg-ink md:-left-14" aria-hidden="true">
              </span>
              <p className="text-sm text-mute">
                Fase 02, meses 3 a 5
              </p>
              <h3 className="mt-2 flex items-baseline gap-4 font-display text-3xl font-extrabold md:text-5xl">
                <span className="text-mute">
                  02/
                </span>
                Capacitação Intensiva
              </h3>
              <ul className="mt-5 max-w-md divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
                <li className="py-3">
                  Trilhas de hard skills
                </li>
                <li className="py-3">
                  Workshops de soft skills
                </li>
                <li className="py-3">
                  Projetos em grupo
                </li>
                <li className="py-3">
                  Mentoria quinzenal
                </li>
              </ul>
            </li>
            <li className="road-step relative pb-20">
              <span className="road-dot absolute -left-10 top-3 h-[15px] w-[15px] rounded-full border border-mute bg-ink md:-left-14" aria-hidden="true">
              </span>
              <p className="text-sm text-mute">
                Fase 03, meses 6 a 9
              </p>
              <h3 className="mt-2 flex items-baseline gap-4 font-display text-3xl font-extrabold md:text-5xl">
                <span className="text-mute">
                  03/
                </span>
                Imersão &amp; Prática
              </h3>
              <ul className="mt-5 max-w-md divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
                <li className="py-3">
                  Projeto real em empresa
                </li>
                <li className="py-3">
                  Hackathon interno
                </li>
                <li className="py-3">
                  Simulação de entrevista
                </li>
                <li className="py-3">
                  Portfólio técnico
                </li>
              </ul>
            </li>
            <li className="road-step relative">
              <span className="road-dot absolute -left-10 top-3 h-[15px] w-[15px] rounded-full border border-mute bg-ink md:-left-14" aria-hidden="true">
              </span>
              <p className="text-sm text-mute">
                Fase 04, meses 10 a 12
              </p>
              <h3 className="mt-2 flex items-baseline gap-4 font-display text-3xl font-extrabold md:text-5xl">
                <span className="text-mute">
                  04/
                </span>
                Empregabilidade
              </h3>
              <ul className="mt-5 max-w-md divide-y divide-[color:var(--line)] border-y border-[color:var(--line)]">
                <li className="py-3">
                  LinkedIn &amp; branding
                </li>
                <li className="py-3">
                  Conexão com parceiros
                </li>
                <li className="py-3">
                  Processo seletivo real
                </li>
                <li className="py-3">
                  Onboarding de carreira
                </li>
              </ul>
            </li>
          </ol>
        </div>
      </section>
    </>
  )
}
