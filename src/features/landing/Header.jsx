import { Link } from 'react-router-dom'
import { routes } from '../../config/site'
import { landingContent } from '../../content/landing'

export default function Header() {
  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only fixed left-4 top-4 z-[60] bg-accent text-ink px-3 py-2 rounded">
        Pular para o conteúdo
      </a>
      <header className="site-header" id="header">
        <div className="mx-auto flex h-[4.5rem] max-w-[90rem] items-center justify-between gap-6 px-5 md:px-10">
          <a href="#inicio" className="flex items-center gap-3" aria-label="Altius Inteligência, Directio. Voltar ao início">
            <span className="font-display text-lg font-extrabold leading-none">
              Altius{" "}
              <span className="font-semibold text-mute">
                Inteligência
              </span>
            </span>
          </a>
          <nav aria-label="Principal" className="hidden items-center gap-8 text-sm lg:flex">
            <a className="nav-link" href="#programa">
              O Programa
            </a>
            <a className="nav-link" href="#competencias">
              Competências WEF
            </a>
            <a className="nav-link" href="#roadmap">
              Roadmap
            </a>
            <a className="nav-link" href="#beneficios">
              Benefícios
            </a>
            <a className="nav-link" href="#contato">
              Contato
            </a>
          </nav>
          <Link to={routes.checkout} className="btn hidden text-sm lg:inline-flex">
            Garanta sua vaga
          </Link>
          {landingContent.showLogin && <Link to="/login" className="hidden text-sm font-medium text-snow underline-offset-4 hover:text-accent hover:underline lg:inline-flex">{landingContent.loginLabel}</Link>}
          <button id="menu-btn" type="button" className="-mr-2 p-2 lg:hidden" aria-expanded="false" aria-controls="menu-panel" aria-label="Abrir menu">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path id="ic-open" d="M3 9h20M3 17h20" />
              <path id="ic-close" d="M5 5l16 16M21 5L5 21" style={{display: "none"}} />
            </svg>
          </button>
        </div>
        <div id="menu-panel" className="menu-panel border-t border-[color:var(--line)] bg-ink lg:hidden">
          <nav aria-label="Principal (mobile)" className="mx-auto flex max-w-[90rem] flex-col px-5 pb-6 pt-2 md:px-10">
            <a className="border-b border-[color:var(--line)] py-4 font-display text-2xl font-bold" href="#programa">
              O Programa
            </a>
            <a className="border-b border-[color:var(--line)] py-4 font-display text-2xl font-bold" href="#competencias">
              Competências WEF
            </a>
            <a className="border-b border-[color:var(--line)] py-4 font-display text-2xl font-bold" href="#roadmap">
              Roadmap
            </a>
            <a className="border-b border-[color:var(--line)] py-4 font-display text-2xl font-bold" href="#beneficios">
              Benefícios
            </a>
            <a className="border-b border-[color:var(--line)] py-4 font-display text-2xl font-bold" href="#contato">
              Contato
            </a>
            <Link to={routes.checkout} className="btn mt-6">
              Garanta sua vaga
            </Link>
            {landingContent.showLogin && <Link to="/login" className="mt-4 py-3 text-sm font-medium text-snow">{landingContent.loginLabel}</Link>}
          </nav>
        </div>
      </header>
    </>
  )
}
