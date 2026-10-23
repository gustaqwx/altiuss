export function validateEmail(value) {
  const email = value.trim()
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validateCredentials({ email, password, name, mode }) {
  const errors = {}
  if (mode !== 'reset' && !validateEmail(email || '')) errors.email = 'Informe um e-mail válido.'
  if (mode !== 'recovery' && (!password || password.length < 8)) errors.password = 'A senha deve ter pelo menos 8 caracteres.'
  if (mode === 'register' && !(name || '').trim()) errors.name = 'Informe seu nome.'
  return errors
}
