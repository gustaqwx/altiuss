import { MessageCircle, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import AssistantPanel from './AssistantPanel';

export default function AssistantButton({ isPublic = false, role = 'student' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(false);
  const buttonRef = useRef(null);
  const panelRef = useRef(null);
  const hasAcknowledged = useRef(false);

  useEffect(() => {
    try {
      const acknowledged = sessionStorage.getItem('assistant_privacy_ack');
      if (acknowledged) {
        const { version, date } = JSON.parse(acknowledged);
        if (version === '1.0') hasAcknowledged.current = true;
      }
    } catch {}
  }, []);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  function openPanel() {
    if (!hasAcknowledged.current) {
      setShowPrivacyNotice(true);
      return;
    }
    setIsOpen(true);
    setTimeout(() => panelRef.current?.focus?.(), 0);
  }

  function acknowledgePrivacy() {
    try {
      sessionStorage.setItem('assistant_privacy_ack', JSON.stringify({ version: '1.0', date: new Date().toISOString() }));
      hasAcknowledged.current = true;
    } catch {}
    setShowPrivacyNotice(false);
    setIsOpen(true);
    setTimeout(() => panelRef.current?.focus?.(), 0);
  }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="assistant-button"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={isOpen ? 'Fechar assistente' : 'Abrir assistente'}
        onClick={() => isOpen ? setIsOpen(false) : openPanel()}
      >
        {isOpen ? <X size={20} strokeWidth={2} aria-hidden="true" /> : <MessageCircle size={20} strokeWidth={2} aria-hidden="true" />}
        <span className="assistant-button-label">Ajuda</span>
      </button>

      {showPrivacyNotice && (
        <div className="assistant-privacy-notice" role="dialog" aria-modal="true" aria-labelledby="privacy-title">
          <div className="assistant-privacy-content">
            <h3 id="privacy-title">Privacidade do Assistente</h3>
            <p>Suas mensagens são enviadas para processamento por um provedor de IA (Anthropic) e pelo Supabase.</p>
            <p>O texto da conversa <strong>não é guardado no servidor</strong>. Apenas metadados de uso (tokens, horário) são registrados.</p>
            <p><strong>Não envie:</strong> senhas, CPF, dados bancários, dados de saúde ou informações sensíveis de terceiros.</p>
            <p><a href="/privacidade" target="_blank" rel="noopener noreferrer">Ver Política de Privacidade completa</a></p>
            <div className="assistant-privacy-actions">
              <button type="button" className="assistant-btn assistant-btn-secondary" onClick={() => setShowPrivacyNotice(false)}>Cancelar</button>
              <button type="button" className="assistant-btn assistant-btn-primary" onClick={acknowledgePrivacy}>Entendi</button>
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <AssistantPanel
          ref={panelRef}
          onClose={() => setIsOpen(false)}
          isPublic={isPublic}
          role={role}
        />
      )}
    </>
  );
}