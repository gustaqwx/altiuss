'use client';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../config/site'
import { landingContent } from '../../content/landing'
import { flags } from '../../config/site'
import AssistantButton from '../assistant/AssistantButton'

/**
 * Mobile Menu Panel - extracted to avoid JSX parsing issues
 */
function MobileMenuPanel({ isOpen, onClose, routes, landingContent, flags }) {
  const ctaButtonStyle = {
    background: 'linear-gradient(135deg, #A99BFF 0%, #6F5FE8 100%)',
    boxShadow: '0 4px 24px rgba(111, 95, 232, 0.3)',
    border: 'none',
  };

  const mobileNavItems = [
    { href: '#programa', label: 'O Programa' },
    { href: '#competencias', label: 'Competencias WEF' },
    { href: '#roadmap', label: 'Roadmap' },
    { href: '#beneficios', label: 'Beneficios' },
    { href: '#contato', label: 'Contato' },
  ];

  if (!isOpen) return null;

  return (
    <div>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[40] bg-ink/60 backdrop-blur-sm md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        id="menu-panel"
        className="fixed top-0 right-0 z-[50] md:hidden w-full max-w-sm h-full bg-ink/95 backdrop-blur-xl border-l border-border overflow-y-auto animate-slide-in"
      >
        <div className="flex h-16 items-center justify-between px-5 border-b border-border">
          <span className="font-display text-xl font-extrabold text-snow">Menu</span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-snow/60 hover:text-snow hover:bg-elevated/50 transition-colors cursor-expand"
            aria-label="Fechar menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 5l14 14M19 5l-14 14" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <nav aria-label="Principal (mobile)" className="px-5 py-6 space-y-1">
          {mobileNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={onClose}
              className="block px-4 py-4 font-display text-xl font-bold text-snow/80 hover:text-snow transition-colors rounded-lg cursor-expand border-b border-border/50"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="pt-4 space-y-3">
          <Link
            to={routes.checkout}
            onClick={onClose}
            className="btn w-full text-center cursor-expand"
            style={ctaButtonStyle}
          >
            Comecar agora
          </Link>

          {landingContent.showLogin && (
            <Link
              to="/login"
              onClick={onClose}
              className="block w-full text-center py-3 text-sm font-medium text-snow hover:text-accent transition-colors rounded-lg cursor-expand"
            >
              {landingContent.loginLabel}
            </Link>
          )}
        </div>

        <nav className="mt-8 pt-6 border-t border-border flex flex-col gap-3 text-sm text-mute" aria-label="Links legais">
          <Link to={routes.privacy} className="nav-link hover:text-snow cursor-expand">Politica de Privacidade</Link>
          <Link to={routes.terms} className="nav-link hover:text-snow cursor-expand">Termos de Uso</Link>
        </nav>
      </div>
    </div>
  );
}

/**
 * Header estilo Framer - Flutuante, glassmorphism, blur
 * - Fundo com backdrop-filter
 * - Borda sutil
 * - Transição suave ao scroll
 * - Versão mobile: drawer com animação
 */
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Compute classNames to avoid template literal parsing issues
  const headerClassName = 'fixed top-5 left-1/2 -translate-x-1/2 z-[50] w-full max-w-[90rem] px-5 md:px-10 transition-all duration-500 ease-premium ' +
    (isScrolled ? 'shadow-elevation-2' : 'shadow-none');

  const headerInnerClassName = 'relative flex h-16 items-center justify-between gap-4 rounded-2xl bg-ink/60 backdrop-blur-xl border transition-all duration-500 ease-premium ' +
    (isScrolled ? 'border-border-strong bg-ink/80 shadow-glow-sm' : 'border-border bg-ink/40');

  const navItems = [
    { href: '#programa', label: 'O Programa' },
    { href: '#competencias', label: 'Competencias WEF' },
    { href: '#roadmap', label: 'Roadmap' },
    { href: '#beneficios', label: 'Beneficios' },
    { href: '#contato', label: 'Contato' },
  ];

  return (
    <div>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only fixed left-4 top-4 z-[60] bg-accent text-ink px-3 py-2 rounded-lg font-medium"
      >
        Pular para o conteudo
      </a>

      {/* Header Flutuante */}
      <header
        id="header"
        className={headerClassName}
        style={{ transformOrigin: 'center top' }}
      >
        <div className={headerInnerClassName}>
          {/* Logo */}
          <Link
            href="#inicio"
            className="flex items-center gap-3 shrink-0 cursor-expand"
            aria-label="Altius Inteligencia, Directio. Voltar ao inicio"
          >
            <span className="font-display text-xl font-extrabold leading-none tracking-tight text-snow">
              Altius
            </span>
            <span className="hidden md:inline font-semibold text-mute text-lg">
              Inteligencia
            </span>
          </Link>

          {/* Navegação Desktop */}
          <nav
            aria-label="Principal"
            className="hidden md:flex items-center gap-1 px-2"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="nav-link relative px-3 py-2 text-sm font-medium text-snow/80 hover:text-snow transition-colors duration-200 rounded-lg cursor-expand"
              >
                {item.label}
                {/* Indicador ativo */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent transition-all duration-300 ease-premium group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Ações Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {flags.ASSISTANT_PUBLIC && <AssistantButton isPublic role="visitor" />}

            {landingContent.showLogin && (
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-snow/80 hover:text-snow transition-colors duration-200 rounded-lg cursor-expand"
              >
                {landingContent.loginLabel}
              </Link>
            )}

            <Link
              to={routes.checkout}
              className="btn cursor-expand"
              style={{
                background: 'linear-gradient(135deg, #A99BFF 0%, #6F5FE8 100%)',
                boxShadow: '0 4px 24px rgba(111, 95, 232, 0.3)',
                border: 'none',
              }}
            >
              Comecar agora
            </Link>
          </div>

          {/* Botão Menu Mobile */}
          <button
            id="menu-btn"
            type="button"
            className="md:hidden p-2 rounded-lg text-snow/80 hover:text-snow hover:bg-elevated/50 transition-colors cursor-expand"
            aria-expanded={isMenuOpen}
            aria-controls="menu-panel"
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={toggleMenu}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              {isMenuOpen ? (
                <path d="M5 5l14 14M19 5l-14 14" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M3 7h18M3 12h18M3 17h18" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </button>
        </div>

        {/* Painel Mobile - rendered as separate component */}
        <MobileMenuPanel
          isOpen={isMenuOpen}
          onClose={closeMenu}
          routes={routes}
          landingContent={landingContent}
          flags={flags}
        />
      </header>
    </div>
  )
}