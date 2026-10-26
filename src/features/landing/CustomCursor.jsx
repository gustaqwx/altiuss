'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/**
 * Cursor customizado estilo Framer
 * - Dot central que segue o mouse
 * - Anel externo com spring
 * - Expande ao hover em elementos interativos
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    // Verificar prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mediaQuery.matches;

    if (prefersReducedMotion.current) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Animação suave do anel (spring)
    const animate = () => {
      // Interpolação suave (lerp) para o anel seguir o dot com delay
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;

      ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      // Dot segue imediatamente
      if (dot) {
        dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }

      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Detectar elementos interativos para expandir o cursor
    const handleOverInteractive = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, select, textarea, .clickable, .cursor-expand');
      if (target) {
        setIsExpanded(true);
        if (ring) ring.classList.add('expanded');
      }
    };

    const handleOutInteractive = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, select, textarea, .clickable, .cursor-expand');
      if (target) {
        setIsExpanded(false);
        if (ring) ring.classList.remove('expanded');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseover', handleOverInteractive, { passive: true });
    window.addEventListener('mouseout', handleOutInteractive, { passive: true });

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseover', handleOverInteractive);
      window.removeEventListener('mouseout', handleOutInteractive);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isVisible]);

  if (prefersReducedMotion.current) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          opacity: isVisible ? 0.8 : 0,
          transform: `translate(${mousePos.current.x}px, ${mousePos.current.y}px) translate(-50%, -50%)`,
          transition: 'opacity 0.2s ease-out',
        }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${isExpanded ? 'expanded' : ''}`}
        style={{
          opacity: isVisible ? 0.6 : 0,
          transform: `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`,
          transition: 'opacity 0.2s ease-out',
        }}
        aria-hidden="true"
      />
    </>
  );
}