# 00: Rastreabilidade, perguntas abertas e glossário

> **Status:** matriz de rastreabilidade do código e da migration versionada. Supabase/Postgres é a arquitetura especificada; migration/RLS/RPC estão em `supabase/`, mas ainda não foram aplicadas a um projeto da Altius.

## 1. Como interpretar a matriz

- Status do requisito descreve o código atual, não a prioridade nem a intenção futura.
- **Parcial** indica uma tela, rota ou parte de comportamento existente sem o fluxo completo.
- **Planejado** indica ausência de implementação correspondente.
- **Fora do escopo** indica exclusão expressa pelo usuário.
- Nomes de tabela entre crases seguem a migration `supabase/migrations/202610210001_platform.sql`; precisam de validação ao aplicar e testar no Supabase da Altius.
- "não se aplica" significa que não há tabela necessária para o requisito ou que a decisão depende da arquitetura.

## 2. Matriz de rastreabilidade: requisitos funcionais

| Requisito | Histórias | Tela | Tabela lógica na migration | Status no código |
|---|---|---|---|---|
| RF-01 | US-01 | TELA-02 | Supabase Auth e `profiles` | Implementado no adaptador; credenciais/configuração pendentes |
| RF-02 | US-02 | TELA-02 | Supabase Auth | Implementado no adaptador; Apple precisa de configuração externa |
| RF-03 | US-02 | TELA-02 | Supabase Auth | Implementado no adaptador; requer Supabase configurado |
| RF-04 | US-03, US-04, US-12, US-18, US-24, US-31 | TELA-02, TELA-03, TELA-08, TELA-12, TELA-16 | `profiles`, `mentor_students` | Implementado em código/migration; RLS precisa ser aplicada/testada |
| RF-05 | US-03, US-22, US-32 | TELA-02, TELA-03, TELA-14, TELA-16 a TELA-19 | Fixtures/sessão transitória de demo | Implementado: quatro papéis e dados locais rotulados |
| RF-06 | US-06, US-07 | TELA-04, TELA-05 | `lessons` | Parcial: catálogo de aulas implementado; trilhas/módulos personalizados A definir com a Altius |
| RF-07 | US-05 a US-07 | TELA-03, TELA-04 | `phases`, `learner_journeys`, `phase_progress` | Implementado; progresso em demo e cálculo por entregas aprovadas |
| RF-08 | US-08, US-09 | TELA-06 | `activities`, `activity_criteria` | Implementado com conteúdo ausente marcado “A definir com a Altius” |
| RF-09 | US-09, US-10 | TELA-06 | `submissions`, `submission_versions`; metadados de storage | Implementado para texto/link e versões; upload não configurado |
| RF-10 | US-10 | TELA-06 | `submissions`, `submission_versions` | Implementado no modelo e fluxo principal |
| RF-11 | US-11 | TELA-07 | `squads`, `squad_members`, `squad_activities` | Planejado |
| RF-12 | US-12, US-13 | TELA-08, TELA-09 | `submission_versions`, `feedback`, `feedback_criteria` | Implementado no código; Supabase/RLS pendentes de aplicação |
| RF-13 | US-13, US-14 | TELA-06, TELA-09 | `feedback`, `feedback_criteria` | Implementado; escala e critérios continuam a definir |
| RF-14 | US-05, US-15 | TELA-03 | `competency_progress` | Parcial: competências e dados demonstrativos existem; avaliação real A definir com a Altius |
| RF-15 | US-16 | TELA-10 | `mentorship_sessions` | Implementado no código; registros reais exigem Supabase |
| RF-16 | US-17 | TELA-11 | `interview_simulations`, `interview_feedback` | Planejado |
| RF-17 | US-18 a US-20 | TELA-12, TELA-20, TELA-21 | `profiles`, `mentor_students`, `audit_log` | Implementado em UI/RPC/migration; remoto pendente |
| RF-18 | US-21 | TELA-13 | `notifications` | Implementado in-app; políticas de retenção a definir |
| RF-19 | US-22 | TELA-14 | Nenhuma; logs de exemplo estáticos | Parcial |
| RF-20 | US-23 | TELA-01, TELA-15 | `checkout_orders` somente se backend de cobrança vier a existir | Parcial: rota/interface; sem pagamento disponível |
| RF-21 | não se aplica | não se aplica | não se aplica | Fora do escopo: quadro de vagas |
| RF-22 | não se aplica | não se aplica | não se aplica | Fora do escopo: contato com empresas dentro da plataforma |
| RF-23 | não se aplica | não se aplica | não se aplica | Fora do escopo nesta versão: envio de desafios de empresas |
| RF-24 | não se aplica | não se aplica | não se aplica | Fora do escopo: chat |
| RF-25 | não se aplica | não se aplica | não se aplica | Fora do escopo: videochamada |
| RF-26 | US-26 | TELA-05 | `lessons.youtube_video_id` | Implementado no código: hospedagem fora; YouTube incorporado dentro |
| RF-27 | não se aplica | não se aplica | não se aplica | Fora do escopo: editor de código |
| RF-28 | US-24 | TELA-16 | `lessons` | Implementado em UI/migration; RLS remota pendente |
| RF-29 | US-25 | TELA-16 | `lessons.youtube_video_id` | Implementado: hosts/formats allowlisted e só ID persistido |
| RF-30 | US-25 | TELA-16 | Metadados de vídeo; persistência só após salvar a aula | Parcial: Edge Function implementada; Data API key necessária para publicar |
| RF-31 | US-26 | TELA-05, TELA-19 | `lessons.youtube_video_id` | Implementado em `YouTubePlayer.jsx` |
| RF-32 | US-27, US-29 | TELA-18, TELA-19 | `live_sessions`, vínculo `recording_lesson_id` a `lessons` | Implementado em UI/migration; RLS remota pendente |
| RF-33 | US-28 | TELA-19 | `live_sessions`, `enrollments` | Implementado em UI/RLS versionada; exige enrollment ativo |
| RF-34 | US-29 | TELA-18, TELA-19 | `live_attendance` (nome proposto) | Implementado via RPC de presença; RLS remota pendente |
| RF-35 | US-30 | TELA-17 | RPCs Admin/Instrutor, `profiles`, `enrollments`, `mentor_students` | Implementado via duas RPCs; testes RLS escritos e ainda não executados |
| RF-36 | US-31 | Todas as telas autenticadas | não se aplica (controle de navegação; RLS/RPC no servidor) | Implementado em rotas/sidebar; segurança real é RLS |
| RF-37 | US-32 | TELA-02, TELA-16, TELA-18, TELA-19 | Fixtures de demonstração | Implementado em dados demo, rotulados como exemplo |
| RF-38 | US-26 | TELA-05 | `lesson_progress` | Implementado; conclusão manual |

## 3. Matriz: regras de negócio e requisitos não funcionais

| Requisito | Histórias | Tela/escopo | Tabela lógica proposta | Status no código |
|---|---|---|---|---|
| RN-01, RN-10 | US-01, US-18 | TELA-02, TELA-12 | `profiles`, `audit_log` | Implementado em migration/RPC; depende de aplicação e testes no Supabase da Altius |
| RN-02 | US-09, US-10, US-14 | TELA-06, TELA-09 | `submissions`, `submission_versions`, `feedback` | Implementado via RPC; backend remoto pendente |
| RN-03 | US-09, US-10 | TELA-06 | `submission_versions` | Implementado via versões append-only na RPC; depende de testar migration |
| RN-04 | US-09 | TELA-06 | `activities`, `submissions` | A definir com a Altius; sem política no código |
| RN-05, RN-11 | US-04, US-12, US-16, US-18, US-19, US-24, US-27, US-29 | Todas as telas com dados privados | `mentor_students`, `lessons`, `live_sessions` | Parcial: RLS/RPC versionadas; squads fora da implementação |
| RN-06 | US-13, US-14 | TELA-06, TELA-09 | `feedback`, `feedback_criteria` | Implementado; escala e critérios oficiais seguem A definir com a Altius |
| RN-07 | US-16 | TELA-10 | `mentoring_sessions` | Implementado com data e anotações |
| RN-08 | US-05, US-06, US-08 | TELA-03 a TELA-06 | `phases`, `activities`, `activity_criteria` | Parcial na landing; sem catálogo de plataforma |
| RN-09, RN-17 | US-03, US-22, US-25, US-26 | TELA-02, TELA-03, TELA-05, TELA-14, TELA-16 | Nenhuma para sessão demo; `lessons.youtube_video_id` | Parcial no demo atual; regra de ID planejada |
| RN-12, RN-16 | US-26, US-28 | TELA-05, TELA-19 | `lessons`, `live_sessions`, `enrollments` | Implementado em migration; precisa aplicação e teste no Supabase |
| RN-13 | US-25, US-26 | TELA-16, TELA-05 | `lessons.youtube_video_id` | Implementado |
| RN-14, RN-18 | US-27 a US-29 | TELA-18, TELA-19 | `live_sessions` | Implementado em código/migration; backend remoto pendente |
| RN-15 | US-30 | TELA-17 | RPC de Instrutor; leitura limitada | Implementado em migration; depende de testes no servidor |
| RNF-01, RNF-10 | US-04, US-12, US-18, US-19, US-24, US-27 a US-31 | Todas as telas protegidas | Policies RLS para tabelas expostas | Migration versionada; aplicação e testes no Supabase pendentes |
| RNF-02 | US-04, US-18, US-24 a US-31 | Acesso ao banco | Políticas RLS em tabelas Supabase expostas | Migration e testes SQL versionados em `supabase/`; ainda não executados |
| RNF-03 | US-01 a US-04, US-16, US-24 a US-30 | Transversal | `profiles`, `audit_log` e política de retenção, se aplicável | Parcial como decisão em `CLAUDE.md`; controles não implementados |
| RNF-04 | Todas | Todas as telas | não se aplica | Parcial como diretriz; área logada sem auditoria de acessibilidade |
| RNF-05 | US-05 a US-21, US-24 a US-31 | TELA-03 a TELA-21 | não se aplica | Implementado como layout mobile first; requer validação manual de acessibilidade |
| RNF-06 | US-05 a US-21, US-24 a US-31 | Transversal | não se aplica | Planejado; metas e medições não definidas |
| RNF-07 | Todas as telas com persistência | Backend/operação | Backup e recuperação, não tabela de produto | Planejado; serviço e metas não definidos |
| RNF-08 | US-18, US-19, US-24, US-27, US-29 | TELA-12, TELA-16, TELA-18 | `audit_log`, `attendance` | Implementado em migration; execução remota pendente |
| RNF-09 | US-02 a US-04 | TELA-02, TELA-03 | Segredos no backend; sessão demo transitória | Parcial: demo bloqueada em build de produção |
| RNF-11 | US-18, US-30 | TELA-12, TELA-17 | `audit_log`, RPCs com `SECURITY DEFINER`/`search_path` fixo | Implementado em migration e testes pendentes de execução |
| RNF-12 | US-25, US-26 | TELA-05, TELA-16 | `lessons.youtube_video_id` | Implementado |

## 4. Tabelas lógicas propostas

O esquema abaixo existe como migration versionada, mas ainda não foi aplicado no projeto Supabase da Altius. Confira a migration antes de editar o modelo.

| Nome lógico | Finalidade candidata | Decisões pendentes |
|---|---|---|
| `profiles` | Papel e dados mínimos do perfil associado à identidade de autenticação | Campos, id da identidade, acesso, idade mínima e retenção |
| `mentor_students` | Relação entre Mentor e Aluno | Cardinalidade, vigência, histórico e quem altera; Instrutor sem leitura/escrita |
| `enrollments` | Situação/vínculo de matrícula e autorização de acesso | Campos e níveis de acesso; Instrutor sem leitura/escrita |
| `phases`, `learner_journeys`, `phase_progress` | Fases e progresso individual | Fonte de verdade da fase, calendário versus conclusão e exceções |
| `learning_tracks`, `track_modules`, `lessons`, `lesson_progress` | Trilhas, módulos, aulas e progresso | `lessons` inclui `youtube_video_id`, `created_by`, `status`, `axis`, `position`; `video_url` é substituído. Outros campos e exclusão ficam a definir. |
| `live_sessions` | Sessões `meeting` ou `youtube_live` | Inclui `mode`, `meeting_url`, `youtube_video_id`, `created_by`, `status`; adicionar início e vínculo posterior a uma aula de gravação. |
| `live_attendance` | Presença por sessão/aluno | Nome e campos propostos; definir correção e retenção. Instrutor só marca nas próprias aulas. |
| `activities`, `activity_criteria` | Atividades, prazos e critérios de revisão | Autoria do conteúdo, pesos, versões de critérios e regras de prazo |
| `submissions`, `submission_versions` | Estado da entrega e versões imutáveis | Formatos, armazenamento, exclusão legal, limite/retention e status |
| `feedback`, `feedback_criteria` | Devolutiva e avaliações ligadas a uma versão | Escalas, autoria, rascunho, edição e visibilidade |
| `squads`, `squad_members`, `squad_activities` | Grupos, participantes e atividades coletivas | Composição, heterogeneidade, autoria e troca de integrantes |
| `competencies`, `competency_assessments` | Competências e evidências de evolução | Rubrica, escala, responsável pela avaliação e apresentação |
| `mentorship_sessions` | Data e anotações de mentoria | Acesso, edição, retenção e tratamento de observações pessoais |
| `interview_simulations`, `interview_feedback` | Simulação e feedback estruturado | Critérios, formato, gravação (não presumida) e retenção |
| `notifications` | Avisos in-app ligados a eventos autorizados | Leitura, descarte, retenção e geração idempotente |
| `audit_log` | Registro de operações críticas, incluindo promoção a Mentor/Instrutor | Conteúdo mínimo, acesso e retenção; escrita por operação privilegiada autorizada. Instrutor sem leitura/escrita. |
| `checkout_orders` | Possível registro de pedidos do checkout | Fora do modelo acadêmico; depende do backend de pagamento e decisão específica |

### Limites de segurança a preservar na modelagem

- Não colocar `service_role` nem credenciais privilegiadas em código cliente ou variáveis `VITE_*`.
- Aplicar RLS para cada tabela exposta, negar por padrão e validar acesso por `auth.uid()`, papel, autoria e matrícula; revisar funções e policies com testes de acesso.
- Funções `SECURITY DEFINER` precisam de `search_path` fixo, checagem de papel no servidor, saída mínima por função e grants restritos.
- Instrutor não tem `SELECT` direto em `profiles` de outros usuários; recebe lista limitada por RPC. Não pode escrever em `mentor_students`, `enrollments` ou `audit_log`.
- Separar identidade Supabase de perfil operacional no modelo.
- Definir retenção, exclusão e trilha de auditoria em conformidade com a política da Altius e as obrigações aplicáveis.

### Testes obrigatórios vinculados

O catálogo detalhado está em `01-levantamento-requisitos.md` (`TST-RLS-01` a `TST-RLS-09`). Os testes estão versionados, mas **não executados** neste ambiente porque Supabase CLI/Postgres não estão disponíveis; devem rodar com sessão/JWT de cada papel no projeto local. Abrangem: Instrutor sem leitura de e-mail/perfil completo, sem aula de outro autor, sem promoção, sem escrita em `mentor_students`/`enrollments`/`audit_log`; aluno sem leitura de rascunho e sem escrita em `lessons`/`live_sessions`; sessão ao vivo limitada a usuários matriculados; promoção Admin autorizada e auditada.

## 5. Perguntas consolidadas para a Altius

Todas permanecem **A definir com a Altius** até resposta validada.

### Produto e conteúdo

1. Quais trilhas, módulos, aulas, atividades e materiais entram em cada fase? Quem os mantém?
2. Quais enunciados, prazos, critérios, pesos e escalas devem valer para cada atividade?
3. Quais critérios determinam conclusão de atividade e fase? Calendário, entregas ou decisão de mentor?
4. Como tratar atraso, envio vazio, reenvio, entrega aprovada que precise correção e atividade sem avaliador?
5. Como definir a evolução nas seis competências e quais evidências podem sustentá-la?
6. Quais indicadores de adoção/experiência são úteis e que limites evitam confundir atividade na plataforma com aprendizagem?

### Operação

7. Como alunos são inscritos, selecionados e vinculados ao programa? Quais dados mínimos são necessários?
8. Quem pode ser Admin e quais membros da equipe precisam de acesso operacional?
9. Como promover, suspender ou remover Mentor? Como manter histórico dessas mudanças?
10. Como são associados mentores e alunos? Que regra de acesso é necessária em substituições e desligamentos?
11. Como formar squads heterogêneos, quem os monta e como tratar autoria e avaliação individual/coletiva?
12. Como deve funcionar a fila do mentor e qual prazo de revisão é esperado?
13. Quais campos além de data e anotações são necessários no registro da mentoria? Quem pode ler e corrigir?
14. Como funcionam os formatos, critérios e feedback das simulações com live coding e fit cultural? Quais ferramentas externas são usadas?
15. Quais eventos geram notificação, e como estados lida/não lida/arquivada devem funcionar?

### Tecnologia, segurança e privacidade

16. Qual projeto Supabase será usado, quem administrará ambientes/credenciais e como serão revisados migrations, grants, RLS, RPCs e Edge Functions?
17. Haverá upload de arquivos? Quais formatos, limites, retenção, verificação e controles de acesso serão necessários?
18. Qual base legal, aviso de privacidade, canal de direitos, prazo de retenção e processo de resposta a incidentes se aplicam?
19. Participam menores de idade? Se sim, que avaliação e medidas adicionais de proteção são necessárias?
20. Que metas de disponibilidade, backup, recuperação, auditoria e desempenho são exigidas antes de produção?
21. Qual conteúdo e quais dados são autorizados para a demonstração? Como apagar/resetar os dados temporários?
22. Qual allowlist de hosts YouTube deve estar em `src/config/video.js` e quem poderá ampliá-la?
23. OEmbed pode pré-preencher título/miniatura, mas qual mecanismo autorizado (YouTube Data API/Edge Function) será usado para consultar status de incorporação e privacidade? Qual segredo/credencial fica no servidor?
24. Quais campos da lista completa de alunos Admin são necessários? Confirmar que a RPC Instrutor retorna apenas nome, fase, progresso e última atividade.
25. Quais estados além de `scheduled`/`cancelled` são necessários em `live_sessions`; quem pode ver, editar e vincular gravações?
26. Como representar matrícula em `enrollments` para autorizar leitura de sessão e preservar visibilidade de sessões canceladas?
27. Quais dados e campos são necessários para marcar presença, e quem corrige presença já registrada?
28. A Altius confirmará o canal oficial de YouTube e a instrução de não usar vídeos confidenciais, já que “Não listado” é acessível por quem possui o link?

## 6. Glossário

| Termo | Definição usada nesta especificação |
|---|---|
| Aluno | Participante do Altius Directio; perfil inicial de todo cadastro real conforme regra solicitada. |
| Admin | Perfil com ações administrativas a definir, incluindo promoção de Mentor e associação de acompanhamento. |
| Instrutor | Perfil de professor que gerencia aulas/sessões próprias e recebe lista de alunos limitada por política. |
| Atividade | Unidade de trabalho associada à jornada; enunciado, prazo e critérios são definidos pela Altius. |
| Competência | Uma das seis competências associadas ao Future of Jobs Report 2025 no documento do produto. |
| Egresso | Pessoa que concluiu ou percorreu uma jornada semelhante; perfil para pesquisa, não papel de acesso definido. |
| Eixo | Termo a esclarecer com a Altius; não é tratado como sinônimo de fase ou competência sem validação. |
| Entrega | Evidência submetida pelo aluno para uma atividade, com versões e feedback quando aplicáveis. |
| Feedback | Comentários e avaliações do mentor associados a uma entrega ou simulação. |
| Fase | Uma das quatro etapas temporais do programa: Explorar, Desenvolver, Aplicar ou Decolar. |
| Mentor | Profissional que acompanha alunos e pode revisar entregas conforme associação e permissão. |
| Mentoria | Acompanhamento descrito como quinzenal; a especificação registra somente data e anotações até nova definição. |
| Módulo | Agrupamento de conteúdo dentro de uma trilha; estrutura detalhada a definir. |
| Vídeo-aula | Aula cadastrada cuja reprodução vem de vídeo YouTube incorporado; plataforma não hospeda o arquivo de vídeo. |
| Aula ao vivo | Sessão em modo `meeting` ou `youtube_live`, visível a usuário autenticado e matriculado conforme status. |
| oEmbed | Endpoint de metadados usado para tentar obter título e miniatura de um link incorporável; não é autorização nem prova conclusiva de playback. |
| Não listado | Configuração de visibilidade do YouTube em que qualquer pessoa com o link pode assistir/compartilhar; não equivale a confidencialidade. |
| RLS | Row Level Security: políticas de segurança por linha em tabelas PostgreSQL, quando Supabase/Postgres for escolhido. |
| Squad | Grupo de trabalho de alunos; o pedido atual descreve squads heterogêneos, cuja composição e regras devem ser validadas. |
| Trilha | Sequência personalizada de conteúdo técnico/comportamental em módulos progressivos. |
| Versão da entrega | Registro imutável de um envio. Correções geram nova versão, regra proposta a validar. |
| Entrevista simulada | Exercício técnico/comportamental previsto pelo programa; live coding e fit cultural foram indicados no pedido atual. |

## 7. Inconsistências e diferenças encontradas

### Código versus documentos

1. **Login simulado versus indisponibilidade:** A autenticação real requer configuração externa de Supabase; o formulário fica bloqueado sem ela e a sessão demo é separada, habilitada apenas por `VITE_DEMO_MODE` em desenvolvimento.
2. **Perfis da demo:** a demo atual contempla Aluno, Mentor, Instrutor e Admin.
3. **Etapa de autenticação:** há adaptador Supabase Auth real, mas o serviço ainda não está configurado no ambiente da Altius; demo local não substitui autenticação de produção.
4. **Supabase:** migration, RLS e RPCs estão versionadas em `supabase/`; ainda precisam ser aplicadas e validadas em projeto da Altius.
5. **Módulos do programa versus telas:** `docs/directio-produto.md` descreve trilhas, projetos, simulações, mentoria e dashboard como oferta do programa. A jornada, atividade, entrega e revisão estão implementadas no frontend; trilhas personalizadas e squads seguem fora da versão atual ou aguardam definição.

### Documentos versus informações do programa

1. `docs/directio-produto.md` lista projetos em grupo, mas não especifica **squads heterogêneos**. Esse qualificativo vem do pedido atual e precisa de confirmação operacional.
2. O documento do produto descreve simulações técnicas/comportamentais e feedback estruturado, mas não detalha **live coding** nem **fit cultural**. Esses elementos vieram do pedido atual; critérios e formato continuam em aberto.
3. O documento do produto menciona projeto real em empresa e conexão com parceiros, enquanto o escopo atual exclui contato com empresas e envio de desafios empresariais pela plataforma. A especificação trata isso como diferença entre atividade do programa e funcionalidade digital autorizada nesta versão, não como permissão para criar módulo de desafios.
4. O produto descreve “conclusão” e trajetória em fases, mas não fornece critérios de aprovação/avanço, prazos por atividade, escalas de avaliação, dados de métricas nem política de atraso. Não foram inventados.
5. O pedido atual define Instrutor, vídeo-aulas YouTube e aulas ao vivo; `docs/directio-produto.md` não descreve esse perfil, o uso do YouTube, estados de sessão ou presença. Esses requisitos atualizam o escopo, mas os detalhes operacionais continuam para validação.
6. O pedido solicita detectar vídeos privados/sem incorporação via oEmbed; oEmbed, por si só, não comprova `status.embeddable`/`privacyStatus` nem garante playback. A documentação oficial do YouTube Data API sinaliza que `status.embeddable` existe e que políticas/claims ainda podem bloquear reprodução.

## 8. Suposições e lacunas

- As tabelas e policies estão definidas na migration; ainda falta aplicá-las no ambiente Supabase da Altius.
- Estados de código foram conferidos no checkout disponível e podem divergir de branches ou ambientes que não foram enviados.
- Perguntas sem resposta e decisões pendentes estão marcadas **A definir com a Altius**; propostas de processo são **Hipóteses a validar**.
- As regras estão implementadas em SQL versionado, mas sua implantação e os testes RLS ainda são pendentes. A documentação não substitui revisão de segurança server-side.
