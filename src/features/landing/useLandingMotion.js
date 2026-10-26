import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Menu mobile e animações da landing (GSAP). Tudo é desfeito ao sair da página.
export function useLandingMotion() {
  useEffect(() => {
    const ac = new AbortController()
    const { signal } = ac
    let ctx
    let mmComp

    const header = document.getElementById('header');
    const btn = document.getElementById('menu-btn');
    const panel = document.getElementById('menu-panel');
    const icOpen = document.getElementById('ic-open');
    const icClose = document.getElementById('ic-close');

    /* ---- Menu mobile ---- */
    function setMenu(open) {
      panel.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      icOpen.style.display = open ? 'none' : '';
      icClose.style.display = open ? '' : 'none';
      header.classList.toggle('is-scrolled', open || window.scrollY > 8);
    }
    btn.addEventListener('click', () => setMenu(btn.getAttribute('aria-expanded') !== 'true'), { signal });
    panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false), { signal }));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); }, { signal });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', e => { if (e.matches) setMenu(false); }, { signal });

    /* ---- GSAP / ScrollTrigger ---- */
    gsap.registerPlugin(ScrollTrigger);
    ctx = gsap.context(() => {

      // GATILHO DE SCROLL (ticket 01): header ganha fundo e borda ao sair do topo
      ScrollTrigger.create({
        start: 8,
        end: 'max',
        onToggle: self => header.classList.toggle('is-scrolled', self.isActive || btn.getAttribute('aria-expanded') === 'true')
      });

      // GATILHO DE SCROLL (ticket 03): pinned + horizontal scroll das competências (desktop) / accordion (mobile)
      const compItems = [...document.querySelectorAll('.comp-item')];
      const compBtn = i => i.querySelector('.comp-btn');
      const setActive = idx => compItems.forEach((it, k) => it.classList.toggle('is-active', k === idx));
      const isDesk = () => window.matchMedia('(min-width: 1024px)').matches;

      compItems.forEach((it, k) => compBtn(it).addEventListener('click', () => {
        if (isDesk()) return;
        const open = !it.querySelector('.comp-body').classList.contains('is-open');
        compItems.forEach((o, j) => {
          const on = open && j === k;
          o.querySelector('.comp-body').classList.toggle('is-open', on);
          compBtn(o).setAttribute('aria-expanded', String(on));
        });
        setActive(open ? k : -1);
      }, { signal }));

      mmComp = gsap.matchMedia();
      mmComp.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const pin = document.getElementById('comp-pin');
        const view = document.getElementById('comp-view');
        const track = document.getElementById('comp-track');
        compItems.forEach(it => { compBtn(it).setAttribute('aria-expanded', 'true'); compBtn(it).tabIndex = -1; });
        const dist = () => Math.max(0, track.scrollWidth - view.clientWidth);
        gsap.to(track, {
          x: () => -dist(), ease: 'none',
          scrollTrigger: {
            trigger: pin, start: 'top top', end: () => '+=' + dist(),
            pin: true, scrub: 0.6, invalidateOnRefresh: true,
            onUpdate: s => setActive(Math.round(s.progress * (compItems.length - 1)))
          }
        });
        setActive(0);
        return () => compItems.forEach(it => { compBtn(it).tabIndex = 0; });
      });
      // Desktop + movimento reduzido: sem pin; todos os pilares visíveis (ticket 07)
      mmComp.add('(min-width: 1024px) and (prefers-reduced-motion: reduce)', () => {
        compItems.forEach(it => { compBtn(it).setAttribute('aria-expanded', 'true'); compBtn(it).tabIndex = -1; });
        setActive(0);
        return () => compItems.forEach(it => { compBtn(it).tabIndex = 0; });
      });
      mmComp.add('(max-width: 1023px)', () => {
        compItems.forEach((it, k) => {
          it.querySelector('.comp-body').classList.toggle('is-open', k === 0);
          compBtn(it).setAttribute('aria-expanded', String(k === 0));
        });
        setActive(0);
      });

      // GATILHO DE SCROLL (ticket 05): linha do roadmap acende (scrub) e cada fase é revelada ao ser alcançada
      const roadList = document.getElementById('road-list');
      const roadLine = document.getElementById('road-line');
      const roadSteps = [...roadList.querySelectorAll('.road-step')];
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        roadSteps.forEach(s => s.classList.add('is-on'));
      } else {
        roadList.classList.add('road-js');
        gsap.set(roadLine, { scaleY: 0 });
        gsap.to(roadLine, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: roadList, start: 'top 60%', end: 'bottom 60%', scrub: true } });
        roadSteps.forEach(s => ScrollTrigger.create({
          trigger: s, start: 'top 60%',
          onEnter: () => s.classList.add('is-on'),
          onLeaveBack: () => s.classList.remove('is-on')
        }));
      }

      // GATILHO DE ANIMAÇÃO: cards de benefícios entram com fade e subida, em sequência por linha
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('.ben-card', { y: 32, opacity: 0 });
        ScrollTrigger.batch('.ben-card', {
          start: 'top 88%', once: true,
          onEnter: els => gsap.to(els, { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out', clearProps: 'transform,opacity' })
        });
      }

      // GATILHO DE ANIMAÇÃO (ticket 02): entrada do hero no carregamento (único momento orquestrado)
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.timeline({ defaults: { ease: 'power3.out' } })
          .from('.hero-line', { yPercent: 110, duration: 1, stagger: 0.12 })
          .from('.hero-fade', { y: 24, opacity: 0, duration: 0.8, stagger: 0.12 }, '-=0.5');
      }

      // Recalcula pins e posições depois que fontes e imagens carregam (ticket 07)
      window.addEventListener('load', () => ScrollTrigger.refresh(), { signal });
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      // GATILHO DE SCROLL (ticket 01): link ativo do header conforme a seção visível
      const links = document.querySelectorAll('nav[aria-label="Principal"] .nav-link');
      const map = { inicio: '#programa', programa: '#programa', competencias: '#competencias', roadmap: '#roadmap', beneficios: '#beneficios', contato: '#contato' };
      Object.keys(map).forEach(id => {
        const el = document.getElementById(id);
        if (!el || !el.offsetHeight) return;
        ScrollTrigger.create({
          trigger: el, start: 'top 45%', end: 'bottom 45%',
          onToggle: self => {
            if (!self.isActive) return;
            links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === map[id]));
          }
        });
      });
    });

    return () => {
      ac.abort()
      mmComp?.revert()
      ctx?.revert()
    }
  }, [])
}
