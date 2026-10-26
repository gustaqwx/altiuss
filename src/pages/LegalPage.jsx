import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { legalContent } from '../content/legal'
import { flags } from '../config/site'

export default function LegalPage() {
  const { type } = useParams()
  const content = type === 'termos' ? legalContent.terms : legalContent.privacy
  const isDraft = type === 'termos' ? flags.LEGAL_DRAFT && legalContent.draft.terms : flags.LEGAL_DRAFT && legalContent.draft.privacy

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!content) return null

  return (
    <main className="mx-auto max-w-3xl px-5 py-16 md:px-10" id="conteudo">
      {isDraft && (
        <div className="mb-8 p-4 border border-amber-500/30 bg-amber-500/10 rounded-md text-sm text-amber-200" role="alert">
          <strong>Atenção:</strong> Este documento está em versão preliminar (rascunho) e pode ser alterado antes da publicação oficial.
        </div>
      )}
      <header className="mb-12">
        <h1 className="font-display text-4xl font-bold leading-[1.05] md:text-5xl">{content.title}</h1>
        <p className="mt-3 text-sm text-mute">Última atualização: {content.lastUpdated}</p>
      </header>
      <article className="prose prose-invert max-w-none text-snow">
        {content.sections.map((section, idx) => (
          <section key={idx} className="mb-10">
            <h2 className="font-display text-xl font-semibold mb-4">{section.heading}</h2>
            {section.body && <p className="mb-4 leading-relaxed">{section.body}</p>}
            {section.items && (
              <ul className="space-y-3 ml-4 list-disc">
                {section.items.map((item, i) => (
                  <li key={i} className="leading-relaxed">
                    {item.label ? <><strong>{item.label}</strong> {item.value}</> : item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>
      <footer className="mt-16 border-t border-[color:var(--line)] pt-8">
        <p className="text-sm text-mute">
          Dúvidas? Entre em contato: <a href="mailto:privacidade@altiusinteligencia.com" className="underline hover:text-accent">privacidade@altiusinteligencia.com</a>
        </p>
      </footer>
    </main>
  )
}