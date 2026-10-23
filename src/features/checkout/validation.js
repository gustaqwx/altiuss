const digits = (s) => (s || '').replace(/\D/g, '')

export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((v || '').trim())
export const isFullName = (v) => (v || '').trim().split(/\s+/).filter(Boolean).length >= 2
export const isCvv = (v) => /^\d{3,4}$/.test((v || '').trim())

export function isCpf(v) {
  const d = digits(v)
  if (d.length !== 11 || /^(\d)\1+$/.test(d)) return false
  const check = (n) => {
    let s = 0
    for (let i = 0; i < n; i++) s += Number(d[i]) * (n + 1 - i)
    const r = (s * 10) % 11
    return r === 10 ? 0 : r
  }
  return check(9) === Number(d[9]) && check(10) === Number(d[10])
}

export function isCardNumber(v) {
  const d = digits(v)
  if (d.length < 13 || d.length > 19) return false
  let sum = 0
  let alt = false
  for (let i = d.length - 1; i >= 0; i--) {
    let n = Number(d[i])
    if (alt) { n *= 2; if (n > 9) n -= 9 }
    sum += n
    alt = !alt
  }
  return sum % 10 === 0
}

export function isExpiry(v, now = new Date()) {
  const m = /^(\d{2})\/(\d{2})$/.exec((v || '').trim())
  if (!m) return false
  const month = Number(m[1])
  const year = 2000 + Number(m[2])
  if (month < 1 || month > 12) return false
  return year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1)
}

export function validateBuyer(b) {
  const e = {}
  if (!isFullName(b.name)) e.name = 'Informe nome e sobrenome.'
  if (!isEmail(b.email)) e.email = 'Informe um e-mail válido.'
  if (!isCpf(b.cpf)) e.cpf = 'Informe um CPF válido.'
  return e
}

export const cardRules = {
  holder: [isFullName, 'Informe o nome do cartão.'],
  number: [isCardNumber, 'Número de cartão inválido.'],
  expiry: [isExpiry, 'Use MM/AA e uma data futura.'],
  cvv: [isCvv, 'Código de segurança inválido.'],
}
