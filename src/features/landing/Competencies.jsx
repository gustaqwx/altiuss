export default function Competencies() {
  return (
    <>
      <section id="competencias" className="border-t border-[color:var(--line)]" aria-labelledby="t-comp">
        <div id="comp-pin" className="lg:h-screen lg:overflow-hidden">
          <div className="mx-auto max-w-[90rem] px-5 py-20 md:px-10 lg:flex lg:h-full lg:items-center lg:gap-16 lg:pb-12 lg:pt-[calc(4.5rem+2rem)]">
            <div className="mb-12 lg:mb-0 lg:w-[30%] lg:shrink-0">
              <h2 id="t-comp" className="font-display text-4xl font-bold leading-[1.05] md:text-5xl">
                Currículo Baseado em Evidências
              </h2>
              <p className="mt-5 max-w-sm text-mute">
                As habilidades mais críticas para a próxima década, segundo o Fórum Econômico Mundial.
              </p>
            </div>
            <div id="comp-view" className="lg:w-[70%] lg:overflow-hidden">
              <div id="comp-track" className="lg:flex lg:w-max lg:items-stretch lg:gap-8">
                <article className="comp-item border-t border-[color:var(--line)] lg:min-h-[22rem] lg:w-[24rem] lg:shrink-0 lg:border-l lg:border-t-0 lg:pl-8 xl:w-[27rem]">
                  <h3>
                    <button type="button" className="comp-btn flex w-full items-baseline gap-5 py-6 text-left lg:flex-col lg:gap-10 lg:py-0" aria-expanded="false">
                      <span className="comp-num font-display text-4xl font-extrabold text-mute lg:text-8xl">
                        01/
                      </span>
                      <span className="font-display text-2xl font-bold lg:text-3xl">
                        Pensamento Analítico
                      </span>
                    </button>
                  </h3>
                  <div className="comp-body hidden pb-8 text-mute lg:mt-6 lg:block lg:pb-0">
                    Resolução de problemas complexos com dados, lógica e hipóteses.
                  </div>
                </article>
                <article className="comp-item border-t border-[color:var(--line)] lg:min-h-[22rem] lg:w-[24rem] lg:shrink-0 lg:border-l lg:border-t-0 lg:pl-8 xl:w-[27rem]">
                  <h3>
                    <button type="button" className="comp-btn flex w-full items-baseline gap-5 py-6 text-left lg:flex-col lg:gap-10 lg:py-0" aria-expanded="false">
                      <span className="comp-num font-display text-4xl font-extrabold text-mute lg:text-8xl">
                        02/
                      </span>
                      <span className="font-display text-2xl font-bold lg:text-3xl">
                        IA &amp; Big Data
                      </span>
                    </button>
                  </h3>
                  <div className="comp-body hidden pb-8 text-mute lg:mt-6 lg:block lg:pb-0">
                    Uso prático de inteligência artificial, automação e análise de dados.
                  </div>
                </article>
                <article className="comp-item border-t border-[color:var(--line)] lg:min-h-[22rem] lg:w-[24rem] lg:shrink-0 lg:border-l lg:border-t-0 lg:pl-8 xl:w-[27rem]">
                  <h3>
                    <button type="button" className="comp-btn flex w-full items-baseline gap-5 py-6 text-left lg:flex-col lg:gap-10 lg:py-0" aria-expanded="false">
                      <span className="comp-num font-display text-4xl font-extrabold text-mute lg:text-8xl">
                        03/
                      </span>
                      <span className="font-display text-2xl font-bold lg:text-3xl">
                        Programação &amp; Sistemas
                      </span>
                    </button>
                  </h3>
                  <div className="comp-body hidden pb-8 text-mute lg:mt-6 lg:block lg:pb-0">
                    Lógica de programação, versionamento, arquitetura básica e cloud.
                  </div>
                </article>
                <article className="comp-item border-t border-[color:var(--line)] lg:min-h-[22rem] lg:w-[24rem] lg:shrink-0 lg:border-l lg:border-t-0 lg:pl-8 xl:w-[27rem]">
                  <h3>
                    <button type="button" className="comp-btn flex w-full items-baseline gap-5 py-6 text-left lg:flex-col lg:gap-10 lg:py-0" aria-expanded="false">
                      <span className="comp-num font-display text-4xl font-extrabold text-mute lg:text-8xl">
                        04/
                      </span>
                      <span className="font-display text-2xl font-bold lg:text-3xl">
                        Flexibilidade &amp; Resiliência
                      </span>
                    </button>
                  </h3>
                  <div className="comp-body hidden pb-8 text-mute lg:mt-6 lg:block lg:pb-0">
                    Adaptação rápida a mudanças, ferramentas e contextos.
                  </div>
                </article>
                <article className="comp-item border-t border-[color:var(--line)] lg:min-h-[22rem] lg:w-[24rem] lg:shrink-0 lg:border-l lg:border-t-0 lg:pl-8 xl:w-[27rem]">
                  <h3>
                    <button type="button" className="comp-btn flex w-full items-baseline gap-5 py-6 text-left lg:flex-col lg:gap-10 lg:py-0" aria-expanded="false">
                      <span className="comp-num font-display text-4xl font-extrabold text-mute lg:text-8xl">
                        05/
                      </span>
                      <span className="font-display text-2xl font-bold lg:text-3xl">
                        Colaboração &amp; Empatia
                      </span>
                    </button>
                  </h3>
                  <div className="comp-body hidden pb-8 text-mute lg:mt-6 lg:block lg:pb-0">
                    Trabalho em squads multidisciplinares e inteligência emocional.
                  </div>
                </article>
                <article className="comp-item border-t border-[color:var(--line)] lg:min-h-[22rem] lg:w-[24rem] lg:shrink-0 lg:border-l lg:border-t-0 lg:pl-8 xl:w-[27rem]">
                  <h3>
                    <button type="button" className="comp-btn flex w-full items-baseline gap-5 py-6 text-left lg:flex-col lg:gap-10 lg:py-0" aria-expanded="false">
                      <span className="comp-num font-display text-4xl font-extrabold text-mute lg:text-8xl">
                        06/
                      </span>
                      <span className="font-display text-2xl font-bold lg:text-3xl">
                        Liderança &amp; Networking
                      </span>
                    </button>
                  </h3>
                  <div className="comp-body hidden pb-8 text-mute lg:mt-6 lg:block lg:pb-0">
                    Protagonismo, tomada de decisão e gestão em equipe.
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
