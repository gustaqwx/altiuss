import { useState } from 'react'

const STATUS = {
  not_configured: 'PIX ainda não configurado',
  pending: 'Aguardando pagamento',
  paid: 'Pagamento confirmado',
  expired: 'Código expirado',
  failed: 'Pagamento não concluído',
}

// `pix` = { qrCodeUrl, code, status } devolvido pelo provedor. Sem ele, nada é exibido como se fosse real.
export default function PixPanel({ pix = null, available }) {
  const [copied, setCopied] = useState(false)
  const status = pix?.status ?? (available ? 'pending' : 'not_configured')
  async function copy() {
    try { await navigator.clipboard.writeText(pix.code); setCopied(true) } catch { setCopied(false) }
  }
  return (
    <div className="grid gap-6 sm:grid-cols-[10rem_1fr]">
      <div className="flex aspect-square items-center justify-center border border-dashed border-[color:var(--line)] p-3 text-center text-sm text-mute">
        {pix?.qrCodeUrl ? <img src={pix.qrCodeUrl} alt="QR Code do PIX" className="h-full w-full" /> : 'O QR Code aparece aqui'}
      </div>
      <div>
        <label htmlFor="pix-codigo" className="mb-1.5 block text-sm text-mute">PIX copia e cola</label>
        <input id="pix-codigo" readOnly value={pix?.code ?? ''} placeholder="Disponível quando o PIX estiver configurado" className="w-full rounded-md border border-[color:var(--line)] bg-night px-3 py-2.5 text-snow placeholder:text-mute" />
        <div className="mt-3 flex items-center gap-4">
          <button type="button" onClick={copy} disabled={!pix?.code} className="btn text-sm disabled:pointer-events-none disabled:opacity-40">Copiar código</button>
          <span role="status" className="text-sm text-mute">{copied ? 'Código copiado' : STATUS[status]}</span>
        </div>
      </div>
    </div>
  )
}
