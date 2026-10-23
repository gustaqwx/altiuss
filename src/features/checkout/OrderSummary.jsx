import { formatBRL, hasPrice } from '../../lib/money'

export default function OrderSummary({ product, reason }) {
  return (
    <aside aria-label="Resumo do pedido" className="lg:sticky lg:top-28 lg:self-start">
      <h2 className="font-display text-xl font-bold">Resumo do pedido</h2>
      <div className="mt-5 border-t border-[color:var(--line)] pt-5">
        <p className="font-medium">{product.name}</p>
        <p className="mt-2 text-sm leading-relaxed text-mute">{product.description}</p>
      </div>
      <dl className="mt-5 flex items-baseline justify-between border-t border-[color:var(--line)] pt-5">
        <dt className="text-mute">Total</dt>
        <dd className="font-display text-2xl font-bold">{hasPrice(product) ? formatBRL(product.priceCents) : 'Valor a definir'}</dd>
      </dl>
      {reason && <p role="status" className="mt-6 text-sm text-mute">{reason}</p>}
    </aside>
  )
}
