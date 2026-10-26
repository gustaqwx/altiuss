'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Marquee Infinito estilo Framer
 * - Loop suave e contínuo
 * - Pausa no hover
 * - Responsivo
 * - Acessível (prefers-reduced-motion)
 */
const logos = [
  { name: 'React', icon: '⚛️' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'AWS', icon: '☁️' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Git', icon: '📦' },
  { name: 'Vercel', icon: '▲' },
  { name: 'Figma', icon: '🎨' },
  { name: 'Jest', icon: '🃏' },
  { name: 'Tailwind', icon: '🌊' },
  { name: 'Next.js', icon: '▲' },
  { name: 'GraphQL', icon: '◇' },
  { name: 'Redis', icon: '🔴' },
  { name: 'Kubernetes', icon: '☸️' },
];

export default function Marquee({
  className = '',
  speed = 30, // segundos para uma volta completa
  paused = false,
  direction = 'left',
  showBorder = true,
}) {
  const containerRef = useRef(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Duplicar itens para loop infinito suave
  const items = [...logos, ...logos, ...logos];

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${showBorder ? 'border-y border-border' : ''} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="list"
      aria-label="Tecnologias e ferramentas do programa"
      style={{ maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)' }}
    >
      {/* Gradiente de fade nas laterais */}
      <div className="absolute inset-0 pointer-events-none z-10" aria-hidden="true">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-ink to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-ink to-transparent" />
      </div>

      <motion.div
        className="flex items-center gap-8 lg:gap-12 p-4 lg:py-6"
        style={{
          willChange: 'transform',
          animation: isReducedMotion || paused || isHovered
            ? 'none'
            : `marquee ${speed}s linear infinite`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
        animate={{}}
      >
        {items.map((item, index) => (
          <motion.div
            key={`${item.name}-${index}`}
            className="flex items-center gap-2.5 shrink-0 px-3 py-2 rounded-xl bg-elevated/50 backdrop-blur-sm border border-border transition-all duration-300 hover:border-accent/30 hover:bg-accent/5 hover:scale-105 cursor-default group"
            role="listitem"
            whileHover={{ scale: 1.08 }}
          >
            <span className="text-2xl lg:text-3xl" aria-hidden="true">{item.icon}</span>
            <span className="font-medium text-sm lg:text-base text-snow/90 whitespace-nowrap">{item.name}</span>
          </motion.div>
        ))}
      </motion.div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-66.66%); }
        }
      `}</style>
    </div>
  );
}