# Lacunas do Assistente Directio

**Formato:** `| Data | Pergunta | Perfil | Resposta Atual | Ação Necessária |`

---

| Data | Pergunta | Perfil | Resposta Atual | Ação Necessária |
|------|----------|--------|----------------|-----------------|
| 2026-10-23 | (modelo) | student | — | Alimentar base quando houver pergunta sem resposta |

---

## Instruções para a Equipe

1. **Quando registrar:** Sempre que o assistente responder "Essa informação ainda não está definida" ou der resposta genérica para pergunta específica do programa.
2. **Como preencher:** Copie a linha acima, preencha os campos.
3. **Ação necessária:** "Atualizar assistant-knowledge.md seção X" ou "Confirmar com Altius" ou "Criar FAQ".
4. **Revisão semanal:** Responsável pela base revisa lacunas e atualiza `src/content/assistant-knowledge.md`.
5. **Deploy:** Após atualizar a base, fazer deploy da Edge Function (o prompt usa cache, mas a base é lida do storage a cada request).

---

## Exemplo de Preenchimento

| Data | Pergunta | Perfil | Resposta Atual | Ação Necessária |
|------|----------|--------|----------------|-----------------|
| 2026-11-01 | "Qual o horário das aulas ao vivo?" | student | "A definir com a Altius" | Confirmar com Altius e atualizar seção 1.3 da knowledge base |
| 2026-11-02 | "Como faço para trocar de mentor?" | student | Resposta genérica | Documentar processo em seção 2.1 (Mentor) da knowledge base |