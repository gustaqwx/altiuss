import { Link } from 'react-router-dom'
import { plans } from '../../config/offer'
import { routes } from '../../config/site'
import { formatBRL, hasPrice } from '../../lib/money'

// Só aparece quando houver planos confirmados em src/config/offer.js.
export default function Pricing() {
  if (!plans.length) return null
  return (
    <section id="planos" className="border-t border-[color:var(--line)] px-5 py-24 md:px-10 lg:py-32" aria-labelledby="t-planos">
      <div className="mx-auto max-w-[90rem]">
        <h2 id="t-planos" className="font-display text-4xl font-bold leading-[1.05] md:text-5xl">Planos</h2>
        <div className="mt-12 grid gap-10 md:grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]">
          {plans.map((p) => (
            <article key={p.id} className="flex flex-col border-t border-[color:var(--line)] pt-6">
              <h3 className="font-display text-2xl font-bold">{p.name}</h3>
              <p className="mt-2 text-mute">{p.description}</p>
              <p className="mt-6 font-display text-4xl font-extrabold">{hasPrice(p) ? formatBRL(p.priceCents) : 'Valor a definir'}</p>
              <ul className="mt-6 flex-1 divide-y divide-[color:var(--line)] border-y border-[color:var(--line)] text-sm">
                {(p.features ?? []).map((f) => <li key={f} className="py-3">{f}</li>)}
              </ul>
              <Link to={routes.plan(p.id)} className="btn mt-8 self-start">Garanta sua vaga</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
