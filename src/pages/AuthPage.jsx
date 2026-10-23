import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { authContent } from '../content/auth'
import { authApi } from '../features/auth/api'
import { useAuth } from '../features/auth/AuthProvider'
import { validateCredentials } from '../features/auth/validation'

const modeLink = { login: ['/registro', 'Criar conta'], register: ['/login', 'Já tenho uma conta'], recovery: ['/login', 'Voltar ao login'], reset: ['/login', 'Voltar ao login'] }

export default function AuthPage({ mode }) {
  const { session, demoEnabled, signInDemo, signIn, signUp, requestPasswordRecovery, signInWithApple, updatePassword } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const [demoRole, setDemoRole] = useState('student')
  const [busy, setBusy] = useState(false)
  const demoOnly = demoEnabled && !authApi.isConfigured()
  const configured = authApi.isConfigured()

  if (session && mode !== 'reset') return <Navigate to="/app" replace />

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
    setMessage('')
  }

  async function submit(event) {
    event.preventDefault()
    const nextErrors = validateCredentials({ ...form, mode })
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    setBusy(true)
    try {
      if (mode === 'login') await signIn(form)
      else if (mode === 'register') {
        const result = await signUp(form)
        setMessage(result ? 'Conta criada.' : 'Confira seu e-mail para confirmar o cadastro. Seu perfil começa como Aluno.')
      } else if (mode === 'recovery') {
        await requestPasswordRecovery(form)
        setMessage('Se o e-mail estiver cadastrado, você receberá instruções de recuperação.')
      } else { await updatePassword(form); setMessage('Senha atualizada. Entre com sua nova senha.') }
    } catch (error) { setMessage(error.message) }
    finally { setBusy(false) }
  }

  async function enterDemo() {
    setBusy(true)
    try {
      await signInDemo(demoRole)
    } catch (error) {
      setMessage(error.message)
    } finally {
      setBusy(false)
    }
  }

  const title = authContent.title[mode]
  return (
    <main className="min-h-screen bg-ink px-5 py-10 text-snow sm:px-8">
      {demoOnly && <div className="fixed inset-x-0 top-0 z-20 border-b border-amber-300/40 bg-amber-100 px-4 py-2 text-center text-sm font-medium text-amber-950">Modo demonstração, dados de exemplo</div>}
      <div className={`mx-auto grid min-h-[calc(100vh-5rem)] max-w-5xl items-center gap-12 ${demoOnly ? 'pt-10' : ''} md:grid-cols-[1fr_24rem]`}>
        <section className="max-w-xl">
          <div className="flex flex-wrap items-center justify-between gap-3"><Link to="/programa" className="text-sm font-semibold tracking-wide text-snow">ALTIUS <span className="text-mute">INTELIGÊNCIA</span></Link><Link to="/programa" className="text-xs text-mute underline underline-offset-4 hover:text-snow">Conheça o programa</Link></div>
          <p className="mt-12 text-xs font-semibold uppercase tracking-[0.18em] text-accent">{authContent.eyebrow}</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-md leading-7 text-mute">{authContent.description[mode]}</p>
          <div className="mt-8 border-t border-white/10 pt-5 text-sm text-mute">
            {modeLink[mode][1]}? <Link className="font-medium text-accent underline-offset-4 hover:underline" to={modeLink[mode][0]}>{modeLink[mode][1]}</Link>
            {mode !== 'recovery' && <span className="ml-3">· <Link className="text-snow underline-offset-4 hover:underline" to="/recuperar-senha">Esqueci minha senha</Link></span>}
          </div>
        </section>
        <section className="border border-white/10 bg-night p-6 sm:p-8" aria-labelledby="auth-form-title">
          <h2 id="auth-form-title" className="font-display text-lg font-semibold">{mode === 'recovery' ? 'Recuperação de acesso' : mode === 'register' ? 'Dados da conta' : 'Acesse sua conta'}</h2>
          {!configured && <p className="mt-4 border-l-2 border-accent pl-3 text-sm leading-6 text-mute" role="status">{authContent.unavailable}</p>}
          <form className="mt-6 space-y-4" onSubmit={submit} noValidate>
            {mode === 'register' && <label className="block text-sm">{authContent.nameLabel}<input autoComplete="name" className="mt-2 w-full border border-white/15 bg-ink px-3 py-3 text-snow outline-none focus:border-accent" value={form.name} onChange={(event) => update('name', event.target.value)} disabled={!configured} aria-invalid={Boolean(errors.name)} />{errors.name && <span className="mt-1 block text-xs text-rose-300">{errors.name}</span>}</label>}
            {mode !== 'reset' && <label className="block text-sm">{authContent.emailLabel}<input type="email" autoComplete="email" className="mt-2 w-full border border-white/15 bg-ink px-3 py-3 text-snow outline-none focus:border-accent" value={form.email} onChange={(event) => update('email', event.target.value)} disabled={!configured} aria-invalid={Boolean(errors.email)} />{errors.email && <span className="mt-1 block text-xs text-rose-300">{errors.email}</span>}</label>}
            {mode !== 'recovery' && <label className="block text-sm">{authContent.passwordLabel}<input type="password" autoComplete={mode === 'register' ? 'new-password' : 'current-password'} className="mt-2 w-full border border-white/15 bg-ink px-3 py-3 text-snow outline-none focus:border-accent" value={form.password} onChange={(event) => update('password', event.target.value)} disabled={!configured} aria-invalid={Boolean(errors.password)} />{errors.password && <span className="mt-1 block text-xs text-rose-300">{errors.password}</span>}</label>}
            <button className="w-full border border-accent bg-accent px-4 py-3 font-semibold text-ink disabled:cursor-not-allowed disabled:opacity-50" type="submit" disabled={!configured || busy}>{authContent.submit[mode]}</button>
          </form>
          {['login', 'register'].includes(mode) && <button type="button" disabled={!configured || busy} onClick={() => signInWithApple().catch((error) => setMessage(error.message))} className="mt-3 w-full border border-white/15 px-4 py-3 text-sm font-medium text-snow disabled:cursor-not-allowed disabled:opacity-50">{authContent.appleLabel}</button>}
          {message && <p className="mt-4 text-sm text-mute" role="status">{message}</p>}
          {demoOnly && <div className="mt-7 border-t border-white/10 pt-5">
            <p className="text-sm font-medium text-snow">Acesso de demonstração</p>
            <label className="mt-3 block text-sm text-mute">Perfil<select className="mt-2 w-full border border-white/15 bg-ink px-3 py-3 text-snow outline-none focus:border-accent" value={demoRole} onChange={(event) => setDemoRole(event.target.value)}><option value="student">Aluno</option><option value="mentor">Mentor</option><option value="instructor">Instrutor</option><option value="admin">Admin</option></select></label>
            <button type="button" onClick={enterDemo} disabled={busy} className="mt-3 w-full border border-white/20 px-4 py-3 text-sm font-medium hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent disabled:opacity-50">{busy ? 'Entrando…' : 'Entrar na demonstração'}</button>
          </div>}
        </section>
      </div>
    </main>
  )
}
