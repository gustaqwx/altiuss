const demoEnabled = import.meta.env.VITE_DEMO_MODE === 'true' && !import.meta.env.PROD
const DEMO_SESSION_KEY = 'altius-directio-demo-session'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, '')
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const AUTH_SESSION_KEY = 'altius-directio-auth-session'

function readRealSession() {
  try { return JSON.parse(window.localStorage.getItem(AUTH_SESSION_KEY) || 'null') } catch { return null }
}

async function authRequest(path, body) {
  const response = await fetch(`${supabaseUrl}/auth/v1/${path}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', apikey: supabaseKey }, body: JSON.stringify(body),
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.msg || data.message || data.error_description || 'Não foi possível concluir a autenticação.')
  return data
}

function toSession(data) {
  const session = { access_token: data.access_token, refresh_token: data.refresh_token, expires_at: Date.now() + (data.expires_in || 3600) * 1000,
    user: { id: data.user.id, email: data.user.email, name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || data.user.email, role: 'student' } }
  window.localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session))
  return session
}

async function loadProfile(session) {
  if (!session || !supabaseUrl || !supabaseKey) return session
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${encodeURIComponent(session.user.id)}&select=full_name,role`, { headers: { apikey: supabaseKey, Authorization: `Bearer ${session.access_token}` } })
    const [profile] = await response.json()
    if (response.ok && profile) session.user = { ...session.user, name: profile.full_name || session.user.name, role: profile.role }
  } catch { /* O perfil será carregado novamente na próxima leitura da sessão. */ }
  return session
}

function readDemoSession() {
  if (!demoEnabled) return null
  try {
    return JSON.parse(window.sessionStorage.getItem(DEMO_SESSION_KEY) || 'null')
  } catch {
    return null
  }
}

export const authApi = {
  isConfigured() {
    return !demoEnabled && Boolean(supabaseUrl && supabaseKey)
  },
  isDemoEnabled() {
    return demoEnabled
  },
  async getSession() {
    if (demoEnabled) return readDemoSession()
    let session = readRealSession()
    if (!session && window.location.hash.includes('access_token=')) {
      const params = new URLSearchParams(window.location.hash.slice(1))
      const accessToken = params.get('access_token')
      try {
        const response = await fetch(`${supabaseUrl}/auth/v1/user`, { headers: { apikey: supabaseKey, Authorization: `Bearer ${accessToken}` } })
        if (!response.ok) throw new Error('Callback inválido')
        const authUser = await response.json()
        session = { access_token: accessToken, refresh_token: params.get('refresh_token'), expires_at: Date.now() + Number(params.get('expires_in') || 3600) * 1000,
          user: { id: authUser.id, email: authUser.email, name: authUser.user_metadata?.full_name || authUser.email, role: 'student' } }
        localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session))
        history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
      } catch { return null }
    }
    if (!session) return null
    if (session.expires_at < Date.now() + 30000 && session.refresh_token) {
      try { session = toSession(await authRequest('token?grant_type=refresh_token', { refresh_token: session.refresh_token })) }
      catch { window.localStorage.removeItem(AUTH_SESSION_KEY); return null }
    }
    return loadProfile(session)
  },
  async signIn({ email, password }) {
    if (!this.isConfigured()) throw new Error('Autenticação ainda não configurada.')
    return loadProfile(toSession(await authRequest('token?grant_type=password', { email, password })))
  },
  async signUp({ name, email, password }) {
    if (!this.isConfigured()) throw new Error('Autenticação ainda não configurada.')
    const data = await authRequest('signup', { email, password, data: { full_name: name, role: 'student' }, options: { emailRedirectTo: `${window.location.origin}/auth/callback` } })
    return data.access_token ? loadProfile(toSession(data)) : null
  },
  async requestPasswordRecovery({ email }) {
    if (!this.isConfigured()) throw new Error('Autenticação ainda não configurada.')
    return authRequest('recover', { email, options: { redirectTo: `${window.location.origin}/auth/callback` } })
  },
  async updatePassword({ password }) {
    const session = readRealSession()
    if (!this.isConfigured() || !session?.access_token) throw new Error('Sessão de recuperação inválida ou expirada. Solicite outro link.')
    const response = await fetch(`${supabaseUrl}/auth/v1/user`, { method: 'PUT', headers: { 'Content-Type': 'application/json', apikey: supabaseKey, Authorization: `Bearer ${session.access_token}` }, body: JSON.stringify({ password }) })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(data.msg || data.message || 'Não foi possível atualizar a senha.')
    await this.signOut()
    return data
  },
  async signInWithApple() {
    if (!this.isConfigured()) throw new Error('Autenticação ainda não configurada.')
    window.location.assign(`${supabaseUrl}/auth/v1/authorize?provider=apple&redirect_to=${encodeURIComponent(window.location.origin + '/auth/callback')}`)
  },
  async signInDemo(role) {
    if (!demoEnabled) throw new Error('Modo demonstração desativado.')
    const session = {
      user: { id: `demo-${role}`, name: ({ student: 'Ana Souza', mentor: 'Marina Costa', instructor: 'Instrutor de exemplo', admin: 'Equipe Altius' })[role], email: `${role}@exemplo.invalid`, role },
      isExample: true,
    }
    window.sessionStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(session))
    return session
  },
  async signOut() {
    const session = readRealSession()
    if (!demoEnabled && session?.access_token && this.isConfigured()) {
      await fetch(`${supabaseUrl}/auth/v1/logout`, { method: 'POST', headers: { apikey: supabaseKey, Authorization: `Bearer ${session.access_token}` } }).catch(() => {})
    }
    if (demoEnabled) window.sessionStorage.removeItem(DEMO_SESSION_KEY)
    window.localStorage.removeItem(AUTH_SESSION_KEY)
    return null
  },
  onSessionChange(callback) {
    const listener = () => callback(demoEnabled ? readDemoSession() : readRealSession())
    window.addEventListener('storage', listener)
    return () => window.removeEventListener('storage', listener)
  },
}
