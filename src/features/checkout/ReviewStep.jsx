import { formatBRL, hasPrice } from '../../lib/money'

const LABEL = { pix: 'PIX', card: 'Cartão de crédito' }

export default function ReviewStep({ buyer, method, product, reason, submit, onConfirm }) {
  const paid = submit.status === 'done' && submit.order?.status === 'paid'
  return (
    <section aria-labelledby="t-revisao">
      <h2 id="t-revisao" className="font-display text-2xl font-bold">Revise e confirme</h2>
      <dl className="mt-6 divide-y divide-[color:var(--line)] border-y border-[color:var(--line)] text-sm">
        {[['Produto', product.name], ['Total', hasPrice(product) ? formatBRL(product.priceCents) : 'Valor a definir'], ['Nome', buyer.name], ['E-mail', buyer.email], ['CPF', buyer.cpf], ['Pagamento', LABEL[method]]].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-6 py-3"><dt className="text-mute">{k}</dt><dd className="text-right">{v}</dd></div>
        ))}
      </dl>
      <div className="mt-8">
        <button type="button" onClick={onConfirm} disabled={Boolean(reason) || submit.status === 'loading'} className="btn disabled:pointer-events-none disabled:opacity-40">
          {submit.status === 'loading' ? 'Processando…' : 'Confirmar pedido'}
        </button>
        {reason && <p role="status" className="mt-4 text-sm text-mute">Pagamento ainda não disponível. {reason}</p>}
        {submit.status === 'error' && <p role="alert" className="mt-4 text-sm text-[#ff8a8a]">{submit.message}</p>}
        {submit.status === 'done' && !paid && <p role="status" className="mt-4 text-sm text-mute">Pedido criado. Aguardando a confirmação do pagamento.</p>}
        {paid && <p role="status" className="mt-4 text-sm">Pagamento confirmado.</p>}
      </div>
    </section>
  )
}
