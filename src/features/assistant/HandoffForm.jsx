import { useState } from 'react';
import { X, Send, AlertTriangle } from 'lucide-react';

export default function HandoffForm({ onClose, onSubmit, route, role }) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      setError('Preencha assunto e mensagem.');
      return;
    }
    if (message.length > 1000) {
      setError('Mensagem muito longa (máx 1000 caracteres).');
      return;
    }
    setSubmitting(true);
    setError('');
    onSubmit({ subject: subject.trim(), message: message.trim() });
  }

  return (
    <div className="assistant-handoff" role="dialog" aria-modal="true" aria-labelledby="handoff-title">
      <div className="assistant-handoff-content">
        <header className="assistant-handoff-header">
          <h3 id="handoff-title">Falar com uma pessoa</h3>
          <button type="button" className="assistant-handoff-close" onClick={onClose} aria-label="Fechar">
            <X size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </header>

        <p className="assistant-handoff-notice">
          <AlertTriangle size={16} aria-hidden="true" />
          Não envie senhas, CPF, dados bancários ou sensíveis. A equipe responde pelo WhatsApp ou e-mail.
        </p>

        <form onSubmit={handleSubmit} className="assistant-handoff-form">
          <div className="assistant-handoff-field">
            <label htmlFor="handoff-subject">Assunto</label>
            <input
              id="handoff-subject"
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              maxLength={100}
              placeholder="Ex: Dúvida sobre mentoria, problema no login, etc."
              className="assistant-handoff-input"
              required
            />
          </div>

          <div className="assistant-handoff-field">
            <label htmlFor="handoff-message">Mensagem</label>
            <textarea
              id="handoff-message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              maxLength={1000}
              rows={4}
              placeholder="Descreva seu problema ou dúvida..."
              className="assistant-handoff-textarea"
              required
            />
            <span className="assistant-handoff-count">{message.length}/1000</span>
          </div>

          {error && <p className="assistant-handoff-error" role="alert">{error}</p>}

          <div className="assistant-handoff-actions">
            <button type="button" className="assistant-btn assistant-btn-secondary" onClick={onClose}>Cancelar</button>
            <button type="submit" className="assistant-btn assistant-btn-primary" disabled={submitting}>
              {submitting ? (
                <>
                  <Send size={14} aria-hidden="true" className="spin" /> Enviando…
                </>
              ) : (
                <>
                  <Send size={14} aria-hidden="true" /> Enviar
                </>
              )}
            </button>
          </div>
        </form>

        <p className="assistant-handoff-whatsapp">
          Ou chame direto no WhatsApp: <a href="https://wa.me/5541987132450" target="_blank" rel="noopener noreferrer">+55 41 98713-2450</a>
        </p>
      </div>
    </div>
  );
}