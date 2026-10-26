'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Laptop3D from './Laptop3D';

/**
 * Hero estilo Framer + Guraisu
 * - Tipografia gigante condensada atrás (camada de fundo)
 * - Notebook 3D na frente (camada interativa)
 * - Gradientes de luz (light streaks) Guraisu
 * - Animações de entrada escalonadas
 */
export default function Hero() {
  const heroRef = useRef(null);
  const textRefs = useRef([]);

  // Animação de entrada das linhas do título
  useEffect(() => {
    const lines = textRefs.current.filter(Boolean);
    if (lines.length === 0) return;

    // GSAP-style stagger com Framer Motion
    lines.forEach((line, index) => {
      if (line) {
        line.style.opacity = '0';
        line.style.transform = 'translateY(120%)';

        setTimeout(() => {
          line.style.transition = 'all 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
          line.style.opacity = '1';
          line.style.transform = 'translateY(0)';
        }, index * 120);
      }
    });

    // Animação do subtítulo e CTA
    const fadeElements = heroRef.current?.querySelectorAll('.hero-fade-in');
    fadeElements?.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';

      setTimeout(() => {
        el.style.transition = 'all 0.9s cubic-bezier(0.22, 1, 0.36, 1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 600 + index * 120);
    });
  }, []);

  return (
    <>
      <span id="inicio" className="absolute top-0" aria-hidden="true" />

      <section
        ref={heroRef}
        id="programa"
        className="relative flex min-h-screen flex-col justify-center overflow-hidden px-5 pb-16 pt-32 md:px-10"
        aria-labelledby="t-programa"
      >
        {/* ============ BACKGROUND: Light Streaks (Guraisu) ============ */}
        <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          {/* Streak 1 - Roxo da marca */}
          <div
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-20"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(169, 155, 255, 0.4) 0%, rgba(111, 95, 232, 0.15) 40%, transparent 70%)',
              animation: 'float 20s ease-in-out infinite alternate',
            }}
          />

          {/* Streak 2 - Magenta Guraisu */}
          <div
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-15"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255, 0, 110, 0.3) 0%, rgba(220, 20, 60, 0.1) 40%, transparent 70%)',
              animation: 'float 25s ease-in-out infinite alternate-reverse',
            }}
          />

          {/* Streak 3 - Azul profundo */}
          <div
            className="absolute top-1/2 left-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-10"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(48, 110, 255, 0.2) 0%, transparent 60%)',
              animation: 'float 30s ease-in-out infinite',
            }}
          />

          <style jsx>{`
            @keyframes float {
              0% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
              50% { transform: translate(-50%, -50%) scale(1.1) rotate(5deg); }
              100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
            }
          `}</style>
        </div>

        {/* ============ GRID LAYOUT ============ */}
        <div className="relative mx-auto w-full max-w-[90rem]">
          <div className="grid gap-x-10 gap-y-8 lg:grid-cols-[1fr_1.15fr] lg:grid-rows-[auto_auto] lg:items-start">

            {/* ============ COLUNA ESQUERDA: TEXTO GIGANTE (Guraisu) ============ */}
            <div className="lg:col-start-1 lg:row-span-2 relative z-10">
              {/* Texto gigante decorativo atrás - "ALTIUS" */}
              <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none" aria-hidden="true">
                <span className="font-display text-hero-xl text-snow/5 leading-none tracking-tighter select-none whitespace-nowrap">
                  ALTIUS
                </span>
              </div>

              {/* "DIRECTIO" segunda linha */}
              <div className="absolute inset-0 -z-10 flex items-end justify-center pointer-events-none pb-20" aria-hidden="true">
                <span className="font-display text-hero-lg text-accent/10 leading-none tracking-tighter select-none whitespace-nowrap">
                  DIRECTIO
                </span>
              </div>

              {/* Título principal legível (frente) */}
              <h1
                id="t-programa"
                className="relative font-display-alt text-heading-xl font-extrabold leading-none lg:text-heading-lg"
                style={{ letterSpacing: '-0.03em' }}
              >
                {['Seu passo decisivo', 'na carreira de', 'tecnologia', 'começa aqui.'].map((line, i) => (
                  <span key={line} className="block overflow-hidden pb-[.1em]" ref={(el) => { textRefs.current[i] = el; }}>
                    <span className="hero-line block" style={{ display: 'block' }}>{line}</span>
                  </span>
                ))}
              </h1>

              {/* Subtítulo e CTA */}
              <div className="hero-fade mt-8 max-w-md space-y-6 hero-fade-in">
                <p className="text-body-lg text-mute leading-relaxed">
                  Capacitação completa em hard e soft skills baseada no Future of Jobs Report do Fórum Econômico Mundial para estudantes e novos talentos.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#roadmap"
                    className="btn group relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #A99BFF 0%, #6F5FE8 100%)',
                      border: 'none',
                      boxShadow: '0 4px 24px rgba(111, 95, 232, 0.3)',
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Ver Roadmap do Programa
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                    {/* Brilho que segue o cursor (será implementado via CSS) */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                  </a>

                  <a
                    href="#contato"
                    className="btn border-border-strong bg-transparent hover:bg-elevated"
                  >
                    Falar com a equipe
                  </a>
                </div>
              </div>

              {/* Badges/Microcopy Guraisu style */}
              <div className="mt-12 flex flex-wrap gap-3 hero-fade-in" style={{ transitionDelay: '800ms' }}>
                <span className="text-micro-base text-mute border border-border px-3 py-1.5 rounded-full bg-elevated/50 backdrop-blur-sm">
                  12 meses
                </span>
                <span className="text-micro-base text-mute border border-border px-3 py-1.5 rounded-full bg-elevated/50 backdrop-blur-sm">
                  6 pilares WEF
                </span>
                <span className="text-micro-base text-mute border border-border px-3 py-1.5 rounded-full bg-elevated/50 backdrop-blur-sm">
                  Mentoria quinzenal
                </span>
                <span className="text-micro-base text-mute border border-border px-3 py-1.5 rounded-full bg-elevated/50 backdrop-blur-sm">
                  Projeto real
                </span>
              </div>
            </div>

            {/* ============ COLUNA DIREITA: NOTEBOOK 3D INTERATIVO ============ */}
            <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 relative">
              {/* Container do 3D com glow */}
              <div className="relative h-full min-h-[400px] lg:min-h-[500px] xl:min-h-[600px]">
                {/* Glow atrás do notebook */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] max-w-[500px] max-h-[500px] rounded-full blur-3xl opacity-30 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(169, 155, 255, 0.3) 0%, rgba(111, 95, 232, 0.1) 50%, transparent 80%)',
                    animation: 'pulse 4s ease-in-out infinite',
                  }}
                  aria-hidden="true"
                />

                <style jsx>{`
                  @keyframes pulse {
                    0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
                    50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.05); }
                  }
                `}</style>

                {/* O Notebook 3D */}
                <div className="relative h-full w-full">
                  <Laptop3D />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============ SCROLL INDICATOR ============ */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-mute/50 font-mono text-xs hero-fade-in" style={{ transitionDelay: '1000ms' }}>
          <span className="text-micro-sm tracking-widest">Role para explorar</span>
          <div className="w-px h-10 bg-gradient-to-b from-accent/50 to-transparent animate-pulse" />
        </div>
      </section>
    </>
  );
}