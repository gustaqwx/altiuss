export default function SuggestedQuestions({ questions, onSelect, disabled }) {
  if (!questions || questions.length === 0) return null;

  return (
    <div className="assistant-suggestions" role="list" aria-label="Perguntas sugeridas">
      <p className="assistant-suggestions-label">Sugestões:</p>
      <ul className="assistant-suggestions-list">
        {questions.map((q, i) => (
          <li key={i} role="listitem">
            <button
              type="button"
              className="assistant-suggestion-btn"
              onClick={() => onSelect(q)}
              disabled={disabled}
            >
              {q}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}