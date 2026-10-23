import { useCheckout } from './useCheckout'
import OrderSummary from './OrderSummary'
import BuyerStep from './BuyerStep'
import PaymentStep from './PaymentStep'
import ReviewStep from './ReviewStep'

const STEPS = ['Seus dados', 'Pagamento', 'Revisão']

export default function CheckoutFlow({ product }) {
  const c = useCheckout(product)
  return (
    <div className="grid gap-14 lg:grid-cols-[3fr_2fr]">
      <div>
        <ol aria-label="Etapas do pedido" className="mb-10 flex flex-wrap gap-x-6 gap-y-1 text-sm">
          {STEPS.map((s, i) => (
            <li key={s} aria-current={i === c.step ? 'step' : undefined} className={i === c.step ? 'text-snow' : 'text-mute'}>{i + 1}. {s}</li>
          ))}
        </ol>
        {c.step === 0 && <BuyerStep buyer={c.buyer} errors={c.errors} onChange={c.updateBuyer} />}
        {c.step === 1 && <PaymentStep method={c.method} onMethod={c.setMethod} product={product} available={!c.unavailableReason} />}
        {c.step === 2 && <ReviewStep buyer={c.buyer} method={c.method} product={product} reason={c.unavailableReason} submit={c.submit} onConfirm={c.confirm} />}
        <div className="mt-10 flex items-center gap-6">
          {c.step > 0 && <button type="button" onClick={c.back} className="nav-link text-sm">Voltar</button>}
          {c.step < 2 && <button type="button" onClick={c.next} className="btn">Continuar</button>}
        </div>
      </div>
      <OrderSummary product={product} reason={c.unavailableReason} />
    </div>
  )
}
