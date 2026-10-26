import { useState } from 'react';
import { ThumbsUp, ThumbsDown, X, Send } from 'lucide-react';

export default function FeedbackButtons({ messageId, onFeedback }) {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleRating(r) {
    if (submitted) return;
    setRating(r);
  }

  async function handleSubmit() {
    if (!rating) return;
    await onFeedback?.(rating, comment || undefined);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="assistant-feedback-submitted">
        <span>Obrigado pelo feedback!</span>
      </div>
    );
  }

  return (
    <div className="assistant-feedback">
      <div className="assistant-feedback-question">Esta resposta foi útil?</div>
      <div className="assistant-feedback-buttons">
        <button
          type="button"
          className={`assistant-feedback-btn ${rating === 'up' ? 'selected' : ''}`}
          onClick={() => handleRating('up')}
          aria-pressed={rating === 'up'}
          aria-label="Útil"
        >
          <ThumbsUp size={16} aria-hidden="true" />
        </button>
        <button
          type="button"
          className={`assistant-feedback-btn ${rating === 'down' ? 'selected' : ''}`}
          onClick={() => handleRating('down')}
          aria-pressed={rating === 'down'}
          aria-label="Não foi útil"
        >
          <ThumbsDown size={16} aria-hidden="true" />
        </button>
      </div>

      {rating && (
        <div className="assistant-feedback-comment">
          <label className="assistant-feedback-label">
            Comentário (opcional)
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="O que poderia melhorar?"
              maxLength={500}
              rows={2}
              className="assistant-feedback-textarea"
            />
          </label>
          <div className="assistant-feedback-actions">
            <button type="button" className="assistant-btn assistant-btn-sm assistant-btn-ghost" onClick={() => setRating(null)}>
              <X size={12} aria-hidden="true" /> Cancelar
            </button>
            <button type="button" className="assistant-btn assistant-btn-sm assistant-btn-primary" onClick={handleSubmit}>
              <Send size={12} aria-hidden="true" /> Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}