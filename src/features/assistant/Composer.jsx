import { useRef, useImperativeHandle, forwardRef } from 'react';
import { Send, X, Loader2 } from 'lucide-react';

const Composer = forwardRef((props, ref) => {
  const { onSend, onStop, isLoading, disabled, placeholder } = props;
  const textareaRef = useRef(null);
  const [value, setValue] = useState('');

  useImperativeHandle(ref, () => ({
    focus: () => textareaRef.current?.focus(),
    clear: () => setValue(''),
  }));

  function handleSubmit(e) {
    e.preventDefault();
    if (value.trim() && !isLoading && !disabled) {
      onSend(value.trim());
      setValue('');
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  return (
    <form className="assistant-composer" onSubmit={handleSubmit}>
      <div className="assistant-composer-input-wrapper">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || isLoading}
          rows={1}
          className="assistant-composer-textarea"
          aria-label="Sua mensagem"
          style={{ height: 'auto', maxHeight: '120px' }}
        />
      </div>
      <div className="assistant-composer-actions">
        {isLoading ? (
          <button
            type="button"
            className="assistant-btn assistant-btn-primary assistant-composer-stop"
            onClick={onStop}
            aria-label="Parar geração"
          >
            <X size={16} aria-hidden="true" /> Parar
          </button>
        ) : (
          <button
            type="submit"
            className="assistant-btn assistant-btn-primary"
            disabled={!value.trim() || disabled}
            aria-label="Enviar mensagem"
          >
            <Send size={16} aria-hidden="true" />
          </button>
        )}
      </div>
      {disabled && (
        <p className="assistant-composer-hint">
          {import.meta.env.VITE_DEMO_MODE === 'true' ? 'Modo demonstração' : 'Configure o assistente para usar'}
        </p>
      )}
    </form>
  );
});

import { useState } from 'react';

export default Composer;