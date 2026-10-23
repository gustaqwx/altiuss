// NotchedCard: Card com capa recortada por entalhe arredondado no canto inferior direito
// Referência de estilo: 21st.dev (notched project card pattern)
// Tokens do projeto: ink, night, accent, signal, snow, mute, line (via CSS vars)

import { ArrowUpRight } from 'lucide-react'

// Constantes do entalhe (single source of truth)
const DISC = 64      // diâmetro do disco da seta
const BLOCK = 80     // tamanho do bloco do entalhe (quadrado)
const FILLET = 48    // border-top-left-radius do bloco (BLOCK - DISC/2)
const CAP_RADIUS = 24 // raio da capa (exceção registrada no CLAUDE.md)
const CONCORD = 28   // quadrados de concordância (raio do radial-gradient)

export default function NotchedCard({
  cover,
  badge,
  title,
  description,
  labels = [],
  href,
  ariaLabel
}) {
  const isLink = Boolean(href)
  const surfaceColor = 'var(--ink)' // única fonte da cor da superfície = fundo da seção

  // Camadas do entalhe (pintadas na cor da superfície para "recortar" a capa)
  const notchLayers = (
    <div className="nc-notch" aria-hidden="true" style={{ '--surface': surfaceColor }}>
      {/* Bloco principal do entalhe: 80x80 no canto inferior direito, com border-top-left-radius 48px */}
      <div className="nc-block" style={{ '--block': `${BLOCK}px`, '--fillet': `${FILLET}px` }} />

      {/* Concordância 1: encontro do corte com borda direita (bottom: BLOCK, right: 0) */}
      <div className="nc-concord nc-concord-r" style={{ '--concord': `${CONCORD}px`, '--block': `${BLOCK}px`, '--surface': surfaceColor }} />

      {/* Concordância 2: encontro do corte com borda inferior (bottom: 0, right: BLOCK) */}
      <div className="nc-concord nc-concord-b" style={{ '--concord': `${CONCORD}px`, '--block': `${BLOCK}px`, '--surface': surfaceColor }} />
    </div>
  )

  // Disco da seta (64px, círculo verdadeiro, único rounded-full permitido)
  const disc = (
    <button
      type="button"
      className="nc-disc"
      aria-hidden="true"
      style={{ '--disc': `${DISC}px`, '--surface': surfaceColor }}
      disabled={!isLink}
    >
      <ArrowUpRight
        width={DISC * 0.375}
        height={DISC * 0.375}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      />
    </button>
  )

  const cardContent = (
    <article className="nc-card" style={{ '--cap-radius': `${CAP_RADIUS}px` }}>
      <div className="nc-cover" aria-hidden="true">
        {cover}
        {notchLayers}
        {disc}
      </div>

      <div className="nc-body">
        {badge && <span className="nc-badge">{badge}</span>}
        <h3 className="nc-title">
          {isLink ? (
            <a href={href} className="nc-link" aria-label={ariaLabel || title}>
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
        <p className="nc-desc">{description}</p>
        {labels.length > 0 && (
          <ul className="nc-labels" aria-hidden="true">
            {labels.map((label, i) => (
              <li key={i}>{label}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Stretched link pattern: quando há link, o ::after do link cobre o card inteiro */}
      {isLink && (
        <a href={href} className="nc-stretched-link" aria-label={ariaLabel || title} />
      )}
    </article>
  )

  return cardContent
}