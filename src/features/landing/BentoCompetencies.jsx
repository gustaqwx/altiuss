'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { competencies } from '../../content/landing';

/**
 * Bento Grid estilo Framer + Guraisu
 * - Cards de tamanhos variados (masonry)
 * - Glassmorphism com backdrop-blur
 * - Bordas sutis semi-transparentes
 * - Tilt 3D no hover (desktop)
 * - Gradientes de fundo sutis
 * - Animações de entrada escalonadas
 */
export default function BentoCompetencies() {
  const containerRef = useRef(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Configurar tilt 3D no hover (apenas desktop, sem reduced motion)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    if (isReducedMotion || window.innerWidth < 1024) return;

    const cards = containerRef.current?.querySelectorAll('.bento-card');
    if (!cards) return;

    cards.forEach((card) => {
      let rafId = null;
      let currentX = 0;
      let currentY = 0;
      let targetX = 0;
      let targetY = 0;

      const animate = () => {
        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;

        card.style.transform = `
          perspective(1000px)
          rotateX(${currentY}deg)
          rotateY(${currentX}deg)
          translateZ(20px)
          scale(1.02)
        `;

        rafId = requestAnimationFrame(animate);
      };

      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Limitar rotação a ±8 graus
        targetY = ((e.clientY - centerY) / (rect.height / 2)) * -8;
        targetX = ((e.clientX - centerX) / (rect.width / 2)) * 8;
      };

      const handleMouseEnter = () => {
        card.style.transition = 'transform 0.1s ease-out, box-shadow 0.3s ease-out';
        card.style.boxShadow = '0 32px 64px rgba(2,6,23,0.6), inset 0 1px 0 rgba(255,255,255,0.18), 0 0 60px rgba(169, 155, 255, 0.15)';
        card.style.zIndex = '20';
        animate();
      };

      const handleMouseLeave = () => {
        targetX = 0;
        targetY = 0;
        card.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease-out';
        card.style.boxShadow = '0 24px 48px rgba(2,6,23,0.6), inset 0 1px 0 rgba(255,255,255,0.18)';
        card.style.zIndex = '10';

        // Reset após animação
        setTimeout(() => {
          if (card.style.transform.includes('rotateX(0deg)')) {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0) scale(1)';
          }
        }, 600);
      };

      card.addEventListener('mousemove', handleMouseMove, { passive: true });
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
        if (rafId) cancelAnimationFrame(rafId);
      };
    });
  }, [isReducedMotion]);

  // Layout Bento - definição dos tamanhos dos cards
  const cardLayouts = [
    {
      id: 0,
      span: 'lg:col-span-2 lg:row-span-2',
      className: 'bento-card-large',
      gradient: 'from-accent/5 via-carbon to-transparent',
    },
    {
      id: 1,
      span: 'lg:col-span-1 lg:row-span-1',
      className: 'bento-card-medium',
      gradient: 'from-magenta/5 via-carbon to-transparent',
    },
    {
      id: 2,
      span: 'lg:col-span-1 lg:row-span-1',
      className: 'bento-card-medium',
      gradient: 'from-signal/5 via-carbon to-transparent',
    },
    {
      id: 3,
      span: 'lg:col-span-1 lg:row-span-1',
      className: 'bento-card-medium',
      gradient: 'from-emerald/5 via-carbon to-transparent',
    },
    {
      id: 4,
      span: 'lg:col-span-1 lg:row-span-1',
      className: 'bento-card-medium',
      gradient: 'from-amber/5 via-carbon to-transparent',
    },
    {
      id: 5,
      span: 'lg:col-span-2 lg:row-span-1',
      className: 'bento-card-wide',
      gradient: 'from-cyan/5 via-carbon to-transparent',
    },
  ];

  const icons = [
    <svg key="0" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h7" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    <svg key="1" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 21h8" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 17v4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    <svg key="2" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><polyline points="16 18 22 12 16 6" strokeLinecap="round" strokeLinejoin="round"/><polyline points="8 6 2 12 8 18" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    <svg key="3" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    <svg key="4" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M23 21v-2a4 4 0 00-3-3.87" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    <svg key="5" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  ];

  return (
    <section
      id="competencias"
      className="relative border-t border-border py-20 lg:py-32"
      aria-labelledby="t-comp"
    >
      {/* Light streak de fundo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] max-w-[800px] -z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-transparent to-transparent blur-3xl opacity-50" />
      </div>

      <div className="mx-auto max-w-[90rem] px-5 md:px-10">
        {/* Header da seção */}
        <div className="mb-16 lg:mb-20 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
          <span className="text-micro-base text-accent mb-4 block">Competências do Futuro</span>
          <h2
            id="t-comp"
            className="font-display-alt text-heading-xl lg:text-heading-lg font-extrabold leading-tight text-snow"
          >
            As 6 habilidades críticas para a próxima década
          </h2>
          <p className="mt-6 text-body-lg text-mute max-w-lg mx-auto lg:mx-0">
            Baseado no Future of Jobs Report do Fórum Econômico Mundial. O currículo cobre hard e soft skills essenciais.
          </p>
        </div>

        {/* Bento Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:grid-rows-[auto_auto] lg:gap-5"
          role="list"
          aria-label="Competências do programa"
        >
          {competencies.map((competency, index) => {
            const layout = cardLayouts[index];
            const isLarge = index === 0;
            const isWide = index === 5;

            return (
              <motion.article
                key={competency}
                className={`relative group ${layout.span} ${layout.className} bento-card rounded-2xl overflow-hidden cursor-expand`}
                style={{
                  background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-via), var(--tw-gradient-to))`,
                  '--tw-gradient-from': layout.gradient.split(' ')[1],
                  '--tw-gradient-via': layout.gradient.split(' ')[3],
                  '--tw-gradient-to': layout.gradient.split(' ')[5],
                }}
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                role="listitem"
              >
                {/* Borda gradiente animada */}
                <div
                  className="absolute inset-0 -z-10 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${index === 0 ? '#A99BFF' : index === 1 ? '#FF006E' : index === 2 ? '#6F5FE8' : index === 3 ? '#3FB97A' : index === 4 ? '#F59E0B' : '#06B6D4'}, transparent 60%)`,
                    filter: 'blur(8px)',
                    transform: 'scale(1.1)',
                  }}
                  aria-hidden="true"
                />

                {/* Conteúdo do card */}
                <div className="relative p-6 lg:p-8 h-full flex flex-col">
                  {/* Número + Ícone */}
                  <div className="flex items-start justify-between gap-4 mb-4 lg:mb-6">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-3xl lg:text-5xl font-extrabold text-mute/50 leading-none">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-accent">
                        {icons[index]}
                      </div>
                    </div>

                    {/* Tag de categoria */}
                    <span className="text-micro-sm text-accent/70 border border-accent/20 px-2.5 py-1 rounded-full bg-accent/5 whitespace-nowrap shrink-0">
                      {isLarge ? 'Core' : isWide ? 'Applied' : 'Skill'}
                    </span>
                  </div>

                  {/* Título */}
                  <h3 className="font-display-alt text-heading-sm lg:text-heading-md font-bold text-snow mb-3 lg:mb-4 leading-tight">
                    {competency}
                  </h3>

                  {/* Descrição (apenas no card grande e largo) */}
                  {(isLarge || isWide) && (
                    <p className="text-body-base text-mute/80 leading-relaxed flex-1">
                      {index === 0 && 'Resolução de problemas complexos com dados, lógica e hipóteses testáveis. O pilar que sustenta todas as decisões técnicas.'}
                      {index === 5 && 'Protagonismo, tomada de decisão baseada em dados e gestão de pessoas. Preparação para posições de liderança técnica.'}
                    </p>
                  )}

                  {/* Indicador de hover */}
                  <div className="mt-6 lg:mt-8 flex items-center gap-2 text-mute/50 group-hover:text-accent/70 transition-colors duration-300">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                    <span className="text-micro-sm font-medium">Explorar</span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}