import Field from '../../components/Field'

export default function BuyerStep({ buyer, errors, onChange }) {
  return (
    <section aria-labelledby="t-dados" className="space-y-5">
      <h2 id="t-dados" className="font-display text-2xl font-bold">Seus dados</h2>
      <Field id="nome" label="Nome completo" autoComplete="name" value={buyer.name} error={errors.name} onChange={(e) => onChange('name', e.target.value)} />
      <Field id="email" label="E-mail" type="email" autoComplete="email" value={buyer.email} error={errors.email} onChange={(e) => onChange('email', e.target.value)} />
      <Field id="cpf" label="CPF" inputMode="numeric" autoComplete="off" value={buyer.cpf} error={errors.cpf} hint="Exigido pelos provedores de pagamento para emitir a cobrança." onChange={(e) => onChange('cpf', e.target.value)} />
    </section>
  )
}
