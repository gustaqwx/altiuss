import { useState } from 'react'
import { gateway } from './gateway'
import { validateBuyer } from './validation'
import { hasPrice } from '../../lib/money'

export function useCheckout(product) {
  const [step, setStep] = useState(0)
  const [buyer, setBuyer] = useState({ name: '', email: '', cpf: '' })
  const [errors, setErrors] = useState({})
  const [method, setMethod] = useState('pix')
  const [submit, setSubmit] = useState({ status: 'idle', message: '', order: null })

  const unavailableReason = !hasPrice(product)
    ? 'O valor do programa ainda não foi definido.'
    : !gateway.isConfigured()
      ? 'O meio de pagamento ainda não foi configurado.'
      : null

  const updateBuyer = (field, value) => setBuyer((b) => ({ ...b, [field]: value }))
  const back = () => setStep((s) => Math.max(0, s - 1))
  const next = () => {
    if (step === 0) {
      const e = validateBuyer(buyer)
      setErrors(e)
      if (Object.keys(e).length) return
    }
    setStep((s) => Math.min(2, s + 1))
  }

  async function confirm() {
    if (unavailableReason) return
    setSubmit({ status: 'loading', message: '', order: null })
    try {
      const order = await gateway.createOrder({ productId: product.id, buyer, method })
      setSubmit({ status: 'done', message: '', order })
    } catch (err) {
      setSubmit({ status: 'error', message: err.message || 'Não foi possível criar o pedido.', order: null })
    }
  }

  return { step, buyer, errors, method, setMethod, submit, unavailableReason, updateBuyer, back, next, confirm }
}
