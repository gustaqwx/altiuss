import { useState } from 'react'
import { BookOpen, CalendarDays, ClipboardCheck, GraduationCap, LayoutDashboard, LogOut, Menu, MessageSquareText, Users, X } from 'lucide-react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import { roleLabels } from '../../lib/model'
import { platformApi } from '../journey/api'

const navigation = {
  student: [
    ['/app', 'Jornada', LayoutDashboard], ['/app/aulas', 'Aulas', BookOpen], ['/app/ao-vivo', 'Ao vivo', CalendarDays], ['/app/notificacoes', 'Notificações', MessageSquareText],
  ],
  mentor: [
    ['/app', 'Visão geral', LayoutDashboard], ['/app/mentor', 'Alunos', Users], ['/app/mentor/revisao', 'Entregas', ClipboardCheck], ['/app/mentor/mentoria', 'Mentorias', CalendarDays], ['/app/aulas', 'Aulas', BookOpen], ['/app/ao-vivo', 'Ao vivo', CalendarDays],
  ],
  instructor: [
    ['/app', 'Visão geral', LayoutDashboard], ['/app/admin/aulas', 'Vídeo-aulas', BookOpen], ['/app/ao-vivo', 'Aulas ao vivo', CalendarDays], ['/app/alunos', 'Alunos', Users],
  ],
  admin: [
    ['/app', 'Visão geral', LayoutDashboard], ['/app/admin', 'Gestão', LayoutDashboard], ['/app/alunos', 'Alunos', Users], ['/app/mentores', 'Mentores', GraduationCap], ['/app/equipe', 'Equipe', Users], ['/app/mentor/revisao', 'Entregas', ClipboardCheck], ['/app/admin/aulas', 'Vídeo-aulas', BookOpen], ['/app/ao-vivo', 'Aulas ao vivo', CalendarDays],
  ],
}

export default function PlatformLayout() {
  const { user, demoEnabled, signOut } = useAuth()
  const location = useLocation()
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const role = user?.role || 'student'
  const links = navigation[role] || navigation.student
  const activePath = [...links].sort((a, b) => b[0].length - a[0].length).find(([path]) => path === '/app' ? location.pathname === path : location.pathname === path || location.pathname.startsWith(`${path}/`))?.[0]
  function closeMenu() { setMobileMenuOpen(false) }

  return <div className="workspace-shell">
    {demoEnabled && <div className="workspace-demo-banner">Modo demonstração, dados de exemplo</div>}
    <a href="#workspace-main" className="workspace-skip-link">Pular para o conteúdo</a>
    <div className="workspace-frame">
      <aside className="workspace-sidebar" aria-label="Navegação da plataforma">
        <Link to="/app" className="workspace-brand" aria-label="Altius Directio, início">ALTIUS <span>DIRECTIO</span></Link>
        <p className="workspace-role">{roleLabels[role]}</p>
        <nav className="workspace-nav">
          {links.map(([path, label, Icon]) => <NavLink key={path} end={path === '/app'} to={path} className={`workspace-nav-link${activePath === path ? ' is-active' : ''}`} aria-current={activePath === path ? 'page' : undefined}><Icon size={16} strokeWidth={1.7} aria-hidden="true" /><span>{label}</span></NavLink>)}
        </nav>
        <div className="workspace-sidebar-user"><p>{user?.name}</p><button type="button" onClick={signOut}><LogOut size={15} aria-hidden="true" /> Sair</button></div>
      </aside>
      <div className="workspace-content">
        <header className="workspace-topbar">
          <Link to="/app" className="workspace-mobile-brand">ALTIUS <span>DIRECTIO</span></Link>
          <p className="workspace-topbar-role">{roleLabels[role]}</p>
          <div className="workspace-topbar-actions">
            <Link to="/app/notificacoes" className="workspace-notification-link"><MessageSquareText size={17} aria-hidden="true" /><span>Notificações</span></Link>
            <span className="workspace-user-name">{user?.name}</span>
            <button type="button" className="workspace-mobile-menu-button" aria-expanded={mobileMenuOpen} aria-controls="workspace-mobile-nav" onClick={() => setMobileMenuOpen((open) => !open)} aria-label={mobileMenuOpen ? 'Fechar navegação' : 'Abrir navegação'}>{mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}</button>
          </div>
        </header>
        {mobileMenuOpen && <nav id="workspace-mobile-nav" className="workspace-mobile-nav" aria-label="Navegação da plataforma">{links.map(([path, label, Icon]) => <NavLink key={path} end={path === '/app'} to={path} onClick={closeMenu} className={`workspace-nav-link${activePath === path ? ' is-active' : ''}`} aria-current={activePath === path ? 'page' : undefined}><Icon size={16} aria-hidden="true" /><span>{label}</span></NavLink>)}<p className="workspace-mobile-user">{user?.name} · {roleLabels[role]}</p><button type="button" className="workspace-mobile-logout" onClick={signOut}><LogOut size={15} aria-hidden="true" /> Sair</button></nav>}
        <main id="workspace-main" tabIndex="-1" className="workspace-main"><Outlet /></main>
        <footer className="workspace-footer">
          <button type="button" aria-expanded={terminalOpen} onClick={() => setTerminalOpen((open) => !open)} className="workspace-terminal-toggle">{terminalOpen ? 'Fechar terminal' : 'Abrir terminal de atividade'}</button>
          {terminalOpen && <div className="workspace-terminal" role="region" aria-label="Terminal de atividade"><p>[exemplo] sessão: {role}</p><p>[exemplo] área: {location.pathname}</p><p>[exemplo] fonte: {platformApi.isDemo() ? 'dados locais de demonstração' : 'adaptador de dados configurado'}</p></div>}
        </footer>
      </div>
    </div>
  </div>
}
