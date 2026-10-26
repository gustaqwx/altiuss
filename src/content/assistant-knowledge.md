# Base de Conhecimento do Assistente Directio

**Versão:** 1.0
**Última atualização:** 2026-10-23
**Finalidade:** Fonte única de verdade para o Assistente de IA da plataforma Directio.

---

## 1. FATOS DO PROGRAMA

### 1.1 Estrutura do Programa (12 meses, 4 fases)

| Fase | Nome | Meses | Foco Principal |
|------|------|-------|----------------|
| 1 | Explorar | 1–3 | Diagnóstico, fundamentos, escolha de trilha |
| 2 | Desenvolver | 4–6 | Hard skills, soft skills, método científico |
| 3 | Aplicar | 7–9 | Projetos reais com empresas parceiras, portfólio |
| 4 | Decolar | 10–12 | Simulações de entrevista, preparação para o mercado, networking |

### 1.2 Eixos de Competência (baseados no Future of Jobs Report 2025 — WEF)

1. **Hard skills sólidas:** Pensamento Analítico, IA & Big Data, Programação
2. **Soft skills 4.0:** Flexibilidade, Colaboração, Liderança
3. **Método científico:** Aplicado em todas as fases

### 1.3 Componentes Principais

- **Trilhas personalizadas:** Percurso adaptado ao perfil diagnóstico com módulos progressivos
- **Mentoria quinzenal:** Sessões individuais e em grupo com profissionais de mercado (6 sessões ao longo do programa)
- **Simulações de processos seletivos:** Entrevistas técnicas (live coding) e comportamentais (fit cultural) com feedback estruturado
- **Dashboard de competências:** Acompanhamento em tempo real das 6 habilidades WEF com metas e marcos
- **Projetos aplicados (Fase 3):** Desafios reais de empresas parceiras geram portfólio e networking
- **Comunidade e eventos:** Rede de ex-alunos, hackathons, workshops, encontros com recrutadores
- **Squads heterogêneos:** Grupos mistos por perfil para colaboração interdisciplinar

### 1.4 Informações "A definir com a Altius"

As seguintes informações **NÃO** estão definidas e o assistente deve responder "A definir com a Altius" quando perguntado:
- Preço do programa, planos, valores de bolsa
- Datas de início das turmas, processo seletivo, critérios de seleção
- Carga horária exata, formato (presencial/remoto/híbrido)
- Critérios de aprovação, notas mínimas, regras de reembolso
- Parceiras de projeto real, empresas recrutadoras
- Certificação oficial, reconhecimento MEC
- Assessment inicial detalhado, ferramentas específicas

---

## 2. PASSO A PASSO DAS TELAS POR PERFIL

### 2.1 Aluno (student)

**Jornada (`/app`)**
- Visão geral do progresso nas 4 fases
- Acesso rápido a trilha atual, próxima entrega, próximas sessões ao vivo

**Aulas (`/app/aulas`)**
- Lista de vídeo-aulas por fase/módulo
- Clique em aula → abre detalhe com player YouTube incorporado
- Botão "Marcar como concluída" (manual)

**Aula ao vivo (`/app/ao-vivo`)**
- Lista de sessões agendadas (meeting externo ou YouTube Live)
- Entrar na sessão → abre link externo ou player incorporado
- Instrutor marca presença (aluno só visualiza)

**Trilha/Atividade (`/app/atividade/:id`)**
- Ver enunciado, critérios de avaliação, prazo
- Enviar entrega (texto/arquivo — adaptador não configurado atualmente)
- Ver feedback do mentor após revisão

**Mentoria (`/app/mentor/mentoria` ou `/app/mentoria`)**
- Ver agendamentos quinzenais
- Confirmar presença, ver anotações do mentor

**Simulações (`/app/simulacoes` se existir — ainda não disponível)**
- Ainda não disponível

**Notificações (`/app/notificacoes`)**
- Lista de avisos: novas aulas, prazos, feedback disponível, agendamentos

**Dashboard de competências (`/app/competencias` se existir — ainda não disponível)**
- Ainda não disponível

**Perfil/Configurações**
- Ainda não disponível

### 2.2 Mentor (mentor)

**Visão geral (`/app`)**
- Resumo de alunos designados, fila de revisão, próximas mentorias

**Alunos (`/app/mentor`)**
- Lista de alunos sob mentoria com fase, progresso, última atividade

**Fila de revisão (`/app/mentor/revisao`)**
- Entregas pendentes de avaliação
- Clique → abre tela de revisão com enunciado, entrega, rubrica
- Preencher feedback estruturado (pontos fortes, melhorias, nota por critério)
- Publicar feedback → aluno notificado

**Mentorias (`/app/mentor/mentoria`)**
- Agendar sessões quinzenais (individuais/grupo)
- Registrar anotações pós-sessão
- Avaliação de soft skills

**Aulas e Ao vivo** (somente leitura)
- Mesmas telas do aluno, sem ações de envio

### 2.3 Instrutor (instructor)

**Visão geral (`/app`)**
- Resumo de aulas criadas, sessões ao vivo agendadas

**Vídeo-aulas (`/app/admin/aulas`)**
- Criar rascunho: título, fase, módulo, YouTube Video ID (11 chars), descrição
- Validar ID via oEmbed + YouTube Data API (Edge Function)
- Publicar → alunos e mentores veem
- Editar/arquivar rascunhos

**Aulas ao vivo (`/app/ao-vivo`)**
- Criar sessão: título, data/hora (America/Sao_Paulo), tipo (meeting URL ou youtube_live ID)
- Marcar presença dos alunos (apenas sessões próprias)
- Vincular gravação (aula cadastrada) após sessão

**Alunos (`/app/alunos`)**
- Consulta limitada: nome, fase, progresso, última atividade (via RPC)
- Não acessa: e-mail, CPF, mentor, matrícula, audit_log

### 2.4 Admin (admin)

**Visão geral (`/app`)**
- Métricas gerais da plataforma

**Gestão (`/app/admin`)**
- Convites de papel (promover a Mentor/Instrutor via RPC auditada)
- Matrículas, códigos de turma e bolsa
- Gestão de squads

**Alunos (`/app/alunos`)**
- Lista completa com filtros, acesso a dados completos

**Mentores (`/app/mentores`)**
- Gestão de mentores, designação de alunos

**Equipe (`/app/equipe`)**
- Gestão de instrutores e admins

**Entregas (`/app/mentor/revisao`)**
- Acesso a todas as revisões

**Vídeo-aulas (`/app/admin/aulas`)**
- Gestão completa (inclui de outros instrutores)

**Aulas ao vivo (`/app/ao-vivo`)**
- Gestão completa, pode vincular gravação em qualquer sessão

**Suporte (`/app/admin/suporte`) — NOVO**
- Tabela de pedidos de ajuda humana (support_requests)
- Filtro por status (open, in_progress, closed), busca por usuário/assunto
- Abrir/fechar pedidos, notificação in-app ao chegar novo

---

## 3. GLOSSÁRIO

| Termo | Definição |
|-------|-----------|
| **Trilha** | Sequência de módulos/aulas personalizada por fase e perfil |
| **Mentoria quinzenal** | Sessão a cada 15 dias com mentor de mercado (individual ou grupo) |
| **Simulação** | Entrevista técnica (live coding) ou comportamental (fit cultural) com feedback |
| **Squad** | Grupo heterogêneo de alunos para projetos colaborativos |
| **Dashboard de competências** | Painel visual das 6 habilidades WEF com progresso e metas |
| **Fase 3 (Aplicar)** | Meses 7–9: projetos reais com empresas parceiras |
| **RPC** | Remote Procedure Call — função segura no banco (SECURITY DEFINER) |
| **RLS** | Row Level Security — controle de acesso no nível da linha no Postgres |
| **Edge Function** | Código serverless no Supabase (Deno/TypeScript) |
| **LGPD** | Lei Geral de Proteção de Dados (Lei nº 13.709/2018) |

---

## 4. PROBLEMAS COMUNS E SOLUÇÕES

| Problema | Passos de Solução |
|----------|-------------------|
| **Não consigo fazer login** | 1. Verifique se o e-mail está correto. 2. Use "Esqueci minha senha" em /login. 3. Se usa Apple, tente e-mail/senha. 4. Se persistir, contate suporte. |
| **Verificação em dois passos não chega** | 1. Confira pasta de spam/lixo. 2. Confirme se o e-mail cadastrado está correto. 3. Aguarde 5 min e tente reenviar. 4. Se não chegar, fale com a equipe. |
| **Vídeo da aula não carrega** | 1. Atualize a página (F5). 2. Teste em aba anônima/outro navegador. 3. Verifique se o YouTube está acessível na sua rede. 4. Reporte com o título da aula. |
| **Envio de atividade falhou** | 1. Verifique conexão e tamanho do arquivo. 2. Tente novamente. 3. Se persistir, anote o erro e contate suporte. |
| **Não vejo minhas mentorias agendadas** | 1. Confira se está matriculado ativamente. 2. Verifique a aba Mentoria no menu. 3. Mentorias começam na Fase 1. 4. Se não houver nenhuma, fale com a equipe. |
| **Não recebo notificações** | 1. Verifique permissões do navegador. 2. Confira /app/notificacoes. 3. Se vazio, pode não haver avisos novos. |

---

## 5. CONTATOS OFICIAIS

- **WhatsApp (suporte oficial):** +55 41 98713-2450
- **E-mail (privacidade/DPO):** privacidade@altiusinteligencia.com
- **LinkedIn:** linkedin.com/company/altius-inteligência

---

## 6. REGRAS DE COMPORTAMENTO DO ASSISTENTE (RESUMO PARA CONTEXTO)

- **Tom:** Português do Brasil, direto, respostas ≤ 120 palavras (salvo pedido de detalhe)
- **Formato:** Listas numeradas para passos, parágrafos curtos
- **Sem:** emoji, travessão (—/–), buzzwords, bajulação
- **Identidade:** Assume ser IA se perguntado
- **Escopo:** Só plataforma Directio. Fora de escopo → recusa educada + volta ao tema
- **Sofrimento emocional:** Acolhimento + indica CVV (188) + equipe Altius
- **Não sabe:** "Essa informação ainda não está definida. Posso encaminhar sua dúvida para a equipe."
- **Não faz:** Entrega pronta, nota, aprovação, promessa de emprego, acessa dados de terceiros
- **Ajuda humana:** Sempre oferece botão "Falar com uma pessoa" + WhatsApp

---

## 7. SUGESTÕES DE PERGUNTAS POR PERFIL

### Aluno
1. "Como funciona a mentoria quinzenal?"
2. "Onde vejo meu progresso nas competências WEF?"
3. "Como envio uma atividade para revisão?"
4. "O que acontece na Fase 3 (projetos reais)?"

### Mentor
1. "Como faço uma revisão de entrega estruturada?"
2. "Onde vejo os alunos designados a mim?"
3. "Como agendo uma mentoria em grupo?"

### Instrutor
1. "Como cadastro uma vídeo-aula do YouTube?"
2. "Como marco presença na minha aula ao vivo?"
3. "O que posso ver dos alunos na minha RPC?"

### Admin
1. "Como promovo um usuário a Mentor?"
2. "Onde gero códigos de bolsa/turma?"
2. "Como fecho um pedido de suporte?"

### Visitante (landing)
1. "Quanto custa o programa?" → "A definir com a Altius" + WhatsApp
2. "Quando começa a próxima turma?" → "A definir com a Altius" + WhatsApp
3. "O que inclui o programa?" → Fatos públicos da base
4. "Como faço para me inscrever?" → CTA para cadastro/WhatsApp