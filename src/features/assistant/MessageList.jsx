import MessageBubble from './MessageBubble';
import { Loader2, AlertTriangle, RotateCw } from 'lucide-react';

export default function MessageList({
  messages,
  isLoading,
  error,
  onRetry,
  onFeedback,
  ref,
  liveRegionRef,
}) {
  return (
    <div
      ref={ref}
      className="assistant-messages"
      role="log"
      aria-live="polite"
      aria-label="Conversa com o assistente"
    >
      {messages.map((msg, idx) => (
        <MessageBubble
          key={`${msg.timestamp}-${idx}`}
          message={msg}
          index={idx}
          isLast={idx === messages.length - 1}
          onFeedback={onFeedback}
        />
      ))}

      {isLoading && messages.length > 0 && messages[messages.length - 1]?.streaming && (
        <div className="assistant-typing-indicator" aria-hidden="true">
          <Loader2 size={16} className="spin" aria-hidden="true" />
          <span>Digitando…</span>
        </div>
      )}

      {error && (
        <div className="assistant-error" role="alert">
          <AlertTriangle size={16} aria-hidden="true" />
          <span>{error}</span>
          <button type="button" className="assistant-btn assistant-btn-sm" onClick={onRetry}>
            <RotateCw size={12} aria-hidden="true" /> Tentar novamente
          </button>
        </div>
      )}

      <div ref={ref} id="messages-end" />
    </div>
  );
}