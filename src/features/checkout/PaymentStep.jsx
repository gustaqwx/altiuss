import PixPanel from './PixPanel'
import CardPanel from './CardPanel'

// Para incluir débito ou boleto: adicione uma entrada aqui e um painel correspondente.
const METHODS = [{ id: 'pix', label: 'PIX' }, { id: 'card', label: 'Cartão de crédito' }]

export default function PaymentStep({ method, onMethod, product, available }) {
  return (
    <section aria-labelledby="t-pagamento">
      <h2 id="t-pagamento" className="font-display text-2xl font-bold">Forma de pagamento</h2>
      <div role="radiogroup" aria-labelledby="t-pagamento" className="mt-5 flex gap-3">
        {METHODS.map((m) => (
          <button key={m.id} type="button" role="radio" aria-checked={method === m.id} onClick={() => onMethod(m.id)}
            className={`rounded-md border px-4 py-2.5 text-sm transition-colors ${method === m.id ? 'border-accent text-snow' : 'border-[color:var(--line)] text-mute hover:text-snow'}`}>
            {m.label}
          </button>
        ))}
      </div>
      <div className="mt-8">
        {method === 'pix' ? <PixPanel available={available} /> : <CardPanel product={product} />}
      </div>
    </section>
  )
}
