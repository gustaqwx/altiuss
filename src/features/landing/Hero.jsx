import Laptop from './Laptop'

export default function Hero() {
  return (
    <>
      <span id="inicio" className="absolute top-0" aria-hidden="true" />
      <section id="programa" className="relative flex min-h-screen flex-col justify-center overflow-hidden px-5 pb-16 pt-32 md:px-10" aria-labelledby="t-programa">
        <div className="relative mx-auto w-full max-w-[90rem]">
          <div className="hero-fade mb-8 flex flex-wrap gap-3 text-sm text-mute">
            <span className="inline-flex items-center gap-2 rounded-md border border-[color:var(--line)] px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              4 fases · 6 competências WEF
            </span>
          </div>
          <div className="grid gap-x-10 gap-y-8 lg:grid-cols-[1fr_1.15fr] lg:grid-rows-[auto_auto] lg:items-center">
            <h1 id="t-programa" className="font-display text-[clamp(2.4rem,4.4vw,4.4rem)] font-extrabold leading-none lg:col-start-1">
              {['Seu passo decisivo', 'na carreira de', 'tecnologia', 'começa aqui.'].map((line) => (
                <span key={line} className="block overflow-hidden pb-[.1em]">
                  <span className="hero-line block">{line}</span>
                </span>
              ))}
            </h1>
            <div className="hero-fade lg:col-start-1">
              <p className="max-w-md text-lg text-mute">
                Capacitação completa em hard e soft skills baseada no Future of Jobs Report do Fórum Econômico Mundial para estudantes e novos talentos.
              </p>
              <a href="#roadmap" className="btn mt-8">Ver Roadmap do Programa</a>
            </div>
            <Laptop />
          </div>
        </div>
      </section>
    </>
  )
}
