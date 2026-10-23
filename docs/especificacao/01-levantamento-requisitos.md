# 01 — Levantamento de requisitos

> **Status do documento:** primeira especificação, sujeita a entrevistas e validação da Altius.  
> **Base:** `CLAUDE.md`, `docs/directio-produto.md`, prompts anteriores da plataforma, e inspeção do código atual em `src/`. O projeto inclui adapters Supabase, migration inicial e testes RLS versionados; não contém credenciais nem projeto Supabase configurado/aplicado.

## 1. Contexto e problema

O Altius Directio é um programa de capacitação em tecnologia com trajetória de 12 meses, organizada em quatro fases, currículo associado a seis competências do Future of Jobs Report 2025, trilhas personalizadas, atividades práticas, projetos, simulações de processos seletivos e mentoria. Os documentos descrevem a metodologia e a jornada do programa, mas não especificam uma plataforma própria para centralizar contas, conteúdos, progresso, entregas e feedbacks.

O código atual mantém a landing e o checkout e inclui uma plataforma com autenticação Supabase por adaptador, modo de demonstração, jornada, atividades, entregas, mentoria, administração e aulas. Sem credenciais de Supabase, login/cadastro/Apple/recuperação reais ficam bloqueados; os dados da demo são exemplos. O schema/RLS foi versionado, mas depende de aplicação e testes no projeto da Altius.

O problema descrito acima é uma **hipótese de produto** a validar com a equipe Altius, mentores, alunos e egressos potenciais. O documento do produto não descreve em detalhe os processos atuais de distribuição de conteúdo, acompanhamento ou avaliação.

### Base curricular documentada

| Fase | Período | Itens descritos em `docs/directio-produto.md` |
|---|---|---|
| Explorar | Meses 1–2 | Assessment de perfil; fundamentos de TI; autoconhecimento; plano individual |
| Desenvolver | Meses 3–5 | Trilhas de hard skills; workshops de soft skills; projetos em grupo; mentoria quinzenal |
| Aplicar | Meses 6–9 | Projeto real em empresa; hackathon interno; simulação de entrevista; portfólio técnico |
| Decolar | Meses 10–12 | LinkedIn & branding; conexão com parceiros; processo seletivo real; onboarding de carreira |

Esses itens descrevem o programa, não especificam atividades/tarefas cadastradas na plataforma. Enunciados, datas e critérios continuam **A definir com a Altius**.

## 2. Objetivos e indicadores propostos

Os indicadores abaixo são sugestões para descobrir se a plataforma ajuda o programa. São **Hipóteses a validar**; não há metas quantitativas aprovadas nem resultados de pesquisa disponíveis.

| Objetivo | Indicador possível | Status da definição |
|---|---|---|
| Ajudar o aluno a entender sua fase atual e próximos passos | Alunos que conseguem identificar fase, progresso e próxima atividade | Hipótese a validar; definir método e meta com a Altius |
| Reunir atividades e entregas da jornada | Atividades iniciadas e entregas enviadas ao longo do programa | Hipótese a validar; definir eventos, período e meta com a Altius |
| Tornar a revisão de entregas acompanhável | Tempo entre envio e feedback, e entregas aguardando revisão | Hipótese a validar; definir política e meta com a Altius |
| Dar visibilidade à evolução nas competências | Registros de avaliação e evolução por competência | Hipótese a validar; definir escala, evidência e periodicidade com a Altius |
| Apoiar a rotina de mentoria quinzenal | Registros de encontros previstos e realizados | Hipótese a validar; confirmar como a Altius quer acompanhar a rotina |

Não se propõem valores-alvo neste documento. Também não se presume que métricas de uso, isoladamente, representem aprendizagem ou empregabilidade.

## 3. Stakeholders e perfis de usuário

| Perfil | Papel no produto | Necessidades a investigar | Situação no código |
|---|---|---|---|
| Aluno | Participa da jornada, estuda, realiza atividades e recebe feedback | Entender prioridades, enviar trabalho, acompanhar avaliação e próximos passos | Há jornada, atividade, entrega e feedback no frontend/demo; uso real depende de Supabase configurado |
| Mentor | Acompanha alunos, revisa entregas e registra mentoria | Consultar alunos atribuídos, revisar evidências e registrar orientações | Fila de revisão e registro de mentoria implementados; backend remoto pendente |
| Instrutor | Professor que cadastra e edita vídeo-aulas e aulas ao vivo que criou, consulta lista limitada de alunos e marca presença nas aulas que criou | Gerenciar conteúdo próprio sem acessar e-mail, mentor, matrícula ou dados administrativos vedados | Papel e telas implementados; segurança depende de aplicação/teste RLS no Supabase |
| Admin | Administra perfis e associações de mentoria | Promover mentores, associar mentores e alunos, acompanhar visão geral | Telas, operações administrativas e RPCs versionadas; migration ainda não aplicada no ambiente Altius |
| Equipe Altius | Define conteúdo, operação, critérios e governança do programa | Configurar atividades, acompanhar a execução, apoiar usuários e atender obrigações de privacidade | Perfil operacional não está especificado nem implementado; permissões e responsabilidades a definir com a Altius |
| Egresso potencial | Pessoa que concluiu o programa ou pode relatar uma jornada recente | Compartilhar contexto sobre acompanhamento e transição após o programa | Perfil de pesquisa, não perfil de acesso definido; hipótese a validar |

**Observação de autorização:** os papéis e guardas em React organizam a navegação, mas não protegem dados. Um backend deverá autorizar cada leitura e escrita por usuário, relação de mentoria e papel; a política exata de acesso é **A definir com a Altius**.

## 4. Requisitos funcionais

Legenda de status conferido no código:

- **Implementado:** comportamento funcional encontrado no código atual.
- **Parcial:** existe parte do fluxo, estrutura ou interface, mas o requisito ainda não pode ser usado integralmente.
- **Planejado:** não foi encontrado comportamento correspondente no código.
- **Fora do escopo:** excluído explicitamente do escopo solicitado.

| ID | Módulo | Requisito | Prioridade proposta | Status no código e evidência |
|---|---|---|---|---|
| RF-01 | Autenticação | Permitir cadastro por e-mail, atribuindo o papel inicial de Aluno. | Must | **Implementado com configuração externa pendente** — cadastro via Supabase Auth e trigger cria `student`; sem URL/chave Supabase o botão permanece bloqueado. |
| RF-02 | Autenticação | Permitir login por e-mail e Apple através de adaptador de autenticação. | Must | **Implementado com configuração externa pendente** — adaptador REST suporta senha e Apple OAuth; provedor Apple precisa de configuração no Supabase. |
| RF-03 | Autenticação | Permitir recuperação de senha através do serviço de autenticação. | Must | **Implementado com configuração externa pendente** — recuperação e redefinição de senha usam Supabase Auth quando configurado. |
| RF-04 | Perfis e autorização | Manter os papéis `student`, `mentor`, `instructor` e `admin`; todo cadastro real começa como `student`. Restringir recursos no servidor por papel, autoria e vínculo. | Must | **Parcial** — quatro papéis e guards de navegação estão no frontend; migration/RLS/RPC estão versionadas, mas precisam ser aplicadas e testadas no projeto Supabase. |
| RF-05 | Demonstração | Disponibilizar acesso simulado a Aluno, Mentor e Admin somente com `VITE_DEMO_MODE=true`, nunca em build de produção, identificando dados de exemplo. | Must | **Implementado** — os quatro perfis, faixa fixa, logs e exemplos são habilitados somente por `VITE_DEMO_MODE=true` fora de produção; a sessão da demo não é Auth real. |
| RF-06 | Estudo | Apresentar trilhas personalizadas, módulos e aulas associados ao plano do aluno. | Must | **Planejado** — não há conteúdo de estudo ou modelo correspondente em `src/`. Estrutura, associação ao diagnóstico e regras de conclusão são **A definir com a Altius**. |
| RF-07 | Jornada | Mostrar as fases Explorar (meses 1–2), Desenvolver (meses 3–5), Aplicar (meses 6–9) e Decolar (meses 10–12), com fase atual, progresso e próximos passos. | Must | **Implementado** — `/app` exibe quatro fases, fase atual, aprovadas/progresso e próxima fase; rótulos são exatos e itens sem conteúdo detalhado usam placeholders. |
| RF-08 | Atividades | Exibir atividades e entregas associadas às fases, com enunciado, critérios de avaliação e prazo. Onde faltarem dados, exibir “A definir com a Altius”. | Must | **Implementado com placeholders** — atividades seguem os itens publicados do programa; enunciado, critérios e prazo mostram “A definir com a Altius” quando não informados. |
| RF-09 | Entregas | Permitir envio de texto e/ou link, manter histórico de versões e preservar cada versão enviada como imutável. Upload de arquivo somente após integração por adaptador de storage. | Must | **Implementado para texto/link** — RPC acrescenta versões e não permite edição direta de entregas; upload continua não configurado e é informado na tela. |
| RF-10 | Entregas | Exibir estados da atividade/entrega: não iniciada, em andamento, enviada, em revisão, com feedback, aprovada e ajustes pedidos. | Must | **Implementado no modelo/UI** — os sete estados estão disponíveis; seus dados reais dependem de operação e uso. |
| RF-11 | Squads | Permitir organizar alunos em squads heterogêneos e associar atividades/entregas de squad aos participantes autorizados. | Should | **Planejado** — não há conceito de squad no código nem modelo no banco. Composição, visibilidade da entrega, autoria e avaliação individual/coletiva são **A definir com a Altius**. A heterogeneidade é informação fornecida no pedido e requer confirmação operacional. |
| RF-12 | Revisão e feedback | Permitir ao mentor atribuído revisar uma entrega, avaliar critérios, escrever comentários e aprovar ou pedir ajustes. | Must | **Implementado** — fila e tela do Mentor/Admin permitem iniciar revisão, avaliar critérios, comentar, aprovar, enviar feedback ou pedir ajustes; escala não presumida. |
| RF-13 | Revisão e feedback | Exibir feedback, notas/avaliações por critério e comentários na própria atividade; permitir novo envio quando houver pedido de ajustes. | Must | **Implementado** — feedback e avaliação por critério aparecem na atividade; dados e escala oficiais continuam **A definir com a Altius**. |
| RF-14 | Competências | Apresentar progresso nas seis competências: Pensamento Analítico; IA & Big Data; Programação & Sistemas; Flexibilidade & Resiliência; Colaboração & Empatia; Liderança & Networking. | Should | **Parcial** — seis competências aparecem no painel, com valores de demonstração rotulados; método de mensuração real é **A definir com a Altius**. |
| RF-15 | Mentoria | Registrar a mentoria quinzenal com data e anotações, vinculada ao aluno e ao mentor autorizado. | Must | **Implementado** — Mentor registra data e anotações na tela de mentoria; nenhum outro detalhe de formato foi inventado. |
| RF-16 | Entrevista simulada | Apoiar registro/acompanhamento de simulação de entrevista com live coding e fit cultural, com feedback estruturado. | Should | **Planejado** — não há fluxo ou componente correspondente no código. Roteiro, critérios, modalidade, armazenamento e acesso aos registros são **A definir com a Altius**. Live coding e fit cultural vêm do pedido atual; seus detalhes não estão descritos em `docs/directio-produto.md`. |
| RF-17 | Administração | Permitir ao Admin promover usuários a Mentor ou Instrutor por RPC segura, associar mentores a alunos e consultar visão geral completa. Registrar promoções no `audit_log`. | Must | **Implementado no código; Supabase pendente de aplicação** — UI Admin, promoção RPC/audit_log, associação de mentor e visão geral têm adapters/telas e migration. |
| RF-18 | Notificações | Notificar o aluno dentro da plataforma quando um feedback chegar e permitir abrir a atividade relacionada. | Should | **Implementado** — feedback cria notificação in-app com link para a atividade; políticas de retenção seguem **A definir com a Altius**. |
| RF-19 | Terminal de demonstração | Oferecer terminal retrátil e discreto na área logada, com logs simulados claramente rotulados como exemplo. | Could | **Implementado** — terminal retrátil no rodapé mostra rota, perfil e fonte de dados, sempre com rótulo `[exemplo]`. |
| RF-20 | Checkout existente | Preservar a rota `/checkout` da landing no mesmo projeto. | Must para preservação do site | **Parcial** — rota e fluxo visual existem; confirmação de pagamento fica bloqueada sem preço/provedor configurados, conforme `CLAUDE.md`. |
| RF-21 | Fora do escopo | Disponibilizar quadro de vagas dentro da plataforma. | Won’t | **Fora do escopo** — exclusão explícita do pedido. |
| RF-22 | Fora do escopo | Disponibilizar funcionalidade de contato com empresas dentro da plataforma. | Won’t | **Fora do escopo** — exclusão explícita do pedido; canais de contato da landing permanecem distintos. |
| RF-23 | Fora do escopo | Enviar desafios de empresas pela plataforma. | Won’t | **Fora do escopo** — v2, conforme instrução anterior; projetos do programa não significam módulo de desafios nesta versão. |
| RF-24 | Fora do escopo | Disponibilizar chat entre participantes dentro da plataforma. | Won’t | **Fora do escopo** — exclusão explícita do pedido. |
| RF-25 | Fora do escopo | Disponibilizar videochamada na plataforma. | Won’t | **Fora do escopo** — exclusão explícita do pedido. |
| RF-26 | Vídeo-aulas | Hospedar vídeos continua fora do escopo; exibir vídeos do YouTube incorporados está dentro do escopo. | Should | **Implementado no código** — cadastro, validação, player e conclusão manual; hospedagem própria permanece fora do escopo. |
| RF-27 | Fora do escopo | Oferecer editor de código na plataforma. | Won’t | **Fora do escopo** — exclusão explícita do pedido. |
| RF-28 | Conteúdo de aulas | Permitir que Admin crie/edite qualquer aula e Instrutor crie/edite somente aulas de que é autor; suportar rascunho/publicada, eixo e ordenação. Aluno e Mentor leem apenas aulas publicadas. | Must | **Implementado no código; precisa aplicar a migration** — Admin gerencia todas, Instrutor apenas próprias; tabela e RLS em `supabase/migrations`. |
| RF-29 | Vídeo-aulas | Aceitar apenas hosts allowlist configurados em `src/config/video.js` e formatos `watch?v=`, `youtu.be/`, `shorts/` e `embed/`; validar ID com `/^[A-Za-z0-9_-]{11}$/` e persistir somente `lessons.youtube_video_id`. | Must | **Implementado** — parser allowlist valida formatos/ID; API persiste apenas `youtube_video_id`, nunca o link digitado. |
| RF-30 | Vídeo-aulas | Ao colar link, tentar obter título/miniatura por oEmbed e verificar restrições. Se navegador bloquear, usar Edge Function. Sem backend ou verificação conclusiva, avisar “não foi possível verificar” e permitir salvar como rascunho. Mostrar instruções do YouTube Studio e aviso de confidencialidade em `src/content/admin.js`. | Should | **Parcial com configuração externa pendente** — oEmbed e Edge Function existem; verificação de publicação requer `YOUTUBE_DATA_API_KEY` no servidor. |
| RF-31 | Player | Usar iframe `https://www.youtube-nocookie.com/embed/{ID}?rel=0&modestbranding=1`, `title` descritivo, `allowfullscreen`, `loading="lazy"`, `referrerpolicy="strict-origin-when-cross-origin"`, razão 16:9 responsiva e fallback “Não foi possível carregar o vídeo aqui” com link “Assistir no YouTube” derivado do ID. | Must | **Implementado** — player e fallback ficam em `src/features/lessons/YouTubePlayer.jsx`. |
| RF-32 | Aulas ao vivo | Permitir Admin e Instrutor autor criarem/editar sessões `meeting` (URL HTTPS) ou `youtube_live` (ID YouTube), agendar em `America/Sao_Paulo`, atualizar status e vincular depois uma aula de gravação já cadastrada. | Must | **Implementado no código; RLS pendente de aplicação** — sessão meeting/YouTube Live, cancelamento e gravação vinculada. |
| RF-33 | Aulas ao vivo | Exibir sessão somente a autenticados matriculados; mostrar horário em São Paulo; oferecer “Entrar na aula” em `meeting`, mesmo player em `youtube_live`, aviso “A transmissão começa em dd/mm às hh:mm” antes do início e estado cancelado sem ocultar sessão. Sem chat. | Must | **Implementado no código; requer enrollment/configuração** — timestamps e links são exibidos em São Paulo; RLS restringe registros a matriculados. |
| RF-34 | Presença | Permitir Admin ou Instrutor dono marcar presença apenas nas aulas que criou ou administra. | Should | **Implementado** — Admin/Instrutor dono marca presença via RPC; policy nega outras pessoas. |
| RF-35 | Lista de alunos | Fornecer RPCs `SECURITY DEFINER` com `search_path` fixo: Admin recebe colunas completas da lista; Instrutor recebe somente nome, fase, progresso e última atividade. Instrutor não consulta diretamente profiles de outros alunos. | Must | **Implementado no código; migration pendente de aplicação** — RPCs separadas retornam lista Admin completa ou os quatro campos permitidos ao Instrutor. |
| RF-36 | Navegação por perfil | Mostrar sidebar por papel. `/app/admin/aulas`, `/app/ao-vivo` e `/app/alunos` aceitam Admin/Instrutor; `/app/admin` (visão geral completa), `/app/mentores` e `/app/equipe` somente Admin. | Must | **Implementado** — sidebar/guards por papel; RLS permanece a barreira de segurança real. |
| RF-37 | Demonstração | Incluir um perfil Instrutor, três vídeo-aulas com IDs claramente marcados como exemplo, uma sessão `meeting` e uma `youtube_live`. | Should | **Implementado** — demo tem Instrutor, três IDs YouTube sintéticos, uma meeting e uma transmissão rotulados como exemplo. |
| RF-38 | Progresso da aula | Botão “Marcar como concluída” é acionado manualmente pelo aluno. Fim de vídeo pode apenas destacar o botão; nunca concluir automaticamente. | Should | **Implementado** — botão manual grava conclusão; player não conclui automaticamente. |

As prioridades MoSCoW são uma **proposta inicial — Hipótese a validar** com a Altius. “Must” não significa que a funcionalidade já esteja implementada.

## 5. Requisitos não funcionais

| ID | Categoria | Requisito | Prioridade proposta | Status no código e observações |
|---|---|---|---|---|
| RNF-01 | Segurança | Aplicar autorização no servidor para cada usuário, papel e vínculo; não confiar em guards do frontend. | Must | **Parcial** — Auth e RLS/RPC estão implementadas em adaptadores/migration, mas precisam de configuração e validação no projeto Supabase da Altius. |
| RNF-02 | Segurança | Usar Supabase/Postgres com RLS nas tabelas expostas, negar por padrão e testar políticas por papel, autoria e matrícula; nunca expor `service_role` no cliente. | Must | **Parcial** — migration e teste SQL estão versionados em `supabase/`, ainda não aplicados/executados no Supabase da Altius. |
| RNF-03 | Privacidade/LGPD | Definir finalidade e base legal, transparência, minimização, retenção/descarte, medidas de segurança, atendimento a direitos dos titulares e responsabilidades de fornecedores antes de usar dados reais. Avaliar o tratamento se houver menores e o melhor interesse aplicável. | Must | **Parcial como decisão documentada** em `CLAUDE.md`; controles e processos técnicos/operacionais não implementados. A aplicação concreta requer validação jurídica e operacional da Altius. |
| RNF-04 | Acessibilidade | Oferecer navegação por teclado, foco visível, estrutura semântica e contraste AA; respeitar `prefers-reduced-motion`. | Must | **Implementado no frontend** — layout, foco visível, navegação por teclado e movimento reduzido; requer auditoria manual com tecnologias assistivas. |
| RNF-05 | Responsividade | Projetar mobile first para aluno, mentor, instrutor e admin. | Must | **Implementado no frontend** — layout responsivo mobile first; validar nos dispositivos-alvo. |
| RNF-06 | Desempenho | Definir e medir metas de carregamento e interação para dispositivos e conexões relevantes ao público. | Should | **Planejado** — metas, perfis de teste e instrumentação são **A definir com a Altius**; não inventar limites numéricos. |
| RNF-07 | Disponibilidade e recuperação | Definir disponibilidade esperada, backup, restauração e resposta a incidentes para dados reais. | Must antes de produção | **Planejado** — depende da escolha do backend e de operação definida pela Altius; metas são **A definir com a Altius**. |
| RNF-08 | Auditoria | Registrar ações relevantes de administração, mudança de papel, associação, envio e revisão, com acesso restrito e retenção definida. | Should | **Parcial** — migration registra promoção e eventos administrativos; escopo adicional, prazo de retenção e acesso são **A definir com a Altius**. |
| RNF-09 | Configuração segura | Manter credenciais privilegiadas fora do bundle do frontend e não ativar o modo demo em produção. | Must | **Parcial** — `VITE_DEMO_MODE` está documentado em `.env.example` e o código desativa a demo quando `import.meta.env.PROD` é verdadeiro. Não há segredo de backend no projeto. |
| RNF-10 | Segurança RLS | Aplicar RLS a `profiles`, `lessons`, `live_sessions`, `mentor_students`, `enrollments` e `audit_log`; limitar leitura/escrita conforme papel, autoria, matrícula e status publicado/agendado. | Must | **Parcial** — tabelas e policies estão versionadas em migration; aplicação e testes locais/remotos pendentes. |
| RNF-11 | Segurança de RPC | Funções privilegiadas devem ser `SECURITY DEFINER` com `search_path` fixo, validar `auth.uid()` e papel Admin no servidor, limitar saída por papel e gravar promoções em `audit_log`. | Must | **Parcial** — RPCs com `SECURITY DEFINER` e `search_path` fixo estão na migration; testes ainda precisam ser executados. |
| RNF-12 | Segurança e privacidade de vídeo | Persistir somente `youtube_video_id`; validar origem e ID em allowlist; construir iframe e fallback a partir do ID validado. Não tratar “Não listado” como controle de acesso ou confidencialidade. | Must | **Implementado** — parser e player derivados do ID; migration ainda precisa ser implantada. |

## 6. Regras de negócio

| ID | Regra | Status |
|---|---|---|
| RN-01 | Todo cadastro real começa com o papel Aluno. Promoção para Mentor é feita por Admin autorizado. | Regra solicitada; **Planejada**, ainda sem cadastro ou promoção persistidos. O fluxo de aprovação e eventual reversão são **A definir com a Altius**. |
| RN-02 | Ciclo de entrega proposto: não iniciada → em andamento → enviada → em revisão → com feedback → aprovada ou ajustes pedidos. Após pedido de ajustes, o aluno pode enviar nova versão; a nova versão volta para revisão. | **Hipótese a validar**. Os nomes dos estados vêm do escopo solicitado anteriormente; transições, possibilidade de reabrir entrega aprovada e efeito de prazos ainda precisam de decisão. |
| RN-03 | Cada versão enviada é imutável; correções geram uma nova versão vinculada à mesma atividade. | **Hipótese a validar** de regra de integridade e auditoria; não implementada. Retenção e eventual exclusão legal são **A definir com a Altius**. |
| RN-04 | Atraso não altera automaticamente a nota nem impede envio até que a política de prazo seja definida. | **A definir com a Altius**. O documento do produto não informa prazos por atividade nem consequências de atraso. |
| RN-05 | Mentor acessa somente alunos e entregas que lhe foram associados, salvo permissão operacional explicitamente definida para Admin/equipe Altius. | **Hipótese a validar** e implementar no servidor; nenhuma associação existe no código. |
| RN-06 | Feedback deve referenciar a entrega/versão avaliada e ficar visível ao aluno autorizado na própria atividade. | **Planejada**; critérios de visibilidade, edição e histórico são **A definir com a Altius**. |
| RN-07 | O registro de mentoria inclui data e anotações, sem presumir outros campos ou formato da sessão. | Requisito solicitado; **Implementado** com data e anotações; política de visibilidade segue **A definir com a Altius**. |
| RN-08 | Conteúdo curricular deve seguir os itens e os nomes das fases/competências documentados; detalhes ausentes devem aparecer como “A definir com a Altius”. | Regra editorial solicitada; parcialmente aplicada nos documentos da landing. Conteúdo completo de atividades e avaliações não existe no projeto. |
| RN-09 | Dados da demonstração devem estar identificados como exemplo e não podem ser tratados como dados de alunos reais. | **Implementada** na faixa e terminal; os dados da demo ficam no navegador, sem banco real conectado. |
| RN-10 | `profiles.role` aceita `student`, `mentor`, `instructor` ou `admin`. Cadastro sempre cria `student`; apenas RPC autorizada por Admin pode promover para `mentor` ou `instructor`, com evento em `audit_log`. | **Planejada**; a demo atual não tem Instrutor nem banco. |
| RN-11 | Admin pode escrever qualquer registro de aula/sessão; Instrutor só pode inserir/editar registros próprios (`created_by = auth.uid()`). Instrutor não pode alterar papel, matrícula, vínculo de mentoria ou auditoria. | **Planejada**; precisa de policies e testes negativos no Supabase. |
| RN-12 | Aulas de alunos e mentores são legíveis somente quando `status = published`. Instrutores podem ler as próprias aulas em rascunho e aulas publicadas autorizadas; Admin tem acesso completo. | **Planejada**; política exata de leitura por Mentor é refletida nesta regra e deve ser validada na implementação. |
| RN-13 | A coluna `lessons.youtube_video_id` armazena apenas ID de 11 caracteres validado. URL digitada nunca é armazenada ou renderizada. IDs do player e fallback são derivados do valor validado. | **Planejada**; nenhum schema/player. |
| RN-14 | `live_sessions.mode = meeting` requer `meeting_url` HTTPS e `youtube_video_id` nulo; `youtube_live` requer ID YouTube e `meeting_url` nulo. Sessões agendadas/publicadas são visíveis a usuários autenticados matriculados; sessões canceladas permanecem visíveis como canceladas. | **Planejada**; estados completos de sessão ainda precisam de confirmação. |
| RN-15 | Instrutor consulta alunos somente por RPC que retorna nome, fase, progresso e última atividade; não tem SELECT direto em profiles de outros alunos, e-mail, Mentor, matrícula ou `audit_log`. | **Planejada**; requer função de privilégio controlado e revogação de acesso direto. |
| RN-16 | Aula `published` é visível a aluno e mentor; rascunho não é. Sessão ao vivo `scheduled` ou `cancelled` só é visível a usuário logado e matriculado. Instructor/Admin seguem as permissões específicas de leitura e autoria. | **Planejada**; requer policy RLS e checagem de matrícula. |
| RN-17 | Uma aula com vídeo guarda somente `youtube_video_id`; a URL original nunca é persistida nem renderizada. Os links de player e “Assistir no YouTube” são montados a partir do ID validado. | **Planejada**; sem schema ou componente. |
| RN-18 | Aula ao vivo `meeting` usa link HTTPS; aula `youtube_live` usa ID YouTube. `meeting_url` e `youtube_video_id` são mutuamente exclusivos conforme `mode`. Fuso de exibição é sempre `America/Sao_Paulo`. | **Planejada**; sem modelo ou política temporal. |

## 7. Testes obrigatórios de RLS e RPC

Estes são critérios de aceitação para implementação Supabase. Devem rodar com JWTs/sessões dos papéis correspondentes em ambiente local ou descartável, nunca somente com chave `service_role`, pois essa chave pode contornar RLS. Status atual: implementados em `supabase/tests/rls_roles.test.sql`, mas **não executados** neste ambiente: Supabase CLI/Postgres não estão instalados e o projeto da Altius não está configurado.

| ID | Contexto | Tentativa | Resultado obrigatório |
|---|---|---|---|
| TST-RLS-01 | Instrutor autenticado | Listar alunos pela RPC de instrutor | Retorna somente nome, fase, progresso e última atividade; sem e-mail, Mentor, situação da matrícula ou audit log. |
| TST-RLS-02 | Instrutor autenticado | Fazer SELECT direto de profiles de outros alunos ou ler/editar aula criada por outro Instrutor | Leitura de perfil e operação em aula alheia negadas; edição em aula própria aceita conforme policy. |
| TST-RLS-03 | Instrutor autenticado | Chamar RPC de promoção ou alterar `profiles.role` | Operação negada; somente Admin pode promover via RPC. |
| TST-RLS-04 | Instrutor autenticado | Inserir/alterar `mentor_students`, `enrollments` ou `audit_log` | Escrita direta negada. Promoção administrativa grava log somente pelo caminho privilegiado autorizado. |
| TST-RLS-05 | Aluno autenticado | Ler aula em rascunho ou escrever em `lessons`/`live_sessions` | Rascunho não aparece; toda escrita é negada. Aula publicada pode ser lida quando autorizada. |
| TST-RLS-06 | Aluno/mentor autenticado sem matrícula | Ler sessão ao vivo de outra matrícula | Leitura negada, inclusive para link de reunião/player. |
| TST-RLS-07 | Aluno/mentor autenticado matriculado | Ler sessão agendada/cancelada | Sessão correspondente é visível; cancelada mantém status explícito. |
| TST-RLS-08 | Admin autenticado | Promover usuário para Mentor/Instrutor pela RPC | Papel é atualizado somente para um dos papéis permitidos, a RPC grava `audit_log` e demais políticas Admin permitem as operações autorizadas. |
| TST-RLS-09 | Usuário não autenticado | Ler aula ou sessão protegida | Leitura negada; nenhum link ou ID de sessão protegida é exposto pela API. |

## Modelo de dados exigido por esta revisão

Este é o contrato documental para implementação futura, não migration existente.

| Relação | Campos/regras obrigatórias | Observação |
|---|---|---|
| `profiles` | `role` aceita `student`, `mentor`, `instructor`, `admin` | Cadastro só cria `student`; somente RPC admin pode promover para Mentor/Instrutor. |
| `lessons` | `youtube_video_id`, `created_by`, `status`, `axis`, `position` | `youtube_video_id` substitui `video_url`; persistir ID, não URL. `status` contempla rascunho/publicada. |
| `live_sessions` | `mode` (`meeting`/`youtube_live`), `meeting_url`, `youtube_video_id`, `created_by`, `status` | Campos mutuamente exclusivos por modo. Para cumprir agendamento, será necessário timestamp de início (`starts_at` — requisito derivado); para vincular gravação, referência a `lessons` (nome/campo — a definir no schema). |
| `mentor_students` | vínculo Mentor–Aluno | Instrutor não lê nem escreve. Administração apenas por Admin/RPC segura. |
| `enrollments` | vínculo de matrícula e autorização de acesso | Instrutor não lê nem altera; necessária para gate de sessões ao vivo. |
| `audit_log` | evento administrativo, ator, alvo, ação e instante | Inserção de promoção via RPC privilegiada; leitura total apenas Admin. Instrutor não acessa. |
| Presença | relação entre sessão ao vivo e aluno matriculado presente | Nome da tabela/campos, regra de correção e retenção precisam ser definidos. Instrutor só marca nas aulas que criou. |

RLS precisa permitir Admin em todos os registros da área; Instrutor somente em aulas/sessões próprias e ações de presença autorizadas; aluno e mentor somente em conteúdo publicado e sessões autorizadas pela matrícula. Restringir coluna/perfil também é necessário: RLS por linha, sozinha, não esconde colunas de e-mail/mentor em linhas que uma função consulta.

## Nota técnica sobre verificação de vídeo

Use oEmbed para tentar obter título e miniatura. Não tratar sucesso/erro do oEmbed como prova completa de privacidade ou permissão de incorporação: a API YouTube Data documenta `status.embeddable` e `status.privacyStatus`; a própria documentação avisa que políticas/claims ainda podem bloquear playback incorporado. Vídeos não listados podem ser vistos e compartilhados por qualquer pessoa com o link. Assim, quando a verificação não for conclusiva, mostrar “não foi possível verificar” e permitir apenas rascunho, conforme decisão do pedido; nunca afirmar que o vídeo está privado/protegido. O formulário deve informar: subir no YouTube Studio do canal Altius como “Não listado”, ativar “Permitir incorporação” e não usar conteúdo confidencial, pois qualquer pessoa com o link pode assistir/compartilhar.

Referências oficiais: [YouTube Data API — videos resource/status.embeddable](https://developers.google.com/youtube/v3/docs/videos), [YouTube Help — visibilidade de vídeos não listados](https://support.google.com/youtube/answer/157177).

## 8. Priorização MoSCoW proposta

Esta priorização é **Hipótese a validar** com a Altius. Ela organiza uma primeira conversa de escopo, não altera por si só as etapas aprovadas do projeto.

| Prioridade | Requisitos | Justificativa inicial |
|---|---|---|
| Must | RF-01 a RF-10, RF-12, RF-13, RF-15, RF-17, RF-28, RF-29, RF-31 a RF-33, RF-35, RF-36; RNF-01 a RNF-05, RNF-07, RNF-09 a RNF-12 | Acesso seguro, jornada/entregas e conteúdo/aulas ao vivo com controle de acesso. |
| Should | RF-11, RF-14, RF-16, RF-18, RF-26, RF-30, RF-34, RF-37, RF-38; RNF-06, RNF-08 | Squads, competências, entrevistas, notificações, metadados, presença e dados de demonstração. |
| Could | RF-19 | Terminal de demonstração é útil para apresentação, mas não substitui a jornada central. |
| Won’t (neste escopo) | RF-21 a RF-25, RF-27 | Quadro de vagas; contato com empresas dentro da plataforma; envio de desafios de empresas pela plataforma; chat; videochamada; editor de código. Hospedagem própria de vídeos continua fora do escopo (RF-26). |

## 9. Restrições, premissas e dependências

### Restrições

- Manter a plataforma como entrada principal: `/` encaminha pessoas autenticadas à área `/app` e visitantes a `/login`; preservar a página pública do programa em `/programa` e o checkout em `/checkout`.
- Área da plataforma em `/app/*`, com layouts e navegação mobile first.
- O pedido mais recente especifica Supabase/Postgres via RLS, `auth.uid()` e RPCs `SECURITY DEFINER`. A migration e os testes foram criados; implantação/revisão no projeto Supabase ainda pendem.
- Não usar dados, conteúdos, notas, critérios, prazos, depoimentos, parceiros ou resultados inventados como se fossem reais.
- Sem autenticação real e autorização de servidor/RLS, o produto não deve ser usado por alunos reais.
- O frontend não é barreira de segurança; regras de leitura e escrita precisam existir em RLS/RPCs no servidor. Guardas de rota são somente navegação.
- Fora do escopo: quadro de vagas, contato com empresas dentro da plataforma, envio de desafios empresariais, chat, videochamada, hospedagem própria de vídeos e editor de código. Exibir vídeo do YouTube incorporado está dentro do escopo (RF-26). O contato comercial da landing é uma superfície distinta; projetos aplicados não autorizam módulo de desafios nesta versão.

### Premissas explícitas

- A jornada possui quatro fases e duração de 12 meses conforme `docs/directio-produto.md`.
- A mentoria ocorre quinzenalmente; o registro solicitado nesta etapa inclui apenas data e anotações.
- Existem seis competências com os nomes indicados no documento do produto.
- O pedido atual informa squads heterogêneos e simulações com live coding e fit cultural e feedbacks estruturados; o fluxo operacional desses itens não está detalhado nos documentos do produto disponíveis.
- O pedido atual inclui regras específicas de Instrutor, YouTube, aulas ao vivo e Supabase/RLS; elas atualizam decisões anteriores nesta especificação.
- Requisitos, personas, prioridades e processos ainda precisam de entrevistas e validação; não há pesquisa com usuários registrada.

### Dependências

- URL/chave pública e projeto Supabase da Altius, configuração de Auth/Apple, aplicação da migration/RLS, segredo YouTube da Edge Function e rotina de deploy/revisão de segurança.
- Definição da Altius sobre papéis operacionais, atribuição de mentores, composição de squads, atividades, critérios, prazos, escalas de avaliação e conteúdo das trilhas.
- Política de privacidade, base legal, retenção, atendimento aos direitos dos titulares, resposta a incidentes e avaliação sobre menores, conforme aplicável.
- Aprovação de acessibilidade, fluxos e linguagem com usuários potenciais.

## 10. Perguntas em aberto para a Altius

Todas as respostas abaixo estão **A definir com a Altius** e devem ser consolidadas em `00-rastreabilidade.md` após validação.

1. Qual projeto Supabase será usado, quem administra ambientes e credenciais, e qual processo aprova migrations, RPCs, Edge Functions e policies?
2. Quais campos mínimos o cadastro deve coletar além de e-mail e nome? Há idade mínima para ingresso e podem participar menores?
3. Quem representa a equipe Altius na plataforma e quais ações administrativas esse perfil pode executar?
4. Como alunos são atribuídos a mentores, quantos vínculos podem existir e quem pode alterá-los?
5. Como squads são formados, o que significa “heterogêneos” operacionalmente e quais entregas são individuais ou coletivas?
6. Quais trilhas, módulos, aulas e materiais estarão disponíveis, e quem mantém o conteúdo?
7. Quais são os enunciados, critérios, pesos/escalas e prazos de cada atividade? Como tratar atraso, reenvio e entrega aprovada?
8. Quais dados e regras definem a fase atual, o progresso e o avanço de fase?
9. Como avaliar as seis competências e quais evidências ou escalas devem sustentar o dashboard?
10. Como funcionam na prática as entrevistas simuladas com live coding e fit cultural; que critérios, registros e feedback são necessários?
11. Quais dados podem constar nas anotações de mentoria, quem pode consultá-las e por quanto tempo devem ser mantidas?
12. Que eventos geram notificação e qual comportamento é esperado para notificação lida, pendente ou arquivada?
13. Quais indicadores qualitativos ou quantitativos a Altius usará para avaliar sucesso, sem confundir uso da plataforma com resultado educacional?
14. Qual é a política de privacidade aplicável, quem responde a solicitações dos titulares e quais fornecedores tratarão os dados?
15. Quais metas de desempenho, disponibilidade, backup, recuperação e auditoria são necessárias antes de produção?
16. Quais domínios exatos entram no allowlist de `src/config/video.js` (incluindo variantes www/mobile) e qual resposta do sistema quando a verificação YouTube não for conclusiva?
17. A Altius fornecerá YouTube Data API credentials/Edge Function para consultar `status.embeddable` e `status.privacyStatus`, ou a primeira versão só tentará oEmbed e deixará verificação inconclusiva como rascunho?
18. Quais campos compõem a lista completa de alunos do Admin? Confirmar que lista do Instrutor contém exatamente nome, fase, progresso e última atividade.
19. Quais papéis podem ver/editar gravação vinculada, presença, data de início e status de aula ao vivo? Quais estados além de agendada/cancelada são necessários?
20. Como materializar “matriculado” e identificar usuários autorizados a ver uma sessão ao vivo cancelada?
21. A aula `published` deve continuar visível ao Instrutor autor depois que outro Admin alterar seu status? Qual regra de acesso vale para Instrutores em aulas publicadas de outros autores?
22. Quais campos, validações e critérios definem presença? Instrutor marca presença manualmente e pode corrigir depois?

## 11. Fontes e conferência de status

- `CLAUDE.md` — escopo, fases de implementação, regras de design e decisões registradas.
- `docs/directio-produto.md` — duração/fases, itens de roadmap, competências, mentoria quinzenal, lacunas do programa e escopo de MVP.
- `src/App.jsx`, `src/pages/AuthPage.jsx`, `src/pages/AppHome.jsx`, `src/features/auth/` — estado atual de rotas, telas e demonstração.
- `src/features/landing/`, `src/pages/Checkout.jsx`, `src/features/checkout/` — conteúdo público, rota e checkout existentes.
- Migration/RLS foram adicionadas ao repositório, mas não há projeto Supabase configurado/aplicado neste checkout.

### Suposições e lacunas desta versão

- **Hipótese a validar:** a ausência de uma plataforma própria é um problema operacional relevante para os perfis descritos; os documentos mostram uma proposta de plataforma, mas não uma pesquisa de necessidades.
- **Hipótese a validar:** a priorização MoSCoW e os indicadores propostos refletem o valor esperado pela Altius.
- O código atual comprova apenas uma estrutura inicial de autenticação/demo e a landing/checkout. Nenhum módulo acadêmico, fluxo de entrega, revisão, mentoria ou administração está funcional.
- Os processos AS-IS, métricas-alvo, composição de squads, política de atraso, critérios de avaliação, responsabilidades LGPD e disponibilidade continuam sem evidência e devem ser validados antes de especificação final.
