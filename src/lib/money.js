const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
export const formatBRL = (cents) => brl.format(cents / 100)
export const hasPrice = (p) => Number.isInteger(p?.priceCents) && p.priceCents > 0
