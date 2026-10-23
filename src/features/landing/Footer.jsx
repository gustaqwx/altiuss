import { Link } from 'react-router-dom'
import { routes } from '../../config/site'

export default function Footer() {
  return (
    <>
      <footer id="contato" className="border-t border-[color:var(--line)] bg-night px-5 pb-8 pt-20 md:px-10">
        <div className="mx-auto max-w-[90rem]">
          <h2 className="max-w-4xl font-display text-[clamp(2rem,5.5vw,4.5rem)] font-extrabold leading-[1.02]">
            Pronto para dar o próximo nível na sua carreira tech?
          </h2>
          <div className="mt-14 grid gap-10 border-t border-[color:var(--line)] pt-8 md:grid-cols-[2fr_3fr]">
            <Link to={routes.checkout} className="btn self-start justify-self-start">
              Garanta sua vaga
            </Link>
            <dl className="grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-mute">
                  E-mail
                </dt>
                <dd>
                  <a className="nav-link text-snow break-all" href="mailto:contato@altiusinteligencia.com">
                    contato@altiusinteligencia.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-mute">
                  Telefone
                </dt>
                <dd>
                  <a className="nav-link text-snow" href="tel:+5541987132450">
                    +55 41 98713-2450
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <p className="mt-16 border-t border-[color:var(--line)] pt-6 text-sm text-mute">
            Altius Inteligência 2026. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </>
  )
}
