// Dados comerciais. Nada aqui é preço oficial até a Altius preencher `priceCents` (em centavos).
export const offer = {
  id: 'directio',
  name: 'Altius Directio',
  description:
    'Capacitação em hard e soft skills baseada no Future of Jobs Report do Fórum Econômico Mundial, para estudantes e novos talentos de tecnologia.',
  priceCents: null,
  maxInstallments: 1,
}

// Planos (opcional). Formato: { id, name, description, priceCents, maxInstallments, features: [] }
// Lista vazia = a seção de planos não aparece e o checkout usa `offer`.
export const plans = []

export const findPlan = (id) => plans.find((p) => p.id === id) ?? null
