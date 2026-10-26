import { ThumbsUp, ThumbsDown, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import FeedbackButtons from './FeedbackButtons';

// Simple markdown renderer - safe, no dangerouslySetInnerHTML
function renderMarkdown(text) {
  if (!text) return null;
  const parts = text.split(/\n+/);
  return parts.map((part, i) => {
    // Bold
    const boldParts = part.split(/(\*\*[^*]+\*\*)/);
    return (
      <p key={i} className="assistant-message-text">
        {boldParts.map((bp, j) =>
          bp.startsWith('**') && bp.endsWith('**')
            ? <strong key={j}>{bp.slice(2, -2)}</strong>
            : bp
        )}
      </p>
    );
  });
}

export default function MessageBubble({ message, index, isLast, onFeedback }) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [copied, setCopied] = useState(false);

  const isUser = message.role === 'user';
  const isError = message.error === true;
  const isStreaming = message.streaming === true;

  function handleCopy() {
    navigator.clipboard.writeText(message.content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className={`assistant-bubble ${isUser ? 'user' : 'assistant'} ${isStreaming ? 'streaming' : ''}`}>
      <div className="assistant-bubble-content">
        {isUser ? (
          <div className="assistant-bubble-user">
            <div className="assistant-bubble-text">{renderMarkdown(message.content)}</div>
          </div>
        ) : (
          <>
            <div className="assistant-bubble-text">{renderMarkdown(message.content)}</div>
            {!isStreaming && !isError && isLast && (
              <FeedbackButtons
                messageId={`${message.timestamp}-${index}`}
                onFeedback={(rating, comment) => onFeedback?.(rating, comment)}
              />
            )}
          </>
        )}

        {isError && (
          <div className="assistant-bubble-error">Erro ao gerar resposta</div>
        )}
      </div>

      {!isUser && !isStreaming && !isError && (
        <div className="assistant-bubble-actions">
          <button
            type="button"
            className="assistant-btn assistant-btn-icon"
            onClick={handleCopy}
            aria-label={copied ? 'Copiado' : 'Copiar resposta'}
            title={copied ? 'Copiado!' : 'Copiar'}
          >
            {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
          </button>
        </div>
      )}
    </div>
  );
}