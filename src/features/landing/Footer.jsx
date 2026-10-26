'use client';

import { Link } from 'react-router-dom'
import { routes } from '../../config/site'
import { motion } from 'framer-motion'

/**
 * Footer estilo Guraisu + Framer
 * - Wordmark gigante cortado pela borda da tela
 * - Navegação em pílula flutuante (glassmorphism)
 * - Light streaks / gradientes blur
 * - Noise texture overlay
 * - Contraste de seção clara/escura
 */
export default function Footer() {
  return (
    <footer
      id="contato"
      className="relative border-t border-border"
      style={{ background: '#000' }}
    >
      {/* Light streaks de fundo */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] -translate-y-1/2 rounded-full blur-3xl opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-transparent to-magenta/10" />
        </div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] translate-x-1/2 translate-y-1/2 rounded-full blur-3xl opacity-5">
          <div className="absolute inset-0 bg-gradient-to-tr from-signal/10 via-transparent to-transparent" />
        </div>
      </div>

      {/* Noise texture */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-[0.02]" aria-hidden="true" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

      <div className="relative mx-auto max-w-[90rem] px-5 md:px-10 py-20 lg:py-32">
        {/* ============ SEÇÃO CLARA (Contraste Guraisu) ============ */}
        <div className="relative rounded-3xl bg-snow/5 p-8 lg:p-12 mb-16 lg:mb-20 overflow-hidden">
          {/* Wordmark gigante "ALTIUS" cortado pela borda */}
          <div className="absolute top-0 left-0 right-0 -translate-y-1/2 overflow-hidden pointer-events-none" aria-hidden="true">
            <motion.div
              className="font-display text-hero-xl lg:text-hero-2xl font-extrabold leading-none tracking-tighter text-snow/10 whitespace-nowrap select-none"
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'left center' }}
            >
              ALTIUS&nbsp;DIRECTIO&nbsp;ALTIUS&nbsp;DIRECTIO&nbsp;ALTIUS&nbsp;DIRECTIO
            </motion.div>
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="font-display-alt text-heading-xl lg:text-heading-lg font-extrabold leading-tight text-ink max-w-2xl">
                Pronto para dar o próximo nível na sua carreira tech?
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 lg:mt-12 flex flex-col sm:flex-row gap-4"
            >
              <Link
                to={routes.checkout}
                className="btn self-start cursor-expand"
                style={{
                  background: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                Começar agora
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>

              <Link
                to="#programa"
                className="btn self-start border border-ink/20 bg-transparent hover:bg-ink/5 cursor-expand text-ink"
              >
                Ver o programa
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ============ CONTATO & LINKS ============ */}
        <motion.div
          className="grid gap-10 lg:grid-cols-[2fr_1fr_1fr_1fr]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Contato Principal */}
          <div className="lg:col-span-1">
            <h3 className="font-display-alt text-heading-md font-extrabold text-snow mb-6">Contato</h3>
            <dl className="space-y-5">
              <div>
                <dt className="text-micro-sm text-mute mb-1">E-mail</dt>
                <dd>
                  <a className="text-body-lg text-snow/80 hover:text-accent transition-colors break-all cursor-expand" href="mailto:contato@altiusinteligencia.com">
                    contato@altiusinteligencia.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-micro-sm text-mute mb-1">Telefone</dt>
                <dd>
                  <a className="text-body-lg text-snow/80 hover:text-accent transition-colors cursor-expand" href="tel:+5541987132450">
                    +55 41 98713-2450
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-micro-sm text-mute mb-1">Localização</dt>
                <dd className="text-body-base text-snow/60">Curitiba, PR — Remoto first</dd>
              </div>
            </dl>
          </div>

          {/* Navegação: Programa */}
          <nav aria-label="Programa">
            <h3 className="font-display-alt text-heading-md font-extrabold text-snow mb-6">Programa</h3>
            <ul className="space-y-3" role="list">
              {[
                { href: '#programa', label: 'O Programa' },
                { href: '#competencias', label: 'Competências WEF' },
                { href: '#roadmap', label: 'Roadmap 12 meses' },
                { href: '#beneficios', label: 'Benefícios' },
              ].map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-body-base text-snow/60 hover:text-accent transition-colors cursor-expand group flex items-center gap-2">
                    {item.label}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent/50 group-hover:translate-x-1 transition-transform" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Navegação: Empresa */}
          <nav aria-label="Empresa">
            <h3 className="font-display-alt text-heading-md font-extrabold text-snow mb-6">Empresa</h3>
            <ul className="space-y-3" role="list">
              {[
                { href: '#contato', label: 'Fale conosco' },
                { href: routes.privacy, label: 'Privacidade' },
                { href: routes.terms, label: 'Termos de uso' },
              ].map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-body-base text-snow/60 hover:text-accent transition-colors cursor-expand group flex items-center gap-2">
                    {item.label}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent/50 group-hover:translate-x-1 transition-transform" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Navegação: Social/Comunidade */}
          <nav aria-label="Comunidade">
            <h3 className="font-display-alt text-heading-md font-extrabold text-snow mb-6">Comunidade</h3>
            <ul className="space-y-3" role="list">
              {[
                { label: 'LinkedIn', href: 'https://linkedin.com/company/altius-inteligencia' },
                { label: 'GitHub', href: 'https://github.com/altius-inteligencia' },
                { label: 'Instagram', href: 'https://instagram.com/altius.inteligencia' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-base text-snow/60 hover:text-magenta transition-colors cursor-expand group flex items-center gap-2"
                  >
                    {item.label}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-magenta/50 group-hover:translate-x-1 transition-transform" aria-hidden="true">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>

        {/* ============ BOTTOM BAR ============ */}
        <motion.div
          className="mt-16 lg:mt-20 pt-8 lg:pt-12 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Copyright */}
          <p className="text-body-sm text-mute/60">
            © {new Date().getFullYear()} Altius Inteligência. Todos os direitos reservados.
          </p>

          {/* Badges/Certificações */}
          <div className="flex flex-wrap items-center gap-3 text-micro-sm text-mute/50">
            <span className="border border-border px-3 py-1.5 rounded-full bg-elevated/50 backdrop-blur-sm">WEF Aligned</span>
            <span className="border border-border px-3 py-1.5 rounded-full bg-elevated/50 backdrop-blur-sm">LGPD Compliant</span>
            <span className="border border-border px-3 py-1.5 rounded-full bg-elevated/50 backdrop-blur-sm">ISO 27001</span>
          </div>
        </motion.div>

        {/* Wordmark gigante no rodapé (cortado pela borda - Guraisu) */}
        <div className="absolute bottom-0 left-0 right-0 -translate-y-1/4 overflow-hidden pointer-events-none" aria-hidden="true">
          <motion.div
            className="font-display text-hero-lg font-extrabold leading-none tracking-tighter text-snow/5 whitespace-nowrap select-none"
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            transition={{ duration: 2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'right center' }}
          >
            ALTIUS&nbsp;INTELIGÊNCIA&nbsp;·&nbsp;DIRECTIO&nbsp;ALTIUS&nbsp;INTELIGÊNCIA&nbsp;·&nbsp;DIRECTIO
          </motion.div>
        </div>
      </div>
    </footer>
  )
}