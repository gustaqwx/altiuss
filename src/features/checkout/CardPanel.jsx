import { useState } from 'react'
import Field, { inputClass } from '../../components/Field'
import { cardRules } from './validation'
import { formatBRL, hasPrice } from '../../lib/money'

// ATENÇÃO: com um provedor, troque estes campos pelos campos hospedados dele (tokenização).
// Aqui os valores só são validados ao sair do campo; não vão para estado, rede, log nem armazenamento.
export default function CardPanel({ product }) {
  const [errors, setErrors] = useState({})
  const check = (field) => (e) => {
    const [ok, msg] = cardRules[field]
    setErrors((p) => ({ ...p, [field]: ok(e.target.value) ? undefined : msg }))
  }
  const max = product.maxInstallments || 1
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2"><Field id="cartao-titular" label="Nome do titular" autoComplete="cc-name" error={errors.holder} onBlur={check('holder')} /></div>
      <div className="sm:col-span-2"><Field id="cartao-numero" label="Número do cartão" inputMode="numeric" autoComplete="cc-number" error={errors.number} onBlur={check('number')} /></div>
      <Field id="cartao-validade" label="Validade (MM/AA)" inputMode="numeric" autoComplete="cc-exp" placeholder="MM/AA" error={errors.expiry} onBlur={check('expiry')} />
      <Field id="cartao-cvv" label="Código de segurança" inputMode="numeric" autoComplete="cc-csc" error={errors.cvv} onBlur={check('cvv')} />
      <div className="sm:col-span-2">
        <label htmlFor="cartao-parcelas" className="mb-1.5 block text-sm text-mute">Parcelas</label>
        <select id="cartao-parcelas" disabled={!hasPrice(product)} className={`${inputClass} border-[color:var(--line)]`}>
          {hasPrice(product)
            ? Array.from({ length: max }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n}x de {formatBRL(product.priceCents / n)}</option>)
            : <option>Disponível após a definição do valor</option>}
        </select>
      </div>
    </div>
  )
}
