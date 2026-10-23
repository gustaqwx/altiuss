export const inputClass =
  'w-full rounded-md border bg-night px-3 py-2.5 text-snow placeholder:text-mute disabled:opacity-50'

export default function Field({ id, label, error, hint, ...input }) {
  const describedBy = error ? `${id}-erro` : hint ? `${id}-dica` : undefined
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm text-mute">{label}</label>
      <input
        id={id}
        className={`${inputClass} ${error ? 'border-[#ff8a8a]' : 'border-[color:var(--line)]'}`}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        {...input}
      />
      {/* Espaço sempre reservado: a mensagem não empurra o layout (e o clique seguinte) ao aparecer. */}
      <p id={error ? `${id}-erro` : hint ? `${id}-dica` : undefined} style={{ minHeight: '1.25rem' }} className={`mt-1.5 text-sm ${error ? 'text-[#ff8a8a]' : 'text-mute'}`}>{error || hint || ''}</p>
    </div>
  )
}
