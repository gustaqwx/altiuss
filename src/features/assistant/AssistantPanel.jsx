import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { X, Send, RotateCw, Loader2, AlertTriangle, HelpCircle } from 'lucide-react';
import MessageList from './MessageList';
import Composer from './Composer';
import SuggestedQuestions from './SuggestedQuestions';
import HandoffForm from './HandoffForm';
import { assistantApi, suggestedQuestions } from './api';

const AssistantPanel = forwardRef((props, ref) => {
  const { onClose, isPublic, role = 'student' } = props;
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showHandoff, setShowHandoff] = useState(false);
  const [abortController, setAbortController] = useState(null);
  const [privacyAcknowledged, setPrivacyAcknowledged] = useState(false);
  const messagesEndRef = useRef(null);
  const composerRef = useRef(null);
  const panelRef = useRef(null);
  const liveRegionRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => panelRef.current?.focus(),
  }));

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('assistant_conversation');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.version === '1.0') {
          setMessages(parsed.messages || []);
        }
      }
    } catch {}

    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    try {
      sessionStorage.setItem('assistant_conversation', JSON.stringify({
        version: '1.0',
        messages,
        updatedAt: new Date().toISOString(),
      }));
    } catch {}
  }, [messages]);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function handleSend(message) {
    if (!message.trim() || isLoading) return;
    setError(null);
    setIsLoading(true);

    const userMessage = { role: 'user', content: message, timestamp: Date.now() };
    const newMessages = [...messages, userMessage, { role: 'assistant', content: '', timestamp: Date.now(), streaming: true }];
    setMessages(newMessages);

    const controller = new AbortController();
    setAbortController(controller);

    const history = messages.filter(m => m.role === 'user' || m.role === 'assistant').map(m => ({
      user: m.role === 'user' ? m.content : undefined,
      assistant: m.role === 'assistant' ? m.content : undefined,
    })).filter(h => h.user || h.assistant).reduce((acc, h) => {
      if (h.user) acc.push({ user: h.user });
      else if (acc.length > 0) acc[acc.length - 1].assistant = h.assistant;
      return acc;
    }, []);

    try {
      const route = window.location.pathname;
      const screenTitle = document.title;
      const response = await assistantApi.sendMessage({
        message,
        history,
        route,
        screenTitle,
        signal: controller.signal,
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let fullResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.type === 'token') {
                fullResponse += parsed.text;
                setMessages(prev => prev.map((m, i) =>
                  i === prev.length - 1 ? { ...m, content: fullResponse } : m
                ));
              } else if (parsed.type === 'done') {
                setMessages(prev => prev.map((m, i) =>
                  i === prev.length - 1 ? { ...m, content: fullResponse, streaming: false } : m
                ));
                announceToScreenReader(fullResponse);
              } else if (parsed.type === 'error') {
                throw new Error(parsed.message);
              }
            } catch (e) {
              console.error('Parse error:', e);
            }
          }
        }
      }
    } catch (err) {
      if (err.name === 'AbortError') return;
      setError(err.message);
      setMessages(prev => prev.map((m, i) =>
        i === prev.length - 1 ? { ...m, content: '', streaming: false, error: true } : m
      ));
    } finally {
      setIsLoading(false);
      setAbortController(null);
      composerRef.current?.focus?.();
    }
  }

  function handleStop() {
    abortController?.abort();
    setIsLoading(false);
    setAbortController(null);
    setMessages(prev => prev.map((m, i) =>
      i === prev.length - 1 && m.streaming ? { ...m, streaming: false, content: m.content + ' [Interrompido]' } : m
    ));
  }

  function handleRetry() {
    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
    if (lastUserMsg) {
      setMessages(prev => prev.filter(m => m !== lastUserMsg && !(m.role === 'assistant' && m.streaming)));
      handleSend(lastUserMsg.content);
    }
  }

  function handleFeedback(rating, comment) {
    assistantApi.sendFeedback({ rating, comment, route: window.location.pathname }).catch(console.error);
  }

  function handleHandoffSubmit(data) {
    assistantApi.createSupportRequest({
      subject: data.subject,
      message: data.message,
      route: window.location.pathname,
      role,
    }).then(() => {
      setShowHandoff(false);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Seu pedido foi enviado. A equipe entrará em contato pelo WhatsApp +55 41 98713-2450 ou por e-mail.',
        timestamp: Date.now(),
      }]);
    }).catch(() => {
      setError('Falha ao enviar pedido. Tente novamente ou use o WhatsApp diretamente.');
    });
  }

  function clearConversation() {
    setMessages([]);
    try { sessionStorage.removeItem('assistant_conversation'); } catch {}
  }

  function announceToScreenReader(text) {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = '';
      setTimeout(() => { liveRegionRef.current.textContent = text; }, 100);
    }
  }

  const isVisitor = role === 'visitor';
  const questions = suggestedQuestions[role] || suggestedQuestions.student;
  const showSuggestions = messages.length === 0 && !isLoading;
  const canUseAssistant = !isPublic || assistantApi.isConfigured() || import.meta.env.VITE_DEMO_MODE === 'true';

  return (
    <div
      ref={panelRef}
      className="assistant-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="assistant-title"
      tabIndex="-1"
    >
      <div className="assistant-header">
        <h2 id="assistant-title" className="assistant-title">Assistente Directio</h2>
        <p className="assistant-disclaimer">Assistente de IA. Pode errar e não substitui seu mentor. Não envie dados pessoais ou senhas.</p>
        <button
          type="button"
          className="assistant-close"
          onClick={onClose}
          aria-label="Fechar assistente"
        >
          <X size={18} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      <div className="assistant-body">
        {!canUseAssistant && (
          <div className="assistant-unconfigured" role="status">
            <HelpCircle size={24} aria-hidden="true" />
            <p>Assistente ainda não configurado.</p>
            <p className="assistant-hint">Configure as variáveis de ambiente ou ative VITE_DEMO_MODE para testar.</p>
          </div>
        )}

        <MessageList
          messages={messages}
          isLoading={isLoading}
          error={error}
          onRetry={handleRetry}
          onFeedback={handleFeedback}
          ref={messagesEndRef}
          liveRegionRef={liveRegionRef}
        />

        {showSuggestions && (
          <SuggestedQuestions
            questions={questions}
            onSelect={handleSend}
            disabled={isLoading}
          />
        )}

        <Composer
          ref={composerRef}
          onSend={handleSend}
          onStop={handleStop}
          isLoading={isLoading}
          disabled={!canUseAssistant}
          placeholder={isPublic ? 'Pergunte sobre o programa...' : 'Como posso ajudar?'}
        />
      </div>

      <div className="assistant-footer">
        <button
          type="button"
          className="assistant-btn assistant-btn-ghost assistant-handoff-trigger"
          onClick={() => setShowHandoff(true)}
        >
          Falar com uma pessoa
        </button>
        <button
          type="button"
          className="assistant-btn assistant-btn-ghost"
          onClick={clearConversation}
          disabled={messages.length === 0}
          aria-label="Limpar conversa"
        >
          <RotateCw size={14} aria-hidden="true" /> Limpar
        </button>
      </div>

      <div
        ref={liveRegionRef}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      />

      {showHandoff && (
        <HandoffForm
          onClose={() => setShowHandoff(false)}
          onSubmit={handleHandoffSubmit}
          route={window.location.pathname}
          role={role}
        />
      )}
    </div>
  );
});

import { useState } from 'react';

export default AssistantPanel;