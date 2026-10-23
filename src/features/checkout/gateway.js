// Camada única de comunicação com o provedor de pagamento.
// Contrato de um adaptador: { id, isConfigured(), createOrder({ productId, buyer, method }), getStatus(orderId) }
// O frontend nunca envia preço: o servidor recalcula o valor a partir de `productId`.
export class PaymentNotConfiguredError extends Error {
  constructor() {
    super('O meio de pagamento ainda não foi configurado.')
    this.name = 'PaymentNotConfiguredError'
  }
}

const notConfigured = {
  id: 'none',
  isConfigured: () => false,
  async createOrder() { throw new PaymentNotConfiguredError() },
  async getStatus() { throw new PaymentNotConfiguredError() },
}

// Registre aqui o adaptador do provedor escolhido e ative com VITE_PAYMENT_PROVIDER.
const adapters = { none: notConfigured }

export const gateway = adapters[import.meta.env?.VITE_PAYMENT_PROVIDER || 'none'] ?? notConfigured
