import { Link, useSearchParams } from 'react-router-dom'
import { routes } from '../config/site'
import { offer, findPlan } from '../config/offer'
import CheckoutFlow from '../features/checkout/CheckoutFlow'

export default function Checkout() {
  const [params] = useSearchParams()
  const planId = params.get('plano')
  const product = planId ? findPlan(planId) : offer

  return (
    <main className="min-h-screen px-5 py-12 md:px-10 md:py-20">
      <div className="mx-auto max-w-[72rem]">
        <Link to={routes.program} className="nav-link text-sm">Voltar ao site</Link>
        <h1 className="mb-12 mt-8 font-display text-4xl font-bold md:text-5xl">Inscrição</h1>
        {product ? <CheckoutFlow key={product.id} product={product} /> : (
          <p role="alert" className="border-y border-[color:var(--line)] py-5 text-mute">Plano não encontrado. Volte ao site e escolha uma das opções disponíveis.</p>
        )}
      </div>
    </main>
  )
}
