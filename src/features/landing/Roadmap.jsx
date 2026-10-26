'use client';

import { motion } from 'framer-motion';
import { phases } from '../../content/landing';

/**
 * Roadmap estilo Framer + Guraisu
 * - Timeline vertical com linha animada
 * - Cards expansíveis com hover
 * - Números grandes (Guraisu)
 * - Animações scroll-triggered
 */
export default function Roadmap() {
  return (
    <section
      id="roadmap"
      className="relative border-t border-border py-20 lg:py-32"
      aria-labelledby="t-road"
    >
      {/* Background light streak */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] max-w-[800px] -z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-signal/5 via-transparent to-transparent blur-3xl opacity-50" />
      </div>

      <div className="mx-auto max-w-[90rem] px-5 md:px-10">
        {/* Header */}
        <motion.div
          className="mb-16 lg:mb-20 text-center lg:text-left max-w-2xl mx-auto lg:mx-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-micro-base text-signal mb-4 block">Roadmap de 12 Meses</span>
          <h2 id="t-road" className="font-display-alt text-heading-xl lg:text-heading-lg font-extrabold leading-tight text-snow">
            Do diagnóstico à sua primeira oportunidade
          </h2>
          <p className="mt-6 text-body-lg text-mute max-w-lg mx-auto lg:mx-0">
            Doze meses, quatro fases: do diagnóstico à sua primeira oportunidade real.
          </p>
        </motion.div>

        {/* Timeline */}
        <ol
          id="road-list"
          className="relative"
          role="list"
          aria-label="Fases do programa"
        >
          {/* Linha central animada */}
          <motion.div
            className="absolute left-[7px] md:left-[13px] top-0 bottom-0 w-px bg-border origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'top center' }}
            aria-hidden="true"
          >
            <motion.div
              id="road-line"
              className="h-full w-full bg-gradient-to-b from-accent to-signal"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
              style={{ transformOrigin: 'top center' }}
            />
          </motion.div>

          {phases.map((phase, index) => (
            <motion.li
              key={phase.name}
              className="relative pl-10 md:pl-16 pb-16 lg:pb-20 last:pb-0"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 0.7,
                delay: 0.4 + index * 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              {/* Dot da timeline */}
              <motion.div
                className="absolute -left-10 md:-left-16 top-3 h-[15px] w-[15px] md:h-4 md:w-4 rounded-full border-2 border-border bg-ink transition-all duration-300"
                whileInView={{
                  scale: [0, 1.2, 1],
                  borderColor: ['border', 'accent', 'accent'],
                  backgroundColor: ['ink', 'accent', 'accent'],
                }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.15 }}
                style={{ boxShadow: '0 0 0 4px rgba(169, 155, 255, 0)' }}
                animate={{ boxShadow: index === 0 ? '0 0 0 4px rgba(169, 155, 255, 0.3)' : '0 0 0 0 rgba(169, 155, 255, 0)' }}
              />

              {/* Número da fase (Guraisu style - grande) */}
              <motion.div
                className="absolute -left-10 md:-left-16 top-3 -translate-y-1/2 text-micro-lg text-mute/40 font-display"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.15 }}
              >
                {String(index + 1).padStart(2, '0')}
              </motion.div>

              {/* Card da fase */}
              <motion.div
                className="relative group"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Período */}
                <p className="text-micro-base text-accent mb-2">
                  {phase.period}
                </p>

                {/* Título da fase */}
                <h3 className="font-display-alt text-heading-sm lg:text-heading-md font-extrabold leading-tight text-snow mb-5 group-hover:text-accent transition-colors duration-300">
                  <span className="text-mute/50 mr-3">{String(index + 1).padStart(2, '0')}</span>
                  {phase.name}
                </h3>

                {/* Subtítulo */}
                <p className="text-body-sm text-mute/70 mb-6 max-w-md">
                  {phase.subtitle}
                </p>

                {/* Atividades */}
                <ul className="space-y-3 max-w-md" role="list">
                  {phase.activities.map((activity, actIndex) => (
                    <motion.li
                      key={activity}
                      className="flex items-center gap-3 p-3 rounded-xl bg-elevated/50 backdrop-blur-sm border border-border hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 group"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + index * 0.15 + actIndex * 0.06 }}
                    >
                      <motion.div
                        className="w-2 h-2 rounded-full bg-accent/50 group-hover:bg-accent group-hover:scale-150 transition-all duration-300"
                        whileInView={{ scale: [0, 1.2, 1] }}
                      />
                      <span className="text-body-base text-snow/90">{activity}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.li>
          ))}

          {/* CTA Final */}
          <motion.li
            className="relative pl-10 md:pl-16 pt-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative max-w-md">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-magenta/10 rounded-2xl blur-xl opacity-50" aria-hidden="true" />

              <div className="relative p-8 rounded-2xl border border-border bg-elevated/50 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-signal flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-micro-base text-accent">Próxima Turma</p>
                    <p className="font-display-alt text-heading-sm font-extrabold text-snow">Início: Janeiro 2025</p>
                  </div>
                </div>

                <p className="text-body-base text-mute mb-6">
                  Vagas limitadas. Processo seletivo com assessment de perfil e entrevista técnica.
                </p>

                <a
                  href="#contato"
                  className="btn w-full cursor-expand"
                  style={{
                    background: 'linear-gradient(135deg, #A99BFF 0%, #6F5FE8 100%)',
                    boxShadow: '0 4px 24px rgba(111, 95, 232, 0.3)',
                    border: 'none',
                  }}
                >
                  Quero me inscrever
                </a>
              </div>
            </div>
          </motion.li>
        </ol>
      </div>
    </section>
  );
}