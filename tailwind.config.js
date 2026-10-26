/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // ============ CORES (Framer + Guraisu) ============
      colors: {
        // Base escura profunda (Framer)
        ink: '#000000',
        night: '#050505',
        carbon: '#0a0a0a',
        elevated: '#111111',
        surface: '#161616',

        // Accent vibrante (Marca Altius adaptada)
        accent: '#A99BFF',      // Roxo principal
        'accent-glow': '#6F5FE8',
        'accent-dim': '#8b7fff',
        signal: '#6F5FE8',

        // Guraisu - vermelho/magenta dramático (para highlights)
        magenta: '#FF006E',
        'magenta-glow': '#FF3385',
        crimson: '#DC143C',

        // Cores adicionais para cards
        emerald: '#10B981',
        amber: '#F59E0B',
        cyan: '#06B6D4',

        // Neutros
        snow: '#FAFAFA',
        'snow-dim': '#E8E8E8',
        mute: '#888888',
        'mute-dim': '#666666',

        // Bordas sutis
        border: 'rgba(255,255,255,0.08)',
        'border-strong': 'rgba(255,255,255,0.15)',

        // Gradientes de luz (Guraisu light streaks)
        'light-streak-1': 'rgba(169, 155, 255, 0.15)',
        'light-streak-2': 'rgba(255, 0, 110, 0.1)',
        'light-streak-3': 'rgba(111, 95, 232, 0.12)',
      },

      // ============ TIPOGRAFIA ============
      fontFamily: {
        // Display condensado pesado (Guraisu style - Anton/Bebas Neue)
        display: ['Anton', 'Bebas Neue', 'Plus Jakarta Sans', 'sans-serif'],
        // Display alternativo mais legível
        'display-alt': ['Plus Jakarta Sans', 'Trebuchet MS', 'sans-serif'],
        // Body moderna (Framer style)
        body: ['Geist', 'Space Grotesk', 'Segoe UI', 'Helvetica Neue', 'sans-serif'],
        mono: ['Geist Mono', 'JetBrains Mono', 'monospace'],
      },

      fontSize: {
        // Tamanhos heroicos (Guraisu)
        'hero-xs': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.03em', fontWeight: '800' }],
        'hero-sm': ['clamp(4rem, 10vw, 8rem)', { lineHeight: '0.92', letterSpacing: '-0.04em', fontWeight: '800' }],
        'hero-md': ['clamp(6rem, 14vw, 12rem)', { lineHeight: '0.9', letterSpacing: '-0.05em', fontWeight: '800' }],
        'hero-lg': ['clamp(8rem, 18vw, 16rem)', { lineHeight: '0.88', letterSpacing: '-0.05em', fontWeight: '800' }],
        'hero-xl': ['clamp(10rem, 22vw, 20rem)', { lineHeight: '0.85', letterSpacing: '-0.06em', fontWeight: '800' }],
        'hero-2xl': ['clamp(14rem, 28vw, 28rem)', { lineHeight: '0.82', letterSpacing: '-0.07em', fontWeight: '800' }],

        // Headings padrão
        'heading-xl': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'heading-lg': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '700' }],
        'heading-md': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'heading-sm': ['clamp(1.25rem, 2.5vw, 1.75rem)', { lineHeight: '1.25', letterSpacing: '0', fontWeight: '600' }],

        // Body
        'body-lg': ['1.125rem', { lineHeight: '1.7', letterSpacing: '0' }],
        'body-base': ['1rem', { lineHeight: '1.65', letterSpacing: '0' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'body-xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],

        // Microcopy (Guraisu - uppercase, wide tracking)
        'micro-lg': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: '600' }],
        'micro-base': ['0.6875rem', { lineHeight: '1.5', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: '600' }],
        'micro-sm': ['0.625rem', { lineHeight: '1.5', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: '500' }],
      },

      // ============ ESPAÇAMENTOS ============
      spacing: {
        'space-4xs': '0.125rem',   // 2px
        'space-3xs': '0.25rem',    // 4px
        'space-2xs': '0.375rem',   // 6px
        'space-xs': '0.5rem',      // 8px
        'space-sm': '0.75rem',     // 12px
        'space-md': '1rem',        // 16px
        'space-lg': '1.5rem',      // 24px
        'space-xl': '2rem',        // 32px
        'space-2xl': '3rem',       // 48px
        'space-3xl': '4rem',       // 64px
        'space-4xl': '6rem',       // 96px
        'space-5xl': '8rem',       // 128px
        'space-6xl': '12rem',      // 192px
      },

      // ============ RAIOS ============
      borderRadius: {
        'radius-none': '0',
        'radius-xs': '0.25rem',    // 4px
        'radius-sm': '0.5rem',     // 8px
        'radius-md': '0.75rem',    // 12px
        'radius-lg': '1rem',       // 16px
        'radius-xl': '1.5rem',     // 24px
        'radius-2xl': '2rem',      // 32px
        'radius-3xl': '2.5rem',    // 40px
        'radius-full': '9999px',
      },

      // ============ SOMBRAS ============
      boxShadow: {
        'glow-sm': '0 0 20px rgba(169, 155, 255, 0.15)',
        'glow-md': '0 0 40px rgba(169, 155, 255, 0.2), 0 0 80px rgba(111, 95, 232, 0.1)',
        'glow-lg': '0 0 60px rgba(169, 155, 255, 0.25), 0 0 120px rgba(111, 95, 232, 0.15)',
        'glow-magenta': '0 0 40px rgba(255, 0, 110, 0.2), 0 0 80px rgba(255, 0, 110, 0.1)',
        'elevation-1': '0 2px 8px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)',
        'elevation-2': '0 8px 24px rgba(0,0,0,0.4), 0 4px 8px rgba(0,0,0,0.25)',
        'elevation-3': '0 20px 48px rgba(0,0,0,0.5), 0 8px 16px rgba(0,0,0,0.3)',
        'elevation-4': '0 32px 64px rgba(0,0,0,0.6), 0 16px 24px rgba(0,0,0,0.4)',
        'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.2)',
        'card': '0 24px 48px rgba(2,6,23,0.6), inset 0 1px 0 rgba(255,255,255,0.18)',
      },

      // ============ ANIMAÇÕES / TRANSIÇÕES ============
      transitionDuration: {
        'instant': '0ms',
        'fast': '150ms',
        'normal': '300ms',
        'slow': '500ms',
        'slower': '700ms',
        'slowest': '1000ms',
      },
      transitionTimingFunction: {
        'ease-premium': 'cubic-bezier(0.22, 1, 0.36, 1)',    // Framer signature easing
        'ease-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',  // Spring feel
        'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'ease-in-expo': 'cubic-bezier(0.7, 0, 0.84, 0)',
      },

      // ============ BLUR / BACKDROP ============
      backdropBlur: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
      },
      blur: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
      },

      // ============ GRADIENTES ============
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-mesh': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      },

      // ============ Z-INDEX ============
      zIndex: {
        'layer-0': '0',
        'layer-1': '10',
        'layer-2': '20',
        'layer-3': '30',
        'layer-4': '40',
        'layer-5': '50',
        'nav': '100',
        'modal': '200',
        'popover': '300',
        'tooltip': '400',
        'toast': '500',
        'cursor': '9999',
      },

      // ============ CONTAINERS ============
      maxWidth: {
        'container-sm': '640px',
        'container-md': '768px',
        'container-lg': '1024px',
        'container-xl': '1280px',
        'container-2xl': '1440px',  // Framer max width
        'container-content': '90rem', // 1440px - existing
      },

      // ============ ASPECT RATIOS ============
      aspectRatio: {
        'laptop': '16 / 10',
        'card': '4 / 3',
        'card-tall': '3 / 4',
        'wide': '21 / 9',
      },
    },
  },
  plugins: [],
}